# 008: Agent/Imports

> **Import:** Imagine you're doing a craft project with a giant box of supplies. An "Import" is like a shopping list that tells you *exactly* which glitter, glue, and paper to grab from the box for the specific step you're on. It helps the computer program (the AI) focus on only the information it needs for a particular job.

[The document about Calls](./004_agent_call.md) explained that you can ask an AI to do a job in two main ways: **where** it does the job (right here, or in a separate space) and **how** it does the job (by using a simple tool, or by figuring it out itself). This document explains how we use "Imports" to give the AI the right information for each of those situations.

## Combining Where and How the AI Works

Let's imagine the AI is a chef working in a big kitchen.

1.  **Work Here, Use a Tool (`_activity`)**: This is like the chef using a blender at their main cooking station. You give the chef the ingredients (`params`), and a machine (`_activity`) does the work right away. You usually don't need a special shopping list (`_import`) here because the blender only does one thing: blend.

2.  **Work Here, Think it Through (no `_activity`)**: The chef is at their main station. You ask for a fruit smoothie (`_output`) and also hand them a special list (`_imports`) of fruits they are allowed to use. This list helps the chef focus only on the fruit, so they don't get distracted by all the vegetables and spices in the kitchen. The chef comes up with the recipe (`params`) and makes the smoothie (`_output`) all at once.

3.  **Work in a Separate Room, Use a Tool (`_module` + `_activity`)**: You tell the chef to go to the special baking room (`_module`) and use the oven (`_activity`). An "Import" list (`_imports`) tells the chef *exactly* which ingredients (like flour and sugar) they are allowed to take with them into that room.

4.  **Work in a Separate Room, Think it Through (`_module`, no `_activity`)**: You tell the chef to go to the baking room (`_module`). The "Import" list (`_imports`) provides the *only* ingredients they can use. Once inside, you just tell them to "make a cake." The chef has to figure out how to make a cake using only the ingredients you allowed them to bring.

## Focusing What the AI Can See

The `_imports` list is like putting blinders on a horse. It's the main way to control what information the AI can see when it's working.

-   **When working "Here"**: The blinders (`_imports`) help the AI focus on the task at hand and not get distracted by other things happening in the kitchen.
-   **When working in a "Separate Room"**: The blinders (`_imports`) are like the walls of the room itself. If it's not on the list of ingredients carried into the room, then for the AI, it doesn't exist.

## Giving vs. Asking for Information

So, how do we decide what's on the import list? There are two ways, which are decided when a tool for the AI is first created.

-   **Static Imports (Giving Information)**: This is when the person who made the tool decides ahead of time exactly what information it's allowed to see. The list can't be changed. For example, a calculator tool might be permanently set to only import numbers, and nothing else.

> Sidenote:
> 
> This chart shows that out of all the information available in the kitchen (like `input` and `state`), the import list (`_imports: ['input']`) acts like a guard that only allows the `input` to pass through. Sometimes, a human might need to check and approve it first. The other information, `state`, is ignored and left behind.
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

-   **Dynamic Imports (Asking for Information)**: This is when the AI can *ask* for the information it thinks it needs from a pre-approved list. For example, the AI might be allowed to ask for the current `time` or the `weather`. For each task, it decides which one it needs and asks for it.

This "asking" method is really useful because a human can be set up to approve the AI's request before it gets the information. This makes everything much safer and gives us more control.

## Why Limiting Information is a Superpower

-   **Better Safety & Focus**: By giving the AI blinders, we stop it from accidentally seeing private information. It also helps the AI concentrate, which means it makes fewer mistakes, finishes its job faster, and costs less money to run.
-   **Makes Things Reusable (like LEGOs)**: Imports let us build small, specialized AI tools that can be used over and over in different projects. Because a tool only gets the specific information it needs (like a garlic press only needs garlic), you can plug it into any project without worrying that it will break something else.