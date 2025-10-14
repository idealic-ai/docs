# 011: Agent/Instancing

> **Instancing:** Imagine you have a bunch of homework problems to solve. Instead of doing them one by one, you handle them all at the same time. Each problem is an "Instance," and it has its own separate sheet of paper (its "State Object") and a number so you don't get them mixed up.

> Sidenote:
> - What this needs: [010: Agent/State](./010_agent_state.md)
> - What works with this:
>   - [007: Agent/Input](./007_agent_input.md)
>   - [008: Agent/Imports](./008_agent_imports.md)
>   - [012: Agent/Plan](./012_agent_plan.md)

The **Instancing Protocol** is a way for an AI agent to work on many separate tasks at the same time, in a single go. It’s like a super-efficient assembly line. By giving the agent a whole batch of tasks (as a list of `State Objects`), it can work on all of them at once, making it much faster and more consistent.

This is how the agent goes from doing one thing at a time to handling huge amounts of work all at once.

## How Instancing Works

Instancing builds on the idea of the **[010: Agent/State](./010_agent_state.md)** protocol. But instead of sending just one task (a single `State Object`), you can send a whole list of them. Each item in the list is a separate job, or `Instance`.

To keep track of which job is which, each one gets a special tag called `_instance`. Think of it like a sticky note with a number on it (like `①`, `②`, `③`). This tag lets the AI know which instructions and data belong to which job.

This method has big advantages:

- **Efficiency**: It's like a chef cooking ten burgers at once on a big grill instead of one at a time. The agent gets way more done in a single request.
- **Consistency**: Because the AI sees all the related jobs at the same time, it can make sure the results are similar and high-quality. All the burgers will be cooked just right.

## How Instancing Works with Other Messages

The real power of instancing is how the little `_instance` sticky note tells other types of messages what to do.

- **State:** The `State` message is your main workspace for a task. Each `Instance` has its own private workspace, identified by its `_instance` tag. This keeps the work for different tasks from getting mixed up, like having a separate cutting board for each burger.

  > Sidenote:
  > - [010: Agent/State](./010_agent_state.md)

- **Input:** An `Input` message gives instructions. You can use it in two ways:
    1.  **For everyone:** Send one `Input` message without a sticky note, and the instructions apply to *all* the tasks in the batch (e.g., "add cheese to every burger").
    2.  **For just one:** Attach an `_instance` sticky note to an `Input` message, and the instruction only applies to that specific task (e.g., "burger `③`, no onions").

  > Sidenote:
  > - [007: Agent/Input](./007_agent_input.md)

- **Imports:** The `_instance` tag is also super important for bringing in data. When a tool is asked to work on a specific task (an `Instance`), it's only shown the data for *that* task. This stops it from getting confused by all the other tasks happening at the same time.

  > Sidenote:
  > - [008: Agent/Imports](./008_agent_imports.md)

## How Instancing Works with Other Protocols

Instancing also works with higher-level instructions to control the flow of work.

- **Calls:** When you `Call` a tool, you add an `_instance` tag to it. This acts like a pointer, telling the tool exactly which workspace to go to and which task to work on. It makes sure any changes are saved to the right place.

  > Sidenote:
  > - [004: Agent/Call](./004_agent_call.md)

- **Plan:** A `Plan` is like a recipe or a set of instructions. While instancing lets you work on many tasks at once, the `Plan` tells the agent *what steps to follow* for each task. You can use the same recipe for every single `Instance` in a big batch, making sure a complicated job is done the same way every time.

  > Sidenote:
  > - [012: Agent/Plan](./012_agent_plan.md)

## From Working at the Same Time to Making a Plan

Instancing gives us the power to do many jobs at the same time, side-by-side. But the steps for each job can be complicated. To handle this, the agent needs a repeatable recipe that it can apply to every single job.

The next document, **[012: Agent/Plan](./012_agent_plan.md)**, explains how to create these reusable, step-by-step recipes.
