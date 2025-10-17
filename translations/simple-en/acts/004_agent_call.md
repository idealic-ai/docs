# 004: Agent/Call

> [!DEFINITION] [Call](./000_glossary.md)
> Think of a Tool as a recipe. A Call is when you actually use that recipe with specific amounts of ingredients to bake something. It's the plan put into action.

> Sidenote:
> - Needs this first:
>   - [002: Agent/Tool](./002_agent_tool.md)
> - Helps make these possible:
>   - [103: Concept/Ideator](./103_concept_ideator.md)
>   - [013: Agent/Scopes](./013_agent_scopes.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)
>   - [202: Idea/Vessel](./202_idea_vessel.md)
>   - [203: Idea/Process](./203_idea_process.md)
> - Is improved by:
>   - [012: Agent/Delegate](./012_agent_delegate.md)

The Tool is the blueprint that describes what a helper AI can do. This document explains the **Call**, which is the next step: telling the AI how to actually *do* it.

A Call is a filled-out order for a Tool, with all the details filled in, ready to go. If a Tool tells you *what can be done*, a Call tells you *how it gets done right now*.

> [!HEADSUP] Heads up
> When an AI receives a Request and decides to make a set of Calls, that entire package is called a Vessel. A Vessel is like a single moment of decision, where the AI picks the right Tools from its toolbox to get a job done.
>
> > Sidenote:
> >
> > - [001: Agent/Request](./001_agent_request.md)
> > - [202: Idea/Vessel](./202_idea_vessel.md)

## Putting It All Together

A Call by itself is just a simple instruction. Its real power comes from how it connects with other parts of the system that manage how it runs. These connections are turned on by special instructions in the Tool's blueprint (these instructions start with an `_`). This allows a single Call to trigger all sorts of interesting behaviors.

By giving these special `_` instructions clear meanings, we let the AI (the LLM) become a creative planner. It can think about all the different ways to combine these instructions to build complex plans, almost like a chef deciding not just which ingredients to use, but how to prep and cook them together in a new way.

> [!TIP]
> The next part explains how a Call connects to other ideas we'll talk about later. You don't need to click the links and read ahead now; we'll get to everything in order. You can always come back here later.

- **Running Real Code (`_activity`)**: The most basic special instruction is connecting a Call to a reliable piece of code. The `_activity` instruction tells the system, "Don't just think about this; run this specific program to get the answer."

  > Sidenote:
  > - [003: Agent/Activity](./003_agent_activity.md).

- **Giving the Job to Someone Else (`_delegate`)**: A Call can pass its job to an external helper, called a Delegate. The `_delegate` instruction usually points to a saved set of instructions, letting you reuse a complex task like it's a simple tool. This is like giving a task to a specialist in a separate, clean workshop, so they don't get distracted by what you're doing.

  > Sidenote:
  > - [012: Agent/Delegate](./012_agent_delegate.md).

- **Focusing Attention (`_scopes`)**: The Scopes system controls what information a Call can see. It's like giving the AI blinders so it can only focus on the important details for the task. This prevents it from getting confused by other information and helps it produce more reliable results. When used with a Delegate, this is even more powerful: it defines the *only* information the specialist in their clean workshop is allowed to see.

  > Sidenote:
  > - [013: Agent/Scopes](./013_agent_scopes.md).

- **Saving the Result (`_outputPath`)**: A Call can be told where to save its result. The `_outputPath` instruction is like telling it, "When you're done, put the answer in this specific file folder." This allows you to build assembly lines where the output of one step becomes the input for the next.

  > Sidenote:
  > - [009: Agent/State](./009_agent_state.md).

- **Working on a Specific Item (`_instance`)**: When you have a list of many similar things to process, a Call can be told to focus on just one of them. The `_instance` instruction is like an item's serial number, telling the Call to do all its work (like reading information and saving results) on that single item. This lets you process many items at the same time, each with its own focused helper.
  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md).

## Different Ways to Run Calls

When an AI creates several Calls at once, you can choose how to run them:

```typescript
// Run just one Call
const result = await Tool(call);

// Run all Calls and wait for them all to finish
const results = await Tool.all(calls);

// Run all Calls and stop as soon as one succeeds
const result = await Tool.any(calls);

// Run all Calls and stop as soon as the first one finishes (whether it succeeded or failed)
const result = await Tool.race(calls);
```

These choices let you:

- **Control Every Step**: Handle Calls one by one, with your own logic in between.
- **Work in Batches**: Run many independent Calls at the same time for speed.
- **Find the Quickest Answer**: Stop a search as soon as you get a good result (`.any()`) or any result at all (`.race()`).
- **Succeed or Fail Together**: Make sure a group of related Calls all finish successfully (`.all()`), which is important when they depend on each other.

## Chaining Calls Together

While these patterns help run a single batch of Calls, sometimes you need to do things in multiple steps, where the result of one Call is needed to start the next. This is handled by a bigger system that manages the back-and-forth between making `Requests` and running `Calls`.

The next document, :term[005: Agent/Loop]{href="./005_agent_loop.md"}, explains how this continuous cycle works.
