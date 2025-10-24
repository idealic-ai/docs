# Glossary of Terms

This glossary explains the main words we use in our system, like a dictionary for our project.

- :dfn[Idea]{canonical="Idea" href="./101_concept_idea.md"}: Think of an Idea as a smart recipe card. It's a complete package of knowledge with three parts: the **rules** (`schema`), the **answer** (`solution`), and the **background story** (`context`). It's a permanent building block, not just a temporary question you ask an AI.

  > Sidenote:
  > - [101: Concept/Idea](./101_concept_idea.md)

- :dfn[Ideator]{canonical="Ideator" href="./103_concept_ideator.md"}: An Ideator is an `Idea` that is built to do something. It’s like a machine, such as a juicer. You put in fruit (the input), and it uses its instructions to give you back juice (the output).

  > Sidenote:
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- :dfn[Idea Transformer]{canonical="Idea Transformer" href="./103_concept_ideator.md"}: This is a special kind of `Ideator` that takes another `Idea` as its input. It’s like a chef who doesn't just cook food, but takes one recipe and improves it to create a brand new one.

  > Sidenote:
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- :dfn[Input Message]{canonical="Input Message" href="./006_agent_input.md"}: This is a message that clearly describes what kind of information an AI needs to do its job. It’s like the order screen at a fast-food restaurant: it tells the kitchen exactly what you want and how you want it, so the order can be made correctly every time.

  > Sidenote:
  > - [006: Agent/Input](./006_agent_input.md)

- :dfn[Tool]{canonical="Tool" href="./002_agent_tool.md"}: A Tool is like a power-up an AI can use. It's a description of a special ability, like "search the internet" or "send an email." The AI doesn't know *how* to do it, just that it *can* call on this tool to get a job done.

  > Sidenote:
  > - [002: Agent/Tool](./002_agent_tool.md)

- :dfn[Activity]{canonical="Activity" href="./003_agent_activity.md"}: An Activity is the actual computer code that makes a `Tool` work. If a `Tool` is the "search the internet" button, the `Activity` is the real-world engine that goes out, searches, and brings back the results.

  > Sidenote:
  > - [003: Agent/Activity](./003_agent_activity.md)

- :dfn[AI-Native]{canonical="AI-Native" href="./105_concept_ai_native.md"}: This is a way of building things where the AI is not just a helper, but the main architect. Imagine if a building could design itself, build itself, and even repair and upgrade itself over time. That’s an AI-Native system.

  > Sidenote:
  > - [105: Concept/AI-Native](./105_concept_ai_native.md)

- :dfn[Agency]{canonical="Agency" href="./111_concept_life.md"}: This is the ability to make choices and take actions on your own. A person has agency when they decide what to eat for lunch. In our system, it's about an AI or an Idea being able to act with a purpose.

  > Sidenote:
  > - [111: Concept/Life](./111_concept_life.md)

- :dfn[Boundaries]{canonical="Boundaries" href="./111_concept_life.md"}: This means having a clear and unique identity that separates you from everything else. For a person, it’s your body and your mind. For an `Idea`, it’s its exact definition. If you change it, it becomes a new, different `Idea`.

  > Sidenote:
  > - [111: Concept/Life](./111_concept_life.md)

- :dfn[Life]{canonical="Life" href="./111_concept_life.md"}: In our project, we say something has "Life" if it has three special qualities: the ability to act on its own (:term[Agency]{canonical="Agency"}), a unique identity (:term[Boundaries]{canonical="Boundaries"}), and the ability to be copied and spread easily (:term[Scalability]{canonical="Scalability"}).

  > Sidenote:
  > - [111: Concept/Life](./111_concept_life.md)

- :dfn[Scalability]{canonical="Scalability" href="./111_concept_life.md"}: This is the ability to be copied perfectly, over and over again, without any limits. Think of how you can share a picture online—millions of people can have the exact same perfect copy. Digital things have this kind of superpower.

  > Sidenote:
  > - [111: Concept/Life](./111_concept_life.md)

- :dfn[Branch]{canonical="Branch" href="./108_concept_visibility.md#branches-publication-and-partitioning"}: Imagine you're writing a story. A Branch is like making a copy of your story to try out a new ending. You can work on this new version in a safe, separate space without messing up your original story.

  > Sidenote:
  > - [108: Concept/Visibility](./108_concept_visibility.md)

- :dfn[Call]{canonical="Call" href="./004_agent_call.md"}: A Call is a specific order for an AI to use one of its `Tools`. If the `Tool` is "send an email," a `Call` would be "send an email to mom with the subject 'Hello!' and the message 'I'll be home soon.'"

  > Sidenote:
  > - [004: Agent/Call](./004_agent_call.md)

