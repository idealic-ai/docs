# 801: Package/Agent

> [!DEFINITION] [Agent](./000_glossary.md)
> A reference implementation of the **Acts of Emergence** protocols. It provides the runtime engine for executing schema-driven, AI-native workflows, from atomic Requests to complex, stateful Agents.

> Sidenote:
>
> - Implements:
>   - :term[001: Agent/Request]{href="./001_agent_request.md"}
>   - :term[010: Agent/Loop]{href="./010_agent_loop.md"}

The `@augceo/agent` library is the canonical implementation of the agentic architecture defined in the Acts. Unlike frameworks that prioritize prompt engineering, this library prioritizes **protocol compliance**. It implements a rigorous state machine where every interaction is strictly typed, schema-driven, and distinct.

## The Acts (RFCs)

This library is built directly from the specifications defined in the **Acts**. Each feature corresponds to a specific protocol document.

This modular architecture is designed for **composability and extensibility**. Rather than a monolithic framework, each Act defines a discrete capability. You can opt-in to the features you need—whether it's just simple Tool usage or a complex, multi-agent system with state persistence and delegation.

### Core Primitives

- **:term[001: Agent/Request]{href="./001_agent_request.md"}**: The atomic unit of computation.
  - Transforms a `Context` + `Schema` into a structured `Solution`.
  - Supports **multiplexing** (generating multiple solutions at once).
  - Provides the foundation for all higher-level agent behaviors.
- **:term[002: Agent/Tool]{href="./002_agent_tool.md"}**: A schema definition of a capability.
  - Defines the **interface** for actions separately from their implementation.
  - Allows the LLM to select behaviors based on structured metadata.
- **:term[003: Agent/Activity]{href="./003_agent_activity.md"}**: The explicit, deterministic code implementation of a Tool.
  - Connects abstract Tool schemas to real-world code.
  - Supports the **Dual Registry** pattern (separating interface from implementation).
- **:term[004: Agent/Call]{href="./004_agent_call.md"}**: A concrete instance of a Tool use.
  - Represents a parameterized request for execution.
  - Acts as the standardized transport between the LLM's intent and the system's action.

### Data & State

- **:term[005: Agent/Data]{href="./005_agent_data.md"}**: The protocol for structured information within the context.
  - Provides a uniform envelope for all persistent context messages.
  - Enables structured merging of information.
- **:term[006: Agent/Input]{href="./006_agent_input.md"}**: Turns a generic Request into a reusable function.
  - Defines strict **input parameters** for a Request.
  - Enables automatic UI generation and type-safe invocation.
- **:term[009: Agent/State]{href="./009_agent_state.md"}**: Persistent memory that survives across multiple steps.
  - Acts as a **shared scratchpad** for the execution loop.
  - Enables resumption and stateful workflows.
- **:term[016: Agent/Meta]{href="./016_agent_meta.md"}**: Handles identity and lineage.
  - Tracks **versioning, branching, and origin**.
  - Allows agents to autonomously evolve and bump their own versions.

### Wiring & Flow

- **:term[007: Agent/Variables]{href="./007_agent_variables.md"}**: Dynamic references.
  - Uses `†kind.path` syntax to link outputs to inputs.
  - Allows Tools to **read** from the context without copying data.
- **:term[008: Agent/Output]{href="./008_agent_output.md"}**: The result writing mechanism.
  - Uses `_outputPath` to direct where a Tool's result should be stored.
  - Enables **chaining** of operations through state.
- **:term[011: Agent/Expressions]{href="./011_agent_expressions.md"}**: Logic within the data flow.
  - Supports **branching** (`||`) for fallback or conditional logic.
  - Supports **fan-out** (`&&`) for parallel data distribution.

### Orchestration

- **:term[010: Agent/Loop]{href="./010_agent_loop.md"}**: The execution engine.
  - Iterates Requests until a goal is met.
  - Manages the feedback cycle of generating calls, executing them, and updating context.
- **:term[012: Agent/Plan]{href="./012_agent_plan.md"}**: A declarative strategy.
  - Represents the workflow as a **data-flow graph** of Tool Calls.
  - Separates **planning** (reasoning) from **execution** (acting).
- **:term[013: Agent/Instancing]{href="./013_agent_instancing.md"}**: Parallel execution scaling.
  - Groups messages by `_instance` ID to run parallel contexts.
  - Scales a single Plan across unlimited data items.
- **:term[014: Agent/Delegate]{href="./014_agent_delegate.md"}**: Modular composition.
  - Isolates execution in **sandboxed sub-requests**.
  - Enables nesting agents within agents (Agents as Tools).
- **:term[015: Agent/Scopes]{href="./015_agent_scopes.md"}**: Context control.
  - Uses `_scopes` to strictly define what data a Delegate or Activity can see.
  - Prevents context bleeding and enhances security.
- **:term[017: Agent/Advisor]{href="./017_agent_advisor.md"}**: Structured deliberation.
  - Injects specific personas to reason **before** acting.
  - Provides weighted voting and strategic guidance to the primary agent.

## Concepts

While the Acts above define the _mechanisms_, the following concepts define the _philosophy_ of the architecture:

- **:term[104: Concept/Latent]{href="./104_concept_latent.md"}**: The "No-Code" Default.
  - If a Tool has no registered Activity, the Agent defaults to **Latent Execution**.
  - It uses the LLM's internal reasoning ("latent space") to simulate the tool's output.
  - This allows you to prototype complex workflows purely with schemas, adding code only when necessary.

- **Unity of Planning & Execution**:
  - In this architecture, **planning is execution**.
  - The Agent doesn't generate a static plan and then run it.
  - At every tick, it generates a _new_ Plan (the next step), effectively re-planning continuously based on the latest State.

