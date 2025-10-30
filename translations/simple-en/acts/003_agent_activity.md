# 003: Agent/Activity

> [!DEFINITION] [Activity](./000_glossary.md)
> An :term[Activity]{canonical="Activity"} is the real code that does the work for a :term[Tool]{canonical="Tool"}. Think of a :term[Tool]{canonical="Tool"} as a button on a controller that says "Check Weather." The :term[Activity]{canonical="Activity"} is the actual program inside that connects to a weather service and gets the temperature.

> Sidenote:
> - You should read this first: :term[002: Agent/Tool]{href="./002_agent_tool.md"}

The **Activity Protocol** is the set of rules for how a :term[Tool]{canonical="Tool"}'s description gets connected to real, working code. While a :term[Tool]{canonical="Tool"} describes *what* can be done, an :term[Activity]{canonical="Activity"} provides the *how*.

## The Two-Book System

The agent uses a clever system with two separate lists, like two different books, to keep things organized:

- **:term[Tool Registry]{canonical="Tool"}**: This is like a restaurant's menu. It lists all the available :term[Tool]{canonical="Tool"}s and describes what they do.
- **:term[Activity Registry]{canonical="Activity"}**: This is like the chef's secret recipe book. It contains the actual code (:term[Activities]{canonical="Activity"}) that gets the job done for each item on the menu.

Keeping these two separate is what makes the whole system so powerful. It means you can have a :term[Tool]{canonical="Tool"} on the menu where the AI just imagines the result (like guessing the weather). Or, you can switch out the recipe—maybe use a different weather service—without having to reprint the whole menu.

## How to Add a New Activity

When you create an :term[Activity]{canonical="Activity"}, you're basically writing a new recipe and giving it a name so it can be linked to a :term[Tool]{canonical="Tool"} on the menu. The code for the recipe receives three key ingredients:

- **`call`**: This is the specific order. It contains all the details for the job, like "check the weather for 'Paris'," and might include special instructions (which start with `_`).
- **`tool`**: This is the menu description for the item being made. It lets the recipe check what the final result is supposed to look like.
- **`context`**: These are special notes from the main conversation, like a list of previous questions. The system is very careful and only passes the exact information the :term[Activity]{canonical="Activity"} asked for, so it doesn't get distracted by the whole chat history.

::::columns
:::column{title="The Recipe (Activity Code)"}

```typescript
// Writing the recipe for an Activity.
// It's easiest to give the recipe the same name as the menu item.
// The system is smart enough to figure out the types from the Tool.
Activity.register('weatherCheck', async (call, tool, context) => {
  const data = await weatherAPI.get(call.location);
  return { temperature: data.temp, conditions: data.desc };
});
```

:::
:::column{title="The Menu Item (Tool Description)"}

```typescript
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

## Two Ways to Get an Answer: Guessing vs. Knowing

The system has two different ways to handle a request for a :term[Tool]{canonical="Tool"}:

- **Guessing (Latent Execution)**: The AI uses its own vast knowledge to "think" of an answer and gives it to you right away. This is the default if it can't find a real recipe for a :term[Tool]{canonical="Tool"}.
  > Sidenote:
  > - :term[104: Concept/Latent]{href="./104_concept_latent.md"}
- **Knowing (Explicit Execution)**: The request is handed off to real, predictable code. An :term[Activity]{canonical="Activity"} (the recipe) is run to figure out the answer. This is necessary when you need to talk to the real world (like a website) or need a perfectly accurate result.

## How It Decides Which Method to Use

The system has a simple, automatic way to choose between guessing and knowing whenever a :term[Tool]{canonical="Tool"} is used. It looks for a special `_activity` note in the :term[Tool]{canonical="Tool"}'s description to see if there's a recipe it should follow.

1.  **A Specific Note**: If the :term[Tool]{canonical="Tool"}'s description includes an `_activity` field with a name in it, the system uses that name to find the recipe in the recipe book.
2.  **Matching Names (Recommended)**: If there's no `_activity` note, the system just looks for a recipe that has the **exact same name** as the :term[Tool]{canonical="Tool"}. If it finds one, it links them automatically.
3.  **Fallback to Guessing**: If neither of the above works, the system assumes there's no recipe and tells the AI to guess the answer (latent execution).

This makes things very easy for developers:

- **For simple setup, just give your recipe (`Activity`) the same name as your menu item (`Tool`).**
- Any :term[Tool]{canonical="Tool"} you create without a matching recipe will automatically work by having the AI guess the answer.
- You can always override this by adding an `_activity` note to the :term[Tool]{canonical="Tool"}, which is useful if you want one recipe to handle several different menu items.

## Teamwork with Other Parts of the System

An :term[Activity]{canonical="Activity"} doesn't work alone. It relies on other system rules to get the information it needs in a safe and organized way.

- **:term[Call]{canonical="Call"}:** The `call` ingredient is the full order ticket given to the :term[Activity]{canonical="Activity"}. It's more than just the basic details; it can include extra instructions like `_outputPath` (where to save the result) or `_instance` (which specific item to work on if you ordered many). This allows a simple recipe to be part of a much bigger, more complex process.

  > Sidenote:
  > - :term[004: Agent/Call]{href="./004_agent_call.md"}
  > - :term[008: Agent/Output]{href="./008_agent_output.md"}
  > - :term[013: Agent/Instancing]{href="./013_agent_instancing.md"}

- **:term[Scopes]{canonical="Scope"}:** The `context` ingredient is filled using the :term[Scopes]{canonical="Scope"} rules. Think of this like a permission slip. The request for a :term[Tool]{canonical="Tool"} must include a `_scopes` list that says exactly which parts of the conversation history (like the user's last message) the :term[Activity]{canonical="Activity"} is allowed to see. This keeps information secure and prevents the :term[Activity]{canonical="Activity"} from being confused by irrelevant details.

  > Sidenote:
  > - :term[015: Agent/Scopes]{href="./015_agent_scopes.md"}

## Why This Separation Is a Big Deal

If we didn't separate the menu (:term[Tool]{canonical="Tool"}) from the recipe book (:term[Activity]{canonical="Activity"}), the description of what a tool does would be stuck forever to the code that does it. If you wanted to switch from having the AI guess the weather to using a real weather website, you'd have to find and update every single agent that uses that weather tool.

By keeping them separate, the menu item stays the same, even if the recipe changes. Agents always ask for the same :term[Tool]{canonical="Tool"}, whether it's the AI guessing the answer or a real piece of code looking it up. This means:

- **Upgrades don't break things**: You can switch from AI guessing to a real API call, and the agent won't even notice.
- **Easy testing**: You can test two different ways of getting the answer (AI vs. real code) to see which one works better.
- **Safe updates**: You can roll out a new recipe to just a few agents to test it, while everyone else keeps using the old one.

## From a Plan to Action

By separating the "what" (:term[Tool]{canonical="Tool"}) from the "how" (:term[Activity]{canonical="Activity"}), the system becomes incredibly flexible. But that's not the whole story. Now that we have a menu of options and recipes to make them, the last piece of the puzzle is managing all the orders: deciding which jobs to run, in what order, and keeping track of them.

The next document, :term[004: Agent/Call]{href="./004_agent_call.md"}, explains how the system handles this process, turning simple descriptions into real, organized actions.