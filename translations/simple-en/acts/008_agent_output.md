# 008: Agent/Output

> [!DEFINITION] [Output Path](./000_glossary.md)
> The `_outputPath` is a special instruction you give a :term[Tool]{canonical="Tool"} when you :term[Call]{canonical="Call"} it. It's a simple text address that tells the system where to save the tool's result, making it available for other steps later on.

> Sidenote:
> - You should know about:
>   - :term[004: Agent/Call]{href="./004_agent_call.md"}
>   - :term[007: Agent/Variables]{href="./007_agent_variables.md"}
> - This helps you understand:
>   - :term[010: Agent/Loop]{href="./010_agent_loop.md"}

The agent system has two kinds of output. First, there are the results from each step along the way, which are written down in a shared memory space. Second, there's the :term[Final Output]{canonical="Final Output"}, which is the final answer after the whole process is finished.

## Writing to Shared Memory with an :term[Output Path]{canonical="Output Path"}

Think of the agent's memory as a shared notebook. While any :term[Data Message]{canonical="Data Message" href="./005_agent_data.md"} can act as a page in this notebook, the `_outputPath` instruction on a :term[Call]{canonical="Call"} is the main way to write new things in it. When a tool runs a :term[Call]{canonical="Call"} that has this instruction, the system takes the result and adds it as a new page to the back of the notebook.

> Sidenote:
> While you can write to any :term[Data Message]{canonical="Data Message"}, it's most common to write to a :term[State Message]{canonical="State Message" href="./009_agent_state.md"}. This saves information so it can be used across many different steps of a process.

This new page is a standard :term[Data Message]{canonical="Data Message"}, but it also has two extra, hidden notes on it that the AI doesn't see:

- **`_call`**: A copy of the exact :term[Tool Call]{canonical="Tool Call"} that created this output.
- **`_date`**: A timestamp of exactly when the information was written.

This creates a perfect, step-by-step history of how the notebook was changed, which is super helpful for understanding the agent's thinking and fixing things if they go wrong.

### Defining the Output Path

You can set the :term[Output Path]{canonical="Output Path"} in two different ways, giving you different levels of control over how a tool behaves.

::::columns{.examples}
:::column{title="Dynamic Path (AI Decides)"}

In this mode, the AI gets to decide where to store the result while it's running. This makes the tool very flexible and smart.

```json
// The tool's rules allow any address for _outputPath
{
  "_outputPath": {
    "type": "string",
    "description": "Path to store the user summary.",
    "pattern": "^†"
  }
}
```

:::
:::column{title="Fixed Path (Set in Stone)"}

This way forces the tool to be predictable. It will always write its output to the exact same, pre-decided location every time.

```json
// The tool's rules lock _outputPath to one specific address
{
  "_outputPath": {
    "type": "string",
    "const": "†data.user.summary"
  }
}
```

:::
::::

### How New Information is Handled: The Newest Wins

It's important to know that new results are **added as new pages**, not blended into old ones. This keeps things simple and follows how a real process works, where new information usually replaces old information.

When the system needs to find a piece of information, like the user's name at `†data.user.name`, it searches the notebook **starting from the last page and working backward**. It looks at each page from newest to oldest. The very first page it finds that contains the path it's looking for (`user.name`) provides the answer. This "newest-wins" rule ensures that you always get the most up-to-date information without any complicated logic.

:::::details{title="Example: Writing and Finding Information"}

**1. Starting Point**

The notebook starts with one page of `data`.

```json
[
  {
    "type": "data",
    "data": { "user": { "name": "Alex", "status": "active" } }
  }
]
```

**2. A Tool is Used**

A tool is called to change the user's status.

```json
// The instruction being run
{
  "_tool": "updateUserStatus",
  "newStatus": "inactive",
  "_outputPath": "†data.user.status"
}
```

**3. The Notebook After**

The system adds a new page to the notebook with the result. This page also includes the hidden notes about what tool made it.

```json
[
  // The original page
  {
    "type": "data",
    "data": { "user": { "name": "Alex", "status": "active" } }
  },
  // The new page added by the tool
  {
    "type": "data",
    "data": { "user": { "status": "inactive" } },
    "_call": {
      "_tool": "updateUserStatus",
      "newStatus": "inactive",
      "_outputPath": "†data.user.status"
    },
    "_date": "2025-10-26T12:00:00Z"
  }
]
```

**4. Finding the Information**

- To find `†data.user.status`, the system checks the last page first. It finds `user.status` and returns `"inactive"`.
- To find `†data.user.name`, the system checks the last page, but `user.name` isn't there. So, it checks the page before that one. It finds it there and returns `"Alex"`.

:::::

