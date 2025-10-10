# 009: Agent/Module

> **Module**: Think of it like a special, reusable Lego block that knows how to do one specific job (it could be an `Activity` or an `Idea`). You can tell your main agent to use this Lego block with a command called `Call`. To do this, you use a special note called `_module`.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - To get this, you should read:
>   - [004: Agent/Call](./004_agent_call.md)
> - This document goes hand-in-hand with:
>   - [008: Agent/Imports](./008_agent_imports.md)

This document explains **Modules**. A module is a way to run a `Tool` in its own separate, private space. Imagine each tool gets its own clean workshop where it can work without bothering anyone else. This is done by either pointing to another `Idea` or by starting an `Activity` in a totally new, fresh “sub-request.” This is the main way we build complex agents out of smaller, independent, and reusable parts.

## The Problem: Giant Toolboxes and a Confused Mind

When an AI agent learns more and more skills, keeping all of its `tools` organized in one big list becomes a huge mess. Here’s why:

1.  **Instructions Are Too Long**: An AI can only pay attention to so much information at once. If you give it a gigantic list of complicated `tools`, it can get confused and won't be able to pick the right one.
2.  **Mixing Things Up**: Imagine you’re trying to bake a cake and make soup at the same time on the same small table. You might accidentally put sugar in the soup. It's the same with an AI: when all the `tools` are in one place (the “context”), the AI might get distracted by information it doesn’t need and choose the wrong tool or use it incorrectly.
3.  **Hard to Reuse**: If you build a really cool `tool` for one agent, you can't just easily give it to another agent. You’d have to bring the entire messy workbench along with it.

The Module system fixes these problems by creating a **Module Scope**—a way to hand off a command (`Call`) to someone else, who will do the job in their own clean and quiet workshop.

## The `_module` Note

A Module Scope is turned on by adding a special note called `_module` to a `tool`'s description. This note is like a message for the system that says: “Don’t do this job here. Pass it to a specialist module outside.”

The `_module` property is just a line of text.

- **`_module: 'idea://<idea-name>'`**: This is like an address that points to a specific `Idea`. The system knows it needs to run the command in that `Idea`'s workshop.
- **`_module: 'anonymous'`**: This special phrase means “no name module.” You use it when you just need a temporary, clean workspace for an `Activity` but don’t need to create a whole separate `Idea` for it.

## Working in a “Clean Room”

A module provides a “clean room” for a job. Instead of being done in the main agent's noisy and cluttered mind, the command (`Call`) is handled in a new, separate sub-request. The workspace for this job is created from scratch, not copied from the main agent.

This is where the **[Imports Protocol](./008_agent_imports.md)** comes in. The `_imports` note in a `tool`'s description acts like a bridge. It clearly lists which exact pieces of information from the main agent's mind need to be “imported” into the module's clean room. This gives the main agent total control over what the module sees, preventing confusion and allowing you to build truly independent parts.

> Sidenote:
>
> - [008: Agent/Imports](./008_agent_imports.md)

## Mixing and Matching: The Composer and the Sound Designer

Modules let you create powerful setups where some `Ideas` act like specialists that other agents can hire for a job. This creates a clear structure: high-level agents can focus on the big picture (like conducting an orchestra), while passing specific, detailed tasks to low-level modules.

Imagine a high-level **`Composer`** agent and a low-level **`Sound Designer`** module.

- The **`Sound Designer`** is its own `Idea` (`idea://sound-designer`). Its mind contains deep knowledge about how to use a synthesizer. It’s a reusable specialist tool that takes a musical idea and returns a finished audio file.

- The **`Composer`** agent's job is to create a whole song. First, it comes up with the main musical idea. Then, it creates the sounds to bring it to life. For the first part, the `Composer` has its own `tool`, `createMelody`. For the second part, it uses a `tool` called `synthesizeSound`, which passes the work to the specialist by using the note `_module: 'idea://sound-designer'`.

The `Composer`'s process involves a mix of doing things itself and calling on modules:

