# 002: Agent/Tool

> **Tool**: Imagine you're giving an AI a special form to fill out. This form describes a special power the AI can use, like looking up the weather. The AI reads the form, understands what it does, and when it wants to use that power, it fills out the form with the right information (like the city for the weather). This filled-out form is called a `Call`, which then gets sent off to actually do the thing. — [Glossary](./000_glossary.md)



This document explains what a Tool is. Think of it as the basic instruction manual that lets an AI Agent understand and use its different abilities.

## What Are Tools?

**Tools are the building blocks** that let an AI Agent do things. They give the agent a special new skill: **choosing the right action at the right time**. This means the agent can look at a situation and decide the best thing to do.

Tools are like well-designed instruction manuals that are:

- **Clear and Structured**: They are like recipes with a clear list of ingredients and steps, so the agent knows exactly what it can do.
- **Safe to Use**: They clearly state what information they need (inputs) and what they will give back (outputs).
- **Mix and Match**: You can combine simple tools to create more powerful and complex agent abilities, like LEGO bricks.
- **Easy for AIs to Understand**: They are written in a way that an AI can read, understand, and decide when to use them.

When an agent decides to use a Tool and fills in all the required information, it creates a **Call**. A Call is like a completed order form—it's a specific request for an action to be performed (you can read more about how Calls are handled in [004: Agent/Call](./004_agent_call.md)).

## When to Use the Tool System

You should use Tools when you want your AI agents to:

- **Pick actions on the fly** based on what's happening.
- **Choose from a list of different powers** to get a job done.
- **Use different versions of the same ability** (for example, choosing between Google or DuckDuckGo for searching).
- **Combine the AI's smart thinking with plain old computer code** to make decisions.

## The Tool System's Design

### Main Idea: The Recipe is Not the Meal

The most important idea here is that **Tools are just the instructions, not the action itself**. A Tool is like a recipe that describes how to make a pizza. It tells you what you need (dough, sauce, cheese) but it doesn't actually cook the pizza. The cooking is handled either by the AI's own brain or by a real-world helper called an [003: Agent/Activity](./003_agent_activity.md).



A `Tool` is basically a simple checklist written in a format called JSON Schema. Any item on the checklist without an underscore `_` in front of it is an ingredient the tool needs. The system uses special items that *do* start with an underscore to control how the tool works.

A Tool's recipe file defines everything about it:



- **`title`**: A simple, human-friendly name for the recipe.
- **`description`**: A sentence explaining what the tool does, like "Figures out if a sentence is happy or sad."
- **`parameters`**: The list of ingredients (inputs) the tool needs to work.
- **`_tool`**: A unique name to make sure the system doesn't get it confused with other tools.
- **`_output`**: A description of what the final result will look like.
- **`_reasoningForCall`**: A special spot where the agent can write a note to explain why it chose to use this tool.

### What the System Manages

The Tool system takes care of:

- Keeping a list of all available Tools (the recipe book).
- Helping the AI fill out the forms with the right information.
- Letting the AI handle the request itself if it's a simple knowledge question (this is called "latent execution").

More advanced things, like managing a series of steps or deciding who gets to run which tool, are built on top of this basic system (like in [004: Agent/Call](./004_agent_call.md)).

## How to Define a Tool

Tools are defined using that checklist format, JSON Schema. Here's an example of a `Tool` that figures out the mood of a sentence. This tool is perfect for the AI to handle by itself, since understanding language is what it does best. It doesn't need an external program to help.

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

## Mixing Tools to Create a Call

While one tool is useful, the real magic happens when you give the AI a whole toolbox. The system can show the AI all the available `Tool` recipes at once. The AI then intelligently picks the best one for the job. When the AI chooses a `Tool` and fills in the necessary information, it creates a **Call**—a ready-to-go action. This `Call` is the basic unit of work that gets passed along to be executed.



## Two Ways to Get the Job Done

A `Tool` recipe, by itself, is just a plan. Making it happen can be done in two ways. The default way is **latent execution**, which means the AI just uses its own massive brain to come up with the answer. This is great for tasks involving language or general knowledge. But for actions that need to interact with the real world—like searching the web or checking a database—the `Tool` needs to be connected to a specific piece of code. This real-world helper is called an **Activity**.

Keeping the `Tool` (the plan) separate from the `Activity` (the action) is a key design choice. It lets us describe what an agent *can do* in a simple way, while allowing us to change *how it does it* behind the scenes. The next document, **[003: Agent/Activity](./003_agent_activity.md)**, explains how Activities do the actual work for Tools.

