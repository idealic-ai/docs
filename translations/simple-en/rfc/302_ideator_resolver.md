# 302: The Idea Resolver

## 1. Introduction

This document explains a very important helper system called the **Resolver**. Think of it as a smart assembler that connects and combines different `Ideas`.

The Resolver works with its partner, [System: Storage](./301_ideator_storage.md), which is like a library where all the `Ideas` are kept. The Resolver's job is to take a simple `Idea` that has links to other `Ideas` and turn it into one big, complete `Idea` that has everything it needs to work.

Imagine you're building a LEGO set. Instead of giving you every single brick in one giant bag, the instructions just say "use the spaceship wing part" and "use the cockpit part." The Resolver is the one who goes to the big LEGO bin (the Storage), finds those specific parts, and brings them to you so you can build your spaceship.

This lets us create `Ideas` like LEGO bricks—small, reusable pieces that we can snap together to build something much bigger and more complex. It saves us from having to copy and paste the same information over and over again.

## 2. What it Does: Combining Ideas

The Resolver is a tool that doesn’t keep any memory of what it did before. It has one job: to take an `Idea` and make it more complete by grabbing all the other `Ideas` it needs.

Here’s how it works:

- **What you give it (Input)**: An `Idea` that has shortcuts or links to other `Ideas` inside it.
- **What it does (Process)**: The Resolver reads your `Idea` and spots all the links. For each link, it goes to the `Storage` library, finds the `Idea` the link is pointing to, and grabs its contents. Then, it cleverly inserts those contents back into your original `Idea`.
- **What you get back (Output)**: A new, 'filled-up' `Idea` where all the links have been replaced with the actual content they pointed to. Now it's a single, complete package, ready to be used for whatever comes next.

## 3. How It's Special

### 3.1. How to Write the Links

To tell the Resolver what to find, you have to write the links in a special way, like a web address. This address needs to be super clear so the Resolver knows exactly what to look for. It should include the `Idea`'s name and, if you want, a specific version.

_Example: A plan that combines multiple `Ideas`._

```json
{
  "type": "object",
  "allOf": [
    { "$ref": "idea://my-org/article-template?version=1.2.0" },
    { "$ref": "idea://my-org/system-prompts/chain-of-thought?branch=latest" }
  ]
}
```

This code is like a blueprint that says, "To make this new thing, you need to combine two other things: version `1.2.0` of the 'article-template' and the very latest version of the 'chain-of-thought' prompt."

### 3.2. Digging Deep for Clues

The Resolver doesn't just check the first level of links. It keeps digging deeper. Think of it like a set of Russian nesting dolls.

If you give the Resolver an `Idea`, it opens it up. If it finds a link to another `Idea` inside, it goes and gets that one. But what if *that* `Idea` also has a link inside it? No problem! The Resolver will open that one too, and keep going until it has found and opened every single doll in the chain. This ensures you get a final `Idea` with absolutely no missing pieces.