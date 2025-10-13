# A Guide to Big Words

This page explains the main words we use for the Idea Protocol and how it all works.

- **Idea**: Think of an `Idea` as a smart Lego brick. It's a little package of information that has everything it needs inside. It has three parts: a `schema` (what the brick is about), a `solution` (the final answer or result), and a `context` (the story of how it got there). It's a permanent building block, not just a temporary question you ask a computer.

  > Sidenote:
  > - [101: About Ideas](./101_concept_idea.md)

- **Ideator**: This is an `Idea` that can do something. It's a Lego brick that's waiting for you to add another piece. For example, an `Idea` might be a finished cake. An `Ideator` is the *recipe* for the cake—it's waiting for ingredients (your input) to make something new.

  > Sidenote:
  > - [103: About Ideators](./103_concept_ideator.md)

- **Idea Transformer**: This is a special kind of recipe (`Ideator`) that uses another finished dish (`Idea`) as one of its ingredients. Imagine you have a recipe for cake pops, which needs an already-baked cake to start. That recipe is an `Idea Transformer`.

  > Sidenote:
  > - [103: About Ideators](./103_concept_ideator.md)

- **Input Message**: These are the ingredients you give to an `Ideator` (the recipe). It's the specific information it needs to start working.

  > Sidenote:
  > - [007: Agent/Input](./007_agent_input.md)

- **Tool**: Think of a `Tool` like a spell description in a video game's spellbook. It tells an AI agent what it's capable of doing (like "send an email" or "find a picture"). The AI reads this description to understand its powers. When the AI decides to use a power, it creates a `Call`.

  > Sidenote:
  > - [002: Agent/Tool](./002_agent_tool.md)

- **Activity**: This is the actual computer code that makes a `Tool` work. If the `Tool` is the spell description, the `Activity` is the magic that actually makes the fireball appear on the screen. It's the real-world action.

  > Sidenote:
  > - [003: Agent/Activity](./003_agent_activity.md)

- **Call**: A `Call` is the moment the AI decides to use a `Tool`. It's not just knowing about the spell; it's the command to "Cast Fireball now!" with a specific target. It's an order to do something.

  > Sidenote:
  > - [004: Agent/Call](./004_agent_call.md)

- **Scope**: This tells you *where* a `Call` happens.
  - **Inline Scope**: The action happens right here, in the same place. The agent does the job itself.
  - **Module Scope**: The action is sent to a separate, clean workspace to be completed. This is like asking someone in another room to handle a task for you so it doesn't get mixed up with your other work.
    > Sidenote:
    > - [004: Agent/Call](./004_agent_call.md)

- **Method**: This tells you *how* a `Call` gets done.
  - **Explicit Execution**: The result is figured out by a normal computer program (`Activity`). It's predictable, like using a calculator—you always get the same answer for 2+2.

    > Sidenote:
    > - [003: Agent/Activity](./003_agent_activity.md)

  - **Latent Execution**: The result is figured out by the AI's own brain. It's more like asking a person a question—it's creative but might not always be the exact same answer twice.

    > Sidenote:
    > - [104: About Latent Space](./104_concept_latent.md)

- **Module**: A special, isolated workspace. When you need a job done perfectly without any distractions, you send it to a `Module`. It gets only the information it needs, does the work, and sends back the result.

  > Sidenote:
  > - [009: Agent/Module](./009_agent_module.md)

- **Import**: This is the act of giving a `Module` only the specific information it needs for a job. Instead of giving it your whole toolbox, you just hand it the one screwdriver it needs. This helps the AI focus on the task at hand.

  > Sidenote:
  > - [008: Agent/Imports](./008_agent_imports.md)

- **Loop**: This is how an agent keeps working on a problem until it's finished. It takes a step, looks at the result, and uses that result to figure out the next step. It repeats this cycle (or `Loop`) until the goal is reached.

  > Sidenote:
  > - [005: Agent/Loop](./005_agent_loop.md)

- **State Message**: This is the agent's memory. It's a note the agent writes to itself after each step in a `Loop` that says, "This is where I am now." This helps it remember its progress and what to do next.

  > Sidenote:
  > - [010: Agent/State](./010_agent_state.md)

- **Plan Idea**: This is a blueprint or a reusable set of instructions for a big task. Think of it like an IKEA manual before you've started building. It shows all the steps, but none of them have been done yet.

  > Sidenote:
  > - [012: Agent/Plan](./012_agent_plan.md)

- **Process Idea**: This is a `Plan Idea` that you're currently working on. It's the IKEA manual with your finger on Step 3, with the first few pieces already assembled. It's the plan plus your current progress.

  > Sidenote:
  > - [012: Agent/Plan](./012_agent_plan.md)

- **Vessel Idea**: Think of this as a superhero's utility belt. The `schema` is all the cool gadgets and tools the hero *could* use. The `solution` is the specific gadget the hero actually chose to use in a situation. It holds both the possibilities and the final choice.

  > Sidenote:
  > - [202: Idea/Vessel](./202_idea_vessel.md)

- **Instancing**: This is a way to do the same job for many different people at once, without getting them mixed up. Imagine a teacher grading homework for 20 kids. She's doing the same task ("grading"), but she keeps each student's paper and score separate. `Instancing` is the system that lets the computer do that.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Instance**: In the homework example, an `Instance` is one student's paper. It's a single, unique case that's part of a larger batch of work.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Reactor**: This is a powerful engine designed to run games or other step-by-step processes. You give it the current state of the game (like where all the pieces are on a chessboard), and it figures out the next best move and gives you back the board's new state. It runs the game, one turn at a time.
  > Sidenote:
  > - [303: Ideator/Reactor](./303_ideator_reactor.md)
