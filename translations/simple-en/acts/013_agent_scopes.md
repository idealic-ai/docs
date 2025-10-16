# 013: Agent/Scopes

> [!DEFINITION] [Scopes](./000_glossary.md)
> Think of scopes as putting blinders on a horse. They let a task see only a specific, approved part of the bigger picture (called the parent environment). The `_scopes` property is like a list of things the task is allowed to look at.

> Sidenote:
> - Requires:
>   - [002: Agent/Tool](./002_agent_tool.md)
>   - [004: Agent/Call](./004_agent_call.md)

The **Scopes Protocol** is a really important rule for managing what information a `Call` (a single task for the AI) can see. In a big system, a `Call` doesn't just work by itself; it often needs to know things from the main program, like what the user typed or what happened in previous steps. Scopes are a safe and clear way to control what information gets passed along.

By limiting what the AI sees, scopes make the system more secure, prevent it from accidentally sharing private data, and help the AI focus. This makes it more reliable and cheaper to run. This controlled view is also what lets us build different parts of the system, like `Ideas` and `Activities`, as separate, reusable pieces.

## Giving vs. Asking for Information

Depending on how we set up the `_scopes` property, we can either **give** the AI a fixed set of information from the start or let it **ask for** what it needs when it's running.

> Sidenote:
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
>         filter{{"_scopes: ['input']"}}
>     end
>
>     input --> filter
>     state -.-> filter
>
>     subgraph Provisioned Context
>         Execute(Execute Tool)
>     end
>
>     filter --> HITL{{Human approval}}
>     HITL --> Execute
>
>     classDef unused stroke-dasharray: 5, 5, stroke:#aaa, color:#aaa
>     class state unused
>     classDef optional stroke-dasharray: 5, 5
>     class HITL optional
> ```

- **Static Scopes (Giving Information)**: We can set up `_scopes` with a fixed value. This is like pre-packing a lunch box for the AI. The person who designed the tool has already decided exactly what information it's allowed to see, and it can't be changed.

  ```json
  {
    "_scopes": {
      "const": ["input"]
    }
  }
  ```

- **Dynamic Scopes (Asking for Information)**: We can also set up `_scopes` to be more flexible. This is like giving the AI a menu of approved options to choose from. The AI can then decide which pieces of information it needs to complete its task.

  ```json
  {
    "_scopes": {
      "type": "array",
      "items": {
        "enum": ["state", "input"]
      }
    }
  }
  ```

  This is especially useful when a person can approve the AI's request, adding an extra layer of safety and control.

## How Scopes Fit with Other Features

The `_scopes` property is the main control for the information a `Call` can access. It's like a bouncer at a club, only letting in the data on the guest list. This helps different features of the system work together smoothly.

- **Standard AI Thinking (`Latent Execution`)**: In the normal mode, `_scopes` act as a helpful hint for the AI. It tells the AI, "Hey, you should probably pay attention to this information." It’s not a strict rule, but it helps the AI focus on what's important, reducing mistakes and saving money.

  > Sidenote:
  > - [002: Agent/Tool](./002_agent_tool.md).

- **Running Pre-Written Code (`_activity`)**: When a `Call` runs a specific piece of code called an `Activity`, scopes become more serious. The information allowed by the scopes is handed over directly to the code. This makes sure the code has everything it needs to run, even if the AI didn't use that information to decide which code to run.

  > Sidenote:
  > - [003: Agent/Activity](./003_agent_activity.md).

- **Working on a Batch of Items (`_instance`)**: Imagine you have a hundred photos to edit. The system can work on them all at once. Scopes make sure that when the AI is working on photo #5, it only sees the information related to photo #5. It prevents information from one task from spilling over into another.

  > Sidenote:
  > - [011: Agent/Instancing](./011_agent_instancing.md)

- **Using Separate Tools (`_module`)**: When a `Call` uses another tool (a `Module`), scopes act as a strict gatekeeper. They define the *only* information the module is allowed to see. It's like giving the module its own clean workspace with only the necessary supplies. Nothing from the main environment gets in unless it was explicitly allowed by the scopes.

  > Sidenote:
  > - [012: Agent/Delegate](./012_agent_delegate.md)

The `_scopes` property is the bridge that lets a `Call` get the information it needs. When it's used to provide the *entire* world view for a separate tool, it powers a cool feature called the **Delegate Protocol**. The next document, [012: Agent/Delegate](./012_agent_delegate.md), explains how that works.
