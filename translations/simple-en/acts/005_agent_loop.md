# 005: Agent/How it Repeats Steps

> **Loop:** A series of steps an AI assistant takes to reach a goal. The assistant keeps asking what to do next, taking action, and adding the results to its memory until the job is done.

> Sidenote:
> - Requires:
>   - [001: Agent/Request](./001_agent_request.md)
>   - [002: Agent/Tool](./002_agent_tool.md)
>   - [004: Agent/Call](./004_agent_call.md)
>

This document explains the **execution loop**, which is how an AI assistant can handle big projects that require more than one step. Think of it as the AI's thought process: it gathers information, uses its tools, and learns from the results over and over again. This whole cycle is what we mean when we talk about an "agent."

## The Execution Loop

> Sidenote:
> ```mermaid
> graph TD
>     Start((Start)) --> ContextAssembly(1. Gather Info)
>     ContextAssembly --> RequestInvocation(2. Ask What's Next)
>     RequestInvocation --> CallProcessing(3. Get a Plan)
>     CallProcessing --> HasCalls{Are there steps in the plan?}
>     HasCalls -- No --> Termination((5. Finish))
>     HasCalls -- Yes --> HITL{Human Check}
>     HITL -- Approved --> Execution(4. Take Action & Learn)
>     Execution -- Results --> ContextAssembly
>     HITL -- Corrected --> ContextAssembly
>     classDef optional stroke-dasharray: 5, 5
>     class HITL optional
> ```
>

The loop is the engine that lets the assistant work on its own. It's like a repeating checklist:

1.  **Gather Info:** First, the assistant looks at everything it knows: what you asked it to do, what it has already done, and any other important facts.

2.  **Ask What's Next:** With all that information, it thinks, "Okay, what's the next logical step?" It looks at the tools it has and decides what action to propose.

3.  **Get a Plan:** The assistant comes up with a plan, which is a list of proposed actions called `Calls`. A key detail here is that these are just *ideas*—it hasn't actually done anything yet. It's like writing a to-do list before you start working.

4.  **Take Action & Learn:**
    - If the plan has actions on it, the assistant now performs them. For example, if the plan is to "send an email," this is the moment it actually sends it.
    - The results of these actions (like "email sent successfully") are added to its memory for the next cycle.

5.  **Know When to Stop:** If the assistant thinks and decides there are no more actions to take, it means the goal has been reached. The loop stops.

## Human-in-the-Loop (You're the Boss)

A really cool feature of this loop is that it naturally creates a pause for a human to step in. Because the assistant first *proposes* what it wants to do and then *waits* to do it, you get a chance to supervise.

-   **Approval:** The system can show you the assistant's plan before it acts. You can give it a thumbs-up to continue. It's like having a helpful intern who asks, "Is this what you want me to do next?" before they do it.

-   **Correction:** You can also change the plan. You might see a proposed action and say, "Don't do that, do this instead," or "Almost, but change this small detail."

This isn't a special add-on; it's built into the design. Having a gap between planning and acting gives programmers the freedom to add any kind of check, from a simple "Are you sure?" button to more complex safety systems.

This is super important for safety and for working together with the AI. When you make a correction, the AI can use that feedback to make better plans in the future.

## Why Information Matters in the Loop

The loop provides the steps, but the real power comes from the information that flows through it. The assistant's ability to remember what it has done, what the results were, and what the original goal is allows it to handle complex, multi-step projects without getting lost.

The next document, [006: Agent/Data](./006_agent_data.md), explains how the assistant keeps track of all this information.
