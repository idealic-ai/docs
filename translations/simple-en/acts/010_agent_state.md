# 010: Agent/State

> **State Message:** Imagine a computer program has a personal notepad where it keeps track of everything it's doing on a task. This notepad is its live, evolving memory. It’s a place for its “local variables,” which lets it handle jobs that take more than one step. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [004: Agent/Call](./004_agent_call.md)
>   - [006: Agent/Data](./006_agent_data.md)
> - Enables:
>   - [013: Agent/Plan](./013_agent_plan.md)
> - Complemented by:
>   - [011: Agent/Instancing](./011_agent_instancing.md)

This document is about something called the **State message**. Think of it as a computer agent's short-term memory.

The `State` message is how an agent remembers what it's doing from one moment to the next. It’s like a scratchpad where the agent jots down notes. This is super important because it allows the agent to work on complex tasks that have multiple steps. A tool can do its job, leave a note on the scratchpad, and the next tool can read that note to continue the work.

This scratchpad holds the complete, up-to-the-minute status of a job. Because of this, you can pause a task and come back to it later. When the agent starts again, it just reads the scratchpad to see exactly where it left off, and continues without missing a beat.

## Multi-Step Tools

The main job of the `State` message is to let different tools share information. It’s what allows them to work together as a team on the same task.

It works very simply: one tool writes its result onto the scratchpad (`State`), and another tool reads that result as its instruction for the next step. This lets you create a chain of tools, where the work of the first one feeds directly into the second one, and so on, without forgetting anything in between.

## How Tools Read from Memory (Inputs)

Tools read from the `State` using something called **Variable References**. Instead of giving a tool the actual piece of information, you give it a special pointer that says, "Go look for the information you need over here on the scratchpad."

This pointer is just a little piece of text that starts with a dagger symbol (`†`). The format is like `†kind.path`, where `kind` tells you which scratchpad to look at (like `state`) and `path` is the exact spot on the page where the note is written.

For example, if a tool needs to look up a user, the instruction might look like this in code:

```json
{
  "_tool": "fetchUserProfile",
  "userId": "†state.currentUser.id"
}
```

When the system runs this, it sees `†state.currentUser.id` and knows it's not a real ID. Instead, it goes to the `State` scratchpad, finds the `currentUser` section, gets the `id`, and uses that to run the tool. It's like telling your friend, "Go get the address from the sticky note on the fridge," instead of telling them the address yourself.

This is smart because if the information is really big, you don't have to copy it. You just point to it.

## How Tools Write to Memory (Outputs)

To write something to the `State` scratchpad, a tool uses a special instruction called `_outputPath`. This tells the system exactly where to put the tool's result when it's finished.

> Sidenote:
>
> - [004: Agent/Call](./004_agent_call.md)

You can also give the `State` a template (called a `schema`) that shows what kind of notes you expect to see on it. This helps guide the AI. If the template has a blank spot labeled "summary," the AI will know it needs to run a tool that can create a summary and put the result in that spot.

### Different Ways to Write

The `_outputPath` instruction can be written in a few cool ways:

- **One Spot:** Just give it a simple location. The `†state.` part is just a reminder that you're writing to the main scratchpad.
  ```json
  "†state.user.summary"
  ```
- **A Choice (Branching):** Using `||` (which means "OR") lets you give a few possible spots. The system can then decide which one to use. This is useful for things that can either succeed or fail.
  ```json
  "†state.summary.text || †state.summary.json"
  ```
- **Many Spots at Once (Fan-out):** Using `&&` (which means "AND") tells the system to write the same result to all the locations at the same time. It's like making copies of your note and sticking them in different places.
  ```json
  "†state.user.profile.summary && †state.audit.log.summary"
  ```

### Who Decides Where to Write?

- **Let the AI Decide (Dynamic):** You can let the AI be creative and decide where to put the results. This is great for when the agent is exploring and figuring things out on its own.

  _Tool's Rulebook:_

  ```json
  {
    "_outputPath": {
      "type": "string"
    }
  }
  ```

- **Set the Rules (Prescribed):** Or, you can set strict rules. For example, you can say, "The result MUST go here," or "The AI can only choose between these two spots." This is great for building reliable workflows where you know exactly what should happen, like handling errors.

  _Tool's Rulebook (forcing a choice between a success spot or a failure spot):_

  ```json
  {
    "_outputPath": {
      "enum": ["†state.success", "†state.failure"]
    }
  }
  ```

This gives you a way to control how predictable the agent is. You can let it be creative at first, and then lock down the rules to make it super reliable.

## Planning vs. Doing

This whole system of writing to `State` (outputs) and reading from `State` (inputs) is what allows the agent to **plan before it acts**.

It can create a whole map of how different tools will connect to each other, like a flowchart, _before_ running a single one. It can see that Tool A will create a result, and Tool B will need that result to start its work. This map can be checked and saved. This is perfect for AIs because they can think through the entire plan first, then execute it perfectly.

> [!HEADSUP] Heads up
> Making a plan is just creating a series of tool commands that are connected to each other through the `State`. The `State` is the whiteboard, the pointers (`Variable References` and `_outputPath`) are the connecting lines, and the agent's main loop is the engine that moves from step to step. Together, they let an agent draw out a complete workflow, which is its **Plan**.
>
> > Sidenote:
> >
> > - [005: Agent/Loop](./005_agent_loop.md)
> > - [013: Agent/Plan](./013_agent_plan.md)

## How `State` Works with Other Parts

- **Call:** A `Call` is a command to use a tool. By adding the `_outputPath` instruction, a simple command becomes an action that changes the agent's memory (`State`). This is how the agent's actions build on each other, creating a chain of events that are all recorded in the `State`.

  > Sidenote:
  >
  > - [004: Agent/Call](./004_agent_call.md)

- **Data:** At its heart, the `State` message is just a special kind of `Data` message. It uses all the same rules to create a memory for the agent. Its template (`schema`) defines how that memory should be organized, and it can be updated one little piece at a time.

  > Sidenote:
  >
  > - [006: Agent/Data](./006_agent_data.md)

- **Imports:** If a tool needs to work in a separate, clean room, the `Imports` system is how you pass it a copy of the main scratchpad (`State`). This lets tools that work in isolation still see what's happening in the main workflow in a safe and controlled way.

  > Sidenote:
  >
  > - [008: Agent/Imports](./008_agent_imports.md)

- **Plan:** `State` is the backbone of a `Plan`. In a `Plan`, all the tool commands are like dots on a map. The `State` provides the lines that connect the dots, showing how information flows from one tool to the next. This allows for creating smart workflows with branches (if this, then that) or parallel tasks.

  **SIDENOTE_PLACEHolder_5**

- **Instancing:** The `State` system works perfectly with the **Instancing** system. If you need to run the same task on 100 different things at once, each of those 100 tasks gets its own private scratchpad (`State`). The system is smart enough to make sure that when a tool asks for `†state.currentUser.id`, it automatically gets the ID from the correct scratchpad for the task it's working on. This lets one single plan run on thousands of items at the same time without them getting mixed up.

  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md)

## From One Task to Many

The `State` message gives an agent the memory to handle one job from start to finish. But to build truly powerful systems, agents need to be able to run that same job on many different things at once, in parallel.

The next document, **[011: Agent/Instancing](./011_agent_instancing.md)**, explains how the system manages all those parallel jobs, each with its own memory, without anything getting confused.
