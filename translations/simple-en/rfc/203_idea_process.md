# 203: Idea/Process

> **Process Idea:** Think of this as a smart project plan. It's an [Idea](./101_concept_idea.md) that holds a complete [Plan](./012_agent_plan.md) and keeps track of what's happening right now. Its `schema` is the toolbox of all available [Tools](./002_agent_tool.md), its `solution` is the *new* plan for the very next step, and its `context` holds the original request, the current situation, and the previous plan.
>
> — [Glossary](./000_glossary.md)

> Sidenote: To understand this, you should know about:
> - [101: Concept/Idea](./101_concept_idea.md)
> - [012: Agent/Plan](./012_agent_plan.md)
> - [010: Agent/State](./010_agent_state.md)
> - [007: Agent/Input](./007_agent_input.md)
> 
> It works really well with:
> - [011: Agent/Instancing](./011_agent_instancing.md)

A [202: Idea/Vessel](./202_idea_vessel.md) is like making a single, quick decision. A **Process Idea** is different; it's like managing a whole project with many steps. It's the file that gets created when the system makes a [Plan](./012_agent_plan.md) to handle a big task over time. This file is a perfect record of everything the project can do and the exact strategy the computer chose to follow.

## What a Plan Looks Like

A `Process Idea` uses three parts to give you a complete picture of a project at any moment. This picture shows the aent's strategy (the `Plan`), all the tools it can use, and the live status of the project.

- **`schema` (The Toolbox):** This lists all the available [Tools](./002_agent_tool.md) that a `Plan` can be built from. It’s like a list of all the superpowers the computer has.

