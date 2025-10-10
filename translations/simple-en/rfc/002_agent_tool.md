# 002: Agent/Tool

> **Tool**: Imagine you have a robot helper (an Agent). A Tool is like an app on a smartphone or a special power-up in a video game that you can give to your robot. It's a clear set of instructions telling the robot's brain (the AI) what the power-up does and how to use it. To use it, the AI creates a "Call," which is like tapping the app icon with the right information filled in. This action is then carried out either by the AI's own brain or by a separate helper program.

> Sidenote:
>
> - You should read this first: [001: Agent/Request](./001_agent_request.md)
> - This goes well with: [003: Agent/Activity](./003_agent_activity.md)

This guide explains Tools — the instruction manuals that let our robot helpers understand and use different skills.

## What Are Tools?

**Tools are the most important part** of letting our robot helpers do things in the world. They give the robot a new ability: **choosing the right action at the right time**. This means the robot can look at a situation and decide the best thing to do.

Tools give our robots:

- **Clear Instructions**: Each skill has a rulebook (called a schema) that the robot can read to understand it.
- **No Mistakes**: The rules make sure the robot uses the right kind of information, like using a number when a math tool needs a number.
- **Building Blocks**: You can combine simple tools to create more powerful and complex robot behaviors, just like LEGO bricks.
- **AI-Friendly**: The instruction manuals are written in a way that the AI brain can understand and make choices about them.

When a robot decides to use a Tool and fills in all the information it needs, it creates a **Call**. A Call is like a filled-out order form, ready to be sent off to get something done. (You can learn more about how that works in [004: Agent/Call](./004_agent_call.md)).

> **Note**: Sometimes, you just want the AI to create something simple, like a poem or a list. For that, you can use something called an Idea. But when you need the robot to choose between different actions and do more complicated things, you need Tools. You can even turn Ideas into Tools!

## When Should You Use Tools?

You should give your robot helper a set of Tools when you want it to:

- **Choose what to do on its own**, based on what's happening.
- **Pick from many different skills** to finish a task.
- **Use different versions of the same skill** (like choosing to search with Google or another search engine).
- **Mix its own thinking with help from other computer programs** to make smart decisions.

## How the Tool System Works

### The Main Idea: Every Tool is an Instruction Manual

The most important rule for the Tool system is this: **A Tool is just the instruction manual, not the machine that does the work.** The manual explains what can be done, but it doesn't do it. The actual work is handled either by the AI's own thinking or by a special piece of code called an **[Activity](./003_agent_activity.md)**.

A Tool's instruction manual (its schema) tells you:

- **What the tool does** (a simple description).
- **What it needs to work** (the information you have to give it).
- **What it gives you back** (the `_output` or result).
- **What it's called** (its `_tool` name).
- **How the work gets done** (the `_activity` field tells it if a helper program is needed).

### Special Labels in the Instruction Manual

Tool manuals use special labels that start with an underscore (`_`) to tell the system important things. Think of them as notes for the robot's operating system.

- **`_tool`**: The tool's unique name, like a name tag.
- **`_activity`**: A note that says which helper program, if any, should do the work for this tool.
- **`_output`**: A description of what the result will look like.
- **`_reasoningForCall`**: A spot where the robot writes down *why* it decided to use this tool at this moment.

Any other field without an underscore is just a normal piece of information the tool needs to work. The special labels always come first so the AI's brain can easily read them.

### What the System Manages

The Tool system takes care of:

- **Keeping Track of Tools**: It holds all the instruction manuals for every available tool.
- **Filling Out the Forms**: It helps the AI's brain pull information from a conversation to fill in what a tool needs.
- **Directing Traffic**: It decides whether the AI should do the work with its own brain or if it needs to pass the job to a helper program (an `Activity`).

The system gives us these basic building blocks. Other parts of the program then use them to manage an entire project, keep track of what's happening, and decide how to run a series of actions.

## Creating and Adding a New Tool

To give a robot a new skill, you create an instruction manual for it using a format called JSON Schema.

### A Simple Tool (The AI Does the Work)

This tool doesn't have a separate helper program. The AI's brain will handle the job all by itself. Think of it as a skill the robot can perform just by thinking.

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
This manual describes a tool called `sentimentAnalysis`. It needs a piece of `text` and will give back a result with a `sentiment` (like "happy" or "sad") and a `confidence` score.

### A Tool with a Helper Program (An Activity Does the Work)

This kind of Tool is designed to be carried out by a separate piece of code, called an `Activity`. This is for things the AI can't do on its own, like checking the real-world weather. To see how to build the helper program, check out the [guide on Activities](./003_agent_activity.md).

```typescript
// Define the tool schema
// See docs/rfc/003_agent_activity.md
```

### Putting the Manuals Together

When the robot needs to make a decision, the system gathers up all the instruction manuals for the tools it has and presents them to the AI's brain as a list of choices. This allows the brain to look at all its available skills and even decide to use several of them at once.

```typescript
{
  // ... existing code ...
}
```

## Tools are Just the Beginning

Tools are the **very first building block** for making smart robots that can take action. They answer the question, "*What can be done?*" through their simple instruction manuals.

The next part, [003: Agent/Activity](./003_agent_activity.md), explains *how the work actually gets done with code*. And [004: Agent/Call](./004_agent_call.md) shows *how different actions are organized and run together* to complete big projects.