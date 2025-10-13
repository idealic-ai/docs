# 010: Agent/State

> **State Message:** A persistent `Data` message that represents the live, evolving memory of a workflow. It acts as a set of local variables, enabling multi-step, stateful operations. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [004: Agent/Call](./004_agent_call.md)
>   - [006: Agent/Data](./006_agent_data.md)
> - Enables:
>   - [012: Agent/Plan](./012_agent_plan.md)
> - Complemented by:
>   - [011: Agent/Instancing](./011_agent_instancing.md)

This document describes the **State message**, which provides a mechanism for managing persistent state within an agent's execution loop. The `State` message is a specialized application of the **Data** system, designed to create stateful, multi-step workflows. It functions as a container for the "local variables" of a process, allowing context to be maintained across a sequence of `Tool` executions.

The `State` object acts as the source of truth for the system regarding the current status of a request. By analyzing it, the system understands what has already been accomplished, allowing subsequent operations to pick up where the previous ones left off.

## Multi-Step Tools

The primary function of the `State` message is to allow different `Tools` to share information within a single, continuous process. It enables stateful operations by providing a shared canvas where `Tools` can store their results.

This is achieved through a simple read/write mechanism: one `Tool` can write its output to the `State` object, and another `Tool` can then read that data as its input in a subsequent step. This allows for the creation of toolchains, where the output of one capability directly informs the input of the next, all without losing context between executions.

## Schemas and Output Paths

The `State` message introduces a powerful mechanism for guiding the LLM's planning process. The `schema` of the `State` message can be used to define a set of expected properties, essentially creating a "shape" for the final state that the process must produce.

This works in concert with a new meta-property on the `Call` object: `_outputPath`.

> Sidenote:
>
> - [004: Agent/Call](./004_agent_call.md)

A `Tool` can declare its intent to write to the `State` by specifying an `_outputPath` in its `Call`. This path tells the execution engine where to place the `Tool`'s result within the `State` object. The `_outputPath` value is a string that can use special syntax to define complex data flows.

### Path Syntax

The `_outputPath` string can take several forms:

- **Regular Path:** A simple string pointing to a single location. The optional `†state.` prefix is a convention to clarify that the path targets the `State` object.
  ```json
  "†state.user.summary"
  ```
- **Alternative Paths (Branching):** Using `||` to separate paths indicates a set of potential outcomes. The output will be written to one of the specified locations, with the choice often being resolved by the execution engine or a subsequent reasoning step.
  ```json
  "†state.summary.text || †state.summary.json"
  ```
- **Concurrent Paths (Fan-out):** Using `&&` directs the engine to perform a fan-out, writing the same output to all specified paths concurrently.
  ```json
  "†state.user.profile.summary && †state.audit.log.summary"
  ```

### Specification Methods

The method for determining the `_outputPath` value is defined by its schema, a pattern similar to how the **Imports** system handles context:

- **Dynamic (LLM-Decided):** The `Tool`'s schema for `_outputPath` can be flexible (e.g., `{ "type": "string" }`), giving the LLM the freedom to generate any of the path syntaxes above. This allows the agent to dynamically connect tools and construct novel data flows on the fly.

  _Tool Schema:_

  ```json
  {
    "_outputPath": {
      "type": "string"
    }
  }
  ```

- **Prescribed (Hard-Coded):** Alternatively, the schema can use a `const` value to lock down the tool's behavior. This forces the `Tool` to always use a specific, predetermined path, which is crucial for creating stable, predictable workflows. This can be used to create robust error-handling patterns by prescribing different paths for success and failure outcomes.

  _Tool Schema (Prescribing success/failure paths):_

  ```json
  {
    "_outputPath": {
      "const": "†state.operation.result || †state.operation.error"
    }
  }
  ```

This flexibility is a key element of the **Plan** system, allowing a workflow designer to choose between giving the agent creative freedom and enforcing a rigid, reliable data flow.

