# 002: Agent/Tool

> **Tool**: Think of this as a blueprint or a recipe for a special power that an AI agent can use. This recipe is shown to the smart AI as part of its instructions, explaining what it can do. The AI “activates” the tool by creating a `Call` with the specific details. That call is then carried out either “in the AI’s head” or by a special computer program (`Activity`). — [Glossary](./000_glossary.md)

> Sidenote: - Requires: [001: Agent/Request](./001_agent_request.md)
> - Complemented by: [003: Agent/Activity](./003_agent_activity.md)

This document explains what a Tool is. It’s the basic building block that lets agents understand and use different abilities.

## What are Tools?

**Tools are like a collection of recipes for a chef**. They give an agent an awesome new power: **to choose the right action depending on the situation**. This lets agents figure out the best way to handle any task.

Imagine an agent is a chef in a kitchen. The Tools are its recipes.

Each recipe (Tool) gives you:

- **Clear instructions**: A description of the ability, so the agent knows what it does.
- **A list of ingredients**: Exactly what it needs to work (inputs) and what you’ll get at the end (outputs).
- **A way to mix and match**: You can combine recipes to make a complicated meal. In the same way, an agent can combine tools to solve big problems.
- **Easy for an AI to read**: The recipes are written so that a smart AI can read them, understand them, and pick the right one for the job.

When an agent picks a recipe (a Tool) and adds the specific ingredients (fills in the details), it creates a **Call**. A Call is like putting in an order for a specific dish to be made. To learn more about how this order gets cooked, check out the document [004: Agent/Call](./004_agent_call.md).

> **Note**: Any simple request to an AI can be thought of as an Idea. But Tools are needed for more complex situations where an agent has to choose what to do on its own. You can read about how Ideas can turn into Tools in [007: Agent/Input](./007_agent_input.md).

## When to Use a Tool System

Use Tools when you want your agent to be able to:

- **Choose its own actions** based on what’s happening.
- **Pick from several different abilities** to reach a goal (like searching on Google or searching on Wikipedia).
- **Use different methods** to do the same thing (like using different search engines).
- **Mix smart AI thinking with clear, set rules** when making a decision.

## How the Tool System Works

### The Main Idea: A Tool is Just a Blueprint

The Tool system is built on one big idea: **Tools are just descriptions, like a blueprint**. They tell you *what* you can do, but not *how* to do it. The actual work is done either by the smart AI itself (like it’s thinking) or by a separate program called an **[003: Agent/Activity](./003_agent_activity.md)**.

The blueprint of a Tool describes:

- **What the tool does** (description)
- **What it needs to work** (input parameters)
  > Sidenote on Extensions:
  >
  > - `_instance`: See [011: Agent/Instancing](./011_agent_instancing.md)
  > - `_module`: See [009: Agent/Module](./009_agent_module.md)
- **What you get as a result** (the `_output` structure)
- **What it's called** (the `_tool` name)
- **Who does the work** (the `_activity` field, explained more in [003: Agent/Activity](./003_agent_activity.md))

### Special System Fields in a Tool's Blueprint

In the blueprints for Tools, there are special fields that start with an underscore (`_`). These are for the system to use:

- **_tool**: The tool's unique name (required).
- **_activity**: Says which `Activity` (program) should run this tool, if one is needed. How the system finds it is described in [003: Agent/Activity](./003_agent_activity.md).
- **_output**: A description of what we expect to get as a result.
- **_reasoningForCall**: The agent’s explanation for why it chose to use this specific tool (this is added by the system).

Any field without an underscore is a normal parameter that the tool needs to do its job. The special system fields always come first to make it easier for the AI to understand them.

### What the System Handles

The Tool system is in charge of:

- Keeping track of all the Tools (storing their blueprints).
- Filling in the details for a tool (when the AI pulls the right information from a conversation).
- Sending the tool off to be used (deciding if the AI will handle it “in its head” or pass it to a special `Activity` program).

More complicated things, like managing a list of tasks, are built on top of this system (for example, the [004: Agent/Call](./004_agent_call.md) protocol).

## Defining a Tool

Tools are described using a format called JSON Schema. The example below shows a `Tool` for figuring out the mood of a sentence (is it positive or negative?). This `Tool` is designed for “implicit execution,” which means it relies on the AI’s own knowledge and skills and doesn’t need a separate program to run.

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

Even though each Tool describes a single ability, their real power comes from using them together. The system shows the AI all the available `Tools` at once, like laying out a whole toolbox. This lets the AI choose the best tool for that exact moment. When the AI picks a `Tool` and gives it all the information it needs, it creates a **Call**—a command that’s ready to go. This `Call` is what gets passed along to be executed.

> Sidenote: - [004: Agent/Call](./004_agent_call.md).
>

## Implicit vs. Explicit Execution

A `Tool` itself is just a set of instructions. But making a `Call` happen can be done in two ways. The default way is **implicit execution**: the AI uses its own built-in knowledge to come up with the result. This is great for tasks that involve language or general knowledge.

But for actions that need to connect to the outside world—like searching the internet or looking something up in a database—the `Tool` needs to be linked to a real program. This type of clear, hands-on execution is called an **Activity**.

Separating the instructions (`Tool`) from the person doing the work (`Activity`) is a key idea. It lets the agent think about its options first, and then decide exactly how to use them. It also means you can easily swap or update the program that does the work without having to change the description of the ability itself. The next document, **[003: Agent/Activity](./003_agent_activity.md)**, will explain how `Activities` get the job done for `Tools`.