# 002: Agent/Tool

> [!DEFINITION] Tool
> A Tool is like a recipe that describes a special power an AI assistant (called an agent) can use. This recipe is shown to the AI, giving it a clear menu of possible actions. The AI can then choose to use the tool by filling in the recipe's ingredients (called parameters). This action is either handled by the AI itself or triggers a separate piece of code to run.

> Sidenote:
> - You should first read: [001: Agent/Request](./001_agent_request.md)
> - Works together with: [003: Agent/Activity](./003_agent_activity.md)

A Tool is a blueprint that defines a specific skill an agent can use. Think of it as the basic building block for every action an agent can take. It gives the main AI a way to understand and choose from a list of available behaviors.

## What Are Tools?

**Tools are the most important part** of how an agent acts. They give agents a brand-new ability: **choosing the right action for the right moment**. This lets an agent look at a situation and decide the best thing to do.

Tools provide:

- **Clear Instructions**: Blueprints that tell an agent what a skill does and how to use it.
- **Safety**: Like a contract that says, "If you give me this kind of information, I'll give you that kind of result."
- **Mix and Match**: They are like building blocks that can be combined to create more complex agent behaviors.
- **AI-Friendly Format**: The blueprints are written in a way that a smart AI can read, understand, and choose from them.

When an agent decides to use a Tool and fills in all the necessary information, it creates a **Call**—which is like a complete order form, ready to be sent off and executed.

> Sidenote:
> Learn more about this in [004: Agent/Call](./004_agent_call.md)

## When to Use Tools

You should use Tools when you need an agent to:

- **Think on its feet** and pick the best action based on what's happening.
- **Choose from many different skills** to figure out how to complete a goal.
- **Use different versions** of the same skill (like choosing between two different map apps to find a location).
- **Combine the AI's smart thinking with plain, straightforward instructions** to make decisions.

## A Blueprint is Just an Idea

The system is built on one big idea: **Tools are just blueprints**. They describe *what* a skill does, but not *how* it's done. Separating the "what" from the "how" is what makes the whole system so powerful and flexible.

Imagine a light switch. The switch on the wall is the interface—you know what it does (turn the light on or off). You don't need to know about the wires inside the wall (the implementation) to use it. A Tool is like that light switch.

A Tool's blueprint defines its entire interface:

> Sidenote:
> Special Instructions:
>
> - **`_activity`**: Connects the tool to a real piece of code that does the work. See [003: Agent/Activity](./003_agent_activity.md)
> - **`_delegate`**: Hands off the tool's job to a separate, specialized helper. See [012: Agent/Delegate](./012_agent_delegate.md)
> - **`_outputPath`**: Lets the tool save its result so it can be remembered and used later. See [009: Agent/State](./009_agent_state.md)
> - **`_instance`**: Tells the tool which specific item to work on when handling many items at once. See [011: Agent/Instancing](./011_agent_instancing.md)

- **`title`**: A simple, human-friendly name for the tool.
- **`description`**: A sentence explaining what the tool is for.
- **`parameters`**: The ingredients, or information, the tool needs to do its job.
- **`_tool`**: A unique name the system uses to identify the tool.
- **`_output`**: A description of what the result should look like.
- **`_reasoningForCall`**: A space where the AI can explain *why* it chose to use that particular tool.

Other parts of the system can then build on these simple blueprints to create complex workflows and manage how things get done.

## How to Define a Tool

Tools are written down as simple blueprints (JSON schemas). The example below shows a Tool that can figure out if a piece of text sounds happy, sad, or neutral. This tool doesn't need a separate program to run; the main AI is smart enough to figure out the answer on its own.

::::columns
:::column{title="The Tool's Blueprint"}

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

:::
:::column{title="Example of How the AI Uses It"}

```json
// The AI is asked: "What is the sentiment of 'This is the best!'"
{
  "_tool": "sentimentAnalysis",
  "text": "This is the best!",
  "_output": {
    "sentiment": "positive",
    "confidence": 0.99
  }
}
```

:::
::::

## Putting the Blueprints Together for the AI

An agent doesn't just use tools; it often has a final goal, like writing a summary. To handle this, the system takes all the available tool blueprints and combines them with the blueprint for the final goal. This creates one big master blueprint that it gives to the AI.

It's like telling the AI: "Here is a kitchen full of tools—a mixer, an oven, a knife. Your final goal is to bake a cake. You can use the tools if you need them, or you can just present the cake if you already have it."

Based on the request, the AI can choose to:

- **Use only tools:** If the job requires several steps, the AI will use one or more tools and wait to give the final answer.
- **Give only the final answer:** If the question is simple, the AI can answer it directly without using any tools.
- **Do both:** Sometimes, the AI might use a tool and give the final answer all at once.

This lets one smart system handle everything from simple questions to complicated tasks that require many steps. You just provide the tools and the final goal, and the system figures out how to present the options to the AI.

The example below shows how a "greetUser" tool and a final "summary" goal are combined into one master blueprint.

::::columns
:::column{title="What the Developer Sets Up"}

```typescript
Agent.Request(
  config, // Settings for the AI
  {
    // Blueprint for the Final Answer
    type: 'object',
    properties: {
      summary: { type: 'string' },
    },
    required: ['summary'],
  },
  [
    // List of Tools and the user's question
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
:::column{title="The Combined Blueprint for the AI"}

```json
{
  "type": "object",
  "properties": {
    "output": {
      "type": ["object", "null"],
      "properties": {
        "summary": { "type": "string" }
      },
      "required": ["summary"],
      "additionalProperties": false
    },
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
    }
  },
  "required": ["calls", "output"]
}
```

:::
::::

## Adding Special Instructions to Tools

You can also add extra instructions to a tool right when you use it. Think of it like adding a sticky note to an order form.

When an agent decides to use a tool, it creates a **Call**. This Call includes the normal information the tool needs, but you can also add special instructions (they always start with `_`). These instructions tell the system *how* to run the tool, going beyond its basic blueprint.

> Sidenote:
> - [004: Agent/Call](./004_agent_call.md)

This lets you use a simple tool in many powerful ways. The Call becomes a rich set of instructions that says *what* to do (the tool and its ingredients) and *how* to do it (the special instructions).

## Running the Tools: Two Different Ways

Once the AI decides to use a tool, the system has to run it. Since a Tool is just a blueprint, it doesn't contain the actual code to do the work. The work can be done in one of two ways:

1.  **Imagined Execution**: The AI is so smart that it can often just imagine the result. This is perfect for tasks involving language or general knowledge, like figuring out if a sentence is happy or sad.
2.  **Real-World Execution**: For actions that need to interact with the outside world—like searching the web or looking up something in a database—the Tool's blueprint must be connected to a real piece of code. This real-world code is called an **Activity**.

The separation of the Tool (the idea) from the Activity (the action) is a key part of the design. It allows an agent's skills to be thought about and planned at a high level, while the actual code that does the work can be changed or updated separately. The next document, **003: Agent/Activity**, explains how Activities provide the real-world power for Tools.

> Sidenote:
> - [003: Agent/Activity](./003_agent_activity.md)
