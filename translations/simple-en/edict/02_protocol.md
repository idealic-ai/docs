# Part II: The Rules of the Game

---

_You can't build a new, better internet on top of the old, broken one. Trying to mix the old and new just means you carry over all the old problems. To make something truly free, you have to start from scratch with a completely new set of rules built for being strong, independent, and open. We aren't building another website or app; we're creating the rules of the game itself._

---

### (Chapter 4) A Blueprint for Freedom

**An Operating System for Ideas**

We are not making another giant website that wants all your time and information. Instead, we're building an _operating system for ideas_. Think of it like the soil in a garden. We're not telling you what plants to grow; we're creating a rich, healthy place where your own ideas can be planted, grow, and connect with other ideas.

Anyone can build their own tools to look at and work with these ideas. Some might build a simple library to store them, while others might build powerful tools to analyze them. The whole system becomes stronger and more interesting because of all the different things people build, not because one company planned it all out.

This system is designed to grow. **Ideas** aren't just plain documents; they come in special types like a `Record` (a piece of information), a `Process` (a set of steps), or an `Agent` (a program that does things). We provide a basic set of these types to get started, but anyone can create their own. The cool part is that not every tool has to understand every type of Idea. A simple app might only know how to read `Records`, while a more advanced one could handle complex `Processes`. This lets people build specialized tools that are really good at one thing.

> Sidenote:
>
> An "Ideator" (a tool that processes ideas) can work in private. You can send it an Idea, and it will send you a new one back, but you never see how it works inside. It's like a magic black box.
>
> ```mermaid
> flowchart TB
>         InputIdea[/Input Idea/]
>         OutputIdea[\Output Idea\]
>
>     subgraph Ideator ["<div style=\"width:260px; height:8em; display:flex; justify-content: flex-start; align-items:flex-start;\">Hosted Ideator</div>"]
>         direction LR
>         IdeatorService{{Ideator Service}}
>         HiddenContext["Private Context / Logic"]
>         IdeatorService -- Invokes --> HiddenContext
>     end
>
>     InputIdea -- "Sends input" --> IdeatorService
>     HiddenContext -- "Returns output" --> OutputIdea
>
>     style HiddenContext fill:#ffe,stroke:#333,stroke-width:2px,stroke-dasharray: 5 5
> ```

An idea can come from a private place, like your own computer with its own secret data. The final idea it creates will have a note saying where it came from, but without giving away any of the secrets. This creates a perfect balance: you can see the family tree of an idea, which is great for trust and understanding, but it still protects people's privacy. You can use the finished product without needing to know exactly how it was made.

This design frees creators from having to control everything. The responsibility is shared by everyone who uses the system. The goal isn't to police a website, but to give people a powerful set of rules that lets them be free by its very design.

---

### (Chapter 5) How a Living Web Works

The most important rule is this: **the idea itself contains all the rules.** There are no secret computer commands or hidden systems. The only thing that exists is the **Idea**. Each Idea is like a package with three parts: the **solution** (the actual content), the **schema** (an instruction manual explaining what the content is), and the **context** (its history and family tree). These packages are the only things sent back and forth. Because everything is in the package, you're never locked into one service. You can pick up all your ideas and move them anywhere, anytime.

> Sidenote: [RFC 101: Concept/Idea](../rfc/101_concept_idea.md)

- **Unchangeable by Design:** You can only do one thing: share an Idea. Once an Idea is shared, it can never be changed or deleted, just like a letter you've already mailed. To change your thought, you create a *new* Idea that refers back to the old one. This creates a perfect, unbreakable history of how the thought evolved. It makes the whole system much simpler and more trustworthy.

- **A Web of Connections:** Every Idea keeps track of its history through **references**, like footnotes in a book. This creates a living network showing how ideas are connected. If an original Idea is updated with a new version, any other Ideas that refer to it get a notification. This lets their owners decide if they want to update to the new version. It's like how group projects work in programming, allowing the whole network of ideas to grow together in a smart way.

