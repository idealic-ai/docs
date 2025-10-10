# 004: Agent/Call

> **Call:** Think of a **Tool** as a button on a remote, like "Change Channel." A **Call** is when you actually press that button and enter a specific channel number, like "5." It’s the real command to *do something now*.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
>
> - Requires:
>   - [103: Concept/Ideator](./103_concept_ideator.md)
> - Enables:
>   - [008: Agent/Imports](./008_agent_imports.md)
>   - [011: Agent/Instancing](./011_agent_instancing.md)
>   - [202: Idea/Vessel](./202_idea_vessel.md)
>   - [203: Idea/Process](./203_idea_process.md)

An **[Idea](./101_concept_idea.md)** is like a recipe for how to do something. A **[Tool](./002_agent_tool.md)** turns that recipe into a working button that an AI can use. This guide is all about the **Call**, which is what happens when the AI actually presses that button.

A **Call** is the specific, final command for a Tool, with all the details filled in. If a Tool tells you *what things you can do*, a Call is about *doing one of those things right now*.

## The Journey from Idea to Call

Imagine you're baking a cake. Here’s how it works:

1.  **Idea**: This is your recipe. It has all the instructions for how to bake a cake.
2.  **Tool**: The recipe is used to create a "Bake Cake" button on a smart oven. The oven now knows what ingredients it needs (like flour, sugar, and eggs) and what actions it can take.
3.  **Call**: This is you telling the oven, "Bake a cake using *this brand* of chocolate, for *30 minutes* at *350 degrees*." You've filled in all the blanks and given a specific command. That one, single command is a Call.

The main rule is simple: **any Idea can be turned into a Tool, and any Tool can be used in a Call.**

To learn more about how an Idea's shopping list becomes the settings for a Tool, check out **[007: Agent/Input](./007_agent_input.md)**.

## The Control Knobs: Scope and Method

When you make a Call, you can change how it works using two "control knobs": the **Scope** (where it runs) and the **Method** (how it runs). The system knows how you've set the knobs by looking for special instructions in the Tool's settings (`_module`, `_activity`, `_output`). Think of them as secret codes that tell the AI how to behave.

### The Two Main Controls

1.  **Scope (Where does it run? Here or with a specialist?)**
    The scope decides if the AI does the job itself or hands it off to an expert.
    - **Here (Inline Scope)**: This is the default. The AI handles the task directly. It's like a chef chopping vegetables at their own cooking station.
    - **Specialist (Module Scope)**: This is used when you see the `_module` code. It's like the chef telling the baker in the other room to make the bread. The job is sent to an expert to handle.

2.  **Method (How does it run? Following a recipe or being creative?)**
    The method decides if the task follows exact steps or if it uses its brain to figure things out.
    - **Recipe (Explicit Method)**: Used when you see the `_activity` code. The task follows a super specific set of steps, like a robot building a car in a factory. There's no room for guessing.
    - **Creativity (Latent Method)**: This is the default. The AI is asked to figure out the best way to do something. This often needs an `_output` code, which is like telling a master chef, "I don't care how you do it, just make me a delicious soup."

You can mix and match these controls to get work done in all sorts of ways. To see how, check out **[008: Agent/Imports](./008_agent_imports.md)**.

## Building Bigger Things with Calls

A `Call` is like a single Lego brick. By itself, it's a simple command. But you can snap many Calls together to build much bigger and more complex things, like an entire **[Vessel](./202_idea_vessel.md)** or **[Process](./203_idea_process.md)**.

A `Vessel` is like a complete Lego set in its box. It has everything needed for one big project: the instruction booklet (`context`), a list of all the different bricks you can use (`schema` of `Tools`), and the final model the AI decides to build with them (`solution`, which is just a list of `Calls` to run).

> Sidenote:
>
> - [202: Idea/Vessel](./202_idea_vessel.md)
> - [203: Idea/Process](./203_idea_process.md)

## Different Ways to Run Calls

When an AI decides to make a bunch of Calls at the same time, you can choose how it should do them.

```typescript
// Do just one Call
const result = await Tool(call);

// Do all of them. Don't continue until every single one is finished.
const results = await Tool.all(calls);

// Try all of them. Give me the result from the first one that works.
const result = await Tool.any(calls);

// It's a race! Start them all and give me the result of the very first one to finish, whether it succeeded or failed.
const result = await Tool.race(calls);
```

These different ways let you:

- **Go Step-by-Step**: Handle each Call one by one, deciding what to do in between.
- **Do a Bunch at Once**: Run many separate Calls at the same time to work faster.
- **Find the First Answer**: Stop as soon as you find one Call that works (`.any()`) or as soon as the first one crosses the finish line (`.race()`).
- **Succeed as a Team**: Make sure a whole group of Calls finishes successfully, which is important when they all depend on each other (`.all()`).
