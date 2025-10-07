# 109: Agent: Plan

> Sidenote:
>
> - Requires: [Agent: Call](./103_agent_call.md), [Agent: Loop](./104_agent_loop.md), [Agent: State](./107_agent_state.md), [Agent: Instancing](./108_agent_instancing.md)

> **Plan:** A directed acyclic graph (DAG) of `Tool Calls`. It defines a sequence of actions, with dependencies determined by tools reading from and writing to the `State Object`.
>
> — [Glossary](./000_glossary.md)

> [!WARNING]
> This RFC is currently a placeholder and will be expanded in the future. It outlines the foundational concepts of Plans as a higher-level abstraction built upon the State and Call systems.

This document describes the **Plan Protocol**, a system for creating and executing complex, multi-step workflows as a graph of `Tool Calls`.

A `Plan` is an executable graph of actions that is designed to be run within an **[Agent: Loop](./104_agent_loop.md)**. While a single iteration of the loop can execute a set of parallel `Call`s, a `Plan` allows the agent to define and follow a multi-step sequence with dependencies, effectively orchestrating a series of loops to achieve a larger goal.
