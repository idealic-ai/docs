# 303: Ideator/Reactor

> **Reactor:** Imagine a special kind of robot that's designed to be a universal referee for any turn-based game or activity. You give it the current state of the game (like where all the pieces are on a chessboard), and it figures out the next state of the game after a move is made.
>
> — [Glossary](./000_glossary.md)

This document explains our plan to upgrade our current poker-playing AI system into something much bigger called **"The Reactor"**. Think of it as turning a specialized poker table into a universal game board that can handle *any* turn-based activity. This could be a competitive game like chess, a team project, or even a complex business task. The Reactor will be the first “engine” for our network of ideas.

## From Just for Poker to For Any Game

Our current system for poker works great. It uses a powerful tool called Temporal to manage an entire casino world where our AI bots can play poker, think about their moves, and react to each other. We’ve already designed it so that the poker rules are separate from the main system, which means we could swap poker for another game, like checkers, in the future.

But right now, all the messages our bots send to each other are in a language only poker players understand. To make our system truly universal, we need to change that.

Our solution is to make every message a special package called the **"Idea Triplet"**. Instead of just sending a snapshot of the game board, every message will now contain three things:

1.  **Schema:** This is like the game's official rulebook. It explains what everything means and what moves are possible. It's a universal guide so anyone (or any AI) can understand the game without knowing it beforehand.
2.  **Context:** These are extra notes and hints. It could include the game's history, special instructions for the bots, or reminders about the rules.
3.  **Solution:** This is the current state of the game—a snapshot of where all the pieces are on the board right now.

Think of it this way: the `Solution` alone is just a picture of a game board. You can see the pieces, but you don't know the rules or whose turn it is. The `Schema` is the rulebook that tells you, "This is chess, and because the board looks like this, the white knight can move here or here." It gives the picture meaning. Together, these pieces form a complete package that tells you everything you need to know to make the next move.

This makes an `Idea` more than just a piece of data; it becomes a fundamental building block. It’s not like asking a chatbot a quick question and getting an answer. An `Idea` is a complete, self-contained package. It holds the question, the answer, the rules, and the entire history of how they're connected. This lets us build systems that remember and grow, rather than just handling one-off requests.

## From Fuzzy Rules to Crystal-Clear Rules

This new design lets us start playing a game even when the rules are a bit fuzzy, and then make them crystal-clear over time. The system is built to work with fuzzy rules first, treating super-clear rules as a powerful upgrade you can add later.

### 1. The Fuzzy Rulebook (Latent Ruleset)

We designed the system to handle the hardest scenario first: a brand-new game where we haven't written any specific code for the rules. The system can handle this perfectly from day one.

In this mode, we use a Large Language Model (LLM), a very smart AI, as a **"Universal Referee."** It reads the `Schema` (the rulebook) and the `Context` (the notes) to understand the game, make sure players follow the rules, and move the game forward. The rules are "latent"—meaning they exist in the AI's vast knowledge and the rulebook we gave it, not in hard computer code. The system itself just manages who's playing and whose turn it is. The smart AI handles the rest, which makes it incredibly flexible.

### 2. The Crystal-Clear Rulebook (Explicit Ruleset)

For games where we already have a dedicated program that knows all the rules (like our poker engine), the system runs in a faster, more predictable mode. This program provides a Crystal-Clear Rulebook.

It does two main jobs:

- **Keeps Things Fair and Predictable:** The engine acts as a strict referee, checking every move to make sure it's 100% legal. This guarantees the game is fair and works the same way every time.

- **Gives Pro-Level Tips:** The engine is also smart enough to add helpful information to the `Context` part of the package. It might add statistics about how other players usually act or point out important patterns in the game. This "engineered context" helps our bots make much smarter, more strategic decisions.

In this mode, the game engine provides the official logic, making sure the system is both super reliable and super smart.

### 3. A New Way to Build: Play First, Code Later

This ability to go from fuzzy to clear rules gives us a totally new way to design things. Instead of writing a perfect rulebook for a new game from scratch, we'll use "The Reactor" to just *play* the game first with the fuzzy rules.

1.  **Play the Game:** We give the Reactor a package describing a new game, like Dominoes. The smart AI referee will start a practice game, figuring out the rules as it goes.
2.  **Watch and Learn:** As the AI plays, it creates a record of everything that happens—all the moves, its reasoning, and lots of different game situations.
3.  **Write the Rules:** We then use this rich record from the practice games to write a perfect, battle-tested rulebook and a complete set of tests for it.

This way, we get to explore and understand a game's tricky parts *before* we write a single line of official code. This makes building new game engines much faster and better.

## Smart Players with Long-Term Memory

A key feature of The Reactor is that the AI players inside it have memory. They aren't simple bots that just perform one action and forget everything. Because the system is built to be persistent, each player can remember all of its past games and interactions.

An AI player can remember what happened in earlier rounds, recall strategies that worked in completely different games, and learn how opponents tend to play over time. This memory is what makes them different. They aren't just reacting; they are learning and adapting. This allows for much more interesting and intelligent behavior than a simple request-and-response system could ever achieve.

## Why This Matters for Business

Changing our system in this way has some huge benefits:

- **Get Started Fast:** We can help new customers start using our AI bots for a new game or business process almost instantly. We can get things running with just a basic rulebook, long before we build a dedicated, complex engine.
- **A Simple Blueprint:** We can give other developers a clear template (the game `Schema`) so they can build their own game engines that plug right into our system. Our "play first, code later" method will help everyone create these blueprints faster and more accurately.
- **Rules as a Service:** If a client has a complex system they're struggling to define (like a customer rewards program), we can treat it like a "game." Our Reactor can play through it, helping them figure out the rules and automatically creating a perfect blueprint and set of tests. This is a valuable service that solves a big problem for many businesses.
- **Works Right Away:** Our system can start running bots for a new game the moment we get the rules, without any long wait for coding.

By making our system work with a universal set of rules, we're not just improving a product. We're building a foundation for a future where intelligent, independent AIs can learn to master any task, opening up endless new possibilities.

## Connecting to the Big Picture

This change does more than just make our gaming product better; it connects all of our projects together under one big idea. This work is a direct step toward our goal of building a network where ideas can be shared and worked on by everyone, as we described in the _Edict of Autonomy_.

**The First Test and Proof It Works**
This new Reactor system will be the very first real-world user of our **"Idea Triplet"** package. It's a critical test that proves this new way of thinking can create real value, making systems more flexible and intelligent.

**Beyond Games: A Model For Everything**
The system we're building isn't just for games. It's a powerful model for how AI can react to changes in any environment. If you think about it, almost anything can be seen as a turn-based game: a conversation, a business negotiation, or even managing a project.

The Reactor is just the first of many such tools. The same idea will power a whole toolbox of services that can work together, including:

- A **Resolver** service that adds more information to an `Idea` by looking things up in a database.
- A **Stats** service that analyzes an `Idea` and adds helpful historical data.
- A **Validation** service that checks an `Idea` to make sure it follows the rules.

By building a system that can master this back-and-forth interaction, we're creating a foundational technology—like a LEGO brick in a much larger set of tools. It can be used in countless future products, making this project a cornerstone of our company's future.