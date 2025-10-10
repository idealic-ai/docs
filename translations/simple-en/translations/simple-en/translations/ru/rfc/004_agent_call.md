# 004: Agent/Invocation

> **Invocation:** Think of this as a ready-to-go command. It's like you've taken a recipe (a `Tool`) and filled in all the blanks with the actual ingredients you're using right now.
> 
> — [Glossary](./000_glossary.md)

> Sidenote:
> 
> - Needs to be read after:
>   - [103: Concept/Ideator](./103_concept_ideator.md)
> - Helps you understand these next:
>   - [008: Agent/Imports](./008_agent_imports.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)
>   - [202: Idea/Vessel](./202_idea_vessel.md)
>   - [203: Idea/Process](./203_idea_process.md)

We've already talked about [Ideas](./101_concept_idea.md) (which are like blueprints for things) and [Tools](./002_agent_tool.md) (which are how an AI can use those blueprints). This guide explains the very next step: how the AI actually *does* something with a `Tool`. This action is called an **Invocation**.

An **Invocation** is a `Tool` that’s been filled out and is ready to be used. Imagine a `Tool` is a recipe for a pizza. An `Invocation` is you deciding to make a pizza *right now* with pepperoni and mushrooms.

If a `Tool` tells you *what you could do*, an `Invocation` tells you *how you're going to do it right now*.

## The Journey from an Idea to an Action

Here’s how a simple thought becomes a real action for the AI:

1.  **Idea**: It all starts with a single thought, like "the power to find out what the weather is like."
2.  **Tool**: That `Idea` gets turned into something the AI can work with, like a form with empty boxes. The "weather" `Idea` becomes a `Tool` with a box for "City" and a box for "Date". (You can read more about this in [002: Agent/Tool](./002_agent_tool.md)).
3.  **Invocation**: To actually use the `Tool`, the AI fills in the empty boxes. For example, it types "London" into the "City" box. This turns the `Tool` into an **Invocation**—a specific, one-time command that's ready to go.

The main rule is simple: **Any Idea can become a Tool, and any Tool can be used to make an Invocation.**

To see exactly how the `Idea`'s empty boxes get made, check out **[007: Agent/Input](./007_agent_input.md)**.

## How to Control the Action: Scope and Method

When an `Invocation` runs, we can control it with two settings: **Scope** (which decides *where* it runs) and **Method** (which decides *how* it runs). Think of them like two control knobs on a machine.

### The Two Control Knobs

1.  **Scope (Do it yourself or ask for help?)**
    Scope decides if the AI should handle the job itself or give it to a specialized program.
    - **Inline Scope**: This is the normal way. The AI does the work inside its own main brain.
    - **Modular Scope**: This is like asking a friend for help. The `Invocation` is sent to an outside helper program to finish the job.

2.  **Method (Use a calculator or be creative?)**
    Method decides if the result comes from predictable code or from the creative AI.
    - **Explicit Method**: The job is done by simple, strict code. The result is always perfect and predictable, like asking a calculator what 2+2 is. It's always 4.
    - **Implicit Method**: This is the normal way. The job is given to the creative AI language model. The answer is created, not calculated, which is very powerful but can be a little surprising sometimes.

You can mix and match these settings to get different results. To learn more about how they work together, see **[008: Agent/Imports](./008_agent_imports.md)**.

## Building Bigger Things

An `Invocation` is like a single Lego brick. By itself, it’s just one small action. But you can snap many of them together to build big, powerful projects.

This is how we can kick off bigger tasks, like a **[Vessel](./202_idea_vessel.md)** (which is like a complete thought bubble for the AI) or a **[Process](./203_idea_process.md)** (a series of steps for the AI to follow). For example, a `Vessel` packs up a whole question for the AI—including all the background info and `Tools` it can use—and the AI's answer is a to-do list of `Invocations`.

> Sidenote:
> 
> - [202: Idea/Vessel](./202_idea_vessel.md)
> - [203: Idea/Process](./203_idea_process.md)

## Different Ways to Run Invocations

When an AI has a list of things to do, you can choose how it runs them. This gives you a lot of control.

```typescript
// Run one single Invocation
const result = await Tool(call);

// Run all of them and wait for every single one to finish
const results = await Tool.all(calls);

// Run all of them and stop as soon as the first one succeeds
const result = await Tool.any(calls);

// Run all of them and stop as soon as the first one finishes (win or lose)
const result = await Tool.race(calls);
```

These different ways of running commands let you:

- **Be precise**: Handle tasks one by one, so you can do things in between each step.
- **Be efficient**: Run lots of tasks at the same time to get things done super fast.
- **Be quick**: Stop as soon as you get a good answer (`.any()`) or as soon as the very first task is done (`.race()`).
- **Be safe**: Make sure a whole group of tasks either all succeed together or none of them do (`.all()`). This is great for important jobs where every step has to work perfectly.