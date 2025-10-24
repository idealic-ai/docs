# 011: Agent/Plan

> [!DEFINITION] [Plan](./000_glossary.md)
> Think of a Plan as a recipe or a game plan for an AI agent. It's a list of steps using different :term[Tools]{canonical="Tool"} that tells the agent what to do. This plan isn't set in stone; the agent can change it as it learns new things.

> Sidenote:
> - You'll want to know about:
>   - :term[004: Agent/Call]{href="./004_agent_call.md"}
>   - :term[010: Agent/Loop]{href="./010_agent_loop.md"}
>   - :term[007: Agent/Variables]{href="./007_agent_variables.md"}
>   - :term[009: Agent/State]{href="./009_agent_state.md"}
>   - :term[012: Agent/Instancing]{href="./012_agent_instancing.md"}

The :term[Plan]{canonical="Plan"} is the secret to how the AI works step-by-step. The agent looks at the current situation (the :term[State]{canonical="State"}) and its game plan (the :term[Plan]{canonical="Plan"}) to figure out exactly where it is and what to do next. This helps the agent be really smart and flexible. It can follow the plan, add new steps to it, or even throw the whole plan away and start over if something unexpected happens. It's like a detective who can either follow their original clues or create a new strategy when they find a surprising piece of evidence.

## How a Plan is Formed

The steps in the plan are connected, not by drawing lines, but by passing information between them using a shared notepad called the :term[State]{canonical="State"} object.

- **Steps (:term[Tool Calls]{canonical="Tool Call"}):** Each step in the plan is an action the agent will take, like using a specific :term[Tool]{canonical="Tool"}.
- **Connections (:term[State]{canonical="State"} Object):** The connections are made when one step writes a result onto the notepad, and the next step reads it. For example, one :term[Tool]{canonical="Tool"} might write its answer on a line called `:term[Output Path]{canonical="Output Path"}`. Another :term[Tool]{canonical="Tool"} can then use that answer by looking at the same line, using a **:term[Variable Reference]{canonical="Variable Reference"}**.

  > Sidenote:
  > - [008: Agent/Output](./008_agent_output.md)

This creates a clear order: the second step can't start until the first one has finished and written its result on the notepad.

For example, if the plan is to get a user's profile and then write a summary of it, it would have two steps:

:::div{.limited-width}

```json
[
  {
    "_tool": "fetchUserProfile",
    "userName": "Alice",
    "_outputPath": "†state.userProfileData"
  },
  {
    "_tool": "summarizeProfile",
    "profile": "†state.userProfileData",
    "_outputPath": "†state.profileSummary"
  }
]
```

> Sidenote:
> ```mermaid
> graph TD
>     state_var{{"Notepad: user.profile"}}
>
>     Call1["Get User Profile"]
>     Call2["Summarize Profile"]
>
>     Call1 -- writes to --> state_var
>     state_var -- read by --> Call2
> ```

:::

Here, the `summarizeProfile` step depends on the result from `fetchUserProfile`. This creates a simple two-step plan.

## The Plan's Content: A Flowchart for Data

A :term[Plan]{canonical="Plan"} is basically a flowchart showing how data moves from one step to the next. This flowchart shows the agent's strategy as a series of connected actions. By setting up the plan this way, the system knows exactly which steps depend on others, making it easy for the agent's :term[Execution Loop]{canonical="Execution Loop"} to read and follow the instructions.

> Sidenote:
> A :term[Plan]{canonical="Plan"} can handle more than just simple to-do lists. It can create branching paths where the next step depends on the answer to a question:
>
> ```mermaid
> graph TD
>     A[Get Weather] --> B{Is it Sunny?};
>     B -- Yes --> C[Find a Park];
>     B -- No --> D[Find a Movie];
>     C --> E[Show Suggestion];
>     D --> E[Show Suggestion];
> ```

This flowchart structure is very useful. An agent could also be asked to create a flowchart that isn't a plan of action, but a picture of something else—like a map of a friend group, a diagram of a computer program, or the layout of a database.

It's important to know the difference. Even if these diagrams look like plans, they aren't *actual* plans unless they are given to the agent as a list of instructions to carry out. This avoids mix-ups between just drawing a picture of something and creating a real to-do list for the agent.

