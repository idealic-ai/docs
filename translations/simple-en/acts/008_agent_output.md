# 008: Agent/Output

> [!DEFINITION] [Output Path](./000_glossary.md)
> The `_outputPath` is a special label you put on a :term[Call]{canonical="Call"}. It's a simple instruction that tells the system where to save the result of a tool's work, like putting a label on a box so you know where to find things later.

> Sidenote:
> - Requires:
>   - :term[004: Agent/Call]{href="./004_agent_call.md"}
>   - :term[007: Agent/Variables]{href="./007_agent_variables.md"}
> - Enables:
>   - :term[010: Agent/Loop]{href="./010_agent_loop.md"}

The agent system has two ways of sharing what it's done: it can write down temporary notes as it works, and it can give a :term[Final Output]{canonical="Final Output"} when the whole job is finished.

## Writing to the Whiteboard with an :term[Output Path]{canonical="Output Path"}

Think of the agent's memory as a big whiteboard. While any :term[Data Message]{canonical="Data Message" href="./005_agent_data.md"} can be used to jot down notes, the :term[Output Path]{canonical="Output Path"} label on a :term[Call]{canonical="Call"} is the main way to write on it. When a tool finishes its job and has an :term[Output Path]{canonical="Output Path"}, the system adds its result to the whiteboard as a new message.

> Sidenote:
> While you can write to any :term[Data Message]{canonical="Data Message"}, you'll most often write to a special :term[State Message]{canonical="State Message" href="./009_agent_state.md"}. This is how information is saved between different steps of a process.

This new message is a standard :term[Data Message]{canonical="Data Message"}, but it also has a few hidden notes attached that the AI doesn't see:

- **`_call`**: Shows the exact :term[Tool Call]{canonical="Tool Call"} that created this note.
- **`_date`**: A timestamp saying exactly when the note was written.
- **`_outputMethod`**: A special instruction explaining how this new information should be combined with older information.

This creates a perfect, step-by-step history of how the agent's memory was changed, which is super helpful for understanding how the agent is thinking and fixing problems.

### How to Define the Output Path

You can set up the :term[Output Path]{canonical="Output Path"} in two ways, giving you different levels of control over how a tool behaves.

::::columns{.examples}
:::column{title="Flexible Path (AI Decides)"}

Here, the AI can decide where to save the result while it's working. This makes the tool very adaptable.

