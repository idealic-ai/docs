# 011: Agent/Expressions

> [!DEFINITION] [Expression](./000_glossary.md)
> An Expression is a special instruction that lets you combine different data paths. Think of it as a way to create choices or make things happen at the same time.

> Sidenote:
> - You should know about:
>   - :term[007: Agent/Variables]{href="./007_agent_variables.md"}
>   - :term[008: Agent/Output]{href="./008_agent_output.md"}
> - This helps you understand:
>   - :term[012: Agent/Plan]{href="./012_agent_plan.md"}

Imagine you're building a robot. :term[Variable References]{canonical="Variable Reference"} and :term[Output Paths]{canonical="Output Path"} are like the basic wires that carry electricity and information. **Expressions** are like adding switches and splitters to those wires. They let your robot make simple decisions, like choosing which path to take or waiting for multiple signals before it acts.

Expressions use two simple symbols:
- `||` means **OR**. It's for making a choice between two options.
- `&&` means **AND**. It's for doing several things at once or waiting for multiple things to be ready.

You can use these in two main ways: when a tool is gathering its ingredients (inputs) and when it's sending out its result (outputs).

## Input Expressions (Getting Information from Many Places)

When a tool needs information to do its job, an expression lets it look in more than one place. This creates a **many-to-one** flow, like several small streams flowing into a single river.

> Sidenote:
> ```mermaid
> graph TD
>     SourceA["†state.userInput"] --> ToolInput["processData(data)"]
>     SourceB["†state.default"] --> ToolInput
> ```

This makes our tools much smarter and more flexible. Instead of a tool that only works one way, it can adapt to different situations. It can check a few different spots for the information it needs and use whatever it finds.

::::columns
:::column{title="Backup Plan with ||"}

When you use `||` to get an input, it acts as a backup. The instruction `†state.userInput || †state.default` tells the system: "First, look for `state.userInput`. If you can't find anything there, use `state.default` instead." This is great for having a default value just in case.

```json
{
  "_tool": "processData",
  // Get data from optionalData, but if it's missing,
  // use defaultData as a backup.
  "data": "†input.optionalData || †state.defaultData"
}
```

:::
:::column{title="Waiting for Everything with &&"}

When you use `&&` to get an input, it's like a gate that only opens when everyone has arrived. It checks to make sure all the data you listed is actually there. If everything is ready, it uses the value from the *last* item on the list. This ensures a tool doesn't start its job until it has all the information it needs.

```json
// This tool won't start until we have both the user's profile and their permissions.
// The tool will get the value from `†state.permissions`.
{
  "_tool": "renderDashboard",
  "permissions": "†state.userProfile && †state.permissions"
}
```

:::
::::

## Output Expressions (Sending Information to Many Places)

When a tool finishes its job, an expression lets it send the result to more than one destination. This creates a **one-to-many** flow, like a water sprinkler sending water from one hose to many different spots on the lawn.

> Sidenote:
> ```mermaid
> graph TD
>     ToolOutput["verifyUser()"] --> DestA["†data.user.verified"]
>     ToolOutput --> DestB["†data.user.failed"]
> ```

This lets a single tool have different effects depending on the situation. It's how we build smart agents that can react to what's happening and choose the right action to take next.

::::columns
:::column{title="Choosing a Path with ||"}

Using `||` for an output is like coming to a fork in the road. The tool decides which path to send its result down. For example, a tool that checks a user's password can send the result down the "success" path if it's correct or the "failure" path if it's wrong.

```json
// If the `verifyUser` tool succeeds, the result goes to `data.user.verified`.
// If it fails, the result goes to `data.user.failed`.
{
  "_tool": "verifyUser",
  "userId": "perfect-stranger",
  "_outputPath": "†data.user.verified || †data.user.failed"
}
```

:::
:::column{title="Sending to Everyone with &&"}

Using `&&` for an output is like sending a group text. The tool sends the exact same result to multiple places at the same time. This is useful for updating different parts of the system with the same information or for keeping a log of what happened.

```json
// The summary is sent to both the `user` area and the `audit` area at once.
{
  "_tool": "generateSummary",
  "text": "Long body of text here...",
  "_outputPath": "†data.user.summary && †data.audit.summary"
}
```

:::
::::

## From Expressions to Strategies

These simple expressions (`||` and `&&`) are the glue that connects individual tool actions together. With them, an agent can do more than just follow a simple list of steps. It can start to build clever plans with choices and branches, like a flowchart.

The next document, :term[012: Agent/Plan]{href="./012_agent_plan.md"}, shows how we use these connections to build a complete strategy, or :term[Plan]{canonical="Plan"}, for the agent.
