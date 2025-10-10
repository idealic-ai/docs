# Act 003: Agent/Activity

> **Activity:** Think of an `Activity` as the real work behind a `Tool`. If the `Tool` is a "Check Weather" button, the `Activity` is the actual computer code that connects to a weather service to get the info. It’s used for tasks the AI can’t just “know” from memory, like talking to other websites or checking a database. — [Glossary](./000_glossary.md)

> Sidenote: This document builds on what we learned in [Act 002: Agent/Tool](./002_agent_tool.md).
>

This document explains how `Tools` get their power from real, runnable code. A `Tool` tells you *what* a special ability does, and an **`Activity`** is the code that shows *how* it gets done.

## Two Recipe Books

To keep things organized, the system uses two different lists, or “registries,” to separate an ability’s idea from how it actually works.

- **Tool Registry**: This is like a restaurant menu. It lists all the abilities (`Tools`) by name and describes what they do (like, “Check the weather”).
- **Activity Registry**: This is like the secret recipe book in the kitchen. It holds the real, step-by-step instructions (`Activities`) for making every dish on the menu.

This separation is super helpful. It means the AI can just think about what's on the menu without needing to know the recipe. It also means we can change a recipe (like making it faster or using a new ingredient) without having to reprint the whole menu.

## Adding a Recipe to the Book

An `Activity` is registered with a name that connects it to a `Tool`.

```typescript
// Here's how we add a recipe (an Activity) to the book.
// The name 'weatherCheck' needs to match the Tool on the menu.
Activity.register('weatherCheck', async call => {
  const data = await weatherAPI.get(call.location);
  return { temperature: data.temp, conditions: data.desc };
});
```

## Two Ways to Get an Answer: Imagination vs. Action

When the system needs to use a `Tool`, it can get the answer in two different ways:

- **Imagined Result (Latent Execution)**: This is when the AI just uses its super-brain to figure out the answer. If you ask it a trivia question, it doesn’t need to look it up—it just “knows.” This is the default way if there’s no special code to run.
> Sidenote: You can read more about what “Latent” means here: [104: Concept/Latent](./104_concept_latent.md)
>
- **Real Execution (Explicit Execution)**: This is when the system runs real code to get an answer. This is necessary for things the AI can’t just imagine, like checking the live weather, looking something up in a database, or using another website's service.

## How the System Decides What to Do

The system is smart, so it doesn't need to be told what to do every time. It follows a simple set of rules to decide whether to imagine an answer or run real code.

1.  **Specific Instructions**: If a `Tool` has a special note that says, “Use this specific recipe,” the system will always follow that instruction.
2.  **Matching Names (The Easy Way)**: If a `Tool` is named “weatherCheck,” the system automatically looks in the recipe book for an `Activity` with the same name. If it finds one, it uses it. This is the simplest and most common way to connect a `Tool` to its code.
3.  **Default to Imagination**: If the system can't find a matching recipe using the rules above, it falls back on imagining the answer. This is a safe default so that nothing breaks.

This makes things easy for developers:

- To make a `Tool` work with real code, just give the code the **same name** as the `Tool`.
- If you create a `Tool` with no code, it will safely fall back to being handled by the AI.
- If you want the same piece of code to work for several different `Tools`, you can use Rule #1 to point them all to the same recipe.

## Why This Separation is So Important

If we didn't separate the menu (`Tool`) from the recipes (`Activity`), they would be stuck together forever. Imagine if, to change a recipe, you had to tell every single customer who ever ordered that dish. It would be impossible!

By keeping them separate, we get amazing flexibility:

- **Recipes can change without confusing anyone**: You can update the code that checks the weather, maybe switching from one service to another, and the AI agent using the “weatherCheck” `Tool` won’t even notice. It just keeps working.
- **You can test different approaches**: You can have the AI imagine an answer and also get a real answer from code, then compare them to see what works better.
- **You can roll out changes safely**: You can give a new, experimental recipe to only a few agents to test, while everyone else keeps using the old, reliable one.

## From Knowing to Doing

So, we’ve covered *what* abilities an agent has (`Tool`) and *how* those abilities get things done (`Activity`). But that’s only the beginning. The next step is to understand how the system manages all these tasks—how it takes an order, sends it to the kitchen, and makes sure everything happens in the right sequence.

The next document, [Act 004: Agent/Call](./004_agent_call.md), explains how these ideas are put into practice.