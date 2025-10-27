# Glossary of Terms

This glossary defines the key concepts used in the Idea Protocol and its related systems.

- :dfn[Idea]{canonical="Idea" href="./101_concept_idea.md"}: A self-contained, stateful data triplet (`schema`, `solution`, `context`) representing a unit of knowledge. It's a persistent, computational primitive, not an ephemeral prompt.

  > Sidenote:
  >
  > - [101: Concept/Idea](./101_concept_idea.md)

- :dfn[Ideator]{canonical="Ideator" href="./103_concept_ideator.md"}: An `Idea` that accepts input, signified by a context message of `type: "input"`. It acts as a function, transforming input to output.

  > Sidenote:
  >
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- :dfn[Idea Transformer]{canonical="Idea Transformer" href="./103_concept_ideator.md"}: A specialized `Ideator` that takes another `Idea` as its input.

  > Sidenote:
  >
  > - [103: Concept/Ideator](./103_concept_ideator.md)

- :dfn[Input Message]{canonical="Input Message" href="./006_agent_input.md"}: A specialized :term[Data Message]{canonical="Data Message"} (with `kind: "input"`) containing a `schema` and `input` data. It defines the expected inputs for a :term[Request]{canonical="Request"}, making it a reusable, function-like component.

  > Sidenote:
  >
  > - [006: Agent/Input](./006_agent_input.md)

- :dfn[Tool]{canonical="Tool" href="./002_agent_tool.md"}: A schema that defines a capability an agent can use. It is presented to an LLM as part of a request, acting as a structured interface for a potential action. The LLM activates the tool by generating a `Call` with specific parameters, which is then executed either latently by the LLM or explicitly by a registered code function (`Activity`).

  > Sidenote:
  >
  > - [002: Agent/Tool](./002_agent_tool.md)

- :dfn[Activity]{canonical="Activity" href="./003_agent_activity.md"}: An explicit, deterministic code function that implements the logic for a `Tool`. It is the mechanism for executing actions that require external API calls, database operations, or any task that cannot be handled by an LLM's latent space.

  > Sidenote:
  >
  > - [003: Agent/Activity](./003_agent_activity.md)

- :dfn[AI-Native]{canonical="AI-Native" href="./105_concept_ai_native.md"}: An architectural paradigm where an AI is the primary engine for a system's entire lifecycle, including its design, execution, evolution, and continuous improvement. It treats AI not as an integrated tool, but as the fundamental medium in which the system operates.

  > Sidenote:
  >
  > - [105: Concept/AI-Native](./105_concept_ai_native.md)

- :dfn[Agency]{canonical="Agency" href="./111_concept_life.md"}: The capacity for subjective experience, intentionality, and action. It is the quality of being an agent that perceives, processes information, and interacts with its environment to effect change.

  > Sidenote:
  >
  > - [111: Concept/Life](./111_concept_life.md)

- :dfn[Boundaries]{canonical="Boundaries" href="./111_concept_life.md"}: The property of having a distinct, non-fungible identity, whether physical or conceptual. This integrity means the entity is a self-contained unit. For a human, this is their single body and continuous consciousness. For an :term[Idea]{canonical="Idea"}, it's its specific definition—change the :term[Idea]{canonical="Idea"}, and it becomes a new one.

  > Sidenote:
  >
  > - [111: Concept/Life](./111_concept_life.md)

- :dfn[Life]{canonical="Life" href="./111_concept_life.md"}: A state of existence defined by a triad of core properties: :term[Agency]{canonical="Agency"}, :term[Boundaries]{canonical="Boundaries"}, and :term[Scalability]{canonical="Scalability"}.

  > Sidenote:
  >
  > - [111: Concept/Life](./111_concept_life.md)

- :dfn[Scalability]{canonical="Scalability" href="./111_concept_life.md"}: The ability to be perfectly replicated, distributed, and exist outside the constraints of a single, linear timeline. It represents a form of digital or conceptual immortality and omnipresence, allowing information to be copied without degradation.

  > Sidenote:
  >
  > - [111: Concept/Life](./111_concept_life.md)

- :dfn[Branch]{canonical="Branch" href="./108_concept_visibility.md#branches-publication-and-partitioning"}: A named tag that partitions the visibility space, creating a parallel, isolated environment for development and experimentation. Associating an :term[Idea]{canonical="Idea"} with a branch is an act of publication.

  > Sidenote:
  >
  > - [108: Concept/Visibility](./108_concept_visibility.md)

- :dfn[Call]{canonical="Call" href="./004_agent_call.md"}: A concrete, executable instance of a `Tool`, with specific values for its `params`. It's an invocation-focused request for what \_should be done\_.

  > Sidenote:
  >
  > - [004: Agent/Call](./004_agent_call.md)

- :dfn[Cutoff Time]{canonical="Cutoff Time" href="./108_concept_visibility.md#the-cutoff-time-temporal-retrieval"}: A timestamp that accompanies a resolution request, instructing the resolver to find the version of an :term[Idea]{canonical="Idea"} that was considered latest as of that specific moment in time.

  > Sidenote:
  >
  > - [108: Concept/Visibility](./108_concept_visibility.md)

