# 004: Agent/Call

> A **Call** is like giving a specific command to an AI. If a "Tool" is a recipe for what the AI *can* do, a "Call" is the act of actually cooking that recipe with specific ingredients.
>
> — [Glossary](./000_glossary.md)

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

The document on [Tools](./002_agent_tool.md) explained how we give an AI a list of its abilities, like a menu of what it can do. This document explains the **004: Agent/Call**, which is the command that tells the AI to actually *use* one of those abilities.

A **Call** is a specific instruction to use a Tool. If a Tool is the idea of "sending an email," a Call is the command "send an email to mom with the subject 'Hi!'". The Tool is the *what*, and the Call is the *how*.

> [!TIP]
> When an AI decides to make a set of `Calls` in one moment, we call that a [Vessel](./202_idea_vessel.md). A `Vessel` is like a snapshot of the AI's decision to act, picking from its available `Tools` to respond to something.

## Giving Calls Superpowers

A `Call` on its own is just a simple command. But it gets powerful when you add special instructions that change *how* it runs. These instructions are like special keywords that start with an underscore (`_`).

By understanding these keywords, the AI can do more than just pick a tool. It can build complex plans, like a chef who doesn't just follow recipes but combines them in new ways to create a whole new dish.

- **Running Exact Code (`_activity`)**: Sometimes, you don't want the AI to "think" about how to do something; you just want it to run a specific piece of code that always works the same way. The `_activity` keyword is like telling the AI, "For this task, don't guess. Just press this button." This is for tasks that need to be perfect every time, like doing math.

  > Sidenote:
  > - [003: Agent/Activity](./003_agent_activity.md).

- **Handing Off a Task (`_module`)**: A `Call` can tell the system to give a job to a different, specialized agent, called a **Module**. This is like being a project manager and assigning a specific task to an expert on your team. That expert works on it in their own space, so they don't get distracted by what everyone else is doing.

  > Sidenote:
  > - [009: Agent/Module](./009_agent_module.md).

- **Giving Only the Needed Information (`_imports`)**: This controls what information a `Call` can see. Think of it like giving someone a folder with only the exact papers they need for a task, instead of showing them your entire messy office. It helps the AI focus and gives better results. When you use this with a `_module` (handing a task off to an expert), it's even stricter: you're giving that expert *only* the specific instructions they need, and nothing else.

  > Sidenote:
  > - [008: Agent/Imports](./008_agent_imports.md).

- **Saving the Result (`_outputPath`)**: A `Call` can be told where to save its result. It's like telling a program, "When you're done, save your work in this specific file." This is super useful because it lets you chain tasks together. The next `Call` can then open that file and use the result from the first one.

  > Sidenote:
  > - [010: Agent/State](./010_agent_state.md).

- **Working on One Item in a List (`_instance`)**: This tells a `Call` to focus on one specific item from a big list. Imagine you have 100 photos to edit. Instead of writing 100 separate commands, you can make one command that uses `_instance` to mean "do this edit for each photo, one by one." This lets the system work on many things at once, very efficiently.
  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md).

## Ways to Run Multiple Calls

When an AI has a list of `Calls` to make, it can run them in different ways:

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

These let you do cool things:

- **One by One**: Do each task individually, so you can check the results in between
- **All at Once**: Do a bunch of separate tasks at the same time to save time
- **First One to Succeed**: Try a few ways to solve a problem and go with the first one that works (`.any()`)
- **First to Finish**: It's a race! Run several tasks and see which one finishes first, even if it fails (`.race()`)
- **All or Nothing**: Make sure every single task in a group succeeds. If even one fails, you stop (`.all()`)

## Chaining Calls Together

Running a batch of `Calls` is useful, but often an AI needs to do things in a specific order, where the result of one step is needed for the next. This is like following a recipe with multiple steps.

Another part of the system manages this process, creating a "Loop" where the AI can make a request, get a result, and then use that result to decide what to do next.

The next document, [005: Agent/Loop](./005_agent_loop.md), explains this in more detail.
