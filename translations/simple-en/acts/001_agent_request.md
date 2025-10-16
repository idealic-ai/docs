# 001: Agent/Request

> **Request:** Think of this as a single, complete job for an AI. You give it some information (the `context`) and a set of rules for the answer (the `schema`), and it gives you back a final answer (the `solution`). — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Helps create: [101: Concept/Idea](./101_concept_idea.md)
>
> NPM: [https://www.npmjs.com/package/@augceo/agent](@idealic-ai/agent)

The `Request` is the main engine of our AI system. It’s a special, organized way to talk to a powerful AI (like ChatGPT), called a Large Language Model or LLM. It takes all the information you want to give it (`context`) and a blueprint for the answer (`schema`), and turns them into a perfect, structured result (`solution`). It's much more than just a simple question; it's a complete, self-contained instruction that powers everything the AI agent can do.

## Context: A Recipe of Information

> Sidenote:
> The AI will use the `context` to create a `solution` that follows the rules of the `schema`.
>
> ```mermaid
> graph TD
>     subgraph User Input
>         direction LR
>         Context["Context (Information)"]
>         Schema["Schema (Blueprint)"]
>     end
>
>     Process{{"Request (The Job)"}}
>
>     subgraph LLM Output
>         direction LR
>         Solution[/"Solution (The Final Answer)"/]
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

The most important part of a `Request` is its `context`, which is just a list of `Message` objects. Each `Message` is simple: it has a `role` (like who is talking: the `"system"`, the `"user"`, or the `"assistant"`) and the `content` of what they're saying. This setup lets us create a whole conversation for the AI to read.

Unlike a normal chatbot where the conversation just keeps getting longer and longer, the `context` for each `Request` is like a carefully prepared recipe. It’s built from scratch for one specific job and doesn't get messed up by old, unrelated chats. The AI's answers aren't automatically added back in; we build a fresh, clean context for every new task. This makes sure the process always works the same way and that the AI has exactly the information it needs, without forgetting important details.

Everything the AI needs to know—like instructions, data, and questions—is given to it through these messages.

A simple list of `Message`s might look like this:

```json
[
  { "role": "system", "content": "You are a helpful assistant." },
  { "role": "user", "content": "What is the capital of France?" }
]
```

Our system makes this even more powerful. Instead of just plain text, the `content` of a message can be a special package of information, like `{ "type": "input", "input": { ... } }`.

> Sidenote:
> Special message types are explained here:
>
> - [006: Agent/Data](./006_agent_data.md) - How to give the AI data and explain what it means.
> - [007: Agent/Input](./007_agent_input.md) - An organized way to give the AI instructions.
> - [010: Agent/State](./010_agent_state.md) - A way to give the AI a memory that lasts between jobs.
> - [013: Agent/Plan](./013_agent_plan.md) - A pre-made plan for the AI to follow for multi-step tasks.

This is what makes the whole system so flexible.

Each of these special packages has a helper that knows what to do with it. Before the `Request` is sent to the AI, these helpers check every message one by one. A helper can change parts of the `Request` on the fly:

- **AI Settings**: It can tweak things like which AI model to use or how creative its answers should be.
- **Blueprint (`Schema`)**: It can change the rules for what the final answer should look like.
- **Information (`Context`)**: It can change the list of messages itself, maybe by turning a special package into plain text that the AI can understand, or by adding new messages.

This lets the AI work with big ideas and complex information, building the perfect set of instructions for any job.

## Schema: The Blueprint for the Answer

> Sidenote:
>
> - Read more at [json-schema.org](https://json-schema.org/)

The `schema` is a blueprint (specifically, a JSON Schema) that tells the AI _exactly_ what the final `solution` should look like. It can demand anything from a simple word to a complicated structure with many nested parts. The AI _must_ follow this blueprint, which means the answer is always organized and predictable.

As blueprints get more complex, they can guide not just the final answer but also how the AI _thinks_. For example, a blueprint can have a spot for the final data, but also a separate spot where the AI has to write down its step-by-step thinking or how confident it is. This turns the blueprint into a tool that helps shape the AI's thought process.

A key idea here is that we can build big, complex blueprints by snapping together smaller, reusable ones. This keeps everything neat and makes it easy to teach the AI new skills.

## Getting the Solution

After the `context` is prepared, the final list of messages and the `schema` blueprint are sent to the AI in one go. The AI's response is the `solution`—a perfectly structured piece of information that follows the blueprint's rules exactly.

You can think of this process like the AI telling a short story. Because an AI works by predicting the very next word, it builds the `solution` from top to bottom, following the structure of the `schema` blueprint. The way you design the blueprint changes the story the AI tells.

For example, if the blueprint first asks for a field called `"thought_process"` before the field for the final `"data"`, the AI is forced to explain its thinking _before_ giving the answer. That explanation then becomes part of the information it uses to create the final data. This is a powerful way to guide the AI's thinking and get a much better result.

> [!HEADSUP] Heads up
> This whole package—the `context`, the `schema`, and the `solution` it creates—is a single, repeatable unit. When we save one of these, we call it an [101: Concept/Idea](./101_concept_idea.md).

## From a Structured Answer to Making a Choice

A `Request` is great for getting a single, well-structured `solution`. But to build really smart agents, we need more. We need a way to give the AI a menu of different actions it can choose from to complete a goal. This means we need a way to define these actions as separate, selectable options.

> Sidenote:
>
> - [002: Agent/Tool](./002_agent_tool.md)

The next document, [002: Agent/Tool](./002_agent_tool.md), explains how we define these special abilities.
