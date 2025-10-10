# 002: Agent/Tool

> **Tool**: It's like a blueprint that describes an ability for our AI agent. This blueprint is shown to the big AI brain (the Large Language Model or LLM) so it knows what it can do. The model activates the tool by creating a "Call" with all the specific details. This Call is then carried out either by the model itself "in its head" (implicitly), or by a special helper program made for the job (an "Activity"). — [Glossary](./000_glossary.md)

> Sidenote: - Requires: [001: Agent/Request](./001_agent_request.md)
> - Complemented by: [003: Agent/Activity](./003_agent_activity.md)

This document explains what a Tool is. Think of it as an instruction manual or a blueprint that helps AI agents understand and use different abilities.

## What are Tools?

Imagine an agent is like a character in a video game. **Tools are its superpowers or spells.** They give the agent an awesome new ability: **to choose what to do in any situation.** Using tools, an agent can look at what's happening and decide which of its powers is the best one to use.

What Tools give you:

- **Clear instructions**: Every superpower has a simple description so the agent knows exactly what it does.
- **No mistakes**: It clearly states what information the tool needs to start and what it will give back when it's done. It's super precise.
- **LEGO builder**: You can build complex actions out of simple tool-bricks, just like with LEGOs.
- **Easy for AI to understand**: The instructions are written in a way that the AI's brain (the language model) can read, understand, and pick the right one.

When an agent decides to use a Tool and fills in all the details (like which word to translate or what picture to find), it creates a **Call**. A Call is like shouting the command, "Use this superpower right now!" You can read more about how calls are carried out in [004: Agent/Call](./004_agent_call.md).

> **Sidenote**: Any request to an AI can be thought of as a simple "Idea" (this works great for creating text or pictures). But Tools are needed for more complex jobs where the AI has to choose between different actions. You can read about how to turn an "Idea" into a "Tool" in [007: Agent/Input](./007_agent_input.md).

## When You Should Use Tools

Use the Tool system when your agent needs to:

- **Think on its feet** and choose actions based on what's happening.
- **Choose from several abilities** to reach a goal (for example, searching on Google or searching on Wikipedia).
- **Use different programs** for the same job (like using different search engines).
- **Mix AI thinking with specific commands** when making a decision.

## How the Tool System Works

### The Main Idea: A Blueprint is a Description

The whole Tool system is built on one simple idea: **Tools are just blueprints**. They describe *what* can be done, but not *how* to do it. The job of actually doing the work is handled by either the AI's brain (the language model) or a special helper program called an **[Activity](./003_agent_activity.md)**.

A Tool's blueprint specifies:

- **What it does** (a description).
- **What it needs to work** (the input data).
> Sidenote: Extensions:
>
> - `_instance`: See [011: Agent/Instancing](./011_agent_instancing.md)
> - `_module`: See [009: Agent/Module](./009_agent_module.md)
- **What it gives you as a result** (the `_output` structure).
- **What it's called** (the `_tool` name).
- **How to run it** (the `_activity` field, explained more in [003: Agent/Activity](./003_agent_activity.md)).

### Special Fields in Blueprints

Tool blueprints have special fields (they start with an underscore `_`) that contain system information:

- **_tool**: The unique name of the tool (you must have this).
- **_activity**: Points to which helper program ("Activity") should run this tool, if one is needed. Learn more about this in [003: Agent/Activity](./003_agent_activity.md).
- **_output**: A description of what we expect to get as a result.
- **_reasoningForCall**: The agent's explanation for why it decided to use this specific tool (this is added by the system).

Any field without an underscore is a normal parameter that the tool needs to do its job. The special system fields always come first to make them easier for the AI to read and understand.

### Who's Responsible for What

What the Tool system is in charge of:

- **Registering Tools**: It keeps a list of all the blueprints and their descriptions.
- **Filling in the details**: It helps the AI pull the right information from a conversation and give it to the tool.
- **Directing the work**: It decides if the AI should handle the task itself "in its head" or pass it to an outside program (an "Activity").

More complicated things, like managing chains of tasks or keeping track of progress, are built on top of this simple system (for example, the [004: Agent/Call](./004_agent_call.md) protocol).

## Defining a Tool

Tools are described using a format called JSON Schema. Here is an example of a Tool that figures out the emotion (or sentiment) in a piece of text. It's designed for the AI to handle all by itself, "in its head," because it doesn't need any outside programs to understand text.

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

## Combining Blueprints and the Call

One tool is cool, but the real magic happens when you have a bunch of them. The system shows the AI all the Tools it can use at once, like a menu in a restaurant. This lets the AI pick the best one for the job. Once the AI has chosen a Tool and filled in all the needed information, it creates a **Call**. The Call is the ready-to-go command—the main unit of action that gets passed on to be executed.

> Sidenote: - [004: Agent/Call](./004_agent_call.md).
>

## Implicit and Explicit Execution

A Tool's blueprint is just a description. The actual work of carrying out the command (the Call) can happen in two ways. The first and most common way is **implicit execution**: the AI uses its own "brain" to come up with the result. This is perfect for tasks involving language or knowledge. The second way is for when you need to interact with the real world—like visiting a website or looking something up in a database. For that, the Tool needs to be connected to a real program. This is called **explicit execution**, and the program that does the work is called an **Activity**.

This separation between the blueprint (Tool) and the doer (Activity) is a really important idea. It lets the agent first "think" about all its options in general, and then decide exactly how to use them. Plus, you can easily change or update the helper program without ever touching the blueprint. The next document, **[003: Agent/Activity](./003_agent_activity.md)**, will explain how "Activities" bring "Tools" to life.

> Sidenote: - [003: Agent/Activity](./003_agent_activity.md).