```json
// The tool's instructions allow any label for the output path
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

This way forces the tool to be predictable. It will always save its output in the exact same place, every time.

```json
// The tool's instructions lock the output path to one specific label
{
  "_outputPath": {
    "type": "string",
    "const": "†data.user.summary"
  }
}
```

:::
::::

### Figuring Out the Latest Value

A key idea is that these output messages are **added to the end of a list**, not mixed in with old data. This allows the system to figure out the *current* value of anything at the moment it's needed by looking at the history of how it was changed.

When the system needs to find the value of a :term[Variable Reference]{canonical="Variable Reference" href="./007_agent_variables.md"} like `†data.user.name`, it scans the list of messages from **newest to oldest**.

- If it finds a message for that location with a method of **`set`** (which is the default), it stops looking. That message's value is the final, current value. It's like finding a sticky note that says "Final address is 123 Main St." — you ignore all the older notes.
- If it finds messages with methods like **`merge`** or **`push`**, it keeps looking backwards, gathering all the updates until it hits a `set` message or the start of the list. Then, it replays those updates from oldest to newest to build the final value. It's like following a series of notes that say "Start with 10," then "add 5," then "double it."

This method guarantees that the agent's memory is always up-to-date and accurate, allowing it to handle complex tasks reliably.

:::::details{title="Example: Adding and Finding Information"}

**1. The Starting Point**

The whiteboard starts with one message.

```json
[
  {
    "type": "data",
    "data": { "user": { "name": "Alex", "status": "active" } }
  }
]
```

**2. A Tool is Used**

A tool is used to change the user's status.

```json
// The tool call being run
{
  "_tool": "updateUserStatus",
  "newStatus": "inactive",
  "_outputPath": "†data.user.status"
}
```

**3. The Whiteboard After**

The system adds a new message to the end of the list with the tool's result and some hidden notes about where it came from.

```json
[
  // The original message
  {
    "type": "data",
    "data": { "user": { "name": "Alex", "status": "active" } }
  },
  // The new message added by the tool
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

**4. Finding the Current Value**

- To find `†data.user.status`, the system checks the newest message first. It finds the status there and returns `"inactive"`.
- To find `†data.user.name`, the system checks the newest message, doesn't find a name, then checks the older message. It finds the name there and returns `"Alex"`

:::::

The real power of this system is connecting :term[Variable References]{canonical="Variable Reference"} (reading data) with :term[Output Paths]{canonical="Output Path"} (writing data). You can set up a tool to work on information that doesn't even exist yet. For example, a tool can be set up to process a user's name, even before the user has provided it.

This also lets you chain tools together. One :term[Tool Call]{canonical="Call"} can be set up to use a :term[Variable Reference]{canonical="Variable Reference"} that points to the output of a *previous* tool. This creates an assembly line where the result from one tool becomes the starting material for the next one.

## What if a Call has No Output Path?

Not every tool needs to save its result. Leaving out the `_outputPath` label is a choice that tells the system to act differently.

### A Quick Thought (for AI Reasoning)

For an AI's internal reasoning, leaving out the `_outputPath` lets it have a quick "thought" that helps it figure out what to do next, but this thought isn't saved to the main whiteboard. This is a great way to help an AI structure its thinking.

For instance, an agent could first use a secret `think` tool to analyze a problem and sketch out a plan. This "thought" isn't saved, but the process of thinking helps the AI understand the problem better. Immediately after, the AI can make smarter, more effective :term[Tool Calls]{canonical="Call"} because it already did the prep work.

### Fire-and-Forget (for Simple Actions)

For actions that happen in the real world, leaving out the `_outputPath` means "fire-and-forget." The system will tell the tool to do its job, but it won't wait for a result or save anything.

This is perfect for tasks where you don't need a response to continue. For example:

- Saving a log of an event.
- Sending a notification to someone's phone.
- Kicking off a long background process that doesn't affect the current plan.

## How This Connects to Other Systems

- **:term[Data Message]{canonical="Data Message"}:** The `_outputPath` is the main way to create these messages during a task. It turns a simple action into a piece of saved information that other steps can use.

  > Sidenote:
  > - :term[005: Agent/Data]{href="./005_agent_data.md"}

- **:term[State Message]{canonical="State Message"}:** A `State Message` is like the agent's main whiteboard. Most of the time, `_outputPath` is used to write to this message, allowing different tools to share information and build on each other's work over many steps.

  > Sidenote:
  > - :term[009: Agent/State]{href="./009_agent_state.md"}

- **:term[Variable Reference]{canonical="Variable Reference"}:** The `_outputPath` (writing) and the `Variable Reference` (reading) are two sides of the same coin. Together, they create a simple circuit for information to flow from one tool's output to another's input.

  > Sidenote:
  > - :term[007: Agent/Variables]{href="./007_agent_variables.md"}

- **:term[Expressions]{canonical="Expression"}:** Expressions add logic to this circuit. By using `||` (or) and `&&` (and) in an `_outputPath`, a tool can conditionally send its result to different places, making the system more flexible and intelligent.

  > Sidenote:
  > - :term[011: Agent/Expressions]{href="./011_agent_expressions.md"}

- **:term[Plan]{canonical="Plan"}:** In a multi-step :term[Plan]{canonical="Plan"}, the `_outputPath`s are like the wires that connect all the different tools together into a working machine. This lets an agent map out and run a whole strategy at once.

  > Sidenote:
  > - :term[012: Agent/Plan]{href="./012_agent_plan.md"}

- **:term[Instancing]{canonical="Instancing"}:** When you're running many copies of a task at once, the `_outputPath` automatically knows to save results inside each copy's own private workspace. This keeps the data separate and ensures that one task doesn't accidentally mess up another's work.

  > Sidenote:
  > - :term[013: Agent/Instancing]{href="./013_agent_instancing.md"}

## From Quick Notes to Lasting Memory

The :term[Output Path]{canonical="Output Path"} system is a powerful way to manage the flow of information between tools. But to build truly smart agents that can learn and remember things over a long time, we need a special kind of memory designed to last.

The next document, :term[009: Agent/State]{href="./009_agent_state.md"}, will explain how this permanent memory works.