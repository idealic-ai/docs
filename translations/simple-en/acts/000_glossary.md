# A Dictionary of Cool Terms

This page explains the big words and ideas you'll see in the Idea Protocol and all the things connected to it.

- :dfn[Idea]{canonical="Idea" href="./101_concept_idea.md"}: Think of an Idea as a smart recipe card. It's a little package of information that has three parts: the list of ingredients (`schema`), the cooking instructions (`solution`), and some notes from the last time you made it (`context`). It's a permanent building block, not just a temporary thought.

  > Sidenote:
  >
  > - [101: Concept/Idea](./101_concept_idea.md)

- :dfn[Ideator]{canonical="Ideator" href="./103_concept_ideator.md"}: This is a special kind of Idea that acts like a machine. You put something into it (like numbers into a calculator), and it does something to give you a result. It's an Idea that's built to take action.

  > Sidenote:
  >
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- :dfn[Idea Transformer]{canonical="Idea Transformer" href="./103_concept_ideator.md"}: This is a special kind of Ideator that works on other Ideas. Imagine a machine that takes one recipe card and turns it into a totally new one, like turning a cookie recipe into a brownie recipe.

  > Sidenote:
  >
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- :dfn[Input Message]{canonical="Input Message" href="./007_agent_input.md"}: This is like the label on a mailbox slot that says "Letters Only." It's a message that tells an Ideator exactly what kind of information it's expecting to receive before it can do its job.

  > Sidenote:
  >
  > - [007: Agent/Input](./007_agent_input.md)

- :dfn[Tool]{canonical="Tool" href="./002_agent_tool.md"}: Think of this as a button an AI can press to do something. The Tool is the _description_ of the button—what it's called and what it does. The AI can look at a list of available tools and decide to "press one" to get something done, like "look up weather" or "send message."

  > Sidenote:
  >
  > - [002: Agent/Tool](./002_agent_tool.md)

- :dfn[Activity](./000_glossary.md): A function that is written in code and does a specific job. It's used when an AI needs to do something in the real world, like making a payment or sending an email, which the AI can't do by just "thinking."

- :dfn[AI-Native](./000_glossary.md): A way of building things where an AI is in charge of the whole process—from coming up with the idea, to building it, and even improving it over time. It means the AI isn't just a tool you use; it's the main creator.

- :dfn[Agency](./000_glossary.md): This is the power to have your own experiences, make your own choices, and take action. It's the ability to see the world and decide to change it.

- :dfn[Boundaries](./000_glossary.md): This is the power of being a unique, one-of-a-kind thing. For a person, it's your single body and your own personal thoughts. For an :term[Idea]{canonical="Idea"}, it's the specific thing it means—if you change an :term[Idea]{canonical="Idea"} too much, it becomes a new one.

- :dfn[Life]{canonical="Life" href="./111_concept_life.md"}: In our digital world, we say something has "Life" if it has three special qualities: the ability to act on its own (:term[Agency]{canonical="Agency"}), a unique identity (:term[Boundaries]{canonical="Boundaries"}), and the ability to be copied and spread around easily (:term[Scalability]{canonical="Scalability"}).

- :dfn[Scalability]{canonical="Scalability" href="./111_concept_life.md"}: The power to be copied perfectly over and over again. Think about how you can share a photo with all your friends, and everyone gets an exact copy. That photo is scalable; it can exist in many places at once without getting worn out.

- :dfn[Branch]{canonical="Branch" href="./108_concept_visibility.md#branches-publication-and-partitioning"}: Imagine a main road where everyone works on a project. A Branch is like creating a private, side road. You can build and experiment with new things there without messing up the main road. When you're ready, you can merge your work back in.

- :dfn[Call]{canonical="Call" href="./004_agent_call.md"}: This is the actual act of "pressing the button." A Tool is just the _idea_ of an action, but a Call is the specific command, like "look up the weather _for Paris right now_."

  > Sidenote:
  >
  > - [004: Agent/Call](./004_agent_call.md)

