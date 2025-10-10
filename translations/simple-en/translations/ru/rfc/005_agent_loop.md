# 005: Agent/Cycle

> **Cycle:** A series of `Requests` that work toward a goal. An Agent keeps making `Requests`, handling the resulting `Calls`, and feeding the results back into its thinking for the next `Request`, until no more `Calls` are created. — [Glossary](./000_glossary.md)

> Sidenote:
> 
> - Required:
>   - [001: Agent/Request](./001_agent_request.md)
>   - [002: Agent/Tool](./002_agent_tool.md)
>   - [004: Agent/Call](./004_agent_call.md)

This document describes the **Cycle Protocol**, which is what allows an agent to tackle problems that take multiple steps, by running its `Request` process over and over.

## The Execution Cycle

> Sidenote:
> 
> ```mermaid
graph TD
    Start((Start)) --> AssembleContext(Assemble Context)
    AssembleContext --> InvokeRequest(Invoke Request)
    InvokeRequest --> HasCalls{Solution has Calls?}
    HasCalls -- No --> Stop((End))
    HasCalls -- Yes --> HITL{Human-in-the-Loop}
    HITL -- Approved --> ExecuteCalls(Execute Calls)
    ExecuteCalls -- Results --> AssembleContext
    HITL -- Corrected --> AssembleContext
    classDef optional stroke-dasharray: 5, 5
    class HITL optional
```

The Agent Cycle is the main engine that lets the agent work on its own. Think of it as the agent's thought process. Here’s how it works:

1.  **Gather Information (Assemble Context):** The cycle starts by gathering all the facts it has. This can include the user's goal, its current `State` (what it's already done), and any other useful info. It's like getting all your papers and notes ready before starting a project.
2.  **Decide the Next Step (Invoke Request):** With all the information ready, it makes a **[001: Agent/Request](./001_agent_request.md)**. This is like the agent asking itself, "Okay, based on everything I know, what should I do next?"
3.  **Get a To-Do List (Process Call):** The `Request` gives back a `solution`, which contains a to-do list of zero or more **[004: Agent/Call](./004_agent_call.md)s**.
4.  **Do the Work and Learn (Execution & Feedback):**
    - If the `solution` has `Calls` on its to-do list, the cycle runs them. For `Explicit` `Calls`, this means running the code for that `Action`.
    - The results of these actions are then added back to its pile of information for the next loop. This is how it learns from what it just did.
5.  **Finish the Job (Termination):** If the `solution` comes back with an empty to-do list (no `Calls`), the agent considers the goal complete, and the cycle stops.

## Human-in-the-Loop (HITL)

A key feature of the Agent Cycle is that it has a natural pause point for a human to step in. Because the cycle separates deciding what to do (generating `Calls`) from actually doing it, it creates a chance for a person to supervise:

- **Approval:** Before the agent acts on its `Calls`, it can show them to a user to get a thumbs-up.
- **Correction:** A user can change the details of a `Call` or even replace it with a different one.

This is incredibly important for safety and for tasks where the agent is helping a person. Any corrections or feedback from the user can be used by the **[012: Agent/Plan](./012_agent_plan.md)**, allowing the agent to improve its strategy based on human guidance.