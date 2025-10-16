# 012: Agent/Plan

> **Plan:** A structured representation of a workflow, vision, or system, expressed as a graph. It is a versatile tool for generating any kind of network—from an executable sequence of `Tool Calls` to a conceptual map for brainstorming. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [004: Agent/Call](./004_agent_call.md)
>   - [005: Agent/Loop](./005_agent_loop.md)
>   - [010: Agent/Variables](./010_agent_variables.md)
>   - [011: Agent/State](./011_agent_state.md)
> - Complemented by:
>   - [013: Agent/Instancing](./013_agent_instancing.md)

This document describes the **Plan Protocol**, which brings together the concepts of `State` and `Variables` to enable sophisticated, multi-step workflows. A `Plan` is a data structure—typically an array of `Tool Calls`—that describes a sequence of actions as a data-flow graph.

This approach transforms the `State` object into a scratchpad for planning, allowing an agent to construct and execute complex data flows to achieve a goal.

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
>     state_var("state.user.profile")
>
>     Call1["fetchUserProfile"]
>     Call2["summarizeProfile"]
>
>     Call1 -- writes to --> state_var
>     state_var -- read by --> Call2
> ```

## What is a Plan?

A `Plan` is a generic and powerful tool for thinking in graphs. It provides a structured format for representing any system of interconnected ideas, from a high-level vision to a detailed technical blueprint. This graph-based structure is a highly efficient way to compress complex context into a format that LLMs can understand far more easily than long passages of text.

> Sidenote:
>
> A `Plan` is not limited to linear sequences. It can represent complex workflows with conditional logic, where the path of execution depends on the outcome of a previous step:
>
> ```mermaid
> graph TD
>     A[Get Weather] --> B{Is it Sunny?};
>     B -- state.sunny --> C[Find a Park];
>     B -- state.notSunny --> D[Find a Movie];
>     C -- state.suggestion --> E[Present Suggestion];
>     D -- state.suggestion --> E[Present Suggestion];
> ```

The `Plan` protocol is not limited to just executing tasks. It can be used to generate any kind of graph in response to a user's request. For example, a `Tool` could take a table of contacts and produce a `Plan` that visualizes a network of friends. Another could generate a `Plan` representing a complete GitHub Actions workflow or a blueprint for a new database schema.

While a `Plan` can be a powerful tool for brainstorming, discussion, and "thinking out loud," its primary application in this system is to define executable workflows. For this purpose, we use a specific type of graph called a **Directed Acyclic Graph (DAG)**, where each node is a `Tool Call`.

A DAG has a few key properties that make it perfect for execution:

- **Graph:** The "graph" is the entire `Plan`—the collection of all `Tool Calls` (the nodes) and the data dependencies that connect them (the edges).
- **Directed:** The connections are one-way, determined by the flow of data. A step that creates data must come _before_ a step that uses it.
- **Acyclic:** The workflow cannot have circular dependencies, ensuring it has a clear beginning and end.

## Separation of Planning and Execution

The most powerful feature of this architecture is the complete separation of planning from execution. Because a `
