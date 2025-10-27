# 008: Agent/Output

> [!DEFINITION] [Output Path](./000_glossary.md)
> The `_outputPath` meta-property on a :term[Call]{canonical="Call"} that specifies where to persist a tool's result. It's a string that tells the execution engine where to place the result, making it available for subsequent steps.

> Sidenote:
>
> - Requires:
>   - :term[004: Agent/Call]{href="./004_agent_call.md"}
>   - :term[007: Agent/Variables]{href="./007_agent_variables.md"}
> - Enables:
>   - :term[010: Agent/Loop]{href="./010_agent_loop.md"}

The agent system features two forms of output: the intermediate results of :term[Tool Calls]{canonical="Tool Call"} written to the context, and the :term[Final Output]{canonical="Final Output"} of an entire iterative process.

## Writing to Context with :term[Output Path]{canonical="Output Path"}

While any :term[Data Message]{canonical="Data Message" href="./005_agent_data.md"} can serve as a scratchpad for a workflow, the :term[Output Path]{canonical="Output Path"} meta-property on a :term[Call]{canonical="Call"} is the primary mechanism for writing to it. When a :term[Tool Call]{canonical="Tool Call"} with this property is executed, the system appends its result to the context as a new message.

> Sidenote:
>
> While any :term[Data Message]{canonical="Data Message"} can be a target, the most common use case is writing to a :term[State Message]{canonical="State Message" href="./009_agent_state.md"} to persist information across multiple steps of a process.

This new message is a standard :term[Data Message]{canonical="Data Message"}, but it includes two additional pieces of metadata that are hidden from the LLM:

- **`_call`**: The original :term[Tool Call]{canonical="Tool Call"} that generated this output.
- **`_date`**: An ISO timestamp of when the output was written.

This provides a complete, auditable trail of how the context was mutated, which is invaluable for debugging and tracing an agent's reasoning.

### Defining the Output Path

The :term[Output Path]{canonical="Output Path"} can be defined in two ways, allowing for a spectrum of control over a tool's behavior.

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
    "const": "†data.user.summary"
  }
}
```

:::
::::

### Last-Write-Wins Resolution

Crucially, these output messages are **appended**, not merged. This design decision simplifies the system and aligns with the natural flow of a process where newer information supersedes older information.

When a :term[Variable Reference]{canonical="Variable Reference" href="./007_agent_variables.md"} like `†data.user.name` needs to be resolved, the engine searches the context messages in **reverse chronological order**. It inspects each message from the newest to the oldest, and the first one that contains the requested path (`user.name`) provides the value. This "last-write-wins" strategy ensures that the most recent value is always used, without complex merging logic.

:::::details{title="Example: Appending and Resolving"}

**1. Initial State**

The context starts with an initial `data` message.

```json
[
  {
    "type": "data",
    "data": { "user": { "name": "Alex", "status": "active" } }
  }
]
```

**2. Tool Call Execution**

A tool is called to update the user's status.

```json
// Call being executed
{
  "_tool": "updateUserStatus",
  "newStatus": "inactive",
  "_outputPath": "†data.user.status"
}
```

**3. Context After Execution**

The engine appends a new message containing the output, which includes metadata about the call that produced it.

```json
[
  // Original data message
  {
    "type": "data",
    "data": { "user": { "name": "Alex", "status": "active" } }
  },
  // Appended output message from the call
  {
    "type": "data",
    "data": { "user": { "status": "inactive" } },
    "_call": {
      "_tool": "updateUserStatus",
      "newStatus": "inactive",
      "_outputPath": "†data.user.status"
    },
    "_date": "2025-10-26T12:00:00Z"
  }
]
```

**4. Variable Resolution**

- To resolve `†data.user.status`, the engine checks the last message first. It finds `user.status` and returns `"inactive"`.
- To resolve `†data.user.name`, the engine checks the last message, doesn't find `user.name`, then checks the previous message. It finds it there and returns `"Alex"`.

:::::

The power of combining :term[Variable References]{canonical="Variable Reference"} with :term[Output Paths]{canonical="Output Path"} comes from their ability to define operations on data that is not yet available. For instance, a :term[Tool Call]{canonical="Call"} can be defined to operate on a value from an :term[Input]{canonical="Input"} message, even if that specific input has not been provided. This allows for the creation of reusable, parameterized workflows.

This concept extends to chaining :term[Tool Calls]{canonical="Call"} together. A :term[Tool Call]{canonical="Call"} can be created with a :term[Variable Reference]{canonical="Variable Reference"} that points to the :term[Output Path]{canonical="Output Path"} of a _previous_ call in the same sequence. This creates a multi-step data flow where the output of one tool becomes the input for the next.

## Interactions with other systems

- **:term[Data Message]{canonical="Data Message"}:** The `_outputPath` is the primary mechanism for creating and updating :term[Data Messages]{canonical="Data Message"} within a workflow. It transforms a stateless :term[Tool Call]{canonical="Tool Call"} into a stateful operation by persisting its result to the context, making it available for subsequent steps.

  > Sidenote:
  >
  > - :term[005: Agent/Data]{href="./005_agent_data.md"}

- **:term[State Message]{canonical="State Message"}:** While any :term[Data Message]{canonical="Data Message"} can be a target, the most common use case is writing to a :term[State Message]{canonical="State Message"}. This makes the :term[State]{canonical="State"} object the "scratchpad" for a workflow, allowing different tools to share information and build upon each other's results across multiple ticks of an :term[Execution Loop]{canonical="Execution Loop"}.

  > Sidenote:
  >
  > - :term[009: Agent/State]{href="./009_agent_state.md"}

- **:term[Variable Reference]{canonical="Variable Reference"}:** The :term[Output Path]{canonical="Output Path"} is the direct counterpart to the :term[Variable Reference]{canonical="Variable Reference"}. The :term[Output Path]{canonical="Output Path"} writes data to the context, and the :term[Variable Reference]{canonical="Variable Reference"} reads it. Together, they form a complete, declarative circuit for data flow, connecting the output of one tool to the input of another.

  > Sidenote:
  >
  > - :term[007: Agent/Variables]{href="./007_agent_variables.md"}

- **:term[Expressions]{canonical="Expression"}:** Expressions introduce logic directly into the data flow wiring. By using `||` and `&&` in an :term[Output Path]{canonical="Output Path"}, a :term[Tool Call]{canonical="Tool Call"} can declare conditional outcomes or fan-out its result to multiple destinations. This moves the system away from rigid, hard-coded data pipelines toward a flexible structure that adapts to runtime conditions.

  > Sidenote:
  >
  > - :term[011: Agent/Expressions]{href="./011_agent_expressions.md"}

- **:term[Plan]{canonical="Plan"}:** In the context of a :term[Plan]{canonical="Plan"}, :term[Output Paths]{canonical="Output Path"} act as the "wires" that connect the different :term[Tool Calls]{canonical="Tool Call"} (the "nodes") into a complete data-flow graph. This allows an agent to define and execute an entire multi-step strategy as a single, declarative object.

  > Sidenote:
  >
  > - :term[012: Agent/Plan]{href="./012_agent_plan.md"}

## From Ephemeral Outputs to Persistent State

The :term[Output Path]{canonical="Output Path"} mechanism provides a robust way to manage the flow of data between individual :term[Tool Calls]{canonical="Tool Call"}, and it can target any :term[Data Message]{canonical="Data Message"}. However, to build complex, multi-step agents that can reason and adapt over time, a specialized form of memory is required—a message type specifically designed to persist information across multiple, independent requests.

The next document, :term[009: Agent/State]{href="./009_agent_state.md"}, describes the protocol for this persistent memory.