- :dfn[Cutoff Time]{canonical="Cutoff Time" href="./108_concept_visibility.md#the-cutoff-time-temporal-retrieval"}: This is like asking, "Show me the most popular song as of last Tuesday." It's a timestamp that lets you find the version of an Idea that was considered the latest at a specific point in the past.

- :dfn[Method]{canonical="Method" href="./004_agent_call.md"}: This is the _way_ an action gets done after a Tool is Called.
  - :dfn[Explicit Execution]{canonical="Explicit Execution" href="./003_agent_activity.md"}: This is when a real piece of code (an `Activity`) runs to get the job done. It's predictable and always does the same thing, like a calculator.

    > Sidenote:
    >
    > - [003: Agent/Activity](./003_agent_activity.md)

  - :dfn[Latent Execution]{canonical="Latent Execution" href="./104_concept_latent.md"}: This is when the AI itself figures out the answer without running any separate code. It just uses its own massive brain to generate a response, like a creative writer coming up with a story.

    > Sidenote:
    >
    > - [104: Concept/Latent](./104_concept_latent.md)

- :dfn[Delegate]{canonical="Delegate" href="./012_agent_delegate.md"}: This is like asking someone to do a job for you in a separate, clean room. The AI can give a task to another process to handle, giving it only the specific information it needs to do the job without seeing everything else.

  > Sidenote:
  >
  > - [012: Agent/Delegate](./012_agent_delegate.md)

- :dfn[Scope]{canonical="Scope" href="./013_agent_scopes.md"}: This is the specific information you pass into that "clean room." When you delegate a task, you use a Scope to give the worker just the right tools and context, so it's not distracted by anything else.

  > Sidenote:
  >
  > - [013: Agent/Scopes](./013_agent_scopes.md)

- :dfn[Loop]{canonical="Loop" href="./005_agent_loop.md"}: This is how an AI agent works to solve a big problem. It makes a request, gets back a plan of action (`Calls`), does the actions, and then uses the results to make its next request. It keeps doing this over and over, or "looping," until the job is done.

  > Sidenote:
  >
  > - [005: Agent/Loop](./005_agent_loop.md)

