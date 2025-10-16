# 006: Agent/Data

> [!DEFINITION] Data Message
> Think of a a **Data Message** as a special kind of message that sticks around. It holds a piece of information (`data`) and sometimes a guide (`schema`) that explains what that information means. It’s like a sticky note that an agent keeps in front of it so it doesn’t forget important details while it works.

> Sidenote:
> - Requires:
>   - [001: Agent/Request](./001_agent_request.md)
> - Enables:
>   - [007: Agent/Input](./007_agent_input.md)
>   - [009: Agent/State](./009_agent_state.md)
> - Complemented by:
>   - [005: Agent/Loop](./005_agent_loop.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)

This document explains the **Data Protocol**, which is a basic set of rules for handling information in a neat, organized way. It’s like the alphabet of our system — other, more complex parts, like [Input](./007_agent_input.md) and [State](./009_agent_state.md), use these rules to manage information. Unlike quick messages that disappear after being read, `Data` messages are designed to stay, giving the agent a stable memory to work with, especially when a task takes multiple steps.

## The Data Message

> Sidenote:
> - [001: Agent/Request](./001_agent_request.md)

A `Data` message is a simple but really useful way to add organized information to a computer’s to-do list ([Request](./001_agent_request.md)). It has three main parts:

- **`data`**: This is the actual information, like a name, a number, a list, or a whole collection of details.
- **`schema`**: This is an optional instruction manual. It tells the computer (the AI) what the `data` is supposed to look like and what it means. It’s like a blueprint that says, "This part is a name, and it has to be text. This other part is an age, and it has to be a number."
- **`kind`**: This is an optional label, like `"state"` or `"input"`, that tells everyone what the message's job is. It helps the AI tell the difference between memory and new instructions.

By putting the information and its instruction manual together, a `Data` message makes everything easy for the computer to understand. It guides the AI and also shows humans what kind of information they can add or change.

## Combining and Identifying Messages

Our system is built to handle many `Data` messages at once. If it sees several messages that seem to be about the same thing, it can merge them into one. This is super helpful when you get a bunch of small updates and want to combine them into a single, complete picture.

The system knows which messages to combine by looking at their `kind` label. For example, all messages labeled `kind: "state"` are usually considered part of the same thing. Other rules, like the **[011: Agent/Instancing](./011_agent_instancing.md)** protocol, can add extra labels to keep things separate when the agent is working on many similar tasks at the same time.

> Sidenote:
> - [011: Agent/Instancing](./011_agent_instancing.md)

When there are multiple messages to combine, the system has two choices. First, it can tidy them up and merge them into one clean piece of information before showing it to the AI. This makes the AI's job easier. Second, the AI is smart enough to look at all the separate pieces and mentally combine them, understanding that they all describe different parts of the same whole.

## How It Works with Other Rules

The `Data` rules are the foundation that other, more advanced rules are built on.

- **Loop:** When an agent works in a repeating cycle (a loop), it uses `Data` messages to remember what happened in the last cycle. Specifically, it uses a `State` message, which is just a special type of `Data` message, to carry its memory forward.

  > Sidenote:
  > - [005: Agent/Loop](./005_agent_loop.md)

- **State:** The `State` rules use a `Data` message to act as the long-term memory for a task. The `schema` for this message defines the structure of that memory, like what details it can remember.

  > Sidenote:
  > - [010: Agent/State](./010_agent_state.md)

- **Instancing:** The `Instancing` rules make sure that when an agent is doing many tasks in parallel, the `Data` for one task doesn't get mixed up with another. It gives each task a unique ID, so their `Data` messages are kept separate and aren't merged.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Input:** The `Input` rules use a `Data` message to officially list what kind of information a task needs to get started. This turns a simple task into a reusable tool, like a calculator button that knows it needs numbers to work.

  > Sidenote:
  > - [007: Agent/Input](./007_agent_input.md)

## From Information to Connections

The `Data` protocol gives us a neat way to store organized information. Now that we have these organized containers, the next step is to figure out how to connect them. This is how we let an agent build amazing things where the result of one step automatically becomes the starting point for the next one.

The next document, **[008: Agent/Variables](./008_agent_variables.md)**, explains how we make those dynamic connections happen.
