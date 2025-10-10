# 001: Agent/Request

> **Request:** Think of this as giving a single, complete job to a very smart computer, often called an AI or LLM. You give it some information (`context`) and a set of rules for the answer (`schema`), and it gives you back a final answer (`solution`). — [Glossary](./000_glossary.md)

> Sidenote: You can find the code for this on the internet here: [https://www.npmjs.com/package/@augceo/agent](@idealic-ai/agent)

This document explains the **Request Protocol**, which is the basic way we talk to a smart computer (LLM). A `Request` is like the engine that takes a big `Idea` and makes it something a computer can actually understand and work with. It does this by using the idea's information (`context`) and rules (`schema`) to create an answer (`solution`).

## The Request Factory

> Sidenote:
>
> The smart computer (LLM) will use the information (`context`) to create an answer (`solution`) that perfectly follows the rules (`schema`).
>
> ```mermaid
> graph TD
>     subgraph User Input
>         direction LR
>         Context["Information / Ingredients"]
>         Schema["Rules / Blueprint"]
>     end
>
>     Process{{"Give Job to Computer"}}
>
>     subgraph LLM Output
>         direction LR
>         Solution[/"Final Answer"/]
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

A `Request` isn't just asking a simple question. It's more like a factory assembly line. It takes all the different pieces of information you provide and turns them into a single, perfectly structured answer from the smart computer.

### 1. Context: The Story So Far

The most important part of a `Request` is the `context`. This is basically all the background information the computer needs, given as a list of messages. It's like showing the computer a text message history so it knows what you've been talking about.

A simple context might look like this:

```json
[
  { "role": "system", "content": "You are a helpful assistant." },
  { "role": "user", "content": "What is the capital of France?" }
]
```

This tells the computer its job ("be helpful") and then gives it the user's question.

### 2. Special Kinds of Information

We can make this even cooler by sending **special types of information** in the messages. Instead of just plain text, the `content` of a message can be an organized package of data, like `{ "type": "state", "state": { ... } }`.

Think of these special types like different kinds of mail. For each type, there's a special helper that knows how to open that package and get it ready for the main computer. As each message goes down the assembly line, its helper can adjust the job instructions:

- **Computer Settings**: The helper can tell the main computer to be more creative or more precise, like turning a knob.
- **The Rules**: The helper can change the blueprint for the final answer.
- **The Information**: The helper can translate the special package into plain words that the computer understands, or even add new messages to give it extra clues.

This powerful assembly line lets us give the computer big, complicated ideas to work with, not just simple questions.

### 3. Schema: The Rules for the Answer

The `schema` is a blueprint that tells the computer _exactly_ what the final answer, or `solution`, must look like. For example, it might say, "Your answer must be a list containing three names."

The system is smart and figures out the best way to give these rules to the computer:

1.  **The Direct Way**: If the computer is a new, advanced model, we can just give it the blueprint directly. It knows how to read it perfectly. This is the best and most reliable method.
2.  **The Tricky Way**: If the computer is a bit older, it might not understand blueprints. So, we wrap the blueprint inside a special "tool" and tell the computer, "Use this tool to create your answer." The computer just thinks it's using a tool, but it's secretly following our rules.
3.  **The Simple Way**: For even simpler computers, we just write out the rules in plain English. It's like adding a note that says, "Please make sure your answer is a JSON object that looks like this...". This is our last resort because it's not as foolproof.

### 4. Making It Happen and Getting the Answer

After all the information is prepared and the rules are set, everything is bundled up and sent to the smart computer. The computer then does its work and creates a response that follows the blueprint.

The system takes this response and turns it into a neat, organized piece of data that other computer programs can easily use. This final, perfectly structured answer is the `solution`.

This whole assembly line—from understanding a bunch of complex information to creating a perfect, rule-following answer—is what allows a big `Idea` to become something a computer can actually build and run.

The `schema` defines the shape of the `solution`.
