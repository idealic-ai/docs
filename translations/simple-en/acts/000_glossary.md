# A Dictionary of Big Ideas

This dictionary explains the main words and ideas you'll see in the Idea Protocol system.

- :dfn[Advisor]{canonical="Advisor" href="./017_agent_advisor.md"}: Think of this as giving the AI a special hat to wear. Before it decides what to do, you can tell it: "Think like a scientist" or "Act like a detective." The Advisor gives the AI a personality or a way of thinking, so it can give you an opinion or a score (like how sure it is) *before* it takes action or picks a :term[Tool]{canonical="Tool"}.

  > Sidenote:
  > - [017: Agent/Advisor](./017_agent_advisor.md)

- :dfn[Idea]{canonical="Idea" href="./101_concept_idea.md"}: An Idea isn't just a quick thought or question. It's a complete, self-contained package of knowledge, like a digital recipe card. It holds the rules (`schema`), the final result (`solution`), and the background story (`context`). Unlike a question you ask a smart assistant, an Idea can be saved, shared, and used over and over again.

  > Sidenote:
  > - [101: Concept/Idea](./101_concept_idea.md)

- :dfn[Ideator]{canonical="Ideator" href="./103_concept_ideator.md"}: This is a special kind of `Idea` that's built to take something in and give something back. It works like a machine or a function: you put something in, and it gives you something new out. It knows to expect an input because it has a special message inside that says `type: "input"`.

  > Sidenote:
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- :dfn[Idea Transformer]{canonical="Idea Transformer" href="./103_concept_ideator.md"}: This is a very specific type of `Ideator`. Its job is to take a whole `Idea` as its input and transform it into a new one.

  > Sidenote:
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- :dfn[Input Message]{canonical="Input Message" href="./006_agent_input.md"}: This is a special message that clearly describes what kind of information an :term[Ideator]{canonical="Ideator"} needs to do its job. It's like the label on a machine that says, "Please insert a coin here." This makes it predictable and easy to reuse.

  > Sidenote:
  > - [006: Agent/Input](./006_agent_input.md)

- :dfn[Tool]{canonical="Tool" href="./002_agent_tool.md"}: A Tool is like a special app or skill the AI can use to get a job done. For example, it could have a 'Calculator' tool or a 'Search the Web' tool. The AI looks at the task it needs to do and chooses the right Tool from its toolbox. To use the tool, the AI has to make a `Call` and give it the right information (parameters), just like you type numbers into a calculator.

  > Sidenote:
  > - [002: Agent/Tool](./002_agent_tool.md)

- :dfn[Activity]{canonical="Activity" href="./003_agent_activity.md"}: If a Tool is like an app's icon on your phone, the Activity is the actual code that runs when you tap it. It’s the behind-the-scenes work that makes the Tool do something real, like connecting to the internet, saving a file, or doing a calculation. It's the action part of the Tool.

  > Sidenote:
  > - [003: Agent/Activity](./003_agent_activity.md)

- :dfn[AI-Native]{canonical="AI-Native" href="./105_concept_ai_native.md"}: This describes a system where the AI isn't just an add-on or a feature. Instead, the AI is the very foundation—the architect, the builder, and the janitor all in one. It designs itself, runs itself, and even figures out how to improve itself over time. The AI isn't just *in* the system; it *is* the system.

  > Sidenote:
  > - [105: Concept/AI-Native](./105_concept_ai_native.md)

- :dfn[Agency]{canonical="Agency" href="./111_concept_life.md"}: This is the ability to make choices and take action on your own. It's what makes you a 'doer' instead of just a thing that gets acted upon. It's about having your own point of view, making decisions, and trying to change the world around you.

  > Sidenote:
  > - [111: Concept/Life](./111_concept_life.md)

- :dfn[Boundaries]{canonical="Boundaries" href="./111_concept_life.md"}: This means being a unique, distinct thing. For a person, it's your body and your single, continuous stream of thoughts—you are you, and nobody else. For an :term[Idea]{canonical="Idea"}, its boundary is its exact definition. If you change the Idea, even a little, it becomes a new, different Idea.

  > Sidenote:
  > - [111: Concept/Life](./111_concept_life.md)

