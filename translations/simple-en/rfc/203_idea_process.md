# 203: Idea/Process

> **Process Idea:** Think of this as a smart to-do list that not only holds a plan but also keeps track of its progress. It's a special kind of [Idea](./101_concept_idea.md) that knows what tools it can use (`schema`), decides on the very next step to take (`solution`), and remembers everything important like the original request, its current progress, and the last step it took (`context`).
>
> — [Glossary](./000_glossary.md)



While a [Vessel Idea](./202_idea_vessel.md) is like making a single, quick decision, a **Process Idea** is like running a whole project. It’s the digital blueprint created by the AI when it’s managing a complex task that takes multiple steps to finish. It’s a complete record of both the project’s goals and exactly how the AI plans to get there.

## The Recipe for a Plan

A `Process Idea` uses the three parts of an `Idea` to give a complete picture of a project at any given moment. This picture includes not just the AI's strategy (the `Plan`), but also all the tools it can use and the project's current status.

*   **`schema` (The Toolbox):** This lists all the available [Tools](./002_agent_tool.md) that the AI can use to build its `Plan`. It’s like a toolbox filled with everything the AI knows how to do.

*   **`solution` (The Next Step):** This is the AI's plan for what to do *right now*. It's a flowchart of actions for this specific moment, which becomes the starting point for the next moment.

*   **`context` (What's Happening Now):** This holds all the information the AI needs to make a good decision. It’s like the AI’s short-term memory.
    *   **Input Message:** The original request that started the whole project. This usually doesn't change.



    *   **State Message:** The project's current status. It holds all the live data and results from previous steps, connecting everything together.



    *   **Plan Message:** This is the confirmed plan from the *last* step. The AI can look at it and decide whether to stick with it or change course.



### Planning and Doing, All at Once

A key idea here is that planning and doing aren't separate things—they happen at the same time. Think of it like a GPS navigator in a car. It doesn't give you all 100 turns at the start of your trip. It tells you the next turn, and as you take it, it figures out the one after that. The act of figuring out the next step *is* the work happening in that moment.

This makes the system super fast and flexible. The `Plan` is a living document that can change as things happen. When the AI figures out the next `solution` (the next step), it's also checking its work, adjusting the plan, and taking action all in one go. There are no extra steps for re-planning or double-checking; it's all baked into one efficient process.



This combined approach has two big benefits. First, you can map out and test a plan even before you have real data. The AI can pretend to do each step to see if the whole workflow makes sense. Second, the AI acts like a smart adapter between steps. If one tool gives an answer in feet but the next tool needs it in meters, the AI can automatically convert it. This makes the whole system very sturdy and prevents it from breaking when things change, unlike old systems where one small error could cause everything to fail.



### How a Plan Grows Up

The `State` allows a `Plan` to mature over time, starting as a rough idea and becoming a reliable, predictable set of instructions.

1.  **Freeform Plan (The Brainstorm):** At first, the `State` has no rules. The AI has total freedom to try things out and create a plan from scratch, like sketching ideas on a whiteboard.

2.  **Specified Connections (The Blueprint):** Next, you can lock in the main pathways of the plan. This is like turning the sketch into a blueprint.
    *   **Flexible Blueprint:** You can say, "These are the main connections, but you can add small ones if you need to." This enforces the main structure but still allows for some creativity.
    *   **Rigid Blueprint:** Or you can say, "These are the ONLY connections allowed." This makes the plan very structured and strict.

3.  **Resolved Plan (The Instruction Manual):** This is the final, mature stage. The `Plan` is now a trusted recipe that gets passed along from step to step.
    *   **Happy Plan:** A plan that works perfectly for the ideal situation. It's fast and efficient but might need help if something unexpected happens.
    *   **Complete Plan:** A plan that has been tested and updated to handle common problems and different scenarios, making it extremely reliable.

This process lets a project evolve from a flexible experiment into a rock-solid, reusable system.

## Unchanging Workflows: Control, Analysis, and Growth

The real power of a `Process Idea` is that it’s unchangeable. Every time a step is completed, it creates a brand new, complete snapshot of the project's `Plan` and `State`. This leaves a perfect, permanent trail of breadcrumbs.

Imagine it like a video game that auto-saves every second. This chain of "save files" is what lets the system do amazing things.

*   **Reliable and Adaptable Action:** The step-by-step process is foolproof because each new step starts from a clean, complete "save file" of the previous one. This prevents confusion and ensures the AI is always working with the right information. The result of each step is a new `Process Idea`, moving the project forward safely.



*   **Bulletproof Control:** Because a `Process Idea` is a self-contained "save file," managing projects is very robust. You can pause a project just by saving its latest snapshot. A human supervisor can then look at that paused state and decide what to do. If they make a change, it creates a *new* `Process Idea` to resume the project, leaving the original history untouched.



*   **Perfect Time Travel:** This system lets you travel back in time. Every historical `Process Idea` is a perfect snapshot of the project at that moment. This means you can load any point in the past to review what happened, find bugs, or run experiments to see what would have happened if you had made a different choice.



*   **Consistent Work at Scale:** The snapshot system makes it easy to do the same task many times. A `Plan` can act like a template. If you have 100 invoices to process, you can apply the same `Plan` template to 100 different `State` snapshots (one for each invoice) and process them all at once, knowing you'll get a consistent result for each one.



## From a Set Plan to Smart Guidance

Once a `Process Idea` becomes a reliable, **Resolved Plan**, it's very predictable. But sometimes you need to give it special directions for a unique situation without messing up the whole plan.

That's where an **[Instruction Idea](./204_idea_instruction.md)** comes in. Think of it like a sticky note you attach to a recipe. An `Instruction` provides specific guidance for a single choice *within* the existing plan. For example, instead of changing the plan's structure, it might tell the AI, "At this specific step, double-check this one thing," or "When making this decision, prioritize speed." It lets you add a layer of smart control without breaking the reliable workflow you've already built.

