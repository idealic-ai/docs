# 001: Agent/Request

> **Request:** A single, self-contained LLM invocation, which takes a `context` and a `schema` and produces a `solution`. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Enables: [101: Concept/Idea](./101_concept_idea.md)
>
> NPM: [https://www.npmjs.com/package/@augceo/agent](@idealic-ai/agent)

This document describes the **Request**, which defines the fundamental unit of interaction with an LLM. The `Request` is the engine that makes the abstract [101: Concept/Idea](./101_concept_idea.md) computable by taking its `context` and `schema` to generate a `solution`.

## The Request Pipeline

> Sidenote:
>
> LLM will process the `context` to generate a `solution` that conforms to the `schema`.
>
> ```mermaid
> graph TD
>     subgraph User Input
>         direction LR
>         Context[\Context\]
>         Schema[\Schema\]
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

A `Request` is not a simple prompt. It is a structured pipeline that transforms a rich, multi-part context into a single, schema-compliant response from an LLM.

### Context: An Array of Messages

The foundation of a `Request` is its `context`, which is provided as an array of `Message` objects. This allows for a complex, multi-turn, or multi-role conversation to be presented to the LLM in a structured way.

A simple context might look like this:

```json
[
  { "role": "system", "content": "You are a helpful assistant." },
  { "role": "user", "content": "What is the capital of France?" }
]
```

### Custom Content Types

The system extends this basic structure by allowing **custom content types** within messages. Instead of just a string, the `content` of a message can be a structured object, like `{ "type": "state", "state": { ... } }`.

These custom types are defined and managed by the `Content` system (see `agent/src/Content/Content.ts`). Each custom type is registered with a handler, and these handlers form a processing pipeline. As each message is processed, its handler can modify the three core components of the `Request`:

- **LLM Config**: Adjusting parameters like the model, temperature, or other settings.
- **Schema**: Modifying the JSON schema that the final output must conform to.
- **Context**: Altering the final list of messages that will be sent to the LLM, for example by transforming the custom type into a text-based representation or adding new messages.

This powerful pipeline mechanism allows the agent to work with high-level, structured concepts, dynamically constructing the precise LLM invocation needed to perform a task.

### Schema: Guiding the Solution

The `schema` is a JSON Schema that defines the exact structure of the desired `solution`. This is a powerful system that allows for the representation of any type of data, from simple strings to complex, nested objects. The LLM is forced to generate a `solution` that strictly conforms to this schema, guaranteeing that the output is always well-structured and predictable.

As schemas grow in complexity, they can be designed to guide not only the final output but also the LLM's reasoning process. For example, a schema can include fields for the data itself, as well as separate fields that prompt the LLM to outline its reasoning, chain of thought, or confidence scores. This turns the schema into an active tool for shaping the generation process.

A core principle of this architecture is the composition of schemas. More complex capabilities are built by combining simpler, reusable schema components, allowing for a modular and scalable approach to defining the agent's knowledge and abilities.

### Execution and the Solution

After the `context` is processed, the final array of messages and the `schema` are sent to the LLM in a single request. The LLM's response is the `solution`—a structured, JSON-based document that strictly conforms to the provided `schema`.

This process can be understood as the generation of a mini-narrative. Because an LLM operates as a next-token predictor, it generates the `solution` from top to bottom, following the structure of the `schema`. The order and design of the schema's fields have a direct impact on the narrative the LLM produces.

For example, if a schema first requires a field for meta-reasoning (e.g., `"thought_process"`) before a field for the final `data`, the LLM is forced to first articulate its reasoning before producing the answer. The initial reasoning becomes part of the context that influences the generation of the subsequent data. This powerful mechanism allows us to guide the LLM's thinking, giving us significant control over the final result by shaping the very path it takes to get there.

> [!TIP]
> This entire `Request` pipeline—the `context`, the `schema`, and the resulting `solution`—forms a self-contained, reproducible unit. When saved, this unit is what the system refers to as an [101: Concept/Idea](./101_concept_idea.md).

## From Structured Output to Actionable Choices

A `Request` provides a robust mechanism for generating a single, schema-compliant `solution`. However, to build sophisticated agents, we need more than just structured output. We need a way to present the LLM with a menu of capabilities—distinct actions it can choose from to achieve a goal. This requires a system for defining these actions as discrete, selectable units.

> Sidenote:
>
> - [002: Agent/Tool](./002_agent_tool.md)

The next document, [002: Agent/Tool](./002_agent_tool.md), introduces the protocol for defining these capabilities.
