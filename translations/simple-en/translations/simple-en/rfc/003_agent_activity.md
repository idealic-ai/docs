# 003: Agent/Activity

> **Activity:** Think of this as the *real code* that makes a `Tool` work. A `Tool` is like a button you can press, and an `Activity` is the set of instructions that runs when you press it. This is for jobs an AI can't just “think” its way through, like checking a real website or saving a file. — [Glossary](./000_glossary.md)



This paper explains the **Activity Protocol**, which is the rulebook for how `Tools` get their power from real, working code. While a `Tool` describes *what* you can do, an `Activity` is the code that *actually does it*.

## The Two Lists Idea

The AI system uses two different lists to keep things organized. This separates the *idea* of a skill from the *code* that actually performs the skill.

- **Tool List (The Menu)**: This is like a menu at a restaurant. It lists all the things the AI knows how to do (like “Check Weather” or “Find a Picture of a Cat”).
- **Activity List (The Kitchen's Recipe Book)**: This holds the actual recipes—the code, or `Activities`—that explain step-by-step how to do each thing on the menu.

Keeping these two lists separate is super important. It means you can have a `Tool` on the menu that the AI just “imagines” an answer for. It also means you can update a recipe in the kitchen (like using a new, better weather website) without having to reprint the whole menu.

## Signing Up an Activity

You tell the system about your code by “signing it up” with a special name. This name is what connects your code in the recipe book to the matching `Tool` on the menu.

```typescript
// This is how you sign up the code for an Activity.
// The name 'weatherCheck' should match the Tool it's for.
Activity.register('weatherCheck', async call => {
  const data = await weatherAPI.get(call.location);
  return { temperature: data.temp, conditions: data.desc };
});
```

## Two Ways to Work: Guessing vs. Doing

When the system needs to use a `Tool`, it has two ways of getting the job done:

- **Guessing (Imagining)**: The AI uses its own giant brain to think through the problem and come up with an answer all by itself. This is what it does by default if there’s no real code hooked up to a `Tool`. It's like asking a really smart friend to guess the weather based on the time of year and where you live.

- **Doing (Running Code)**: The AI runs the real, step-by-step code from the recipe book. This `Activity` code does the work and reports back with the exact result. This is for tasks that need to talk to the outside world (like looking up the *actual* weather on a website) or need to be perfectly correct every time.

## How It Decides Which Way to Go

The system has a simple, automatic rule for deciding whether to guess the answer or run the real code. It looks for a special note in the `Tool`'s description called `_activity`.

1.  **Written Instructions**: If the `Tool`'s description has a specific `_activity` name written in it (like `_activity: 'specialWeatherChecker'`), the system uses that name to find the right recipe in the Activity List.
2.  **Matching Names (The Easy Way)**: If there are no written instructions, the system just looks for a recipe (`Activity`) that has the **exact same name** as the `Tool`. If it finds one, it connects them automatically. It's like having a key labeled 'Front Door' that automatically works in the lock labeled 'Front Door'.