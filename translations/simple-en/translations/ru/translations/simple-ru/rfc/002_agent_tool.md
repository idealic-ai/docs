# 002: Agent/Tool

> **Tool**: Think of it like a blueprint for a special power an agent can use. This blueprint is shown to a smart AI as part of its instructions, explaining what it can do. The AI “activates” the tool by creating a `Call` with specific details. This `Call` is then carried out, either in the AI’s “mind” or by a special computer program (`Activity`). — [Glossary](./000_glossary.md)

> Sidenote: Requires: [001: Agent/Request](./001_agent_request.md). Complemented by: [003: Agent/Activity](./003_agent_activity.md).
>

This document explains what a Tool is — the basic building block that lets agents understand and use different abilities.

## What are Tools?

**Tools are like a superhero's set of powers.** They give an agent an awesome new ability: **to choose the right action for any situation**. This lets agents pick the perfect way to handle any task.

Imagine an agent is a chef in a kitchen. The Tools are its recipe book.

Each recipe (Tool) provides:

- **Clear instructions**: A description of the power, so the agent understands what it does.
- **A list of ingredients**: Exactly what it needs to work (inputs) and what it will create (outputs).
- **The ability to combine**: Recipes can be combined to make a big, fancy meal. In the same way, an agent can combine tools to solve complex problems.
- **Easy for the AI to understand**: The recipes are written in a way that the smart AI can read, understand, and choose the right one.

When an agent picks a recipe (a Tool) and adds all the real ingredients (fills in the details), it creates a **Call**. A Call is like an order placed in the kitchen, ready to be cooked. To learn more about how that order gets made, check out the document [004: Agent/Call](./004_agent_call.md).

> **Sidenote**: Any simple request you make to an AI can be thought of as an Idea. But Tools are for more complex situations where the agent needs to figure out what to do on its own. You can read about how Ideas can become Tools in [007: Agent/Input](./007_agent_input.md).

## When to Use a Tool System

Use Tools when you want your agent to be able to:

- **Choose its own actions** based on what's happening.
- **Pick from several different powers** to reach a goal (like searching on Google or searching on Wikipedia).
- **Use different methods** to do the same thing (like using different search engines).
- **Mix its own thinking with specific rules** when making decisions.

## How the Tool System Works

### The Core Idea: The Blueprint is Just a Description

The Tool system is built on one simple idea: **A Tool is just a description, a blueprint.** It says *what* can be done, but not *how* to do it. The actual work is done either by the AI model itself (in its “mind”) or by a separate program called an **[003: Agent/Activity](./003_agent_activity.md)**.

The Tool's blueprint describes:

- **What the tool does** (description)
- **What it needs to work** (input parameters)
> Sidenote: About extensions:
>
> - `_instance`: See [011: Agent/Instancing](./011_agent_instancing.md)
> - `_module`: See [009: Agent/Module](./009_agent_module.md)
- **What you get in the end** (the `_output` structure)
- **What it's called** (the `_tool` name)
- **Who does the work** (the `_activity` field, explained more in [003: Agent/Activity](./003_agent_activity.md))

### System Fields in a Tool's Blueprint

Tool blueprints have special fields that start with an underscore (`_`). These are for the system to use:

- **_tool**: The tool's unique name (required).
- **_activity**: Tells the system which `Activity` (program) should run this tool, if one is needed. How the system finds it is explained in [003: Agent/Activity](./003_agent_activity.md).
- **_output**: A description of what the final result should look like.
- **_reasoningForCall**: A note from the agent explaining why it decided to use this specific tool (this is added by the system).

Any field without an underscore is a normal input the tool needs to do its job. The system fields always come first to make it easier for the AI to understand.

### System Boundaries

The Tool system is responsible for:

- Keeping track of all available Tools (storing their blueprints).
- Filling in the details for a tool (when the AI pulls information from text).
- Directing the work (deciding if the AI will handle it “in its mind” or pass it to a special `Activity` program).

More complicated things, like managing big projects and keeping track of progress, are built on top of this system (for example, the [004: Agent/Call](./004_agent_call.md) protocol).

## Defining a Tool

Tools are written down as a JSON Schema. The example below shows a `Tool` for figuring out the mood of a piece of text (is it positive or negative?). This `Tool` is designed for “in-mind execution,” meaning it relies on the AI's own knowledge and skills and doesn't need a separate program.

```typescript
Tool.register('sentimentAnalysis', {
  type: 'object',
  description: 'Analyzes the sentiment of a text',
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

While each Tool describes a single power, their real strength comes from being used together. The system shows the AI all available `Tools` at once, like laying out a toolbox. This allows the AI to pick the best one for the job. When the AI chooses a `Tool` and gives it all the needed information, it creates a **Call**—a command that's ready to go. This `Call` is then passed on to be executed.

> Sidenote: [004: Agent/Call](./004_agent_call.md).

## In-Mind vs. Real-World Execution

A `Tool` itself is just an instruction. But a `Call` can be executed in two ways. The default way is **in-mind execution**: the AI uses its own internal knowledge to come up with the result. This is great for tasks involving language or general knowledge.

But for actions that need to interact with the outside world—like searching the internet or looking something up in a database—the `Tool` needs to be connected to a real program. This kind of real-world execution is called an **Activity**.

This separation between the instruction (`Tool`) and the person doing the work (`Activity`) is a key idea. It lets the agent first think about its powers in a general way and then decide exactly how to use them. Plus, the actual program doing the work can be easily swapped or updated without changing the description of the power. The next document, **[003: Agent/Activity](./003_agent_activity.md)**, will explain how `Activities` get the job done for `Tools`.