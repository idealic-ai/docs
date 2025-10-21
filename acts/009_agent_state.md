# 009: Agent/State

> [!DEFINITION] [State Message](./000_glossary.md)
> A persistent `Data` message that represents the live, evolving memory of a workflow. It acts as a set of local variables, enabling multi-step, stateful operations

> Sidenote:
>
> - Requires:
>   - [004: Agent/Call](./004_agent/call.md)
>   - [006: Agent/Data](./006_agent/data.md)
> - Enables:
>   - [010: Agent/Plan](./010_agent/plan.md)
> - Complemented by:
>   - [011: Agent/Instancing](./011_agent/instancing.md)
>   - [012: Agent/Delegate](./012_agent/delegate.md)
>   - [013: Agent/Scopes](./013_agent/scopes.md)

This document describes the **State message**, a specialized :term[Data]{canonical="Data"} message that provides persistent memory for an agent's :term[Execution Loop]{canonical="Execution Loop"}. While :term[Variables]{canonical="Variable"} provide the "wires" to connect tools, the :term[State]{canonical="State"} object provides the "scratchpad" where the results of these connections are stored and maintained across multiple steps.

The :term[State]{canonical="State"} object acts as the source of truth for the current status of a request and is the key to resilience and resumption. Because it captures the complete context of a workflow at a specific point in time, it allows a process to be paused and resumed. When a new iteration begins, the :term[State]{canonical="State"} from the previous tick provides the LLM with a clear understanding of where the process left off, ensuring subsequent operations can seamlessly continue the work.

## Guiding the Workflow with a Schema

Providing a `schema` for the :term[State]{canonical="State"} object is an optional but powerful step. The schema documents the intended data flow by defining a set of expected properties. This implicitly defines the interactions between :term[Tools]{canonical="Tool"} and hints at the overall process. This creates a strong feedback loop for the LLM: knowing what properties the :term[State]{canonical="State"} should contain, it is guided to generate :term[Tool Calls]{canonical="Call"} with corresponding `_outputPath` values. This improves results by ensuring the agent's actions are structurally correct and aligned with the desired workflow.

> Sidenote:
>
> - [008: Agent/Variables](./008_agent_variables.md)

## Multi-Step Tools

The primary function of the :term[State]{canonical="State"} message is to allow different :term[Tools]{canonical="Tool"} to share information within a single, continuous process. It enables stateful operations by providing a shared scratchpad where :term[Tools]{canonical="Tool"} can store their results.

This is achieved through a simple read/write mechanism: one :term[Tool]{canonical="Tool"} can write its output to the :term[State]{canonical="State"} object, and another :term[Tool]{canonical="Tool"} can then read that data as its input in a subsequent step. This allows for the creation of toolchains, where the output of one capability directly informs the input of the next, all without losing context between executions.

## Planning vs. Execution

The combination of writing to state via `_outputPath` and reading from it with :term[Variable References]{canonical="Variable Reference"} is the core mechanism that enables the separation of planning from execution. It allows an agent to construct a complete data-flow graph—a chain of :term[Tool Calls]{canonical="Call"} linked by references—_before_ any tool is run.

This graph of references can be validated, reused, and even simulated, making it fully compatible with the latent execution of LLMs. The flexibility of this system comes from the ability to control both inputs and outputs at the schema level. A workflow designer can leave the :term[Variable References]{canonical="Variable Reference"} (inputs) and the `_outputPath` (outputs) dynamic for the LLM to decide, or prescribe them to enforce a rigid, reliable data flow.

> [!HEADSUP] Heads up
> Creating :term[Tool Calls]{canonical="Call"} that are connected to each other via the :term[State]{canonical="State"} is the act of planning. This system provides the technical groundwork for this process: a persistent :term[State]{canonical="State"} acts as the scratchpad, :term[Variable References]{canonical="Variable Reference"} and `_outputPath` act as the wires, and the agent :term[Loop]{canonical="Loop"} provides the iterative engine. Together, these components allow an agent to construct a complete data-flow graph, which is the essence of a :term[Plan]{canonical="Plan"}.
>
> > Sidenote:
> >
> > - [005: Agent/Loop](./005_agent_loop.md)
> > - [010: Agent/Plan](./010_agent_plan.md)

