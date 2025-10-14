# 005: Agent/Loop

> **Loop:** Imagine you're trying to solve a big puzzle. You can't do it all at once. A **Loop** is when an AI agent works on a goal by taking one small step, seeing what happened, and then using that information to figure out the next small step. It keeps doing this over and over until the puzzle is solved and there are no more steps to take.
> 
> — [Glossary](./000_glossary.md)

> Sidenote:
> 
> - To understand this, you should know about:
>   - [Agent/Request](./001_agent_request.md)
>   - [Agent/Tool](./002_agent_tool.md)
>   - [Agent/Call](./004_agent_call.md)

This document explains how an AI agent can tackle big, multi-step jobs by repeating a simple 'think, then act' cycle.

## The Work Cycle

The Agent Loop is the main way an AI can work on its own to finish a complicated task. Think of it like a robot chef baking a cake. Here’s how it works:

1.  **Read the Recipe (Context Assembly):** First, the robot looks at everything it needs: the goal (bake a chocolate cake), the current situation (`State`, like the oven is pre-heating), and any other notes.
2.  **Ask "What's Next?" (Request Invocation):** The robot then makes a **`Request`**. This is like it asking its main brain, "Okay, based on the recipe and what I've done so far, what is the *single next action* I should take?" It also knows all the `Tools` it has, like a whisk, a bowl, and an oven.
3.  **Get an Instruction (Call Processing):** The main brain answers with a `solution`, which is a to-do list with zero or more actions called **`Call`s**. A `Call` is a specific instruction, like "`Call` the 'Mix' tool with eggs and flour."
4.  **Do the Work & Learn (Execution & Feedback):**
    - If the to-do list has `Call`s on it, the robot does them. It picks up the whisk and starts mixing.
    - The results (like having a bowl full of batter) are then added to its memory. This new information helps it figure out what to ask next.
5.  **Finish the Job (Termination):** If the robot asks "What's next?" and the main brain sends back an *empty* to-do list (zero `Call`s), it means the cake is finished! The loop stops.

## Having a Person Help (Human-in-the-Loop)

A really cool feature of this loop is that it has a natural pause button, so a person can check the AI's work.

Because the AI first *decides* what to do (it creates the list of `Call`s) and then *does* it, there’s a moment in between where a human can step in.

- **Getting the Okay (Approval):** Before the AI starts mixing, the system can show you its plan ("I'm about to mix the eggs and flour") and wait for you to say, "Okay, go ahead."
- **Making a Change (Correction):** You could also look at the plan and say, "Wait, the recipe says to add sugar first!" You can change the instruction or give it a completely new one.

This is super important for safety and for times when the AI is acting like your assistant. The AI can even use your feedback to get smarter about its plans in the future.