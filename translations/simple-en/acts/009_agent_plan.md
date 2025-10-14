# 012: Agent/Plan

> **Plan:** Imagine a `Plan` is like a super-detailed recipe or a game plan. It’s a flowchart of jobs, which we call `Tool Calls`, that an AI needs to do. This flowchart makes sure that jobs that depend on each other happen in the right order. It knows this by having the tools share information on a common scratchpad, called the `State Object`.
>
> — [Glossary](./000_glossary.md)

> [!WARNING]
> This explanation is just a starting point and will get more detailed later. For now, it describes the basic idea of a Plan, which is a big-picture concept built using the smaller ideas of State and Calls.

> Sidenote:
>
> - Requires:
>   - [Agent/Call](./004_agent_call.md)
>   - [Agent/Loop](./005_agent_loop.md)
>   - [Agent/State](./010_agent_state.md)
>   - [Agent/Instancing](./011_agent_instancing.md)

This document describes the **Plan Protocol**. Think of it as a system for creating and running smart to-do lists for an AI, especially when a task has many steps.

Instead of a simple checklist, a `Plan` is structured like a flowchart that never loops back on itself (the technical term is a directed acyclic graph, or DAG). This special structure allows the AI to handle complex jobs in clever ways, like:

*   **Branching:** Making a choice based on a result. For example, "If the file download was successful, open it. If it failed, try again."
*   **Merging:** Waiting for two separate jobs to finish before starting the next one. For example, "After you've downloaded the images AND received the text, combine them into a report."
*   **Running things at the same time:** Doing independent jobs simultaneously to save time.

A `Plan` is the full set of instructions that an AI follows inside its main work cycle, which is called the **[Agent/Loop](./005_agent_loop.md)**. While a single cycle of the loop can handle a few jobs at once, a `Plan` gives the AI the entire, multi-step game plan. This allows it to chain together many work cycles to accomplish a much larger goal.