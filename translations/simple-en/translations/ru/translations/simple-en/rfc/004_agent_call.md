# 004: Agent/Call

> **Call:** Imagine a **Tool** is a button on a remote, like “Change Channel.” A **Call** is when you actually press that button and type in a specific channel, like “5.” It's the real command to *do something right now*.
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

An **[Idea](./101_concept_idea.md)** is like a blueprint that describes how to do something. A **[Tool](./002_agent_tool.md)** turns that blueprint into a working button that an AI agent can understand. This document explains a **Call**—what happens when the agent pushes that button.

A **Call** is a specific command for a Tool, with all the details filled in, ready to go. If a Tool describes *what you can do*, a Call is about *how you actually do it*.

## The Journey from Idea to Call

Imagine you're baking a cake. Here's how it works:

1.  **Idea**: This is your recipe. It holds all the instructions and knowledge about how to bake a cake.
2.  **Tool**: The recipe is used to create a “Bake Cake” button on your smart oven. Now the oven knows what ingredients it needs (like flour, sugar, eggs) and what it can do.
3.  **Call**: This is when you tell the oven, “Bake a cake using *this brand* of chocolate, for *30 minutes* at *350 degrees*.” You’ve filled in all the blanks and given a specific, final command. The Call is that one single command for the Tool.

The main rule is simple: **any Idea can become a Tool, and any Tool can be used in a Call.**

To learn more about how an Idea’s “shopping list” (inputs) becomes the settings for a Tool, check out **[007: Agent/Input](./007_agent_input.md)**.

## The “Control Knobs”: Scope and Method

When you make a Call, you can change how it runs using two “control knobs”: **Scope** (where it runs) and **Method** (how it runs). The system understands how you've turned these knobs by looking for special instructions in the Tool's settings (`_module`, `_activity`, `_output`).

### The Two Main Controls

1.  **Scope (Where does the task happen? Here or with a specialist?)**
    The scope decides if the agent does the task itself or hands it off to someone else.
    - **Here (Inline Scope)**: This is the default. The agent does the task directly. It’s like a chef chopping vegetables at their own station.
    - **Specialist (Module Scope)**: This is triggered by the `_module` instruction. It’s like the chef telling the baker in another part of the kitchen to do something. The task is sent to an expert to handle.

2.  **Method (How is the task done? By recipe or with creativity?)**
    The method decides if the task follows exact instructions or needs some creative thinking.
    - **Recipe (Explicit Method)**: This is triggered by the `_activity` instruction. The task is done by following a clear set of steps, like a robot following code. No guesswork involved.
    - **Creative (Implicit Method)**: This is the default when there is no `_activity`. The agent (the AI model) is asked to figure out the best way to do something. This requires an optional `_output` instruction, which is like telling a talented chef, “I don’t care how you do it, just make me a delicious soup.”

You can mix and match these controls to create all kinds of different ways to get work done. To learn how, check out **[008: Agent/Imports](./008_agent_imports.md)**.

## Building Big Systems with Calls

A `Call` is like a single Lego block. By itself, it’s a simple command. But you can connect many Calls together to build much bigger and more complex things. For example, you can build a whole **[Vessel](./202_idea_vessel.md)** or **[Process](./203_idea_process.md)**.

A `Vessel` is like a complete Lego set in its box. It has everything needed for one big job: the instructions (`context`), a list of all the available pieces (`schema` from `Tools`), and the final model that the agent decides to build (`solution`—a list of one or more `Calls` to run).

> Sidenote:
>
> - [202: Idea/Vessel](./202_idea_vessel.md)
> - [203: Idea/Process](./203_idea_process.md)

## Different Ways to Run Calls

When an agent decides to make several Calls at once, you can choose how to run them.

```typescript
// Run just one Call
const result = await Tool(call);

// Run all of them. Don't continue until every single one is finished.
const results = await Tool.all(calls);

// Try all of them. Give back the result of the first one that works.
const result = await Tool.any(calls);

// It's a race! Run all of them and give back the result of the very first one to finish, no matter if it worked or failed.
const result = await Tool.race(calls);
```

These patterns let you:

- **Go step-by-step**: Handle each Call one at a time, adding your own logic in between.
- **Work in batches**: Run a group of independent Calls at the same time to speed things up.
- **Find a quick solution**: Stop as soon as you find one working Call (`.any()`) or as soon as any Call finishes (`.race()`)
- **Succeed together**: Make sure a whole group of Calls finishes successfully, which helps keep things consistent when they depend on each other (`.all()`).