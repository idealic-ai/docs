# 012: Agent/Delegate

> [!DEFINITION] [Delegate](./000_glossary.md)
> A protocol for isolating execution context. Invoked by a `Call`'s `_delegate` property, it executes an `Activity` or a new `Request` in a "clean room" environment, with the `_scopes` property providing controlled access to the parent context.

> Sidenote:
>
> - Requires:
>   - [004: Agent/Call](./004_agent_call.md)
> - Complemented by:
>   - [013: Agent/Scopes](./013_agent_scopes.md)

While previous documents have established how individual `Tools` are defined and executed, the **Delegate Protocol** addresses the critical challenge of scaling and composing these capabilities. It provides a powerful mechanism for executing `Tools` in isolated "clean room" environments, preventing context bleeding and enabling true reusability. By delegating a `Call` to an external delegate—either another `Request` definition or an `Activity` in a sub-request—the system can build complex agentic behaviors from self-contained, independently developed components.

## The Problem: Monolithic Tools and Context Bleeding

As agent capabilities grow, defining all `Tools` within a single, monolithic context becomes untenable.

1.  **Large Schemas**: LLMs have practical limits on the complexity of schemas they can handle in a single request. Combining numerous complex `Tools` can exceed these limits, preventing the LLM from correctly processing the available options.
2.  **Context Bleeding**: When all `Tools` operate in the same context, the LLM can be influenced by irrelevant information, leading to incorrect `Tool` selection or parameter filling.
3.  **Lack of Reusability**: A `Tool` defined for one agent is not easily portable to another without bringing its entire context with it.

The Delegate Protocol solves these problems by introducing **Delegate Scope**, a way to delegate a `Call` to an external, isolated execution environment.

## The `_delegate` Property

Delegate Scope is signaled by the `_delegate` property within a `Tool`'s schema. This property instructs the system to treat the `Call` not as an inline operation, but as a request to an external delegate.

The `_delegate` property is a `string` and can be used in two ways:

- **Reference a saved `Request`**: The string can be a path or URL to a JSON file that defines a self-contained `Request`—a JSON object containing `context` and `schema` properties. This allows a `Tool` to delegate its execution to a completely separate set of instructions.

  > Sidenote:
  >
  > A saved, reusable [001: Agent/Request](./001_agent_request.md) is the most common form of an `Idea`. The Delegate protocol is the primary mechanism for composing these `Ideas` into more complex systems. See [101: Concept/Idea](./101_concept_idea.md) for details.

- **Create an anonymous delegate**: A string literal `'anonymous'` signals an anonymous delegate. This is used to create an isolated execution environment for a `Tool Call` (whether latent or explicit) without needing an intermediate JSON file. It automatically scopes a new, empty context for the `Call`.

## Execution in a Clean Room

A delegate provides a "clean room" for execution. Instead of running inside the parent agent's bustling context, the `Call` is processed in a new, isolated sub-request. The context for this sub-request is carefully constructed, not inherited.

This is where the [Scopes Protocol](./013_agent_scopes.md) becomes critical. The `_scopes` property on the `Tool` schema acts as a bridge, explicitly declaring which pieces of the parent context should be "imported" into the delegate's clean room. This gives the parent agent precise control over what the delegate can see, preventing context bleeding and enabling true encapsulation.

> Sidenote:
>
> - [013: Agent/Scopes](./013_agent_scopes.md)

## Handling Large Schemas

The Delegate protocol also provides a solution for managing `Tools` with very large or complex output schemas. Instead of including a massive `_output` schema in the main request—potentially crowding out other tools—a `Tool` can be defined with only its `input` parameters and a `_delegate` pointer.

The LLM can plan the `Call` with just the input, and the complex output will be generated within the delegate's isolated sub-request. This allows an agent to reason about a sequence of complex operations without needing to "see" the entire, detailed schema for every step in a single context window. The LLM trusts that the delegate will produce the correct output, which it will receive and use in subsequent steps.

## Delegate Resolution Strategies

A `Tool` becomes a `Delegate` simply by including the `_delegate` property in its schema. This signals that the `Call` should be delegated. The key question is _when_ this delegation is resolved. The system supports two strategies, allowing a trade-off between strict safety and dynamic flexibility.

### 1. Execution-Time Resolution (Default)

The default and most flexible approach is to resolve the delegate at **execution time**, after an agent has already generated a `Call`.

This method enables a powerful paradigm that is not possible with traditional code: **the LLM acts as an intelligent glue layer.** An agent can generate a `Call` with parameters that don't perfectly match the delegate's expected `input` schema. At execution time, the system assembles the delegate's context and the caller's provided input, and the LLM in the sub-request is tasked with bridging the gap.

