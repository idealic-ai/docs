# 002: Agent/Tool

> **Tool**: It's like a description of a superpower that an artificial intelligence (an Agent) can use. When an Agent gets a task, it sees a list of all its "tools." It picks the right one and fills it out to take action. It’s like picking an app on your phone and typing in what you need. — [Glossary](./000_glossary.md)

> Sidenote: > Sidenote:
> > 
> > *   Helps to understand: [001: Agent/Request](./001_agent_request.md)
> > *   Next up: [003: Agent/Activity](./003_agent_activity.md)

This paper explains what Tools are. They are a super important idea that helps Agents understand what they can do and how to use their abilities.

## What are Tools?

Imagine an Agent is a superhero. **Tools are its superpowers.** Without them, it can only talk. With Tools, it can do real things: search the internet, draw pictures, or check the weather.

Tools give an Agent:

- **Clear Instructions**: Every Tool is like a manual for a superpower. The Agent reads it and understands what it does and what information it needs to work.
- **Reliability**: The manual is very specific about what you need to give it (like a city for a weather forecast) and what you'll get back (the temperature and if it's cloudy). No guesswork!
- **The Ability to Combine**: An Agent can use several Tools together to solve complex problems, like building something cool out of LEGO bricks.
- **The Power to Choose**: When an Agent gets a new task, it looks at all its available Tools and decides which one is the best for the job.

When an Agent picks a Tool and fills in the details (like choosing "search for pictures" and typing in "cute kitten"), this is called a **Call**. A Call is the command that says, "Do this right now!" (You can learn more about this in the [004: Agent/Call](./004_agent_call.md) paper).

> Sidenote: You can give an Agent any task as a simple "Idea." But Tools are for more advanced stuff, where the Agent has to figure out *how* to do something. Think of an "Idea" as just saying "draw a cat," while a "Tool" is like giving the Agent a paint palette and brushes so it can decide for itself how to draw it.

## When You Should Use Tools

Tools are necessary when an Agent needs to:

- **Decide for itself what to do** based on the situation.
- **Choose from several different options** to solve a problem (like, should it search Google or a different search engine?).
- **Use different programs** that can do the same basic thing (like two different apps for drawing).
- **Mix its own "thinking" with running real programs** to make smart decisions.

## How the Tool System Works

### The Main Idea: The Instructions are Separate from the Action

The most important rule is that **a Tool is just an instruction manual**. It describes what *can* be done, but it doesn't actually do anything itself. It's like a recipe in a cookbook. The actual cooking is done either by the Agent using its own "brain" (this is called implicit execution) or by a special program called an **[Activity](./003_agent_activity.md)**.

A Tool's instruction manual includes:

- **What it does** (for example, "finds pictures on the internet")
- **What it needs to work** (what information you have to give it)
> Sidenote: > Sidenote about extensions:
> > 
> > *   `_instance`: See [011: Agent/Instancing](./011_agent_instancing.md)
> > *   `_module`: See [009: Agent/Module](./009_agent_module.md)
- **What it will give you back** (what the result will look like)
- **What it's called** (a unique name, like `image_search`)
- **Who does the work** (if a special program is needed, its name goes here)

### Special Fields in the Instructions

In the instructions, you'll see special fields that start with an underscore `_`. Think of these as notes in the margin just for the system.

- **`_tool`**: The name of the Tool (this is required).
- **`_activity`**: This points to the special "Activity" program that should do the work.
- **`_output`**: This describes what the final result will look like.
- **`_reasoningForCall`**: The Agent writes a note to itself here explaining why it chose this specific Tool.

Regular fields without an `_` are the things you need to fill in for the tool to work. The special system fields always come first.

### What the System Manages

The Tool system is like the operating system on your phone. It:

- Keeps a list of all the Tool "instruction manuals" (like your list of apps).
- Helps the Agent fill in the right information.
- Decides who will do the task: the Agent using its own intelligence, or a special "Activity" program.

More complicated things, like managing a whole chain of actions, are built on top of this basic system.

## How to Describe a Tool

Tools are described in a special computer language called JSON Schema. Here's an example of a Tool that figures out the mood of a sentence. It doesn't need an outside program because the Agent is already good at understanding language. It will perform this task "implicitly"—that is, using its own brain.

```typescript
Tool.register('sentimentAnalysis', {
  type: 'object',
  description: 'Analyzes the sentiment of a piece of text',
  properties: {
    _tool: { type: 'string', const: 'sentimentAnalysis' },
    text: { type: 'string', description: 'The text to analyze' },
    _output: {
      type: 'object',
      properties: {
        sentiment: { type: 'string' },
        confidence: { type: 'number' },
      },
    },
  },
});
```

## Choosing a Tool and Making a Call

The power of Tools comes from the Agent's ability to choose between them. The system shows the Agent a list of all available instruction manuals. The Agent reads them and decides which one is the best fit for its current task. Once it picks a Tool and fills in all the required information, it creates a **Call**. This is a command that's ready to be executed.

> Sidenote: > Sidenote: A specific request to perform an action is called a **Call**. You can read about it here: [004: Agent/Call](./004_agent_call.md).
>

## "Implicit" vs. "Explicit" Execution

A Tool's instruction manual is just text. The action it describes can be carried out in two different ways.

1.  **Implicit Execution**: The Agent uses its own "brain" to figure out the answer. This is great for tasks that involve language or knowledge, like "Summarize this article" or "Is this customer review positive or negative?"

2.  **Explicit Execution**: For tasks that require doing something in the outside world (like searching the internet or checking the weather), the Tool is linked to a real program. This program is called an **Activity**.

Separating the instructions (**Tool**) from the actual worker (**Activity**) is a really smart design. It lets the Agent think about its abilities in a general way, and it lets programmers easily change or update the programs themselves without having to change the instructions.

The next paper, **[003: Agent/Activity](./003_agent_activity.md)**, will explain exactly how "Activities" get the work done for "Tools."