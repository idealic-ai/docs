# 001: Agent/Request

> **Request:** A single, self-contained LLM invocation, which takes a `context` and a `schema` and produces a `solution`. — [Glossary](./000_glossary.md)

> Sidenote: NPM: [https://www.npmjs.com/package/@augceo/agent](@idealic-ai/agent)

This document describes the **Request Protocol**, which defines the fundamental unit of interaction with an LLM. The `Request` is the engine that makes the abstract **[101: Concept/Idea](./101_concept_idea.md)** computable by taking its `context` and `schema` to generate a `solution`.

## The Request Pipeline

A `Request` is not a simple prompt. It is a structured pipeline that transforms a rich, multi-part context into a single, schema-compliant response from an LLM.

### 1. Context: An Array of Messages

The foundation of a `Request` is its `context`, which is provided as an array of `Message` objects. This allows for a complex, multi-turn, or multi-role conversation to be presented to the LLM in a structured way.

A simple context might look like this:

```json
[
  { "role": "system", "content": "You are a helpful assistant." },
  { "role": "user", "content": "What is the capital of France?" }
]
```

### 2. Custom Content Types

The system extends this basic structure by allowing **custom content types** within messages. Instead of just a string, the `content` of a message can be a structured object, like `{ "type": "state", "state": { ... } }`.

These custom types are defined and managed by the `Content` system (see `agent/src/Content/Content.ts`). Each custom type is registered with a handler, and these handlers form a processing pipeline. As each message is processed, its handler can modify the three core components of the `Request`:

- **LLM Config**: Adjusting parameters like the model, temperature, or other settings.
- **Schema**: Modifying the JSON schema that the final output must conform to.
- **Context**: Altering the final list of messages that will be sent to the LLM, for example by transforming the custom type into a text-based representation or adding new messages.

This powerful pipeline mechanism allows the agent to work with high-level, structured concepts, dynamically constructing the precise LLM invocation needed to perform a task.

### 3. Schema: Guiding the Solution

The `schema` is a JSON Schema that defines the exact structure of the desired `solution`. The `Request` function inspects the capabilities of the target LLM provider to determine the best way to enforce the schema:

1.  **Native JSON Schema Mode**: If the provider supports it (like newer OpenAI models), the schema is passed directly in the `response_format` field of the API call. This is the most reliable method.
2.  **Tool-Calling Fallback**: If the provider supports tool-calling but not native schema mode, the system wraps the schema inside a function tool named `generate_response` and instructs the model to call that tool.
3.  **JSON Mode with Prompt Injection**: As a last resort for providers that only support generic JSON output, the system instructs the model to generate a JSON object and injects the schema as a string into the system prompt.

### 4. Execution and the Solution

After preprocessing, the final array of messages and the schema enforcement strategy are packaged into a single API request and sent to the LLM. The LLM then generates a response that conforms to the schema.

The system parses this response—whether it comes from the message content or a tool call's arguments—into a structured JavaScript object. This object is the `solution`.

This entire pipeline—from processing a complex context to receiving a schema-validated solution—is what enables the **Idea** to function as a core computational primitive in the system.
