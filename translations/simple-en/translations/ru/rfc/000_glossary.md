# A List of Key Words

This document explains the main words used in the Idea Protocol and other systems connected to it.

- **Idea**: An `Idea` is like a smart, self-contained Lego brick of knowledge. It's made of three parts: a `schema` (the rules or blueprint), a `solution` (the instructions), and a `context` (the background story). Unlike a one-time command you give a computer, an `Idea` sticks around and remembers what it is.

  > Sidenote:
  >
  > - [101: Concept/Idea](./101_concept_idea.md)

- **Ideator**: An `Ideator` is an `Idea` that can do something. Think of it like a little machine. You give it an input (information in), and it transforms it into an output (information out). It’s an `Idea` with a job to do.

  > Sidenote:
  >
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- **Idea Transformer**: This is a special kind of `Ideator`. Instead of working with simple information, its job is to take a whole other `Idea` as its input and change it into a new one. It's a machine that upgrades or customizes other smart Lego bricks.

  > Sidenote:
  >
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- **Input Message**: This is the note you attach to an `Idea` to turn it into an `Ideator`. It’s like putting an "IN" tray on a desk. The note explains what kind of information the `Ideator` expects to receive.

  > Sidenote:
  >
  > - [007: Agent/Input](./007_agent_input.md)

- **Tool**: A `Tool` is like an item in a video game character's inventory; it describes something the AI can *do*, like "look up the weather" or "send a message." The AI doesn't know *how* to do it, just that it *can*. When the AI decides to use a tool, it makes a `Call`.

  > Sidenote:
  >
  > - [002: Agent/Tool](./002_agent_tool.md)

- **Activity**: If a `Tool` is the button in the game that says "look up weather," the `Activity` is the actual computer code that runs when the button is pressed. It’s the behind-the-scenes work that makes the tool actually do its job.

  > Sidenote:
  >
  > - [003: Agent/Activity](./003_agent_activity.md)

- **Call**: A `Call` is the specific order to use a `Tool`. It's not just the idea of looking up the weather; it's the command: "Use the weather `Tool` right now for the city of `London`."

  > Sidenote:
  >
  > - [004: Agent/Call](./004_agent_call.md)

- **Scope**: This tells you *where* a `Call` is handled.
  - **Inline Scope**: The AI handles the task itself, right where it is. It's like doing a job at your own desk.
  - **Module Scope**: The AI sends the task to a separate, specialized helper to do the job. It’s like asking another department for help.
    > Sidenote:
    >
    > - [004: Agent/Call](./004_agent_call.md)

- **Method**: This tells you *how* a `Call` gets done.
  - **Explicit Execution**: The task is done by a specific, predictable piece of code (an `Activity`). It's like using a calculator—you know 2+2 will always be 4.
  - **Latent Execution**: The AI figures out the answer itself using its own creative intelligence. The result is smart but might be slightly different each time, like asking someone to describe a color.
    > Sidenote:
    >
    > - [104: Concept/Latent](./104_concept_latent.md)
    >   Sidenote:
    > - [004: Agent/Call](./004_agent_call.md)

- **Module**: A `Module` is like a specialist you can call for help. It's a packaged-up set of instructions or tools that lives outside the main program. You can call on it whenever you need its specific skill.

  > Sidenote:
  >
  > - [009: Agent/Module](./009_agent_module.md)

- **Import**: This is like giving a helper just the documents they need for a specific task. Instead of giving the AI your entire library of information, an `Import` gives it only the single folder it needs to focus on and do its job.

  > Sidenote:
  >
  > - [008: Agent/Imports](./008_agent_imports.md)

- **Loop**: A `Loop` is when the AI keeps trying to solve a problem one step at a time. It does a task, looks at the result, and uses that result to figure out the next task. It keeps going in a "loop" until the job is completely finished.

  > Sidenote:
  >
  > - [005: Agent/Loop](./005_agent_loop.md)

- **State Message**: This is the AI's memory, or its scratchpad. Between each step of a `Loop`, the `State Message` holds all the important information so the AI can pick up right where it left off. It's like the current score in a game, which gets updated after every turn.

  > Sidenote:
  >
  > - [010: Agent/State](./010_agent_state.md)

- **Plan**: A `Plan` is the AI's to-do list, but smarter. It's a flowchart of all the tasks it needs to do, and it understands the correct order. For example, it knows you have to get bread and cheese *before* you can make a sandwich.

  > Sidenote:
  >
  > - [012: Agent/Plan](./012_agent_plan.md)

- **Instancing**: This is like assembly-line work for the AI. Instead of solving one problem at a time, it can handle many similar problems all at once, each in its own separate workspace. Think of a chef cooking ten identical meals at the same time, each on its own plate.

  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Instance**: An `Instance` is one of the individual problems on that assembly line. It’s a single meal that the chef is cooking, with its own ingredients and timer, separate from the nine others.

  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Reactor**: A `Reactor` is like a game engine. It's a special machine that's an expert at running turn-by-turn processes. You give it the current state of a game (like where all the pieces are on a chessboard), and it figures out what the game looks like after the next move.
  > Sidenote:
  >
  > - [303: Ideator/Reactor](./303_ideator_reactor.md)