This is a significant advantage, as it allows delegates to be updated and evolve independently. Even if a delegate changes its input structure, calling agents won't immediately break. The LLM will attempt to adapt the old `Call` format to the new `input` schema, providing a level of resilience and loose coupling that is unique to this architecture.

The process is as follows:

1.  An agent generates a `Call` to the modular `Tool`.
2.  The executor sees the `_delegate` property and initiates the protocol.
3.  **Context Assembly**: The executor fetches the delegate definition file (if not anonymous) and assembles the base context. It then uses `_scopes` to append the caller's context.
4.  **Input Mapping**: The `params` from the `Call` are packaged into an `Input Message` and added to the context. This is where the LLM's "glue" capability comes into play, as it will use this input to fulfill the delegate's logic, even if the schemas don't align perfectly.
5.  **Execution**: A new, isolated `Request` is made with the combined context. The result is returned as the output of the original `Call`.

### 2. Upfront Resolution (Optional)

For scenarios requiring stricter guarantees, a delegate can be resolved **upfront**, before the initial `Request` is sent to the agent.

In this mode, the system pre-fetches the delegate `Request` definition and merges its `input` schema with the `Tool`'s parameter schema. This allows the agent's LLM to see the delegate's exact requirements from the start, ensuring that the generated `Call` is perfectly formed and type-safe. Crucially, this upfront merge can also include the delegate's `_output` schema, providing a strict contract for the expected result.

This approach provides the safety of traditional API contracts, where both the inputs and outputs are known and validated. It sacrifices the flexibility of execution-time resolution and is best used for critical, well-defined integrations where loose coupling is not a desired feature.

## Composition and Reusability: The Composer & Sound Designer

Delegates enable powerful composition by allowing `Request` definitions to act as standalone services that can be orchestrated by other agents. This creates a clear, dynamic hierarchy: high-level agents can focus on orchestration while delegating specialized tasks to low-level, reusable delegates.

Consider a workflow with two specialist delegates: a **`Composer`** and a **`Sound-Designer`**.

- The **`Sound-Designer`** is a low-level expert. It's a self-contained `Request` definition focused on the physics of sound, knowing how to operate synthesizers to produce specific audio data.

- The **`Composer`** is a mid-level specialist. Its primary job is to create a song. It uses its own inline tools to generate a melody and musical structure. To realize this vision, it then makes `Calls` to the `Sound-Designer` delegate to synthesize the actual sounds.

This two-layer hierarchy is a common pattern. However, the true power of delegates lies in their dynamic, task-driven composition.

Now, let's introduce a high-level **`Producer`** agent. The `Producer`'s goal is to create a finished record. Based on the specific task, the `Producer` can orchestrate its delegates in different ways:

> Sidenote:
>
> This arrangement allows for flexible orchestration. A high-level `Producer` can delegate to a `Composer`, who in turn uses a `Sound-Designer`. However, the `Producer` can also bypass the `Composer` and interact with the `Sound-Designer` directly for specific tasks.
>
> ```mermaid
> graph TD
>     Producer --> Composer
>     Producer --> SoundDesigner(Sound-Designer)
>     Composer --> SoundDesigner(Sound-Designer)
> ```

- **Hierarchical Orchestration**: For creating a song, the `Producer` might make a single `Call` to the `Composer` delegate. The `Producer` provides high-level direction ("I need a sad ballad"), and the `Composer` executes its entire internal workflow, including its own nested `Calls` to the `Sound-Designer`. The `Producer` doesn't need to know about the `Sound-Designer`'s existence in this case.

- **Parallel Orchestration**: If the `Producer` also needs specific sound effects for the record (like foley or an ambient soundscape), it can make `Calls` directly to the `Sound-Designer` delegate for those tasks, in parallel with its `Call` to the `Composer`.

This demonstrates the key principle: the composition is not fixed within the tools themselves. The `Producer` can choose to treat the `Composer` as a black box or to interact with its constituent parts (`Sound-Designer`) directly, all depending on the needs of the moment. This flexibility allows the same set of expert delegates to be combined in various arrangements, creating a deeply composable and emergent system.

## From Delegates to Memory

Delegates provide powerful encapsulation for discrete capabilities, but complex, multi-step workflows require a memory. An agent needs a way to maintain a persistent state between `Calls` to track progress, learn from previous outcomes, and execute long-term plans. This is the bridge from isolated actions to coherent, stateful execution.

The next document, [009: Agent/State](./009_agent_state.md), describes the protocol for managing this persistent state.
