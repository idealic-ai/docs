# The Idea Protocol

> Sidenote:
>
> - Requires: [Glossary](./000_glossary.md)
> - Enables: [Protocol: Ideators](./003_protocol_ideators.md)

_For definitions of key terms used in this document, please refer to the [Glossary](./000_glossary.md)._

This document outlines the architecture for a decentralized web of living documents. It covers the protocol's core data structure (the **Idea**) and the decentralized discovery mechanism for publishing and resolving them via **DNS**.

For details on how `Ideas` become executable services, see [RFC 10: Protocol: Ideators](./003_protocol_ideators.md). For details on the spectrum of hosting models, see [RFC 11: Protocol: Sovereignty](./002_protocol_sovereignty.md).

## The Mechanics of a Living Web

The architecture is built on a radical principle: **the content is the protocol.** The system's entire grammar consists of a single unit: a self-contained "triplet" called the **Idea**. This structure enables true ownership and portability; because there is no hidden state, you are never locked in.

- **Context:** All the instructions, source material, and references used to generate the solution.
- **Schema:** The `jsonschema` blueprint that gives the Idea's data a universal, semantic meaning, allowing any AI to understand and modify it.
- **Solution:** The output, result, or content of the Idea.

Ideas are **immutable by design**. The protocol has only one action: sharing an Idea. To evolve a thought, a new Idea is created that references the old, preserving a pristine, unbreakable chain of creation.

## Beyond the Prompt: A New Computational Primitive

At first glance, an `Idea` might seem like a glorified prompt for a large language model (LLM). This is a common misconception. The key difference lies in the shift from single, ephemeral interactions to a system of persistent, composable assets.

Unlike a simple, ephemeral request to a chatbot, an `Idea` is a self-contained, stateful artifact. It packages the `input`, the `output` (`solution`), the rules (`schema`), and the entire `context` of its creation into a single, portable unit. It's not just a question; it's the question, the answer, and the complete formula that connects them, enabling a persistent, composable system, not just a one-off transaction.

This makes an `Idea` a true computational primitive—a building block for creating complex, evolving systems. You don't just "run" an Idea; you can fork it, remix it, feed it into other Ideas, and build entire pipelines of logic, all without writing traditional code. It's a platform, not a prompt.

## Core Invariants

To ensure the protocol remains robust, transparent, and portable, all implementations must adhere to three core invariants.

### Deterministic Provenance

An `Idea` is designed for reproducibility. By feeding the same `context` and `schema` to a capable LLM, a comparable `solution` can be regenerated. This principle ensures that we are striving for a reproducible web of ideas. While variations from different providers or model settings are expected, the fundamental goal is that the output is a direct, traceable function of its inputs.

### Transparent Context

The entire `context` triplet is visible to the LLM during execution. This means it cannot be used as a container for arbitrary state unless that state is directly relevant to the computation and intended for the LLM to process. This constraint is critical to prevent indiscriminate use of the `context`, ensuring it remains a focused, purposeful part of the `Idea`.

### Schema-Bound State

The `solution` is the state. Because every `solution` must conform to its `schema`, the state of any `Idea` is fundamentally determined and validated by its schema. This follows from the principle of a transparent context, ensuring that all state is explicit, structured, and universally understandable.

## Publication & Discovery: Decentralized Identity via DNS

DNS provides a globally unique, resolvable name for any Idea, establishing a decentralized identity that decouples the Idea from its storage location. This is the bedrock of the entire system.

For details on the progressive hosting layers that build on top of this foundation, see [RFC 11: Protocol: Sovereignty](./002_protocol_sovereignty.md).

### The DNS Identity Mechanism

- **How It Works:** An Idea is given a unique domain name. A `TXT` record is created for that domain containing an `idea` key that points to the canonical Idea JSON document. This document defines the Idea's complete interface.
- **Path to Sovereignty**: This mechanism supports both ease of use and full user control. A provider can manage a domain (e.g., `ideators.network`) and delegate subdomains (e.g., `my-tool.ideators.network`) to users. For full sovereignty, a user can use their own custom domain and simply point its `NS` records to the required services, taking complete control of their identity.
- **Purpose:** This provides a globally unique, resolvable name for any component, allowing for a fully self-describing system where any service can be understood by fetching a single definition file.

### DNS `TXT` Record Specification

The `TXT` record is a simple pointer to the Idea's full definition.

- `idea=<url>`: **(Required)** The URL pointing to the canonical Idea JSON document.
- `page=<url>`: **(Optional)** A URL to a human-readable landing page.

_Example TXT record content:_ `"idea=https://.../commenter.json page=.../docs"`
