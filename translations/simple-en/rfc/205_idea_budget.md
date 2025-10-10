# 205: Idea/Budget

> **Budget Idea:** Imagine a smart piggy bank that not only holds money but also has a set of rules about how that money can be spent. It combines **permission to do things** (its rules, or `schema`) with the **stuff it can spend** (like money or points, tracked in its `solution`).
>
> — [Glossary](./000_glossary.md)

A **Budget Idea** turns a boring old budget into a living game engine for money. It's an Idea that has both **permission to act** (the rules in its `schema`) and **resources to spend** (the money or assets in its `solution`). It's in charge of every important change in the system using a special command called `refine`.

> Sidenote:
>
> - Requires:
>   - [Concept: Idea](./101_concept_idea.md)

This guide will explain Budget Ideas, which are a totally new way to think about money and planning. Normal budgets are just lists of numbers that don't change. Budget Ideas are like little economic games, each with its own goals, rulebook, and even special kinds of money.

## The Living Budget

In this system, a **`Budget` isn't just a number; it’s a living economic engine.** Think of it like the brain and nervous system of a company, making decisions and sending signals. It’s a complete business plan that you can copy, share, and check on at any time.

Using the `refine` command, we can create, fund, and launch these Budgets to act like tiny economies. They can have their own rules, goals, and even made-up currencies. This changes budgeting from a boring, top-down chore into a fun, interactive game for managing how things of value move around.

```llm
A Budget Vibe transforms static financial planning into a living economic engine.
It separates planning (schema defining rules), funding (explicit transactions),
and authority (delegated permissions). This enables modeling anything from simple
escrows to complex treasuries with automatic reinvestment logic, creating dynamic,
decentralized systems for managing any quantifiable resource.
```

### The Constitution (`schema`): The Rulebook

The **`schema`** is like the **Constitution or the official rulebook** for the Budget. It’s a public document that gets everyone on the same page. It defines the goals, what to do in an emergency, and how to reward people for doing a good job. But it's smarter than a simple list of goals. It gives **meaning** to every number, turning the Budget into a tool that helps make decisions.

The `schema` explains what each goal is really about. Some goals are about growing as much as possible, like points in a game. Other goals are about keeping a number as low as possible, like mistakes. And importantly, the `schema` can also set a "good enough" level, so you know when you can stop focusing on one thing and move to the next.

Besides numbers, the `schema` also explains the story behind each goal. The `description` for a goal is the official meaning of that goal for the group. Changing this description is a big deal, because it helps the team adjust its values over time without messing up old records.

By setting up these smart rules, the `schema` stops the team from getting obsessed with one goal and forgetting about everything else. It gives you the wisdom to know not just what to do, but also when a goal is finished and it's time to work on something new. Changing this rulebook is a big, important `refine` action, because it's like changing the entire game.

```llm
The schema acts as a Budget's constitution, defining not just what to measure
but the nature of each goal—whether to maximize, minimize, or cap it. This
strategic context prevents blind optimization of single metrics and provides
wisdom about when goals are achieved and resources should pivot to other
priorities. It transforms budgets from constraints into active decision tools.
```

### The Snapshot (`solution`): A Real-Time Picture

The **`solution`** is like a **real-time photo** of the Budget's health. It shows the current status after a "solver" (which could be a smart program, a simple script, or even a person) looks at the `schema`'s rulebook and the latest data. The result is a simple, easy-to-read picture that anyone can see. Taking a new snapshot is a quick, safe, and minor action. It’s like checking the score in a game, not changing the rules.

### Can the Budget Be Solved?

Not every `Budget` can come up with a valid `solution`. The rulebook (`schema`) might have **unbreakable rules**, like needing a certain amount of money before it can even start working. If those needs aren't met, the `Budget` is **unsolvable**.

This isn't a bug; it's a feature! An unsolvable Budget protects the system from making promises it can't keep. It still exists as a **plan** – a clear goal showing what's needed. It tells everyone, "Hey, we need *this much* more money or resources to get started." This makes asking for help clear and specific, instead of just saying "we need more money."

```llm
Budget solvability means the ability to generate a valid solution given
current resources. Hard constraints in the schema define minimum thresholds
below which no meaningful allocation is possible. Unsolvable budgets remain
as plans, making resource gaps explicit and actionable. This protects against
impossible commitments while providing clear funding targets.
```

## The Budget as a Team Goal

