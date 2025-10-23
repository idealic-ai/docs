# 013: Agent/Scopes

> [!DEFINITION] [Scope](../../acts/000_glossary.md)
> Think of a scope as a set of blinders for an AI. It's a rule that lets a task see only a specific part of the information it needs, blocking out everything else. The `_scopes` property is like a VIP list, saying exactly what data a :term[Call]{canonical="Call"} is allowed to look at.

> Sidenote:
> - You should know about:
>   - :term[002: Agent/Tool]{href="./002_agent_tool.md"}
>   - :term[004: Agent/Call]{href="./004_agent_call.md"}

The **:term[Scoped context]{canonical="scope"}** idea is a core rule for managing what an AI can see when it performs a task, or :term[Call]{canonical="Call"}. In a big AI system, a task doesn't just happen on its own; it needs information from its surroundings, like what a user asked for, what happened in previous steps, or the current situation. Scopes provide a safe and clear way to control what information gets passed along.

By limiting what the AI sees, scopes make the system safer, prevent it from accidentally sharing private data, and help the AI focus. This makes its actions more predictable and saves money. This controlled view is also a key reason why different parts of the system, like :term[Ideas]{canonical="Idea"} and :term[Activities]{canonical="Activity"}, can be built like self-contained and reusable tools. This document explains how scopes work and how they fit together with other AI abilities.

## Giving vs. Asking For Information

Depending on how you set up the `_scopes` rule, the AI can either be **given** the information it needs automatically, or it can **ask for** it when it's running.

> Sidenote:
> ```mermaid
> graph TD
>     subgraph All Available Information
>         direction LR
>         input("User's Input")
>         state("Current Situation")
>     end
>
>     subgraph The AI's Command
>         direction LR
>         filter{{"Scope: only 'input' allowed"}}
>     end
>
>     input --> filter
>     state -.-> filter
>
>     subgraph Information for the Tool
>         Execute(Run the Tool)
>     end
>
>     filter --> HITL{{A human can check here}}
>     HITL --> Execute
>
>     classDef unused stroke-dasharray: 5, 5, stroke:#aaa, color:#aaa
>     class state unused
>     classDef optional stroke-dasharray: 5, 5
>     class HITL optional
> ```

- **Static Scopes (Giving Information)**: If the `_scopes` rule has a `const` (constant) value, it means the information is pre-approved and **given**. The programmer has decided ahead of time the exact information the tool is allowed to see.

  ```json
  {
    "_scopes": {
      "const": ["input"]
    }
  }
  ```

- **Dynamic Scopes (Asking For Information)**: The `_scopes` rule can also be flexible, which lets the AI **ask for** the information it needs. The AI looks at the situation and decides which of the allowed pieces of info it needs to do its job.

  ```json
  {
    "_scopes": {
      "type": "array",
      "items": {
        "enum": ["state", "input"]
      }
    }
  }
  ```

  This asking pattern is really useful when you have a person check the AI's work. The AI can ask, "Can I see this piece of information?" and a human can approve it, adding an important layer of safety and control.

## How Scopes Help Different Tasks Work Together

The `_scopes` property is the main way to control what an AI :term[Call]{canonical="Call"} can see. It's like a permission slip that filters out all the unneeded information, giving the task a very limited and focused view. This is essential for how different kinds of tasks work, from simple thinking to using pre-built tools.

- **Latent Execution (AI Thinking)**: When the AI is just thinking and figuring things out, `_scopes` act like a friendly **hint** to focus its attention on the important stuff. It's a gentle guide, not a strict rule, but it's very helpful for making the AI's thinking more reliable and cheaper by cutting out distracting information. See the [Focusing on the Right User](#example-disambiguation-with-scopes) example.

  > Sidenote:
  > - :term[002: Agent/Tool]{href="./002_agent_tool.md"}.

- **Explicit Execution (Using a Tool)**: When a :term[Call]{canonical="Call"} uses a pre-programmed tool, or :term[Activity]{canonical="Activity"}, the scope's job is much more direct. The information it points to is handed directly to the tool as a package of extra data. This gives the tool all the context it needs to work, even if that info wasn't directly part of the AI's main command. See the [Giving a Tool Extra Information](#example-providing-context-to-an-activity) example.

  > Sidenote:
  > - :term[003: Agent/Activity]{href="./003_agent_activity.md"}.

- **Instancing (Working on a Batch)**: Imagine you ask the AI to do the same task on a list of 10 items. Scopes make sure that when the AI is working on item #5, it only sees the information for item #5. This is super important to keep data separate and prevent information from one task from spilling over and confusing another. It's like giving each worker their own separate desk with only their assigned papers.

  > Sidenote:
  > - :term[011: Agent/Instancing]{href="./011_agent_instancing.md"}

- **Delegated Isolation (Asking another AI for Help)**: When one AI agent asks a specialized agent (a :term[Delegate]{canonical="Delegate"}) to handle a task, scopes act like a gatekeeper. They decide what information from the first agent's world gets **added** to the specialist's world. Nothing gets through unless it's on the list, making sure the specialist agent works in its own secure bubble. See the [Giving Information to a Specialist Agent](#example-scoping-a-delegates-context) and [Handling Batches with Specialist Agents](#example-instancing-with-scoped-delegates) examples.

  > Sidenote:
  > - :term[012: Agent/Delegate]{href="./012_agent_delegate.md"}

