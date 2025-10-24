# 002: Agent/Tool

> [!DEFINITION] [Tool](./000_glossary.md)
> Think of a Tool as a description of a special power an AI can use. It's like a recipe card for a specific action. The AI (a Large Language Model, or LLM) reads this recipe to understand what it can do. It decides to use the tool by filling in the ingredients (parameters), which creates a :term[Call]{canonical="Call"}. This action is then carried out either by the AI's own knowledge or by a specific piece of registered code (an :term[Activity]{canonical="Activity"}).

> Sidenote:
> - You should read this first: :term[001: Agent/Request]{href="./001_agent_request.md"}
> - This goes with: :term[003: Agent/Activity]{href="./003_agent_activity.md"}

A :term[Tool]{canonical="Tool"} is a blueprint for an action an AI agent can perform. It's the most basic building block for everything an agent does. It gives the AI a menu of possible actions, helping it understand what it can do and how to do it.

## What Are Tools?

**Tools are the most important part** of how an agent acts. They give the AI a new skill: **choosing the right action for the situation**. This lets agents pick and use the best abilities to get a job done.

Tools provide:

- **Clear Instructions**: Tools are like well-written recipes that agents can easily read and understand.
- **Guaranteed Results**: They have clear rules for what information they need (inputs) and what they'll give back (outputs).
- **Mix and Match**: You can combine simple tools to create more complex and powerful agent abilities.
- **AI-Friendly**: The blueprints are designed so that AI language models can think about them and decide which one to use.

When an agent fills in the specific details for a Tool, it creates a :term[Call]{canonical="Call"}. This is like taking a recipe and adding the actual ingredients, making it a ready-to-cook instruction.

> Sidenote:
> See: :term[004: Agent/Call]{href="./004_agent_call.md"}
>

## When to Use the Tool System

Use the Tool System when you want your agents to:

- **Choose actions as they go**, based on what's happening.
- **Pick from several different powers** to reach a goal.
- **Use different versions** of the same power (like choosing between Google or Bing for a search).
- **Combine the AI's brainpower with hard-coded rules** when making decisions.

## A Blueprint for Action

The Tool system is based on one big idea: **Tools are just blueprints**. They describe *what* an action does, but not *how* it's done. Separating the 'what' from the 'how' is what makes the whole system so powerful and flexible.

A `Tool` blueprint is a standard JSON Schema file. Any field that doesn't start with an underscore (`_`) is considered an ingredient, or parameter, for the tool. The system uses special fields (starting with `_`) to control how the tool is identified and run.

A Tool's blueprint defines its entire interface:

> Sidenote:
> Special Powers:
>
> - **`_activity`**: Connects the tool to a real piece of code to do work. See :term[003: Agent/Activity]{href="./003_agent_activity.md"}
> - **`_delegate`**: Hands off the tool's job to another helper agent. See :term[013: Agent/Delegate]{href="./013_agent_delegate.md"}
> - **`_outputPath`**: Makes the tool remember its result by saving it somewhere. See :term[008: Agent/Output]{href="./008_agent_output.md"}
> - **`_instance`**: Tells the tool to run for a specific item when working on a big list of things. See :term[012: Agent/Instancing]{href="./012_agent_instancing.md"}

- **`title`**: A simple, human-friendly name for the blueprint (optional).
- **`description`**: Explains what the tool is for.
- **`properties`**: The ingredients the tool needs to work.
- **`_tool`**: A unique name to identify this specific tool.
- **`_output`**: Describes what the result from the tool will look like.
- **`_reasoningForCall`**: A space the AI uses to explain *why* it chose this tool.

More advanced systems can then build things like workflows and rules on top of these simple blueprints.

## Defining a Tool

Tools are defined using JSON schemas. The example below shows a `Tool` for guessing the mood (sentiment) of a piece of text. This `Tool` doesn't need a separate piece of code to run; it relies on the AI's built-in understanding of language.

::::columns
:::column{title="Tool Blueprint"}

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
:::column{title="Example of AI's Output"}

```json
// Prompt: "What is the sentiment of 'This is the best!'"
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

An agent doesn't just use tools; it also needs a way to give you a final answer when its job is done. To make this work, the system takes all the available :term[Tool]{canonical="Tool"} blueprints and combines them with a blueprint for the *final output*. It bundles them all into one big instruction manual that it gives to the AI in a :term[Request]{canonical="Request"}.

This gives the AI a choice in how it answers. Based on your prompt, it can:

- **Use tools first, give the answer later:** If the job needs a few steps, the AI will use one or more tools and wait to give the final `output`.
- **Give the answer right away:** If the question is simple, the AI can skip the tools and provide the `output` directly.
- **Do both at once:** Sometimes, the AI can use a tool and give the final answer in a single step.

This system is flexible enough to handle both simple, one-shot questions and complex jobs that require many tools. You provide the `Tool` blueprints and the final output blueprint, and the system combines them into a single menu for the AI to choose from.

The example below shows how a `Tool` blueprint and an output blueprint are combined.

::::columns
:::column{title="Agent Setup"}

```typescript
Agent.Request(
  config, // Settings for the request (e.g., AI model)
  {
    // Blueprint for the Final Output
    type: 'object',
    properties: {
      summary: { type: 'string' },
    },
    required: ['summary'],
  },
  [
    // Information for the AI
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
:::column{title="The Combined Blueprint Sent to the AI"}

```json
{
  "type": "object",
  "properties": {
    "meta": {
      "type": "object",
      "description": "Information about the idea being worked on, like its version. The AI needs to update this.",
      "properties": {
        "path": {
          "type": "string"
        },
        "version": {
          "type": "string"
        }
      }
    },
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
  "required": ["meta", "calls", "output"]
}
```

:::
::::

## Giving Tools Extra Instructions

Besides just defining what a tool needs to work, you can give it extra powers when you ask the agent to use it. This is like adding special instructions to a recipe on the fly.

When an agent decides to use a tool, it creates a :term[Call]{canonical="Call"}—a specific, ready-to-go instruction. A :term[Call]{canonical="Call"} includes the ingredients for the tool, but you can also add special properties (starting with `_`) that give extra commands to the system. These properties control *how* the tool runs in ways that go beyond its basic blueprint.

> Sidenote:
> - :term[004: Agent/Call]{href="./004_agent_call.md"}

This lets you use a simple tool blueprint in many powerful and flexible ways. The :term[Call]{canonical="Call"} becomes a detailed command that specifies *what* to do (the tool and its ingredients) and *how* to do it (the special instructions). Now, let's see the different ways a :term[Call]{canonical="Call"} can actually get its job done.

## Two Ways to Run a Tool

Once an agent decides to use a tool, the system needs to run it. A `Tool` blueprint is just an interface, so it doesn't contain the code for how to do the work. Instead, the work can be done in one of two ways. The first way is **using the AI's brain**, where the AI uses its own knowledge to figure out the result. This is great for tasks involving language or general knowledge. The second way is for actions that need to interact with the real world, like searching a website or a database. For these, the `Tool` must be connected to a real piece of code. This code is called an **:term[Activity]{canonical="Activity"}**.

The idea of separating the `Tool` blueprint from the `Activity` code is very important. It lets the system think about an agent's abilities in a general way, while allowing the actual code that does the work to be changed or updated separately. The next document, :term[003: Agent/Activity]{href="./003_agent_activity.md"}, explains how :term[Activities]{canonical="Activity"} provide the real power behind :term[Tool]{canonical="Tool"}s.

> Sidenote:
> - :term[003: Agent/Activity]{href="./003_agent_activity.md"}.
