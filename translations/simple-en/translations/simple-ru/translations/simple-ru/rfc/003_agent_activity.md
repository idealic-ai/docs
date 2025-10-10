# 003: Agent/Activity

> **Activity:** This is the real, working code that does what a “Tool” promises. Remember how we said a Tool is like a button on a remote? Well, an **Activity is what actually happens inside the TV when you press that button**. Activities are needed to do things in the real world, like checking the weather online or looking something up in a database. It’s the stuff an AI can’t just “imagine.” — [Glossary](./000_glossary.md)

> Sidenote: - Requires: [002: Agent/Tool](./002_agent_tool.md)
>

Last time, we talked about “Tools”—the descriptions of *what* our agent can do. Now, let’s talk about “Activities”—the actual code that does the work. If a “Tool” is an item on a menu, then an “Activity” is the **recipe in the kitchen**.

## Menu and Kitchen: Two Different Lists

To keep things flexible, the system separates the “what can be done” from the “how to do it.” It does this by keeping two separate lists:

- **Tool List (The Menu):** This stores all the descriptions: what “buttons” exist and what they promise to do.
- **Activity List (The Kitchen):** This is where the real code lives—the “recipes” that actually do the work.

Imagine you're at a restaurant. The menu (`Tool List`) tells you there’s a “cheeseburger.” In the kitchen (`Activity List`), there’s a real chef with a recipe who knows how to make it. This separation is super important! It means we can easily change the recipe in the kitchen (like using a new sauce), but the item on the menu, “cheeseburger,” stays the same.

## Adding a “Recipe” to the Kitchen

To let the “kitchen” know about a new recipe, we “register” it. We give it a name that connects it to an item on the “menu.”

```typescript
// We're telling the system, "Hey, here's the recipe for 'weatherCheck'!"
// The name 'weatherCheck' must be the same as the Tool's name,
// so the system knows this recipe is for that specific tool.
Activity.register('weatherCheck', async call => {
  // this is the code that goes to the internet for the weather
  const data = await weatherAPI.get(call.location);
  // and this part returns the temperature and description
  return { temperature: data.temp, conditions: data.desc };
});
```

This code is a lot like the chef who actually goes and cooks the dish when someone orders it.

## Two Ways to Work: “Invent” or “Do”

When an agent uses a Tool, the system can act in one of two ways:

- **“Invent” (Latent Mode):** In this mode, the AI just “imagines” the result. It's like asking your super-smart friend, “What do you think the weather is like in Paris?” Based on everything they know, they’ll just come up with a believable answer without actually looking it up online. The system does this when there’s no real “recipe” in the kitchen for a Tool.
  > Sidenote: - [104: Concept/Latent](./104_concept_latent.md)
- **“Do” (Explicit Mode):** This is the real deal. The request is sent to the “kitchen,” where the chef (the “Activity” code) does the actual work. It's like your friend pulling out their phone, opening the weather app, and telling you the exact forecast. This mode is necessary when you need accuracy or have to connect to the real world—like a website or a database.

## How the System Decides Whether to “Invent” or “Do”

The computer decides what to do on its own, and it's very simple. It acts like a detective looking for the right “recipe” in the “kitchen.”

1.  **First, it looks for a direct hint.** The Tool's description (on the “menu”) might have a special `_activity` field that says, “Use the recipe with this exact name.”
2.  **If there’s no hint, it looks for a matching name (the easiest way).** The computer looks at the Tool’s name (like `weatherCheck`) and searches for a “recipe” with the exact same name. If it finds one, hooray, they're connected!
3.  **If nothing is found.** If there’s no hint and no matching name, the system sighs and tells the AI, “Okay, looks like we don’t have a recipe for this. Just invent something!”—and switches to “invent” mode.

This makes everything very simple:

- **Want to connect a Tool and an Activity? Just give them the same name.**
- Tools that you haven’t written code for yet will safely work in “imagination” mode.
- And if you need to, you can use the same “recipe” for different items on the “menu” just by putting its name in the hint.

## Why Do We Need This Separation Between “Menu” and “Kitchen”?

Imagine if the recipe was printed right on the menu. If the chef came up with a better way to make a burger, they’d have to reprint every single menu in the restaurant! That's a huge pain.

Keeping the “Tool” (menu) and “Activity” (kitchen) separate solves this problem. The agents (the customers) only ever see the menu. They don’t care how the chef actually cooks their order. This gives us superpowers:

- **You can improve the “recipes” without changing the agents.** You can switch from “inventing” the weather to getting it from a real website, and no agent will even notice—they’ll just start getting more accurate answers.
- **It's easy to test.** You can give one group of agents the old recipe and another group a new one to see which works better.
- **You can update smoothly.** You can start by just describing a Tool and letting the AI “invent” the answers, and then write the real code (“recipe”) later when you have time.

## From Idea to Result

So, we’ve separated the “what to do” (`Tool`) from the “how to do it” (`Activity`). This makes the system powerful and flexible.

But that’s not all! We have a “menu” and a “kitchen.” But someone has to take the orders from the customers and give them to the chefs, right?

We’ll talk about this “waiter”—the system that manages calls and turns ideas into real results—in the next document: [004: Agent/Call](./004_agent_call.md).