# Glossary of Terms

This guide explains the main words we use in the Idea Protocol and our systems, like you're learning about them for the first time.

- **Idea**: Think of an Idea as a self-contained digital 'thought'. It's a package of three things: the rules (`schema`), the answer (`solution`), and the background story (`context`). It's a permanent building block, not a temporary question you ask an AI.

  > Sidenote: [101: Concept/Idea](./101_concept_idea.md)

- **Ideator**: This is a special `Idea` that's designed to do something. It can take information in and produce a result, like a little machine that transforms things.

  > Sidenote: [103: Concept/Ideator](./103_concept_ideator.md)

- **Idea Transformer**: A very specific type of `Ideator`. Instead of working on simple information, its job is to take a whole `Idea` as its input and change it into a new one.

  > Sidenote: [103: Concept/Ideator](./103_concept_ideator.md)

- **Input Message**: This is the message that officially turns a basic `Idea` into a working `Ideator`. It tells the `Idea` what kind of information it should expect to receive.

  > Sidenote: [007: Agent/Input](./007_agent_input.md)

- **Tool**: Imagine a list of special abilities you can give to an AI agent. Each `Tool` is a description of one of those abilities, like 'look up the weather' or 'send an email'. The AI can see this menu of tools and decide to use one.

  > Sidenote: [002: Agent/Tool](./002_agent_tool.md)

- **Activity**: This is the actual computer code that runs when a `Tool` is used. If the `Tool` is 'look up the weather', the `Activity` is the program that connects to the weather service and gets the forecast. It’s what does the real work in the outside world.

  > Sidenote: [003: Agent/Activity](./003_agent_activity.md)

- **Call**: When the AI decides to use a `Tool`, it creates a `Call`. Think of it as filling out an order form. If the `Tool` is 'send an email', the `Call` would specify the recipient, subject, and body of that email. It's a specific command to do something.

  > Sidenote: [004: Agent/Call](./004_agent_call.md)

- **Scope**: This simply means *where* a `Call` is handled.
  - **Inline Scope**: The command is handled right here, in the agent's current workspace.
  - **Module Scope**: The command is sent to a separate, specialized workshop (`Module`) to be handled there.
    > Sidenote: [004: Agent/Call](./004_agent_call.md)

- **Method**: This means *how* a `Call` is handled.
  - **Explicit Execution**: A predictable computer program (`Activity`) does the work and provides the result. You always get the same output for the same input.

    > Sidenote: [003: Agent/Activity](./003_agent_activity.md)

  - **Latent Execution**: The creative AI model (LLM) figures out the result on its own, like asking it to write a poem. The answer isn't based on a fixed program.

    > Sidenote: [104: Concept/Latent](./104_concept_latent.md)

- **Module**: A `Module` is like a separate, clean workshop. When you send a command there, it works in isolation, without being affected by what's happening in the main workspace. It can only use the specific information you give it.

  > Sidenote: [009: Agent/Module](./009_agent_module.md)

- **Import**: This is how you give a `Module` the information it needs to do its job. An `Import` is like a key that unlocks a specific piece of information from the main workspace so the isolated `Module` can use it.

  > Sidenote: [008: Agent/Imports](./008_agent_imports.md)

- **Loop**: An agent often has a goal to achieve. A `Loop` is the cycle of steps it takes: it makes a request, gets a command (`Call`) back, performs the action, and uses the result to decide on the next request. It keeps doing this until the goal is complete and it has no more commands to issue.

  > Sidenote: [005: Agent/Loop](./005_agent_loop.md)

- **State Message**: This is a message that holds the agent's memory. It contains information that needs to be remembered from one step of the `Loop` to the next, like a sticky note that keeps track of what’s going on.

  > Sidenote: [010: Agent/State](./010_agent_state.md)

- **Process Idea**: This is a special `Idea` that acts as the agent's brain for a single step. It holds the library of available `Tools`, the agent’s current `Plan` for what to do next, and the context (like the input and its memory) needed to make that decision.

  > Sidenote: [012: Agent/Plan](./012_agent_plan.md)

- **Vessel Idea**: This `Idea` is like a complete record of a single reaction. It knows all the possible actions (`Tools`) it could have taken, and it also records the specific action (`Call`) it actually chose in response to a situation.

  > Sidenote: [202: Idea/Vessel](./202_idea_vessel.md)

- **Instancing**: This is a fancy word for handling many different tasks all at once in a single request. Imagine having one agent that's simultaneously managing conversations with 100 different people. `Instancing` is the process that keeps each conversation separate and organized.

  > Sidenote: [011: Agent/Instancing](./011_agent_instancing.md)

- **Instance**: An `Instance` is one of those individual tasks from the example above. It's one person's conversation, with its own unique memory and context, that is being handled as part of a larger batch.

  > Sidenote: [011: Agent/Instancing](./011_agent_instancing.md)

- **Reactor**: A `Reactor` is a universal engine for running turn-based interactions, like a game or a step-by-step process. It's an `Idea Transformer` that takes the current state of the game (`Idea`) and figures out the next state (`Idea`).
  > Sidenote: [303: Ideator/Reactor](./303_ideator_reactor.md)