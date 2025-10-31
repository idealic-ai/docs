# 003: Agent/Activity

> [!DEFINITION] [Activity](./000_glossary.md)
> An Activity is the real code that does the work for a :term[Tool]{canonical="Tool"}. Think of it as a special function that can run in the background to do things the AI can't do just by thinking, like checking a live weather website or looking something up in a database.

> Sidenote:
> - You should read about :term[002: Agent/Tool]{href="./002_agent_tool.md"} first.

The **Activity Protocol** is the set of rules for how :term[Tool]{canonical="Tool"}s get their power from real, runnable code. If a :term[Tool]{canonical="Tool"} is like a button on a controller that says "Jump," the :term[Activity]{canonical="Activity"} is the actual code that makes the character jump.

## The Dual Registry Architecture

The system uses two separate lists to keep things organized. This is key to how it all works.

- **:term[Tool Registry]{canonical="Tool"}**: A list of all the tool descriptions (the "what"). It's like a restaurant menu that shows you all the dishes you can order.
- **:term[Activity Registry]{canonical="Activity"}**: A list of all the code functions (:term[Activities]{canonical="Activity"}) that actually do the work (the "how"). This is like the kitchen's recipe book that tells the chef exactly how to make each dish.

This separation is super flexible. It lets us define a tool separately from how it works. A tool can even work by having the AI just *imagine* the result. It also means you can swap out the recipe (the :term[Activity]{canonical="Activity"})—maybe for a faster one—without having to reprint the whole menu (the :term[Tool]{canonical="Tool"}).

## Activity Registration

When you create an :term[Activity]{canonical="Activity"}, you give it a unique name so the system can find it and connect it to a :term[Tool]{canonical="Tool"}. The code for an Activity always gets three pieces of information to work with:

- **`call`**: The specific instructions for this one job. It includes all the details the tool needs, plus some extra notes (starting with `_`) that help guide the process.
- **`tool`**: A copy of the :term[Tool]{canonical="Tool"}'s own description. This is like giving the chef the menu description of the dish so they know what it's supposed to look like in the end.
- **`context`**: A few key messages from the main conversation. It's not the whole conversation, just the important bits the :term[Activity]{canonical="Activity"} is allowed to see. This is a security feature to make sure the code only gets the information it's supposed to have.

An `Activity`'s return value is flexible. If it returns a fully formatted `Message` object, the system will use it directly. This gives the `Activity` total control over its output. If it returns anything else (like a raw number or text), the system will automatically wrap it in a `Data Message` for it.

::::columns
:::column{title="How an Activity is Coded"}

```typescript
// Register an Activity implementation.
// By convention, an Activity can be bound to a Tool of the same name.
// Types are automatically inferred from the Tool.
Activity.register('weatherCheck', async (call, tool, context) => {
  const data = await weatherAPI.get(call.location);
  return { temperature: data.temp, conditions: data.desc };
});
```

:::
:::column{title="The Matching Tool's Blueprint"}

```typescript
Tool.register('weatherCheck', {
  type: 'object',
  description: 'Gets the current weather for a location.',
  properties: {
    _tool: { type: 'string', const: 'weatherCheck' },
    location: { type: 'string' },
    _output: {
      type: 'object',
      properties: {
        temperature: { type: 'number' },
        conditions: { type: 'string' },
      },
      required: ['temperature', 'conditions'],
    },
  },
  required: ['location'],
});
```

:::
::::

## Execution Modes: Thinking vs. Doing

The system has two ways it can use a :term[Tool]{canonical="Tool"}'s :term[Call]{canonical="Call"}:

