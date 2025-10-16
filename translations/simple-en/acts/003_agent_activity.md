# 003: Agent/Activity

> [!DEFINITION] [Activity](./000_glossary.md)
> An Activity is the real, hands-on code that does the work for a `Tool`. Think of it as the engine that makes the car move. It’s what lets the system do things in the real world, like calling a weather service, checking a database, or doing any job that the AI can't just "think up" an answer for.

> Sidenote:
> *   Requires: [002: Agent/Tool](./002_agent_tool.md)

This document explains how `Tools` get their power from real, runnable code. A `Tool` describes *what* a special ability does, but an **Activity** is the code that *how* it actually does it.

## The Two-List System

Our system uses two separate lists to keep things organized. This separation is what makes the system so flexible.

*   **The Tool List (Tool Registry):** This is like a menu at a restaurant. It lists all the things you can order (like `getWeather` or `searchForFile`), but it doesn’t tell you how they're made.
*   **The Activity List (Activity Registry):** This is like the restaurant's cookbook. It contains the actual recipes (the code) for making each item on the menu.

By keeping the menu and the cookbook separate, we can easily change a recipe without having to reprint the entire menu. For example, we could switch from one weather service to another without changing how the AI asks for the weather.

## How to Add a Recipe (Activity)

You register a new piece of code (an Activity) by giving it a name that matches its `Tool`.

```typescript
// This is like adding a recipe to the cookbook.
// By convention, we give it the same name as the menu item.
Activity.register('weatherCheck', async call => {
  // Go to the real weather service and get the data
  const data = await weatherAPI.get(call.location);
  // Return the result
  return { temperature: data.temp, conditions: data.desc };
});
```

## Two Ways to Get an Answer: Guessing vs. Doing

When a `Tool` is used, the system can get the answer in one of two ways:

*   **Imagined Answer (Latent Execution):** This is like asking a really smart friend a question. They use everything they've learned to give you a very good guess, right on the spot. This is the default if there's no real code (Activity) for a `Tool`.
    > Sidenote:
    > *   [104: Concept/Latent](./104_concept_latent.md)
*   **Real Answer (Explicit Execution):** This is like handing your friend a phone and asking them to look up the answer. The system runs the actual Activity code to get a precise, real-world result. This is necessary for things like checking an API, reading a file, or anything that requires interacting with the outside world.

## How the System Decides Which Method to Use

The system has a simple, automatic way of deciding whether to guess or do.

1.  **Specific Instructions:** If the `Tool`'s definition specifically says, "Use *this* recipe," it will always look for that recipe (Activity) in the cookbook.
2.  **Matching Names (Recommended):** If there are no specific instructions, the system looks for a recipe in the cookbook that has the **exact same name** as the menu item (`Tool`). If it finds one, it uses it.
3.  **Default to Imagining:** If it can't find a matching recipe after checking the first two rules, it falls back to imagining the answer. The AI will just think it through and give its best guess.

This makes things easy:

*   **To make a `Tool` do real work, just create an `Activity` with the same name.**
*   `Tool`s that are just for thinking or organizing ideas don't need code and will work automatically.

## Why This Separation Is a Big Deal

If we didn't separate the menu (`Tool`) from the cookbook (`Activity`), every menu item would be permanently tied to its recipe. To change how a `Tool` works (like switching from a test weather service to a real one), you'd have to find every agent that uses that menu and teach it the new recipe.

With our two-list system, you can just swap out the recipe in the cookbook. The agents keep ordering from the same menu and don't even know the recipe changed. This lets us:

*   **Update how things work without breaking agents.**
*   **Test different ways of getting the same job done** (e.g., see if the AI's guess is as good as a real API call).
*   **Slowly roll out new features** by giving the new recipe to only some agents at first.

## From Idea to Action

By separating the "what" (`Tool`) from the "how" (`Activity`), we've built a very flexible system. We have our menu of abilities and our cookbook of recipes. The last piece of the puzzle is the waiter — the part of the system that takes the order and makes sure the kitchen cooks it correctly.

The next document, [004: Agent/Call](./004_agent_call.md), explains how the system manages and executes these requests, turning ideas into real actions.