1.  **Working Internally**: First, the `Composer` uses its own `createMelody` tool. This happens inside its own mind. The result is a set of musical notes and a story for the song.

2.  **Handing off the Task**: Now that it has the melody and story, the `Composer` uses the `synthesizeSound` `tool` several times—once for the main melody, once for the bassline, and so on. Each time it makes this `Call`, here's what happens:
    1.  A new, separate sub-request is created (like opening a new project file).
    2.  The `Sound Designer` `Idea` is loaded. Its own `context`, which contains all its expert knowledge (like, “You are a world-class sound designer who specializes in analog synthesizers...”), becomes the starting point for the new workspace.
    3.  The `Composer` uses `_imports` to pick out the specific parts of its context (the melody, the story of the song) to send over. This imported information is **added** to the `Sound Designer`'s existing expert knowledge.
    4.  The AI in this sub-request now has a **combined mind**: the module's permanent expert instructions, followed by the specific, temporary creative directions from the `Composer`.
    5.  The `Sound Designer` applies its expertise to the creative task and creates the requested sound, which is sent back as the result of the `synthesizeSound` call.

3.  **Putting It All Together**: The `Composer` collects all the sound files it got back from its `Calls` to the `Sound Designer` and combines them with its original melody to create the finished song. In this way, the `Composer` does the high-level creative work and then directs specialist modules to handle the nitty-gritty details.

## Dealing with Huge Instructions

Modules also help with `tools` that produce very large or complicated results. Instead of including a giant `_output` blueprint in the main agent’s thought process (which can clog things up), a `tool` can be described simply with its inputs (`input`) and its `_module` pointer.

The AI can plan to make a `Call` knowing only what information it needs to send. The complicated result will then be created inside the module's private workspace. This lets the agent think about a sequence of complex actions without having to look at gigantic, detailed instructions for every single step. The AI just trusts that the module will create the right result, which it will get back and can use later.

## Ways to Define Modules

A `Tool` becomes a `Module` as soon as it has the `_module` property in its description. This is the signal to pass the `Call` to someone else. The key question is, *when* does the system figure out what that module is? There are two strategies, which let you choose between strict safety and flexible creativity.

### 1. Figuring It Out on the Fly (The Default Way)

The most flexible and common approach is to figure out what the module is **at runtime**—that is, *after* the agent has already decided to make the `Call`.

This method allows the AI to do something that’s impossible in normal computer programming: **the AI acts like smart glue**. The agent can make a `Call` with instructions that don't perfectly match what the module expects. When the job is sent, the system brings together the module's mind and the information from the caller, and the AI inside that new workspace is smart enough to figure out how to “glue” them together and understand what was asked.

This is a huge advantage because modules can be updated and changed independently. Even if a module changes how it works, other agents that use it won't immediately break. The AI will try to adapt the old `Call` format to the module's new `input`, providing a level of flexibility that is unique to this system.

The process looks like this:

1.  The agent decides to use a module `tool` and generates a `Call`.
2.  The system sees the `_module` note and starts the process.
3.  **Building the Mind**: The system finds the module's `Idea` and loads its base knowledge. Then, it uses `_imports` to add the information from the calling agent.
4.  **Matching the Inputs**: The parameters (`params`) from the `Call` are wrapped up in an `Input Message` and added to the mind. This is where the AI acts as “smart glue,” as it will use these inputs to do the module's job, even if they don't perfectly match the instructions.
5.  **Doing the Work**: A new, separate `Request` is created with the combined mind. Its result is sent back as the answer to the original `Call`.

### 2. Figuring It Out in Advance (Optional)

In situations where you need to be extra careful, you can define the module **in advance**, even before the main agent gets its first `Request`.

In this mode, the system looks up the module's `Idea` ahead of time and merges its `input` instructions directly with the `tool`'s description. This lets the main AI agent see the module's exact requirements from the very beginning, guaranteeing that any `Call` it generates will be perfectly structured and error-free.

This approach gives you the kind of reliability you get from traditional software contracts (APIs), but you lose the creative flexibility of figuring things out on the fly. It's best for important, well-defined jobs where you can't afford any mistakes.