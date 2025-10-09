# 008: Agent/Imports

> **Import:** A key that identifies a piece of context from the parent environment to be made available (`imported`) to an execution. It can be used to focus an LLM's attention in a **Latent Inline** execution or to construct the entire context for a **Module Scope** execution. Controlled by the `_imports` property.
>
> — [Glossary](./000_glossary.md)

The [Call Protocol](./004_agent_call.md) defines the high-level controls for `Call` execution: **Scope** (Inline vs. Module) and **Method** (Explicit vs. Latent). The **Imports Protocol** explains how to combine these controls and manage the context for each resulting execution pattern.

## Combining Scope and Method

1.  **Inline Explicit (`_activity`)**: This is the classic tool-use pattern. The LLM generates `params`, and a local function is immediately executed by the host. `_imports` are not typically used here as the Method is not Latent.

2.  **Inline Latent (no `_activity`)**: The LLM generates both `params` and `_output` in a single turn. The `_imports` property can be used here to focus the LLM's attention on specific parts of the context, preventing it from being influenced by irrelevant information.

3.  **Modular Explicit (`_module` + `_activity`)**: The LLM generates `params`. The system then invokes the specified Activity (`_activity`) from the resolved `_module` in a new, isolated context. If `_imports` are specified, that filtered context is passed as an additional argument to the Activity code.

4.  **Modular Latent (`_module`, no `_activity`)**: The LLM generates `params`. The system then initiates a new, isolated LLM call, using the `Idea` specified in `_module` as the guide. The context for this new call is constructed by combining the module's own context with the data specified in `_imports`.

## Focusing the Field of View

The `_imports` property is the primary mechanism for controlling the context available to a `Call`. It acts as an allow-list, filtering the parent environment to provide a focused, limited field of view for the execution.

- **In an Inline Scope**: `_imports` focus the LLM's attention.
- **In a Module Scope**: `_imports` define the _entire context_ for the isolated execution.

## Provisioning vs. Requesting Context: Static vs. Dynamic Imports

The `_imports` property within a `Tool`'s schema determines whether the context is pre-approved and **provisioned** to the tool, or dynamically **requested** by the LLM at runtime.

- **Static Imports (Context Provisioning)**: If the `_imports` property is a `const` value (e.g., `_imports: { "const": ["user_request"] }`), the context is **provisioned**. The `Tool` designer has hard-coded the exact context the tool is allowed to see.

- **Dynamic Imports (Context Requesting)**: If the `_imports` property is a flexible schema (e.g., an array of enums `_imports: { "type": "array", "items": { "enum": ["session_memory"] } }`), the context is **requested**. The LLM decides which of the available imports it needs to generate the `Call`.

This dynamic pattern is especially powerful when combined with a human-in-the-loop approval system, providing a critical layer of transparency and control.

## The Power of a Limited Context

- **Enhanced Security & Focus**: By restricting the field of view, Imports prevent accidental data leakage and focus the LLM, leading to more predictable, accurate, and cost-effective executions.
- **Improved Modularity**: Imports allow modules (`Ideas` and `Activities`) to be truly self-contained and reusable.
