# 012: Agent/Delegate

> [!DEFINITION] Delegate
> A way to run a task in its own separate, clean workspace. Think of it like hiring a specialist. When a task has a `_delegate` note on it, instead of doing the job yourself, you send it to an expert (another AI agent) who works in their own office. The `_scopes` property is a list of specific documents you give them so they have just the right information to do the job without seeing your messy desk.

> Sidenote:
> - You should know about:
>   - [004: Agent/Call](./004_agent_call.md)
> - Pairs well with:
>   - [013: Agent/Scopes](./013_agent_scopes.md)

The **Delegate** pattern is how we solve a big problem: how to make AI agents more powerful by letting them work together without getting in each other's way. It’s a system for letting one agent hand off a job to another, giving it a clean, private workspace to get the job done. This prevents confusion and lets us build complex AI behaviors out of smaller, reusable expert agents.

## The Problem: Giant Toolboxes and Messy Desks

As an AI agent learns to do more things, just dumping all its tools into one big toolbox becomes a bad idea.

1.  **Too Many Choices**: Imagine trying to pick the right screwdriver from a toolbox with thousands of tools. AI models (LLMs) have a limit to how many tools they can look at and understand at once. If there are too many, they get confused.
2.  **Messy Desks (Context Bleeding)**: When all tools are on the same desk, information from one task can accidentally influence another. It's like trying to write a history report when your math homework is sitting right on top of it — you might get your facts mixed up.
3.  **Hard to Share**: A tool designed for one agent's specific toolbox is hard to give to another agent. You'd have to bring the whole messy toolbox with it.

Delegation fixes this by creating **Isolated Workspaces**. It’s a way to hand off a task to an expert who works in their own clean office.

## How to Delegate a Task

You tell the system to delegate a task by adding a `_delegate` note to a tool's instructions. This note tells the system, "Don't do this job here. Send it to an expert."

The `_delegate` note is a simple piece of text that works in two ways:

- **Point to a Saved Expert**: The text can be a web link or a file path that points to another AI agent's complete instruction manual. This lets one tool hand off its work to a totally separate, pre-defined expert.

  > Sidenote:
  > A saved, reusable set of instructions (a `Request`) is the most common form of an `Idea`. The Delegate pattern is the main way to combine these `Ideas` to build bigger and more powerful systems. See [101: Concept/Idea](./101_concept_idea.md) for more.

- **Create a Temporary Expert**: If the text just says `'anonymous'`, it tells the system to create a brand new, empty workspace for this one task. It's like renting a clean, empty office for a single job.

## Working in a Clean Workspace

A delegate provides a "clean room" for a task. Instead of being done in the middle of the main agent's busy office, the task is handled in a quiet, separate space. The information in this new space isn't just copied over from the main office.

This is where **Scopes** are so important. Think of the `_scopes` note on the tool as a checklist of specific documents to send over to the expert. It lets the main agent decide exactly what information the delegate gets to see, preventing the "messy desk" problem and keeping everything neat and tidy.

> Sidenote:
> - [013: Agent/Scopes](./013_agent_scopes.md)

## Handling Huge, Complicated Tasks

Delegation also helps when a tool produces a very big or complicated result. Instead of making the main agent's instruction manual huge by including all the details of the result, you can create a simple tool with just the inputs and a `_delegate` note.

The AI can plan to use the tool knowing only what it needs to provide. The complicated result will be created inside the delegate's separate workspace. This lets an agent plan out a series of complex steps without needing to see every single tiny detail of every step at once. The agent trusts that the expert will do its job correctly and send back the right result.

## When to Call the Expert

Adding a `_delegate` note to a tool turns it into a request for an expert. But when does the system actually find and hire that expert? There are two ways to do it.

### 1. Hire at the Last Minute (The Default Way)

The most common and flexible way is to find the expert right when the job needs to be done, after the main agent has already decided what to do.

This method allows for something amazing that normal computer code can't do: **the AI acts like smart glue.** An agent can ask for a task to be done, but the details it provides might not perfectly match what the expert expects. When the job is handed off, the AI in the expert's workspace is smart enough to figure out what the original agent meant.

This is a huge benefit because experts can update how they work without breaking everything. Even if an expert changes its forms, other agents can still send them requests, and the expert's AI will try its best to adapt. This makes the whole system flexible and stops it from being rigid.

The process works like this:

1.  An agent decides to use a tool that needs an expert.
2.  The system sees the `_delegate` note and starts the hand-off process.
3.  **Gathering Info**: The system gets the expert's instruction manual. Then, it uses the `_scopes` note to copy over the specific information the expert needs from the main agent.
4.  **Mapping the Request**: The details of the task from the main agent are packaged up and given to the expert. This is where the "smart glue" happens. The expert's AI will figure out how to use the information it was given to do its job, even if the names and labels don't match perfectly.
5.  **Doing the Job**: A new, separate request is sent to the expert's workspace. The final result is sent back to the main agent.