- :dfn[Life]{canonical="Life" href="./111_concept_life.md"}: In this system, 'Life' isn't about biology. It's a special status for anything that has three key things: :term[Agency]{canonical="Agency"} (it can act on its own), :term[Boundaries]{canonical="Boundaries"} (it's a unique thing), and :term[Scalability]{canonical="Scalability"} (it can be copied perfectly).

  > Sidenote:
  > - [111: Concept/Life](./111_concept_life.md)

- :dfn[Scalability]{canonical="Scalability" href="./111_concept_life.md"}: This is the ability to be copied perfectly, over and over, without losing any quality. Think about how you can copy a file on a computer. The copy is exactly the same as the original. This allows an idea or a piece of information to exist in many places at once, and to last forever.

  > Sidenote:
  > - [111: Concept/Life](./111_concept_life.md)

- :dfn[Branch]{canonical="Branch" href="./108_concept_visibility.md#branches-publication-and-partitioning"}: Imagine a project has a main timeline. A Branch is like creating a separate, parallel timeline where you can try out new things without messing up the main one. It’s a safe space to experiment. When you move an :term[Idea]{canonical="Idea"} to a branch, it's like publishing it in that separate world.

  > Sidenote:
  > - [108: Concept/Visibility](./108_concept_visibility.md)

- :dfn[Call]{canonical="Call" href="./004_agent_call.md"}: A Call is the specific command to use a `Tool`. If 'Calculator' is the `Tool`, then 'add 2 and 3' is the `Call`. It's the instruction that tells the Tool exactly what to do right now, with all the necessary details filled in.

  > Sidenote:
  > - [004: Agent/Call](./004_agent_call.md)

- :dfn[Cutoff Time]{canonical="Cutoff Time" href="./108_concept_visibility.md#the-cutoff-time-temporal-retrieval"}: This is like asking, "What was the 'latest version' of this :term[Idea]{canonical="Idea"} back on Tuesday at 3 PM?" It’s a timestamp you can use to look back in time and find the specific version of an Idea that was considered final at that exact moment.

  > Sidenote:
  > - [108: Concept/Visibility](./108_concept_visibility.md)

- :dfn[Method]{canonical="Method" href="./004_agent_call.md"}: This is simply the *way* a `Call` gets its job done.
  - :dfn[Explicit Execution]{canonical="Explicit Execution" href="./003_agent_activity.md"}: The result is produced by predictable, straightforward code (an `Activity`). It does the same thing every time, like a simple calculator.

    > Sidenote:
    > - [003: Agent/Activity](./003_agent_activity.md)

  - :dfn[Latent Execution]{canonical="Latent Execution" href="./104_concept_latent.md"}: The result is generated by the creative, thinking part of an AI. This is used for tasks that need understanding or creativity, not just simple math.

    > Sidenote:
    > - [104: Concept/Latent](./104_concept_latent.md)

- :dfn[Delegate]{canonical="Delegate" href="./014_agent_delegate.md"}: This is like giving a task to a helper in a completely separate, clean room. The helper can't see anything from your messy desk unless you specifically hand them a piece of information they need. It ensures a task is done without any outside interference.

  > Sidenote:
  > - [014: Agent/Delegate](./014_agent_delegate.md)

- :dfn[Scope]{canonical="Scope" href="./015_agent_scopes.md"}: When you :term[Delegate]{canonical="Delegate"} a task, a Scope is the specific piece of information you hand to your helper in the clean room. It's like giving them only the one clue they need to solve a puzzle, which helps them focus and not get distracted by anything else.

  > Sidenote:
  > - [015: Agent/Scopes](./015_agent_scopes.md)

- :dfn[Loop]{canonical="Loop" href="./010_agent_loop.md"}: This is when an AI works on a big problem step-by-step. It asks a question, gets a clue, and uses that clue to ask the next question. It keeps going around in this 'loop' of gathering information until it's confident it has the final answer. It's like a detective solving a case one clue at a time.

  > Sidenote:
  > - [010: Agent/Loop](./010_agent_loop.md)

- :dfn[Output Path]{canonical="Output Path" href="./008_agent_output.md"}: This is a simple instruction that tells the computer where to save the result of a :term[Tool]{canonical="Tool"}'s work. It's like putting a label on a file and telling the system exactly which folder to put it in so it can be found later.

  > Sidenote:
  > - [008: Agent/Output](./008_agent_output.md)

- :dfn[Final Output]{canonical="Final Output" href="./008_agent_output.md"}: This is the grand finale. After an AI has finished its work, possibly after going through a :term[Loop]{canonical="Loop"} of thinking, the Final Output is the complete answer it was looking for. It's the solution to the original problem.

  > Sidenote:
  > - [008: Agent/Output](./008_agent_output.md)

- :dfn[Meta Message]{canonical="Meta Message" href="./016_agent_meta.md"}: This is like an :term[Idea]{canonical="Idea"}'s name tag. It's a special message that tells the AI the :term[Idea]{canonical="Idea"}'s official name, where it belongs, and which version it is, so it's not confused with any other Idea.

  > Sidenote:
  > - [016: Agent/Meta](./016_agent_meta.md)

- :dfn[Meta Properties]{canonical="Meta Properties" href="./016_agent_meta.md"}: This is the information written on the name tag—the :term[Idea]{canonical="Idea"}'s name, its category (namespace), and its version number. It’s the formal identity of an Idea.

  > Sidenote:
  > - [016: Agent/Meta](./016_agent_meta.md)

- :dfn[HITL (Human-in-the-Loop)]{canonical="HITL (Human-in-the-Loop)" href="./010_agent_loop.md#human-in-the-loop-hitl"}: This means putting a human in charge of the 'Go' button. When an AI is working on a task, it might propose a series of actions. HITL means that before the AI can actually perform those actions, a person has to check them and give the okay.

  > Sidenote:
  > - [010: Agent/Loop](./010_agent_loop.md#human-in-the-loop-hitl)

- :dfn[Hierarchical Versioning]{canonical="Hierarchical Versioning" href="./108_concept_visibility.md#versioning-creating-the-states-to-be-seen"}: This is a fancy way of naming different versions of an Idea, like `1.2.feature-x.3`. It's a system that lets you keep track of big official releases, experimental branches, and personal drafts all in one organized structure, like folders inside folders.

  > Sidenote:
  > - [108: Concept/Visibility](./108_concept_visibility.md)

- :dfn[Evolution]{canonical="Evolution" href="./106_concept_evolution.md"}: For an :term[AI-Native]{canonical="AI-Native"} system, this is the process of it growing and improving all by itself. Based on new information or feedback, the system can change its own rules, learn new skills, and adapt to become better at its job over time.

  > Sidenote:
  > - [106: Concept/Evolution](./106_concept_evolution.md)

- :dfn[Emergent Identity]{canonical="Emergent Identity" href="./107_concept_identity.md"}: An identity isn't something one :term[Idea]{canonical="Idea"} has on its own. It's a recognizable personality or purpose that appears when you see how a whole collection of :term[Ideas]{canonical="Idea"} are connected to each other. It's like how a single dot is just a dot, but many dots connected together can form a picture.

  > Sidenote:
  > - [107: Concept/Identity](./107_concept_identity.md)

- :dfn[idea:]{canonical="idea:" href="./110_concept_addressing.md"}: This is a special kind of web address used to find and ask for :term[Ideas]{canonical="Idea"}. It's a universal way to navigate the entire world of Ideas, letting you ask for the latest version of something or pinpoint an exact version from the past.

  > Sidenote:
  > - [110: Concept/Addressing](./110_concept_addressing.md)

- :dfn[Identity Relationships]{canonical="Identity Relationships" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: These are the different ways :term[Ideas]{canonical="Idea"} can be connected to each other, which helps create their shared :term[Emergent Identity]{canonical="Emergent Identity"}.
  - :dfn[Lineage]{canonical="Lineage" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: This is the family tree of an :term[Idea]{canonical="Idea"}, showing how it connects to its older versions and newer updates.
  - :dfn[Causality]{canonical="Causality" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: This is a direct link where one :term[Idea]{canonical="Idea"} causes another one to be created. It's a 'this led to that' connection.
  - :dfn[Grouping]{canonical="Grouping" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: This is how you can bundle several related :term[Ideas]{canonical="Idea"} together into a single package, making them easier to manage.

  > Sidenote:
  > - [107: Concept/Identity](./107_concept_identity.md)

- :dfn[State Message]{canonical="State Message" href="./009_agent_state.md"}: This is the AI's short-term memory. As an agent works through the steps of a task, this message holds onto important information, like a notepad, so it can remember what it's done and what it knows from one step to the next.

  > Sidenote:
  > - [009: Agent/State](./009_agent_state.md)

- :dfn[Data Message]{canonical="Data Message" href="./005_agent_data.md"}: This is like a sticky note that an agent keeps around while it's working. It holds a specific piece of information that doesn't change from step to step, providing a stable piece of context for the entire task.

  > Sidenote:
  > - [005: Agent/Data](./005_agent_data.md)

- :dfn[Plan]{canonical="Plan" href="./012_agent_plan.md"}: This is the AI's strategy or to-do list. It's a map of the Tools it plans to use and in what order. The plan can be updated at each step, allowing the AI to change its mind and adapt as it learns more.

  > Sidenote:
  > - [012: Agent/Plan](./012_agent_plan.md)

- :dfn[Process Idea]{canonical="Process Idea" href="./012_agent_plan.md"}: This is an Idea that is also an active process. It's a complete package that holds not only the AI's strategic :term[Plan]{canonical="Plan"}, but also keeps track of where it is in that plan right now. It contains its available :term[Tools]{canonical="Tool"}, its current `Plan`, and all the context it needs to take the next step.

  > Sidenote:
  > - [012: Agent/Plan](./012_agent_plan.md)

- :dfn[Vessel Idea]{canonical="Vessel Idea" href="./202_idea_vessel.md"}: This is a special `Idea` that does two jobs at once. First, it defines all the possible actions something can take (its `Tools`). Second, it records the exact action that was chosen in a specific situation. It's both the playbook and the record of the play that was actually run.

  > Sidenote:
  > - [202: Idea/Vessel](./202_idea_vessel.md)

- :dfn[Instancing]{canonical="Instancing" href="./013_agent_instancing.md"}: This is the skill of juggling. It's how one AI can handle many different tasks or conversations at the same time, keeping each one separate and remembering the state of each without getting them mixed up.

  > Sidenote:
  > - [013: Agent/Instancing](./013_agent_instancing.md)

- :dfn[Request]{canonical="Request" href="./001_agent_request.md"}: This is a single, complete question or task that you give to the AI. You provide the background information (`context`) and describe what you want (`schema`), and the AI gives you back a solution (`solution`).

  > Sidenote:
  > - [001: Agent/Request](./001_agent_request.md)

- :dfn[Instance]{canonical="Instance" href="./013_agent_instancing.md"}: When an AI is juggling many tasks (:term[Instancing]{canonical="Instancing"}), each individual task with its own memory and context is called an Instance. It's one of the many balls the AI has in the air.

  > Sidenote:
  > - [013: Agent/Instancing](./013_agent_instancing.md)

- :dfn[Reactor]{canonical="Reactor" href="./303_ideator_reactor.md"}: This is a universal game engine. It's a special `Idea Transformer` that can take the current state of a game or process (as an `Idea`) and figure out the very next state. You give it what's happening now, and it tells you what happens next.

  > Sidenote:
  > - [303: Ideator/Reactor](./303_ideator_reactor.md)

- :dfn[Variable Reference]{canonical="Variable Reference" href="./007_agent_variables.md"}: This is a special shortcut, like a nickname. Instead of writing out a long piece of information that the agent already knows, you can use a special code (like `†data.username`) in a :term[Tool Call]{canonical="Call"} to tell it, "Go grab that piece of information from your memory and plug it in here."

  > Sidenote:
  > - [007: Agent/Variables](./007_agent_variables.md)
