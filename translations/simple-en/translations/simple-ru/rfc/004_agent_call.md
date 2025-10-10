# 004: Agent/Invocation

> **Invocation:** A specific, ready-to-go version of a `Tool`, with all the blanks filled in. It’s a request focused on exactly *what needs to be done*.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [103: Concept/Ideator](./103_concept_ideator.md)
> - Lets you build:
>   - [008: Agent/Imports](./008_agent_imports.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)
>   - [202: Idea/Vessel](./202_idea_vessel.md)
>   - [203: Idea/Process](./203_idea_process.md)

Imagine an [Idea](./101_concept_idea.md) is just a thought or a recipe, and a [Tool](./002_agent_tool.md) is a template for that recipe that an AI (we call it an Agent) can understand. This document is about the **Invocation** — it’s what happens when we take that tool-template and turn it into a specific command for the Agent to carry out. We'll also figure out how to control *where* and *how* that command gets done.

An **Invocation** is like we took our tool-template and filled in all the empty fields. For example, if the Tool is “draw a circle,” the Invocation is “draw a red circle with a 10-inch radius in the center of the screen.” Tools tell you *what you can do*, while Invocations tell you *exactly how to do it*.

## The Journey from Idea to Invocation

1.  **Idea**: This is the original thought, like a recipe for a cake. It describes the final result we want.
2.  **Tool**: This turns the Idea into an instruction template the Agent can read. Imagine we took the recipe and made a form with blank fields: “Amount of flour: __”, “Amount of sugar: __”. (You can read more about this in [002: Agent/Tool](./002_agent_tool.md)).
3.  **Invocation**: When the Agent decides to use the Tool, it fills in those blanks. For example: “Amount of flour: 2 cups”, “Amount of sugar: 1 cup”. This is now an **Invocation**—a command that’s ready to go.

The main rule is this: **any Idea can be turned into a Tool, and then used as an Invocation.**

For a deep dive into how an `Idea`'s inputs become a `Tool`'s parameters, check out the doc **[007: Agent/Input](./007_agent_input.md)**.

## How to Control the Job: Scope and Method

To control how an Invocation gets done, we have two “switches”: **Scope** (where it works) and **Method** (how it works). The Agent knows which switch is flipped by looking for special labels in the code (`_module`, `_activity`, `_output`).

### Two Ways to Get Things Done

1.  **Scope (Inline or Modular)**
    Scope decides *where* the task will happen: right here, or in a separate workshop.
    - **Inline Scope**: This is the default. The Agent does the task itself, right where it is. It's like a chef chopping vegetables at their own cutting board.
    - **Modular Scope**: If there's a `_module` label, the Agent hands the task off to someone or something else—an outside helper or a different program. It’s like the chef sending the vegetables to a special chopping machine.

2.  **Method (Activity or Implicit)**
    Method decides *how* the result is made: by following strict instructions or by being creative.
    - **Activity Method**: This is used when there’s an `_activity` label. It means the Agent must follow exact, pre-written code, like a math formula. The result will always be the same.
    - **Implicit Method**: This is the default when there’s no `_activity` label. Here, the Agent (the AI) comes up with the solution on its own, based on its “experience.” The result can be creative and isn't always predictable. To do this, it needs a hint about what kind of result is expected (the `_output` property).

You can mix and match these “switches” to create different ways of completing tasks. You can read more about how this works in **[008: Agent/Imports](./008_agent_imports.md)**.

## Building Big, Complicated Tasks

An `Invocation` is like a single lego brick. You can use lots of them to build huge castles—in other words, complex, multi-step tasks. Invocations are what kick off bigger Ideas like a **[Vessel](./202_idea_vessel.md)** and a **[Process](./203_idea_process.md)**. For example, a `Vessel` is like a complete mission briefing for the Agent. It has everything: what's happening (`context`), what tools are available (`Tools`), and in return, the Agent gives back a “solution”—a list of one or more `Invocations` that need to be done.

> Sidenote:
>
> - [202: Idea/Vessel](./202_idea_vessel.md)
> - [203: Idea/Process](./203_idea_process.md)

## Ways to Run Invocations

When an Agent needs to handle several Invocations at once, it can do it in a few different ways, depending on what's needed:

```typescript
// Run a single Invocation
const result = await Tool(call);

// Run all Invocations, wait for all of them to finish
const results = await Tool.all(calls);

// Run all Invocations, return the first one that succeeds
const result = await Tool.any(calls);

// Run all Invocations, return the very first one to finish (win or fail)
const result = await Tool.race(calls);
```

These different ways let you:

- **Have total control**: Do Invocations one by one, with time to do things in between.
- **Work in batches**: Run a bunch of independent Invocations at the same time to go faster.
- **Get an answer quickly**: Stop as soon as you get the first successful result (`.any()`) or as soon as any of them finishes, no matter the outcome (`.race()`)
- **Make it all-or-nothing**: Ensure that every single Invocation finishes successfully (`.all()`), which is important when they all depend on each other.