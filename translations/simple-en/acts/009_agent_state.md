# 009: Agent/State

> [!DEFINITION] State Message
> A special message that works like a live, changing memory for a multi-step task. It holds information, like a set of notes, so the agent can remember what it's doing from one step to the next.

> Sidenote:
> - Needs these ideas first:
>   - [004: Agent/Call](./004_agent/call.md)
>   - [006: Agent/Data](./006_agent/data.md)
> - Helps create this idea:
>   - [010: Agent/Plan](./010_agent/plan.md)
> - Works together with:
>   - [011: Agent/Instancing](./011_agent/instancing.md)
>   - [012: Agent/Delegate](./012_agent/delegate.md)
>   - [013: Agent/Scopes](./013_agent/scopes.md)

This document explains the **State message**, which is a special type of message that acts like a memory for an agent while it works. Think of it like this: if an agent needs to do a big job with many steps, it needs a place to write things down so it doesn't get lost. The State is that place—it's the agent's personal scratchpad.

This scratchpad keeps track of everything important for the current task. This is super useful because it allows the agent to pause its work and come back to it later without forgetting anything. When the agent starts again, it just looks at its scratchpad (the State message from the last step) to see exactly where it left off and what to do next.

## Guiding the Workflow with a Schema

You can give the agent a template for its scratchpad, called a `schema`. This is like giving someone a fill-in-the-blanks form. The form has spaces for specific pieces of information, which tells the agent what it needs to find and where to write it down. This helps guide the agent to do its job correctly and make sure all the necessary steps are taken in the right order.

When the agent is told what information goes where, it's more likely to use its tools in a way that fills out the form perfectly, creating a smooth and predictable process.

> Sidenote:
> - [008: Agent/Variables](./008_agent_variables.md)

## Multi-Step Tools

The main reason for the State scratchpad is to let different tools share information. It allows for complex, multi-step jobs where tools work together.

Imagine an assembly line. One tool builds a car door and places it on the conveyor belt (writes its result to the State). The next tool down the line picks up the door from the belt (reads the data from the State) and attaches it to the car. The State acts as the conveyor belt, passing information from one tool to the next so they can work together on the same project.

## Planning vs. Execution

By using the State, an agent can separate planning from doing. It can figure out a whole plan first—like drawing a blueprint—before a single tool starts working. The agent can map out which tool will do what, where it will get its information from, and where it will put its result.

This blueprint can be checked, saved, and reused. It's like a recipe where you list all the ingredients and all the steps before you even start cooking. You can decide to follow the recipe exactly, or you can let the agent figure out some of the steps on its own. This makes the system both powerful and flexible.

> [!HEADSUP] Heads up
> When an agent decides how its tools will connect to each other using the State scratchpad, it's creating a plan. This system gives the agent everything it needs to do this: a scratchpad (the State), wires to connect things (`_outputPath` and Variable References), and a process to work through the steps (the Loop). Together, these parts let an agent build a complete roadmap for solving a problem, which is what a Plan is.
>
> > Sidenote:
> >
> > - [005: Agent/Loop](./005_agent_loop.md)
> > - [010: Agent/Plan](./010_agent_plan.md)

## Composition

- **Call:** A `Call` is a command to use a tool. It's connected to the State through a special instruction called `_outputPath`. This instruction tells the tool where on the scratchpad to write its result. This turns a simple tool action into a step that changes the agent's memory, allowing a series of actions to build on each other.

  > Sidenote:
  > - [004: Agent/Call](./004_agent_call.md)

- **Data:** The State system is built on top of the `Data` message system. It's just a `Data` message that is specifically labeled as `"state"`. It uses all the cool features of `Data` messages, like using a `schema` to define its structure. It also means the State can be updated in small pieces, and the system will automatically merge those pieces together to keep the scratchpad organized and up-to-date.

  > Sidenote:
  > - [006: Agent/Data](./006_agent_data.md)

- **Scopes:** Scopes are like giving a tool a temporary, clean workspace to do its job. If you want a tool to have access to the main scratchpad, you can use the `_scopes` property to include the State in that workspace. This lets tools that work in isolation still see and use the information from the main task in a safe and controlled way.

  > Sidenote:
  > - [013: Agent/Scopes](./013_agent_scopes.md)

- **Instancing:** The State system works perfectly with `Instancing`, which is when you run the same task on many different things at once (like sending a personalized email to 100 people). Each person's information gets its own separate scratchpad. When a tool needs to find the `currentUser.id`, the system automatically knows which person's scratchpad to look at. This allows a single plan to work on many separate tasks at the same time without getting them mixed up.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Plan:** While the State is great for chaining tools in a simple line, it becomes truly powerful when used to build a `Plan`. A `Plan` is like a flowchart where tools are the boxes and the State is the arrows connecting them. The State allows one tool to write a piece of information that other tools can then read, making it possible to create complex workflows with forks (if-then decisions) or parallel branches.

  > Sidenote:
  > - [010: Agent/Plan](./010_agent_plan.md)

## From Single State to Orchestrated Workflows

The State message gives us the memory an agent needs to handle a single task with many steps. Now that we have a scratchpad and a way to connect tools, we can start designing and running much more complex jobs.

The next document, [010: Agent/Plan](./010_agent_plan.md), explains how to organize these jobs into a smart flowchart of tool actions.