The `_scopes` property is the bridge that connects a task to the information it needs. We've seen how this one simple idea changes its role for different situations—from gently guiding the AI's thoughts to strictly defining the information for a specialist tool. This flexibility is what makes it a key part of building smart, safe, and well-organized AI systems.

## Examples

:::::details{title="Example: Focusing on the Right User"}

::::columns
:::column{title="Confusing Situation"}

In this example, the situation is confusing. There are two users: the `currentUser` (Alice) who is using the app, and a `mentionedUser` (Bob) in her message. The AI is asked to send a message, but it's not clear to whom.

```json
[
  {
    "type": "state",
    "currentUser": { "id": "user_A", "name": "Alice" }
  },
  {
    "type": "input",
    "mentionedUser": { "id": "user_B", "name": "Bob" },
    "instruction": "Send a welcome message to the user mentioned above."
  }
]
```

:::
:::column{title="`Call` with a Scope"}

By adding `_scopes: ["input"]`, the person making the request gives the AI a big clue. It tells the AI to only pay attention to the `input` message. This clears up the confusion and makes sure the message is sent to the right person, Bob.

```json
{
  "_tool": "sendMessage",
  "_scopes": ["input"],
  "recipientId": "user_B",
  "message": "Welcome, Bob!"
}
```

:::
::::
:::::

:::::details{title="Example: Giving a Tool Extra Information"}

Here, a pre-programmed tool (:term[Activity]{canonical="Activity"}) needs to know something that isn't one of its main inputs. The `logEvent` tool only asks for an `eventName`, but the code behind it also needs to know the `userId` to work properly.

::::columns
:::column{title="`Call` with a Scope"}

The :term[Call]{canonical="Call"} is simple; it just gives the `eventName`. But the `_scopes: ["state"]` part tells the system to also hand the entire `state` object to the tool.

```json
{
  "_tool": "logEvent",
  "_scopes": ["state"],
  "eventName": "user_login"
}
```

:::
:::column{title="How the Tool's Code Works (TypeScript)"}

The tool is set up so its code can grab information directly from both the main command and the extra scoped data. This gives it easy access to both the `eventName` and the `userId` from the state.

```typescript
// The code is set up to grab 'eventName' from the main command
// and 'state' from the extra scoped information.
Activity.register('logEvent', async ({ eventName }, { state }) => {
  const userId = state.userId;
  await analytics.track(eventName, { userId });
});
```

:::
::::
:::::

:::::details{title="Example: Giving Information to a Specialist Agent"}

When one agent asks another for help, `_scopes` decide what information from the first agent gets *added* to the specialist's own world. Here, a main `Orchestrator` agent asks a specialized `Summarizer` agent to do a task, passing it the whole `state` object.

::::columns
:::column{title="Main Agent's `Call` with Scope"}

The `Orchestrator` agent has its own information. When it calls for help, it uses a scope to include its `state` so the specialist can see it.

```json
// The Orchestrator's information and its call for help
[
  {
    "type": "state",
    "articleText": "A long and complex article..."
  },
  {
    "_tool": "summarizeArticle",
    "_delegate": "SummarizerAgent",
    "_scopes": ["state"]
  }
]
```

:::
:::column{title="Specialist Agent's View"}

The `Summarizer`'s world is built from its own internal rules plus the specific information passed to it by the main agent. This lets agents be separate and specialized while still sharing the info they need to work together.

```json
// The information the Summarizer sees for its task
[
  // The Summarizer's own built-in instructions
  {
    "type": "system",
    "message": "You are an expert summarizer."
  },
  // The scoped information from the main agent is added
  {
    "type": "state",
    "articleText": "A long and complex article..."
  }
]
```

:::
::::
:::::

:::::details{title="Example: Handling Batches with Specialist Agents"}

This example shows how `_scopes` and `_instance` work together so one main agent can manage several separate tasks by specialist agents all at once.

::::columns
:::column{title="Main Agent's Data & Plan"}

The main agent has two different pieces of text to translate, marked as instance `①` and `②`. It creates a plan with two `Calls` to a `translatorDelegate` specialist. Each call points to a different instance and correctly includes only the `state` for that specific instance.

```json
// MAIN AGENT'S DATA
[
  { "type": "state", "_instance": "①", "text": "Hello" },
  { "type": "state", "_instance": "②", "text": "Bonjour" }
]

// THE AI'S PLAN
{
  "calls": [
    {
      "_tool": "translate",
      "_delegate": "translatorDelegate",
      "_instance": "①",
      "_scopes": ["state"]
    },
    {
      "_tool": "translate",
      "_delegate": "translatorDelegate",
      "_instance": "②",
      "_scopes": ["state"]
    }
  ]
}
```

:::
:::column{title="Specialist Agents' Views"}

The system automatically creates two separate jobs. The `_instance` and `_scopes` rules work together to make sure that each specialist only gets the information for its assigned task.

```json
// INFORMATION FOR SPECIALIST ①
[
  { "type": "system", "message": "You are a translator." },
  { "type": "state", "text": "Hello" }
]

// INFORMATION FOR SPECIALIST ②
[
  { "type": "system", "message": "You are a translator." },
  { "type": "state", "text": "Bonjour" }
]
```

:::
::::
:::::
