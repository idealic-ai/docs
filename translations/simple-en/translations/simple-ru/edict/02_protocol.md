# Part II: The Protocol

---

_Imagine we’re building a new world on the internet, one that’s free and open for everyone. We can't build it on the old, shaky foundation where one person or company is in charge. Trying to mix the old and new is like putting wooden wheels from a cart onto a race car. It just won’t work. To create something truly free, we need a completely new foundation, designed from scratch. This isn't a 'platform'; it's a protocol._

---

### (Chapter 4) The Architecture of Liberation

**An Operating System for Ideas**

We’re not building another giant website that will take up your time and data. We're creating an _operating system for ideas_—think of it like Windows or Android, but for your thoughts instead of for apps. The goal isn’t to create one single super-app for everyone, but to prepare fertile soil where anyone can plant their own "living ideas," watch them grow, and connect them with others. Other people can and should build their own programs to work with this system. Someone might make a simple archive for storing ideas, while someone else might create a complex tool to analyze them. The richness and health of the whole system will come from this variety, not from one person having all the best ideas.

By its very nature, the protocol can be expanded. **Ideas** (living documents that can be shared and can evolve) aren't just identical notes. They have different types, each with its own meaning. For example, there are `Records`, `Processes`, or `Agents`. It's like a LEGO set: you have simple bricks, but you also have wheels, windows, and little people. We provide a basic set of these "idea types" that you can use to build almost anything. But the most important thing is that the protocol is open. Anyone can invent and create their own type of "idea." And your program doesn't need to understand every single type of idea in the world. A simple program could work with just `Records`, while a more advanced one could manage complex `Processes`. This allows the system to be flexible and grow, encouraging people to create new, unique tools.

> Sidenote: An Ideator on a private server is like a magic box. It can take your Idea (the input data), process it, and give you a result (the output data). But how exactly it does that—its "inner world" and logic—remains a complete secret. From the outside, no one will ever know what's happening inside.
>
> ```mermaid
> flowchart TB
>         InputIdea[/Incoming Idea/]
>         OutputIdea[\Outgoing Idea\]
>
>     subgraph Ideator ["<div style=\"width:260px; height:8em; display:flex; justify-content: flex-start; align-items:flex-start;\">Hosted Ideator</div>"]
>         direction LR
>         IdeatorService{{Ideator Service}}
>         HiddenContext["Private Context / Logic"]
>         IdeatorService -- Calls --> HiddenContext
>     end
>
>     InputIdea -- "Sends data" --> IdeatorService
>     HiddenContext -- "Returns result" --> OutputIdea
>
>     style HiddenContext fill:#ffe,stroke:#333,stroke-width:2px,stroke-dasharray: 5 5
> ```
A message can come from your personal "black box"—your computer, where your data and AI models are stored. A finished idea that you share will contain information about where it came from, but it won’t reveal your secrets. This creates an honest web of knowledge where you can trace where everything came from, but your personal space remains private. You can work with the result without needing access to the process, and if there are gaps in an idea’s history, you can treat them as mysteries to be solved or just accept them as they are.

This kind of system frees creators from the burden of controlling everything. Responsibility is shared among all the participants. The goal isn’t to keep order on a single platform, but to give people a protocol that is free by its very nature.

---

### (Chapter 5) The Mechanics of a Living Network

The foundation of this free architecture is built on one simple-but-powerful thought: **the content itself sets the rules of the game.** There are no hidden commands, secret servers, or complicated instructions. The entire system is made of just one single part: the **Idea**. Each Idea is a self-contained "three-in-one package" that consists of a **solution** (the content itself, the thought), a **schema** (the rules that explain what the data is and how it can be changed), and a **context** (the history of how it was made). These "packages" are the messages, the commands, and the results. There is nothing else. This is what gives you real freedom and ownership over your data. Since there are no hidden parts, you can never be locked inside one system. At any moment, you can take your entire universe of ideas with you. All the other rules are just logical consequences of this simple design.

