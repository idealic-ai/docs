# 101: Concept/Idea

> **Idea:** Think of an Idea not as a fleeting thought, but as a complete instruction kit. It’s a self-contained box with three parts: a blueprint (`schema`), the finished product (`solution`), and all the materials and instructions used to make it (`context`). It’s a permanent, digital building block, not just a temporary command. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [001: Agent/Request](./001_agent_request.md)
> - Enables: [103: Concept/Ideator](./103_concept_ideator.md)

This document explains the plan for building a new kind of web made of “living documents” that can think and grow on their own. We'll look at the main building block of this web (the **Idea**) and how we can publish and find these Ideas using the internet's address book (**DNS**).

To learn how these `Ideas` can be turned into active tools you can use, see [103: Concept/Ideator](./103_concept_ideator.md). To see the different ways these `Ideas` can be stored and owned online, check out [102: Concept/Sovereignty](./102_concept_sovereignty.md).

## The Mechanics of a Living Web

The whole system is built on one very simple but powerful rule: **the content itself contains all the rules.** Everything in this system is made from a single type of building block: a self-contained kit called the **Idea**.

Imagine a Lego kit. This structure is what gives you true ownership and freedom. Because everything you need is inside the box and there are no hidden pieces, you're never locked into one platform. You can take your kit and build it anywhere.

An Idea has three parts:

- **Context:** These are all the instructions and raw materials. It’s the list of parts, the step-by-step guide, and any pictures you need to build your model.
- **Schema:** This is the blueprint. It defines exactly what the final creation should look like and what rules it must follow. This blueprint is written in a universal language (`jsonschema`) so that any AI can understand it, use it, and even change it.

  > Sidenote:
  >
  > - [json-schema.org/](https://json-schema.org/)

- **Solution:** This is the finished product—the Lego model you built, the answer to the question, or the final piece of content.

Ideas are designed to be **unchangeable**. Once an Idea is created, it can't be edited. If you want to improve or change it, you create a *new* Idea that refers back to the old one. This creates a perfect, unbreakable history of how your thought has evolved over time.

## Beyond the Prompt: A New Computational Primitive

At first, an `Idea` might just look like a fancy command you give to a chatbot like ChatGPT. But that's not the whole picture. The difference is like asking for a sandwich versus owning the entire recipe.

A simple chat command is a one-time thing; you ask a question, you get an answer, and the conversation is forgotten. An `Idea` is a complete, permanent package. It bundles your original request (`context`), the rules for the answer (`schema`), and the final answer itself (`solution`) into a single kit that you can keep forever.

It’s not just a question; it’s the question, the answer, and the exact recipe that connects them. This allows you to build a lasting system, not just have a one-off chat.

This makes an `Idea` a true digital building block. You don't just “use” an Idea once. You can copy it, mix it with other Ideas, and connect them together to build amazing new things, all without writing complicated code. It’s a creative platform, not just a simple command.

## Core Invariants

To make sure this system is strong, honest, and easy to move around, every `Idea` must follow four unbreakable rules.

### Deterministic Provenance

An `Idea` is designed to be repeatable. If you give the same instructions (`context`) and the same blueprint (`schema`) to a smart AI, you should get a very similar result (`solution`). This rule ensures that we can always trace an Idea back to its origins. Even though different AIs might create slightly different results, the goal is that the output is always a clear result of its inputs.

### Transparent Context

No secret ingredients. The AI sees the entire `context`—all the instructions and materials—when it's working. This means you can't use the `context` to hide secret information that isn't part of the task. This rule keeps the process clear and focused.

### Schema-Bound State

The final product is what matters. The `solution` holds all the important information, and it *must* follow the rules of its `schema` (the blueprint). This ensures that every Idea's result is structured, predictable, and easy for any other person or AI to understand.

### Immutability

If you change the instructions or the blueprint, you've created a new `Idea`. An `Idea` can be updated by adding new things to its blueprint, which is fine. But if you make a fundamental change to the blueprint, you have to call it a new version. This protects the history of every Idea.

## Publication & Discovery: Decentralized Identity via DNS

Think of the internet’s DNS (Domain Name System) as a giant, public address book. We use DNS to give every `Idea` a unique, findable name, like a website address. This gives the `Idea` an identity that's separate from where its files are actually stored.

This is the foundation for the whole system, allowing an `Idea` to exist anywhere but still be found by anyone.

For more on how `Ideas` can be stored in different ways, from your own computer to big servers, see [102: Concept/Sovereignty](./102_concept_sovereignty.md).

### The DNS Identity Mechanism

- **How It Works:** An `Idea` is given its own unique domain name (like `my-cool-idea.com`). We then add a small, public note to that address in the internet's address book. This note is called a `TXT` record, and it contains a link pointing to the `Idea`'s main file. This file contains the complete recipe for the `Idea`.