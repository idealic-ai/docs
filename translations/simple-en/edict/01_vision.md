# Part I: The Vision

---

_The big idea is to fight back against the way the internet is heading, where a few giant companies control everything. We want to build a new digital world where everyone is in charge of their own stuff, like the boss of their own digital life._

---

### (Chapter 1) The Core Idea & Principles

This new world is built on a few simple, strong rules that make sure everything works together smoothly.

- **Everything is an Idea.** To keep things simple, everything in this system—an app, a tool, a document—is just called an "Idea." Think of them like LEGO bricks. They're all the same type of thing, but you can use them to build anything you can imagine.

  > Sidenote: [RFC 101: Concept/Idea](../rfc/101_concept_idea.md)

- **Self-Contained and Self-Describing.** Every Idea comes with its own instruction manual built right in. This means any computer or AI can look at it and instantly know what it is and how to use it, without needing to be taught beforehand. It's like a toy that has the instructions printed right on it.

  > Sidenote: [RFC 001: Agent/Request](../rfc/001_agent_request.md)

- **Any Idea Can Have a Home.** Any Idea can get its own web address, like `www.mycoolidea.com`. This gives it a permanent home on the internet. If it's something familiar (like an article), it will look like an article. If it's a special kind of tool called an "Ideator," it will get a simple screen that can work with anything.

  > Sidenote: [RFC 102: Concept/Sovereignty](../rfc/102_concept_sovereignty.md)

- **Ideators are Ideas with Input.** An "Ideator" is a special kind of Idea that can do something when you give it information. Think of it like a machine. An Idea might be a blueprint for a car, but an Ideator is the car itself—you give it fuel (the input) and it drives.

  > Sidenote:
  >
  > - [RFC 103: Concept/Ideator](../rfc/103_concept_ideator.md)
  > - [RFC 005: Agent/Input](../rfc/005_agent_input.md)

- **Composable by Design.** You can connect Ideas together to create bigger and more powerful things, just like stacking LEGO bricks. Some Ideators can even change other Ideas. You can link them together in a chain to build amazing creations, like a factory assembly line where each machine does one job.

- **The LLM is the Universal Interpreter.** We use a smart AI (like the brain in ChatGPT) to understand and run all these Ideas. Because every Idea explains itself, the AI can work with any of them, even brand new ones it's never seen before. It’s like having a magical remote control that automatically knows how to work with any device you point it at.

  > Sidenote: [RFC 104: Concept/Latent](../rfc/104_concept_latent_.md)

- **A Protocol of Living Ideas.** We're not just sharing boring, static files like a picture or text. We are sharing living tools and systems that can change, grow, and get better over time as people work on them together.

---

### (Chapter 2) The Diagnosis — The Gilded Cage of Big Tech

The main problem with the internet today is a deal from big tech companies that seems great but is actually a trap. First, they gave us social networks to connect with lots of people, but they collected our data and locked us into their websites. Now, they're giving us powerful AI tools that are hard to say no to. 

The more we use their free and convenient stuff, the more we depend on them. We get trapped in a "gilded cage"—it looks beautiful and shiny on the outside, but it's still a cage. They end up controlling our data and our entire digital lives.

> Sidenote: A typical network where one big company (Platform) owns all the data and controls everyone.
>
> ```mermaid
> graph LR
>     P((Platform))
>     A((" ")); B((" ")); C((" ")); D((" "));
>
>     A --> P; B --> P; C --> P; D --> P;
> ```

---

### (Chapter 3) The Solution — A Decentralized Renaissance

The solution isn’t to build a slightly nicer cage. It’s to break out of the cages completely and create a new, open digital world. We’re going back to the original dream of the internet, where nobody was in charge, but we’re updating it with today's smart AI technology. This "rebirth" is built on two big ideas:

- **An Vision of Autonomy:** Instead of everyone using a few giant websites (platforms), we want to use a shared set of rules (a protocol). With these rules, everyone can run their own AI on their own computers and connect directly with friends, like a walkie-talkie system (this is called peer-to-peer). This keeps your data and your digital life completely under your control. The goal is to create a system where you can share interactive tools—like a budget that manages itself or a team plan that updates on its own—as easily as you share a photo, without a big company in the middle.

> Sidenote: In a decentralized network, everyone is equal and can connect directly to each other without a company in the middle.
>
> ```mermaid
> graph TD
>         A((" ")) <--> B((" "))
>         A <--> C((" "))
>         A <--> D{{"Service"}}
>         B <--> C
>         B <--> E((" "))
>         C <--> F{{"Service"}}
>         D <--> E
>         D <--> F
>         E <--> F
> ```

- **A Philosophy of Connection:** This new system also changes how we connect with people online. Right now, sharing on social media is like shouting in a giant, noisy crowd, hoping someone hears you. We want to make sharing a thoughtful choice again, where you give things only to people you trust. Instead of a firehose of random posts, we can have real conversations in small, trusted groups. This lets you build your own private worlds online, where you have total control over who sees your ideas and what you create.