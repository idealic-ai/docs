# 008: Agent/Output

> [!DEFINITION] [Output Path](./000_glossary.md)
> Think of `_outputPath` as a mailing address for information. It's a special instruction added to a :term[Tool Call]{canonical="Call"} that tells the agent's brain exactly where to save a tool's result. This makes the result easy to find and use in later steps.

> Sidenote:
> - You should know about:
>   - :term[004: Agent/Call]{href="./004_agent_call.md"}
>   - :term[007: Agent/Variables]{href="./007_agent_variables.md"}
> - What this helps you understand:
>   - :term[010: Agent/Loop]{href="./010_agent_loop.md"}

An agent produces two kinds of answers. First, there are the small, in-between results that tools figure out along the way. These are saved into the agent's short-term memory. Second, there's the one :term[Final Answer]{canonical="Final Output"} it gives you at the very end of its work.

## Saving to Memory with the :term[Output Path]{canonical="Output Path"}

An agent can use its memory like a temporary notepad, but the main way it saves information is by using the :term[Output Path]{canonical="Output Path"} instruction. When a tool finishes its job and has this instruction, the system adds its result as a new note in the agent's memory.

> Sidenote:
> Even though you can save to any data note, you'll most often use this to save information into the agent's special long-term memory, called the :term[State]{canonical="State Message" href="./009_agent_state.md"}, so it can remember things for a long time.

This new note is just like any other piece of data, but it also has two extra, hidden tags that the AI doesn't see:

- **`_call`**: A record of the exact :term[Tool Call]{canonical="Tool Call"} that created this note.
- **`_date`**: A timestamp showing the precise moment the note was saved.

This creates a perfect logbook of how the agent's memory was changed. It's super helpful for understanding the agent's thinking or fixing problems if something goes wrong.

### How to Set the Output Path

You can set the :term[Output Path]{canonical="Output Path"} in two different ways, giving you a choice between flexibility and predictability.

::::columns{.examples}
:::column{title="Flexible Path (AI Decides)"}

In this mode, the AI gets to decide where to save the result while it's working. This makes the tool very adaptable.

```json
// The tool's rules allow any valid address for _outputPath
{
  "_outputPath": {
    "type": "string",
    "description": "Where to save the user summary.",
    "pattern": "^†"
  }
}
```

:::
:::column{title="Fixed Path (Pre-Set)"}

This way forces the tool to be predictable. It will always save its result to the exact same, pre-decided location every time.

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

### Last-Note-Wins Rule

It's important to know that new notes are **added** to the memory, not blended with old ones. Imagine stacking new sticky notes on top of old ones. This keeps things simple and follows how we naturally work, where new information replaces old information.

When the agent needs to find a piece of information, like the user's name at `†data.user.name`, it looks through its memory from **newest to oldest**. It checks the top note first. If it finds the `user.name` there, it uses that value. If not, it moves to the note underneath it, and so on. This "last-note-wins" rule ensures the agent always uses the most up-to-date information without any confusion.

:::::details{title="Example: Adding and Finding Notes"}

**1. Starting Point**

The agent's memory starts with one note.

```json
[
  {
    "type": "data",
    "data": { "user": { "name": "Alex", "status": "active" } }
  }
]
```

**2. A Tool Does Its Job**

A tool is used to update the user's status.

```json
// The action being taken
{
  "_tool": "updateUserStatus",
  "newStatus": "inactive",
  "_outputPath": "†data.user.status"
}
```

**3. Memory After the Job**

The agent adds a new note to its memory with the tool's result. This new note also includes the hidden tags about which tool was used and when.

```json
[
  // The original note
  {
    "type": 'data',
    "data": { "user": { "name": "Alex", "status": "active" } }
  },
  // The new note added on top
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

- To find `†data.user.status`, the agent checks the newest (second) note first. It finds `user.status` and gets the answer: `"inactive"`.
- To find `†data.user.name`, the agent checks the newest note, but `user.name` isn't there. So, it checks the older (first) note. It finds it there and gets the answer: `"Alex"`.

:::::

### Planning with Placeholders

The real magic happens when you combine these memory addresses (:term[Output Paths]{canonical="Output Path"}) with the placeholder variables from the last lesson. You can set up a tool to work on information that doesn't exist yet. For example, a tool can be set up to use a piece of information from a user, even before the user has provided it. This lets you build reusable plans, like recipes.

You can even chain tools together. One tool can be told to use a placeholder that points to the saved result of a *previous* tool. This creates a step-by-step assembly line where the output of one tool becomes the input for the next one.

This gets even more interesting when you use special symbols in the :term[Output Path]{canonical="Output Path"} to create different kinds of plans.

::::columns
:::column{title="Splitting Paths (Branching)"}
Using `||` (which means "or") in an :term[Output Path]{canonical="Output Path"} lets a tool announce its possible outcomes. It's like a fork in the road. The tool decides which path to follow based on its result.

```json
// If the `verifyUser` tool succeeds, it saves the result to
// `data.user.verified`.
// If it fails, it saves the result to `data.user.failed` instead.
{
  "_tool": "verifyUser",
  "userId": "perfect-stranger",
  "_outputPath": "†data.user.verified || †data.user.failed"
}
```

:::
:::column{title="Copying to Multiple Paths"}
Using `&&` (which means "and") tells the system to copy the same result to more than one place at the same time.

```json
// Saves the same summary to both the `user` area and
// the `audit` area of the memory.
{
  "_tool": "generateSummary",
  "text": "Long body of text here...",
  "_outputPath": "†data.user.summary && †data.audit.summary"
}
```

:::
::::

## From Temporary Notes to Permanent Memory

The :term[Output Path]{canonical="Output Path"} system is a great way to manage information as it flows between different tools. But to build truly powerful agents that can remember things across many conversations and continue their work later, they need a special kind of long-term memory.

The next document, :term[009: Agent/State]{href="./009_agent_state.md"}, explains how this permanent memory works.
