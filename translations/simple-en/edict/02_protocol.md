# Part II: The Rules of the Game

---

_People often think about building a new, better internet by patching up the old one. But that’s like trying to build a spaceship by adding wings to a car. It just won't work. To create something truly free and powerful, we have to start from scratch with a completely new set of rules. We’re not building another website or app that someone else controls; we’re creating a shared rulebook that anyone can use to build their own things._

---

### (Chapter 4) The Blueprint for a Free Web

**An Operating System for Ideas**

We aren't building another big website like Facebook or Google that you have to log into. Instead, we’re making something more like an operating system (like Windows or macOS), but for ideas. It’s a foundation that anyone can build on top of.

The goal isn't to make one giant app that does everything. The goal is to create rich soil where new ideas can be planted, grow, and connect with each other. We expect and hope that other people will build their own apps and tools using these rules. Some might build simple tools for saving notes, while others might create powerful programs for analyzing information. The system becomes stronger and more interesting because of all the different things people create, not because of one master plan.

These rules are designed to be easily expanded. **Ideas** are like smart, living documents that can be shared and changed. They come in different types, like a `Record` (which is like a note), a `Process` (a set of steps), or an `Agent` (a program that does things). We provide the basic types to get started, but anyone can invent their own new types of Ideas.

And you don't have to worry about everyone’s app understanding every single type of Idea. A simple note-taking app might only know how to handle `Records`, while a more advanced app could manage complex `Processes`. This lets people build specialized tools that do one thing really well.



Imagine you have a secret recipe for creating an amazing new idea on your own computer. You can use your private tools and data to generate the idea, and then share the final result. This shared idea will contain a note saying where it came from, but without revealing your secret recipe. This creates a perfect balance: you can trace an idea's history and see how it connects to others, but everyone's private creative space is respected. You can use the finished product without needing to see the secret kitchen where it was made.

This design frees creators from being controlled by a central company. The power and responsibility are given to the users at the edges of the network. The goal isn't to police a platform; it's to give everyone a set of rules that makes freedom the default.

---

### (Chapter 5) How a Living Web Works

The whole system is built on one simple, powerful rule: **the message itself contains all the rules.** There are no secret commands or hidden computer systems. The only thing that exists is the **Idea**.

Every Idea is a small package containing three things:
1.  The **solution**: The actual content or information.
2.  The **schema**: A rulebook that describes what the content is and how it can be used.
3.  The **context**: The history of where the Idea came from.

These little packages are everything. They are the messages, the instructions, and the results. Because everything you need is inside the package, you truly own your ideas. You're never locked into a specific app or website, and you can take all of your ideas with you wherever you go.



*   **Permanent by Design:** The only thing you can do is share a new Idea. You can't ever change or delete an old one. To update a thought, you create a *new* Idea that points back to the old one. This creates a perfect, unbroken history of how a thought grew over time. It sounds simple, but it gets rid of a ton of problems that normal computer systems have.

*   **A Web of Connections:** Every Idea knows its own history. It keeps track of which other Ideas it came from, creating a web of connections that you can explore. This isn't just a boring log file; it's a living network. If someone updates an Idea that you used as a source for your own, you get a notification. You can then choose whether or not to include their changes in your own work. This allows people to collaborate and build on each other's work in a clear and controlled way, letting the whole network of ideas grow together.

*   **The Universal Translator:** This three-part package makes everything incredibly easy to use. Because every Idea carries its own rulebook, any app can be a powerful participant in the network. The “Hello, World!” of this system (the simplest first program you can write) is just a few lines of code. It's a tiny program that takes an Idea package, hands it to a smart AI (like ChatGPT), and shows you the result. This simple program can immediately understand and work with *every single Idea* on the network, even types of Ideas that haven't been invented yet. You no longer need to be an expert coder to join in. The AI acts as a **universal translator**, making it possible for anyone to participate.

  > Sidenote:
  >
  > [RFC 104: Concept/Latent](../rfc/104_concept_latent_.md)
  >
  > The AI is the default way to interact with things. It's like a magic box that can understand any `Idea` you give it and turn it into something new and useful, without needing any special programming.
  >
  > ```mermaid
  > graph TB
  >     Input[/Input Idea/] --> LLM@{ shape: cloud, label: "Latent Space" }
  >     LLM --> Output[\Output Idea\]
  > ```

*   **A Universe of Endless Invention:** Because of the universal translator, anyone can invent a new type of Idea and start sharing it, and the entire network can instantly start using it. You don't have to ask for permission or wait for other people to update their apps. Since every Idea package explains itself, even the simplest app can understand and work with a brand-new type of message. One person can introduce a new concept, and the whole network instantly learns its language.

---

### (Chapter 6) The Method — Building with Thought-Bricks

The way we build things with these rules is inspired by the simple and powerful philosophy of Unix and building with LEGOs. The main insight is this: an **Idea is not just information, it’s a package ready for action**. It bundles the information itself (the **solution**) with its own instruction manual (the **schema** and **context**).



The agents that perform these actions are called **Ideators**. Think of them as specialized tools or workers. An **Ideator**'s job is simple: it takes one `Idea` package as input, does something to the information inside, and then produces a *new* `Idea` package as output. This simple contract—Idea in, Idea out—is what makes the whole system so stable and predictable.



What's really cool is how these tools check their work. An **Ideator** doesn’t need to understand every single detail about an Idea it receives. It only needs to check for the specific parts it needs. For example, an 