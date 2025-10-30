# Agent System Updates (Session of October 30, 2025)

This document outlines a series of significant updates to the agent system's core protocols, focusing on enhancing the capabilities of Activities, formalizing the Plan system, and clarifying execution semantics.

## 1. Enhanced Activity Signature and Contextual Awareness (`003_agent_activity.md`)

The signature for `Activity` handlers has been expanded to provide them with greater context and control, enabling more sophisticated deterministic logic.

### Change:

- An `Activity` handler now accepts three arguments: `(call, tool, context)`.
  - **`call`**: The complete call object, including all parameters and meta-properties (`_outputPath`, `_instance`, etc.).
  - **`tool`**: The schema of the tool being executed, allowing the activity to inspect its own interface, such as the `_output` schema.
  - **`context`**: An array of messages explicitly imported from the parent environment via the `:term[Scopes]{canonical="Scope"}` protocol.

### Reasoning:

This change is critical for enabling complex, code-driven workflows. Previously, an activity was mostly blind to the larger context of its execution. Now, it has everything it needs to:

- **Resolve Branching Logic**: An activity can inspect a branching `_outputPath` expression (e.g., `'†state.sunny || †state.rainy'`) and use its own deterministic logic to decide which path to write its result to.
- **Access Scoped State**: It can securely access necessary information from the parent state without being exposed to the entire context.

## 2. Formalized Plan System and Execution Modes (`012_agent_plan.md`)

The concept of "planning" has been clarified and formalized, establishing it as the core operational model of the agent.

### Changes:

- **Opt-In Persistence**: The presence of a `Plan` message in a request now explicitly signals a stateful, iterative workflow. This instructs the Execution Loop to persist the plan and state across turns. Stateless, one-shot requests are the default if this message is omitted.
- **Execution Modes (`eager` vs. `lazy`)**: The `Plan` message now includes a `mode` property to control execution strategy.
  - **`eager` (default)**: In this mode, **planning is execution**. The LLM generates the plan and simultaneously executes any latent steps it can in a single, continuous flow of reasoning. There is no intermediate "inspection" step.
  - **`lazy`**: This mode enforces a strict separation. The LLM acts as a pure planner, generating a complete, declarative data-flow graph without performing any latent execution. This creates a checkpoint for validation or human-in-the-loop (HITL) approval before execution begins.
- **Clarified Latent Branching**: We've specified that in the **first iteration** of an `eager` plan, a latent call cannot branch based on its own output. Because planning and execution are simultaneous, the LLM's reasoning process collapses any potential branching `_outputPath` into a single, concrete path for that turn.

### Reasoning:

These changes provide a more rigorous and flexible framework for agent operations. Making plan persistence opt-in clarifies the distinction between simple and complex tasks. The `eager`/`lazy` modes give developers precise control over the agent's autonomy, allowing for both high-speed, reactive execution and deliberate, human-supervised workflows without changing the fundamental architecture.

## 3. Ephemeral and Fire-and-Forget Calls (`008_agent_output.md`)

The behavior for calls that omit the `_outputPath` property has been explicitly defined, enabling new and powerful patterns.

### Change:

- A new section, "Calls Without an Output Path," was added to explain the two distinct behaviors:
  - **Latent Calls (Ephemeral Reasoning)**: A latent call without an `_outputPath` acts as an intermediate "thought." It enriches the LLM's context for subsequent steps within the same `solution` but is not persisted to the state, preventing clutter. This allows for more structured, multi-step reasoning within a single turn.
  - **Explicit Calls (Fire-and-Forget)**: An `Activity` call without an `_outputPath` is a "fire-and-forget" operation. The Execution Loop invokes the activity but doesn't wait for or store a result.

### Reasoning:

This clarifies that omitting `_outputPath` is an intentional architectural choice. It allows the LLM to perform more complex reasoning without creating an overly verbose state history, and it provides a clean mechanism for triggering side effects (like logging or notifications) that don't need to block the main execution flow.
