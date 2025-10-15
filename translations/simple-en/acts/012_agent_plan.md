# 012: Agent/Plan

> **Plan:** Think of a plan as a recipe or a blueprint. It's a drawing that shows all the steps needed to do something, connecting them in the right order. This could be a recipe for baking a cake, or a map for exploring an idea. — [Glossary](./000_glossary.md)

> Sidenote:
> - Requires:
>   - [004: Agent/Call](./004_agent_call.md)
>   - [005: Agent/Loop](./005_agent_loop.md)
>   - [010: Agent/State](./010_agent_state.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)

This document explains the **Plan Protocol**. It’s what lets our AI agents go from doing simple, one-off tasks to handling complex projects with many steps.

A `Plan` is basically a list of instructions, like a recipe. But it’s a smart recipe. Instead of just listing steps one after another, it creates a flexible chain of actions. Each step writes its results onto a shared digital whiteboard called the `State`. The next step then reads from that whiteboard to know what to do.

This turns the `State` into a workspace where the AI can build and follow a plan to reach a goal.

## What is a Plan?

A `Plan` is a powerful way to think by connecting ideas. Imagine a mind map. It’s a structured way to show how different pieces of information link together, whether you're creating a big vision or a detailed instruction manual. This kind of map is much easier for an AI to understand than a long page of text, because it shows all the relationships at a glance.

> Sidenote:
> A `Plan` isn't just a straight line. It can handle branching paths, where what happens next depends on the result of a previous step. For example, a plan can check the weather and then suggest different activities.
>
> ```mermaid
> graph TD
>     A[Get Weather] --> B{Is it Sunny?};
>     B -- state.sunny --> C[Find a Park];
>     B -- state.notSunny --> D[Find a Movie];
>     C -- state.suggestion --> E[Present Suggestion];
>     D -- state.suggestion --> E[Present Suggestion];
> ```

A `Plan` isn't just for *doing* things. It can also be used to *create* things. For example, a tool could look at your list of contacts and create a `Plan` that draws a map of how all your friends know each other. Another tool could generate a `Plan` that acts as a blueprint for a new piece of software.

While a `Plan` is great for brainstorming and thinking, its main job here is to create a list of steps that can actually be run. For this, we use a special kind of map called a **Directed Acyclic Graph (DAG)**, where each point on the map is an action (a `Tool Call`).

That sounds complicated, but it just means the map follows three simple rules:

- **Graph:** This is the whole plan—all the steps and the connections between them.
- **Directed:** The connections only go one way. You have to bake a cake *before* you can frost it. The steps have a specific order.
- **Acyclic:** The instructions never loop back on themselves in a way that gets stuck. A recipe can't tell you to go back to a step you’ve already finished. It must have a clear beginning and end.

## How a Plan is Formed

The connections between steps aren't drawn with arrows. Instead, they are made using the shared whiteboard—the `State` object.

- **The Steps (`Tool Calls`):** Each step in the plan is an action to be performed, like "look up the weather" or "find a funny cat video."
- **The Connections (`State` Object):** Let's say one tool's job is to find a cat video. When it finds one, it writes the video's link onto the `State` whiteboard in a specific spot (using `_outputPath`). Another tool, whose job is to play a video, can then read that link from the exact same spot and know what to do.

This creates a clear connection: the "play video" tool has to wait until the "find video" tool is finished.

For example, a `Plan` to get a user's profile and then write a summary would have two steps:

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

Here, the `summarizeProfile` step depends on the result from `fetchUserProfile`. It creates a simple, two-step plan. You can picture it like this:

> Sidenote:
> ```mermaid
> graph TD
>     state_var("state.user.profile")
>
>     Call1["fetchUserProfile"]
>     Call2["summarizeProfile"]
>
>     Call1 -- writes to --> state_var
>     state_var -- read by --> Call2
> ```
>
> - [010: Agent/State](./010_agent_state.md)

## Making the Plan vs. Doing the Plan

The best part of this system is that making the plan and actually *doing* the plan are two totally separate things. Because a `Plan` is just a list of instructions, the AI can map out the entire workflow *before* a single action is taken.

The AI acts as the planner, creating the whole list of steps. This list can then be:

- **Checked:** The system can look at the plan to make sure there are no loops or other mistakes.
- **Tested:** We can do a "dry run" to see what might happen without actually doing anything.
- **Approved by a Human:** The plan can be shown to a person to review, change, or approve before anything runs. This is a huge safety feature and makes it easy to work together with the AI.

Actually running the plan is handled by the **[Agent Loop](./005_agent_loop.md)**. It reads the `Plan` and performs each action in the right order, updating the `State` whiteboard as it goes.

## The Plan is a Living Strategy

A `Plan` isn't set in stone. It’s a strategy that can change as things happen. Each time the AI thinks, it looks at the current `Plan` and the results on the whiteboard.

- The **`context`** is what the AI sees: the `State` (the whiteboard) and the `Plan` from the last step.
- The **`solution`** is what the AI comes up with: a **new `Plan`** for the next step.

This back-and-forth process lets the agent be both prepared and flexible. It can follow the plan it has, but if something unexpected happens (like a tool failing), it can create a new plan to handle the problem. This makes the system tough and smart.

> [!HEADSUP] Heads up
> This cycle of planning and doing is the heart of what we call an [Idea/Process](./203_idea_process.md). It's a complete package that holds everything for a task: the tools it can use, the live whiteboard (`State`), and the `Plan` itself.

## How it All Fits Together

The Plan brings together several other key ideas.

- **Call:** The `Tool Calls` are the basic building blocks—the individual steps—of any `Plan`. The `_outputPath` instruction on a `Call` is what lets it write on the shared `State` whiteboard.

  > Sidenote:
  > - [004: Agent/Call](./004_agent_call.md)

- **State:** The `State` object is the whiteboard where the `Plan` comes to life. It provides the "wires" that connect all the separate `Tool Calls` into a working system.

  > Sidenote:
  > - [010: Agent/State](./010_agent_state.md)

- **Loop:** The `Loop` is the engine that runs the `Plan`. It follows the steps, manages how information flows through the `State`, and allows the AI to keep re-planning as it goes.

  > Sidenote:
  > - [005: Agent/Loop](./005_agent_loop.md)

- **Instancing:** A `Plan` can be used like a template. Imagine you have a `Plan` to process one email. With `Instancing`, you can run that same plan on a thousand emails at the same time. The system makes sure each email gets its own private whiteboard, so the jobs don't get mixed up.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

## From a Plan to a Process

A `Plan` gives the agent the step-by-step instructions for reaching a goal. It’s the strategy, shown as a map of actions. This `Plan` is the core of a **[Process Idea](./203_idea_process.md)**, which is the complete, self-contained record of a workflow—what it is, why it's happening, and how it gets done.
