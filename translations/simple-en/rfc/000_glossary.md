# A List of Important Words

This document explains the main words we use when talking about the Idea Protocol and how it works.

- **Idea**: Imagine a single recipe card. It has three parts: `schema` (the list of ingredients you need), `solution` (the instructions for how to cook it), and `context` (a little note about the recipe, like "Grandma's favorite"). An **Idea** is like that recipe card—a complete package of knowledge that can be saved and used by a computer. It's not just a one-time question; it's a solid building block.

  > Sidenote:
  >
  > - [101: Concept/Idea](./101_concept_idea.md)

- **Ideator**: This is a special kind of **Idea** that can take in new information. Think of it like a customizable recipe. If the basic `Idea` is a recipe for a pancake, an **Ideator** is a recipe that lets you add an ingredient (like blueberries or chocolate chips) to create a new, special kind of pancake. It's an **Idea** that acts like a machine, turning an input into an output.

  > Sidenote:
  >
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- **Idea Transformer**: This is a special kind of **Ideator**. Instead of taking a simple ingredient (like "blueberries"), it takes a whole other **Idea** (like a full recipe) and changes it. Imagine a machine that can take a recipe for a simple cookie and transform it into a recipe for a fancy, decorated cookie cake.

  > Sidenote:
  >
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- **Input Message**: This is the message you send to an **Idea** to turn it into an **Ideator**. It's like a note that says, "Get ready, I'm going to give you some information to work with." It tells the **Idea** what kind of input to expect, like saying, "You'll be getting a type of fruit."

  > Sidenote:
  >
  > - [007: Agent/Input](./007_agent_input.md)

- **Tool**: Think of a **Tool** as a description of a special power an AI can use, like "Look up the weather" or "Send an email." The AI doesn't know *how* to do it, but it knows the power exists. When the AI decides it needs to use one of these powers, it makes a `Call` to activate it.

  > Sidenote:
  >
  > - [002: Agent/Tool](./002_agent_tool.md)

- **Activity**: An **Activity** is the actual computer program that does the work for a **Tool**. If the **Tool** is the power "Look up the weather," the **Activity** is the code that connects to a weather website and gets the real forecast. It’s the behind-the-scenes work that makes the **Tool** actually do something.

  > Sidenote:
  >
  > - [003: Agent/Activity](./003_agent_activity.md)

- **Call**: A **Call** is a specific order to use a **Tool**. If the **Tool** is "Send an email," a **Call** would be: "Send an email to mom@example.com with the subject 'Hi!' and the message 'Just checking in.'" It’s the command to actually *do* the thing.

  > Sidenote:
  >
  > - [004: Agent/Call](./004_agent_call.md)

- **Scope**: **Scope** tells you *where* a **Call** gets handled.
  - **Inline Scope**: The AI handles the job itself, right where it is. It’s like doing a math problem in your head.
  - **Module Scope**: The AI sends the job to a different, specialized helper to do the work and just waits for the result. It’s like using a calculator instead of doing the math yourself.
    > Sidenote:
    >
    > - [004: Agent/Call](./004_agent_call.md)

- **Method**: **Method** is about *how* a **Call** gets done.
  - **Explicit Execution**: The result is created by a strict, predictable computer program (an `Activity`). It's like using a calculator—you always get the exact same answer for 2+2.

    > Sidenote:
    >
    > - [003: Agent/Activity](./003_agent_activity.md)

  - **Latent Execution**: The result is created by the AI just thinking about it and coming up with an answer. It's more like asking a creative friend for an idea—the answer will be good, but it's not based on a strict set of rules.

    > Sidenote:
    >
    > - [104: Concept/Latent](./104_concept_latent.md)

- **Module**: A **Module** is like a self-contained helper program that's really good at one specific job. Instead of building that logic into your main program, you can just call on this helper whenever you need it. Think of it like a special calculator app on your phone that you can open anytime you need to do math.

  > Sidenote:
  >
  > - [009: Agent/Module](./009_agent_module.md)

- **Import**: When you ask a helper (**Module**) to do a job, you might need to give it some key information from your main project. An **Import** is like giving that helper a note with specific instructions, like "When you do this job, remember that the user's name is Alex." It's a way to pass along important details.

  > Sidenote:
  >
  > - [008: Agent/Imports](./008_agent_imports.md)

- **Loop**: A **Loop** is when the AI keeps trying to solve a problem step-by-step. It makes a move, sees what happens, thinks about the result, and then makes another move. It keeps doing this again and again until the goal is reached and it doesn't need to make any more moves.

  > Sidenote:
  >
  > - [005: Agent/Loop](./005_agent_loop.md)

- **State Message**: In a multi-step process (a **Loop**), the AI needs to remember what's going on from one step to the next. A **State Message** is like its memory. It’s a note the AI writes to itself after each step, saying, "Here's what the situation looks like right now," so it knows where to pick up from.

  > Sidenote:
  >
  > - [010: Agent/State](./010_agent_state.md)

- **Plan**: A **Plan** is the AI's to-do list for a complex job. But it's a smart to-do list. It knows that you have to do Step 1 *before* you can do Step 2. It maps out all the actions (**Calls**) and the order they need to happen in, just like a building instruction manual.

  > Sidenote:
  >
  > - [012: Agent/Plan](./012_agent_plan.md)

- **Instancing**: This is a way for an AI to handle many similar jobs all at once, without getting them mixed up. Imagine you ask an AI to write a personal thank-you note to ten different friends. **Instancing** is the process that lets the AI do all ten at the same time, keeping each friend's name and details separate and correct.

  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Instance**: An **Instance** is one of the individual jobs in a big batch. In the thank-you note example, the request to write a note to your friend Sarah is one **Instance**. The request to write a note to your friend Ben is another **Instance**. Each one is separate and unique.

  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Reactor**: A **Reactor** is a special kind of **Idea Transformer** that acts like the engine for a turn-by-turn game or process. You give it the current situation (like the positions of all the pieces on a chessboard), and it figures out what the situation will look like after the next move. It takes one "snapshot" of the process and produces the next "snapshot."
  > Sidenote:
  >
  > - [303: Ideator/Reactor](./303_ideator_reactor.md)