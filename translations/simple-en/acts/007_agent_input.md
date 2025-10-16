# 007: Agent/Input

> [!DEFINITION] Input Message
> This is a message that gives an AI a clear set of ingredients to work with. It includes a `schema` (the recipe telling you what ingredients are needed) and `input` (the actual ingredients). It turns a one-time instruction into a reusable tool, like a function in coding.

> Sidenote:
> - Requires: [001: Agent/Request](./001_agent_request.md)
> - Enables: [002: Agent/Tool](./002_agent_tool.md)

This document explains the **Input Message**, which is a special note you give to an AI to tell it exactly what information it needs to start a task. Think of a normal `Request` as just asking the AI to do something once. By adding a formal `Input` message, you turn that one-time request into a reusable tool, almost like a mini-app that can be run over and over again with different starting information.

This is how a simple `Request` evolves into an executable `Tool` that other AIs can use.

> [!HEADSUP] Heads up
> When you save a `Request` so you can run it again, the system calls it an **[101: Concept/Idea](./101_concept_idea.md)**. If you add an `Input` message to it, telling it what information it needs to run, it becomes an executable **[103: Concept/Ideator](./103_concept_ideator.md)**.

## The `Input` Message Explained

The `Input` message is how you formally tell a `Request` what data it should expect. It's the key to making a task repeatable because it creates a complete record of what was used to get a particular answer.

An `Input` message has two main parts:

1.  **`schema`**: This is like the blueprint or the recipe. It's a set of rules (a JSON Schema) that describes what the input data should look like—for example, “You need one number and one line of text.”
2.  **`input`**: This is the actual data you're providing for a specific task. It follows the rules set by the `schema`. For example, the number is `10` and the text is `"Hello, World!"`.

By defining its starting data this way, any `Request` can explain not only what it produces (its `solution` and `schema`) but also what it needs to get started. This is what makes it possible to run the exact same process again and get a predictable result.

## A Shortcut to a User-Friendly App

The `Input` message isn't just for the AI; it's also a magic key for creating a web page or app that a person can use.

Because both the input and the output are described by clear blueprints (`schemas`), a user interface (UI) can be built automatically for any `Request`.

> Sidenote:
> - [103: Concept/Ideator](./103_concept_ideator.md).

This automatically-generated app has two parts:

1.  **The Form**: The `schema` inside the `Input` message is used to build an input form. If the schema says it needs a number and some text, the system automatically creates a number field and a text box for you.
2.  **The Result**: The main `schema` of the `Request` (the one describing the output) is used to display the final answer. Instead of just getting a jumble of raw data, the `solution` is shown in a clean, organized way that makes sense.

This turns any `Request` into an interactive playground. A person can play around with different inputs in the form and instantly see how their changes affect the final result. It makes powerful AI tools easy to use and understand for everyone.

> Sidenote:
> - [102: Concept/Sovereignty](./102_concept_sovereignty.md).

## How `Input` Works With Other Parts

The `Input` message is a simple idea, but it becomes very powerful when combined with other parts of the system. It connects raw data to reusable tools and complex workflows.

- **Structured Data**: The `Input` message is a special use of the ideas from the [006: Agent/Data](./006_agent_data.md) document. It's a specific way of giving nicely organized data to a `Request` at the very beginning of a task.

  > Sidenote:
  > - [006: Agent/Data](./006_agent_data.md).

- **From a Single Request to a Reusable Tool**: The `Input` message is what turns a one-time `Request` into a reusable [002: Agent/Tool](./002_agent_tool.md). Imagine you ask a chef to bake a specific cake once. The `Input` message is like writing down the recipe so anyone can bake that cake anytime.

  > Sidenote:
  > - [002: Agent/Tool](./002_agent_tool.md).
  1. The `schema` from the **`Input` message** tells the `Tool` what **ingredients** it needs. (This defines the `Tool`'s parameters).
  2. The main `schema` of the **`Request`** describes the **cake** you get at the end. (This defines what the `Tool` produces).

  This lets you create new `Tools` instantly. Just give an existing `Request` a structured `Input`, and you’ve created a new mini-app that other AIs can call on to get work done.

- **Doing Many Tasks at Once (Instancing)**: When you use `Input` messages with the [011: Agent/Instancing](./011_agent_instancing.md) system, you can kick off many copies of a task at the same time. You can either give all of them the same starting data or give each one a unique piece of information to work with.
  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md).

## From Simple Inputs to Smart Workflows

The `Input` message provides the starting data to kick off a process. But to build truly powerful AI agents, we need data to flow dynamically between steps. These next documents explain how that works:

1.  **[008: Agent/Variables](./008_agent_variables.md):** `Variables` are like the wires that connect everything. They let one tool's output become another tool's input.
2.  **[009: Agent/State](./009_agent_state.md):** `State` is like the AI's short-term memory or scratchpad. It holds information as the AI works through multiple steps.
3.  **[010: Agent/Plan](./010_agent_plan.md):** With `Variables` to connect tools and a `State` to work in, the AI can create a `Plan`—a full map of how to get from the beginning to the end of a big task.
4.  **[011: Agent/Instancing](./011_agent_instancing.md):** Finally, `Instancing` allows one `Plan` to be run on thousands of different tasks at the same time.
