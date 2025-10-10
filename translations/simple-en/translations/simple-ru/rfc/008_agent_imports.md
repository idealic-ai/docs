# 008: Agent/Imports

> **Import:** Think of it like a bookmark in a giant library book. It points to the specific information from the main environment that an AI needs to get a job done. An import helps the AI focus on what's important or gives it a clean, fresh workspace. This is all handled by the `_imports` setting. — [Glossary](./000_glossary.md)

In the document [004: Agent/Call](./004_agent_call.md), we talked about the different ways to run a task. You can do it **right here (Inline)** or in a **separate room (Module)**. You can also give it **exact instructions (Explicit)** or **let the AI figure it out on its own (Latent)**. The Imports Protocol explains how you can mix these styles and control what information the AI gets for each one.

## Combining Scope and Method

Imagine the AI is your personal assistant. Here are four ways you can give it a task:

1.  **Right here, with exact instructions (`_activity`)**: This is like handing your assistant a calculator and saying, "Add 2 and 3." It immediately does the simple action (`_activity`) with the information you gave it (`params`). You usually don't need imports here because everything is already simple and clear.

2.  **Right here, but let the AI figure it out (no `_activity`)**: You tell your assistant, "Here's a piece of paper with a problem on it. Solve it and write down the answer." The AI thinks for a moment and immediately writes down the final result (`_output`). By using `_imports`, you can make sure it *only* looks at that one piece of paper, so it doesn't get distracted by other things on the desk.

3.  **In a separate module, with exact instructions (`_module` + `_activity`)**: You send your assistant to another room (`_module`) with a specific instruction (`_activity`). If you use `_imports`, you are only giving them the exact documents they need for that one instruction. This way, they're working in a clean, quiet space without any clutter.

4.  **In a separate module, and let the AI figure it out (`_module`, no `_activity`)**: You send your expert assistant to another room with a general goal (`_module`). You pass them the information they need to get started using `_imports`. They use that information and what they already know to complete the task by themselves in their own "clean room."

## Narrowing the Field of View

The `_imports` setting is your main tool for controlling what information the AI can see. It's like an "approved list" for data that filters out everything else. It creates a focused, limited view for the AI, as if it's looking through a spyglass.

- **When a task runs right here (Inline)**: `_imports` help the AI concentrate on what's important.
- **When a task runs in a separate module (Module)**: `_imports` define *all* the information that will be available in its isolated workspace.

## Giving vs. Asking for Information: Static and Dynamic Imports

The way you write the `_imports` rule in a Tool's instructions determines whether it gets information automatically or has to ask for it.

- **Static Imports (Information is Given)**: If a tool's rules strictly say what it's allowed to see (for example, `_imports: { "const": ["input"] }`), then the information is **given** to it automatically. The creator of the tool decided ahead of time exactly which "documents" it gets to see. It can't ask for anything else.

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

    subgraph Provisioned Context
        direction LR
        input_prov("input")
    end

    filter --> HITL{{Human approval}}
    HITL --> input_prov
    input_prov --> Execute(Execute Tool)

    classDef unused stroke-dasharray: 5, 5, stroke:#aaa, color:#aaa
    class state unused
    classDef optional stroke-dasharray: 5, 5
    class HITL optional
```

- **Dynamic Imports (Information is Requested)**: If the rules just provide a list of what the tool *can* ask for (for example, `_imports: { "type": "array", "items": { "enum": ["state"] } }`), then the information is **requested**. The AI decides what it needs from the approved list to do its job and then sends a request for it.

This method is especially useful when a person can approve or deny the request. It adds an extra layer of control and safety.

## The Power of a Limited View

- **Safety and Focus**: By limiting what the AI can see, imports protect private data from being seen by accident and help the AI concentrate better. This makes its work more predictable, accurate, and cheaper.
- **Neat and Tidy**: Imports let you build independent, reusable tools (modules). Each module works in its own "clean room" and doesn't interfere with others.