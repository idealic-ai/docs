# 001: Agent/Request

> **Request:** Think of this as a single, complete mission for an AI brain (an LLM). You give it some background information (`context`) and a blueprint for the answer (`schema`), and it gives you back a finished product (`solution`). — [Glossary](./000_glossary.md)

> Sidenote: NPM: [https://www.npmjs.com/package/@augceo/agent](@idealic-ai/agent)

This page explains the **Request Protocol**, which is the basic way we talk to an AI. A `Request` is like the engine that brings a big **[101: Concept/Idea](./101_concept_idea.md)** to life. It takes the idea's information (`context`) and its rules (`schema`) to build a final `solution`.

## The Request Assembly Line

A `Request` isn't just asking a simple question. It's more like an assembly line that takes lots of different pieces of information and turns them into one perfect answer that follows all the rules.

### 1. Context: A List of Messages

The start of any `Request` is the `context`. Imagine it as a list of text messages that tell the AI everything it needs to know. This lets you show the AI a whole conversation, with different people talking, all neat and organized.

A simple list might look like this:

```json
[
  { "role": "system", "content": "You are a helpful assistant." },
  { "role": "user", "content": "What is the capital of France?" }
]
```
Here, we first tell the AI what its job is (the "system" message) and then ask our question (the "user" message).

### 2. Special Instructions: Custom Content Types

This system is extra cool because messages can contain more than just plain text. The `content` can be a special object, like a piece of data with a label on it, for example: `{ "type": "state", "state": { ... } }`.

Think of these special types as secret instructions hidden inside the messages. Each type has a helper that knows what to do with it. As the assembly line processes the messages, these helpers can change three main things about the mission:

- **AI Settings**: They can tweak the AI's brain, like telling it to be more creative (changing the `temperature`) or to use a different version of its brain (`model`).
- **The Blueprint (`Schema`)**: They can change the rules for the final answer. For example, a special message might add a rule that says, "The answer must include a fun fact!"
- **The Information (`Context`)**: They can change the messages that the AI actually sees. For example, a helper could turn a complicated data object into a simple sentence that the AI can understand, or it could add new messages to the conversation.

This assembly line of helpers lets the system use big, organized ideas and automatically figure out the exact mission to send to the AI.

### 3. Schema: Guiding the Solution with a Blueprint

The `schema` is like a blueprint or a fill-in-the-blanks form. It tells the AI the exact structure the final answer (`solution`) must have. The system is smart and will figure out the best way to give this blueprint to the AI:

1.  **The Best Way (Native Mode)**: If the AI is advanced, you can just hand it the blueprint directly. It knows how to read it and will follow it perfectly.
2.  **The Backup Plan (Tool-Calling)**: If the AI can't read the blueprint directly but knows how to use tools, the system puts the blueprint inside a special tool called "create_the_answer." Then it just tells the AI, "Use this tool to make your answer."
3.  **The Last Resort (Writing it Out)**: If the AI only understands plain text, the system will just describe the blueprint in words, right in the instructions. It's like saying, "Please make sure your answer is a list that has a title and a description."

### 4. Getting the Final Answer (The Solution)

After the assembly line is finished, the final list of messages and the blueprint are packed up and sent to the AI. The AI then creates a response that perfectly matches the blueprint.

The system takes this response and turns it into an organized piece of data. This final, structured data is the `solution`.

This whole process—from handling complicated information to getting back a perfect, rule-following answer—is what makes it possible for a big **Idea** to be used like a building block in a computer program.