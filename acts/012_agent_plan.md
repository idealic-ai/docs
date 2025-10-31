# 012: Agent/Plan

> [!DEFINITION] [Plan](./000_glossary.md)
> A context message carrying a data-flow graph of :term[Tool Calls]{canonical="Tool Call"} that represents an agent's strategy. It is passed between steps to enable iterative execution and adaptation.

> Sidenote:
>
> - Requires:
>   - :term[004: Agent/Call]{href="./004_agent_call.md"}
>   - :term[010: Agent/Loop]{href="./010_agent_loop.md"}
>   - :term[007: Agent/Variables]{href="./007_agent_variables.md"}
>   - :term[009: Agent/State]{href="./009_agent_state.md"}
>   - :term[013: Agent/Instancing]{href="./013_agent_instancing.md"}

The :term[Plan]{canonical="Plan"} message is the primary mechanism for enabling stateful, iterative execution. While the agent system is capable of handling simple, one-shot requests, providing a `Plan` message in the context signals a shift to a persistent workflow. Its presence instructs the :term[Execution Loop]{canonical="Execution Loop"} to retain the generated plan and the resulting :term[State]{canonical="State"} across multiple turns.

This persistence is the cornerstone of building adaptive agents. When the LLM receives the current :term[Plan]{canonical="Plan"} alongside the live :term[State]{canonical="State"} object, it gains complete situational awareness of its position in the workflow. This allows it to intelligently follow the existing plan, generate new :term[Tool Calls]{canonical="Tool Call"} to expand it, or discard it entirely and replan in response to unexpected outcomes. Without a `Plan` message, a request is treated as a stateless operation, and no state or strategy is carried over to subsequent steps.

## How a Plan is Formed

The connections in the graph are not created with explicit pointers, but through a simple and powerful data-flow convention using the :term[State]{canonical="State"} object.

- **Nodes (:term[Tool Calls]{canonical="Tool Call"}):** Each step in the workflow is a :term[Tool Call]{canonical="Tool Call"}, representing an action to be performed.
- **Edges (:term[State]{canonical="State"} Object):** The connections between steps are created by writing to and reading from the :term[State]{canonical="State"} object. One :term[Tool]{canonical="Tool"} writes its output to a specific path in the :term[State]{canonical="State"} using the :term[Output Path]{canonical="Output Path"} meta-property. A subsequent :term[Tool]{canonical="Tool"} can then use that output as an input by referencing the same path with a **:term[Variable Reference]{canonical="Variable Reference"}**.

  > Sidenote:
  >
  > - [008: Agent/Output](./008_agent_output.md)

This establishes a clear dependency: the second :term[Tool Call]{canonical="Tool Call"} cannot execute until the first has completed and populated the :term[State]{canonical="State"}.

For example, a :term[Plan]{canonical="Plan"} to fetch a user's profile and then summarize it would consist of two :term[Tool Calls]{canonical="Tool Call"}:

:::div{.limited-width}

```json
[
  {
    "_tool": "fetchUserProfile",
    "userName": "Alice",
    "_outputPath": "†state.userProfileData"
  },
  {
    "_tool": "summarizeProfile",
    "profile": "†state.userProfileData",
    "_outputPath": "†state.profileSummary"
  }
]
```

> Sidenote:
>
> ```mermaid
> graph TD
>     state_var{{"state.user.profile"}}
>
>     Call1["fetchUserProfile"]
>     Call2["summarizeProfile"]
>
>     Call1 -- writes to --> state_var
>     state_var -- read by --> Call2
> ```

:::

Here, the `summarizeProfile` call depends on the output of `fetchUserProfile`, creating a two-step plan. This relationship can be visualized as a simple graph.

## The Plan's Content: A Data-Flow Graph

The content of a :term[Plan]{canonical="Plan"} message is a data-flow graph. This structure is used to represent the agent's strategy as a sequence of interconnected :term[Tool Calls]{canonical="Tool Call"}. By representing the workflow as a graph, the system can clearly define the dependencies between steps, where the output of one :term[Tool Call]{canonical="Tool Call"} becomes the input for another. This graph-based format provides a clear, machine-readable structure that the agent's :term[Execution Loop]{canonical="Execution Loop"} can interpret and execute.

