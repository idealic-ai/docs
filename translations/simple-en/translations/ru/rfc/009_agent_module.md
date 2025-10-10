# 009: Agent/Module

> **Module**: A separate, reusable piece of logic (an `Activity` or `Idea`) that you can ask your main program to use. Think of it like a special LEGO brick that you can use in many different creations. You tell the program to use it with the `_module` tag.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [004: Agent/Call](./004_agent_call.md)
> - Related to:
>   - [008: Agent/Imports](./008_agent_imports.md)

This document explains how to use **Modules**. Modules let you run `Tools` in their own separate, clean workspace. This is like telling your program to use another program (an `Idea`) or to start a new, fresh task (`Activity`). It's the main way to build really smart and complex behaviors from smaller, self-contained, and reusable parts.

## The Problem: Giant Toolboxes and Mixed-Up Instructions

As your program (or 'agent') gets more powerful, putting all its `Tools` in one giant, single toolbox becomes a bad idea.

1.  **Instruction Overload**: The AI (the LLM) is smart, but if you give it an instruction manual with thousands of pages at once, it can get confused. If you give it too many complicated `Tools` to choose from at the same time, it might not be able to figure out which one to use.
2.  **Mixed-Up Instructions**: Imagine you're baking a cake, but the cookbook also has instructions for fixing a car on the same page. You might get confused and grab a wrench instead of a whisk. When all the `Tools` are in the same place, the AI can get distracted by irrelevant information and make the wrong choice.
3.  **Hard to Reuse Parts**: If you build a really cool engine *inside* a specific toy car, you can't easily take it out and use it in a toy boat. It's stuck. `Tools` defined for one agent are hard to share with another.

Modules solve these problems by introducing a **Module Scope**—a way to hand off a job to a separate, clean workshop designed for just that task.

## The `_module` Tag

To tell a `Tool` to use a module, you give it the `_module` property tag. This tag tells the system: "Don't do this job here. Send it to an outside specialist."

The `_module` tag is a simple piece of text (`string`).

- **`_module: 'idea://<idea-name>'`**: This is like giving a specific address for the specialist's workshop. It tells the system to run the job using the rules and context of a specific `Idea` (another program).
- **`_module: 'anonymous'`**: This is like saying, "I just need a clean, empty workbench for a moment." You use this when you need a private space to run a single `Activity` without needing the full setup of a named `Idea`.

## Working in a "Clean Room"

A module gives you a "clean room" to do a job. Instead of running in the main program's busy and cluttered workspace, the job is handled in a brand new, empty room. The instructions and materials for this new room are brought in specially for the task, not just inherited from the main workspace.

This is where the **[Imports Protocol](./008_agent_imports.md)** is super important. The `_imports` tag on a `Tool` is like a shopping list. It tells the main program exactly which tools and materials from its own workspace to "import" into the module's clean room. This gives the main program precise control over what the module can see, preventing any mix-ups and keeping everything tidy and self-contained.

> Sidenote:
>
> - [008: Agent/Imports](./008_agent_imports.md)

## Building with Blocks: The Composer and the Sound Designer

Modules let you build big things out of smaller, independent blocks. You can have `Ideas` that act like specialized services, which other agents can then direct and manage. This creates a clear structure: high-level agents can focus on the big picture, while they hand off the detailed, specialized work to low-level, reusable modules.

Let's imagine a high-level agent called **`Composer`** and a low-level module called **`Sound-Designer`**.

- The **`Sound-Designer`** is a self-contained `Idea` (`idea://sound-designer`). Its rulebook contains expert knowledge about how to create cool synthesizer sounds. It's a reusable specialist that takes a musical idea and returns a finished audio clip.

- The **`Composer`** agent's job is to create a whole song. Its plan is to first come up with a melody, and then create the sounds to play that melody. The `Composer` has its own built-in `Tool`, `createMelody`, for the first part. For the second part, it uses a `Tool` called `synthesizeSound` that hands off the work by using the tag `_module: 'idea://sound-designer'`.

Here’s how the `Composer` works, mixing its own work with work it sends to modules:

