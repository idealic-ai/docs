# 002: Agent/Tool

> **Tool**: Imagine a Tool is like a recipe or a blueprint for a special superpower an AI can use. It tells the AI, "Here's what you can do, and here's what you need to do it." The AI can then use this power by filling in the recipe with the right ingredients. This is called a `Call`. The `Call` is carried out either by the AI's own “brain” or by a special piece of computer code.

> Sidenote: - Must Read: [001: Agent/Request](./001_agent_request.md)
> - Goes well with: [003: Agent/Activity](./003_agent_activity.md)

This document explains what a Tool is—the basic blueprint that lets an AI (which we call an Agent) understand and use its abilities.

## What are Tools?

**Tools are the most important part** of how an AI acts. They give it a brand new skill: **choosing the right action at the right time**. This lets the AI look at a situation and decide what the best thing to do is.

Tools give an AI:

- **Clear instructions**: A blueprint the AI can read to understand its powers.
- **No surprises**: They set clear rules about what information goes in and what comes out.
- **LEGO bricks**: You can combine different Tools to help the AI do more complex tasks.
- **AI-friendly**: The blueprints are written so the AI's “brain” (a large language model) can understand and pick the right one.

When an AI takes a Tool's blueprint and fills in all the details, it creates a **Call**. A Call is like a filled-out order form, ready to be sent off to make something happen. (You can learn more about how a Call works in the [004: Agent/Call](./004_agent_call.md) document).

> **Note**: You can ask an AI to do something simple by just giving it a general idea. But when you need the AI to choose between different actions on its own, you'll need Tools. To see how a simple idea becomes a Tool, check out the [007: Agent/Input](./007_agent_input.md) document.

## When should you use Tools?

Use Tools when you want the AI to:

- **Choose actions on the fly**, depending on what's happening.
- **Pick from lots of different abilities** to get a job done.
- **Use different versions of the same ability** (like searching with Google or DuckDuckGo).
- **Combine its own thinking with clear instructions** to make decisions.

## How the Tool System Works

### The Main Idea: A Blueprint is Just a Plan

The whole system is based on one key idea: **Tools are just blueprints**. They describe *what* an ability does, but not *how* it does it. The actual work is done either by the AI's imagination or by a separate piece of code called an **[Activity](./003_agent_activity.md)**.

A Tool's blueprint tells you:

- **What it does** (a simple description).
- **What it needs** (the ingredients or input information).
  >Sidenote: About additional settings:
  >
  > - `_instance`: You can read about this in [011: Agent/Instancing](./011_agent_instancing.md).
  > - `_module`: Check out [009: Agent/Module](./009_agent_module.md) to learn more.
- **What it creates** (the result, or `_output`).
- **What it's called** (its name, or `_tool`).
- **How it's done** (the `_activity` field, which you can read about in [003: Agent/Activity](./003_agent_activity.md)).

### Special Labels on the Blueprint

Tool blueprints use special labels (they all start with an underscore `_`) to give instructions to the system:

- **\_tool**: The unique name for this tool (it's required).
- **\_activity**: Points to a specific piece of code (`Activity`) that can do the work. You can learn how this works in [003: Agent/Activity](./003_agent_activity.md).
- **\_output**: Describes what the result should look like.
- **\_reasoningForCall**: A note the AI adds to explain *why* it decided to use this tool.

Any other field without an underscore is a normal ingredient the tool needs. The special `_` labels always come first so the AI can easily see the important instructions.

### What the System Takes Care Of

The Tool system is in charge of:

- **Keeping a list of all the blueprints** (registering tools).
- **Helping the AI fill in the blanks** on the blueprint using the information it has.
- **Deciding who will do the work** (the AI's “brain” or a special piece of code).

Other parts of the system are responsible for managing the workflows and the rules for how and when actions are performed.

## How to Define a Tool

Tools are defined using a format called JSON Schema. Here's an example of a Tool that can figure out if a sentence's mood is happy, sad, or neutral. This tool doesn't need a separate piece of code, because the AI can just use its own understanding of language to get the answer.

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

## The Toolbox and the Call

While one tool is useful, the real magic happens when you give the AI a whole box of tools, or a “toolbox.” The system shows the AI all the available Tool blueprints at once. This lets the AI look at all its options and choose the best one for the current task.

When the AI chooses a Tool and fills in the needed information, it creates a **Call**. The Call is the final, ready-to-go command that gets passed along to be executed.

> Sidenote: When an AI uses a Tool, it creates a **Call**—that's the actual command to do something. You can read more about it here: [004: Agent/Call](./004_agent_call.md).

## Two Ways to Get the Job Done

A Tool blueprint by itself is just a plan. There are two ways to make it do something. The first way is what we call **implicit execution**, where the AI uses its own imagination and knowledge to come up with an answer. This is perfect for tasks involving language or ideas.

But for actions that need to interact with the real world—like searching the internet or checking a database—the Tool needs to be connected to a real computer program. We call that program an **Activity**.

Separating the Tool blueprint from the Activity that does the work is a very important idea. It means the AI can think about its abilities without worrying about the messy details of how they work. We can also swap out the program a tool uses without changing the blueprint itself. The next document, **[003: Agent/Activity](./003_agent_activity.md)**, explains how Activities bring Tools to life.