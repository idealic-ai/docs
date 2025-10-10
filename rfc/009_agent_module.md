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

Modules enable powerful composition by allowing `Ideas` to act as standalone services that can be orchestrated by other agents. This creates a clear hierarchy: high-level agents can focus on orchestration, while delegating specialized tasks to low-level, reusable modules.

Consider a high-level **`Composer`** agent and a low-level **`Sound-Designer`** module.

- The **`Sound-Designer`** is a self-contained `Idea` (`idea://sound-designer`). Its context contains expert knowledge on using a synthesizer. It is a reusable, specialist tool that accepts a musical concept and returns generated audio data.

- The **`Composer`** agent's job is to create a complete song. Its process involves first generating a core musical idea and then producing the sounds to realize it. The `Composer` has its own inline `Tool`, `createMelody`, to handle the first part. For the second part, it uses a `Tool` called `synthesizeSound`, which delegates the work by specifying `_module: 'idea://sound-designer'`.

The `Composer`'s workflow is a multi-step process that mixes inline and modular execution:

1.  **Internal Work**: The `Composer` first calls its own `createMelody` tool. This is an inline execution that happens within the `Composer`'s own context, producing a structured melody and a narrative for the song.

2.  **Delegation**: Now, with the melody and narrative in hand, the `Composer` calls the `synthesizeSound` `Tool` multiple times—once for the lead, once for the bassline, etc. For each `Call`, the execution looks like this:
    1.  A new, isolated sub-request is created.
    2.  The `Sound-Designer` `Idea` is loaded. Its own `context`, which contains its expert knowledge (e.g., "You are a world-class sound designer specializing in analog synthesizers..."), forms the base for the new execution environment.
    3.  The `Composer` uses `_imports` to select pieces of its context (the melody, narrative, etc.). This imported context is then **appended** to the `Sound-Designer`'s base context.
    4.  The LLM for this sub-request receives the **combined context**: the module's permanent expert instructions followed by the caller's specific, temporary creative direction.
    5.  The `Sound-Designer` applies its expertise to the provided creative brief and generates the requested audio, which is returned as the output of the `synthesizeSound` `Call`.

3.  **Assembly**: The `Composer` gathers the results from all its `Calls` to the `Sound-Designer` and assembles them with its original melody into the final song. This way, the `Composer` performs its own high-level creative work and then orchestrates specialist modules to handle the low-level implementation details.

## Handling Large Schemas

The Module protocol also provides a solution for managing `Tools` with very large or complex output schemas. Instead of including a massive `_output` schema in the main request—potentially crowding out other tools—a `Tool` can be defined with only its `input` parameters and a `_module` pointer.

The LLM can plan the `Call` with just the input, and the complex output will be generated within the module's isolated sub-request. This allows an agent to reason about a sequence of complex operations without needing to "see" the entire, detailed schema for every step in a single context window. The LLM trusts that the module will produce the correct output, which it will receive and use in subsequent steps.
