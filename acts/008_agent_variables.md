# 008: Agent/Variables

> [!DEFINITION] [Variable Reference](./000_glossary.md)
> A string with a special syntax (`†<kind>.<path>`) used in a :term[Tool Call]{canonical="Call"}'s parameters to dynamically reference a value from the agent's context.

:term[Variables]{canonical="Variable"} build upon the [Data](./006_agent_data.md) system to enable dynamic data flows. They make structured information interactive through two primary functions:

- **Reading:** Referencing a value that exists within the agent's context (such as an :term[Input]{canonical="Input"} or :term[State]{canonical="State"} message) without needing to copy the data directly into a :term[Tool Call]{canonical="Call"}'s parameters.
- **Writing:** Persisting a result to a :term[Data]{canonical="Data"} object (most commonly :term[State]{canonical="State"}) so its value can be accessed in subsequent ticks of the agent's loop.

## Reading from Context

A parameter in a :term[Tool Call]{canonical="Call"} can hold a **Variable Reference**—a special string that points to a value elsewhere in the context—instead of the value itself. This prevents the inefficient and error-prone process of having an LLM copy large data objects from its context into the parameters of a :term[Tool Call]{canonical="Call"}. Using a reference is faster, cheaper, and more reliable, as it eliminates the risk of the LLM altering the data during reproduction.

The reference is a simple string syntax prefixed with a dagger (`†`). The syntax is `†<kind>.<path>`, where `<kind>` is the type of :term[Data]{canonical="Data"} message (e.g., `state`, `input`) and `<path>` is the dot-notation path to the desired value

> Sidenote:
>
> - Wikipedia: [Dagger (mark)](<https://en.wikipedia.org/wiki/Dagger_(mark)>)

::::columns
:::column{title="Tool parameters using varaibles"}

```json
{
  "_tool": "greetUser",
  "userName": "†input.userName"
}
```

:::
:::column{title="Equivalent Typescript code"}

```typescript
greetUser({
  userName: input.userName,
});
```

:::
::::

## Writing to Context

To persist a tool's result, a :term[Call]{canonical="Call"} can include the `_outputPath` meta-property. This string—an **Output Path**—tells the execution engine where to place the result, making it available for subsequent steps or future loop iterations. A common convention is to use a path that targets the :term[State]{canonical="State"} object (e.g., `†state.user.summary`).

> Sidenote:
>
> - [004: Agent/Call](./004_agent_call.md)

The `_outputPath` can be defined in two ways, allowing for a spectrum of control over a tool's behavior.

::::columns{.examples}
:::column{title="Dynamic Path (LLM-Decided)"}

In this mode, the LLM has the freedom to decide where to store the result at runtime, making the tool highly flexible.

```json
// Tool schema allows any string for _outputPath
{
  "_outputPath": {
    "type": "string",
    "description": "Path to store the user summary.",
    "pattern": "^†"
  }
}
```

:::
:::column{title="Prescribed Path (Hard-Coded)"}

This approach enforces a strict, predictable behavior, ensuring the tool always writes its output to a specific, hard-coded location.

```json
// Tool schema locks _outputPath to a specific value
{
  "_outputPath": {
    "type": "string",
    "const": "†state.user.summary"
  }
}
```

:::
::::

## Declarative Connection

The power of :term[Variables]{canonical="Variable"} comes from their ability to define operations on data that is not yet available. For instance, a :term[Tool Call]{canonical="Call"} can be defined to operate on a value from an :term[Input]{canonical="Input"} message, even if that specific input has not been provided. This allows for the creation of reusable, parameterized workflows.

This concept extends to chaining :term[Tool Calls]{canonical="Call"} together. A :term[Tool Call]{canonical="Call"} can be created with a :term[Variable Reference]{canonical="Variable Reference"} that points to the `_outputPath` of a _previous_ call in the same sequence. This creates a multi-step data flow where the output of one tool becomes the input for the next.

This declarative wiring becomes especially powerful when `Output Paths` are used to define potential outcomes.

::::columns
:::column{title="Alternative Paths (Branching)"}
Using `||` in an `_outputPath` allows a tool to declare its possible outcomes. The tool's internal logic then determines which path to write the result to.

```json
// If `verifyUser` succeeds, the result is written to `state.user.verified`;
// otherwise, it's written to `state.user.failed`.
{
  "_tool": "verifyUser",
  "userId": "perfect-stranger",
  "_outputPath": "†state.user.verified || †state.user.failed"
}
```

:::
:::column{title="Concurrent Paths (Fan-out)"}
Using `&&` in an `_outputPath` directs the engine to perform a fan-out, writing the same output to multiple paths at once.

```json
// Writing to `user` and `audit` objects in the state simultaneously.
{
  "_tool": "generateSummary",
  "text": "Long body of text here...",
  "_outputPath": "†state.user.summary && †state.audit.summary"
}
```

:::
::::

This ability to define a full sequence of operations—including complex branching and fan-outs—on data that doesn't yet exist is what enables declarative planning. It allows the LLM to generate a complete data-flow graph (:term[Plan]{canonical="Plan"}) that can be reviewed, approved, and reused before any code is executed. This powerful planning capability emerges from the way :term[Variables]{canonical="Variable"} compose with other core concepts:

> Sidenote:
>
> - [010: Agent/Plan](./010_agent_plan.md)

## Composition

- **:term[Data]{canonical="Data"}:** Variables are the mechanism that makes :term[Data]{canonical="Data"} messages interactive. :term[Variable References]{canonical="Variable Reference"} read from :term[Data]{canonical="Data"} messages (like :term[Input]{canonical="Input"} or :term[State]{canonical="State"}), and `Output Paths` write back to them, creating a dynamic loop where data can be accessed and modified.

  > Sidenote:
  >
  > - [006: Agent/Data](./006_agent_data.md)

- **:term[Input]{canonical="Input"}:** :term[Variable References]{canonical="Variable Reference"} can target :term[Input]{canonical="Input"} messages, allowing a workflow to be parameterized. This is essential for creating reproducible plans where the overall structure is defined, but the specific data it operates on is provided at runtime.

  > Sidenote:
  >
  > - [007: Agent/Input](./007_agent_input.md)

- **:term[State]{canonical="State"}:** The :term[State]{canonical="State"} object is the primary scratchpad for variables in multi-step workflows. It's the most common target for `Output Paths` because it persists between the ticks of an agent's execution loop, allowing one step to leave a result that a future step can read.

  > Sidenote:
  >
  > - [009: Agent/State](./009_agent_state.md)

- **:term[Plan]{canonical="Plan"}:** Variables are the fundamental technology that powers the :term[Plan]{canonical="Plan"} system. A :term[Plan]{canonical="Plan"} message contains a graph of :term[Tool Calls]{canonical="Call"} where the connections (edges) are formed by :term[Variable References]{canonical="Variable Reference"} pointing to `Output Paths`. This allows an agent to define a complete, executable workflow as a single, declarative data structure.

  > Sidenote:
  >
  > - [010: Agent/Plan](./010_agent_plan.md)

## From Ephemeral Connections to Persistent Memory

:term[Variables]{canonical="Variable"} provide the mechanism for wiring data to tools within a single, atomic request. However, to build complex agents that execute tasks over multiple steps, a more persistent form of memory is required—a "scratchpad" where results can be stored and accessed across multiple, independent requests in an execution loop.

The next document, [009: Agent/State](./009_agent_state.md), describes the protocol for this persistent state management.
