# 007: Agent/Input

> **Input Message:** It's like a note that comes with a task, telling you exactly what information you need to get started. It has two parts: a list of rules (`schema`) and the actual information (`input`). This note is what turns a simple `Idea` into a tool you can use, called an `Ideator`. — [Glossary](./000_glossary.md)

> Sidenote:
> - Requires: [101: Concept/Idea](./101_concept_idea.md)
> - Enables: [103: Concept/Ideator](./103_concept_ideator.md)

This document explains the **Input Message**. Think of it as the list of ingredients for a recipe. When you give a regular request ([001: Agent/Request](./001_agent_request.md)) a clear, structured list of what it needs to work, you turn it from a one-time action into a reusable tool, just like a recipe you can use over and over.

This is how a simple `Request` becomes a useful `Tool` that other computer helpers (agents) can use.

> [!TIP]
> A saved recipe is what the system calls an **[101: Concept/Idea](./101_concept_idea.md)**. When you add a list of ingredients (`Input` message) to it, it becomes a hands-on cooking station, or an **[103: Concept/Ideator](./103_concept_ideator.md)**.

## The `Input` Message Type

The `Input` message is a special note that officially lists the information an `Idea` needs to work. It’s the part of the puzzle that records what you started with to get a specific answer (`solution`), giving you a complete picture of the whole process from start to finish.

An `Input` message has two important parts:

1.  **`schema`**: This is like the list of rules for your ingredients. It says you need "flour" (which must be a word), "cups of sugar" (which must be a number), and so on. It defines the shape and type of information required.
2.  **`input`**: These are the actual ingredients you're using right now. For example, "flour" is "whole wheat" and "cups of sugar" is `2`. This is the real data that follows the rules in the `schema`.

By explaining its ingredients this way, any `Idea` can show not only what it creates (the `solution`) but also what it needs to get started. This is the secret to making a task repeatable and understandable.

## A Gateway to Usability: A User Interface Comes Free

The `Input` message isn't just for organization; it's a magic key that automatically creates a friendly, interactive webpage for any `Request`.

> Sidenote:
> - [103: Concept/Ideator](./103_concept_ideator.md).

This webpage has two parts:

1.  **The Form**: The `schema` in the `Input` message is a blueprint for a fill-in-the-blanks form. The system reads these rules and instantly builds a form with text boxes, dropdowns, and buttons, so you can easily enter your information.
2.  **The Result**: The main `schema` of the `Request` (which describes the answer) acts as a blueprint for the results page. After the task is done, the answer (`solution`) is shown in a neat, organized way, not just as a bunch of code.

This turns any `Request` into a mini-app or a playground. You can try out different inputs in the form and instantly see how your changes affect the final result. It makes powerful computer processes feel like simple, interactive tools that anyone can use and explore.

> Sidenote:
> - [102: Concept/Sovereignty](./102_concept_sovereignty.md).

## Connecting with Other Rules

The `Input` message is simple, but it becomes really powerful when it works with other rules in the system. It acts like a bridge connecting raw information, reusable tools, and complex projects.

- **Structured Data**: The `Input` message uses the same principles from the [006: Agent/Data](./006_agent_data.md) document to keep all its information clean and organized.

  > Sidenote:
  > - [006: Agent/Data](./006_agent_data.md).

- **Tool Creation**: The `Input` message is the most important step in turning a `Request` into a reusable [002: Agent/Tool](./002_agent_tool.md). The `schema` from the `Input` becomes the list of settings or buttons for the `Tool`, and the main `schema` of the `Request` tells you what kind of result the `Tool` will give you.

  > Sidenote:
  > - [002: Agent/Tool](./002_agent_tool.md).

- **Making Copies (Instancing)**: When you need to run the same task many times at once ([011: Agent/Instancing](./011_agent_instancing.md)), `Input` messages can give each copy its own unique instructions or provide one set of instructions for all of them to share.
  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md).

## Giving Tools the Bigger Picture

While the `Input` message gives a `Tool` specific ingredients (its parameters), sometimes a `Tool` needs to see the whole kitchen it's working in. For example, it might need to know what other tasks are running or look at a bigger collection of data.

The **Imports** rule is how a `Tool` gets permission to see and use this bigger picture. It lets a `Tool` receive whole chunks of information as context, not just single ingredients.

The next document, [008: Agent/Imports](./008_agent_imports.md), explains how a `Tool` can ask for and receive this background information.
