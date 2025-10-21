# What Our Words Mean

This page explains the important words we use in the Idea Protocol and all the things connected to it.

- :dfn[Idea]{canonical="Idea" href="./101_concept_idea.md"}: An Idea is a little package of knowledge with three parts: the **rules** (`schema`), the **answer** (`solution`), and the **background story** (`context`). Think of it as a smart note that remembers everything about a single topic, not just a temporary command you give to a computer.

  > Sidenote:
  > - [101: About Ideas](./101_concept_idea.md)

- :dfn[Ideator]{canonical="Ideator" href="./103_concept_ideator.md"}: This is a special kind of `Idea` that can take something you give it and turn it into something new. It works like a machine: you put something in, and it gives you a result back.

  > Sidenote:
  > - [103: About Ideators](./103_concept_ideator.md)

- :dfn[Idea Transformer]{canonical="Idea Transformer" href="./103_concept_ideator.md"}: This is a special kind of `Ideator` that takes a whole `Idea` as its input and changes it into a new `Idea`.

  > Sidenote:
  > - [103: About Ideators](./103_concept_ideator.md)

- :dfn[Input Message]{canonical="Input Message" href="./007_agent_input.md"}: This is a message that tells an `Ideator` exactly what kind of information to expect. It's like the label on a mail slot that says "Letters Only," so it knows what to do with what you give it.

  > Sidenote:
  > - [007: Agent Input](./007_agent_input.md)

- :dfn[Tool]{canonical="Tool" href="./002_agent_tool.md"}: A `Tool` is a description of a skill that an AI agent can use, like "send an email" or "look up the weather." The agent doesn't do the work itself, but it knows the `Tool` exists and can decide when to use it by creating a `Call`.

  > Sidenote:
  > - [002: Agent Tools](./002_agent_tool.md)

- :dfn[Activity]{canonical="Activity" href="./003_agent_activity.md"}: This is the actual computer program that does the work for a `Tool`. If a `Tool` is the *idea* of sending an email, the `Activity` is the real code that connects to the internet and sends it. It handles real-world jobs that the AI can't do in its head.

  > Sidenote:
  > - [003: Agent Activities](./003_agent_activity.md)

- :dfn[Call]{canonical="Call" href="./004_agent_call.md"}: A `Call` is a specific order to use a `Tool`. If the `Tool` is "send an email," a `Call` would be: "Send an email to mom with the subject 'Hi!'" It's the AI's decision to take a specific action.

  > Sidenote:
  > - [004: Agent Calls](./004_agent_call.md)

- :dfn[Scope]{canonical="Scope" href="./004_agent_call.md"}: This tells us *where* a `Call` should be handled.
  - :dfn[Inline Scope]{canonical="Inline Scope" href="./004_agent_call.md"}: The `Call` is handled by the agent right where it is, using its current memory.
  - :dfn[Delegate Scope]{canonical="Delegate Scope" href="./004_agent_call.md"}: The `Call` is handed off to a helper who works in a separate, clean space.
    > Sidenote:
    > - [004: Agent Calls](./004_agent_call.md)

- :dfn[Method]{canonical="Method" href="./004_agent_call.md"}: This is *how* a `Call` gets done.
  - :dfn[Explicit Execution]{canonical="Explicit Execution" href="./003_agent_activity.md"}: The `Call` is done by a predictable computer program (an `Activity`). You know exactly what result you'll get every time.

    > Sidenote:
    > - [003: Agent Activities](./003_agent_activity.md)

  - :dfn[Latent Execution]{canonical="Latent Execution" href="./104_concept_latent.md"}: The `Call` is done by the AI's imagination. It uses its own knowledge to come up with an answer.

    > Sidenote:
    > - [104: About Latent Space](./104_concept_latent.md)

- :dfn[Delegate]{canonical="Delegate" href="./012_agent_delegate.md"}: A `Delegate` is like a special helper that you can give a job to. It works in its own separate office, so it doesn't mess up the main agent's work. You can give it specific notes (`_scopes`) so it knows just enough to get the job done without getting confused.

  > Sidenote:
  > - [012: Agent Delegates](./012_agent_delegate.md)

- :dfn[Scope]{canonical="Scope" href="./013_agent_scopes.md"}: A `Scope` is like a sticky note that gives a helper access to a specific piece of information from the main workspace. It can be used to help an AI focus on just one thing, or to give a `Delegate` all the context it needs to do its job.

  > Sidenote:
  > - [013: Agent Scopes](./013_agent_scopes.md)

