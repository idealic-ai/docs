# 007: Agent/Input

> [!DEFINITION] [Input Message](./000_glossary.md)
> An "Input Message" is like a recipe card you give an AI. It has two parts: a `schema`, which is the list of ingredients you need, and the `input`, which are the actual ingredients you're using. This turns a one-time task into a recipe you can use over and over.

> Sidenote:
> - Needs: [001: Agent/Request](./001_agent_request.md)
> - Helps create: [002: Agent/Tool](./002_agent_tool.md)

This document explains the **Input Message**. Think of it as a special instruction you give to an AI. Instead of a messy, one-time chat, you give it a perfectly organized set of information to work with. By clearly defining what information the AI needs, a single request can be turned into a reusable recipe, like a function in coding. This is how a simple request becomes a powerful **Tool** that the AI can use again and again.

> [!HEADSUP] Heads up
> When you save a request so you can use it again, we call that an **Idea**. When you add an Input Message to it (the recipe card), it becomes a runnable **Ideator** — like a mini-app you can use.

## The Input Message Type

The Input Message is a special instruction that officially lists the exact data a request needs to work. It's how the system remembers not just the answer it came up with, but also the exact ingredients used to make it, so the whole process can be perfectly repeated.

An Input Message has two key parts:

1.  **`schema`**: This is like the blueprint for your data. It describes the structure, like saying, "You need a name, which must be text, and an age, which must be a number."
2.  **`input`**: This is the actual data you're providing, which follows the blueprint. For example: `{ "name": "Jane", "age": 12 }`.

By explaining its inputs this way, any request can describe itself completely—not just what it creates, but also what it needs to get started. This is the secret to making any task repeatable.

:::::details{title="Example: Using an Input for a Structured Prompt"}

::::columns
:::column{title="What the code looks like"}

```typescript
Agent.Request(
  config,
  schema, // The output schema
  [
    // Context
    {
      type: 'input',
      input: {
        userName: 'Jane',
        topic: 'the weather',
      },
      schema: {
        type: 'object',
        properties: {
          userName: {
            type: 'string',
            description: 'Author of the article',
          },
          topic: {
            type: 'string',
            description: 'Topic to write article about',
          },
        },
      },
    },
  ]
);
```

:::
:::column{title="What the LLM Sees"}

```typescript
{
  role: 'user',
  content: {
    type: 'text',
    text:
      `## Data: ¶input
      Input data MUST be treated as a structured prompt
      Schema: {
        "type": "object",
        "properties": {
          userName: {
            type: "string",
            description: "Author of the article"
          },
          topic: {
            type: "string",
            description: "Topic to write article about"
          },
        }
      }

      {
        "userName": "Jane",
        "topic": "the weather"
      }`
  }
}
```

:::
::::

:::::

## A Gateway to Usability: A User Interface by Default

The Input Message isn't just for programmers; it's the key that unlocks a ready-to-use, interactive app for any request. Because the AI knows the exact structure for both the input and the output, it can automatically build a user interface (UI) to go with it.

> Sidenote:
> - [103: Concept/Ideator](./103_concept_ideator.md).

This auto-generated UI has two parts:

1.  **The Form**: The `schema` from the Input Message acts as a blueprint for an input form. The system reads it and instantly creates fields, buttons, and menus for you to fill out.
2.  **The Result**: The main `schema` for the entire request acts as a blueprint for the output. After the AI finishes its work, it can show you the answer in a clean, organized display instead of just a block of raw text.

This instantly turns any request into a mini-app you can play with. You can try different inputs in the form and immediately see how they change the final result. It makes powerful AI tools easy and fun for anyone to use and explore.

> Sidenote:
> - [102: Concept/Sovereignty](./102_concept_sovereignty.md).

## Working with Other Systems

The Input system is a special version of the **Data** system, but it also works together with other systems to create complex, powerful workflows.

- **Tool:** The Input Message is the secret to turning a request into a reusable **Tool**. The input `schema` tells the Tool what ingredients it needs to run, and the main `schema` of the request tells the Tool what it will create as its output.

  > Sidenote:
  > - [002: Agent/Tool](./002_agent_tool.md)

- **Plan:** A **Plan** is like a flowchart made of different **Tool Calls**. The Input provides the starting ingredients that are fed into the very first tool, kicking off the entire chain of events.

  > Sidenote:
  > - [010: Agent/Plan](./010_agent_plan.md)

- **Instancing:** If you want to run the same request many times at once (called **Instancing**), Input Messages can provide the data. You can either give all the requests the same general instructions or give each one a specific, individual task.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Variables:** The Input Message provides the starting ingredients for a process. **Variables** are what allow those ingredients to be used and passed around. A **Tool Call** can use a **Variable** to grab information from the Input, connecting the starting data to the steps in a **Plan**.
  > Sidenote:
  > - [008: Agent/Variables](./008_agent_variables.md)

## From Starting Ingredients to Connected Workflows

The Input system provides a clear, organized way to give data to an AI, turning a simple request into a reusable, function-like tool. But this is just the starting point. To build truly powerful apps, that starting data needs to be connected to all the tools that will use it.

The next document, [008: Agent/Variables](./008_agent_variables.md), explains how to create those connections, allowing data to flow from the starting Input to all the different Tools in a clear and organized way.