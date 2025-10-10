# 004: Agent/Call

> **Call:** Imagine a **Tool** is a button in an app, like one that says “Send Email.” A **Call** is what happens when you actually press that button after you’ve typed in the email address and your message. It’s the specific command to *do the thing now*.
> 
> — [Glossary](./000_glossary.md)

> Sidenote:
> 
> - Needs to know about:
>   - [103: Concept/Ideator](./103_concept_ideator.md)
> - Helps make these possible:
>   - [008: Agent/Imports](./008_agent_imports.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)
>   - [202: Idea/Vessel](./202_idea_vessel.md)
>   - [203: Idea/Process](./203_idea_process.md)

We already know about an **[Idea](./101_concept_idea.md)**, which is like a full recipe for something, and a **[Tool](./002_agent_tool.md)**, which is like turning that recipe into a button that an AI can use. This document explains the **Call**, which is what happens when the AI actually presses that button to do a job.

A **Call** is like taking a recipe (the Tool) and adding the real ingredients (the specific details). If a Tool says, “I can draw a cat,” a Call says, “Draw a cat *right now*, make it fluffy, and color it orange.”

## From a Recipe to a Real Thing

Imagine you want to bake a birthday cake. Here’s how it works from start to finish:

1.  **Idea**: This is your complete recipe for the cake. It lists the ingredients, has all the steps, and even a picture of what the final cake should look like.
2.  **Tool**: Your smart robot baker reads the recipe and creates a “Bake Cake” program. Now it understands what “baking a cake” means and knows it will need things like flour, sugar, and eggs.
3.  **Call**: The AI decides it's party time. It picks the “Bake Cake” program and gives it the exact details: “Use chocolate flour, 1 cup of sugar, and 3 eggs.” This specific order to bake the cake *right now with these details* is the **Call**.

The main rule is super simple: **Any Idea can become a Tool, and any Tool can be used in a Call.**

To learn exactly how a recipe's ingredient list becomes the set of options for a Tool, check out **[007: Agent/Input](./007_agent_input.md)**.

## The Controls: Where and How to Do the Job

When you tell the AI to do something (a Call), you can control two main things: the **Scope** (where it does it) and the **Method** (how it does it). The system figures out what you want by looking for special notes in the Tool’s instructions (like `_module` or `_activity`).

### The Two Levers of Control

1.  **Scope (Where it runs: In this kitchen or another one?)**
    This decides if the job happens right here or gets sent somewhere else to be finished.
    - **Inline Scope**: This is the normal way. It’s like baking the cake in your own kitchen. The AI takes care of the job right where it is.
    - **Module Scope**: This is like sending your order to a special bakery down the street. A little note called `_module` tells the AI, “Don’t do this yourself, hand this job off to an expert system that specializes in this.”

2.  **Method (How it's done: Follow instructions exactly or get creative?)**
    This decides if the job is done by following a list of steps perfectly or by using the AI’s own smarts.
    - **Explicit Method**: This is like having a robot follow the recipe exactly. When the instructions have a note called `_activity`, it means the job will be done with code that doesn’t change. You’ll get the same result every single time.
    - **Latent Method**: This is like asking a creative chef to bake you a cake. You don’t give them step-by-step instructions; you trust them to use their own skills and imagination (the AI’s brain) to make something awesome. This happens when there is no `_activity` note.

These two controls, “where” and “how,” can be mixed together to create all kinds of powerful actions. To see how that works, check out **[008: Agent/Imports](./008_agent_imports.md)**.

## Building Bigger Things

A Call is the most basic building block, like a single Lego brick. By snapping many Calls together, we can build much bigger and cooler things.

For example, a **[Vessel](./202_idea_vessel.md)** is a bigger idea that’s like a whole conversation with the AI. It holds your original request, all the different tools the AI can use to help, and the AI's final plan. That plan is usually just a list of one or more **Calls** to be done in order.

> Sidenote:
> 
> - [202: Idea/Vessel](./202_idea_vessel.md)
> - [203: Idea/Process](./203_idea_process.md)

## Ways to Run Calls

What if the AI needs to make a few Calls all at once? You can tell it how to handle them.

```typescript
// Do one job and wait for it to finish.
const result = await Tool(call);

// Start all jobs, and wait for all of them to finish.
const results = await Tool.all(calls);

// Start all jobs, but stop as soon as one of them succeeds.
const result = await Tool.any(calls);

// Start all jobs, and stop as soon as the first one finishes, whether it worked or failed. Like a race!
const result = await Tool.race(calls);
```

These patterns let you do some really neat things:

- **One by One**: Do one task at a time, nice and simple.
- **All at Once**: Send out a bunch of different jobs to be done at the same time to save time.
- **First One Wins**: Try a few different ways to get something done, and just use the first one that works (`.any()`).
- **Race to the Finish**: Start a few jobs and see which one finishes first, no matter if it succeeded or failed (`.race()`).
- **All or Nothing**: Make sure a whole group of jobs succeeds together. If even one of them fails, it's like none of them happened (`.all()`).