# 011: Agent/Instancing

> [!DEFINITION] [Instancing](./000_glossary.md)
> The process of handling multiple, independent `Instances` (each with its own `State Object` and unique identifier) within a single agent request.

> Sidenote:
>
> - Requires: [009: Agent/State](./009_agent_state.md)
> - Compatible:
>   - [007: Agent/Input](./007_agent_input.md)
>   - [013: Agent/Scopes](./013_agent_scopes.md)
>   - [010: Agent/Plan](./010_agent_plan.md)

The **Instancing Protocol** is a data-centric pattern for scaling agentic workflows. It allows a single, reusable [Plan](./010_agent_plan.md) to be executed concurrently across multiple, independent `State` objects, dramatically improving throughput and consistency.

## The Instancing Mechanism

Instancing is built upon the foundation of the **[009: Agent/State](./009_agent_state.md)** protocol. Instead of providing a single `State Object`, a request can include an array of them, each representing a distinct `Instance` of a task.

To manage these concurrent contexts, each `State` message is assigned a **unique identifier** via a special `_instance` property. These identifiers are short, unique tokens (e.g., `①`, `②`) that allow the LLM to associate operations with a specific `Instance`.

This approach provides significant benefits:

- **Efficiency**: It multiplies the throughput of the system by processing many instances in a single LLM request.
- **Consistency**: By allowing the LLM to see multiple related instances in a single context, it can generate more consistent and higher-quality plans.

## Composition with Context Messages

The protocol's power comes from how the `_instance` identifier scopes the behavior of different context message types.

- **State:** The `State` message is the core of the protocol. Each `Instance` is a distinct `State Object`, uniquely identified by the `_instance` property. This provides an isolated canvas for a sequence of operations, ensuring that parallel workflows do not interfere with one another.

  > Sidenote:
  >
  > - [009: Agent/State](./009_agent_state.md)

- **Input:** An `Input` message can be used in two ways. A global `Input` message (without an `_instance` identifier) provides configuration for all instances in a batch. A targeted `Input` message (with an `_instance` identifier) provides data for a specific `State Object`, overriding any global input.

  > Sidenote:
  >
  > - [007: Agent/Input](./007_agent_input.md)

- **Scopes:** The `_instance` identifier provides critical data isolation for `Scopes`. When a `Call` targets a specific instance, its `_scopes` are also scoped to that instance's context. This is what allows a `Delegate` to see only the data relevant to its specific unit of work, even when it is being orchestrated as one of many within a larger, multi-instance request.

  > Sidenote:
  >
  > - [013: Agent/Scopes](./013_agent_scopes.md)

## Composition with Other Protocols

Instancing integrates with higher-level protocols to manage execution flow.

- **Calls:** The `_instance` property on a `Call` is the core mechanism that directs its execution. It ensures that all state manipulations—whether writing to an `_outputPath` or reading a value from the state to use as an input—are correctly scoped to the intended `Instance`.

  > Sidenote:
  >
  > - [004: Agent/Call](./004_agent_call.md)

- **Plan:** While instancing provides a mechanism for executing tasks in parallel, a `Plan` defines the sequence of tasks to be performed. A single, reusable `Plan` can be applied to every `Instance` in a request, ensuring that a complex, multi-step workflow is executed consistently across a large batch of data.

  > Sidenote:
  >
  > - [010: Agent/Plan](./010_agent_plan.md)

## From Planning to Process

Where a `Plan` provides the reusable template for a workflow, and `Instancing` provides the mechanism to execute it at scale, a **[Process Idea](./203_idea_process.md)** is the artifact that captures the result. It is the complete, self-contained record of a strategic plan and its live execution state across all instances.
