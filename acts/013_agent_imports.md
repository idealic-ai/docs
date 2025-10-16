# 008: Agent/Imports

> **Imports:** A mechanism for making a controlled subset of context from a parent environment available to an execution. The `_imports` property acts as an allow-list, defining a focused and secure view of the data a `Call` can access. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [002: Agent/Tool](./002_agent_tool.md)
>   - [004: Agent/Call](./004_agent_call.md)

The **Imports Protocol** is a fundamental mechanism for managing the context available to a `Call`. In a complex agentic system, a `Call` rarely executes in a vacuum; it often needs access to information from its parent environment, such as user input, current state, or the results of previous steps. The Imports Protocol provides a secure and explicit way to control this flow of information.

By restricting the context, imports enhance security, prevent accidental data leakage, and focus the LLM, leading to more predictable and cost-effective executions. This controlled context is also the key to modularity, allowing components like `Ideas` and `Activities` to be truly self-contained and reusable. This document explains how this protocol works and how it composes with other agent capabilities.

## Provisioning vs. Requesting Context

The schema for the `_imports` property determines whether context is statically **provisioned** or dynamically **requested** at runtime.

> Sidenote:
>
> ```mermaid
> graph TD
>     subgraph Parent Context
>         direction LR
>         input("input")
>         state("state")
>     end
>
>     subgraph Tool Call
>         direction LR
>         filter{{"_imports: ['input']"}}
>     end
>
>     input --> filter
>     state -.-> filter
>
>     subgraph Provisioned Context
>         Execute(Execute Tool)
>     end
>
>     filter --> HITL{{Human approval}}
>     HITL --> Execute
>
>     classDef unused stroke-dasharray: 5, 5, stroke:#aaa, color:#aaa
>     class state unused
>     classDef optional stroke-dasharray: 5, 5
>     class HITL optional
> ```

- **Static Imports (Context Provisioning)**: The `_imports` schema can be a `const` value, which means the context is **provisioned**. The designer has hard-coded the exact context the tool is allowed to see.

  ```json
  {
    "_imports": {
      "const": ["input"]
    }
  }
  ```

- **Dynamic Imports (Context Requesting)**: The `_imports` schema can be more flexible, allowing the context to be **requested**. The LLM decides which of the available imports it needs to generate the `Call`.

  ```json
  {
    "_imports": {
      "type": "array",
      "items": {
        "enum": ["state", "input"]
      }
    }
  }
  ```

  This dynamic pattern is especially powerful when combined with a human-in-the-loop approval system, providing a critical layer of transparency and control.

## The Role of Imports in Call Composition

The `_imports` property is the primary mechanism for controlling the context available to a `Call`. It acts as an allow-list, filtering the parent environment to provide a focused, limited field of view for the execution. This controlled context is fundamental to how a `Call` is processed, and its role adapts to support a compositional model of execution where different capabilities like explicit logic, instancing, and modularity can be combined.

- **Latent Execution**: In the default latent execution, `_imports` serve as a "nudge" to focus the LLM's attention on relevant parts of the parent context. This is a best-effort guide, not a strict filter, but it is crucial for improving the reliability and cost-effectiveness of LLM-driven reasoning by reducing noise from irrelevant data.

  > Sidenote:
  >
  > - [002: Agent/Tool](./002_agent_tool.md).

- **Explicit Execution (`_activity`)**: When a `Call` is backed by a deterministic `Activity`, the role of imports becomes more direct. The imported context is passed wholesale to the `Activity` function as an additional parameter. This gives the `Activity` full access to the necessary contextual data, even if that data wasn't directly used by the LLM to generate the `Call`'s primary parameters.

  > Sidenote:
  >
  > - [003: Agent/Activity](./003_agent_activity.md).

- **Instancing (`_instance`)**: In a multi-instance request where the agent processes a batch of similar data objects, imports become instance-aware. The protocol ensures that a `Call` targeting a specific instance receives only the context for _that_ instance. This is critical for maintaining data integrity and preventing context from "leaking" between parallel executions.

  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Modular Isolation (`_module`)**: When a `Call` is delegated to an external `Module`, imports act as the gatekeepers of context. They define the _entire_ context for the module's isolated "clean room" execution. Nothing from the parent environment is available to the module unless it is explicitly imported, ensuring true encapsulation and reusability.

  > Sidenote:
  >
  > - [009: Agent/Module](./009_agent_module.md)

The `_imports` property is the bridge that allows a `Call` to receive context. As this final pattern shows, when this mechanism is used to provide the _entire_ context for an isolated execution, it enables the powerful **Module Protocol**. The next document, [009: Agent/Module](./009_agent_module.md), describes this protocol in detail.
