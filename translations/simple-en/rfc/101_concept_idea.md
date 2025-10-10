# 101: Concept/Idea

> **Idea:** Imagine a smart little box of knowledge. Inside, it holds three things: the rules for what can be inside it (`schema`), the final answer or creation (`solution`), and all the ingredients and instructions used to make it (`context`). It's like a complete recipe kit that never disappears, not just a quick chat message. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Needs:
>   - [001: Agent/Request](./001_agent_request.md)
> - Helps create:
>   - [103: Concept/Ideator](./103_concept_ideator.md)

This document explains how we can build a new kind of web made of “living documents.” We’ll look at the main building block of this web (the **Idea**) and how to find and share these Ideas using the internet’s address book (**DNS**).

To see how these `Ideas` can turn into real, working apps, check out [103: Concept/Ideator](./103_concept_ideator.md). To learn about all the different ways to host them, see [102: Concept/Sovereignty](./102_concept_sovereignty.md).

## How a Living Web Works

The whole system is based on one simple but powerful rule: **the information itself is the system.** There's only one type of building block, a three-part package called the **Idea**. Because everything you need is inside this one package, you truly own it. You can move it anywhere, and you're never trapped in one service or app.

- **Context:** Think of this as the recipe and all the ingredients. It’s all the source materials, instructions, and notes that were used to create the final product.
- **Schema:** This is the blueprint. It’s a set of rules, written in a special language (`jsonschema`), that describes what the final product should look like. This blueprint allows any computer or AI to understand and work with the Idea.

  > Sidenote:
  >
  > - You can learn more at [json-schema.org/](https://json-schema.org/)

- **Solution:** This is the finished product—the cake you baked, the picture you drew, or the answer you found.

Ideas are **unchangeable by design**. The only thing you can do is share an Idea. If you want to change or build on a thought, you create a *new* Idea that points back to the old one. This creates a perfect, unbroken history of how the thought grew over time, like saving different versions of a drawing instead of erasing the original.

## More Than a Chat Message: A New Building Block for Computers

At first, an `Idea` might just look like a fancy message you'd send to a chatbot AI. But it's much more than that. The big difference is that we’re moving from single, forgettable chats to a system of lasting, reusable creations.

Unlike a simple question you ask a chatbot, an `Idea` is a complete, self-contained package. It bundles the `question`, the `answer` (`solution`), the `rules` (`schema`), and the entire story of its creation (`context`) into one object you can carry around. It's not just a question; it's the question, the answer, and the exact recipe that connects them. This allows us to build with them, not just ask them one-off questions.

This makes an `Idea` a true building block for computers—like a LEGO brick. You don't just “use” an Idea once; you can copy it, change it, connect it to other Ideas, and build amazing new things, all without writing complicated code. It’s a whole creative platform, not just a simple tool.

## The Core Rules

To make sure this system is strong, honest, and easy to use everywhere, every version of it must follow four main rules.

### Followable History

An `Idea` is designed so you can recreate it. If you give the same recipe (`context`) and blueprint (`schema`) to a similar AI, you should get a very similar result (`solution`). This helps us build a web where we can trust where ideas came from. Even if different AIs give slightly different answers, the goal is that the result can always be traced back to its starting ingredients.

### No Secret Ingredients

The AI gets to see the entire recipe (`context`) when it's working. This means you can't use the `context` to hide secret information that isn't part of the instructions. This rule makes sure the `context` is used only for its real purpose: guiding the creation process.

### The Blueprint Is Law

The final creation (`solution`) is the only thing that matters. And because every `solution` must perfectly follow its `schema` (the blueprint), the final state of any `Idea` is always controlled and checked by its blueprint. This ensures that every Idea's result is structured and understandable to everyone.

### Unchangeable Past

If an `Idea` has a different recipe (`context`) or a different blueprint (`schema`), it is a completely different `Idea`. If you only add new things to the blueprint, it's still considered compatible. But if you change the blueprint in a major way, you have to give it a new version number.

## Sharing & Finding: Your Own Address on the Web with DNS

DNS is like the internet's giant address book. By giving an Idea its own unique address (a domain name), we give it an identity that is separate from where it's stored. You can move the Idea's files to a different computer, but its address will always stay the same, so people can always find it. This is the foundation of the whole system.

To learn more about the different ways to store and run Ideas, see [102: Concept/Sovereignty](./102_concept_sovereignty.md).

### How DNS Identity Works

- **How It Works:** An Idea gets a unique web address, like `my-cool-idea.com`. At that address, a special note called a `TXT` record is left. This note has a label called `idea` that points to a link. That link leads to a file that contains the entire blueprint for the Idea, explaining everything about it.