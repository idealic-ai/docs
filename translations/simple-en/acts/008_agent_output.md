# 008: Agent/Output

> [!DEFINITION] [Output Path](./000_glossary.md)
> Imagine you're doing a multi-step math problem. The `_outputPath` is like the label you put on your answer for step one, like "Result A." It's a special instruction in a :term[Call]{canonical="Call"} that tells the computer where to save a tool's result so it can be used in the next step.


> Sidenote:
> - **To Understand This, You Should First Know About:**
>   - :term[004: Agent/Call]{href="./004_agent_call.md"}
>   - :term[007: Agent/Variables]{href="./007_agent_variables.md"}
> - **This Will Help You Understand:**
>   - :term[010: Agent/Loop]{href="./010_agent_loop.md"}

When an AI agent works, it produces two kinds of results: temporary notes it jots down while working (:term[Tool Calls]{canonical="Tool Call"} results), and the final answer to the whole problem (:term[Final Output]{canonical="Final Output"}).

## Writing Notes with the :term[Output Path]{canonical="Output Path"}

Think of the agent's memory as a shared whiteboard. While it can scribble notes anywhere, the main way it saves the result of a tool is by using the :term[Output Path]{canonical="Output Path"} instruction. When a :term[Tool Call]{canonical="Tool Call"} finishes, the system takes its result and sticks it onto the whiteboard as a new note.


> Sidenote:
> Even though a tool can write its result to any data note, it will most often write to a special :term[State Message]{canonical="State Message" href="./009_agent_state.md"}. This helps keep track of information over many steps.

This new note is just a standard :term[Data Message]{canonical="Data Message"}, but it has two extra, secret bits of information that the AI doesn't see:

- **`_call`**: A copy of the exact :term[Tool Call]{canonical="Tool Call"} that created this note. (So you know *how* the answer was found.)
- **`_date`**: A timestamp of exactly when the note was written. (So you know *when* it was found.)

This creates a perfect trail of breadcrumbs, showing every step the agent took. It's super useful for figuring out how the agent was thinking or fixing problems.

### Deciding Where to Save the Note

You can tell a tool where to save its result in two ways, giving you either flexibility or control.

::::columns{.examples}
:::column{title="Flexible Path (AI Decides)"}

Here, you let the AI decide the best place to save the result while it's working. It's like telling a friend, "Just put this book somewhere sensible on the shelf."

```json
// The tool's instructions allow any address for _outputPath
{
  "_outputPath": {
    "type": "string",
    "description": "Path to store the user summary.",
    "pattern": "^†"
  }
}
```

:::
:::column{title="Fixed Path (You Decide)"}

Here, you give the tool a very specific address. The result will always go to the same place, every time. It's like saying, "Put this book in the 'Science Fiction' section, second shelf."


```json
// The tool's instructions lock _outputPath to one specific address
{
  "_outputPath": {
    "type": 'string',
    "const": "†data.user.summary"
  }
}
```

:::
::::

### Last Note Wins

Here’s a key rule: new notes are always **added to the end**; they don't change old ones. Think of it like a chat history—new messages appear at the bottom.

When the system needs to find a piece of information, like the user's name (`†data.user.name`), it looks through the notes from **newest to oldest**. The very first one it finds with the right label is the one it uses. This "last-write-wins" rule keeps things simple and ensures the agent always uses the most up-to-date information.

:::::details{title="Example: Writing and Finding Notes"}

**1. Starting Point**

The whiteboard starts with one note.

```json
[
  {
    "type": "data",
    "data": { "user": { "name": "Alex", "status": "active" } }
  }
]
```

**2. A Tool is Used**

A tool runs to change the user's status.

```json
// Tool call being run
{
  "_tool": "updateUserStatus",
  "newStatus": "inactive",
  "_outputPath": "†data.user.status"
}
```

**3. The Whiteboard After**

A new note is added to the end with the result.

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
    "_call": {
      "_tool": "updateUserStatus",
      "newStatus": "inactive",
      "_outputPath": "†data.user.status"
    },
    "_date": "2025-10-26T12:00:00Z"
  }
]
```

**4. Finding Information**

- To find `†data.user.status`, the system checks the last note first. It finds it right away and returns `"inactive"`.
- To find `†data.user.name`, the system checks the last note, but `name` isn't there. So, it checks the note before that. It finds it there and returns `"Alex"`.

:::::

The real magic happens when you combine :term[Variable References]{canonical="Variable Reference"} (reading data) with :term[Output Paths]{canonical="Output Path"} (writing data). You can create instructions that use information that doesn't even exist yet. For example, you can tell a tool to use an answer from a user before the user has even typed it.

This also lets you chain tools together, like an assembly line. You can tell Tool B to use the result from Tool A as its starting point. This creates a workflow where the output of one step becomes the input for the next.

## How This Connects to Other Parts

- **:term[Data Message]{canonical="Data Message"}:** The `:term[Output Path]{canonical="Output Path"}` is the main way to create these notes. It turns a simple tool into an action that changes the agent's memory, saving its result so other tools can use it.


  > Sidenote:
  > - :term[005: Agent/Data]{href="./005_agent_data.md"}

- **:term[State Message]{canonical="State Message"}:** While you can write a note anywhere, you'll usually write it to a special note called the :term[State Message]{canonical="State Message"}. This is the main whiteboard for the whole job, where tools share information and build on each other's work over many steps.


  > Sidenote:
  > - :term[009: Agent/State]{href="./009_agent_state.md"}

- **:term[Variable Reference]{canonical="Variable Reference"}:** An :term[Output Path]{canonical="Output Path"} is for *writing* data, and a :term[Variable Reference]{canonical="Variable Reference"} is for *reading* it. They are two halves of a whole, creating a complete circuit for information to flow from one tool to another.


  > Sidenote:
  > - :term[007: Agent/Variables]{href="./007_agent_variables.md"}

- **:term[Expressions]{canonical="Expression"}:** Expressions add logic to this circuit. You can use `||` (OR) and `&&` (AND) in an :term[Output Path]{canonical="Output Path"} to tell a tool to save its result in different places depending on what happens. It makes the workflow smart and adaptable.


  > Sidenote:
  > - :term[011: Agent/Expressions]{href="./011_agent_expressions.md"}

- **:term[Plan]{canonical="Plan"}:** A :term[Plan]{canonical="Plan"} is like a blueprint for a multi-step job. In that blueprint, the tools are the machines, and the :term[Output Paths]{canonical="Output Path"} are the conveyor belts that connect them, moving parts from one machine to the next.


  > Sidenote:
  > - :term[012: Agent/Plan]{href="./012_agent_plan.md"}

## From Temporary Notes to Long-Term Memory

The :term[Output Path]{canonical="Output Path"} is great for passing notes between tools during a single job. But to build truly smart agents that learn and remember things over time, we need a special kind of memory—one designed to last.

The next document, :term[009: Agent/State]{href="./009_agent_state.md"}, explains how this long-term memory works.
