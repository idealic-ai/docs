# 202: Idea/Vessel

> [!DEFINITION] [Vessel Idea](./000_glossary.md)
> Think of a Vessel Idea as a 'snapshot' of a decision. It's a complete package that holds two things: 1) all the possible actions an AI agent could take in a specific moment (its menu of `Tools`), and 2) the exact action (`Call`) it actually chose in response to something happening.



A **Vessel Idea** is like a perfect little time capsule of an AI agent's reaction to something that just happened. It’s not just a simple log of what it did. It’s a detailed record that includes the entire situation, making that single decision easy to check, change, and reuse later on.

## 1. The Anatomy of a Reaction

A `Vessel Idea` has three main parts. Together, they describe both what *could have* happened and what *did* happen:



- **`context` (What Happened):** This is the trigger—the user's question or the new information that made the agent need to act.
- **`schema` (The Menu of Options):** This describes every single `Tool` the agent had available at that exact moment. It’s the full list of everything it *could have* done.
- **`solution` (What It Chose):** This is the record of what the agent *actually did*. It’s a list of the specific `Calls` (actions) it picked from the menu in the `schema`.

Because a `Vessel` contains both the menu of possibilities (`schema`) and the final choice (`solution`), it gives you a complete picture of why a decision was made.

## 2. The Power of Self-Contained Decisions

This all-in-one package is what makes the system so smart and flexible. By bundling the menu with the choice, a `Vessel Idea` can do some cool things:

- **Human Check and Override:** A person can look at a `Vessel` and see not just what the agent did, but all the other things it could have done. They can then either approve the action or pick a different one from the `schema`.
- **Replanning:** If an action fails, the agent can try again. It already has the original situation (`context`) and its full menu of options (`schema`), so it can easily pick a different `Tool` and create a new `Vessel`.
- **Reusability:** A `Vessel` can be used as a perfect example or a template for making similar decisions in the future.

### 2.1. Interactive Time Travel

Because a `Vessel Idea` is a complete and unchangeable snapshot, it lets you do something like interactive time travel. You can load a `Vessel` from the past and see the agent exactly as it was in that moment.

The `schema` guarantees the agent's abilities are frozen in time. Even if the modern version of the agent has new, better `Tools`, the old `Vessel` will only show the options it had back then. This allows you to:

- **Replay History:** See exactly how and why a past decision was made.
- **Explore Alternatives:** Ask 