> Sidenote:
>
> A :term[Plan]{canonical="Plan"} is not limited to linear sequences. It can represent complex workflows with conditional logic, where the path of execution depends on the outcome of a previous step:
>
> ```mermaid
> graph TD
>     A[Get Weather] --> B{Is it Sunny?};
>     B -- state.sunny --> C[Find a Park];
>     B -- state.notSunny --> D[Find a Movie];
>     C -- state.suggestion --> E[Present Suggestion];
>     D -- state.suggestion --> E[Present Suggestion];
> ```

The underlying graph structure is not limited to just defining executable workflows. An agent can be prompted to generate a graph of :term[Tool Calls]{canonical="Tool Call"} that represents something else entirely—a visualization of a social network, a GitHub Actions workflow, or a database schema.

It is crucial to distinguish these outputs from a :term[Plan]{canonical="Plan"}. While they use the same graph structure, they are not "plans" in the architectural sense unless they are passed into a subsequent :term[Request]{canonical="Request"} as a :term[Plan]{canonical="Plan"} context message with the intent of being executed. This distinction prevents confusion between generating a representation of an existing system and creating an executable strategy.

While the content of a :term[Plan]{canonical="Plan"} can be a powerful tool for brainstorming, discussion, and "thinking out loud," its primary application in this system is to define executable workflows. For this purpose, we use a specific type of graph called a **Directed Acyclic Graph (DAG)**, where each node is a :term[Tool Call]{canonical="Tool Call"}.

A DAG has a few key properties that make it perfect for execution:

- **Graph:** The "graph" is the entire content of the :term[Plan]{canonical="Plan"} message—the collection of all :term[Tool Calls]{canonical="Tool Call"} (the nodes) and the data dependencies that connect them (the edges).
- **Directed:** The connections are one-way, determined by the flow of data. A step that creates data must come _before_ a step that uses it.
- **Acyclic:** The workflow cannot have circular dependencies, ensuring it has a clear beginning and end. This is a critical safety feature to prevent the LLM from generating a workflow with an infinite loop. The system validates that a :term[Plan]{canonical="Plan"} is acyclic before execution.

> Sidenote:
>
> To implement iterative logic like a "for loop," a pattern of nested, delegated execution is used. An outer :term[Plan]{canonical="Plan"} manages the loop's state (e.g., an iteration counter), and for each iteration, it invokes a sub-request via a :term[Delegate]{canonical="Delegate"}. This sub-request contains its own separate, acyclic :term[Plan]{canonical="Plan"} that performs the logic for a single iteration. This ensures that loops are created explicitly and safely.

## Planning vs. Execution Strategies

The most powerful feature of this architecture is the relationship between the declarative `Plan` and its execution. This is controlled by a `mode` property within the `Plan` message itself, allowing for different strategies.

The LLM always acts as the planner. The `mode` determines whether the LLM should also act as an immediate executor for latent tasks.

### Eager Execution (Default)

By default, the `Plan` operates in `eager` mode. In this mode, **planning is execution**. There is no round-trip between generating a plan and acting on it. When the LLM generates a `solution`, it is performing a single, continuous act of reasoning and execution for any latent steps it can resolve.

- If a task requires a latent tool (e.g., summarizing text), the LLM will generate the `call` and its `_output` in the same thought process.
- If a task requires an explicit :term[Activity]{canonical="Activity"}, the LLM generates the `call`, which is then immediately dispatched to the activity runner by the :term[Execution Loop]{canonical="Execution Loop"} orchestrator.

This mode is optimized for speed and autonomy. The key trade-off, specifically in the **first iteration** of a plan, is that branching logic is resolved immediately. A tool's schema may allow for a branching `_outputPath` (e.g., `†state.sunny || †state.rainy`), but in `eager` mode, the LLM's continuous reasoning process collapses this potential into a single, concrete path within the `solution` it generates.

Therefore, the `solution` in the first turn of an eager execution will never contain a latent call with an unresolved branching expression. The choice is made as part of the initial planning/execution step. This is what makes the execution linear at that point in the process. In subsequent iterations, the LLM has access to the state produced by previous steps and can make more complex branching decisions based on that existing state.

