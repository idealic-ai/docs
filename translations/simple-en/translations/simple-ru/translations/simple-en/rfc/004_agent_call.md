# 004: Agent/Call

> **Call:** Imagine a **Tool** is a button on a remote control, like “Change Channel.” A **Call** is when you actually press that button and type in a specific number, like “5.” It’s the real command to *do something right now*.
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

An **[Idea](./101_concept_idea.md)** is like a blueprint for how to do something. A **[Tool](./002_agent_tool.md)** turns that blueprint into a working button that an AI agent can understand. This document explains what a **Call** is—in other words, what happens when the agent presses that button.

A **Call** is a specific command for a Tool, with all the details filled in, ready to be executed. If a Tool describes *what can be done*, a Call is about *how exactly to do it*.

## The Journey from an Idea to a Call

Imagine you're baking a cake. Here's how it works:

1.  **Idea**: This is your recipe. It has all the instructions and knowledge about how to bake a cake.
2.  **Tool**: The recipe is used to create a “Bake Cake” button on your smart oven. The oven now knows what ingredients it needs (like flour, sugar, eggs) and what it's capable of doing.
3.  **Call**: This is when you tell the oven: “Bake a cake using *this brand* of chocolate, for *30 minutes* at *180 degrees*.” You’ve filled in all the blanks and given a specific, final command. The Call is that single, complete command for the Tool.

The main rule is simple: **Any Idea can become a Tool, and any Tool can be used in a Call.**

To learn more about how an Idea's "shopping list" (its inputs) turns into the settings for a Tool, check out **[007: Agent/Input](./007_agent_input.md)**.

## Control Knobs: Scope and Method

When you make a Call, you can change how it's carried out using two “control knobs”: **Scope** (where it runs) and **Method** (how it runs). The system understands how you've turned these knobs by looking for special instructions in the Tool's settings (`_module`, `_activity`, `_output`).

### The Two Main Controls

1.  **Scope (Where does it run? Here or by a specialist?)**
    The scope decides whether the agent will do the work itself or pass it to someone else.
    - **Here (Local Scope)**: This is the default. The agent performs the task itself. It's like a chef chopping vegetables at their own station.
    - **Specialist (Module Scope)**: This option is turned on by the `_module` instruction. It's like the chef handing an order to a baker in another part of the kitchen. The task is passed to an expert.

2.  **Method (How is it done? By the book or creatively?)**
    The method decides whether the task will follow exact instructions or use a bit of creativity.
    - **By the Book (Explicit Method)**: This is turned on by the `_activity` instruction. The task is done by following clear steps, like a robot following a program. No guesswork allowed.
    - **Creatively (Implicit Method)**: This is the default if there’s no `_activity` instruction. The agent (the AI model) is asked to figure out the best way to do something on its own. It might need an `_output` instruction, which is like telling a creative chef, “I don’t care how you do it, just make a delicious soup.”

These controls can be mixed and matched to create all kinds of ways to get work done. To learn how this works, check out **[008: Agent/Imports](./008_agent_imports.md)**.

## Building Big Things with Calls

A `Call` is like a single Lego brick. By itself, it's a simple command. But you can connect many Calls together to build something much bigger and more complex. For example, you can build an entire **[Vessel](./202_idea_vessel.md)** or **[Process](./203_idea_process.md)**.

A `Vessel` is like a complete Lego set in a box. It has everything needed for one big task: the instructions (`context`), a list of all available bricks (`schema` made of `Tools`), and what the agent decides to build (`solution`—a list of one or more `Calls` to run).

> Sidenote:
> 
> - [202: Idea/Vessel](./202_idea_vessel.md)
> - [203: Idea/Process](./203_idea_process.md)

## Different Ways to Run Calls

When an agent decides to make several Calls at once, you can choose how to run them.

```typescript
// Run just one Call
const result = await Tool(call);

// Run them all. Don't continue until every single one is finished.
const results = await Tool.all(calls);

// Try them all. Return the result of the first one that works.
const result = await Tool.any(calls);

// It's a race! Run them all and return the result of the very first one to finish, whether it succeeded or failed.
const result = await Tool.race(calls);
```

These approaches let you:

- **Go step-by-step**: Handle each Call one at a time, adding your own logic in between.
- **Work in batches**: Run a bunch of independent Calls at the same time to be faster.
- **Find a quick solution**: Stop as soon as one working Call is found (`.any()`) or as soon as any Call finishes (`.race()`)
- **Succeed together**: Make sure that a whole group of Calls completes successfully. This helps keep things in order when they depend on each other (`.all()`).