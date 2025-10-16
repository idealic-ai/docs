# 010: Agent/Plan

> [!DEFINITION] [Plan](./000_glossary.md)
> A plan is like a blueprint or a recipe. It lays out a series of steps to follow to get something done. It’s drawn as a map where each step is connected to the next.

> Sidenote:
> *   Requires:
>   *   [004: Agent/Call](./004_agent_call.md)
>   *   [005: Agent/Loop](./005_agent_loop.md)
>   *   [008: Agent/Variables](./008_agent_variables.md)
>   *   [009: Agent/State](./009_agent_state.md)
> *   Complemented by:
>   *   [011: Agent/Instancing](./011_agent_instancing.md)

This document explains how we create a **Plan**. Think of a Plan as a smart to-do list that an AI agent can build and follow. It uses two key ideas you already know about: `State` (the system's memory) and `Variables` (shortcuts to that memory).

A Plan is basically a list of `Tool Calls`—a sequence of actions—that are linked together. This turns the `State` (the memory) into a kind of scratchpad where the AI can draw out a complex series of steps to reach a goal.

## How a Plan is Made

Imagine you're building something with a friend. The `State` is your shared workbench. A Plan tells you both what to do and in what order.

*   **Steps (`Tool Calls`):** Each step is a `Tool Call`, like a single instruction. For example, “Get user’s profile.”
*   **Connections (The `State` Workbench):** The steps are connected by what they create and what they use. One tool puts its result on the workbench (`State`) in a specific spot. The next tool knows to grab the result from that same spot to do its job.

This creates a dependency: the second tool can't start until the first one has finished and left its result on the workbench.

For instance, if we want a plan to get a user’s profile and then write a summary of it, the plan would have two steps:

:::div{.limited-width}

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

> Sidenote:
> ```mermaid
> graph TD
>     state_var{{"state.user.profile"}}
>
>     Call1["fetchUserProfile"]
>     Call2["summarizeProfile"]
>
>     Call1 -- writes to --> state_var
>     state_var -- read by --> Call2
> ```

:::

Here, the `summarizeProfile` step needs the information from the `fetchUserProfile` step. This makes a simple, two-step plan.

## What is a Plan?

A Plan is a powerful way to organize connected ideas. It's like mind-mapping. You can use it to map out a big idea, design a new project, or just think through a problem. This map-like structure is much easier for an AI to understand than a big wall of text.

> Sidenote:
> > Sidenote: A `Plan` isn't just for straight lines. It can handle choices, where the next step depends on what happened before.
>
> ```mermaid
> graph TD
>     A[Get Weather] --> B{Is it Sunny?};
>     B -- state.sunny --> C[Find a Park];
>     B -- state.notSunny --> D[Find a Movie];
>     C -- state.suggestion --> E[Present Suggestion];
>     D -- state.suggestion --> E[Present Suggestion];
> ```

But a Plan isn't just for thinking. A tool could look at a list of your friends and create a Plan that draws a map of how they're all connected. Another could create a Plan that designs a new computer program.

While Plans are great for brainstorming, we mostly use them to define step-by-step instructions that a computer can actually run. For this, we use a special kind of map called a **Directed Acyclic Graph (DAG)**.

Don't let the name scare you! It just means:

*   **Graph:** The whole map—all the steps (`Tool Calls`) and their connections.
*   **Directed:** The connections only go one way, like a one-way street. You have to get the ingredients before you can bake the cake. Data flows forward.
*   **Acyclic:** You can't have loops or circles. The plan has a clear start and a clear finish, ensuring it doesn't run forever.

## Planning First, Acting Second

One of the coolest things about this system is that planning and doing are completely separate. The AI agent acts like an architect, drawing up the entire blueprint (`Plan`) *before* a single piece of code is ever run.

This blueprint is just a list of instructions. Because it's just data, we can do a few really smart things with it:

*   **Check It:** The system can scan the plan for any mistakes, like a step that leads nowhere or a loop that would never end.
*   **Simulate It:** We can do a “dry run” to see what the plan *would* do, without actually doing it.
*   **Ask for Approval:** Most importantly, the plan can be shown to a person to review, edit, or approve. This is a huge safety feature, making sure a human is in the loop before the agent takes action.

Once the plan is ready, a different part of the system called the **[Agent Loop](./005_agent_loop.md)** takes over. It reads the plan and runs each step in the right order, updating the workbench (`State`) as it goes.

## A Plan That Can Change

A Plan isn't set in stone. It’s more like a living strategy that can adapt. In each cycle of the agent's work, the current Plan is sent back to the AI along with all the latest information.

*   The **`context`** is what the AI sees: it includes the current memory (`State`) and the plan it was following.
*   The **`solution`** is what the AI creates: it's the **new and improved Plan** for the next step.

This allows the agent to be flexible. It can follow the plan, but if something unexpected happens (like a tool failing), it can immediately create a *new* plan to handle the problem. This makes the whole system smart and resilient.

This cycle of planning, acting, and re-planning is the heart of how an idea can be developed and brought to life. You can read more about it in [203: Idea/Process](./203_idea_process.md).

## From a Single Plan to Reusable Recipes

A Plan is great for one specific task. But what if you have a set of steps you want to use over and over again? We need a way to package up these plans into reusable components.

The next document, **[011: Agent/Instancing](./011_agent_instancing.md)**, explains how we do just that.
