# 012: Agent/Delegate

> [!DEFINITION] [Delegate](./000_glossary.md)
> A set of rules for running a task in its own private workspace, like a "clean room." An agent can trigger this by using a special `_delegate` property in a `Call`. This runs the task in an isolated space, and the `_scopes` property carefully passes in only the information it needs from the outside world.

> Sidenote:
> *   Needs to be read after:
>     *   [004: Agent/Call](./004_agent_call.md)
> *   Works together with:
>     *   [013: Agent/Scopes](./013_agent_scopes.md)

So far, we've talked about how individual `Tools` work. The **Delegate Protocol** is about how we can combine and build bigger things with these tools in a smart way.

Think of it like hiring a specialist. Instead of trying to do everything yourself in a messy workshop, you can "delegate" a job to an expert who works in their own clean, organized room. This keeps things tidy, prevents mistakes, and lets you build complex projects by combining the work of many independent specialists.

## The Problem: One Big Messy Workshop

As an AI agent gets more abilities, putting all its `Tools` in one giant toolbox becomes a problem.

1.  **Too Many Options**: If you give an AI a toolbox with thousands of tools, it gets confused and can't pick the right one. It's like having a manual with too many pages to read.
2.  **Mixing Things Up**: When all the tools are in the same workspace, the AI can get distracted by things that aren't relevant to the current job. This leads to it grabbing the wrong tool or using it incorrectly.
3.  **Hard to Share**: A tool designed for one agent's specific workshop is hard to move to another agent's workshop. You'd have to bring all the clutter and context along with it.

The Delegate Protocol solves this by letting a `Call` be handled in a separate, isolated workshop.

## The `_delegate` Property: The "Hire a Specialist" Tag

You tell the system to use a specialist by adding a `_delegate` property to a `Tool`. This tag is a note that says, "Don't do this task here. Hand it off to an expert."

The `_delegate` property can be used in two ways:

*   **Point to a Known Specialist**: You can provide a link to a file that contains a complete set of instructions for another agent. This is like giving your `Tool` the business card of a specialist it can call on.

    > Sidenote:
    > A saved, shareable set of instructions ([001: Agent/Request](./001_agent_request.md)) is the most common kind of `Idea`. The Delegate protocol is the main way we combine these `Ideas` to build more powerful things. See [101: Concept/Idea](./101_concept_idea.md) for more.

*   **Create a Temporary Workshop**: You can just say `'anonymous'`. This tells the system to instantly create a new, empty, and private workshop just for this one task. It’s perfect for quick jobs that need a clean space without needing a whole separate set of instructions.

## Working in a Clean Room

A delegate provides a "clean room" for a task. Instead of running in the main agent's busy and cluttered environment, the `Call` is handled in a fresh, isolated space.

This is where the [Scopes Protocol](./013_agent_scopes.md) is essential. Think of it like a secure delivery service. The `_scopes` property on the `Tool` is a list of exactly which items from the main workshop should be delivered to the specialist's clean room. This gives the main agent total control over what the specialist can see, preventing any mix-ups or confusion.

> Sidenote:
> *   [013: Agent/Scopes](./013_agent_scopes.md)

## Handling Huge, Complicated Tasks

Delegates also help when a tool produces a very large or complex result.

Imagine a tool that designs a whole car engine. Instead of making the main agent think about every single screw and bolt of the final engine design, you can use a delegate. The main agent just needs to know how to *order* the engine (the `input`).

The `Call` is then sent to the delegate—the specialist engine designer—who does all the complex work in their own private workshop. The main agent trusts that the delegate will do its job and send back the finished engine. This lets the agent plan out big projects without getting bogged down in the tiny details of every single step.

## When to Call the Specialist

A `Tool` becomes a `Delegate` just by having the `_delegate` property. But the big question is *when* the system figures out the details of that specialist's job. There are two ways to do this.

### 1. Figuring It Out on the Fly (The Default Way)