While a :term[Plan]{canonical="Plan"} can be used for brainstorming or just “thinking out loud,” its main job in this system is to create a list of steps that the agent can actually follow. To do this, we use a special kind of flowchart called a **Directed Acyclic Graph (DAG)**, where every box in the chart is a :term[Tool Call]{canonical="Tool Call"}.

A DAG has a few simple rules that make it perfect for getting things done:

- **Graph:** This is the whole plan—all the steps (the boxes) and the data that connects them (the arrows).
- **Directed:** The connections only go one way. A step that creates information has to come *before* a step that uses it.
- **Acyclic:** The flowchart can't have any loops that lead back to the beginning. This rule is very important because it stops the agent from getting stuck in an endless circle. The system always checks for loops before running a plan.

> Sidenote:
> To do something over and over again, like in a "for loop," the system uses a clever trick. A main :term[Plan]{canonical="Plan"} keeps track of the loop (like how many times to repeat). For each repetition, it starts a smaller, separate mission (a :term[Delegate]{canonical="Delegate"}). This mini-mission has its own simple, one-time :term[Plan]{canonical="Plan"} to do the actual work. This makes sure that loops are built in a safe and clear way, without creating endless circles.

## Separating the Planning from the Doing

The best thing about this system is that it completely separates planning what to do from actually doing it. Because a :term[Plan]{canonical="Plan"} is just a set of instructions, an agent can map out the entire flowchart of steps *before* a single line of code is run.

The AI acts as the planner, putting together the list of actions for the mission. This list of instructions can then be:

- **Checked:** The system can look for mistakes, like loops or other problems.
- **Simulated:** You can do a "dry run" to see what might happen without actually doing anything.
- **Sent for Approval:** The :term[Plan]{canonical="Plan"} can be shown to a person to check, change, or approve before it starts. This is a great way to make sure everything is safe and correct.

Actually doing the steps is handled by the :term[Execution Loop]{canonical="Execution Loop"}, which reads the :term[Plan]{canonical="Plan"} and runs the actions in the right order, updating the :term[State]{canonical="State"} notepad as it goes.

## The Plan as a Living Strategy

A :term[Plan]{canonical="Plan"} isn't just a fixed to-do list; it's a living strategy that can be updated at every turn. When an agent first comes up with a list of actions, it's just a suggestion. It only becomes a real :term[Plan]{canonical="Plan"} when it's passed into the *next* step of the loop as the official game plan.

This cycle turns a one-time idea into an ongoing mission:

- The **:term[context]{canonical="context"}** for a new step includes the current situation (:term[State]{canonical="State"}) and the game plan (:term[Plan]{canonical="Plan"}) from the last step.
- The **:term[solution]{canonical="Solution"}** that the AI comes up with contains a new list of actions which becomes the **new :term[Plan]{canonical="Plan"}** for the next round.

This process allows the agent to think ahead but also react to what's happening. It can follow the existing :term[Plan]{canonical="Plan"}, but it can also change it if something goes wrong. For example, if a :term[Tool]{canonical="Tool"} fails, the agent can create a new :term[Plan]{canonical="Plan"} with steps for handling the error. This makes the system tough and quick to adapt.

:::::details{title="Example: Planning one step ahead"}

This example shows how a `Plan` acts like a guide, keeping the agent on the right track even when other options are available.

**Scenario:** A customer support agent needs to give a customer a refund. The standard way to do this is to first check their past purchases and then issue the refund.

**1. First Step**

The process starts with the customer's request. Based on this, the AI creates a standard two-step `Plan` for the refund. This is the normal, expected way to handle it.

::::columns
:::column{title="What the Agent Sees First"}

```json
// Agent.Request(config, schema, context)
{
  "schema": {
    "type": 'object',
    "properties": {
      "calls": { "type": 'array' },
      "output": {
        "type": 'object',
        "nullable": true,
        "properties": {
          "confirmationId": { "type": 'string' },
          "message": { "type": 'string' }
        }
      }
    }
  },
  "context": [
    {
      "type": 'input',
      "request": "I'd like a refund for my last order.",
      "customerId": "cust_123",
      "amount": 50.0
    }
  ]
}
```

