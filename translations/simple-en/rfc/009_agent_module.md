# 009: Agent/Module

> **Module**: Imagine you have a special, clean workshop for a very specific job. A Module is a set of rules for using that workshop. When a `Call` has a `_module` tag, it sends a task to be done in that clean room. The `_imports` tag is like a list of an approved tools and materials you're allowed to bring into the workshop from the outside. — [Glossary](./000_glossary.md)

> Sidenote:
> - You should know about:
>   - [004: Agent/Call](./004_agent_call.md)
> - This works together with:
>   - [008: Agent/Imports](./008_agent_imports.md)

We've already talked about how individual `Tools` work. The **Module Protocol** helps us solve a bigger problem: how do you manage and combine lots of tools without making a huge mess? It’s a way to run `Tools` in their own private “workshops” so they don’t interfere with each other. This keeps everything clean and makes it easy to reuse tools for different jobs. By giving a job to a module—which could be another `Idea` or a specific `Activity`—the system can build smart assistants that are made of smaller, independent, and reusable parts.

## The Problem: A Big Messy Workshop

If you just throw all your `Tools` into one big pile, things quickly become a disaster.

1.  **Too Many Instructions**: An AI has limits. If you give it a giant instruction book for hundreds of complicated `Tools` all at once, it can get overwhelmed and won't know which one to pick.
2.  **Getting Confused**: When all the `Tools` are in the same workspace, the AI can get confused by information that isn't relevant to its current task. This is like trying to build a LEGO car and accidentally grabbing a piece from a LEGO castle that's on the same table—it leads to mistakes.
3.  **Hard to Reuse**: A `Tool` built for one assistant is hard to move to another one, because you have to bring its entire messy workshop along with it.

The Module Protocol fixes this by creating a **Module Scope**, which is like giving each `Tool` its own separate, organized workshop.

## The `_module` Note

To send a task to a separate workshop, you use a special `_module` note in the `Tool`'s instructions. This tells the system not to do the job right here, but to send it to an outside module.

The `_module` note is just a piece of text and can be used in two ways:

- **Point to a specific `Idea`**: The text can be a link to a separate `Idea`—a complete set of instructions stored in a file. This lets one `Tool` hand off its work to a totally different instruction manual.
  - You can use a file path like `../ideas/my-idea.json`.
  - Or a special link like `idea://`.

  > Sidenote:
  > An `Idea` is usually just a saved set of instructions, also known as a `Request` ([001: Agent/Request](./001_agent_request.md)). The Module system is the main way to combine these `Ideas` to build more complicated assistants. See [101: Concept/Idea](./101_concept_idea.md) for more.

- **Create a temporary workshop**: If you just write `'anonymous'`, it tells the system to create a brand new, temporary workshop just for this one task. This is useful when you need a clean space without needing to save it as a whole new `Idea`.

## Working in a Clean Room

A module is like a “clean room” for getting work done. Instead of working in the middle of the main, busy workshop, the task is handled in a new, separate space. The instructions for this new space are built from scratch, not just copied from the main area.

This is where the [Imports Protocol](./008_agent_imports.md) is super important. The `_imports` note on the `Tool` acts like a bridge. It's a checklist of exactly which pieces of information from the main workshop should be allowed into the clean room. This gives the main assistant total control over what the module can see, preventing confusion and keeping everything neatly packed away.

> Sidenote:
> - [008: Agent/Imports](./008_agent_imports.md)

## Handling Huge Blueprints

The Module system also helps when a tool produces something really big and complicated. Instead of making the main AI read a giant blueprint for the `_output`—which could crowd out other important tools—a `Tool` can be defined with just its input instructions and a `_module` pointer.

The AI can plan its work just by knowing what goes *in* to the tool. The complicated output will be created inside the module's private workshop. This lets an AI plan a series of complex steps without needing to see every single tiny detail of every step all at once. The AI trusts that the module will do its job correctly and will be ready to use the result in the next step.

## How to Hand Off Work to a Module

A `Tool` becomes a `Module` just by adding the `_module` note to its instructions. This means the job should be handed off. The big question is *when* the system figures out the details of this handoff. There are two ways to do it.

### 1. The Easygoing Way (Default)

The normal way is to figure out the module details right when it's time to **do the work**, after the AI has already decided to make a `Call`.

