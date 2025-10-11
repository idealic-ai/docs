# A Dictionary of Big Ideas

This guide explains the main ideas you'll find in the Idea Protocol and all the things built with it.

- **Idea**: Think of an `Idea` as a smart Lego brick of knowledge. It's a single, self-contained block that has three parts: `schema` (its shape and what it connects to), `solution` (what it holds, like a color or a specific piece), and `context` (where it fits in the big picture). It’s a permanent building block, not just a temporary question you ask.

  > Sidenote:
  > - [101: Concept/Idea](./101_concept_idea.md)

- **Ideator**: An `Ideator` is an `Idea` that can do something. Imagine a vending machine. You put something in (input), and it gives you something back (output). An `Ideator` is an `Idea` that has a slot for you to give it information, and it uses that to create a new result.

  > Sidenote:
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- **Idea Transformer**: This is a special kind of `Ideator` that takes a whole `Idea` as its input. It’s like a remix machine for ideas. You can give it a complete song (one `Idea`) and it will transform it into a whole new song (another `Idea`).

  > Sidenote:
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- **Input Message**: This is the label you stick on an `Idea` to turn it into an `Ideator`. It’s like the “Insert Coin” sign on an arcade game. It tells everyone what kind of input the `Idea` is expecting to get started.

  > Sidenote:
  > - [007: Agent/Input](./007_agent_input.md)

- **Tool**: Imagine giving an AI a toolbox. A `Tool` is like the description of one of the tools inside, like “Hammer” or “Weather Checker.” The AI can’t use a real hammer, but it can look at the description and decide, “Okay, I need to use the Hammer tool for this job.”

  > Sidenote:
  > - [002: Agent/Tool](./002_agent_tool.md)

- **Activity**: If a `Tool` is the *description* of the “Weather Checker,” the `Activity` is the actual computer program that connects to the internet, finds out the weather, and reports back. It’s the real work that gets done when the AI decides to use a `Tool`.

  > Sidenote:
  > - [003: Agent/Activity](./003_agent_activity.md)

- **Call**: A `Call` is the AI actually *using* a tool for a specific job. If the `Tool` is “Check Weather,” a `Call` is the specific command: “Check Weather for **Paris** on **Friday**.” It’s the order that tells the `Activity` exactly what to do.

  > Sidenote:
  > - [004: Agent/Call](./004_agent_call.md)

- **Scope**: This is about *where* a job gets done.
  - **Inline Scope**: The job is done right here, in the current workspace.
  - **Module Scope**: The job is sent to a special, separate workshop that handles just that kind of task.
    > Sidenote:
    > - [004: Agent/Call](./004_agent_call.md)

- **Method**: This is about *how* a job gets done.
  - **Explicit Execution**: The job is done by following a precise set of instructions, like a recipe (`Activity`). The result is always predictable.
    > Sidenote:
    > - [003: Agent/Activity](./003_agent_activity.md)

  - **Latent Execution**: The job is given to a creative expert (the AI) to figure out. It’s like asking an artist to draw a cat—they use their own skill to come up with the answer.

    > Sidenote:
    > - [104: Concept/Latent](./104_concept_latent.md)

- **Module**: A `Module` is like a specialist working in a clean room. When you have a very specific task, you send it to the `Module`. It works in isolation with only the specific information you give it (`_imports`), so it doesn’t get confused. After it’s done, it sends the perfect result back.

  > Sidenote:
  > - [009: Agent/Module](./009_agent_module.md)

- **Import**: When you ask a specialist in a `Module` for help, you don't tell them everything you know. You just give them the key facts they need for the job. An `Import` is like handing them a sticky note with only the essential information, telling them, “Just focus on this.”

  > Sidenote:
  > - [008: Agent/Imports](./008_agent_imports.md)

- **Loop**: This is how an AI thinks step-by-step to solve a problem. It’s a cycle: 1. Look at the problem. 2. Decide which `Tool` to use. 3. Use the tool and see the result. 4. Look at the new situation. It repeats this “think-act-learn” cycle until the job is done.

  > Sidenote:
  > - [005: Agent/Loop](./005_agent_loop.md)

- **State Message**: This is the AI's short-term memory. In between each step of its thinking `Loop`, it writes down everything important about the current situation. It’s like the score and health bar in a video game—it gets updated after every single move.

  > Sidenote:
  > - [010: Agent/State](./010_agent_state.md)

- **Plan**: Before starting a big task, an AI can create a `Plan`. It’s not just a to-do list; it’s a flowchart that shows which steps have to happen in what order. For example, it knows you must “gather ingredients” *before* you can “bake the cake.”

  > Sidenote:
  > - [012: Agent/Plan](./012_agent_plan.md)

- **Instancing**: Imagine an AI needs to do the same task for 100 different people at once. `Instancing` is the power to handle all 100 jobs at the same time, while keeping everyone's information completely separate and organized.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Instance**: If `Instancing` is like a teacher grading 100 tests at once, an `Instance` is a single student's test paper. It has a unique name on it and its own set of answers, totally separate from everyone else's.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Reactor**: A `Reactor` is like a universal game engine. You give it the current state of any game or process (like the positions on a chessboard), and it figures out what the very next moment should look like. It’s an expert at moving any step-by-step system forward.
  > Sidenote:
  > - [303: Ideator/Reactor](./303_ideator_reactor.md)
