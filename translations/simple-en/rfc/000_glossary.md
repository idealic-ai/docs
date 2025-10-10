# Glossary of Terms

This guide explains the big ideas behind the Idea Protocol. Think of it as a dictionary for all the special words we use.

- **Idea**: An `Idea` is like a single, smart LEGO brick. It's a basic building block that holds a piece of knowledge. It has three parts: its shape and what it is (`schema`), how it connects to other things (`solution`), and where it came from (`context`). It’s not just a temporary thought—it’s a solid thing that you can use again and again.

  > Sidenote:
  >
  > - [101: Concept/Idea](./101_concept_idea.md)

- **Ideator**: An `Ideator` is an `Idea` that can do something. If an `Idea` is a LEGO brick, an `Ideator` is like a little LEGO machine you build. You give it some kind of input (like a push), and it gives you an output (like rolling forward). It’s an `Idea` that turned into a “doer.”

  > Sidenote:
  >
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- **Idea Transformer**: This is a special kind of `Ideator` that takes a whole `Idea` as its input and changes it into another `Idea`. Imagine a LEGO factory machine. You dump a bunch of single LEGO bricks (`Idea`) in one end, and it assembles them into a finished spaceship (`another Idea`) at the other end.

  > Sidenote:
  >
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- **Input Message**: This is the instruction manual that tells an `Idea` that it can now accept inputs, turning it into an `Ideator`. Think of a vending machine. At first, it's just a box (`Idea`). But when you add a coin slot (`Input Message`), it now knows what to do when someone puts a coin in. The slot defines what kind of input it's waiting for.

  > Sidenote:
  >
  > - [007: Agent/Input](./007_agent_input.md)

- **Tool**: A `Tool` is like an item in a video game character's inventory. It describes something the character *can* do, like “Use Health Potion” or “Cast Spell.” The AI agent looks at its list of tools to decide what action it wants to take next.

  > Sidenote:
  >
  > - [002: Agent/Tool](./002_agent_tool.md)

- **Activity**: An `Activity` is the actual computer code that runs when a `Tool` is used. If the `Tool` is the “Use Health Potion” button in the game, the `Activity` is the code that makes the health bar actually go up. It’s the real work happening behind the scenes, especially for things like connecting to the internet or getting data.

  > Sidenote:
  >
  > - [003: Agent/Activity](./003_agent_activity.md)

- **Call**: A `Call` is the specific command to use a `Tool`. It's not just thinking about using a potion; it's the moment the AI says, “Use the *big red health potion* right now!” It’s the decision to act.

  > Sidenote:
  >
  > - [004: Agent/Call](./004_agent_call.md)

- **Scope**: This tells you *where* a `Call` happens.
  - **Inline Scope**: This is like asking a friend who is standing right next to you to do something. They handle it right there on the spot.
  - **Module Scope**: This is like asking your friend to order a pizza. Your friend doesn’t make the pizza—they pass the request to an expert (the pizza place), who handles it and gives back the result.
    > Sidenote:
    >
    > - [004: Agent/Call](./004_agent_call.md)

- **Method**: This tells you *how* a `Call` gets done.
  - **Explicit Execution**: This is like using a calculator. You type `2 + 2`, and it follows exact rules to always give you `4`. The result is totally predictable because it's based on precise code (`Activity`).
  - **Latent Execution**: This is like asking a friend to draw a picture for you. You give them an idea, and they use their creativity and knowledge (like an AI model) to make it. The result is great, but it might be a little different each time.
    > Sidenote:
    >
    > - [104: Concept/Latent](./104_concept_latent.md)
    >   Sidenote:
    > - [004: Agent/Call](./004_agent_call.md)

- **Module**: A `Module` is like a specialized app on your phone. If you need to know the weather, you don't build your own weather station. You just open the weather app. A `Module` is a reusable expert that does one specific job very well.

  > Sidenote:
  >
  > - [009: Agent/Module](./009_agent_module.md)

- **Import**: When you ask for help, you usually only give the necessary information. An `Import` is like that. If you ask a friend for help with math homework, you don't give them all your school books. You just give them the math book and the page you're on. `Import` gives a `Module` just the focused info it needs to do its job.

  > Sidenote:
  >
  > - [008: Agent/Imports](./008_agent_imports.md)

- **Loop**: A `Loop` is how an AI agent thinks and acts to solve a problem. It’s a cycle: 1. Look at the problem. 2. Decide on a move. 3. Make the move. 4. Look at the problem again with the new change. It keeps doing this over and over until the problem is solved and there are no more moves to make.

  > Sidenote:
  >
  > - [005: Agent/Loop](./005_agent_loop.md)

- **State Message**: This is the agent's memory. It’s like a save file in a video game. After each turn or action (`tick of the loop`), the agent saves its progress—what it knows and what has changed. This way, it can pick up right where it left off in the next step.

  > Sidenote:
  >
  > - [010: Agent/State](./010_agent_state.md)

- **Plan**: A `Plan` is a step-by-step recipe for the AI to follow. Just like baking a cake, you have to do things in the right order—mix the ingredients *before* you put them in the oven. A plan lists all the actions (`Tool Calls`) and the order in which they must be done to reach a goal.

  > Sidenote:
  >
  > - [012: Agent/Plan](./012_agent_plan.md)

- **Instancing**: This is the process of doing the same task for many different things at once. Imagine a teacher grading tests for a whole class. The teacher is the agent, and they apply the same grading rules to every test, but each test is its own separate thing. `Instancing` is like grading the whole stack of tests in one go.

  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Instance**: If `Instancing` is grading the whole stack of tests, an `Instance` is just one single student's test paper. It has a unique name on it and its own set of answers and its own final score.

  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Reactor**: A `Reactor` is a special engine that's really good at things that happen in turns, like a game or a step-by-step process. It's like the computer opponent in a chess game. It looks at the current state of the board (`Idea`), thinks about the best move, and then makes that move to create the new board state (`next Idea`). It 