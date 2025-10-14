# 006: Agent/Data

> **Data Message:** Think of this as a special kind of sticky note for the AI. It holds organized bits of information (`data`) and sometimes comes with a guide (`schema`) on what that information means. These notes don't get thrown away; they stick around while the AI works, giving it a stable reference point. — [Glossary](./000_glossary.md)

> Sidenote:
> - Depends on:
>   - [001: Agent/Request](./001_agent_request.md)
> - Makes these possible:
>   - [007: Agent/Input](./007_agent_input.md)
>   - [010: Agent/State](./010_agent_state.md)
> - Works together with:
>   - [005: Agent/Loop](./005_agent_loop.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)

This document explains the **Data Protocol**, which is a simple rule for how to give an AI organized, easy-to-understand information. It’s a basic building block used by other parts of the system, like those handling **Input** and **State** (the AI's memory). Unlike regular messages that disappear quickly, `Data` messages are designed to stick around. They stay put as the AI “thinks” in cycles, which gives it a steady memory to work with, especially for tasks that take multiple steps.

## The Data Message

A `Data` message is a simple but smart way to add information to a request you give an AI. It’s a digital package with these parts:

- **`data`**: This is the actual information you're sending. It can be anything from a single word or number to a complex list or object.
- **`schema`**: This is an optional instruction manual. It’s a blueprint that explains what the `data` is, what its parts are, and the rules it follows. It’s how the AI knows a “name” is supposed to be text and an “age” is supposed to be a number.
- **`kind`**: This is an optional label, like `"state"` or `"input"`. It helps both the system and the AI quickly understand the *purpose* of the data. Is it part of the AI’s memory, or is it a new instruction?

By packaging the data with a schema (the blueprint), the message becomes easy for a computer to understand. The schema tells the AI exactly what to expect, which helps it think more clearly. It’s also helpful for people, because it shows them what settings or information they can change.

## Combining and Identifying Data

The system is built to handle many `Data` messages at once. If it sees several messages that are about the same thing, it cleverly combines them into one. This is really useful when you're updating the AI's memory piece by piece, like adding small changes one after another.

How does it know which messages are about the same thing? It mainly looks at the `kind` label. For example, all messages labeled `kind: "state"` are seen as part of the AI’s overall memory. Other rules, like the one for **Instancing** ([011: Agent/Instancing](./011_agent_instancing.md)), can add more specific labels to keep things separate when the AI is working on many tasks at once.

> Sidenote:
> - [011: Agent/Instancing](./011_agent_instancing.md) explains how the system can run many copies of a task at the same time without them interfering with each other.

When there are many messages that need to be combined (like several separate updates to the AI's memory), the system can do one of two things. It can either clean them up first, merging them into one neat package before showing it to the AI, which makes the AI's job easier. Or, it can just give the AI all the pieces, and the AI is smart enough to understand on its own that they all belong together.

## How It Works with Other Rules

The `Data` protocol is a fundamental idea that other, more specific rules build on.

- **Loop:** The AI's thinking process (the loop) uses `Data` messages to remember things from one cycle to the next. A special `Data` message called `State` is how it keeps a persistent memory.

  > Sidenote:
  > - [005: Agent/Loop](./005_agent_loop.md)

- **Input:** The `Input` rule uses a `Data` message to officially list the instructions and settings a request can accept. This is what turns a simple idea into a reusable tool that you can give different inputs to, like a function in programming.

  > Sidenote:
  > - [007: Agent/Input](./007_agent_input.md)

- **State:** The `State` rule uses a `Data` message to act as the AI’s long-term memory for a task. The message's `schema` defines the structure of that memory, like listing all the variables it can remember.

  > Sidenote:
  > - [010: Agent/State](./010_agent_state.md)

- **Instancing:** Imagine you want to run the same task 100 times for 100 different things. Instancing keeps each task separate. It adds a special label (`_instance`) to all `Data` messages, so the information from one task doesn't get mixed up with another.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

## From Information to Action

The `Data` protocol gives us a standard way to hold organized information. Now that we have this container, we can use it for something important: giving clear, structured instructions to a request. This is the key step that turns a static document into a dynamic tool you can actually use.

The next document, **[007: Agent/Input](./007_agent_input.md)**, will show how we use this to define a formal set of inputs for an `Idea`.