The real magic happens when you combine :term[Variable References]{canonical="Variable Reference"} (reading data) with :term[Output Paths]{canonical="Output Path"} (writing data). You can set up a tool to work on information that doesn't even exist yet. For example, a tool can be set up to use an :term[Input]{canonical="Input"}, even before a user has provided that input. This lets you build workflows that can be reused for many different situations.

You can even chain tools together. One :term[Tool Call]{canonical="Call"} can be set up to use information that will be created by a *previous* tool in the same chain. This creates a multi-step process where the output from one tool becomes the input for the next, like an assembly line.

## Tools Without an Output Path

Not every tool needs to save its result. Leaving out the `_outputPath` instruction is a deliberate choice that tells the system to act differently.

### Temporary Thoughts for the AI

When an AI uses a tool for thinking (a latent call) and you leave out the `_outputPath`, it acts like a temporary thought. The AI thinks about a problem, which helps it decide what to do next, but the thought itself isn't saved in the shared notebook. This is a great way to help an AI structure its thinking.

For example, an agent could first use a hidden `think` tool to come up with a plan. This "thought" isn't saved, but the act of thinking makes the AI smarter for its next move. Right after thinking, the AI can then make better, more focused :term[Tool Calls]{canonical="Call"} because it already worked through the problem.

### Fire-and-Forget Actions

When a tool performs a real-world action (an explicit call) and you leave out the `_outputPath`, it's like a "fire-and-forget" mission. The :term[Execution Loop]{canonical="Execution Loop"} will run the action, but it won't wait for a result or save anything to the notebook.

This is useful for actions where you don't need an answer back to continue. Common examples are:

- Sending a log to a tracking service.
- Sending a notification to a person or another system.
- Starting a long background task that doesn't need to be watched.

## How This Connects to Other Parts

- **:term[Data Message]{canonical="Data Message"}:** The `_outputPath` is the main way to create and update :term[Data Messages]{canonical="Data Message"} during a workflow. It turns a single tool action into a lasting change by saving its result to the shared memory for other steps to use.

  > Sidenote:
  > - :term[005: Agent/Data]{href="./005_agent_data.md"}

- **:term[State Message]{canonical="State Message"}:** The most common thing to do is to write information to a :term[State Message]{canonical="State Message"}. This makes the main :term[State]{canonical="State"} of the agent the central notebook for the whole job, letting different tools share information and build on each other's work over many steps.

  > Sidenote:
  > - :term[009: Agent/State]{href="./009_agent_state.md"}

- **:term[Variable Reference]{canonical="Variable Reference"}:** The :term[Output Path]{canonical="Output Path"} is the other half of a :term[Variable Reference]{canonical="Variable Reference"}. The :term[Output Path]{canonical="Output Path"} writes data, and the :term[Variable Reference]{canonical="Variable Reference"} reads it. Together, they create a complete, easy-to-read map for how information flows from one tool to another.

  > Sidenote:
  > - :term[007: Agent/Variables]{href="./007_agent_variables.md"}

- **:term[Expressions]{canonical="Expression"}:** :term[Expressions]{canonical="Expression"} add logic, like 'and' or 'or', to the information map. By using `||` (or) and `&&` (and) in an :term[Output Path]{canonical="Output Path"}, a tool can have backup plans or send its result to multiple places at once. This makes the system flexible and able to adapt as it runs.

  > Sidenote:
  > - :term[011: Agent/Expressions]{href="./011_agent_expressions.md"}

- **:term[Plan]{canonical="Plan"}:** In a :term[Plan]{canonical="Plan"}, the :term[Output Paths]{canonical="Output Path"} are like the wires that connect different :term[Tool Calls]{canonical="Tool Call"} (the building blocks) into a full diagram. This lets an agent plan out and run a whole multi-step strategy as a single, clear object.

  > Sidenote:
  > - :term[012: Agent/Plan]{href="./012_agent_plan.md"}

- **:term[Instancing]{canonical="Instancing"}:** When a :term[Tool Call]{canonical="Tool Call"} is working on a specific `_instance`, any :term[Output Path]{canonical="Output Path"} it has is automatically aimed at that instance's private memory. This keeps information separate when doing many things at once, making sure that one task doesn't accidentally mess with another.

  > Sidenote:
  > - :term[013: Agent/Instancing]{href="./013_agent_instancing.md"}

## From Temporary Outputs to Lasting Memory

The :term[Output Path]{canonical="Output Path"} system is a powerful way to manage the flow of information between tool actions. But to build smart agents that can learn and remember things over a long time, we need a special kind of memory—one designed to hold onto information even after the current job is done.

The next document, :term[009: Agent/State]{href="./009_agent_state.md"}, explains how this permanent memory works.