:::
:::column{title="The AI's First Plan"}

```json
{
  "calls": [
    {
      "_tool": "checkBillingHistory",
      "customerId": "†input.customerId"
    },
    {
      "_tool": "issueRefund",
      "customerId": "†input.customerId",
      "amount": "†input.amount"
    }
  ],
  "output": null
}
```

:::
::::

**2. Next Step in the Process**

The system runs the `checkBillingHistory` action and updates its notepad (the :term[State]{canonical="State"}). The history shows something tricky, like a previous problem with a payment. An agent without a plan might get confused and use a different tool, like `escalateToSupervisor`.

However, because the `Plan` is included, the agent knows what it's supposed to do next. It combines what it *knows* (the tricky situation) with what it *should do* (the `Plan`), and understands it's still on the right path. So, it sticks to the plan.

::::columns
:::column{title="What the Agent Sees Next"}

```json
[
  {
    "type": "state",
    "billingHistory": {
      "orders": 5,
      "lastChargeback": "2025-09-10"
    }
  },
  {
    "type": "plan",
    "plan": [
      {
        "_tool": "checkBillingHistory",
        "customerId": "†input.customerId"
      },
      {
        "_tool": "issueRefund",
        "customerId": "†input.customerId",
        "amount": "†input.amount"
      }
    ]
  }
]
```

:::
:::column{title="The AI's Next Action"}

```json
{
  "calls": [
    {
      "_tool": "issueRefund",
      "customerId": "†input.customerId",
      "amount": "†input.amount"
    }
  ],
  "output": {
    "confirmationId": "refund_xyz789",
    "message": "The refund has been processed successfully."
  }
}
```

:::
::::

The `Plan` makes sure the agent follows the correct procedure instead of getting sidetracked, keeping everything consistent.

:::::

:::::details{title="Example: Changing a Plan"}

This example shows how an agent can change its :term[Plan]{canonical="Plan"} when it gets new information, by picking a better tool for the job.

::::columns
:::column{title="The Situation"}

The agent has a simple plan to book a flight and a hotel. But then the user adds a new piece of information.

```ts
[
  { type: 'tool', tool: Tool.bookFlight },
  { type: 'tool', tool: Tool.bookHotel },
  { type: 'tool', tool: Tool.findPetFriendlyHotel },
  {
    type: 'plan',
    plan: [
      {
        _tool: 'bookFlight',
        destination: '†input.destination',
      },
      {
        _tool: 'bookHotel',
        destination: '†input.destination',
      },
    ],
  },
  {
    type: 'input',
    destination: 'Berlin',
    instruction: "Actually, I'll be traveling with my dog.",
  },
];
```

:::
:::column{title="The AI's New Plan"}

The AI realizes the old plan won't work. It throws it out and makes a new one, swapping `bookHotel` with a tool that's better for the new situation.

```json
{
  "calls": [
    {
      "_tool": "bookFlight",
      "destination": "†input.destination"
    },
    {
      "_tool": "findPetFriendlyHotel",
      "destination": "†input.destination"
    }
  ],
  "output": null
}
```

:::
::::

The agent didn't just tweak a detail; it completely changed its strategy by choosing a more suitable tool (`findPetFriendlyHotel`) because of the new information. This new list of actions becomes the official `Plan` for the next step.

:::::

:::::details{title="Example: Handling a Problem"}

This example shows how an agent can change its :term[Plan]{canonical="Plan"} when something goes wrong. We'll see how it creates a simple plan first, and then what it does when that plan fails.

**1. The Original Plan**

The agent gets a request and creates a hopeful, two-step plan that assumes everything will go perfectly.

::::columns
:::column{title="The Starting Point"}

```ts
Agent.Request(config, {
  schema: {
    type: 'object',
    properties: {
      calls: { type: 'array' },
      output: {
        type: 'object',
        nullable: true,
        properties: {
          status: {
            type: 'string',
            enum: ['Success', 'Failed'],
          },
        },
      },
    },
  },
  context: [
    { type: 'tool', tool: 'Tool.processPayment' },
    { type: 'tool', tool: 'Tool.confirmOrder' },
    { type: 'tool', tool: 'Tool.reportFailure' },
    { type: 'input', amount: 50.0 },
  ],
});
```