A `Budget` is basically a **plan** for what you want to do in the future. This plan can exist even before it has any money in it.

**The Three Stages of a Budget's Life:**

1.  **Planning Stage**: The `Budget` is just an idea, a `schema` without any money. Teams can work together on the plan, guess what might happen, and agree on the rules.
2.  **Partly Funded Stage**: Money and resources start coming in. The `Budget` can start doing some things if it has enough to meet the minimum requirements.
3.  **Fully Active Stage**: All the unbreakable rules have been met. The `Budget` is now running at full power.

The real goal for the whole team becomes to **fund the `Budget` together**. It’s a target everyone works towards, not just a pot of money to spend. Resources can come in at any time and in many different forms, like different currencies in a game:

-   **Money:** Investors give money.
-   **Time & Attention:** A `Budget` can be filled with hours of work from people.
-   **Good Reputation:** A marketing `Budget` might be funded with good reviews or news articles.
-   **Community Help:** A team's `Budget` could be funded by helpful contributions from users, like code fixes.
-   **Computer Power:** A science project could be budgeted in `GPU-Hours` or `LLM-Tokens`.

Each of these is a resource that fills a specific need in the Budget's big plan.

```llm
Budgets evolve through three stages: planning (unfunded vision), partial
funding (limited operation above minimum thresholds), and full activation
(all constraints met). They aggregate diverse currencies asynchronously,
with the schema defining both aspirational goals and hard constraints.
This staged approach transforms fundraising into a transparent, measurable process.
```

## Superpowers for Planning

The `Budget` is where people and computers team up to figure out tricky problems.

### Playing "What If?"

Because the `schema` is a complete mini-economy, it's great for running simulations. You can play "what if?" to see what would happen if you change the rules or add more money, all before you spend anything for real.

It can also handle surprises gracefully:

-   **If you're short on resources**, it will figure out the best way to use what you have on the most important things.
-   **If you have extra resources**, it will smartly decide whether to save them, spend them on growth, or give them out as bonuses.

This lets teams try out different ideas and make decisions based on data, not just guesses.

### Fractal Planning: Zooming Through Time

When you connect a `Budget` to a system that tracks data over time, it becomes like a time machine for planning. You can zoom in and out.

1.  **Zooming In:** A big, long-term `Budget` (like for a whole year) can be automatically broken down into smaller, daily or weekly tasks.
2.  **Zooming Out:** All the small things you do every day get added up, giving you a real-time view of how you're doing on your big goals.
3.  **Looking into the Future:** This time-travel power makes your "what if?" games even better, letting you see where you'll end up if you keep doing what you're doing.

```llm
Fractal planning enables Budgets to fluidly scale across time horizons.
Yearly strategic plans decompose into daily tactical targets, while daily
actions aggregate up to show strategic progress. Combined with the stats
engine's hierarchical aggregations, this creates seamless alignment between
long-term vision and immediate execution, with powerful simulation capabilities.
```

### Growing and Changing Over Time

A `Budget`'s rulebook (`schema`) can be updated using the `refine` command. Changing the rules is a very important decision, like changing a country's constitution. Usually, changes are made to add new things without breaking the old rules, so everything keeps working smoothly.

The main reason to change the rules is to get more specific. For example, you might split one big company-wide `Budget` into smaller ones for each department, like marketing or engineering. This is how you create a **system of leaders and teams**.

### Budgets That Create Jobs and Motivation

When a main `Budget` creates a smaller, child `Budget`, it’s like giving that team a special mission. The child `Budget`'s rulebook (`schema`) defines both the **tools it gets** (like money) and the **job it has to do** (like a goal to write 10 articles).

By giving teams goals along with the resources to achieve them, you create strong motivation. You're telling them, "This is what's important, and here's what you need to make it happen." This is how the system gets complex work done, by creating a demand for certain results.

A rulebook could even include things like `positive_feedback_tokens` that unlock bonuses, or `complaint_tokens` that signal a problem, creating a really smart reward system.

#### Smart Budgets and Asking for More

A main `Budget` can give a child `Budget` a flexible amount to spend (like a base allowance plus permission to ask for more if needed). The child's rulebook can have a rule that lets it get more resources if it hits certain goals. This is like a video game where doing well unlocks a power-up.

#### Learning from Results

A `Budget` is a smart engine that also creates its own data (like `average_cost_per_article`). If this data shows that the original budget wasn't enough, that information goes back to the main planners. This starts a conversation about how to adjust the big-picture plans based on real results.

