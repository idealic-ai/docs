# 005: Agent/Loop

> **Loop:** Imagine you have a goal, like building a LEGO castle. A loop is the process of figuring out what to do next, doing it, seeing what happened, and then figuring out the next step, over and over until the castle is finished. — [Glossary](./000_glossary.md)

> Sidenote:
> 
> - Before you can understand this, it helps to know about:
>   - [001: Agent/Request](./001_agent_request.md)
>   - [002: Agent/Tool](./002_agent_tool.md)
>   - [004: Agent/Call](./004_agent_call.md)

This document explains the **Loop Protocol**. It's the way an AI agent can do tasks that take more than one step, like a robot that keeps working until its job is done.

## The Action Cycle

Think of the Agent Loop like a robot chef baking a cake. The robot repeats a cycle of thinking and acting until the cake is ready.

1.  **Gather Ingredients (Context Assembly):** First, the robot looks at everything it has: the recipe (the user's goal), the ingredients on the counter (the current situation), and what it has already done.
2.  **Decide the Next Step (Request Invocation):** With all that information, it thinks, "Okay, what's next?" It uses the **[001: Agent/Request](./001_agent_request.md)** protocol to look at its list of abilities (its `Tools`) and decide on a plan.
3.  **Get a To-Do List (Call Processing):** The `Request` comes back with a `solution`, which is a little to-do list of one or more actions, called **[004: Agent/Call](./004_agent_call.md)s**. For example, "crack two eggs" and "measure one cup of flour."
4.  **Do the Work & Check In (Execution & Feedback):**
    - If the to-do list has actions on it, the robot does them. It cracks the eggs and measures the flour.
    - The results (a bowl with eggs and flour) are added to its memory of what's been done. Now, it knows it has a mixture to work with for the next cycle.
5.  **Finish the Job (Termination):** The robot repeats this cycle. It looks at the mixture, decides to stir, gets a "stir the batter" `Call`, and does it. Eventually, the cake is in the oven and finished. The robot asks, "What's next?" and the `solution` comes back with an empty to-do list (zero `Call`s). This is the signal that the job is done, and the loop stops.

## Human-in-the-Loop (Getting Help from a Person)

An awesome feature of this loop is that it gives a human a chance to step in and help. It’s like having a head chef watching over the robot chef.

Because the robot first decides *what* to do (getting the `Call`s) and *then* does it, there's a pause in between. During this pause, the system can show the robot's plan to a person.

-   **Approval:** Before mixing, the robot could show you its to-do list and ask, "Is this right?" You can say "yes" to let it continue.
-   **Correction:** You might see the to-do list says "add one tablespoon of salt" and think, "Whoa, that's way too much for a cake!" You can change the plan to "add one pinch of salt" before the robot does it.

This is super important for making sure the AI is safe and helpful. It lets the AI work like an assistant that you can guide and teach, especially when you're working on something together. The AI can even learn from your changes using its **[012: Agent/Plan](./012_agent_plan.md)** to make better decisions next time.