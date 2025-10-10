# 002: Agent/Tool

> **Tool**: A blueprint that describes a special ability an agent can use. It's given to the main AI like a recipe card, explaining what an action does and what ingredients it needs. The AI uses a tool by creating a `Call`—which is like filling out the recipe card with the specific ingredients. This `Call` is then either handled by the AI's own brain or by a special function called an `Activity`. — [Glossary](./000_glossary.md)

> Sidenote: Required: [001: Agent/Request](./001_agent_request.md)
> - Complemented by: [003: Agent/Activity](./003_agent_activity.md)

This document explains what a Tool is. Think of it as a basic blueprint that lets smart agents understand and use different abilities.

## What are Tools?

**Tools are the most important part** of how agents take action. They give agents a new superpower: **choosing the right action at the right time**. This lets an agent look at a situation and decide the best thing to do.

Tools provide:

- **Clear Instructions**: Blueprints that agents can discover and understand.
- **Rules for Safety**: Strict rules about what kind of information goes in and comes out, so there are no mistakes.
- **Building Blocks**: Like LEGO bricks that can be snapped together to create more complex agent behaviors.
- **AI-Friendly Format**: Blueprints that the main AI (the LLM) can read and choose from.

When an agent decides to use a Tool and gives it all the information it needs, it creates a **Call**. A Call is like a filled-out order form—it's a specific, ready-to-go request to perform an action. (You can learn more about how Calls are handled in [004: Agent/Call](./004_agent_call.md)).

> **Note**: You can think of almost any request to an AI as a simple Idea, which is great for just creating content. But Tools are needed for more complex situations where an agent has to choose between different actions. You can learn more about how Ideas can be turned into Tools in [007: Agent/Input](./007_agent_input.md).

## When to Use a Tool System

Use a Tool system when you need your agents to:

- **Choose actions on their own**, based on what's happening.
- **Pick from several different abilities** to reach a goal.
- **Use different ways to do the same thing** (like using Google or Bing to search the web).
- **Mix the AI's smart thinking with definite, hard-coded rules** to make decisions.

## How the Tool System Works

### The Main Idea: The Blueprint is the Interface

The whole Tool system is built on one simple idea: **Tools are just blueprints** (schemas) that describe what an action does. They don't include the instructions for *how* to do it. The *how-to* part is handled either by the AI's own brainpower or by a specific piece of code called an **[003: Agent/Activity](./003_agent_activity.md)**.

It’s like a light switch on the wall. The switch plate is the blueprint. It tells you, "This is a switch, you can flip it." It's the interface. It doesn't tell you how the wiring in the wall works. The actual wiring is the implementation, or the `Activity`.


A Tool's blueprint defines:

- **What the tool does** (its description)
- **What it needs** (the information, or `parameters`, it requires)
> Sidenote: Extensions:
>

- `_instance`: See [011: Agent/Instancing](./011_agent_instancing.md)
- `_module`: See [009: Agent/Module](./009_agent_module.md)
- **What it creates** (the `_output` structure, or the result)
- **What it's called** (its `_tool` name)
- **How it gets done** (the `_activity` field, which you can read about in [003: Agent/Activity](./003_agent_activity.md))

### Special Labels on the Blueprint

Tool blueprints use special labels (they start with an underscore `_`) to define system-level details:

- **\_tool**: The unique name for the tool, like a serial number (required).
- **\_activity**: Points to the `Activity` (the how-to instructions) that should run this tool, if any. See how this works in [003: Agent/Activity](./003_agent_activity.md).
- **\_output**: Describes what the result should look like.
- **\_reasoningForCall**: A note left by the agent explaining *why* it decided to use this tool.

Any other label without an underscore is considered a piece of information the tool needs to work. The special `_` labels always come first so the AI can understand the blueprint easily.

### What the System Is in Charge Of

The Tool system has three main jobs:

1.  **Keeping a list of all available Tools** (like an app store for abilities).
2.  **Helping the AI fill in the blanks** for a tool, using the information it has.
3.  **Deciding how to get the job done** – either by letting the AI think it through or by handing it off to a specific `Activity`.

Bigger systems (like [004: Agent/Call](./004_agent_call.md)) build on top of this to manage workflows, keep track of what's happening, and set rules for how actions get run.

## How to Define a Tool

Tools are defined as blueprints in a format called JSON Schema. The example below shows a `Tool` for analyzing the mood of a sentence (is it happy, sad, or neutral?). This tool relies on the AI's built-in understanding of language, so it doesn't need a separate set of instructions (`Activity`).

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

## Putting Tools Together to Make a Call

One tool is useful, but the real magic happens when you give the AI a whole toolbox. The system shows the AI all the available `Tool` blueprints at once. This lets the AI look at all its options and pick the best one for the situation. When the AI chooses a `Tool` and provides the information it needs, it creates a **Call**. A Call is the final, ready-to-go command that gets sent off to be executed.

> Sidenote: - [004: Agent/Call](./004_agent_call.md).
>

## Two Ways to Get Things Done: Thinking vs. Doing

A `Tool` blueprint is just an interface. The actual work of a `Call` can happen in two ways.

The first way is **thinking it through (implicit execution)**. Here, the AI uses its own brainpower to come up with the output. This is perfect for things that involve language or knowledge.

The second way is **taking action (explicit execution)**. For things that need to interact with the real world—like searching a website or accessing a database—the `Tool` must be connected to a specific piece of code. This real-world implementation is called an **Activity**.

Separating the `Tool` (the what) from the `Activity` (the how) is a very important design choice. It lets us define an agent's abilities in a general way, while allowing the step-by-step instructions for those abilities to be changed or updated separately. The next document, **[003: Agent/Activity](./003_agent_activity.md)**, explains how `Activities` provide the real-world logic for `Tools`.

> Sidenote: - [003: Agent/Activity](./003_agent_activity.md).
>