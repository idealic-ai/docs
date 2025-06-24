Vasiliy Klepov, [28/05/25 17.23]

# Metrics-First Architecture Call

Date: 2025-05-28
Participants: Speaker A, Speaker B, Speaker C, Speaker D
Setting: Informal video call / brainstorm

## Idea Log

- \[Exploration] \[Idea] _Put metric weights inside the formula, not in a separate field_ #embedded-weights – Speaker B

  - Evolution — first raised at 0:27 as a fix for “all metrics become equally useless if weight is omitted”; later refined when A asked what happens if the _vibe_ lists metrics but never ranks them.
  - Explanation — B’s example: _“I want the meta-metric to influence the score by 30 %, this one by 50 %, that one by 20 %; the formula itself applies the multipliers, so weights never live outside.”_
  - Reactions — A worries about vibes that merely declare metrics without judging importance; B answers that different formulas automatically break symmetry, so explicit weights are unnecessary.

- \[Suggestion] _Choose abstract metrics that outlive process changes_ #durable-metrics – Speaker B

  - Evolution — illustrated with the “call customers → later switch to email” scenario; the same KPI (e.g. _time-to-first-feedback_) must remain valid after the switch.
  - Explanation — concrete KPIs tied to “phone + website” break when either side is replaced; abstract ones such as _customer-satisfaction-delay_ survive.
  - Reactions — A agrees and coins the principle “metrics are persistent; processes are disposable.”

- \[Idea] _“Stats are prior to processes” — metrics define company structure_ #stats-drive-structure – Speaker B

  - Evolution — B links Conway’s law in reverse: software mirrors the org chart because the org chart mirrors its KPI tree.
  - Explanation — if every sales team is evaluated separately, the org inevitably splits into parallel sales teams; KPIs shape hierarchy.
  - Reactions — A nods: isolating data and re-using computed metrics let each _vibe_ remix weights and evolve safely.

- \[Exploration] _Cross-company metric aggregation as a roadmap engine_ #cross-firm-benchmarks – Speaker A

  - Evolution — A imagines pooling KPIs from three lingerie retailers at different maturity levels to predict growth paths before any code is written.
  - Reactions — B sceptical: real datasets are dirty, fragmented across services, and expensive to reconcile.

- \[Question] _Is “big data for free” a myth?_ #big-data-skepticism – Speaker B

  - Evolution — cites 2010-era promises; argues that importing someone else’s tables is an engineering project in itself.
  - Reactions — A partly agrees but suggests schema migration into a neutral table shape instead of deep integration.

- \[Suggestion] _Treat raw measurements, formulas, and buckets as three separate layers_ #measurement-layers – Speaker B

  - Explanation — keep every low-level reading; derive formulas later; store percentiles/buckets for quick insight without domain expertise.
  - Reactions — A calls this “the missing link that removes the need for a geology degree when analysing an oil company.”

- \[Exploration] _Research-log every hypothesis; voice dictation + LLM cleanup_ #research-log – Speaker B

  - Evolution — B proposes a SuperWhisper-style hotkey: speak, auto-transcribe, auto-clean filler words, then tag new ideas, promises, reactions.
  - Reactions — A likes the speed gain; worries about manual typing backlog.
  - Data/Links — tool reference: “SuperWhisper” (desktop voice-to-markdown app).

- \[Suggestion] _Move team coordination into Jira + Confluence_ #kanban-setup – Speaker B

  - Evolution — B will push existing docs, create a Kanban board, and funnel all tasks through tickets to manage deadlines and reminders.
  - Reactions — A welcomes “a managerial finger in the back” to add time boundaries.

- \[Exploration] _Unit-test the LLM: enumerate all poker actions, score each, assert determinism_ #llm-test-harness – Speaker A

  - Evolution — A attempted per-action reflection; Gemini complained about schema size; rolled back but kept the testing idea.
  - Reactions — B reframes it positively: failed experiments still count; urges A to log every hypothesis/outcome.

- \[Idea] _Collapse multi-expert architecture into a few “example rows” for a single decision model_ #example-compression – Speaker A

  - Explanation — feed 25 crafted examples (inputs → reasoning → action) to teach one agent instead of running five experts plus arbiter.
  - Reactions — B agrees: a _meme_ can be distilled from a dataset of vibes; the system should auto-generate such compression sets.

- \[Question] _How to propagate “success” back through a chain of vibes?_ #success-back-prop – Speaker B

  - Evolution — proposes marking outcomes as _success_/_failure_, then walking upstream to tag contributing vibes; could seed tests or weighting.
  - Open issue — delayed validation (e.g. poker result arrives streets later) complicates automated scoring.

## Promises

- Speaker B will finish the updated “Vibe doc” and hand it to A for review.
- Speaker A will send the full transcription to B (43:59).
- Speaker A will try the new O3 prompt shared by B.
- Speaker B commits to set up Jira + Confluence with initial tickets and reminders for the team.

## Actionables

- Define a _universal KPI catalogue_ and segmentation rules (by room, player, department, etc.). – Owners: A & B
- Prototype voice-dictation workflow (find a SuperWhisper alternative for Linux, bind hotkey, test cleanup prompts). – Owner: A
- Start a shared research-log repo; each experiment entry = _hypothesis → test → result_. – Owner: A
- Import existing docs into Confluence and create the Kanban board. – Owner: B
- Build an LLM test harness that enumerates poker actions, scores each, mocks subsequent streets, and asserts determinism. – Owner: A
- Draft success-propagation metric (how to label upstream vibes once outcome is known). – Owner: B

## Open Threads

- Reliable pipeline for cross-company KPI datasets without deep bespoke ETL.
- Formal grammar for embedding weights inside metric formulas.
- Mechanism for delayed or mocked validation of poker decisions in tests.
- Criteria for deciding when the metrics tool becomes public versus kept in-house.
- How to auto-convert a set of _vibes + arbiter_ into a compressed example set for a single model.
