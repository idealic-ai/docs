# 002: An Agent's Tools

> [!DEFINITION] [Tool](./000_glossary.md)
> A Tool is like a special power an AI agent can use. It's a blueprint that tells the AI about one of its abilities. The AI sees this blueprint and can decide to use the power by filling in the details. This is called making a :term[Call]{canonical="Call"}. The power can either be used by the AI's imagination (this is called latent execution) or by a real piece of code that runs separately (an :term[Activity]{canonical="Activity"}).

> Sidenote:
> - You should read this first: :term[001: Agent/Request]{href="./001_agent_request.md"}
> - This goes well with: :term[003: Agent/Activity]{href="./003_agent_activity.md"}

A :term[Tool]{canonical="Tool"} is a blueprint that describes a special power an agent can use. Think of tools as the basic building blocks for everything an agent does. They give the AI a menu of actions it can choose from.

## What Are Tools?

**Tools are the verbs** for an AI agent. While the AI can "think," tools let it "do" things. They give the AI a new superpower: **choosing the right action at the right time**.

Tools provide:

- **Clear Instructions**: Blueprints that the AI agent can read to understand its powers.
- **Guaranteed Rules**: They make sure the right kind of information goes in and comes out, preventing mistakes.
- **Combinable Powers**: Simple tools can be combined to perform bigger, more complex jobs.
- **AI-Friendly Design**: They are built so the AI can think about and choose the best tool for any problem.

When an agent decides to use a Tool and fills in all the information it needs, it creates a :term[Call]{canonical="Call"}. A Call is a specific request to use that power, like saying "Use the 'search' power to look up 'dinosaurs'."

> Sidenote:
> Learn more here: :term[004: Agent/Call]{href="./004_agent_call.md"}
>

## When Should You Use Tools?

You should give an agent tools when you want it to:

- **Choose actions on the fly** based on what's happening.
- **Pick from several different powers** to reach a goal.
- **Use different versions** of the same power (like using Google or DuckDuckGo for searching).
- **Mix its own thinking with pre-written instructions** to make smart decisions.

## The Blueprint is Not the Machine

The most important idea here is that **Tools are just blueprints**. They describe *what* a power does, not *how* it does it. This is like a light switch on a wall: the switch tells you its purpose (turn light on/off), but all the complicated wiring that actually makes it work is hidden behind the wall. This separation is what makes the system so powerful and flexible.

A `Tool` blueprint is just a simple set of rules. Any instruction that doesn't start with an underscore (`_`) is a piece of information the tool needs. The special instructions starting with `_` are for the system itself, telling it how to manage the tool.

A Tool's blueprint defines its entire interface:

> Sidenote:
> Special Instructions:
>
> - **`_activity`**: Connects the tool to a real program to run. See :term[003: Agent/Activity]{href="./003_agent_activity.md"}
> - **`_delegate`**: Hands off the tool's job to another specialized agent. See :term[014: Agent/Delegate]{href="./014_agent_delegate.md"}
> - **`_outputPath`**: Tells the tool where to save its result so it can be remembered later. See :term[008: Agent/Output]{href="./008_agent_output.md"}
> - **`_instance`**: Aims the tool at one specific item when there are many to choose from. See :term[013: Agent/Instancing]{href="./013_agent_instancing.md"}

- **`title`**: A simple, human-friendly name for the power.
- **`description`**: Explains what the power does.
- **`properties`**: The information the tool needs to do its job.
- **`_tool`**: A unique name so the system can identify it.
- **`_output`**: A description of what the result should look like.
- **`_reasoningForCall`**: A space for the AI to explain *why* it chose to use this tool.

More advanced systems can then build complex plans and rules on top of these simple blueprints.

## Defining a Tool

Tools are defined as simple blueprints. The example below shows a Tool for figuring out if a piece of text is happy, sad, or neutral (this is called sentiment analysis). This tool is meant to be used by the AI's imagination, since the AI is already great at understanding language and doesn't need a separate program to help it.

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
:::column{title="Example of What the AI Produces"}

```json
// If you ask: "What is the sentiment of 'This is the best!'"
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

## Combining Blueprints for the AI

An agent doesn't just use its tools; it also has a final goal to accomplish. To help the AI, the system takes the blueprints for all of its available :term[Tool]{canonical="Tool"}s and combines them with the blueprint for the final goal. This creates one big instruction sheet that it sends to the AI a :term[Request]{canonical="Request"}.

This gives the AI a clear choice on what to do next:

- **Just use tools**: If the job has multiple steps, the AI can use one or more tools and wait to give the final answer.
- **Just give the final answer**: If the question is simple, the AI can skip the tools and give the final result right away.
- **Do both**: Sometimes, the AI can use a tool and produce the final answer in one single step.

To make things extra clear for the AI, the system is smart about the blueprints it shows it.

- If a :term[Tool]{canonical="Tool"} is done by the AI's **imagination**, the AI needs to know what the result should look like, so the `_output` blueprint is included.
- If a :term[Tool]{canonical="Tool"} is done by a **separate program** (an :term[Activity]{canonical="Activity"}), the system **hides the `_output` blueprint**. This tells the AI: "Your only job is to provide the ingredients. Don't worry about what comes out, the program will handle that."

This system allows the AI to handle everything from simple, one-shot answers to complex tasks that require many tools. The developer just provides the tool blueprints and the final goal, and the system combines them into a perfect instruction sheet for the AI.

Here's an example of how a tool blueprint and a final goal are combined.

::::columns
:::column{title="What the Developer Sets Up"}

```typescript
Agent.Request(
  config, // Settings for the AI
  {
    // Blueprint for the Final Goal
    type: 'object',
    properties: {
      summary: { type: 'string' },
    },
    required: ['summary'],
  },
  [
    // The Agent's Tools
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
    // The User's Question
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
      "description": "Information about the project, like its version number. The AI is expected to update this.",
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

## Adding Special Instructions to Tools

On top of the basic blueprint, you can add extra instructions when you use a tool. It's like adding a sticky note to a request.

When an agent decides to use a tool, it creates a :term[Call]{canonical="Call"}. This Call includes the information the tool needs, but it can also have special properties (starting with `_`) that give the system extra instructions on *how* to run the tool this one time.

> Sidenote:
> - :term[004: Agent/Call]{href="./004_agent_call.md"}

This lets you use a simple tool in many powerful ways. The :term[Call]{canonical="Call"} becomes a detailed command that says *what* to do (the tool) and *how* to do it (the special instructions). The last piece of the puzzle is understanding the different ways a Call can actually be carried out.

## Imagined vs. Real Execution

Once the AI creates a :term[Call]{canonical="Call"}, the system has to run it. A `Tool` blueprint is just instructions, not the engine itself. A tool can be run in two ways. The default way is **latent execution**, where the AI uses its own brain and imagination to figure out the answer. This is great for tasks involving language or knowledge. But for actions that need to interact with the real world—like sending an email or checking a database—the Tool needs to be connected to a real piece of code. This real-world code is called an **:term[Activity]{canonical="Activity"}**.

The separation of the Tool (the blueprint) from the :term[Activity]{canonical="Activity"} (the machine) is a key idea. It lets the AI think about its powers without needing to know exactly how they work. The real-world machine can be updated or swapped out later. The next document, :term[003: Agent/Activity]{href="./003_agent_activity.md"}, explains how :term[Activities]{canonical="Activity"} provide the real-world power behind :term[Tool]{canonical="Tool"}s.

> Sidenote:
> - :term[003: Agent/Activity]{href="./003_agent_activity.md"}.
