# 005: Agent/Loop

> **Loop:** Imagine an AI trying to complete a task, like building a model airplane. A Loop is the series of steps it takes. The AI makes a `Request` (reads the next instruction), performs a `Call` (glues a piece on), and then adds the result (the piece is now attached) to its memory. It keeps repeating this cycle until there are no more instructions left.

> Sidenote:
> - This idea builds on:
>   - [001: Agent/Request](./001_agent_request.md)
>   - [002: Agent/Tool](./002_agent_tool.md)
>   - [004: Agent/Call](./004_agent_call.md)

This document explains the **execution loop**. Think of it as the AI's internal process for tackling big jobs one step at a time. This cycle of thinking, acting, and learning from the results is what makes an AI an "agent."

## How the Loop Works

> Sidenote:
> ```mermaid
> graph TD
>     Start((Start)) --> ContextAssembly(1. Gather Info)
>     ContextAssembly --> RequestInvocation(2. Decide What to Do)
>     RequestInvocation --> CallProcessing(3. Create Plan)
>     CallProcessing --> HasCalls{Is there a plan?}
>     HasCalls -- No --> Termination((5. Finish))
>     HasCalls -- Yes --> HITL{Ask Human?}
>     HITL -- Approved --> Execution(4. Take Action & Learn)
>     Execution -- Results --> ContextAssembly
>     HITL -- Corrected --> ContextAssembly
>     classDef optional stroke-dasharray: 5, 5
>     class HITL optional
> ```

The execution loop is how the agent works on its own to complete a task. It follows these steps over and over:

1.  **Gather Information:** The loop starts by looking at everything it knows—what you asked it to do, what it has already done (`State`), and any other important facts. It's like a chef reading a recipe and checking the ingredients before starting.
2.  **Decide What to Do:** With all that information, it makes a [Request](./001_agent_request.md) to figure out the next best action. It looks at the `Tools` it has available to make its decision.
3.  **Create a Plan:** The `Request` comes back with a `solution`, which is a list of one or more proposed actions called `Calls`. This is important: at this point, the AI has only *decided* what to do, it hasn't done it yet.
4.  **Take Action & Get Feedback:**
    - If the `solution` has `Calls` in it, the loop runs them. This means actually using the `Tool` to perform the action.
    - The results of these actions (what happened) are then added back to its memory for the next cycle.
5.  **Finish:** If the `solution` contains zero `Calls`, it means the AI thinks the job is done, and the loop stops.

## Human-in-the-Loop (You can jump in!)

A really cool feature of this loop is that it has a built-in pause button for a human to step in. Because the agent first decides what to do (Step 3) and then does it (Step 4), there’s a moment in between for you to check its work.

- **Approval:** The system can show you the planned `Calls` and wait for you to say “okay” before it does anything. This pause gives you a chance to prevent mistakes.
- **Correction:** You can also change the plan. If you don't like a `Call` the agent suggested, you can edit it or replace it with a better one.

How this works isn't strictly defined by the system. It just creates the space for it. This means developers can build all sorts of safety checks, from a simple “Are you sure?” button to more complex review systems.

This is super important for safety and for working together with the AI. When you make a correction, the agent can use that feedback to learn and make better plans in the future.

## The Role of Data in the Loop

The loop provides the step-by-step process, but the agent's real power comes from the information flowing through it. The memory (`State`), your instructions, and the results of its actions are what allow the agent to understand what's going on, learn, and carry out complex plans.

The next document, [006: Agent/Data](./006_agent_data.md), explains how all this information is managed.
