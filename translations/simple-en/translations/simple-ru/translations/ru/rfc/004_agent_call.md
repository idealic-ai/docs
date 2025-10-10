# 004: Agent/Invocation

> **Invocation:** This is like a specific, ready-to-go command. You take a "Tool" and fill in all the blanks to say *exactly what needs to be done*.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Needed for this:
>   - [103: Concept/Ideator](./103_concept_ideator.md)
> - Opens the way for:
>   - [008: Agent/Imports](./008_agent_imports.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)
>   - [202: Idea/Vessel](./202_idea_vessel.md)
>   - [203: Idea/Process](./203_idea_process.md)

Imagine you have a general **Idea** — that's like a recipe in a cookbook. Then, you create a **Tool** — that's like a blank recipe card for that recipe, with empty fields for things like "flour," "sugar," and "oven temperature." This document is about the **Invocation** — that's when you take the blank card and fill it in with real values: "wheat flour," "100 grams of sugar," "350 degrees." Now it's not just a template, it's an actual instruction that's ready to be used.

An **Invocation** is a fully filled-in recipe card (a Tool) that's ready to be sent to the kitchen. If Tools tell us *what can be done* (like "bake a cake"), Invocations tell us *exactly how it will be done*.

## The Path from Idea to Invocation

1.  **Idea**: This is the big-picture concept, like, "bake something sweet."
2.  **Tool**: The Idea is turned into a template that looks like a form. For example, a "Cupcake Recipe" with empty fields for the ingredients.
3.  **Invocation**: The AI decides to bake a cupcake, fills in the fields ("flour, 3 eggs, chocolate chips"), and creates an **Invocation**. This Invocation is one specific, ready-to-bake recipe.

The main point is simple: **any Idea can be turned into a Tool, and any Tool can be run as an Invocation.**

## How to Control the Job: Where and How

When we "send the recipe to the kitchen," we have two control knobs that decide exactly how it gets made: **Where** (where we cook it) and **How** (how we cook it).

### Two Knobs for Execution

1.  **Where (In Your Kitchen or at a Restaurant)**
    This setting decides if the job will be done right here or if we'll hand it off to someone else.
    -   **In Your Kitchen (In-Process)**: This is the normal mode. The job is done on the spot, in the current environment.
    -   **At a Restaurant (Out-of-Process)**: We pass our filled-in recipe (the Invocation) to another, separate "kitchen" that specializes in these kinds of jobs.

2.  **How (By the Book or With a Creative Touch)**
    This setting decides how the result is made: using exact code or with help from an AI.
    -   **By the Book (Explicit)**: The result is created by following clear, pre-written rules, like a robot chef following a recipe step-by-step. The result will always be exactly the same.
    -   **With a Creative Touch (Implicit)**: This is the default mode. We give the recipe to a master chef (the AI) and say, "Make it delicious." It follows the idea but can be creative. The result will be great, but it might be a little different each time.

You can mix and match these settings to create different ways to get jobs done.

## Creating Complex Processes

An **Invocation** is like a single LEGO brick. By itself, it's simple, but you can use lots of them to build huge, complex things like castles or spaceships.

In the same way, Invocations are the building blocks for bigger Ideas, like a **Vessel** or a **Process**. Imagine a **Vessel** is a "mission" for an AI. You give it a description of a situation, a set of tools it can use, and say, "Figure out what to do." The AI's answer is a list of **Invocations** — a specific plan of action that needs to be carried out.

> Sidenote:
>
> - [202: Idea/Vessel](./202_idea_vessel.md)
> - [203: Idea/Process](./203_idea_process.md)

## Ways to Run Invocations

When an AI creates several Invocations at once (like a to-do list), we can choose to run them in different ways.

```typescript
// Do one single thing
const result = await Tool(call);

// Do all the things at once and wait for them all to finish
const results = await Tool.all(calls);

// Start doing all the things, but stop as soon as the first one is successful
const result = await Tool.any(calls);

// Start a race: begin all the things and take the result of the fastest one, whether it succeeded or not
const result = await Tool.race(calls);
```

These methods help us:

-   **Have precise control**: Do tasks one by one and check the result of each one.
-   **Work together**: Run many separate tasks at the same time to save time.
-   **Find quick solutions**: Stop as soon as the first successful answer is found (`.any()`).
-   **Use an "all-or-nothing" approach**: Make sure an entire group of tasks succeeds (`.all()`), which is important when they depend on each other.