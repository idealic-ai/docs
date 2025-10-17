# 006: Agent/Data

> [!DEFINITION] [Data Message](./000_glossary.md)
> Imagine a special kind of sticky note that doesn't get thrown away. It holds a piece of information (`data`) and sometimes has instructions (`schema`) on how to read it. An AI agent keeps these special notes around while it works, so it always has important information ready.

> Sidenote:
> - Needs this first:
>   - [001: Agent/Request](./001_agent_request.md)
> - Makes these possible:
>   - [007: Agent/Input](./007_agent_input.md)
>   - [009: Agent/State](./009_agent_state.md)
> - Works well with:
>   - [005: Agent/Loop](./005_agent_loop.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)

This document explains the Data Protocol, which is a basic set of rules for sharing information in a clear and organized way. Think of it as the grammar for the AI's memory. Other parts of the system, like those handling Inputs or remembering the AI's State, use this grammar to manage information inside the agent's workspace, called the `context`.

Unlike quick, temporary messages that disappear, Data messages are permanent. They stick around as the agent thinks and works through different steps, giving it a stable memory for complex jobs.

## The Data Message

> Sidenote:
> - [001: Agent/Request](./001_agent_request.md)

A Data message is a simple but smart way to add organized information to a request for the AI. It’s a message that contains a few key parts:

- **`data`**: The actual information, which can be anything like a name, a number, a list, or a more detailed object.
- **`schema`**: An optional guide that explains what the `data` means. Think of it as a blueprint or a legend on a map. It tells the AI, "This piece of data is a person's name, and it should be text," or "This is a number that has to be between 1 and 100."
- **`kind`**: An optional label that tells everyone the purpose of the data, like `"state"` (memory) or `"input"` (new information). This helps the AI tell the difference between all the pieces of info it has.

By putting the data and its blueprint (the schema) together, the message becomes easy for computers to understand. The blueprint helps the AI make smarter decisions and also acts as a user manual, showing people what kind of information they can add or change.

## Merging and Identity

Sometimes, the AI might get several Data messages that are about the same thing. The system is designed to cleverly combine them into one single, neat package. This is super helpful when you're updating something piece by piece, like adding different toppings to a pizza one at a time.

The system knows which messages belong together by looking at their `kind` label. For example, all messages labeled `kind: "state"` are usually considered part of the same thing. Other rules, like the Instancing protocol, can add more specific labels to keep different streams of thought separate, like handling multiple customer orders at the same time without mixing them up.

> Sidenote:
> - [011: Agent/Instancing](./011_agent_instancing.md)

When there are many messages to combine (like several updates to the AI's memory), the system has two ways to handle it. First, the AI’s main thinking process can neatly merge them all into one object before showing it to the AI brain (the LLM). This makes it easier for the AI to understand. Second, the AI itself is smart enough to look at all the separate pieces and understand in its own mind how they fit together to form a single idea.

:::::details{title="Example of how data message are seen by LLM" open=false}

- The regular `text` message is sent as is.
- The two `data` messages are combined into one organized block of text for the AI.

::::columns
:::column{title="What the code looks like"}

```typescript
Agent.Request(config, schema, [
  {
    type: 'text',
    text: "Update the user's city to Austin",
  },

  // Schema is serialized for LLM to understand semantics
  {
    type: 'data',
    kind: 'user',
    description: 'Represents the current user.',
    data: { name: 'John Doe' },
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
        city: { type: 'string' },
      },
    },
  },

  // Second `user` message will merge with the first
  {
    type: 'data',
    kind: 'user',
    data: { age: 30 },
  },
]);
```

:::
:::column{title="What the LLM Sees"}

```typescript
[
  {
    role: 'user',
    content: {
      type: 'text',
      text: "Update the user's city to Austin",
    },
  },
  {
    role: 'user',
    content: {
      type: 'text',
      text: `
        ## Data: ¶user
        {
          "name": "John Doe",
          "age": 30
        }
        Represents the current user.
        Schema for ¶user:
        {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "age": { "type": "number" },
            "city": { "type": "string" }
          }
        }`,
    },
  },
];
```

:::
::::
:::::

## How It Works with Other Protocols

The Data protocol is a basic building block that other, more advanced rules use and build upon.

- **Loop:** The agent's thinking cycle relies on Data messages to remember things from one thought to the next. The State message, which is just a special kind of Data message, is how it holds on to information as it works.

  > Sidenote:
  > - [005: Agent/Loop](./005_agent_loop.md)

- **State:** The State rules use a Data message to act as the agent's long-term, changing memory. The message's schema defines the structure of this memory, explaining what it can remember.

  > Sidenote:
  > - [010: Agent/State](./010_agent_state.md)

- **Instancing:** Instancing rules apply to all Data messages. A special property called `_instance` acts like a lane marker on a highway, keeping data for one task separate from another. Data messages in different lanes won't get mixed up, which allows the AI to work on many things at once safely.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Input:** The Input rules use a Data message to officially list the ingredients a task needs to start. This is what turns a simple instruction into a reusable tool, much like turning a recipe into something anyone can follow.

  > Sidenote:
  > - [007: Agent/Input](./007_agent_input.md)

## From Data to Dynamic Connections

The Data protocol gives us a standard box for holding organized information. Now that we have these boxes, the next step is to learn how to connect them together. This is the magic that lets an AI build workflows where the result of one step automatically becomes the starting point for the next.

The next document, [008: Agent/Variables](./008_agent_variables.md), explains the rules that make these dynamic connections work.