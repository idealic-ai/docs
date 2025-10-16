# 008: Agent/Variables

> [!DEFINITION] [Variable Reference](./000_glossary.md)
> A special kind of shortcut (`†<kind>.<path>`) that tells an AI agent where to find a piece of information it needs, without having to copy the information itself.

**Variables** are like sticky notes that let an AI agent work with information in a smart way. Imagine the agent has a workspace with different papers on it. Instead of rewriting a whole paragraph from one paper onto another, it just puts a sticky note on the new paper that says, "*See that paragraph over there.*"

Variables let the agent do two main things:

- **Reading:** Look at a sticky note to find information that's already in its workspace (like what the user just typed, or something it remembered from a previous step).
- **Writing:** After a tool does something, the agent can create a new piece of information and put a sticky note on it so it can find it later.

## Reading from the Workspace

When you ask an AI to use a tool, you can give it a **Variable** instead of the actual data. This is a special shortcut that points to information somewhere else in the agent's workspace.

This is much better than making the AI copy and paste big chunks of text. Copying is slow, costs more, and the AI might accidentally change something. Using a shortcut is fast, cheap, and perfectly accurate.

The shortcut looks like this: `†<kind>.<path>`. The dagger symbol (`†`) means "this is a shortcut." The `<kind>` tells it which paper to look at (like `input` for the user's message, or `state` for its own memory), and the `<path>` is like a specific instruction, such as `userName`, to find the exact piece of data.

> Sidenote:
> - Wikipedia: [Dagger (mark)](<https://en.wikipedia.org/wiki/Dagger_(mark)>)

::::columns
:::column{title="Tool instructions using a variable"}

```json
{
  "_tool": "greetUser",
  "userName": "†input.userName"
}
```

This tells the agent: "Use the `greetUser` tool. For the `userName`, don't use the text '†input.userName', but instead look in the `input` message to find the *actual* user's name and use that."

:::
:::column{title="What this looks like in code"}

```typescript
greetUser({
  userName: input.userName,
});
```

This is the same idea in regular code. It's using the `userName` value found inside the `input` object.

:::
::::

## Writing to the Workspace

To save the result of a tool, we can add a special instruction called `_outputPath`. This is just another shortcut that tells the agent's engine where to file away the result. This makes the information available for the next steps in the agent’s task. A common place to save things is in the agent's `State`, which is its long-term memory (for example, `†state.user.summary`).

> Sidenote:
> - [004: Agent/Call](./004_agent_call.md)

The `_outputPath` can be set up in two ways:

- **Flexible (AI Decides):** You can let the AI decide where to save the result. This is useful when the agent needs to be creative.
- **Specific (You Decide):** You can lock it down, forcing the tool to always save its result to the exact same place every time.

## Creating a Recipe Before You Have Ingredients

The real magic of Variables is that you can build a whole plan of action using information that you don't even have yet. For example, you can create a set of instructions that says, "When the user gives you their name, use *that name* to look up their profile."

This lets you chain tools together. The output from one tool becomes the input for the next. It’s like setting up a bucket brigade: the result from person #1 is passed directly to person #2.

You can even build a plan that handles different possibilities:

- **Different Paths (If/Then):** Using `||` (which means "or") lets you plan for different outcomes. For example: `"†state.success || †state.failure"`. This tells the tool, "When you finish, decide if you succeeded or failed, and put your result in the correct folder." The tool itself makes the choice.
- **Multiple Paths (Do both):** Using `&&` (which means "and") tells the engine to copy the result to several places at once. For example: `"†state.user.profile.summary && †state.audit.log.summary"` saves the same summary in both the user's profile and the system's log.

This ability to map out a whole workflow, including choices and parallel steps, before running anything is what allows an AI to create a complete `Plan`. The AI can show you the entire plan—like a flowchart—so you can approve it before it starts.

> Sidenote:
> - [010: Agent/Plan](./010_agent_plan.md)

## How Variables Fit with Everything Else

- **Data:** Variables are what make `Data` useful. They are the sticky notes that let the agent read from and write to the different papers (`Data` messages) in its workspace.

  > Sidenote:
  > - [006: Agent/Data](./006_agent_data.md)

- **Input:** Variables can point to information from the user's `Input`, which is how you create reusable plans that can work with different starting information each time.

  > Sidenote:
  > - [007: Agent/Input](./007_agent_input.md)

- **State:** The `State` is the agent's main scratchpad or memory. It's where results are usually saved so they can be remembered from one moment to the next.

  > Sidenote:
  > - [009: Agent/State](./009_agent_state.md)

- **Plan:** Variables are the glue that holds a `Plan` together. A `Plan` is really just a list of tool instructions connected by variables, where the output of one step becomes the input of another.

  > Sidenote:
  > - [010: Agent/Plan](./010_agent_plan.md)

## From Quick Connections to Lasting Memory

Variables are great for connecting tools during a single task. But for an agent to handle complex, multi-step jobs, it needs a more permanent memory—a place to keep track of things between tasks.

The next document, **[009: Agent/State](./009_agent_state.md)**, explains how this long-term memory works.
