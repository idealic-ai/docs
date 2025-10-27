# 008: Agent/Output

> [!DEFINITION] [Output Path](./000_glossary.md)
> The `_outputPath` is a special instruction given to a :term[tool]{canonical="Tool Call"}. It tells the computer where to save the tool's result, like putting a label on a folder. This makes the result available for the next steps in a process.

> Sidenote:
> - You should know about:
>   - :term[004: Agent/Call]{href="./004_agent_call.md"}
>   - :term[007: Agent/Variables]{href="./007_agent_variables.md"}
> - This helps you understand:
>   - :term[010: Agent/Loop]{href="./010_agent_loop.md"}

The agent system has two ways of sharing what it finds: temporary notes it jots down while working, and the final answer it gives when the whole job is done.

## Writing to the Scratchpad with an :term[Output Path]{canonical="Output Path"}

Think of the agent's memory as a digital scratchpad. While it can write notes there in many ways, the main way is by using the `_outputPath` instruction. When a :term[tool]{canonical="Tool Call"} finishes its task and has this instruction, the system adds its result to the scratchpad as a new note.

> Sidenote:
> You can save the result to any :term[data note]{canonical="Data Message"}, but it's most common to write it to a special :term[State note]{canonical="State Message" href="./009_agent_state.md"}. This saves the information so it can be used in later steps of a process.

This new note looks like any other piece of data, but it has two hidden labels that only the system can see:

- **`_call`**: A copy of the exact :term[tool instruction]{canonical="Tool Call"} that created this note.
- **`_date`**: A timestamp showing exactly when the note was written.

This creates a perfect, step-by-step record of how the agent was thinking, which is super helpful for understanding its logic or fixing mistakes.

### How to Define the Output Path

You can set the :term[Output Path]{canonical="Output Path"} in two ways, giving you either flexibility or control over how a tool behaves.

::::columns{.examples}
:::column{title="Letting the AI Decide"}

Here, the AI gets to decide where to save the result while it's working. This makes the tool very flexible and adaptable.

```json
// The tool's rules allow any valid path
{
  "_outputPath": {
    "type": "string",
    "description": "Path to store the user summary.",
    "pattern": "^†"
  }
}
```

:::
:::column{title="Giving a Specific Address"}

This way forces the tool to always save its output in one specific place. This is great for when you need things to be predictable and reliable.

```json
// The tool's rules lock the path to one value
{
  "_outputPath": {
    "type": "string",
    "const": "†data.user.summary"
  }
}
```

:::
::::

### The "Last Note Wins" Rule

Here’s a key detail: new notes are always **added to the end** of the scratchpad; they don't overwrite or get mixed in with old ones. This keeps thing simple and clear.

When the system needs to find a piece of information, like `†data.user.name`, it reads the scratchpad **backwards**, starting with the newest note. The very first place it finds the information (`user.name`) is the one it uses. This “last-write-wins” method ensures the agent always uses the most up-to-date information without any confusion.

:::::details{title="Example: How It Works"}

**1. Starting Point**

The scratchpad begins with one note about a user.

```json
[
  {
    "type": "data",
    "data": { "user": { "name": "Alex", "status": "active" } }
  }
]
```

**2. Running a Tool**

A tool is used to update the user's status.

```json
// This is the tool's instruction
{
  "_tool": "updateUserStatus",
  "newStatus": "inactive",
  "_outputPath": "†data.user.status"
}
```

**3. The Scratchpad After**

The system adds a new note to the end of the scratchpad with the tool's result.

```json
[
  // The original note
  {
    "type": "data",
    "data": { "user": { "name": "Alex", "status": "active" } }
  },
  // The new note added by the tool
  {
    "type": "data",
    "data": { "user": { "status": "inactive" } },
    "_call": { // Secret label: which tool made this?
      "_tool": "updateUserStatus",
      "newStatus": "inactive",
      "_outputPath": "†data.user.status"
    },
    "_date": "2025-10-26T12:00:00Z" // Secret label: when was it made?
  }
]
```

**4. Finding Information**

- To find `†data.user.status`, the system checks the last note first. It finds it and returns `"inactive"`.
- To find `†data.user.name`, the system checks the last note, but it isn't there. So it checks the note before it, finds it, and returns `"Alex"`.

:::::

The real magic happens when you combine :term[placeholders]{canonical="Variable Reference"} with :term[Output Paths]{canonical="Output Path"}. This lets you design workflows that use information that doesn't even exist yet. For example, you can set up a tool to work on data that will come from a user later.

This also lets you chain tools together. A tool can be set up to use a :term[placeholder]{canonical="Variable Reference"} that points to where a *previous* tool will save its result. This creates an assembly line where the output of one tool becomes the input for the next.

## How This Connects to Other Parts

- **:term[Data Notes]{canonical="Data Message"}:** The `_outputPath` is the main way to create and update the data notes on the agent's scratchpad. It turns a simple, one-off :term[tool action]{canonical="Tool Call"} into a step that saves its result for later.

  > Sidenote:
  > - :term[005: Agent/Data]{href="./005_agent_data.md"}

- **:term[State (Long-Term Memory)]{canonical="State Message"}:** You can save a result anywhere, but it’s most common to write to a special :term[State note]{canonical="State Message"}. This is like the agent's long-term memory, allowing different tools to share information and build on each other's work over many turns.

  > Sidenote:
  > - :term[009: Agent/State]{href="./009_agent_state.md"}

- **:term[Placeholders]{canonical="Variable Reference"}:** An :term[Output Path]{canonical="Output Path"} is the other half of a :term[placeholder]{canonical="Variable Reference"}. The :term[Output Path]{canonical="Output Path"} *writes* data to the scratchpad, and the :term[placeholder]{canonical="Variable Reference"} *reads* it. Together, they create a complete circuit for information to flow between tools.

  > Sidenote:
  > - :term[007: Agent/Variables]{href="./007_agent_variables.md"}

- **:term[Expressions (Simple Logic)]{canonical="Expression"}:** You can add logic like `OR` and `AND` to an :term[Output Path]{canonical="Output Path"}. This lets a tool make simple decisions, like saving its result in different places depending on the situation. It makes the workflow much more flexible than a simple, rigid assembly line.

  > Sidenote:
  > - :term[011: Agent/Expressions]{href="./011_agent_expressions.md"}

- **:term[Plan]{canonical="Plan"}:** In a :term[Plan]{canonical="Plan"}, which is like a blueprint for a big task, :term[Output Paths]{canonical="Output Path"} are the wires that connect all the different :term[tool steps]{canonical="Tool Call"}. It shows a complete map of how information flows from start to finish.

  > Sidenote:
  > - :term[012: Agent/Plan]{href="./012_agent_plan.md"}

- **:term[Doing Many Things at Once]{canonical="Instancing"}:** When a :term[tool]{canonical="Tool Call"} is told to run on multiple items at once, its `_outputPath` knows to save each result in its own separate space. This keeps everything organized and prevents the results from different tasks from getting mixed up.

  > Sidenote:
  > - :term[013: Agent/Instancing]{href="./013_agent_instancing.md"}

## From Temporary Notes to Lasting Memory

The :term[Output Path]{canonical="Output Path"} system is powerful for managing the flow of information between tools as they work. However, to build truly smart agents that can remember things across different tasks and conversations, we need a special kind of memory.

The next document, :term[009: Agent/State]{href="./009_agent_state.md"}, explains how this long-term memory works.