1.  **Do It Yourself**: First, the `Composer` calls its own `createMelody` tool. This happens in the `Composer`'s own workspace. It comes up with a melody and an overall story for the song.

2.  **Delegate to a Specialist**: Now that it has the melody, the `Composer` calls the `synthesizeSound` `Tool` several times—once for the main keyboard part, once for the bass, and so on. Each time it makes this `Call`, here's what happens:
    1.  A new, clean workshop is set up.
    2.  The `Sound-Designer` `Idea` is loaded. Its own built-in knowledge (like "You are a world-class sound engineer who loves analog synths...") becomes the foundation for this new workshop.
    3.  The `Composer` uses `_imports` to send over specific parts of its context (like the melody and story). This imported information is **added** to the `Sound-Designer`'s expert knowledge.
    4.  The AI in this new workshop gets a **combined context**: the module's expert instructions, plus the specific creative task from the `Composer`.
    5.  The `Sound-Designer` uses its expertise on the creative task it was given and generates the requested sound. This sound is sent back as the result of the `synthesizeSound` `Call`.

3.  **Put It All Together**: The `Composer` collects all the sounds it got back from the `Sound-Designer` and mixes them with its original melody to create the final song. In this way, the `Composer` focuses on the high-level creative vision, while orchestrating specialist modules to handle the detailed work.

## Handling Huge Instruction Manuals

Modules also help you manage `Tools` that produce very big or complicated results. Imagine a tool that designs a super-detailed 3D model. The instructions for describing that model (`_output` schema) could be hundreds of pages long. Instead of cluttering up the main AI's brain with that giant manual, you can define the `Tool` with just what it needs as `input` and a `_module` pointer.

The AI can plan to use the tool knowing only what it needs to provide. The complex 3D model will be generated in the module's separate, clean workspace. This lets the agent plan out a series of complex steps without having to see every single tiny detail of every step all at once. The AI trusts that the module will produce the right result, which it can then use in later steps.

## How the System Connects to Modules

A `Tool` becomes a `Module` just by adding the `_module` tag to it. This is a signal to hand off the job. The big question is *when* the system figures out how to make that connection. The system has two main strategies, letting you choose between being super flexible or super safe.

### 1. Connecting On-the-Fly (Default)

The normal and most flexible way is to figure out how to connect to the module **at runtime**—that is, *after* the agent has already decided to make the `Call`.

This method allows for something really cool that normal computer code can't do: **the AI acts as smart glue.** The agent can ask to use a module with information that doesn't perfectly match what the module expects. When the call happens, the system puts the module's rules and the agent's request together, and asks the AI in this new workspace to "figure it out."

This is a huge advantage because it means modules can be updated and change over time. Even if a module starts asking for information in a new format, the agents that use it won't instantly break. The AI will try to adapt the old request to the new format, making the whole system more resilient and loosely connected.

Here’s how it works:

1.  The agent decides to `Call` a module `Tool`.
2.  The system sees the `_module` tag and starts the hand-off process.
3.  **Gather Instructions**: The system gets the module's `Idea` (if it has one) and its base instructions. Then it uses `_imports` to add any specific instructions from the agent making the call.
4.  **Match Inputs**: The `params` from the `Call` are packaged up and added to the instructions. This is where the AI's "smart glue" ability comes in—it will use this information to do the job, even if it's not a perfect match for what the module usually expects.
5.  **Do the Work**: A new, separate `Request` is created with the combined instructions. The result is sent back as the output of the original `Call`.

### 2. Connecting Ahead of Time (Optional)

For situations where you need to be extra careful and sure about things, the module can be connected **ahead of time**, before the main `Request` is even sent to the agent.

In this mode, the system pre-loads the module's `Idea` and merges its `input` requirements directly with the `Tool`. This lets the agent's AI see the module's exact needs from the very beginning, making sure the `Call` it creates is perfectly formatted and safe.

This approach gives you the kind of safety you get with traditional programming, but you lose the flexibility of connecting on-the-fly. It's best for critical, well-defined jobs where you don't want any guesswork.