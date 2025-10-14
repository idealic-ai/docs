# A List of Words and What They Mean

This document explains the important words you'll see used in the Idea Protocol.

- **Idea**: Think of an Idea as a smart, digital recipe card. It has three parts: the `schema` (the list of ingredients), the `solution` (the cooking instructions), and the `context` (notes on what you've done so far). It’s a complete package of knowledge that sticks around, not just a quick question you ask and forget.



- **Ideator**: This is like a magical recipe that can actually do things. You give it an ingredient (the `input`), and it gives you back a finished dish (the `output`). It's an **Idea** that's built to transform something into something else.



- **Idea Transformer**: This is a special kind of **Ideator** that works on other **Ideas**. Instead of taking a simple ingredient, it takes an entire recipe card and improves it or turns it into a completely new one. For example, it could turn a cookie recipe into a brownie recipe.



- **Input Message**: This is like the order you give to a machine. It clearly lists what you're providing (`input` data) and the rules for it (`schema`). This makes it easy to use the same kind of order over and over again, just like ordering the same thing from a menu.



- **Tool**: Imagine you're giving the AI a catalog of special abilities it can use, like "look up the weather" or "send an email." A **Tool** is a description of one of these abilities. The AI doesn't use the tool itself, but it can decide *to* use it by filling out an order form for it.



- **Activity**: This is the actual code that does the work for a **Tool**. If the AI decides to "look up the weather," the **Activity** is the programming that connects to the weather service and gets the information. It’s what happens behind the scenes to make a tool work in the real world.



- **Call**: A **Call** is the filled-out order form for a **Tool**. The AI looks at the catalog of **Tools** and then creates a **Call** saying, "I want to use the 'look up weather' tool for 'New York City' right now." It’s the specific command to do something.



- **Scope**: This is where the **Call** gets handled.
  - **Inline Scope**: The order is handled right here, in the current workspace.
  - **Module Scope**: The order is sent off to a specialist in another room to handle it there.


- **Method**: This is *how* the **Call** gets done.
  - **Explicit Execution**: The order is completed by a real program (an **Activity**) that follows specific, predictable steps.



  - **Latent Execution**: The order is completed by the AI using its own vast knowledge and creativity, like asking it to write a poem. It *imagines* the result.



- **Module**: Think of this as a 