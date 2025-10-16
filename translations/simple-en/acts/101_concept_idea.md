# 101: Concept/Idea

> [!DEFINITION] [Idea](./000_glossary.md)
> An Idea is a self-contained package of knowledge. Think of it like a recipe card that has three parts: the ingredients (`context`), the rules for how the final dish should turn out (`schema`), and the finished dish itself (`solution`). It’s a permanent building block, not a temporary message.

> Sidenote:
> - Requires:
>   - [001: Agent/Request](./001_agent_request.md)
> - Enables:
>   - [103: Concept/Ideator](./103_concept_ideator.md)

This document explains the plan for building a new kind of web, made of connected, “living” documents. We’ll look at the main building block of this web (the **Idea**) and how we can find and share these Ideas using internet addresses (**DNS**).

To learn how these Ideas can be turned into active tools, read [103: Concept/Ideator](./103_concept_ideator.md). To see the different ways they can be hosted, check out [102: Concept/Sovereignty](./102_concept_sovereignty.md).

## The Mechanics of a Living Web

The whole system is built on one big rule: **the information itself contains all the rules.** The only building block is a simple three-part package called an **Idea**. This setup means you truly own your creations and can take them anywhere, because there are no hidden parts or secret settings. You never get locked into one system.

- **Context:** This is all the background info. It’s like the ingredients list and instructions for a recipe—everything the AI needs to get started.
- **Schema:** This is the blueprint. It defines the structure of the final result using a standard called `jsonschema`. It tells the AI, “Your answer must have a title, a date, and a list of three points.” This allows any AI to understand and work with the Idea.

  > Sidenote:
  > - More at [json-schema.org/](https://json-schema.org/)

- **Solution:** This is the final output or the answer that the Idea produces.

Ideas are designed to be **unchangeable**. You don't edit an existing Idea. Instead, to build on a thought, you create a brand new Idea that points back to the old one. This creates a perfect, unbreakable history of how a thought grew over time, like stacking transparent pages on top of each other.

## More Than a Prompt: A New Building Block

At first, an `Idea` might look like just a fancy question you ask a chatbot like ChatGPT. But it’s much more than that. The big difference is that we are moving from single, temporary chats to a system of lasting, connectable creations.

A simple chat question is temporary—you ask, you get an answer, and it’s over. An `Idea` is a complete, self-contained package. It bundles the question (`context`), the answer (`solution`), and the rules (`schema`) into one portable unit. It’s not just a question; it's the question, the answer, and the recipe that connects them. This allows us to build with them, creating a lasting system, not just having a one-time chat.

This makes an `Idea` a new kind of digital building block. You don't just “ask” an Idea a question. You can copy it, change it, and plug it into other Ideas to build complex chains of thinking, all without writing normal computer code. It’s a platform for creating, not just a tool for asking.

## The Core Rules

To make sure this system is strong, honest, and can be used anywhere, every part of it must follow four main rules.

### Recreatable Results

An `Idea` is designed so you can recreate its result. If you give the same `context` (ingredients) and `schema` (blueprint) to a similar AI, you should get a very similar `solution` (the final dish). This rule ensures that we can trace how a result was created. While different AIs might create slightly different results, the goal is for the final answer to be a direct result of its starting parts.

### No Hidden Information

The AI can see the entire `context` when it's working. This means you can't use the `context` to store secret information that isn't directly related to the task. This rule is important to keep the `Idea` focused and honest about what it’s doing.

### The Result Follows the Blueprint

The `solution` is the final state of the Idea. Since every `solution` must follow the rules of its `schema`, the state is always structured and predictable. This ensures that every Idea's result is clear, organized, and understandable to any other system.

### Unchangeable

If you change the `context` or the `schema` of an `Idea`, it becomes a new `Idea`. An Idea is considered a simple update if you only add new fields to the `schema` (the blueprint). If you make a breaking change to the `schema`, you have to create a new version.

## Sharing & Finding Ideas

For an `Idea` to be useful, other people have to be able to find it. To do this in a decentralized way (without a central directory), every `Idea` gets its own unique, global name, like a website address. This separates the `Idea` from where it's stored, making it truly portable and independent.

This works by giving each `Idea` a unique domain name and using internet address records (DNS) to point to its official file. The details of how this works are explained in the next document, [102: Concept/Sovereignty](./102_concept_sovereignty.md).
