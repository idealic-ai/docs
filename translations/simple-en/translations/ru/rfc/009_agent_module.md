# 009: Agent/Module

> **Module**: A separate, reusable helper (like an `Activity` or `Idea`) that you can ask for help using a special `Call`. You know it's a module because it has a `_module` tag.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - You need to understand this first:
>   - [004: Agent/Call](./004_agent_call.md)
> - This idea builds on:
>   - [008: Agent/Imports](./008_agent_imports.md)

This guide explains the **Module Rulebook**, which is a way for an AI agent to use its `Tools` in a special, quiet workspace. It can do this by either asking another `Idea` for help or by running an `Activity` in a fresh, clean thought bubble. This is the main way we can build super smart agents out of smaller, reusable pieces.

## The Problem: Giant Toolboxes and Getting Confused

As an AI agent gets more and more skills, putting all of its `Tools` into one giant list becomes a bad idea.

1.  **Too Much to Read**: An AI can only pay attention to so much at once. If you give it a giant instruction book with hundreds of complicated `Tools`, it can get overwhelmed and won't be able to figure out what to do.
2.  **Getting Confused**: When all the `Tools` are jumbled together, the AI might see something that isn't relevant and get distracted. This could cause it to pick the wrong `Tool` or use it incorrectly, like trying to use a hammer when it needs a screwdriver.
3.  **Hard to Share**: A `Tool` built for one agent can't be easily given to another agent without bringing all of its other tools and information along with it.

The Module Rulebook fixes this by creating something called a **Module Workspace**—a way to hand off a job to a separate, focused helper who won't get distracted.

## The `_module` Tag

A Module Workspace is marked with a special `_module` tag in a `Tool`'s instructions. This tag tells the system, "Hey, don't do this job here. Send it to an outside specialist."

The `_module` tag is a piece of text (`string`).

- **`_module: 'idea://<idea-name>'`**: This is like a web address that points to a specific `Idea`. It tells the system to run the job inside that other `Idea`'s world.
- **`_module: 'anonymous'`**: This is like saying, "I need a fresh, clean workspace right now, but I don't need a whole new agent for it." It's used for quick, isolated jobs.

## Working in a Clean Room

A module gives the AI a “clean room” to work in. Instead of trying to do a task in the middle of a noisy, busy workshop (the main agent's mind), the job is handled in a brand new, quiet, and isolated space.

This is where the **[Import Rules](./008_agent_imports.md)** are super important. The `_imports` tag in the `Tool`'s instructions acts like a bridge. It clearly states exactly which pieces of information from the main agent can be brought into the module's “clean room.” This gives the main agent total control over what the module sees, preventing confusion and keeping everything neat and tidy.

## Building and Reusing: The Composer and the Sound Designer

Modules are great because they let you build things out of other things, like LEGO bricks. An `Idea` can act like its own little expert that other agents can hire for help.

Imagine you have a `Composer` agent and a `Sound-Designer` agent.

- The **`Sound-Designer`** is a self-contained `Idea` (at the address `idea://sound-designer`). Its brain is filled with expert knowledge about how to create cool sounds with a synthesizer. It's a reusable specialist.
- The **`Composer`** agent's job is to write a song. One of its `Tools` is `createMelody`. This tool doesn't know anything about synthesizers itself. Instead, it delegates the job to the expert by using the tag `_module: 'idea://sound-designer'`.

When the `Composer` decides to use its `createMelody` tool, here’s what happens:

1.  A new, empty “clean room” is created for the job.
2.  The system invites the `Sound-Designer` `Idea` into that room, along with all its synthesizer knowledge.
3.  Using the `_imports` tag, the `Composer` passes a note into the room that says, "I'm writing a happy, upbeat song."
4.  Now, the `Sound-Designer` AI sees its own expert knowledge *plus* the specific instructions from the `Composer`.
5.  It creates the perfect melody and passes it back to the `Composer` as the result of the `createMelody` tool.

The `Composer` never had to learn how to use a synthesizer, and the `Sound-Designer` never even knew the `Composer` existed. They are separate experts that were brought together just for a moment to achieve a complex goal.

## Handling Huge Instructions

The Module Rulebook also helps when a `Tool` needs to produce a really big or complicated result. Instead of making the main AI agent read a giant instruction manual for the tool's output (which could crowd out other information), we can define the tool with just its input instructions and the `_module` tag.

The main AI can figure out *when* to use the tool just by looking at the simple input it needs. The complicated work of creating the result happens inside the module's private workspace. This lets the agent plan a series of complex steps without needing to see every single tiny detail all at once. The agent trusts that the module will do its job correctly and just waits for the finished result to use in the next step.