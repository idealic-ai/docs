# 004: Agent/Call

> **Call:** A specific, ready-to-run version of a `Tool`, with all the blanks filled in. It’s a request focused on what _should be done_.
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

We've learned that an [Idea](./101_concept_idea.md) is like a blueprint for knowledge, and a [Tool](./002_agent_tool.md) is like turning that blueprint into a set of instructions an AI can understand. This document explains the next step: the **Call**, which is how the AI actually *uses* those instructions.

A **Call** is what you get when you take a Tool and fill in all the specific details it needs to run. If a Tool describes _what can be done_ (like a recipe for a cake), a Call is the decision to bake that cake *right now* with specific ingredients (like 2 cups of flour and 3 eggs).

## The Journey from Idea to Call

Here’s how it works, step-by-step:

1.  **Idea**: It all starts with an Idea, which is a self-contained blueprint for a piece of knowledge or a process.
2.  **Tool**: The `Idea` is turned into a `Tool`. This is like converting the blueprint into a simple, standardized instruction manual that any agent can read. (You can read more about this in [002: Agent/Tool](./002_agent_tool.md)).
3.  **Call**: When an AI (like an LLM) decides to use a `Tool`, it fills in the blanks with actual values, creating a **Call**. A `Call` is a single, ready-to-go command to use the `Tool`.

The main rule is: **Any Idea can be turned into a Tool, which can then be run as a Call.**

To see exactly how an `Idea`'s input list becomes a `Tool`'s instruction list, check out **[007: Agent/Input](./007_agent_input.md)**.

## How to Run a Call: Scope and Method

When you run a `Call`, you have to decide two things: **Scope** (where it runs) and **Method** (how it runs). Think of these as two separate dials you can turn to control the action.

### The Two Dials of Execution

1.  **Scope (Do it Here vs. Do it Over There)**
    Scope decides if the task is handled right here, inside the current agent, or if it's handed off to a separate, specialized helper.
    -   **Inline Scope**: This is the default. The agent handles the `Call` itself. It’s like cooking in your own kitchen.
    -   **Modular Scope**: If you set the `_module` property, the `Call` gets sent to an outside helper to be completed. It's like ordering a specific dish from another restaurant because they are experts at making it.

2.  **Method (By the Book vs. Creative Touch)**
    Method decides if the result comes from predictable code or from the AI's creative thinking.
    -   **Explicit Method**: If the `_activity` property is set, the `Call` is handled by exact, predictable code. Following a recipe perfectly will give you the same cake every time.
    -   **Latent Method**: This is the default if `_activity` isn't there. The AI uses its own intelligence to figure out the result, like a chef adding spices 