- **Human-in-the-Loop (HITL)**:
  - The `Agent` exposes a `confirm()` callback.
  - This allows the host system to intercept, review, and approve every **Tool Call** before it is executed.
  - If a call is rejected or modified by the human, the feedback is returned to the agent to adjust its plan.

- **Error Recovery**:
  - Errors are not fatal. If a Tool throws an exception, it is captured as an **Error Message** in the context.
  - The Agent "sees" the failure in the next tick and uses its reasoning to self-correct (e.g., retrying with different parameters or choosing an alternative strategy).

## Agent vs. Request

The library distinguishes between a low-level **Request** and a high-level **Agent**.

### The Request (Low-Level)

A `Request` is a single, atomic transaction with the LLM. It assumes a 1:1 relationship between the input context/schema and the output solution.

- **Control:** It does not loop. It performs exactly one generation step.
- **Multiplexing:** It supports generating multiple candidate solutions from the same context (via the `n` parameter).
- **Streaming & Callbacks:** It provides a `callbackPath` mechanism. This allows the system to intercept and process specific parts of the structure (like `calls`) as they are streamed, enabling real-time tool execution while the LLM is still generating the rest of the response.

### The Agent (High-Level)

An `Agent` is an **Execution Loop** that orchestrates a sequence of Requests.

- **Looping:** It repeatedly invokes Requests, executing the resulting Tool Calls and feeding the output back into the context.
- **Termination:** It continues looping until the system decides to write the final `output`.
- **Convergence:** By convention, the user's desired result schema is wrapped into a nullable `output` property. The loop considers its work complete only when this property is populated.

### Unified Output Structure

To avoid duality between the two modes, both Agent and Request normalize their output. The user's custom schema is always wrapped into the `output` property.

- **Request:** Returns `Data<T>[]` (an array of solutions, usually a tuple of 1).
- **Agent:** Returns `Data<T>` (the final converged state).

## Type Safety Vision

This library leverages **Schemistry** to provide end-to-end type safety without code generation. The goal is to have the TypeScript types perfectly reflect the runtime transformations applied by the agent's pipeline.

### The Problem

In an agentic system, the final schema sent to the LLM is rarely just what the user defined. It is a **composition** of:

1. The User's Schema (the goal).
2. System Features (Tool Calls, Advisors, Meta properties).

These features are toggled by **Message Handlers**. For example, adding an `Advisor` message to the context triggers a handler that injects an `advisors` array into the final output schema.

### The Solution: Type Reduction Pipeline

We envision a type-system pipeline that mirrors the runtime logic. Just as message handlers transform the runtime JSON schema, they should also **reduce and transform the inferred TypeScript type**.

The flow works as follows:

1. **Inference:** The User's Schema is converted to a Type `T` via `FromSchema<S>`.
2. **Reduction:** Each active Message Handler wraps or modifies `T`.
   - _Advisor Handler:_ Adds `{ advisors: Advisor[] }`
   - _Tool Handler:_ Adds `{ calls: Call[] }`
   - _Meta Handler:_ Adds `{ meta: Meta }`
3. **Reconstruction:** The final type is a strict intersection of the user's intent and the system's capabilities.

### Extensibility

This architecture is designed to be open.

- **Custom Handlers:** Users can register their own message handlers. These handlers can modify the schema (runtime) and participate in the type reduction (compile time).
- **Tool Registry:** Tools are registered globally via `Tool.register`. This defines the _interface_ of a capability.
- **Activity Registry:** Implementations are registered via `Activity.register`. This defines the _execution logic_ (code) for a tool.
- **Advisor Registry:** (Planned) Advisors will be registered globally, allowing specific personas and reasoning models to be plugged into any agent.
- **Schema Registry:** Schemas can be registered via `Schemistry` and referenced using `$ref` (e.g., `"$ref": "MySchema"`), allowing for reusable types across the system.

By treating the schema as the single source of truth and allowing the type system to flow downstream from it, we ensure that if it compiles, it adheres to the protocol.

## Observability & Standardization Vision

We aim to bring rigorous standardization to the operational aspects of agent execution, ensuring consistency across different LLM providers.

### Token Normalization

Different providers report usage differently. We plan to normalize these statistics into a unified interface that tracks:

- **Input Tokens**: Context window usage.
- **Output Tokens**: Generated content.
- **Thinking Tokens**: Chain-of-thought reasoning budgets.

### Thinking Process Exposure

As models increasingly expose their internal reasoning (CoT), we treat this as a first-class citizen of the protocol:

- **Access**: Exposing the raw thinking process stream to the application layer.
- **Budgeting**: Standardizing "thinking budget" parameters across providers, allowing agents to request specific depth of reasoning regardless of the underlying model.

## Cache-Aware Architecture

We are introducing explicit support for **Context Caching** to drastically reduce latency and cost for long-running agents.

### Token Metrics

We will track specific cache usage metrics to quantify savings:

- **Cache Read Tokens**: Tokens retrieved from the cache.
- **Cache Write Tokens**: New tokens added to the cache.

### Append-Only Optimization

To maximize **Prefix Caching**, the library introduces specific operation modes that avoid invalidating the cache:

- **Append-Over-Overwrite**: Preferring to append new `Data` or `Message` deltas rather than replacing the entire context.
- **Merge Logic**: Utilizing the natural merging behavior of `Data` and `Advisors` to update state additively.
- **Output Mode**: Structuring outputs to extend the conversation history linearly.

### Context Management

To balance cache hits with context window limits, we will provide configurable **Context Compaction**:

- **Lazy Compaction**: An optimized routine that collapses the append-only log into a snapshot only when necessary, preserving the cache prefix for as long as possible.
- **Configuration**: A "Cache-Optimized" knob to toggle these behaviors based on the specific latency/cost requirements of the workload.
