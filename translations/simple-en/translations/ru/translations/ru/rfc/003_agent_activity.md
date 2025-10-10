# Act 003: Agent/Activity

> **Activity:** This is the real, predictable code that makes a `Tool` work. It's the engine that performs actions like calling outside websites, working with databases, or any other job that the AI can't do just by thinking. — [Glossary](./000_glossary.md)



This document describes the **Activity Protocol**, which explains how `Tools` are backed by actual, runnable code. If a `Tool` describes *what* you can do, the `Activity` is *how* you actually do it.

## The Dual Registry Architecture

The system uses two separate lists to keep the description of a capability separate from the code that makes it work:

- **Tool Registry**: A list of all the `Tools` and what they do.
- **Activity Registry**: A list of the actual code functions (`Activities`) that carry out the `Tools`' jobs.

Think of it like a restaurant. The **Tool Registry** is the menu—it lists all the dishes you can order. The **Activity Registry** is the kitchen—it has the chefs and recipes to actually cook those dishes. This separation is key. It lets you have items on the menu that the AI just "imagines" making (latent mode), and it also lets you swap out the recipe in the kitchen without having to reprint the whole menu.

## Registering an Activity

You register an `Activity` with a unique name, which is used to link it to a `Tool`.

```typescript
// Register the code for the Activity.
// The name 'weatherCheck' should match the Tool it's for.
Activity.register('weatherCheck', async call => {
  const data = await weatherAPI.get(call.location);
  return { temperature: data.temp, conditions: data.desc };
});
```

## Execution Modes: Latent and Explicit

The system has two different ways to handle a `Tool` `Call`:

- **Latent Execution**: This uses the AI's ability to reason. The agent "thinks through" the task and gives back a result without running any outside code. This is the default if a `Tool` doesn't have matching `Activity` code.

- **Explicit Execution**: This hands the `Call` over to real, predictable code. The `Activity`'s function is run to figure out the result. This is necessary for anything that needs to interact with the outside world (like websites or databases) or for tasks that need to be perfect and repeatable every time.

## The Activity Resolution Strategy

The system uses a simple, no-setup-needed strategy to decide which mode to use when a `Tool` is called. A special field called `_activity` in the `Tool`'s design signals that it wants to use real code. This field is filled in automatically based on these rules:

1.  **Explicit `_activity` Field**: If the `Tool`'s definition itself includes a non-empty `_activity` name, the system uses that name to find the `Activity` code.
2.  **Same Name Convention (Recommended)**: If the `_activity` field is missing, the system checks if an `Activity` was registered with the **exact same name** as the `Tool`. If it finds one, it automatically links them.
3.  **Fallback to Latent Execution**: If no matching `Activity` is found using the rules above, the `_activity` field is set to be empty, signaling that the `Call` should be handled by the AI's imagination (latent mode).

This simple approach makes things easy for developers:

- **For zero setup, just give your `Activity` code the same name as your `Tool`.**
- `Tools` without any matching `Activity` code will safely and automatically default to being handled by the AI.
- You can always override this by explicitly putting an `_activity` name in the `Tool`'s design, which is useful if you want one piece of `Activity` code to handle several different `Tools`.

## Why Separating Activities is Important

If we didn't separate the `Tool` definitions from the `Activity` code, the description of a feature would be permanently stuck to the code that runs it. Imagine you wanted to switch from having the AI "guess" the weather to using a real weather website. You'd have to find and change every single agent that uses that `Tool`.

By having two separate registries, the `Tool`'s description can stay the same while the code behind it changes. Agents talk to the same `Tool` 