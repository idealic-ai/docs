# 010: Agent/State

> **State Message:** Think of this as the a workflow's live memory. It’s like a scratchpad where the AI can keep notes and store information as it works, allowing it to handle tasks that have multiple steps.

> Sidenote:
> - Requires:
>   - [004: Agent/Call](./004_agent_call.md)
>   - [006: Agent/Data](./006_agent_data.md)
> - Enables:
>   - [012: Agent/Plan](./012_agent_plan.md)
> - Complemented by:
>   - [011: Agent/Instancing](./011_agent_instancing.md)

This document explains the **State message**, a feature that lets an AI agent remember what it's doing from one moment to the next. The `State` message is a special way of using the **Data** system to create workflows that have a memory.

Imagine you're building something with instructions. The `State` is like your workbench. It holds all your pieces and progress so that if you stop and come back later, you know exactly where you left off. When the AI starts a new step, it looks at the `State` from the previous step to understand what's already been done and what to do next.

## Multi-Step Tools

The main job of the `State` message is to let different **Tools** (the abilities the AI can use) share information. It creates a shared workspace where one tool can leave its result, and another tool can pick it up and use it.

It works like passing a note. One tool does its job and writes the result to the `State` (the note). Then, the next tool in the sequence reads that note to get the information it needs to do its own job. This lets you build chains of tools that work together, where the result of one step becomes the starting point for the next.

## Inputs

How does a tool read information from the `State`? It uses something called a **Variable Reference**. Instead of copying a large piece of data, a tool can use a special shortcut that points to where the data is stored in the `State`. This is much more efficient, like writing down a page number in a book instead of copying the whole page.

The shortcut is a simple string that starts with a dagger symbol (`†`). The format is `†<where>.<what>`, where `<where>` is the type of memory (like `state` for the main workbench) and `<what>` is the specific piece of data you want.

For example, if an AI needed to look up a user, the instruction might look like this:

```json
{
  "_tool": "fetchUserProfile",
  "userId": "†state.currentUser.id"
}
```

When it's time to run this, the system sees `†state.currentUser.id` and automatically goes to the `State` memory, finds the `id` of the `currentUser`, and plugs it into the `userId` field before running the tool.

## Outputs

To write a result *to* the `State`, a tool uses a special instruction called `_outputPath`. This is like telling the AI exactly where on the workbench to put the result of its work.

> Sidenote:
> - A `Tool Call` tells a tool *what* to do. The `_outputPath` tells it *where* to put the result, changing it from a simple action into a step that builds a larger memory.

You can also set up rules (a `schema`) for what the `State` memory should contain. If the rules say a certain piece of information is missing, it cleverly guides the AI to use a tool that will create that information and put it in the right place.

### Path Syntax

The `_outputPath` instruction can be written in a few ways:

- **Regular Path:** A simple location. The `†state.` part is just a reminder that you're saving to the main `State` memory.
  ```json
  "†state.user.summary"
  ```
- **Alternative Paths (Branching):** Using `||` (which means "or") gives a choice of where to save the result. This is useful for tasks that can have different outcomes, like success or failure.
  ```json
  "†state.summary.text || †state.summary.json"
  ```
- **Concurrent Paths (Fan-out):** Using `&&` (which means "and") tells the system to save the same result in multiple places at the same time.
  ```json
  "†state.user.profile.summary && †state.audit.log.summary"
  ```

### Specification Methods

How does a tool know which `_outputPath` to use? The rules for the tool can define this:

- **Dynamic (AI Decides):** The tool's rules can be very flexible, letting the AI decide where to save the data. This gives the agent the freedom to connect tools in new and creative ways as it works.

  _Tool's Rules:_

  ```json
  {
    "_outputPath": {
      "type": "string"
    }
  }
  ```

- **Prescribed (Hard-Coded):** The rules can be very strict, forcing the AI to save the result in a specific spot or choose from a short, pre-approved list of locations. This is great for building predictable and reliable workflows where you know exactly what should happen.

  _Tool's Rules (forcing a choice between success or failure spots):_

  ```json
  {
    "_outputPath": {
      "enum": ["†state.success", "†state.failure"]
    }
  }
  ```

This choice between freedom and control is a key part of how the **Plan** system works, letting you build workflows that are either creative or rock-solid reliable.

## Planning vs. Execution

The combination of writing to the `State` with `_outputPath` and reading from it with **Variable References** is what makes it possible to separate *planning* from *doing*. An AI can create a complete map of all the steps it needs to take—a chain of tools connected by these memory pointers—*before* it actually runs a single one.

This map can be checked for errors, saved for later, and understood as a whole. You can give the AI the freedom to draw its own map by letting it decide the inputs and outputs, or you can give it a strict blueprint to follow for guaranteed results.

> [!TIP]
> Making a plan is simply the act of connecting **Tool Calls** together using the **State**. The `State` is the whiteboard, the references (`†...`) and output paths are the lines connecting ideas, and the AI **Loop** is the engine that follows the diagram, step by step. Together, they let an agent build a complete data-flow map, which is what a **Plan** really is.
> 
> > Sidenote:
> > 
> > - [005: Agent/Loop](./005_agent_loop.md)
> > - [012: Agent/Plan](./012_agent_plan.md)

## Composition

- **Call:** A `Call` (using a tool) and a `State` are tightly connected. When a `Tool Call` includes `_outputPath`, it's no longer just a one-off action; it's an action that changes the workflow's memory. By telling the system where to write its result, a `Call` becomes a way for the AI to record what it has done, allowing future steps to build on that work.

  > Sidenote:
  > - [004: Agent/Call](./004_agent_call.md)

- **Data:** The `State` is just a special use of the **Data** system. It uses a `Data` message with the label `kind: "state"`. This gives it all the features of `Data`, like using a `schema` to define its structure and the ability to be updated in small pieces, which the system then merges into one complete memory.

  > Sidenote:
  > - [006: Agent/Data](./006_agent_data.md)

- **Imports:** The **Imports** system is how you give a tool running in its own separate workspace access to the main `State` memory. When an AI delegates a task, it can use `_imports` to say, "Include the main `State` so this tool knows what's going on." This allows self-contained tools to safely read from and contribute to the main workflow.

  > Sidenote:
  > - [008: Agent/Imports](./008_agent_imports.md)

- **Plan:** A `State` is the backbone of a **Plan**. A `Plan` is like a flowchart where each box is a tool. The `State` provides the arrows that connect the boxes. It lets the output of one tool become the input for another, creating complex workflows with branches (if/then logic) and parallel tasks.

  > Sidenote:
  > - [012: Agent/Plan](./012_agent_plan.md)

- **Instancing:** The `State` works perfectly with the **Instancing** system. If you need to run the same workflow on 100 different items at once, each item gets its own separate `State` memory. When a tool refers to `†state.currentUser.id`, the system automatically knows which of the 100 memories to look at. This lets you run one general plan across lots of different data at the same time, without anything getting mixed up.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

## From Single State to Parallel Execution

The `State` message provides the memory for a single workflow. But to build powerful systems, we need to run that same workflow on many different things at once. This means managing many separate `State` memories in parallel.

The next document, **[011: Agent/Instancing](./011_agent_instancing.md)**, explains how the system handles this challenge.