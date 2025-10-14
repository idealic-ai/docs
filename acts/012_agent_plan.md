# 012: Agent/Plan

> **Plan:** A directed acyclic graph (DAG) of `Tool Calls`. It defines a sequence of actions, with dependencies determined by tools reading from and writing to the `State Object`. — [Glossary](./000_glossary.md)

> [!WARNING]
> This RFC is currently a placeholder and will be expanded in the future. It outlines the foundational concepts of Plans as a higher-level abstraction built upon the State and Call systems.

> Sidenote:
>
> - Requires:
>   - [004: Agent/Call](./004_agent_call.md)
>   - [005: Agent/Loop](./005_agent_loop.md)
>   - [010: Agent/State](./010_agent_state.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)

This document describes the **Plan Protocol**, which elevates agentic capabilities from simple, reactive loops to sophisticated, multi-step workflows. A `Plan` is not merely a script but a stateful, orchestrating `Idea` that directs a data `Idea` through a graph of services.

## 1. The Plan as an External Orchestrator

The most critical architectural principle of the Plan Protocol is the **inversion of control**. The `Plan` is not a property embedded within the data `Idea` it operates on. Instead, the `Plan` is a separate, external `Idea` that holds the state of the process. The data `Idea` is lightweight and simply carries a reference to the `Plan` that is currently orchestrating it.

This decoupling provides several significant advantages:

- **Composability**: A single data `Idea` can participate in multiple, independent processes simultaneously, as it isn't burdened by carrying its own execution logic.
- **Centralized State Management**: The `Plan` `Idea` becomes the single source of truth for the execution state of the workflow. Its `solution` is the current state of the process graph, which is updated at each step. This externalizes and persists the process, making it observable and resilient.
- **Flexibility**: Since the `Plan` is just another `Idea`, it can be dynamically created, modified, and composed by other AI-native processes, allowing for adaptable and self-optimizing workflows.

## 2. Orchestration and Execution

A `Plan` defines a directed acyclic graph (DAG) of `Tool Calls`. It's an executable graph of actions designed to be run within an **[005: Agent/Loop](./005_agent_loop.md)**. While a single iteration of the loop can execute a set of parallel `Call`s, a `Plan` allows the agent to define and follow a multi-step sequence with dependencies, effectively orchestrating a series of loops to achieve a larger goal.

When a service in the pipeline completes its task on a data `Idea`, it uses the `Plan` reference (e.g., passed as a header or in the call context) to determine the next destination. The `Plan` is responsible for routing the `Idea` to the next service in the graph.

For long-running or complex processes, the execution of a `Plan` is best handled by a resilient workflow engine like Temporal, which can persist the state of the execution graph across distributed systems and over long periods.

## 3. Security and Privacy

By centralizing the orchestration logic, the `Plan` acts as a secure gatekeeper of information.

- **Compartmentalization**: Individual services within the pipeline do not need to know the entire workflow. They receive an `Idea`, perform their function, and return it to the orchestrator. They have no knowledge of where the data came from or where it is going next.
- **Secret Management**: The `Plan` can securely hold secrets, API keys, or other sensitive context. It can then provide this information to a specific service on a need-to-know basis, without exposing it to the rest of the pipeline or embedding it in the data `Idea` itself.

This model ensures that the system remains nimble and secure, allowing for the construction of complex pipelines where privacy and access control are managed by the orchestrating `Plan`.
