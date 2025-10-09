# 005: Agent/Loop

> **Loop:** A sequence of `Request`s aimed at achieving a goal. The agent continues to invoke `Request`s, process the resulting `Call`s, and feed the output back into the context of the next `Request` until no more `Call`s are generated. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [001: Agent/Request](./001_agent_request.md)
>   - [002: Agent/Tool](./002_agent_tool.md)
>   - [004: Agent/Call](./004_agent_call.md)

This document describes the **Loop Protocol**, which enables an agent to perform multi-step tasks by iteratively calling the `Request` protocol.

## The Execution Loop

The Agent Loop is the primary mechanism for autonomous, multi-step execution. It operates as follows:

1.  **Context Assembly:** The loop begins by assembling the initial context, which may include the user's goal, the current `State`, and other relevant information.
2.  **Request Invocation:** It invokes the **[001: Agent/Request](./001_agent_request.md)** protocol with the current context and a schema of available `Tools`.
3.  **Call Processing:** The `Request` returns a `solution` containing an array of zero or more **[004: Agent/Call](./004_agent_call.md)s**.
4.  **Execution & Feedback:**
    - If the `solution` contains `Call`s, the loop executes them. For `Explicit` `Call`s, this involves invoking the corresponding `Activity` code.
    - The results of these `Call`s are then added back into the context for the next iteration.
5.  **Termination:** If the `solution` contains zero `Call`s, the agent has determined its goal is complete, and the loop terminates.

## Human-in-the-Loop (HITL)

A key feature of the Agent Loop is its natural support for human oversight. Because the loop separates the generation of `Call`s from their execution, it creates an opportunity for a user to intervene:

- **Approval:** Before executing the `Call`s, the system can present them to a user for approval.
- **Correction:** The user can modify the parameters of a `Call` or even replace it with a different one.

This capability is critical for safety and for collaborative tasks where the agent acts as an assistant. User adjustments and feedback can be leveraged by the **[012: Agent/Plan](./012_agent_plan.md)**, allowing the agent to refine its strategy based on human input.
