# 002: Agent/Tool

> [!DEFINITION] [Tool](./000_glossary.md)
> A schema that defines a capability an agent can use. It is presented to an LLM as part of a request, acting as a structured interface for a potential action. The LLM activates the tool by generating a `Call` with specific parameters, which is then executed either latently by the LLM or explicitly by a registered code function (`Activity`).

> Sidenote:
>
> - Requires: [001: Agent/Request](./001_agent_request.md)
> - Complemented by: [003: Agent/Activity](./003_agent_activity.md)

A `Tool` is a schema-driven interface that defines a structured capability an agent can use. It acts as the foundational building block for all agent actions, providing a way for the LLM to understand and select from a menu of possible behaviors.

## What Are Tools?

**Tools are the cornerstone** of agent action systems. They enable a new type of capability: **action selection in context** - allowing agents to choose and execute appropriate behaviors based on the situation at hand.

Tools provide:

- **Structured Interfaces**: Schema-defined capabilities that agents can discover and understand
- **Type Safety**: Clear contracts for inputs and outputs
- **Composability**: Building blocks that combine into complex agent behaviors
- **LLM Integration**: Schemas that language models can reason about and select

When an agent fills specific parameters for a Tool, it creates a **Call**—an instance of a Tool with all required parameters filled, representing a concrete request for execution.

> Sidenote: [004: Agent/Call](./004_agent_call.md)

## When to Use the Tool System

Use the Tool System when you need agents to:

- **Select actions dynamically** based on context and situation
- **Choose between multiple capabilities** to accomplish a goal
- **Execute different implementations** of the same capability (e.g., different search engines)
- **Mix LLM reasoning with explicit logic** in their decision-making process

## Schema as interface

The Tool System is built on a fundamental principle: **Tools are pure schemas** that define interfaces without mandating implementations. This separation of interface from implementation is the key to the system's flexibility and composability.

A `Tool` schema is a standard JSON Schema object. Any field without an underscore prefix is considered a parameter for the tool. The system uses special meta-fields (prefixed with `_`) to define system-level properties that control how the tool is identified and executed.

A Tool's schema defines its complete interface:

> Sidenote:
> Extensions:
>
> - **`_activity`**: Connects the tool to a deterministic code function for explicit execution. ([003: Agent/Activity](./003_agent_activity.md))
> - **`_delegate`**: Delegates the tool's execution to an isolated, external delegate. ([012: Agent/Delegate](./012_agent_delegate.md))
> - **`_outputPath`**: Makes the tool stateful by writing its output to a persistent state object. ([009: Agent/State](./009_agent_state.md))
> - **`_instance`**: Targets the tool's execution to a specific instance in a multi-instance request. ([011: Agent/Instancing](./011_agent_instancing.md))

- **`title`**: A human-readable name for the schema (optional).
- **`description`**: Explains what the tool does.
- **`parameters`**: Any non-underscored fields define the inputs the tool needs.
- **`_tool`**: Provides a unique name to identify the tool.
- **`_output`**: Defines the expected structure of the tool's result.
- **`_reasoningForCall`**: A field added by the system for the agent to explain why it chose the tool.

Higher-level protocols build workflow orchestration, state management, and execution policies on top of these primitives.

## Tool Definition

Tools are defined as JSON schemas. The example below shows a `Tool` for sentiment analysis. This `Tool` is designed for latent execution, as it relies on the LLM's inherent language understanding and does not require an external function.

```typescript
Tool.register('sentimentAnalysis', {
  type: 'object',
  description: 'Analyzes text sentiment',
  properties: {
    _tool: { type: 'string', const: 'sentimentAnalysis' },
    text: { type: 'string', description: 'Text to analyze' },
    _output: {
      type: 'object',
      properties: {
        sentiment: { type: 'string' },
        confidence: { type: 'number' },
      },
    },
  },
});
```

## Composing Schemas for the LLM

An agent doesn't just work with tools; it often needs to produce a final, structured output once its task is complete. To handle this, the agent runtime composes the schemas for all available `Tool`s with a user-defined _output schema_. This creates a single, unified schema that is provided to the LLM in a `Request`.

This composition gives the LLM a choice in how it responds. Based on the prompt, it can:

- **Generate `calls` only:** If the task requires intermediate steps, the LLM will invoke one or more tools and leave the `output` field `null`.
- **Generate `output` only:** If the prompt can be answered directly without any tools, the LLM will provide the final result in the `output` field and leave `calls` empty.
- **Generate both:** In some cases, the LLM might perform an action and produce the final output in a single step.

This mechanism allows a single, flexible interface to handle simple, one-shot answers as well as complex, multi-tool tasks. The developer provides the `Tool` schemas and an output schema separately, and the system combines them into a structure that the LLM can use to decide on the best course of action.

The example below illustrates how a `Tool` schema and an output schema are composed.

::::columns
:::column{title="Agent Configuration"}

```typescript
Agent.Request(
  config, // Configuration for the request (e.g., model, temperature)
  {
    // Output Schema
    type: 'object',
    properties: {
      summary: { type: 'string' },
    },
    required: ['summary'],
  },
  [
    // Context
    {
      type: 'tool',
      tool: {
        greetUser: {
          type: 'object',
          properties: {
            userName: { type: 'string' },
          },
          required: ['userName'],
        },
      },
    },
    { type: 'text', text: 'some prompt here' },
  ]
);
```

:::
:::column{title="Composed Schema (for the LLM)"}

```json
{
  "type": "object",
  "properties": {
    "calls": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "_tool": { "const": "greetUser" },
          "userName": { "type": "string" }
        },
        "required": ["_tool", "userName"]
      }
    },
    "output": {
      "type": ["object", "null"],
      "properties": {
        "summary": { "type": "string" }
      },
      "required": ["summary"],
      "additionalProperties": false
    }
  },
  "required": ["calls", "output"]
}
```

:::
::::

## Enhancing Tools with Meta-Properties

Beyond defining a tool's basic parameters, its schema can be enhanced when it is invoked. This is a different form of composition where new behaviors are layered onto a single tool.

When an agent decides to use a tool, it creates a `Call`—a concrete instance of that tool. A `Call` includes the parameters for the tool, but it can also be augmented with special meta-properties (prefixed with `_`) that provide extra instructions for the execution engine. These properties control aspects of the tool's execution that go beyond its basic definition.

> Sidenote:
>
> - [004: Agent/Call](./004_agent_call.md)

This mechanism allows a simple, core tool schema to be used in powerful and flexible ways. The `Call` becomes a rich instruction that specifies _what_ to do (the tool and its parameters) and _how_ to do it (the meta-properties). The final piece of the puzzle is understanding the different ways a `Call` can actually be executed.

## Latent and Explicit Execution

Once a `Call` is generated, the system needs to execute it. A `Tool` schema, being just an interface, doesn't contain the execution logic itself. Instead, its execution can happen in one of two ways. The default is **latent execution**, where the LLM uses its own internal reasoning to generate the output, which is ideal for language or knowledge-based tasks. For actions that require interaction with the outside world—like calling an API or accessing a database—a `Tool` must be connected to a deterministic code function. This explicit implementation is called an **Activity**.

The separation of the `Tool` interface from the `Activity` implementation is a core design principle. It allows an agent's capabilities to be defined and reasoned about abstractly, while the underlying execution logic can be swapped or updated independently. The next document, **[003: Agent/Activity](./003_agent_activity.md)**, describes how `Activities` provide the concrete logic for `Tools`.

> Sidenote:
>
> - [003: Agent/Activity](./003_agent_activity.md).
