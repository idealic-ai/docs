# Part I: The Vision

---

_The big idea here is to fix a big problem with the internet: a few giant companies control almost everything. We want to build a new online world where power is given back to you, so you're in charge of your own digital life._

---

### (Chapter 1) The Core Idea & Principles

Everything in this new system is built on a few simple but strong rules. These rules make sure everything can work together, like different types of building blocks that all fit together perfectly.

- **Everything is an Idea.** Imagine everything online is made of the same special kind of Lego brick. We call this brick an "Idea." An app, a document, a tool, or even a set of instructions is just a different arrangement of these same basic bricks. This keeps everything simple and easy to work with.

  > Sidenote: [RFC 101: Concept/Idea](../rfc/101_concept_idea.md)

- **Self-Contained and Self-Describing.** Each "Idea" is like a toy that has its instructions printed right on the box. You don't need to look anywhere else to figure it out. Any person or computer can instantly understand what an "Idea" is and how to use it just by looking at it.

  > Sidenote: [RFC 001: Agent/Request](../rfc/001_agent_request.md)

- **Any Idea Can Have a Home.** Any "Idea" can get its own special web address, like a house number on a street. This makes it a real place on the internet. If it's something simple, like a blog post, its 'house' looks like a normal webpage. But if it's a special tool called an "Ideator," it gets a cool workshop interface where you can build things.

  > Sidenote: [RFC 102: Concept/Sovereignty](../rfc/102_concept_sovereignty.md)

- **Ideators are Ideas with Input.** An "Ideator" is a special kind of "Idea" that can take things you give it and make something new. It’s like a blender: you put in fruit and yogurt (that's the input), and it gives you back a smoothie.

  > Sidenote:
  >
  > - [RFC 103: Concept/Ideator](../rfc/103_concept_ideator.md)
  > - [RFC 005: Agent/Input](../rfc/005_agent_input.md)

- **Made to Be Combined.** Since everything is made from the same "Lego" bricks, you can snap them together to build bigger and more powerful things. You can connect "Ideators" in a line, like a factory assembly line, where each one does a job and passes its work to the next.

- **The AI is the Universal Translator.** We use a smart AI to be the brain of the whole system. Because every "Idea" has its instructions built-in, the AI can read them and understand how to make any "Idea" work with any other "Idea". It's like having a universal translator that lets everyone and everything speak the same language.

  > Sidenote: [RFC 104: Concept/Latent](../rfc/104_concept_latent_.md)

- **A Network of Living Ideas.** We're not just sharing boring files like photos that never change. We're sharing things that are alive—they can grow, change, and learn over time as people use and improve them. Imagine sharing a pet that learns new tricks, not just a picture of a pet.

---

### (Chapter 2) What's Wrong — The Fancy Cage of Big Tech

The biggest problem with the internet today is that giant tech companies have lured us into a trap that looks amazing from the inside. At first, places like Instagram and YouTube promised we could connect with millions of people and share our creations. So we all joined. But while we were having fun, they were building walls around us, collecting our data, and controlling what we see.

Now, they're doing the same thing with powerful AI. They offer incredible new tools that are hard to resist. But all this cool stuff comes at a cost. When we rely on their tools for everything, we become stuck. We're living in a beautiful cage—it's comfortable, but we lose our freedom. Our digital lives aren't really ours anymore.

> Sidenote: Here’s a picture of how things work now. There’s one big company (the Platform) in the center. Everyone has to go through them to connect with each other. The company controls everything.
>
> ```mermaid
> graph LR
>     P((Platform))
>     A((" ")); B((" ")); C((" ")); D((" "));
>
>     A --> P; B --> P; C --> P; D --> P;
> ```

---

### (Chapter 3) The Fix — A New Beginning for the Internet

The solution isn't to build a slightly nicer cage. It's to break out of the cages completely and build something new and open. We want to bring back the original dream of the internet—a wide-open space where anyone could build and share freely—but update it with today's amazing AI technology. This fresh start is based on two big ideas: a new way to build things, and a new way to connect with people.

- **A Vision of Freedom:** We want to switch from everyone using the same big websites (platforms) to everyone using a shared set of rules (a protocol). Think of it like this: instead of everyone going to one giant playground owned by a single company, we give everyone a rulebook to build their *own* playgrounds. And because they all use the same rulebook, all the playgrounds can connect to each other. In this world, you could share smart, interactive things—like a video game that builds itself or a school project that organizes its own research—as easily as you share a photo today.

> Sidenote: Now, think about how you and your friends make plans. There isn't one "boss" friend that everyone has to talk to. You can all talk directly to each other.
>
> That's how our new system works. It’s "decentralized," which is just a fancy word for "no one in the middle controlling everything."
>
> Everyone connected is an equal, called a "peer." Some might offer a special service, like a game you can play, but they're still just another friend in the group. Anyone can connect to anyone else.
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

- **A Philosophy of Connection:** This also changes how we talk to each other online. Right now, posting on social media feels like shouting into a huge, noisy crowd, hoping someone hears you. We want to make sharing feel more personal again, like giving a thoughtful gift to a friend you trust. It’s about getting away from the endless flood of random stuff and creating your own small, private worlds where you can have real conversations with people who care.