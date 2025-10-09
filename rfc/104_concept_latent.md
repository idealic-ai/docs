# 104: Concept/Latent

> Sidenote:
>
> - Requires:
>   - [101: Concept/Idea](./101_concept_idea.md)
> - Enables
>   - [001: Agent/Request](./001_agent_request.md)

> **Latent:** The use of a Large Language Model's (LLM) internal knowledge and reasoning capabilities (its "latent space") to generate outputs without explicit, deterministic code. — [Glossary](./000_glossary.md)

## 1. Introduction

The concept of **Latent** is fundamental to the system's architecture, encompassing both the process (**Latent Execution**) and the source of knowledge (**Latent Space**). It is the system's default computational method, relying on a Large Language Model (LLM) to function as a universal interpreter. This approach allows the system to bridge the gap between an `Idea`'s input (`context`) and its output (`solution`) by navigating and arranging the LLM's vast internal knowledge.

This approach is fundamental to the system's flexibility, allowing for the composition and execution of workflows even when no explicit, deterministic code has been written for the constituent tasks.

## 2. The Latent Space: An Ocean of Knowledge

The **Latent Space** is the vast, high-dimensional representation of knowledge, patterns, and relationships that an LLM learns during its training. It is not a database of facts, but a complex map of concepts where proximity and orientation define semantic relationships. Large language models are powerful precisely because of the richness of this space, but their knowledge is only useful if it can be accessed and directed effectively.

The primary challenge is not the existence of this knowledge, but the ability to navigate it. The system is designed to solve this by providing the right questions and, critically, the right context to guide the LLM to the relevant areas of its latent space.

## 3. Latent Execution: Activating the Latent Space

**Latent Execution** is the process of activating the latent space to perform a task. It is what occurs when the system defaults to using the LLM because no explicit, deterministic code (`Activity`) is registered to handle a `Call`.

The process is as follows:

1.  A `Call` is made to a `Tool` or `Idea`.
2.  The system determines that there is no registered `Activity` for the `Call`.
3.  The system provides the LLM with the complete `context` and the `schema` for the desired `_output`.
4.  The LLM's task is to navigate its latent space, using the provided context as a guide, and generate a `solution` that conforms to the output `schema`.

This transforms the LLM from a simple text generator into a dynamic execution engine that can fulfill novel interfaces on the fly.

## 4. Context Management: Arranging the Latent Space

The system's most critical function is to **optimize the arrangement of the latent space** within a single request. It does this through sophisticated context management, using a variety of "tool-like tricks" to focus the LLM's attention and guide its reasoning.

- **Rich Context**: By providing a structured history of messages, state objects, and user queries, the system primes the LLM with the necessary background to understand the task.
- **Schema-Based Reasoning**: JSON Schema is used not just to validate the final output, but to guide the generation process itself. It provides a blueprint for the desired `solution`, forcing the LLM to structure its reasoning and constrain its path through the latent space.
- **Instructions and Tools**: `Instructions` and `Tools` act as powerful lenses, focusing the LLM on a specific capability or reasoning framework. They are "tricks" that help select the most relevant sub-section of the latent space for a given task.

Effective context management is what makes latent execution reliable. It is how the system turns the LLM's vast, undifferentiated ocean of knowledge into a precise and useful tool.

## 5. The Default for Optimistic Composition

Latent Execution is not an exception; it is the default behavior. The system operates on an "optimistic" principle: it assumes any defined interface can be fulfilled by arranging the latent space correctly. An `Activity` with deterministic code is treated as a progressive enhancement—an optimization for tasks that require speed, reliability, or access to external APIs.

This default has a profound impact on development:

- **Rapid Prototyping**: Developers can define and chain together multiple `Tools` and `Ideas` into a complex `Plan` without writing a single line of implementation code. The LLM executes the entire workflow latently.
- **Seamless Composition**: It allows for the combination of `Ideas` and `Tools` from different authors and sources, even if their underlying implementations are not available.
- > Sidenote: This concept is further explored in [RFC 303: Ideator/Reactor](../rfc/303_ideator_reactor.md).

  **Progressive Crystallization**: A workflow can begin its life entirely in the latent space. As the system evolves, performance bottlenecks or critical processes can be selectively "crystallized" into `Activities` with explicit code, without changing the overall structure of the workflow.

By making latent execution the default, the system prioritizes flexibility and speed of iteration, enabling the creation of complex agentic behaviors from day one.
