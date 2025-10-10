# 004: Agent/Call

> **Call:** A specific, ready-to-execute instance of a `Tool` with defined values for its `parameters`. It is a request focused on *what should be done*.
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

Imagine that an [Idea](./101_concept_idea.md) is just a thought or a recipe, and a [Tool](./002_agent_tool.md) is a template for that recipe that an artificial intelligence (Agent) understands. This document is about the **Call** — which is when we take a tool template and turn it into a specific command for the Agent to execute. We will also explore how to control *where* and *how* this command is executed.

A **Call** is like taking our tool template and filling in all the blank fields. For example, if the Tool is "draw a circle," a Call would be "draw a red circle with a 10-centimeter radius in the center of the screen." Tools say *what can be done*, while Calls say *exactly how to do it*.

## The Path from Idea to Call

1.  **Idea**: This is the initial concept, like a cake recipe. It describes the result we want to achieve.
2.  **Tool**: This is the transformation of an Idea into an instruction template that the Agent can understand. Imagine we took a recipe and made a form out of it with blank fields: "Amount of flour: __", "Amount of sugar: __". (More about this is written in the document [002: Agent/Tool](./002_agent_tool.md)).
3.  **Call**: When the Agent (artificial intelligence) decides to use a Tool, it fills in these blank fields. For example: "Amount of flour: 500g", "Amount of sugar: 200g". This is now a **Call**—a ready-to-execute command.

The main principle is: **any Idea can be turned into a Tool and then used as a Call.**

For a detailed explanation of how `Idea` inputs are transformed into `Tool` parameters, see the document **[007: Agent/Input](./007_agent_input.md)**.

## How to Control Execution: Scope and Method

To control how a Call is executed, we have two "switches": **Scope** (where it runs) and **Method** (how it runs). The Agent understands which switch is activated by special tags in the code (`_module`, `_activity`, `_output`).

### Two Dimensions of Execution

1.  **Scope (Inline or Module)**
    Scope determines where the task will be executed: right here and now, or in a separate "workshop."
    - **Inline Scope**: This is the default mode. The Agent executes the task itself, without deviating from its main job. Like a chef who chops vegetables at their own workstation.
    - **Module Scope**: If the `_module` tag is present, the Agent delegates the task to someone else—an external helper or another process. Like a chef giving vegetables to a special cutting machine.

2.  **Method (Explicit or Latent)**
    Method determines how the result will be obtained: through clear instructions or creatively.
    - **Explicit Method**: Used when the `_activity` tag is present. This means the Agent must follow precise, pre-written code, like a mathematical formula. The result will always be the same.
    - **Latent Method**: This is the default mode when the `_activity` tag is absent. Here, the Agent (artificial intelligence) devises a solution on its own, based on its "experience." The result can be creative and not always predictable. For this, it needs a hint about the expected result type (the `_output` property).

These "switches" can be combined to create different ways of executing tasks. You can read more about how this works in the document **[008: Agent/Imports](./008_agent_imports.md)**.

## Creating Complex Tasks

A `Call` is like a single brick from which entire castles—that is, complex, multi-stage tasks—can be built. It is Calls that trigger larger Ideas, such as **[Vessel](./202_idea_vessel.md)** and **[Process](./203_idea_process.md)**. For example, a `Vessel` is like a complete "request" for the Agent. It contains everything: what's happening around (`context`), what tools (`Tools`) can be used, and in response, the Agent provides a "solution"—a list of one or more `Calls` to be executed.

> Sidenote:
>
> - [202: Idea/Vessel](./202_idea_vessel.md)
> - [203: Idea/Process](./203_idea_process.md)

## Methods for Executing Calls

When an Agent needs to execute several Calls at once, it can do so in different ways, depending on the situation:

```typescript
// Execute a single Call
const result = await Tool(call);

// Execute all Calls, wait for all results
const results = await Tool.all(calls);

// Execute all Calls, return the first successful result
const result = await Tool.any(calls);

// Execute all Calls, return the very first result (regardless of success)
const result = await Tool.race(calls);
```

These approaches allow you to:

- **Have precise control**: execute Calls one by one and do something in between.
- **Process in batches**: run independent Calls simultaneously to be faster.
- **Get results quickly**: stop as soon as the first successful result is received (`.any()`) or as soon as any of the calls completes, regardless of success (`.race()`).
- **Work on an "all or nothing" basis**: ensure that all Calls complete successfully (`.all()`) to maintain integrity if they are interdependent.