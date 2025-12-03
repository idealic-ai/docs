# 017: Agent/Advisor

> [!DEFINITION] [Advisor](./000_glossary.md)
> An Advisor is like a special instruction that gives the main AI Agent a specific personality or role, like a "Safety Inspector" or a "Creative Genius." It forces the Agent to think from that point of view and give a structured "opinion" or a confidence score *before* it decides what to do next.

> Sidenote:
> - Needs:
>   - :term[001: Agent/Request]{href="./001_agent_request.md"}
> - Makes Better:
>   - :term[002: Agent/Tool]{href="./002_agent_tool.md"}
>   - :term[010: Agent/Loop]{href="./010_agent_loop.md"}

The **Advisor Protocol** makes sure the Agent follows a "think, then act" rule. By setting up different **Advisors**, the Agent has to look at a problem through several different expert lenses—like a Security Architect or a Product Manager—before it takes any action.

## Thinking Without a Plan

Sometimes, an AI's thinking process is messy, like someone just rambling out loud. It mixes up gathering facts, thinking about them, and making a decision all in one big, confusing stream of text.

This makes the process slow and bloated with unnecessary thoughts. The Agent can get confused, change its mind back and forth, and make less accurate choices. It’s also hard to look back at a messy paragraph of text and understand exactly *why* it made a certain decision. There are no clear numbers or reasons to compare.

The Advisor system fixes this by adding structure to the thinking process. It makes the AI's evaluation clear and predictable. This is also better for the user. Instead of seeing a giant wall of text, you can see a neat summary of different opinions, showing where the experts agree or disagree. This makes it much easier to make good decisions and see how they were made.

This system doesn't stop the AI from thinking; it just organizes a part of that thinking into a clear, usable format—a rated opinion that directly helps in making the final choice.

## Different Views and Weighing Options

You can set up multiple Advisors with opposite jobs, like a "Risk Analyst" who worries about what could go wrong versus an "Opportunity Scout" who looks for what could go right. This creates a healthy debate inside the AI.

This debate is captured when each Advisor "votes" for the different :term[Tools]{canonical="Tool"} the Agent could use, giving each a score. The Agent acts like the head of a council, gathering these votes. It doesn't just pick the tool with the highest score; it looks at all the different opinions to find the best-balanced decision. Using a tool becomes a final, calculated choice based on competing advice.

## The Advisor Message

The **Advisor Message** is the instruction sheet that defines what kind of expert the Agent should be.

- **`id`**: A unique nickname for the advisor, like `"security_guy"`.
- **`role`**: A short description of the advisor's job, like, "Your mission is to find any possible security risks."
- **`schema`**: A template for the advisor's report. This ensures it provides specific information, like a risk score from 1 to 100, or an estimated budget.
- **`on`**: A rule for when the advisor should speak up.
- **`scopes`**: Tells the advisor which specific parts of the information it should focus on.
- **`isInstanced`**: A simple yes/no switch. If `true`, and you give the Agent a list of ten problems, the advisor will provide a separate opinion for each of the ten problems.

## When Advisors Speak

The `on` setting controls when an advisor gives its opinion:

- **`start`**: Gives advice only at the very beginning of a task to help set the right direction.
- **`finish`**: Gives advice only at the end, to help decide if the task is truly finished.
- **`request`**: The most involved advisor. It gives an opinion at the start, at the end, and after every single step. Perfect for a safety monitor that needs to watch everything.
- **`null` / `undefined` (On-Demand)**: A quiet expert who only speaks up when asked. The Agent can choose to consult them if it gets stuck or faces a tricky decision.

## Order of Operations

When it's time to think, the Agent first puts on the "hat" of each active advisor and writes down their structured opinions. It might analyze the situation or vote on what to do next from each advisor's perspective. Then, using these fresh opinions, the Agent immediately makes its final decision on which :term[Tool]{canonical="Tool"} to use.

Things like scores and votes are neatly packed inside a simple text field to keep everything clean and organized.

::::columns
:::column{title="Setting Up Advisors"}

```json
[
  {
    "type": "advisor",
    "id": "riskAnalyst",
    "on": "request",
    "scopes": ["†state.deploymentHistory"],
    "role": "Analyze risks and Vote for deployment actions.",
    "schema": {
      "type": "object",
      "properties": {
        "thought": { "type": "string", "description": "Risk assessment of the deployment." }
      },
      "required": ["thought"]
    }
  }
]
```

:::
:::column{title="What the AI Thinks"}

The `calls` field holds all the votes, neatly packed into a line of text.

```json
{
  "advisors": [
    {
      "id": "riskAnalyst",
      "thought": "The new feature has passed a basic check but not a full one. There's a high risk something old might break.",
      "calls": "{\"deploy\": 10, \"rollback\": 5, \"delay\": 95}"
    }
  ],
  "calls": [
    {
      "_tool": "delay",
      "_reasoningForCall": "The Risk Analyst strongly advises waiting because we haven't done enough testing."
    }
  ]
}
```

:::
::::

## How Advisors Work with Other Parts

- **:term[Tool]{canonical="Tool"}:** Advisors don't do any work themselves; they just vote on which :term[Tool]{canonical="Tool"} should do the work. The AI's output shows this separation clearly: first comes the "thinking" from the advisors, and only then comes the "doing" by picking a real :term[Tool]{canonical="Tool"}. This guarantees advice is considered before any action is taken.

  > Sidenote:
  > - :term[002: Agent/Tool]{href="./002_agent_tool.md"}

- **:term[Loop]{canonical="Loop"}:** The `on` setting plugs advisors into the Agent's work cycle. An advisor set to `on: request` is like a constant supervisor, checking in on every step of the process. An `on: null` (on-demand) advisor is like a specialist you can call in only when the Agent runs into a problem it can't solve on its own.

  > Sidenote:
  > - :term[010: Agent/Loop]{href="./010_agent_loop.md"}

- **:term[Plan]{canonical="Plan"}:** Advisor opinions are very important when making the initial plan. By listening to advisors at the start, the Agent can create a smarter, more balanced strategy that considers different expert views right from the beginning.

  > Sidenote:
  > - :term[012: Agent/Plan]{href="./012_agent_plan.md"}

- **:term[Instancing]{canonical="Instancing"}:** Advisors can handle work in batches. If you give the agent 100 emails to analyze, setting `isInstanced: true` tells an advisor to give a unique, separate opinion for each and every email.

  > Sidenote:
  > - :term[013: Agent/Instancing]{href="./013_agent_instancing.md"}

- **:term[Scopes]{canonical="Scopes"}:** The `scopes` property helps an advisor focus. It's like handing a historian a specific chapter in a history book and saying, "Start here." It guides their attention to the most relevant information but doesn't prevent them from reading the whole book if they need more context. This helps different experts focus on their specific areas.

  > Sidenote:
  > - :term[015: Agent/Scopes]{href="./015_agent_scopes.md"}
