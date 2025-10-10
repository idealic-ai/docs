# 002: Agent/Tool

> **Tool**: Think of a tool as a recipe card that tells a smart agent about something it can do. The agent's brain (the LLM) gets this recipe and understands what's possible. To use it, the LLM creates a `Call` by filling in the ingredients (parameters). This `Call` is then completed either by the LLM just thinking about it (this is called implicit execution) or by a special function called an `Activity`. — [Glossary](./000_glossary.md)

> Sidenote: Requires: [001: Agent/Request](./001_agent_request.md). Complemented by: [003: Agent/Activity](./003_agent_activity.md).
>

This document explains the Tool — the main recipe book that helps agents understand and use their special abilities.

## What are Tools?

**Tools are what make agents smart.** They give agents a new superpower: **choosing the right action for the right situation**. This allows them to look at a problem and pick the best tool from their toolbox to solve it.

Tools give agents:

- **Clear Instructions**: Like recipe cards that agents can find and read.
- **Rules for Safety**: They explain exactly what ingredients you need to put in and what you'll get out.
- **Building Blocks**: You can combine different tools to help agents do more complicated things.
- **A Language for Brains**: They are written in a way that the agent's brain (the LLM) can understand and make decisions with.

When an agent decides which Tool to use and fills in all the necessary information, it creates a **Call**. A Call is like saying, "Okay, I'm using *this* tool with *these* settings right now." It's a ready-to-go action request. (You can learn more about how Calls work in [004: Agent/Call](./004_agent_call.md)).

> **Sidenote**: You can think of any request to an LLM as a simple Idea, which is great for creating things with clear instructions. But you need Tools for more complex jobs, where the agent has to choose between different actions. To learn how Ideas can be turned into Tools, check out [007: Agent/Input](./007_agent_input.md).

## When to Use a Tool System

Use a system of Tools when you want agents to:

- **Choose actions on the fly**, depending on what's happening.
- **Pick from many different abilities** to reach a goal.
- **Use different ways to do the same thing** (like using Google or DuckDuckGo to search the web).
- **Mix brainy thinking with step-by-step logic** to make decisions.

## How the Tool System is Built

### The Main Idea: A Blueprint is Just a Plan

The Tool system is based on one simple rule: **Tools are just blueprints.** They describe *what* something does, but not *how* to do it. The "how" is handled by one of two things: either the LLM's own brainpower (implicit execution) or a specific piece of code called an **[Activity](./003_agent_activity.md)**.

A Tool's blueprint defines:

- **What** the tool does (its description).
- **What** it needs to work (its input ingredients).
> Sidenote: About extensions: `_instance` (see [011: Agent/Instancing](./011_agent_instancing.md)) and `_module` (see [009: Agent/Module](./009_agent_module.md)).
>
- **What** it gives back when it's done (the `_output` structure).
- **What** it's called (the `_tool` name).
- **How** it gets done (the `_activity` field, which you can read about in [003: Agent/Activity](./003_agent_activity.md)).

### Special Labels on the Blueprint

Tool blueprints use special labels (they start with an "_") for system-level information:

- **_tool**: The unique name of the tool (you must have this).
- **_activity**: Points to which `Activity` (if any) should do the work. You can learn more in [003: Agent/Activity](./003_agent_activity.md).
- **_output**: The shape of the expected result (the system can make this optional).
- **_reasoningForCall**: An explanation from the agent for why it made this `Call` (the system adds this automatically).

Any field that doesn't start with "_" is considered an ingredient for the tool. When making a blueprint, the special labels always go first. This keeps everything neat and easy for the LLM to understand.

### What the System Handles

The Tool system is in charge of:

- Keeping track of all the Tools (storing their blueprints).
- Helping fill in the ingredients (using the LLM to pull information from the situation).
- Deciding who does the work (choosing between the LLM's brain or a specific `Activity`).

Bigger systems (like [004: Agent/Call](./004_agent_call.md)) use these basic pieces to manage entire workflows and keep track of everything.

## Defining a Tool

Tools are defined using simple text blueprints called JSON schemas. Here’s an example of a `Tool` that figures out if a piece of text sounds positive or negative. This tool is designed for the agent to use its own brain (implicit execution), so it doesn't need any outside help.

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

A single Tool is useful, but the real magic happens when you combine them. The system gives the LLM a whole cookbook of `Tool` blueprints. This lets the LLM flip through all its options and choose the perfect `Tool` for the current task. When the LLM chooses a `Tool` and fills in its ingredients, it creates a **Call**—a ready-to-go version of that `Tool`. The `Call` is the main thing that gets sent off to be executed.

> Sidenote: Read more in [004: Agent/Call](./004_agent_call.md).
>

## Doing Things in Two Ways: Implicit vs. Explicit

A `Tool`'s blueprint is just the plan. A `Call` made from that blueprint can be carried out in one of two ways. The default way is **implicit execution**: the LLM uses its own brainpower to come up with the result. This is great for tasks that involve language or knowledge.

But for actions that need to interact with the real world (like searching a website or getting data from a database), the `Tool` is connected to a piece of code. This hands-on approach is called an **Activity**.

Separating the plan (`Tool`) from the action (`Activity`) is a super important idea. It lets you describe what an agent *can do* without locking down *how it does it*. You can easily update or change the `Activity` later without having to change the `Tool`. The next document, **[003: Agent/Activity](./003_agent_activity.md)**, explains exactly how `Activities` bring `Tools` to life.