# 003: Agent/Activity

> **Activity:** Think of this as the actual a program that does the work for a `Tool`. If a `Tool` is a button, the `Activity` is the machinery inside that makes the button work, especially for things the AI can't do on its own, like checking a live database or a real-world weather service.

> Sidenote:
> - Requires: [002: Agent/Tool](./002_agent_tool.md)

This document explains the **Activity Protocol**, which is the set of rules for how `Tools` (the description of a skill) are connected to real, runnable code.

## The Two-List System

The system uses two separate lists to keep the *idea* of a skill separate from the *action* of doing it:

- **Tool Registry**: A list of all the available skills, describing what they can do (e.g., "check the weather").
- **Activity Registry**: A list of the actual code programs (`Activities`) that carry out those skills (e.g., the code that connects to the weather API).

Separating them is super important. It lets the system be flexible. An AI can just *imagine* the result of a `Tool` if it needs to, or you can swap out the real-world code for a `Tool` (like switching from one weather service to another) without having to tell the AI anything new.

## How to Register an Activity

You give your `Activity` code a unique name so the system can find it and link it to a `Tool`.

```typescript
// This is how you add an Activity program to the list.
// The simplest way is to give the Activity the same name as the Tool it's for.
Activity.register('weatherCheck', async call => {
  // Go to the real-world weather service and get the data.
  const data = await weatherAPI.get(call.location);
  // Send back the result.
  return { temperature: data.temp, conditions: data.desc };
});
```

## Ways to Run a Tool: Imagined vs. Real

The system has two different ways to handle a request to use a `Tool`:

- **Imagined (Latent Execution)**: The AI uses its own brain to figure out the answer. It "thinks" about what the result of the tool *should* be and gives you a response immediately. This is the default if it can't find any real code for a `Tool`.
  > Sidenote:
  > - [104: Concept/Latent](./104_concept_latent.md)
- **Real (Explicit Execution)**: The request is handed off to a real piece of code (an `Activity`). The code runs and computes the answer. This is necessary for talking to the outside world (like websites or databases) or for doing things that need to be perfectly accurate every time.

## How the System Decides Which Way to Go

The system has a simple, automatic way to decide whether to imagine the result or run real code. It looks at a special field in the `Tool`'s description called `_activity`.

1.  **Look for a Manual Link**: If the person who made the `Tool` put a specific `Activity` name in the `_activity` field, the system uses that.
2.  **Look for the Same Name (Recommended)**: If there's no manual link, the system looks for an `Activity` in its list that has the **exact same name** as the `Tool`. If it finds one, it automatically links them.
3.  **Fall Back to Imagining**: If it can't find a matching `Activity` after checking those two things, it assumes there is no real code and decides to use the AI's imagination (latent execution).

This makes things easy for developers:

- **For things to just work, give your `Activity` code the same name as your `Tool`.**
- `Tools` that don't have real code attached to them will safely run in "imagined" mode by default.
- You can always override this by manually linking a `Tool` to an `Activity` with a different name.

## Why This Separation Is a Big Deal

If we didn't separate the `Tool` description from the `Activity` code, they would be stuck together forever. Imagine you wanted to switch from having the AI *guess* the weather to having it use a *real* weather service. You'd have to go find every single AI that uses that `Tool` and change all of them.

By keeping them separate, the `Tool` description stays the same, while the code behind it can change.

This means:

- **You don't break the AI when you update the code**: You can switch from imagined to real mode, and the AI that uses the `Tool` won't even notice.
- **You can test different approaches**: You can easily compare if the AI's guess is better or worse than the result from a real-world service for the same skill.
- **You can roll out changes slowly**: You can give the new, real code to just a few AIs to test it out, while everyone else keeps using the old version.

## From Idea to Action

By separating the "what" (`Tool`) from the "how" (`Activity`), the system becomes incredibly flexible. But this is just one piece of the puzzle. Now that we have descriptions of skills and the real code to run them, the next step is managing how these skills are called, run, and organized in a sequence.

The next document, [004: Agent/Call](./004_agent_call.md), explains the rules that turn these ideas into real, guided actions.
