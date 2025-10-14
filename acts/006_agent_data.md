# 006: Agent/Data

> **Data Message:** A persistent context message containing a `data` value and an optional `schema`. It is retained across an agent's execution loop to provide a stable, structured context. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [001: Agent/Request](./001_agent_request.md)
> - Enables:
>   - [007: Agent/Input](./007_agent_input.md)
>   - [010: Agent/State](./010_agent_state.md)
> - Complemented by:
>   - [005: Agent/Loop](./005_agent_loop.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)

This document describes the **Data Protocol**, a low-level pattern for providing structured, self-describing information. It serves as a foundational mechanism used by other subsystems, such as [Input](./007_agent_input.md) and [State](./010_agent_state.md), to manage structured data within an agent's `context`. Unlike ephemeral messages, `Data` messages are persistent and are retained across iterations of an agent's execution loop, providing a stable context for multi-step tasks.

## The Data Message

> Sidenote:
>
> - [001: Agent/Request](./001_agent_request.md)

A `Data` message is a simple but powerful construct for adding structured context to a [Request](./001_agent_request.md). It is a message object that contains the following properties:

- **`data`**: Any JSON value (e.g., string, number, object, array) that contains the payload.
- **`schema`**: An optional JSON Schema that defines the structure and semantic meaning of the `data`.
- **`kind`**: An optional string that identifies the message's role (e.g., `"state"`, `"input"`). This allows the system and the LLM to differentiate between various types of data within the same context.

By pairing data with an optional schema, a `Data` message makes the context machine-readable. The `schema` acts as a blueprint, explaining to the LLM what each property means, what its type is, and what constraints apply. This not only guides the LLM's reasoning but also serves as a form of documentation, showing users what is possible to change or configure.

## Merging and Identity

The protocol is designed to handle multiple `Data` messages within a single `context`. If the system decides that multiple messages share the same identity, they are merged into a single, coherent object. This is particularly useful for scenarios like applying a series of state patches.

A message's identity is primarily determined by its `kind`. For example, all messages of `kind: "state"` without any other distinguishing features are considered to have the same identity. This identity can be further specified by other protocols, most notably the [011: Agent/Instancing](./011_agent_instancing.md), which allows for parallel processing by creating distinct contexts.

> Sidenote:
>
> - [011: Agent/Instancing](./011_agent_instancing.md)

When multiple mergeable messages are present (e.g., several `state` objects representing patches), the system can handle this in two ways. First, the agent's execution loop can explicitly merge these objects into a single, coherent state object before presenting it to the LLM. This reduces the cognitive load on the model. Second, the LLM itself can "mentally merge" the information in its latent space, understanding that the separate messages represent different facets of a single concept.

## Composition with Other Protocols

The `Data` protocol is a foundational pattern that is specialized and extended by several other higher-level protocols.

- **Loop:** The execution loop relies on `Data` messages to maintain continuity. The `State` message, a specialized `Data` message, is the primary vehicle for persisting information across the ticks of a loop.

  > Sidenote:
  >
  > - [005: Agent/Loop](./005_agent_loop.md)

- **State:** The `State` protocol uses a `Data` message to represent the persistent, evolving memory of a workflow. The message's `schema` defines the structure of the state object, including what properties and variables are available.

  > Sidenote:
  >
  > - [010: Agent/State](./010_agent_state.md)

- **Instancing:** All `Data` messages are subject to `Instancing`. The `_instance` property acts as a key that scopes the data to a specific execution thread within a larger batch operation. `Data` messages with different `_instance` values will not be merged, ensuring data isolation between parallel processes.

  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Input:** The `Input` protocol uses a `Data` message to formally declare the parameters a `Request` accepts. This is the mechanism that transforms a static `Request` into a reusable, function-like component.

  > Sidenote:
  >
  > - [007: Agent/Input](./007_agent_input.md)

## From Data to Actionable Input

The `Data` protocol provides a generic container for structured information. With this foundation established, we can now explore its first major application: providing structured parameters to a request. This is the critical step that turns a static document into a dynamic, executable tool.

The next document, **[007: Agent/Input](./007_agent_input.md)**, describes how this pattern is used to define a formal input interface for an `Idea`.
