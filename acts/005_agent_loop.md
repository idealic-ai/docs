# 005: Agent/Loop

> [!DEFINITION] :term[Loop]
> A sequence of :term[Request]s aimed at achieving a goal. The agent continues to invoke :term[Request]s, process the resulting :term[Call]s, and feed the output back into the context of the next :term[Request] until no more :term[Call]s are generated.

> Sidenote:
>
> - Requires:
>   - :term[001: Agent/Request]{href="/001_agent_request.md"}
>   - :term[002: Agent/Tool]{href="/002_agent_tool.md"}
>   - :term[004: Agent/Call]{href="/004_agent_call.md"}

This document describes the :term[Execution Loop], which enables an agent to perform multi-step tasks by iteratively making :term[Requests]. This iterative process of context assembly, tool use, and feedback is what is commonly meant when referring to an "agent."

## The Execution Loop

> Sidenote:
>
> ```mermaid
> graph TD
>     Start((Start)) --> SchemaComposition(1. Schema Composition)
>     SchemaComposition --> ContextAssembly(2. Context Assembly)
>     ContextAssembly --> RequestInvocation(3. Request Invocation)
>     RequestInvocation --> CallProcessing(4. Call Processing)
>     CallProcessing --> HasCalls{Has Calls?}
>     HasCalls -- Yes --> HITL{Human-in-the-Loop}
>     HITL -- Approved --> Execution(5. Execution & Feedback)
>     Execution -- Results --> ContextAssembly
>     HITL -- Corrected --> ContextAssembly
>     HasCalls -- No --> Termination(6. Termination)
>     Termination --> OutputGeneration(7. Output Generation)
>     OutputGeneration --> End((End))
>     classDef optional stroke-dasharray: 5, 5
>     class HITL optional
> ```

The execution loop is the primary mechanism for autonomous, multi-step execution. It operates as follows:

1.  **Schema Composition:** The loop is configured with a user-defined _output schema_ for the final result. This is automatically combined with the schemas of available :term[Tools] to create a single schema for the :term[Request], as described in :term[Tool Schema Composition]{href="/002_agent_tool.md#composing-schemas-for-the-llm"}.
2.  **Context Assembly:** The loop begins by assembling the initial context, which may include the user's goal and other relevant information.
3.  **Request Invocation:** It invokes the :term[Request] with the current context and the composed schema from the previous step.
4.  **Call Processing:** The :term[Request] returns a :term[Solution] object containing an array of zero or more :term[Calls] in the `calls` property. Crucially, at this stage, these :term[Calls] are only proposed actions; they have not been executed yet.
5.  **Execution & Feedback:**
    - If the :term[Solution]'s `calls` array is not empty, the loop executes them. For :term[Explicit Calls], this involves invoking the corresponding :term[Activity] code.
    - The results of these :term[Calls] are then added back into the context for the next iteration.
6.  **Termination:** If the :term[Solution]'s `calls` array is empty, the agent has determined its goal is complete, and the loop terminates.
7.  **Output Generation:** Upon termination, the `output` field of the :term[Solution] contains the final result, conforming to the user-defined output schema. This mechanism allows an agent to not only perform actions but also to produce a structured, final response. The content of `output` can be a transformation or summary of the context accumulated during the loop. For instance, an agent tasked with data analysis could perform several steps of processing (each a :term[Call]) and then use the `output` field to return a final JSON report.

## :term[Human-in-the-Loop] (:term[HITL])

A key feature of the :term[Execution Loop] is its natural support for human oversight. Because the loop separates the generation of :term[Calls] from their execution, it creates an opportunity for a user to intervene:

- **Approval:** Before executing the :term[Calls], the system can present them to a user for approval. The execution engine can be configured with a confirmation step (e.g., a callback function) that acts as a breakpoint, pausing the loop until human input is received.
- **Correction:** The user can modify the parameters of a :term[Call] or even replace it with a different one

It is important to note that these specific :term[HITL] mechanisms are not part of the core protocol. The architecture simply provides the necessary separation between proposing actions and executing them, giving developers the flexibility to implement any kind of intervention, from a simple manual approval to a complex, automated system with timeouts.

This capability is critical for safety and for collaborative tasks where the agent acts as an assistant. User adjustments and feedback can be leveraged by the :term[Plan], allowing the agent to refine its strategy based on human input.

This capability is critical for safety and for collaborative tasks where the agent acts as an assistant. User adjustments and feedback can be leveraged by the :term[Plan], allowing the agent to refine its strategy based on human input.

## The Role of Data in the Loop

The :term[Execution Loop] provides a dynamic structure for agent behavior, but its power comes from the data flowing within it. This is managed by the :term[Data message type], which is explored in :term[006: Agent/Data]{href="./006_agent_data.md"}.
