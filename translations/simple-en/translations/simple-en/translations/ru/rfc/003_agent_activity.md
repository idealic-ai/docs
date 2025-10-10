# 003: Agent/Activity

> **Activity:** An Activity is the actual computer code that does a real job. It’s the engine that makes a `Tool` work. You need an Activity for tasks the AI can't just dream up an answer for, like talking to a website, searching a database, or anything else that connects to the real world. — [Glossary](./000_glossary.md)



This document explains the rules for **Activities**. These rules explain how a `Tool` (an idea) connects to real code that can actually *do* things. If a `Tool` is like a button that says “Get Weather,” the `Activity` is the actual program that connects to a weather service and gets the forecast.

## The Two-Bookcase System

Imagine you have two bookcases. This is how the system keeps the *idea* of a job separate from the *instructions* for doing it.

- **The Tool Bookcase**: This bookcase holds all the blueprints for the `Tools`. It's a collection of books that describe *what* each tool can do. For example, one book might be titled “Get the Weather.”
- **The Activity Bookcase**: This bookcase holds the actual instruction manuals (`Activities`). It has the step-by-step code that explains *how* to do each job.

Keeping them separate is a superpower. It means the AI can sometimes just *pretend* to use a tool by guessing a smart answer. It also means you can change *how* a job is done without changing the tool itself. For instance, you could switch from one weather website to another, and the “Get the Weather” `Tool` wouldn't even notice.

## Adding an Activity to the Bookcase

To make an `Activity` (an instruction manual) available, you give it a unique name and add it to the system’s bookcase. This name is how a `Tool` finds the right instructions.

```typescript
// We're adding a new instruction manual to the bookcase.
// The name 'weatherCheck' should match the Tool it's built for.
Activity.register('weatherCheck', async call => {
  const data = await weatherAPI.get(call.location);
  return { temperature: data.temp, conditions: data.desc };
});
```

## How Jobs Get Done: “Imagining” vs. “Doing”

The system has two ways to handle a task when a `Tool` is used:

- **Imagining (Latent Execution)**: The AI uses its super-smart brain to think up an answer on the spot. This is what happens if a `Tool` doesn’t have a real instruction manual (`Activity`) connected to it.

- **Doing (Explicit Execution)**: The system finds the matching `Activity` (the real code) and runs it. This is like telling your computer to actually *perform an action*—like visiting a website or doing math. It’s for tasks that need real, up-to-the-minute information from the outside world.

## How the System Connects a Tool to its Code

The system is smart about deciding whether to “Imagine” or “Do.” It follows these simple steps to find the right instruction manual (`Activity`) for a `Tool`:

1.  **Look for a special note**: First, it looks at the `Tool`'s blueprint. If there's a specific note (called `_activity`) that says, “Use this exact instruction manual,” it does. Easy.
2.  **Match the names**: If there’s no note, the system looks for an `Activity` in the bookcase that has the **exact same name** as the `Tool`. If it finds a match, it connects them automatically.
3.  **Default to “Imagining”**: If it can't find a match with the first two rules, it stops looking for code. Instead, it just asks the AI to “Imagine” an answer.

This makes life simple for people building these systems:

- **Just give your `Tool` and `Activity` the same name**, and they link up on their own.
- `Tools` that don't have a matching instruction manual will safely fall back on the AI’s imagination.
- You can always add a special note to a `Tool` to point it to a different `Activity` if you need more control.

## Why Keeping Them Separate is a Big Deal

Think about your TV remote. The buttons are separate from the TV's internal wiring. You can buy a new TV, and your universal remote still works because the “Volume Up” button (`Tool`) isn't permanently attached to the specific electronics (`Activity`) of your old TV.

By keeping `Tools` and `Activities` in separate bookcases, we get the same benefit. The AI only needs to know about the button, not what’s happening inside the TV. This means:

- **Upgrades are easy**: You can start with the AI just “imagining” an answer and later plug in a real `Activity` to fetch live data. The AI doesn’t need to be changed at all. It's like your remote suddenly controlling a much smarter TV.
- **You can try out different ideas**: You can have two different `Activities` for the same `Tool` to see which works best. Is it better to get a quick guess from the AI or wait for real data from a website? Now you can test it.
- **You can release changes safely**: You can give a new, experimental `Activity` to just a few test users while everyone else keeps using the old, reliable one.

## From Blueprint to Action

By separating *what* to do (the `Tool`) from *how* to do it (the `Activity`), we’ve made a really flexible system. But that’s just part one. Now that we have our blueprints and our instruction manuals, we need a manager to decide which tools to use and in what order.

The next document, [004: Agent/Call](./004_agent_call.md), explains how the system handles this, turning simple ideas into a sequence of real-world actions.