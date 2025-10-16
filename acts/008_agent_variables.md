# 008: Agent/Variables

> [!DEFINITION] [Variable Reference](./000_glossary.md)
> A string with a special syntax (`†<kind>.<path>`) used in a `Tool Call`'s parameters to dynamically reference a value from the agent's context.

**Variables** build upon the [Data](./006_agent_data.md) system to enable dynamic data flows. They make structured information interactive through two primary functions:

- **Reading:** Referencing a value that exists within the agent's context (such as an `Input` or `State` message) without needing to copy the data directly into a `Tool Call`'s parameters.
- **Writing:** Persisting a result to a `Data` object (most commonly `State`) so its value can be accessed in subsequent ticks of the agent's loop.

## Reading from Context

A parameter in a `Tool Call` can hold a **Variable Reference**—a special string that points to a value elsewhere in the context—instead of the value itself. This prevents the inefficient and error-prone process of having an LLM copy large data objects from its context into the parameters of a `Tool Call`. Using a reference is faster, cheaper, and more reliable, as it eliminates the risk of the LLM altering the data during reproduction.

The reference is a simple string syntax prefixed with a dagger (`†`). The syntax is `†<kind>.<path>`, where `<kind>` is the type of `Data` message (e.g., `state`, `input`) and `<path>` is the dot-notation path to the desired value.

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

To persist a tool's result, a `Call` can include the `_outputPath` meta-property. This string—an **Output Path**—tells the execution engine where to place the result, making it available for subsequent steps or future loop iterations. A common convention is to use a path that targets the `State` object (e.g., `†state.user.summary`).

> Sidenote:
>
> - [004: Agent/Call](./004_agent_call.md)

The `_outputPath` can be defined in two ways:

- **Dynamic (LLM-Decided):** The `Tool`'s schema for `_outputPath` can be flexible (e.g., `{ "type": "string" }`), giving the LLM the freedom to generate the path.
- **Prescribed (Hard-Coded):** Alternatively, the schema can use restrictive JSON Schema keywords like `const` or `enum` to lock down the tool's behavior to a specific path or a small set of options.

## Declarative Connection

The power of `Variables` comes from their ability to define operations on data that is not yet available. For instance, a `Tool Call` can be defined to operate on a value from an `Input` message, even if that specific input has not been provided. This allows for the creation of reusable, parameterized workflows.

This concept extends to chaining `Tool Calls` together. A `Tool Call` can be created with a `Variable Reference` that points to the `_outputPath` of a _previous_ call in the same sequence. This creates a multi-step data flow where the output of one tool becomes the input for the next.

This declarative wiring becomes especially powerful when `Output Paths` are used to define potential outcomes.

- **Alternative Paths (Branching):** Using `||` to separate paths in an `_outputPath` (e.g., `"†state.success || †state.failure"`) allows a `Tool Call` to declare its possible outcomes before it runs. When the tool is executed, its internal logic determines which path to write the result to, effectively encapsulating the outcome decision within the tool that does the work.
- **Concurrent Paths (Fan-out):** Using `&&` (e.g., `"†state.user.profile.summary && †state.audit.log.summary"`) directs the engine to perform a fan-out, writing the same output to multiple paths at once.

This ability to define a full sequence of operations—including complex branching and fan-outs—on data that doesn't yet exist is what enables declarative planning. It allows the LLM to generate a complete data-flow graph (`Plan`) that can be reviewed, approved, and reused before any code is executed. This powerful planning capability emerges from the way `Variables` compose with other core concepts:

> Sidenote:
>
> - [010: Agent/Plan](./010_agent_plan.md)

## Composition

- **Data:** Variables are the mechanism that makes `Data` messages interactive. `Variable References` read from `Data` messages (like `Input` or `State`), and `Output Paths` write back to them, creating a dynamic loop where data can be accessed and modified.

  > Sidenote:
  >
  > - [006: Agent/Data](./006_agent_data.md)

- **Input:** `Variable References` can target `Input` messages, allowing a workflow to be parameterized. This is essential for creating reproducible plans where the overall structure is defined, but the specific data it operates on is provided at runtime.

  > Sidenote:
  >
  > - [007: Agent/Input](./007_agent_input.md)

- **State:** The `State` object is the primary scratchpad for variables in multi-step workflows. It's the most common target for `Output Paths` because it persists between the ticks of an agent's execution loop, allowing one step to leave a result that a future step can read.

  > Sidenote:
  >
  > - [009: Agent/State](./009_agent_state.md)

- **Plan:** Variables are the fundamental technology that powers the `Plan` system. A `Plan` is a graph of `Tool Calls` where the connections (edges) are formed by `Variable References` pointing to `Output Paths`. This allows an agent to define a complete, executable workflow as a single, declarative data structure.

  > Sidenote:
  >
  > - [010: Agent/Plan](./010_agent_plan.md)

## From Ephemeral Connections to Persistent Memory

Variables provide the mechanism for wiring data to tools within a single, atomic request. However, to build complex agents that execute tasks over multiple steps, a more persistent form of memory is required—a "scratchpad" where results can be stored and accessed across multiple, independent requests in an execution loop.

The next document, **[009: Agent/State](./009_agent_state.md)**, describes the protocol for this persistent state management.
