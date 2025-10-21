# List of Important Words

This page explains the main words and ideas you'll see in the Idea Protocol and other related systems.

- :dfn[Idea]{canonical="Idea" href="./101_concept_idea.md"}: Think of an `Idea` as a smart digital building block. It holds a piece of knowledge in three parts: the rules (`schema`), the answer or result (`solution`), and the backstory (`context`). It's not just a temporary question; it's a permanent piece of information that the system can use.

  > Sidenote:
  > - [101: Concept/Idea](./101_concept_idea.md)

- :dfn[Ideator]{canonical="Ideator" href="./103_concept_ideator.md"}: An `Ideator` is a special kind of `Idea` that can receive new information and do something with it. It works like a mini-program or a function: you give it an input, and it gives you an output.

  > Sidenote:
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- :dfn[Idea Transformer]{canonical="Idea Transformer" href="./103_concept_ideator.md"}: This is a special `Ideator` whose job is to take another whole `Idea` as its input. It's like a workshop that modifies or improves other `Ideas`.

  > Sidenote:
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- :dfn[Input Message]{canonical="Input Message" href="./007_agent_input.md"}: This is a message that tells an AI exactly what kind of information it needs to do a job. It includes the rules for the input (`schema`) and the actual information (`input`) itself. This makes asking the AI to do things repeatable and predictable.

  > Sidenote:
  > - [007: Agent/Input](./007_agent_input.md)

- :dfn[Tool]{canonical="Tool" href="./002_agent_tool.md"}: A `Tool` is like a description of a skill an AI can use, like "look up the weather" or "send a message." It tells the AI what the skill is called and what information it needs to use it. To actually use the skill, the AI makes a `Call`.

  > Sidenote:
  > - [002: Agent/Tool](./002_agent_tool.md)

- :dfn[Activity]{canonical="Activity" href="./003_agent_activity.md"}: An `Activity` is the actual computer code that performs the action for a `Tool`. If the `Tool` is "look up the weather," the `Activity` is the program that connects to a weather service to get the forecast. It's the real-world action behind the skill.

  > Sidenote:
  > - [003: Agent/Activity](./003_agent_activity.md)

- :dfn[Call]{canonical="Call" href="./004_agent_call.md"}: A `Call` is a specific instruction to use a `Tool`. For example, if the `Tool` is "look up weather," a `Call` would be "look up weather for London." It's the decision to *do* something.

  > Sidenote:
  > - [004: Agent/Call](./004_agent_call.md)

- :dfn[Scope]{canonical="Scope" href="./004_agent_call.md"}: This decides *where* a `Call` is handled.
  - **Inline Scope**: The `Call` is handled right here, within the current process.
  - **Delegate Scope**: The `Call` is handed off to a separate, specialized helper to handle it.
    > Sidenote:
    > - [004: Agent/Call](./004_agent_call.md)

- **Method**: This decides *how* a `Call` is handled.
  - **Explicit Execution**: The `Call` is handled by a predictable piece of code (an `Activity`).

    > Sidenote:
    > - [003: Agent/Activity](./003_agent_activity.md)

  - **Latent Execution**: The `Call` is handled by an AI model, which uses its own understanding to come up with the answer.

    > Sidenote:
    > - [104: Concept/Latent](./104_concept_latent.md)

- :dfn[Delegate]{canonical="Delegate" href="./012_agent_delegate.md"}: A `Delegate` is like a specialist you can hand a task to. When a `Call` is sent to a `Delegate`, the task is done in a separate, clean workspace. This keeps the main process from getting cluttered. You can give the `Delegate` specific, limited information from the main process to help it do its job.

  > Sidenote:
  > - [012: Agent/Delegate](./012_agent_delegate.md)

- :dfn[Scope]{canonical="Scope" href="./013_agent_scopes.md"}: Think of a `Scope` as a key that unlocks a specific piece of information from the main workspace. When a task is performed, you can use `Scopes` to give the AI only the memories or data it needs, helping it focus on the job at hand.

  > Sidenote:
  > - [013: Agent/Scopes](./013_agent_scopes.md)

