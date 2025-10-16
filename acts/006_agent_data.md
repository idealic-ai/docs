# 006: Agent/Data

> [!DEFINITION] [Data Message](./000_glossary.md)
> A persistent context message containing a `data` value and an optional `schema`. It is retained across an agent's execution loop to provide a stable, structured context.

> Sidenote:
>
> - Requires:
>   - [001: Agent/Request](./001_agent_request.md)
> - Enables:
>   - [007: Agent/Input](./007_agent_input.md)
>   - [009: Agent/State](./009_agent_state.md)
> - Complemented by:
>   - [005: Agent/Loop](./005_agent_loop.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)

This document describes the :term[Data Protocol], a low-level pattern for providing structured, self-describing information. It serves as a foundational mechanism used by other subsystems, such as :term[Input] and :term[State], to manage structured data within an agent's `context`. Unlike ephemeral messages, :term[Data] messages are persistent and are retained across iterations of an agent's :term[Execution Loop], providing a stable context for multi-step tasks.

## The Data Message

> Sidenote:
>
> - [001: Agent/Request](./001_agent_request.md)

A :term[Data] message is a simple but powerful construct for adding structured context to a :term[Request]. It is a message object that contains the following properties:

- **`data`**: Any JSON value (e.g., string, number, object, array) that contains the payload.
- **`schema`**: An optional JSON Schema that defines the structure and semantic meaning of the `data`.
- **`kind`**: An optional string that identifies the message's role (e.g., `"state"`, `"input"`). This allows the system and the LLM to differentiate between various types of data within the same context.

By pairing data with an optional schema, a :term[Data] message makes the context machine-readable. The `schema` acts as a blueprint, explaining to the LLM what each property means, what its type is, and what constraints apply. This not only guides the LLM's reasoning but also serves as a form of documentation, showing users what is possible to change or configure.

## Merging and Identity

The protocol is designed to handle multiple :term[Data] messages within a single `context`. If the system decides that multiple messages share the same identity, they are merged into a single, coherent object. This is particularly useful for scenarios like applying a series of state patches.

A message's identity is primarily determined by its `kind`. For example, all messages of `kind: "state"` without any other distinguishing features are considered to have the same identity. This identity can be further specified by other protocols, most notably :term[Instancing], which allows for parallel processing by creating distinct contexts.

> Sidenote:
>
> - [011: Agent/Instancing](./011_agent_instancing.md)

When multiple mergeable messages are present (e.g., several `state` objects representing patches), the system can handle this in two ways. First, the agent's :term[Execution Loop] can explicitly merge these objects into a single, coherent state object before presenting it to the LLM. This reduces the cognitive load on the model. Second, the LLM itself can "mentally merge" the information in its latent space, understanding that the separate messages represent different facets of a single concept.

:::::details{title="Example of how data message are seen by LLM" open=false}

- The `text` message is passed through as-is.
- The `data` messages are merged and transformed into a ingle `text` message.

::::columns
:::column{title="What the code looks like"}

```typescript
Agent.Request(config, schema, [
  {
    type: 'text',
    text: "Update the user's city to Austin",
  },

  // Schema is serialized for LLM to understand semantics
  {
    type: 'data',
    kind: 'user',
    description: 'Represents the current user.',
    data: { name: 'John Doe' },
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
        city: { type: 'string' },
      },
    },
  },

  // Second `user` message will merge with the first
  {
    type: 'data',
    kind: 'user',
    data: { age: 30 },
  },
]);
```

:::
:::column{title="What the LLM Sees"}

```typescript
[
  {
    role: 'user',
    content: {
      type: 'text',
      text: "Update the user's city to Austin",
    },
  },
  {
    role: 'user',
    content: {
      type: 'text',
      text: `
        ## Data: ¶user
        {
          "name": "John Doe",
          "age": 30
        }
        Represents the current user.
        Schema for ¶user:
        {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "age": { "type": "number" },
            "city": { "type": "string" }
          }
        }`,
    },
  },
];
```

:::
::::
:::::

## Composition with Other Protocols

The :term[Data] protocol is a foundational pattern that is specialized and extended by several other higher-level protocols.

- **:term[Loop]:** The :term[Execution Loop] relies on :term[Data] messages to maintain continuity. The :term[State] message, a specialized :term[Data] message, is the primary vehicle for persisting information across the ticks of a :term[Loop].

  > Sidenote:
  >
  > - [005: Agent/Loop](./005_agent_loop.md)

- **:term[State]:** The :term[State] protocol uses a :term[Data] message to represent the persistent, evolving memory of a workflow. The message's `schema` defines the structure of the state object, including what properties and :term[Variables] are available.

  > Sidenote:
  >
  > - [010: Agent/State](./010_agent_state.md)

- **:term[Instancing]:** All :term[Data] messages are subject to :term[Instancing]. The `_instance` property acts as a key that scopes the data to a specific execution thread within a larger batch operation. :term[Data] messages with different `_instance` values will not be merged, ensuring data isolation between parallel processes.

  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **:term[Input]:** The :term[Input] protocol uses a :term[Data] message to formally declare the parameters a :term[Request] accepts. This is the mechanism that transforms a static :term[Request] into a reusable, function-like component.

  > Sidenote:
  >
  > - [007: Agent/Input](./007_agent_input.md)

## From Data to Dynamic Connections

The :term[Data] protocol provides a generic container for structured information. With this foundation established, we can now explore how to dynamically connect these pieces of data. This is the critical step that allows an agent to create workflows where the output of one step becomes the input for another.

The next document, :term[008: Agent/Variables]{href="./008_agent_variables.md"}, describes the protocol that makes these dynamic connections possible.
