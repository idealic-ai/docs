# 011: Agent/Expressions

> [!DEFINITION] [Expression](./000_glossary.md)
> A syntax for combining multiple paths in a :term[Variable Reference]{canonical="Variable Reference"} or :term[Output Path]{canonical="Output Path"} to create conditional or parallel data flows.

> Sidenote:
>
> - Requires:
>   - :term[007: Agent/Variables]{href="./007_agent_variables.md"}
>   - :term[008: Agent/Output]{href="./008_agent_output.md"}
> - Enables:
>   - :term[012: Agent/Plan]{href="./012_agent_plan.md"}

While :term[Variable References]{canonical="Variable Reference"} and :term[Output Paths]{canonical="Output Path"} provide the basic wiring for data flow, **Expressions** introduce logic into this wiring. They are a simple yet powerful syntax for creating conditional branches and parallel data flows, allowing an agent to define more complex and adaptive behaviors declaratively.

Expressions use `||` (OR) for conditional logic and `&&` (AND) for concurrent operations. They can be applied in two primary ways: gathering inputs for a tool and distributing outputs from a tool.

## Input Expressions (Many-to-One)

When used in a :term[Tool Call]{canonical="Tool Call"}'s input parameters, expressions allow a single parameter to draw data from multiple sources. This creates a **many-to-one (M:1)** data flow, enabling flexible data aggregation patterns like fallbacks and merges.

> Sidenote:
>
> ```mermaid
> graph TD
>     SourceA["†state.userInput"] --> ToolInput["processData(data)"]
>     SourceB["†state.default"] --> ToolInput
> ```

This capability is key to creating robust, reusable tools. Instead of requiring a rigid, hard-coded data structure for its inputs, a tool can be designed to flexibly adapt to the available context, sourcing its data from different places based on what is present at runtime.

::::columns
:::column{title="Fallback Logic with ||"}

When used in a :term[Variable Reference]{canonical="Variable Reference"}, `||` acts as a fallback. The expression `†state.userInput || †state.default` instructs the engine to first look for a value at `state.userInput`. If it's not found, it will use the value from `state.default` instead. This is useful for providing default values or handling optional inputs gracefully.

```json
{
  "_tool": "processData",
  "data": "†input.optionalData || †state.defaultData"
}
```

:::
:::column{title="Concurrent Dependency with &&"}

When used in a :term[Variable Reference]{canonical="Variable Reference"}, `&&` acts as a gate, ensuring that all specified data paths exist in the context before proceeding. If all paths are present, the expression resolves to the value of the _last_ path in the sequence. This is a powerful way to enforce dependencies, ensuring a tool only runs after all its prerequisite data is available.

```json
// This tool will only run if both a user profile and their permissions are loaded.
// The `permissions` parameter will receive the value of `†state.permissions`.
{
  "_tool": "renderDashboard",
  "permissions": "†state.userProfile && †state.permissions"
}
```

:::
::::

## Output Expressions (One-to-Many)

When used in an :term[Output Path]{canonical="Output Path"}, expressions allow a single tool's result to be written to multiple destinations. This creates a **one-to-many (1:M)** data flow, enabling patterns like conditional branching and fan-out.

> Sidenote:
>
> ```mermaid
> graph TD
>     ToolOutput["verifyUser()"] --> DestA["†data.user.verified"]
>     ToolOutput --> DestB["†data.user.failed"]
> ```

This mechanism allows a single tool to have multiple, context-dependent outcomes. It is the foundation for creating dynamic agents that can react intelligently to situations, choosing the appropriate path of execution based on the results of their actions.

::::columns
:::column{title="Alternative Paths (Branching) with ||"}
Using `||` in an :term[Output Path]{canonical="Output Path"} allows a tool to declare its possible outcomes. The tool's internal logic then determines which path to write the result to. This is useful for creating conditional logic, where a tool can succeed or fail.

```json
// If `verifyUser` succeeds, the result is written to `data.user.verified`;
// otherwise, it's written to `data.user.failed`.
{
  "_tool": "verifyUser",
  "userId": "perfect-stranger",
  "_outputPath": "†data.user.verified || †data.user.failed"
}
```

:::
:::column{title="Concurrent Paths (Fan-out) with &&"}
Using `&&` in an :term[Output Path]{canonical="Output Path"} directs the engine to perform a fan-out, writing the same output to multiple paths at once. This is useful for broadcasting a result to multiple parts of the state or for auditing purposes.

```json
// Writing to `user` and `audit` objects in the state simultaneously.
{
  "_tool": "generateSummary",
  "text": "Long body of text here...",
  "_outputPath": "†data.user.summary && †data.audit.summary"
}
```

:::
::::

## From Expressions to Strategies

Expressions provide the logical glue to connect individual :term[Tool Calls]{canonical="Tool Call"}. With this capability, an agent can move beyond simple, linear sequences of actions and begin to construct sophisticated, branching workflows.

The next document, :term[012: Agent/Plan]{href="./012_agent_plan.md"}, describes how these expressive connections are used to build a complete, strategic :term[Plan]{canonical="Plan"}.
