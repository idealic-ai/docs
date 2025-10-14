# 003: Agent/Activity

> **Activity:** An explicit, asynchronous function that implements the logic for a `Tool`. It is the mechanism for executing actions that require external API calls, database operations, or any task that cannot be handled by an LLM's latent space. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires: [002: Agent/Tool](./002_agent_tool.md)

This document describes the **Activity Protocol**, which defines how `Tools` are backed by concrete, executable code. While a `Tool` defines a capability's interface, an `Activity` provides its implementation.

## The Dual Registry Architecture

The agent system employs two complementary registries to separate a capability's interface from its implementation:

- **Tool Registry**: Stores the schema definitions for `Tools`.
- **Activity Registry**: Stores the explicit `async` code functions (`Activities`) that implement `Tools`.

This separation is the key to the system's flexibility. It allows `Tools` to be defined and used in a latent-only mode (where the LLM generates the output directly) and allows for different implementations of an `Activity` to be swapped in without changing the `Tool`'s interface (e.g., for different environments like development and production).

## Activity Registration

An `Activity` is registered with a unique name, which is used to bind it to a `Tool`.

```typescript
// Register an Activity implementation.
// By convention, an Activity can be bound to a Tool of the same name.
Activity.register('weatherCheck', async call => {
  const data = await weatherAPI.get(call.location);
  return { temperature: data.temp, conditions: data.desc };
});
```

## Execution Modes: Latent vs. Explicit

The system supports two fundamentally different execution modes for a `Tool`'s `Call`:

- **Latent Execution**: Uses the LLM's reasoning capabilities. The agent "thinks through" the problem and produces the output directly in the same invocation. This is the default mode when no `Activity` is found for a `Tool`.
  > Sidenote:
  >
  > - [104: Concept/Latent](./104_concept_latent.md)
- **Explicit Execution**: Delegates the `Call` to deterministic code. An `Activity` function is invoked to compute the output. This is essential for interacting with the outside world (e.g., APIs, databases) or for tasks requiring precise, repeatable logic.

## Activity Resolution Strategy

The system uses a zero-configuration strategy to determine which execution mode to use when a `Tool` is called. The `_activity` field in a `Tool`'s schema signals the intent to use an explicit implementation. This field is resolved automatically during schema composition based on the following rules:

1.  **Explicit `_activity` Field**: If the `Tool` definition itself includes a non-empty `_activity` string, that value is used to look up the `Activity` in the registry.
2.  **Same-Name Convention (Recommended)**: If no `_activity` field is present on the `Tool`, the system checks if an `Activity` has been registered with the **same name** as the `Tool`. If found, the `_activity` field is automatically set to the `Tool`'s name.
3.  **Latent Fallback**: If no matching `Activity` is found by the above rules, the `_activity` field is set to an empty string, signaling that the `Call` should be executed latently.

This convention-based approach simplifies development:

- **For zero-configuration, register your `Activity` under the same name as your `Tool`.**
- `Tool`s without a corresponding `Activity` will automatically and safely default to latent execution.
- An explicit `_activity` field in a `Tool` schema will always take precedence, allowing a single `Activity` to implement multiple `Tool` interfaces.

## Why Separate Activities Matter

Without separating `Tool` schemas from `Activity` implementations, the definition of a capability would be permanently tied to its execution logic. To switch from an LLM-based implementation to an external API, one would need to find and modify every agent that uses that `Tool`.

The dual registry architecture solves this by keeping `Tool` interfaces stable while allowing their underlying implementations to evolve. Agents interact with a consistent `Tool` schema, regardless of whether it is executed latently by an LLM or explicitly by an `Activity`. This means:

- **Implementation changes don't break agents**: You can switch from latent to explicit execution without touching the agent's code.
- **A/B testing execution strategies**: You can compare the performance of LLM reasoning versus an external API for the same capability.
- **Gradual rollouts**: You can deploy new `Activity` implementations to a subset of agents while others continue to use the old one or the latent fallback.

## From Definition to Action

By separating the "what" (`Tool`) from the "how" (`Activity`), the system gains immense flexibility. But this is only part of the story. With interfaces and implementations defined, the final piece is orchestration: how these `Calls` are managed, executed, and sequenced.

The next document, [004: Agent/Call](./004_agent_call.md), explores the protocol that governs this execution, turning abstract definitions into concrete, stateful actions.