- **`context` (What's Happening Now):** This holds all the information the computer needs to plan and take the next step.
  - **Input Message:** The original mission or question that started everything. It's usually given just once and doesn't change.

    > Sidenote: [007: Agent/Input](./007_agent_input.md)

  - **State Message:** The live, changing data for the project. Think of it as the project's memory, holding all the current information that connects the different steps in the `Plan`.

    > Sidenote: [010: Agent/State](./010_agent_state.md)

  - **Plan Message:** This is the *approved* plan from the last turn. The computer can decide to stick with it or change it.

    > Sidenote: [012: Agent/Plan](./012_agent_plan.md)

- **`solution` (The New Plan):** This is the computer's chosen strategy for *this* turn. It's a map of tool `Calls` that shows what to do next. This becomes the `Plan Message` for the next turn.

### Planning and Doing at the Same Time

A key idea here is that planning and doing things happen together, in one single step. In older systems, you'd make a full plan first, and then you'd follow it. Here, the computer does both at once.

When the computer figures out the `solution` (the new `Plan`), that *is* the action for this step. It's like cooking and writing the recipe at the same time. You taste the soup, decide it needs salt, write "add salt," and add the salt all in one motion.

This makes the system very fast and clever. The `Plan` is a living thing that doesn't have to be finished to be useful. It can grow and change with each step. The `Calls` it creates are both the steps of the plan and the information passed between them. This means a single thought from the AI can check the current situation, adjust the plan, and take the next step all at once. There's no separate, slow step for re-planning.

> Sidenote: A `Call` is a single instruction for a tool to do something. [004: Agent/Call](./004_agent_call.md)

This all-in-one method gives us two cool advantages.

First, you can test a `Plan` by pretending to run it, even before you have real information. The AI can act out what each step would do, which helps you design and check complicated projects from the very beginning.

Second, the AI acts like a smart adapter between tools. If one tool gives an answer that isn't quite right for the next tool, the AI can fix it on the fly. This stops the whole project from breaking if one small thing goes wrong, which is a common problem in other systems.

> Sidenote: This idea of building systems where AI is a core part of how they work is called AI-Native design. [105: Concept/AI-Native](./105_concept_ai_native.md)

### How a Plan Can Grow Up

The `State` of the project allows a `Plan` to grow over time, starting as a flexible idea and becoming a rock-solid, predictable process. Think of it like building with LEGOs.

> Sidenote: The `State` is the project's memory. [010: Agent/State](./010_agent_state.md)

1.  **Freeform Plan (Pile of LEGOs):** At first, the `State` can be shapeless. The computer has total freedom to figure out a `Plan`, connecting tools and creating new variables as it goes.

2.  **Specified Connections (Building a Car):** The next step is to lock down the main data connections in the `State`. This is like deciding you're building a car, so the wheels have to connect to the body. You can still be flexible:
    - **Open Connections:** You can enforce the main connections but still allow the computer to add new, minor ones, like adding a custom spoiler to the car.
    - **Closed Connections:** You can lock it down completely, so the computer has to follow the plan exactly, with no creative changes.

3.  **Resolved Plan (Following the Instructions):** This is the final stage, when a plan is grown-up and reliable. It becomes the official **Committed Plan** that gets passed to the next step. A resolved plan can be:
    - **Happy Plan:** A plan that works perfectly for the most common situation. It's fast, but might need help if something unexpected happens.
    - **Complete Plan:** A plan that has learned from experience and now includes instructions for common problems and alternative paths, making it super dependable.

This journey allows a `Process Idea` to go from a rough sketch to a powerful and reusable tool.

## Unchangeable Plans: Running, Studying, and Growing

The real power of a `Process Idea` is that it's unchangeable. Every step of a project creates a brand new, complete snapshot of the `Plan` and `State`, keeping a perfect history of everything that happened. Think of it like a video game that auto-saves every second. This chain of unchangeable snapshots allows the system to do amazing things.

- **Reliable and Smart Actions:** The step-by-step process is very reliable because each new step starts from a clean, complete snapshot of the last one. This prevents confusion. The computer looks at the last snapshot and decides to either stick to the plan or change it based on solid information. Each step creates a new `Process Idea` snapshot, moving the project forward safely.

  > Sidenote: This is managed by the system's main `Loop`, which runs the `Plan`. [005: Agent/Loop](./005_agent_loop.md), [012: Agent/Plan](./012_agent_plan.md)

- **Tough Project Management:** Because a `Process Idea` is a self-contained file, managing the project is very strong. You can pause a project just by saving its latest snapshot. A human or another system can then look at that frozen-in-time state and decide what to do. If they make a change, it creates a *new* `Process Idea` snapshot to continue the project, without changing the history of what already happened.

  > Sidenote: The `State` is the snapshot of everything happening at that moment. [010: Agent/State](./010_agent_state.md)

- **High-Quality Replays:** This system is what makes time travel possible. Every historical `Process Idea` is a perfect photo of the project at a specific moment. This lets you load any point in the past to check what happened, figure out a problem, or ask "what if?" by starting a new branch of the project from that point.

  > Sidenote: This is different from a `Vessel Idea`, which is just a single moment and doesn't have a history. [202: Idea/Vessel](./202_idea_vessel.md)

- **Doing Many Things at Once:** The snapshot system lets you handle huge tasks easily. Imagine you have to do the same task for 1,000 different things. You can use a single `Plan` as a template and give each of the 1,000 tasks its own private `State` snapshot. In one move, the computer can plan the next step for all 1,000 tasks at once, creating a unique action for each one. This is super efficient and ensures everything stays consistent.

  > Sidenote: This technique is called Instancing. [011: Agent/Instancing](./011_agent_instancing.md)

## From a Fixed Plan to Smart Guidance

A `Process Idea` can grow into a **Resolved Plan**—a workflow that is very reliable but not very flexible. Sometimes, you need a way to give smart advice without rewriting the whole plan.

This is where an **[Instruction Idea](./204_idea_instruction.md)** comes in. An `Instruction` is like a recipe for good decision-making. It's like a mental checklist that helps the computer choose the right `Plan` for a situation and gives it helpful tips while it's running the plan. An `Instruction` adds wisdom and reasoning to the project, making sure that both the big-picture strategy and the small moment-to-moment actions are smart and follow the right principles.

> Sidenote: An `Instruction` provides guidance *on top of* a `Plan`. [204: Idea/Instruction](./204_idea_instruction.md)