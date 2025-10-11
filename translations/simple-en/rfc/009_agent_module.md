# 009: Agent/Module

> **Module**: A way to give a task its own private workspace. When a task has a `_module` tag, it runs in a “clean room.” That clean room is only given the specific information it needs through the `_imports` tag, so it can’t get confused by anything else.

> — [Glossary](./000_glossary.md)

> Sidenote:
> - What you need to know first:
>   - [004: Agent/Call](./004_agent_call.md)
> - What helps to know next:
>   - [008: Agent/Imports](./008_agent_imports.md)

So far, we've talked about how individual `Tools` work. But what happens when you have lots and lots of tools? The **Module Protocol** is the answer. It’s like giving each tool its own special workshop to work in.

Imagine you have a huge, messy garage where you do everything. It’s hard to find things, and you might accidentally spill paint on your woodworking project. Modules let you send a task to a specialist in their own clean, organized workshop. This helps you build really smart and complex helpers (agents) out of small, focused parts that don't get in each other's way.

## The Problem: One Big Toolbox and Messy Projects

As your AI helper gets more capable, putting all its `Tools` in one giant toolbox just doesn't work.

1.  **The Instruction Manual is Too Big**: The AI has a limit to how much information it can handle at once. If you give it a giant instruction manual for hundreds of tools, it gets confused and can't figure out which one to use.
2.  **Getting Your Wires Crossed**: When all the tools are in the same workspace, information from one task can “bleed” over and mess up another. It's like trying to bake a cake while your car repair manual is open on the same kitchen counter—you might accidentally add motor oil instead of olive oil!
3.  **Tools Aren't Easy to Share**: A tool designed for one specific project is hard to reuse for another because it's tangled up with all the other tools and instructions from its original project.

Modules solve this by creating a **Module Scope**, which is like telling the AI, "Don't do this job here. Send it to a specialist's workshop."

## The `_module` Tag

To send a task to a specialist, you add a `_module` tag to its instructions. This tag tells the system not to do the work right here, but to hand it off to an outside helper.

The `_module` tag is a simple piece of text that works in two ways:

- **Point to a Saved Plan (`Idea`)**: The text can be a link to a complete, self-contained plan, called an `Idea`. Think of it like a recipe card. This lets a `Tool` hand off its job to a whole different set of instructions.
  - Example: `../ideas/my-idea.json` or `idea://my-cool-plan`.

  > Sidenote:
  > A saved, shareable plan (**[001: Agent/Request](./001_agent_request.md)**) is the most common type of `Idea`. The Module system is the main way to combine these `Ideas` to build bigger and smarter things. See **[101: Concept/Idea](./101_concept_idea.md)** to learn more.

- **Create a Temporary Workshop**: If you just need a clean workspace for a one-time job, you can use the word `'anonymous'`. This sets up a temporary, private workshop without needing a whole saved plan.

## Working in a Clean Room

A module gives a task a "clean room" to work in. Instead of working in the main, busy office, the task is handled in a brand new, empty room. The only information allowed into this clean room is the information you specifically let in.

This is where the **[Imports Protocol](./008_agent_imports.md)** is super important. The `_imports` tag on the tool is like a permission slip. It lists exactly which pieces of information from the main office can be brought into the clean room. This gives you perfect control over what the module can see, preventing any mess or confusion.

> Sidenote:
> - [008: Agent/Imports](./008_agent_imports.md)

## Handling Huge Plans

Modules also help when a tool creates a really big or complicated result. Instead of trying to describe that huge result in the main plan (which would clutter everything up), you can create a tool with just the simple inputs and a `_module` tag pointing to the specialist.

The AI can plan its steps just by knowing the simple inputs. It trusts that the specialist module will do its job and create the big, complex result in its own private workshop. The AI doesn't need to see all the messy details upfront; it just knows it will get the right result back when it's done.

## Two Ways to Hire a Specialist

A `Tool` becomes a `Module` just by adding the `_module` tag. The important question is *when* the system looks up the specialist's instructions. There are two ways to do this.

### 1. Figure it Out On The Fly (Default)

The normal way is to look up the module's instructions right when the job needs to be done.

This method is really powerful because **the AI acts like a smart middle-manager.** Imagine the main agent gives instructions that aren't *exactly* what the specialist module was expecting. When the job is handed off, the AI inside the specialist's workshop is smart enough to look at the instructions and figure out what was meant. It can bridge the gap.

This is great because you can update your specialist modules without breaking all the old tools that use them. The AI will try to adapt, making the whole system more flexible and resilient.

Here’s how it works:

> Sidenote:
> ```mermaid
> graph TD
>     A[Agent plans a job] --> B{System sees it's for a specialist};
>     B --> C["1. Gets the specialist's workshop ready"];
>     C --> D["2. Gives the specialist the instructions"];
>     D --> E["3. The specialist does the work in private"];
>     E --> F["The specialist is smart & can adapt"];
>     F --> G[The finished job is returned];
> ```

1.  The main agent decides to use the specialist `Tool`.
2.  The system sees the `_module` tag and starts the hand-off.
3.  **Get the Workshop Ready**: The system finds the module's plan (`Idea`) and prepares the clean room. It then uses the `_imports` list to bring in the necessary information from the main office.
4.  **Give the Instructions**: The instructions from the main agent are given to the module. This is where the module's AI might need to be clever to understand them if they don't match perfectly.
5.  **Do the Work**: A new, separate request is made inside the clean room. The result is then sent back to the main agent.

### 2. Check Everything Upfront (Optional)

For jobs where you can't have any mistakes, you can check the module's instructions **before** the main agent even starts working.

In this mode, the system grabs the module's instruction manual and merges it with the main plan. This lets the main agent's AI see the specialist's *exact* requirements from the very beginning, ensuring the job request is perfect. It’s like double-checking a blueprint before you start building to make sure everything will fit together.

This is safer and more predictable, like using a pre-made kit. But you lose the flexibility of letting the AI figure things out on the fly.

## Building Teams of Specialists: The Composer & Sound Designer

Modules let you build powerful teams by allowing different `Ideas` to act like expert services that can be managed by other agents. You can have high-level managers that focus on the big picture, while delegating smaller jobs to focused specialists.

Think of a music studio with two specialists: a **`Composer`** and a **`Sound-Designer`**.

- The **`Sound-Designer`** is a low-level expert. It’s a self-contained `Idea` (`idea://sound-designer`) that knows everything about creating sounds. It knows how to use electronic instruments to make a specific noise.

- The **`Composer`** is a mid-level specialist. Its job is to write a song. It figures out the melody and structure. To actually hear the song, it sends requests to the `Sound-Designer` module to create the right sounds.

This is a simple two-layer team. But the real magic happens when you can arrange your team differently depending on the job.

Now, let's add a high-level **`Producer`** agent. The `Producer`'s goal is to create a finished album. The `Producer` can manage its specialists in different ways:

- **Manager-Style**: To create a song, the `Producer` might just make one call to the `Composer` module. The `Producer` gives a simple direction ("I need a sad song"), and trusts the `Composer` to handle everything, including telling the `Sound-Designer` what to do. The `Producer` doesn't even need to know the `Sound-Designer` exists.

- **Director-Style**: What if the album also needs sound effects, like footsteps or rain? The `Producer` can make requests *directly* to the `Sound-Designer` for those effects, while *at the same time* asking the `Composer` to write the music.

This shows the main point: the team structure isn't fixed. The `Producer` can treat the `Composer` like a self-managing unit, or it can dive in and direct the individual specialists (`Sound-Designer`) itself, all depending on what the project needs. This flexibility allows you to combine the same set of experts in endless ways to solve new problems.
