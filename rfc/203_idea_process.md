# 203: Idea/Process

> **Process Idea:** An Idea whose `schema` specifies a sequential, deterministic workflow of steps. An instance of a Process Idea is a **Workflow Run**.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [Concept: Idea](./001_concept_idea.md)
>   - [Agent: Plan](./109_agent_plan.md)

> [!WARNING]
> This RFC is currently a placeholder and will be expanded in the future.

A **Process Idea** has a `schema` that specifies a sequential, deterministic workflow of steps. An instance of a Process Idea is a **Workflow Run**. This structured execution often requires a planning system to define the directed acyclic graph (DAG) of `Tool Calls`.