- :dfn[Loop]{canonical="Loop" href="./005_agent_loop.md"}: A `Loop` is when the agent keeps trying to solve a problem step-by-step. It makes a request, gets back a `Call`, does the action, and then uses the result to make the next request. It keeps going around in this loop until the job is done.

  > Sidenote:
  > - [005: The Agent Loop](./005_agent_loop.md)

- :dfn[HITL (Human-in-the-Loop)]{canonical="HITL (Human-in-the-Loop)" href="./005_agent_loop.md#human-in-the-loop-hitl"}: This means having a person check the AI's work. In an agent's `Loop`, it's a chance for a human to look at the actions (`Calls`) the agent wants to take and say "yes," "no," or "change this a little" before they happen.

  > Sidenote:
  > - [005: The Agent Loop#human-in-the-loop-hitl](./005_agent_loop.md#human-in-the-loop-hitl)

- :dfn[Evolution]{canonical="Evolution" href="./106_concept_evolution.md"}: This is the process where the AI system learns and improves itself over time. Based on new information or feedback, it can change its own rules and skills, all on its own.

  > Sidenote:
  > - [106: About Evolution](./106_concept_evolution.md)

- :dfn[State Message]{canonical="State Message" href="./009_agent_state.md"}: This is a message that holds the agent's memory. It's how the agent remembers what it was doing between steps in its work `Loop`.

  > Sidenote:
  > - [009: Agent State](./009_agent_state.md)

- :dfn[Data Message]{canonical="Data Message" href="./006_agent_data.md"}: A message that holds important facts or information that doesn't change. The agent keeps this message around during its whole work `Loop` so it always has access to the basic context.

- :dfn[Plan]{canonical="Plan" href="./010_agent_plan.md"}: A `Plan` is a message that holds the agent's step-by-step strategy. It's like a flowchart showing which :term[Tools]{canonical="Tool Call"} to use and in what order. The agent can look at this plan and change it as it goes.

  > Sidenote:
  > - [010: Agent Plans](./010_agent_plan.md)

- :dfn[Process Idea]{canonical="Process Idea" href="./010*agent_plan.md"}: This is a special [Idea](./101_concept_idea.md) that holds everything about a mission in progress. It contains the list of available [Tools](./002_agent_tool.md), the current [Plan](./010_agent_plan.md) for the next step, and all the memories and inputs from before.

  > Sidenote:
  > - [010: Agent Plans](./010_agent_plan.md)

- :dfn[Vessel Idea]{canonical="Vessel Idea" href="./202_idea_vessel.md"}: Think of this `Idea` as both a list of all possible moves in a game and a record of the one move that was chosen. It knows all the `Tools` it could possibly use, and its `solution` is the specific `Call` it decided to make when something happened.

  > Sidenote:
  > - [202: Idea Vessels](./202_idea_vessel.md)

- :dfn[Instancing]{canonical="Instancing" href="./011_agent_instancing.md"}: This is a way for an agent to handle many different tasks at the same time, without getting them mixed up. Each task is an `Instance` with its own unique ID and its own memory (`State` message).

  > Sidenote:
  > - [011: Agent Instancing](./011_agent_instancing.md)

- :dfn[Request]{canonical="Request" href="./001_agent_request.md"}: A `Request` is a single question or task you give to the AI. You provide some background info (`context`) and rules (`schema`), and it gives you back an answer (`solution`).

- :dfn[Instance]{canonical="Instance" href="./011_agent_instancing.md"}: An `Instance` is one single task out of many being handled at the same time. It has its own unique ID and its own memory, so the agent can keep track of it separately.

  > Sidenote:
  > - [011: Agent Instancing](./011_agent_instancing.md)

- :dfn[Reactor]{canonical="Reactor" href="./303_ideator_reactor.md"}: This is a special `Idea Transformer` built to run games or processes that happen in turns. You give it an `Idea` representing the current situation (like the state of a chessboard), and it gives you back a new `Idea` showing what happens next.

  > Sidenote:
  > - [303: Ideator Reactors](./303_ideator_reactor.md)

- :dfn[Variable Reference]{canonical="Variable Reference" href="./004_agent_call.md"}: This is a special code, like a secret password (`†state.username`), that an agent can use in a `Tool Call`. It lets the agent grab a piece of information from its memory (like from a `State` or `Input` message) and use it. This way, the agent can connect its tools together, using the result of one action as the input for another.

- :dfn[Solution]{canonical="Solution" href="./001_agent_request.md"}: This is the final answer an agent gives back after a `Request`. It's a neat, organized package that includes any `Tool Calls` the agent decided to make and the final result, all following a set of rules.
