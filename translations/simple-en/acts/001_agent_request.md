# 001: Agent/Request

> [!DEFINITION] Request
> A single, self-contained job for an AI. You give it all the background information it needs (the :term[context]{canonical="context"}), along with a fill-in-the-blanks template for the answer (the :term[schema]{canonical="schema"}), and it gives you back the finished result (the :term[solution]{canonical="Solution"}).

> Sidenote:
>
> - Helps create:
>   - :term[101: Concept/Idea]{href="./101_concept_idea.md"}
> - Links:
>   - [NPM: @idealic/agent](https://www.npmjs.com/package/@augceo/agent)

The :term[Request]{canonical="Request"} is the most fundamental building block of our AI agent. Think of it as a detailed, repeatable recipe for getting work done. It turns a rich set of instructions and a specific format into a precise, perfectly structured answer. Unlike just typing a question into a chatbot, a :term[Request]{canonical="Request"} is a complete, self-contained work order that powers everything the agent can do.

## Context: The Briefing Packet

> Sidenote:
> The AI will use the :term[context]{canonical="context"} (briefing packet) to create a :term[solution]{canonical="Solution"} (answer) that fits the :term[schema]{canonical="schema"} (template).
>
> ```mermaid
> graph TD
>     subgraph User Input
>         direction LR
>         Context[\Briefing Packet\]
>         Schema[\Answer Template\]
>     end
>
>     Process{{"The Job (Request)"}}
>
>     subgraph LLM Output
>         direction LR
>         Solution[/"The Answer (Solution)"/]
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

The foundation of a :term[Request]{canonical="Request"} is its :term[context]{canonical="context"}: a list of `Message` objects. Each message is simple, with a `role` (like who is speaking: `"system"`, `"user"`, or the `"assistant"` itself) and the `content` of the message. This structure lets us present a whole conversation to the AI at once.

Here’s the important part: Unlike a regular chatbot that just keeps adding to one long conversation, the :term[context]{canonical="context"} for each :term[Request]{canonical="Request"} is a fresh, custom-built briefing packet. We create it from scratch for one specific job and don't let it get messy with things from past conversations. The AI’s answers aren't automatically added back in; we rebuild the packet for the next job. This makes sure the process is reliable and that the AI has exactly the information it needs, without forgetting important details or getting confused.

This carefully managed packet is how we give the AI its instructions, data, and questions. Everything it needs to do the job—except for the format of the final answer—is inside these messages.

A simple list of messages might look like this:

```json
[
  { "role": "system", "content": "You are a helpful assistant." },
  { "role": "user", "content": "What is the capital of France?" }
]
```

Our system takes this a step further. Instead of just plain text, a message's `content` can also hold special, structured objects called **custom content types**. For example, a message could contain an object like `{ "type": "input", "input": { ... } }`.

> Sidenote:
> These special message types are explained in other documents:
>
> - :term[006: Agent/Data]{href="./006_agent_data.md"} - Give data to the AI and explain what it means.
> - :term[007: Agent/Input]{href="./007_agent_input.md"} - Give the AI a structured question to work on.
> - :term[009: Agent/State]{href="./009_agent_state.md"} - Let the AI remember things between steps.
> - :term[010: Agent/Plan]{href="./010_agent_plan.md"} - Give the AI a pre-made plan to follow.

_This feature is what makes the whole system so flexible._

Each of these special message types has its own little helper program. Before the :term[Request]{canonical="Request"} is sent to the AI, these helpers run one by one, like workers on an assembly line. As they process each message, they can change the main parts of the job order:

- **AI Settings**: They can tweak things like which AI model to use or how creative it should be.
- **Answer Template (:term[schema]{canonical="schema"})**: They can change the required format for the final answer.
- **Briefing Packet (:term[context]{canonical="context"})**: They can change the messages that the AI will see, like turning a special object into plain text or adding new instructions.

This powerful assembly line allows the agent to work with complex ideas, automatically creating the perfect, fine-tuned command for the AI to handle any task.

## Schema: The Fill-in-the-Blanks Template

> Sidenote:
>
> - Learn more at [json-schema.org](https://json-schema.org/)

The :term[schema]{canonical="schema"} is a blueprint that defines the exact structure of the answer we want. Think of it as a fill-in-the-blanks form. It can be for anything from a simple word to a complex report with many nested sections. The AI is required to produce an answer that perfectly fits this blueprint, which means the output is always organized and predictable.

As these templates get more detailed, they can do more than just shape the final answer—they can also guide the AI's thought process. For example, a template could have a field for the final answer, but also another field that asks the AI to first write down its step-by-step reasoning. This turns the template into a tool that helps shape how the AI thinks.

A key idea here is that we can build complex blueprints by snapping together simpler, reusable ones. This makes it easy to teach the agent new skills in a neat and organized way.

## The Job and the Result

After the briefing packet is prepared by the assembly line, the final list of messages and the answer template (:term[schema]{canonical="schema"}) are sent to the AI in a single go. The AI's response is the :term[solution]{canonical="Solution"}—a perfectly structured document that matches the template exactly.

You can think of this process as the AI telling a short story. Since the AI works by predicting the very next word, it fills out the template from top to bottom. The order of the fields in your template directly affects the story it tells.

For example, if the template first asks for a `"thought_process"` section before the final `"answer"` section, the AI is forced to explain its thinking _before_ giving the answer. The AI's own reasoning then becomes part of the context it uses to come up with the final answer. This is a powerful way to guide the AI's thinking and give us more control over the result by shaping the path it takes to get there.

> [!HEADSUP] Heads up
> This entire package—the :term[context]{canonical="context"} (briefing packet), the :term[schema]{canonical="schema"} (template), and the resulting :term[solution]{canonical="Solution"}—forms a single, repeatable unit of work. When we save this unit, we call it an :term[101: Concept/Idea]{href="./101_concept_idea.md"}.

## From Structured Answers to Smart Choices

A :term[Request]{canonical="Request"} is a great way to get a single, well-structured answer from the AI. But to build truly smart agents, we need more than that. We need to give the AI a menu of different tools or actions it can choose from to solve a bigger problem. This means we need a way to define these actions as separate, selectable options.

> Sidenote:
>
> - :term[002: Agent/Tool]{href="./002_agent_tool.md"}

The next document, :term[002: Agent/Tool]{href="./002_agent_tool.md"}, explains how we create this menu of capabilities.
