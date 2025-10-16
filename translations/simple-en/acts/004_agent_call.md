# 004: Agent/Call

> **What's a Call?**
> Imagine a **Tool** is like a recipe for baking a cake. It tells you the ingredients and steps you *could* take. A **Call** is when you actually decide to bake a *specific* cake, with chocolate chips and vanilla frosting. It's the recipe filled out and ready to go.

> Sidenote:
> - Depends on:
>   - [002: Agent/Tool](./002_agent_tool.md)
> - Helps create:
>   - [103: Concept/Ideator](./103_concept_ideator.md)
>   - [013: Agent/Scopes](./013_agent_scopes.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)
>   - [202: Idea/Vessel](./202_idea_vessel.md)
>   - [203: Idea/Process](./203_idea_process.md)
> - Is expanded by:
>   - [012: Agent/Delegate](./012_agent_delegate.md)

The previous document, [Agent/Tool](./002_agent_tool.md), explained how we give our AI helpers a list of their abilities, like a menu of recipes. This document explains the **Call**, which is how the AI actually uses one of those abilities.

A **Call** is a command to use a specific Tool with all the details filled in. If a Tool is what *can be done*, a Call is the decision of *what is being done right now*.

> **Heads Up**
> When an AI decides to use a bunch of Tools to respond to a request, that whole package of ready-to-go `Calls` is called a **Vessel**. Think of it as the AI's complete plan of action for a single moment.

## How Calls Work with Other Systems

A Call by itself is just a simple instruction. Its real power comes from special notes, called **meta-properties**, that can be attached to it. These notes start with an underscore (like `_activity`) and tell our system *how* to handle the instruction.

By giving these notes clear meanings, the AI can be more creative. It doesn't just pick a tool; it can combine these special notes to build complex plans, like a chef deciding not just what to cook, but how to manage the whole kitchen.

> **Just a heads up:**
> The next few points talk about how a Call connects to other parts of our system. You don't need to understand them all right away. We'll explain each part in detail later. You can always come back here for a refresher.

- **Telling it to Run Code (`_activity`)**: This is the most basic note. It connects a Call to a specific piece of code. It’s like telling a robot, "Instead of trying to figure out how to open this jar, just run your 'jar-opener' program."

  > Sidenote:
  > - [003: Agent/Activity](./003_agent_activity.md).

- **Handing Off the Job (`_delegate`)**: This note tells the system to give this Call to a different, specialized helper. It's like asking a friend who's an expert baker to handle the cake part of your dinner party. This keeps the main helper's workspace clean and avoids confusion.

  > Sidenote:
  > - [012: Agent/Delegate](./012_agent_delegate.md).

- **Focusing its Attention (`_scopes`)**: This note tells the AI exactly what information it should look at to complete the Call. It’s like giving someone a book and saying, “You only need to read the highlighted sentences.” This helps the AI focus and gives better results. When you hand off a job to a delegate, this note tells them exactly what information they get to see.

  > Sidenote:
  > - [013: Agent/Scopes](./013_agent_scopes.md).

- **Saving the Result (`_outputPath`)**: This note tells the system where to save the result of the Call. It’s like saying, “After you finish your math homework, put the answer sheet in this specific folder.” This lets you use the result of one step as the starting point for the next one.

  > Sidenote:
  > - [009: Agent/State](./009_agent_state.md).

- **Doing the Same Job on Many Things (`_instance`)**: This note is used when you have the same task but for many different items, like resizing 100 photos. The `_instance` note acts like a label for each photo, so the system knows which photo it's working on and where to save the resized version without getting them mixed up. This lets it work on many things at once, very efficiently.
  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md).

## Different Ways to Run Calls

When an AI creates several Calls at once, we can run them in different ways depending on what we need.

```typescript
// Run just one Call
const result = await Tool(call);

// Run all Calls and wait for them all to finish
const results = await Tool.all(calls);

// Run all Calls and stop as soon as one succeeds
const result = await Tool.any(calls);

// Run all Calls and stop as soon as one finishes (whether it succeeded or failed)
const result = await Tool.race(calls);
```

These different strategies let us:

- **Be very precise**: Handle each Call one by one, with special steps in between.
- **Work in batches**: Run a bunch of independent Calls all at once to save time.
- **Find a quick answer**: Stop as soon as we get the first successful result (`.any()`).
- **Act on the first result**: Stop as soon as *any* Call finishes, successful or not (`.race()`).
- **Succeed together**: Make sure that a group of related Calls all finish successfully (`.all()`).

## Putting Calls Together in a Loop

These patterns are great for running a single batch of Calls. But often, an AI needs to do things in multiple steps, where the result of one Call is needed for the next. This is handled by a bigger system that manages the flow of requests and calls over time.

The next document, [005: Agent/Loop](./005_agent_loop.md), explains how this step-by-step process works.
