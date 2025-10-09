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

> **Note**: While any LLM request can be represented as an Idea (which works well for simple structured content generation), Tools provide the mechanism for more complex scenarios requiring dynamic action selection. For details on how Ideas can be transformed into Tools through input schemas, see [007: Agent/Input](./007_agent_input.md).

## When to Use the Tool System

Use the Tool System when you need agents to:

- **Select actions dynamically** based on context and situation
- **Choose between multiple capabilities** to accomplish a goal
- **Execute different implementations** of the same capability (e.g., different search engines)
- **Mix LLM reasoning with explicit logic** in their decision-making process

## The Tool System Architecture

### Core Principle: Schema as Interface

The Tool System is built on a fundamental principle: **Tools are pure schemas** that define interfaces without mandating implementations. A Tool's execution is handled by either the LLM's latent reasoning or by a concrete code implementation called an **[003: Agent/Activity](./003_agent_activity.md)**.

A Tool schema specifies:

- **What the tool does** (description)
- **What it needs** (input parameters)
- **What it produces** (`_output` structure)
- **How it's identified** (`_tool` name)
- **How it's executed** (`_activity` field, see [003: Agent/Activity](./003_agent_activity.md) for details)

### Tool Schema Meta Fields

Tool schemas use meta fields (prefixed with underscore) to define system-level properties:

- **\_tool**: Unique identifier for the tool (required)
- **\_activity**: Specifies which, if any, `Activity` should execute this tool. See the [003: Agent/Activity](./003_agent_activity.md) for resolution strategy.
- **\_output**: Expected output structure (made nullable by system)
- **\_reasoningForCall**: Agent's explanation for why this Call was created (added by system)

Any field without an underscore prefix is considered a tool parameter. Meta fields always appear first in the schema composition order, providing consistent structure for LLM understanding.

### System Boundaries

The Tool System handles:

- Tool Registration (schema definition and storage)
- Parameter Filling (LLM-driven extraction from context)
- Execution Routing (determining whether to use latent execution or an `Activity`)

Higher-level protocols (like the [004: Agent/Call](./004_agent_call.md)) build workflow orchestration, state management, and execution policies on top of these primitives.

## Tool Definition and Registration

Tools are defined through JSON schemas that specify their complete interface:

### Basic Tool Schema (Latent Execution)

This `Tool` has no corresponding `Activity`, so it will be executed by the LLM.

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

### Tool with an Activity (Explicit Execution)

This `Tool` is designed to be implemented by an `Activity`. See the [003: Agent/Activity](./003_agent_activity.md) for details on how to register the corresponding implementation.

```typescript
// Define the tool schema
// See docs/rfc/003_agent_activity.md
```

### Schema Composition

Tool schemas are composed into a `calls` array for LLM consumption. Each schema is enhanced with meta fields and execution mode information, then added using JSON Schema's `anyOf` pattern. The `_activity` field is resolved according to the [Activity Resolution Strategy](./003_agent_activity.md#activity-resolution-strategy).

```typescript
{
  // ... existing code ...
}
```

This allows the LLM to select from available tools and generate multiple Calls in a single request.

## Tools as Foundation

Tools represent the **first building block** of the agent action system - they define _what can be done_ through pure schema interfaces. The [003: Agent/Activity](./003_agent_activity.md) defines _how code is executed_, and the [004: Agent/Call](./004_agent_call.md) builds upon this foundation to define _how things are orchestrated_, enabling sophisticated multi-tool workflows and execution strategies.
