# 004: Agent/Invocation

> **Invocation:** It's like taking a 'Tool' and giving it a specific job to do, with all the exact details filled in. It’s the command that says, *“Do this exact thing, right now.”*
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Needs:
>   - [103: Concept/Ideator](./103_concept_ideator.md)
> - Helps make these possible:
>   - [008: Agent/Imports](./008_agent_imports.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)
>   - [202: Idea/Vessel](./202_idea_vessel.md)
>   - [203: Idea/Process](./203_idea_process.md)

The document [101: Concept/Idea](./101_concept_idea.md) described an 'Idea' as a smart container for knowledge. And [002: Agent/Tool](./002_agent_tool.md) explained how an AI agent can understand what it’s capable of doing using special blueprints called 'Tools'. This document, **004: Agent/Invocation**, builds on that by explaining how work actually gets done using two control knobs: 'Scope' and 'Method'.

An **Invocation** is basically a Tool that has been given its specific ingredients and told, "Go!" If Tools define *what can be done*, Invocations define *how it actually gets done*.

## The Journey from Idea to Invocation

Imagine you want to cook something.

1.  **Idea**: A general thought. For example, "Make a sandwich."
2.  **Tool**: The 'Idea' gets turned into a specific recipe that a computer can read. This recipe lists the 'ingredients' (`parameters`) it needs. For our sandwich, it needs `bread`, `meat`, and `cheese`. (You can read more about this in [002: Agent/Tool](./002_agent_tool.md)).
3.  **Invocation**: This is the moment the AI decides to actually use the 'Tool'. It takes the recipe and fills in the specific ingredients: `two slices of white bread`, `three slices of ham`, `one slice of cheddar`. The **Invocation** is a single, specific use of a Tool with all the details filled out.

The main rule is: **Any Idea can be turned into a Tool, which can then be used through an Invocation.**

To learn more about how an 'Idea' becomes a 'Tool', check out **[007: Agent/Input](./007_agent_input.md)**.

## Controlling How It Runs: Scope and Method

How an `Invocation` is carried out is decided by two separate settings: **Scope** (where it runs) and **Method** (how it runs). You set these using special properties (`_module`, `_activity`, `_output`) in the tool's description.

### The Two Choices for Getting Things Done

1.  **Scope (Here or Somewhere Else)**
    Scope decides if the task will be done right here, inside the current agent, or if it will be handed off to someone else.

    *   **Here (Inline Scope)**: This is the default. The `Invocation` is handled immediately, right on the spot. Think of it like doing your homework yourself at your desk.
    *   **Somewhere Else (Module Scope)**: This is turned on using `_module`. The `Invocation` is handed off to another part of the system to complete. It's like asking a smart friend to solve a math problem for you.

2.  **Method (By the Rules or Creatively)**
    Method decides how the result is created: by following exact instructions or by using its imagination.

    *   **By the Rules (Explicit Method)**: This is used when there's an `_activity` property. The result of the `Invocation` is created by precise, pre-written code. It's like building a LEGO set using the step-by-step instruction booklet.
    *   **Creatively (Latent Method)**: This is the default if `_activity` isn't there. The AI invents the result of the `Invocation`. This requires an `_output` property to describe what the result should look like. It's like being given a pile of LEGOs and told, "Build a cool car!"

You can mix and match these settings to create different ways of getting tasks done. To control what knowledge the AI has access to while it works, you can use imports. You can read more about that in **[008: Agent/Imports](./008_agent_imports.md)**.

## Building Bigger Plans

An `Invocation` is like a single LEGO brick. You can use lots of them to build bigger, more organized projects. In the COILS system, an Invocation is what kicks off advanced 'Ideas' like **[202: Idea/Vessel](./202_idea_vessel.md)** and **[203: Idea/Process](./203_idea_process.md)**.

A `Vessel`, for example, is like a complete mission packet for a single decision. It contains the full request for the agent, including all the background info (`context`) and a list of available `Tools` (`schema`). The agent's response is a `decision`, which can contain one or more `Invocations`, all ready to go.

> Sidenote:
>
> - [202: Idea/Vessel](./202_idea_vessel.md)
> - [203: Idea/Process](./203_idea_process.md)

## Ways to Run Invocations

When an agent creates several Invocations, you can run them in different ways, depending on what you need. Imagine you have a to-do list.

```typescript
// Do one thing on the list
const result = await Tool(call);

// Do everything on the list and wait for all of them to finish
const results = await Tool.all(calls);

// Try doing things one by one, but stop as soon as one is done successfully
const result = await Tool.any(calls);

// Start everything at once and see which one finishes first (even if it fails)
const result = await Tool.race(calls);
```

These different ways let you:

*   **Stay in control**: Handle Invocations one at a time, maybe doing something in between.
*   **Work in batches**: Run a bunch of independent Invocations at the same time to go faster.
*   **Find quick answers**: Stop after the very first success (`.any()`) or the very first result of any kind (`.race()`).
*   **Do it all or nothing**: Make sure that every Invocation in a group finishes successfully (`.all()`), which prevents problems when one task depends on another.