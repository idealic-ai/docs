# 005: Agent/Loop

> **Loop:** Imagine a robot trying to solve a puzzle. A Loop is the series of steps it takes. It keeps asking, "What should I do next?" (a `Request`), gets back a list of actions to take (the `Call`s), and then does them. It uses what it learned to ask the question again, repeating the cycle until it thinks the puzzle is solved and has no more actions to suggest. — [Glossary](./000_glossary.md)

> Sidenote:
> 
> - Requires:
>   - [001: Agent/Request](./001_agent_request.md)
>   - [002: Agent/Tool](./002_agent_tool.md)
>   - [004: Agent/Call](./004_agent_call.md)

This document explains how the **Loop** works. It’s like a recipe that lets a computer helper (we call it an "agent") solve big problems that take more than one step. It does this by repeatedly asking itself "what's next?" until the job is done.

## The Thinking Cycle

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

The Agent Loop is the main way the computer helper works on its own to finish a task. Think of it like this:

1.  **Look Around:** First, the helper gathers all the information it has. This includes the main goal you gave it (like, "Find the funniest cat video on the internet"), everything it has already done, and any other notes it has.
2.  **Ask the Brain:** The helper takes all that info and asks its "brain" (a smart AI), "Okay, based on all this, what should I do next?" It also shows the brain what tools it has, like a "Web Search" tool or a "Video Player" tool.
3.  **Get a Plan:** The brain thinks and sends back a `solution`, which is just a list of actions to take right now. We call these actions **[004: Agent/Call](./004_agent_call.md)s**.
4.  **Do the Work and Learn:**
    - If the plan has actions, the helper does them. For example, if an action is to "search the web for 'funny cats'," it will use its search tool and do just that.
    - The results from that action (like a list of cat videos) are added to the helper's memory. Now it knows more for the next round of thinking.
5.  **Know When to Stop:** If the brain sends back a plan with zero actions, it's like it's saying, "All done!" This tells the helper that the job is finished, and the loop stops.

## A Person in the Middle (Human-in-the-Loop)

A really cool thing about this loop is that it gives you a chance to check the computer's work before it does anything.

Imagine you're guiding a cooking robot. Before it starts cracking eggs or pouring flour, it first tells you what it's planning to do.

- **Approval:** The robot might say, "My plan is to add one teaspoon of salt." You can look at the recipe and say, "Yep, that's right. Go for it."
- **Correction:** Or, the robot might say, "My plan is to add one CUP of salt." You can immediately stop it and say, "Whoa, no! Change the plan to use one TEASPOON of salt."

This is super important for making sure the helper works safely and does what you want. It's like working as a team. The helper can even learn from your corrections to make better plans next time, which is explained more in **[012: Agent/Plan](./012_agent_plan.md)**.