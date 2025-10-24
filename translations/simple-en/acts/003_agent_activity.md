# 003: Agent/Activity

> [!DEFINITION] [Activity](./000_glossary.md)
> An :term[Activity]{canonical="Activity"} is a piece of real code that does a job for a :term[Tool]{canonical="Tool"}. Think of a :term[Tool]{canonical="Tool"} as a button on a remote, and an :term[Activity]{canonical="Activity"} as the wiring inside that makes the button actually change the channel. It’s used for things the AI can’t just think up, like getting real-time information from the internet or a database.

> Sidenote:
> - To understand this page, you should first know about: :term[002: Agent/Tool]{href="./002_agent_tool.md"}

The **Activity Protocol** is the set of rules for connecting these real code workers (:term[Tool]{canonical="Tool"}s) to the tool descriptions (:term[Tool]{canonical="Tool"}s). While a :term[Tool]{canonical="Tool"} describes *what* can be done, an :term[Activity]{canonical="Activity"} provides the code that *how* to do it.

## The Two-List System

The whole system uses two separate lists to keep the description of a tool separate from the code that makes it work.

- **:term[Tool Registry]{canonical="Tool"}**: A list that stores the blueprints for all the :term[Tool]{canonical="Tool"}s (what they do, what they need).
- **:term[Activity Registry]{canonical="Activity"}**: A list that stores the actual code functions (:term[Activities]{canonical="Activity"}) that carry out the jobs for the :term[Tool]{canonical="Tool"}s.

Separating them is what makes the system so flexible. It's like having a restaurant menu separate from the kitchen. The menu (:term[Tool Registry]{canonical="Tool"}) tells you what you can order. The kitchen (:term[Activity Registry]{canonical="Activity"}) is where the chefs (the code) actually cook your food. You can change a recipe in the kitchen without having to reprint the whole menu.

This means :term[Tool]{canonical="Tool"}s can be used in two ways: either the AI can just pretend to know the answer, or you can plug in different real-world code to get the answer, like switching between a practice kitchen and a real one for a big event.

## Registering an Activity

You tell the system about a new :term[Activity]{canonical="Activity"} by giving it a unique name. This name is how you connect it to a :term[Tool]{canonical="Tool"}.

::::columns
:::column{title="The Activity Code"}
This is like writing the recipe for the chef.

```typescript
// Tell the system about an Activity (the worker code).
// The easiest way is to give the Activity the same name as the Tool.
// The system can then figure out the details from the Tool's blueprint.
Activity.register('weatherCheck', async call => {
  // Go to the real weather service and get data
  const data = await weatherAPI.get(call.location);
  // Give back the result
  return { temperature: data.temp, conditions: data.desc };
});
```

:::
:::column{title="The Matching Tool Blueprint"}
This is the description on the menu.

```typescript
Tool.register('weatherCheck', {
  type: 'object',
  description: 'Gets the current weather for a location.',
  properties: {
    _tool: { type: 'string', const: 'weatherCheck' },
    // It needs to know the location
    location: { type: 'string' },
    // And this is what the result should look like
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

## How It Works: Thinking vs. Doing

The system has two completely different ways of handling a request for a :term[Tool]{canonical="Tool"}:

- **Thinking It Through (Latent Execution)**: The AI uses its own brain to come up with an answer. The agent "imagines" what the output should be and gives it to you right away. This is the default if there's no real code hooked up to the :term[Tool]{canonical="Tool"}.
  > Sidenote:
  > - Learn more about "Thinking it Through" here: :term[104: Concept/Latent]{href="./104_concept_latent.md"}
- **Actually Doing It (Explicit Execution)**: The request is handed off to a real piece of code. An :term[Activity]{canonical="Activity"} function is called to get a real-world result. You have to use this method for talking to the outside world (like websites or databases) or for doing math that needs to be perfectly correct every time.

## How it Decides Which Way to Go

The system automatically figures out whether to "think" or "do" when a :term[Tool]{canonical="Tool"} is used. It looks at a special field called `_activity` in the :term[Tool]{canonical="Tool"}'s blueprint. Here's how it decides:

1.  **Direct Instructions**: If the :term[Tool]{canonical="Tool"}'s blueprint has an `_activity` field with a name in it, the system uses that name to find the right worker code in the registry.
2.  **Matching Names (Recommended)**: If there are no direct instructions, the system checks if there's an :term[Activity]{canonical="Activity"} in the registry with the **exact same name** as the :term[Tool]{canonical="Tool"}. If it finds one, it automatically wires them together.
3.  **Fallback to Thinking**: If it can't find a matching :term[Activity]{canonical="Activity"} using the rules above, it sets the `_activity` field to be empty. This tells the system to just have the AI "think" up an answer instead.

This simple system makes building things much easier:

- **Just give your :term[Activity]{canonical="Activity"} and your :term[Tool]{canonical="Tool"} the same name, and they'll automatically connect.**
- :term[Tool]{canonical="Tool"}s that don't have any real worker code will safely use the AI's imagination by default.
- You can always give a direct instruction in the :term[Tool]{canonical="Tool"}'s blueprint if you want one piece of code to handle many different :term[Tool]{canonical="Tool"}s.

## Why This Separation is a Big Deal

If we didn't separate the :term[Tool]{canonical="Tool"} blueprints from the :term[Activity]{canonical="Activity"} code, a tool's description would be stuck forever to how it works. To change from having the AI guess the weather to using a real weather website, you would have to find and change every single AI agent that uses that weather :term[Tool]{canonical="Tool"}.

By keeping them in two separate lists, the :term[Tool]{canonical="Tool"} blueprints stay the same, even if you completely change the code that runs behind them. AI agents use the same simple :term[Tool]{canonical="Tool"} description, and they don't care if the answer comes from the AI's imagination or from a real-world :term[Activity]{canonical="Activity"}. This means:

- **You can change the code without breaking the AI**: You can switch from the AI guessing to using real code, and the agent won't even notice.
- **You can test different approaches**: You can easily compare how well the AI guesses an answer versus how well the real code performs.
- **You can update things slowly**: You can give a new :term[Activity]{canonical="Activity"} to just a few agents to test it out, while everyone else keeps using the old version.

## From Idea to Action

By separating the "what" (the :term[Tool]{canonical="Tool"}) from the "how" (the :term[Activity]{canonical="Activity"}), the system becomes incredibly powerful and flexible. But this is just one part of the puzzle. Now that we have the blueprints (Tools) and the workers (Activities), we need a manager to tell them what to do.

The next document, :term[004: Agent/Call]{href="./004_agent_call.md"}, explains how all these requests are managed, run, and organized into a series of steps, turning ideas into real actions.