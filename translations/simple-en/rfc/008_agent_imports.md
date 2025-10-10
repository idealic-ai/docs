# 008: Agent/Imports

> **Import:** Imagine you're about to start a project, like building a LEGO set. An 'Import' is like someone handing you only the specific bags of LEGOs you need for the current step, instead of dumping the whole box on the table. This helps you focus. This list of what you get is controlled by a property called `_imports`. — [Glossary](./000_glossary.md)

In another guide, [004: Agent/Call](./004_agent_call.md), we talked about the main ways an AI can do a task. It can either work on it right here and now (**Inline**) or go to a special, separate 'room' to work (**Module**). It can also either do the work itself (**Latent**) or just give instructions to a different tool (**Explicit**). 

This guide explains how we make sure the AI gets the right information (or 'context') for each of those situations using **Imports**.

## Combining the Different Ways of Working

There are four main combinations:

1.  **Work Here, Use a Tool (Inline Explicit)**: This is the classic way of using a tool. You ask the AI to do something, it figures out which tool to use, and tells the tool what to do. For example, you ask, "What's 5+5?" The AI grabs a calculator tool and tells it to calculate "5+5". We usually don't need Imports here because the job is so direct.

2.  **Work Here, All by Itself (Inline Latent)**: The AI does the whole task in one go. Imagine you ask it to write a short story based on a picture you give it. You can use `_imports` to tell it, "Only look at this picture and nothing else." This acts like blinders on a horse, helping the AI focus and not get distracted by other information.

3.  **Go to a Separate Room, Use a Tool (Modular Explicit)**: The AI decides it needs a specialized tool that lives in a separate 'room'. It prepares the information, then sends it to that room for the tool to work on. If we use `_imports`, we can choose to send *only* the necessary information into that room, keeping everything else private.

4.  **Go to a Separate Room, Think by Itself (Modular Latent)**: The AI decides it needs a quiet space to think. The system creates a new, clean 'room' for it and uses an `Idea` as its guide. The only information the AI has in this new room is what was already there plus any specific items we give it using `_imports`. It's like sending the AI to a library with just one book for inspiration.

## Focusing the AI's View

The `_imports` property is the main way we control what information the AI sees. It's like giving the AI a special pair of glasses that only lets it see certain things.

-   **When working right here (Inline Scope)**: `_imports` help the AI focus its attention.
-   **When working in a separate room (Module Scope)**: `_imports` decide the *entire set of information* that is allowed into that room.

## Who Decides What Information to Use?

The way `_imports` is set up inside a tool determines if the information is given automatically or if the AI has to ask for it.

-   **Static Imports (Pre-Packed Lunchbox)**: If `_imports` is set to a fixed value (like `_imports: { "const": ["input"] }`), the tool designer has already decided exactly what information the tool gets every single time. The AI can't ask for more. It's like getting a pre-packed lunchbox—you get what's inside, and that's it.

> Sidenote:
>
> This diagram shows that even though lots of information might be available (like 'input' and 'state'), the tool has a filter (`_imports`) that only allows 'input' to pass through. Sometimes a human might check this before the tool runs.
>
> ```mermaid
> graph TD
>     subgraph Parent Context
>         direction LR
>         input("input")
>         state("state")
>     end
>
>     subgraph Tool Call
>         direction LR
>         filter{{"_imports: ['input']"}}
>     end
>
>     input --> filter
>     state -.-> filter
>
>     subgraph Provisioned Context
>         direction LR
>         input_prov("input")
>     end
>
>     filter --> HITL{{Human approval}}
>     HITL --> input_prov
>     input_prov --> Execute(Execute Tool)
>
>     classDef unused stroke-dasharray: 5, 5, stroke:#aaa, color:#aaa
>     class state unused
>     classDef optional stroke-dasharray: 5, 5
>     class HITL optional
> ```

-   **Dynamic Imports (Ordering from a Menu)**: If `_imports` is set up with flexible options (like `_imports: { "type": "array", "items": { "enum": ["state"] } }`), the AI gets to choose what it needs from a pre-approved list. The tool designer creates the menu, and the AI decides what to order for the task. This is great because a human can look at the AI's order and approve it before the information is handed over, adding a layer of safety.

## Why Limiting the AI's View is a Good Thing

-   **Safer and Smarter**: By only giving the AI what it needs, you prevent it from seeing private information by accident. It also helps it think more clearly because it isn't distracted by useless data. This makes it more accurate, faster, and cheaper to run.
-   **Better Building Blocks**: Imports allow us to create tools that work like LEGO bricks. They are self-contained and don't need to know about the whole project. You can use them anywhere you need them, sure that they will do their one job well without causing problems.