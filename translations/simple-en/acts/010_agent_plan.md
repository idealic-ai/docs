# 010: Agent/Plan

> [!DEFINITION] Plan
> Think of a Plan as a recipe or a game plan for a computer agent. It's a special message that lays out a series of steps (called Tool Calls) that the agent intends to take. This plan is passed from one step to the next, allowing the agent to follow the recipe and even change it as it goes.

> Sidenote:
> - Needs to be read with:
>   - 004: Agent/Call
>   - 005: Agent/Loop
>   - 008: Agent/Variables
>   - 009: Agent/State
>   - 011: Agent/Instancing

The Plan is the secret to how an agent can work on a task step-by-step. When the computer brain (the LLM) sees the current Plan and the live scorecard of what's happened so far (the State), it knows exactly where it is in the process. This understanding allows the agent to be smart and flexible. It can stick to the original plan, add new steps, or even scrap the whole thing and come up with a new plan if something unexpected happens. This means it can follow strict instructions just as easily as it can explore and figure things out on its own.

## How a Plan is Formed

The connections between steps in the plan aren't made with complicated links. Instead, they use a simple and clever system based on a shared notepad called the State object.

- **Steps (Tool Calls):** Each step in the plan is a specific action, like `fetchUserProfile`.
- **Connections (The State Object):** The links between steps are formed when one tool writes a result to the State notepad, and another tool reads it. A tool says where it will write its result using a special note called `_outputPath`. Another tool can then use that result by pointing to the same spot on the notepad using a **Variable Reference**.

This creates a clear dependency: the second tool can't start until the first one has finished its job and written the result to the notepad.

