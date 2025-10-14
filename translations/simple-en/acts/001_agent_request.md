# 001: Agent/Request

> **Request:** Think of a `Request` as a single, complete mission for an AI. You give it some background information (`context`) and a set of rules for the answer (`schema`), and it gives you back a finished product (`solution`). — [Glossary](./000_glossary.md)

> Sidenote:
> *   Makes it possible to create an [101: Concept/Idea](./101_concept_idea.md)
>
> NPM: [https://www.npmjs.com/package/@augceo/agent](@idealic-ai/agent)

A `Request` is the main building block for our AI system. It’s like giving the AI a clear, repeatable set of instructions. It takes all the important information (the context) and a strict set of rules for the answer (the schema) and uses them to create a perfect, structured solution.

It’s much more than just a simple question. A `Request` is a complete, self-contained job that powers everything the AI can do.

## Context: A carefully packed lunchbox for the AI

> Sidenote:
> The AI will process the `context` (what you tell it) to create a `solution` (the final answer) that follows the rules of the `schema`.
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
>     subgraph AI Output
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

Every `Request` starts with its `context`, which is just a list of messages. Each message has a `role` (like who is talking: the “system,” the “user,” or the “assistant”) and the `content` (what they said). This lets you show the AI a whole conversation as background information.

Unlike a normal chatbot that just keeps adding to a long, messy conversation history, the `context` for each `Request` is a fresh, clean package. It’s built specifically for one job and doesn't get cluttered with old, irrelevant chats. The AI's answers aren't automatically added back in; we build a new, perfect context for every single task. This makes sure the process is reliable and the AI always has exactly the information it needs, without forgetting anything important.

This collection of messages is how we give the AI its instructions, data, and questions. Everything it needs to do its job is packed inside this context.

A simple list of messages might look like this:

```json
[
  { "role": "system", "content": "You are a helpful assistant." },
  { "role": "user", "content": "What is the capital of France?" }
]
```

#### The Content Pipeline: It's more than just text

The system makes this even more powerful because the `content` of a message can be more than just plain text. It can be a special, structured object, like a piece of data with a label on it. For example, instead of a simple sentence, the content could be `{ "type": "input", "input": { ... } }`.

> Sidenote:
> Special message types are explained in these documents:
>
> *   [006: Agent/Data](./006_agent_data.md) - How to give the AI data and explain what it means.
> *   [007: Agent/Input](./007_agent_input.md) - A structured way to give the AI its main prompt.
> *   [010: Agent/State](./010_agent_state.md) - How the AI can remember things between steps.
> *   [012: Agent/Plan](./012_agent_plan.md) - A pre-made plan for a multi-step job.

This makes the `context` the primary way we can add new features and abilities to the system.

Each of these special content types has its own little instruction manual, called a handler. Before the `Request` is sent to the AI, a pipeline of these handlers checks every message. A handler for a message can change the `Request` on the fly:

*   **AI Settings**: It can tweak things like which AI model to use or how creative it should be.
*   **Answer Rules (Schema)**: It can change the rules that the final answer has to follow.
*   **The Messages (Context)**: It can change the list of messages the AI sees. For example, it could turn a special object into plain text or even add new messages to give the AI more hints.

This pipeline is super powerful. It lets the AI work with complex ideas, building the perfect instructions for the job right before it starts.

## Schema: The blueprint for the answer

The `schema` is like a blueprint that tells the AI *exactly* what the final answer, or `solution`, should look like. It uses a system called JSON Schema to define the structure of the data, whether it's a simple word or a complex object with many nested parts. The AI *must* generate an answer that perfectly matches this blueprint, which means the output is always predictable and organized correctly.

As these blueprints get more detailed, they can do more than just shape the final answer. They can also guide the AI's thinking process. For example, a schema could have one spot for the actual answer and another spot where the AI has to write down its step-by-step reasoning. This turns the schema into a tool for shaping *how* the AI thinks.

A key idea here is that we can build big, complex blueprints by snapping together smaller, reusable ones. This is like building with interlocking blocks—it lets us create powerful AI abilities in a smart and organized way.

## Execution: How the answer gets made

After the messages in the `context` are processed, the final list of messages and the `schema` are sent to the AI in one single mission. The AI's response is the `solution`—a structured, JSON-based answer that perfectly follows the rules of the `schema`.

You can think of this process as the AI telling a short story. Since an AI works by predicting the very next word, it builds the `solution` from top to bottom, following the structure of the blueprint. The order of the fields in the blueprint directly affects the story the AI tells.

For example, if your blueprint first asks for a field called `"thought_process"` before asking for the final `"data"`, you force the AI to first explain its thinking *before* giving the answer. That thinking then becomes part of the context it uses to come up with the final answer. This is a powerful trick that lets us guide the AI’s thought process, giving us more control over the result by shaping the path it takes to get there.

> [!TIP]
> This whole package—the `context`, the `schema`, and the `solution` it creates—is a complete, repeatable unit. When we save one of these, we call it an [101: Concept/Idea](./101_concept_idea.md).

## From a structured answer to a real choice

A `Request` is a great way to get a single, well-structured answer. But to build truly smart AI agents, we need more. We need to give the AI a list of different tools or actions it can choose from to complete a goal. This means we need a way to define these actions as separate, selectable options.

> Sidenote:
> *   [002: Agent/Tool](./002_agent_tool.md)

The next document, [002: Agent/Tool](./002_agent_tool.md), explains how we define these tools.
