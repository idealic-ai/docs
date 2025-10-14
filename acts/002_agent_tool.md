# 002: Agent/Tool

> **Tool**: A schema that defines a capability an agent can use. It is presented to an LLM as part of a request, acting as a structured interface for a potential action. The LLM activates the tool by generating a `Call` with specific parameters, which is then executed either latently by the LLM or explicitly by a registered code function (`Activity`). — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires: [001: Agent/Request](./001_agent_request.md)
> - Complemented by: [003: Agent/Activity](./003_agent_activity.md)

This document describes the Tool - the foundational schema-driven interface that enables agents to understand and use structured capabilities.

## What Are Tools?

**Tools are the cornerstone** of agent action systems. They enable a new type of capability: **action selection in context** - allowing agents to choose and execute appropriate behaviors based on the situation at hand.

Tools provide:

- **Structured Interfaces**: Schema-defined capabilities that agents can discover and understand
- **Type Safety**: Clear contracts for inputs and outputs
- **Composability**: Building blocks that combine into complex agent behaviors
- **LLM Integration**: Schemas that language models can reason about and select

When an agent fills specific parameters for a Tool, it creates a **Call** - an instance of a Tool with all required parameters filled, representing a concrete request for execution (see [004: Agent/Call](./004_agent_call.md) for details on Call execution).

## When to Use the Tool System

Use the Tool System when you need agents to:

- **Select actions dynamically** based on context and situation
- **Choose between multiple capabilities** to accomplish a goal
- **Execute different implementations** of the same capability (e.g., different search engines)
- **Mix LLM reasoning with explicit logic** in their decision-making process

## The Tool System Architecture

### Core Principle: Schema as Interface

The Tool System is built on a fundamental principle: **Tools are pure schemas** that define interfaces without mandating implementations. A Tool's execution is handled by either the LLM's latent reasoning or by a concrete code implementation called an [003: Agent/Activity](./003_agent_activity.md).

> Sidenote:
>
> - [004: Agent/Call](./004_agent_call.md).

A `Tool` schema is a standard JSON Schema object. Any field without an underscore prefix is considered a parameter for the tool. The system uses special meta-fields (prefixed with `_`) to define system-level properties that control how the tool is identified and executed.

A Tool's schema defines its complete interface:

> Sidenote:
> Extensions:
>
> - **`_activity`**: Connects the tool to a deterministic code function for explicit execution. ([003: Agent/Activity](./003_agent_activity.md))
> - **`_module`**: Delegates the tool's execution to an isolated, external module. ([009: Agent/Module](./009_agent_module.md))
> - **`_outputPath`**: Makes the tool stateful by writing its output to a persistent state object. ([010: Agent/State](./010_agent_state.md))
> - **`_instance`**: Targets the tool's execution to a specific instance in a multi-instance request. ([011: Agent/Instancing](./011_agent_instancing.md))

- **`title`**: A human-readable name for the schema.
- **`description`**: Explains what the tool does.
- **`parameters`**: Any non-underscored fields define the inputs the tool needs.
- **`_tool`**: Provides a unique name to identify the tool.
- **`_output`**: Defines the expected structure of the tool's result.
- **`_reasoningForCall`**: A field added by the system for the agent to explain why it chose the tool.

### System Boundaries

The Tool System handles:

- Tool Registration (schema definition and storage)
- Parameter Filling (LLM-driven extraction from context)
- Latent Execution (where the LLM produces the output directly from the inputd)

Higher-level protocols (like the [004: Agent/Call](./004_agent_call.md)) build workflow orchestration, state management, and execution policies on top of these primitives.

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

## Schema Composition and The Call

While individual Tools define discrete capabilities, their power is realized when they are composed. The system presents all available `Tool` schemas to the LLM within a single request, typically as an array. This allows the LLM to select the most appropriate `Tool` for a given situation. When the LLM chooses a `Tool` and provides the required parameters, it creates a **Call**—a concrete, executable instance of that `Tool`. The `Call` is the fundamental unit of action that is passed on for execution.

> Sidenote:
>
> - [004: Agent/Call](./004_agent_call.md).

## Latent and Explicit Execution

A `Tool` schema, by itself, is only an interface. The execution of its `Call` can happen in one of two ways. The default is **latent execution**, where the LLM uses its own internal reasoning to generate the output, which is ideal for language or knowledge-based tasks. For actions that require interaction with the outside world—like calling an API or accessing a database—a `Tool` must be connected to a deterministic code function. This explicit implementation is called an **Activity**.

The separation of the `Tool` interface from the `Activity` implementation is a core design principle. It allows an agent's capabilities to be defined and reasoned about abstractly, while the underlying execution logic can be swapped or updated independently. The next document, **[003: Agent/Activity](./003_agent_activity.md)**, describes how `Activities` provide the concrete logic for `Tools`.

> Sidenote:
>
> - [003: Agent/Activity](./003_agent_activity.md).
