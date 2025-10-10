# 008: Agent/Imports

> **Import:** Imagine you're asking a friend for help with homework. Instead of giving them your entire backpack, you just hand them the specific textbook they need. An 'Import' is like that textbook—it's a specific piece of information from the bigger picture that you give to an AI so it can do its job.
>
> — [Glossary](./000_glossary.md)

The way we ask an AI to do something is called the [Call Protocol](./004_agent_call.md). It has two main settings: **Scope** (where the work happens) and **Method** (how the work is done). The **Imports Protocol** is all about how we manage the information (the context) for each type of request.

## Combining Where and How

There are four main ways to combine these settings:

1.  **Here and Now, with a Tool (`_activity`)**: This is like using a calculator. The AI figures out the numbers to punch in (`params`), and a simple, pre-written program does the math right away. You don't usually need to give it special information (`_imports`) for this.

2.  **Here and Now, AI Does It All (no `_activity`)**: The AI thinks up the plan *and* the final answer all by itself in one step. You can use `_imports` to give it a little hint or focus its attention. It's like asking a friend to draw a cat, but you first show them a picture of *your* cat so they get it right.

3.  **In a Separate Room, with a Tool (`_module` + `_activity`)**: The AI decides to call in a specialist tool that runs in its own separate space. The AI gives the tool instructions (`params`). If you use `_imports`, it's like also handing that specialist a specific folder of notes it needs to complete the job.

4.  **In a Separate Room, Another AI Does It All (`_module`, no `_activity`)**: The AI decides to ask *another* specialized AI to handle the task in its own separate space. It hands off the instructions (`params`). The `_imports` you provide become the *only* information this second AI has to work with. It's like hiring an expert and giving them a very precise briefing document, and nothing else.

## Focusing the AI's Vision

The `_imports` property is like putting blinders on a horse. It controls what the AI is allowed to see when it's working on a task. This helps it focus on only the important stuff.

-   **When working 'Here and Now' (Inline Scope)**: `_imports` help the AI concentrate on the right details.
-   **When working 'In a Separate Room' (Module Scope)**: `_imports` create the entire world for that task. The AI sees *only* what you import and nothing else.

## Giving vs. Asking for Information: Static vs. Dynamic Imports

When we build an AI tool, we can decide how it gets its information (`_imports`).

-   **Static Imports (Giving Information)**: This is like pre-packing a lunchbox for the AI. The person who designed the tool decides exactly what information it will always get. For example, a tool might be set up to *always* see the user's original request. The AI has no choice; it just gets what it's given.
    -   `_imports: { "const": ["user_request"] }`

-   **Dynamic Imports (Asking for Information)**: This is like giving the AI a menu of information it can ask for. The AI looks at the task and thinks, "Hmm, to do this job, I need to know about the 'session_memory'." It then requests access to that specific piece of information.
    -   `_imports: { "type": "array", "items": { "enum": ["session_memory"] } }`

This 'asking' pattern is super useful because a human can be in the middle to approve or deny the request, making sure the AI only sees what it's supposed to.

## The Power of a Limited View

Why is it so good to limit what an AI can see?

-   **Better Security & Focus**: By limiting its view, you prevent the AI from accidentally seeing private information. It also helps the AI concentrate, which makes it more accurate, faster, and cheaper to run.

-   **Makes Tools Like LEGO Bricks**: Imports let us build small, independent AI tools (`Ideas` and `Activities`) that you can reuse in many different situations. They don't need to know everything about the project; they just need the specific info you hand them to do their one job perfectly.