### 2. Hire Before Starting (The Safe Way)

For situations where you need to be absolutely sure everything is perfect, you can find and prepare the expert **before** the main agent even starts its work.

In this mode, the system grabs the expert's instruction manual ahead of time and merges its requirements directly into the main agent's tool list. This means the main agent's AI can see the expert's exact requirements from the very beginning, ensuring the request it makes is perfectly formatted and correct. This can even include the exact format of the expert's final result.

This method is like using a strict, official form. You know exactly what you need to provide and what you'll get back. It's safer but less flexible. It's best for important jobs where you don't want any surprises.

:::::details{title="Example: Smart Glue for Sending a Message"}

This example shows how the "AI as smart glue" idea works. An expert can complete a job even if the request from the main agent doesn't perfectly match its own instructions. This is the normal, "last-minute" hiring behavior.

::::columns
:::column{title="What the Main Agent Does"}

A main agent needs to send a message. It knows about a `sendMessage` tool that hands the job off to an expert. Based on what it knows, it creates a request with `userId` and `text`, without knowing the expert's exact internal rules.

```json
// THE REQUEST FROM THE MAIN AGENT
{
  "_tool": "sendMessage",
  "_delegate": "http://example.com/experts/speaker_EN",
  "userId": "u_123",
  "text": "Hello, world!"
}
```

:::
:::column{title="What the Expert Sees"}

The `speaker_EN` expert is a separate agent. When it gets the job, the system packages the main agent's request into an `input` message. But look closely: the expert's own instructions expect `recipientId` and `messageBody`, not `userId` and `text`. The expert's AI is smart enough to bridge this gap. It understands that `userId` means the same thing as `recipientId` and maps them correctly. This isn't a simple code trick; it's the AI understanding the meaning.

```json
// FINAL INSTRUCTIONS FOR THE EXPERT'S WORKSPACE
[
  {
    "type": "system",
    "message": "You are an expert in messaging in English."
  },
  {
    "type": "input",
    // This is the info the main agent provided.
    "input": {
      "userId": "u_123",
      "text": "Hello, world!"
    },
    // This is the format the expert expects.
    "schema": {
      "type": "object",
      "properties": {
        "recipientId": { "type": "string" },
        "messageBody": { "type": "string" }
      }
    }
  }
]
```

:::
::::
:::::

:::details{title="Example: A Music Production Team"}

Delegates allow different AI agents to work together like a team. You can have high-level managers who focus on the big picture and delegate specific jobs to low-level experts.

Imagine a music workflow with two expert agents: a **`Composer`** and a **`Sound-Designer`**.

- The **`Sound-Designer`** is the technical expert. It's a focused agent that knows how to use digital instruments to create specific sounds.

- The **`Composer`** is the creative specialist. Its job is to write a song. It figures out the melody and structure, and then it delegates tasks to the `Sound-Designer` to actually create the sounds it needs.

This two-level team is a common setup. But the real power comes from how they can be managed dynamically.

Now, let's add a high-level **`Producer`** agent. The `Producer`'s job is to create a final, polished song. Depending on the goal, the `Producer` can manage its team in different ways:

> Sidenote:
> This setup allows for a flexible team. A high-level `Producer` can tell a `Composer` what to do, and the `Composer` will then manage a `Sound-Designer`. But the `Producer` can also skip the middleman and give orders directly to the `Sound-Designer` if needed.
>
> ```mermaid
> graph TD
>     Producer --> Composer
>     Producer --> SoundDesigner(Sound-Designer)
>     Composer --> SoundDesigner(Sound-Designer)
> ```

- **Team-Based Approach**: To create a song, the `Producer` might just give one big task to the `Composer` delegate, saying "I need a sad song." The `Composer` then does its whole job, including managing the `Sound-Designer` on its own. The `Producer` doesn't even need to know the `Sound-Designer` exists.

- **Direct Management Approach**: If the `Producer` also needs a specific sound effect, like a door slamming, it can give that task directly to the `Sound-Designer`, at the same time it's asking the `Composer` to write the music.

This shows the main idea: the team structure isn't fixed. The `Producer` can treat the `Composer` as a self-managing unit or it can step in and manage the individual experts directly, depending on what the project needs. This flexibility lets you combine the same group of experts in many different ways to get things done.

:::

## From Delegation to Scopes

Delegating a task gives it a clean workspace, but to be useful, an expert needs to get information from the agent that hired it. The `_scopes` property is the tool for this, acting as a secure bridge for sharing information. We'll explore exactly how that bridge works in the **Scopes** pattern.
