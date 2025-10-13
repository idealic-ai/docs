# 203: Idea/Process

> **Process Idea:** A self-contained `Idea` that is both the definition of a strategic workflow (`Plan`) and the persistent record of its execution state. Its `schema` defines the workflow's graph, and its `solution` captures the state of that graph at a specific moment.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [101: Concept/Idea](./101_concept_idea.md)
>   - [012: Agent/Plan](./012_agent_plan.md)
> - Contrasted with:
>   - [202_idea_vessel.md](./202_idea_vessel.md)

## 1. A Self-Contained Workflow

A **Process Idea** applies the same self-contained principle as a `Vessel` to proactive, multi-step workflows. While a `Vessel` is a snapshot of a single, reactive decision, a `Process Idea` is a snapshot of a larger, stateful `Plan` in execution. It is a complete artifact containing both the definition of the workflow and the record of its current state.

> Sidenote:
>
> - [202: Idea/Vessel](./202_idea_vessel.md)
> - [012: Agent/Plan](./012_agent_plan.md)

## 2. Anatomy of a Process

A `Process Idea` uses the `Idea` triplet to capture the entire state of a workflow:

- **`context` (The Goal):** This contains the initial inputs and the overall goal that the `Plan` is intended to achieve.
- **`schema` (The Definition):** This defines the entire workflow—the directed acyclic graph (DAG) of `Calls` that constitutes the `Plan`. It describes every step that _could_ be taken.
- **`solution` (The State):** This is the record of the workflow's current execution state. It tracks which `Calls` have been completed, stores intermediate results, and indicates the next step(s) to be taken.

## 3. Capabilities of a Process Idea

By packaging the `Plan` definition with its execution state, a `Process Idea` enables powerful orchestration capabilities:

- **Persistence and Resumption:** A long-running workflow can be paused at any point by saving its state as a `Process Idea`. This "frozen" snapshot can be stored indefinitely and then used to resume the `Plan` exactly where it left off.
- **Dynamic Replanning:** The agent can inspect a `Process Idea` at any step. Because it has the full `Plan` (`schema`) and the current state (`solution`), it can adjust the remaining steps in the graph based on new information, without needing to start from scratch.
- **Human Oversight:** A person can review a `Process Idea` to understand the full strategy and its current progress, providing an opportunity to audit, debug, or manually guide the workflow.

### 3.1. Interactive Time Travel

Like a `Vessel`, a `Process Idea` is an immutable snapshot that enables a powerful form of interactive time travel. By loading a historical `Process Idea`, a user can explore the exact state of a workflow as it existed at that moment.

This allows for deep debugging and "what-if" analysis of complex workflows. One could load a paused `Process` from a week ago, provide it with a different context or input, and see how that alternate reality would have played out, all using the exact `Plan` and capabilities that were available at that time. This turns every saved `Process` into a high-fidelity simulation of a past state, which is invaluable for understanding and improving complex agentic behavior.
