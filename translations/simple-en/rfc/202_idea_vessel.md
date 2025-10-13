# 202: Idea/Vessel

> **Vessel Idea:** Think of this as a "decision in a bottle." It's a special type of `Idea` that holds both the description of what an AI *could* do in a moment, and the exact record of what it *did* do. Its `schema` is like a complete menu of all possible choices, and its `solution` is the item that was actually ordered from that menu.
>
> — [Glossary](./000_glossary.md)



A **Vessel Idea** is like a perfect snapshot of an AI agent's immediate reaction to something that happened. It's more than just a simple log of what the AI did; it’s a complete package that contains the whole story of that single decision. This makes it easy to check, adapt, and use again later.

## 1. The Anatomy of a Reaction

A `Vessel Idea` uses the three main parts of an `Idea` to capture both what *could* have happened and what *did* happen:



- **`context` (The Trigger):** This is the event or information that made the agent act. For example, a user asking a question.
- **`schema` (The Menu of Options):** This describes every single thing the agent *could have* done at that moment. It's like a complete menu of all its available tools and actions.
- **`solution` (The Choice):** This is the record of what the agent *actually did*. It's an array listing the specific actions (or `Calls`) that it chose from the menu.

Because a `Vessel` contains both the menu of possibilities (`schema`) and the final order (`solution`), it gives you a complete picture of that decision.

## 2. The Power of Self-Contained Decisions

Having everything packed together in one place is what makes this system so smart. By including the menu of options with the final choice, a `Vessel Idea` automatically allows for a few cool things:

- **Human Check-ups and Changes:** A person can look at a `Vessel` and see not only what the AI did, but also what it *could have* done. They can then either approve the AI's action or pick a different option from the menu (`schema`) to change the outcome.
- **Replanning:** If an action fails (imagine a robot's key doesn't fit a lock), the agent can rethink its move. It already has the original problem (`context`) and the full list of other keys it could try (`schema`), making it easy to pick a new key and create a new `Vessel`.
- **Reusability:** A successful `Vessel` from the past can be used like a recipe to solve similar problems in the future.

### 2.1. Interactive Time Travel

Because a `Vessel Idea` is a complete and unchangeable snapshot, it lets you do something like interactive time travel. By loading an old `Vessel`, you can interact with the AI exactly as it was at that specific moment in the past.

The `schema` guarantees that the AI’s abilities are frozen in time. Even if the current AI has been upgraded with new tools, the old `Vessel` will only show the options that were available when it was first created. This lets you:

- **Replay History:** See exactly how a past decision was made.
- **Explore “What-Ifs”:** You can give that past version of the AI a different problem (`context`) to see how it would have reacted, helping you understand its behavior.

This is a super powerful way to find bugs, double-check the AI's work, and see how it's getting smarter over time.

## 3. The Vessel in the Action Loop

A `Vessel` represents a single step, or a single "beat," in the AI's thought process. It's one decision made and recorded in an instant. The result of that decision is then used as the trigger (`context`) for the very next step, which creates a brand new `Vessel`.



This pattern of reacting to things one step at a time is great for building AIs that can respond quickly to what's happening right now. However, it's not designed for handling big, complex projects that require long-term memory and a multi-step strategy.

## 4. From Quick Reactions to Big Plans

While a `Vessel` is a perfect record of a single reaction, reaching bigger goals requires a way to plan and execute many steps in a row. This is where a **Process Idea** comes in. It uses the same 'everything-in-a-box' principle but applies it to a long-term, strategic plan.


