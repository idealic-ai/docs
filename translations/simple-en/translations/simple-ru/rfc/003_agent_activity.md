# 003: Agent/Activity

> **Activity:** Think of this as a detailed recipe for a `Tool`. It’s the real, working computer code that gets the job done. You need it for tasks that have to connect to the outside world—like checking a weather website or a database—for anything the AI can't just "imagine" on its own. — [Glossary](./000_glossary.md)

> Sidenote: - Requires: [002: Agent/Tool](./002_agent_tool.md)
>

This document describes the **Activity Protocol**, which explains how `Tools` (descriptions of what you can do) are backed up by real, working code. If a `Tool` is *what* can be done, an `Activity` is *how* it gets done.

## Two Different Notebooks

The agent system uses two separate "notebooks" to keep the description of a skill separate from the code that actually performs it:

- **Tool Registry:** This notebook only stores descriptions of `Tools`. It's like a restaurant menu that lists all the dishes but doesn't tell you how to cook them.
- **Activity Registry:** This notebook holds the actual recipes—the computer code (`Activities`) that does the work for each `Tool`.

Keeping them separate is the secret to making the system super flexible. It lets `Tools` run in an "imagination" mode (where the AI just thinks up the answer), and it also lets you easily change the "recipe" (`Activity`) without having to change the "menu" (`Tool`). For example, you could have one recipe for testing things out and a different one for when it's live.

## Registering an Activity

An `Activity` is saved in its "notebook" under a unique name. This name connects it to its `Tool`.

```typescript
// We're saving the recipe (the Activity).
// The name 'weatherCheck' must match the Tool it's for.
Activity.register('weatherCheck', async call => {
  const data = await weatherAPI.get(call.location);
  return { temperature: data.temp, conditions: data.desc };
});
```

## Two Ways to Get Things Done: Latent and Explicit

When an agent uses a `Tool`, the system can work in one of two modes:

- **Latent Execution:** The AI uses its "imagination" and brainpower. The agent thinks through the task and gives back an answer right away, without running any special code. This is the default mode if the system can't find a ready-made "recipe" (`Activity`) for the `Tool`.
  > Sidenote: - [104: Concept/Latent](./104_concept_latent.md)
- **Explicit Execution:** The task is handed off to real code. The `Activity` function is turned on, and it does the actual work to figure out the result. You need this for connecting to the real world (like websites or databases) or for any job that needs to be 100% accurate and predictable.

## How the System Chooses Which Way to Go

You don't have to configure anything; the system figures out which mode to use on its own. It looks at a special `_activity` field in the `Tool`'s description and follows these simple rules:

1.  **Directly told in `_activity`**: If the `Tool` has this field filled in, the system looks for an `Activity` with that exact name.
2.  **Matching Names Rule (Recommended)**: If the `_activity` field is empty, the system looks for an `Activity` with the **exact same name** as the `Tool`. If it finds one, it uses it.
3.  **Fallback (Latent Mode)**: If nothing is found after checking the first two rules, the system assumes there's no recipe and asks the AI to "imagine" the result (it switches to latent execution).

This approach makes everything simple:

- **To make your code run, just give your `Activity` the same name as your `Tool`**.
- `Tools` that don't have any code will safely run in the AI's "imagination" mode.
- If you need to, you can point a `Tool` to a specially named `Activity`, and that will be used instead.

## Why Separating Activities is So Important

Imagine if a restaurant's menu and its recipes were all one big document. If you wanted to change one ingredient in a salad, you'd have to reprint the entire menu and hand it out to every customer again. That would be a huge pain.

Separating the "menu" from the "recipes" gives us superpowers:

- **Changes don't break agents**: You can completely change the "recipe" (the code), and the agent using the `Tool` won't even notice. It will just keep working, only better.
- **You can test different approaches**: For the same task, you could try two things: let the AI "imagine" the answer, or run code that contacts a real website. Then you can see which one works better.
- **Update things bit by bit**: You can give new "recipes" (`Activities`) to just a few agents, while everyone else keeps using the old ones or the AI's imagination.

## From Description to Action

By splitting up *what to do* (`Tool`) and *how to do it* (`Activity`), we've built a very flexible system. But that’s only part of the story. Now that we have both the descriptions and the code, there's one last step: managing it all. How do all these requests get started, run, and put in the right order?

The next document, [004: Agent/Call](./004_agent_call.md), will tell you about the protocol that turns these big ideas into specific, step-by-step actions.
