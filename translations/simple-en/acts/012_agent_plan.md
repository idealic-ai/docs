# 012: Agent/Plan

> **Plan:** Think of a plan as a recipe or a flowchart for an AI. It lays out a series of actions (`Tool Calls`) and knows which steps have to be finished before others can begin. It’s like a smart to-do list where tasks are connected.

> [!WARNING]
> This document is just a starting point and will get more detail later. It introduces the main idea of a Plan, which is a smarter way for an AI to handle complex, multi-step projects.

> Sidenote:
> - Requires:
>   - [004: Agent/Call](./004_agent_call.md)
>   - [005: Agent/Loop](./005_agent_loop.md)
>   - [010: Agent/State](./010_agent_state.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)

This document explains the **Plan Protocol**. It’s what allows an AI agent to go from just reacting one step at a time to following a sophisticated, multi-step workflow. A `Plan` isn't just a simple script; it's a living "Idea" that acts as a director, guiding a piece of data through a series of different services to get a job done.

## 1. The Plan as a Project Manager

The most important rule is that the `Plan` is separate from the data it's working on. Think of the `Plan` as a project manager and the data `Idea` as the project itself (like a piece of wood that will become a chair).

The project manager isn't part of the wood. They are an outsider who holds the blueprint and directs the work. The piece of wood simply has a sticky note on it that says, "When a tool is done with me, check with the project manager to see where I go next."

This separation has big benefits:

- **It's Easy to Mix and Match**: The same piece of wood (`Idea`) can be part of many different projects. On Monday, it might follow a `Plan` to become a chair. On Tuesday, it could follow a different `Plan` to become part of a toy boat. The project isn't stuck with just one set of instructions.
- **One Place to See Progress**: The project manager's clipboard (the `Plan`) is the single source of truth for how the project is going. You don’t have to check with the wood; you just check with the `Plan` to see what step is next. This makes the whole process easy to watch and manage.
- **Super Flexible**: Since a `Plan` is just another `Idea`, other AIs can create new plans, change them, or combine them. This allows the system to create its own smart workflows on the fly.

## 2. How the Plan Directs the Work

A `Plan` is basically a flowchart of actions for an AI agent to follow, using a system called an **[005: Agent/Loop](./005_agent_loop.md)**. While a simple loop might do a few things at once, a `Plan` lets the agent follow a whole recipe with many steps, where some steps have to wait for others to finish. This lets the agent complete much bigger goals.

Imagine an assembly line. When a worker (a service) finishes their job on a product (the `Idea`), they look at the master `Plan` to figure out where to send the product next. The `Plan` is in charge of routing the `Idea` from one station to the next.

For really long or complex projects, a special kind of engine (like a tool called Temporal) can run the `Plan`. This engine makes sure the project doesn't get lost and remembers exactly where it is in the process, even if it takes a very long time and involves lots of different computers.

## 3. Keeping Things Safe and Secret

Because the `Plan` is the central manager, it also acts like a security guard for information.

- **Need-to-Know Basis**: Each worker on the assembly line doesn't need to see the entire blueprint for the final product. They just get the `Idea`, do their one specific job, and pass it on. They have no idea where it came from or where it's going next. This keeps everything private and organized.
- **Managing Secrets**: Let's say one of the tools is a special laser that needs a password to turn on. The `Plan` holds onto that password. It only gives the password to the laser tool right when it's needed, and takes it back afterward. The password is never attached to the `Idea` itself, where other tools could see it.

This system keeps everything secure and allows you to build complicated projects where private information is handled safely by the project manager, the `Plan`.
