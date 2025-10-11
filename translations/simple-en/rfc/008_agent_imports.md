# 008: Agent/Imports

> **Imports:** Think of these as a special guest list for a task. They decide what information from the main program is allowed to “enter” and be used. The `_imports` property acts as this guest list, making sure a task only sees the exact data it needs, which keeps things safe and focused. — [Glossary](./000_glossary.md)

> Sidenote:
> - Requires:
>   - [002: Agent/Tool](./002_agent_tool.md)
>   - [004: Agent/Call](./004_agent_call.md)

The **Imports Protocol** is the rulebook for how a task gets the information it needs to do its job. A task rarely works all by itself; it usually needs to know what’s going on in the main program, like what a user just typed or what happened in the previous step. The Imports Protocol is the secure gatekeeper that controls this flow of information.

By being strict about what information a task can see, imports make the whole system safer (so information doesn’t accidentally leak out) and help the AI focus on what’s important. This makes the AI more reliable and cheaper to run. This control is also what allows us to build programs like LEGOs, where each piece can work on its own without messing up the others. Let's explore how it works.

## Giving vs. Asking for Information

There are two main ways to handle imports: you can either decide ahead of time what information to **give** a task, or you can let the task **ask for** what it needs when it's running.

> Sidenote:
> > Sidenote: This diagram shows how imports act as a filter. The main program has two pieces of information: `input` and `state`. The tool's `_imports` list only allows `input` to pass through. The `state` is blocked. A person can optionally check and approve the task before it runs.
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

- **Static Imports (Giving Information)**: This is like giving a task a pre-printed ticket. The programmer decides ahead of time exactly what information the task is allowed to see. It’s written in stone and can’t be changed.

  ```json
  {
    "_imports": {
      "const": ["input"]
    }
  }
  ```

- **Dynamic Imports (Asking for Information)**: This is like giving the AI a checklist of available information. The AI looks at the job it needs to do and ticks the boxes for the information it needs to complete the task.

  ```json
  {
    "_imports": {
      "type": "array",
      "items": {
        "enum": ["state", "input"]
      }
    }
  }
  ```

  This is especially powerful when a person is there to approve the request, adding an extra layer of safety and control.

## How Imports Work with Other Abilities

The `_imports` property is the main remote control for what a task sees. It's smart and changes how it works depending on the situation, allowing us to mix and match different agent abilities like we're building with LEGOs.

- **Normal Execution**: In a normal situation, `_imports` act like a helpful hint for the AI. It’s like you're underlining the most important sentences in a book before giving it to a friend. You’re not hiding the other words, but you’re guiding their attention to what matters most. This helps the AI work better and more cheaply, without getting distracted by useless information.

  > Sidenote:
  > > Sidenote: For more on how the AI reasons about what tool to use, see [002: Agent/Tool](./002_agent_tool.md).

- **Using an `_activity`**: When a task is handled by a specific, pre-written function (an `Activity`), imports get much stricter. All the information on the guest list is bundled up and handed directly to that function. The `Activity` gets the whole package, ensuring it has everything it needs to do its job perfectly.

  > Sidenote:
  > > Sidenote: An `Activity` is a piece of code that runs exactly the same way every time. You can learn more in [003: Agent/Activity](./003_agent_activity.md).

- **Using `_instance` for Batches**: Imagine you're grading 30 different tests at once. Imports make sure that when the AI is working on test #5, it *only* sees the information for test #5. This prevents information from “leaking” between jobs, so you don't accidentally write a comment for test #5 on test #6.

  > Sidenote:
  > > Sidenote: To learn more about how this works for batches of data, see [011: Agent/Instancing](./011_agent_instancing.md).

- **Using a `_module` for Isolation**: When a task is sent to a separate, self-contained `Module`, imports act as the ultimate security guard. They create a totally isolated “clean room” for the task. The *only* information allowed inside this room is what's on the import list. Nothing else from the main program can get in. This makes modules truly independent and reusable, like a perfectly sealed part in a machine.

  > Sidenote:
  > > Sidenote: Modules are one of the most powerful concepts. We'll dive deep into them in [009: Agent/Module](./009_agent_module.md).
  >

The `_imports` property is the bridge that connects a task to the information it needs. As we just saw with modules, when this bridge is used to create a completely isolated clean room, it unlocks a very powerful way of building agents called the **Module Protocol**. The next document, [009: Agent/Module](./009_agent_module.md), explains this in more detail.
