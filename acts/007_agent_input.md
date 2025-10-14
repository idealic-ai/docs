# 007: Agent/Input

> **Input Message:** A context message containing a `schema` and `input` data. Its presence transforms an `Idea` into an `Ideator` by defining its expected inputs. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires: [101: Concept/Idea](./101_concept_idea.md)
> - Enables: [103: Concept/Ideator](./103_concept_ideator.md)

This document describes the **Input Message**, a special type of context message that provides a structured prompt for a [001: Agent/Request](./001_agent_request.md). By formally defining the data that a `Request` uses to shape its `solution`, the `Input` message transforms a one-off invocation into a reusable, function-like component. This pattern is the key to turning a simple `Request` into an executable `Tool` that agents can use.

> [!TIP]
> A saved, reproducible **Request** is what the system calls an **[101: Concept/Idea](./101_concept_idea.md)**. When an `Input` message is added to its context, it becomes an executable **[103: Concept/Ideator](./103_concept_ideator.md)**.

## The `Input` Message Type

The `Input` message is a special type of context message designed to formally declare the data an `Idea` accepts. It is the mechanism that captures the structured input used to produce a given `solution`, completing the "Idea Triplet" and providing a full, reproducible record of the creative or computational process.

An `Input` message contains two key properties:

1.  **`schema`**: A JSON Schema object that defines the structure, types, and constraints of the data the `Idea` expects.
2.  **`input`**: A concrete data object that conforms to the `schema` and represents the actual values used for a specific execution.

By defining its inputs in this structured way, any `Idea` can become self-describing not only in its output (`solution` and `schema`) but also in what it requires to be generated. This is the core mechanism for creating a reproducible request.

## A Gateway to Usability: UI by Default

The `Input` message is more than just a technical detail; it is the key that unlocks a complete, interactive experience for any `Request`. Because a `Request` is defined by structured schemas for both its input and its output, a user interface can be generated for it automatically.

> Sidenote:
>
> - [103: Concept/Ideator](./103_concept_ideator.md).

This UI has two parts:

1.  **The Form**: The `schema` within the `Input` message provides a blueprint for the input form. A system can read it to instantly render interactive controls, complete with labels and validation.
2.  **The Result**: The main `schema` of the `Request` provides the blueprint for the output. After the `Request` is complete, its `solution` can be rendered in a rich, structured display instead of just raw data.

This transforms any `Request` into an interactive playground. A user can experiment with different inputs in the form and immediately see how they shape the structured result. It democratizes the creation and use of powerful tools, turning abstract computational processes into tangible, interactive applications that anyone can explore.

> Sidenote:
>
> - [102: Concept/Sovereignty](./102_concept_sovereignty.md).

## Composition with Other Protocols

The `Input` message is a simple pattern, but its power comes from its composition with other protocols. It acts as the bridge between raw data, reusable tools, and multi-step workflows.

- **Structured Data**: The `Input` message is a specific application of the principles outlined in the [006: Agent/Data](./006_agent_data.md) document. It provides a concrete pattern for supplying structured data to a `Request`, ensuring that the information is well-defined and validated.

  > Sidenote:
  >
  > - [006: Agent/Data](./006_agent_data.md).

- **From Request to Reusable Tool**: The `Input` message is the key to turning a `Request` into a reusable [002: Agent/Tool](./002_agent_tool.md). This process maps the components of the `Request` to the `Tool`'s interface:

  > Sidenote:
  >
  > - [002: Agent/Tool](./002_agent_tool.md).
  1. The `schema` from the **`Input` message** defines the `Tool`'s **parameters**. It describes what the `Tool` needs to run.
  2. The main `schema` of the **`Request`** defines the `Tool`'s **`_output`**. It describes what the `Tool` is expected to produce.

  This allows new `Tools` to be created on the fly. By adding a structured `Input` to an existing `Request`, you define a callable interface for it, making it an executable component for other agents.

- **Instancing**: When used with the [011: Agent/Instancing](./011_agent_instancing.md) protocol, `Input` messages can provide data for multi-instance requests, either as a global configuration for all instances or as a targeted input for a specific instance.
  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md).

## Providing Context for Tools

While the `Input` message provides direct, structured data for a `Tool`'s parameters, a `Tool` often needs access to the broader context it runs in, such as the current `State` or other data objects. The **Imports** protocol is the mechanism that controls what a `Tool` is allowed to see and use from this context. It allows a `Tool` to receive entire objects as context, not just individual parameters.

The next document, [008: Agent/Imports](./008_agent_imports.md), describes how a `Tool` can declare and receive this contextual information.