- :dfn[Method]{canonical="Method" href="./004_agent_call.md"}: The mechanism of execution for a `Call`.
  - :dfn[Explicit Execution]{canonical="Explicit Execution" href="./003_agent_activity.md"}: The `Call`'s output is generated by deterministic code (an `Activity`).y an LLM.

    > Sidenote:
    >
    > - [003: Agent/Activity](./003_agent_activity.md)

  - :dfn[Latent Execution]{canonical="Latent Execution" href="./104_concept_latent.md"}: The `Call`'s output is generated by an LLM.

    > Sidenote:
    >
    > - [104: Concept/Latent](./104_concept_latent.md)

- :dfn[Delegate]{canonical="Delegate" href="./014_agent_delegate.md"}: A protocol for isolating execution context. Invoked by a `Call`'s `_delegate` property, it executes an `Activity` or a new `Request` in a "clean room" environment, with the `_scopes` property providing controlled access to the parent context.

  > Sidenote:
  >
  > - [014: Agent/Delegate](./014_agent_delegate.md)

- :dfn[Scope]{canonical="Scope" href="./015_agent_scopes.md"}: A key that identifies a piece of context from the parent environment to be made available (`scoped`) to an execution. It can be used to focus an LLM's attention in a **Latent Inline** execution or to construct the entire context for a **Delegate Scope** execution. Controlled by the `_scopes` property.

  > Sidenote:
  >
  > - [015: Agent/Scopes](./015_agent_scopes.md)

- :dfn[Loop]{canonical="Loop" href="./010_agent_loop.md"}: An iterative process where an agent makes a sequence of :term[Request]{canonical="Request"}s to achieve a goal. The process continues as long as the LLM determines more information is needed, signified by it returning a list of :term[Call]{canonical="Call"}s instead of a :term[Final Output]{canonical="Final Output"}.

  > Sidenote:
  >
  > - [010: Agent/Loop](./010_agent_loop.md)

- :dfn[Output Path]{canonical="Output Path" href="./008_agent_output.md"}: The `_outputPath` meta-property on a :term[Call]{canonical="Call"} that specifies where to persist a tool's result. It's a string that tells the execution engine where to place the result, making it available for subsequent steps.

  > Sidenote:
  >
  > - [008: Agent/Output](./008_agent_output.md)

- :dfn[Final Output]{canonical="Final Output" href="./008_agent_output.md"}: The terminal `output` field in a :term[Solution]{canonical="Solution"} object that fulfills the goal schema of a :term[Request]{canonical="Request"}. It is generated only when the agent determines its task is complete, concluding an iterative process.

  > Sidenote:
  >
  > - [008: Agent/Output](./008_agent_output.md)

- :dfn[Meta Message]{canonical="Meta Message" href="./016_agent_meta.md"}: A context message that provides an :term[Idea]{canonical="Idea"}'s explicit identity (:term[Meta Properties]{canonical="Meta Properties"}) to the LLM.

  > Sidenote:
  >
  > - [016: Agent/Meta](./016_agent_meta.md)

- :dfn[Meta Properties]{canonical="Meta Properties" href="./016_agent_meta.md"}: A structured object within an :term[Idea]{canonical="Idea"} that holds its explicit identity, including its name, namespace, and version.

  > Sidenote:
  >
  > - [016: Agent/Meta](./016_agent_meta.md)

