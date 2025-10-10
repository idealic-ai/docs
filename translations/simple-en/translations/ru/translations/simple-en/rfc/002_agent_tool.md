# 002: Agent/Tool

> **Tool**: Think of a Tool as a recipe or a blueprint for a special ability that an AI can use. It tells the AI, "Here's something you can do, and here's what you need to do it." The AI can then use this ability by filling in the recipe with specific ingredients. This is called a `Call`. The `Call` is then carried out by either the AI's own "brain" or by a special piece of computer code.

> Sidenote: - Requires: [001: Agent/Request](./001_agent_request.md)
> - Goes well with: [003: Agent/Activity](./003_agent_activity.md)

This document explains the Tool — the basic blueprint that lets an AI (called an Agent) understand and use its abilities.

## What are Tools?

**Tools are the most important part** of how an AI takes action. They give the AI a brand-new skill: **choosing the right action at the right time**. This lets the AI look at a situation and decide what the best thing to do is.

Tools give the AI:

- **Clear instructions**: Blueprints that the AI can read to understand its abilities.
- **No surprises**: They set clear rules for what information goes in and what comes out.
- **LEGO bricks**: You can combine different Tools to help the AI do more complicated jobs.
- **Easy for an AI to understand**: The blueprints are written so the AI's "brain" (the LLM) can understand them and make a choice.

When an AI takes a Tool's blueprint and fills in all the details, it creates a **Call**. A `Call` is like a filled-out order form, ready to be sent off to get the job done. (You can learn more about how a `Call` works in the [004: Agent/Call](./004_agent_call.md) document).

> **Note**: You can ask an AI to do simple things by just giving it a general idea. But when you need the AI to choose between different actions on its own, you need Tools. To see how a simple idea can be turned into a Tool, check out [007: Agent/Input](./007_agent_input.md).

## When should you use Tools?

Use Tools when you want the AI to:

- **Choose actions on the fly**, based on what's happening.
- **Pick from many different abilities** to get a job done.
- **Use different versions of the same ability** (like searching with Google or DuckDuckGo).
- **Mix its own thinking with clear instructions** to make decisions.

## How the Tool system works

### The Main Idea: A Blueprint is Just a Plan

The whole system is built on one key idea: **Tools are just blueprints**. They describe *what* an ability does, but not *how* it does it. The actual work is done by either the AI's own imagination or by a separate piece of code called an **[Activity](./003_agent_activity.md)**.

A Tool's blueprint tells you:

- **What it does** (a simple description).
- **What it needs** (the ingredients, or input).
  >Sidenote: About those extra settings:
  >
  > - `_instance`: You can learn about this in [011: Agent/Instancing](./011_agent_instancing.md).
  > - `_module`: Check out [009: Agent/Module](./009_agent_module.md) for more info.
- **What it makes** (the result, or `_output`).
- **What it's called** (its name, or `_tool`).
- **How it's done** (the `_activity` field, which you can read about in [003: Agent/Activity](./003_agent_activity.md)).

### Special Labels in the Blueprint

Tool blueprints use special labels (they all start with an underscore `_`) to give instructions to the system:

- **_tool**: The unique name for this tool (you have to include this).
- **_activity**: Points to a specific piece of code (`Activity`) that can do the work. You can learn how this works in [003: Agent/Activity](./003_agent_activity.md).
- **_output**: Describes what the result should look like.
- **_reasoningForCall**: A note the AI adds to explain *why* it decided to use this tool.

Any other field without an underscore is a normal ingredient the tool needs. The special `_` labels always come first so the AI can easily see the important instructions.

### What the system takes care of

The Tool system is in charge of:

- **Keeping track of all the blueprints** (registering tools).
- **Helping the AI fill in the blanks** on the blueprint using information it already has.
- **Deciding who does the work** (the AI's "brain" or a specific piece of code).

The other parts of the system handle things like managing workflows and the rules for how and when things get done.

## Defining a Tool

Tools are defined using a format called JSON Schema. Here is an example of a Tool that can figure out if a sentence is happy, sad, or neutral. This tool doesn't need a separate piece of code, because the AI can just use its own understanding of language to get the answer.

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

## The Toolbox and the Call

While one tool is useful, the real magic happens when you give an AI a whole toolbox. The system shows the AI all the available Tool blueprints at once. This lets the AI look over its options and pick the best one for the job.

When the AI chooses a Tool and fills in the information it needs, it creates a **Call**. The `Call` is the final, ready-to-go command that gets passed along to be executed.

> Sidenote: When an AI uses a Tool, it creates a **Call**—the actual command to perform an action. You can learn more about that here: [004: Agent/Call](./004_agent_call.md).

## Two ways to get tasks done

A Tool blueprint is just a plan. There are two ways to make it do something. The first way is what we call **implicit execution**, where the AI uses its own creativity and knowledge to figure out the answer. This is perfect for jobs that involve language or ideas.

But for actions that need to interact with the real world—like searching the internet or checking a database—the Tool needs to be linked to a real computer program. We call that program an **Activity**.

Separating the Tool blueprint from the Activity that does the work is a really important idea. It means the AI can think about its abilities without having to worry about the messy details of how they work. We can also swap out the program a tool uses without changing the blueprint. The next document, **[003: Agent/Activity](./003_agent_activity.md)**, explains how Activities bring Tools to life.