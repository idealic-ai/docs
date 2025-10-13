# 203: Idea/Process

> **Process Idea:** Think of this as a smart project plan. It's a special kind of [Idea](./101_concept_idea.md) that holds both the strategy ([Plan](./012_agent_plan.md)) for a task and keeps track of how it's going. Its `schema` is its list of available tools, its `solution` is the *new* plan for the very next step, and its `context` holds the original goal, the current status, and the plan from the last step.
>
> — [Glossary](./000_glossary.md)



While a [Vessel Idea](./202_idea_vessel.md) is for making one quick decision, a **Process Idea** is for managing a whole project with many steps. It's the file the AI creates to handle a complicated job over time. This makes it a complete diary of the project, showing every tool the AI could use and every decision it made along the way.

## The Parts of a Plan

A `Process Idea` uses its three main parts to give a complete snapshot of a project. This snapshot includes the AI's strategy (the `Plan`), its toolbox of abilities, and the current status.

- **`schema` (The Toolbox):** This lists all the available [Tools](./002_agent_tool.md) the AI can use to build its `Plan`. It's like an artist's palette, showing every color they're allowed to paint with.

- **`context` (What's Happening Now):** This holds all the information the AI needs to plan and perform the next step.
  - **Input Message:** The original mission or request that started the whole process. This usually stays the same from beginning to end.



  - **State Message:** This is the live, changing data for the project. Think of it like a shared notepad that keeps track of all the variables and results, connecting one step to the next.



  - **Plan Message:** This message holds the plan from the *previous* step. The AI can look at it to decide if it should stick to the plan or make a change.



- **`solution` (The New Plan):** This is a map of actions, called `Calls`, that represents the AI's chosen strategy for the *current* step. This map becomes the `Plan Message` for the next step.

### Planning and Doing, All at Once

A really cool thing about this system is that planning and doing happen at the same time. Usually, you make a big, detailed plan first, and *then* you start working. Here, the AI plans just one step ahead and does it immediately. The very act of creating the next `solution` (the new plan) *is* the work for that step.

This makes the system super fast and flexible. The `Plan` is like a living thing that can adapt as it goes. The commands (`Calls`) that the AI creates are both the blueprint for the next step and the actions themselves. With a single thought, the AI can check its work, change the plan based on new information, and take the next step. There's no waiting around for a separate review meeting; doing the work *is* planning and checking, all rolled into one.



This combined approach gives us two big advantages. First, you can create and test a `Plan` just by looking at its toolbox (`schemas`), even before you have any real data. The AI can pretend to do each step, letting you design and check complicated projects from the start. Second, the AI acts like a smart adapter between steps. If one step produces an answer that doesn't quite fit what the next step needs, the AI can smooth it over. This makes the whole system much more stable and prevents the kind of chain-reaction failures you see in rigid, old-fashioned systems.



### How a Plan Can Grow Up

The `State` notepad lets a `Plan` mature through three stages, starting as a flexible idea and growing into a reliable, predictable process:



1.  **Freeform Plan:** At the start, the plan is like a brainstorming session on a blank whiteboard. The AI has total freedom to figure out a `Plan` by creating new connections and ideas as it works.

2.  **Specified Connections:** The next stage is like turning the whiteboard sketch into a blueprint. You lock in the main pathways for information. You can do this in two ways:
    - **Open Connections:** You can set the main paths but still allow the AI to add new, smaller connections if it needs to for unusual situations.
    - **Closed Connections:** You can lock the blueprint down completely, forcing the AI to follow the exact paths you designed.

3.  **Resolved Plan:** This is the final stage, when a plan is fully grown and predictable. This `Resolved Plan` becomes the official plan that's passed to the next step. It can be:
    - **Happy Plan:** A plan that works perfectly for the ideal, "happy day" scenario. It's super efficient but might need to change if something unexpected happens.
    - **Complete Plan:** A super-reliable plan that has learned over time to handle common problems and has backup routes, making it very dependable.

This process lets a `Process Idea` go from a rough draft to a trustworthy and reusable tool.

## Never-Changing Workflows: How to Organize, Analyze, and Grow

The secret power of a `Process Idea` is that it never changes the past. Every time a step is completed, the system saves a new, perfect snapshot of the entire `Plan` and `State`. This chain of unchangeable records is what allows for the system's best features.

- **Reliable, Flexible Work:** The step-by-step process is naturally reliable because each new step starts from a clean snapshot of the last one. This prevents confusion and ensures the AI's decisions are based on a clear picture of the situation. The result of each step is a new `Process Idea`, moving the project forward safely.



- **Rock-Solid Organization:** Because a `Process Idea` is a complete package, managing projects becomes incredibly sturdy. You can pause a project just by saving its latest snapshot. A human or another computer can then look at that frozen state to make decisions. Any changes, like updating the plan, create a *new* `Process Idea`, letting the project continue without messing up the historical record.



- **High-Quality Replays:** This system is like having a time machine for your project. Every past `Process Idea` is a perfect snapshot of the project at that moment. This lets you load any point in the project's history to check what happened, figure out tricky problems, or even try out "what-if" scenarios by starting a new branch from that point.



- **Doing Many Tasks at Once:** The snapshot system is great for handling huge jobs. Imagine you have to do the same task 1,000 times with small differences. The system treats each task as its own separate job with its own private `State` snapshot. A single `Plan` acts as the master template for all of them. In one go, the AI plans the next step for all 1,000 tasks at the same time, making sure they all follow the same strategy while handling their unique details. This is way faster and ensures everything is done consistently.



## From a Set Plan to Smart Guidance

A `Process Idea` can grow into a **Resolved Plan**—a very predictable and reliable set of steps. While that's great for stability, it can sometimes be too rigid. The system needs a way to add smart, situation-specific advice without having to rewrite the whole plan.

This is where an **[Instruction Idea](./204_idea_instruction.md)** comes in. Think of it as a coach giving tips to a player during a game. The player already knows the playbook (the `Plan`), but the coach gives them a "mental checklist" or strategy to help them make smarter decisions in the moment. An `Instruction` helps improve the *reasoning* of the AI, making sure that both its big-picture strategy and its small moment-to-moment choices are the right ones.

