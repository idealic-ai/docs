# 002: Agent/Tool

> [!DEFINITION] [Tool](./000_glossary.md)
> A Tool is like a recipe card that describes a special power an AI agent can use. The AI is shown a list of these recipes so it knows what it's capable of doing. To use a power, the AI fills out the recipe card with specific ingredients, creating a :term[Call]{canonical="Call"}. This is an order for an action to happen. The action is then carried out either by the AI's own brain or by a specific piece of code called an :term[Activity]{canonical="Activity"}.

> Sidenote:
> - Needs info from: :term[001: Agent/Request]{href="./001_agent_request.md"}
> - Works with: :term[003: Agent/Activity]{href="./003_agent_activity.md"}

A :term[Tool]{canonical="Tool"} is a set of instructions, like a blueprint, that defines a skill an AI agent can have. It's the most basic building block for everything an agent does, giving the AI a menu of abilities it can understand and choose from.

## What Are Tools?

**Tools are the building blocks** for how agents act. They give agents a new superpower: **choosing the right action at the right time**. This allows an agent to look at a situation and decide the best thing to do.

Tools provide:

- **Clear Instructions**: They are like well-written recipe cards that agents can easily read and understand.
- **No Surprises**: They have strict rules about what information they need (inputs) and what they give back (outputs).
- **Combinable Parts**: You can snap them together like building blocks to perform more complex jobs.
- **AI-Friendly Language**: The instructions are written in a way that the AI's brain (the Language Model) can think about them and pick the right one for a task.

When an agent fills in the specific details for a Tool, it creates a :term[Call]{canonical="Call"}. Think of it as officially placing an order from the menu—it's a request for a specific action to be carried out.

> Sidenote:
> Learn more about what a :term[Call]{href="./004_agent_call.md"} is.

## When to Use the Tool System

Use the Tool System when you need your agents to:

- **Choose actions on the fly** depending on what's happening.
- **Decide between several different skills** to reach a goal.
- **Use different versions** of the same skill (like using Google or DuckDuckGo to search).
- **Combine the AI's creative thinking with strict, logical code** to make decisions.

## Blueprints as Instructions

The Tool System is based on one huge idea: **Tools are just blueprints**. They describe *what* a skill is, but not *how* it's done. Separating the blueprint from the factory that builds it is what makes the whole system so powerful and flexible.

A `Tool` blueprint is a standard JSON Schema file. Any item without an underscore (`_`) in front of it is an 'ingredient' the tool needs. The system uses special 'meta' items (starting with `_`) for behind-the-scenes instructions that control how the tool is used.

A Tool's blueprint defines its entire interface:

> Sidenote:
> Special Instructions:
>
> - **`_activity`**: Connects the tool to a real program that does the work. See :term[003: Agent/Activity]{href="./003_agent_activity.md"}
> - **`_delegate`**: Hands off the job to a separate, specialized helper. See :term[014: Agent/Delegate]{href="./014_agent_delegate.md"}
> - **`_outputPath`**: Tells the tool where to save its result so it can be remembered. See :term[008: Agent/Output]{href="./008_agent_output.md"}
> - **`_instance`**: Tells the tool which specific item to work on if there are many. See :term[013: Agent/Instancing]{href="./013_agent_instancing.md"}

- **`title`**: A simple, human-friendly name for the blueprint (optional).
- **`description`**: Explains what the tool does, like a note on the recipe card.
- **`properties`**: The list of ingredients the tool needs to do its job.
- **`_tool`**: A unique name to make sure everyone knows which tool this is.
- **`_output`**: A description of what the final result should look like.
- **`_reasoningForCall`**: A space the agent uses to write down *why* it decided to use this tool.

More advanced systems can then build things like workflows and rules on top of these simple building blocks.

## Tool Definition

Tools are defined using JSON blueprints. The example below shows a `Tool` that can figure out the feeling (or sentiment) of a piece of text. This `Tool` is designed to be used by the AI's own brain, since it's a language task and doesn't need an outside program.

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

## Updating Tools

Tools are known by their unique `_tool` name. If the system sees two different definitions for the same tool, **the newest one always wins**.

This "last-one-wins" rule allows for cool ways to combine things:

- **Start with Defaults, Then Customize**: You can give an agent a standard set of tools, and then add a special, updated version for a specific job.
- **Adapt to the Situation**: You can change a tool's description or ingredients in the middle of a conversation to help it fit the current needs.

