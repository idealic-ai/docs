# 012: Agent/Plan

> [!DEFINITION] [Plan](./000_glossary.md)
> Think of a :term[Plan]{canonical="Plan"} as a recipe or a game plan for the AI. It's a map of actions (:term[Tool Calls]{canonical="Tool Call"}) that shows how information flows from one step to the next. The AI uses this map to follow a strategy, and can update it as it goes.

> Sidenote:
> - You'll want to know about:
>   - :term[004: Agent/Call]{href="./004_agent_call.md"}
>   - :term[010: Agent/Loop]{href="./010_agent_loop.md"}
>   - :term[007: Agent/Variables]{href="./007_agent_variables.md"}
>   - :term[009: Agent/State]{href="./009_agent_state.md"}
>   - :term[013: Agent/Instancing]{href="./013_agent_instancing.md"}

The :term[Plan]{canonical="Plan"} is the main way the AI can remember what it's doing and work on a task step-by-step. While the AI can handle simple, one-off jobs, giving it a `Plan` tells it to switch into a more thoughtful mode. The presence of a `Plan` tells the AI's :term[Execution Loop]{canonical="Execution Loop"} to hold onto the strategy and remember the results (:term[State]{canonical="State"}) between steps.

This memory is what makes an AI smart and adaptable. When the AI sees the current :term[Plan]{canonical="Plan"} and the current results in the :term[State]{canonical="State"}, it has a full picture of where it is in the process. This lets it intelligently follow the existing plan, add new steps (:term[Tool Calls]{canonical="Tool Call"}), or, if something unexpected happens, throw the old plan away and create a new one.

Without a `Plan`, a request is treated like talking to a vending machine: it gives you what you asked for but immediately forgets who you are. No memory or strategy is carried over to the next request.

## How a Plan is Formed

The steps in the plan are connected not by drawing lines, but by sharing information through the :term[State]{canonical="State"} object—think of it as a shared whiteboard.

- **Nodes (:term[Tool Calls]{canonical="Tool Call"}):** Each step in the plan is a :term[Tool Call]{canonical="Tool Call"}, which is just a specific action to perform.
- **Edges (:term[State]{canonical="State"} Object):** The connections between steps are made when one tool writes its result to the whiteboard, and another tool reads that result. A tool writes its output to a specific spot on the :term[State]{canonical="State"} whiteboard using an :term[Output Path]{canonical="Output Path"}. Another tool can then use that information by pointing to the same spot using a **:term[Variable Reference]{canonical="Variable Reference"}**.

  > Sidenote:
  > - [008: Agent/Output](./008_agent_output.md)

This creates a clear dependency: the second :term[Tool Call]{canonical="Tool Call"} can't start until the first one has finished its job and written the result to the :term[State]{canonical="State"}.

