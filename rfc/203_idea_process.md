# 203: Idea/Process

> **Process Idea:** An Idea whose `schema` specifies a sequential, deterministic workflow of steps. An instance of a Process Idea is a **Workflow Run**.
>
> — [Glossary](./000_glossary.md)

> [!WARNING]
> This RFC is currently a placeholder and will be expanded in the future.

> Sidenote:
>
> - Requires:
>   - [101: Concept/Idea](./101_concept_idea.md)
>   - [012: Agent/Plan](./012_agent_plan.md)

A **Process Idea** has a `schema` that specifies a sequential, deterministic workflow of steps. An instance of a Process Idea is a **Workflow Run**. This structured execution often requires a planning system to define the directed acyclic graph (DAG) of `Tool Calls`.