This creates a powerful feedback loop for the LLM. When the `State` `schema` requires certain properties to be filled, the LLM is guided to invoke `Tools` whose `_outputPath` matches those properties. This ensures that the sequence of `Tools` is not only logical but also structurally correct.

## Variable References

For a true workflow to exist, tools must not only write to the `State` but also read from it. The system enables this by allowing any value within a `Tool Call`'s parameters to be a special string that references a variable from the context.

This is achieved with a simple string syntax prefixed with a dagger (`†`). The syntax is `†<kind>.<path>`, where `<kind>` is the type of `Data` message (e.g., `state`, `input`) and `<path>` is the dot-notation path to the desired value.

For example, a `Tool Call` for fetching a user profile might look like this:

```json
{
  "_tool": "fetchUserProfile",
  "userId": "†state.currentUser.id"
}
```

At execution time, the system resolves this reference, fetching the value from `state.currentUser.id` and injecting it as the `userId` parameter before the tool is executed.

This mechanism is what allows an LLM to wire tools together, using the output of one tool (saved to state via `_outputPath`) as the input for the next. It completes the full read-process-write cycle, enabling tools to interact with the `State` and with each other. While the primary use case is direct references, the syntax is designed to be extensible.

## Resuming Execution

The `State` object is also the key to resilience and resumption. Because it captures the complete context of a workflow at a specific point in time, it allows a process to be paused and resumed. When a new iteration begins, the `State` from the previous tick provides the LLM with a clear understanding of where the process left off, what has been accomplished, and what remains to be done.

## Composition

- **Call:** The `Call` system is intimately linked with `State` through the `_outputPath` meta-property. This property transforms a `Tool Call`, which could otherwise be a stateless, pure function, into a state-modifying operation. By specifying an `_outputPath`, a `Call` directs the engine to write its result into the `State` object, making it the primary mechanism for an agent to record the outcome of its actions. This interaction allows a sequence of `Calls` to build upon each other, creating a chain of cause and effect that is recorded in the `State`.

  > Sidenote:
  >
  > - [004: Agent/Call](./004_agent_call.md)

- **Data:** The `State` message is fundamentally a specialized application of the `Data` message system, using a `Data` message with `kind: "state"`. It leverages the core features of `Data` messages to establish a persistent memory for the agent. The `schema` property is used to define the expected structure of this memory, providing a blueprint that guides the LLM's actions. Furthermore, the merging capabilities of the `Data` system are critical, allowing for the `State` to be updated incrementally through a series of patches, with the system resolving them into a single, coherent view.

  > Sidenote:
  >
  > - [006: Agent/Data](./006_agent_data.md)

- **Imports:** While not a direct dependency, the `State` message's `_outputPath` mechanism is conceptually parallel to the `Imports` system. Both use a schema to define whether a value is determined dynamically by the LLM or prescribed with a `const` value, providing a consistent pattern for managing data flow and agent autonomy.

  > Sidenote:
  >
  > - [008: Agent/Imports](./008_agent_imports.md)

- **Plan:** While `State` enables simple tool sequences, its full power is realized when used as the backbone of the `Plan` system. In a `Plan`, a workflow is represented as a directed acyclic graph (DAG) where `Tool Calls` are the nodes. The `State` object provides the connections—the edges—between these nodes. It allows one node to write into a variable and others to read from it, enabling complex patterns like logical forks (if-else) or parallel fan-outs.

  > Sidenote:
  >
  > - [012: Agent/Plan](./012_agent_plan.md)

## Parallel States

The `State` message provides the mechanism for managing the memory of a single, coherent workflow. However, to build truly scalable systems, agents must be able to apply the same workflow to many different pieces of data simultaneously. This requires a way to manage multiple, independent states in parallel within a single request.

The next document, **[011: Agent/Instancing](./011_agent_instancing.md)**, describes how to achieve this parallel execution.
