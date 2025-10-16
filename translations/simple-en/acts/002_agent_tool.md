# 002: Agent/Tool

> [!DEFINITION] [Tool](./000_glossary.md)
> Think of a Tool as a recipe for a special skill an AI can use. It describes what the skill does and what information it needs to work. The AI reads this recipe and, if it decides to use the skill, it fills in the recipe with the right information. This creates a `Call`, which is the command to actually perform the action. The action can be carried out either by the AI itself, using its own knowledge, or by running a separate piece of code (an `Activity`).

> Sidenote:
> - You should read this first: [001: Agent/Request](./001_agent_request.md)
> - This goes well with: [003: Agent/Activity](./003_agent_activity.md)

A `Tool` is a set of instructions that defines a special ability an agent can have. It's the most basic building block for everything an agent can do. You can think of it as giving the AI a menu of special moves it can choose from to get a job done.

## What Are Tools?

**Tools are the most important part** of how an agent acts. They unlock a new superpower for the AI: the ability to **choose the right action in the moment**, based on what's happening.

Tools give the AI:

- **Clear Instructions**: Well-defined descriptions of what each skill does.
- **No Guesswork**: The rules for what information a tool needs and what it gives back are crystal clear.
- **Mix and Match**: You can combine simple tools to create more complex and interesting behaviors.
- **AI-Friendly Format**: They are described in a way that an AI can understand and reason about, helping it choose the best one.

When an agent fills in the specific information a Tool needs, it creates a **Call**. A Call is like a filled-out order form for a specific action, ready to be sent off and completed.

> Sidenote:
> [004: Agent/Call](./004_agent_call.md)
>

## When Should You Use Tools?

Use the Tool system when you want your agents to:

- **Choose actions on the fly** depending on the situation.
- **Pick from many different skills** to figure out the best way to solve a problem.
- **Use different versions** of the same skill (like choosing between Google or DuckDuckGo for a search).
- **Combine the AI's smart thinking with plain, straightforward code** to make decisions.

## How the Tool System is Built

### The Big Idea: The Recipe is Not the Meal

The whole system is built on one simple rule: **Tools are just the recipes**. They describe what a skill does, but they don't actually do it. This separation between the description (the Tool) and the action (the code that runs it) is what makes the system so powerful and flexible.

A `Tool` recipe is written in a standard format called JSON Schema. Any field that doesn't start with an underscore (`_`) is an ingredient the tool needs. The system uses special fields that *do* start with an underscore to control how the tool works behind the scenes.

A Tool's recipe defines everything about it:

> Sidenote:
> Special Instructions:
>
> - **`_activity`**: Connects the tool to a real piece of code to perform an action. ([003: Agent/Activity](./003_agent_activity.md))
> - **`_delegate`**: Asks another, separate agent to handle this tool's action. ([012: Agent/Delegate](./012_agent_delegate.md))
> - **`_outputPath`**: Tells the system to save the tool's result in a specific place so it can be remembered and used later. ([009: Agent/State](./009_agent_state.md))
> - **`_instance`**: Aims the tool at a specific copy when you're running many copies of the same task at once. ([011: Agent/Instancing](./011_agent_instancing.md))

- **`title`**: A simple, human-friendly name for the recipe (optional).
- **`description`**: A sentence explaining what the tool does.
- **`parameters`**: The ingredients the tool needs to work.
- **`_tool`**: A unique name to make sure we know exactly which tool we're talking about.
- **`_output`**: A description of what the tool will produce when it's finished.
- **`_reasoningForCall`**: A special spot where the AI can write a note to itself explaining why it chose this particular tool.

More advanced systems can then use these simple recipes to build complex workflows and manage how and when actions happen.

## Defining a Tool

Tools are defined using that JSON Schema format. The example below shows a `Tool` for figuring out if a piece of text sounds happy, sad, or neutral. This tool is designed to be used by the AI's own brainpower, since understanding language is something it's already good at. It doesn't need to run any extra code.

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

## Combining Recipes for the AI

An agent doesn't just use tools; it also needs to give a final answer when its job is done. To make this work, the system takes all the available `Tool` recipes and mixes them with another recipe for the final `output`. This creates one giant menu that it gives to the AI.

This all-in-one menu gives the AI a choice. Depending on the question it was asked, it can:

- **Use only tools:** If the job needs a few steps, the AI will use one or more tools and wait to give the final answer.
- **Give the final answer only:** If the question is simple, the AI can answer it directly without needing any tools.
- **Do both at once:** Sometimes, the AI can use a tool and give the final answer in the same step.

This clever setup allows the same system to handle both simple questions and complex, multi-step jobs. The person building the agent just provides the tool recipes and the final answer recipe, and the system combines them into a single menu that the AI can use to decide the best way to respond.

Here’s how a `Tool` recipe and a final answer recipe are combined.

::::columns
:::column{title="What the Developer Sets Up"}

```typescript
Agent.Request(
  config, // Settings for the AI (like which model to use)
  {
    // The recipe for the final answer
    type: 'object',
    properties: {
      summary: { type: 'string' },
    },
    required: ['summary'],
  },
  [
    // Any extra information or tools
    {
      type: 'tool',
      tool: {
        greetUser: {
          type: 'object',
          properties: {
            userName: { type: 'string' },
          },
          required: ['userName'],
        },
      },
    },
    { type: 'text', text: 'some prompt here' },
  ]
);
```

:::
:::column{title="The Combined Menu for the AI"}

```json
{
  "type": "object",
  "properties": {
    "calls": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "_tool": { "const": "greetUser" },
          "userName": { "type": "string" }
        },
        "required": ["_tool", "userName"]
      }
    },
    "output": {
      "type": ["object", "null"],
      "properties": {
        "summary": { "type": 'string' }
      },
      "required": ["summary"],
      "additionalProperties": false
    }
  },
  "required": ["calls", "output"]
}
```

:::
::::

## Supercharging Tools with Special Instructions

Besides just describing what a tool needs, you can add extra instructions when you ask the AI to use it. This is like adding a special note to your food order, like "extra spicy" or "on the side".

When an agent decides to use a tool, it creates a `Call`. This `Call` contains the information the tool needs, but you can also add special instructions (properties starting with `_`) that tell the system *how* to run the tool. These instructions control things that go beyond the basic recipe.

> Sidenote:
> - [004: Agent/Call](./004_agent_call.md)

This lets you use a single, simple tool recipe in many powerful and different ways. The `Call` becomes a detailed order that not only says *what* to do (the tool and its information) but also *how* to do it (the special instructions).

## Two Ways to Get Things Done: Thinking vs. Doing

Once the AI creates a `Call`, the system has to actually run it. But since a `Tool` is just a recipe, it doesn't contain the code for the action itself. Instead, the action can happen in one of two ways. The first way is **thinking** (latent execution), where the AI uses its own powerful brain to figure out the answer. This is great for tasks that involve language or knowledge. The second way is **doing** (explicit execution). For actions that need to interact with the real world—like searching the web or looking something up in a database—the `Tool` recipe must be connected to a real piece of code. This piece of code is called an **Activity**.

The separation of the `Tool` (the recipe) from the `Activity` (the real-world action) is a key idea. It lets the AI think about its skills in an abstract way, while the code that actually performs those skills can be changed or updated separately. The next document, **[003: Agent/Activity](./003_agent_activity.md)**, explains how `Activities` provide the real-world power for `Tools`.

> Sidenote:
> - [003: Agent/Activity](./003_agent_activity.md).
