# Part II: The Protocol

---

_The dream of a new, free internet can't be built on the shaky ground of the old one. Mixing the old and new ways doesn't work; you just inherit the old problems. To be truly free, we need to start from scratch with a totally new design, one made for being strong, independent, and open. This isn't just another website or app; it's a fundamental set of rules, like the internet itself._

---

### (Chapter 4) The Architecture of Liberation

**An Operating System for Ideas**

We're not building another giant website that wants to trap you and your data. We're creating an **operating system for ideas**—a basic foundation, like Windows or MacOS, but for creativity. The goal isn't to make one huge app for everyone, but to create fertile ground where new ideas can be planted, grow, and connect. Other people can and should build their own apps on top of this. Some might be simple like a notepad, while others could be powerful tools for thinking. The system gets stronger because of all these different tools, not because one company controls everything.

The protocol is designed to grow. **Ideas** (which are living, self-contained documents that can be shared, remixed, and built upon) aren't just one thing; they come in different types, like a `Record`, a `Process`, or an `Agent`. Think of them like different types of LEGO bricks—some are for building walls, others are for making wheels. We provide a starter set of basic `Idea` types that form the foundation, but the system is open for anyone to define new, custom `Idea` types. This flexibility doesn't mean every app has to understand every type of `Idea`. A simple app might only know how to use the 'Record' bricks, while a more advanced one could manage complex 'Processes'. This allows for a flexible and adaptable ecosystem where people are encouraged to create specialized tools.


An `Idea` can come from someone's private space—like a secret laboratory on their own computer, using their own data and AI models. When the `Idea` is shared, it carries a little 'tag' that says where it came from, like a return address on a letter. But it doesn't reveal the secret process used to create it. This creates a perfect balance: you can trace an idea's history and see how it's connected to others, while everyone's private creative space stays private. You can work with the final product without needing the secret recipe, and if there are gaps in its history, you can see them as mysteries to explore or simply accept.

This design frees us from needing a central boss to control everything. The responsibility is shared by everyone who uses the network. The goal isn't to build a walled garden we control, but to set loose a set of rules that helps everyone be free.

---

### (Chapter 5) Mechanics of a Living Network

This architecture is built on one simple but powerful rule: **the content contains the rules.** There are no secret computer commands, hidden systems, or complicated instructions. The only thing that exists is an **Idea**. Each Idea is like a complete package or a “triplet,” containing three parts: the **decision** (the actual content, like a sentence or a picture), the **schema** (a blueprint that explains what the content is and how it can change), and the **context** (the history and instructions that created it). These triplets are everything—they're the message, the input, and the output. Because everything is in the package, you truly own your ideas. You're never locked in; you can pick up your entire universe of ideas and take it with you at any moment. The following mechanics are natural results of this basic design.


- **Ideas Can't Be Changed, Only Built Upon:** The only thing you can do is share an Idea. Ideas are permanent; they can't be updated or deleted. To build on a thought, you create a *new* Idea that links back to the old one. This creates a perfect, unbroken chain of creation. This radical simplicity gets rid of a whole bunch of problems that old-fashioned systems have.

- **A Web of Links:** Every Idea clearly keeps track of its history through **links**, creating a versioned and traceable web of connections. This isn't just a static record; it's a living, collaborative network. When an 'upstream' Idea (one that came before) is updated with a new version, any 'downstream' Ideas that link to it get a notification. This lets the owner of the downstream Idea choose to incorporate the changes from upstream, allowing for careful, controlled collaboration, much like in open-source software. This lets the whole network evolve together.

- **The Universal Interpreter:** The triplet structure makes everything incredibly easy to access. Because every Idea contains its own blueprint and history, any app can become a powerful participant. The "Hello, World!" for this new protocol—the very first, simplest program you can write—is just a five-line universal client: a web server that takes an Idea triplet, sends it to a large language model (LLM), and returns the result. This tiny piece of code can instantly understand and interact with every Idea on the network, even ones that haven't been invented yet. Needing special code is no longer a barrier; the LLM acts as a universal interpreter, leveling the playing field and encouraging a truly democratic exchange of knowledge.

  > Sidenote:
  >
  > [Act 104: Concept / Latent](../rfc/104_concept_latent_.md)
  >
  > The LLM is the default way to interact with things, a universal function that can interpret any `Idea` without needing special code. It's a magic black box that turns any input `Idea` into a meaningful output `Idea`.
  >
  > ```mermaid
  > graph TB
  >     Input[/Input Idea/] --> LLM@{ shape: cloud, label: "Latent Space" }
  >     LLM --> Output[\Output Idea\]
  > ```

- **A Universe of Permissionless Innovation:** This allows for radical, permissionless expansion. Anyone can create a new type of Idea and start sharing it, effectively expanding the protocol for the entire network in real-time. There's no need to convince others to support it. Because every Idea is self-contained, even the simplest client, using its Universal Interpreter, can immediately understand and work with a brand-new type of message. One user can introduce a concept, and the entire network instantly adapts.

---

### (Chapter 6) The Method — A Composable Foundation for Meaning

This way of working is inspired by the philosophy behind the Unix operating system and the way simple pieces can be combined in functional programming. At its heart is a basic understanding: **An Idea isn't just data, it's a computational container.** It bundles its main meaning (the **decision**) with its own rich context for how it should be processed (the **schema** and **context**). This makes every Idea a self-contained universe of meaning, ready to be worked on.


The agents that operate on these Ideas are called **Ideators**. They act like standardized functions for transforming these containers. An **Ideator** takes an `Idea` container as input, works with the value inside it based on its context, and always returns a new `Idea` container as output. This input/output contract is the foundation of the system's stability.


A powerful part of this design is how it handles validation. An **Ideator** doesn't need to understand the full, complex blueprint of a source `Idea`. It only needs to check that the Idea's context and decision have the structure it requires—a kind of structural check. For example, an “Idea Improver” **Ideator** might declare: _“I will accept any source `Idea` whose decision contains a string called `title`.”_ This allows for huge flexibility.

It is this container model that makes the whole system composable, like LEGO bricks. Since every **Ideator** speaks the universal language of the `Idea` container, they can be chained together into complex pipelines. The overall structure automatically manages the complicated connections between steps, allowing a planner agent to build powerful workflows without getting lost in the details. However, this isn't the only way to interact. Any **Ideator** can also be made available for direct calls through standard protocols like HTTP, offering transparent and flexible API access.

Imagine a pipeline of **Ideators**: a starting `Idea` is sent to a **Simulator** to explore potential outcomes, then to a **Critic** that gives feedback, then to an **Improver** that refines the `Idea` based on that critique, and finally to a **Publisher** that shares it with a specific community. Each **Ideator** is a simple, independent tool, but together they form a powerful, emergent system for thinking and creating.

This is what gives rise to **digital life**: an `Idea` survives and evolves by convincing other nodes and **Ideators** to spend processing time on it. It travels across the network, being processed, remixed, and improved at every step, and its relevance is proven by its ability to continue its journey.