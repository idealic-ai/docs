# 009: Agent/Module

> **Module**: A way to give a task its own private workspace. When you tell a program to use a module, it runs the task in a special “clean room” so it doesn’t get confused by other things happening. To give it the information it needs, you use a special list called `_imports` which is like a keycard that only lets specific data into the room. — [Glossary](./000_glossary.md)

> Sidenote:
> - To understand this, you should first read about:
>   - [004: Agent/Call](./004_agent_call.md)
> - This works together with:
>   - [008: Agent/Imports](./008_agent_imports.md)

So far, we’ve talked about how individual `Tools` get their jobs done. But what happens when you have lots of tools and want them to work together without getting in each other's way? That's where the **Module Protocol** comes in.

It’s a system for running `Tools` in their own private workspaces, or “clean rooms.” This stops them from messing with each other and makes them truly reusable. An AI can hand off a job to a module, which works like a separate mini-program, allowing you to build very smart and complex behaviors out of smaller, independent parts.

## The Problem: One Big Toolbox and Messy Workspaces

As an AI gets more powerful, just dumping all its `Tools` into one giant toolbox becomes a problem.

1.  **Too Much to Read**: Imagine giving an AI a manual that's a thousand pages long. It has limits on how much it can read and understand at once. If you give it too many complicated `Tools`, it gets overwhelmed and can't use them correctly.
2.  **Getting Confused**: When all the `Tools` are in the same workspace, the AI can get distracted by information that has nothing to do with the current task. It might grab the wrong tool or use it incorrectly because it's confused by all the clutter.
3.  **Hard to Share**: A `Tool` built for one AI assistant is hard to move to another one. It’s like trying to move a single brick that’s glued to an entire wall — you have to take the whole messy wall with it.

The Module system solves this by creating **Module Scope**, which is like giving each `Tool` its own room to work in.

## The `_module` Property: The “Go Here” Sign

Module Scope is turned on by using the `_module` property inside a `Tool`'s instructions. This property tells the system, “Don’t run this job here. Send it to a special module to handle it.”

The `_module` property is a simple piece of text that works in two ways:

- **Point to a Saved Plan**: The text can be an address (like a web link) to a file that contains a complete, self-contained plan, called a `Request`. This lets one `Tool` hand off its entire job to another set of instructions.

  > Sidenote:
  > A saved, shareable plan (a [001: Agent/Request](./001_agent_request.md)) is the most common kind of `Idea`. The Module system is the main way to combine these `Ideas` to build bigger and more complex things. See [101: Concept/Idea](./101_concept_idea.md) for more info.

- **Create a Temporary Workspace**: If the text is just the word `'anonymous'`, it tells the system to create a brand new, empty workspace on the spot for the job. You don’t need a pre-saved file; it’s like renting a clean, empty room for a single task.

## Working in a Clean Room

A module gives a task a “clean room” to work in. Instead of operating in the main AI’s busy and cluttered office, the job is handled in a fresh, isolated space. The new space starts empty; it doesn’t automatically get all the information from the main office.

This is why the [Imports Protocol](./008_agent_imports.md) is so important. The `_imports` property on a `Tool` acts like a security guard at the door of the clean room. It has a list of exactly what information from the main office is allowed inside. This gives the main AI total control over what the module sees, preventing confusion and keeping everything neatly organized.

> Sidenote:
> - [008: Agent/Imports](./008_agent_imports.md)

## Handling Huge amounts of information

The Module system also helps when a `Tool` needs to produce a very large or complicated result. Instead of making the main AI worry about all the tiny details of the result, you can put that complexity inside a module.

The AI just needs to know what ingredients to give the module. It can then plan its next steps, trusting that the module will figure out the complicated result on its own. The main AI doesn’t need to see the entire messy recipe; it just waits for the finished cake to come out of the module's kitchen. It can then take that finished cake and use it for the next step.

## How to Look Up a Module

A `Tool` becomes a `Module` just by having the `_module` property in its instructions. This tells the system to hand off the job. The big question is *when* the system figures out where to send the job. There are two ways to do this.

### 1. Figuring It Out on the Fly (The Default Way)

The most common and flexible way is for the system to look up the module **when it's time to run the task**, after the AI has already decided what to do.

