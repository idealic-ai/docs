# 001: Agent/Request

> [!DEFINITION] :term[Request]
> A single, self-contained LLM invocation, which takes a :term[context] and a :term[schema] and produces a :term[solution].

> Sidenote:
>
> - Enables:
>   - :term[101: Concept/Idea]{href="./101_concept_idea.md"}
> - Links:
>   - [NPM: @idealic/agent](https://www.npmjs.com/package/@augceo/agent)

The :term[Request] is the core computational primitive of the agent system. It provides a structured, reproducible, and extensible pipeline for interacting with an LLM, turning a rich context and a declarative schema into a precise, structured solution. Unlike a simple prompt, a :term[Request] is a complete, self-contained unit of work that serves as the engine for all higher-level agent capabilities.

## Context: A Pipeline of Messages

> Sidenote:
>
> LLM will process the :term[context] to generate a :term[solution] that conforms to the :term[schema].
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

The foundation of a :term[Request] is its :term[context]: an array of `Message` objects. Each `Message` is a simple structure containing a `role` (like `"system"`, `"user"`, or `"assistant"`) and `content`. This structure allows a rich, multi-turn conversation to be presented to the LLM.

Unlike a typical chat-based model where messages are continuously appended to a growing history, the :term[context] for each :term[Request] is a fully managed, standalone package. It is carefully constructed for a specific task and is not polluted by previous, unrelated interactions. The LLM's responses are not automatically added back; the context is rebuilt for each new computation. This ensures that the process is reproducible and that the LLM has the exact information it needs, without the risk of context truncation or "forgetting" crucial details.

This managed context is the primary mechanism for providing the LLM with prompts, data, and instructions. Everything required for the computation, except for the final output :term[schema], is delivered through these messages.

A simple `Message` array might look like this:

```json
[
  { "role": "system", "content": "You are a helpful assistant." },
  { "role": "user", "content": "What is the capital of France?" }
]
```

The system extends this basic `Message` structure by allowing the `content` field to hold not just text, but specialized objects called **custom content types**. For example, instead of a string, a message's content could be a structured object like `{ "type": "input", "input": { ... } }`.

> Sidenote:
>
> Custom message types described in Acts:
>
> - :term[006: Agent/Data]{href="./006_agent_data.md"} - present data and its meaning to LLM as a message
> - :term[007: Agent/Input]{href="./007_agent_input.md"} - structured prompt for LLM to use
> - :term[009: Agent/State]{href="./009_agent_state.md"} - persistent state retained within loop
> - :term[010: Agent/Plan]{href="./010_agent_plan.md"} - prepared plan for multi-step execution

This capability makes the :term[context] the main point of extension within the system.

Each custom content type is registered with a handler, and these handlers form a processing pipeline. Before the :term[Request] is sent to the LLM, the pipeline processes each message in the :term[context]. A message's handler can dynamically modify the core components of the :term[Request]:

- **LLM Config**: Adjusting parameters like the model, temperature, or other settings.
- **:term[Schema]**: Modifying the JSON schema that the final output must conform to.
- **:term[Context]**: Altering the final list of messages that will be sent to the LLM, for example by transforming the custom type into a text-based representation or adding new messages.

This powerful pipeline mechanism allows the agent to work with high-level, structured concepts, dynamically constructing the precise LLM invocation needed to perform a task.

## Schema: Guiding the Solution

> Sidenote:
>
> - Read more at [json-schema.org](https://json-schema.org/)

The :term[schema] is a JSON Schema that defines the exact structure of the desired :term[solution]. This is a powerful system that allows for the representation of any type of data, from simple strings to complex, nested objects. The LLM is forced to generate a :term[solution] that strictly conforms to this schema, guaranteeing that the output is always well-structured and predictable.

As schemas grow in complexity, they can be designed to guide not only the final output but also the LLM's reasoning process. For example, a :term[schema] can include fields for the data itself, as well as separate fields that prompt the LLM to outline its reasoning, chain of thought, or confidence scores. This turns the schema into an active tool for shaping the generation process.

A core principle of this architecture is the composition of schemas. More complex capabilities are built by combining simpler, reusable schema components, allowing for a modular and scalable approach to defining the agent's knowledge and abilities.

## Execution and the Solution

After the :term[context] is processed, the final array of messages and the :term[schema] are sent to the LLM in a single request. The LLM's response is the :term[solution]—a structured, JSON-based document that strictly conforms to the provided :term[schema].

This process can be understood as the generation of a mini-narrative. Because an LLM operates as a next-token predictor, it generates the :term[solution] from top to bottom, following the structure of the :term[schema]. The order and design of the schema's fields have a direct impact on the narrative the LLM produces.

For example, if a schema first requires a field for meta-reasoning (e.g., `"thought_process"`) before a field for the final :term[data], the LLM is forced to first articulate its reasoning before producing the answer. The initial reasoning becomes part of the context that influences the generation of the subsequent data. This powerful mechanism allows us to guide the LLM's thinking, giving us significant control over the final result by shaping the very path it takes to get there.

> [!HEADSUP] Heads up
> This entire :term[Request] pipeline—the :term[context], the :term[schema], and the resulting :term[solution]—forms a self-contained, reproducible unit. When saved, this unit is what the system refers to as an :term[101: Concept/Idea]{href="./101_concept_idea.md"}.

## From Structured Output to Actionable Choices

A :term[Request] provides a robust mechanism for generating a single, schema-compliant :term[solution]. However, to build sophisticated agents, we need more than just structured output. We need a way to present the LLM with a menu of capabilities—distinct actions it can choose from to achieve a goal. This requires a system for defining these actions as discrete, selectable units.

> Sidenote:
>
> - :term[002: Agent/Tool]{href="./002_agent_tool.md"}

The next document, :term[002: Agent/Tool]{href="./002_agent_tool.md"}, introduces the protocol for defining these capabilities.
