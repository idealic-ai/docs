# 009: Agent/Module

> **Module**: An external, reusable unit of logic (an `Activity` or an `Idea`) that can be invoked via a `Call` with a `Module Scope`. Signaled by the `_module` property.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [004: Agent/Call](./004_agent_call.md)
> - Complemented by:
>   - [008: Agent/Imports](./008_agent_imports.md)

This document describes the **Module Protocol**, which enables `Tools` to be executed in an isolated context, either by referencing another `Idea` or by invoking an `Activity` in a clean sub-request. It is the primary mechanism for composing complex agentic behaviors from self-contained, reusable components.

## The Problem: Monolithic Tools and Context Bleeding

As agent capabilities grow, defining all `Tools` within a single, monolithic context becomes untenable.

1.  **Large Schemas**: LLMs have practical limits on the complexity of schemas they can handle in a single request. Combining numerous complex `Tools` can exceed these limits, preventing the LLM from correctly processing the available options.
2.  **Context Bleeding**: When all `Tools` operate in the same context, the LLM can be influenced by irrelevant information, leading to incorrect `Tool` selection or parameter filling.
3.  **Lack of Reusability**: A `Tool` defined for one agent is not easily portable to another without bringing its entire context with it.

The Module Protocol solves these problems by introducing **Module Scope**, a way to delegate a `Call` to an external, isolated execution environment.

## The `_module` Property

Module Scope is signaled by the `_module` property within a `Tool`'s schema. This property instructs the system to treat the `Call` not as an inline operation, but as a request to an external module.

The `_module` property is a `string`.

- **`_module: 'idea://<idea-name>'`**: A string, typically a URI, that resolves to a specific `Idea`. This tells the executor to run the `Call` within the context of the referenced `Idea`.
- **`_module: 'anonymous'`**: A string literal that signals an anonymous module. This is used when you need an isolated execution environment for an `Activity` without the overhead of a full `Idea` context.

## Execution in a Clean Room

A module provides a "clean room" for execution. Instead of running inside the parent agent's bustling context, the `Call` is processed in a new, isolated sub-request. The context for this sub-request is carefully constructed, not inherited.

This is where the **[Imports Protocol](./008_agent_imports.md)** becomes critical. The `_imports` property on the `Tool` schema acts as a bridge, explicitly declaring which pieces of the parent context should be "imported" into the module's clean room. This gives the parent agent precise control over what the module can see, preventing context bleeding and enabling true encapsulation.

> Sidenote:
>
> - [008: Agent/Imports](./008_agent_imports.md)

## Composition and Reusability: The Composer & Sound Designer

Modules enable powerful composition by allowing `Ideas` to act as standalone services that can be orchestrated by other agents. This creates a clear, dynamic hierarchy: high-level agents can focus on orchestration while delegating specialized tasks to low-level, reusable modules.

Consider a workflow with two specialist modules: a **`Composer`** and a **`Sound-Designer`**.

- The **`Sound-Designer`** is a low-level expert. It's a self-contained `Idea` (`idea://sound-designer`) focused on the physics of sound, knowing how to operate synthesizers to produce specific audio data.

- The **`Composer`** is a mid-level specialist. Its primary job is to create a song. It uses its own inline tools to generate a melody and musical structure. To realize this vision, it then makes `Calls` to the `Sound-Designer` module to synthesize the actual sounds.

This two-layer hierarchy is a common pattern. However, the true power of modules lies in their dynamic, task-driven composition.

Now, let's introduce a high-level **`Producer`** agent. The `Producer`'s goal is to create a finished record. Based on the specific task, the `Producer` can orchestrate its modules in different ways:

- **Hierarchical Orchestration**: For creating a song, the `Producer` might make a single `Call` to the `Composer` module. The `Producer` provides high-level direction ("I need a sad ballad"), and the `Composer` executes its entire internal workflow, including its own nested `Calls` to the `Sound-Designer`. The `Producer` doesn't need to know about the `Sound-Designer`'s existence in this case.

- **Parallel Orchestration**: If the `Producer` also needs specific sound effects for the record (like foley or an ambient soundscape), it can make `Calls` directly to the `Sound-Designer` module for those tasks, in parallel with its `Call` to the `Composer`.

This demonstrates the key principle: the composition is not fixed within the tools themselves. The `Producer` can choose to treat the `Composer` as a black box or to interact with its constituent parts (`Sound-Designer`) directly, all depending on the needs of the moment. This flexibility allows the same set of expert modules to be combined in various arrangements, creating a deeply composable and emergent system.

## Handling Large Schemas

The Module protocol also provides a solution for managing `Tools` with very large or complex output schemas. Instead of including a massive `_output` schema in the main request—potentially crowding out other tools—a `Tool` can be defined with only its `input` parameters and a `_module` pointer.

The LLM can plan the `Call` with just the input, and the complex output will be generated within the module's isolated sub-request. This allows an agent to reason about a sequence of complex operations without needing to "see" the entire, detailed schema for every step in a single context window. The LLM trusts that the module will produce the correct output, which it will receive and use in subsequent steps.

## Module Resolution Strategies

A `Tool` becomes a `Module` simply by including the `_module` property in its schema. This signals that the `Call` should be delegated. The key question is _when_ this delegation is resolved. The system supports two strategies, allowing a trade-off between strict safety and dynamic flexibility.

### 1. Execution-Time Resolution (Default)

The default and most flexible approach is to resolve the module at **execution time**, after an agent has already generated a `Call`.

This method enables a powerful paradigm that is not possible with traditional code: **the LLM acts as an intelligent glue layer.** An agent can generate a `Call` with parameters that don't perfectly match the module's expected `input` schema. At execution time, the system assembles the module's context and the caller's provided input, and the LLM in the sub-request is tasked with bridging the gap.

This is a significant advantage, as it allows modules to be updated and evolve independently. Even if a module changes its input structure, calling agents won't immediately break. The LLM will attempt to adapt the old `Call` format to the new `input` schema, providing a level of resilience and loose coupling that is unique to this architecture.

The process is as follows:

1.  An agent generates a `Call` to the modular `Tool`.
2.  The executor sees the `_module` property and initiates the protocol.
3.  **Context Assembly**: The executor fetches the module `Idea` (if not anonymous) and assembles the base context. It then uses `_imports` to append the caller's context.
4.  **Input Mapping**: The `params` from the `Call` are packaged into an `Input Message` and added to the context. This is where the LLM's "glue" capability comes into play, as it will use this input to fulfill the module's logic, even if the schemas don't align perfectly.
5.  **Execution**: A new, isolated `Request` is made with the combined context. The result is returned as the output of the original `Call`.

### 2. Upfront Resolution (Optional)

For scenarios requiring stricter guarantees, a module can be resolved **upfront**, before the initial `Request` is sent to the agent.

In this mode, the system pre-fetches the module `Idea` and merges its `input` schema with the `Tool`'s parameter schema. This allows the agent's LLM to see the module's exact requirements from the start, ensuring that the generated `Call` is perfectly formed and type-safe.

This approach provides the safety of traditional API contracts but sacrifices the flexibility of execution-time resolution. It is best used for critical, well-defined integrations where loose coupling is not a desired feature.
