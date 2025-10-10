# 004: Agent/Invocation

> **Invocation:** This is like taking a ready-made “Tool” and giving it a specific job with exact instructions. It’s the command that says, *“Go do this exact thing, right now!”*
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [103: Concept/Ideator](./103_concept_ideator.md)
> - Unlocks:
>   - [008: Agent/Imports](./008_agent_imports.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)
>   - [202: Idea/Vessel](./202_idea_vessel.md)
>   - [203: Idea/Process](./203_idea_process.md)

We’ve learned that an “Idea” is like a powerful memory, and a “Tool” is like a recipe an AI can follow. This document explains the next step: **Invocation**. This is the moment the cooking actually starts!

An **Invocation** is a Tool that’s been given a specific job to do. If a Tool is a recipe, an Invocation is the act of actually cooking the meal with real ingredients.

## The Path from Idea to Invocation

Imagine you want to make a sandwich.

1.  **Idea**: A simple thought, like, “Make a sandwich.”
2.  **Tool**: The idea becomes a recipe card that an AI can read. The card says you need ingredients (`parameters`) like `bread`, `meat`, and `cheese`. (You can read more about this in [002: Agent/Tool](./002_agent_tool.md)).
3.  **Invocation**: This is the moment the AI picks out *specific* ingredients from the fridge and follows the recipe. For example: use `two slices of sourdough bread`, `three slices of turkey`, and `one slice of swiss cheese`. An **Invocation** is a one-time use of a Tool with all the details filled in.

The main rule is: **Any Idea can become a Tool, which can be used by an Invocation.**

To learn more about how an “Idea” turns into a “Tool,” check out **[007: Agent/Input](./007_agent_input.md)**.

## Controlling How Things Get Done: Scope and Method

When we tell the AI to do something, we can control *where* and *how* it does the job. Think of them as two switches: **Scope** (where it works) and **Method** (how it works).

### The Two Switches of Action

1.  **Scope (Do it Here vs. Do it Somewhere Else)**
    This switch decides if the AI will do the job itself or pass it to a helper.

    -   **Here (Inline Scope)**: This is the default. The AI does the job right away, like doing your homework at your own desk.
    -   **Somewhere Else (Module Scope)**: You flip this switch by adding a `_module` tag. The AI sends the job to another program to handle, like asking a friend to help with a tricky math problem.

2.  **Method (Follow Instructions vs. Be Creative)**
    This switch decides if the AI should follow exact steps or come up with its own solution.

    -   **Follow Instructions (Explicit Method)**: You flip this switch by adding an `_activity` tag. This tells the AI to follow pre-written code, like building a LEGO set using the instruction manual.
    -   **Be Creative (Latent Method)**: This is the default. The AI has to figure out how to get the result on its own. This is like being given a box of LEGOs and told, “Build a cool car!” It needs a hint about what to build, which is provided by an `_output` tag.

You can mix and match these switches to get the AI to handle tasks in many different ways. You can also control what information it has access to, which is explained in **[008: Agent/Imports](./008_agent_imports.md)**.

## Building Big Plans from Small Steps

An `Invocation` is like a single LEGO brick. On its own, it’s just one small action. But you can snap many Invocations together to build big, complex plans, just like building a spaceship out of LEGOs.

This is how an AI creates bigger ideas like a **[202: Idea/Vessel](./202_idea_vessel.md)** or a **[203: Idea/Process](./203_idea_process.md)**. A `Vessel`, for example, is like a snapshot of the AI's thinking. It holds the problem it was given, all the `Tools` it can use, and its final `decision`—which is usually a list of `Invocations` ready to go.

> Sidenote:
>
> - [202: Idea/Vessel](./202_idea_vessel.md)
> - [203: Idea/Process](./203_idea_process.md)

## Different Ways to Run Your To-Do List

When an AI has a list of Invocations (like a to-do list), it can run them in a few different ways.

```typescript
// Do one thing
const result = await Tool(call);

// Do all the things and wait for every single one to finish
const results = await Tool.all(calls);

// Try doing things one by one, but stop as soon as one is done successfully
const result = await Tool.any(calls);

// Start doing everything at the same time and see which one finishes first (doesn't matter if it succeeds or fails)
const result = await Tool.race(calls);
```

Here’s what these mean:

-   **One at a time**: `Tool(call)` is like doing the first chore on your list.
-   **All at once**: `Tool.all(calls)` is like doing every single chore on your list and not stopping until they are all done. Great for when tasks depend on each other.
-   **First one that works**: `Tool.any(calls)` is like having three different ways to clean your room. You try them all, and as soon as one works, you can stop.
-   **A race to the finish**: `Tool.race(calls)` is like starting all your chores at the same time. The first one to get finished—whether it succeeded or not—gets all the attention.