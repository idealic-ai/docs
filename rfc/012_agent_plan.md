# 012: Agent/Plan

> **Plan:** A directed acyclic graph (DAG) of `Tool Calls`. It defines a sequence of actions, with dependencies determined by tools reading from and writing to the `State Object`. — [Glossary](./000_glossary.md)

> [!WARNING]
> This RFC is currently a placeholder and will be expanded in the future. It outlines the foundational concepts of Plans as a higher-level abstraction built upon the State and Call systems.

> Sidenote:
>
> - Requires:
>   - [004: Agent/Call](./004_agent_call.md)
>   - [005: Agent/Loop](./005_agent_loop.md)
>   - [010: Agent/State](./010_agent_state.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)

This document describes the **Plan Protocol**, a system for creating and executing complex, multi-step workflows as a directed acyclic graph (DAG) of `Tool Calls`. This graph structure allows for sophisticated execution flows, including branching to handle different outcomes, merging parallel task results, and running independent `Call`s concurrently.

A `Plan` is an executable graph of actions that is designed to be run within an **[005: Agent/Loop](./005_agent_loop.md)**. While a single iteration of the loop can execute a set of parallel `Call`s, a `Plan` allows the agent to define and follow a multi-step sequence with dependencies, effectively orchestrating a series of loops to achieve a larger goal.
