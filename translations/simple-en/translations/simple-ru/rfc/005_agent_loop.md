# 005: Agent/Cycle

> **Cycle:** This is when an agent does one task after another, kind of like going in a circle, to reach a big goal. It makes a `Request`, gets `Calls` (commands) in return, does them, and uses the result for the next `Request`. It repeats this until there are no more commands. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [001: Agent/Request](./001_agent_request.md)
>   - [002: Agent/Tool](./002_agent_tool.md)
>   - [004: Agent/Call](./004_agent_call.md)

This document explains the **Cycle protocol**. Think of it as a step-by-step game plan that lets an agent handle complex jobs that have many parts.

## The Execution Cycle

> Sidenote:
>
> ```mermaid
> graph TD
>     Start((Start)) --> AssembleContext(Assemble Information)
>     AssembleContext --> InvokeRequest(Make Request)
>     InvokeRequest --> HasCalls{Decision has commands?}
>     HasCalls -- No --> Stop((End))
>     HasCalls -- Yes --> HITL{Human Supervision}
>     HITL -- Approved --> ExecuteCalls(Execute Commands)
>     ExecuteCalls -- Results --> AssembleContext
>     HITL -- Corrected --> AssembleContext
>     classDef optional stroke-dasharray: 5, 5
>     class HITL optional
> ```

The agent's cycle is the main way it works on its own, one step at a time. Here’s how it works:

1.  **Gather Information:** First, the cycle gathers everything it needs: the goal you gave it, what it has already done (`State`), and other useful data. Imagine you're collecting all the right Lego pieces before you start building.
2.  **Send Request:** Using all that information, the agent makes a **[Request](./001_agent_request.md)**. It’s like asking a very smart assistant, "Here’s the situation and here's what I can do (`Tools`). What's the next step?"
3.  **Process Commands:** In response to the `Request`, it gets a `decision` containing a list of **[Calls](./004_agent_call.md)**. A `Call` is simply a command that needs to be done. There might be one, many, or none at all.
4.  **Execute and Get Feedback:**
    - If the `decision` has `Calls`, the cycle runs them. For example, it might run a program.
    - The results of these commands (what happened) are added to the pile of information for the next loop. This is how the agent learns from what it has done.
5.  **Finish:** If the `decision` doesn't have any `Calls`, the agent assumes it has reached the goal or has done all it can. The cycle stops.

## Human-in-the-Loop (Human Supervision)

One of the most important features of the Cycle is that it allows a person to supervise the agent's work. Since the agent first figures out *what* to do (`Calls`) and *then* does it, we get a chance to jump in.

- **Approval:** Before the agent executes the commands, the system can show them to you and ask, "Is this right? Should I continue?"
- **Correction:** You can change a command or even replace it with a completely different one if you think it would be better.

This is very important for safety and for working together, with the agent acting as your assistant. The agent can even learn from your corrections (this is covered in **[012: Agent/Plan](./012_agent_plan.md)**) to act smarter next time.