# 103: Concept/Ideator

> **Ideator:** An `Idea` that is built to receive an input. Think of it like a function or a machine that takes something in and produces something new.


## Introduction

This document explains how an **Ideator**, which is a special kind of `Idea`, can be turned into a running service that actually does things. It builds on the basic concept of an `Idea` (which is like a blueprint) and explains how to make that blueprint come to life.

To understand where these services can live (on the cloud, on your computer, etc.), check out the document on [Sovereignty](./102_concept_sovereignty.md).

## From a Blueprint to a Machine

An **Ideator** isn't a totally new thing; it's just an `Idea` that has a job to do. You can think of it like a function or a machine: you give it an input, and it gives you an output. This work happens in a “smart space” (called a **latent space**), which means it's not always run by normal computer code. Instead, a powerful AI reads all the instructions, examples, and rules inside the `Idea` and figures out what to do.

The one thing that officially makes an `Idea` an **Ideator** is a special instruction inside it that says `type: "input"`. This little tag is like an “INPUT” slot on a machine—it tells everyone that this `Idea` is waiting for you to give it something to work on.

### The Idea Transformer: A Special Kind of Machine

A very common and useful type of Ideator is one that takes another `Idea` as its input. We call this an **Idea Transformer**. Imagine a machine that doesn't take ingredients like flour and sugar, but instead takes a whole *recipe* and gives you back a new, improved recipe. This is how you can connect Ideas together to build bigger and more complex things.

## How Ideators Work Together

The rules in this document create a **shared agreement** for how any Ideator service should behave. This isn’t about building one single piece of software, but about creating a standard that allows many different versions of Ideators to work together, like different brands of LEGO bricks that all fit perfectly.

### Many Ways to Build an Ideator

As long as a service follows the rules (it accepts an `Idea` and returns another `Idea`), it can be built in many different ways:

*   **Cloud Services**: A company can run the Ideator for you on their powerful computers. You don't have to worry about the technical stuff, you just use it.
*   **Do-It-Yourself**: A developer can run the service on their own computer or server, giving them total control.
*   **Local Testing**: For practice or building, you can run the Ideator's logic right inside your computer's memory, skipping the internet entirely. It still follows the same core rules, just in a simpler way.

### Building Big Things from Small Pieces

In this system, there are no secret or private connections. Every service is designed to be public and interact with others based on the shared agreement.

Bigger, more advanced services, which we can call **Higher-Order Systems**, are built by combining smaller, simpler `Ideators`. The big service works by making calls to other public Ideators to get its job done.

For example, imagine a game manager called the **Reactor**. It's just a big Ideator, but on the inside, it does a few things:

1.  It receives the current state of the game as an `Idea`.
2.  Inside, it calls a separate, public `Player` service to create and manage players.
3.  It then calls another public `Storage` service to save the game's history.
4.  Finally, it returns the new game state as an `Idea`.

From the outside, you don't see all those moving parts. The Reactor just looks like a single, simple Ideator. Its complexity is handled by piecing together other independent, public services. This keeps the whole system clear, organized, and easy to grow.