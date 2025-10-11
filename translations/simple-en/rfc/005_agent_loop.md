# 005: Agent/Loop

> **Loop:** Think of a loop as a series of steps an agent takes to finish a big job. The agent keeps asking, "What should I do next?", does the action, and then uses the result to figure out its next question. It keeps going like this until the job is done and there are no more actions to take. — [Glossary](./000_glossary.md)

> Sidenote:
> - Requires:
>   - [001: Agent/Request](./001_agent_request.md)
>   - [002: Agent/Tool](./002_agent_tool.md)
>   - [004: Agent/Call](./004_agent_call.md)

This document explains the **execution loop**, which is how an agent can do tasks that have many steps. It's like a robot following a recipe. This process of figuring out what to do, using its tools, and learning from the results is what people usually mean when they talk about an "agent."

## The Execution Loop

> Sidenote:
> ```mermaid
> graph TD
>     Start((Start)) --> ContextAssembly(1. Gather Information)
>     ContextAssembly --> RequestInvocation(2. Ask "What's Next?")
>     RequestInvocation --> CallProcessing(3. Get Instructions)
>     CallProcessing --> HasCalls{Are there instructions?}
>     HasCalls -- No --> Termination((5. Finish))
>     HasCalls -- Yes --> HITL{Human Check}
>     HITL -- Approved --> Execution(4. Do the Task & Update)
>     Execution -- Results --> ContextAssembly
>     HITL -- Corrected --> ContextAssembly
>     classDef optional stroke-dasharray: 5, 5
>     class HITL optional
> ```

The execution loop is the main engine that lets an agent work on its own through multiple steps. Here’s how it works, step-by-step:

1.  **Gather Information:** First, the loop gathers everything it needs to know to get started. This includes what the user wants (the goal), what the situation looks like right now (`State`), and any other useful facts.
2.  **Ask "What's Next?":** With all the information ready, it asks the agent's "brain" (the `Request`) what to do next. It also shows the brain what tools it has available.
3.  **Get Instructions:** The brain sends back a plan, which is a list of zero or more actions (called `Call`s) to perform.
4.  **Do the Task & See What Happens:**
    - If the plan has actions in it, the loop performs them. This might mean using one of its tools or running some code.
    - The results of these actions (like a new piece of information or a change in the world) are added to the pile of information for the next round.
5.  **Finish:** If the plan from the brain has zero actions, it means the agent thinks the job is complete. The loop stops.

## Human-in-the-Loop (HITL)

Imagine you're building a complex Lego set with a robot helper. The robot figures out the next step is to add a red brick, but before it does, it shows you its plan. That's what "Human-in-the-Loop" means.

Because the loop first decides *what* to do and then *does* it, it creates a perfect moment for a person to step in:

- **Approval:** Before the agent does anything, it can show you the planned actions. You can just say "Okay, go ahead."
- **Correction:** You might notice a mistake and say, "No, don't use the red brick, use the blue one instead." You can change the plan before it happens.

This is super important for safety and for working together with the agent. When you give feedback, the agent can use it to learn and make better plans in the future.

## The Role of Data in the Loop

The loop provides the step-by-step process, but what makes it powerful is the *information* that flows through it. Think of it like a detective solving a case. With each clue (data), the detective's understanding of the case (context) grows, allowing them to figure out the next step.

Similarly, the agent uses the data from each cycle to remember what it has done, learn from the results, and carry out a complex, multi-step plan.

The next document, [006: Agent/Data](./006_agent_data.md), explains how all this information is managed.
