# 103: Concept/Ideator

> **Ideator:** Think of an `Idea` as a recipe. An `Ideator` is that recipe in action! It's an `Idea` that knows how to take something (an input) and turn it into something new (an output). The special instruction that tells you an `Idea` can do this is a message that says `type: "input"`. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [101: Concept/Idea](./101_concept_idea.md)
>   - [007: Agent/Input](./007_agent_input.md)
> - Enables:
>   - [004: Agent/Call](./004_agent_call.md)
>   - [102: Concept/Sovereignty](./102_concept_sovereignty.md)

## 1. Introduction

This document explains the rules for how **Ideators** work. You can think of an `Ideator` as a special program that can run and do things. We'll start with the basic concept of an `Idea` (which is like a blueprint) from [101: Concept/Idea](./101_concept_idea.md), and then show how we turn that blueprint into something that can actually perform a task.

To learn about all the different ways you can run an Ideator, like on your own computer or on the internet, check out [102: Concept/Sovereignty](./102_concept_sovereignty.md).

## 2. From Idea to Ideator

An **Ideator** isn't a totally new thing; it's just a job that any `Idea` can do. Imagine an `Idea` is a recipe written on a card. An `Ideator` is what happens when a chef takes that recipe and starts cooking. The chef doesn't follow rigid computer code. Instead, the chef (a smart AI) reads the whole recipe—the ingredients, helpful examples, and plain English instructions—and figures out what to do in its own imaginary kitchen.

The one thing that tells you a recipe (`Idea`) is ready for cooking is an "Ingredients" list. For us, that's a special message that says `type: "input"`. It tells the AI exactly what it needs to get started. Sometimes, an `Idea` might also include super-specific instructions, like a piece of computer `code`, to make sure a step is done perfectly.

### 2.1. The Idea Transformer: A Special Case

Now for a really cool part. Imagine a chef whose main ingredient isn't food, but *another recipe*. This special kind of `Ideator` is called an **Idea Transformer**. It takes one `Idea` as its input, makes changes or improvements to it, and then gives you back a new, better `Idea`. This is how we can connect different `Ideas` together, like cars on an assembly line, where each step adds something new.

## 3. How They Are Built and Used

The rules in this document are like the rules for LEGO bricks. They don't tell you *what* to build, but they make sure every brick, no matter who makes it, can connect to every other brick. This shared set of rules allows people to build all sorts of different `Ideators` that can all work together.

### 3.1. Lots of Different Ways to Build

As long as an `Ideator` follows the main rule—it accepts an `Idea` and returns another `Idea`—it's playing the game correctly. This lets people build them in many ways, for different situations:

- **Managed Services**: This is like renting a fully-equipped workshop. Someone else manages all the servers and tools online; you just use them to run your `Ideator`.
- **Self-Hosted Instances**: This is like having your own workshop at home. You run the `Ideator` on your own computer, giving you complete control over everything.
- **In-Memory Implementations**: This is like sketching your design on a piece of paper before you build it. It’s a super fast and simple way to test your `Ideator` on your own computer without needing any network connection.

### 3.2. Building Big Things by Combining Small Things

In this world of `Ideators`, there are no secret parts. Every `Ideator` is designed to connect openly with any other `Ideator`.

You can create bigger, more powerful programs, called **Higher-Order Systems**, by snapping smaller, simpler `Ideators` together. Think of it like building a giant spaceship out of smaller LEGO parts like wings, a cockpit, and an engine. The spaceship is the big system, but it's made of simple `Ideator` pieces.

For example, let's say we have a big system called a **Reactor** that runs a video game:

1.  You give the Reactor the current game information (as an `Idea`).
2.  Inside, the Reactor uses a smaller `Player` `Ideator` to figure out who the players are.
3.  Then, it uses a `Storage` `Ideator` to save what just happened in the game.
4.  Finally, it gives you back the new, updated game information (as another `Idea`).

From the outside, the Reactor just looks like a single, simple `Ideator`. All its complicated work is done on the inside by combining other independent tools. This makes the whole system easy to change and grow, just like swapping one LEGO brick for another.