- :dfn[HITL (Human-in-the-Loop)]{canonical="HITL (Human-in-the-Loop)" href="./005_agent_loop.md#human-in-the-loop-hitl"}: This means having a person step in to approve the AI's actions. It's like a safety check where the AI shows you what it plans to do next, and you get to say "Yes, go ahead" or "No, stop!" before it does it.

  > Sidenote:
  >
  > - [005: Agent/Loop](./005_agent_loop.md#human-in-the-loop-hitl)

- :dfn[Hierarchical Versioning]{canonical="Hierarchical Versioning" href="./108_concept_visibility.md#versioning-creating-the-states-to-be-seen"}: A fancy way of naming different versions of something, like `1.2.feature-x.3`. It's like chapters, scenes, and draft numbers all combined into one address, so you always know exactly which version you're looking at.

- :dfn[Evolution]{canonical="Evolution" href="./106_concept_evolution.md"}: The process where an AI system can change and improve itself over time. It's like a video game character that levels up, learning new skills and upgrading its own abilities based on what it experiences.

  > Sidenote:
  >
  > - [106: Concept/Evolution](./106_concept_evolution.md)

- :dfn[Emergent Identity]{canonical="Emergent Identity" href="./107_concept_identity.md"}: An identity that isn't planned but just appears from how things are connected. Think of a sports team. The team has an identity (like "the champions"), but that identity doesn't belong to any single player. It comes from how they all work together.

- :dfn[idea:]{canonical="idea:" href="./109_concept_addressing.md"}: This is a special web address format, like `http:`, but made specifically for finding and using Ideas. It lets you create links that can either ask for the very latest version of an Idea or point to one exact, permanent version.

- :dfn[Identity Relationships]{canonical="Identity Relationships" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: The different kinds of connections between Ideas that help create their identity.
  - :dfn[Lineage]{canonical="Lineage" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: The family tree of an Idea. It shows all the previous versions it came from and all the future versions that came from it.
  - :dfn[Causality]{canonical="Causality" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: A connection where one Idea directly causes another one to be created. It's a "this happened because of that" link.
  - :dfn[Grouping]{canonical="Grouping" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: A way to bundle a bunch of related Ideas together into one package, like putting all your trading cards into a single binder.

- :dfn[State Message]{canonical="State Message" href="./009_agent_state.md"}: This is the AI's short-term memory. It's a message that holds onto important information, like what step it's on, so it can remember what it's doing between each cycle of its work loop.

  > Sidenote:
  >
  > - [009: Agent/State](./009_agent_state.md)

- :dfn[Data Message]{canonical="Data Message" href="./006_agent_data.md"}: A message that holds onto key information that doesn't change often. It's like a sticky note that the AI keeps in front of it to remember important facts while it works.

- :dfn[Plan]{canonical="Plan" href="./010_agent_plan.md"}: A map of the AI's strategy. It's a message that shows all the steps (the Tool Calls) the AI wants to take and in what order, so it can follow a plan and change it if needed.

  > Sidenote:
  >
  > - [010: Agent/Plan](./010_agent_plan.md)

- :dfn[Process Idea]{canonical="Process Idea" href="./010_agent_plan.md"}: This is an Idea whose whole job is to manage a multi-step project. It holds the library of possible Tools, the current Plan for what to do next, and the memory of what's already been done.

  > Sidenote:
  >
  > - [010: Agent/Plan](./010_agent_plan.md)

- :dfn[Vessel Idea]{canonical="Vessel Idea" href="./202_idea_vessel.md"}: An Idea that acts like a command center for making decisions. It knows all the possible actions it could take (the `Tools`), and its job is to listen for an event and then choose the right actions (`Calls`) in response.

  > Sidenote:
  >
  > - [202: Idea/Vessel](./202_idea_vessel.md)

- :dfn[Instancing]{canonical="Instancing" href="./011_agent_instancing.md"}: This is the process of handling many different tasks at the same time, but keeping each one separate. Imagine a teacher grading homework for 20 students at once. She treats each student's paper as its own `Instance`, with its own grade and notes.

  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- :dfn[Request]{canonical="Request" href="./001_agent_request.md"}: A single, focused question that you ask an AI. You give it some background information (`context`) and the rules for the answer (`schema`), and it gives you back a structured answer (`solution`).

- :dfn[Instance]{canonical="Instance" href="./011_agent_instancing.md"}: One of the individual tasks being handled in an `Instancing` process. In the homework example, each student's paper is one `Instance`.

  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- :dfn[Reactor]{canonical="Reactor" href="./303_ideator_reactor.md"}: A special kind of Idea Transformer that's designed to play a game or run a process. You give it the current state of the game (as an `Idea`), and it tells you what the next state should be (as a new `Idea`).

  > Sidenote:
  >
  > - [303: Ideator/Reactor](./303_ideator_reactor.md)

- :dfn[Refiner]{canonical="Refiner" href="./103_concept_ideator.md#the-refiner-an-ideator-for-evolution"}: A special Idea Transformer that's used to upgrade another Idea. You give it an Idea and a request (like "add a new feature"), and it gives you back a new, improved version of that Idea.

- :dfn[Search Path]{canonical="Search Path" href="./108_concept_visibility.md#the-search-path-prioritized-retrieval"}: A priority list that tells our system where to look for an Idea. It's like saying, "First, check my personal folder for it. If it's not there, check the team folder. Finally, check the main company library."

- :dfn[Sovereignty]{canonical="Sovereignty" href="./102_concept_sovereignty.md"}: This is the principle that you are the true owner of your Ideas. You control their official home on the internet (usually through a domain name you own), so you decide what the "real" version is.

- :dfn[Variable Reference]{canonical="Variable Reference" href="./004_agent_call.md"}: A special code (it looks like `†<kind>.<path>`) that acts like a pointer. It lets the AI connect its tools together by saying, "Take the answer from that last tool you used and plug it in as the input for this next tool."

- :dfn[Solution]{canonical="Solution" href="./001_agent_request.md"}: The final, structured answer that an AI gives back after you make a `Request`. It neatly packages up the actions the AI wants to take and any final output for you.