> Sidenote: [Act 101: Concept/Idea](../rfc/101_concept_idea.md)
>
> Let's figure out what an "Idea" or "Concept" is in this system. It's the very first and most important building block of everything.
>
> Imagine you're building a complicated LEGO model. You have an instruction manual, right? By itself, the manual is just a booklet with pictures, not a finished model. But it has everything you need: a list of parts and a step-by-step plan for building. You can't build it without the manual.
>
> Here, an "Idea" is exactly like that digital instruction manual. It's a file that describes some kind of plan: a new program, a story for an AI to write, or even a plan for a science experiment. In this file, all the "parts" and "steps" are written down according to strict rules.
>
> Why make it so complicated? So that everyone—both people and artificial intelligence—can have a common language. When all ideas are written in the same format, it's easy to pass them to each other, improve them, and work together on something big and cool. It's like a universal blueprint that any engineer in any country can understand. This document is what sets the rules for creating these "blueprints."
- **Immutable by Nature:** There is only one action in the protocol: sharing an Idea. Ideas are unchangeable; they can't be updated or deleted. To build on a thought, you create a new Idea that links to the old one, preserving a clean and unbroken history of creativity. This simplicity gets rid of a huge number of problems that exist in normal systems.

- **A Web of Links:** Every Idea openly stores its history through **links**, creating a network of versions and citations where everything can be traced. And this isn't just an archive; it's a living, collaborative network. When a "parent" Idea is updated (meaning a new version of it appears), all the "child" Ideas that link to it get a notification. This lets the owner of the "child" Idea consciously decide whether to accept the changes from "above." This way, the entire network can evolve together.

- **The Universal Translator:** The "three-in-one" structure makes the system incredibly accessible. Since every Idea carries its own rules (schema) and history (context), any program can become a full participant. The "Hello, World!" for this new protocol is a simple five-line program: a web server that accepts an Idea "package," passes it to an artificial intelligence (LLM), and returns the result. This tiny piece of code can instantly understand and start working with any Idea in the network, even one that hasn't been invented yet. You no longer need special code for every single task. The AI acts as a universal translator that levels the playing field for everyone and creates a truly open exchange of knowledge.

  > Sidenote:
  >
  > [Act 104: Concept/Latent](../rfc/104_concept_latent_.md)
  >
  > The Artificial Intelligence (LLM) is the main way to interact with things. It’s like a universal magic function that can understand any `Idea` without needing special code. It's a magic black box that turns any incoming `Idea` into a meaningful outgoing `Idea`.
  >
  > ```mermaid
  > graph TB
  >     Input[/Incoming Idea/] --> LLM{ shape: cloud, label: "Latent Space" }
  >     LLM --> Output[\Outgoing Idea\]
  > ```

- **A Universe for Permissionless Creation:** This opens the door for creativity without needing anyone's permission. Any participant can create a new type of Idea and start sharing it, instantly expanding the rules of the game for the entire network. You don't have to convince anyone to add support for your new format. Since every Idea is self-sufficient, even the simplest program, using its "Universal Translator," can immediately understand and start working with a brand-new type of message. One person can release a new concept into the world, and the entire network can adapt to it instantly.

---

### (Chapter 6) The Method — Assembling Meaning from Blocks

The way this system works is like the philosophy of a construction set, where complex things are built from simple parts. At its core is one thought: **an Idea is not just data, but a "container" for computation.** It packs value (the **solution** itself) together with instructions for how to process it (the **schema** and **context**). This makes every Idea its own self-contained universe of meaning, ready to be worked on.

