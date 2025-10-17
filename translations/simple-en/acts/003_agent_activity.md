# 003: Agent/Activity

> [!DEFINITION] :term[Activity]
> An Activity is like the engine inside a tool. If a :term[Tool] is the button on a remote control, the Activity is the code that actually changes the channel. It's a specific, separate piece of code that does a real-world job, like calling an online service, checking a database, or any other task the AI can't just “think up” on its own.

> Sidenote:
> *   You should read this first: :term[002: Agent/Tool]{href="./002_agent_tool.md"}

This paper explains the **Activity Protocol**, which is the set of rules for how :term[Tool]s get their power from real, working code. While a :term[Tool] describes *what* a special ability can do, an :term[Activity] is the code that *actually does it*.

## The Two-Library System

The system uses two different libraries to keep a tool's description separate from its real code. Think of it like a cookbook:

*   **:term[Tool Registry]**: This is the **recipe index**. It lists all the available dishes (:term[Tool]s) and what they are, like "Chocolate Chip Cookies."
*   **:term[Activity Registry]**: This is the **instruction section**. It holds the actual step-by-step instructions (the :term[Activities]) for how to make each dish.

Separating them like this is super useful. It means an AI can know about a :term[Tool] and even try to guess the outcome on its own ("latent-only mode"). It also means you can swap out the recipe — maybe use a different, better one for the same cookies — without having to change the recipe index at all.

## Linking an Activity to a Tool

An :term[Activity] is given a unique name so it can be linked up with its matching :term[Tool].

::::columns
:::column{title="The Activity's Code"}

```typescript
// This code creates the actual 'weatherCheck' Activity.
// Usually, an Activity is linked to a Tool with the same name.
// The system is smart enough to figure out what kind
// of information it needs from the Tool's description.
Activity.register('weatherCheck', async call => {
  const data = await weatherAPI.get(call.location);
  return { temperature: data.temp, conditions: data.desc };
});
```

:::
:::column{title="The Tool's Description"}

```typescript
// This code describes the 'weatherCheck' Tool.
Tool.register('weatherCheck', {
  type: 'object',
  description: 'Gets the current weather for a location.',
  properties: {
    _tool: { type: 'string', const: 'weatherCheck' },
    location: { type: 'string' },
    _output: {
      type: 'object',
      properties: {
        temperature: { type: 'number' },
        conditions: { type: 'string' },
      },
      required: ['temperature', 'conditions'],
    },
  },
  required: ['location'],
});
```

:::
::::

## Two Ways of Working: Imagined vs. Real

The system can use a :term[Tool]'s special ability in two very different ways:

*   **Imagined Execution**: The AI uses its own brainpower to figure out the answer. It “thinks through” the problem and gives you the result directly, all in one go. This is the default way it works if it can't find any real code (:term[Activity]) for a :term[Tool].
  > Sidenote:
  > *   Learn more about the AI's 'imagination': :term[104: Concept/Latent]{href="./104_concept_latent.md"}
*   **Real Execution**: The system passes the job to actual, solid code. It runs the :term[Activity] function to get the answer. This is necessary for talking to the outside world (like websites or databases) or for doing things that need to be perfectly accurate and repeatable every time.

## How It Decides Which Way to Go

The system has a simple, automatic way to choose between using its imagination or running real code. It looks at a special property in the :term[Tool]'s description called `_activity`.

1.  **Direct Instructions**: If the :term[Tool]'s description has an `_activity` property with a name in it, the system uses that name to find the right code in the :term[Activity] library.
2.  **Matching Names (Recommended)**: If there's no `_activity` property, the system looks for an :term[Activity] with the **exact same name** as the :term[Tool]. If it finds one, it links them up automatically.
3.  **Imagination as a Backup**: If it can't find a matching :term[Activity] using the first two rules, it assumes there is no real code for this :term[Tool] and decides to handle it using its imagination.

This smart setup makes things easy for developers:

*   **Just give your :term[Activity] the same name as your :term[Tool], and it will just work.**
*   :term[Tool]s that don't have real code will safely and automatically be handled by the AI's imagination.
*   You can always override this by directly telling a :term[Tool] which :term[Activity] to use, which is useful if one piece of code can handle several different tools.

## Why This Separation is a Big Deal

If we didn't separate the :term[Tool]'s description from the :term[Activity]'s code, a tool's purpose would be stuck forever to how it works. To change from having the AI imagine the weather to using a real weather website, you'd have to find every program that uses that weather :term[Tool] and change it.

This two-library system solves that problem. The :term[Tool] description stays the same, while the real code behind it can be changed or updated. The programs using the :term[Tool] never know the difference. This means:

*   **Upgrades don't break things**: You can switch from imagined to real code without rewriting your programs.
*   **Easy testing**: You can test two different ways of getting something done (like the AI's guess vs. a real website) and see which one works better.
*   **Slow, safe updates**: You can give a new, real-world :term[Activity] to a few programs to test it out, while everyone else keeps using the old version.

## From Idea to Action

By separating the “what” (the :term[Tool]) from the “how” (the :term[Activity]), the system becomes incredibly flexible. But that's not the whole picture. Now that we have descriptions of what to do and the code for how to do it, the last step is making it all happen: managing, running, and organizing these actions.

The next document, :term[004: Agent/Call]{href="./004_agent_call.md"}, explains the rules for how these actions are brought to life.