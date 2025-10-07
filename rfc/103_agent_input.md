# The Input Protocol

> Sidenote:
>
> - Requires: [The Idea Protocol](./001_protocol_ideas.md)
> - Enables: [Protocol: Ideators](./003_protocol_ideators.md)

_For definitions of key terms used in this document, please refer to the [Glossary](./000_glossary.md)._

This document describes the **Input Protocol**, a system for defining structured inputs for `Ideas`. This protocol introduces a special message type that, when included in an `Idea`'s context, transforms it from a static piece of knowledge into an executable, function-like entity known as an **Ideator**.

## The `Input` Message Type

The `Input` message is a special type of context message designed to formally declare the data an `Idea` accepts. It is the mechanism that captures the structured input used to produce a given `solution`, completing the "Idea Triplet" and providing a full, reproducible record of the creative or computational process.

An `Input` message contains two key properties:

1.  **`schema`**: A JSON Schema object that defines the structure, types, and constraints of the data the `Idea` expects.
2.  **`input`**: A concrete data object that conforms to the `schema` and represents the actual values used for a specific execution.

By defining its inputs in this structured way, any `Idea` can become self-describing not only in its output (`solution` and `schema`) but also in what it requires to be generated.

### A Gateway to Usability

A significant advantage of this protocol is its ability to enable automatic user interface generation. Because the `input`'s `schema` explicitly defines the required data, a system can dynamically render a form with the correct fields, labels, and validation. This allows any `Idea` to be instantly surfaced to a human user through a functional UI, dramatically lowering the barrier to interaction.

## From Idea to Ideator

As described in the [Idea Protocol](./001_protocol_ideas.md), the presence of an `Input` message in an `Idea`'s context is the definitive signal that it is an **Ideator**—an `Idea` that performs work. It becomes a reproducible function.

## Interaction with the Instancing Protocol

The `Input` message is fully compatible with the [Instancing Protocol](./105_agent_instancing.md), allowing for sophisticated data-sourcing strategies when processing multiple instances at once. It can operate in two distinct modes:

1.  **Global Input**: If an `Input` message is provided in the agent's context without an `_instance` property, its `input` data is treated as a global value. It is implicitly available to every instance being processed in the request. This is useful for providing shared configuration, prompts, or parameters that apply to all instances uniformly.

2.  **Instance-Specific Input**: If an `Input` message includes an `_instance` identifier, its `input` data is sourced directly from that specific instance's state. This provides a powerful mechanism for per-instance overrides or for feeding the unique data of each instance into a common `Ideator`.

This dual-mode capability allows for the creation of flexible and efficient multi-instance workflows, where a single `Ideator` can be configured with a baseline of global inputs and then customized with specific data from each instance it processes.

## The Inversion: From Ideator to Tool

While an `Ideator` is a self-contained, executable concept, to integrate it into an agent's imperative workflow, we must convert it into a **Tool**. The mechanical process of turning an output-focused `Ideator` into an interface-focused `Tool` is an **inversion**. We restructure its components to prioritize its inputs.

An `Idea` is a triplet defined by its output `schema` and `solution`:
`{ context, schema, solution }`

To convert it into a `Tool`, we look inside its `context` for the `Input` message. The primary step of inversion is to **promote** the `input`'s schema properties to become the top-level parameter properties for the `Tool` (see [Tool System](./101_agent_tools.md) for details on Tool schema structure).

This creates a `Tool` definition, which is essentially a function signature ready to be registered in an agent's system, ready to be used in a `Call`.
