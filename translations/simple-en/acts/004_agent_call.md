# 004: Agent/Call

> [!DEFINITION] [Call](./000_glossary.md)
> A :term[Call]{canonical="Call"} is a ready-to-go action. Think of a :term[Tool]{canonical="Tool"} as a recipe. A :term[Call]{canonical="Call"} is when you actually use that recipe with specific ingredients to cook something. It’s an instruction for what *should be done right now*.

> Sidenote:
> - Needs:
>   - [002: Agent/Tool](./002_agent_tool.md)
> - Makes Possible:
>   - [103: Concept/Ideator](./103_concept_ideator.md)
>   - [013: Agent/Scopes](./013_agent_scopes.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)
>   - [202: Idea/Vessel](./202_idea_vessel.md)
>   - [203: Idea/Process](./203_idea_process.md)
> - Is Extended By:
>   - [012: Agent/Delegate](./012_agent_delegate.md)

The :term[Tool]{canonical="Tool"} protocol sets up the basic menu of what an AI agent can do. This document explains the **:term[Call]{canonical="Call"}** protocol, which is all about how the agent actually *does* those things.

A :term[Call]{canonical="Call"} is a specific action, based on a :term[Tool]{canonical="Tool"}, that is filled out and ready to go. While :term[Tools]{canonical="Tool"} tell you *what's possible*, :term[Calls]{canonical="Call"} are the commands that say *how to do it now*.

> [!HEADSUP] Heads up
> When an agent gets a :term[Request]{href="./001_agent_request.md"} and decides on a set of actions (:term[Calls]{canonical="Call"}), that whole decision package is called a :term[Vessel]{href="./202_idea_vessel.md"}. A :term[Vessel]{canonical="Vessel"} is like a snapshot of the agent's plan at a single moment, choosing from its available :term[Tools]{canonical="Tool"} to figure out what to do next.
>
> > Sidenote:
> >
> > - [001: Agent/Request](./001_agent_request.md)
> > - [202: Idea/Vessel](./202_idea_vessel.md)

## Combining Calls with Context

A :term[Call]{canonical="Call"} on its own is just a simple instruction. Its real power comes from combining it with other rules that control how and where it runs. These rules are activated by special instructions (they start with an `_` symbol) inside a :term[Tool]{canonical="Tool"}'s design. This lets a single :term[Call]{canonical="Call"} command trigger all sorts of interesting behaviors.

By giving these special instructions clear meanings, we let the AI (LLM) become a smart planner. It can think about how to mix and match these instructions to build clever and complex chains of actions. It's not just picking a tool from a list; it's building a custom workflow on the fly.

> [!TIP]
> The next few points explain how this connects to other parts of the system. You don't need to jump ahead and read about them now; we'll get to them in order. You can always come back here later.

- **Doing Real Work (`_activity`)**: The most basic upgrade is connecting a :term[Call]{canonical="Call"} to a piece of computer code that performs a specific task. The `_activity` instruction tells the system that this :term[Call]{canonical="Call"} should be handled by a real program (:term[Activity]{canonical="Activity"}), not just thought about by the AI.

  > Sidenote:
  > - [003: Agent/Activity](./003_agent_activity.md).

- **Passing the Job to Someone Else (`_delegate`)**: A :term[Call]{canonical="Call"} can hand off its job to another, separate agent (:term[Delegate]{canonical="Delegate"}). The `_delegate` instruction usually points to a saved :term[Request]{canonical="Request"}, turning that request into a reusable tool. This gives the task its own clean workspace, so it doesn't get confused by other things happening at the same time.

  > Sidenote:
  > - [012: Agent/Delegate](./012_agent_delegate.md).

- **Focusing Attention (`_scopes`)**: The :term[Scopes]{canonical="Scope"} protocol is like putting blinders on the AI to help it focus. It tells a :term[Call]{canonical="Call"} exactly what information it's allowed to see. This prevents the AI from getting distracted by too much information and helps it give more reliable answers. When used with `_delegate`, it's even more powerful: it creates a completely sealed-off environment for the delegated task, defining *everything* it's allowed to know.

  > Sidenote:
  > - [013: Agent/Scopes](./013_agent_scopes.md).

- **Saving the Result (`_outputPath`)**: You can make a :term[Call]{canonical="Call"} save its work. The `_outputPath` instruction tells the :term[Call]{canonical="Call"} where to put its result in a shared memory space called the :term[State]{canonical="State"}. This allows you to build step-by-step processes where the result of one action becomes the starting point for the next.

  > Sidenote:
  > - [009: Agent/State](./009_agent_state.md).

- **Working on a Specific Item (`_instance`)**: When you have a list of things to process, a :term[Call]{canonical="Call"} can be told to work on just one specific item (:term[Instance]{canonical="Instance"}). The `_instance` instruction acts like a label, telling the :term[Call]{canonical="Call"} which item to read from and write to in the shared :term[State]{canonical="State"}. This is great for doing the same job on many different items at the same time.
  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md).

## Different Ways to Run Calls

When an agent creates a list of :term[Calls]{canonical="Call"} to run, you can choose how to execute them:

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

These different ways of running things allow for:

- **Step-by-Step Control**: Handle :term[Calls]{canonical="Call"} one by one, with your own logic in between.
- **Doing Things in Parallel**: Run a bunch of independent :term[Calls]{canonical="Call"} at the same time to go faster.
- **Quick-Exit Plans**: Stop as soon as you get what you need (`.any()`) or as soon as something finishes (`.race()`).
- **All-or-Nothing Jobs**: Make sure a whole group of :term[Calls]{canonical="Call"} succeeds together (`.all()`), which is important when they depend on each other.

## Chaining Calls Together in a Loop

These patterns are great for managing a single batch of :term[Calls]{canonical="Call"}, but agents often need to do tasks that have multiple steps, where the result of one action is needed for the next. This is handled by a bigger system that manages the flow of `Requests` and :term[Calls]{canonical="Call"} in a sequence.

The next document, :term[005: Agent/Loop]{href="./005_agent_loop.md"}, explains how this bigger process works.