# 009: Agent/Module

> **Module**: Imagine a special app on your phone that does one thing really well, like editing photos. A Module is like that—it's a separate, reusable tool that another part of the AI can call on to do a specific job. It's marked with a special `_module` label.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - To understand this, you should first know about:
>   - [004: Agent/Call](./004_agent_call.md)
> - This also works together with:
>   - [008: Agent/Imports](./008_agent_imports.md)

This document explains how we make AI tools work in their own little bubbles. It’s like telling one part of the AI to go into a quiet room to get its job done, so it doesn't get distracted by everything else happening.

This is the main way we can build bigger, smarter AIs by snapping together smaller, specialized parts, like using LEGO bricks to build something amazing.

## The Problem: One Big Toolbox is Messy

As our AIs get more powerful, putting all of their tools into one giant toolbox just doesn't work. Here’s why:

1.  **Too Many Tools for the AI to Read**: The AI that decides which tool to use (the LLM) has a limit on how much information it can handle at once. If you give it an instruction manual with thousands of tools, it gets overwhelmed and can't figure out which one is the right one to use.
2.  **Getting Confused**: When all the tools are jumbled together, the AI can get confused. It might grab a tool for writing a story when it's supposed to be calculating a math problem, just because the tools were sitting next to each other. Information from one job can "bleed" into another and cause mistakes.
3.  **Hard to Share Tools**: If your bike-fixing tools are all mixed up with your car-fixing tools, you can't just hand your "bike toolbox" to a friend. You'd have to give them the whole messy garage. It’s hard to reuse a specific tool if it's tied to everything else.

Modules solve this by creating a **Module Scope**, which is like giving a tool its own clean, separate toolbox for a specific job.

## The `_module` Label: Asking for Help

To turn a tool into a module, we give it a special label in its instructions called `_module`. This label tells the system, "Hey, don't do this job right here. Call in a specialist!"

The `_module` label is a short piece of text.

- **`_module: 'idea://<idea-name>'`**: This is like a direct link to a specialist. It points to another AI `Idea` and says, "Send this job over to that specific specialist to handle it."
- **`_module: 'anonymous'`**: This is like saying, "I just need a clean, quiet workspace for a moment." It’s used for quick jobs that need their own space but don’t require a named specialist.

## Working in a "Clean Room"

A module gives a tool a "clean room" to do its work. Instead of working in the main, noisy workshop where lots of other things are happening, the job is sent to a new, isolated space. Nothing from the main workshop is brought in automatically.

This is where the **[Imports Protocol](./008_agent_imports.md)** is super important. The `_imports` label on the tool is like a checklist on the door of the clean room. It says, "Okay, you can bring these *specific* things in with you." This lets the main AI control exactly what information the specialist module gets to see, which prevents confusion and keeps the tool focused on its job.

> Sidenote:
>
> - [008: Agent/Imports](./008_agent_imports.md)

## Building a Team of Specialists: The Composer & Sound Designer

Modules let us build a team of AIs, where some are bosses and others are specialists. It's like having a project manager who can hand off different tasks to experts.

Let’s imagine we’re making music with a team of two specialist AIs: a **`Composer`** and a **`Sound-Designer`**.

- The **`Sound-Designer`** is the expert on sound. It’s a self-contained module (`idea://sound-designer`) that knows everything about how to use a synthesizer to create a cool bass drop or a sharp drum hit. It just makes sounds.

- The **`Composer`** is the musician. Its job is to write a song—the melody and the chords. To actually hear its song, it needs to call the `Sound-Designer` and say, "Please create a piano sound for this note."

This is a simple two-level team. But the real magic happens when we add a high-level boss, a **`Producer`** AI.

The `Producer`’s goal is to create a finished album. The `Producer` can manage its team in different ways depending on the job:

- **Telling the Team Leader What to Do**: The `Producer` could just tell the `Composer`, "I need a sad song." The `Composer` would then handle the whole process of writing the music and telling the `Sound-Designer` what sounds to create. In this case, the `Producer` doesn't even need to know that the `Sound-Designer` exists.

- **Talking to Everyone Directly**: The `Producer` might also need a special sound effect, like the sound of rain. It can call the `Sound-Designer` directly and say, "Make me a rain sound." At the same time, it can tell the `Composer`, "Keep working on that sad song."

This shows the key idea: the team structure isn't fixed. The `Producer` can treat the `Composer` like a manager or talk to the individual experts directly, depending on what it needs. This makes the system super flexible, allowing the same team of specialists to be combined in many different ways to get new and interesting results.

## Handling Huge Instruction Manuals

Modules also help when a tool produces a very large and complicated result. Imagine a tool that designs a whole car engine. The instruction manual (its `_output` schema) for that engine would be enormous.

Instead of including that giant manual in the main AI's workspace—which would take up too much space—we can make the tool a module. The main AI only needs to see the simple instructions on *how to start* the tool.

The AI can plan to use the tool without seeing all the complicated details of the result. It trusts that the module will do its job correctly in its own clean room. Once the module is finished, the AI gets the completed car engine design back and can use it in the next step.

## When to Call the Specialist

Any tool with the `_module` label becomes a specialist that gets called in. The big question is *when* we check the specialist's instructions. There are two ways to do this, giving us a choice between being super flexible or super safe.

### 1. Figure it Out on a 'Need-to-Know' Basis (The Default Way)

The normal and most flexible way is to figure out the details when the tool is actually **run**.

This allows for something really cool that normal computer programs can't do: **the AI acts like smart glue.** A boss AI can make a request that doesn't perfectly match what the specialist module expects. For example, the boss might ask for a "funky bass sound."

When the specialist module receives this request, another little AI inside its clean room acts as a translator. It looks at the boss's request ("funky bass sound") and compares it to the specialist's list of actual sounds (like "Slap Bass Patch #3"). It figures out what the boss meant and makes the connection.

This is a huge benefit because specialists can be updated and change their tools, and the boss AIs won't immediately break. The AI glue will try to adapt the old request to the new tool list, making the whole system more resilient and flexible.

Here’s how it works:

1.  A boss AI decides to use the specialist tool.
2.  The system sees the `_module` label and starts the process.
3.  **Get Ready**: The system prepares the specialist's clean room and uses `_imports` to bring in any needed information from the boss.
4.  **Translate the Request**: The boss's request is sent to the specialist. This is where the "AI glue" figures out how to make the request work with the specialist's tools, even if the names don't match perfectly.
5.  **Do the Work**: The job is run in the clean room, and the final result is sent back to the boss.

### 2. Check Everything Before You Start (The Super-Safe Way)

For situations where you need to be absolutely sure everything will work perfectly, you can check the specialist's tools **before** the boss AI even starts thinking.

In this mode, the system goes and gets the specialist's exact list of tools and merges it with the boss's tool list from the very beginning. This means the boss AI sees the specialist's exact capabilities from the start.

This is like giving a chef a cookbook with a precise list of all the ingredients available in the kitchen. The chef will only write recipes using those exact ingredients. This guarantees that the request will be perfectly understood, but it's less flexible. If a new ingredient arrives in the kitchen, the chef won't know about it until their cookbook is updated.