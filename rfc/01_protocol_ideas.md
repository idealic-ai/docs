# The Idea Protocol

_For definitions of key terms used in this document, please refer to the [Glossary](./00. glossary.md)._

This document outlines the architecture for a decentralized web of living documents. It covers the protocol's core data structure (the **Idea**), the agents that operate on them (**Ideators**), and the decentralized discovery mechanism for publishing and resolving them via **DNS**.

## The Mechanics of a Living Web

The architecture is built on a radical principle: **the content is the protocol.** The system's entire grammar consists of a single unit: a self-contained "triplet" called the **Idea**. This structure enables true ownership and portability; because there is no hidden state, you are never locked in.

- **Context:** All the instructions, source material, and references used to generate the solution.
- **Schema:** The `jsonschema` blueprint that gives the Idea's data a universal, semantic meaning, allowing any AI to understand and modify it.
- **Solution:** The output, result, or content of the Idea.

Ideas are **immutable by design**. The protocol has only one action: sharing an Idea. To evolve a thought, a new Idea is created that references the old, preserving a pristine, unbreakable chain of creation.

## Ideators: Ideas with Inputs

An **Ideator** is not a distinct entity, but a functional role any `Idea` can fulfill. It can be seen as a function that performs work by transforming input into output within a **latent space**. This means its logic is not necessarily defined by explicit code, but is instead guided by the rich `context` of the `Idea`—its schemas, examples, and natural language instructions—which are interpreted by an LLM.

This latent execution is what makes an Idea more than just a document. It is a living entity, ready to be adjusted, remixed, improved, and reused. Because the logic is interpreted by a capable LLM, anyone in the network can process any Idea without being restricted by proprietary code. This openness fosters a radical democracy of creation.

The definitive signal that an `Idea` is an Ideator is the presence of a `context` message with `type: "input"`. This message defines the schema for the data the Ideator expects. For more deterministic control over the latent logic, the `context` can include structured instructions or even pseudocode.

An _executable_ Ideator is one that chooses to bypass the latent space for fully deterministic operations by including a `context` message with `type: "code"`, pointing to an explicit implementation.

### The Idea Transformer: A Special Case

A common and powerful pattern is an Ideator whose input is itself another `Idea`. We call this specific type of Ideator an **Idea Transformer**. This is what enables the compositional pipelines described in the Edict of Autonomy, where Ideas are chained together and evolved.

However, an Ideator's input can be any data that conforms to its input schema, not just a formal `Idea` triplet.

In short:

- An **Idea** is a self-contained unit of data (`solution`, `schema`, `context`).
- An **Ideator** is any `Idea` that accepts an input (signified by `type: "input"`).
- An **Idea Transformer** is a specialized Ideator that takes another `Idea` as its input.

### The Idea Document Specification

The following example shows the JSON document for a simple "Commenter" Ideator. This single document contains everything needed to understand and execute it.

_Example `commenter.json` content:_

```json
{
  "schema": {
    "type": "object",
    "properties": {
      "author": {
        "type": "string",
        "description": "The author of the comment."
      },
      "body": {
        "type": "string",
        "description": "The content of the comment."
      }
    },
    "required": ["author", "body"]
  },
  "solution": {
    "author": "John Doe",
    "body": "Great post on decentralization! This is a really important topic."
  },
  "context": [
    {
      "type": "system",
      "content": "You are an Ideator that takes an 'Article' Idea and produces a 'Comment' Idea. The schema for the input 'Article' is provided below."
    },
    {
      "type": "input",
      "schema": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "content": { "type": "string" }
        },
        "required": ["title", "content"]
      },
      "input": {
        "title": "On Decentralization",
        "content": "A short essay on the importance of decentralized systems..."
      }
    },
    { "type": "code", "url": "https://.../code/commenter-1.2.3.js" }
  ]
}
```

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

## From Single Ideas to Stateful Systems: A Gaming Analogy

To understand how `Ideas` compose into systems, consider a platform designed to host bots that can play _any_ game.

The platform itself doesn't need to know the rules of poker, chess, or backgammon. It only handles the generic mechanics: matchmaking players, managing turns, and tracking game state. The _semantics_ of the specific game being played are encapsulated entirely within an `Idea` that travels through the system.

