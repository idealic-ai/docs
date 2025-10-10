# 002: Agent/Tool

> **Tool**: A **Tool** is like a special instruction card for an ability an AI can use. The AI reads this card to understand its new power. To use the power, the AI fills out a 'work order' called a `Call`. This order is then completed either by the AI's own smarts or by a special helper program called an `Activity`. — [Glossary](./000_glossary.md)

> Sidenote: - You should read this first: [001: Agent/Request](./001_agent_request.md)
> - Read this next: [003: Agent/Activity](./003_agent_activity.md)

This document is all about Tools. You can think of them as official instruction cards that teach an AI how to use different powers.

## What Are Tools?

**Tools are the most important pieces** for teaching an AI how to do things. They let an AI learn a new skill: **choosing the right action at the right time**. It's like giving a superhero a utility belt filled with gadgets. They can look at a problem and pick the best gadget to solve it.

Tools give us:

- **Clear Instructions**: Easy-to-read instruction manuals (called schemas) that an AI can understand.
- **Rules to Follow**: They make sure everything fits together perfectly, like making sure a key only works in the right lock.
- **LEGO Bricks**: You can snap simple tools together to build bigger, more complicated AI skills.
- **AI-Friendly Design**: The instruction manuals are specially designed so a big AI brain (like a large language model) can think about them and pick the best one for a job.

When an AI picks a Tool and fills in the necessary details (like filling out a form), it creates a **Call**. A Call is like a completed order form, ready to be sent off to get something done (you can learn more about this in [004: Agent/Call](./004_agent_call.md)).

> **Note**: Think of it this way: you can ask an AI to do simple things with just an Idea, but you need Tools when the AI has to make choices and perform actions on its own. To see how simple Ideas can be turned into powerful Tools, check out [007: Agent/Input](./007_agent_input.md).

## When Should You Use Tools?

Use the Tool system when you want your AI to:

- **Decide what to do** based on what's happening right now.
- **Choose from a big list of abilities** to finish its mission.
- **Use different flavors of the same ability**, like choosing to search with Google or with Bing.
- **Combine its own smart brain with a set of specific instructions** to make a decision.

## How Tools are Built

### The Main Idea: The Blueprint is Just a Guide

The most important thing to remember is that **Tools are just blueprints**. They explain *what* a power does, but not *how* it does it. The real work is done either by the AI's own brainpower or by a separate helper program called an **[003: Agent/Activity](./003_agent_activity.md)**.

A Tool's blueprint explains:

- **What the tool does** (a description).
- **What it needs to work** (the inputs, like the ingredients for a recipe).
  > Sidenote: Related cool stuff:
  >
  > - `_instance`: See [011: Agent/Instancing](./011_agent_instancing.md)
  > - `_module`: See [009: Agent/Module](./009_agent_module.md)
- **What it makes when it's done** (the `_output`, like the finished cake).
- **What it's called** (its `_tool` name).
- **How to run it** (the `_activity` field, which points to a helper program, explained in [003: Agent/Activity](./003_agent_activity.md)).

### Special Notes on the Blueprint

Tool blueprints have special fields that start with an underscore `_`. Think of these as special instructions for the system itself, not for the user:

- **`_tool`**: The tool's unique name. Every tool must have one.
- **`_activity`**: Points to a helper program (`Activity`) if the tool needs one to do its job. You can read about how this works in [003: Agent/Activity](./003_agent_activity.md).
- **`_output`**: Describes what the final result will look like.
- **`_reasoningForCall`**: A space for the AI to write down *why* it chose to use this tool.

Any field that doesn't have an underscore is a normal input the tool needs. The special `_` fields are always listed first to make it easy for the AI to read the blueprint.

### What the System Does

The Tool system takes care of:

- Keeping a list of all available Tools (the blueprints).
- Helping the AI fill out the blueprint using the information it's given.
- Deciding if the AI should figure out the answer on its own or use a helper program (`Activity`) to do the work.

Higher-level systems, like the [004: Agent/Call](./004_agent_call.md) system, use these basics to run big projects, remember things, and decide how tasks get done.

## Defining a Tool

Tools are written down using a special format called JSON Schema. Here’s an example of a Tool that tells you if a sentence sounds happy, sad, or just normal (this is called sentiment analysis). This Tool doesn't need a helper program because the AI's brain is smart enough to understand language on its own.

```typescript
Tool.register('sentimentAnalysis', {
  type: 'object',
  description: 'Analyzes text sentiment',
  properties: {
    _tool: { type: 'string', const: 'sentimentAnalysis' },
    text: { type: 'string', description: 'Text to analyze' },
    _output: {
      type: 'object',
      properties: {
        sentiment: { type: 'string' },
        confidence: { type: 'number' },
      },
    },
  },
});
```

## The Toolbox and The Call

While a single tool is useful, the real magic happens when you give an AI a whole toolbox of them. The system shows the AI all the instruction cards for every tool it has. This lets the AI browse all its options and pick the perfect one for the task.

When the AI chooses a Tool and fills in the required info, it creates a **Call**. A Call is a fully signed and stamped work order, ready to be sent off and completed.

> Sidenote: - [004: Agent/Call](./004_agent_call.md).
>

## Two Ways to Get the Job Done

A Tool blueprint is just an interface—a description. The actual work can be done in two ways.

1.  **Using its Brain (Latent Execution)**: This is the normal way. The AI uses its own built-in smarts and reasoning to figure out the answer. This is perfect for tasks involving language, writing, or general knowledge.

2.  **Using a Helper Program (Explicit Execution)**: For actions that need to interact with the outside world—like looking up the weather, sending an email, or checking a database—the Tool needs to be connected to a real piece of code. This chunk of code is called an **Activity**.

The separation between the Tool (the 'what') and the Activity (the 'how') is super important. It means you can describe an AI's abilities in a simple way, and later swap out the helper program that actually does the work without having to change the description.

The next document, **[003: Agent/Activity](./003_agent_activity.md)**, explains how `Activities` provide the real-world power behind the `Tools`.

> Sidenote: - [003: Agent/Activity](./003_agent_activity.md).
>
