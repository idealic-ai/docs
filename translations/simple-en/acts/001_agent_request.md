# 001: Agent/Request

> [!DEFINITION] Request
> A single, complete job for an AI brain (LLM). You give it a `context` (the background info) and a `schema` (the blueprint for the answer), and it gives you back a `solution`.

> Sidenote:
> - Enables: [101: Concept/Idea](./101_concept_idea.md)
>
> NPM: [https://www.npmjs.com/package/@augceo/agent](@idealic-ai/agent)

A `Request` is the main building block of our AI system. Think of it as a kit for getting the AI to do one specific job. It's much more structured than just typing a question into a chatbot. A `Request` is a complete package that contains everything needed for the AI to get to work, which makes it the engine for everything the agent does.

## Context: A Briefing for the AI

> Sidenote:
> The AI brain (LLM) will use the `context` to create a `solution` that follows the rules of the `schema`.
>
> ```mermaid
> graph TD
>     subgraph User Input
>         direction LR
>         Context[Context]
>         Schema[Schema]
>     end
>
>     Process{{"Request"}}
>
>     subgraph LLM Output
>         direction LR
>         Solution[/Solution/]
>     end
>
>     Context --> Process
>     Schema --> Process
>     Process --> Solution
>     Schema -.-> Solution
>
>     linkStyle 2 stroke-width:2px,fill:none,stroke:gray,stroke-dasharray: 5 5;
>     linkStyle 3 stroke-width:2px,fill:none,stroke:gray,stroke-dasharray: 5 5;
> ```

Every `Request` starts with its `context`, which is just a list of messages. Each message has a `role` (like “system,” “user,” or the “assistant” itself) and some `content`. This lets you set up a whole conversation for the AI to read, like a script for a play.

But unlike a normal chatbot that just keeps adding to a long, messy conversation history, the `context` for each `Request` is a clean, self-contained briefing. It's built from scratch for each specific job. The AI's answers aren't automatically added back in. We create a fresh briefing every time.

This makes the process predictable and ensures the AI has exactly the information it needs, without getting confused by old conversations or forgetting important details. Everything the AI needs to know—instructions, data, examples—is delivered in these messages.

Here’s what a simple list of messages looks like:

```json
[
  { "role": "system", "content": "You are a helpful assistant." },
  { "role": "user", "content": "What is the capital of France?" }
]
```

Our system improves on this by allowing the `content` of a message to be more than just text. It can be a special package of information, like an object that holds a file or a piece of data.

> Sidenote:
> Special message types are explained in these documents:
>
> - [006: Agent/Data](./006_agent_data.md) - How to show data to the AI in a message.
> - [007: Agent/Input](./007_agent_input.md) - How to give the AI a structured question.
> - [009: Agent/State](./009_agent_state.md) - How to keep track of information over many steps.
> - [010: Agent/Plan](./010_agent_plan.md) - How to give the AI a step-by-step plan to follow.

This makes the `context` super flexible. You can give the AI not just notes, but also maps, charts, or tools.

Before the `Request` is sent to the AI, it goes through a prep line. Each special package in the `context` can tweak the mission parameters:

- **AI Settings**: It can change the AI model being used or adjust its creativity (temperature).
- **Blueprint (`Schema`)**: It can alter the blueprint for the final answer.
- **Briefing (`Context`)**: It can change the final messages sent to the AI, for example, by turning a data package into easy-to-read text or adding new instructions.

This system lets us work with big ideas and automatically builds the perfect, precise command for the AI to execute.

## Schema: The Blueprint for the Answer

> Sidenote:
> - Learn more at [json-schema.org](https://json-schema.org/)

The `schema` is a blueprint (specifically, a JSON Schema) that tells the AI the exact structure of the answer you want. It's like giving someone a fill-in-the-blanks form. They have to fill it out exactly as you've designed it, ensuring the final answer is perfectly organized and predictable.

A really smart blueprint can guide the AI's thinking process. For example, you can add a field for the AI to write down its reasoning *before* it gives the final answer. This turns the blueprint into a tool that helps shape *how* the AI thinks.

A core idea here is that we can build complex blueprints by snapping together simpler, reusable ones. This makes it easy to build up the AI's skills in a clean, organized way.

## From Request to Solution

Once the `context` (the briefing) is ready, it's sent to the AI along with the `schema` (the blueprint) in a single job. The AI's response is the `solution`—a perfectly structured document that matches the blueprint exactly.

You can think of this process as the AI writing a short story. Because an AI just predicts the next word, it fills out the blueprint from top to bottom. The order of the fields in your blueprint directly shapes the story it tells.

For example, if the blueprint first asks for `"my_thinking_process"` and then asks for `"the_final_answer"`, the AI is forced to explain its logic before giving the answer. That logic then becomes part of the story it uses to figure out the final answer. This gives us a powerful way to guide the AI's thoughts and get better results.

> [!HEADSUP] Heads up
> This whole package—the `context`, the `schema`, and the `solution`—is a single, repeatable unit. When we save one of these, we call it an [Idea](./101_concept_idea.md).

## From a Structured Answer to a Real Choice

A `Request` is great for getting one structured answer. But to build a really smart agent, we need the AI to be able to choose from a menu of different actions it can take to solve a problem.

> Sidenote:
> - [002: Agent/Tool](./002_agent_tool.md)

The next document, [002: Agent/Tool](./002_agent_tool.md), explains how we define these actions so the AI can use them.