:::
:::column{title="The Hopeful Plan"}

```json
{
  "calls": [
    {
      "_tool": "processPayment",
      "amount": "†input.amount",
      "_outputPath": "†state.receipt || †state.error"
    },
    {
      "_tool": "confirmOrder",
      "receipt": "†state.receipt"
    }
  ],
  "output": null
}
```

:::
::::

**2. When Things Go Wrong**

The system tries to run `processPayment`, but it fails. An error message is added to the notepad (`†state.error`). When the agent takes its next turn, it sees the error message and the old, useless plan. It realizes it needs a new plan to deal with the problem.

::::columns
:::column{title="What the Agent Sees After the Failure"}

```json
[
  {
    "type": "state",
    "error": { "code": "card_declined", "message": "Your card was declined." }
  },
  // The original, now-useless plan is still there
  {
    "type": "plan",
    "plan": [
      { "_tool": "processPayment", "_outputPath": "†state.receipt || †state.error" },
      { "_tool": "confirmOrder", "receipt": "†state.receipt" }
    ]
  }
]
```

:::
:::column{title="The New Plan"}

```json
{
  "calls": [
    {
      "_tool": "reportFailure",
      "error": "†state.error"
    }
  ],
  "output": { "status": "Failed" }
}
```

:::
::::

The agent saw the `error` on its notepad, ignored the old plan, and made a new, single-step plan to `reportFailure`. This shows how the agent can react and handle problems as they happen.

:::::

:::::details{title="Example: Using a Blueprint to Make a Plan"}

This example shows how giving the AI a blueprint (a `schema`) for the notepad helps it create a perfect :term[Plan]{canonical="Plan"} from the start.

::::columns
:::column{title="The Situation with a Blueprint"}

The person making the request gives the agent an `Input` and a `State` message that contains only a `schema`. This blueprint defines all the pieces of information the plan will need to create, like empty slots to be filled in.

```json
[
  { "type": "tool", "tool": "Tool.detectLanguage" },
  { "type": "tool", "tool": "Tool.isEnglish" },
  { "type": "tool", "tool": "Tool.translateText" },
  {
    "type": "input",
    "text": "Bonjour le monde"
  },
  {
    "type": "state",
    "schema": {
      "type": "object",
      "properties": {
        "language": { "type": "string" },
        "isEnglish": { "type": "boolean" },
        "translatedText": { "type": "string" }
      }
    }
  }
]
```

:::
:::column{title="The AI's Perfect Plan"}

The AI uses the blueprint as a guide to build a correct plan. It knows exactly how to connect the output of one tool to the input of the next because the slots are already defined.

```json
{
  "calls": [
    {
      "_tool": "detectLanguage",
      "text": "†input.text",
      // The AI knows to use this label from the blueprint.
      "_outputPath": "†state.language"
    },
    {
      "_tool": "isEnglish",
      // It knows to get the information from the previous step.
      "language": "†state.language",
      "_outputPath": "†state.isEnglish"
    },
    {
      "_tool": "translateText",
      "text": "†input.text",
      "isEnglish": "†state.isEnglish",
      "_outputPath": "†state.translatedText"
    }
  ],
  "output": null
}
```

:::
::::

By providing a `schema`, the person gives the AI a clear map for how the information should flow. The AI doesn't have to guess the names of the slots or the order of the steps; it just fills in the blanks, which leads to a much more reliable `Plan`.

:::::

This cycle of planning and doing is the heart of a :term[Process]{href="./203_idea_process.md"}. It's a complete snapshot of a task, including the :term[Tools]{canonical="Tool"} it can use, the current :term[State]{canonical="State"} of things, and the :term[Plan]{canonical="Plan"} it's following.

## From a Single Plan to Reusable Recipes

A :term[Plan]{canonical="Plan"} creates a set of steps for one specific task. To make these plans really useful, we need a way to wrap them up into reusable recipes that can be used as steps in other, bigger :term[Plans]{canonical="Plan"}.

The way to do this is explained in :term[012: Agent/Instancing]{href="./012_agent_instancing.md"}.
