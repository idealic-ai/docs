# 012: Agent/Plan

> **Plan:** Imagine a recipe or a flowchart for the AI. It's a to-do list made of `Tool Calls` (the AI's actions) where some steps have to happen before others. You can't ice a cake before you bake it! This plan tells the AI a sequence of actions, and what each step needs from the previous ones.

> [!WARNING]
> This explanation is just a starting point and will get more detailed later. It describes the basic idea of a Plan, which is a big-picture concept built on top of the AI's memory (`State`) and its ability to take action (`Call`).

> Sidenote:
>
> - Requires:
>   - [004: Agent/Call](./004_agent_call.md)
>   - [005: Agent/Loop](./005_agent_loop.md)
>   - [010: Agent/State](./010_agent_state.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)

This document explains the **Plan Protocol**. Think of it as a way to create a detailed game plan for the AI to follow. These aren't just simple, one-step instructions. They are multi-step adventures that look like a flowchart.

Using a flowchart structure allows the AI to do really clever things, like:

*   **Making choices:** If Step 1 gives one result, the plan can branch off to do Task A. If it gives a different result, it can branch off to do Task B, like in a choose-your-own-adventure book.
*   **Working on things at the same time:** The AI can do two or more jobs at once if they don't depend on each other, and then bring the results together later.

A `Plan` is like a complete strategy that the AI runs inside its main work cycle, the **[Agent Loop](./005_agent_loop.md)**. In a single spin of the loop, the AI can do several actions at once. But a `Plan` lets the AI think bigger. It allows the AI to set up a whole sequence of steps with clear dependencies, basically stringing together many work cycles to achieve a much larger goal.