### Lazy Execution (Deliberate Planning)

A user can opt into a more deliberate workflow by setting the `mode` to `lazy`. This strategy enforces a strict separation of planning from execution. In this mode, the LLM is instructed to act as a pure planner.

- It will **not** perform latent execution.
- Its sole objective is to generate a complete, declarative data-flow graph of :term[Tool Calls]{canonical="Tool Call"}. If a tool's schema allows for a branching `_outputPath`, the LLM will preserve this expression in the plan, deferring the choice to the execution phase.

The result is a pure data structure representing the entire strategy, which is not executed. This creates a critical checkpoint where the plan can be:

- **Validated:** The system can check the graph for circular dependencies or other structural errors.
- **Simulated:** A "dry run" can be performed to anticipate the workflow's behavior.
- **Presented for Approval:** The :term[Plan]{canonical="Plan"} can be shown to a human for review, modification, or approval before execution (:term[HITL]{canonical="HITL (Human-in-the-Loop)"}).

Execution is handled by the :term[Execution Loop]{canonical="Execution Loop"}, which interprets the :term[Plan]{canonical="Plan"} message and runs the :term[Tool Calls]{canonical="Tool Call"} in the correct order based on their dependencies, populating the :term[State]{canonical="State"} object as it proceeds.

## The Plan as an Evolving Strategy

A :term[Plan]{canonical="Plan"} is not static; it is a living strategy that can be adapted at each step of the execution loop. A key distinction is that a `Plan` is not just any output from the LLM. When an agent first generates a set of :term[Tool Calls]{canonical="Tool Call"}, this is simply a proposed sequence of actions. It becomes a true :term[Plan]{canonical="Plan"} only when it is passed as a context message into the _next_ request in the loop.

This cycle transforms a one-off output into an ongoing strategy:

- The **:term[context]{canonical="context"}** for a request contains the :term[State]{canonical="State"} object and the :term[Plan]{canonical="Plan"} message from the previous step.
- The **:term[solution]{canonical="Solution"}** generated by the LLM contains a new set of :term[Tool Calls]{canonical="Tool Call"} that becomes the **new :term[Plan]{canonical="Plan"}** for the next step.

This iterative process allows the agent to be both proactive and reactive. It can follow the existing :term[Plan]{canonical="Plan"}, but it can also modify it in response to the results of the previous step. For example, if a :term[Tool Call]{canonical="Tool Call"} fails, the agent can generate a new :term[Plan]{canonical="Plan"} that includes error-handling steps. This makes the system resilient and adaptable.

:::::details{title="Example: Planning one step ahead"}

This example demonstrates how a `Plan` provides a structural "happy path" that guides the agent, preventing it from deviating from a standard procedure even when other plausible actions are available.

**Scenario:** A customer support agent needs to process a refund. The standard procedure, triggered by the user's request, is to first check the billing history for context and then issue the refund.

**1. Initial Request**

The loop starts with the customer's request. Based on this `input`, the LLM formulates a standard two-step `Plan` to handle the refund. This represents the ideal, most common workflow.

::::columns
:::column{title="Context & Schema for Request"}

```json
// Agent.Request(config, schema, context)
{
  "schema": {
    "type": "object",
    "properties": {
      "calls": { "type": "array" },
      "output": {
        "type": "object",
        "nullable": true,
        "properties": {
          "confirmationId": { "type": "string" },
          "message": { "type": "string" }
        }
      }
    }
  },
  "context": [
    {
      "type": "input",
      "request": "I'd like a refund for my last order.",
      "customerId": "cust_123",
      "amount": 50.0
    }
  ]
}
```

:::
:::column{title="LLM's `solution`"}

```json
{
  "calls": [
    {
      "_tool": "checkBillingHistory",
      "customerId": "†input.customerId"
    },
    {
      "_tool": "issueRefund",
      "customerId": "†input.customerId",
      "amount": "†input.amount"
    }
  ],
  "output": null
}
```

:::
::::

**2. Next Request in the Loop**