For example, a :term[Plan]{canonical="Plan"} to get a user's profile and then write a summary of it would have two :term[Tool Calls]{canonical="Tool Call"}:

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
>     state_var{{"The whiteboard (state.user.profile)"}}
>
>     Call1["Step 1: Get User Profile"]
>     Call2["Step 2: Summarize Profile"]
>
>     Call1 -- writes to --> state_var
>     state_var -- read by --> Call2
> ```

:::

Here, the `summarizeProfile` action depends on the result of `fetchUserProfile`, creating a two-step recipe. This connection can be drawn as a simple chart.

## The Plan's Content: A Data-Flow Graph

What's inside a :term[Plan]{canonical="Plan"} is basically a map showing how data flows, called a data-flow graph. This map lays out the AI's strategy as a series of connected :term[Tool Calls]{canonical="Tool Call"}. By showing the workflow as a graph, the system can clearly see which steps depend on others, like in an assembly line where one station's output is the next station's input. This format is clear and easy for the AI's :term[Execution Loop]{canonical="Execution Loop"} to read and follow.

> Sidenote:
> A :term[Plan]{canonical="Plan"} isn't just a straight line. It can handle choices, where the next step depends on the result of the previous one.
>
> ```mermaid
> graph TD
>     A[Get Weather] --> B{Is it Sunny?};
>     B -- Yes --> C[Find a Park];
>     B -- No --> D[Find a Movie];
>     C --> E[Show Suggestion];
>     D --> E[Show Suggestion];
> ```

The graph structure isn't just for making step-by-step plans. You could ask an AI to create a graph of :term[Tool Calls]{canonical="Tool Call"} that represents something else, like a map of your friends on a social network, a company's workflow, or the design for a database.

It's important to know the difference. Even though these look like plans, they aren't *executable* plans for the AI unless you specifically send them in a new :term[Request]{canonical="Request"} with instructions to run them. This keeps things clear: there's a difference between drawing a picture of a machine and actually building a machine that runs.

While the contents of a :term[Plan]{canonical="Plan"} can be used for brainstorming or just "thinking out loud," its main job in this system is to define a workflow that can actually be run. For this, we use a special kind of map called a **Directed Acyclic Graph (DAG)**, where every point on the map is a :term[Tool Call]{canonical="Tool Call"}.

A DAG has a few key features that make it perfect for running tasks:

- **Graph:** The "graph" is the entire map inside the :term[Plan]{canonical="Plan"}—all the :term[Tool Calls]{canonical="Tool Call"} (the stops) and the data connections between them (the roads).
- **Directed:** The roads are all one-way streets. Data flows from a step that creates it to a step that uses it. You can't go backward.
- **Acyclic:** The map has no roundabouts or loops. You can't end up back where you started. This is a very important safety rule to stop the AI from getting stuck in an infinite loop. The system always checks to make sure a :term[Plan]{canonical="Plan"} doesn't have any loops before it runs.

> Sidenote:
> To do something over and over again, like in a 'for loop' in programming, you use a special pattern. An outer :term[Plan]{canonical="Plan"} keeps track of the loop (like counting how many times it has run). For each turn of the loop, it starts a smaller, separate task using a :term[Delegate]{canonical="Delegate"}. This smaller task has its own simple, one-way :term[Plan]{canonical="Plan"} to do the work for that single turn. This makes sure that loops are built in a clear and safe way.

## Planning vs. Execution Strategies

The coolest feature here is the difference between making a `Plan` and actually carrying it out. This is controlled by a setting called `mode` inside the `Plan` message, which allows for different approaches.

The AI is always the planner. The `mode` setting decides if the AI should also be the immediate doer for tasks it can handle itself.

### Eager Execution (Default)

By default, the `Plan` is in `eager` mode. In this mode, **planning is the same as doing**. There's no pause between thinking of a step and acting on it. When the AI comes up with a `solution`, it's thinking and doing at the same time for any simple steps it can figure out on its own.

- If a task involves something the AI can do in its head (like summarizing text), it will generate the `call` and its `_output` in the same breath.
- If a task needs an outside tool (:term[Activity]{canonical="Activity"}), the AI generates the `call`, and the :term[Execution Loop]{canonical="Execution Loop"} immediately sends it off to be run.

This mode is built for speed. The trade-off, especially on the very first step, is that any choices are made instantly. A tool might offer a choice of outcomes (e.g., `†state.sunny || †state.rainy`), but in `eager` mode, the AI's brain immediately picks one path and puts that single choice into the `solution`.

Because of this, the `solution` from the first step of an eager plan will never contain a choice that hasn't been made yet. The AI makes the choice as part of its initial thinking. Later on, once it has some results on its whiteboard, it can make more complex choices based on what it knows.

### Lazy Execution (Deliberate Planning)

A user can choose a more careful approach by setting the `mode` to `lazy`. This strategy creates a clean break between planning and doing. In this mode, the AI's only job is to be a planner.

- It will **not** do any tasks in its head.
- Its only goal is to create a complete, detailed map of :term[Tool Calls]{canonical="Tool Call"}. If a tool offers a choice of outcomes, the AI will leave that choice in the plan, letting the execution phase figure it out later.

The result is a pure blueprint of the entire strategy, which isn't run right away. This creates an important checkpoint where the plan can be:

- **Checked:** The system can look for loops or other mistakes in the map.
- **Simulated:** You can do a "dry run" to see what might happen.
- **Sent for Approval:** The :term[Plan]{canonical="Plan"} can be shown to a person for them to review, change, or approve before anything actually happens (:term[HITL]{canonical="HITL (Human-in-the-Loop)"}).

Once approved, the :term[Execution Loop]{canonical="Execution Loop"} takes over, reading the :term[Plan]{canonical="Plan"} and running the :term[Tool Calls]{canonical="Tool Call"} in the right order, filling up the :term[State]{canonical="State"} whiteboard as it goes.

## The Plan as an Evolving Strategy

A :term[Plan]{canonical="Plan"} is not set in stone; it's a living strategy that can change at each step. It's important to know that a `Plan` isn't just any list of :term[Tool Calls]{canonical="Tool Call"} the AI thinks of. A list of actions only becomes a true :term[Plan]{canonical="Plan"} when it's passed as a 'context' message into the *next* request.

This cycle turns a one-time idea into an ongoing strategy:

- The **:term[context]{canonical="context"}** for a new request contains the whiteboard (:term[State]{canonical="State"}) and the :term[Plan]{canonical="Plan"} from the last step.
- The **:term[solution]{canonical="Solution"}** that the AI comes up with contains a new list of :term[Tool Calls]{canonical="Tool Call"} that becomes the **new :term[Plan]{canonical="Plan"}** for the step after that.

This step-by-step process allows the AI to be both prepared and responsive. It can follow the existing :term[Plan]{canonical="Plan"}, but it can also change it if the last step produced an unexpected result. For example, if a :term[Tool Call]{canonical="Tool Call"} fails, the AI can create a new :term[Plan]{canonical="Plan"} with steps to handle the error. This makes the system tough and adaptable.

:::::details{title="Example: Planning one step ahead"}

This example shows how a `Plan` can act like a guardrail to keep the AI on track. It guides the AI to follow a standard procedure, even if other actions seem possible.

**Scenario:** A customer support AI needs to process a refund. The standard way to do this is to first check the customer's billing history and then issue the refund.

**1. Initial Request**

The process begins with the customer's request. Based on this `input`, the AI creates a standard two-step `Plan` for the refund. This is the ideal, most common way to do it.

::::columns
:::column{title="Context & Schema for Request"}

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
:::column{title="LLM's `solution`"}

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

**2. Next Request in the Loop**

The :term[Execution Loop]{canonical="Execution Loop"} runs the `checkBillingHistory` tool and updates the :term[State]{canonical="State"} (the whiteboard). The history shows something complex, like a previous payment dispute. An AI without guidance might see this and decide to use another available tool, like `escalateToSupervisor`.

However, the `Plan` in the context provides the needed structure. By combining what it *knows* (the complex history from the `State`) with what it *should do* (the `Plan`), the AI understands its exact place in the workflow and sticks to the normal procedure.

::::columns
:::column{title="Context"}

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
:::column{title="LLM's `solution`"}

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

The `Plan` ensures the AI follows the correct procedure, preventing it from escalating the issue too early and keeping it on the intended path.

:::::

:::::details{title="Example: Adjusting a Plan"}

This example shows how an AI can change its :term[Plan]{canonical="Plan"} when it gets new information, by picking a different tool.

::::columns
:::column{title="Context"}

The AI is given a standard `Plan` and a new `Input` from the user that adds a new requirement.

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
:::column{title="LLM's `solution`"}

The AI realizes the original plan won't work anymore. It scraps the old plan and creates a new one, swapping `bookHotel` with a more specific tool.

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

The AI doesn't just tweak a detail; it completely changes its strategy by picking a better tool (`findPetFriendlyHotel`) based on the new need. This new list of `Tool Calls` becomes the `Plan` for the next step.

:::::

:::::details{title="Example: Handling Failure"}

This example shows how an AI can change its :term[Plan]{canonical="Plan"} when something goes wrong. We see the initial plan, and then how it changes after a tool fails.

**1. The Initial Plan**

The AI is given some tools and a user request. It creates a hopeful, two-step plan that assumes everything will work perfectly.

::::columns
:::column{title="Initial Context"}

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
:::column{title="Initial Solution"}

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

**2. Failure and Replanning**

The :term[Execution Loop]{canonical="Execution Loop"} tries to run `processPayment`, but it fails. The system writes an error to the whiteboard (`†state.error`). In the next step, the AI sees this new error message along with the original (and now useless) plan. It creates a new solution to handle the failure.

::::columns
:::column{title="Context for Next Request"}

```json
[
  {
    "type": "state",
    "error": { "code": "card_declined", "message": "Your card was declined." }
  },
  // The original, now-obsolete plan is still in the context
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

The AI saw the `error` on the whiteboard (`State`), ignored the old, optimistic `Plan`, and made a new, one-step plan to `reportFailure`. This shows how the AI can react to unexpected problems.

:::::

:::::details{title="Example: Schema-Guided Planning"}

This example shows how giving the AI a `schema` for the :term[State]{canonical="State"} object works like a blueprint, guiding it to create a well-structured :term[Plan]{canonical="Plan"}.

::::columns
:::column{title="Context with State Schema"}

The user provides an `Input` and a `State` message that only has a `schema`. This schema describes how the data should flow by defining the 'slots' or 'variables' the plan needs to fill.

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
:::column{title="LLM's `solution`"}

The AI uses the `State` schema as a template to build a valid plan. It correctly connects the :term[Output Path]{canonical="Output Path"} of one tool to the input of the next.

```json
{
  "calls": [
    {
      "_tool": "detectLanguage",
      "text": "†input.text",
      // The AI knows to use this path from the schema.
      "_outputPath": "†state.language"
    },
    {
      "_tool": "isEnglish",
      // It correctly points to the output of the previous step.
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

By providing the `schema`, the user gives the AI a clear blueprint for the data flow. The AI doesn't have to guess the names of the variables or the order of operations; it just fills in the predefined slots. This results in a more reliable and predictable `Plan`.

:::::

This cycle of planning and doing is the heart of a :term[Process]{href="./203_idea_process.md"}. A Process is like a self-contained snapshot of a project, capturing the :term[Tools]{canonical="Tool"} available, the current :term[State]{canonical="State"}, and the :term[Plan]{canonical="Plan"} itself.

## From Single Plan to Reusable Workflows

A :term[Plan]{canonical="Plan"} sets out the steps for one specific job. But to make these workflows really powerful, we need a way to wrap them up into reusable recipes that can be used by other, bigger :term[Plans]{canonical="Plan"}.

The rules for running multiple plans at once are described in :term[013: Agent/Instancing]{href="./013_agent_instancing.md"}.