- An `Idea` document defines the current state of a poker table: the players, the cards, the pot size. Its `schema` defines the rules for a valid next move.
- The platform passes this `Idea` to a bot (an `Ideator`).
- The bot, using latent execution, processes the `Idea` and produces a new one representing the next game state (e.g., after it makes a bet).

The platform can manage a complex, multi-user, stateful poker game without having a single line of poker-specific code. If the users want to play chess, they simply introduce a new `Idea` with the rules and state of chess. The system adapts instantly. This illustrates the power of separating the operational mechanics of a platform from the semantic logic contained within the `Idea`.

---

## Publication & Discovery via DNS

DNS provides a globally unique, resolvable name for any Idea, allowing for a fully self-describing system where any service can be understood by fetching a single definition file. This section outlines the layered architecture for this decentralized discovery and resolution system.

### The Layered Architecture

The ecosystem is structured in six distinct layers (0-5), each building upon the last. This model allows creators to participate at the level that suits their needs, from a simple, decentralized identity to a fully-featured, managed web service. The core principle is that only Layer 0 is essential; everything else is an optional enhancement.

It's helpful to view this model as a spectrum of autonomy with two endpoints. At one end, **Layer 0** provides the most fundamental autonomy: by controlling just a DNS record, a creator has complete freedom to host their tool's source anywhere, decoupling its identity from its storage. At the other end of the spectrum lies **full sovereignty**: using a custom domain and self-hosting all services, effectively becoming one's own provider. The managed layers (1-5) serve as an optional, progressive bridge between these two states of autonomy.

### Layer 0: DNS Discovery (The Core Protocol)

This is the bedrock of the entire system. It is the only mandatory layer and establishes a decentralized identity.

- **How It Works:** An Idea (which can also be an executable Ideator) is given a unique domain name. A `TXT` record is created for that domain containing an `idea` key pointing to a canonical JSON document. This document defines the Idea's complete interface: its output `schema`, an optional example `solution`, and an optional `context` array defining its lineage and instructions, such as its `input` schema and a `code` URL.
- **Purpose:** This provides a globally unique, resolvable name for any component, allowing for a fully self-describing system where any service can be understood by fetching a single definition file.
- **Provider Cost:** Negligible. Limited to the cost of hosting DNS records.

---

### Layer 1: Managed Hosting

This layer provides an immediate, zero-friction hosting solution for the Ideator source file itself.

- **How It Works:** As an easy entry point, we offer to host a user's Ideator source file on our S3 bucket. The `TXT` record we create for their managed subdomain will point to this S3 URL. At any time, the user can choose to host the file elsewhere and update their `TXT` record to point to the new location (e.g., their own server, IPFS, etc.).
- **Purpose:** To eliminate the need for creators to arrange their own file hosting just to get started.
- **Provider Cost:** Minimal. Limited to S3 storage and data transfer costs.

---

### Layer 2: Static UI Generation

This layer makes Ideators accessible and useful to humans with zero server-side compute.

- **How It Works:** A generic, static web page (e.g., an `index.html` hosted on S3 or GitHub Pages) is served for all Ideator domains that opt into this service. When a user visits `my-tool.ideators.network` in a browser, client-side JavaScript on that page performs a DNS-over-HTTPS (DoH) query to fetch the `TXT` record for the domain, retrieves the source URL (from Layer 1 hosting), fetches the Ideator's definition file, and dynamically renders a user interface.
- **Purpose:** Provides a free, instantly usable web app for any Ideator, lowering the barrier to entry for both creators and users.
- **Provider Cost:** Minimal. Limited to the cost of static file hosting and bandwidth.

---

### Layer 3: CDN-Powered `GET` Endpoint

This layer enhances machine-to-machine interoperability for reading an Idea's definition, without requiring serverless functions.

- **How It Works:** By placing a CDN in front of the hosting layer, we can use request rewriting rules. A `GET` request to an Idea's domain (`my-tool.ideators.network`) is intelligently routed by the CDN. Instead of serving raw JSON, the endpoint can dynamically generate and serve a JavaScript module. This allows developers to use **named exports** to import specific parts of the `Idea` directly, for example: `import { schema } from '...'`. To provide strong typing for developers, the response can also include an `X-TypeScript-Types` header pointing to a TypeScript declaration file (`.d.ts`).
- **Purpose:** To provide a best-in-class developer experience. This approach enables powerful and idiomatic programmatic access, allowing developers to import an entire `Idea` or just the specific parts they need (like the `schema` or `solution`) using standard ES6 import syntax with full type-safety. The raw `Idea` document remains accessible to other HTTP clients via an `Accept: application/json` header.
- **Provider Cost:** Low. Limited to CDN traffic costs, with no compute charges.

