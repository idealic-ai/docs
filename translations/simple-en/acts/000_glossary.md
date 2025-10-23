# A Dictionary of Our Terms

This page explains the big words and concepts we use in the Idea Protocol and all the things built with it.

- :dfn[Idea]{canonical="Idea" href="./101_concept_idea.md"}: Think of an Idea as a smart recipe. It holds three things: the `schema` (the list of ingredients and rules), the `solution` (the finished dish), and the `context` (the kitchen and tools you used). It's a block of knowledge that can remember things and be worked on, not just a one-time instruction.

  > Sidenote:
  > - [101: Concept/Idea](./101_concept_idea.md)

- :dfn[Ideator]{canonical="Ideator" href="./103_concept_ideator.md"}: This is a special kind of Idea that can take something *from you*. It’s like a recipe for a smoothie—it’s designed to take whatever fruit you give it (`input`) and turn it into a drink.

  > Sidenote:
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- :dfn[Idea Transformer]{canonical="Idea Transformer" href="./103_concept_ideator.md"}: This is a master chef `Ideator` that takes a whole other `Idea` (another recipe) as its ingredient. For example, it could take a cake recipe and transform it into a gluten-free cake recipe.

  > Sidenote:
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- :dfn[Input Message]{canonical="Input Message" href="./007_agent_input.md"}: This is like the order form you give to the chef (`Ideator`). It tells it exactly what kind of ingredients (`input`) it needs from you and what they should look like (`schema`). This makes the whole process predictable, like a function in math.

  > Sidenote:
  > - [007: Agent/Input](./007_agent_input.md)

- :dfn[Tool]{canonical="Tool" href="./002_agent_tool.md"}: A `Tool` is like a kitchen appliance that an AI chef can use. It's a description of a skill, like "blender" or "oven." The AI doesn't use it right away; it just knows it's available. To actually use it, the AI creates a `Call`, which is an instruction like, "Blend the strawberries and bananas."

  > Sidenote:
  > - [002: Agent/Tool](./002_agent_tool.md)

- :dfn[Activity]{canonical="Activity" href="./003_agent_activity.md"}: An `Activity` is the real-world machine that does the work for a `Tool`. If the `Tool` is the "blender" button, the `Activity` is the actual motor and blades that spin. It's the piece of code that connects to the internet or a database to get a job done.

  > Sidenote:
  > - [003: Agent/Activity](./003_agent_activity.md)

- :dfn[AI-Native]{canonical="AI-Native" href="./105_concept_ai_native.md"}: This is like building a house where the AI is not just the architect but also the construction crew, the electrician, and even the house itself. The AI designs, builds, and improves the system, because the system is made *out of* AI.

- :dfn[Agency]{canonical="Agency" href="./111_concept_life.md"}: This is the power to make your own choices and take action. It’s like being the captain of your own ship—you can see the world, decide where to go, and actually turn the wheel to get there.

- :dfn[Boundaries]{canonical="Boundaries" href="./111_concept_life.md"}: This is what makes something a unique, separate thing. For a person, it's your body and your mind. For an :term[Idea]{canonical="Idea"}, it's its exact definition. If you change any part of it, it becomes a new, different :term[Idea]{canonical="Idea"}.

- :dfn[Life]{canonical="Life" href="./111_concept_life.md"}: In our digital world, we say something has "Life" if it has three key things: the power to act (:term[Agency]{canonical="Agency"}), a unique identity (:term[Boundaries]{canonical="Boundaries"}), and the ability to be copied perfectly (:term[Scalability]{canonical="Scalability"}).

- :dfn[Scalability]{canonical="Scalability" href="./111_concept_life.md"}: This is the superpower of digital things. It means you can copy something perfectly, over and over, and have it exist in many places at once. Like a photo you share with friends—every copy is identical to the original.

- :dfn[Branch]{canonical="Branch" href="./108_concept_visibility.md#branches-publication-and-partitioning"}: Imagine you're writing a story. A `Branch` is like making a copy of your story in a separate notebook to try out a new ending. It's a safe, parallel world where you can experiment without changing the main version.

- :dfn[Call]{canonical="Call" href="./004_agent_call.md"}: A `Call` is a specific order to use a `Tool`. If a `Tool` is the "blender" in your kitchen, a `Call` is the command, "Blend these strawberries for 30 seconds." It’s the decision of *what* should be done right now.

  > Sidenote:
  > - [004: Agent/Call](./004_agent_call.md)

