# 005: Agent/Loop

> [!DEFINITION] [Loop](./000_glossary.md)
> Think of a loop as a series of steps an agent takes to reach a goal. The agent keeps asking what to do next (`Request`), gets back a list of actions (`Call`s), performs them, and adds the results to its memory. It repeats this process until it decides the job is done.

> Sidenote:
> - Needs these concepts:
>   - [001: Agent/Request](./001_agent_request.md)
>   - [002: Agent/Tool](./002_agent_tool.md)
>   - [004: Agent/Call](./004_agent_call.md)

This document explains the **execution loop**, which is how an agent can handle complex jobs that require more than one step. It repeatedly makes a [Request](./001_agent_request.md) to figure out what to do next. This cycle of gathering information, using tools, and learning from the results is what we mean when we talk about an "agent."

## The Execution Loop

> Sidenote:
> ```mermaid
> graph TD
>     Start((Start)) --> SchemaComposition(1. Figure out possibilities)
>     SchemaComposition --> ContextAssembly(2. Gather information)
>     ContextAssembly --> RequestInvocation(3. Ask what to do)
>     RequestInvocation --> CallProcessing(4. Get a plan)
>     CallProcessing --> HasCalls{Are there actions?}
>     HasCalls -- Yes --> HITL{Human Checkpoint}
>     HITL -- Approved --> Execution(5. Act & Learn)
>     Execution -- Results --> ContextAssembly
>     HITL -- Changed --> ContextAssembly
>     HasCalls -- No --> Termination(6. Know when to stop)
>     Termination --> OutputGeneration(7. Give the final answer)
>     OutputGeneration --> End((End))
>     classDef optional stroke-dasharray: 5, 5
>     class HITL optional
> ```

The execution loop is the engine that lets an agent work on its own through multiple steps. Here’s how it works, step by step:

1.  **1. Figure Out the Possibilities:** The loop starts by looking at the rules for the final answer you want (the _output schema_). It then combines those rules with the rules for all the [Tools](./002_agent_tool.md) it can use. This creates one big set of instructions for the agent's brain, telling it everything it's allowed to do.
2.  **2. Gather Information:** Next, the loop gathers all the information it needs to start, like the main goal you gave it and any other important details. This is its starting memory, or "context."
3.  **3. Ask What to Do:** With its memory and list of possible actions ready, it makes a [Request](./001_agent_request.md), asking its brain, "Given everything I know, what should I do next?"
4.  **4. Get a Plan:** The brain responds with a `solution` that contains a list of proposed actions, called [Calls](./004_agent_call.md). It's very important to know that at this point, these are just *ideas* for actions—nothing has actually happened yet.
5.  **5. Act and Learn:**
    - If the list of `Calls` has actions in it, the loop performs them. For most `Calls`, this means running a piece of code connected to a tool.
    - The results from these actions (what worked, what didn't, what information was found) are added back to the agent's memory for the next cycle.
6.  **6. Know When to Stop:** If the brain returns a `solution` with an empty list of `Calls`, it means the agent believes its job is finished. The loop then stops.
7.  **7. Give the Final Answer:** Once the loop stops, the final answer is in the `output` part of the `solution`. This answer follows the rules you set up in the very first step. This allows the agent to not just do things, but to give you a clean, final product. For example, if an agent was asked to analyze data, it might use several `Calls` to process it, and then use the `output` to give you a single, tidy report.

## Human-in-the-Loop (HITL)

A really useful feature of this loop is that it naturally creates a pause for human review. Because the agent first *proposes* actions (`Calls`) and then *executes* them in a separate step, we have a perfect moment for a person to step in:

- **Approval:** Before running the actions, the system can show them to you and ask, "Is this okay?" The loop can be set up to wait for your permission before continuing.
- **Correction:** You can also change the proposed actions, like tweaking a number or even swapping one action for a completely different one.

These specific human-in-the-loop features aren't built into the core system itself. Instead, the design creates that gap between planning and acting, giving developers the freedom to add any kind of checkpoint they need, from a simple "yes/no" button to a more complex review system.

This is essential for making sure the agent acts safely and is helpful for tasks where it works alongside a person. The agent can even use your feedback to update its own [Plan](./010_agent_plan.md) and get smarter about how it reaches the goal.

## The Role of Data in the Loop

The loop provides the structure for how the agent behaves, but the information flowing through it is what makes it powerful. The memory, tool inputs, and action results are what allow the agent to keep track of what it's doing, learn as it goes, and complete complex, multi-step jobs.

The next document, [006: Agent/Data](./006_agent_data.md), explains how all this information is managed.