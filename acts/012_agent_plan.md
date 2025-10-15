# 012: Agent/Plan

> **Plan:** A structured representation of a workflow, vision, or system, expressed as a graph. It is a versatile tool for generating any kind of network—from an executable sequence of `Tool Calls` to a conceptual map for brainstorming. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [004: Agent/Call](./004_agent_call.md)
>   - [005: Agent/Loop](./005_agent_loop.md)
>   - [010: Agent/State](./010_agent_state.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)

This document describes the **Plan Protocol**, which elevates agentic capabilities from simple, reactive loops to sophisticated, multi-step workflows. A `Plan` is a data structure—typically an array of `Tool Calls`—that describes a sequence of actions. It is not a rigid script but a dynamic graph where dependencies are formed implicitly by `Calls` reading from and writing to a shared `State` object.

This approach transforms the `State` object into a canvas for planning, allowing an agent to construct and execute complex data flows to achieve a goal.

## What is a Plan?

A `Plan` is a generic and powerful tool for thinking in graphs. It provides a structured format for representing any system of interconnected ideas, from a high-level vision to a detailed technical blueprint. This graph-based structure is a highly efficient way to compress complex context into a format that LLMs can understand far more easily than long passages of text.

> Sidenote:
>
> A `Plan` is not limited to linear sequences. It can represent complex workflows with conditional logic, where the path of execution depends on the outcome of a previous step:
>
> ```mermaid
> graph TD
>     A[Get Weather] --> B{Is it Sunny?};
>     B -- Yes --> C[Find a Park];
>     B -- No --> D[Find a Movie];
>     C --> E[Present Suggestion];
>     D --> E[Present Suggestion];
> ```

The `Plan` protocol is not limited to just executing tasks. It can be used to generate any kind of graph in response to a user's request. For example, a `Tool` could take a table of contacts and produce a `Plan` that visualizes a network of friends. Another could generate a `Plan` representing a complete GitHub Actions workflow or a blueprint for a new database schema.

While a `Plan` can be a powerful tool for brainstorming, discussion, and "thinking out loud," its primary application in this system is to define executable workflows. For this purpose, we use a specific type of graph called a **Directed Acyclic Graph (DAG)**, where each node is a `Tool Call`.

A DAG has a few key properties that make it perfect for execution:

- **Graph:** The "graph" is the entire `Plan`—the collection of all `Tool Calls` (the nodes) and the data dependencies that connect them (the edges).
- **Directed:** The connections are one-way, determined by the flow of data. A step that creates data must come _before_ a step that uses it.
- **Acyclic:** The workflow cannot have circular dependencies, ensuring it has a clear beginning and end.

## How a Plan is Formed

The connections in the graph are not created with explicit pointers, but through a simple and powerful data-flow convention using the `State` object.

- **Nodes (`Tool Calls`):** Each step in the workflow is a `Tool Call`, representing an action to be performed.
- **Edges (`State` Object):** The connections between steps are created by writing to and reading from the `State` object. One `Tool` writes its output to a specific path in the `State` using the `_outputPath` meta-property. A subsequent `Tool` can then use that output as an input by referencing the same path with a **Variable Reference**.

This establishes a clear dependency: the second `Tool Call` cannot execute until the first has completed and populated the `State`.

For example, a `Plan` to fetch a user's profile and then summarize it would consist of two `Tool Calls`:

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

Here, the `summarizeProfile` call depends on the output of `fetchUserProfile`, creating a two-step plan. This relationship can be visualized as a simple graph:

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

The most powerful feature of this architecture is the complete separation of planning from execution. Because a `Plan` is just a declarative data structure, an agent can generate the entire graph of `Tool Calls` _before_ any code is run.

The LLM acts as the planner, assembling the array of `Calls` that represents the intended workflow. This data structure can then be:

- **Validated:** The system can check the graph for circular dependencies or other structural errors.
- **Simulated:** A "dry run" can be performed to anticipate the workflow's behavior.
- **Presented for Approval:** The `Plan` can be shown to a human for review, modification, or approval before execution, creating a critical safety and collaboration layer.

Execution is handled by the **[Agent Loop](./005_agent_loop.md)**, which interprets the `Plan` and runs the `Tool Calls` in the correct order based on their dependencies, populating the `State` object as it proceeds.

## The Plan as an Evolving Strategy

A `Plan` is not static; it is a living strategy that can be adapted at each step of the execution loop. In a typical workflow, the `Plan` itself is a message within the `context` provided to the LLM.

- The **`context`** contains the `State` object and the `Plan` from the previous tick.
- The **`solution`** generated by the LLM is the **new `Plan`** for the current tick.

This iterative process allows the agent to be both proactive and reactive. It can follow the existing `Plan`, but it can also modify it in response to the results of the previous step. For example, if a `Tool Call` fails, the agent can generate a new `Plan` that includes error-handling steps. This makes the system resilient and adaptable.

> [!HEADSUP] Heads up
> This iterative cycle of planning and execution is the core of a **[Process Idea](./203_idea_process.md)**. The `Process Idea` is a self-contained snapshot of a workflow, capturing the `Tools` available, the live `State`, and the `Plan` itself.

## Composition

The Plan protocol is a high-level orchestration layer that integrates several other core protocols.

- **Call:** `Tool Calls` are the fundamental building blocks—the nodes—of any `Plan`. The `_outputPath` property on a `Call` is what allows it to participate in a `Plan` by modifying the shared `State`.

  > Sidenote:
  >
  > - [004: Agent/Call](./004_agent_call.md)

- **State:** The `State` object is the essential canvas upon which a `Plan` is drawn. It provides the "wires" that connect otherwise independent `Tool Calls` into a coherent workflow.

  > Sidenote:
  >
  > - [010: Agent/State](./010_agent_state.md)

- **Loop:** The execution `Loop` is the engine that brings a `Plan` to life. It processes the `Calls` in the `Plan`, manages the flow of data through the `State`, and facilitates the iterative re-planning that makes the system dynamic.

  > Sidenote:
  >
  > - [005: Agent/Loop](./005_agent_loop.md)

- **Instancing:** The `Plan` protocol is fully compatible with `Instancing`. A single `Plan` can serve as a template for a batch operation, applied to an array of `State` objects. The `Instancing` system ensures that each parallel execution has its own isolated `State`, allowing a complex workflow to be executed consistently and safely across many items at once.

  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md)

## From a Plan to a Process

The `Plan` provides the concrete, tactical steps for achieving a goal. It is the agent's strategy, captured as a graph of `Calls`. This `Plan` is the central component of a **[Process Idea](./203_idea_process.md)**, which represents a complete, self-contained, and stateful workflow. The `Plan` is the "how," and the `Process Idea` is the full record of the "what, why, and how."
