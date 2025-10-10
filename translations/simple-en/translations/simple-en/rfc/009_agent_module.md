# 009: Agent/Module

> **Module**: Think of a Module as a specialist you can call for help. It's a self-contained expert on a single topic (an `Activity` or an `Idea`) that you can hire to do a specific job using a `Call`.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [004: Agent/Call](./004_agent_call.md)
> - Complemented by:
>   - [008: Agent/Imports](./008_agent_imports.md)

This document explains how we get different AI helpers, or 'Tools', to work together in a neat and tidy way. It's like building with LEGOs — you use small, separate bricks to build something big and awesome.

## The Problem: Messy Toolboxes and Confusing Conversations

As an AI gets more capable, just throwing all its 'Tools' into one big pile causes issues.

1.  **Too Many Tools**: Imagine trying to find the right screwdriver in a toolbox filled with a million other tools. An AI can only pay attention to a certain number of tools at once. If you give it too many, it gets confused and can't pick the right one for the job.
2.  **Confusing Conversations**: When all the tools are in the same workspace, things get messy. It’s like trying to bake a cake in the kitchen while someone else is loudly talking about fixing a car. The AI might get distracted by information that has nothing to do with what it's trying to accomplish.
3.  **Hard to Reuse Tools**: If you create a great tool for one AI, it's hard to share it with another AI. It's like building a super cool LEGO car, but the wheels are glued on, so you can't use them to build a spaceship later.

This system solves these problems by creating a **Module**. Think of it as sending a task to a specialist who works in a separate, quiet room, so they can focus completely on their job without distractions.

## The `_module` Tag

To tell the system to send a task to a specialist, we use a special note called `_module` inside a Tool's instructions.

The `_module` note is a simple line of text:

- **`_module: 'idea://<idea-name>'`**: This is like putting a specific address on an envelope. It tells the system to send the job to a known expert, an `Idea`, who has their own private workshop and knowledge.
- **`_module: 'anonymous'`**: This is like saying, "I need a clean, empty room for just this one project." It sets up a temporary, quiet space to get a job done, without needing a permanent expert.

## Working in a Clean Room

A module is like a "clean room" — a perfectly tidy, isolated space where work can get done. Instead of doing a job in a busy, messy workshop, the task is sent to this fresh, empty room. Nothing from the outside gets in unless it has a special invitation.

This is where the **[Imports Protocol](./008_agent_imports.md)** is super important. The `_imports` tag on the Tool works like a guest list for the clean room. It lists the *exact* pieces of information from the main workshop that are allowed to enter. This gives the main AI complete control over what the specialist can see, which prevents any mix-ups or confusion.

> Sidenote:
>
> - [008: Agent/Imports](./008_agent_imports.md)

## Building Big Things with Small Pieces: The Composer & The Sound Designer

Modules let you build amazing things. You can have a big-picture AI that acts like a manager, who then gives smaller, specific jobs to specialist AIs.

Let's imagine an AI in charge of writing a song, called the **`Composer`**. And another specialist AI, the **`Sound-Designer`**, who is an expert at creating cool sounds with electronic instruments.

- The **`Sound-Designer`** is its own expert (`idea://sound-designer`). It knows *everything* about creating sounds. It's a reusable specialist that you can give a musical idea to, and it will give you back a real audio file.

- The **`Composer`**'s job is to create a whole song. To do this, it first thinks of a melody. Then, it needs to turn that melody into actual sound. The `Composer` is great at making melodies, but for the electronic sounds, it uses a Tool called `synthesizeSound`. This tool has a special note on it: `_module: 'idea://sound-designer'`, which tells it to pass the job over to the expert.

Here’s how the `Composer` makes a song:

1.  **Thinking Up the Idea**: First, the `Composer` works all by itself to create a melody and a story for its song.

2.  **Hiring the Expert**: With the melody ready, the `Composer` uses the `synthesizeSound` Tool, maybe once for the main tune and again for the bass line. Each time it calls the expert, this is what happens:
    1.  A brand new, empty "clean room" is created for the job.
    2.  The `Sound-Designer` expert is brought into the room. Its own knowledge (like "I'm an expert at cool synth sounds") is the first thing added to the room.
    3.  The `Composer` uses the `_imports` guest list to send over the specific instructions for *this* job, like the melody and the song's story.
    4.  The AI in the clean room now has both sets of instructions: the `Sound-Designer`'s general knowledge and the `Composer`'s specific ideas for this one task.
    5.  The `Sound-Designer` uses its expertise on the instructions to create the sound and sends the finished audio file back.

3.  **Putting It All Together**: The `Composer` gathers all the finished audio files from the `Sound-Designer` and mixes them with its original melody to create the final song. The `Composer` focuses on the big picture, while the specialist handles all the technical details.

## Handling Huge Instructions

Modules are also helpful when a tool needs to create something really big and complicated. Instead of cluttering the main AI's workspace with a giant instruction manual for how the final product should look, you can just point to a module.

The AI can plan its big project knowing only what it needs to *give* to the specialist. It trusts that the specialist will do its job correctly. This lets the main AI plan giant projects without getting lost in every single tiny detail from the start.

## When to Call the Specialist

When a Tool has a `_module` note, it means the job should be sent to a specialist. But when does the system actually make the call? There are two main ways.

### 1. Figuring It Out on the Fly (The Smart Way)

This is the most common and flexible way. It's like talking to a friend. You don't have to be perfectly precise. You can say, "Hey, can you grab me that thing over there?" and your smart friend will look at what you're doing and figure out what you mean.

The main AI can make a request that doesn't perfectly match what the specialist is expecting. When the job is sent over, the AI inside the specialist's "clean room" is smart enough to look at the request and figure out how to make it work. It acts like a clever translator.

This is great because you can update your specialists without breaking everything. Even if an expert changes how they work, other AIs can still talk to them, and the translator AI will try to connect the dots. It makes the whole system tougher and more adaptable.

Here’s a quick look at how it works:

1.  The main AI decides to use the specialist Tool.
2.  The system sees the `_module` note and gets ready.
3.  **Getting the Room Ready**: The system prepares the specialist's "clean room" and uses `_imports` to bring in the necessary info.
4.  **Passing the Note**: The instructions from the main AI are passed to the specialist. The smart translator AI inside the room figures out how to use these instructions, even if they aren't perfect.
5.  **Doing the Work**: A new, separate job starts in the clean room, and the result is sent back to the main AI.

### 2. Checking Everything Upfront (The Strict Way)

For jobs where you absolutely can't have any mistakes, you can check everything first, before the main AI even starts working.

Think of this like filling out an official form for a passport. Every single box must be filled out perfectly, with the exact right information. There's no room for guessing.

In this mode, the system looks up the specialist ahead of time and adds its strict requirements directly to the main AI's tool list. This means the main AI knows the *exact* instructions the specialist needs from the very beginning. This is much safer and guarantees the request will be understood perfectly, but you lose the flexibility of the smart way. It's best for important tasks where you need everything to work predictably, like in a computer program.