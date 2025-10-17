# What Do These Words Mean?

This paper explains the main words we use to talk about the Idea system.

- **Idea**: Think of an `Idea` as a self-contained digital recipe card. It holds three things: the rules for what it is (`schema`), the final result or answer (`solution`), and the story of how it got there (`context`). It's a permanent building block, not just a quick, forgettable command.

  > Sidenote:
  > - [101: About Ideas](./101_concept_idea.md)

- **Ideator**: This is an `Idea` that can actually do something. It's like a machine that takes something you give it (`input`) and turns it into something else (`output`).

  > Sidenote:
  > - [103: About Ideators](./103_concept_ideator.md)

- **Idea Transformer**: A special kind of `Ideator` that takes another `Idea` as its input. Imagine a machine that doesn't just bake a cake, but takes an entire recipe card and improves it.

  > Sidenote:
  > - [103: About Ideators](./103_concept_ideator.md)

- **Input Message**: A small packet of information that tells an `Ideator` what it needs to work with. It's like the label on a box that says, "This box contains apples," along with the actual apples inside.

  > Sidenote:
  > - [007: Agent/Input](./007_agent_input.md)

- **Tool**: A description of a special power or ability the AI can use. Think of it like a list of spells a wizard can cast. The AI looks at this list and decides which one to use. For example, a `Tool` might be "Look up the weather."

  > Sidenote:
  > - [002: Agent/Tool](./002_agent_tool.md)

- **Activity**: The actual computer program that makes a `Tool` work. If the `Tool` is "Look up the weather," the `Activity` is the real code that connects to a weather website to get the forecast. It's the engine that powers the tool.

  > Sidenote:
  > - [003: Agent/Activity](./003_agent_activity.md)

- **Call**: A specific command to use a `Tool`. It’s the action of the AI saying, "I want to use the 'Look up the weather' tool for 'Paris, France' right now." It's turning the *ability* into an *action*.

  > Sidenote:
  > - [004: Agent/Call](./004_agent_call.md)

- **Scope**: This is the place where a `Call` happens.
  - **Inline Scope**: The action happens right here, within the AI's current thought process.
  - **Delegate Scope**: The action is handed off to a separate, fresh helper to do the job without being distracted.
    > Sidenote:
    > - [004: Agent/Call](./004_agent_call.md)

- **Method**: This is *how* a `Call` gets its answer.
  - **Explicit Execution**: A real computer program (`Activity`) runs and gives a predictable, exact answer.

    > Sidenote:
    > - [003: Agent/Activity](./003_agent_activity.md)

  - **Latent Execution**: The AI uses its own creative brain to come up with the answer, like when it writes a story or answers a tricky question.

    > Sidenote:
    > - [104: About Latency](./104_concept_latent.md)

- **Delegate**: A helper that does a job in a separate, clean workspace. When the main AI needs a task done without any outside mess, it gives the job to a `Delegate`, which works in isolation and then reports back the result.

  > Sidenote:
  > - [012: Agent/Delegate](./012_agent_delegate.md)

- **Scope**: A way to give a helperaccess to only the specific information it needs from the main workspace. It's like giving a chef only the ingredients for one dish, so they don't get confused by everything else in the kitchen.

  > Sidenote:
  > - [013: Agent/Scopes](./013_agent_scopes.md)

- **Loop**: A cycle of thinking and acting. The AI looks at a problem, makes a `Call` to a tool, sees the result, and uses that new information to decide what to do next. It keeps 'looping' like this until the job is done.

  > Sidenote:
  > - [005: Agent/Loop](./005_agent_loop.md)

- **HITL (Human-in-the-Loop)**: A step where a person can jump in and check the AI's work. Before the AI performs an important action (a `Call`), it can pause and ask a human, "Is this okay?" You can then approve, change, or cancel its plan.

  > Sidenote:
  > - [005: Agent/Loop#human-in-the-loop-hitl](./005_agent_loop.md#human-in-the-loop-hitl)

- **Evolution**: The process of the AI system learning and improving on its own over time. Like a character in a game leveling up, the system can change its own rules and abilities to get better at its job based on what it experiences.

  > Sidenote:
  > - [106: About Evolution](./106_concept_evolution.md)

- **State Message**: A message that acts like the system's memory. It holds onto important information between steps of the `Loop`, so the AI doesn't forget what it's doing.

  > Sidenote:
  > - [009: Agent/State](./009_agent_state.md)

- **Plan**: A blueprint or strategy made of `Tool Calls` that shows how the AI is going to solve a problem. The AI can adjust this `Plan` as it goes, learning and adapting at each step.

  > Sidenote:
  > - [010: Agent/Plan](./010_agent_plan.md)

- **Process Idea**: An `Idea` that holds a whole project: the library of available `Tools`, the `Plan` for what to do next, and the current memory of what's happened so far.

  > Sidenote:
  > - [010: Agent/Plan](./010_agent_plan.md)

- **Vessel Idea**: An `Idea` that knows all the possible actions it could take and also remembers which specific action it chose. It’s like a choose-your-own-adventure book that not only shows you all the paths but also keeps a bookmark on the one you picked.

  > Sidenote:
  > - [202: Idea/Vessel](./202_idea_vessel.md)

- **Instancing**: The skill of handling many different tasks or users at the same time, without mixing them up. Each task gets its own unique ID and its own memory (`State`).

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Request**: A single question or command sent to the AI. You give it some background information (`context`) and a set of rules (`schema`), and it gives you back a final answer (`solution`).

- **Instance**: A single, self-contained task being worked on during an `Instancing` process. If the AI is juggling ten balls, each ball is one `Instance`.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Reactor**: A special `Ideator` built to handle back-and-forth interactions, like a game. It takes the current state of the game (`Idea`), figures out the next move, and produces the new state of the game (`Idea`).

  > Sidenote:
  > - [303: Ideator/Reactor](./303_ideator_reactor.md)

- **Variable Reference**: A special code (like `†state.score`) that lets the AI connect its tools together. It can use the answer from one tool as the input for another. It's like telling the AI, "Take the number you just got and plug it into this next step."

- **Solution**: The final, organized answer that the AI gives back after a `Request`. It contains any actions (`Tool Calls`) it decided to take and the final result of its work.