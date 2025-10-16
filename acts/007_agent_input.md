# 007: Agent/Input

> [!DEFINITION] [Input Message](./000_glossary.md)
> A context message containing a `schema` and `input` data. It defines the expected inputs for a :term[Request], making it a reusable, function-like component.

> Sidenote:
>
> - Requires: [001: Agent/Request](./001_agent_request.md)
> - Enables: [002: Agent/Tool](./002_agent_tool.md)

This document describes the :term[Input Message], a special type of context message that provides a structured prompt for a :term[Request]. By formally defining the data that a :term[Request] uses to shape its `solution`, the :term[Input] message transforms a one-off invocation into a reusable, function-like component. This pattern is the key to turning a simple :term[Request] into an executable :term[Tool] that agents can use.

> [!HEADSUP] Heads up
> A saved, reproducible :term[Request] is what the system calls an :term[Idea]. When an :term[Input] message is added to its context, it becomes an executable :term[Ideator].

## The :term[Input] Message Type

The :term[Input] message is a special type of context message designed to formally declare the data a :term[Request] accepts. It is the mechanism that captures the structured input used to produce a given `solution`, providing a full, reproducible record of the computational process.

An :term[Input] message contains two key properties:

1.  **`schema`**: A JSON Schema object that defines the structure, types, and constraints of the data the `Request` expects.
2.  **`input`**: A concrete data object that conforms to the `schema` and represents the actual values used for a specific execution.

By defining its inputs in this structured way, any :term[Request] can become self-describing not only in its output (`solution` and `schema`) but also in what it requires to be generated. This is the core mechanism for creating a reproducible request.

:::::details{title="Example: Using an Input for a Structured Prompt"}

::::columns
:::column{title="What the code looks like"}

```typescript
Agent.Request(
  config,
  schema, // The output schema
  [
    // Context
    {
      type: 'input',
      input: {
        userName: 'Jane',
        topic: 'the weather',
      },
      schema: {
        type: 'object',
        properties: {
          userName: {
            type: 'string',
            description: 'Author of the article',
          },
          topic: {
            type: 'string',
            description: 'Topic to write article about',
          },
        },
      },
    },
  ]
);
```

:::
:::column{title="What the LLM Sees"}

```typescript
{
  role: 'user',
  content: {
    type: 'text',
    text:
      `## Data: ¶input
      Input data MUST be treated as a structured prompt
      Schema: {
        "type": "object",
        "properties": {
          userName: {
            type: "string",
            description: "Author of the article"
          },
          topic: {
            type: "string",
            description: "Topic to write article about"
          },
        }
      }

      {
        "userName": "Jane",
        "topic": "the weather"
      }`
  }
}
```

:::
::::

:::::

## A Gateway to Usability: UI by Default

The `Input` message is more than just a technical detail; it is the key that unlocks a complete, interactive experience for any :term[Request]. Because a :term[Request] is defined by structured schemas for both its input and its output, a user interface can be generated for it automatically.

> Sidenote:
>
> - [103: Concept/Ideator](./103_concept_ideator.md).

This UI has two parts:

1.  **The Form**: The `schema` within the :term[Input] message provides a blueprint for the input form. A system can read it to instantly render interactive controls, complete with labels and validation.
2.  **The Result**: The main `schema` of the :term[Request] provides the blueprint for the output. After the :term[Request] is complete, its `solution` can be rendered in a rich, structured display instead of just raw data.

This transforms any :term[Request] into an interactive playground. A user can experiment with different inputs in the form and immediately see how they shape the structured result. It democratizes the creation and use of powerful tools, turning abstract computational processes into tangible, interactive applications that anyone can explore.

> Sidenote:
>
> - [102: Concept/Sovereignty](./102_concept_sovereignty.md).

## Composition with Other Protocols

The :term[Input] protocol is a specialization of the :term[Data] pattern, but it also composes with several other protocols to enable complex, dynamic workflows.

- **:term[Tool]:** The :term[Input] message is the key to turning a :term[Request] into a reusable :term[Tool]. The `schema` from the :term[Input] message defines the :term[Tool]'s parameters (what it needs to run), and the main `schema` of the :term[Request] defines the :term[Tool]'s `_output` (what it produces).

  > Sidenote:
  >
  > - [002: Agent/Tool](./002_agent_tool.md)

- **:term[Plan]:** A :term[Plan] is a graph of :term[Tool Calls]. The :term[Input] provides the initial parameters that are fed into the first :term[Tool Call] in the graph, kicking off the entire process.

  > Sidenote:
  >
  > - [010: Agent/Plan](./010_agent_plan.md)

- **:term[Instancing]:** When used with the :term[Instancing] protocol, :term[Input] messages can provide data for multi-instance requests, either as a global configuration for all instances or as a targeted input for a specific instance.

  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **:term[Variables]:** The :term[Input] message provides the initial, static data that kicks off a process. However, :term[Variables] are the mechanism that allows this data to be used dynamically. :term[Tool Calls] use :term[Variable References] to read values from the :term[Input], connecting the initial parameters to the executable steps of a :term[Plan].
  > Sidenote:
  >
  > - [008: Agent/Variables](./008_agent_variables.md)

## From Static Inputs to Dynamic Connections

The :term[Input] protocol provides a formal mechanism for supplying structured data to an agent, turning a simple :term[Request] into a reusable, function-like component. However, this only defines the starting point of a process. To build sophisticated workflows, this static input data needs to be connected to the tools that will operate on it.

The next document, :term[008: Agent/Variables]{href="./008_agent_variables.md"}, describes the protocol that creates these dynamic connections, allowing data to flow from the :term[Input] to the :term[Tools] in a declarative way.
