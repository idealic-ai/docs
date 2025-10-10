# 002: Agent/Tool

> **Tool**: Think of a Tool as a recipe card for a special skill that a computer brain (an AI agent) can use. The recipe tells the AI what the skill is, what ingredients (information) it needs, and what it will make. The AI can choose to use this skill by filling out the recipe with specific ingredients. That filled-out recipe is called a `Call`, which is then sent off to be made, either by the AI's own thinking or by a separate program (`Activity`). — [Glossary](./000_glossary.md)

> Sidenote: *   You need to read this first: [001: Agent/Request](./001_agent_request.md)
> *   This document goes together with: [003: Agent/Activity](./003_agent_activity.md)

This document explains the Tool — the basic blueprint that lets AI agents understand and use different skills.

## What Are Tools?

**Tools are the most important part** of how an AI agent does things. They give the agent a brand new power: **choosing the right action at the right time**. This lets the agent look at a situation and decide the best thing to do.

Tools are like:

*   **Clear Instructions**: They are blueprints that describe a skill so the agent can understand it.
*   **No Guessing**: They clearly say what information they need and what they will give back.
*   **Like LEGOs**: You can combine simple tools to build more complex and interesting agent behaviors.
*   **Perfect for AIs**: They are designed in a way that computer brains (Language Models or LLMs) can think about and choose from them.

When an agent decides to use a Tool and gives it all the information it needs, it creates a **Call**. A Call is like a complete order form—it's a specific request for an action to happen (you can read more about how Calls work in [004: Agent/Call](./004_agent_call.md)).

> **Note**: You can ask an AI to do simple things by giving it a basic request (an Idea). But when you need the AI to do more complex things, like choosing between different actions, you use Tools. You can even turn simple Ideas into powerful Tools by adding instructions for the inputs it needs. See [007: Agent/Input](./007_agent_input.md) for more on that.

## When Should You Use the Tool System?

You should use Tools when you want an AI agent to:

*   **Choose actions on the fly** based on what's happening.
*   **Pick from many different skills** to finish a job.
*   **Use different ways to do the same thing** (like using Google or DuckDuckGo to search).
*   **Mix its own thinking with rules from a program** when it makes decisions.

## How the Tool System Works

### Main Idea: The Blueprint is Just a Plan

The whole Tool system is based on one simple rule: **Tools are just blueprints**. They describe what a skill does, but they don't say *how* to do it. The actual work is done either by the AI's own brain or by a specific piece of code called an **[003: Agent/Activity](./003_agent_activity.md)**.

Imagine a recipe card. The card (`Tool`) tells you what you're making, what ingredients you need, and what the final dish will look like. But the card itself doesn't cook anything. The cooking is done by a chef (an `Activity` or the AI's own ability).

A Tool's blueprint specifies:

> Sidenote: Can be extended by:
>
> *   [010: Agent/State](./011_agent_state.md)
>     *   `_outputPath`
> *   [011: Agent/Instancing](./011_agent_instancing.md)
>     *   `_instance`
> *   [009: Agent/Module](./009_agent_module.md)
>     *   `_module`

*   **What the tool does** (a description).
*   **What it needs** (the ingredients, or input information).
*   **What it makes** (the `_output`, or final result).
*   **What it's called** (the `_tool` name).
*   **How to do it** (the `_activity` field, which points to the chef who can cook it. See [003: Agent/Activity](./003_agent_activity.md) for more).

### Special System Fields in the Blueprint

Tool blueprints have special fields that start with an underscore (`_`). These are like "for office use only" notes for the computer system:

*   **`_tool`**: The unique name for this tool (required).
*   **`_activity`**: Points to the `Activity` (the program) that should run this tool, if any. You can read about how this works in [003: Agent/Activity](./003_agent_activity.md).
*   **`_output`**: The blueprint for the expected result.
*   **`_reasoningForCall`**: A place where the agent can write down *why* it decided to use this tool.

Any field without an underscore is a normal piece of information the tool needs. The system always lists the special underscore fields first so the AI can easily understand the blueprint.

### What the System Manages

The Tool system takes care of:

*   Keeping a list of all available Tools (the blueprints).
*   Helping the AI pull the right information from a conversation to fill out a Tool's blueprint.
*   Deciding whether the AI should figure out the answer itself or pass the request to a special program (`Activity`).

Other parts of the system build on this to manage long conversations and complex workflows, using the [004: Agent/Call](./004_agent_call.md) as the basic action.

## How to Define a Tool

Tools are defined using a format called JSON Schema. The example below shows a `Tool` that can figure out if a piece of text is happy, sad, or neutral. This tool doesn't need a separate program because the AI is already good at understanding language. It can do this one on its own.

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

## Putting Tools Together to Create a Call

While one Tool is handy, the real magic happens when you give the AI a whole toolbox. The system can show the AI all the available `Tool` blueprints at once. The AI then looks at the problem and picks the best `Tool` for the job. When the AI chooses a `Tool` and fills in the information it needs, it creates a **Call**—a specific, ready-to-go action. The `Call` is the main thing that gets passed along to be carried out.

> Sidenote: *   [004: Agent/Call](./004_agent_call.md).

## Two Ways to Get Things Done: Thinking vs. Doing

A `Tool` blueprint by itself is just a plan. When it's time to actually do the work, it can happen in one of two ways.

1.  **Thinking (Latent Execution)**: This is the default. The AI uses its own built-in knowledge to come up with the answer. This is great for tasks that involve language, ideas, or general knowledge.

2.  **Doing (Explicit Execution)**: For actions that need to interact with the real world—like looking something up on a website or getting information from a database—the `Tool` needs to be connected to a real program. This program is called an **Activity**.

The separation of the `Tool` (the what) from the `Activity` (the how) is super important. It means the AI can think about its skills in general terms, while the programs that do the actual work can be changed or updated separately. The next document, **[003: Agent/Activity](./003_agent_activity.md)**, explains how `Activities` provide the real-world power for `Tools`.

> Sidenote: *   [003: Agent/Activity](./003_agent_activity.md).
>
