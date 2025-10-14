# 006: Agent/Data

> **Data Message:** Think of this as a special sticky note that doesn't get thrown away. It holds organized information (`data`) and sometimes comes with instructions (`schema`) on what that information means. It stays around so the AI can remember things from one moment to the next.

> Sidenote:
> *   Needs to be read after:
>     *   [001: Agent/Request](./001_agent_request.md)
> *   Helps you understand:
>     *   [007: Agent/Input](./007_agent_input.md)
>     *   [010: Agent/State](./010_agent_state.md)
> *   Works together with:
>     *   [005: Agent/Loop](./005_agent_loop.md)
>     *   [011: Agent/Instancing](./011_agent_instancing.md)

This document explains the **Data Protocol**, which is a basic set of rules for sharing information in a clear, organized way. It's like a universal filing system that other parts of the AI use, such as the [Input](./007_agent_input.md) and [State](./010_agent_state.md) systems, to keep track of information.

Unlike most messages that disappear after they’re read, `Data` messages stick around. This gives the AI a stable memory to work with, which is super important for tasks that take more than one step.

## The Data Message

> Sidenote:
> *   [001: Agent/Request](./001_agent_request.md)

A `Data` message is a simple way to add organized information to a [Request](./001_agent_request.md). Imagine it's a small notecard with three sections:

*   **`data`**: This is the actual information. It can be anything—a name, a number, a list, or a whole collection of details.
*   **`schema`**: This part is optional, but it's like an instruction manual for the `data`. It tells the AI exactly what the information is, what it means, and what rules it follows. For example, it might say, "This number has to be between 1 and 100."
*   **`kind`**: This is a simple label, like `"state"` or `"input"`, that tells everyone the purpose of this notecard. It helps the AI (and people) quickly understand if this is memory, instructions, or something else.

By packaging information (`data`) with its instruction manual (`schema`), the message becomes easy for computers to understand. The `schema` acts as a blueprint, guiding the AI and showing humans what kind of information they can add or change.

## Merging and Identity

The system is designed to handle lots of `Data` messages at once. If it gets several notecards about the same topic, it can combine them into a single, organized page. This is really useful when you need to make several small updates to the AI’s memory.

The main way to know if notecards are about the same topic is their `kind` label. For example, all notecards labeled `kind: "state"` are considered part of the same thing. Other systems, like [Agent Instancing](./011_agent_instancing.md), can add more specific labels to keep things separate when the AI is doing many tasks at once.

> Sidenote:
> *   [011: Agent/Instancing](./011_agent_instancing.md)

When there are multiple messages to combine (like several updates to the AI's memory), the system has two ways to deal with it. First, it can neatly merge them all into one single file before showing it to the AI, making it easier to read. Second, the AI is smart enough to look at all the separate pieces and understand in its own mind how they fit together to form one big picture.

## How It Works with Other Systems

The `Data` protocol is a fundamental building block used by other, more advanced systems.

*   **Loop:** The AI works in a cycle, or a loop, to think through problems. It uses `Data` messages to remember things from one step of the cycle to the next. The `State` message, which is a special type of `Data` message, is how it keeps a running memory.

    > Sidenote:
    > *   [005: Agent/Loop](./005_agent_loop.md)

*   **State:** The `State` system gives the AI its memory. It uses a `Data` message as its "save file," keeping track of everything that's happening. The `schema` for this message defines what the AI can remember.

    > Sidenote:
    > *   [010: Agent/State](./010_agent_state.md)

*   **Instancing:** All `Data` messages can be part of an "instance." Think of it like this: if you open the same app twice on your computer, each window is a separate instance. They don't interfere with each other. A special `_instance` tag keeps `Data` messages separate so the AI can work on many tasks in parallel without getting them mixed up.

    > Sidenote:
    > *   [011: Agent/Instancing](./011_agent_instancing.md)

*   **Input:** The `Input` system uses a `Data` message to officially list the settings or information a `Request` needs to work. This is what turns a simple instruction into a reusable tool, like a function in programming.

    > Sidenote:
    > *   [007: Agent/Input](./007_agent_input.md)

## From Information to Action

The `Data` protocol gives us a standard way to hold organized information. Now that we have this foundation, we can see how it's used to give an AI clear instructions and settings. This is the key step that turns a plain document into a smart, interactive tool.

The next document, **[007: Agent/Input](./007_agent_input.md)**, explains how we use this system to give structured instructions to a `Request`.