# Glossary of Terms

This document explains the key ideas used in the Idea Protocol and the systems built around it.

- **Idea**: Imagine a recipe card. It's a complete, self-contained piece of knowledge made of three parts: a list of ingredients (`schema`), the cooking instructions (`solution`), and some extra notes and tips (`context`). It’s not just a short command, but a whole, saved “unit of knowledge.”

  > Sidenote:
  >
  > - [101: Concept/Idea](./101_concept_idea.md)

- **Ideator**: This is like an interactive recipe with a blank space you need to fill in. For example, “Choose a filling: ____.” It waits for your `input` to do something. Technically, it's an `Idea` that takes in some data and turns it into a result.

  > Sidenote:
  >
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- **Idea Transformer**: This is a special `Ideator` that doesn’t just take a word as its “filling,” but a whole other `Idea` (another whole recipe card). For example, you could give it a recipe for a normal cake, and it would change it into a recipe for a vegan cake. It modifies and improves other ideas.

  > Sidenote:
  >
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- **Input Message**: This is that “blank space” in the interactive recipe. It's a part of the context that says, “I’m waiting for you to give me this type of information.” This message is what turns a regular `Idea` into an `Ideator`.

  > Sidenote:
  >
  > - [007: Agent/Input](./007_agent_input.md)

- **Tool**: Think of a button on a video game controller, like “Jump.” The button itself isn’t the jump; it’s just a description of something you *can* do. An Artificial Intelligence (AI) sees this “tool” and understands that it can “press” it to make something happen. The AI uses the tool by creating a `Call` with specific details.

  > Sidenote:
  >
  > - [002: Agent/Tool](./002_agent_tool.md)

- **Activity**: Now, *this* is the actual program that makes the character jump when the AI “presses the button.” It's the real, working code that performs the action in the real world, like searching for something online or saving a file. The `Activity` is what the `Tool` only promises to do.

  > Sidenote:
  >
  > - [003: Agent/Activity](./003_agent_activity.md)

- **Call**: This is the moment of “pressing the button.” It’s not just thinking about jumping, but the specific command: “Jump now!” If the `Tool` is “find a picture,” then the `Call` is “find a picture of a ginger cat.” It's a clear order of *what needs to be done*.

  > Sidenote:
  >
  > - [004: Agent/Call](./004_agent_call.md)

- **Scope**: This is the place where a `Call` gets done.
  - **Inline Scope**: The command is done right here, right now. You press “jump,” and your character jumps instantly.
  - **Module Scope**: The command is given to someone else to handle. You press a button that sends a robot helper to another room to get something for you. The task is handled by a separate specialist.
    > Sidenote:
    >
    > - [004: Agent/Call](./004_agent_call.md)

- **Method**: This is the way a `Call` gets done.
  - **Explicit Execution**: The result is predictable, like a calculator. It’s carried out by an `Activity` (code), and 2+2 will always be 4.
  - **Latent Execution**: The result is created by the AI’s imagination. It’s like asking a friend to draw a cat. You’ll get a cat, but it will be a little different every time. The AI invents the result itself.
    > Sidenote:
    >
    > - [104: Concept/Latent](./104_concept_latent.md)
    >   Sidenote:
    > - [004: Agent/Call](./004_agent_call.md)

- **Module**: This is that “robot helper” or “specialist.” It's a ready-to-use piece of logic (it could be an `Activity` or an `Idea`) that you can call on to solve specific problems. You don't know how it works, you just ask it to do something, and it brings you the result.

  > Sidenote:
  >
  > - [009: Agent/Module](./009_agent_module.md)

- **Import**: This is like a note you give to your helper. Before it starts working, you hand it a sticky note that says, “Important: the car has to be blue.” An `Import` gives the helper only the information from the main project that it needs to do its specific job.

  > Sidenote:
  >
  > - [008: Agent/Import](./008_agent_imports.md)

- **Loop**: Imagine a turn-based game. You make a move (a `Request`), see what happened in response (the game creates a `Call`), check out the new situation, and then make your next move. You keep repeating this `Loop` over and over until you reach your goal.

  > Sidenote:
  >
  > - [005: Agent/Loop](./005_agent_loop.md)

- **State Message**: This is like a save file in a game. After every turn (or `tick` of the loop), this message records everything: your health, your items, your location on the map. It's the memory of what’s happening so the next turn can start from the right place.

  > Sidenote:
  >
  > - [010: Agent/State](./010_agent_state.md)

- **Plan**: This is like a walkthrough for a level in a game. First, use “Tool: Get Key.” Once you have the key, use “Tool: Open Door.” It's a map of actions, showing what to do and in what order.

  > Sidenote:
  >
  > - [012: Agent/Plan](./012_agent_plan.md)

- **Instancing**: This is the ability to play many games of chess at the same time. You are a single agent, but you are managing lots of independent games (`instances`), and each one has its own board (`state object`). `Instancing` is the process of handling all of these separate games at once.

  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Instance**: This is one specific chessboard in your simultaneous match. It has its own unique ID number and its own layout of pieces, separate from all the other boards.

  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Reactor**: This is like a universal engine for turn-based games. It doesn't care if you're playing chess or checkers. You give it the current state of the board (an `Idea`), it processes the rules, and it gives you back the new state of the board after the turn is over (a new `Idea`).
  > Sidenote:
  >
  > - [303: Ideator/Reactor](./303_ideator_reactor.md)