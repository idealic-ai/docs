# A Dictionary of Our Terms

This page explains the main words we use in the Idea Protocol and all the systems connected to it.

- **Idea**: Think of an Idea as a smart LEGO brick. It's a small, self-contained package of knowledge that has three parts: a `schema` (the instructions, or what it *can* be), a `solution` (the final build, or what it *is*), and `context` (notes on how it was built). It’s not just a passing thought; it's a permanent, real thing a computer can work with.

  > Sidenote: [101: Concept/Idea](./101_concept_idea.md)

- **Ideator**: This is an Idea that’s waiting for your help. It’s like a Mad Libs story or a function in math class (`y = x + 2`). It has a blank space, called an `input`, and it needs you to fill it in to produce a result. It turns a static piece of knowledge into an active function that can do something.

  > Sidenote: [103: Concept/Ideator](./103_concept_ideator.md)

- **Idea Transformer**: This is a special kind of Ideator that takes an entire *Idea* as its input. Imagine a machine that doesn't just take flour and sugar, but takes a whole cake recipe and turns it into a cookie recipe. It transforms one kind of knowledge into another.

  > Sidenote: [103: Concept/Ideator](./103_concept_ideator.md)

- **Input Message**: This is the part of an Idea that has the blank space, officially telling the world, "I need input!" It defines what kind of information it's waiting for. It's what turns a simple `Idea` into an active `Ideator`.

  > Sidenote: [007: Agent/Input](./007_agent_input.md)

- **Tool**: Think of this as describing a superpower an AI agent can have. It’s like a card that says "Ability: Fly" but doesn't say where to fly. It just tells the AI, "Here's a power you possess and what you need to know to use it." It’s a blueprint for an action.

  > Sidenote: [002: Agent/Tool](./002_agent_tool.md)

- **Activity**: If a `Tool` is the *idea* of having a superpower, the `Activity` is the real-world code that makes it happen. It's the engine that makes the car go or the code that actually connects to the internet to get the weather. It’s the behind-the-scenes work that performs the action.

  > Sidenote: [003: Agent/Activity](./003_agent_activity.md)

- **Call**: This is the moment the AI decides to use one of its `Tools`. It’s the specific command, like "Use the 'get weather' tool for London." It’s not just the blueprint for the action; it’s the decision to *perform* the action right now with specific details.

  > Sidenote: [004: Agent/Call](./004_agent_call.md)

- **Scope**: This is *where* an action, or `Call`, happens.
  - **Inline Scope**: The action is handled right here, in the middle of the current thought process.
  - **Module Scope**: The action is sent off to a separate, clean workspace to be handled, so it doesn't mess with the current one.
    > Sidenote: [004: Agent/Call](./004_agent_call.md)

- **Method**: This is *how* an action gets done.
  - **Explicit Execution**: The action is performed by real, predictable code (an `Activity`). It will do the exact same thing every time, like a simple calculator.

    > Sidenote: [003: Agent/Activity](./003_agent_activity.md)

  - **Latent Execution**: The action is performed by an AI's imagination. The result isn't guaranteed to be identical every time, but it will be a creative and intelligent response. It's like asking a person to draw a cat instead of using a cat stencil.

    > Sidenote: [104: Concept/Latent](./104_concept_latent.md)

- **Module**: This is like a special, isolated workshop. When a task needs to be done without any distractions, you can send it to a `Module`. It gets a clean room to work in and is only given the specific tools and information (`Imports`) it needs, so it can't accidentally mess up the main project.

  > Sidenote: [009: Agent/Module](./009_agent_module.md)

- **Import**: This is like giving a specific tool or piece of information to someone working in that separate workshop (`Module`). Instead of giving them the whole toolbox, you just hand them the one screwdriver they need. This helps the AI focus on exactly what's important for the task.

  > Sidenote: [008: Agent/Imports](./008_agent_imports.md)

- **Loop**: This is how an agent thinks and works towards a goal. It's a cycle: the agent makes a request, gets back a `Call` (an action to perform), does the action, and then uses the result to figure out the next step. It keeps doing this, looping over and over, until the job is done.

  > Sidenote: [005: Agent/Loop](./005_agent_loop.md)

- **Evolution**: This is the process of the AI system learning and improving itself over time. It's not just about getting better at a task, but about actually changing its own structure and abilities to become smarter and more capable, all on its own.

  > Sidenote: [106: Concept/Evolution](./106_concept_evolution.md)

- **State Message**: This is the agent's memory. It’s a special message that holds onto important information between steps in its thinking `Loop`. This way, it doesn't forget what it was doing from one moment to the next.

  > Sidenote: [010: Agent/State](./010_agent_state.md)

- **Process Idea**: Think of this as the AI's project manager. It's a special `Idea` that holds the entire plan, the list of available `Tools`, the agent's current memory (`State`), and what just happened. At each step, it figures out the new plan based on all this information.

  > Sidenote: [012: Agent/Plan](./012_agent_plan.md)

- **Vessel Idea**: This is a special `Idea` that's both a rulebook and a score sheet. The rulebook (`schema`) lists all the possible moves or actions an agent could take. The score sheet (`solution`) records the exact moves the agent chose to make in a specific situation.

  > Sidenote: [202: Idea/Vessel](./202_idea_vessel.md)

- **Instancing**: This is how an agent can multitask by handling many different jobs at once. Imagine a mail-sorter handling letters for a hundred different people at the same time. Instancing lets the agent do just that, keeping each person's mail (`Instance`) separate and organized.

  > Sidenote: [011: Agent/Instancing](./011_agent_instancing.md)

- **Instance**: This is one specific job out of the many that an agent is handling at once. In the mail-sorter analogy, each person's pile of mail is a separate `Instance`, with its own address and letters.

  > Sidenote: [011: Agent/Instancing](./011_agent_instancing.md)

- **Reactor**: An `Idea Transformer` that acts like a game engine. It’s designed to take the current state of a system (like the position of all the pieces on a chessboard), and figure out the next state after one turn. It's the universal rule-keeper for turn-based interactions.
  > Sidenote: [303: Ideator/Reactor](./303_ideator_reactor.md)