## Composition

- **:term[Call]{canonical="Call"}:** The :term[Call]{canonical="Call"} system is intimately linked with :term[State]{canonical="State"} through the `_outputPath` meta-property. This property transforms a :term[Tool Call]{canonical="Call"}, which could otherwise be a stateless, pure function, into a state-modifying operation. By specifying an `_outputPath`, a :term[Call]{canonical="Call"} directs the engine to write its result into the :term[State]{canonical="State"} object, making it the primary mechanism for an agent to record the outcome of its actions. This interaction allows a sequence of :term[Calls]{canonical="Call"} to build upon each other, creating a chain of cause and effect that is recorded in the :term[State]{canonical="State"}.

  > Sidenote:
  >
  > - [004: Agent/Call](./004_agent_call.md)

- **:term[Data]{canonical="Data"}:** The :term[State]{canonical="State"} message is fundamentally a specialized application of the :term[Data]{canonical="Data"} message system, using a :term[Data]{canonical="Data"} message with `kind: "state"`. It leverages the core features of :term[Data]{canonical="Data"} messages to establish a persistent memory for the agent. The `schema` property is used to define the expected structure of this memory, providing a blueprint that guides the LLM's actions. Furthermore, the merging capabilities of the :term[Data]{canonical="Data"} system are critical, allowing for the :term[State]{canonical="State"} to be updated incrementally through a series of patches, with the system resolving them into a single, coherent view.

  > Sidenote:
  >
  > - [006: Agent/Data](./006_agent_data.md)

- **:term[Scopes]{canonical="Scope"}:** The :term[Scopes]{canonical="Scope"} system is the primary mechanism for providing a :term[State]{canonical="State"} object to a :term[Tool]{canonical="Tool"} running in an isolated context, such as a :term[Delegate]{canonical="Delegate"}. When a :term[Call]{canonical="Call"} is delegated, the `_scopes` property can specify that the :term[State]{canonical="State"} should be included in the delegate's "clean room" environment. This allows encapsulated tools to read from and interact with the main workflow's state in a controlled and explicit manner.

  > Sidenote:
  >
  > - [013: Agent/Scopes](./013_agent_scopes.md)

- **:term[Instancing]{canonical="Instancing"}:** The :term[State]{canonical="State"} message is fully compatible with the :term[Instancing]{canonical="Instancing"} system. When a request processes multiple :term[Instances]{canonical="Instance"}, each one maintains its own isolated :term[State]{canonical="State"} object, identified by a unique `_instance` key. :term[Variable References]{canonical="Variable Reference"} (e.g., `†state.currentUser.id`) are automatically and transparently routed to the correct :term[State]{canonical="State"} object corresponding to the :term[Instance]{canonical="Instance"} the :term[Tool Call]{canonical="Call"} is targeting. This allows a single, generic `Plan` to be executed across many different states in parallel with guaranteed data isolation.

  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **:term[Plan]{canonical="Plan"}:** While :term[State]{canonical="State"} enables simple tool sequences, its full power is realized when used as the backbone of the :term[Plan]{canonical="Plan"} system. In a :term[Plan]{canonical="Plan"} message, a workflow is represented as a directed acyclic graph (DAG) where :term[Tool Calls]{canonical="Call"} are the nodes. The :term[State]{canonical="State"} object provides the connections—the edges—between these nodes. It allows one node to write into a variable and others to read from it, enabling complex patterns like logical forks (if-else) or parallel fan-outs.

  > Sidenote:
  >
  > - [010: Agent/Plan](./010_agent_plan.md)

## From Single State to Orchestrated Workflows

The :term[State]{canonical="State"} message provides the mechanism for managing the memory of a single, coherent workflow. With a persistent scratchpad and the variables to connect tools, we can now design and execute complex, multi-step workflows.

The next document, :term[010: Agent/Plan]{href="./010_agent_plan.md"}, describes the system for orchestrating these workflows as a graph of :term[Tool Calls]{canonical="Call"}.
