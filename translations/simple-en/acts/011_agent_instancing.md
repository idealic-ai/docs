# 011: Handling Multiple Tasks at Once (Instancing)

> **What is Instancing?**
> Imagine you need to do the same task over and over again for a hundred different things, like addressing a hundred different letters. Instancing is a way to do all of them at the same time, keeping each one separate and organized.



The **Instancing Protocol** is a clever way to get a lot of work done quickly. It lets you use a single recipe (called a [Plan](./010_agent_plan.md)) to work on many separate tasks at the same time, which makes everything much faster and more consistent.

## How It Works

This idea builds on the concept of a **[State](./009_agent_state.md)**, which is like a digital workspace for a single task. Instead of sending just one workspace to the AI, you can send a whole list of them. Each one in the list is a separate **Instance** of the task.

To keep them from getting mixed up, each workspace gets a unique label, like a sticky note with a number on it (e.g., `①`, `②`). This label is stored in a special property called `_instance`.

When the AI sees these labels, it knows exactly which task it's working on. It's like telling a chef, "This ingredient is for order #1, and that one is for order #2."

This method has big advantages:

- **Efficiency**: You can handle tons of tasks in a single request, which saves a lot of time.
- **Consistency**: Because the AI sees all the similar tasks at once, it learns to handle them in the same reliable way, making the results better.

## Staying Organized with Different Messages

The real power of instancing comes from how the `_instance` label helps organize different types of information.

- **State:** Each `State` is a workspace. The `_instance` label makes sure that the work done for task `①` stays in workspace `①` and doesn't spill over into workspace `②`.



- **Input:** You can give instructions in two ways. You can provide one set of instructions for *all* the tasks at once (a global `Input`). Or, you can give a specific instruction just for task `②` by adding the `_instance: '②'` label to it.



- **Scopes:** Scopes are like private notes for a specific tool. The `_instance` label ensures that when a tool is working on task `①`, it only sees the notes relevant to task `①`. This helps tools focus on their part of the job without getting confused by other tasks happening at the same time.



## How Instancing Works with Other Protocols

Instancing also works with other angets to manage how tasks get done.

- **Calls:** A `Call` is a command to a tool. When a `Call` has an `_instance` label, it tells the tool exactly which workspace to use. This makes sure that when a tool saves a result or reads a value, it does it in the right place.



- **Plan:** A `Plan` is a reusable recipe, like the steps for making a pizza. Instancing lets you use that single pizza recipe to make a hundred different pizzas at once, each with its own unique toppings. The `Plan` ensures every pizza is made the right way, while `Instancing` handles making all of them at the same time.



## From a Recipe to a Finished Project

If a `Plan` is the recipe and `Instancing` is the busy kitchen that makes many dishes at once, then a **[Process Idea](./203_idea_process.md)** is the final cookbook. It contains the original recipe and a perfect record of how every single dish was made.