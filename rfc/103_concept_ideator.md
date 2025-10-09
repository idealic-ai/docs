# 103: Concept/Ideator

> **Ideator:** An `Idea` that accepts input, signified by a context message of `type: "input"`. It acts as a function, transforming input to output. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [101: Concept/Idea](./101_concept_idea.md)
>   - [007: Agent/Input](./007_agent_input.md)
> - Enables:
>   - [004: Agent/Call](./004_agent_call.md)
>   - [102: Concept/Sovereignty](./102_concept_sovereignty.md)

## 1. Introduction

This document specifies the protocol for **Ideators** and **Idea Transformers** as executable, service-based components. It builds upon the foundational [101: Concept/Idea](./101_concept_idea.md), which defines the core data structure, and describes how an `Idea` is transformed into a functional, invocable entity.

For details on the spectrum of hosting and deployment models, see [102: Concept/Sovereignty](./102_concept_sovereignty.md).

## 2. From Idea to Ideator

An **Ideator** is not a distinct entity, but a functional role any `Idea` can fulfill. It can be seen as a function that performs work by transforming input into output within a **latent space**. This means its logic is not necessarily defined by explicit code, but is instead guided by the rich `context` of the `Idea`—its schemas, examples, and natural language instructions—which are interpreted by an LLM.

The definitive signal that an `Idea` is an Ideator is the presence of a `context` message with `type: "input"`. This message defines the schema for the data the Ideator expects. An _executable_ Ideator may also include a `context` message with `type: "code"`, pointing to an explicit implementation.

### 2.1. The Idea Transformer: A Special Case

A common and powerful pattern is an Ideator whose input is itself another `Idea`. We call this specific type of Ideator an **Idea Transformer**. This is what enables the compositional pipelines where Ideas are chained together and evolved.

## 3. Implementations and Composition

The architectural principles outlined in this document define a **behavioral contract** for any Ideator service. This contract is not for a single piece of software, but a standard for interoperability, allowing for a plurality of implementations and a rich, compositional ecosystem.

### 3.1. A Plurality of Implementations

An Ideator service's contract is fulfilled by honoring its public API (accepting an `Idea` and returning another). This allows for multiple concrete implementations, each suited for different use cases:

- **Managed Services**: A provider can offer hosting as a managed, cloud-based service, abstracting away the infrastructure, as described in the [Sovereignty Protocol](./102_concept_sovereignty.md).
- **Self-Hosted Instances**: A developer can run their own implementation of the service on their own infrastructure, giving them full control.
- **In-Memory Implementations**: For local development and testing, an Ideator's execution logic can be run as a simple in-memory function, bypassing the network entirely while still honoring the core contract.

### 3.2. Composition and Higher-Order Systems

In this ecosystem, there is no concept of a "private API." All services are built to interact via their public, contract-based interfaces.

More sophisticated services, which can be thought of as **Higher-Order Systems**, are created by composing other, more primitive `Ideators`. The internal logic of a higher-order service involves making calls to the public APIs of other `Ideators`.

For example, the **Reactor** system is a higher-order `Ideator`. To manage a game, it might:

1.  Accept a game state `Idea` via its own public API.
2.  Internally call a public `Player` service to create and manage player identifiers.
3.  Call a public `Storage` service to log the game's history.
4.  Return the new game state `Idea` via its public API.

From the outside, the Reactor is just another `Ideator`. Its complexity is managed internally by composing other independent, public services. This ensures that the entire system remains modular, transparent, and scalable.