This method allows for something really cool that normal computer programs can't do: **the AI acts like smart glue.** An AI can make a `Call` with details that don't perfectly match what the module expects. When it's time to run, the system takes what the AI provided and lets the module's own AI figure out how to make it work.

This is a huge benefit because it means modules can be updated and changed on their own. Even if a module starts asking for information in a new way, other AIs that use it won't instantly break. The module's AI will try to adapt the old request to the new format, making the whole system flexible and strong.

The process works like this:

1.  An AI decides to use the modular `Tool` and makes a `Call`.
2.  The system sees the `_module` note and starts the handoff process.
3.  **Getting the Workshop Ready**: The system gets the module's `Idea` (its instruction book) and sets up the clean workspace. Then, it uses the `_imports` list to bring in the necessary info from the caller.
4.  **Mapping the Inputs**: The details from the `Call` are given to the module as a new `Input Message`. This is where the "smart glue" happens, as the module's AI will use this input to do its job, even if the instructions aren't a perfect match.
5.  **Doing the Work**: A new, separate `Request` is made inside the module's clean workspace. The final result is sent back as the output of the original `Call`.

### 2. The Super-Strict Way (Optional)

For situations where you need to be absolutely certain everything is perfect, you can prepare the module **beforehand**, before the first `Request` is even sent to the AI.

In this mode, the system pre-loads the module's `Idea` and merges its input instructions with the `Tool`'s instructions. This lets the main AI see the module's exact requirements right from the start, guaranteeing that the `Call` it creates will be perfectly correct. This can even include the module's `_output` instructions, creating a strict contract for what to expect as a result.

This approach gives you the safety of a traditional contract, where you know exactly what goes in and what comes out. You lose some of the flexibility of the easygoing way, so it's best for important jobs where you don't want any surprises.

## Building Bigger Things: The Producer & Composer

Modules let you build cool things by having `Ideas` act like their own mini-services that can be directed by other AIs. This creates a clear and flexible structure: high-level AIs can focus on the big picture, while they give specialized jobs to smaller, reusable modules.

Think about making music with a team of two expert modules: a **`Composer`** and a **`Sound-Designer`**.

- The **`Sound-Designer`** is the low-level expert. It's a self-contained `Idea` (`idea://sound-designer`) that knows all about sound physics. It knows how to use machines to create specific audio files.

- The **`Composer`** is the mid-level artist. Its main job is to write a song. It uses its own tools to come up with a melody. Then, to make the melody real, it makes `Calls` to the `Sound-Designer` module to create the actual sounds.

This two-layer setup is very common. But the real magic of modules is how they can be combined in different ways for different tasks.

Now, let's bring in a high-level **`Producer`** AI. The `Producer`'s goal is to create a complete song. Depending on the task, the `Producer` can direct its modules in different ways:

> Sidenote:
> This setup allows for a lot of flexibility. A high-level `Producer` can give a task to a `Composer`, who then uses a `Sound-Designer`. However, the `Producer` can also skip the `Composer` and talk directly to the `Sound-Designer` for specific sound effects.
>
> ```mermaid
> graph TD
>     Producer --> Composer
>     Producer --> SoundDesigner(Sound-Designer)
>     Composer --> SoundDesigner(Sound-Designer)
> ```

- **Managing a Team**: To create a song, the `Producer` might make a single `Call` to the `Composer` module. The `Producer` gives a high-level goal ("I need a sad song"), and the `Composer` handles everything else, including making its own `Calls` to the `Sound-Designer`. In this case, the `Producer` doesn't even need to know the `Sound-Designer` exists.

- **Directing Individuals**: If the `Producer` also needs a special sound effect (like a door creaking or wind blowing), it can make `Calls` directly to the `Sound-Designer` for those sounds, at the same time the `Composer` is working on the music.

This shows the main idea: the way the tools work together isn't fixed. The `Producer` can treat the `Composer` as a single unit or can work with its individual helper (`Sound-Designer`) directly, all depending on what's needed at that moment. This flexibility allows the same expert modules to be combined in endless ways, creating a powerful system where new abilities can emerge.

## From Modules to Memory

Modules are great for giving AIs specific skills that work perfectly in a clean room. But for projects that have many steps, an AI needs a memory. It needs a way to keep track of its progress, learn from what it has already done, and follow a long-term plan. This is the bridge from doing single, separate actions to carrying out a complete, thought-out project.

The next document, [010: Agent/State](./010_agent_state.md), explains how the system manages this memory.
