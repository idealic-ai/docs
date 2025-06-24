# Poker‑Analytics Bucket Engine

## Introduction

We are building a statistical substrate that **harvests and re‑uses composable raw stats drawn from millions—ultimately billions—of poker hands in real time**, then condenses them into high‑signal digests that a large‑language model (LLM) can understand at a glance. This design tackles two chronic pains at once:

1. **Statistical overload** — classic analytics stacks choke on sheer volume and retention costs.
2. **LLM numeracy gaps** — language models hallucinate or stall when forced to crunch big numbers.

By off‑loading all heavy arithmetic (percentiles, rankings, roll‑ups) to the bucket engine **while streaming fresh hands the moment they finish**, we hand the LLM a small, confidence‑tagged vector of composite metrics. Each component plays to its strength: the engine does deterministic math at live pace; the LLM performs fuzzy, context‑rich decision‑making. The result is a system that scales gracefully, reasons coherently, and supports both historical analysis **and live‑play decision support**.

## Quick Summary

The engine turns billions of **raw stats** (bets, calls, pots…) into compact **bucket digests** arranged on three axes—**time**, **player**, and **street**. From those digests we derive percentile‑based **composite metrics** (Balanced, Aggressive, Nit …) and an overall **confidence** score. Profiles appear instantly—even for brand‑new villains—because unknown fields are filled from archetypes grown on a huge historical sample drawn from multiple poker rooms. Vertical roll‑ups extend the time window, horizontal merges widen the population, and retention rules keep storage sane. The net result is a low‑latency, low‑footprint substrate for HUDs, leaderboards, and bot training.

---

## 1 Bucket Schema — Three Orthogonal Axes

```
TIME  ×  PLAYER  ×  STREET
1 min    id          PF
1 hr     site        F
1 day                 T
1 mo                  R
1 yr                  SD
```

- **Time** — vertical roll‑ups zoom out from live minutes to multi‑year history.
- **Player** — atomic `player_id` + `site`; merge many IDs to get table, stake, or room views.
- **Street** — keeps HUD granularity; PF, Flop, Turn, River, Showdown can be studied solo or merged into _all‑street_ totals.

### Visual Shorthand

```
hour ─ hour ─ hour                 PF  F  T  R  SD               A  B  C
        │                            ╲ | | | /                    ╲ | /
        ▼                              PLAYER                       ROOM
      DAY bucket                 (street merge)             (player merge)

day ─ day ─ day
   ╲     │     ╱
         ▼
      MONTH bucket
   (vertical roll‑up)
```

---

## 2 Retention & Lifecycle

| Layer | Kept for  | Deletion trigger |
| ----- | --------- | ---------------- |
| 1‑min | 14 days   | disk ≥ X % full  |
| 1‑hr  | 90 days   | same trigger     |
| 1‑day | 18 months | —                |
| 1‑mo  | forever   | —                |

Roll‑ups happen first; buckets are **only** discarded when both retention rules _and_ capacity limits allow.

---

## 2.1 Scope‑Controlled Aggregation

Every query decides its own **scope** before computing stats or metrics:

- **Time scope** — live, today, this month, lifetime…
- **Player scope** — single ID, whole table, entire room…
- **Street scope** — per‑street or all‑street.
  Because digests are associative we can merge in either direction on demand, so the same raw buckets answer “Top AF on NL50 this week” and “Lifetime bb/100 across all rooms.”

---

## 3 Raw‑Stats Digests

Each bucket stores:

- **Atomic counters** — bets, raises, calls, pots, rake, stack sizes…
- **t‑digests** — quantile sketches for every derived raw stat (e.g., Aggression Factor = (bets + raises)/calls). A digest returns P10, median, P90, mean, count with tunable error.

These raw‑stats digests are the only thing written to disk; all higher layers are computed on the fly.

---

## 4 Composite Metric Layers

Composite metrics condense many raw‑stat percentiles into strategic scores.

### 4.1 Single‑Stat Percentiles (Inputs)

`bb/100`, `VPIP‑PFR gap`, `3‑bet %`, `AF`, `W$SD %`, `WWSF %`, `NSD $/100`…

### 4.2 Role Vectors (First‑Level Composites)

Weights reflect strategic value.

#### Balanced Cash Player

```
0.40·P_bb100 + 0.15·P_gap_inv + 0.15·P_3bet + 0.15·P_AF + 0.15·P_W$SD
```