- **Thinking Mode (Latent Execution)**: The AI uses its own brain to figure out the answer. It "thinks through" the problem and gives you the result right away. This is the default if it can't find any real code for the :term[Tool]{canonical="Tool"}.
  > Sidenote:
  > - :term[104: Concept/Latent]{href="./104_concept_latent.md"} (More about how AI's 'thinking' works)
- **Action Mode (Explicit Execution)**: The AI runs real, predictable code to get the answer. An :term[Activity]{canonical="Activity"} function is called to do the work. This is necessary for things that need a guaranteed, correct answer, like talking to a website API or doing precise math.

## How the System Picks an Activity

The system has a simple, automatic way to decide which mode to use. It looks at a special field called `_activity` in the :term[Tool]{canonical="Tool"}'s description.

1.  **Direct Order**: If the :term[Tool]{canonical="Tool"} description has an `_activity` field with a name in it, the system looks for an :term[Activity]{canonical="Activity"} with that exact name.
2.  **Same-Name Rule (The Easy Way)**: If there's no `_activity` field, the system looks for an :term[Activity]{canonical="Activity"} that has the **exact same name** as the :term[Tool]{canonical="Tool"}. If it finds one, it connects them automatically.
3.  **Fallback to Thinking**: If it can't find a matching :term[Activity]{canonical="Activity"} using the rules above, it leaves the `_activity` field blank. This tells the system to use its imagination (Thinking Mode).

This makes things easy:

- **For it to work automatically, just give your :term[Activity]{canonical="Activity"} the same name as your :term[Tool]{canonical="Tool"}.**
- :term[Tool]{canonical="Tool"}s that are just for thinking don't need any matching code.
- You can always override this by manually setting the `_activity` field, which lets one piece of code power many different tools.

## Teamwork with Other Systems

An :term[Activity]{canonical="Activity"} works as part of a team with other parts of the system.

- **:term[Call]{canonical="Call"}:** The `call` it receives is more than just a list of instructions. It's a complete package that can include special notes like where to save the result (`_outputPath`) or which specific task it's for. This lets an :term[Activity]{canonical="Activity"} be a smart player in a bigger game.

  > Sidenote:
  > - :term[004: Agent/Call]{href="./004_agent_call.md"}
  > - :term[008: Agent/Output]{href="./008_agent_output.md"}
  > - :term[013: Agent/Instancing]{href="./013_agent_instancing.md"}

- **:term[Scopes]{canonical="Scope"}:** The `context` it receives is carefully controlled by :term[Scopes]{canonical="Scope"}. A list called `_scopes` on the :term[Call]{canonical="Call"} acts like a permission slip, saying exactly which messages from the main conversation the :term[Activity]{canonical="Activity"} is allowed to see. It's like passing a secret note with only the necessary info, instead of shouting the whole conversation across the room.

  > Sidenote:
  > - :term[015: Agent/Scopes]{href="./015_agent_scopes.md"}

- **Choosing a Path:** An :term[Activity]{canonical="Activity"} can be smart about where its answer goes. Sometimes the instructions might say, "Put the result in the 'success' box or the 'error' box." The :term[Activity]{canonical="Activity"}'s code can check if everything worked and then build the final `Message` that puts the result in the correct box. This gives the real code full control over the workflow.

## Why Separate Activities Matter

Why go to all the trouble of keeping the "what" (:term[Tool]{canonical="Tool"} blueprints) and the "how" (:term[Activity]{canonical="Activity"} code) separate? Imagine if the buttons on your game controller were permanently wired to the game's code. To change what the "Jump" button does, you'd have to rewire the whole controller.

By separating them, we keep the controller's layout (:term[Tool]{canonical="Tool"}s) the same, but we can easily change what the buttons do in the background (:term[Activities]{canonical="Activity"}). This means:

- **Easy Upgrades**: You can change how a tool works without breaking the agents that use it.
- **Testing New Ideas**: You can have two versions of a tool—one where the AI thinks and one where it uses a real website—and see which one works better.
- **Safe Rollouts**: You can give a new, improved :term[Activity]{canonical="Activity"} to some users while everyone else keeps using the old, trusted one or just lets the AI think.

## From Blueprint to Action

By separating what a tool does (:term[Tool]{canonical="Tool"}) from how it does it (:term[Activity]{canonical="Activity"}), the system becomes very powerful and flexible. But that's not the whole picture. Now that we have the blueprints and the code, the final piece is organizing it all: how the system calls these tools, runs them, and puts them in the right order.

The next document, :term[004: Agent/Call]{href="./004_agent_call.md"}, explains how the system turns these ideas into real actions.
