# 007: Agent/Input

> **Input Message:** Imagine a special note that tells an `Idea` what ingredients it needs. When an `Idea` gets this note, it transforms from just a thing into a recipe that can make things, which we call an `Ideator`.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - You'll need to know about: [The Idea Protocol](./101_concept_idea.md)
> - This helps create: [Protocol: Ideators](./103_concept_ideator.md)

This document explains the **Input Protocol**. Think of it as a system for creating a clear recipe for any `Idea`. This system uses a special type of message that can turn a simple `Idea` (like a finished painting) into an `Ideator` (like a paint-by-numbers kit you can use to create the painting yourself).

## The `Input` Message Type

The `Input` message is a special note you add to an `Idea` to officially list the ingredients it needs. It’s what helps us see the full story of how something was made by showing what went into it.

An `Input` message has two important parts:

1.  **`schema`**: This is like the list of ingredients and rules for a recipe. It tells you exactly what you need, like "one cup of sugar" or "a name that's a word, not a number." It sets the structure.
2.  **`input`**: These are the actual ingredients you used for one specific creation. For example, if the `schema` asks for a name, the `input` might be "Sparky."

By describing its needs this way, an `Idea` can explain not only what it creates, but also what it needed to create it.

### A Gateway to Usability

A really cool thing about this is that it lets computers automatically create a user-friendly form for any `Idea`. Because the `schema` is like a perfect ingredient list, a program can read it and instantly build a webpage with the right text boxes, buttons, and menus. This means anyone can start using an `Idea` right away through a simple interface, without needing to be a tech expert.

## From Idea to Ideator

As we learned in the [Idea Protocol](./101_concept_idea.md), when an `Idea`'s instruction manual (its context) contains an `Input` message, it's a clear sign that it has leveled up. It's no longer just an `Idea`—it’s now an **Ideator**, which is an `Idea` that can do work. It becomes a repeatable recipe.

## Interaction with the Instancing Protocol

The `Input` message works perfectly with the [Instancing Protocol](./011_agent_instancing.md), which is all about doing something many times at once. Think of it like a cookie factory. You can use your recipe in two ways:

1.  **Global Input**: This is like a rule for *every single cookie* you're making. For example, you might set a rule that says, "All cookies must be baked at 350 degrees." This shared instruction applies to every cookie without having to repeat it.

2.  **Instance-Specific Input**: This is a special instruction for just *one* specific cookie. For example, you could say, "Add chocolate chips to cookie #5" or "Put sprinkles on cookie #12." This lets you customize individual cookies while still using the same main recipe for all of them.

This two-part system is super flexible. It lets you set a main recipe for a whole batch of tasks but also add a unique twist to each one.

## The Inversion: From Ideator to Tool

An `Ideator` is a complete recipe that can work on its own. But to let an AI assistant use it like a command, we have to turn it into a **Tool**. This process is like turning the recipe inside-out, which we call an **inversion**.

An `Idea` is made of three parts: the ingredients, the rules, and the final product.
`{ context, schema, solution }`
Which is like: `{ how-it-was-made, what-it-should-look-like, the-finished-cake }`

To turn it into a `Tool` (like a "Bake Cake" button on a robot's dashboard), we look at the recipe's ingredient list (`Input` message) and make that the most important part. The `Tool` doesn't care as much about the finished cake; it cares about what ingredients it needs to ask for to start baking.

This creates a `Tool` that the AI assistant understands. It's like creating a simple order form from a complicated recipe, so the assistant can easily ask for a cake to be made.