- :dfn[Loop]{canonical="Loop" href="./005_agent_loop.md"}: A `Loop` is how an AI works on a big goal. It makes a `Request`, gets a `Call` to do something, does it, and then feeds the result back to itself to decide what to do next. It keeps repeating this cycle until the goal is complete.

  > Sidenote:
  > - [005: Agent/Loop](./005_agent_loop.md)

- :dfn[HITL (Human-in-the-Loop)]{canonical="HITL (Human-in-the-Loop)" href="./005_agent_loop.md#human-in-the-loop-hitl"}: This means having a person step in to approve the AI's actions. During an AI's work `Loop`, a human can check the `Calls` the AI wants to make and say "yes," "no," or "change this" before the action happens.

  > Sidenote:
  > - [005: Agent/Loop](./005_agent_loop.md#human-in-the-loop-hitl)

- :dfn[Evolution]{canonical="Evolution" href="./106_concept_evolution.md"}: This is the process where an AI system can learn and change itself over time. It can update its own rules, skills, and logic based on new information or feedback, all on its own (or with a little help).

  > Sidenote:
  > - [106: Concept/Evolution](./106_concept_evolution.md)

- :dfn[State Message]{canonical="State Message" href="./009_agent_state.md"}: This is a message that holds an AI's memory. It contains a `state` object that the AI remembers from one step of its work `Loop` to the next.

  > Sidenote:
  > - [009: Agent/State](./009_agent_state.md)

- :dfn[Data Message]{canonical="Data Message" href="./006_agent_data.md"}: This is a message containing information that stays the same throughout the AI's work `Loop`. It provides a stable background context for the AI to refer to.

- :dfn[Plan]{canonical="Plan" href="./010_agent_plan.md"}: A `Plan` is a message that contains the AI's step-by-step strategy for solving a problem. It's like a flowchart of `Tool Calls` that the AI will follow and update as it works.

  > Sidenote:
  > - [010: Agent/Plan](./010_agent_plan.md)

- :dfn[Process Idea]{canonical="Process Idea" href="./010*agent_plan.md"}: This is an `Idea` that holds both a `Plan` and the current status of that plan. Think of it as a living to-do list: the `schema` is the list of all possible actions, the `solution` is the updated `Plan` for the next step, and the `context` is all the information needed to make that next step.

  > Sidenote:
  > - [010: Agent/Plan](./010_agent_plan.md)

- :dfn[Vessel Idea]{canonical="Vessel Idea" href="./202_idea_vessel.md"}: This is a special `Idea` that acts as both a list of possible reactions and a record of the reaction that was chosen. Its `schema` is the complete menu of `Tools` it could use, and its `solution` is the specific `Call` it decided to make in a situation.

  > Sidenote:
  > - [202: Idea/Vessel](./202_idea_vessel.md)

- :dfn[Instancing]{canonical="Instancing" href="./011_agent_instancing.md"}: This is the ability to handle many separate tasks at the same time in a single request. Each task, called an `Instance`, has its own unique ID and its own memory (`State` message).

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- :dfn[Request]{canonical="Request" href="./001_agent_request.md"}: A `Request` is a single, complete question you ask an AI model. You give it some background information (`context`) and a set of rules (`schema`), and it gives you back an answer (`solution`).

- :dfn[Instance]{canonical="Instance" href="./011_agent_instancing.md"}: An `Instance` is one of many individual tasks being handled at the same time. It has its own unique ID and memory, kept separate from all the others.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- :dfn[Reactor]{canonical="Reactor" href="./303_ideator_reactor.md"}: A `Reactor` is a special `Idea Transformer` built to run turn-based processes, like a game or a conversation. You give it the current state of the game (`Idea`), and it gives you back the next state (`Idea`).

  > Sidenote:
  > - [303: Ideator/Reactor](./303_ideator_reactor.md)

- **Variable Reference**: This is a special piece of text (like `†input.name`) that lets an AI connect its tools together. It's like a pointer that says, "take the result from that last step and use it as the input for this next step."

- :dfn[Solution]{canonical="Solution" href="./001_agent_request.md"}: The `Solution` is the final, organized answer that an AI gives back after a `Request`. It includes the actions (`Tool Calls`) it wants to take and any final output for the user.
