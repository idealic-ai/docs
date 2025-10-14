# 101: Concept/Idea

> **Idea:** A self-contained, three-part bundle of information (`schema`, `solution`, `context`) that represents a piece of knowledge. Think of it not as a one-time question, but as a permanent, active building block. — [Glossary](./000_glossary.md)

> Sidenote:
> - What this needs:
>   - [001: Agent/Request](./001_agent_request.md)
> - What this makes possible:
>   - [103: Concept/Ideator](./103_concept_ideator.md)

This document explains how we can build a web of living, evolving documents. It breaks down the system's main building block (the **Idea**) and how we can publish and find these Ideas using the internet's address book, **DNS**.

To learn how `Ideas` can be turned into active services, see [103: Concept/Ideator](./103_concept_ideator.md). To see how they can be stored and owned, check out [102: Concept/Sovereignty](./102_concept_sovereignty.md).

## How a Living Web Works

The whole system is built on one very simple rule: **what you see is what you get.** The only thing in the entire system is a single unit called the **Idea**, which is made of three parts. Because there's no hidden information, you truly own your Ideas and can take them anywhere. You’re never locked in.

*   **Context:** This is the recipe. It includes all the instructions, ingredients, and background information needed to create the final result.
*   **Schema:** This is the rulebook. It's a blueprint that explains what the final result should look like and what rules it must follow, so any AI can understand and work with it.

  > Sidenote:
  > - Learn more at [json-schema.org/](https://json-schema.org/)

*   **Solution:** This is the finished cake. It’s the final output or the main content of the Idea.

Ideas are designed to be **unchangeable**. You can't edit an existing Idea. Instead, to build on a thought, you create a *new* Idea that links back to the old one. This creates a perfect, unbroken history of how a thought grew over time, like saving different versions of a file.

## More Than Just a Prompt

At first glance, an `Idea` might look like just a fancy question you'd ask a chatbot like ChatGPT. But it's much more than that. The big difference is that a chatbot conversation is temporary, while an `Idea` is a permanent, reusable digital object.

Unlike a simple question, an `Idea` bundles everything together: the `input` (the ingredients), the `output` (`solution`), the rules (`schema`), and the entire backstory (`context`). It's not just a question; it's the question, the answer, and a complete map showing how you got from one to the other.

This makes an `Idea` a true building block, like a LEGO brick. You don't just ask an `Idea` a question once. You can copy it, change it, connect it to other Ideas, and build complex systems without writing a single line of traditional code. It's a platform for creating, not just a service for asking questions.

## The Core Rules

To make sure the system stays strong, open, and easy to move around, every `Idea` must follow four main rules.

### 1. Repeatable Results

An `Idea` is designed so you can recreate its results. If you give the same `context` (ingredients) and `schema` (rules) to a similar AI, you should get a very similar `solution` (the final result). Think of it like a recipe: if two people follow the same instructions with the same ingredients, they should both end up with a very similar cake.

### 2. No Hidden Ingredients

Everything in the `context` is visible to the AI when it's working. This means you can't hide secret notes or extra information in there. The AI sees everything, which keeps the process honest and easy to understand.

### 3. The Rules Define the Result

The `solution` is the final state of the `Idea`. Since every `solution` has to follow the rules in its `schema`, the final result is always checked and defined by those rules. This makes sure every `Idea` is structured, predictable, and understandable to any other tool or AI.

### 4. Unchangeable Identity

If you change an `Idea`'s `context` or `schema`, you've created a completely new `Idea`. An `Idea` is like a signed contract—once it's made, it can't be altered. If you want to make a change, you have to create a new version.

## How to Publish and Find Ideas

For an `Idea` to be useful, other people have to be able to find it. We solve this by giving every `Idea` a unique, public address, just like a website's domain name (like `www.google.com`). We use the internet's address book (DNS) to point that name to where the `Idea`'s file is stored.

This separates the `Idea`'s identity from where it lives. That means you can move the `Idea` anywhere, and its address stays the same, making it truly yours and independent of any single company.

How this all works is explained in the next document, [102: Concept/Sovereignty](./102_concept_sovereignty.md).
