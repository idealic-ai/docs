# 103: Concept/Ideator

> [!DEFINITION] [Ideator](./000_glossary.md)
> An `Ideator` is an `Idea` that can do work. It's like a function in math: it takes something in (an input) and produces something new (an output). We know an `Idea` can do this when it has a special message inside it labeled `type: "input"`.

> Sidenote:
> - Relies on these documents:
>   - [101: Concept/Idea](./101_concept_idea.md)
>   - [007: Agent/Input](./007_agent_input.md)
> - Makes these documents possible:
>   - [004: Agent/Call](./004_agent_call.md)
>   - [102: Concept/Sovereignty](./102_concept_sovereignty.md)

## Introduction

This document explains how an **`Idea`** can become an **`Ideator`** — an active, thinking machine that you can give tasks to. This builds on the first document, [101: Concept/Idea](./101_concept_idea.md), which described what an `Idea` is made of. 

To learn about all the different ways you can run an `Ideator`, like on your own computer or on the internet, you can read [102: Concept/Sovereignty](./102_concept_sovereignty.md).

## From Idea to Ideator

An **`Ideator`** isn't a totally new thing; it's just an `Idea` that has a job to do. Think of it like a recipe that can actually cook for you. It takes ingredients (input) and makes a meal (output).

Its instructions aren't written in normal computer code. Instead, an AI reads the `Idea`'s descriptions, examples, and rules to figure out what to do. This is a bit like a chef who can look at a list of ingredients and a picture of a dish and figure out all the steps on their own.

The one thing that officially turns an `Idea` into an `Ideator` is a message inside it that says `type: "input"`. This message tells everyone what kind of ingredients the `Ideator` needs to do its job. Sometimes, an `Ideator` might also have a message with `type: "code"` that points to a specific set of instructions, just in case.

### The Idea Transformer: A Special Case

One very cool type of `Ideator` is one that takes *another `Idea`* as its input. We call this an **Idea Transformer**. It’s like a special kitchen machine whose only job is to take one recipe and make it better or change it into a new one. This is how we can chain `Ideas` together to build amazing things.

## How They Work and Connect

The rules in this document create a **handshake agreement** for how any `Ideator` should behave. This isn't for one single program, but a standard that lets lots of different `Ideator` programs, built by different people, all understand each other and work together.

### Many Ways to Build an `Ideator`

As long as an `Ideator` follows the handshake agreement (it accepts an `Idea` and returns another one), it can be built in many different ways:

- **Online Services**: A company can run `Ideators` on the internet for you. You don't have to worry about the computers or the setup; you just use it. This is explained more in the [Sovereignty Protocol](./102_concept_sovereignty.md).
- **Do-It-Yourself**: You can run an `Ideator` on your own computer or server. This gives you total control over how it works.
- **Just for Practice**: For building and testing, you can run an `Ideator` right inside your code on your laptop. It works the same way but doesn't need to connect to the internet at all.

### Building Bigger Things by Connecting `Ideators`

In this world, there are no secret passages or private doors. Every `Ideator` uses the same public handshake to talk to others.

More powerful tools, which we can call **Higher-Order Systems**, are built by connecting simple `Ideators` together. The big system does its job by asking smaller, public `Ideators` to do theirs.

For example, imagine a system called **Reactor** that runs a game. Here’s how it might work:

1.  You give Reactor the current game information as an `Idea`.
2.  Inside, Reactor calls a public `Player` `Ideator` to create new players.
3.  Then, it calls a public `Storage` `Ideator` to save what happened in the game.
4.  Finally, it gives you back the new, updated game information as an `Idea`.

From the outside, Reactor just looks like any other `Ideator`. All its complicated work is done by combining other simple, public `Ideators`. This keeps everything neat, easy to understand, and able to grow bigger and bigger.
