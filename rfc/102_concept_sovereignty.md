# 102: Concept/Sovereignty

> Sidenote:
>
> - Requires:
>   - [The Idea Protocol](./101_concept_idea.md)
>   - [Protocol: Ideators](./103_concept_ideator.md)
> - Enables: Practical deployment of the ecosystem.

## 1. Introduction

This document specifies the protocol for **Sovereignty**, which defines the spectrum of autonomy available to creators in the ecosystem. It outlines a layered architecture for hosting and execution, allowing participants to choose their desired level of control, from using fully managed services to self-hosting a complete, sovereign implementation.

This model is the practical bridge between an abstract `Ideator` and a concrete, running service.

## 2. The Layered Architecture

The ecosystem is structured in five distinct layers (1-5), each building upon the foundational **Decentralized Identity** layer defined in the [Idea Protocol](./101_concept_idea.md). This model allows creators to participate at the level that suits their needs, from a simple, decentralized identity to a fully-featured, managed web service.

It's helpful to view this model as a spectrum of autonomy. At one end lies a managed service that provides convenience. At the other end lies **full sovereignty**: using a custom domain and self-hosting all services, effectively becoming one's own provider. The managed layers serve as an optional, progressive bridge between these two states.

### Layer 1: Managed Hosting

This layer provides an immediate, zero-friction hosting solution for the Ideator source file itself.

- **How It Works:** As an easy entry point, we offer to host a user's Ideator source file on our S3 bucket. The `TXT` record we create for their managed subdomain will point to this S3 URL. At any time, the user can choose to host the file elsewhere and update their `TXT` record to point to the new location (e.g., their own server, IPFS, etc.).
- **Purpose:** To eliminate the need for creators to arrange their own file hosting just to get started.

---

### Layer 2: Static UI Generation

This layer makes Ideators accessible and useful to humans with zero server-side compute.

- **How It Works:** A generic, static web page is served for all Ideator domains that opt into this service. When a user visits an Ideator's domain in a browser, client-side JavaScript on that page performs a DNS-over-HTTPS (DoH) query to fetch the `TXT` record for the domain, retrieves the source URL (from Layer 1 hosting), fetches the Ideator's definition file, and dynamically renders a user interface.
- **Purpose:** Provides a free, instantly usable web app for any Ideator, lowering the barrier to entry.

---

### Layer 3: CDN-Powered `GET` Endpoint

This layer enhances machine-to-machine interoperability for reading an Idea's definition.

- **How It Works:** By placing a CDN in front of the hosting layer, we can use request rewriting rules. A `GET` request to an Idea's domain is intelligently routed by the CDN to serve a JavaScript module. This allows developers to use **named exports** to import specific parts of the `Idea` directly (e.g., `import { schema } from '...'`). The response can also include an `X-TypeScript-Types` header pointing to a TypeScript declaration file (`.d.ts`) for a best-in-class developer experience. The raw `Idea` document remains accessible via an `Accept: application/json` header.
- **Purpose:** To provide powerful and idiomatic programmatic access with full type-safety.

---

### Layer 4: Publishing (`PUT`)

This layer provides the ability to publish and update an Idea programmatically.

- **How It Works:** This layer handles authenticated `PUT` requests to an Idea's domain. A single request can upload a new version of the Idea's source file and atomically update any necessary records to make the new version live.
- **Purpose:** To provide a secure and simple API for creators to manage the lifecycle of their Ideas.

---

### Layer 5: Full API Execution (`POST`)

This is the highest layer of functionality, transforming an Ideator into a true, invocable web service.

- **How It Works:** This layer handles `POST` requests to an Ideator's domain, executing its logic. This can be implemented via a managed serverless function or by a user self-hosting their own endpoint.
- **Purpose:** To provide the full power of a serverless architecture, allowing anyone to publish a fully functional microservice with just a static definition file.

## 3. API Specification

All HTTP interactions happen at the root of the Idea's domain (`/`).

- **`GET /`**
  - With `Accept: text/html` header (Layer 2): Returns the static UI loader or redirects to the `page` URL.
  - With `Accept: application/json` header (Layer 3): Returns the Idea's source JSON file.
- **`PUT /`** (Layer 4)
  - Requires authentication. A single `PUT` request both uploads the new Idea source file and atomically updates the `code` URL in the `TXT` record to make the new version live.
- **`POST /`** (Layer 5)
  - Requires authentication/authorization. Executes the Ideator.
  - The request body is a JSON object containing the payload, e.g., `{"context": "The user's input to be processed"}`.
