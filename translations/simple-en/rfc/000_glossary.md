# Glossary of Terms

This page explains the main words we use in the Idea Protocol. Think of it as a dictionary for our project.

- **Idea**: The basic building block of knowledge in our system. Instead of being a temporary command, it's a permanent, self-contained package of information with three parts: a blueprint (`schema`), a final answer (`solution`), and the background story (`context`).

  > Sidenote:
  > - [101: Concept/Idea](./101_concept_idea.md)

- **Ideator**: An `Idea` that is built to do a job. Think of it like a machine or a function: you give it some information (input), and it does something to give you a result (output).

  > Sidenote:
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- **Idea Transformer**: A special kind of `Ideator` that takes another `Idea` as its input. It’s like a tool designed to change or upgrade other `Ideas`.

  > Sidenote:
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- **Input Message**: The specific instruction that tells an `Idea` what kind of information it should expect. Giving an `Idea` an `Input Message` is what turns it from a simple piece of information into an active `Ideator`.

  > Sidenote:
  > - [007: Agent/Input](./007_agent_input.md)

- **Tool**: A description of a capability or an action an AI agent can perform. It's like an item on a menu given to the AI. The AI doesn't perform the action itself; it just points to the menu item and says, "I want to do this."

  > Sidenote:
  > - [002: Agent/Tool](./002_agent_tool.md)

- **Activity**: The actual code that runs when an AI decides to use a `Tool`. If a `Tool` is a button on a controller, the `Activity` is the set of wires and circuits that make the button actually do something in the game.

  > Sidenote:
  > - [003: Agent/Activity](./003_agent_activity.md)

- **Call**: The specific moment an AI decides to use a `Tool`. It’s the action of pressing the button, with all the details filled in. It’s the command to *do the thing* now.

  > Sidenote:
  > - [004: Agent/Call](./004_agent_call.md)

- **Scope**: This decides *where* a `Call` happens.
  - **Inline Scope**: The `Call` is handled right here, within the AI's current thought process.
  - **Module Scope**: The `Call` is sent to a separate, specialized helper to handle the job in a clean environment.
    > Sidenote:
    > - [004: Agent/Call](./004_agent_call.md)

- **Method**: This decides *how* a `Call` gets done.
  - **Explicit Execution**: The `Call` is completed by a predictable, pre-written piece of code (an `Activity`). It's like using a calculator – you always get the same answer for 2+2.

    > Sidenote:
    > - [003: Agent/Activity](./003_agent_activity.md)

  - **Latent Execution**: The `Call`'s result is imagined or created by the AI model itself. It's more like asking an artist to draw a picture – the result is creative and might be different each time.

    > Sidenote:
    > - [104: Concept/Latent](./104_concept_latent.md)

- **Module**: A separate, isolated workshop where a task can be performed. When a job is sent to a `Module`, it's done in a clean room, so it doesn't get mixed up with anything else. It can only use the specific information it was given.

  > Sidenote:
  > - [009: Agent/Module](./009_agent_module.md)

- **Import**: A piece of information borrowed from the main context and given to a task. It’s like giving a worker a specific tool or a piece of data from your desk so they can do their job, without giving them access to everything on your desk.

  > Sidenote:
  > - [008: Agent/Imports](./008_agent_imports.md)

- **Loop**: The cycle of work an agent performs to reach a goal. The agent makes a request, gets a `Call` back, performs the action, and uses the result to decide on its next request. It keeps doing this until the job is finished.

  > Sidenote:
  > - [005: Agent/Loop](./005_agent_loop.md)

- **Evolution**: The process where a system built with AI can learn and improve on its own over time. It can change its own rules, tools, and behaviors based on new information or feedback, much like a living thing adapts to its environment.

  > Sidenote:
  > - [106: Concept/Evolution](./106_concept_evolution.md)

- **State Message**: A piece of information in the AI's memory that helps it remember things between steps. It’s like a sticky note that the AI keeps, reminding it of the current score in a game or what it was doing a moment ago.

  > Sidenote:
  > - [010: Agent/State](./010_agent_state.md)

- **Process Idea**: A special `Idea` that holds a complete plan and tracks its progress. Think of it as a project manager's clipboard: it holds the list of available tools (`schema`), the updated to-do list for right now (`solution`), and all the background notes (`context`).

  > Sidenote:
  > - [012: Agent/Plan](./012_agent_plan.md)

- **Vessel Idea**: A special `Idea` that holds a complete set of possible actions and also remembers the specific action that was chosen. It’s like a game controller (`schema`) that lists all possible moves, while also recording the exact button combo (`solution`) the player just used.

  > Sidenote:
  > - [202: Idea/Vessel](./202_idea_vessel.md)

- **Instancing**: The ability to handle many different tasks or users at the same time, all within a single request. It’s like a chess master playing against 20 people at once, keeping track of each individual game separately.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Instance**: One single, separate task within an `Instancing` operation. In the chess example, each individual game and its board position is one `Instance`.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Reactor**: A special `Idea Transformer` that acts as a universal engine for turn-based games or processes. You give it the current state of the game (`Idea`), and it gives you back the next state of the game (`Idea`).

  > Sidenote:
  > - [303: Ideator/Reactor](./303_ideator_reactor.md)

- **Variable Reference**: A special code (like `†state.score`) that acts like a pointer. It lets an agent take the result from one tool and use it as the input for another. It’s like saying, “Take whatever number is on the scoreboard and plug it into this calculator.”
