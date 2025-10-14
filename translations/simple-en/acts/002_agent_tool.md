# 002: Agent/Tool

> **Tool**: Think of a Tool as a recipe card for an AI. It describes a special power the AI can use. The AI reads the recipe to see what information it needs (the ingredients) and then decides to use it by filling in those blanks. This filled-out recipe is called a `Call`. The action is then carried out either by the AI's own brain or by a separate program it tells what to do. — [Glossary](./000_glossary.md)

> Sidenote:
> - Needs this doc first: [001: Agent/Request](./001_agent_request.md)
> - Works together with: [003: Agent/Activity](./003_agent_activity.md)

A `Tool` is like a fill-in-the-blanks form that describes a special skill an AI can use. It's the basic Lego block for everything an AI does, giving it a menu of powers to choose from.

## What Are Tools?

**Tools are the most important part** of how an AI takes action. They let an AI do something new: **pick the right action at the right time**. This means the AI can look at a situation and decide the best thing to do.

Tools give the AI:

- **Clear Instructions**: Forms that explain what each power does and what it needs.
- **Mistake-Proofing**: Rules that make sure the AI uses the right kind of information.
- **Mix-and-Match Powers**: You can combine different Tools to create more complex skills.
- **AI-Friendly Format**: The forms are written in a way that an AI can easily read and understand them.

When an AI fills out the form for a specific Tool, it creates a **Call**. A Call is a completed order, ready to be acted on.

> Sidenote:
> [004: Agent/Call](./004_agent_call.md)
>

## When to Use Tools

You should use Tools when you want an AI to:

- **Choose what to do on its own** based on what's happening.
- **Pick from a menu of different powers** to get something done.
- **Use different ways to do the same thing** (like using Google or DuckDuckGo to search).
- **Mix its own thinking with pre-written computer code** to make decisions.

## How Tools Work

### The Big Idea: The Form is Not the Action

The whole system is based on one key idea: **Tools are just the forms (the rules), not the actions themselves**. This separation is what makes the system so flexible. It's like having a recipe for a cake, but you can choose to bake it in a gas oven or an electric oven—the recipe stays the same, but the way you execute it can change.

A `Tool` is just a standard set of rules. Any field in the form that doesn't start with an underscore (`_`) is an 'ingredient' the tool needs. The special fields that *do* start with an underscore are instructions for the system itself.

A Tool's form defines everything about it:

> Sidenote:
> Extra features:
>
> - **`_activity`**: Connects the Tool to a specific computer program to run it. ([003: Agent/Activity](./003_agent_activity.md))
> - **`_module`**: Tells an entirely separate, specialized system to handle the Tool's action. ([009: Agent/Module](./009_agent_module.md))
> - **`_outputPath`**: Lets the Tool save its result so it can be remembered and used later. ([010: Agent/State](./010_agent_state.md))
> - **`_instance`**: Aims the Tool at a specific target when working on many things at once. ([011: Agent/Instancing](./011_agent_instancing.md))

- **`title`**: A simple name for the form.
- **`description`**: Explains what the power does.
- **`parameters`**: The 'ingredients' or information the tool needs to work.
- **`_tool`**: A unique ID for this specific power.
- **`_output`**: Describes what the result should look like.
- **`_reasoningForCall`**: A space where the AI explains why it chose to use this power.

More advanced systems can build cool things on top of these basic blocks, like managing multi-step projects or remembering things.

## Defining a Tool

Tools are defined using a format called JSON Schema. Here's an example of a `Tool` that can figure out if a sentence is happy or sad. This tool is designed to be used by the AI's own brain because it's a language task.

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

A single Tool is useful, but they become really powerful when you give an AI a whole collection of them. The system shows the AI all the available Tool forms at once. The AI can then read through them, choose the best one for the job, and fill in the blanks. The filled-out form it creates is called a `Call`.

> Sidenote:
> - [004: Agent/Call](./004_agent_call.md).

## Using the AI's Brain vs. Using Outside Programs

A `Tool` form by itself is just a plan. To actually *do* something, it needs to be executed in one of two ways:

1.  **Using the AI's Brain (Latent Execution):** The AI just figures out the answer itself. This is great for tasks involving language, creativity, or knowledge it already has, like telling a joke or summarizing a story.
2.  **Using an Outside Program (Explicit Execution):** For actions that need to interact with the real world—like searching the web, checking the weather, or using a calculator—the `Tool` needs to be connected to a piece of computer code. This separate piece of code is called an **Activity**.

The separation of the `Tool` (the plan) from the `Activity` (the action) is super important. It means you can describe all the AI's powers in a simple way, and you can change or update the actual programs that do the work separately. The next document, **[003: Agent/Activity](./003_agent_activity.md)**, explains how `Activities` do the heavy lifting for `Tools`.

> Sidenote:
> - [003: Agent/Activity](./003_agent_activity.md).
