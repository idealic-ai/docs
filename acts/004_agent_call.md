# 004: Agent/Call

> [!DEFINITION] [Call](./000_glossary.md)
> A concrete, executable instance of a :term[Tool]{canonical="Tool"}, with specific values for its `params`. It's an invocation-focused request for what _should be done_.

> Sidenote:
>
> - Requires:
>   - [002: Agent/Tool](./002_agent_tool.md)
> - Enables:
>   - [103: Concept/Ideator](./103_concept_ideator.md)
>   - [013: Agent/Scopes](./013_agent_scopes.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)
>   - [202: Idea/Vessel](./202_idea_vessel.md)
>   - [203: Idea/Process](./203_idea_process.md)
> - Extended by:
>   - [012: Agent/Delegate](./012_agent_delegate.md)

The :term[Tool]{canonical="Tool"} protocol establishes the foundational schema-driven interface that enables agents to understand structured capabilities. This document describes the **:term[Call]{canonical="Call"}** protocol, which builds upon :term[Tools]{canonical="Tool"} to define how execution happens.

A :term[Call]{canonical="Call"} is a concrete instance of a :term[Tool]{canonical="Tool"} with specific parameter values, ready for execution. Where :term[Tools]{canonical="Tool"} define _what can be done_, :term[Calls]{canonical="Call"} define _how it gets executed_.

> [!HEADSUP] Heads up
> A :term[Request]{href="./001_agent_request.md"} that results in a set of :term[Calls]{canonical="Call"} is a :term[Vessel]{href="./202_idea_vessel.md"}. A :term[Vessel]{canonical="Vessel"} represents a single, reactive moment of decision-making where an agent selects from available :term[Tools]{canonical="Tool"} to form a response.
>
> > Sidenote:
> >
> > - [001: Agent/Request](./001_agent_request.md)
> > - [202: Idea/Vessel](./202_idea_vessel.md)

## Composition and Context

A :term[Call]{canonical="Call"} by itself is a simple data structure. Its power comes from its composition with other protocols that manage its execution environment. These protocols are activated by special meta-properties (prefixed with `_`) within a :term[Tool]{canonical="Tool"}'s schema, allowing a single :term[Call]{canonical="Call"} object to trigger a variety of execution behaviors.

By giving these meta-properties clear semantic meaning, we enable the LLM to be an active participant in the composition. It can reason about the various permutations of these properties to construct complex and novel execution chains, moving beyond simple tool selection to dynamic workflow orchestration.

> [!TIP]
> The following section explains connections to other parts of the system that will be detailed later. There's no need to jump ahead, as we'll cover everything in a logical sequence. You can come back to this section later.

- **Explicit Execution (`_activity`)**: The most fundamental extension is connecting a :term[Call]{canonical="Call"} to a deterministic code function. The `_activity` property signals that the :term[Call]{canonical="Call"} should be executed by an :term[Activity]{canonical="Activity"} rather than by the LLM's latent reasoning.

  > Sidenote:
  >
  > - [003: Agent/Activity](./003_agent_activity.md).

- **Delegated Execution (`_delegate`)**: A :term[Call]{canonical="Call"} can be delegated to an external :term[Delegate]{canonical="Delegate"}. The `_delegate` property typically contains a reference to a saved :term[Request]{canonical="Request"} (often as a path to a JSON file), allowing that request to be invoked as a reusable tool. This provides an isolated "clean room" for execution, preventing context bleeding and enabling true encapsulation.

  > Sidenote:
  >
  > - [012: Agent/Delegate](./012_agent_delegate.md).

- **Context Bridging (`_scopes`)**: The :term[Scopes]{canonical="Scope"} protocol controls what context is available to a :term[Call]{canonical="Call"}. Its primary use is to focus an LLM's attention during a latent execution by specifying which parts of the parent context it should consider. This prevents context bleeding and leads to more reliable outputs. When used with a `_delegate`, its role becomes even more powerful: it strictly defines the _entire_ context for the delegate's isolated execution.

  > Sidenote:
  >
  > - [013: Agent/Scopes](./013_agent_scopes.md).

- **Stateful Execution (`_outputPath`)**: A :term[Call]{canonical="Call"} can be made stateful by instructing it where to write its output. The `_outputPath` property specifies a path within a persistent :term[State]{canonical="State"} where the result of the :term[Call]{canonical="Call"} should be stored. This allows for the creation of multi-step workflows where the output of one :term[Call]{canonical="Call"} can be used as the input for another.

  > Sidenote:
  >
  > - [009: Agent/State](./009_agent_state.md).

- **Instanced Execution (`_instance`)**: A :term[Call]{canonical="Call"} can be targeted to a specific :term[Instance]{canonical="Instance"} within a multi-instance request. The `_instance` property acts as a unique identifier, focusing all operations of that :term[Call]{canonical="Call"} (like reading inputs from and writing outputs to the :term[State]{canonical="State"}) on a particular context. This enables efficient, parallel processing of multiple states with the same set of tools.
  > Sidenote:
  >
  > - [011: Agent/Instancing](./011_agent_instancing.md).

## Call Execution Patterns

When an agent generates multiple :term[Calls]{canonical="Call"}, different execution strategies can be applied based on the application's needs:

```typescript
// Single Call execution
const result = await Tool(call);

// Execute all Calls, wait for all results
const results = await Tool.all(calls);

// Execute all Calls, return first success
const result = await Tool.any(calls);

// Execute all Calls, return first completion (success or failure)
const result = await Tool.race(calls);
```

These patterns enable:

- **Fine-Grained Control**: Process :term[Calls]{canonical="Call"} individually with custom logic between executions
- **Batch Processing**: Execute independent :term[Calls]{canonical="Call"} in parallel for maximum performance
- **Fail-Fast Strategies**: Stop on first success (`.any()`) or first completion (`.race()`)
- **All-or-Nothing Operations**: Ensure all :term[Calls]{canonical="Call"} succeed together (`.all()`), maintaining consistency when :term[Calls]{canonical="Call"} are logically grouped

## Orchestrating Calls in a Loop

While these patterns manage the execution of a single batch of :term[Call]{canonical="Call"}, agents often need to perform multi-step tasks where the output of one :term[Call]{canonical="Call"} informs the next. This is handled by a higher-level protocol that orchestrates `Requests` and :term[Call]{canonical="Call"} in a sequence.

The next document, :term[005: Agent/Loop]{href="./005_agent_loop.md"}, describes this execution loop in detail.
