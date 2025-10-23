# 003: Agent/Activity

> [!DEFINITION] [Activity](./000_glossary.md)
> An explicit, asynchronous function that implements the logic for a :term[Tool]{canonical="Tool"}. It is the mechanism for executing actions that require external API calls, database operations, or any task that cannot be handled by an LLM's latent space.

> Sidenote:
>
> - Requires: :term[002: Agent/Tool]{href="./002_agent_tool.md"}

This document describes the **Activity Protocol**, which defines how :term[Tool]{canonical="Tool"}s are backed by concrete, executable code. While a :term[Tool]{canonical="Tool"} defines a capability's interface, an :term[Activity]{canonical="Activity"} provides its implementation.

## The Dual Registry Architecture

The agent system employs two complementary registries to separate a capability's interface from its implementation:

- **:term[Tool Registry]{canonical="Tool"}**: Stores the schema definitions for :term[Tool]{canonical="Tool"}s.
- **:term[Activity Registry]{canonical="Activity"}**: Stores the explicit `async` code functions (:term[Activities]{canonical="Activity"}) that implement :term[Tool]{canonical="Tool"}s.

This separation is the key to the system's flexibility. It allows :term[Tool]{canonical="Tool"}s to be defined and used in a latent-only mode (where the LLM generates the output directly) and allows for different implementations of an :term[Activity]{canonical="Activity"} to be swapped in without changing the :term[Tool]{canonical="Tool"}'s interface (e.g., for different environments like development and production).

## Activity Registration

An :term[Activity]{canonical="Activity"} is registered with a unique name, which is used to bind it to a :term[Tool]{canonical="Tool"}.

::::columns
:::column{title="Activity Implementation"}

```typescript
// Register an Activity implementation.
// By convention, an Activity can be bound to a Tool of the same name.
// Types are automatically inferred from the Tool.
Activity.register('weatherCheck', async call => {
  const data = await weatherAPI.get(call.location);
  return { temperature: data.temp, conditions: data.desc };
});
```

:::
:::column{title="Corresponding Tool Schema"}

```typescript
Tool.register('weatherCheck', {
  type: 'object',
  description: 'Gets the current weather for a location.',
  properties: {
    _tool: { type: 'string', const: 'weatherCheck' },
    location: { type: 'string' },
    _output: {
      type: 'object',
      properties: {
        temperature: { type: 'number' },
        conditions: { type: 'string' },
      },
      required: ['temperature', 'conditions'],
    },
  },
  required: ['location'],
});
```

:::
::::

## Execution Modes: Latent vs. Explicit

The system supports two fundamentally different execution modes for a :term[Tool]{canonical="Tool"}'s :term[Call]{canonical="Call"}:

- **Latent Execution**: Uses the LLM's reasoning capabilities. The agent "thinks through" the problem and produces the output directly in the same invocation. This is the default mode when no :term[Activity]{canonical="Activity"} is found for a :term[Tool]{canonical="Tool"}.
  > Sidenote:
  >
  > - :term[104: Concept/Latent]{href="./104_concept_latent.md"}
- **Explicit Execution**: Delegates the :term[Call]{canonical="Call"} to deterministic code. An :term[Activity]{canonical="Activity"} function is invoked to compute the output. This is essential for interacting with the outside world (e.g., APIs, databases) or for tasks requiring precise, repeatable logic.

## Activity Resolution Strategy

The system uses a zero-configuration strategy to determine which execution mode to use when a :term[Tool]{canonical="Tool"} is called. The `_activity` field in a :term[Tool]{canonical="Tool"}'s schema signals the intent to use an explicit implementation. This field is resolved automatically during schema composition based on the following rules:

1.  **Explicit `_activity` Field**: If the :term[Tool]{canonical="Tool"} definition itself includes a non-empty `_activity` string, that value is used to look up the :term[Activity]{canonical="Activity"} in the registry.
2.  **Same-Name Convention (Recommended)**: If no `_activity` field is present on the :term[Tool]{canonical="Tool"}, the system checks if an :term[Activity]{canonical="Activity"} has been registered with the **same name** as the :term[Tool]{canonical="Tool"}. If found, the `_activity` field is automatically set to the :term[Tool]{canonical="Tool"}'s name.
3.  **Latent Fallback**: If no matching :term[Activity]{canonical="Activity"} is found by the above rules, the `_activity` field is set to an empty string, signaling that the :term[Call]{canonical="Call"} should be executed latently.

This convention-based approach simplifies development:

- **For zero-configuration, register your :term[Activity]{canonical="Activity"} under the same name as your :term[Tool]{canonical="Tool"}.**
- :term[Tool]{canonical="Tool"}s without a corresponding :term[Activity]{canonical="Activity"} will automatically and safely default to latent execution.
- An explicit `_activity` field in a :term[Tool]{canonical="Tool"} schema will always take precedence, allowing a single :term[Activity]{canonical="Activity"} to implement multiple :term[Tool]{canonical="Tool"} interfaces.

## Why Separate Activities Matter

Without separating :term[Tool]{canonical="Tool"} schemas from :term[Activity]{canonical="Activity"} implementations, the definition of a capability would be permanently tied to its execution logic. To switch from an LLM-based implementation to an external API, one would need to find and modify every agent that uses that :term[Tool]{canonical="Tool"}.

The dual registry architecture solves this by keeping :term[Tool]{canonical="Tool"} interfaces stable while allowing their underlying implementations to evolve. Agents interact with a consistent :term[Tool]{canonical="Tool"} schema, regardless of whether it is executed latently by an LLM or explicitly by an :term[Activity]{canonical="Activity"}. This means:

- **Implementation changes don't break agents**: You can switch from latent to explicit execution without touching the agent's code.
- **A/B testing execution strategies**: You can compare the performance of LLM reasoning versus an external API for the same capability.
- **Gradual rollouts**: You can deploy new :term[Activity]{canonical="Activity"} implementations to a subset of agents while others continue to use the old one or the latent fallback.

## From Definition to Action

By separating the "what" (:term[Tool]{canonical="Tool"}) from the "how" (:term[Activity]{canonical="Activity"}), the system gains immense flexibility. But this is only part of the story. With interfaces and implementations defined, the final piece is orchestration: how these :term[Call]{canonical="Call"}s are managed, executed, and sequenced.

The next document, :term[004: Agent/Call]{href="./004_agent_call.md"}, explores the protocol that governs this execution, turning abstract definitions into concrete, stateful actions.
