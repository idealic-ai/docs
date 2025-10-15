# 007: Agent/Input

> **Input Message:** Think of this as a recipe card for a computer task. It lists what ingredients (`input` data) you need and the rules for them (`schema`), turning a simple instruction into a reusable set of steps.

> Sidenote:
>
> - Requires: [001: Agent/Request](./001_agent_request.md)
> - Enables: [002: Agent/Tool](./002_agent_tool.md)

This document explains the **Input Message**. It’s a special instruction that gives a clear, structured prompt to another message type called a [Request](./001_agent_request.md). By clearly defining what information a `Request` needs to produce a final `solution`, the `Input` message turns a one-time command into a reusable tool, much like a function in programming. This is how a simple `Request` can become a powerful `Tool` that other AI agents can use again and again.

> [!HEADSUP] Heads up
> A saved `Request` that you can run over and over is called an **[Idea](./101_concept_idea.md)**. When you add an `Input` message to it (giving it a recipe card), it becomes a runnable app called an **[Ideator](./103_concept_ideator.md)**.

## The `Input` Message Type

The `Input` message is specifically designed to announce what kind of data a `Request` needs to work. It’s the official way of recording the ingredients used to create a result, giving you a complete and repeatable record of a task.

An `Input` message has two main parts:

1.  **`schema`**: This is a blueprint (specifically, a JSON Schema) that describes the structure, type, and rules for the data the `Request` is expecting. It’s like saying, “You need to give me a number, a word, and a date in this exact format.”
2.  **`input`**: This is the actual stuff you give it. It follows the rules of the `schema`. For example, the number `42`, the word `"hello"`, and the date `"2024-10-26"`.

By defining its needs this way, any `Request` can describe not only what it produces (its `solution` and `schema`) but also what it needs to get started. This is the secret to making any task repeatable.

## A Gateway to Usability: A User Interface Comes Free

The `Input` message isn't just for organization; it’s what makes any `Request` instantly usable by a person. Because a `Request` has a clear blueprint for both its input and its output, the system can automatically create a user interface for it.

> Sidenote:
>
> - A runnable app called an [Ideator](./103_concept_ideator.md).

This interface has two parts:

1.  **The Form**: The `schema` from the `Input` message acts as a guide for building an input form. The system reads it and instantly creates fields, dropdowns, and buttons for you to fill out, complete with helpful tips and error-checking.
2.  **The Result**: The main `schema` of the `Request` provides the blueprint for the output. Once the task is done, the `solution` is shown in a clean, organized way, not just as a blob of raw data.

This turns any `Request` into an interactive tool. You can experiment with different inputs in the form and instantly see how they change the final result. It makes creating and using powerful tools easy for everyone, turning complex computer processes into simple apps you can play with.

> Sidenote:
>
> - This relates to the concept of [Sovereignty](./102_concept_sovereignty.md), where every tool has clear boundaries and defined interactions.

## Working with Other Parts of the System

The `Input` message is simple on its own, but it becomes powerful when combined with other system rules. It acts as the connection between raw data, reusable tools, and complex workflows.

- **Structured Data**: The `Input` message is a practical use of the ideas from the [006: Agent/Data](./006_agent_data.md) document. It’s a specific pattern for giving well-defined and validated information to a `Request`.

  > Sidenote:
  >
  > - See [006: Agent/Data](./006_agent_data.md).

- **From a One-Off Task to a Reusable Tool**: The `Input` message is what turns a `Request` into a reusable [Tool](./002_agent_tool.md). It maps the parts of the `Request` to the `Tool`'s interface:

  > Sidenote:
  >
  > - Making it a [Tool](./002_agent_tool.md).
  1. The **`schema` from the `Input` message** defines the `Tool`'s **parameters**. It tells other programs what information the `Tool` needs to run.
  2. The **main `schema` of the `Request`** defines the `Tool`'s **output**. It describes what kind of result the `Tool` will produce.

  This lets you create new `Tools` instantly. Just by adding a structured `Input` to a `Request`, you give it a clear interface, making it a ready-to-use component for other AI agents.

- **Running Multiple Copies (Instancing)**: When used with the [011: Agent/Instancing](./011_agent_instancing.md) rules, `Input` messages can provide data for tasks that need to run many times. You can give one set of instructions to all copies at once, or give specific instructions to each individual copy.
  > Sidenote:
  >
  > - See [011: Agent/Instancing](./011_agent_instancing.md).

## Providing Background Information for Tools

While the `Input` message provides the direct ingredients a `Tool` needs, sometimes a `Tool` also needs to know about its environment, like the current `State` of the system or other available data. The **Imports** system is how a `Tool` gets this background information. It controls what a `Tool` is allowed to see and use from its surroundings.

The next document, [008: Agent/Imports](./008_agent_imports.md), explains how a `Tool` can ask for and receive this extra context.
