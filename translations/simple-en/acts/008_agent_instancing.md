# 011: Agent/Instancing

> **Instancing:** Think of this like being a chef who can cook many different meals at the same time. Each meal is an `Instance`. It has its own ingredients and recipe (`State Object`) and its own order number (a unique ID). Instancing is the skill of managing all these separate meals in one go without mixing them up.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires: [Agent/State](./010_agent_state.md)
> - Compatible:
>   - [Agent/Input](./007_agent_input.md)
>   - [Agent/Imports](./008_agent_imports.md)
>   - [Agent/Plan](./013_agent_plan.md)

This guide explains how a smart computer program (an agent) can handle many different jobs all at once, even though each job is totally separate from the others.

## 1. What We Need First: The State System

Before we can juggle multiple jobs, we need something called the **State System**. Its main job is to separate the _planning_ of what to do from the _doing_ of the thing.

Imagine you're building a LEGO set. The instructions are the plan, and snapping the bricks together is the execution. The **State System** makes sure these two steps are distinct.

The bridge between planning and doing is the **State Object**. Think of it as a project board or a workbench for one specific job. It's a digital space where you keep all the information and results for that task. It's special for two reasons:

1.  **It's Where the Work Happens**: When a tool (a mini-program that does one thing) finishes its job, it needs a place to put the result. Every tool is told where to write its answer on the project board. This instruction is called an `_outputPath`.
2.  **It's Where Tools Get Information**: To do its job, a tool might need an answer from a previous step. It can grab that information directly from the project board. This way, different tools can work together in a sequence.

## 2. Juggling Multiple Jobs: The Instancing Mechanism

The real magic happens when you use this system to handle many jobs at once.

### 2.1. Giving Each Job a Sticker

To manage many jobs in a single request, we give each one a unique label, like a little sticker. This special label is called `_instance`. The labels are usually super simple (like `①`, `②`, `③`) so the computer can easily see them. They don't mean anything other than
