# Act 003: Agent/Activity

> **Activity:** This is the real, working code that does what a “Tool” promises. Think of it like a recipe for a chef. Activities are needed when you have to do something in the outside world—like check the weather online, look something up in a database, or any task the AI can't just “imagine” the answer to. — [Glossary](./000_glossary.md)

> Sidenote: Requires: [002: Agent/Tool](./002_agent_tool.md)
>

This document describes the **Activity Protocol**. It explains how “Tools” (what we talked about before) are connected to real, runnable code. If a “Tool” is a description of *what* you can do, an “Activity” is the instruction for *how* to do it.

## The Two-List Architecture

The agent system uses two different lists (or registries) to keep the description of a capability separate from how it actually works:

- **Tool Registry**: This holds the descriptions of what `Tools` look like and what they promise to do.
- **Activity Registry**: This holds the actual code (`Activities`) that does the work for the `Tools`.

Think of it like a restaurant menu and the kitchen. The menu (`Tool Registry`) just tells you there's a dish called a “cheeseburger.” In the kitchen (`Activity Registry`), there's a real recipe and a chef who knows how to make it. Keeping them separate is the key to making the system flexible. It allows `Tools` to work in an “imagined” mode (where the AI makes up a result) and also makes it easy to change the recipe in the kitchen without changing the name of the dish on the menu.

## Registering an Activity

An “Activity” is registered under a unique name that connects it to a “Tool.”

```typescript
// Register the Activity's code.
// The name 'weatherCheck' should match the Tool it's for.
Activity.register('weatherCheck', async call => {
  const data = await weatherAPI.get(call.location);
  return { temperature: data.temp, conditions: data.desc };
});
```

## Execution Modes: Latent and Explicit

The system can handle a request for a `Tool` in two completely different ways:

- **Latent Execution**: This uses the AI's ability to reason. The agent sort of “thinks through” the task and makes up an answer. It’s like asking a really smart friend what the weather is in Paris, and they use their general knowledge to give you an answer without actually looking it up. This is the default mode if no matching `Activity` is found for a `Tool`.
> Sidenote: [104: Concept/Latent](./104_concept_latent.md)
- **Explicit Execution**: This is when the request is handed off to real code. The “Activity” function is called, and it calculates a real result. This is like your friend pulling out their phone, opening the weather app, and telling you the exact forecast. This mode is necessary for talking to the real world (websites, databases) or for tasks that need to be 100% accurate.

## How the System Chooses a Mode

The system figures out which mode to use on its own, without any complicated settings. The `_activity` field in a `Tool`'s design is a signal that there's real code for it. Here’s how the system decides:

1.  **Directly told via `_activity`**: If the `Tool`'s description has a name written in the `_activity` field, the system looks for an “Activity” with that name on its list.
2.  **Matching Names (the recommended way)**: If the `_activity` field is empty, the system looks for an “Activity” whose **name is an exact match** for the `Tool`'s name. If it finds one, they're linked.
3.  **Fallback (Latent Mode)**: If nothing is found using the first two rules, the system decides there's no real code for this `Tool` and asks the AI to “imagine” the result.

This approach makes building things much simpler:

- **For an easy setup, just give your “Activity” the same name as your “Tool.”**
- `Tools` that you haven't written code for yet will safely work in latent mode.
- If you need to, you can use `_activity` to point to a different name, which lets one piece of code (an `Activity`) do the work for several different `Tools`.

## Why Separating Activities is So Important

If we didn’t separate the `Tool` description from the `Activity` code, they would be permanently stuck together. To change how a tool works (for example, switching from the AI imagining the weather to using a real weather website), we would have to find and rewrite every single agent that uses that `Tool`.

The two-list architecture solves this. The `Tool` description (the menu) stays the same, while its implementation (the recipe in the kitchen) can change. Agents always see the same “menu” and don’t know how the dish is being made. This means:

- **Code changes don't break agents**: You can switch from “latent” to “explicit” mode without touching the agent's code.
- **You can test different approaches**: You can compare whether it’s better for the AI to imagine an answer or to use a real service.
- **Smooth updates**: You can roll out a new `Activity` code for just some agents, while others keep using the old version or the latent one.

## From Description to Action

By separating the “what” (`Tool`) from the “how” (`Activity`), the system becomes incredibly flexible. But that’s only part of the story. Now that we have descriptions and the code that makes them work, there's one last piece: managing everything. How are tool requests organized, run, and chained together?

The next document, [004: Agent/Call](./004_agent_call.md), will cover the protocol that manages this process, turning abstract descriptions into concrete actions.