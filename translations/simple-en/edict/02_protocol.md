# Part II: The Rules of the Game

---

_You can't build a new world of free and open sharing using the old, broken rules of the internet. Trying to mix the old and new ways is like trying to put a rocket engine on a horse-cart; it just doesn't work. To really create something free, we need to start from scratch with a totally new set of rules. We're not building a new website or app (a "platform"); we're creating a new set of rules that anyone can use to build their own stuff (a "protocol")._

---

### (Chapter 4) The Blueprint for Freedom

**An Operating System for Ideas**

We aren't building another giant app that wants to suck up all your time and data. We’re creating something more like an operating system—like Windows or iOS, but for ideas. It's a foundation that anyone can build on top of. Think of it less like a single, giant theme park and more like giving everyone a huge box of super-powered LEGOs. Our goal is to provide the rich soil where new ideas can be planted, grow, and connect with each other.

Others are encouraged to build their own tools to interact with these ideas. Some might build simple apps like a library to store ideas, while others might build powerful tools to analyze them. The whole system gets stronger and more interesting because so many different things can be built, not because one company planned it all out.

The rules are designed to be stretched. **Ideas** aren't just lumps of text; they're like different types of LEGO bricks with special shapes and jobs, like a `Record` (a piece of information), a `Process` (a set of instructions), or an `Agent` (a program that does things). We provide the basic bricks to get you started, but anyone can invent and share brand-new types of bricks. And you don’t need the most complicated computer to play. A simple app might only know how to use the basic square bricks (`Records`), while a more advanced one could handle the complex gears and motors (`Processes`). This lets everyone participate, no matter how simple or complex their tools are.

> Sidenote:
>
> - [RFC 201: Idea/Record](../rfc/201_idea_record.md)
> - [RFC 202: Idea/Vessel](../rfc/202_idea_vessel.md)
> - [RFC 203: Idea/Process](../rfc/203_idea_process.md)

**Privacy Through Your Own Secret Clubhouse**

To be truly free and independent, you need privacy. Not everything needs to be shared with the whole world. These rules are designed to let ideas travel between different **private nodes**.

A private node is like your own personal secret clubhouse. It's your own digital space where you can think, create, and experiment without anyone watching over your shoulder. It’s a safe place to figure out what you really want to say before you share it.

You can create a new idea inside your private clubhouse—your own computer, with your own files and AI tools. When you share the final creation, it has a little tag on it that says where it came from, but it doesn't show anyone the messy, private process of how you made it. This strikes a perfect balance: you can trace an idea's history and see how things are connected, but everyone’s personal creative space stays respected and private. You can use what someone created without needing to see their secret notes. The gaps in an idea's history become interesting mysteries to solve, not problems.

This setup frees people from having to be the police of a giant platform. The responsibility is shared by everyone. The goal isn't to control what people do, but to give them a set of rules that helps everyone be free.

---

### (Chapter 5) How a Living Web Works

The most important rule for this free system is this: **the thing you create *is* the rulebook.** There are no secret commands, no hidden servers, and no special software you have to buy. The only thing that exists in this world is the **Idea**.

Each Idea is like a magical recipe card that contains a complete package of three things:
1.  **The Dish** (the `solution`): This is the final creation, the actual content.
2.  **The Recipe** (the `schema`): These are the instructions for how the dish is made and what can be done with it.
3.  **The History** (the `context`): This is a note explaining where the recipe came from and how it was made.

These recipe cards are everything—they are the messages, the tools, and the results. Because everything is out in the open, you are never locked in. You can take your entire collection of recipe cards and move to a new kitchen at any time.

All of the cool features below happen automatically because of this simple design.

> Sidenote: [RFC 101: Concept/Idea](../rfc/101_concept_idea.md)

- **Permanent by Design:** The only thing you can do is share a new Idea. You can never change or delete old ones. It’s like writing in a book with permanent ink. To change a thought, you just create a *new* Idea that points back to the old one and says, "This is an update." This creates a perfect, unbreakable history of how a thought grew over time, which makes everything much simpler and more trustworthy.

- **A Web of Connections:** Every Idea always remembers where it came from. It's like a family tree for thoughts. When you create a new idea based on someone else's, it forms a link. This isn't just a boring record; it’s a living network where everyone can build on each other's work. If the original idea you used gets an update, you get a notification! You can then decide if you want to use that new update in your own creation. It’s like a giant, worldwide group project where everyone's work can evolve together.

- **The Universal Translator:** The three-part recipe card makes everything incredibly easy for computers to understand. Because every Idea explains itself, any program can become a powerful tool. The "Hello, World!" (the very first, simplest program you can build) for this system is a tiny web server that takes a recipe card, shows it to an AI (like ChatGPT), and shares the AI's response. This tiny program can instantly understand and work with *every single Idea on the network*, even types of ideas that haven't been invented yet! You no longer need to be a master coder to participate. The AI acts like a universal translator, making it fair for everyone to join in and share knowledge.

- **A Universe of Endless Invention:** This system allows anyone to invent new things without asking for permission. You can create a totally new *type* of Idea and start sharing it, and the whole network instantly learns how to use it. You don't have to convince a big company to add your feature. Because every Idea is its own instruction manual, even the simplest program with a Universal Translator can immediately understand and use it. A single person can dream up a new concept, and in a flash, it becomes a tool for the whole world.

---

### (Chapter 6) The Method — A Building-Block System for Creating Meaning

The way this system works is inspired by simple, powerful ideas from computer science, like the Unix philosophy. The core secret is this: an **Idea is not just information, it’s a little machine.** It carries the main content (the `solution`) but also brings along its own toolbox for how it can be used (the `schema` and `context`). This makes every Idea a self-contained little universe, ready to be worked on.

> Sidenote: [RFC 103: Concept/Ideator](../rfc/103_concept_ideator.md)

The little robots that work on these Idea-machines are called **Ideators**. Think of them as specialty tools that do one job really well. An **Ideator** takes an `Idea` as input, does something to it, and always produces a new `Idea` as output. This simple rule—Idea in, Idea out—is what makes the whole system so stable and powerful.

What’s really cool is how Ideators check their work. An **Ideator** doesn't need to understand every single detail of an Idea. It just needs to check for the one or two parts it needs. For example, an "Idea Improver" robot might just say: *"I will work on any Idea as long as it has a piece of text called a `title`."* It doesn't care about anything else, which makes it super flexible and able to work with all sorts of different Ideas.

This "Idea as a machine" model is what lets you connect everything together. Because every **Ideator** speaks the same language of Ideas, you can chain them into an assembly line. A smart planner program can build amazing workflows out of these simple tools without getting tangled up in complicated details. But it's also flexible. Any **Ideator** can also be set up to work like a normal web API, so other programs can use it easily.

Imagine an assembly line of **Ideators**: a starting `Idea` is sent to a **Simulator** to imagine possible futures, then to a **Critic** that spots weaknesses, then to an **Improver** that fixes the weaknesses based on the critique, and finally to a **Publisher** that shares the result with your friends. Each **Ideator** is a simple tool on its own, but when you connect them, you create a powerful system for thinking and inventing.

> Sidenote: [RFC 009: Agent/Plan](../rfc/009_agent_plan.md)

This is how ideas become something like living things. An `Idea` survives and grows by being interesting enough for other people and **Ideators** to spend time working on it. It travels across the network, being changed, remixed, and improved at each stop. An idea's importance is proven by its ability to keep this journey going.