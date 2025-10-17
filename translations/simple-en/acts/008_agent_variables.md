# 008: Agent/Variables

> [!DEFINITION] [Variable Reference](./000_glossary.md)
> A special message, like a shortcut, that starts with `†`. Instead of holding information itself, it points to where information is stored somewhere else in the agent's memory. For example, `†input.userName` tells the agent: "Go find the user's name in the `input` message."

Variables are what make an agent's data come alive. Think of them like shortcuts that let the agent do two main things with information:

- **Reading:** An agent can use a variable to look up a piece of information from its memory (like what you just typed, or something it remembered from before) without having to copy and paste the whole thing.
- **Writing:** After a tool does its job, it can use a variable to save the result in the agent's memory (usually its 'scratchpad', called `State`), so it can be used later.

## Reading from Memory

When you tell an agent to use a tool, you can give it a **Variable Reference** instead of the actual data. A variable reference is a special shortcut that points to information stored somewhere else.

This is way better than asking the AI to copy-paste big chunks of information. Copying is slow, costs more, and the AI might accidentally change something. Using a shortcut is fast, cheap, and always accurate.

The shortcut's format is simple: `†<kind>.<path>`. The dagger symbol (`†`) tells the system, "This is a shortcut!" The `<kind>` tells it which notepad to look in (like `state` for its memory, or `input` for what the user said), and the `<path>` is the exact spot on that notepad to find the information.

> Sidenote:
> - Wikipedia: [Dagger (mark)](<https://en.wikipedia.org/wiki/Dagger_(mark)>)

::::columns
:::column{title="Tool using a variable shortcut"}

```json
{
  "_tool": "greetUser",
  "userName": "†input.userName"
}
```

:::
:::column{title="What this means in normal code"}

```typescript
greetUser({
  userName: input.userName,
});
```

:::
::::

## Writing to Memory

To save a tool's result, we add a special property called `_outputPath` to the tool's instructions. This tells the system exactly where to put the answer when the tool is finished. A common place to save things is on the agent's main scratchpad, called `State` (for example, `†state.user.summary`).

> Sidenote:
> - [004: Agent/Call](./004_agent_call.md)

We can tell the tool where to save its result in two ways, giving us different levels of control.

::::columns{.examples}
:::column{title="Flexible Path (AI Decides)"}

Here, the AI gets to decide where to store the result. This makes the tool very adaptable.

```json
// The tool's rules say the AI can provide any valid path for _outputPath
{
  "_outputPath": {
    "type": "string",
    "description": "Path to store the user summary.",
    "pattern": "^†"
  }
}
```

:::
:::column{title="Fixed Path (Set in Stone)"}

This way forces the tool to always save its result in the exact same spot. This makes the tool's behavior completely predictable.

```json
// The tool's rules lock _outputPath to one specific value
{
  "_outputPath": {
    "type": 'string',
    "const": "†state.user.summary"
  }
}
```

:::
::::

## Connecting Steps in Advance

The real magic of variables is that they let you plan out steps using information that doesn't exist yet. For example, you can set up a tool that's ready to work with a user's name, even before the user has typed their name in.

This also lets you chain tools together. You can tell one tool to use the result from another tool, even before the first tool has run. You create a data pipeline where the output of one step automatically becomes the input for the next.

This becomes even more powerful when you use special symbols to create branching paths for the data.

::::columns
:::column{title="Either/Or Paths (Branching)"}
Using `||` (which means "or") in an `_outputPath` lets a tool have different outcomes. The tool decides which path to send the result down based on what happened.

```json
// If the `verifyUser` tool succeeds, the result goes to `state.user.verified`.
// If it fails, the result goes to `state.user.failed`.
{
  "_tool": "verifyUser",
  "userId": "perfect-stranger",
  "_outputPath": "†state.user.verified || †state.user.failed"
}
```

:::
:::column{title="Both Paths (Splitting)"}
Using `&&` (which means "and") tells the system to split the path, sending the exact same result to multiple places at once.

```json
// The summary is saved to both the user's area and the audit log at the same time.
{
  "_tool": "generateSummary",
  "text": "Long body of text here...",
  "_outputPath": "†state.user.summary && †state.audit.summary"
}
```

:::
::::

This ability to map out a whole series of steps—including forks in the road and splits—on data you don't even have yet is the secret to planning. It lets the AI create a complete flowchart of actions (a `Plan`) that you can check and approve before anything actually runs. This powerful planning skill comes from how Variables work with other key parts of the system:

> Sidenote:
> - [010: Agent/Plan](./010_agent_plan.md)

## How Variables Fit with Everything Else

- **Data:** Variables are what let an agent interact with its data. They read from data messages (like `Input` or `State`), and then write results back to them, creating a cycle where information is constantly being used and updated.

  > Sidenote:
  > - [006: Agent/Data](./006_agent_data.md)

- **Input:** You can create reusable workflows by having variables point to the `Input` message. This way, the plan of action stays the same, but the specific information it uses (like a person's name or a file) can be different each time.

  > Sidenote:
  > - [007: Agent/Input](./007_agent_input.md)

- **State:** The `State` is the agent's main scratchpad. It's where tools usually save their results because information stored in the `State` sticks around between steps, letting a future tool pick up where a previous one left off.

  > Sidenote:
  > - [009: Agent/State](./009_agent_state.md)

- **Plan:** Variables are the glue that holds a `Plan` together. A `Plan` is just a map of tool actions, and the lines connecting them are the variables, showing how the output from one tool becomes the input for another. This lets an agent describe a whole job as a single, clear blueprint.

  > Sidenote:
  > - [010: Agent/Plan](./010_agent_plan.md)

## From Quick Connections to Long-Term Memory

Variables are great for connecting tools during a single task. But for bigger jobs that take multiple steps, an agent needs a permanent place to think—a scratchpad where it can store results and notes between tasks.

The next document, [009: Agent/State](./009_agent_state.md), explains how this permanent memory works.
