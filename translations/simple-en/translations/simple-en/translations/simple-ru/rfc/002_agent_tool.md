# 002: Agent/Tool

> **Tool**: Imagine a Tool is a recipe for a special power an AI can use. This recipe is shown to the AI as part of its instructions, explaining what it can do. The AI uses the Tool by making a `Call`, which is like filling out the recipe with specific ingredients. This Call is then carried out either by the AI thinking about it, or by a separate computer program (`Activity`). — [Glossary](./000_glossary.md)

> Sidenote: - Before this, you should read: [001: Agent/Request](./001_agent_request.md)
> - This goes together with: [003: Agent/Activity](./003_agent_activity.md)

This document explains what a Tool is. Think of it as the basic building block that lets AI agents learn and use different abilities, like adding power-ups in a video game.

## What are Tools?

**Tools are like a superhero's set of powers**. They give an agent an amazing new ability: **to choose what to do based on the situation**. This lets agents pick the right move for any task.

Imagine an agent is a chef in a kitchen. Tools are its recipe book.

Each recipe (a Tool) gives the chef:

- **Clear instructions**: A description tells the chef what the dish is, so it knows what it does.
- **A list of ingredients**: It says exactly what it needs to work (inputs) and what it will create (outputs).
- **The ability to combine**: Recipes can be mixed and matched to make a fancy meal. In the same way, an agent can combine tools to solve big problems.
- **AI-friendly language**: The recipes are written so a smart AI can read them, understand them, and pick the one it needs.

When the chef picks a recipe (a Tool) and adds specific ingredients (fills in the details), it creates a **Call**. A Call is like an order slip for a specific dish. You can learn more about how this order gets cooked up in [004: Agent/Call](./004_agent_call.md).

> **Note**: Any simple request to an AI can be thought of as an Idea. But Tools are for more complex jobs where the agent needs to decide for itself what to do. To learn how simple Ideas can be turned into Tools, check out [007: Agent/Input](./007_agent_input.md).

## When to Use a Tool System

Use Tools when you want your AI to be able to:

- **Choose its own actions** depending on what’s happening.
- **Pick from several different powers** to reach a goal (for example, should it search Google or search a school library?).
- **Use different methods** to do the same thing (like using Google or Bing to search).
- **Mix AI thinking with plain old computer rules** when making a decision.

## How the Tool System is Designed

### The Main Idea: A Tool is Just a Blueprint

The Tool system is built on one simple idea: **Tools are just blueprints**. They say *what* can be done, but not *how* to do it. The actual work is done either by the smart AI itself (in its “mind”) or by a separate helper program called an **[003: Agent/Activity](./003_agent_activity.md)**.

A Tool's blueprint describes:

- **What the tool does** (its description)
- **What it needs to work** (the ingredients, or input parameters)
  > Sidenote on special ingredients:
  >
  > - `_instance`: Think of this like making a copy of something. See [011: Agent/Instancing](./011_agent_instancing.md)
  > - `_module`: This is like a pre-packaged kit of tools. See [009: Agent/Module](./009_agent_module.md)
- **What you get in the end** (the final dish, or `_output` structure)
- **What it’s called** (the `_tool` name)
- **Who does the work** (the `_activity` field, which points to the helper program, explained more in [003: Agent/Activity](./003_agent_activity.md))

### Special System Fields in a Tool's Blueprint

In a Tool's blueprint, some fields start with an underscore (`_`). These are special notes for the system, like key instructions on a recipe card:

- **_tool**: The unique name of the recipe (this one is required).
- **_activity**: Points to the helper program (`Activity`) that should run this tool, if one is needed. The system then knows who to give the job to.
- **_output**: A description of what the finished product should look like.
- **_reasoningForCall**: A little note from the AI explaining why it chose to use this specific tool (the system adds this automatically).

Any field without an underscore is a normal ingredient the tool needs. The special system fields always come first to make it easier for the AI to read and understand the blueprint.

### System Boundaries

The Tool system is the head chef of the kitchen. Its job is to:

- Keep a big book of all the available recipes (storing the Tool blueprints).
- Help fill out the recipe card when the AI gets an order from a user.
- Decide who does the cooking (whether the AI will handle it in its “mind” or pass it to a special helper program, the `Activity`).

More complicated things, like managing a multi-course meal and remembering what's been served, are built on top of this system (like the [004: Agent/Call](./004_agent_call.md) system).

## Defining a Tool

Tools are described using a special format, like a recipe card template. The example below shows a `Tool` for figuring out the mood of a sentence (is it happy, sad, or angry?). This `Tool` is designed for “implicit execution,” which means it relies on the AI’s own brainpower to figure out the answer and doesn’t need a separate helper program.


```typescript
Tool.register('sentimentAnalysis', {
  type: 'object',
  description: 'Analyzes the sentiment of a piece of text',
  properties: {
    _tool: { type: 'string', const: 'sentimentAnalysis' },
    text: { type: 'string', description: 'The text to analyze' },
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

## Combining Blueprints to Make a Call

While each Tool blueprint describes one power, their real strength is using them together. The system shows the AI all the available `Tools` at once, like laying out a full toolbox. This lets the AI pick the best tool for the job. When the AI chooses a `Tool` and fills in all the needed information, it creates a **Call**—a command that’s ready to be carried out. This `Call` is the final order that gets sent to the kitchen to be made.

> Sidenote: - The command that gets sent to be completed is explained in [004: Agent/Call](./004_agent_call.md).
>

## Thinking vs. Doing (Implicit vs. Explicit)

A `Tool` is just a plan. Making that plan happen is called a `Call`, and it can be done in two ways.

The default way is **implicit execution**: the smart AI uses its own knowledge to figure out the result. This is great for tasks that involve thinking, language, or general knowledge, like figuring out if a movie review is positive or negative.

But for actions that need to interact with the real world—like searching the internet or saving a file—the `Tool` needs to be connected to a real program. This is called **explicit execution**, and the program that does the work is called an **Activity**.

This separation between the plan (`Tool`) and the doer (`Activity`) is a really important idea. It lets the agent first think about its options, and then decide exactly how to carry them out. It also means you can easily upgrade the program that does the work (like getting a faster oven) without having to change the original recipe. The next document, **[003: Agent/Activity](./003_agent_activity.md)**, will explain how these helper `Activities` get things done.