- **The Universal Translator:** This three-part package makes everything easy to understand. Because every Idea comes with its own instruction manual (schema), any computer program can become a powerful tool. The simplest program you could write for this system would be just a few lines of code: a program that takes an Idea, sends it to a smart AI (like ChatGPT), and returns the AI's answer. This tiny program can instantly understand and work with *every* Idea on the network, even types of ideas that haven't been invented yet! The AI acts as a universal translator, making it easy for anyone to join in and create.

  > Sidenote:
  >
  > [RFC 104: Concept/Latent](../rfc/104_concept_latent_.md)
  >
  > The AI is like a magic box that acts as the default way to interact with things. It can take any Idea you give it and turn it into a useful new Idea, without you needing to write any special code.
  >
  > ```mermaid
  > graph TB
  >     Input[/Input Idea/] --> LLM{{Latent Space}}
  >     LLM --> Output[\Output Idea\]
  > ```

- **A Universe of Creation Without Permission:** This system lets anyone invent new things. You can create a new type of Idea and start sharing it right away. You don't need to ask for permission or convince a company to add it. Because every Idea explains itself, even the simplest programs using the "Universal Translator" can immediately understand and use your new creation. One person can introduce a new concept, and the whole network instantly knows how to work with it.

---

### (Chapter 6) The Method — Building with Ideas

This system is built like LEGOs. Its design is inspired by simple, powerful tools that you can combine to build complex things. The key insight is that an **Idea is not just information, but a little container for a program**. It holds the main content (the **solution**) along with everything needed to understand it (the **schema** and **context**). This makes every Idea a self-contained package, ready to be used.

> Sidenote: [RFC 103: Concept/Ideator](../rfc/103_concept_ideator.md)

The special tools that work on these Ideas are called **Ideators**. Think of them as little machines. An **Ideator** always does the same thing: it takes one Idea-package as an input, does something to it, and spits out a new Idea-package as an output. This simple rule makes the whole system incredibly stable and predictable.

> Sidenote:
>
> Because these Ideator machines are like LEGO bricks, you can snap them together to build very complex systems. This picture shows an idea being split into two paths, where different 'Improver' and 'Evaluator' machines work on it. Then, an 'Arbiter' machine picks the best result to start the next loop of improvement.
>
> ```mermaid
> graph TD
>     Vessel{Vessel} --> Writer{{Writer}}
>     Writer --> ForkService[Forking Service]
>     Writer --> Vessel
>
>     ForkService -- "A" --> Improver1{{Improver}}
>     Improver1 --> Evaluator1{{Evaluator}}
>
>     ForkService -- "B" --> Improver2{{Improver}}
>     Improver2 --> Evaluator2{{Evaluator}}
>
>     Evaluator1 --> Arbiter{{Arbiter}}
>     Evaluator2 --> Arbiter
>
>     Arbiter -- "Best" --> Writer
> ```

A really smart part of this design is how **Ideators** check their inputs. An **Ideator** doesn't need to understand every single detail of an Idea. It just needs to check for the specific parts it needs. For example, an "Idea Improver" tool might say: _"I'll work with any Idea as long as it has a 'title' written in text."_ It doesn't care about anything else inside the package. This makes the tools very flexible and reusable.

This LEGO-like model is what makes everything work together so well. Because every **Ideator** speaks the same language of "Idea-packages," they can be chained together in long lines, like a factory assembly line. This allows you to build powerful workflows from simple parts. And if you want, you can also use any **Ideator** directly, just like a normal web API.

Imagine a chain of **Ideators**: a starting `Idea` is sent to a **Simulator** to see what might happen, then to a **Critic** that gives feedback, then to an **Improver** that makes it better based on the feedback, and finally to a **Publisher** that shares it with friends. Each tool is simple on its own, but together they create a powerful system for thinking and creating.

This is how ideas come to life in this digital world: an `Idea` survives and grows by convincing other tools and **Ideators** to pay attention to it and process it. It travels across the network, getting remixed and improved at every stop, proving it's valuable just by continuing its journey.