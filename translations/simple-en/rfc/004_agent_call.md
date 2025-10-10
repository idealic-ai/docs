# 004: Agent/Call

> **Call:** Think of a `Tool` like a magic spell, and a `Call` is when you actually say the magic words with a specific target. It's the real, ready-to-go command to make something happen. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires: [103: Concept/Ideator](./103_concept_ideator.md)
> - Enables: [008: Agent/Imports](./008_agent_imports.md), [011: Agent/Instancing](./011_agent_instancing.md)

The [101: Concept/Idea](./101_concept_idea.md) document explained how an `Idea` is like a complete thought or piece of knowledge packaged up neatly. The [002: Agent/Tool](./002_agent_tool.md) document showed how we can turn those ideas into `Tools` that an AI Agent can understand and use. This document explains the **Call Protocol**, which is the set of rules for how the Agent actually *uses* those tools.

A **Call** is like taking a `Tool` and filling in all the blanks so it's ready to go. If a `Tool` is a recipe, a `Call` is the act of following that recipe with specific ingredients to bake a cake right now.

## The Idea-to-Call Pipeline

Here’s how a thought becomes an action:

1.  **Idea**: This is the starting point. It's a complete package of knowledge, like a blueprint for a car. It focuses on what the final thing looks like.
2.  **Tool**: We take the `Idea` (the blueprint) and flip it around to create instructions on *how to build* the car. It becomes a `Tool` in the Agent's toolbox, listing all the parts you'll need (the parameters).
3.  **Call**: The AI decides to use the "Build a Car" `Tool`. It picks out specific parts—red paint, four-cylinder engine, leather seats—and fills in the instructions. This specific, ready-to-execute command is a **Call**.

The main rule is simple: **any Idea can be turned into a Tool, which can then be used by making a Call.**

To learn more about how an `Idea`'s blueprint gets turned into a `Tool`'s instruction list, check out **[007: Agent/Input](./007_agent_input.md)**.

## The Controls of Execution: Scope and Method

When you make a `Call`, you can decide *where* it happens and *how* it happens. Think of these as two different dials you can turn.

### The Two Dials for Running a Call

1.  **Scope (Where it runs: Here vs. Elsewhere)**
    The scope dial decides if the job gets done in the main workshop or if you send it out to a specialist.
    -   **Inline Scope**: This is the normal way. The Agent does the work right then and there. It's like building a Lego piece and immediately adding it to your main creation.
    -   **Module Scope**: This is like sending a part out to be built by someone else. You give them instructions (using a special note called `_module`), they build it in their own workshop, and then they send it back to you.

2.  **Method (How it runs: By the Book vs. With Creativity)**
    The method dial decides if the work follows exact instructions or if it involves some creative thinking.
    -   **Explicit Method**: This is like following a 'paint-by-numbers' kit. The instructions (`_activity`) are super specific, and the result is always the same. This is for tasks that need to be perfect and predictable, like math.
    -   **Latent Method**: This is like asking an artist to draw you a picture of a cat. You give them a general idea (using a guide called `_output`), but the artist (the AI) uses its own creativity to make the final drawing. This is the default way things get done when there are no exact instructions.

These two dials can be set in different combinations to get different results. You can learn more about how they work together in **[008: Agent/Imports](./008_agent_imports.md)**.

## Idea, Tool, and Call: Different Points of View

Let's use an analogy to see how these three things are different:

-   An **Idea** is like **a photograph of a finished meal**. It focuses on the result—what the meal looks like when it's all done. It's a record of something that was made or could be made.

-   A **Tool** is like **a blank recipe card**. It focuses on the ingredients and steps you need. It's a template for an action, waiting for someone to fill in the blanks.

-   A **Call** is like **the recipe card after you've filled it out** with specific ingredients (e.g., "2 cups of King Arthur flour") and handed it to the chef. It's a direct command to *do something now*.

## The Vessel Idea: The AI's Mission Briefing

When an AI Agent needs to decide what to do next, we give it a special kind of `Idea` called a **Vessel Idea**. Think of it as a mission briefing folder.

This folder contains everything the AI needs to make a good choice:

1.  **The Context**: This is all the background information, like secret files for a spy. It includes the user's request, things the AI remembers, and what's happening around it.
2.  **The Schema (The "Vessel")**: This is the list of approved gadgets and skills the spy is allowed to use on this mission. It's the set of `Tools` available for this specific situation.

The AI reads the entire mission briefing—the background info and the list of available tools—and its final decision is its `solution`: a list of one or more `Calls` to carry out the mission.

This lets us package a complex, multi-step plan into a single, neat `Idea`.

## Call Execution Patterns

When the AI's plan involves making multiple `Calls`, we can run them in different ways, just like a movie director giving commands to a film crew.

```typescript
// Give one command and wait for it to finish.
const result = await Tool(call);

// Tell everyone to do their jobs and wait for them all to finish.
const results = await Tool.all(calls);

// Ask several people to do the same task, and use the result from the first person who succeeds.
const result = await Tool.any(calls);

// Ask several people to do a task, and take the answer from whoever gets back to you first, successful or not.
const result = await Tool.race(calls);
```

These different patterns let us:

-   **Control Every Step**: Handle one command at a time, so you can do other things in between.
-   **Work in Parallel**: Run a bunch of independent jobs at the same time to go faster.
-   **Find Success Quickly**: Stop as soon as one of your attempts works (`.any()`).
-   **Get a Fast Answer**: Stop as soon as you get any response, good or bad (`.race()`).
-   **Do It All or Nothing**: Make sure a whole group of commands succeeds together, so things don't get left half-done.