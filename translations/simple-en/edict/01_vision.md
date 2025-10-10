# Part I: The Vision

---

_The big idea is a pushback against how the internet is run today. Right now, a few big companies control almost everything. We want to build a new kind of internet where individuals and groups have their power back, like building a town where everyone owns their own house instead of renting from one giant landlord._

---

### (Chapter 1) The Core Idea & Principles

Everything we're building follows a few simple but strong rules. This helps everything fit together perfectly.

- **Everything is an Idea.** Think of it like a world made of LEGOs. Every single thing—an app, a document, a tool, or even a set of instructions—is a special kind of LEGO brick called an "Idea." This keeps everything simple and consistent.

  > Sidenote: [RFC 101: Concept/Idea](../rfc/101_concept_idea.md)

- **Self-Contained and Self-Describing.** Every "Idea" is like a toy that has its instructions printed right on it. You don't need a separate manual. Any computer or AI can look at it and instantly understand what it is and how to use it.

  > Sidenote: [RFC 001: Agent/Request](../rfc/001_agent_request.md)

- **Any Idea Can Have a Home.** Any "Idea" can be given its own web address, like `www.my-cool-idea.com`. This gives it a permanent place on the internet. If it's a familiar type of thing (like an article), it will look like a normal article. If it's a special tool (called an Ideator), it gets a universal control panel so you can interact with it.

  > Sidenote: [RFC 102: Concept/Sovereignty](../rfc/102_concept_sovereignty.md)

- **Ideators are Ideas with Input.** An "Ideator" is a special kind of "Idea" that can *do* something. Think of a normal Idea as a picture on the wall, but an Ideator is like a vending machine. You give it some input (like money and a button press), and it gives you something back.

  > Sidenote:
  >
  > - [RFC 103: Concept/Ideator](../rfc/103_concept_ideator.md)
  > - [RFC 005: Agent/Input](../rfc/005_agent_input.md)

- **Composable by Design.** The whole system is designed for things to snap together. Some Ideators can change other Ideas, which means you can chain them together to create powerful new tools and workflows, just like connecting different LEGO machines to build a factory.

- **The LLM is the Universal Interpreter.** We use a smart Artificial Intelligence (called a Large Language Model or LLM) to be the brain of the system. It can look at any "Idea," read its built-in instructions, and figure out how to run it, even if it's never seen that type of Idea before. This makes the system incredibly flexible.

  > Sidenote: [RFC 104: Concept/Latent](../rfc/104_concept_latent_.md)

- **A Protocol of Living Ideas.** We're not just sharing boring, static files. We're sharing living systems that can grow, change, and connect with other Ideas over time, like plants in a garden.

---

### (Chapter 2) The Diagnosis — The Gilded Cage of Big Tech

The problem today is that we've made a deal with big tech companies that sounds good but is actually a trap. At first, they offered us websites where we could reach millions of people, but they kept our data and controlled what we could do. Now, they're offering amazing AI tools that are hard to say no to. The more we use their stuff, the more we depend on them. It’s like being in a beautiful cage made of gold. It looks nice, but you're still trapped, and you don't really own your digital life.

> Sidenote:
>
> This is what today's internet looks like. A big company (Platform) is in the middle, and it controls how everyone (Peers) connects.
>
> ```mermaid
graph LR
    P((Platform))
    A((Peer)); B((Peer)); C((Peer)); D((Peer));

    A --> P; B --> P; C --> P; D --> P;
```

---

### (Chapter 3) The Solution — A Decentralized Renaissance

The answer isn't to build a slightly better cage. The answer is to leave the cages behind and explore a new, open world. We are going back to the original dream of the internet—a place where everyone could connect freely—but updated for the age of AI. This new beginning is based on two big ideas.

- **A Vision of Autonomy:** We want to move from using central websites (platforms) to using a shared language (a protocol) that lets our computers talk directly to each other. You would use a small AI on your own computer to do things, and you'd connect with friends person-to-person (peer-to-peer). This keeps your data and your digital life completely in your control. The goal is to create a system for ideas where you can share smart, interactive things—like a budget that manages itself, or a project plan that automatically updates—as easily as you share a document today, without needing a big company in the middle.

> Sidenote:
>
> In our new network, everyone (Peers and Services) is equal and can connect to anyone else directly, without a middleman.
>
> ```mermaid
graph TD
        A((Peer)) <--> B((Peer))
        A <--> C((Peer))
        A <--> D((Service))
        B <--> C
        B <--> E((Peer))
        C <--> F((Service))
        D <--> E
        D <--> F
        E <--> F
```

- **A Philosophy of Connection:** This new way of building things also changes how we connect with people. Today, social media encourages us to share everything with everyone to get "likes." We want to bring sharing back to what it should be: a meaningful and deliberate act of giving something to people you know and trust. Instead of shouting everything in a giant public square, you can create your own "hidden worlds" and have real conversations, with full control over who sees your ideas and what you share.