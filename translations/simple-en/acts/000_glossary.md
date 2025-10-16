# A Dictionary of Our Terms

This guide explains the main words we use in the Idea Protocol and all the systems connected to it.

- **Idea**: Think of an `Idea` as a smart, digital recipe card. It's not just a temporary note. It's a complete package of knowledge with three parts: the ingredients list (`schema`), the cooking instructions (`solution`), and notes on how it turned out before (`context`).

  > Sidenote:
  > - [101: Concept/Idea](./101_concept_idea.md)

- **Ideator**: An `Ideator` is an `Idea` that can actually *do* something. It’s like a magical chef who takes your ingredients (input) and uses a recipe card (`Idea`) to create a finished dish (output).

  > Sidenote:
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- **Idea Transformer**: This is a special kind of `Ideator` that works on other `Ideas`. Instead of taking ingredients, it takes an entire recipe card and improves it, creating a brand new recipe.

  > Sidenote:
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- **Input Message**: This is like an order form for an `Ideator`. It clearly lists what ingredients are expected and provides the exact ones you're giving it. This makes sure the `Ideator` knows exactly what it's working with.

  > Sidenote:
  > - [007: Agent/Input](./007_agent_input.md)

- **Tool**: A `Tool` is a description of a skill an AI can use, like a button in a video game that says "Jump.” It tells the AI *what* it can do and what it needs to do it, but it doesn't do the action itself.

  > Sidenote:
  > - [002: Agent/Tool](./002_agent_tool.md)

- **Activity**: An `Activity` is the real-world action that happens when a `Tool` is used. If a `Tool` is the "Check Weather" button, the `Activity` is the actual computer code that connects to a weather service to get the forecast.

  > Sidenote:
  > - [003: Agent/Activity](./003_agent_activity.md)

- **Call**: A `Call` is the moment the AI decides to use a `Tool`. It’s like pressing the "Check Weather" button and saying, “Do it for London, right now.” It’s the specific command to perform an action.

  > Sidenote:
  > - [004: Agent/Call](./004_agent_call.md)

- **Scope**: This decides *where* a `Call` gets handled.
  - **Inline Scope**: The job is done right here, within the current workflow.
  - **Delegate Scope**: The job is handed off to a specialist in another room to handle it separately.
    > Sidenote:
    > - [004: Agent/Call](./004_agent_call.md)

- **Method**: This decides *how* a `Call` gets handled.
  - **Explicit Execution**: The result is produced by exact computer code (an `Activity`). It's like using a calculator—you always get the same, precise answer.

    > Sidenote:
    > - [003: Agent/Activity](./003_agent_activity.md)

  - **Latent Execution**: The result is answered by the AI's own creative understanding. It's like asking a poet to describe a sunset—the answer is generated, not calculated.

    > Sidenote:
    > - [104: Concept/Latent](./104_concept_latent.md)

- **Delegate**: Imagine you have a sensitive task. A `Delegate` is like hiring a contractor and giving them a separate, clean workshop to do the job. You can pass them specific tools and information they need from your own workshop, but they work in their own space without messing up yours.

  > Sidenote:
  > - [012: Agent/Delegate](./012_agent_delegate.md)

- **Scope**: A `Scope` is like a key that gives a task access to a specific piece of information from the main project. When you send a job to a `Delegate`, you use `Scopes` to give them only the information they need to see, keeping everything else private.

  > Sidenote:
  > - [013: Agent/Scopes](./013_agent_scopes.md)

- **Loop**: A `Loop` is how an AI works towards a goal. It repeatedly makes a request, gets a result, and uses that result to figure out the next step. It keeps going around this cycle until the job is done and it has no more actions to take.

  > Sidenote:
  > - [005: Agent/Loop](./005_agent_loop.md)

- **Evolution**: This is the process of an AI system learning and improving on its own. It's like a video game character that not only levels up its skills but can also change its own rules or abilities over time based on its experiences.

  > Sidenote:
  > - [106: Concept/Evolution](./106_concept_evolution.md)

- **State Message**: This is a message that acts like the AI’s memory. It holds the current status of a task—like the score in a game or items in a shopping cart—so the AI knows where it left off in the last step.

  > Sidenote:
  > - [009: Agent/State](./009_agent_state.md)

- **Process Idea**: This is a special `Idea` that works like a project manager. It holds the library of possible `Tools` (the team's skills), the current `Plan` (the to-do list for today), and the memory of the previous plan and current goal.

  > Sidenote:
  > - [010: Agent/Plan](./010_agent_plan.md)

- **Vessel Idea**: This `Idea` is like a Swiss Army knife. It holds every possible `Tool` you might ever need. When something happens, it chooses the right tools for the situation and records exactly which ones it used to respond.

  > Sidenote:
  > - [202: Idea/Vessel](./202_idea_vessel.md)

- **Instancing**: This is a way to handle many similar tasks at once, without getting them mixed up. It's like a teacher grading papers for 30 different students on the same assignment; each paper is its own `Instance` with its own unique student name and grade.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Instance**: An `Instance` is one of those individual tasks being handled in an `Instancing` operation. In the teacher example, each student's paper is a separate `Instance`.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Reactor**: A `Reactor` is a master `Idea Transformer` built to handle back-and-forth interactions, like in a game. You give it the current state of the game (an `Idea`), and it produces the next state of the game (a new `Idea`).

  > Sidenote:
  > - [303: Ideator/Reactor](./303_ideator_reactor.md)

- **Variable Reference**: This is a special code that acts like a shortcut. It lets an AI say, "For this tool, use the answer that we got from the *last* tool." It's how the AI connects different tools together, creating a chain of actions.