- :dfn[HITL (Human-in-the-Loop)]{canonical="HITL (Human-in-the-Loop)" href="./010_agent_loop.md#human-in-the-loop-hitl"}: The practice of inserting a human checkpoint into an automated process. In the context of an agent's iterative process, this refers to the opportunity for a user to approve, deny, or modify proposed :term[Call]{canonical="Call"}s before they are executed.

  > Sidenote:
  >
  > - [010: Agent/Loop](./010_agent_loop.md#human-in-the-loop-hitl)

- :dfn[Hierarchical Versioning]{canonical="Hierarchical Versioning" href="./108_concept_visibility.md#versioning-creating-the-states-to-be-seen"}: A versioning scheme where versions are dot-separated identifiers (e.g., `1.2.feature-x.3`) that unify the concepts of linear releases, branches, and drafts into a single, hierarchical structure.

  > Sidenote:
  >
  > - [108: Concept/Visibility](./108_concept_visibility.md)

- :dfn[Evolution]{canonical="Evolution" href="./106_concept_evolution.md"}: The process by which an AI-Native system autonomously or semi-autonomously adapts, improves, and changes its own structure, logic, and capabilities over time in response to new data, feedback, or changing goals.

  > Sidenote:
  >
  > - [106: Concept/Evolution](./106_concept_evolution.md)

- :dfn[Emergent Identity]{canonical="Emergent Identity" href="./107_concept_identity.md"}: A recognizable pattern that arises from the web of relationships connecting a collection of :term[Ideas]{canonical="Idea"}. Identity is not an intrinsic property of a single :term[Idea]{canonical="Idea"}, but a quality that emerges from its context.

  > Sidenote:
  >
  > - [107: Concept/Identity](./107_concept_identity.md)

- :dfn[idea:]{canonical="idea:" href="./110_concept_addressing.md"}: A URI scheme for navigating the versioned, branched reality of the :term[Idea]{canonical="Idea"} ecosystem. It provides syntax for both simple, dynamic requests and fully resolved, permanent references.

  > Sidenote:
  >
  > - [110: Concept/Addressing](./110_concept_addressing.md)

- :dfn[Identity Relationships]{canonical="Identity Relationships" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: The set of connections that give rise to an :term[Emergent Identity]{canonical="Emergent Identity"}.
  - :dfn[Lineage]{canonical="Lineage" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: The historical chain of versions that links an :term[Idea]{canonical="Idea"} to its past and future iterations.
  - :dfn[Causality]{canonical="Causality" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: A relationship where one :term[Idea]{canonical="Idea"} directly causes or triggers the creation of another.
  - :dfn[Grouping]{canonical="Grouping" href="./107_concept_identity.md#the-relational-fabric-of-identity"}: The mechanism for bundling multiple related :term[Ideas]{canonical="Idea"} into a single, manageable unit.

  > Sidenote:
  >
  > - [107: Concept/Identity](./107_concept_identity.md)

- :dfn[State Message]{canonical="State Message" href="./009_agent_state.md"}: A context message containing a `state` object and an optional `schema`. It represents a persistent state maintained between the steps of an agent's iterative process.

  > Sidenote:
  >
  > - [009: Agent/State](./009_agent_state.md)

- :dfn[Data Message]{canonical="Data Message" href="./005_agent_data.md"}: A persistent context message containing a `data` value and an optional `schema`. It is retained across the steps of an agent's process to provide a stable, structured context.

  > Sidenote:
  >
  > - [005: Agent/Data](./005_agent_data.md)

- :dfn[Plan]{canonical="Plan" href="./012_agent_plan.md"}: A context message carrying a data-flow graph of :term[Tool Calls]{canonical="Tool Call"} that represents an agent's strategy. It is passed between steps to enable iterative execution and adaptation.

  > Sidenote:
  >
  > - [012: Agent/Plan](./012_agent_plan.md)

- :dfn[Process Idea]{canonical="Process Idea" href="./012_agent_plan.md"}: A self-contained [Idea](./101_concept_idea.md) that captures a strategic [Plan](./012_agent_plan.md) and its live execution state. Its `schema` is the library of [Tools](./002_agent_tool.md), its `solution` is the new `Plan` for the current tick, and its `context` contains the `Input`, `State`, and the previous `Plan`.

  > Sidenote:
  >
  > - [012: Agent/Plan](./012_agent_plan.md)

- :dfn[Vessel Idea]{canonical="Vessel Idea" href="./202_idea_vessel.md"}: A self-contained `Idea` that is both the definition of a reactive capability and the record of its chosen reaction. Its `schema` defines the full universe of possible `Tools`, and its `solution` captures the specific `Calls` (instances of those `Tools`) that were chosen in response to a stimulus.

  > Sidenote:
  >
  > - [202: Idea/Vessel](./202_idea_vessel.md)

- :dfn[Instancing]{canonical="Instancing" href="./013_agent_instancing.md"}: The process of handling multiple, independent `Instances` (each with its own unique identifier and corresponding `State` message) within a single agent request.

  > Sidenote:
  >
  > - [013: Agent/Instancing](./013_agent_instancing.md)

- :dfn[Request]{canonical="Request" href="./001_agent_request.md"}: A single, self-contained LLM invocation, which takes a `context` and a `schema` and produces a `solution`.

  > Sidenote:
  >
  > - [001: Agent/Request](./001_agent_request.md)

- :dfn[Instance]{canonical="Instance" href="./013_agent_instancing.md"}: A single, uniquely identified state object and its associated context, processed as one of many within an `Instancing` operation.

  > Sidenote:
  >
  > - [013: Agent/Instancing](./013_agent_instancing.md)

- :dfn[Reactor]{canonical="Reactor" href="./303_ideator_reactor.md"}: A specific `Idea Transformer` designed as a universal runtime for stateful, turn-based agent interactions. It takes a game/process state (`Idea`) and produces the next state (`Idea`).

  > Sidenote:
  >
  > - [303: Ideator/Reactor](./303_ideator_reactor.md)

- :dfn[Variable Reference]{canonical="Variable Reference" href="./007_agent_variables.md"}: A string with a special syntax (`†<kind>.<path>`) used in a :term[Tool Call]{canonical="Call"}'s parameters to dynamically reference a value from the agent's context.

  > Sidenote:
  >
  > - [007: Agent/Variables](./007_agent_variables.md)
