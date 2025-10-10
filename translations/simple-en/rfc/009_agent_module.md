# 009: Agent/Module

> **Module**: Think of this as a special, reusable tool. It can be a simple instruction (`Activity`) or even a whole other helper agent with its own brain (`Idea`). You can call on it to do a specific job in its own separate workspace. The tag `_module` is what tells the system, "Hey, use a module for this!"
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - To understand this, you should first know about:
>   - [004: Agent/Call](./004_agent_call.md)
> - This works together with:
>   - [008: Agent/Imports](./008_agent_imports.md)

This document explains how we use **Modules**. Modules let us use tools in their own private, clean workspace. This is the main way we can build smart agents that can do complicated things by combining lots of smaller, simpler, reusable parts.

## The Problem: A Messy Workshop and Mixed-Up Instructions

As our AI agents get smarter and learn more skills (we call them `Tools`), just dumping all those skills into one big box becomes a huge problem.

1.  **Too Much to Remember**: Imagine trying to do a task with a manual that's a million pages long. You'd get lost! AI has a similar problem. If you give it too many tools with too many complicated instructions at once, it gets overwhelmed and can't figure out what to do.
2.  **Information Overlap**: When all the tools are in the same workspace, the AI can get confused. It might use information meant for one tool when it's trying to use a different one, leading to mistakes. It’s like accidentally grabbing salt instead of sugar because they were both on the same crowded shelf.
3.  **Hard to Share Tools**: If you build a really cool tool for one agent, it's hard to let another agent use it without also bringing along all the other junk from the first agent's workspace.

Modules solve this by creating a **separate, clean workshop** for each tool when it needs to be used.

## The `_module` Tag

To tell the system to use a separate workshop, we add a special tag called `_module` to a `Tool`'s instructions. This tag tells the system, "Don't do this job here. Send it out to a specialist module."

The `_module` tag is just a piece of text.

- **`_module: 'idea://<idea-name>'`**: This is like saying, "Send this job to our expert helper named `<idea-name>`." The system will find that helper agent and give it the task.
- **`_module: 'anonymous'`**: This is like saying, "I just need a clean, empty workshop for a moment to do this one quick job." It's for when you need a private space without needing a whole separate helper agent.

## Working in a Clean Room

A module gives a task its own "clean room" to work in. Instead of doing the work in the main agent's busy and cluttered central office, the task is handled in a brand new, empty room.

This is where **[Imports](./008_agent_imports.md)** are super important. The `_imports` tag on the `Tool` is like a checklist of a few specific items you need to bring from the main office into the clean room. This lets the main agent control exactly what information the module sees, preventing any confusion and keeping everything tidy and self-contained.

> Sidenote:
>
> - [008: Agent/Imports](./008_agent_imports.md)

## Building Bigger Things: The Composer & The Sound Designer

Modules let us build amazing things by having different agents work together. Imagine a main agent acting as a manager, who gives special tasks to expert helper agents.

Think of a high-level **`Composer`** agent and a specialized **`Sound-Designer`** module.

- The **`Sound-Designer`** is an expert helper (`idea://sound-designer`). Its entire world is about making cool sounds with a synthesizer. It’s a reusable expert that you can give a musical idea to, and it will give you back a finished audio clip.

- The **`Composer`** agent’s job is to write a whole song. It first thinks of a melody, and then it needs to create the actual sounds for that melody. The `Composer` can create the melody itself with its own tool, `createMelody`. But to create the sounds, it uses a different tool called `synthesizeSound`, which passes the job over to the `Sound-Designer` by using the tag `_module: 'idea://sound-designer'`.

Here’s how the `Composer` makes a song by working with its expert helper:

1.  **Thinking up the Idea**: First, the `Composer` calls its own `createMelody` tool. It does this work itself, in its own office, and comes up with the song's tune and a general feeling for it.

2.  **Hiring the Specialist**: Now that it has the melody, the `Composer` needs the actual sounds. It calls its `synthesizeSound` tool several times—once for the main tune, once for the bass, and so on. Every time it calls this tool, this is what happens:
    1.  A new, separate, clean workshop is opened up.
    2.  The `Sound-Designer` helper is brought into this workshop. The `Sound-Designer`’s own brain—which knows everything about synthesizers—is the starting point.
    3.  The `Composer` uses `_imports` to bring in just the necessary notes from its own office, like "Here is the melody" and "Make it sound happy."
    4.  The AI in the workshop gets a mix of two things: the `Sound-Designer`’s permanent expert knowledge and the `Composer`’s specific instructions for this one task.
    5.  The `Sound-Designer` uses its expertise to follow the instructions and creates the perfect sound, which it then sends back.

3.  **Putting It All Together**: The `Composer` collects all the sound clips it got back from the `Sound-Designer` and combines them with its original melody to create the final song. In this way, the `Composer` focuses on the creative vision, while the specialist module handles the technical details.

## Handling Huge, Complicated Tools

Modules also help when a tool produces a very large or complicated result. Instead of making the main agent read a giant, intimidating instruction manual for a tool's result, you can just hide those details inside a module.

The tool can be defined with just the simple questions it needs to ask (`input`) and a pointer using `_module`.

The main agent can plan its work just by looking at the simple questions. The super-complicated result will be created inside the module's clean room. This lets an agent plan out a series of complex steps without having to understand every single tiny detail of every step all at once. The agent just trusts that the module will do its job correctly and deliver the right result, which it can then use for its next step.