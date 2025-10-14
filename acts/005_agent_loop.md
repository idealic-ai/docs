# 005: Agent/Loop

> **Loop:** A sequence of `Request`s aimed at achieving a goal. The agent continues to invoke `Request`s, process the resulting `Call`s, and feed the output back into the context of the next `Request` until no more `Call`s are generated. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [001: Agent/Request](./001_agent_request.md)
>   - [002: Agent/Tool](./002_agent_tool.md)
>   - [004: Agent/Call](./004_agent_call.md)

This document describes the **execution loop**, which enables an agent to perform multi-step tasks by iteratively making [001: Agent/Request](./001_agent_request.md)s. This iterative process of context assembly, tool use, and feedback is what is commonly meant when referring to an "agent."

## The Execution Loop

> Sidenote:
>
> ```mermaid
> graph TD
>     Start((Start)) --> ContextAssembly(1. Context Assembly)
>     ContextAssembly --> RequestInvocation(2. Request Invocation)
>     RequestInvocation --> CallProcessing(3. Call Processing)
>     CallProcessing --> HasCalls{Has Calls?}
>     HasCalls -- No --> Termination((5. Termination))
>     HasCalls -- Yes --> HITL{Human-in-the-Loop}
>     HITL -- Approved --> Execution(4. Execution & Feedback)
>     Execution -- Results --> ContextAssembly
>     HITL -- Corrected --> ContextAssembly
>     classDef optional stroke-dasharray: 5, 5
>     class HITL optional
> ```

The execution loop is the primary mechanism for autonomous, multi-step execution. It operates as follows:

1.  **Context Assembly:** The loop begins by assembling the initial context, which may include the user's goal, the current `State`, and other relevant information.
2.  **Request Invocation:** It invokes the [001: Agent/Request](./001_agent_request.md) with the current context and a schema of available `Tools`.
3.  **Call Processing:** The `Request` returns a `solution` containing an array of zero or more [004: Agent/Call](./004_agent_call.md)s. Crucially, at this stage, these `Calls` are only proposed actions; they have not been executed yet.
4.  **Execution & Feedback:**
    - If the `solution` contains `Call`s, the loop executes them. For `Explicit` `Call`s, this involves invoking the corresponding `Activity` code.
    - The results of these `Call`s are then added back into the context for the next iteration.
5.  **Termination:** If the `solution` contains zero `Call`s, the agent has determined its goal is complete, and the loop terminates.

## Human-in-the-Loop (HITL)

A key feature of the execution loop is its natural support for human oversight. Because the loop separates the generation of `Call`s from their execution, it creates an opportunity for a user to intervene:

- **Approval:** Before executing the `Call`s, the system can present them to a user for approval. The execution engine can be configured with a confirmation step (e.g., a callback function) that acts as a breakpoint, pausing the loop until human input is received.
- **Correction:** The user can modify the parameters of a `Call` or even replace it with a different one.

It is important to note that these specific HITL mechanisms are not part of the core protocol. The architecture simply provides the necessary separation between proposing actions and executing them, giving developers the flexibility to implement any kind of intervention, from a simple manual approval to a complex, automated system with timeouts.

This capability is critical for safety and for collaborative tasks where the agent acts as an assistant. User adjustments and feedback can be leveraged by the [012: Agent/Plan](./012_agent_plan.md), allowing the agent to refine its strategy based on human input.

## The Role of Data in the Loop

The execution loop provides a dynamic structure for agent behavior, but its power is realized through the data that flows within it. The state, inputs, and outputs managed during each cycle are what allow an agent to maintain context, learn, and execute complex, multi-step plans.

The next document, [006: Agent/Data](./006_agent_data.md), explores the protocols for managing this data.
