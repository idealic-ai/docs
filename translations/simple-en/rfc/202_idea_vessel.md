# 202: Idea/Vessel

> **Vessel Idea:** Think of this as a special kind of box. This box holds two important things: a list of all the possible actions an AI could take in a situation (its `Tools`), and a note saying which action it actually picked. It’s a complete record of a single reaction.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
> - Requires:
>   - [101: Concept/Idea](./101_concept_idea.md)
>   - [002: Agent/Tool](./002_agent_tool.md)
>   - [004: Agent/Call](./004_agent_call.md)

A **Vessel Idea** is like a perfect snapshot of an AI agent's immediate reaction to something. It’s more than just a log of what happened. It’s a rich recording that includes the full story of the decision, which makes it easy to check, change, and use again later.

## 1. The Parts of a Reaction

Imagine an AI making a decision. A `Vessel Idea` captures both what it *could have* done and what it *actually did*.

Let’s use the analogy of ordering food at a restaurant:

> Sidenote:
> - [101: Concept/Idea](./101_concept_idea.md)

- **`context` (What Happened):** This is the reason for the action. *You are hungry and looking at a menu.*
- **`schema` (All the Choices):** This describes every single thing the AI could possibly do. It's the full toolbox available at that moment. *This is the entire menu, listing every single dish you could order.*
- **`solution` (The Choice That Was Made):** This is the record of what the AI actually did. It's a list of the specific `Calls` (actions) it chose from the `schema`. *This is the one dish you actually ordered from the menu.*

Because a `Vessel` contains both the menu (`schema`) and your final order (`solution`), it gives a complete picture of why and how a decision was made.

## 2. The Power of a Complete Snapshot

Packing everything into one box like this is what makes the system so smart. By keeping the list of choices together with the final decision, a `Vessel Idea` makes several cool things possible:

- **Checking and Changing:** A person can look at a `Vessel` and see not only what the AI did, but all the other things it could have done. They can then say, "Yep, that's right," or change the decision by picking a different action from the list of choices (`schema`).
- **Trying Again:** If an action fails, the AI can rethink its choice. It already has the original problem (`context`) and the full list of its options (`schema`), so it can easily pick a different action and create a new `Vessel`.
- **Using it Again:** A `Vessel` can be a great example or template for making similar decisions in the future.

### 2.1. Interactive Time Travel

Because a `Vessel Idea` is a complete and unchangeable snapshot, it lets you do something like time travel.
You can load a `Vessel` from the past and see the AI exactly as it was at that very moment.

The `schema` guarantees that the AI's abilities are frozen in time. Even if the modern AI has learned new tricks and has new `Tools`, the old `Vessel` will only show the options that were available back when it was created. This lets you:

- **Replay the Past:** See exactly how a past decision was made.
- **Explore "What Ifs":** You can give that old `Vessel` a new problem (`context`) to see how the older version of the AI would have reacted. This is a great way to understand how the AI has grown and to find bugs.

This gives us a powerful way to check, understand, and watch how an agent's thinking changes over time.

## 3. The Vessel in Action

A `Vessel` is like a single heartbeat in the AI's life. The AI sees something, reacts (creating a `Vessel`), and then the results of that action are fed back in as the starting point for the next heartbeat, which might create a new `Vessel`.

> Sidenote:
> - [005: Agent/Loop](./005_agent_loop.md)

This pattern is great for building AIs that can react quickly to things as they happen. However, it's not designed for big, complicated plans that have many steps and require remembering things for a long time.

## 4. From Quick Reactions to Big Plans

While a `Vessel` is a perfect record of a single, quick reaction, reaching bigger goals requires a way to plan things out over multiple steps. This is where a **Process Idea** comes in. It uses the same idea of a self-contained box, but for a long-term, step-by-step plan.

> Sidenote:
> - [203: Idea/Process](./203_idea_process.md)
