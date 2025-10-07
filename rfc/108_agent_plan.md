# 108: Agent: Plan

> Sidenote:
>
> - Requires: [Agent: Call](./103_agent_call.md), [Agent: State](./106_agent_state.md), [Agent: Instancing](./107_agent_instancing.md)

> **Plan:** A directed acyclic graph (DAG) of `Tool Calls`. It defines a sequence of actions, with dependencies determined by tools reading from and writing to the `State Object`.
>
> **Plot:** A branching scenario within a `Plan` designed to handle unexpected or non-deterministic outcomes, allowing for paths like `A -> B -> C` or `A -> B -> D`.
>
> — [Glossary](./000_glossary.md)

> [!WARNING]
> This RFC is currently a placeholder and will be expanded in the future. It outlines the foundational concepts of Plans and Plots as a higher-level abstraction built upon the State and Call systems.\_

This document describes the **Plan Protocol**, a system for creating and executing complex, multi-step workflows as a graph of `Tool Calls`.
