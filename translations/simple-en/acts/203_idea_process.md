# 203: Idea/Process

> [!DEFINITION] Process Idea
> A self-contained Idea that holds both a strategic Plan and the live progress of that plan. Think of it like a smart recipe: its `schema` is the list of all possible ingredients and kitchen tools you can use, its `solution` is the *next* step you're going to take, and its `context` contains the original request, your current messy countertop (the State), and the step you just finished.

> Sidenote:
> - Requires:
>   - [101: Concept/Idea](./101_concept_idea.md)
>   - [010: Agent/Plan](./010_agent_plan.md)
>   - [009: Agent/State](./009_agent_state.md)
>   - [007: Agent/Input](./007_agent_input.md)
> - Complemented by:
>   - [011: Agent/Instancing](./011_agent_instancing.md)

While a [Vessel Idea](./202_idea_vessel.md) is like a single, quick reaction, a **Process Idea** is a whole project with multiple steps. It’s the artifact created by the system's planner as it manages a complex task over time. This makes it a complete diary of both the tools the AI had and the strategy it chose to use.

## The Anatomy of a Plan

A `Process Idea` uses its three main parts to give a complete snapshot of a workflow. This picture includes not just the AI's strategy (the `Plan`), but also all the tools it could have used and the live status of the project.

- **`schema` (The Toolbox):** This defines the library of all available **Tools** the AI can use to build a `Plan`. It’s a list of everything the AI is capable of doing.

- **`context` (The Current Situation):** This holds all the information the AI needs to plan and perform the current step.
  - **Input Message:** The original command that started the whole process. This usually stays the same from beginning to end.

    > Sidenote:
    > - [007: Agent/Input](./007_agent_input.md)

  - **State Message:** This is the live, changing data for the workflow. Think of it as a scratchpad where the AI keeps its notes and the results of previous steps. These notes connect one action to the next.

    > Sidenote:
    > - [009: Agent/State](./009_agent_state.md)

  - **Plan Message:** This message contains the confirmed plan from the *previous* step, which the AI can decide to stick with or change.

    > Sidenote:
    > - [010: Agent/Plan](./010_agent_plan.md)

- **`solution` (The New Plan):** This is the AI's strategic decision for the *current* step. It's a flowchart of actions to take right now. This then becomes the `Plan Message` for the next step.

### The Unity of Planning and Execution

A key idea here is that planning and doing happen at the same time. In many systems, you first make a complete plan, and then you follow it. Here, the very act of figuring out the next step *is* the next step.

This makes the system very fast and flexible. The AI doesn't need a perfect, finished plan to start working. It can have a rough draft, see the results from the last step, and adjust its plan on the fly. When the AI generates the next action, it's simultaneously checking its work, updating its strategy, and executing the next part of the task. There's no separate, time-consuming step for re-planning; it all happens in one go.

> Sidenote:
> - [004: Agent/Call](./004_agent_call.md)

This combined approach gives two big advantages. First, you can design and test a complex workflow just by giving the AI the list of its tools, even before you have real data. The AI can "pretend" to run each step to see if the plan makes sense. Second, the AI acts like a smart adapter between steps. If one tool produces an output that doesn't quite fit what the next tool needs, the AI can smooth over the difference. This makes the whole system incredibly stable and prevents the small errors that would crash a more rigid system.

> Sidenote:
> - [105: Concept/AI-Native](./105_concept_ai_native.md)

### The Flexibility Spectrum of a Plan

The `State` object allows a `Plan` to grow up, starting as a flexible brainstorm and hardening into a predictable, reliable process:

> Sidenote:
> - [009: Agent/State](./009_agent_state.md)

1.  **Freeform Plan:** At the start, the `State` can be like a blank whiteboard. This gives the AI total freedom to figure out a plan by inventing new ways to connect steps as it goes.

2.  **Specified Connections:** The next stage is to pencil in the main highways of the plan. You define what the key data connections should be, but you can still allow for some flexibility:
    - **Open Connections:** You can define the main roads but still let the AI create new, smaller paths for special cases.
    - **Closed Connections:** You can lock down the plan, forcing the AI to stick exactly to the predefined roads and not build any new ones.

3.  **Resolved Plan:** This is the final, mature stage where a plan is predictable. This **Committed Plan** is then used as the starting point for future steps. A resolved plan can be:
    - **Happy Plan:** A plan that works perfectly for the ideal, best-case scenario. It's very efficient but might need changes if something unexpected happens.
    - **Complete Plan:** A fully-developed plan that has been updated over time to handle common errors and different situations, making it super reliable.

This progression lets a `Process Idea` evolve from a rough sketch into a trustworthy, reusable machine.

## Immutable Workflows: Orchestration, Analysis, and Scaling

The real power of a `Process Idea` is that it's **immutable**, meaning unchangeable. Every step in a workflow creates a new, complete snapshot of the `Plan` and `State`, keeping a perfect, permanent record. Think of it like saving a new version of a document every time you make a change, instead of just overwriting the old one. This chain of snapshots is what makes the system's most powerful features possible.

- **Reliable, Adaptive Execution:** The step-by-step process is naturally reliable because each new step works from a complete picture of the previous one. This prevents confusion and ensures the AI's decisions are based on a clear reality. The result of each step is a new `Process Idea`, moving the project forward safely.

  > Sidenote:
  > - [005: Agent/Loop](./005_agent_loop.md)
  > - [010: Agent/Plan](./010_agent_plan.md)

- **Resilient Orchestration:** Because a `Process Idea` is a self-contained package, managing workflows is very robust. You can pause a project simply by saving its latest snapshot. A human or another system can then look at this frozen state and make decisions. Any changes, like updating the plan, create a *new* `Process Idea` that can be used to resume the project without messing up the historical record.

  > Sidenote:
  > - [009: Agent/State](./009_agent_state.md)

- **High-Fidelity Simulation:** This architecture is what makes "time travel" debugging possible. Every historical `Process Idea` is a perfect snapshot of the workflow at a specific moment. This lets users or other AIs load any point in the project's history to review what happened, figure out bugs, or run "what-if" scenarios by starting a new branch from that point.

  > Sidenote:
  > - [202: Idea/Vessel](./202_idea_vessel.md)

- **Consistent Parallel Processing:** The snapshot system allows for massive scaling. You can run one `Plan` on thousands of different tasks at once. Imagine giving one set of instructions to a huge class, where each student has their own copy of a worksheet (`State`). The AI can plan the next step for everyone simultaneously, creating customized actions for each student based on their individual progress, all in one go. This guarantees consistent results across all tasks while being incredibly efficient.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

## From a Predictable Plan to Guided Execution

A `Process Idea` can become a **Resolved Plan**—a reliable and predictable workflow. But sometimes, being too rigid is a bad thing. The system needs a way to add expert guidance for specific situations without tearing up the trusted plan.

This is where an **[Instruction Idea](./204_idea_instruction.md)** comes in. An `Instruction` is like a coach's playbook or a set of guiding principles. It helps the workflow in two ways: it guides the AI in picking or creating the best `Plan` for the job, and it gives advice on individual choices during the plan's execution. In short, an `Instruction` adds wisdom and reasoning to the workflow, making sure both the grand strategy and the small steps align with a certain way of thinking.

> Sidenote:
> - [204: Idea/Instruction](./204_idea_instruction.md)