- :dfn[Cutoff Time]{canonical="Cutoff Time" href="./108_concept_visibility.md#the-cutoff-time-temporal-retrieval"}: This is like asking, "What did this Wikipedia page look like last Tuesday?" It's a timestamp that lets you find the version of an :term[Idea]{canonical="Idea"} that was considered the latest at a specific moment in the past.

- :dfn[Method]{canonical="Method" href="./004_agent_call.md"}: This is *how* a `Call` gets its job done.
  - :dfn[Explicit Execution]{canonical="Explicit Execution" href="./003_agent_activity.md"}: The result is produced by running real, predictable code (an `Activity`). Think of it like using a calculator—you get the exact same answer every time.

    > Sidenote:
    > - [003: Agent/Activity](./003_agent_activity.md)

  - :dfn[Latent Execution]{canonical="Latent Execution" href="./104_concept_latent.md"}: The result is imagined or created by an AI. It's like asking an artist to draw something—it's creative and comes from the AI's own understanding.

    > Sidenote:
    > - [104: Concept/Latent](./104_concept_latent.md)

- :dfn[Delegate]{canonical="Delegate" href="./012_agent_delegate.md"}: This is like hiring a specialist to do a job in a separate, clean workshop. You give them a specific task and only the tools and information (`_scopes`) they need. This keeps their work from messing up your main project.

  > Sidenote:
  > - [012: Agent/Delegate](./012_agent_delegate.md)

- :dfn[Scope]{canonical="Scope" href="./013_agent_scopes.md"}: A `Scope` is like giving the specialist in the clean workshop a specific key. That key unlocks only the information they need from your main project. It helps the AI focus on what's important for the task.

  > Sidenote:
  > - [013: Agent/Scopes](./013_agent_scopes.md)

- :dfn[Loop]{canonical="Loop" href="./005_agent_loop.md"}: A `Loop` is when an agent tries to solve a problem step-by-step. It makes a plan, performs an action, looks at the result, and then uses that result to make a new plan. It keeps going around this circle until the job is done.

  > Sidenote:
  > - [005: Agent/Loop](./005_agent_loop.md)

- :dfn[Meta Message]{canonical="Meta Message" href="./014_agent_meta.md"}: This is like a name tag for an :term[Idea]{canonical="Idea"}. It explicitly tells the AI the :term[Idea]{canonical="Idea"}'s name, version, and where it belongs, so it's not confused about what it's looking at.

- :dfn[Meta Properties]{canonical="Meta Properties" href="./014_agent_meta.md"}: This is the information written on the name tag—the :term[Idea]{canonical="Idea"}'s name, creator, and version number, all neatly organized.