The :term[Execution Loop]{canonical="Execution Loop"} runs the `checkBillingHistory` call and populates the :term[State]{canonical="State"}. The history reveals some complexity (e.g., a previous chargeback). At this point, an unguided agent might plausibly choose to use another available tool, `escalateToSupervisor`.

However, the `Plan` message in the context provides the necessary structure. By composing what it _knows_ (the complex `State`) with what it _should do_ (the `Plan`), the LLM understands its precise position in the workflow and sticks to the "happy path."

::::columns
:::column{title="Context"}

```json
[
  {
    "type": "state",
    "billingHistory": {
      "orders": 5,
      "lastChargeback": "2025-09-10"
    }
  },
  {
    "type": "plan",
    "plan": [
      {
        "_tool": "checkBillingHistory",
        "customerId": "†input.customerId"
      },
      {
        "_tool": "issueRefund",
        "customerId": "†input.customerId",
        "amount": "†input.amount"
      }
    ]
  }
]
```

:::
:::column{title="LLM's `solution`"}

```json
{
  "calls": [
    {
      "_tool": "issueRefund",
      "customerId": "†input.customerId",
      "amount": "†input.amount"
    }
  ],
  "output": {
    "confirmationId": "refund_xyz789",
    "message": "The refund has been processed successfully."
  }
}
```

:::
::::

The `Plan` ensures procedural consistency, preventing a premature escalation and keeping the agent on its intended track.

:::::

:::::details{title="Example: Adjusting a Plan"}

This example demonstrates how an agent can modify an existing :term[Plan]{canonical="Plan"} in response to new information by choosing a different tool.

::::columns
:::column{title="Context"}

The agent is given an existing "happy path" `Plan` and a new `Input` from the user that introduces a new constraint.

```ts
[
  { type: 'tool', tool: Tool.bookFlight },
  { type: 'tool', tool: Tool.bookHotel },
  { type: 'tool', tool: Tool.findPetFriendlyHotel },
  {
    type: 'plan',
    plan: [
      {
        _tool: 'bookFlight',
        destination: '†input.destination',
      },
      {
        _tool: 'bookHotel',
        destination: '†input.destination',
      },
    ],
  },
  {
    type: 'input',
    destination: 'Berlin',
    instruction: "Actually, I'll be traveling with my dog.",
  },
];
```

:::
:::column{title="LLM's `solution`"}

The LLM recognizes that the original plan is no longer suitable. It discards the old plan and generates a new one, replacing `bookHotel` with a more specialized tool.

```json
{
  "calls": [
    {
      "_tool": "bookFlight",
      "destination": "†input.destination"
    },
    {
      "_tool": "findPetFriendlyHotel",
      "destination": "†input.destination"
    }
  ],
  "output": null
}
```

:::
::::

The agent doesn't just change a parameter; it fundamentally alters its strategy by selecting a more appropriate tool (`findPetFriendlyHotel`) based on the new requirements. This new set of `Tool Calls` becomes the `Plan` for the next step in the :term[Execution Loop]{canonical="Execution Loop"}.

:::::

:::::details{title="Example: Handling Failure"}

This example demonstrates how an agent can deviate from a "happy path" :term[Plan]{canonical="Plan"} when it encounters an unexpected failure. The process is shown in two stages: the initial "happy path" plan, and the replanning that occurs after a tool fails.

**1. The Initial Plan**

The agent is given a set of tools and a user input. It generates an optimistic, two-step "happy path" plan that does not account for failure.

::::columns
:::column{title="Initial Context"}

```ts
Agent.Request(config, {
  schema: {
    type: 'object',
    properties: {
      calls: { type: 'array' },
      output: {
        type: 'object',
        nullable: true,
        properties: {
          status: {
            type: 'string',
            enum: ['Success', 'Failed'],
          },
        },
      },
    },
  },
  context: [
    { type: 'tool', tool: 'Tool.processPayment' },
    { type: 'tool', tool: 'Tool.confirmOrder' },
    { type: 'tool', tool: 'Tool.reportFailure' },
    { type: 'input', amount: 50.0 },
  ],
});
```

:::
:::column{title="Initial Solution"}