_Wins with and without showdown; minimal leaks._

#### Aggressive Driver

```
0.35·P_AF + 0.25·P_3bet + 0.15·P_WWSF + 0.15·P_NSD + 0.10·P_bb100
```

_Relentless pressure; strong red‑line._

#### Nit

```
0.50·(1−P_VPIP) + 0.20·P_W$SD + 0.15·(1−P_3bet) + 0.10·(1−P_WWSF) + 0.05·P_bb100
```

_Plays few hands; cashes in strong._

### 4.3 Meta‑Scores (Second‑Level)

```
Global_rating = 0.5·Balanced + 0.3·Aggressive + 0.2·Nit
```

Re‑weight quarterly to follow metagame drift.

---

## 5 Profile Construction, Interpolation & Confidence

### Why Profiles?

We want to **predict behaviour fast**. Waiting for 20 k hands per villain is impossible in live play, yet we possess millions of historic hands from other sites. Profiles let us start smart and self‑correct.

### Workflow

| Stage             | Action                                                                                       | Confidence |
| ----------------- | -------------------------------------------------------------------------------------------- | ---------- |
| **Unknown**       | assign pool‑median composite metric vector                                                   | 0.0        |
| **Early sample**  | compute real percentiles; map to nearest archetype cohort (e.g., Top‑30 %) for missing stats | ↑          |
| **Mature sample** | archetype share → 0 %                                                                        | → 1.0      |

Archetype vectors come from the same engine, trained on **lifetime room‑wide digests** spanning multiple poker rooms, ensuring robust baselines.

All interpolation happens **consumer‑side**; the database never stores guessed numbers.

---

## 6 End‑to‑End Flow

1. **Ingest** raw hand counters in real time.
2. **Aggregate** directly into **street buckets** (no extra minute layer required).
3. **Roll up** vertically per retention schedule.
4. **Merge** horizontally on demand for player totals or room totals.
5. **Compute single‑stat percentiles** from raw‑stats digests.
6. **Create composite role vectors**.
7. **Assemble meta‑scores** for ladders & matchmaking.
8. **Fill gaps** with archetype vectors; output scalar **confidence**.
9. **Serve profiles** to HUDs, dashboards, and bot‑training loops.

---

## 7 Why This Matters

| Need                  | Benefit                                                            |
| --------------------- | ------------------------------------------------------------------ |
| **Instant reads**     | Profiles form after a handful of hands thanks to archetypes.       |
| **Predict behaviour** | Composite metrics forecast lines better than raw stats alone.      |
| **Bot guidance**      | RL agents chase living human benchmarks instead of frozen numbers. |
| **Compression**       | Trillions of events → kilobytes of digests.                        |
| **Scope flexibility** | Any time / player / street scope available via join direction.     |
| **Retention control** | Precision only sacrificed when policy & disk pressure say so.      |

---

## 8 Implications for LLM‑Driven Decision Logic

Large‑language models excel at **fuzzy pattern recognition** but struggle with huge numeric payloads and deterministic math. The bucket‑engine bridges that gap:

- **Tiny, information‑dense payload** — A full table of six opponents distills to perhaps 6 × (20 metrics + 1 confidence) ≈ 126 numbers. That’s a few hundred tokens, not thousands.
- **Pre‑computed arithmetic** — All heavy math (percentiles, composites, meta‑scores) happens inside the engine, so the LLM reads ready‑made semantic signals rather than raw counts.
- **Confidence‑aware prompts** — The single scalar confidence per player tells the LLM when to trust or down‑weight a metric, allowing nuanced reasoning: _“Villain 3 looks aggressive, but confidence 0.35 — treat with caution.”_
- **Preserved fuzziness** — Because metrics are relative (percentiles), they survive lossy tokenization; the LLM can still say _“slightly above average”_ or _“top‑tier”_ without exact decimals.
- **Token‑budget headroom** — Freed tokens can describe table texture, recent hands, or strategic goals, letting the LLM blend numeric insight with narrative context.
- **Caching‑friendly** — Metric vectors change only when new hands land; stable inputs mean deterministic chain‑of‑thought and reproducible advice.

> **Enabling claim** — By front‑loading all crunching, we let the LLM do what it does best: synthesize, hypothesize, and decide under uncertainty, instead of burning cycles on arithmetic it handles poorly
