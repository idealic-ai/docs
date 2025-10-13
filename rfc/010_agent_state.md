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

The `State` object acts as the source of truth for the current status of a request and is the key to resilience and resumption. Because it captures the complete context of a workflow at a specific point in time, it allows a process to be paused and resumed. When a new iteration begins, the `State` from the previous tick provides the LLM with a clear understanding of where the process left off, ensuring subsequent operations can seamlessly continue the work.

## Multi-Step Tools

The primary function of the `State` message is to allow different `Tools` to share information within a single, continuous process. It enables stateful operations by providing a shared canvas where `Tools` can store their results.

This is achieved through a simple read/write mechanism: one `Tool` can write its output to the `State` object, and another `Tool` can then read that data as its input in a subsequent step. This allows for the creation of toolchains, where the output of one capability directly informs the input of the next, all without losing context between executions.

## Inputs

The primary mechanism for reading from the `State` is through **Variable References**. This system allows any parameter in a `Tool Call` to be a special string that references a variable from the context, rather than the value itself. The reference is a string that follows a specific syntax. This approach is highly efficient as it avoids duplicating large data objects, saving space and cost.

The reference is a simple string syntax prefixed with a dagger (`†`). The syntax is `†<kind>.<path>`, where `<kind>` is the type of `Data` message (e.g., `state`, `input`) and `<path>` is the dot-notation path to the desired value.

For example, a `Tool Call` for fetching a user profile might look like this:

```json
{
  "_tool": "fetchUserProfile",
  "userId": "†state.currentUser.id"
}
```

At execution time, the system resolves this reference, fetching the value from `state.currentUser.id` and injecting it as the `userId` parameter before the tool is executed.

## Outputs

The primary mechanism for writing to the `State` is the `_outputPath` meta-property on a `Call`. This string tells the execution engine where to place a tool's result.

> Sidenote:
>
> - [004: Agent/Call](./004_agent_call.md)

The `schema` of the `State` message can be used to define a set of expected properties. This creates a powerful feedback loop for the LLM: when the `schema` requires certain properties, the LLM is guided to invoke `Tools` whose `_outputPath` matches those properties, ensuring the `Tool` sequence is structurally correct.

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

- **Prescribed (Hard-Coded):** Alternatively, the schema can use restrictive JSON Schema keywords like `const`, `enum`, or `oneOf` to lock down the tool's behavior. A `const` value forces a single, specific path, while `enum` can force the LLM to choose from a limited set of predefined options. This is crucial for creating stable workflows and robust error-handling patterns where the possible outcomes are known in advance.

  _Tool Schema (Prescribing a choice of success/failure paths):_

  ```json
  {
    "_outputPath": {
      "enum": ["†state.success", "†state.failure"]
    }
  }
  ```

This flexibility is a key element of the **Plan** system, allowing a workflow designer to choose between giving the agent creative freedom and enforcing a rigid, reliable data flow.

## Planning vs. Execution

The combination of writing to state via `_outputPath` and reading from it with **Variable References** is the core mechanism that enables the separation of planning from execution. It allows an agent to construct a complete data-flow graph—a chain of `Tool Calls` linked by references—_before_ any tool is run.

This graph of references can be validated, reused, and even simulated, making it fully compatible with the latent execution of LLMs. The flexibility of this system comes from the ability to control both inputs and outputs at the schema level. A workflow designer can leave the **`Variable References`** (inputs) and the **`_outputPath`** (outputs) dynamic for the LLM to decide, or prescribe them to enforce a rigid, reliable data flow.

> [!TIP]
> Creating `Tool Calls` that are connected to each other via the `State` is the act of planning. This system provides the technical groundwork for this process: a persistent `State` acts as the canvas, `Variable References` and `_outputPath` act as the wires, and the agent **Loop** provides the iterative engine. Together, these components allow an agent to construct a complete data-flow graph, which is the essence of a **Plan**.
>
> > Sidenote:
> >
> > - [005: Agent/Loop](./005_agent_loop.md)
> > - [012: Agent/Plan](./012_agent_plan.md)

## Composition

- **Call:** The `Call` system is intimately linked with `State` through the `_outputPath` meta-property. This property transforms a `Tool Call`, which could otherwise be a stateless, pure function, into a state-modifying operation. By specifying an `_outputPath`, a `Call` directs the engine to write its result into the `State` object, making it the primary mechanism for an agent to record the outcome of its actions. This interaction allows a sequence of `Calls` to build upon each other, creating a chain of cause and effect that is recorded in the `State`.

  > Sidenote:
  >
  > - [004: Agent/Call](./004_agent_call.md)

- **Data:** The `State` message is fundamentally a specialized application of the `Data` message system, using a `Data` message with `kind: "state"`. It leverages the core features of `Data` messages to establish a persistent memory for the agent. The `schema` property is used to define the expected structure of this memory, providing a blueprint that guides the LLM's actions. Furthermore, the merging capabilities of the `Data` system are critical, allowing for the `State` to be updated incrementally through a series of patches, with the system resolving them into a single, coherent view.

  > Sidenote:
  >
  > - [006: Agent/Data](./006_agent_data.md)

- **Imports:** The `Imports` system is the primary mechanism for providing a `State` object to a `Tool` running in an isolated context, such as a **Module**. When a `Call` is delegated, the `_imports` property can specify that the `state` should be included in the module's "clean room" environment. This allows encapsulated tools to read from and interact with the main workflow's state in a controlled and explicit manner.

  > Sidenote:
  >
  > - [008: Agent/Imports](./008_agent_imports.md)

- **Plan:** While `State` enables simple tool sequences, its full power is realized when used as the backbone of the `Plan` system. In a `Plan`, a workflow is represented as a directed acyclic graph (DAG) where `Tool Calls` are the nodes. The `State` object provides the connections—the edges—between these nodes. It allows one node to write into a variable and others to read from it, enabling complex patterns like logical forks (if-else) or parallel fan-outs.

  > Sidenote:
  >
  > - [012: Agent/Plan](./012_agent_plan.md)

- **Instancing:** The `State` message is fully compatible with the `Instancing` system. When a request processes multiple `Instances`, each one maintains its own isolated `State` object, identified by a unique `_instance` key. `Variable References` (e.g., `†state.currentUser.id`) are automatically and transparently routed to the correct `State` object corresponding to the `Instance` the `Tool Call` is targeting. This allows a single, generic `Plan` to be executed across many different states in parallel with guaranteed data isolation.

  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md)

## From Single State to Parallel Execution

The `State` message provides the mechanism for managing the memory of a single, coherent workflow. However, to build truly scalable systems, agents must be able to apply the same workflow to many different pieces of data simultaneously. This requires a way to manage multiple, independent states in parallel within a single request, with operations like `Variable References` and `_outputPath` being correctly routed to the appropriate state.

The next document, **[011: Agent/Instancing](./011_agent_instancing.md)**, describes the system that makes this parallel execution possible.