The most common and flexible way is to figure out the delegate's instructions only when the task is actually being run.

This allows the AI to act like smart "glue." The main agent can make a `Call` with instructions that don't perfectly match what the specialist expects. When the task is handed off, the AI inside the specialist's workshop is smart enough to look at the instructions it was given and figure out how to make them work. It can bridge the gap.

This is great because specialists can update their tools and methods, and the agents that hire them won't immediately break. The AI will try to adapt, making the whole system more resilient and flexible.

Here’s how it works:

1.  An agent decides to use a `Tool` and makes a `Call`.
2.  The system sees the `_delegate` tag and starts the process.
3.  **Gathering the Tools**: The system gets the specialist's instruction manual and uses `_scopes` to deliver the necessary items from the main agent.
4.  **Passing the Instructions**: The details of the `Call` are given to the specialist as a new request. This is where the AI acts as "glue," figuring out how to use the given instructions to do the job.
5.  **Doing the Work**: A new, separate `Request` is run in the clean room. The final result is sent back to the main agent.

### 2. Checking the Blueprints Upfront (The Safer Way)

For jobs where you need everything to be perfect and predictable, you can check the specialist's blueprints *before* the main agent even starts working.

In this mode, the system grabs the delegate's instruction manual ahead of time and merges it with the `Tool`'s own information. The main agent's AI can then see the *exact* requirements of the specialist from the very beginning. This ensures the `Call` it makes is perfectly correct and will work exactly as expected.

This is like following a strict engineering blueprint where all the inputs and outputs are known and guaranteed. You lose the flexibility of the on-the-fly method, but you gain the safety of a predictable system. This is best for a critical job where you can't afford any surprises.

## Building Teams of Specialists

Delegates let you build powerful teams by allowing different specialists to work together. You can have high-level agents that act as project managers, delegating specific tasks to low-level experts.

Imagine you're making a song. You have two specialists:

*   A **`Sound-Designer`**: A low-level expert who knows everything about creating sounds with synthesizers.
*   A **`Composer`**: A mid-level specialist who knows how to write melodies and structure a song. To create the actual sounds, the `Composer` makes `Calls` to the `Sound-Designer` delegate.

Now, a high-level **`Producer`** agent comes in. The `Producer`'s job is to create a finished record. Depending on the goal, the `Producer` can manage these specialists in different ways:

> Sidenote:
> This setup allows for a flexible team. A high-level `Producer` can give a task to a `Composer`, who then uses a `Sound-Designer`. But the `Producer` can also skip the middleman and talk to the `Sound-Designer` directly if needed.
>
> ```mermaid
> graph TD
>     Producer --> Composer
>     Producer --> SoundDesigner(Sound-Designer)
>     Composer --> SoundDesigner(Sound-Designer)
> ```

*   **Top-Down Management**: The `Producer` could make one simple `Call` to the `Composer`, saying "I need a sad song." The `Composer` would then do its whole job, including making its own `Calls` to the `Sound-Designer`, without the `Producer` needing to worry about the details.

*   **Direct Management**: If the `Producer` also needs some special sound effects (like footsteps or rain), it can make `Calls` *directly* to the `Sound-Designer` for those specific tasks, while *at the same time* telling the `Composer` to work on the music.

This shows the power of the system: the team structure isn't fixed. The `Producer` can treat the `Composer` as a self-managed employee or it can micromanage the `Sound-Designer` directly, all depending on what the project needs. This allows the same group of experts to be combined in endless ways to solve new problems.

## From Single Tasks to Long-Term Memory

Delegates are great for managing one-off tasks with experts. But for complex, multi-step projects, an agent needs a memory. It needs a way to keep track of its progress, learn from what it has done, and follow a long-term plan. This is the next step: moving from isolated actions to intelligent, ongoing work.

The next document, [009: Agent/State](./009_agent_state.md), explains how we give agents a memory to manage this state.
