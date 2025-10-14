# 003: Agent/Activity

> **Activity:** Think of this as the actual, step-by-step recipe that a `Tool` follows. A `Tool` might be called "Check the Weather," but the `Activity` is the real code that goes to a weather website and gets the temperature. It’s for any job that the AI can't just "think up" an answer for.

> Sidenote: - It helps to have read this first: [002: Agent/Tool](./002_agent_tool.md)

This guide explains the **Activity Protocol**, which is the system for connecting a `Tool` (the what) to the real code that actually does the work (the how).

## The Two Phonebooks System

Imagine the agent has two different phonebooks to keep things organized. This makes the whole system super flexible.

- **Tool Phonebook**: This book lists all the *skills* the agent knows about, like “check the weather” or “send an email.” It describes *what* can be done.
- **Activity Phonebook**: This book lists the actual *workers* (pieces of code) that can perform those skills. It describes *how* to do it.

By keeping these two separate, we can easily change how a skill is performed without confusing the agent. For example, we can switch from one weather service to another, and the agent won't even notice—it just knows it can still “check the weather.”

## Signing Up an Activity

To make a piece of code available, a programmer has to sign it up, or "register" it, in the Activity phonebook with a unique name. This name is how it gets linked to a `Tool`.

```typescript
// Here, we're adding a worker to the phonebook.
// The name 'weatherCheck' should match the Tool it's for.
Activity.register('weatherCheck', async call => {
  // This is the code that calls a real weather service
  const data = await weatherAPI.get(call.location);
  // It returns the answer in a neat package
  return { temperature: data.temp, conditions: data.desc };
});
```

## Ways of Getting Things Done: Thinking vs. Doing

When a `Tool` is used, the system has two ways to get an answer:

- **Thinking (Latent Execution)**: The AI uses its own giant brain to just *think* of the answer. It's like asking a really smart friend a trivia question—they just know it. This is the default if there’s no specific code to run.
  > Sidenote: - [104: Concept/Latent](./104_concept_latent.md)
- **Doing (Explicit Execution)**: The system calls on a specific worker—the `Activity` code—to perform the task. This is for things that need real, up-to-the-minute information from the outside world (like a weather API) or for math problems that have to be perfectly correct.

## How the System Decides Which Method to Use

The system is smart and doesn't need a lot of setup to figure out whether to "think" or "do." It follows these simple rules when a `Tool` is used:

1.  **Check for a Specific Order**: First, it looks at the `Tool`'s description to see if it specifically names an `Activity` to use. If it says, "Use the 'SuperWeatherChecker' code," it will do that.
2.  **Look for a Matching Name (The Easy Way)**: If there's no specific order, it looks in the Activity phonebook for a worker that has the *exact same name* as the `Tool`. So, if the `Tool` is named `weatherCheck`, it looks for an `Activity` also named `weatherCheck`.
3.  **Default to Thinking**: If it can't find a worker using the first two rules, it just tells the AI, "Okay, you're on your own. Just think of the best answer you can."

This makes life easy for programmers:

- **For most cases, just give your `Tool` and your `Activity` the same name, and it will just work.**
- `Tool`s that are just for thinking don't need an `Activity` at all.
- You can always override this by giving a specific order in the `Tool`'s description.

## Why This Separation is a Big Deal

If we didn't separate the `Tool` (the what) from the `Activity` (the how), they would be stuck together forever. Imagine if to change your weather app, you had to re-teach your phone's assistant how to ask for the weather. That would be a huge pain!

This two-phonebook system avoids that. The agent always uses the same `Tool`, so it doesn't get confused. Meanwhile, programmers can freely update, change, or test the `Activity` code in the background.

This means we can:

- **Update code without breaking the agent**: You can switch from the AI just guessing the weather to using a real-time `Activity` without having to change the agent at all.
- **Test different approaches**: You can have two different `Activities` for the same `Tool` to see which one works better.
- **Slowly roll out new features**: You can give a new, better `Activity` to some agents while others keep using the old one, just to be safe.

## From Idea to Action

By separating the "what" (`Tool`) from the "how" (`Activity`), we've made the system incredibly flexible. But there's one more piece to the puzzle. Now that we know what the agent can do and how it does it, we need to understand how all these actions are managed and organized.

The next document, [004: Agent/Call](./004_agent_call.md), explains how the system takes these ideas and turns them into real, organized actions.