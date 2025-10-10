# 203: Idea/Process

> **Process Idea:** Think of this as an **Idea** that works like a detailed recipe. Its blueprint (`schema`) lists all the steps you need to follow, in order. If you follow the recipe exactly, you'll get the same result every time. When you actually start *making* the recipe, that's called a **Workflow Run**.
>
> — [Glossary](./000_glossary.md)

> [!WARNING]
> This document is just a starting point and will be filled out with more details later.

> Sidenote:
>
> To understand this, it helps to first read about:
>
> - [101: Concept/Idea](./101_concept_idea.md)
> - [012: Agent/Plan](./012_agent_plan.md)

A **Process Idea** is like a blueprint for a step-by-step assembly line. Its design (`schema`) clearly defines a sequence of actions that, when followed precisely, always produce the same outcome. Each time someone or something follows this blueprint from start to finish, it's called a **Workflow Run**.

To make this work, a system often needs to create a smart plan first. Imagine drawing a flowchart that shows every single action (or `Tool Call`) needed to complete the task. This flowchart is special: it only moves forward, and you can't get stuck in a loop. This one-way-only plan is called a **directed acyclic graph (DAG)**, and it makes sure every step builds on the last one logically until the job is done.