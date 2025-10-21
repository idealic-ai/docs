# A Dictionary of Big Words

This page explains the key words and ideas you'll see in the Idea Protocol. Think of it as a guide to our special language.

- :dfn[Idea]{canonical="Idea" href="./101_concept_idea.md"}: Imagine a smart container that holds one complete thought. Inside, it has three parts: the rules for the thought (`schema`), the final answer (`solution`), and all the background information (`context`). It's a permanent piece of knowledge, not just a quick chat message.

  > Sidenote:
  > - [101: Concept/Idea](./101_concept_idea.md)

- :dfn[Ideator]{canonical="Ideator" href="./103_concept_ideator.md"}: An :term[Idea]{canonical="Idea"} that can take in new information and do something with it. It's like turning a simple container into a machine, like a calculator: you give it numbers (input), and it gives you an answer (output).

  > Sidenote:
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- :dfn[Idea Transformer]{canonical="Idea Transformer" href="./103_concept_ideator.md"}: This is a special kind of machine (:term[Ideator]{canonical="Ideator"}) that works on other :term[Ideas]{canonical="Idea"}. Think of it like a tool that can upgrade another tool. It takes one smart container as its input and helps it become something new.

  > Sidenote:
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- :dfn[Input Message]{canonical="Input Message" href="./007_agent_input.md"}: This is like an order form you fill out before making a request. It tells the computer exactly what kind of information you're about to send, so the system knows what to expect and how to handle it.

  > Sidenote:
  > - [007: Agent/Input](./007_agent_input.md)

- :dfn[Tool]{canonical="Tool" href="./002_agent_tool.md"}: A :term[Tool]{canonical="Tool"} is a description of a power an AI can use. It's like a spell in a wizard's spellbook. The AI can read the description and decide to use that power by creating a :term[Call]{canonical="Call"}. The :term[Tool]{canonical="Tool"} itself is just the instructions, not the action.

  > Sidenote:
  > - [002: Agent/Tool](./002_agent_tool.md)

- :dfn[Activity]{canonical="Activity" href="./003_agent_activity.md"}: This is the real, working code that makes a :term[Tool]{canonical="Tool"} do its job. If the :term[Tool]{canonical="Tool"} is a spell to “send an email,” the :term[Activity]{canonical="Activity"} is the magic wand and incantation that actually sends it. It connects to the real world to get things done.

  > Sidenote:
  > - [003: Agent/Activity](./003_agent_activity.md)

- :dfn[Branch]{canonical="Branch" href="./108_concept_visibility.md#branches-publication-and-partitioning"}: A :term[Branch]{canonical="Branch"} is like creating a separate, parallel universe for your project. You can try out new things, experiment, and make changes in a :term[Branch]{canonical="Branch"} without affecting the main version. When you put an :term[Idea]{canonical="Idea"} in a branch, you're publishing it there.

- :dfn[Call]{canonical="Call" href="./004_agent_call.md"}: A :term[Call]{canonical="Call"} is the moment an AI decides to actually *use* a :term[Tool]{canonical="Tool"}. It fills in all the details for the :term[Tool]{canonical="Tool"}, like who to send an email to or what to search for. It's a specific order saying, “Do this now!”

  > Sidenote:
  > - [004: Agent/Call](./004_agent_call.md)

- :dfn[Cutoff Time]{canonical="Cutoff Time" href="./108_concept_visibility.md#the-cutoff-time-temporal-retrieval"}: This is like asking a time traveler, “Show me the best version of this :term[Idea]{canonical="Idea"} as it existed last Tuesday at 3 PM.” It's a timestamp that lets you find the version of something from a specific moment in the past.

- :dfn[Method]{canonical="Method" href="./004_agent_call.md"}: This is the way a :term[Call]{canonical="Call"} gets done. There are two main ways:
  - :dfn[Explicit Execution]{canonical="Explicit Execution" href="./003_agent_activity.md"}: The :term[Call]{canonical="Call"} is completed by a piece of real code (an :term[Activity]{canonical="Activity"}) that always does the same thing every time. It's predictable, like a calculator.

    > Sidenote:
    > - [003: Agent/Activity](./003_agent_activity.md)

  - :dfn[Latent Execution]{canonical="Latent Execution" href="./104_concept_latent.md"}: The :term[Call]{canonical="Call"}'s result is created by a smart AI (an LLM). This is like asking a creative expert for an answer—it's powerful but might be slightly different each time.

    > Sidenote:
    > - [104: Concept/Latent](./104_concept_latent.md)

