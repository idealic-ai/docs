# 001: The Request: How We Talk to the AI

> **In simple terms:** A "Request" is a single, complete job you give to an AI. You give it some background information (`context`), a set of rules for the answer (`schema`), and it gives you back a final result (`solution`). — [What These Words Mean](./000_glossary.md)

> Sidenote:
>
> - Makes this possible: [101: Idea](./101_concept_idea.md)
>
> Find it here: [https://www.npmjs.com/package/@augceo/agent](@idealic-ai/agent)

This page explains the **Request Protocol**, which is just a fancy way of saying "the rules for talking to an AI." A `Request` is like the engine that makes a big **[Idea](./101_concept_idea.md)** actually work. It takes the idea's background information (`context`) and rules (`schema`) and uses them to create an answer (`solution`).

## How a Request Works, Step-by-Step

> Sidenote:
> The AI will use the `context` to create a `solution` that follows the rules of the `schema`.
>
> ```mermaid
> graph TD
>     subgraph User Input
>         direction LR
>         Context[/"The background info (Context)"/]
>         Schema[/"The rules for the answer (Schema)"/]
>     end
>
>     Process{{"The Job (Request)"}}
>
>     subgraph LLM Output
>         direction LR
>         Solution[/"The Final Answer (Solution)"/]
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

A `Request` isn't just asking the AI a simple question. It's more like a recipe or an assembly line that turns lots of information into one perfect, rule-following answer.

### 1. Context: The Starting Information

The most important ingredient for a `Request` is its `context`. Imagine it's like a chat history you're showing to the AI so it knows what you've been talking about. It's given as a list of `Message` objects.

A simple chat history might look like this:

```json
[
  { "role": "system", "content": "You are a helpful assistant." },
  { "role": "user", "content": "What is the capital of France?" }
]
```

This basically tells the computer, "First, I want you to act like a helpful assistant. Then, I, the user, am asking you this question."

### 2. Special Types of Content

This system can do something cooler than just sending text. The `content` of a message can be a special, structured object, not just a plain sentence. For example: `{ "type": "state", "state": { ... } }`.

Think of these special types like power-ups in a video game. The system has a list of these power-ups and knows what each one does. When it sees one in the chat history, its special ability can change three things about the job:

- **AI Settings**: It can change things like which AI model to use or how creative it should be.
- **The Rules (`Schema`)**: It can change the rules for what the final answer should look like.
- **The Chat History (`Context`)**: It can change the messages themselves. For instance, it might turn a special power-up into a plain-text description that the AI can understand better, or even add new messages to the conversation.

This lets us work with big, smart ideas and automatically build the perfect, precise question for the AI to answer.

### 3. Schema: The Blueprint for the Answer

The `schema` is like an instruction manual or a blueprint that tells the AI _exactly_ what the final `solution` must look like. The system is smart about making the AI follow these rules. It tries three different methods:

1.  **The Best Way (Native JSON Schema)**: If the AI is advanced (like newer models from OpenAI), it has a built-in "Follow the Blueprint" mode. We just give it the schema, and it follows the rules perfectly.
2.  **The Clever Trick (Tool-Calling)**: If the AI doesn't have that mode but knows how to use "tools," we wrap our blueprint inside a fake tool called `generate_response` and tell the AI, "Your job is to use this tool." It's a sneaky way to make it follow our rules.
3.  **The Last Resort (Just Asking Nicely)**: If the AI can only give back basic text, we just tell it in the instructions, "Please make sure your answer is a JSON object that looks exactly like this..." and we show it the blueprint as plain text.

### 4. Getting the Final Answer

After all the preparation, the final list of messages and the chosen blueprint strategy are bundled up and sent to the AI. The AI then creates an answer that follows all the rules.

The system takes this answer and turns it into a perfectly structured piece of data. This final, correct answer is the `solution`.

> [!TIP]
> This whole package—the chat history (`context`), the blueprint (`schema`), and the final answer (`solution`)—is a complete, repeatable job. When you save it, this entire thing is what the system calls an **[Idea](./101_concept_idea.md)**.

The `schema` defines what the `solution` will look like.
