# 002: Agent/Tool

> **Tool**: Imagine a Tool is like a recipe card or a blueprint for a special power an AI can use. It tells the AI, “Here’s a special trick you can do, and here are the ingredients you’ll need.” The AI can then decide to use that power by filling in the recipe with the right information. This is called a `Call`. The `Call` is then carried out, either by the AI's own “imagination” or by a real computer program.

> Sidenote: - To get the most out of this, it helps to first read: [001: Agent/Request](./001_agent_request.md)
> - This document pairs well with: [003: Agent/Activity](./003_agent_activity.md)

This paper explains the Tool — the basic LEGO brick that lets an AI (which we call an Agent) understand and use its powers.

## What Are Tools?

**Tools are the most important part** of how an AI takes action. They give the AI a super important skill: **the ability to choose the right action at the right time**. This lets the AI look at a problem and figure out the best way to handle it.

Tools give the AI:

- **Clear Instructions**: They are like blueprints that an AI can easily read to understand what it can do.
- **No Surprises**: They set clear rules for what information goes in and what comes out, so you always know what to expect.
- **LEGO Bricks**: You can connect different Tools together to help the AI do bigger and more complicated things.
- **AI-Friendly**: The blueprints are written in a special way that the AI's brain (its language model) can easily understand and choose from.

When an AI picks a Tool's blueprint and fills in all the details, it creates a **Call**. A Call is like a completed order form, ready to be sent off to get a job done. (You can learn more about how a Call works in [004: Agent/Call](./004_agent_call.md)).

> **Note**: You can ask an AI to do simple things just by telling it what you want. But if you need the AI to choose between different actions all by itself, you need Tools. To see how a simple request turns into a proper Tool, check out [007: Agent/Input](./007_agent_input.md).

## When Should You Use Tools?

Use Tools when you want an AI to:

- **Decide what to do on the fly** based on what's happening now.
- **Pick from many different powers** to finish a big project.
- **Use different versions of the same power** (like choosing between searching with Google or with Bing).
- **Mix its own smarts with clear instructions** to make the best possible decisions.

## How The Tool System Works

### The Big Idea: A Blueprint is Just a Plan

The whole system is built on one simple idea: **Tools are just blueprints**. They describe *what* a power does, but not *how* it's done. The actual work is handled either by the AI's own imagination or by a separate program called an **[Activity](./003_agent_activity.md)**.

A Tool's blueprint tells you:

- **What it does** (a short and simple description).
- **What it needs** (the ingredients, or input data).
  >Sidenote: About those extra settings:
  >
  > - `_instance`: You can learn about this special setting in [011: Agent/Instancing](./011_agent_instancing.md).
  > - `_module`: Check out [009: Agent/Module](./009_agent_module.md) to see what this does.
- **What you get** (the final result, called `_output`).
- **What it's called** (its name, `_tool`).
- **How it's done** (the `_activity` part, which you can read about in [003: Agent/Activity](./003_agent_activity.md)).

### Special Notes on the Blueprint

Tool blueprints use special labels that start with an underscore (`_`) to give instructions to the system:

- **\_tool**: The unique name for this Tool (this one is required).
- **\_activity**: Points to a real program (`Activity`) that can do the work. You can learn how this works in [003: Agent/Activity](./003_agent_activity.md).
- **\_output**: Describes what the result should look like.
- **\_reasoningForCall**: A space for the AI to explain *why* it decided to use this specific tool.

Any other field without an underscore is just a normal ingredient the tool needs. The special `_` labels always go first so the system can quickly see the important instructions.

### What the System Takes Care Of

The Tool system handles all the background work:

- **Keeping a list of all the blueprints** (registering the tools).
- **Helping the AI fill in the blanks** on a blueprint using the information it already has.
- **Deciding who does the work** (the AI's own brain or a separate program).

Other parts of the system handle things like managing big projects and setting rules for how and when tools can be used.

## Defining a Tool

Tools are written down using a format called JSON Schema, which is just a structured way to make a blueprint. Here’s an example of a Tool that can figure out if a sentence is happy, sad, or just neutral. This tool doesn't need a separate program because the AI can just use its own understanding of words to find the answer.

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

## The Toolbox and The Call

While one tool is cool, the real magic happens when you give an AI a whole **Toolbox** full of them. The system shows the AI all the available Tool blueprints at once. This lets the AI look through all its options and pick the perfect one for the job.

When the AI chooses a Tool and fills in the information it needs, it creates a **Call**. A Call is the final, ready-to-go command that gets sent off to be completed.

> Sidenote: When an AI uses a Tool, it creates a **Call**, which is the actual command to get the job done. You can learn more about that here: [004: Agent/Call](./004_agent_call.md).

## Two Ways to Get Things Done

A Tool's blueprint, by itself, is just a plan. There are two ways to make it actually *do* something. The first way is what we call **latent execution**, which is a fancy way of saying the **AI just thinks up the answer itself**. This is perfect for tasks that use language or ideas, like figuring out the mood of a sentence.

But for actions that need to connect to the real world—like searching the internet or checking a calendar—the Tool needs to be linked to a real computer program. We call this program an **Activity**.

Keeping the Tool's blueprint (the what) separate from the Activity that does the work (the how) is a very important idea. It means the AI can think about its powers without worrying about the messy details of how they work. It also means we can change the program a tool uses without having to change the blueprint. The next document, **[003: Agent/Activity](./003_agent_activity.md)**, explains how Activities bring Tools to life.