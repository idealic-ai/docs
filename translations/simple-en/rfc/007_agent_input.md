# 007: How an Idea Listens for Instructions

> **Input Message:** Think of this as an instruction card for an `Idea`. It contains a blueprint (`schema`) for what information it needs and the actual information (`input`) to use. Giving an `Idea` this card turns it into an `Ideator`, which is an `Idea` that can actually do a job. — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Depends on: [101: About Ideas](./101_concept_idea.md)
> - Makes Possible: [103: About Ideators](./103_concept_ideator.md)

This document explains the **Input Protocol**, which is a special way to tell an `Idea` what kind of information it needs to get to work. When you add this special instruction message to an `Idea`, it changes from being just a piece of stored information into something that can perform a task, almost like a mini-program. We call this active version an **Ideator**.

## The `Input` Message

The `Input` message is a special instruction card that officially states what information an `Idea` needs to work. It's like writing down both the ingredients list and the actual ingredients you used to bake a cake. This helps create a complete record of how a final `solution` was made, so anyone can see exactly what went into it and repeat the process.

An `Input` message has two important parts:

1.  **`schema`**: This is like a blueprint or a recipe's ingredient list. It describes the structure of the information the `Idea` needs. For example, it might say, "I need a person's name, which must be text, and their age, which must be a number."
2.  **`input`**: This is the actual information you provide that follows the blueprint's rules. For example, `input` would be: "The name is 'Sarah' and the age is 12."

By describing its needs so clearly, an `Idea` can explain not only what it creates (its `solution`) but also what it needs to create it.

### Making Ideas Easy to Use

A big benefit of this system is that it allows computers to automatically create a user interface (like a web form) for any `Idea`. Because the `schema` acts like a perfect instruction manual, a program can read it and instantly build a form with all the right text boxes, number fields, and buttons. This means anyone can start using an `Idea` right away, without needing to know how to code.

## From a Thought to a Worker Bee

As we learned in [About Ideas](./101_concept_idea.md), adding an `Input` message to an `Idea` is what officially turns it into an **Ideator**—an `Idea` that does work. It stops being just a thought and becomes a repeatable function, like a calculator that knows how to add numbers whenever you give it some.

## Working with Many Things at Once

The `Input` message works perfectly with the [Instancing Protocol](./011_agent_instancing.md), which lets you run the same task on a whole batch of items at once. Think of it like baking a tray of cookies; you can give instructions to all of them at once or decorate each one differently.

It can work in two ways:

1.  **Shared Instructions (Global Input)**: Imagine you're baking cookies and you set the oven temperature for the whole batch. That's a global input. You provide one `Input` message, and its information is automatically shared with every single item (or "instance") you're working on. This is great for settings or instructions that apply to everything, like a general theme.

2.  **Individual Instructions (Instance-Specific Input)**: Now imagine you want to decorate each cookie differently. One gets red sprinkles, another gets chocolate chips. By adding a special tag (`_instance`) to an `Input` message, you can tell it to get its information directly from one specific cookie. This lets you customize the task for each individual item in the batch.

This system gives you a lot of flexibility. You can set up a main task with shared instructions and then add specific, custom details for each item it works on.

## The Flip: Turning an Ideator into a Tool

An `Ideator` is a complete package focused on what it *creates* (the `solution`). But to use it as a simple command in a bigger program, we need to flip it around so it focuses on what it *needs* (the `input`). We call this flip an **inversion**, and it turns the `Ideator` into a **Tool**.

An `Idea` is all about its result:
`{ instructions, blueprint_of_result, the_actual_result }`

To turn it into a `Tool`, we look at its instruction card (the `Input` message). The main step is to take the blueprint for the *inputs* and make that the main description of the `Tool`. For example, instead of thinking about the cake (`solution`), we focus on the part that says "needs flour and eggs" (`input`).

This creates a `Tool` that works like a command you can call, ready to be used as one step in a much bigger plan. (You can learn more about this in [002: Agent/Tool](./002_agent_tool.md)).