> Sidenote: # Act 103: Concept/Ideator
>
> Imagine if every one of your ideas—whether it's a new game world, a story for a comic book, or a plan to build a treehouse—could have its own special "passport." This document explains just that kind of passport for ideas, which we call an **Ideator**.
>
> An Ideator is like the DNA for an idea. It's a small text file that contains all the most important information about it. Thanks to this file, computers and programs can "understand" your idea, share it with others, and even help bring it to life.
>
> ## What is an Ideator made of?
>
> An Ideator is just text, organized according to certain rules. It has a few main fields, just like a form:
>
> *   **`id` (Unique Number):** This is like the serial number on a passport, but for an idea. No two are the same! This is so your idea never gets mixed up with another one.
>
> *   **`name` (Name):** A simple and clear name for your idea. For example, "Corgi Lovers Club."
>
> *   **`description` (Description):** A short summary of what the idea is all about. What is it and what is it for?
>
> *   **`source` (Source):** A link to the "master plan" of the idea. This could be a link to a document with a detailed description, to the code for a program, or to a folder of drawings.
>
> *   **`meta` (Extras):** Here you can write the author's name, tags for searching (like #games, #dogs), or the date it was created.
>
> ### Example of an Ideator
>
> Here's what the passport for an idea about a corgi lovers club might look like:
>
> ```json
> {
>   // A unique number so no one gets confused
>   "id": "urn:uuid:123e4567-e89b-12d3-a456-426614174000",
>
>   // The rules this passport is built on
>   "schema": "https://ideator.dev/schema/v1",
>
>   // The name of our idea
>   "name": "Corgi Lovers Club",
>
>   // A short description for everyone
>   "description": "A place where everyone who loves corgis can chat, share photos, and organize meetups.",
>
>   // Where the main document with the club rules is located
>   "source": {
>     "type": "http",
>     "url": "https://example.com/corgi-club-manifesto.md"
>   },
>
>   // A little extra information
>   "meta": {
>     "author": "Anya",
>     "tags": ["dogs", "community", "corgis"]
>   }
> }
> ```
>
> ## Why is all this necessary?
>
> When every idea has a passport that's easy for machines to understand, cool things happen:
>
> 1.  **Every idea gets its own website.** A special program can read the Ideator and instantly create a simple webpage for it. And you don't need to be a programmer to do it!
>
> 2.  **Ideas are easy to find.** You can make a search engine for ideas, just like Google or YouTube. Just type in "space games" and you'll find all the ideas like that.
>
> 3.  **No one will forget the author.** If someone takes your idea and improves it, their new "passport" will always have a link to your original idea. It's like the credits in a movie—everyone knows who helped create it.
>
> 4.  **Computers help bring ideas to life.** A helper program (an agent) can read the Ideator and help out: for example, by creating a chat room to discuss the idea or running its code if it's a program.
>
> Basically, the Ideator is the first step toward making ideas more than just thoughts in your head. They become active, living things that you can work on and develop together with the whole world.
The devices that work with these Ideas are called **Ideators**. Think of them as standardized machines for processing these "containers." An **Ideator** takes one "container" with an `Idea` as input, works with its contents according to the instructions, and always returns a new "container" with an `Idea` as output. This simple "input-output" contract is the foundation for the entire system's stability.

> Sidenote: Thanks to its "building block" nature, the protocol lets you assemble complex processes from simple, reusable blocks called Ideators, just like with LEGO. This diagram shows one of the most common ways ideas are developed: it gets copied, several teams work on improving and rating their versions in parallel, and then a main judge (`Arbiter`) chooses the best one to start a new round of improvements.
>
> ```mermaid
> graph TD
>     Vessel{Vessel} --> Writer{{Writer}}
>     Writer --> ForkService[Fork Service]
>     Writer --> Vessel
>
>     ForkService -- "Version A" --> Improver1{{Improver}}
>     Improver1 --> Evaluator1{{Evaluator}}
>
>     ForkService -- "Version B" --> Improver2{{Improver}}
>     Improver2 --> Evaluator2{{Evaluator}}
>
>     Evaluator1 --> Arbiter{{Arbiter}}
>     Evaluator2 --> Arbiter
>
>     Arbiter -- "Best Version" --> Writer
> ```
The most powerful part of this approach is data validation. An **Ideator** doesn't need to understand the entire complex structure of an incoming `Idea`. It just needs to check that it has the right shape. For example, an **Ideator** called "Idea Improver" might declare: _"I accept any `Idea` that has a `title` in its solution."_ This provides enormous flexibility.

It's this "container" model that allows us to build complex systems from simple parts. Since every **Ideator** speaks the universal language of "containers with an `Idea`," they can be arranged into complex chains. The overall structure automatically takes care of the connections between steps, allowing planner programs to create powerful workflows without getting lost in the details. But that’s not the only way. Any **Ideator** can also be called directly using standard web protocols (like HTTP), which makes the system even more flexible.

Imagine an assembly line of **Ideators**: a starting `Idea` is sent to a **Simulator** to explore possible future versions, then to a **Critic** who gives feedback, then to an **Improver** who refines the `Idea` based on the critique, and finally to a **Publisher** who shares it with the right people. Each **Ideator** is a simple, independent tool, but together they form a powerful system for thinking and creating.

This is exactly how **digital life** emerges: an `Idea` survives and evolves by "convincing" other nodes and **Ideators** to give it a little bit of processing time. It travels across the network, getting processed, mixed, and improved at every step. Its importance is proven by its ability to continue this journey.