This method allows for something really cool that normal computer programs can't do: **the AI acts like smart glue.** An AI might tell a module to do something but give it instructions that don’t perfectly match what the module expects. When the system sends the job over, the AI inside the module's clean room is smart enough to figure out what was meant and make it work.

This is a huge benefit because it means modules can be updated and changed without breaking everything. If a module's instructions change a little, other AIs can still talk to it, and the module’s AI will try to adapt. It creates a flexible system where parts can evolve on their own.

Here's how it works:

1.  An AI decides to use a `Tool` that is a module.
2.  The system sees the `_module` property and starts the hand-off process.
3.  **Get the Workspace Ready**: The system grabs the module's instruction file (if it has one) and prepares the clean room. It then uses the `_imports` list to bring in the necessary information from the main AI.
4.  **Give it the Job**: The specific details of the job (the `params`) are sent to the module as an `Input Message`. This is where the “smart glue” happens. The module’s AI will use this message to do its work, even if it's not in the perfect format.
5.  **Run the Job**: The task is run in the new, isolated workspace, and the result is sent back to the main AI.

### 2. Looking It Up Ahead of Time (The Safer Way)

For situations where you need to be very sure everything will work perfectly, you can look up the module **before the AI even starts thinking**.

In this mode, the system finds the module's instructions ahead of time and shows them to the main AI. This way, the AI sees exactly what the module needs from the very beginning, making sure the job it creates is perfectly formatted and safe. This can also include the module’s expected result, so there are no surprises.

This is like having a strict contract for a job, where you know exactly what you need to provide and what you’ll get back. It’s less flexible, but it’s great for important tasks where you can’t afford any mistakes.

## Putting It All Together: The Composer & The Sound Designer

Modules let you build powerful systems by having different AIs call on each other like services. This creates a clear structure: a high-level manager AI can focus on the big picture, while handing off specialized tasks to expert, reusable modules.

Imagine you're making music with two expert modules: a **`Composer`** and a **`Sound-Designer`**.

- The **`Sound-Designer`** is a low-level expert. It's a self-contained module that only knows about the science of sound. It knows how to use digital synthesizers to create specific audio clips.

- The **`Composer`** is a mid-level expert. Its job is to write a song. It uses its own tools to create a melody and structure. Then, to turn its musical ideas into actual sound, it makes calls to the `Sound-Designer` module.

This two-level structure is very common. But the real magic happens when you can mix and match these modules based on the task.

Now, let’s add a high-level **`Producer`** AI. The `Producer`'s goal is to create a finished song recording. The `Producer` can use its modules in different ways depending on what needs to be done:

> Sidenote:
> This setup allows for a lot of flexibility. A high-level `Producer` can tell a `Composer` what to do, and the `Composer` then uses a `Sound-Designer`. But the `Producer` can also skip the `Composer` and talk directly to the `Sound-Designer` for specific tasks.
>
> ```mermaid
> graph TD
>     Producer --> Composer
>     Producer --> SoundDesigner(Sound-Designer)
>     Composer --> SoundDesigner(Sound-Designer)
> ```

- **Telling the Manager**: To create a song, the `Producer` might make a single call to the `Composer` module. The `Producer` gives a simple instruction like, “I need a sad song,” and the `Composer` handles everything else, including making its own calls to the `Sound-Designer`. In this case, the `Producer` doesn’t even need to know the `Sound-Designer` exists.

- **Working Side-by-Side**: What if the `Producer` also needs special sound effects, like footsteps or rain? It can make calls directly to the `Sound-Designer` for those specific sounds, at the same time it’s waiting for the `Composer` to finish the music.

This shows the main idea: the way modules are connected isn't fixed. The `Producer` can treat the `Composer` like a black box that just gets the job done, or it can work directly with the `Sound-Designer` if needed. This flexibility allows the same expert modules to be combined in endless ways to solve new problems.

## From Modules to Memory

Modules are great for handling one-off expert tasks. But for longer, more complicated projects, an AI needs a memory. It needs a way to keep track of its progress, learn from what it has done, and follow a long-term plan. This is how we go from single, isolated actions to a smart, continuous thought process.

The next document, [010: Agent/State](./010_agent_state.md), explains how we give AIs this persistent memory.
