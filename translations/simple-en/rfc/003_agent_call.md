# 004: Agent/Call

> **Call:** Think of a **Tool** as a recipe for doing something, like a recipe for baking a cake. A **Call** is when you actually decide to bake a *specific* cake, with chocolate frosting and three layers. It's the command to do the thing *now* with all the details filled in.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - To understand this, you should know about: [Protocol: Ideators](./103_concept_ideator.md)
> - This helps explain these next ideas: [The Imports Protocol](./006_agent_imports.md), [The Instancing Protocol](./008_agent_instancing.md)

The [Idea Protocol](./101_concept_idea.md) gave us a way to package knowledge, like a smart container for an idea. The [Tool System](./002_agent_tool.md) showed how an AI can understand a list of abilities it has. This guide explains the **Call Protocol**, which is all about how the AI actually *uses* those abilities.

> Sidenote:
>
> - You need to understand this first:
>   - [RFC 1: Tool](/)
> - This helps explain what's next:
>   - [RFC 9: Plan](/)

A **Call** is like taking a recipe (a Tool) and filling in all the ingredients so it's ready to be cooked. If a Tool tells you *what you can do*, a Call tells you *how you're going to do it right now*.

## From Idea to Action

Here’s how a thought turns into an action for the AI:

1.  **Idea**: It starts with a complete thought, like a finished drawing or a written story. It holds all the information about something.
2.  **Tool**: We take that `Idea` and flip it around to create a blank template or recipe. This becomes a `Tool` that the AI knows how to use. (You can learn more about how this works in the [Tool System](./002_agent_tool.md) guide).
3.  **Call**: When the AI decides to use that `Tool`, it fills in the blanks on the template. This filled-in template is a **Call**, ready to be executed.

The main rule is simple: **any Idea can be turned into a Tool, which can then be used as a Call.**

To learn exactly how we turn an `Idea`'s recipe into a `Tool`'s list of ingredients, check out the **[Input Protocol](./007_agent_input.md)**.

## The Two Big Choices: Where and How

When the AI makes a `Call`, it has to decide two things: **Scope** (where does this happen?) and **Method** (how does it happen?). Think of it like cooking a meal. You have to decide if you'll cook it in your own kitchen or order it from a restaurant (Scope), and if you'll follow a strict recipe or be creative (Method).

### The Two Questions for Every Action

1.  **Scope (Where to run it: In here or out there?)**
    This choice is about whether the AI does the task itself or hands it off to someone else to do it separately.
    - **Inline Scope**: This is the normal way. The AI does the work right here, in its own workspace.
    - **Module Scope**: This is like giving the job to a specialist. The AI sends the `Call` to another program or helper to complete, and then gets the result back. This is used when a task is labeled with `_module`.

2.  **Method (How to do it: Follow instructions or be creative?)**
    This choice is about whether the answer is made by following exact code or by the AI thinking creatively.
    - **Explicit Method**: This is like a robot following instructions perfectly. The `Call` runs a piece of code that always does the same thing, which is signaled by a label called `_activity`.
    - **Latent Method**: This is the default way. The AI (the creative thinker) figures out the answer itself. This happens when there's no `_activity` label, and it usually needs a label called `_output` to know what the final answer should look like.

You can mix and match these choices to get different behaviors. To learn more about how they can be combined, see the **[Imports Protocol](./008_agent_imports.md)**.

## Idea, Tool, and Call: Three Ways of Looking at Things

It helps to see how these three things are focused on different goals.

- An **Idea** is focused on the **final product**. It's like a picture of a finished cake. It describes what the result looks like. It's a record of what *was* or *could be* created.

- A **Tool** is focused on the **recipe**. It's the blank recipe card with spaces for ingredients and instructions. It’s a template for an action, waiting to be used.

- A **Call** is focused on the **act of creating**. It's the recipe card that you've already filled out with “chocolate,” “sprinkles,” and “three layers.” It's a specific command, ready to go, for what *should be done* right now.

## The Vessel Idea: One Moment of Choice

When an AI has to make a decision, we package everything it needs into a special kind of `Idea` called a **Vessel Idea**. Think of it as a mission briefing folder for the AI.

A Vessel Idea contains the two key things the AI needs to make a choice:

1.  **The Context**: This is all the background information, like what the user asked for, what the AI remembers, and what's happening around it.
2.  **The Schema (The Menu)**: For a Vessel Idea, the schema is a special menu of `Tools` the AI is allowed to use for this specific mission. It can't choose an action that isn't on the menu.

The AI reads this entire folder—both the background info and the menu of options—and its final decision is the `solution`: a list of one or more `Calls` it wants to execute.

This lets one single `Idea` represent a big decision that might involve many steps.

## Ways to Handle Multiple Calls

What if the AI decides to do several things at once? There are a few different ways to handle the list of Calls.

```typescript
// Do one single Call and get the result
const result = await Tool(call);

// Do all the Calls at once, and wait for them all to finish
const results = await Tool.all(calls);

// Do all the Calls at once, but stop as soon as one succeeds
const result = await Tool.any(calls);

// Do all the Calls at once, and stop as soon as the very first one finishes (even if it failed)
const result = await Tool.race(calls);
```

These patterns let us do cool things:

- **Step-by-Step Control**: Handle each Call one by one, with your own logic in between.
- **Do Everything at Once**: Run independent Calls at the same time to go as fast as possible.
- **Find the First Success**: Stop as soon as you get a good result from any of the Calls (`.any()`).
- **Win the Race**: Stop as soon as the very first Call is done, whether it worked or not (`.race()`).
- **All or Nothing**: Make sure every single Call succeeds before moving on (`.all()`), which is useful when tasks depend on each other.