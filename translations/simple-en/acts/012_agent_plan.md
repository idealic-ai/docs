# 012: Agent/Plan

> **Plan:** Think of a Plan as a recipe or a blueprint. It’s a drawing that shows how to connect a bunch of steps to get something done. You can use it for many things, like making a list of actions for a robot to follow, drawing a map of ideas, or even designing a new database. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - You'll need to understand these first:
>   - [004: Agent/Call](./004_agent_call.md)
>   - [005: Agent/Loop](./005_agent_loop.md)
>   - [010: Agent/State](./010_agent_state.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)

This document explains how we teach an AI to think ahead and follow multi-step instructions. We call this a **Plan**. A `Plan` is just a list of actions, called `Tool Calls`. It’s not a strict, rigid script. Instead, it’s like a flexible recipe where each step knows what it needs from the previous steps.

Imagine a shared kitchen counter—we call this the `State`. One step in the recipe might be “chop vegetables” and leave them on the counter. The next step, “cook vegetables,” knows to pick them up from that exact spot. This way, the `State` becomes a digital workbench, allowing an AI to build and follow complex plans to reach a goal.

## What is a Plan?

A `Plan` is a simple but powerful way to think in connections, like a mind map. It gives us a way to draw out any system of connected ideas, from a big dream to a detailed instruction manual. This “connect-the-dots” structure is much easier for a computer (like an LLM) to understand than reading a giant wall of text. It packs a lot of information into a small space.

> Sidenote:
> A `Plan` can be more than just a straight line. It can handle choices, where what happens next depends on the answer to a question:
>
> ```mermaid
> graph TD
>     A[Get Weather] --> B{Is it Sunny?};
>     B -- Yes --> C[Find a Park];
>     B -- No --> D[Find a Movie];
>     C --> E[Present Suggestion];
>     D --> E[Present Suggestion];
> ```

The `Plan` isn't just for making the AI do things. It can be used to create any kind of connected map. For example, a `Tool` could look at your list of friends and draw a `Plan` showing how they're all connected. Another could create a `Plan` that is a ready-to-use workflow for a service like GitHub, or a blueprint for a new database.

While a `Plan` is great for brainstorming and thinking out loud, we mostly use it to define step-by-step instructions that a computer can follow. For this, we use a special kind of map called a **Directed Acyclic Graph (DAG)**. That sounds complicated, but it’s easy to break down:

- **Graph:** This is the whole a plan—all the steps (`Tool Calls`) and the connections between them.
- **Directed:** The connections only go one way. It’s like a recipe: you have to chop the onions _before_ you can cook them. The steps have an order.
- **Acyclic:** You can't have loops that go on forever. You can’t have a step that says, “to make a cake, you first need a finished cake.” The Plan has to have a clear beginning and end.

## How a Plan is Formed

The connections between steps aren't made with complicated arrows. They are created by simply sharing information on the digital workbench, the `State`.

- **Nodes (`Tool Calls`):** Each step in the plan is a `Tool Call`, which is a single action to perform.
- **Edges (`State` Object):** The connections are formed when one step leaves its result on the `State` (our workbench), and another step picks it up. A `Tool` writes its result to a named spot on the workbench (using `_outputPath`), and the next `Tool` reads from that same spot to get its ingredients.

This automatically creates a dependency: the second `Tool` can't start until the first one is finished and has left its result on the workbench.

For example, a `Plan` to get a user's profile and then write a summary of it would have two steps:

```json
[
  {
    "_tool": "fetchUserProfile",
    "userName": "Alice",
    "_outputPath": "†state.userProfileData"
  },
  {
    "_tool": "summarizeProfile",
    "profile": "†state.userProfileData",
    "_outputPath": "†state.profileSummary"
  }
]
```

Here, the `summarizeProfile` step depends on the result of `fetchUserProfile`. This creates a simple two-step plan. You can picture it like this:

> Sidenote:
>
> ```mermaid
> graph TD
>     state_var("user.profile")
>
>     Call1["Call A<br/>_outputPath: '†state.user.profile'"]
>     Call2["Call B<br/>userId: '†state.user.profile'"]
>
>     Call1 -- writes to --> state_var
>     state_var -- read by --> Call2
> ```
>
> - [010: Agent/State](./010_agent_state.md)

## Separation of Planning and Execution

The best part about this system is that making the plan is completely separate from doing the plan. A `Plan` is just a description of what to do, like a recipe written on a card. This means an AI can create the entire plan _before_ even starting the first step.

The AI acts as the planner, creating the list of `Tool Calls` for the whole job. Because the plan is just data, we can do a few things with it:

- **Check it:** The system can look for mistakes, like steps that depend on each other in a circle.
- **Pretend to run it:** We can do a “dry run” to see what might happen without actually doing anything.
- **Ask for approval:** The `Plan` can be shown to a person to review, change, or approve before a single action is taken. This is a huge feature for safety and working together.

Once the plan is ready, the **[Agent Loop](./005_agent_loop.md)** (the “chef”) takes over. It reads the `Plan` and performs each `Tool Call` in the right order, updating the `State` (the “workbench”) as it goes.

## The Plan as an Evolving Strategy

A `Plan` isn't set in stone. It’s a living strategy that can change after each step. In a normal workflow, the `Plan` itself is part of the information the AI looks at.

- The **`context`** shows the AI what’s on the workbench (`State`) and the current `Plan`.
- The **`solution`** the AI comes up with is the **new `Plan`** for the next step.

This back-and-forth lets the AI be both forward-thinking and able to react to changes. It can stick to the plan, but if something unexpected happens (like a step failing), it can create a new `Plan` that includes steps to fix the problem. This makes the whole system smart and able to adapt.

> [!HEADSUP] Heads up
> This cycle of planning and doing is the heart of a **[Process Idea](./203_idea_process.md)**. A `Process Idea` is like a complete snapshot of a project, holding the available `Tools`, the current `State` of the workbench, and the `Plan` itself.

## Composition

The Plan is the conductor of an orchestra, bringing together several other key ideas in the system.

- **Call:** `Tool Calls` are the individual musicians, or the basic building blocks of any `Plan`. The `_outputPath` property is what allows a `Call` to place its result on the `State`, letting it play its part in the larger performance.

  > Sidenote:
  >
  > - [004: Agent/Call](./004_agent_call.md)

- **State:** The `State` is the musical score or the workbench that everyone shares. It provides the “wires” that connect the separate `Tool Calls` into one working machine.

  > Sidenote:
  >
  > - [010: Agent/State](./010_agent_state.md)

- **Loop:** The `Loop` is the engine that brings a `Plan` to life. It’s the chef in the kitchen that reads the recipe (`Plan`), manages the ingredients on the workbench (`State`), and makes decisions if the plan needs to change.

  > Sidenote:
  >
  > - [005: Agent/Loop](./005_agent_loop.md)

- **Instancing:** The `Plan` system works perfectly with `Instancing`. Imagine you have one great recipe (`Plan`) and you want to make 100 cookies at once. `Instancing` gives each cookie its own little workbench (`State`), so the same recipe can be followed for all 100 cookies at the same time without them getting mixed up.

  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md)

## From a Plan to a Process

A `Plan` gives the AI the exact steps to reach a goal. It’s the AI’s strategy, drawn out as a map of actions. This `Plan` is the most important part of a **[Process Idea](./203_idea_process.md)**, which is the complete, self-contained record of a workflow. The `Plan` is the “how,” and the `Process Idea` is the full story of the “what, why, and how.”