- :dfn[Delegate]{canonical="Delegate" href="./012_agent_delegate.md"}: This is a way to run a task in a totally separate, clean workspace. When a :term[Call]{canonical="Call"} needs to do something complex, it can “delegate” the job. It then carefully hands over only the exact pieces of information the task needs, keeping everything else private and organized.

  > Sidenote:
  > - [012: Agent/Delegate](./012_agent_delegate.md)

- :dfn[Scope]{canonical="Scope" href="./013_agent_scopes.md"}: A :term[Scope]{canonical="Scope"} is a key that lets a task see a specific piece of information from the main workspace. Think of it like giving a worker a special keycard that only opens the one room they need to be in, so they aren't distracted by anything else.

  > Sidenote:
  > - [013: Agent/Scopes](./013_agent_scopes.md)

- :dfn[Loop]{canonical="Loop" href="./005_agent_loop.md"}: A series of steps an AI takes to reach a goal. The AI makes a request, gets back a task (:term[Call]{canonical="Call"}), does the task, and uses the result to figure out the next step. It repeats this “loop” until the job is done.

  > Sidenote:
  > - [005: Agent/Loop](./005_agent_loop.md)

- :dfn[HITL (Human-in-the-Loop)]{canonical="HITL (Human-in-the-Loop)" href="./005_agent_loop.md#human-in-the-loop-hitl"}: This means having a person step in to check the AI's work. Inside the :term[Loop]{canonical="Loop"}, a human can approve, reject, or change what the AI plans to do *before* it actually does it. It's like having a helpful adult double-check your work.

  > Sidenote:
  > - [005: Agent/Loop](./005_agent_loop.md#human-in-the-loop-hitl)

- :dfn[Hierarchical Versioning]{canonical="Hierarchical Versioning" href="./108_concept_visibility.md#versioning-creating-the-states-to-be-seen"}: A way of naming different versions of an :term[Idea]{canonical="Idea"} that looks like `1.2.feature.3`. This system lets you organize and keep track of big official releases, experimental branches, and small drafts all in one neat structure.

- :dfn[Evolution]{canonical="Evolution" href="./106_concept_evolution.md"}: This is the process where a system built with AI can learn and improve itself over time. Based on new information or feedback, it can change its own rules and abilities, all by itself or with a little help.

  > Sidenote:
  > - [106: Concept/Evolution](./106_concept_evolution.md)

- :dfn[Emergent Identity]{canonical="Emergent Identity" href="./107_concept_identity.md"}: An :term[Idea]{canonical="Idea"}'s identity, or what makes it special, doesn't come from just the :term[Idea]{canonical="Idea"} itself. It comes from all the connections it has to other :term[Ideas]{canonical="Idea"}. It's like how a person's identity is shaped by their friends, family, and history.

- :dfn[idea:]{canonical="idea:" href="./109_concept_addressing.md"}: This is a special kind of web address used to find and ask for :term[Ideas]{canonical="Idea"}. It's like `http:` for websites, but `idea:` is for navigating the world of :term[Ideas]{canonical="Idea"}, including all their different versions and branches.

- :dfn[Identity Relationships]{canonical="Identity Relationships" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: These are the connections between :term[Ideas]{canonical="Idea"} that give them an :term[Emergent Identity]{canonical="Emergent Identity"}.
  - :dfn[Lineage]{canonical="Lineage"}: The family tree of an :term[Idea]{canonical="Idea"}, connecting it to all its past and future versions.
  - :dfn[Causality]{canonical="Causality"}: A link where one :term[Idea]{canonical="Idea"} directly causes another one to be created. It's a “this happened because of that” relationship.
  - :dfn[Grouping]{canonical="Grouping"}: A way to bundle a bunch of related :term[Ideas]{canonical="Idea"} together so they can be treated as a single team.

- :dfn[State Message]{canonical="State Message" href="./009_agent_state.md"}: This is a memory bank for an AI agent. It holds information that the agent needs to remember from one step of its work to the next, like a character's health points in a video game.

  > Sidenote:
  > - [009: Agent/State](./009_agent_state.md)

- :dfn[Data Message]{canonical="Data Message" href="./006_agent_data.md"}: A message that holds important, unchanging information for an AI agent. Unlike memory, this data is meant to stay the same throughout the agent's work, like the rules of a game.

- :dfn[Plan]{canonical="Plan" href="./010_agent_plan.md"}: A :term[Plan]{canonical="Plan"} is the AI's to-do list, showing how it will use different :term[Tools]{canonical="Tool"} and in what order. The AI can share this plan between steps to check its progress and change its strategy if needed.

  > Sidenote:
  > - [010: Agent/Plan](./010_agent_plan.md)

- :dfn[Process Idea]{canonical="Process Idea" href="./010*agent_plan.md"}: This is a special :term[Idea]{canonical="Idea"} whose whole job is to manage a project. It holds the library of available :term[Tools]{canonical="Tool"} (`schema`), the new to-do list for the next step (`solution`), and all the information it needs, like the original goal and old plans (`context`).

  > Sidenote:
  > - [010: Agent/Plan](./010_agent_plan.md)

- :dfn[Vessel Idea]{canonical="Vessel Idea" href="./202_idea_vessel.md"}: This is an :term[Idea]{canonical="Idea"} that acts like a superhero's utility belt. It knows all the possible :term[Tools]{canonical="Tool"} it might ever need (`schema`), and when something happens, it picks the exact :term[Tools]{canonical="Tool"} to use (`solution`) and remembers its choice.

  > Sidenote:
  > - [202: Idea/Vessel](./202_idea_vessel.md)

- :dfn[Instancing]{canonical="Instancing" href="./011_agent_instancing.md"}: The ability to handle many different tasks at the same time, without getting them mixed up. Each task gets its own unique ID and its own memory (:term[State Message]{canonical="State Message"}), so the AI can work on all of them in a single, organized request.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- :dfn[Request]{canonical="Request" href="./001_agent_request.md"}: A single, complete job sent to an AI. You give it some background information (`context`) and a set of rules (`schema`), and it gives you back a final answer (`solution`).

- :dfn[Instance]{canonical="Instance" href="./011_agent_instancing.md"}: One single task out of a big batch. When an AI is handling many jobs at once (called :term[Instancing]{canonical="Instancing"}), each individual job with its own memory is called an :term[Instance]{canonical="Instance"}.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- :dfn[Reactor]{canonical="Reactor" href="./303_ideator_reactor.md"}: A special :term[Idea Transformer]{canonical="Idea Transformer"} that acts like a universal game engine. You give it the current state of a game or process (as an :term[Idea]{canonical="Idea"}), and it figures out and gives you back the very next state of the game (as a new :term[Idea]{canonical="Idea"}).

  > Sidenote:
  > - [303: Ideator/Reactor](./303_ideator_reactor.md)

- :dfn[Refiner]{canonical="Refiner" href="./103_concept_ideator.md#the-refiner-an-ideator-for-evolution"}: A special :term[Idea Transformer]{canonical="Idea Transformer"} that helps an :term[Idea]{canonical="Idea"} evolve. You give it an :term[Idea]{canonical="Idea"} and a suggestion for how to improve it, and it gives you back a new, better version of that :term[Idea]{canonical="Idea"}.

- :dfn[Search Path]{canonical="Search Path" href="./108_concept_visibility.md#the-search-path-prioritized-retrieval"}: This is a treasure map for finding the right version of an :term[Idea]{canonical="Idea"}. It's a list of different branches (or parallel universes) telling the computer where to look first, second, third, and so on, until it finds what it's looking for.

- :dfn[Variable Reference]{canonical="Variable Reference" href="./004_agent_call.md"}: A special code (like `†state.username`) that an AI can write when it's making a :term[Call]{canonical="Call"}. It's a placeholder that means “go find the information stored at this location and use it here.” This lets the AI connect its :term[Tools]{canonical="Tool"} together, using the answer from one :term[Tool]{canonical="Tool"} as the question for the next one.

- :dfn[Solution]{canonical="Solution" href="./001_agent_request.md"}: The final answer that an AI gives back after you make a :term[Request]{canonical="Request"}. It neatly packs up any actions the AI wants to take (:term[Tool Calls]{canonical="Tool Call"}) and the final output, all following a set of rules.
