# 203: Idea/Process

> **Process Idea:** Think of it as a complete project folder for an AI. It holds the overall strategy ([Plan](./012_agent_plan.md)) and a live report of how it's going. Its `schema` is its list of available [Tools](./002_agent_tool.md), its `solution` is its very next move, and its `context` is all the information it needs right now: the original goal (`Input`), what's happening now (`State`), and the move it just made (`Plan`).
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

While a [Vessel Idea](./202_idea_vessel.md) is for a single, quick decision (like answering one question), a **Process Idea** is for a big, multi-step project. It's the master plan that an AI creates to get a complicated job done over time. It keeps a perfect record of everything the AI can do and the exact strategy it's using.

## The Anatomy of a Plan

A `Process Idea` uses its three main parts to give a complete snapshot of a project. This snapshot shows not just the AI's strategy (the `Plan`), but also all the tools it can use and what's happening right now.

- **`schema` (The Toolbox):** This is like the AI's toolbox or a video game character's list of special abilities. It lists every single [Tool](./002_agent_tool.md) the AI can use to build its plan.

- **`solution` (The Next Move):** This is the AI's game plan for the very next step. It's a map of exactly what it's going to do *right now*. This becomes the official plan for the next step.

- **`context` (The Cheat Sheet):** This holds all the info the AI needs to make a good decision. It has three parts:
  - **Input Message:** This is the original mission or the first command that started the whole job. It usually doesn't change.

    > Sidenote:
    > - [007: Agent/Input](./007_agent_input.md)

  - **State Message:** This is a live snapshot of what's happening right now. It holds all the current information and results from previous steps, like the score in a game or pieces on a chessboard.

    > Sidenote:
    > - [010: Agent/State](./010_agent_state.md)

  - **Plan Message:** This is the plan the AI was following just a moment ago. The AI can look at it and decide whether to stick with it or change course.

    > Sidenote:
    > - [012: Agent/Plan](./012_agent_plan.md)

### Doing and Planning at the Same Time

A key idea here is that planning and doing aren't separate steps—they happen together. In most systems, you make a plan first, and *then* you follow it. Here, the AI is like a self-driving car with a GPS that's constantly recalculating the best route based on live traffic. The planning and the driving are happening at the same time.

The act of figuring out the next move (`solution`) *is* the move itself. The plan is alive and can change; it doesn't have to be perfect from the start. The AI figures things out as it goes. In one quick thought, the AI checks if everything is okay, adjusts its plan based on new information, and takes the next action. It's super efficient because there's no separate time spent on re-planning. Acting *is* planning.

> Sidenote:
> - [004: Agent/Call](./004_agent_call.md)

This method has two cool advantages. First, you can test out a plan before you even have real work for it to do. The AI can pretend to do the steps to see if the plan makes sense. Second, the AI acts like a smart translator between steps. If one tool gives an answer in a format that the next tool doesn't understand, the AI can fix it on the fly. This stops the whole project from breaking if one little thing is off, making it very reliable.

> Sidenote:
> - [105: Concept/AI-Native](./105_concept_ai_native.md)

### How a Plan Grows Up

A plan can grow and change over time, moving from super flexible to super reliable. Think of it like learning to cook a new dish:

1.  **Freeform Plan (Just Experimenting):** At first, the plan is like a brainstorming session. The AI has total freedom to try new things and connect ideas however it wants, like a chef inventing a new recipe from scratch.

2.  **Specified Connections (Following a Recipe):** The plan gets more structure, like a recipe. There are two kinds:
    - **Open Connections:** This is like a recipe that tells you the main ingredients but lets you add your own spices. The main steps are set, but the AI still has some freedom.
    - **Closed Connections:** This is a strict recipe where you must follow every step exactly. No creativity allowed!

3.  **Resolved Plan (The Perfected Recipe):** This is the final, perfected recipe. It's a plan you can trust to work every time. It can be:
    - **Happy Plan:** This is the recipe for when everything goes perfectly.
    - **Complete Plan:** This is the expert recipe with extra notes on what to do if you burn something or an ingredient is missing. It's ready for anything.

This journey allows a project to start as a flexible idea and slowly turn into a super reliable and reusable process.

## Unchangeable Workflows: The Secret to Control, Review, and Growth

The power of a `Process Idea` comes from the fact that it never changes the past. Every time the AI takes a step, it creates a brand new snapshot of the entire project. This creates a perfect, unchangeable history, like a comic book where each panel is a frozen moment in time. This simple rule makes so many powerful things possible:

- **Reliable and Flexible Action:** Since each step starts from a clean, complete snapshot of the last, the process is super reliable. There's no confusion about what's happening, so the AI can safely decide its next move.

  > Sidenote:
  > - [005: Agent/Loop](./005_agent_loop.md)
  > - [012: Agent/Plan](./012_agent_plan.md)

- **Bulletproof Control:** A project is just a series of these snapshots. This means you can pause the project at any time, just by saving the latest one. It's like hitting the pause button in a video game. A person can look at the paused project, make changes if needed, and then create a *new* snapshot to safely restart it.

  > Sidenote:
  > - [010: Agent/State](./010_agent_state.md)

- **High-Quality Replays:** This system is like having a time machine. You can go back to any past snapshot to see exactly what happened. This is great for fixing problems or exploring "what if" scenarios by starting over from an earlier point.

  > Sidenote:
  > - [202: Idea/Vessel](./202_idea_vessel.md)

- **Doing Many Things at Once:** The snapshot approach makes it easy to run the same plan on lots of different things at the same time. It's like using a cookie cutter to make a whole batch of cookies that all turn out perfectly and predictably.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

## From a Predictable Plan to Smart Guidance

Sometimes, a plan can become so perfected and predictable that it's too rigid. You might need a way to give it special instructions without messing up the whole thing.

This is where an **[Instruction Idea](./204_idea_instruction.md)** comes in. Think of it as a special note you give to the AI. Instead of rewriting the entire playbook for a sports team, an `Instruction` is like a coach telling a player, "On this specific play, watch out for the defender on the left." It adds a layer of smart guidance to a solid plan, helping the AI make better choices without breaking the reliable structure.

> Sidenote:
> - [204: Idea/Instruction](./204_idea_instruction.md)
