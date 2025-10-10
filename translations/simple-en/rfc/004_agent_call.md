# 004: Agent/Call

> **Call:** Think of a `Tool` as a recipe. A **Call** is when you actually decide to bake the cake, picking the ingredients and starting the oven. It's the specific command to *do something now*.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Needs to know about:
>   - [103: Concept/Ideator](./103_concept_ideator.md)
> - Helps create:
>   - [008: Agent/Imports](./008_agent_imports.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)
>   - [202: Idea/Vessel](./202_idea_vessel.md)
>   - [203: Idea/Process](./203_idea_process.md)

We've learned that an [Idea](./101_concept_idea.md) is like a smart blueprint full of information, and a [Tool](./002_agent_tool.md) is like a button on an interface that tells an AI what it can do. This document explains the **Call**, which is what happens when the AI actually presses that button.

A **Call** is the moment a `Tool` is set up with specific instructions and is ready to go. If a `Tool` is the *idea* of what can be done, a `Call` is the action of *how it gets done right now*.

## From Idea to Action

Imagine you have a recipe for a pizza. Here’s how it becomes a real pizza:

1.  **Idea**: The recipe itself. It has all the information: ingredients, instructions, and so on.
2.  **Tool**: The recipe is turned into a "Make Pizza" button in a smart oven's menu. The oven now knows what ingredients it needs (like dough, sauce, cheese) and what it can do.
3.  **Call**: You press the "Make Pizza" button and choose your toppings: "pepperoni" and "extra cheese." This specific, ready-to-go order is the **Call**.

The main rule is: **any Idea can become a Tool, and any Tool can be used in a Call.**

(If you want to know exactly how the Idea's shopping list becomes the Tool's set of options, check out **[007: Agent/Input](./007_agent_input.md)**.)

## The Controls: Where and How to Run

When a `Call` is made, it answers two big questions: **Where** should it run? And **How** should it run? These are controlled by a couple of special settings in the tool's design.

### The Two Big Questions for Getting Things Done

1.  **Scope (Where it runs: In your kitchen vs. at a restaurant)**
    This decides if the task is handled right here or sent somewhere else.
    - **Inline Scope**: This is the default. It's like baking the pizza in your own kitchen. The work happens right where you are.
    - **Module Scope**: This is like ordering a pizza from a restaurant. The request is sent to an outside expert to handle it for you.

2.  **Method (How it runs: Following a recipe vs. asking a chef for a surprise)**
    This decides if the result comes from exact code or from a creative AI.
    - **Explicit Method**: This is like an oven following a recipe step-by-step. The result is predictable and based on precise instructions.
    - **Latent Method**: This is the default. It's like asking a chef to "make me a delicious pizza." The AI uses its own creativity and knowledge to generate the result.

These controls can be mixed and matched to create all sorts of ways to get things done. You can learn more about how they work together in **[008: Agent/Imports](./008_agent_imports.md)**.

## Building Bigger Plans

The `Call` is like a single LEGO brick. By itself, it's a small action. But when you put lots of them together, you can build amazing things.

`Calls` are the foundation for more advanced plans, like a **[Vessel](./202_idea_vessel.md)**, which is like a single, complete conversation with the AI, or a **[Process](./203_idea_process.md)**, which is a multi-step project. For example, a `Vessel` holds everything about one request: what you asked for, all the tools the AI could use, and the final answer, which is a list of `Calls` the AI decided to make.

> Sidenote:
>
> - [202: Idea/Vessel](./202_idea_vessel.md)
> - [203: Idea/Process](./203_idea_process.md)

## Ways to Handle Multiple Calls

What if the AI decides to make several `Calls` at once, like a to-do list? You can decide how to handle them.

```typescript
// Do just one Call
const result = await Tool(call);

// Do all the Calls and wait for them all to finish
const results = await Tool.all(calls);

// Do all the Calls and stop as soon as one succeeds
const result = await Tool.any(calls);

// Start all the Calls, but only pay attention to the very first one that finishes (win or lose)
const result = await Tool.race(calls);
```

These patterns let you do cool things:

- **One by One**: Handle each `Call` individually, maybe doing something in between.
- **All Together**: Run a bunch of independent `Calls` at the same time to go faster.
- **First One Wins**: Try several things at once and move on as soon as one of them works (`.any()`).
- **Quickest One Matters**: Start a race between tasks and only care about the first one to cross the finish line (`.race()`).
- **All or Nothing**: Make sure a whole group of `Calls` succeeds together. If one fails, none of them count.