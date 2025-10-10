# 003: Agent/Action

> **Action:** Imagine you have a remote for a toy car. The "forward" button is the `Tool`. The `Action` is the actual code that makes the car's wheels spin. An `Action` is needed to work with the real world, like checking the weather online or looking something up in a database. It's the stuff the AI can't just "make up." — [Glossary](./000_glossary.md)

> Sidenote: Requires: [002: Agent/Tool](./002_agent_tool.md)
>

This document explains how `Tools` (what we want to do) connect to `Actions` (how we actually do it). If a `Tool` is like a button in an app, the `Action` is the code that runs when you press that button.

## Two Different Lists

To keep things flexible, the system uses two separate lists:

- **The Tool List**: This is like a restaurant menu. It describes what “dishes” (abilities) are available to order.
- **The Action List**: This is the restaurant's kitchen. It holds the “cooks” (pieces of code) that actually prepare the dishes.

Keeping these separate is super useful. It lets us have a “dish” on the menu that an AI “cook” can just imagine and serve up instantly. Or, we can easily swap one cook for another (like using a different weather service) without having to change the menu itself.

## How to Register an Action

We give each `Action` a unique name to link it to a `Tool` from the menu.

```typescript
// Here, we're "hiring a cook" for our menu.
// The name 'weatherCheck' must match the name of the dish (the Tool).
Activity.register('weatherCheck', async call => {
  // This code goes to a weather website and gets the data
  const data = await weatherAPI.get(call.location);
  // Then it returns the temperature and a description
  return { temperature: data.temp, conditions: data.desc };
});
```

## Two Ways to Work: "Imagine" or "Do"

When we ask the system to use a `Tool`, it can respond in one of two ways:

- **Latent Execution (Imagine)**: The AI just thinks up the result on its own. For example, if you ask it to write a short poem, it doesn’t look it up online—it just creates one. This is the default method if a `Tool` doesn't have a real `Action` (a cook) assigned to it.
  > Sidenote: [104: Concept/Latent](./104_concept_latent.md)
- **Explicit Execution (Do)**: The system finds the matching code (`Action`) and runs it. This is necessary when you need to do something in the real world (like check the weather or send an email) or perform an exact calculation that you can’t just “imagine.”

## How the System Decides to "Imagine" or "Do"

The system is smart and doesn't need a lot of complicated setup. It decides which method to use based on a few simple rules:

1.  **Direct Command**: If the `Tool`’s description says, “Use the `Action` with this specific name,” the system looks for that exact `Action`.
2.  **Name Matching (The Easiest Way)**: If there’s no direct command, the system looks for an `Action` with the same name as the `Tool`. If you have a `Tool` named “checkWeather,” the system will look for an `Action` named “checkWeather.” If it finds one, great, it runs it!
3.  **Plan B — Imagine**: If an `Action` with a matching name isn't found, the system assumes it should use its imagination and switches to latent mode.

This makes everything really simple:

- **Just give your `Tool` and `Action` the same name, and it will work automatically.**
- Tools that don’t have any real code behind them will be handled safely by the AI’s imagination.
- If you need to, you can always use a direct command to make one `Action` do the work for several different `Tools`.

## Why Separating the "Menu" and the "Kitchen" Is So Important

If we didn't separate `Tools` (the menu) and `Actions` (the kitchen), every dish on the menu would be permanently tied to its cook. To change the cook (for example, to start using a different weather service), we’d have to reprint all the menus in every restaurant in our chain!

By keeping them separate, we can just replace a cook in the kitchen, and the menu stays the same. The customers (the agents) won't even know anything changed. This means we can:

- **Change Code Without Breaking Things**: You can easily switch from “imagined” weather to real weather, and the agent asking for it won't notice a thing.
- **Run Experiments**: You could have two cooks working at the same time—one is the AI, and the other uses a real service—to see which one does a better job.
- **Update Gradually**: You can give the new cook to just a few agents while everyone else keeps using the old one.

## From Idea to Result

By separating “what to do” (`Tool`) from “how to do it” (`Action`), we've built a very flexible system. But we're not done. Now that we have a menu and a kitchen, we need a waiter—someone to take orders, pass them to the kitchen, and make sure they get done.

The next document, [004: Agent/Call](./004_agent_call.md), will explain how the system manages these orders, turning our ideas into real actions.