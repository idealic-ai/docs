# 005: Agent/Loop

> [!DEFINITION] :term[Loop]
> A sequence of :term[Request]s aimed at achieving a goal. The agent continues to invoke :term[Request]s, process the resulting :term[Call]s, and feed the output back into the context of the next :term[Request] until no more :term[Call]s are generated.

> Sidenote:
>
> - Requires:
>   - :term[001: Agent/Request]{href="./001_agent_request.md"}
>   - :term[002: Agent/Tool]{href="./002_agent_tool.md"}
>   - :term[004: Agent/Call]{href="./004_agent_call.md"}

This document describes the :term[Execution Loop], which enables an agent to perform multi-step tasks by iteratively making :term[Requests]. This iterative process of context assembly, tool use, and feedback is what is commonly meant when referring to an "agent."

## The Execution Loop

The execution loop is the primary mechanism for autonomous, multi-step execution. It operates via a nested loop structure:

::::columns
:::column

1.  **Outer Loop (Request Generation):** The agent's lifecycle is a sequence of :term[Request]s. It starts with an initial context and enters a loop.
2.  **Request & Call Streaming:** Inside the loop, it invokes a single :term[Request]. The :term[Request] streams back :term[Calls] as they are generated, which are collected into a pending queue.
3.  **Inner Loop (Call Orchestration):** For each :term[Request], an inner orchestration loop is responsible for executing its associated :term[Calls]. This process is highly concurrent:
    - The orchestrator continuously scans the queue of pending :term[Calls] to find all that are currently unblocked (i.e., their dependencies are met).
    - All unblocked :term[Calls] can be presented for confirmation and then executed in parallel. This concurrency is safe because the agent's :term[State] is immutable: once a value is written to a specific path via `_outputPath`, it cannot be overwritten. This allows the model to propose mutually exclusive :term[Calls]—such as different branches of a conditional—that write to the same output path. The first of these calls to execute successfully sets the value, and any others that were alternatives will not be executed because their preconditions (the path being empty) are no longer met. This ensures a deterministic outcome without conflicts.
    - As each :term[Call] completes, its output updates the shared context, potentially unblocking other pending :term[Calls].
    - This reactive, parallel execution continues until the stream for the current :term[Request] is closed and all of its pending :term[Calls] have been drained. This model significantly reduces latency, as the agent can start working on multiple independent steps simultaneously, even before the full plan is known.
4.  **Termination Check:** Once the inner loop completes, the agent inspects the final :term[Solution] from the parent :term[Request]. If it contains no :term[Calls], the agent's goal is considered complete, and the outer loop terminates.
5.  **Continuation:** If the :term[Solution] did contain :term[Calls], the agent loops back to step 2, invoking a new :term[Request] with the enriched context that now contains the results of the previous execution step.
6.  **Output Generation:** Upon termination, the `output` field of the final :term[Solution] contains the result, conforming to the user-defined output schema.

:::
:::column

```mermaid
graph TD
    Start[/"Agent(...)"/] --> Request["Agent.Request(...)"];
    Request -- streams calls --> FindUnblocked{"Find all unblocked calls"};

    FindUnblocked -- "some found" --> ConfirmAndLaunch["Confirm & launch all (parallel)"];
    ConfirmAndLaunch -- "any completes" --> UpdateContext["Update context with result"];
    UpdateContext --> FindUnblocked;

    FindUnblocked -- "none found" --> CheckStreamAndPending{"Stream active or calls pending?"};
    CheckStreamAndPending -- Yes --> Wait["Wait for new calls or completions"];
    Wait --> FindUnblocked;

    CheckStreamAndPending -- No --> CheckTermination{"Request had calls?"};
    CheckTermination -- Yes --> Request;
    CheckTermination -- No --> End[\"Return context/solution"\];
```

:::
::::

## :term[Human-in-the-Loop]{canonical="HITL"}

The new :term[Execution Loop] provides robust support for human oversight by placing the confirmation step just before execution. This ensures the user is only prompted to act on calls that are ready to run:

- **Approval:** Before an unblocked :term[Call] is executed, the system can present it to a user for approval. This is an efficient approach, as it prevents the user from having to review and confirm calls that might be blocked by dependencies and never run.
- **Correction:** The user can modify the parameters of a :term[Call] or even replace it with a different one

It is important to note that these specific :term[HITL] mechanisms are not part of the core protocol. The architecture simply provides the necessary separation between proposing actions and executing them, giving developers the flexibility to implement any kind of intervention, from a simple manual approval to a complex, automated system with timeouts.

This capability is critical for safety and for collaborative tasks where the agent acts as an assistant. User adjustments and feedback can be leveraged by the :term[Plan], allowing the agent to refine its strategy based on human input.

## The Role of Data in the Loop

The :term[Execution Loop] provides a dynamic structure for agent behavior, but its power comes from the data flowing within it. This is managed by the :term[Data message type], which is explored in :term[006: Agent/Data]{href="./006_agent_data.md"}.

```

```
