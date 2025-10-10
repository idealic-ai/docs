# 009: Agent/Module

> **Module**: Think of this as a special tool or a mini-program that can be used over and over again. It has its own set of instructions (an `Activity` or an `Idea`) and you can "call" it to do a specific job. You know you're using one when you see the `_module` tag.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [004: Agent/Call](./004_agent_call.md)
> - Complemented by:
>   - [008: Agent/Imports](./008_agent_imports.md)

This guide explains how we use **Modules**. Modules are like hiring a specialist for a task. Instead of trying to do everything in one big program, you can call on another set of instructions (an `Idea`) or a specific action (`Activity`) to do a job in its own separate, clean workspace. This is the main way we build smart agents that can do complex things by snapping together smaller, reusable parts.

## The Problem: Messy Toolboxes and Getting Confused

Imagine trying to build a robot, bake a cake, and paint a picture all in the same room with all your tools scattered everywhere. It would get messy and confusing fast! That's what happens when you put all of an AI agent's tools into one giant pile.

1.  **Too Many Instructions**: An AI, like a person, can only handle so much information at once. If you give it a huge manual with instructions for hundreds of complicated tools, it gets overwhelmed and can't figure out which one to use.
2.  **Confusing Clutter**: When all the tools are in the same workspace, the AI might get confused. It might see instructions for baking a cake while it's trying to build a robot and pick the wrong tool or use it incorrectly.
3.  **Hard to Share Tools**: If you build a cool new painting tool for one project, it's hard to take it and use it in another project without bringing the entire messy workshop along with it.

Modules solve these problems by giving each task its own clean, organized workspace.

## The `_module` Tag

To tell the agent to use a module, we add a special tag called `_module` to a tool's instructions. This tag is a signal that says, "Don't do this job here. Send it out to a specialist module."

The `_module` tag is a simple piece of text:

- **`_module: 'idea://<idea-name>'`**: This is like giving the job to a named expert. It points to a specific `Idea` (another set of instructions) that knows exactly how to handle this task. For example, `idea://sound-designer`.
- **`_module: 'anonymous'`**: This is like setting up a temporary, clean workbench for a one-time job. It creates a new, isolated workspace just for this single task, without needing a whole separate `Idea`.

## Working in a Clean Room

A module gives a task a "clean room" to work in. Instead of doing the job in the middle of the main, busy project, the task is sent to a brand new, empty workspace. Nothing from the main project comes along unless it's specifically invited.

This is where **[Imports](./008_agent_imports.md)** are super important. The `_imports` tag on a tool acts like an invitation list. It tells the system exactly which pieces of information from the main project are needed in the module's clean room. This way, the module gets only the information it needs, which stops it from getting confused by clutter and keeps everything neat and separated.

## Building with Blocks: The Composer & The Sound Designer

Modules let us build really powerful things by snapping different experts together, almost like LEGO blocks.

Imagine we have two AI agents:

- The **`Sound-Designer`** is an expert module (`idea://sound-designer`). It knows everything about creating sounds with a synthesizer. It has its own instructions and just waits for someone to ask it to make a sound.
- The **`Composer`** is another agent whose job is to write a song. It doesn't know how to create sounds itself, but it knows it needs a melody.

One of the `Composer`'s tools is `createMelody`. Instead of trying to figure out how a synthesizer works, this tool simply delegates the job by saying `_module: 'idea://sound-designer'`.

So, when the `Composer` wants to create a melody:

1.  The system sees the `_module` tag and creates a new, clean workspace.
2.  It loads the `Sound-Designer`'s expert instructions into this new space.
3.  Using `_imports`, the `Composer` passes along a note, like "I need a happy, upbeat melody for the song's chorus."
4.  The `Sound-Designer` agent now has its own expert knowledge plus the specific request from the `Composer`.
5.  It creates the perfect melody and sends it back to the `Composer`.

The `Composer` never had to learn about synthesizers, and the `Sound-Designer` never needed to know it was part of a bigger song. They are separate experts that can work together to create something amazing.

## Handling Huge, Complicated Tasks

Modules also help when a tool creates something really big and complicated.

Imagine a tool that designs a full 3D model of a car. The instruction manual for that car (the output) would be huge! Instead of making the main AI agent read that giant manual upfront, we can use a module.

The tool can be defined with just the simple inputs (like `color: 'red'`, `type: 'sports-car'`) and a `_module` tag pointing to the car-design expert.

The main AI can plan its steps by just saying, "Okay, first, I'll ask the car module to design a red sports car." It trusts that the module will handle all the complex details. Then, once the car model is finished, the module hands it back, and the AI can use it in the next step of its plan. This keeps the main plan simple and easy to understand, even when dealing with very complex tasks.