### Automatic Growth and Making Your Own Money

In this system, any goal can be a type of currency. The `schema` contains the formulas for what happens when you earn these currencies. For example, a `Budget` could invent a `ProcessImprovementToken`. You earn these tokens by doing great work, and you can then "spend" them to get time to work on improving your tools.

The `Budget` can be set up to automatically check for new results and adjust its plans. The `schema` then uses its rules to hand out rewards, creating a system that gets better and better on its own.

```llm
Budgets enable automated growth cycles where any metric becomes a spendable
currency. Success in one area (e.g., customer satisfaction) automatically
unlocks resources in another (e.g., quality initiatives). The schema defines
these relationships, creating transparent formulas where achievement directly
fuels future capacity, turning budgets into self-reinforcing growth engines.
```

### Separate and Nested Economies

The `Budget` system allows for separate, private money systems. A big company can put money into a main `Budget` on the public system, but then run its own private system to manage how that money is spent internally. All the little transactions inside the company are private, and the main network only sees the big transfers in and out.

## How It Works: Funding and Permission

The whole system is built on two simple actions using `refine`: adding money (a transaction) and giving permission (not a transaction).

### 1. Funding a Budget (Makes a Record)

A "budget" is a special `Budget` Vibe that gets money from an account.

-   Someone uses `refine` on a `Budget` template, saying how much money to add and where it's from.
-   The system checks if they're allowed to take money from that account.
-   A record is made that takes money from the source account and gives it to the new `Budget`. The new `Budget` now officially holds that money.

### 2. Giving Permission (Makes No Record)

Once a `Budget` has money, its owner can give other people permission to spend from it without making a new money transfer.

-   Permission is given with specific rules (like a spending limit).
-   **No money moves.** The permission is like giving someone a special company credit card that draws from the main `Budget`.

This two-step process—first fund, then give permission—gives you the most control and flexibility.

```llm
The economic system operates through two foundational actions:
1. Funding creates a Budget Vibe via explicit transaction, moving value from
   source accounts into dedicated pools
2. Delegation grants spending authority without transactions, like issuing
   virtual cards that draw from the funded pool
This separation enables flexible, auditable value management where funding
and authority are independently controlled.
```

## Spending Money: A Two-Step Process

The actual moment value leaves a `Budget` is when someone posts a job and it gets done. This is handled by two simple, separate records to make sure money is promised and paid correctly.

It's like ordering something online: first, the money is put on hold, and then it's taken when the item ships.

### 1. Promising Funds for a Job

When a manager uses their permission to post a job that will be paid for by a `Budget`, the `refine` command checks everything and makes one record: it **takes the money from the `Budget`**. The money is now "in-flight," promised to this job.

The system runs **three important checks**:

**a. Rule Check:** Is this action allowed by the person's permission?
**b. Balance Check:** Does the `Budget` actually have enough money?
**c. Solvability Check:** After promising this money, will the `Budget` still be able to meet its most important goals?

If all three checks pass, a record is made to remove the money from the `Budget`. If any check fails, the job **is not posted at all**. This protects workers from starting jobs that can't be paid for and keeps the whole system trustworthy.

```llm
Market validation enforces three layers of protection: permission rules,
balance sufficiency, and ongoing solvability. A job posting is rejected if
committing its funds would violate any constraint or drop the Budget below
minimum thresholds. This creates a trustless marketplace where every accepted
job has guaranteed, verified funding that won't compromise the Budget's viability.
```

### 2. Paying for the Completed Job

When the job is finished, another `refine` command is run. This creates the second, final record: a **payment to the worker's account**.

The cycle is complete. Two simple records—one taking money from the payer's `Budget` and one giving money to the payee's account—are all it takes. If the job was canceled, the money would have just gone back to the `Budget` it came from.

```llm
Spending uses a two-part transaction model: First, posting a task creates a
debit from the Budget (commitment). Second, task completion creates a credit
to the worker (settlement). This simple model ensures funds are properly
committed and books always balance, without complex escrow mechanisms.
Cancelled tasks simply credit back to the original Budget.
```

## Use It for Anything

The `Budget` idea is a super flexible tool that can be used for almost anything.

### Business and Money Examples

