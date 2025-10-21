# 011: Agent/Instancing

> [!DEFINITION] :term[Instancing]{canonical="Instancing"}
> Think of this as giving a unique nametag to different pieces of information. This lets a computer work on many separate tasks at the same time within a single request, like a chef cooking several different meals at once.

> Sidenote:
> - Needs: :term[009: Agent/State]{href="/009_agent_state.md"}
> - Works with:
>   - :term[007: Agent/Input]{href="/007_agent_input.md"}
>   - :term[013: Agent/Scopes]{href="/013_agent_scopes.md"}
>   - :term[010: Agent/Plan]{href="/010_agent_plan.md"}

The **Instancing Protocol** is a clever way to help an AI agent do a lot more work at once. It lets the agent handle many separate jobs in a single request, without needing to change how the agent thinks. It works by attaching a unique ID, or a nametag, to each job's information (like its current :term[State]{canonical="State"} or starting :term[Input]{canonical="Input"}).

This means you can have one master :term[Plan]{canonical="Plan"} (like a recipe) and tell the AI to use it on a hundred different tasks all at once. It's a huge boost for speed and making sure the results are consistent.

## How Instancing Works

Instancing lets an agent process many separate jobs by adding a special layer on top of messages that carry data, like the :term[State]{canonical="State"} message. Instead of sending one :term[State]{canonical="State"}, you can send a whole list of them, where each one is a different task, or **Instance**.

To keep these tasks from getting mixed up, each :term[State]{canonical="State"} message is given a **unique ID** using a special `_instance` property. These IDs are like little nametags (for example, `①`, `②`) that help the AI know which task it's working on and keep everything organized.

Using Instancing is optional. You turn it on by adding the `_instance` nametag to a message like :term[State]{canonical="State"} or :term[Input]{canonical="Input"}. This tells the system, "Treat this as its own separate workspace." If a message doesn't have an `_instance` nametag, it's treated as a public announcement that all the tasks can see and use.

This method has big advantages:

- **Efficiency**: It lets the system do way more work in a single go. Instead of asking an AI the same question 100 times for 100 different things, you ask it once about all 100 things.
- **Consistency**: Because the AI sees all the related jobs at once, it can make smarter and more consistent decisions, just like a judge who can see a pattern across several similar cases.

## Working with Other Messages

The real power of this idea comes from how the `_instance` nametag changes how other messages behave.

- **:term[State]{canonical="State"}:** The :term[State]{canonical="State"} message is the heart of the system. Each :term[Instance]{canonical="Instance"} is just a :term[State]{canonical="State"} message with its own unique `_instance` nametag. This gives each task its own private workbench, so different jobs don’t get in each other's way.

  > Sidenote:
  > - :term[009: Agent/State]{href="/009_agent_state.md"}

- **:term[Input]{canonical="Input"}:** An :term[Input]{canonical="Input"} message can be used in two ways. An :term[Input]{canonical="Input"} without a nametag is a general instruction for *all* tasks. An :term[Input]{canonical="Input"} *with* a nametag is a specific instruction for just that one task, overriding any general instructions.

  > Sidenote:
  > - :term[007: Agent/Input]{href="/007_agent_input.md"}

- **:term[Scopes]{canonical="Scope"}:** The `_instance` nametag is crucial for keeping data private using :term[Scopes]{canonical="Scope"}. When an action (:term[Call]{canonical="Call"}) is aimed at a specific instance, its private data (`_scopes`) is also locked to that instance's workbench. This is how another agent, a :term[Delegate]{canonical="Delegate"}, can be asked to help with one of many tasks and only see the information it needs for that single job.

  > Sidenote:
  > - :term[013: Agent/Scopes]{href="/013_agent_scopes.md"}

:::details{title="Example: Checking Lots of Comments at Once"}

Instancing can turn an agent that does one task at a time into one that can handle huge batches. Imagine an AI agent whose job is to check if user comments follow the rules.

Without instancing, the agent would have to check each comment one by one. To review 100 comments, it would need to make 100 separate requests. This is slow, and the agent can't see the big picture, which might lead it to make different decisions on similar comments.

With the **Instancing Protocol**, all 100 comments are checked at the same time in one request.