- :dfn[HITL (Human-in-the-Loop)]{canonical="HITL (Human-in-the-Loop)" href="./005_agent_loop.md#human-in-the-loop-hitl"}: This means having a person step in to approve the AI's work. In the middle of an agent's `Loop`, it might pause and ask a human, "I'm about to do this. Is that okay?" before it continues.

  > Sidenote:
  > - [005: Agent/Loop](./005_agent_loop.md#human-in-the-loop-hitl)

- :dfn[Hierarchical Versioning]{canonical="Hierarchical Versioning" href="./108_concept_visibility.md#versioning-creating-the-states-to-be-seen"}: A way of naming versions that's like a family tree. Instead of just `version 1` and `version 2`, you can have `1.2.feature-x.3`, which shows how different versions, branches, and rough drafts are all related to each other.

- :dfn[Evolution]{canonical="Evolution" href="./106_concept_evolution.md"}: This is when an AI-Native system can improve itself. It's like a living creature that learns from its experiences and adapts its own code and structure to become better at its job over time.

  > Sidenote:
  > - [106: Concept/Evolution](./106_concept_evolution.md)

- :dfn[Emergent Identity]{canonical="Emergent Identity" href="./107_concept_identity.md"}: An identity that isn't defined by just one thing, but by all its connections. Think of a famous detective—their identity comes from the cases they solved, the city they live in, and the friends they have. For :term[Ideas]{canonical="Idea"}, their identity emerges from how they are connected to other :term[Ideas]{canonical="Idea"}.

- :dfn[idea:]{canonical="idea:" href="./110_concept_addressing.md"}: This is like a web address (like `https://`), but specifically for finding and using :term[Ideas]{canonical="Idea"}. It's a universal way to point to any version of any :term[Idea]{canonical="Idea"} anywhere in the system.

- :dfn[Identity Relationships]{canonical="Identity Relationships" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: These are the connections that create an :term[Emergent Identity]{canonical="Emergent Identity"}.
  - :dfn[Lineage]{canonical="Lineage" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: The history of an :term[Idea]{canonical="Idea"}, showing all its past and future versions, like a family tree that goes forwards and backwards in time.
  - :dfn[Causality]{canonical="Causality" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: A connection where one :term[Idea]{canonical="Idea"} directly causes another one to be created. One event leads to the next.
  - :dfn[Grouping]{canonical="Grouping" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: Putting several related :term[Ideas]{canonical="Idea"} into a collection, like putting related files into a single folder to keep them organized.

- :dfn[State Message]{canonical="State Message" href="./009_agent_state.md"}: This is the agent's memory. It's a special message that holds information the agent needs to remember from one step to the next as it works through a problem.

  > Sidenote:
  > - [009: Agent/State](./009_agent_state.md)

- :dfn[Data Message]{canonical="Data Message" href="./006_agent_data.md"}: This is a piece of background information that an agent keeps handy. Unlike memory that changes, this data is usually stable and provides constant context for the agent's work.

- :dfn[Plan]{canonical="Plan" href="./010_agent_plan.md"}: A `Plan` is the agent's strategy, shown as a map of what :term[Tool Calls]{canonical="Tool Call"} to make and in what order. The agent can look at this map, take one step, and then update the map for the next step.

  > Sidenote:
  > - [010: Agent/Plan](./010_agent_plan.md)

- :dfn[Process Idea]{canonical="Process Idea" href="./010_agent_plan.md"}: This is a special [Idea](./101_concept_idea.md) that holds both the agent's `Plan` and its current progress. It's like a project binder that contains the blueprint, the to-do list, and notes on what's been done so far.

  > Sidenote:
  > - [010: Agent/Plan](./010_agent_plan.md)

- :dfn[Vessel Idea]{canonical="Vessel Idea" href="./202_idea_vessel.md"}: Think of this `Idea` as a story where the hero has many possible powers (`Tools`) but has to choose the right one for the situation. The `Vessel Idea` not only lists all the possible powers but also records which power the hero actually chose to use (`Calls`).

  > Sidenote:
  > - [202: Idea/Vessel](./202_idea_vessel.md)

- :dfn[Instancing]{canonical="Instancing" href="./011_agent_instancing.md"}: This is how an agent can multitask efficiently. It handles many different jobs (`Instances`) at the same time in a single request, keeping each one's memory (`State`) separate.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- :dfn[Request]{canonical="Request" href="./001_agent_request.md"}: A `Request` is a single, complete question you ask an AI. You give it some background information (`context`) and a set of rules (`schema`), and it gives you back a structured answer (`solution`).

- :dfn[Instance]{canonical="Instance" href="./011_agent_instancing.md"}: An `Instance` is one of the individual jobs the agent is juggling during an `Instancing` operation. Each one has its own unique ID and its own memory.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- :dfn[Reactor]{canonical="Reactor" href="./303_ideator_reactor.md"}: A special `Idea Transformer` that acts like a game engine for agents. You give it the current state of the game (as an `Idea`), and it figures out and returns the very next state of the game (as a new `Idea`).

  > Sidenote:
  > - [303: Ideator/Reactor](./303_ideator_reactor.md)

- :dfn[Refiner]{canonical="Refiner" href="./103_concept_ideator.md#the-refiner-an-ideator-for-evolution"}: An `Idea Transformer` that acts as a mechanic for other `Ideas`. You give it an `Idea` and a request (like "add a new ingredient to this recipe"), and it gives you back a new, improved version of that `Idea`.

- :dfn[Search Path]{canonical="Search Path" href="./108_concept_visibility.md#the-search-path-prioritized-retrieval"}: This is a priority list that tells the system where to look for an `Idea`. It's like saying, "First, check my notebook for the latest version. If it's not there, check the official library. If it's not there, check the old archives."

- :dfn[Sovereignty]{canonical="Sovereignty" href="./102_concept_sovereignty.md"}: This is the principle that you are the true owner of your creations. By using a system like a website domain name (DNS), you can control the official home for your collection of :term[Ideas]{canonical="Idea"}, and nobody else can claim it.

- :dfn[Variable Reference]{canonical="Variable Reference" href="./004_agent_call.md"}: This is a special code (it looks like `†<kind>.<path>`) that works like a pointer. It lets an agent say, "For this ingredient, use whatever came out of the last step." It's how an agent connects its tools together, using the output of one as the input for another.

- :dfn[Solution]{canonical="Solution" href="./001_agent_request.md"}: The `Solution` is the final, structured answer that an AI gives back after a `Request`. It contains the agent's proposed actions (`Tool Calls`) and its final answer, all fitting neatly into a template you gave it earlier.