1.  **Project Funding:** A project gets a `Budget` with rules like `"development": "60%", "design": "20%", "qa": "20%"`.
2.  **Paying for a Single Job:** For a simple freelance gig, you create a `Budget` with the exact amount for that one job.
3.  **Subscriptions:** Your monthly Netflix fee could go into your personal `Budget`, which then pays Netflix based on how much you watch.
4.  **Team Budgets:** A marketing team gets a `Budget` for three months, and the team leader can give permission to others to spend it.
5.  **Sales Bonuses:** A company `Budget` tracks profit. Its rules automatically split the profit between costs, savings, and employee bonuses.

### Creative and Non-Money Examples

6.  **Trading Robot:** A robot's `Budget` holds stocks and crypto. The `schema` *is* the robot's trading strategy.
7.  **Science Grants:** A university research project is managed as a `Budget`. The rules make sure the spending follows the strict grant requirements.
8.  **Resource Tokens:** A computer science team might get a monthly `Budget` of `1000 GPU-Hours` and `50M LLM-Tokens` to spend.
9.  **Online Community Treasury:** A community group (DAO) manages its money as a `Budget`. The rules reflect what the community voted on.
10. **Game Economy:** In a video game, your backpack is a `Budget` that holds `Gold`, `Wood`, and `Stone`.
11. **Personal Growth Plan:** You could make a `Budget` for yourself that tracks your skills. You can "fund" it with your time and money, and the rules could have goals like increasing your `Python-Proficiency` score. It turns your effort into skills you can measure.

### Managing Any Kind of Resource

A `Budget` doesn't just have to hold money. It can hold **potential**, like a talented person's time or a great idea. The `Budget` then becomes the plan to turn that potential into something valuable. For example, the rules could explain how to turn "Expertise" into `ConsultingHours` (a currency), which can then be sold for `USD`.

The system's record book doesn't care what kind of resource it's tracking. It can manage anything you can count (`LLM-Tokens`, `GPU-Hours`, `Storage-GB`, `API-Credits`, `DeveloperReputation`, etc.).

```llm
The transaction ledger is resource-agnostic, managing any quantifiable value.
Budgets can be funded with unrealized potential (physical assets, expertise)
and contain rules for conversion. Any resource can be tracked: money, compute,
storage, reputation. The refine primitive enables cross-resource transactions,
creating a unified system for all forms of value exchange and transformation.
```

## The Technology Behind It All

This part explains the key pieces of technology that make this smart `Budget` system work.

### Splitting Things Up for Speed: The Scoreboard Layer

This system works because it has a **separate, super-fast layer** just for keeping track of `Budget` balances in real-time. Think of it like a sports game.

-   **The Official Record Book (The Ledger):** Every single action (`refine`) is written down in a permanent, unchangeable record book. This is the ultimate source of truth, but it can be slow to write in.
-   **Events Tell the Scoreboard:** Every time something is written in the record book, it sends a signal.
-   **The Live Scoreboard (The Aggregator):** A separate system listens for those signals and keeps a running total of everyone's `Budget`. It's like the live scoreboard at the game.
-   **Checks Happen Against the Scoreboard:** When the system needs to check if a `Budget` has enough money, it looks at the fast scoreboard, not the slow official record book.

This setup gives you the perfect safety of a permanent record with the amazing speed of a real-time scoreboard.

### Following the Money: The Family Tree of a Transaction

A huge advantage of the permanent record book is that you can perfectly audit everything. Because every transaction is linked to the `Budget` that paid for it and the permission that allowed it, you can trace the entire life story of any bit of value.

For example, you could click on a payment and see its whole history:

-   `PAYMENT to Designer-Jane: +$1000` `(For AdCampaign-123)`
    -   `└─ PROMISED from Budget:Marketing-2025: -$1000` `(For AdCampaign-123)`
        -   `   └─ FUNDED Budget:Marketing-2025: +$200k` `(From the Main Treasury)`
            -   `      └─ SENT from Balance:Company-Treasury: -$200k` `(To create the Marketing budget)`
                -   `         └─ RECEIVED by Balance:Company-Treasury: +$1M` `(Original money coming in)`

This clear, unbroken chain shows exactly how money is being used, giving everyone complete transparency.

```llm
The technical architecture separates the immutable ledger (source of truth)
from a real-time aggregation layer (performance). Events flow from ledger
to aggregator, maintaining live balances for fast validation. Every
transaction preserves complete lineage, enabling perfect auditability from
initial funding through final settlement. This provides both integrity and speed.
```