1.  **Group the Inputs**: The agent gets a list of 100 :term[Input]{canonical="Input"} messages. Each one is given a unique `_instance` nametag and contains a different user comment.

    ```json
    // A batch of comments sent to the AI
    [
      {
        "type": "input",
        "_instance": "①",
        "comment": "This is a great post!"
      },
      {
        "type": "input",
        "_instance": "②",
        "comment": "I disagree with this..."
      },
      {
        "type": "input",
        "_instance": "③",
        "comment": "This is spam."
      }
      // ... and 97 more comments
    ]
    ```

2.  **One Plan for Everything**: The AI can now see all the comments at once. It might use a single :term[Plan]{canonical="Plan"} that says: first, figure out the feeling of the comment, then check it against a list of bad words. This same plan is used for all 100 comments at the same time.

3.  **Get Tagged Results**: The agent's final answer (:term[solution]{canonical="Solution"}) will be one big list of actions (:term[Calls]{canonical="Call"}), but each action is aimed at a specific comment using its `_instance` nametag.

    ```json
    // The answer from the AI
    {
      "calls": [
        {
          "_tool": "moderateComment",
          "_instance": "①",
          "decision": "approve"
        },
        {
          "_tool": "moderateComment",
          "_instance": "②",
          "decision": "approve"
        },
        {
          "_tool": "moderateComment",
          "_instance": "③",
          "decision": "reject"
        }
        // ... and 97 more decisions
      ]
    }
    ```

This gives us two big wins:

- **Speed**: What used to take 100 separate trips to the AI now happens in just one.
- **Consistency**: By seeing all the comments together, the AI gets more context. It can make fairer judgments and even spot patterns (like a spam attack) that would be impossible to see one comment at a time.

:::

:::::details{title="General Instructions for a Specific Task"}

This example shows how a general `Input` message can tell the agent to focus on one specific task within a big group. This allows you to control many parallel jobs in a smart way, like a manager giving a specific instruction to one employee.

::::columns
:::column{title="The Setup"}

Imagine a manager giving orders to employees. A single, general `input` is like a command from the manager, while multiple `state` messages with nametags are like different employees with their own to-do lists. This shows how an agent built to manage one thing can easily manage many things at once.

```json
[
  // A general instruction for a specific employee
  {
    "type": "input",
    "instruction": "Give employee B a new, high-priority task to 'Finalize the quarterly report'."
  },

  // The current status of all employees
  {
    "type": "state",
    "_instance": "employee_A",
    "task": "Draft initial proposal",
    "status": "In Progress"
  },
  {
    "type": "state",
    "_instance": "employee_B",
    "task": "Review team submissions",
    "status": "Blocked"
  }
]
```

:::
:::column{title="The Targeted Result"}

The AI reads the manager's command and understands it perfectly, even though it wasn't a tagged message. It creates an action (`Call`) aimed directly at `employee_B` using the `_instance` nametag. The other employee's work isn't affected at all.

```json
{
  "calls": [
    {
      "_tool": "updateTask",
      "_instance": "employee_B",
      "newTask": "Finalize the quarterly report",
      "newStatus": "High Priority",
      "output": "†state"
    }
  ]
}
```

:::
::::
:::::

## Working with Other Protocols

Instancing also works together with other system rules to control how things get done.

- **:term[Calls]{canonical="Call"}:** The `_instance` nametag on an action (:term[Call]{canonical="Call"}) is how you tell it which task to work on. It makes sure that any changes—like saving a result or reading information—happen on the correct workbench for that specific :term[Instance]{canonical="Instance"}.

  > Sidenote:
  > - :term[004: Agent/Call]{href="/004_agent_call.md"}

- **:term[Plan]{canonical="Plan"}:** The :term[Plan]{canonical="Plan"} itself doesn't use nametags; it's like a single master blueprint for all tasks. You can use one global plan with many different :term[State]{canonical="State"} messages, each with its own nametag. This lets you run the same process on many separate sets of data at the same time.

  > Sidenote:
  > - :term[010: Agent/Plan]{href="/010_agent_plan.md"}

## From a Plan to a Process

If a :term[Plan]{canonical="Plan"} is the recipe for a task, and :term[Instancing]{canonical="Instancing"} is the method for cooking many dishes at once, then a **:term[Process Idea]{href="/203_idea_process.md"}** is the final cookbook page that shows the recipe and a picture of all the finished dishes. It's the complete record of the plan and how it was carried out across all the different instances.