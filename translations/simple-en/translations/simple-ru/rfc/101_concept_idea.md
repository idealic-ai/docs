# 101: Concept/Idea

> **Idea:** A little piece of knowledge that stands on its own. It has three parts (`schema`, `solution`, `context`) and remembers what it is. Think of it like a permanent building block, not a one-time question. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
> - [001: Agent/Request](./001_agent_request.md)
> - Makes possible: [103: Concept/Ideator](./103_concept_ideator.md)

This document explains how to build an internet made of “living” documents that can change and grow. We’ll talk about its main building block (called an **Idea**) and how these Ideas can be shared and found online using **DNS** (the internet’s address book).

To learn how `Ideas` become working programs, check out [103: Concept/Ideator](./103_concept_ideator.md). And to read about the different ways to store them online, see [102: Concept/Sovereignty](./102_concept_sovereignty.md).

## How the Living Internet Works

The whole system is built on one simple but powerful rule: **the content itself contains the rules of the game.** Everything works using a single building block: a self-contained trio of data called an **Idea**. This setup gives you total control and freedom. You can take your Idea and move it anywhere because there’s no hidden information tying you to one place.

- **Context:** This is like a chef's list of ingredients and step-by-step recipe. It contains all the instructions, source materials, and links needed to create the solution.
- **Schema:** This is like a blueprint or the instructions for a Lego set. The `jsonschema` explains what the data in the Idea means. This helps any artificial intelligence understand how to work with it and change it.

  > Sidenote:
  >
  > - See [json-schema.org](https://json-schema.org/)

- **Solution:** This is the finished product. It’s what you get in the end—an answer, a picture, text, or any other kind of information.

Ideas are **designed to be unchangeable**. Imagine each Idea is like a photograph. You can't change an old photo, but you can always take a new one where something is different. In the same way, to build on a thought, you create a new Idea that points back to the old one. This keeps a complete history of how the thought evolved, like a photo album, so you can always see where it started.

## More Than Just a Prompt: A New Building Block

At first, an `Idea` might seem like just a fancy prompt for an AI like ChatGPT. But it's very different. The big difference is that we're moving from one-time chats that are forgotten to a system of permanent “bricks” that you can save, combine, and use over and over.

A prompt for a chatbot is like asking a stranger for directions. They tell you, and you both forget about it. An `Idea` is like a map. It doesn't just show you the route (`solution`), it also explains where you're going and why (`context`) and even includes instructions on how to read the map (`schema`). You can save this map, give it to a friend, or draw a new route on top of it.

That's why an `Idea` is a real “computational brick.” You can use these bricks to build complex and evolving systems. You don't just “run” an Idea; you can copy it to make your own version, mix it with other Ideas, or build a whole chain of them to do complicated jobs. And you don't even need to write code in the usual way. It's a whole platform for creating things, not just a box for typing questions.

## The Main Rules

To make sure the system is always reliable, clear, and open, every part of it has to follow four main rules.

### Reproducible Provenance

Every `Idea` can be recreated. It's like baking a cake from a recipe. If you take the same `context` (ingredients) and `schema` (recipe) and give them to a good AI, it should create a very similar `solution` (cake). Of course, different AI “chefs” might make a slightly different cake, but it will always be based on the same starting materials.

### Transparent Context

When the AI is working, it sees everything inside the `context`. This means the `context` isn't a secret box where you can hide things. It should only contain what's directly needed to solve the problem—things the AI needs to see and understand.

### Schema-Defined State

The “state” of an Idea is its `solution` (the result). And since every `solution` must match its `schema` (the blueprint), the Idea's state is always clear, organized, and can be checked against that blueprint. No surprises!

### Immutability

If you change an Idea's `context` or `schema`, you're creating a completely new `Idea`. Think of it like a software update. If you just add something new to the `schema` (blueprint), old versions will still work. But if you change something important, you need to update the version number so everyone knows the rules of the game have changed.

## Publishing and Finding: A Personal Internet Address via DNS

DNS is like a giant address book for the whole world. It gives every Idea its own unique name (a domain) that can be found from anywhere. This gives the Idea its own address that doesn't depend on where it's stored. It can “move” to a new server, but its address will stay the same. This is the foundation of the whole system.

You can read more about the different ways to store Ideas in [102: Concept/Sovereignty](./102_concept_sovereignty.md).

### How a DNS-Based Address Works

- **How it works:** An Idea gets a unique domain name (like `my-cool-idea.com`). A special text note (`TXT` record) is created for this domain. Inside that note, there's a key called `idea` that leads to the Idea's main file (in JSON format). This file is like the Idea's passport—it contains a complete description of what it is.