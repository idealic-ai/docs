# 009: Agent/Module

> **Module**: Think of it like a special, reusable Lego brick (called an `Action` or an `Idea`) that you can use by making a `Call` to it in its own special "Module space." This is shown by the `_module` property.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [004: Agent/Call](./004_agent_call.md)
> - Builds on:
>   - [008: Agent/Imports](./008_agent_imports.md)

This paper explains the **Rules for Modules**. These rules let you run `Tools` in a separate, isolated bubble. It’s like asking another `Idea` for help or doing an `Action` in a brand new, clean room. This is the main way to build complex agent behaviors out of small, independent, and reusable building blocks.

## The Problem: Giant Tools and a Messy Desk

As agents get smarter and can do more things, keeping all their `Tools` in one big toy box starts to cause problems.

1.  **Instructions Get Too Complicated**: An AI has a limit to how many complex rules it can understand at one time. If you mix lots of complicated `Tools` together, the AI can get confused and won't know which one to pick.
2.  **Information Overload**: When all the `Tools` are in one place, the AI can get distracted by things it doesn't need. It’s like trying to do your math homework when your desk is covered in comic books and toys—it’s easy to make a mistake.
3.  **They Aren't Reusable**: A `Tool` built for one agent is hard to just give to another one. You'd have to bring along its entire environment—all the other "toys" that were in the box with it.

Module rules solve these problems by introducing a **Module Space**—a way to hand off a job (`Call`) to someone else, who will do it in their own separate, clean environment.

## The `_module` Property

A Module Space is turned on using a special tag called `_module` in a `Tool`'s rules. This tag tells the system, "Don't run this command here. Send it as a request to an outside module."

The `_module` property is a line of text.

- **`_module: 'idea://<idea-name>'`**: This text, which looks like a web address, points to a specific `Idea`. It tells the system to run the `Call` in that `Idea`'s environment.
- **`_module: 'anonymous'`**: This tag means "anonymous module." You use it when you need to create a temporary, clean bubble for an `Action` without having to create a whole new `Idea` for it.

## Working in a "Clean Room"

A module gives you a "clean room" to work in. Instead of doing a job in the main agent's noisy and cluttered workshop, the `Call` is sent to a new, isolated "room" (a sub-request). There's nothing extra in this room—its environment is built from scratch, not copied from the parent.

This is where the **[Rules for Imports](./008_agent_imports.md)** become super important. The `_imports` property in a `Tool`'s rules acts like a bridge. It clearly lists exactly which things from the parent agent's workshop need to be "imported" into the module's clean room. This gives the main agent full control over what the module sees, preventing information overload and creating truly independent parts.

## Building and Reusing: The Composer and the Sound Designer

Modules let you build very powerful systems where some `Ideas` act like their own little services that other agents can use.

Imagine an agent who is a `Composer` and another who is a `Sound Designer`.

- The **`Sound Designer`** is a standalone `Idea` (`idea://sound-designer`). Its "brain" contains detailed instructions on how to work a synthesizer. It has its own rules (`input`) for how to create sounds. It's an independent expert that can be used over and over again.
- The **`Composer`**'s job is to write a song. One of its `Tools` is called `createMelody`. This `Tool` doesn't know anything about how to make sound. Instead, it gives the job to the expert by saying `_module: 'idea://sound-designer'`.

When the `Composer` decides to use the `createMelody` tool, it creates a `Call`. When that `Call` is run, here's what happens:

1.  A new, separate sub-request is created (that "clean room").
2.  The `Sound Designer` `Idea` is loaded into the room, along with all its synthesizer instructions.
3.  Using `_imports`, a "song description" from the `Composer` is passed into the `Sound Designer`'s room.
4.  The `Sound Designer` AI now sees both its expert instructions and the specific creative task from the `Composer`.
5.  It creates the melody, which is returned as the result of the `createMelody` tool.

The `Composer` never needs to learn how a synthesizer works, and the `Sound Designer` never needs to know the `Composer` even exists. They are independent modules that team up at runtime to achieve a complex goal.

## Handling Big Instructions

Module rules also solve the problem of `Tools` that have a very large or complicated result. Instead of including a giant description of the result (`_output`) in the main request (which could get in the way of other tools), the `Tool` can be described just by what it needs to start (`input`) and the `_module` tag.

The AI can plan a `Call` just by knowing the inputs. The complex result will then be created inside the module's isolated "room." This allows the agent to plan a sequence of complex actions without trying to "see" all the tiny details of every step in one big window. The AI just trusts that the module will do its job correctly and return the result it needs for the next steps.