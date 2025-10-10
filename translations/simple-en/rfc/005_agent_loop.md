# 005: Agent/Loop

> **Loop:** Imagine you're building a big LEGO set. A "Loop" is like following the instruction book, one step at a time, to reach your goal. The AI does a step (`Request`), sees what happens (`Call`), and uses that information to figure out the next step. It keeps doing this until the LEGO set is finished (when there are no more steps to do).

> Sidenote:
>
> - To understand this, you should know about:
>   - [001: Agent/Request](./001_agent_request.md)
>   - [002: Agent/Tool](./002_agent_tool.md)
>   - [004: Agent/Call](./004_agent_call.md)

This paper explains how the **Loop** works. A loop is what lets an AI do big tasks that take many steps, by repeating a cycle over and over again until the job is done.

## The Execution Loop

> Sidenote:
>
> ```mermaid
> graph TD
>     Start((Start)) --> AssembleContext(Assemble Context)
>     AssembleContext --> InvokeRequest(Invoke Request)
>     InvokeRequest --> HasCalls{Solution has Calls?}
>     HasCalls -- No --> Stop((End))
>     HasCalls -- Yes --> HITL{Human-in-the-Loop}
>     HITL -- Approved --> ExecuteCalls(Execute Calls)
>     ExecuteCalls -- Results --> AssembleContext
>     HITL -- Corrected --> AssembleContext
>     classDef optional stroke-dasharray: 5, 5
>     class HITL optional
> ```

The Agent Loop is the main way the AI works by itself to finish a big project. It's like a repeating cycle that goes like this:

1.  **Gathering Info:** First, the loop gathers all the important information it needs to start. This is like getting all your ingredients and tools on the counter before you start baking. It includes the main goal (what you want to do), and what's happening right now.
2.  **Making a Request:** With all that info, it makes a `Request`. This is like the AI asking itself, "Okay, based on my goal and the tools I have, what's the very next thing I should do?"
3.  **Getting the Plan:** The `Request` gives back a `solution`, which is just a list of actions to take, called `Call`s. The AI might decide it needs to take one action, or many, or even none at all.
4.  **Doing the Work and Learning:** If the plan has `Call`s, the AI does them. Then, it looks at what happened—the results. It adds these new results to its pile of information for the next cycle. This way, it learns and gets smarter as it goes.
5.  **Finishing the Job:** If the plan has zero `Call`s, it means the AI thinks the job is done. The loop stops. The LEGO set is built!

## Human-in-the-Loop (HITL)

Think of the AI as a very fast assistant. A cool thing about the loop is that it has a built-in "pause" button. The AI figures out _what_ it wants to do (`Call`s), but it waits for your permission before it actually _does_ it. This gives a person a chance to step in:

- **Approval:** Before the AI takes action, it can show you its plan and ask, "Does this look right to you?"
- **Correction:** You can change the plan. If the AI wants to search for "cats," you could change it to "funny cat videos" or tell it to do something totally different.

This is really important for safety and for working together with the AI. When you make changes, the AI can learn from your feedback to make better plans next time. It's like you're teaching it how to be a better assistant.
