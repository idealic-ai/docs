# 003: Agent/Activity

> **Activity:** This is the real, working code that actually does what a “Tool” promises. Think of it like a recipe a chef uses. You need an Activity when you have to do something in the real world—like check the weather online, look something up, or do any task the AI can't just invent an answer for. — [Glossary](./000_glossary.md)

> Sidenote: - Requires: [002: Agent/Tool](./002_agent_tool.md)
>

This document explains the **Activity Protocol**. It’s about how “Tools” (the ideas of what can be done) are connected to real, working code. If a “Tool” is the *description* of what you want to do, an “Activity” is the set of *instructions* for how to actually do it.

## The Two-List System

The system uses two separate lists to keep the description of a skill separate from the real-world code that performs it:

- **Tool List**: This is like a restaurant menu. It just describes what the Tools are and what they promise to do (e.g., “Get today’s weather”).
- **Activity List**: This is like the kitchen’s recipe book. It holds the actual code (the “recipes”) that does the work for each Tool.

Imagine you have a menu (`Tool List`) that offers a “cheeseburger.” In the kitchen (`Activity List`), a chef has a specific recipe for how to cook that cheeseburger. Keeping the menu and the recipe book separate is super important. It means the AI can “imagine” what a cheeseburger is like without needing a real one, and it also lets the chef change the recipe in the kitchen without having to reprint all the menus.

## Adding a New Activity

You add an “Activity” to the system by giving its code a unique name that connects it to a “Tool.”

```typescript
// This is where you add the Activity's code.
// The name 'weatherCheck' has to match the Tool it's for.
Activity.register('weatherCheck', async call => {
  const data = await weatherAPI.get(call.location);
  return { temperature: data.temp, conditions: data.desc };
});
```

## How It Works: Imagination vs. Reality

The system can handle a request for a Tool in two completely different ways:

- **Imagination Mode (Latent Execution)**: The AI uses its brain to guess the answer. It's like asking a smart friend, “What’s the weather in Paris?” and they just tell you what they think it would be based on what they know, without looking it up. This is the default mode if the system can't find any real code for a Tool.
  > Sidenote: - [104: Concept/Latent](./104_concept_latent.md)
- **Real-World Mode (Explicit Execution)**: This is when the request is sent to actual code. The “Activity” recipe is followed, and it produces a real result. This is like your friend pulling out their phone, opening a weather app, and telling you the exact temperature. You need this for anything that interacts with the real world (like websites) or needs to be perfectly accurate.

## How the System Decides Which Mode to Use

The system figures this out automatically. The secret is a little note called `_activity` in a Tool’s blueprint that signals it has real code. Here’s how it decides:

1.  **Check for a Special Note**: If the Tool description has a note in its `_activity` field, the system looks for an Activity recipe with that specific name.
2.  **Match the Name (The Easy Way)**: If there's no special note, the system looks for an Activity recipe that has the **exact same name** as the Tool. If it finds one, it connects them.
3.  **Use Imagination (Fallback Mode)**: If it can’t find a match using the first two rules, the system assumes there’s no real code and asks the AI to “imagine” the result.

This makes building things much easier:

- **For most things, just give your Activity the same name as your Tool.**
- Tools you haven't written the code for yet will still work in “imagination” mode, so nothing breaks.
- You can use the `_activity` note to have one set of code (one Activity) work for many different Tools.

## Why This Separation Is a Big Deal

If we didn't separate the Tool's description from the Activity's code, they would be stuck together forever. To change how something is done (like switching from the AI “imagining” the weather to using a real weather website), you’d have to find and rewrite every single agent that uses that Tool.

By having two separate lists, we solve this. The Tool description (the menu) stays the same, while the code (the recipe) can be swapped out. The agents only ever look at the menu, so they don't even know the recipe has changed. This means:

- **Updating code won’t break your agents**: You can switch from “imagination” mode to “real-world” mode without changing your agents at all.
- **You can test different versions**: You can easily compare whether the AI’s guess or a real service gives better results.
- **You can update things gradually**: You can give new Activity code to some of your agents while the rest keep using the old version or the “imagined” one.

## From Idea to Action

By separating the “what” (Tool) from the “how” (Activity), we get a system that’s super flexible. But that's not the whole story. Now that we have ideas and the code to make them real, the final piece is managing it all: how requests to tools are organized, run, and connected to each other.

The next document, [004: Agent/Call](./004_agent_call.md), will explain the system that manages this process, turning simple ideas into real actions.