---

### Layer 4: Publishing (`PUT`)

This layer provides the ability to publish and update an Idea programmatically.

- **How It Works:** This layer handles authenticated `PUT` requests to an Idea's domain. A single request can upload a new version of the Idea's source file. A managed service would handle the file upload and atomically update any necessary records to make the new version live.
- **Purpose:** To provide a secure and simple API for creators to manage the lifecycle of their Ideas without direct access to the underlying hosting or DNS.
- **Provider Cost (Managed):** Minimal, related to storage write operations.

---

### Layer 5: Full API Execution (`POST`)

This is the highest layer of functionality, transforming an Ideator into a true, invocable web service. This layer requires compute.

- **How It Works:** This layer handles `POST` requests to an Ideator's domain, executing its logic. There are two implementation paths:
  1.  **Self-Hosted:** A user delegates their subdomain's DNS (`NS` records) to their own server and implements the full API protocol, including the `POST` method. They bear all hosting and compute costs.
  2.  **Managed Service (Optional):** We can offer a managed endpoint using serverless compute (e.g., CloudFront Functions). This service would resolve the Ideator, execute its logic, and return the result.
- **Important Consideration:** The managed version of this layer is the only part of the ecosystem with significant, scaling operational costs for us (e.g., ~$0.10 per 1 million invocations). Therefore, this managed service is an **optional, premium feature**. It may be rate-limited, offered only to specific partners, or provided as a paid service.
- **Purpose:** To provide the full power of a serverless architecture, allowing anyone to publish a fully functional microservice with just a static definition file.
- **Provider Cost (Managed):** Direct, usage-based compute and traffic costs.

### API Specification & Usage Example

This section defines the technical specifications for discovering and interacting with an Idea's endpoint.

#### DNS `TXT` Record Specification

The `TXT` record is a simple pointer to the Idea's full definition.

- `idea=<url>`: **(Required)** The URL pointing to the canonical Idea JSON document.
- `page=<url>`: **(Optional)** A URL to a human-readable landing page.

_Example TXT record content:_ `"idea=https://.../commenter.json page=.../docs"`

#### HTTP Endpoint Specification

All HTTP interactions happen at the root of the Idea's domain (`/`).

- **`GET /`**
  - With `Accept: text/html` header (Layer 2): Returns the static UI loader or redirects to the `page` URL.
  - With `Accept: application/json` header (Layer 3): Returns the Idea's source JSON file.
- **`PUT /`** (Layer 4)
  - Requires authentication. A single `PUT` request both uploads the new Idea source file and atomically updates the `code` URL in the `TXT` record to make the new version live.
- **`POST /`** (Layer 5)
  - Requires authentication/authorization. Executes the Ideator.
  - The request body is a JSON object containing the payload, e.g., `{"context": "The user's input to be processed"}`.

#### Usage Example (`curl`)

```bash
# Target Ideator domain
IDEATOR="commenter.ideators.network"

# Layer 0 (Step 1): Discover the Idea Document URL
IDEA_URL=$(dig +short TXT $IDEATOR | grep -o 'idea=[^ "]*' | cut -d'=' -f2)
echo "Idea Document is at: $IDEA_URL"

# Layer 0 (Step 2): Fetch the full definition
# This single JSON file contains everything needed to understand the Ideator
curl "$IDEA_URL"

# Layer 5: Execute the Ideator with a payload
curl "https://$IDEATOR" -X POST \
     -H "Content-Type: application/json" \
     -d '{"context": [{\lf
          "type": "input",\
          "input": {\
            "title": "On Decentralization",\
            "content": "A short essay on the importance of decentralized systems..."\
          }]}'
```

## Summary of Autonomy

This layered model provides a clear path for users:

- Anyone can start at **Layers 0-2** with a managed subdomain, getting free source file hosting and a functional UI with minimal effort.
- They can opt-in to the convenience of **Layer 3** for better programmatic access.
- They can use the managed **Layer 4** service for full API power, subject to its conditions.
- At any time, they can delegate their DNS to self-host their own solution, taking full control over their implementation of Layers 3 and 4.
- Finally, they can use their own custom domain to achieve complete sovereignty (becoming their own provider of all layers).