- :dfn[Cutoff Time]{canonical="Cutoff Time" href="./108_concept_visibility.md#the-cutoff-time-temporal-retrieval"}: This is like asking, "What did this look like last Tuesday at 3 PM?" When you ask for an `Idea`, you can give a Cutoff Time to get the version that was considered the latest at that exact moment in the past.

  > Sidenote:
  > - [108: Concept/Visibility](./108_concept_visibility.md)

- :dfn[Method]{canonical="Method" href="./004_agent_call.md"}: This is the way a `Call` gets its job done.
  - :dfn[Explicit Execution]{canonical="Explicit Execution" href="./003_agent_activity.md"}: The job is done by a specific piece of computer code (an `Activity`). It's predictable, like using a calculator—you always get the right answer.

    > Sidenote:
    > - [003: Agent/Activity](./003_agent_activity.md)

  - :dfn[Latent Execution]{canonical="Latent Execution" href="./104_concept_latent.md"}: The job is done by the AI's own brain. It's more creative and flexible, like asking an artist to draw a picture instead of just tracing one.

    > Sidenote:
    > - [104: Concept/Latent](./104_concept_latent.md)

- :dfn[Delegate]{canonical="Delegate" href="./013_agent_delegate.md"}: This is like hiring a specialist to do a job in a separate, clean workshop. You give them only the specific tools and information they need, so they can work without being distracted by anything else or accidentally messing up your main project.

  > Sidenote:
  > - [013: Agent/Delegate](./013_agent_delegate.md)

- :dfn[Scope]{canonical="Scope" href="./014_agent_scopes.md"}: A Scope is the specific set of information you give a specialist when you :term[Delegate]{canonical="Delegate"} a task. It's like handing a chef only the ingredients for one dish so they can focus on making it perfectly.

  > Sidenote:
  > - [014: Agent/Scopes](./014_agent_scopes.md)

- :dfn[Loop]{canonical="Loop" href="./010_agent_loop.md"}: This is when an AI works on a problem step-by-step. It will keep thinking and using its tools in a cycle, or `Loop`, until it finally has enough information to give the final answer.

  > Sidenote:
  > - [010: Agent/Loop](./010_agent_loop.md)

- :dfn[Output Path]{canonical="Output Path" href="./008_agent_output.md"}: This is a label you put on a `Tool`'s result that tells the system where to file it away. It’s like writing "Homework" on a piece of paper and putting it in your "Homework" folder so you can find it later.

  > Sidenote:
  > - [008: Agent/Output](./008_agent_output.md)

- :dfn[Final Output]{canonical="Final Output" href="./008_agent_output.md"}: This is the ultimate answer an AI provides when it decides its job is completely finished. After a lot of thinking and steps (in a :term[Loop]{canonical="Loop"}), this is the final solution it was working towards.

  > Sidenote:
  > - [008: Agent/Output](./008_agent_output.md)

- :dfn[Meta Message]{canonical="Meta Message" href="./015_agent_meta.md"}: This is a special message that tells an AI the official name and address of an `Idea`. It's like an ID card for the `Idea`, so the AI knows exactly which one it's working with.

  > Sidenote:
  > - [015: Agent/Meta](./015_agent_meta.md)

- :dfn[Meta Properties]{canonical="Meta Properties" href="./015_agent_meta.md"}: This is the information on the `Idea`'s ID card. It includes details like its name, where it belongs, and which version it is.

  > Sidenote:
  > - [015: Agent/Meta](./015_agent_meta.md)

