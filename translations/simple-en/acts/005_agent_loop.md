# 005: Agent/Loop

> [!DEFINITION] Loop
> A series of steps, like a recipe, that an AI agent follows to reach a goal. The agent makes a request, sees what happens, and uses that new information to figure out its next move. It keeps repeating this cycle until the job is done.

> Sidenote:
> *   You should read these first:
>     *   [001: Agent/Request](./001_agent_request.md)
>     *   [002: Agent/Tool](./002_agent_tool.md)
>     *   [004: Agent/Call](./004_agent_call.md)

This paper explains the **Execution Loop**, which is how an AI agent can tackle big problems by breaking them down into smaller steps. This process of thinking, acting, and learning from the results is what we mean when we talk about an "agent."

## The Execution Loop

> Sidenote:
> ```mermaid
> graph TD
>     Start((Start)) --> SchemaComposition(1. Put Blueprints Together)
>     SchemaComposition --> ContextAssembly(2. Gather Info)
>     ContextAssembly --> RequestInvocation(3. Make a Request)
>     RequestInvocation --> CallProcessing(4. Plan Next Steps)
>     CallProcessing --> HasCalls{Is there a to-do list?}
>     HasCalls -- Yes --> HITL{Human Can Check}
>     HITL -- Looks Good --> Execution(5. Take Action & Learn)
>     Execution -- New Info --> ContextAssembly
>     HITL -- Needs a Change --> ContextAssembly
>     HasCalls -- No / Done --> Termination(6. Finish the Job)
>     Termination --> OutputGeneration(7. Give Final Answer)
>     OutputGeneration --> End((End))
>     classDef optional stroke-dasharray: 5, 5
>     class HITL optional
> ```

The execution loop is the engine that lets an agent work on its own to solve problems one step at a time. Here’s how it works:

1.  **Putting Blueprints Together:** First, you give the agent a blueprint for what the final answer should look like. The agent then automatically combines this with the blueprints for all the tools it knows how to use. This creates one giant blueprint for its overall plan.
2.  **Gathering Information:** The agent starts by collecting all the information it needs, like what the user's main goal is.
3.  **Making a Request:** Using the information it gathered, the agent makes a request, asking the system what it should do next.
4.  **Planning the Next Steps:** The system gives back a plan, which is a list of proposed actions called `Calls`. Think of these as a to-do list. At this point, the agent has only decided *what* to do, but hasn't done it yet.
5.  **Taking Action & Learning:**
    - If the to-do list isn't empty, the agent starts doing the tasks. This means using the tools it planned to use.
    - It then takes the results of its actions and adds them to its memory, so it can use this new information in the next cycle.
6.  **Finishing the Job:** If the to-do list is empty, it means the agent believes it has finished the goal, so the loop stops.
7.  **Giving the Final Answer:** Once the loop is finished, the agent puts together the final answer in the format you asked for at the very beginning. This allows the agent to not just do things, but also to give you a clean, final report. For example, an agent could do a lot of work analyzing numbers (each as a `Call`) and then use this final step to give you a tidy summary.

## Human-in-the-Loop (HITL)

A really cool feature of this loop is that it gives a human a chance to step in and help. Because the agent first plans what to do and then does it, there's a pause where a person can check its work.

- **Approval:** Before the agent takes action, the system can show you its to-do list and ask, "Is this okay?" The loop will wait for you to say yes.
- **Correction:** You can even change the plan. Maybe you want the agent to use a different tool, or change some of a tool's settings.

It's important to know that the main system doesn't force a specific way to do this. It just creates a natural break between planning and acting. This lets anyone building with this system create their own ways for humans to interact, from a simple "yes/no" button to more advanced review systems.

This is super important for staying safe and for working together with the AI. When a person gives feedback, the agent can use it to get smarter and improve its strategy.



## The Role of Data in the Loop

The loop provides the structure for how the agent behaves, but its real power comes from the information that flows through it. We'll explore how that data is handled in the next document, [006: Agent/Data](./006_agent_data.md).
