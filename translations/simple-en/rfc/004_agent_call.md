# 004: Agent/Call

> **Call:** Think of a `Tool` as a recipe in a cookbook. A `Call` is you actually deciding to bake the cake, using specific ingredients. It’s a real, ready-to-go order to do something.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
> - Requires:
>   - [103: Concept/Ideator](./103_concept_ideator.md)
> - Enables:
>   - [008: Agent/Imports](./008_agent_imports.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)
>   - [202: Idea/Vessel](./202_idea_vessel.md)
>   - [203: Idea/Process](./203_idea_process.md)
> - Extended by:
>   - [009: Agent/Module](./009_agent_module.md)

We've learned that an [Idea](./101_concept_idea.md) is a way to hold knowledge and that a [Tool](./002_agent_tool.md) is like a blueprint that tells an AI what it can do. This document explains the **Call**, which is the command that tells a Tool to actually *do* something.

A **Call** is a `Tool` that has been filled out with all the specific details needed to run. If a `Tool` tells you *what can be done*, a `Call` tells you *how it's going to get done right now*.

> [!TIP]
> When an AI makes a decision that results in a list of `Calls` to execute, that whole plan of action is called a **[Vessel](./202_idea_vessel.md)**. A `Vessel` is like a snapshot of the AI's decision at a single moment.

## Mixing and Matching for Smarter Actions

A `Call` by itself is just a simple instruction. Its real power comes from special commands that tell the system *how* to run it. These commands are easy to spot because they start with an underscore (`_`).

By understanding these special commands, the AI can be more than just a tool-picker. It can act like a project manager, mixing and matching commands to build complex new plans on the fly.

- **Explicit Execution (`_activity`)**: This is the most basic special command. It connects a `Call` directly to a piece of code that works like a machine. An `_activity` means the `Call` should be handled by a predictable program, not by the AI's creative thinking.

  > Sidenote:
  > - [003: Agent/Activity](./003_agent_activity.md).

- **Delegated Execution (`_module`)**: A `Call` can be handed off to an outside helper called a **Module**. Think of a manager delegating a task to another department. The `_module` command points to a saved plan, which then runs in its own separate space. This keeps things neat and prevents different tasks from interfering with each other.

  > Sidenote:
  > - [009: Agent/Module](./009_agent_module.md).

- **Context Bridging (`_imports`)**: The **Imports** command tells a `Call` exactly what information it's allowed to look at. It’s like giving someone blinders so they can only focus on the work right in front of them. This helps the AI produce more reliable results by preventing it from getting distracted by too much information. When used with a `_module` (the separate department), it becomes even stricter: it defines the *only* information that department is allowed to see.

  > Sidenote:
  > - [008: Agent/Imports](./008_agent_imports.md).

- **Stateful Execution (`_outputPath`)**: A `Call` can be told where to save its result when it's finished. The `_outputPath` command gives it a file path, like telling it to write the answer on a specific page in a notebook. This lets you create multi-step projects where the result from one `Call` becomes the starting point for the next.

  > Sidenote:
  > - [010: Agent/State](./010_agent_state.md).

- **Instanced Execution (`_instance`)**: A `Call` can be aimed at one specific item within a larger group. The `_instance` command works like an ID card, telling all parts of the `Call` to focus on just one thing. This is great for doing the same job on many different items at once, like a factory assembly line processing many products in parallel.
  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md).

## Different Ways to Run a To-Do List

When an AI has a list of `Calls` to run, it can handle them in a few different ways:

```typescript
// Single Call execution
const result = await Tool(call);

// Execute all Calls, wait for all results
const results = await Tool.all(calls);

// Execute all Calls, return first success
const result = await Tool.any(calls);

// Execute all Calls, return first completion (success or failure)
const result = await Tool.race(calls);
```

These different ways let you:

- **Control Every Step**: Handle `Calls` one by one, with your own logic in between.
- **Work in Batches**: Run a bunch of independent `Calls` at the same time to go faster.
- **Find One Quick Answer**: Stop as soon as any `Call` succeeds (`.any()`).
- **Get the Fastest Result**: Stop as soon as any `Call` finishes, whether it worked or not (`.race()`).
- **Succeed Together**: Make sure all `Calls` in a group finish successfully, which is important when they depend on each other (`.all()`).

## Orchestrating Calls in a Loop

These patterns are great for managing one batch of `Calls`. But often, an AI needs to tackle a bigger project where the result of one step is needed for the next. This is handled by a higher-level system that organizes `Requests` and `Calls` one after another.

The next document, **[005: Agent/Loop](./005_agent_loop.md)**, explains how this step-by-step process works.