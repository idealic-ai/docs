# 003: Agent/Activity

> **Activity:** A specific, step-by-step instruction that tells a `Tool` how to do its job. It's the recipe for actions that need to connect to the outside world, like looking up information on the internet or checking a database—things the AI can't do just by “thinking.” — [Glossary](./000_glossary.md)

> Sidenote: Requires: [002: Agent/Tool](./002_agent_tool.md)
>

This document explains the **Activity Protocol**. It’s the set of rules for how `Tools` get their power from real, runnable code. If a `Tool` is a button, the `Activity` is the wiring that makes the button actually do something.

## The Two-List Architecture

The agent system uses two separate lists to keep the idea of a job separate from the instructions for doing it:

- **Tool Registry**: This is a list of all the possible *jobs* an AI can do (the “what”). Think of it like a restaurant menu listing all the available dishes.
- **Activity Registry**: This is a list of the actual *recipes* for how to do each job (the “how”). It’s the kitchen’s recipe book.

Keeping these separate is what makes the system so flexible. You can change a recipe (like using a new weather service) without having to reprint the entire menu. Your agents can keep ordering the same dish without knowing the kitchen changed how it’s made.

## Registering an Activity

You give each `Activity` (the recipe) a unique name. This name is how a `Tool` (the menu item) finds its matching instructions.

```typescript
// This is how you register a recipe (an Activity).
// The name 'weatherCheck' must match the Tool it's for.
Activity.register('weatherCheck', async call => {
  const data = await weatherAPI.get(call.location);
  return { temperature: data.temp, conditions: data.desc };
});
```

## Ways to Work: Thinking vs. Doing

When an AI is asked to use a `Tool`, it can work in two different ways:

- **Latent Execution (Thinking)**: The AI just uses its own brain to figure out the answer. It's like asking a friend, “What’s the weather probably like in summer?” and they give you an intelligent guess based on what they know. This is the default mode if a `Tool` doesn’t have a specific `Activity` (a recipe) to follow.
  > Sidenote: [104: Concept / Latent](./104_concept_latent.md)
- **Explicit Execution (Doing)**: The system follows a specific recipe (`Activity`) step-by-step. This is like using a weather app on your phone. The app runs code to connect to a real weather service and get the exact, live temperature. This is necessary for jobs that need real-world data or perfect, repeatable logic.

## The Strategy for Finding a Recipe

The system is smart and doesn't need a lot of setup to figure out whether to “think” or “do.” When a `Tool` is used, it follows these simple rules to find its recipe:

1.  **Direct Order**: If the `Tool`’s definition specifically says, “Use the recipe named ‘X’,” the system will find and use that recipe.
2.  **Matching Names (The Simple Way)**: If there’s no direct order, the system looks for a recipe (`Activity`) with the **exact same name** as the `Tool`. If it finds one, it uses it. This is the recommended approach.
3.  **Fallback to Thinking**: If it can't find a matching recipe using the rules above, it defaults to “thinking” mode (Latent Execution). The AI will just try to come up with the answer on its own.

This simple, by-the-rules approach makes things easy for developers:

- **For a setup that just works, give your `Activity` the same name as your `Tool`.**
- `Tools` that don't have a matching recipe will safely and automatically rely on the AI's own intelligence.
- You can always override this by putting a direct order in a `Tool`’s definition, which lets one powerful recipe serve many different tools.

## Why Separating Activities is Important

Without separating the `Tool` (the what) from the `Activity` (the how), the description of a job would be permanently stuck to the instructions for doing it. If you wanted to switch from the AI guessing the weather to using a real weather website, you’d have to find and update every single agent that uses that `Tool`.

Our two-list architecture solves this. The `Tool` stays the same, while the `Activity` behind it can change. Agents just talk to the `Tool`, and they don't need to know if the answer comes from the AI's brain or from an external recipe. This means:

- **Changes Don’t Break Agents**: You can switch from the “thinking” mode to the “doing” mode without touching any of your agent's code.
- **A/B Test Your Strategies**: You can test whether the AI's brain or a specific recipe works better for the same job.
- **Roll Out Changes Safely**: You can give a new recipe to just some of your agents, while the rest keep using the old one or the AI's brain.

## From Definition to Action

By separating “what” a `Tool` is from “how” an `Activity` does it, the system becomes incredibly flexible. But that’s only part of the story. Once we have the menu and the recipes, the final piece is the conductor: how do we manage these requests, run them, and decide what order they happen in?

The next document, [004: Agent/Call](./004_agent_call.md), covers the protocol that manages this process, turning abstract ideas into concrete, stateful actions.