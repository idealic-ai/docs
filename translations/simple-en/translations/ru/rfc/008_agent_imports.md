# 008: Agent/Imports

> **Import:** Think of an "import" as a permission slip. It's a key that tells a piece of code exactly what information it's allowed to see from the main conversation. This can be used to help an AI focus (like putting on blinders) or to build the entire starting environment for a task that runs separately. It's controlled by a setting called `_imports`. — [Glossary](./000_glossary.md)

[Act 004: Agent/Call](./004_agent_call.md) explained the main controls for running a task (a `Call`): **Scope** (Where do you run it? Right here, or in a separate room?) and **Method** (How do you run it? By giving exact instructions, or by letting it figure out the details?). This document explains how to use these controls together with `_imports` to manage what the task can see and do.

## Combining Scope and Method

There are four main ways these settings can work together:

1.  **Embedded Explicit (`_activity`):** This is the classic way to use a tool. Imagine asking a calculator app on your phone to add 2+2. The AI provides the numbers (`params`), and a function on your device immediately calculates the answer. You don't usually need `_imports` here because the tool's job is simple and self-contained.

2.  **Embedded Sheathed (no `_activity`):** This is like asking a weather expert, "Based on this specific weather map, what will the temperature be and what should I wear?" The AI looks at the map (`_imports` focuses its attention only on the map) and gives you a complete answer (`params` and `_output`) all at once. Using `_imports` here prevents the AI from getting distracted by other information.

3.  **Modular Explicit (`_module` + `_activity`):** This is like hiring a specialist. You tell the AI to calculate your taxes. The AI figures out what numbers to use (`params`). Then, the system calls an accountant tool (`_activity` from a `_module`) into a new, clean room. If you use `_imports`, you are handing the accountant *only* the specific receipts and documents they are allowed to see. They work in isolation, without seeing anything else on your desk.

4.  **Modular Sheathed (`_module`, no `_activity`):** This is like delegating a whole project. The AI figures out the main goal (`params`). Then, the system starts up a brand new AI assistant in a separate office (`_module`). The starting information for this new assistant is built from its own built-in knowledge plus any specific documents you passed along using `_imports`. This new assistant only knows about the project it was assigned.

## Focusing the Field of View

The `_imports` property is the main tool for controlling what information a `Call` can access. It acts like a guest list, filtering everything in the main environment and only letting specific pieces of information through.

- **In Embedded Scope:** `_imports` are like blinders on a horse, helping the AI focus on what's straight ahead.
- **In Modular Scope:** `_imports` are like giving someone a map that *only* shows their destination. For that task, this map is their entire world.

## Giving vs. Asking for Information: Static and Dynamic Imports

The `_imports` setting in a Tool's design decides if the information is automatically **given** to the tool or if the tool has to **ask for** it.

- **Static Imports (Giving Information):** If the `_imports` property is set to a fixed value (like `_imports: { "const": ["input"] }`), the information is **given**. The person who built the tool has hard-coded exactly what it's allowed to see every single time it runs. It's like having a permanent key to a specific room.

> Sidenote:
> 
> ```mermaid
graph TD
    subgraph Parent Context
        direction LR
        input("input")
        state("state")
    end

    subgraph Tool Call
        direction LR
        filter{{"_imports: ['input']"}}
    end

    input --> filter
    state -.-> filter

    subgraph Provided Context
        direction LR
        input_prov("input")
    end

    filter --> HITL{{Human-in-the-Loop}}
    HITL --> input_prov
    input_prov --> Execute(Execute Tool)

    classDef unused stroke-dasharray: 5, 5, stroke:#aaa, color:#aaa
    class state unused
    classDef optional stroke-dasharray: 5, 5
    class HITL optional
```

- **Dynamic Imports (Asking for Information):** If the `_imports` property is a flexible list of options (like `_imports: { "type": "array", "items": { "enum": ["state"] } }`), the information is **asked for**. The AI decides which pieces of information it needs from an approved list to complete its task. This is like having a library card that lets you check out books from a specific section—you choose which books you need.

This "asking" pattern is very powerful when a human has to approve the request, adding an important layer of safety and control.

## The Power of a Limited View

- **Better Safety and Focus:** By limiting what the AI can see, imports prevent it from accidentally seeing sensitive data and help it concentrate. This leads to results that are more predictable, accurate, and cheaper to produce.
- **Smarter Building Blocks:** Imports allow tools and ideas to be like LEGO bricks—completely self-contained and reusable in many different situations.