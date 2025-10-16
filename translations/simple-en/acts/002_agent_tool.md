# 002: Agent/Tool

> [!DEFINITION] [Tool](./000_glossary.md)
> Think of a Tool as a recipe card for an AI. It describes something the AI can do, like “look up the weather,” and lists the ingredients (information) it needs. The AI reads this recipe and, if it’s the right one for the job, fills out an order form (called a `Call`) with the details. The task is then carried out either by the AI's own brainpower or by a specific piece of code (an `Activity`).

> Sidenote:
> - This builds on: [001: Agent/Request](./001_agent_request.md)
> - Works together with: [003: Agent/Activity](./003_agent_activity.md)

A `Tool` is like a blueprint that describes a special skill an AI (or agent) can use. It’s the basic building block for everything an AI does, giving it a menu of actions it can understand and choose from.

## What Are Tools?

**Tools are the most important part** of how an AI acts. They give the AI a superpower: picking the right action at the right time, based on what’s happening.

Tools are:

- **Clear Instructions**: They define skills in a way the AI can easily understand, like a fill-in-the-blank form.
- **Safe and Predictable**: They make sure the right kind of information is used for each action.
- **Like Building Blocks**: You can combine simple tools to build more complex skills, just like putting small blocks together to build a big castle.
- **Easy for AI to Use**: The instructions are written in a way that modern AI (LLMs) can read, understand, and decide which one to use.

When an AI chooses a Tool and fills in all the information it needs, it creates a **Call**. A Call is basically the AI saying, "Okay, I'm using this tool right now with this specific information."

> Sidenote:
> [004: Agent/Call](./004_agent_call.md) is the result of using a Tool.
>

## When to Use Tools

You should use Tools when you want an AI to:

- **Decide what to do on its own** based on the current situation.
- **Choose the best option** from a list of different skills.
- **Do the same task in different ways** (for example, using different search engines to find information).
- **Mix its own thinking with pre-programmed instructions** to make decisions.

## How Tools Are Made

### The Main Idea: The Blueprint is Not the Building

The most important thing to understand is that **a Tool is just the plan, not the action itself**. It describes *what* can be done but doesn't say *how* to do it. This is super useful because it means you can change how an action is performed without having to change the AI's understanding of that action.

A `Tool` is defined using a simple plan called a JSON Schema. Any field in the plan that doesn't start with an underscore `_` is a piece of information the tool needs to work. The system uses special fields (starting with `_`) to manage how the tool is identified and used.

Here’s what a Tool's blueprint includes:

> Sidenote:
> You can add extra powers to a Tool:
>
> - **`_activity`**: Connects the tool to a real piece of code to do things in the real world. ([003: Agent/Activity](./003_agent_activity.md))
> - **`_delegate`**: Hands off the job to another, separate AI agent. ([012: Agent/Delegate](./012_agent_delegate.md))
> - **`_outputPath`**: Saves the tool's result so it can be remembered and used later. ([009: Agent/State](./009_agent_state.md))
> - **`_instance`**: Tells the tool which specific item to work on when you're handling many at once. ([011: Agent/Instancing](./011_agent_instancing.md))

- **`title`**: A simple, human-friendly name.
- **`description`**: A sentence explaining what the tool does.
- **`parameters`**: The pieces of information (the “ingredients”) the tool needs to get its job done.
- **`_tool`**: A unique name so the system can identify it.
- **`_output`**: Describes what the result will look like after the tool is used.
- **`_reasoningForCall`**: A spot for the AI to write a note explaining why it chose this specific tool.

More advanced features, like managing workflows or saving results, are built on top of these basic parts.

## Example of a Tool

Tools are defined as simple blueprints. The example below shows a `Tool` that can figure out if a piece of text is happy, sad, or neutral. This tool is designed to be used by the AI's own brainpower, so it doesn't need a separate piece of code to run.

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

## Combining and Using Tools

While a single tool is useful, the real magic happens when you give the AI a whole toolbox. The system shows the AI all the available tools at once. This lets the AI look at the situation, compare all the tools, and pick the best one for the job. When it uses a tool, it creates a `Call` object.

> Sidenote:
> This leads to a **Call**, which is the AI's decision to use a specific tool with specific information. See [004: Agent/Call](./004_agent_call.md).

## Two Ways to Use a Tool

A `Tool` is just a plan. The actual work can get done in two ways. The default way is for the **AI to do it itself**. This is great for tasks that involve language or knowledge, since the AI is already an expert at that. But for actions that need to interact with the real world—like searching the internet or saving a file—the `Tool` needs to be connected to a piece of code that does the actual work. This separate piece of code is called an **Activity**.

Keeping the `Tool` (the plan) separate from the `Activity` (the action) is a key idea. It lets you define what an AI can do, while allowing you to change or update how it does it later. The next document, **[003: Agent/Activity](./003_agent_activity.md)**, explains how `Activities` bring `Tools` to life.

> Sidenote:
> The action itself is performed by an **Activity**. Read more here: [003: Agent/Activity](./003_agent_activity.md).
