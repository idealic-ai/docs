# 003: Agent/Activity

> **Activity:** Think of an `Activity` as the real work happening behind a `Tool`. If a `Tool` is a button you can press that says "Check Weather," the `Activity` is the computer code that actually goes to a weather website to get the forecast. It’s for jobs the AI can't just know from memory, like checking a live score or talking to another website. — [Glossary](./000_glossary.md)

> Sidenote: >Sidenote: This builds on what we learned in [002: Agent/Tool](./002_agent_tool.md).
>

This document explains where `Tools` get their power. A `Tool` tells you *what* an AI can do, but an **`Activity`** is the set of instructions that explains *how* it actually does it.

## The Menu and the Recipe Book

To keep things simple and organized, the system uses two separate lists, kind of like a restaurant has a menu for customers and a secret recipe book for the kitchen.

- **Tool Registry**: This is the menu. It lists all the things the AI can do (the `Tools`) and describes them in plain English, like "Get today's weather."
- **Activity Registry**: This is the recipe book. It contains the actual step-by-step instructions (the `Activities`) that tell the computer how to perform each task on the menu.

Keeping them separate is a superpower. It means the AI can quickly look at the menu of options without needing to know every single detail of how the work gets done. It also means we can change a recipe in the kitchen—like switching to a better weather service—without having to change the menu everyone sees.

## Adding a Recipe to the Book

An `Activity` is saved with a name that connects it to a `Tool` on the menu.

```typescript
// This is like adding a new recipe to the kitchen's book.
// The name 'weatherCheck' must match the Tool on the menu.
Activity.register('weatherCheck', async call => {
  const data = await weatherAPI.get(call.location);
  return { temperature: data.temp, conditions: data.desc };
});
```

## Two Ways to Get an Answer: Guessing vs. Doing

When the AI needs to use a `Tool`, it can get the result in two different ways:

- **Imagining the Answer (Latent Execution)**: This is when the AI is so well-trained that it can just guess the answer. If you ask it, "Who was the first person on the moon?," it doesn't need to look it up; it just knows. This is the default plan if there’s no real-world recipe to follow.
  > Sidenote: >Sidenote: Curious about what "imagining" really means for an AI? Read more here: [104: Concept/Latent](./104_concept_latent.md)
- **Doing the Real Work (Explicit Execution)**: This is when the system has to run real code to find the answer. It's like asking for the score of a basketball game that's happening right now—you can't guess, you have to go check a source. This is for things that change, like today's weather, a customer's latest order, or information from another website.

## How the System Decides What to Do

The system is smart enough to figure out which method to use. It follows a simple checklist:

1.  **Check for Special Instructions**: First, it checks if the `Tool` has a special note that says, "Always use this specific recipe." If so, it does that.
2.  **Look for a Matching Name**: If there are no special notes, it looks for a recipe with the same name as the `Tool`. For a `Tool` called "weatherCheck," it looks for a recipe called "weatherCheck." If it finds one, it uses it. This is how it works most of the time.
3.  **Just Imagine**: If it still can't find a recipe after steps 1 and 2, it falls back on imagining the answer. This is a safe backup so that nothing breaks.

This makes building things super easy:

- To make a `Tool` do real work, just give the recipe (the `Activity`) the **same name**.
- If you make a `Tool` without a recipe, the AI will handle it safely by imagining.
- If you want a bunch of different `Tools` to all use the same recipe, you can use Rule #1 to point them all to it.

## Why This Separation is a Big Deal

If we mixed the menu (`Tool`) and the recipes (`Activity`) together, it would be a huge mess. Imagine if every time a chef changed an ingredient, they had to run out to the dining room and tell every single customer about it. That would be impossible!

By keeping them separate, we get some awesome advantages:

- **Recipes Can Change Anytime**: You can update the code that checks the weather, and the AI using the "weatherCheck" `Tool` won't even notice. It just keeps working with the better recipe.
- **You Can Test New Ideas**: You could have the AI imagine an answer and *also* run the real code, then compare the two results to see which is better or more accurate.
- **Roll Out Changes Safely**: You can test a new, experimental recipe by giving it to just a few AIs, while everyone else keeps using the old, trusted one.

## From Knowing to Doing

So, we've figured out *what* abilities the AI has (the `Tool`) and *how* it gets things done (the `Activity`). But that's just setting up the kitchen. The next step is to understand how the system actually manages these jobs, like taking an order and sending it to the cook at the right time.

The next document, [004: Agent/Call](./004_agent_call.md), explains how these ideas are put into action.
