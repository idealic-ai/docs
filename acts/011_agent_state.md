# 011: Agent/State

> [!DEFINITION] [State Message](./000_glossary.md)
> A persistent `Data` message that represents the live, evolving memory of a workflow. It acts as a set of local variables, enabling multi-step, stateful operations

> Sidenote:
>
> - Requires:
>   - [004: Agent/Call](./004_agent_call.md)
>   - [006: Agent/Data](./006_agent_data.md)
> - Enables:
>   - [012: Agent/Plan](./012_agent_plan.md)
> - Complemented by:
>   - [013: Agent/Instancing](./013_agent_instancing.md)

This document describes the **State message**, a specialized `Data` message that provides persistent memory for an agent's execution loop. While [Variables](./010_agent_variables.md) provide the "wires" to connect tools, the `State` object provides the "scratchpad" where the results of these connections are stored and maintained across multiple steps.

The `State` object acts as the source of truth for the current status of a request and is the key to resilience and resumption. Because it captures the complete context of a workflow at a specific point in time, it allows a process to be paused and resumed. When a new iteration begins, the `State` from the previous tick provides the LLM with a clear understanding of where the process left off, ensuring subsequent operations can seamlessly continue the work.

## Guiding the Workflow with a Schema

Providing a `schema` for the `State` object is an optional but powerful step. The schema documents the intended data flow by defining a set of expected properties. This implicitly defines the interactions between `Tools` and hints at the overall process. This creates a strong feedback loop for the LLM: knowing what properties the `State` should contain, it is guided to generate `Tool Calls` with corresponding `_outputPath` values. This improves results by ensuring the agent's actions are structurally correct and aligned with the desired workflow.

## Multi-Step Tools

The primary function of the `State` message is to allow different `Tools` to share information within a single, continuous process. It enables stateful operations by providing a shared canvas where `Tools` can store their results.

This is achieved through a simple read/write mechanism: one `Tool` can write its output to the `State` object, and another `Tool` can then read that data as its input in a subsequent step. This allows for the creation of toolchains, where the output of one capability directly informs the input of the next, all without losing context between executions.

## Planning vs. Execution

The combination of writing to state via `_outputPath` and reading from it with **Variable References** is the core mechanism that enables the separation of planning from execution. It allows an agent to construct a complete data-flow graph—a chain of `Tool Calls` linked by references—_before_ any tool is run.

This graph of references can be validated, reused, and even simulated, making it fully compatible with the latent execution of LLMs. The flexibility of this system comes from the ability to control both inputs and outputs at the schema level. A workflow designer can leave the **`Variable References`** (inputs) and the **`_outputPath`** (outputs) dynamic for the LLM to decide, or prescribe them to enforce a rigid, reliable data flow.

> [!HEADSUP] Heads up
> Creating `Tool Calls` that are connected to each other via the `State` is the act of planning. This system provides the technical groundwork for this process: a persistent `State` acts as the canvas, `Variable References` and `_outputPath` act as the wires, and the agent **Loop** provides the iterative engine. Together, these components allow an agent to construct a complete data-flow graph, which is the essence of a **Plan**.
>
> > Sidenote:
> >
> > - [005: Agent/Loop](./005_agent_loop.md)
> > - [012: Agent/Plan](./012_agent_plan.md)

## Composition

- **Call:** The `Call` system is intimately linked with `State` through the `_outputPath` meta-property. This property transforms a `Tool Call`, which could otherwise be a stateless, pure function, into a state-modifying operation. By specifying an `_outputPath`, a `Call` directs the engine to write its result into the `State` object, making it the primary mechanism for an agent to record the outcome of its actions. This interaction allows a sequence of `Calls` to build upon each other, creating a chain of cause and effect that is recorded in the `State`.

  > Sidenote:
  >
  > - [004: Agent/Call](./004_agent_call.md)

- **Data:** The `State` message is fundamentally a specialized application of the `Data` message system, using a `Data` message with `kind: "state"`. It leverages the core features of `Data` messages to establish a persistent memory for the agent. The `schema` property is used to define the expected structure of this memory, providing a blueprint that guides the LLM's actions. Furthermore, the merging capabilities of the `Data` system are critical, allowing for the `State` to be updated incrementally through a series of patches, with the system resolving them into a single, coherent view.

  > Sidenote:
  >
  > - [006: Agent/Data](./006_agent_data.md)

- **Imports:** The `Imports` system is the primary mechanism for providing a `State` object to a `Tool` running in an isolated context, such as a **Module**. When a `Call` is delegated, the `_imports` property can specify that the `state` should be included in the module's "clean room" environment. This allows encapsulated tools to read from and interact with the main workflow's state in a controlled and explicit manner.

  > Sidenote:
  >
  > - [008: Agent/Imports](./008_agent_imports.md)

- **Plan:** While `State` enables simple tool sequences, its full power is realized when used as the backbone of the `Plan` system. In a `Plan`, a workflow is represented as a directed acyclic graph (DAG) where `Tool Calls` are the nodes. The `State` object provides the connections—the edges—between these nodes. It allows one node to write into a variable and others to read from it, enabling complex patterns like logical forks (if-else) or parallel fan-outs.

  > Sidenote:
  >
  > - [012: Agent/Plan](./012_agent_plan.md)

- **Instancing:** The `State` message is fully compatible with the `Instancing` system. When a request processes multiple `Instances`, each one maintains its own isolated `State` object, identified by a unique `_instance` key. `Variable References` (e.g., `†state.currentUser.id`) are automatically and transparently routed to the correct `State` object corresponding to the `Instance` the `Tool Call` is targeting. This allows a single, generic `Plan` to be executed across many different states in parallel with guaranteed data isolation.

  > Sidenote:
  >
  > - [013: Agent/Instancing](./013_agent_instancing.md)

## From Single State to Orchestrated Workflows

The `State` message provides the mechanism for managing the memory of a single, coherent workflow. With a persistent scratchpad and the variables to connect tools, we can now design and execute complex, multi-step workflows.

The next document, **[012: Agent/Plan](./012_agent_plan.md)**, describes the system for orchestrating these workflows as a graph of `Tool Calls`.
