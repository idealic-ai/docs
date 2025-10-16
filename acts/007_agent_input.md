# 007: Agent/Input

> **Input Message:** A context message containing a `schema` and `input` data. It defines the expected inputs for a `Request`, making it a reusable, function-like component. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires: [001: Agent/Request](./001_agent_request.md)
> - Enables: [002: Agent/Tool](./002_agent_tool.md)

This document describes the **Input Message**, a special type of context message that provides a structured prompt for a [001: Agent/Request](./001_agent_request.md). By formally defining the data that a `Request` uses to shape its `solution`, the `Input` message transforms a one-off invocation into a reusable, function-like component. This pattern is the key to turning a simple `Request` into an executable `Tool` that agents can use.

> [!HEADSUP] Heads up
> A saved, reproducible **Request** is what the system calls an **[101: Concept/Idea](./101_concept_idea.md)**. When an `Input` message is added to its context, it becomes an executable **[103: Concept/Ideator](./103_concept_ideator.md)**.

## The `Input` Message Type

The `Input` message is a special type of context message designed to formally declare the data a `Request` accepts. It is the mechanism that captures the structured input used to produce a given `solution`, providing a full, reproducible record of the computational process.

An `Input` message contains two key properties:

1.  **`schema`**: A JSON Schema object that defines the structure, types, and constraints of the data the `Request` expects.
2.  **`input`**: A concrete data object that conforms to the `schema` and represents the actual values used for a specific execution.

By defining its inputs in this structured way, any `Request` can become self-describing not only in its output (`solution` and `schema`) but also in what it requires to be generated. This is the core mechanism for creating a reproducible request.

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

## From Static Inputs to Dynamic Workflows

The `Input` message provides the initial, static data that kicks off a process. However, to build sophisticated agents, we need a way to create dynamic data flows. The following chapters build upon this foundation to create complex, multi-step workflows:

1.  **[008: Agent/Variables](./008_agent_variables.md):** The `Variables` system provides the "wires" that allow `Tools` to read from the `Input` and other context messages, and to connect the output of one `Tool` to the input of another.
2.  **[009: Agent/State](./009_agent_state.md):** The `State` object provides a persistent "scratchpad" for the workflow, allowing data to be maintained across multiple steps and execution loops.
3.  **[010: Agent/Plan](./010_agent_plan.md):** With `Variables` to connect them and a `State` to work in, `Tool Calls` can be orchestrated into a `Plan`—a complete, declarative data-flow graph.
4.  **[011: Agent/Instancing](./011_agent_instancing.md):** Finally, `Instancing` allows a single `Plan` to be executed at scale across many different `State` objects in parallel.