- :dfn[HITL (Human-in-the-Loop)]{canonical="HITL (Human-in-the-Loop)" href="./010_agent_loop.md#human-in-the-loop-hitl"}: This means having a person step in to check the AI's work. Before the AI takes a big action, a human can look at what it plans to do and say "Yes, go ahead," "No, stop," or "Change it a little bit."

  > Sidenote:
  > - [010: Agent/Loop](./010_agent_loop.md#human-in-the-loop-hitl)

- :dfn[Hierarchical Versioning]{canonical="Hierarchical Versioning" href="./108_concept_visibility.md#versioning-creating-the-states-to-be-seen"}: A way of naming different versions of an `Idea` that shows how they are related. A name like `1.2.feature-x.3` can tell you it's the 3rd draft of a new feature, which is part of version 1.2. It's like a family tree for ideas.

  > Sidenote:
  > - [108: Concept/Visibility](./108_concept_visibility.md)

- :dfn[Evolution]{canonical="Evolution" href="./106_concept_evolution.md"}: This is the process where an AI-Native system can learn and improve itself over time, all on its own. It's like a video game character that not only levels up its skills but can also rewrite its own code to become better.

  > Sidenote:
  > - [106: Concept/Evolution](./106_concept_evolution.md)

- :dfn[Emergent Identity]{canonical="Emergent Identity" href="./107_concept_identity.md"}: An identity that isn't defined by one single thing, but appears from how a bunch of `Ideas` are connected. It’s like how a single dot doesn't mean much, but millions of dots connected in a certain way can create a picture of a face.

  > Sidenote:
  > - [107: Concept/Identity](./107_concept_identity.md)

- :dfn[idea:]{canonical="idea:" href="./110_concept_addressing.md"}: This is a special address format, like `http://` for websites, but used for finding and asking for `Ideas`. It's the universal way to navigate and locate any `Idea` in the system.

  > Sidenote:
  > - [110: Concept/Addressing](./110_concept_addressing.md)

- :dfn[Identity Relationships]{canonical="Identity Relationships" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: These are the different ways `Ideas` can be connected to each other, which helps create their identity.
  - :dfn[Lineage]{canonical="Lineage" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: The history of an `Idea`, showing how it has changed from its past versions to its future ones.
  - :dfn[Causality]{canonical="Causality" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: When one `Idea` directly causes another `Idea` to be created. It's a cause-and-effect link.
  - :dfn[Grouping]{canonical="Grouping" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: This is how you can bundle a bunch of related `Ideas` together into one package, like putting all your school subjects into one backpack.

  > Sidenote:
  > - [107: Concept/Identity](./107_concept_identity.md)

- :dfn[State Message]{canonical="State Message" href="./009_agent_state.md"}: A message that remembers the current situation or progress. If an AI is solving a puzzle, the `State Message` is a note it keeps that says, "Okay, I've solved these three parts, and now I'm working on the fourth."

  > Sidenote:
  > - [009: Agent/State](./009_agent_state.md)

- :dfn[Data Message]{canonical="Data Message" href="./005_agent_data.md"}: This is a message that holds important information that doesn't change. It's like a sticky note an AI keeps in front of it to remember a key fact, like "The user's name is Alex."

  > Sidenote:
  > - [005: Agent/Data](./005_agent_data.md)

- :dfn[Plan]{canonical="Plan" href="./011_agent_plan.md"}: This is the AI's strategy, like a flowchart of the steps it will take. It's the AI's game plan for how it will use its tools to reach a goal. The AI can even update the plan as it goes.

  > Sidenote:
  > - [011: Agent/Plan](./011_agent_plan.md)

- :dfn[Process Idea]{canonical="Process Idea" href="./011_agent_plan.md"}: A special `Idea` that holds both the AI's game `Plan` and keeps track of where it is in that plan. It's a living recipe that not only tells you the steps but also remembers which step you're on.

  > Sidenote:
  > - [011: Agent/Plan](./011_agent_plan.md)

- :dfn[Vessel Idea]{canonical="Vessel Idea" href="./202_idea_vessel.md"}: This is a special `Idea` that knows all the possible moves in a game or situation, and also remembers the exact move it chose to make. It's like a chess master who knows every possible move but also records the one specific move they decided to play.

  > Sidenote:
  > - [202: Idea/Vessel](./202_idea_vessel.md)

- :dfn[Instancing]{canonical="Instancing" href="./012_agent_instancing.md"}: The process of handling many different tasks at the same time, but keeping each one separate. Imagine playing ten different games of tic-tac-toe at once, but having a different notepad to track the moves for each game so you don't get them mixed up.

  > Sidenote:
  > - [012: Agent/Instancing](./012_agent_instancing.md)

- :dfn[Request]{canonical="Request" href="./001_agent_request.md"}: This is a single, complete job you give to the AI. You provide the background information (`context`) and the rules for the answer (`schema`), and the AI gives you back a single `solution`.

  > Sidenote:
  > - [001: Agent/Request](./001_agent_request.md)

- :dfn[Instance]{canonical="Instance" href="./012_agent_instancing.md"}: In an `Instancing` process, an Instance is one single task out of the many you are handling. It's like one of the ten tic-tac-toe games you're playing at the same time.

  > Sidenote:
  > - [012: Agent/Instancing](./012_agent_instancing.md)

- :dfn[Reactor]{canonical="Reactor" href="./303_ideator_reactor.md"}: A special `Idea Transformer` that acts like a universal game engine. You give it the current state of a game, and it figures out and gives you back the *next* state of the game after one turn.

  > Sidenote:
  > - [303: Ideator/Reactor](./303_ideator_reactor.md)

- :dfn[Variable Reference]{canonical="Variable Reference" href="./007_agent_variables.md"}: This is a special code, like a secret password, that an AI can use to grab a piece of information from its memory. For example, instead of writing "Alex," it might write `†input.userName` to automatically pull the user's name from the input it was given.

  > Sidenote:
  > - [007: Agent/Variables](./007_agent_variables.md)
