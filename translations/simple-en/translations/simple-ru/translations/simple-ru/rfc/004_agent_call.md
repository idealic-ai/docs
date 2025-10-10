# 004: Agent/Invocation

> **Invocation:** Imagine you have a magic wand (a “Tool”). An “Invocation” is when you wave the wand and say a spell with specific details. It's the command that says, *“Do this exact thing right now!”*
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [103: Concept/Ideator](./103_concept_ideator.md)
> - Enables:
>   - [008: Agent/Imports](./008_agent_imports.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)
>   - [202: Idea/Vessel](./202_idea_vessel.md)
>   - [203: Idea/Process](./203_idea_process.md)

In [101: Concept/Idea](./101_concept_idea.md), we learned that an “Idea” is like a little treasure chest of knowledge. And in [002: Agent/Tool](./002_agent_tool.md), we found out that a computer has “Tools”—which are like instruction manuals that explain what it knows how to do. This document explains **004: Agent/Invocation**, which takes those Tools and puts them to work using two main switches: “Scope” (where to do it?) and “Method” (how to do it?).

An **Invocation** is basically a Tool that’s been given a specific job. If a Tool is a recipe, an Invocation is the act of actually cooking the dish with specific ingredients.

## The Journey from Idea to Invocation

Let’s imagine you want to make a sandwich.

1.  **Idea**: You have a general thought: “I want a sandwich.” This is just the knowledge that sandwiches exist.
2.  **Tool**: Your “Idea” gets turned into a recipe the computer can understand. The recipe lists the “ingredients” (`parameters`) it needs. For example: `bread`, `filling`, and `cheese`. (You can learn more about this in [002: Agent/Tool](./002_agent_tool.md)).
3.  **Invocation**: Now for the fun part! An Artificial Intelligence (AI) decides to use your recipe. It picks out specific ingredients: `two slices of white bread`, `three slices of ham`, and `one slice of cheese`. The **Invocation** is this exact moment when you take the recipe and the real ingredients and start cooking.

The main rule is: **Any Idea can be turned into a Tool, and any Tool can be used with an Invocation.**

To learn how Ideas get ready to be used, check out **[007: Agent/Input](./007_agent_input.md)**.

## How to Control the Job: Scope and Method

To decide exactly how our `Invocation` will work, we have two “switches”: **Scope** (where it works) and **Method** (how it works). You can control them using special commands like `_module`, `_activity`, and `_output`.

### Two Ways to steer

1.  **Scope (Do it yourself, or ask a friend?)**
    The Scope decides where the task gets done: right here and now, or somewhere else.
    - **Do it yourself (Inline Scope)**: This is the normal way. The job is done immediately, right on the spot. It's like you making the sandwich yourself in your own kitchen.
    - **Ask a friend (Module Scope)**: This is turned on with the `_module` command. The job is handed off to someone or something else. It's like ordering a pizza: you place the order (the `Invocation`), but a different kitchen (another module or Idea) is the one that actually makes it.

2.  **Method (By the recipe, or like an artist?)**
    The Method decides how the result is created: by following strict instructions or by being creative.
    - **By the recipe (Explicit Method)**: This is turned on with the `_activity` command. The result is created by following code precisely, step-by-step. You'll always get the same thing, just like cooking from your grandma's recipe.
    - **Like an artist (Latent Method)**: This is the normal way if you don't use the `_activity` command. The AI comes up with the result itself. It's like telling a chef, “Surprise me!” and they create something new based on what they know you like (`_output`).

You can mix and match these switches to create all sorts of ways for tasks to get done. And to decide what knowledge can be used while doing the task, there are imports. You can read about them in **[008: Agent/Imports](./008_agent_imports.md)**.

## Building Big Things from Small Pieces

An `Invocation` is like a single LEGO brick. By itself, it’s simple, but with lots of bricks, you can build a giant castle. It's `Invocations` that run big, complex “Ideas” like **[202: Idea/Vessel](./202_idea_vessel.md)** and **[203: Idea/Process](./203_idea_process.md)**. A `Vessel`, for example, is like a LEGO box. It has everything inside: the instruction manual with a list of parts (`Tools`), the parts themselves (`context`), and the decision of which bricks (`Invocations`) to use for the build.

> Sidenote:
>
> - [202: Idea/Vessel](./202_idea_vessel.md)
> - [203: Idea/Process](./203_idea_process.md)

## How to Run Invocations

When an agent has several jobs (Invocations) to do, it can handle them in different ways. Think of it like your to-do list for the evening.

```typescript
// Do one single thing from the list
const result = await Tool(call);

// Do everything on the list and wait for each one to be finished
const results = await Tool.all(calls);

// Try doing things one by one and stop as soon as the first one succeeds
const result = await Tool.any(calls);

// Start everything at once and see which one finishes first (doesn't matter if it succeeded or failed)
const result = await Tool.race(calls);
```

These methods let you:

- **Be in full control**: Do tasks one at a time, in order.
- **Do everything at once**: If tasks don't depend on each other (like doing homework and washing the dishes), you can do them at the same time to be faster.
- **Find quick solutions**: If you asked three friends the same question to get an answer, you’d stop as soon as the first friend replies. That's what `.any()` does.
- **Succeed together or fail together**: If you need to follow every single step to build your LEGO castle, you'd use `.all()` to make sure every task is completed perfectly.