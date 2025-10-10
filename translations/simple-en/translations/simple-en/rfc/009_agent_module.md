# 009: Agent/Module

> **Module**: Think of a Module like a special expert your AI can call for help. It's a complete skill (an `Activity` or an `Idea`), like a mini-app, that can do one specific job. Your AI tells the system it needs a module by using a special tag called `_module`.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [004: Agent/Call](./004_agent_call.md)
> - Works well with:
>   - [008: Agent/Imports](./008_agent_imports.md)

This page explains how Modules work. They let your AI run its tools in a private little workspace. This is super handy because it means the AI can ask another AI helper for advice or do a quick job without making a mess of its main project. It's the best way to build big, smart AI assistants by snapping together smaller, reusable 'Lego' blocks.

## The Problem: Huge Toolboxes and Messy Desks

As AI assistants get more powerful, just giving them one giant toolbox full of every possible tool causes some issues.

1.  **Too Much to Focus On**: An AI can only pay attention to so much at once. If you give it a giant instruction book with hundreds of different tools, it can get overwhelmed and won't know which one to pick for the job.
2.  **Getting Sidetracked**: When all the tools are on the same desk, the AI can get mixed up by things that have nothing to do with its current task. Imagine trying to bake a cake, but your kitchen counter is also covered in tools for fixing a car. You might accidentally grab a wrench instead of a whisk.
3.  **Hard to Reuse**: A tool made for one AI is hard to give to another. You'd have to bring its whole messy desk along with it, which is slow and clunky.

The Module system fixes this by creating a **Module Scope**. Think of it like telling your AI, "For this next job, please go into this separate, clean room and focus only on what's in there."

## The `_module` Tag

To tell the AI to use one of these separate rooms, you add a `_module` tag to its instructions. This tag is a special note that says, "Don't do this job here. Send it to an outside expert."

The `_module` tag is just a short piece of text (a `string`).

- **`_module: 'idea://<idea-name>'`**: This is like giving the system an exact address. It points to another AI helper (an `Idea`) and says, "Send this job over to *that* helper's office. They'll know what to do."
- **`_module: 'anonymous'`**: This is like saying, "I need a clean, empty room right now for a quick job." You aren't calling a specific expert, you're just creating a temporary, private workspace to get something done without any distractions.

## Working in a Clean Room

A module gives the AI a "clean room" to work in. Instead of doing the job in the main, busy workshop, the task is handled in a brand new, empty space. The information needed for this new room is carefully chosen, not just copied over from the main workshop.

This is why the **[Imports system](./008_agent_imports.md)** is so important. The `_imports` tag on the Tool works like a packing list.