For example, a plan to get a user's profile and then write a summary of it would have two steps:

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
>     state_var{{"state.user.profile"}}
>
>     Call1["fetchUserProfile"]
>     Call2["summarizeProfile"]
>
>     Call1 -- writes to --> state_var
>     state_var -- read by --> Call2
> ```

:::

Here, the `summarizeProfile` step depends on the `fetchUserProfile` step, creating a simple two-part plan. You can picture this as a simple flowchart.

## The Plan's Content: A Flowchart of Data

The Plan itself is basically a flowchart showing how data moves between different tools. This structure shows the agent's strategy as a series of connected actions. By drawing the plan as a chart, the system can clearly see which steps depend on others, making it easy for the agent's Execution Loop to understand and follow the instructions.

> Sidenote:
> A Plan isn't just a straight line. It can show more complex recipes with choices, where the next step depends on the result of the previous one:
>
> ```mermaid
> graph TD
>     A[Get Weather] --> B{Is it Sunny?};
>     B -- Yes --> C[Find a Park];
>     B -- No --> D[Find a Movie];
>     C --> E[Suggest Outing];
>     D --> E[Suggest Outing];
> ```

This flowchart structure isn't just for making plans. An agent could also be asked to create a chart of tools that represents something else, like drawing a map of a friend group, a diagram of a computer program, or a layout for a database.

It's important to know the difference between these drawings and a real Plan. Even though they look the same, they only become an actual, executable Plan if they are sent in a future request with the specific goal of being carried out. This prevents confusion between just drawing a picture of something and creating a set of instructions to actually build it.

While a Plan can be used for brainstorming or just "thinking out loud," its main job in this system is to define a series of steps that can be executed. To do this, we use a special kind of flowchart called a **Directed Acyclic Graph (DAG)**, where each point in the chart is a Tool Call.

A DAG is perfect for this job for a few reasons:

- **Graph:** The "graph" is the whole Plan—all the tool steps (the points) and the data that flows between them (the connecting lines).
- **Directed:** The connections only go one way. Data flows from a tool that creates it to a tool that uses it, never backward.
- **Acyclic:** The flowchart can't have any loops. This guarantees that the plan has a clear start and a clear finish. It's a safety feature to stop the computer brain from accidentally creating a plan that runs forever. The system always checks to make sure a Plan has no loops before it starts.

> Sidenote:
> To do something repetitive like a "for loop," we use a pattern where one plan delegates work to another. A main Plan keeps track of the loop (like a counter), and for each time through the loop, it starts a smaller, separate sub-plan to do the actual work for that one iteration. This makes sure that loops are created in a clear and safe way.

## Separating Planning from Doing

The best part of this design is that making the plan and carrying out the plan are two completely separate things. Because a Plan is just a list of instructions, an agent can create the entire flowchart of steps *before* a single piece of code is actually run.

The computer brain (the LLM) acts as the planner, putting together the list of actions for the job. This list of instructions can then be:

- **Checked:** The system can look for any mistakes in the plan, like loops or other errors.
- **Tested:** You can do a "dry run" to see what the plan might do without actually doing it.
- **Approved:** The plan can be shown to a person for them to review, change, or approve before it's allowed to run. This adds an important layer of safety and teamwork.

Carrying out the plan is handled by the Execution Loop, which reads the Plan and runs the tools in the right order, updating the shared State notepad as it goes.

## The Plan as a Living Strategy

A Plan isn't set in stone; it's a living strategy that can change at each step. A list of tool steps only becomes a true Plan when it's passed as a guide into the *next* step of the process.

This cycle turns a one-time list of ideas into an ongoing strategy:

- The **information** for a request includes the shared notepad (the State) and the current game plan (the Plan) from the last step.
- The **solution** that the computer brain comes up with contains a new list of tool actions that becomes the **new Plan** for the next step.

This step-by-step process lets the agent be both prepared and flexible. It can follow the existing Plan, but it can also change it based on what happened in the previous step. For instance, if a tool fails, the agent can create a new Plan with steps for handling the error. This makes the whole system tougher and smarter.

:::::details{title="Example: Planning one step ahead"}

This example shows how a `Plan` acts like a recipe, guiding the agent to follow the standard steps, even when other tools are available.

**Scenario:** A customer service agent needs to give a customer a refund. The standard way to do this is to first check their past purchases for more information and then issue the refund.

**1. First Request**

The process begins with the customer's request. Based on this, the computer brain creates a standard two-step `Plan` to handle the refund. This is the normal, expected way to do it.

::::columns
:::column{title="Info Sent to the Agent"}

```json
// Agent.Request(config, schema, context)
{
  "schema": {
    "type": "object",
    "properties": {
      "calls": { "type": "array" },
      "output": {
        "type": "object",
        "nullable": true,
        "properties": {
          "confirmationId": { "type": "string" },
          "message": { "type": "string" }
        }
      }
    }
  },
  "context": [
    {
      "type": "input",
      "request": "I'd like a refund for my last order.",
      "customerId": "cust_123",
      "amount": 50.0
    }
  ]
}
```

:::
:::column{title="Agent's Proposed Solution"}

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

The system runs the `checkBillingHistory` tool and updates the shared notepad (the State). The history shows something tricky, like a previous payment issue. Without a plan, an agent might decide to use a different tool, like `escalateToSupervisor`.

But because the `Plan` is included, the agent has its instructions. It combines what it *knows* (the tricky history) with what it *should do* (the Plan). It understands it's in the middle of a process and sticks to the original plan.

::::columns
:::column{title="Info for the Next Step"}

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
:::column{title="Agent's New Solution"}

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

The `Plan` keeps the agent on track and makes sure it follows the correct procedure, preventing it from getting sidetracked.

:::::

:::::details{title="Example: Changing a Plan"}

This example shows how an agent can change its `Plan` when it gets new information by picking a different tool.

::::columns
:::column{title="Info for the Agent"}

The agent is given a standard `Plan` for a trip and a new message from the user that adds a new requirement.

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
:::column{title="Agent's New Solution"}

The agent realizes the original plan won't work anymore. It throws out the old plan and creates a new one, swapping `bookHotel` with a more specific tool.

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

The agent didn't just tweak a detail; it completely changed its strategy by choosing a better tool (`findPetFriendlyHotel`) after learning about the dog. This new list of steps becomes the `Plan` for the next stage of the process.

:::::

:::::details{title="Example: Handling Failure"}

This example shows how an agent can change course from its original `Plan` when something goes wrong. We'll see this in two parts: the first plan, and what happens after a tool fails.

**1. The Original Plan**

The agent gets a set of tools and a user's request. It creates a simple, two-step plan, assuming everything will work perfectly.

::::columns
:::column{title="Original Info for the Agent"}

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
:::column{title="Original Solution"}

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

**2. Failure and Making a New Plan**

The system tries to run the `processPayment` tool, but it fails. The system writes an error message to the shared notepad. In the next step, the agent sees this new error message along with the original (now useless) plan and creates a new solution to deal with the failure.

::::columns
:::column{title="Info for the Next Step"}

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
:::column{title="New Solution (Replanned)"}

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

The agent saw the `error` on the notepad, ignored the old plan, and created a new, one-step plan to `reportFailure`. This shows how the agent can react and handle problems as they come up.

:::::

:::::details{title="Example: Using a Blueprint to Guide Planning"}

This example shows how giving the agent a blueprint for the shared notepad (the `State` object) helps it create a correct and well-structured `Plan`.

::::columns
:::column{title="Info With a State Blueprint"}

The user gives the agent an `Input` and a `State` message that only contains a `schema`, or blueprint. This blueprint describes the data flow by listing the "variables" the plan should fill in.

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
    "type": 'state',
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
:::column{title="Agent's Solution"}

The agent uses the State blueprint as a guide to build a valid plan. It correctly connects the output of one tool to the input of the next.

```json
{
  "calls": [
    {
      "_tool": "detectLanguage",
      "text": "†input.text",
      // The agent knows to use this name from the blueprint.
      "_outputPath": "†state.language"
    },
    {
      "_tool": "isEnglish",
      // It correctly uses the output from the previous step.
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

By providing the `schema`, the user gives the agent a clear map for the data. The agent doesn't have to guess the variable names or the right order; it just fills in the predefined slots, leading to a much more reliable `Plan`.

:::::

This continuous cycle of planning and doing is the heart of a Process. A Process is like a self-contained snapshot of a job, capturing the Tools available, the live State, and the Plan itself.

## From a Single Plan to Reusable Recipes

A Plan defines the steps for a single task. To make these plans really useful, we need a way to wrap them up into reusable recipes that can be used as steps in other, bigger Plans.

The rules for how to run multiple plans at once are described in 011: Agent/Instancing.
