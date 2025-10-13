# 203: Idea/Process

> **Process Idea:** Think of this as the master blueprint for a multi-step project. It's a special kind of [Idea](./101_concept_idea.md) that holds both the strategic [Plan](./012_agent_plan.md) and a live update of where you are in the project right now. The available [Tools](./002_agent_tool.md) are its `schema` (the toolbox), the very next step is its `solution`, and all the background information (like the initial goal, current progress, and previous step) is its `context`.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
> - Requires:
>   - [101: Concept/Idea](./101_concept_idea.md)
>   - [012: Agent/Plan](./012_agent_plan.md)
>   - [010: Agent/State](./010_agent_state.md)
>   - [007: Agent/Input](./007_agent_input.md)
> - Complemented by:
>   - [011: Agent/Instancing](./011_agent_instancing.md)

While a [202: Idea/Vessel](./202_idea_vessel.md) is for making a single, quick decision (like deciding to take an umbrella), a **Process Idea** is for managing a whole project with many steps, like following a recipe to bake a cake. It's created by the system that [makes plans](./012_agent_plan.md) to handle complex tasks over time. This makes it a complete record of both the tools available and the exact strategy the agent decided to use.

## What Makes Up a Plan?

A `Process Idea` uses the standard three parts of an `Idea` to give a perfect snapshot of a task in progress. This snapshot shows the agent's strategy (the `Plan`), all the tools it can use, and exactly what's happening right now.

- **`schema` (The Toolbox):** This is a complete list of all the [Tools](./002_agent_tool.md) that the agent is allowed to use to build its plan. It represents everything the agent is capable of doing.

- **`solution` (The Next Step):** This is the agent's decision for what to do *right now*, in this current moment (or "tick"). It's the list of actions that becomes the starting point for the *next* moment.

- **`context` (The Kitchen Counter):** This holds all the background information the agent needs to figure out the next step. It contains:
  - **Input Message:** The original request that started the whole process. This is usually given only once at the very beginning.

    > Sidenote:
    > - [007: Agent/Input](./007_agent_input.md)

  - **State Message:** The current status of everything. It keeps track of the results from each step (like "eggs are whisked" or "oven is preheated"), which connects one action to the next.

    > Sidenote:
    > - [010: Agent/State](./010_agent_state.md)

  - **Plan Message:** The plan the agent was following just a moment ago. The agent can look at this and decide whether to stick with it or change course.

    > Sidenote:
    > - [012: Agent/Plan](./012_agent_plan.md)

### Planning and Doing at the Same Time

A key idea here is that planning and doing aren't separate steps; they happen together. Usually, you first make a big plan, and only *after* it's done do you start working on it. Here, it’s different. The act of deciding on the next step (`solution`) *is* the action for this moment.

This makes the system incredibly fast and flexible. The `Plan` is a living thing that can change based on new results. The list of actions (`Calls`) that the AI generates is both the structure of the plan and the work being done. In one go, the AI can check its progress, adjust the plan, and perform the next step. There’s no need to stop everything for a separate "re-planning meeting"—it just adapts as it goes.

> Sidenote:
> - [004: Agent/Call](./004_agent_call.md)

### A Plan That Can Grow Up

The `State` allows a `Plan` to mature over time, moving from a flexible guess to a rock-solid, predictable process. Think of it in three stages:

1.  **Scribble Mode:** At first, the plan is very flexible. The agent is like an explorer feeling its way through a new task. It can create new connections and pathways on the fly as it figures out the best way to get things done.

2.  **Tracing the Lines:** Once a good path is found, it can be made more formal. You can define the main "roads" that information must travel on. You can either allow for small detours (`Open Connections`) or lock it down completely, forcing the agent to stick to the exact path (`Closed Connections`).

3.  **The Final Blueprint:** This is a finished, reliable plan that is ready to be reused. It can be a **"Happy Path" Plan** (works perfectly under ideal conditions) or a **"Complete Plan"** (a tougher version that knows how to handle common problems and errors).

This journey allows a `Process Idea` to evolve from a rough draft into a trustworthy, reusable machine.

## Why Every Step is a Permanent Snapshot

The real power of a `Process Idea` comes from being **immutable**, a fancy word for "unchangeable." Every time a step is taken, it doesn't edit the old `Process Idea`; it creates a brand-new one that includes the update. Think of it like a save file in a video game. Each save creates a new snapshot of your progress, and you can always go back to an old save. This "save-as-you-go" approach unlocks some amazing abilities.

- **Reliable and Adaptable Steps:** Because each new step starts from a clean, complete snapshot of the last one, the process is very reliable. There are no mix-ups. The agent has a clear picture of the world before it decides what to do next, making its choices smart and safe.

  > Sidenote:
  > - [005: Agent/Loop](./005_agent_loop.md)
  > - [012: Agent/Plan](./012_agent_plan.md)

- **Pausing and Resuming Safely:** Since every step is a self-contained snapshot, you can pause a task at any time just by saving its last `Process Idea`. A person can then look at it, make changes if needed, and the task can resume right where it left off using the new, updated snapshot.

  > Sidenote:
  > > Sidenote: For example, a supervisor could manually edit the saved `State` data to fix an error before telling the system to resume the task.

- **Time Travel for Debugging:** This history of snapshots is like a perfect recording. You can "rewind" to any point in the past to see exactly what was happening. This is amazing for finding bugs or asking "what if…?" by starting a new, alternate timeline from an old point.

  > Sidenote:
  > > Sidenote: This detailed history is much more powerful than the simple 'it worked' or 'it failed' result you might get from a single-decision [Vessel Idea](./202_idea_vessel.md).

- **Doing Many Things at Once, Consistently:** When you need to run the same process on thousands of items, these snapshots guarantee it works the same way for every single one. The `Plan` is like a cookie-cutter, and the starting info (`State`) for each item is the dough. You can be sure every cookie will come out looking right.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

## Adding Finesse to a Finished Plan

Sometimes, a finished plan is too rigid. Imagine you have a perfect recipe for a cake, but today you want to add walnuts. You don't want to rewrite the whole recipe from scratch.

This is where an **[Instruction Idea](./204_idea_instruction.md)** comes in. It's like a sticky note you attach to one step of the recipe. It doesn't change the recipe's structure, but it gives a specific, temporary direction, like, "at the mixing step, also add a cup of walnuts." This lets you guide the process with extra detail and control, without messing up the reliable plan you already built.

> Sidenote:
> - [204: Idea/Instruction](./204_idea_instruction.md)
