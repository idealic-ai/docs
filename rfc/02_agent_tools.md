# The Tool System: Foundational Interface for Agent Capabilities

_For definitions of key terms used in this document, please refer to the [Glossary](./00_glossary.md)._

This document describes the Tool System - the foundational schema-driven interface that enables agents to understand and use structured capabilities.

## What Are Tools?

**Tools are the cornerstone** of agent action systems. They enable a new type of capability: **action selection in context** - allowing agents to choose and execute appropriate behaviors based on the situation at hand.

Tools provide:

- **Structured Interfaces**: Schema-defined capabilities that agents can discover and understand
- **Type Safety**: Clear contracts for inputs and outputs
- **Composability**: Building blocks that combine into complex agent behaviors
- **LLM Integration**: Schemas that language models can reason about and select

When an agent fills specific parameters for a Tool, it creates a **Call** - an instance of a Tool with all required parameters filled, representing a concrete request for execution (see [Call Protocol](03_agent_calls.md) for details on Call execution, Scope, and Method controls).

> **Note**: While any LLM request can be represented as an Idea (which works well for simple structured content generation), Tools provide the mechanism for more complex scenarios requiring dynamic action selection. For details on how Ideas can be transformed into Tools through input schemas, see [Agent Input RFC](07_agent_input.md).

## When to Use the Tool System

The Tool System is particularly valuable when you need:

- **Multiple Implementations**: Different search engines (Google, Bing, local) for the same search tool
- **Mixed Execution**: Some tools use LLM reasoning, others use explicit logic
- **Runtime Flexibility**: Swap implementations without code changes
- **Testing Isolation**: Mock external dependencies easily
- **Progressive Enhancement**: Start simple, add complexity gradually

## The Tool System Architecture

### Core Principle: Schema as Interface

The Tool System is built on a fundamental principle: **Tools are pure schemas** that define interfaces without mandating implementations. A Tool schema specifies:

- **What the tool does** (description)
- **What it needs** (input parameters)
- **What it produces** (`_output` structure)
- **How it's identified** (`_tool` name)
- **How it's called** (`_activity` field - determines execution mode, see Activity Resolution Strategy below)

This schema-first approach enables:

1. **Interface Independence**: Tool definitions exist independently of implementations
2. **Multiple Implementations**: Different behaviors for the same interface (dev/test/prod)
3. **Execution Flexibility**: Same Tool can use LLM reasoning or external code
4. **LLM Understanding**: Agents can reason about and select appropriate tools
5. **Type Safety**: Clear contracts validated at both schema definition and runtime

### The Dual Registry Architecture

The Tool System employs two complementary registries:

**Tool Registry**: Stores schema definitions (the interface)
**Activity Registry**: Stores implementation functions (the execution)

This separation enables tools to exist without implementations (for LLM reasoning) and implementations to be swapped at runtime (dev/prod environments).

### Tool Schema Meta Fields

Tools use meta fields (prefixed with underscore) to define system-level properties:

- **\_tool**: Unique identifier for the tool (required)
- **\_activity**: Execution mode specification (auto-determined or explicit)
- **\_output**: Expected output structure (required)
- **\_reasoningForCall**: Agent's explanation for why this Call was created (optional)

These meta fields distinguish system-level concerns from user-defined parameters. Any field without an underscore prefix is considered a tool parameter. Meta fields always appear first in the schema composition order, providing consistent structure for LLM understanding.

### System Boundaries

The Tool System handles:

- Tool Registration (schema definition and storage)
- Parameter Filling (LLM-driven extraction from context)
- Execution Routing (latent vs explicit determination)
- Activity Management (implementation registration and invocation)

Higher-level protocols (like the [Call Protocol](03_agent_calls.md)) build workflow orchestration, state management, and execution policies on top of these primitives.

## Tool Definition and Registration

Tools are defined through JSON schemas that specify their complete interface:

### Basic Tool Schema

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

### Tool with Activity Registration

```typescript
// Define tool schema (same as basic example)
Tool.register('weatherCheck', {
  /* ... */
});

// Register implementation - name matches tool for zero-config
Activity.register('weatherCheck', async call => {
  const data = await weatherAPI.get(call.location);
  return { temperature: data.temp, conditions: data.desc };
});
```

## Activity Resolution Strategy

The Tool System supports two fundamentally different execution modes:

**Latent Execution** uses the LLM's reasoning capabilities - the agent "thinks through" the problem and produces the output directly in the same invocation. This is knowledge-based execution, ideal for analysis, planning, or creative tasks where the LLM's training is sufficient.

**Explicit Execution** delegates to deterministic code - an Activity function is called to compute the output. This is code-based execution, essential for external API calls, database operations, or any task requiring precise, repeatable behavior.

### Zero-Configuration Activity Matching

The system automatically determines execution mode during schema composition:

1. **Explicit `_activity` Field**: If the tool definition includes `_activity`, use as-is
2. **Same-Name Convention** (recommended): If `Activity.Names` includes the tool name, set `_activity` to tool name (explicit)
3. **Latent Fallback**: Otherwise, set `_activity` to empty string (latent)

This convention-based approach means:

- **Name your Activity the same as your Tool** for zero configuration
- Missing activities automatically default to latent execution
- Explicit `_activity` fields always take precedence

### Schema Composition

Tool schemas are composed into a `calls` array for LLM consumption. Each schema is enhanced with meta fields and execution mode information (determined via the rules above), then added using JSON Schema's `anyOf` pattern:

```typescript
{
  calls: {
    type: 'array',
    items: {
      anyOf: [
        { /* sentimentAnalysis tool schema with _activity: '' */ },
        { /* weatherCheck tool schema with _activity: 'weatherCheck' */ },
        // ... other registered tools
      ]
    }
  }
}
```

This allows the LLM to select from available tools and generate multiple Calls in a single request.

## Practical Applications

The dual registry architecture enables several powerful patterns:

**Progressive Enhancement**: Start with latent execution (no Activity) for rapid prototyping, then register an Activity when ready for production without changing the Tool schema.

**Environment-Specific Implementations**: Register different Activities for the same Tool based on environment (e.g., real API in production, mock in development).

**Testing Isolation**: Replace real Activities with test doubles in unit tests, enabling fast, reliable testing without external dependencies.

Example:

```typescript
// Tool definition (unchanged across environments)
Tool.register('sendEmail', {
  /* recipient, subject, _output: { sent: boolean } */
});

// Swap implementations by environment
if (isProd) Activity.register('sendEmail', call => emailService.send(call));
else if (isDev) Activity.register('sendEmail', call => ({ sent: true })); // mock
// No Activity in prototype phase: LLM fills _output using latent execution
```

## Tools as Foundation

Tools represent the **first building block** of the agent action system - they define _what can be done_ through pure schema interfaces. The next layer, [Call Protocol](03_agent_calls.md), builds upon this foundation to define _how things are executed_ through Scope and Method controls, enabling sophisticated multi-tool workflows and execution strategies.
