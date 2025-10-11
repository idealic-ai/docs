# 004: Agent/Call

> **Call:** A concrete, executable instance of a `Tool`, with specific values for its `params`. It's an invocation-focused request for what _should be done_.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [103: Concept/Ideator](./103_concept_ideator.md)
> - Enables:
>   - [008: Agent/Imports](./008_agent_imports.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)
>   - [202: Idea/Vessel](./202_idea_vessel.md)
>   - [203: Idea/Process](./203_idea_process.md)
> - Extended by:
>   - [009: Agent/Module](./009_agent_module.md)

The [101: Concept/Idea](./101_concept_idea.md) defines a powerful, self-contained data structure for representing knowledge and latent logic. The [002: Agent/Tool](./002_agent_tool.md) establishes the foundational schema-driven interface that enables agents to understand structured capabilities. This document describes the **004: Agent/Call** protocol, which builds upon Tools to define how execution happens.

A **Call** is a concrete instance of a Tool with specific parameter values, ready for execution. Where Tools define _what can be done_, Calls define _how it gets executed_.

> [!TIP]
> A **[001: Agent/Request](./001_agent_request.md)** that results in a set of `Calls` is a **[202: Idea/Vessel](./202_idea_vessel.md)**. A `Vessel` represents a single, reactive moment of decision-making where an agent selects from available `Tools` to form a response.

## Composition and Context

A `Call` by itself is a simple data structure. Its power comes from its composition with other protocols that manage its execution environment. These protocols are activated by special meta-properties (prefixed with `_`) within a `Tool`'s schema, allowing a single `Call` object to trigger a variety of execution behaviors.

By giving these meta-properties clear semantic meaning, we enable the LLM to be an active participant in the composition. It can reason about the various permutations of these properties to construct complex and novel execution chains, moving beyond simple tool selection to dynamic workflow orchestration.

- **Explicit Execution (`_activity`)**: The most fundamental extension is connecting a `Call` to a deterministic code function. The `_activity` property signals that the `Call` should be executed by an **Activity** rather than by the LLM's latent reasoning.

  > Sidenote:
  >
  > - [003: Agent/Activity](./003_agent_activity.md).

- **Delegated Execution (`_module`)**: A `Call` can be delegated to an external **Module**. The `_module` property typically contains a reference to a saved **[001: Agent/Request](./001_agent_request.md)** (often as a path to a JSON file), allowing that request to be invoked as a reusable tool. This provides an isolated "clean room" for execution, preventing context bleeding and enabling true encapsulation.

  > Sidenote:
  >
  > - [009: Agent/Module](./009_agent_module.md).

- **Context Bridging (`_imports`)**: The **Imports** protocol controls what context is available to a `Call`. Its primary use is to focus an LLM's attention during a latent execution by specifying which parts of the parent context it should consider. This prevents context bleeding and leads to more reliable outputs. When used with a `_module`, its role becomes even more powerful: it strictly defines the _entire_ context for the module's isolated execution.

  > Sidenote:
  >
  > - [008: Agent/Imports](./008_agent_imports.md).

- **Stateful Execution (`_outputPath`)**: A `Call` can be made stateful by instructing it where to write its output. The `_outputPath` property specifies a path within a persistent **State Object** where the result of the `Call` should be stored. This allows for the creation of multi-step workflows where the output of one `Call` can be used as the input for another.

  > Sidenote:
  >
  > - [010: Agent/State](./010_agent_state.md).

- **Instanced Execution (`_instance`)**: A `Call` can be targeted to a specific **Instance** within a multi-instance request. The `_instance` property acts as a unique identifier, focusing all operations of that `Call` (like reading inputs from and writing outputs to the `State Object`) on a particular context. This enables efficient, parallel processing of multiple states with the same set of tools.
  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md).

## Call Execution Patterns

When an agent generates multiple Calls, different execution strategies can be applied based on the application's needs:

```typescript
// Single Call execution
const result = await Tool(call);

// Execute all Calls, wait for all results
const results = await Tool.all(calls);

// Execute all Calls, return first success
const result = await Tool.any(calls);

// Execute all Calls, return first completion (success or failure)
const result = await Tool.race(calls);
```

These patterns enable:

- **Fine-Grained Control**: Process Calls individually with custom logic between executions
- **Batch Processing**: Execute independent Calls in parallel for maximum performance
- **Fail-Fast Strategies**: Stop on first success (`.any()`) or first completion (`.race()`)
- **All-or-Nothing Operations**: Ensure all Calls succeed together (`.all()`), maintaining consistency when Calls are logically grouped

## Orchestrating Calls in a Loop

While these patterns manage the execution of a single batch of `Calls`, agents often need to perform multi-step tasks where the output of one `Call` informs the next. This is handled by a higher-level protocol that orchestrates `Requests` and `Calls` in a sequence.

The next document, **[005: Agent/Loop](./005_agent_loop.md)**, describes this execution loop in detail.
