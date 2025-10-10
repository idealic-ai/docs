# 003: Agent/Activity

> **Activity:** Imagine an `Activity` is the real work happening behind a `Tool`. If a `Tool` is a button that says "Check the Weather," the `Activity` is the actual computer code that connects to a weather service and gets the information. You need this for jobs the AI can't just 'remember' from its brain, like talking to other websites or checking a database. — [Glossary](./000_glossary.md)

>Sidenote: This follows up on what we learned in [002: Agent/Tool](./002_agent_tool.md).

This document explains how `Tools` get their power from real, working code. A `Tool` describes *what* a special ability does, and an **`Activity`** is the code that actually shows *how* it does it.

## Two Recipe Books

To keep things organized, the system uses two different lists, or “registries,” to separate *what* an ability does from *how* it works.

- **Tool Registry**: This is like a restaurant's menu. It lists all the available abilities (`Tools`) by name and describes what they do (like, “Check the Weather”).
- **Activity Registry**: This is like the secret recipe book in the kitchen. It holds the actual step-by-step instructions (`Activities`) for how to make each dish on the menu.

This separation is super helpful. It means the AI can just think about what's on the menu without needing to know the recipe. It also means we can change a recipe (like making it faster or using a different ingredient) without having to reprint all the menus.

## Adding a Recipe to the Book

An `Activity` is signed up with a name that connects it to a `Tool`.

```typescript
// This is how we add a recipe (an Activity) to our book.
// The 'weatherCheck' name has to match the Tool on the menu.
Activity.register('weatherCheck', async call => {
  const data = await weatherAPI.get(call.location);
  return { temperature: data.temp, conditions: data.desc };
});
```

## Two Ways to Get an Answer: Imagine or Do

When the system needs to use a `Tool`, it can get an answer in two different ways:

- **Imagine the result (Latent Execution)**: This is when the AI just uses its super-smart brain to come up with an answer. If you ask it a trivia question, it doesn't need to look it up—it just “knows” it. This is the default way if there's no special code to run.
>Sidenote: You can read more about what “Latent” means here: [104: Concept/Latent](./104_concept_latent.md)
- **Actually do something (Explicit Execution)**: This is when the system runs real code to get an answer. This is necessary for things the AI can't just imagine, like checking the weather right now, finding something in a database, or using another website's service.

## How the System Decides What to Do

The system is smart and doesn't need to be told what to do every time. It follows a simple set of rules to decide whether to imagine an answer or run real code.

1.  **Special Instructions**: If a `Tool` has a special note on it that says, “Use this specific recipe,” the system will always follow that instruction.
2.  **Name Matching (The Easy Way)**: If a `Tool` is named “weatherCheck,” the system will automatically look in the recipe book for an `Activity` that is also named “weatherCheck.” If it finds one, it uses it. This is the simplest and most common way to connect a `Tool` to its code.
3.  **Fall Back to Imagining**: If the system can't find a matching recipe using the rules above, it defaults to trying to imagine the answer. This is a safe option so that nothing breaks.

This makes building things easy:

- To make a `Tool` work with real code, just give the code the **same name** as the `Tool`.
- If you create a `Tool` without any code, it will safely switch to a mode where the AI handles it.
- If you want the same code to work for several different `Tools`, you can use Rule #1 to point them all to the same recipe.

## Why This Separation Is So Important

If we didn't separate the menu (`Tool`) from the recipes (`Activity`), they'd be stuck together forever. Imagine if you had to tell every customer who ever ordered a dish that you changed the recipe. It would be impossible!

By keeping them separate, we get amazing flexibility:

- **Recipes can change without confusing anyone**: You can update the code that checks the weather, switching it from one service to another, and the AI agent using the “weatherCheck” `Tool` won't even notice. It just keeps working.
- **You can test different approaches**: You can have the AI imagine an answer and also run real code to get an answer, then compare them to see which works better.
- **It's safe to introduce changes**: You can give a new, experimental recipe to just a few agents to test, while everyone else keeps using the old, reliable one.

## From Knowing to Doing

So, we've figured out *what* abilities an agent has (the `Tool`) and *how* those abilities get things done (the `Activity`). But that's just the start. The next step is to understand how the system manages all these tasks: how it takes an order, sends it to the kitchen, and makes sure everything happens in the right sequence.

The next document, [004: Agent/Call](./004_agent_call.md), explains how these ideas come to life.