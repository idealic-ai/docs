# 004: Agent/Call

> **Call:** Think of a **Tool** as a recipe for a cake. A **Call** is when you actually bake the cake, using specific ingredients like 2 cups of flour and 3 eggs. It’s the command to *do* something. — [Glossary](./000_glossary.md)

> Sidenote:
> - Requires:
>   - [002: Agent/Tool](./002_agent_tool.md)
> - Enables:
>   - [103: Concept/Ideator](./103_concept_ideator.md)
>   - [008: Agent/Imports](./008_agent_imports.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)
>   - [202: Idea/Vessel](./202_idea_vessel.md)
>   - [203: Idea/Process](./203_idea_process.md)
> - Extended by:
>   - [009: Agent/Module](./009_agent_module.md)

The [Tool document](./002_agent_tool.md) explained how we give an AI a set of defined abilities, like a list of recipes it knows. This document explains the **Call** protocol, which is how we tell the AI to actually *use* one of those recipes.

A **Call** is a specific instruction to use a Tool with all the details filled in, ready to go. While a Tool describes *what can be done*, a Call defines *how it gets done right now*.

> [!TIP]
> When an AI responds to a request by creating a set of Calls, we call that a [Vessel](./202_idea_vessel.md). A Vessel is like a single, complete decision—the AI looks at the tools it has and decides which ones to use to get the job done.

## Combining Calls with Other Systems

A Call on its own is just a simple piece of data. It becomes powerful when it's combined with other systems that manage how it runs. We activate these systems using special settings in the Tool's recipe that start with an underscore (`_`), like `_activity` or `_module`. 

This lets the AI do more than just pick a tool. It can creatively combine these special settings to build new and complex workflows on the fly.

- **Doing something with code (`_activity`)**: The most basic way to make a Call powerful is to link it to a specific piece of computer code that runs predictably every time. The `_activity` setting tells the system, "Don't just think about this; run this exact program to get the answer."

  > Sidenote:
  > - [003: Agent/Activity](./003_agent_activity.md).

- **Delegating to a specialist (`_module`)**: A Call can hand off its job to another self-contained system called a **Module**. The `_module` setting is usually a link to a saved request, turning that whole request into a reusable tool. This is like giving a task to a specialized team that works in its own separate office, which prevents them from being distracted by anything else.

  > Sidenote:
  > - [009: Agent/Module](./009_agent_module.md).

- **Focusing its attention (`_imports`)**: The **Imports** system controls what information a Call is allowed to see. Its main job is to tell the AI, "Only pay attention to *this specific information* from the main conversation when you think about your next step." When used with a Module, it's even stricter: it defines the *only* information the specialized team is allowed to see, ensuring they aren't influenced by anything else.

  > Sidenote:
  > - [008: Agent/Imports](./008_agent_imports.md).

- **Saving the result (`_outputPath`)**: A Call can be told where to save its result. The `_outputPath` setting is like giving a worker a specific spot on a shelf to place a finished part. This allows you to create assembly lines where the output of one step becomes the input for the next.

  > Sidenote:
  > - [010: Agent/State](./010_agent_state.md).

- **Working on a specific item (`_instance`)**: When you're running the same task on many different items at once, a Call can be aimed at a specific one. The `_instance` setting acts like a serial number, telling the system to focus all its work (like reading info and saving results) on just one item. This lets you process many things in parallel without getting them mixed up.
  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md).

## Ways to Run Calls

When an AI creates a list of Calls to execute, you can run them in different ways depending on what you need.

```typescript
// Run a single Call by itself
const result = await Tool(call);

// Run all Calls at once and wait for them all to finish
const results = await Tool.all(calls);

// Run all Calls at once, but stop as soon as one succeeds
const result = await Tool.any(calls);

// Run all Calls at once and stop as soon as the first one finishes (whether it succeeded or failed)
const result = await Tool.race(calls);
```

These different methods let you:

- **Control every step**: Handle one Call at a time with your own logic in between.
- **Work in batches**: Run a bunch of independent Calls at the same time for speed.
- **Find the first success**: Get an answer as quickly as possible without waiting for every Call to finish (`.any()`).
- **Create logical groups**: Make sure a whole group of Calls succeeds together, keeping everything consistent (`.all()`).

## Chaining Calls Together in a Loop

These patterns are great for running a single batch of Calls. But often, an AI needs to perform a task in multiple steps, where the result of one Call is needed to figure out the next one. This is managed by a bigger system that organizes these steps.

The next document, [005: Agent/Loop](./005_agent_loop.md), explains how that step-by-step process works.
