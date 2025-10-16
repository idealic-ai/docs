# 005: Agent/Loop

> [!DEFINITION] [Loop](./000_glossary.md)
> A series of steps an AI takes to reach a goal. It keeps asking "what's next?", taking an action, and then using the result of that action to figure out the _next_ "what's next?" until the job is done.

> Sidenote:
>
> - Requires:
>   - [001: Agent/Request](./001_agent_request.md)
>   - [002: Agent/Tool](./002_agent_tool.md)
>   - [004: Agent/Call](./004_agent_call.md)

This document explains the **execution loop**, which is the process that lets an AI agent handle big jobs that take multiple steps. Think of it as the agent's thought process: it gathers information, decides on an action, performs it, and then learns from the result to decide what to do next. This repeating cycle is what people usually mean when they talk about an "agent."

## The Execution Loop

> Sidenote:
>
> ```mermaid
> graph TD
>     Start((Start)) --> ContextAssembly(1. Gather Info)
>     ContextAssembly --> RequestInvocation(2. Ask 'What's Next?')
>     RequestInvocation --> CallProcessing(3. Get a Plan)
>     CallProcessing --> HasCalls{Are there Actions?}
>     HasCalls -- No --> Termination((5. Finish the Job))
>     HasCalls -- Yes --> HITL{Human Checkpoint}
>     HITL -- Approved --> Execution(4. Act & Learn)
>     Execution -- Results --> ContextAssembly
>     HITL -- Changed --> ContextAssembly
>     classDef optional stroke-dasharray: 5, 5
>     class HITL optional
> ```

The loop is how an agent works on its own to complete a task. It’s like a simple 'think-act-learn' cycle that repeats.

Here’s how it works, step-by-step:

1.  **Gathering Info:** The loop starts by looking at everything it needs to know: the user's main goal, what has already been done (the current `State`), and any other useful facts.
2.  **Asking "What's Next?":** With all that information, it makes a `Request`, asking the core AI brain, "Given everything I know and the tools I have, what should I do next?"
3.  **Getting a Plan:** The AI brain responds with a `solution` that contains a list of one or more actions, called `Call`s. This is super important: at this point, these are just _proposed_ actions, like a to-do list. Nothing has actually happened yet.
4.  **Acting & Learning:**
    - If the plan has actions (`Call`s) in it, the loop carries them out. For example, if a `Call` is to use a specific software tool, the loop runs the code for that tool.
    - The results of these actions (like a new piece of information or a file that was created) are then added to the pool of information for the next cycle.
5.  **Finishing the Job:** If the AI brain responds with a plan that has _zero_ `Call`s, it means the agent has decided the job is finished. The loop stops.

## Human-in-the-Loop (Putting a Person in Charge)

One of the best things about this process is that it’s easy for a person to supervise the AI. Because the loop separates _planning an action_ from _doing an action_, it creates a natural pause where a user can step in.

- **Approval:** Before the system actually performs the actions the agent planned, it can show them to a person to get an okay. The system can be set up to wait for a human to click "approve" before continuing.
- **Correction:** The user can also change the plan. They could tweak the details of a planned action or even tell the agent to do something completely different.

These specific approval steps aren't built into the core rules of the system. Instead, the design just makes it _possible_ for developers to add any kind of human checkpoint they want. It could be a simple yes/no button or a more complex review system.

This is essential for safety and for teamwork, where the AI is more of an assistant. When a user makes adjustments, the AI can learn from that feedback and improve its strategy for the next steps.

## The Role of Data in the Loop

The loop provides the 'how' for the agent's behavior, but the 'what' is the data flowing through it. The information that is gathered, used, and created in each cycle is what allows the agent to remember what it's doing, learn, and carry out complex plans.

The next document, [006: Agent/Data](./006_agent_data.md), explains how all of this information is managed.