```json
{
  "calls": [
    {
      "_tool": "processPayment",
      "amount": "†input.amount",
      "_outputPath": "†state.receipt || †state.error"
    },
    {
      "_tool": "confirmOrder",
      "receipt": "†state.receipt"
    }
  ],
  "output": null
}
```

:::
::::

**2. Failure and Replanning**

The :term[Execution Loop]{canonical="Execution Loop"} attempts to run `processPayment`, but the tool fails. The engine populates `†state.error`. In the next iteration, the LLM sees this new error state alongside the original (now obsolete) plan and generates a new solution to handle the failure.

::::columns
:::column{title="Context for Next Request"}

```json
[
  {
    "type": "state",
    "error": { "code": "card_declined", "message": "Your card was declined." }
  },
  // The original, now-obsolete plan is still in the context
  {
    "type": "plan",
    "plan": [
      { "_tool": "processPayment", "_outputPath": "†state.receipt || †state.error" },
      { "_tool": "confirmOrder", "receipt": "†state.receipt" }
    ]
  }
]
```

:::
:::column{title="New Solution (Replanned)"}

```json
{
  "calls": [
    {
      "_tool": "reportFailure",
      "error": "†state.error"
    }
  ],
  "output": { "status": "Failed" }
}
```

:::
::::

The agent recognized the `error` in the `State`, ignored the obsolete "happy path" `Plan`, and generated a new, single-step plan to `reportFailure`. This demonstrates the agent's ability to reactively handle unexpected outcomes.

:::::

:::::details{title="Example: Schema-Guided Planning"}

This example demonstrates how providing a `schema` for the :term[State]{canonical="State"} object acts as a blueprint, guiding the LLM to generate a structurally correct :term[Plan]{canonical="Plan"}.

::::columns
:::column{title="Context with State Schema"}

The caller provides an `Input` and a `State` message that contains only a `schema`. This schema defines the intended data flow by specifying the "variables" the plan should use.

```json
[
  { "type": "tool", "tool": "Tool.detectLanguage" },
  { "type": "tool", "tool": "Tool.isEnglish" },
  { "type": "tool", "tool": "Tool.translateText" },
  {
    "type": "input",
    "text": "Bonjour le monde"
  },
  {
    "type": "state",
    "schema": {
      "type": "object",
      "properties": {
        "language": { "type": "string" },
        "isEnglish": { "type": "boolean" },
        "translatedText": { "type": "string" }
      }
    }
  }
]
```

:::
:::column{title="LLM's `solution`"}

The LLM uses the `State` schema as a guide to construct a valid plan, correctly wiring the :term[Output Path]{canonical="Output Path"} of one tool to the input of the next.

```json
{
  "calls": [
    {
      "_tool": "detectLanguage",
      "text": "†input.text",
      // The LLM knows to use this path from the schema.
      "_outputPath": "†state.language"
    },
    {
      "_tool": "isEnglish",
      // It correctly references the output of the previous step.
      "language": "†state.language",
      "_outputPath": "†state.isEnglish"
    },
    {
      "_tool": "translateText",
      "text": "†input.text",
      "isEnglish": "†state.isEnglish",
      "_outputPath": "†state.translatedText"
    }
  ],
  "output": null
}
```

:::
::::

By providing the `schema`, the caller gives the LLM a clear blueprint for the data flow. The LLM doesn't have to guess the variable names or the sequence; it simply populates the pre-defined slots, resulting in a more reliable and predictable `Plan`.

:::::

This iterative cycle of planning and execution is the core of a :term[Process]{href="./203_idea_process.md"}. It is is a self-contained snapshot of a workflow, capturing the :term[Tools]{canonical="Tool"} available, the live :term[State]{canonical="State"}, and the :term[Plan]{canonical="Plan"} itself.

## From Single Plan to Reusable Workflows

A :term[Plan]{canonical="Plan"} message defines a sequence of actions for a specific task. To make these workflows truly powerful, we need a way to encapsulate them into reusable components that can be called from other :term[Plans]{canonical="Plan"}.

The protocol for this parallel execution is described in :term[013: Agent/Instancing]{href="./013_agent_instancing.md"}.