When there's a conflict, the older definition is simply ignored and not even shown to the AI.

## Putting the Blueprints Together for the AI

An agent doesn't just use tools; it also needs to produce a final result when its job is done. To manage this, the system takes all the available :term[Tool]{canonical="Tool"} blueprints and combines them with another blueprint for the final `output`. This creates one giant instruction sheet that it gives to the AI in a :term[Request]{canonical="Request"}.

This gives the AI a choice. Based on your request, it can:

- **Just use tools**: If the job requires a few steps, the AI will use one or more tools. It will note that it's making progress but won't produce the final output yet.
- **Just give the final output**: If the AI can answer your question directly without any special tools, it will just give you the final result.
- **Do both at once**: Sometimes, the AI can use a tool and finish the entire job in one single step.

To avoid confusing the AI, the system does something clever. It changes a tool's blueprint depending on how it will be used.

- If a :term[Tool]{canonical="Tool"} is **latent** (done by the AI's own brain), the system includes the `_output` blueprint. This tells the AI, "Here's what your answer should look like."
- If a :term[Tool]{canonical="Tool"} is **explicit** (done by an outside program, or :term[Activity]{canonical="Activity"}), the system **removes the `_output` part** from the blueprint before showing it to the AI. This sends a clear message: "Your only job is to provide the correct ingredients. The outside program will handle the result, so don't even try to create it yourself." The tool's `description` should still explain what it does, so the AI can plan ahead.

This setup allows the system to handle both simple, one-shot answers and complex jobs that require many tools. You provide the tool blueprints and the final output blueprint, and the system mixes them together perfectly so the AI always knows what to do.

The example below shows how a :term[Tool]{canonical="Tool"} blueprint and a final output blueprint are combined.

::::columns
:::column{title="Agent's Setup"}

```typescript
Agent.Request(
  config, // Settings for the request (e.g., which AI model to use)
  {
    // Blueprint for the final Output
    type: 'object',
    properties: {
      summary: { type: 'string' },
    },
    required: ['summary'],
  },
  [
    // Things the agent knows
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
:::column{title="Combined Blueprint (for the AI)"}

```json
{
  "type": "object",
  "properties": {
    "meta": {
      "type": "object",
      "description": "Information about the idea itself, like its version. The AI is expected to update this when it does work.",
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

On top of defining a tool's ingredients, you can give it extra instructions when you ask the agent to use it. This is like adding sticky notes to the recipe card right before you hand it to the chef.

When an agent decides to use a tool, it creates a :term[Call]{canonical="Call"}—a specific order. This :term[Call]{canonical="Call"} contains the ingredients for the tool, but you can also add special 'meta' instructions (starting with `_`) that tell the system *how* to carry out the order. These instructions control parts of the process that go beyond the basic recipe.

> Sidenote:
> - More about :term[Calls]{href="./004_agent_call.md"}

This lets you use a simple, core tool in all sorts of flexible ways. The :term[Call]{canonical="Call"} becomes a detailed order that says *what* to do (the tool and its ingredients) and *how* to do it (the special instructions). The last step is understanding the different ways an order can actually be completed.

## Doing the Work: In-Brain vs. Outside Help

Once a :term[Call]{canonical="Call"} is made, the system needs to get the job done. A `Tool` blueprint is just instructions; it doesn't do any work itself. The work can be done in one of two ways. The default way is **latent execution**, where the AI uses its own internal knowledge to figure out the result. This is perfect for language or thinking tasks. For actions that need to touch the outside world—like using a website's API or searching a database—a `Tool` must be connected to a real piece of code. This real-world helper is called an **:term[Activity]{canonical="Activity"}**.

The separation of the :term[Tool]{canonical="Tool"} (the blueprint) from the :term[Activity]{canonical="Activity"} (the worker) is a very important part of the design. It lets us define an agent's skills in a simple, high-level way, while the actual code that does the work can be changed or updated separately. The next document, :term[003: Agent/Activity]{href="./003_agent_activity.md"}, explains how :term[Activities]{canonical="Activity"} provide the real power behind :term[Tool]{canonical="Tool"}s.

> Sidenote:
> - Learn how :term[Activities]{href="./003_agent_activity.md"} work.
