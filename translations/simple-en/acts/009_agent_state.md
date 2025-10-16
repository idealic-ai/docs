# 009: Agent/State

> [!DEFINITION] State Message
> A special message that works like an ongoing memory for a process. Think of it as a set of digital sticky notes or a scratchpad where the process can keep track of what it's doing, allowing it to handle tasks that require multiple steps.

> Sidenote:
> - Requires:
>   - [004: Agent/Call](./004_agent/call.md)
>   - [006: Agent/Data](./006_agent/data.md)
> - Enables:
>   - [010: Agent/Plan](./010_agent/plan.md)
> - Complemented by:
>   - [011: Agent/Instancing](./011_agent/instancing.md)
>   - [012: Agent/Delegate](./012_agent/delegate.md)
>   - [013: Agent/Scopes](./013_agent/scopes.md)

This document explains the **State message**, which gives an agent a memory that sticks around. While [Variables](./008_agent_variables.md) are like the wires connecting different tools, the `State` is the **scratchpad** where the agent jots down notes and results as it works through a task.

The `State` keeps track of everything happening with a request. This is super important because it allows a process to be paused and then restarted later, right where it left off, kind of like saving your progress in a video game. When the process wakes up, it just looks at the `State` to remember what it was doing and what to do next.

## Giving the Scratchpad Some Rules

You can give the `State` a `schema`, which is like a template or a form to fill out. It’s not required, but it’s very helpful. This template tells the AI what kind of information it should expect to collect and where to write it down.

This helps guide the AI. If it knows the scratchpad is supposed to have a spot for a `user_email` and a `final_summary`, it will focus on using tools that can find that information. This makes the whole process more reliable and less likely to get confused.

> Sidenote:
> - [008: Agent/Variables](./008_agent_variables.md)

## Making Tools Work Together in Steps

The main job of the `State` message is to let different tools share information. It’s a shared space where one tool can leave a result, and another tool can pick it up and use it.

Imagine an assembly line. One robot arm paints a car door and puts it on the conveyor belt (writes to `State`). The next robot arm down the line picks up that painted door (reads from `State`) and attaches it to the car's body. The `State` is the conveyor belt that connects their work.

## Planning First, Acting Second

Using the `State` to save results (`_outputPath`) and using **Variables** to read them is what allows the agent to separate planning from doing. The agent can map out an entire set of steps—like a flowchart showing how data moves from one tool to the next—*before* it actually runs any of them.

This flowchart of actions can be checked for errors, saved, and reused. It's like a chef writing out the entire recipe before even turning on the stove. The person creating the workflow can either let the AI figure out the recipe on its own or give it a strict set of instructions to follow for a super-reliable result.

> [!HEADSUP] Heads up
> When an agent creates a series of tool actions that are connected through the `State`, it is **planning**. This system provides all the pieces needed for it: the `State` is the scratchpad, Variables and `_outputPath` are the wires connecting the dots, and the agent's **Loop** is the engine that runs through the steps. Together, they let an agent build a complete flowchart of actions, which is the core of what a **Plan** is.
> 
> > Sidenote:
> > 
> > - [005: Agent/Loop](./005_agent_loop.md)
> > - [010: Agent/Plan](./010_agent_plan.md)

## How It Works With Other Parts

- **Call:** A `Call` is an instruction to use a tool. By itself, it’s just a one-off action. But when you add the `_outputPath` property, you're telling the tool, "Hey, once you're done, write your result to this specific spot on the `State` scratchpad." This turns a simple action into one that changes the agent's memory, allowing future steps to build on what it just did.

  > Sidenote:
  > - [004: Agent/Call](./004_agent_call.md)

- **Data:** The `State` message is just a special kind of `Data` message, specifically one with `kind: "state"`. It uses all the features of `Data` messages to create a memory for the agent. For example, it uses the `schema` property to define the memory's structure. It also uses the `Data` system's ability to be updated in small pieces, like adding new sticky notes to a whiteboard instead of erasing and re-drawing the whole thing every time.

  > Sidenote:
  > - [006: Agent/Data](./006_agent_data.md)

- **Scopes:** The `Scopes` system is how a tool running in a separate, clean workspace (a **Delegate**) can get access to the main `State` scratchpad. When a task is delegated, you can specify that the `state` should be included. This allows the isolated tool to read from and write to the main workflow's memory in a safe and controlled way.

  > Sidenote:
  > - [013: Agent/Scopes](./013_agent_scopes.md)

- **Instancing:** The `State` message works perfectly with `Instancing`. If you have a task that needs to run for 100 different users at once (`Instances`), each user gets their own private `State` scratchpad. When a tool needs to get information, like `†state.currentUser.id`, the system automatically knows which user's scratchpad to look at. This allows a single, general-purpose plan to work for many different cases at the same time without them interfering with each other.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Plan:** While `State` is useful for simple, step-by-step tasks, its real power shines when it's the foundation of a `Plan`. In a `Plan`, all the tool actions are mapped out like a flowchart. The `State` object acts as the arrows connecting the boxes in that flowchart. It’s what lets one action save a result that can be used by several other actions later, enabling complex logic like branching paths (if-then-else) or running multiple tasks at once.

  > Sidenote:
  > - [010: Agent/Plan](./010_agent_plan.md)

## From a Single Memory to a Full Orchestra

The `State` message gives us a way to manage the memory for a single process. Now that we have a scratchpad and a way to connect tools, we can start building and running complex projects with many steps.

The next document, **[010: Agent/Plan](./010_agent_plan.md)**, explains how to manage these projects by organizing all the tool actions into a smart flowchart.
