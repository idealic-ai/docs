# 004: Agent/Call

> **Call:** A specific, ready-to-run version of a `Tool` that has all its instructions filled in (`params`). It’s a request focused on a single job: _what needs to get done_.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [103: Concept/Ideator](./103_concept_ideator.md)
> - Opens the door for:
>   - [008: Agent/Imports](./008_agent_imports.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)
>   - [202: Idea/Vessel](./202_idea_vessel.md)
>   - [203: Idea/Process](./203_idea_process.md)

The document [101: Concept/Idea](./101_concept_idea.md) explained how an **Idea** is a powerful way to store knowledge. The document [002: Agent/Tool](./002_agent_tool.md) showed how we turn Ideas into **Tools** that an AI agent can understand and use. This paper is about the **004: Agent/Call** protocol, which builds on top of Tools and tells the agent *how* to actually run them.

Think of it this way: if a **Tool** is a recipe for baking a cake, a **Call** is the moment you decide to bake a specific chocolate cake, with all your ingredients measured and ready to go.

If a Tool tells you *what you can do*, a Call tells you *exactly how you're going to do it*.

## The Journey from Idea to Call

Here’s how a thought becomes an action:

1.  **Idea**: A self-contained plan for how to do something or understand something.
2.  **Tool**: The `Idea` is turned into a blueprint that an AI agent can read. Think of this like turning a chef's notes into a clear, step-by-step recipe card. (You can read more about this in [002: Agent/Tool](./002_agent_tool.md)).
3.  **Call**: When the AI decides to use that recipe, it fills in the details (like using brown sugar instead of white sugar). This creates a **Call**—a single, specific task that's ready to be carried out.

The main rule is: **Any Idea can be turned into a Tool, which can then be used as a Call.**

To learn more about how an `Idea`'s shopping list becomes a `Tool`'s recipe ingredients, check out **[007: Agent/Input](./007_agent_input.md)**.

## How to Run a Call: Scope and Method

When a Call runs, two things decide how it works: **Scope** (where it runs) and **Method** (how it runs). Think of it like making a pizza.

### The Two Parts of Getting Something Done

1.  **Scope (Cooking in-house or ordering out?)**
    Scope decides if the agent does the work itself or gives the job to someone else.
    - **Inline Scope**: This is the default. The agent does the work right here, right now. It's like making the pizza in your own kitchen.
    - **Modular Scope**: This is for when you want to hand off the job. You tell a special part of the system to handle the Call. It’s like ordering a pizza from a restaurant; they make it and deliver it to you.

2.  **Method (Following a recipe or freestyling?)**
    Method decides if the result is created by following exact instructions or by using creativity.
    - **Explicit Method**: The result is created by pre-written code that runs the same way every time. This is like following a recipe perfectly, step-by-step.
    - **Implicit Method**: This is the default. The AI (a Large Language Model) figures out the result. It's like a chef who tastes the sauce and decides what it needs, rather than measuring everything perfectly.

You can mix and match these. For example, ordering a specific pizza from the menu is like using a **Modular Scope** (ordering out) and an **Explicit Method** (following a recipe).

To learn how these pieces fit together, read **[008: Agent/Imports](./008_agent_imports.md)**.

## Building Bigger Things with Calls

A `Call` is a basic building block, like a single LEGO brick. You can use these bricks to build much bigger and more interesting things. Two of these bigger things are the **[202: Idea/Vessel](./202_idea_vessel.md)** and the **[203: Idea/Process](./203_idea_process.md)**. For example, a `Vessel` is like a complete mission for the agent. It contains the goal, all the information needed, and a list of all the tools the agent is allowed to use. The agent's final answer is a list of one or more `Calls`—the exact steps it has decided to take to complete the mission.

> Sidenote:
>
> - [202: Idea/Vessel](./202_idea_vessel.md)
> - [203: Idea/Process](./203_idea_process.md)

## Different Ways to Run Calls

When an agent has a list of Calls to make, it can handle them in different ways depending on what it needs to do.

```typescript
// Do just one Call
const result = await Tool(call);

// Do all the Calls and wait for all of them to finish
const results = await Tool.all(calls);

// Do all the Calls and stop as soon as one of them works
const result = await Tool.any(calls);

// Start all the Calls at the same time and just pay attention to the very first one that finishes
const result = await Tool.race(calls);
```

These different patterns let you:

- **Be precise**: Handle one Call at a time, so you can think between steps.
- **Work in batches**: Run a bunch of independent Calls all at once to save time.
- **Get quick answers**: Stop as soon as you get the first good answer (`.any()`) or the first answer of any kind (`.race()`).
- **Do it all or nothing**: Make sure that a whole group of Calls succeeds together (`.all()`), which is useful when all the steps depend on each other.