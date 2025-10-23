# 014: Agent/Meta

> [!DEFINITION] Meta Properties
> Think of Meta Properties as the official ID card for any request sent to the AI. It’s a neat little package of information that clearly states the request’s name, where it belongs, its version number, when it was made, and what project branches it's part of. This gives every request a permanent, computer-readable identity so it can always be found and understood.

> Sidenote:
> - You'll need to understand this first:
>   - :term[001: Agent/Request]{href="./001_agent_request.md"}
> - These documents add more details:
>   - :term[107: Concept/Identity]{href="./107_concept_identity.md"}
>   - :term[108: Concept/Visibility]{href="./108_concept_visibility.md"}
>   - :term[110: Concept/Addressing]{href="./110_concept_addressing.md"}

While many conversations with an AI can be quick and forgettable, building something big and complex requires a way to remember and keep track of every step. The **`Meta`** object is like an ID card for each :term[Request]{href="./001_agent_request.md"} and its final :term[Solution]{href="./001_agent_request.md"}. It provides a stable, computer-friendly label that allows the system to save, version, find, and look up the history of any task. What’s really cool is that by making this ID card part of the AI's answer, we let the AI create *new* ID cards or create new versions of old ones all on its own. This turns a simple answer into a creative act, like starting a new chapter in a book.

## The `Meta` ID Card in Action

The `Meta` object is a VIP in the life of a :term[Request]{href="./001_agent_request.md"}. It shows up to tell the AI what it's working on, and the AI is required to create a new one as part of its answer.

- **In the `context`**: A `meta` message acts like a sticky note, telling the AI, "Here is the ID for the thing you are currently working on."
- **In the `schema`**: The rules for the answer require a `meta` section, forcing the AI to think about the task's identity and update it.
- **In the `solution`**: The AI creates a brand new `meta` object in its answer, usually with an updated version number, showing how the task has progressed.

This process changes the AI from being just a tool that follows instructions into an active partner that helps manage the history of a project.

> [!HEADSUP] Heads up: From Request to Idea
> This whole package—the `context` (including the `Meta` ID card), the `schema` (the rules), and the final `solution`—is a complete, repeatable unit of work. When you save this unit, the system calls it an :term[Idea]{href="./101_concept_idea.md"}. The `Meta` object is the magic key that turns a temporary `Request` into a permanent, findable `Idea`.
>
> > Sidenote:
> > :term[101: Concept/Idea]{href="./101_concept_idea.md"}

::::columns
:::column{title="Example of a Request"}

```json
// The AI gets the current ID card (meta)
// and is told to create a new one in its answer.
{
  "context": [
    {
      "type": "meta",
      "meta": {
        "domain": 'reactor.ideas.services',
        "path": "/games/321",
        "version": "1.2.3",
        "branches": ["main"],
        "createdAt": "2025-10-26T10:00:00Z"
      }
    },
    {
      "type": "state",
      "state": {
        "...current game state..."
      }
    }
  ],
  "schema": {
    "type": "object",
    "properties": {
      "meta": {
        "$ref": "MetaSchema"
      },
      "output": {
        "$ref": "GameSchema"
      }
    }
  }
}
```

:::
:::column{title="Example of a Solution"}

```json
// The AI's answer includes the next game step
// and a new, updated ID card with a new version.
{
  "meta": {
    "domain": "reactor.ideas.services",
    "path": "/games/321",
    "version": "1.2.4",
    "branches": ["main"],
    "createdAt": "2025-10-26T10:05:00Z"
  },
  "output": {
    "...next game state..."
  },
  "calls": []
}
```

:::
::::

## Growing and Versioning on Its Own

A key job for the `Meta` object is to let the AI's work evolve automatically. By telling the AI the current version and requiring it to create a new one in its answer, the system gives the AI the job of tracking versions. When the AI creates a new answer, it's like writing the next page in a book, so it must update the version number (like from page 2 to page 3). This creates a permanent, unchangeable snapshot of its work, building a perfect, traceable history of everything the AI has done over time.

> Sidenote:
> - You can read more about how things improve on their own in :term[106: Concept/Evolution]{href="./106_concept_evolution.md"}.

But what happens if two AIs try to do this at the same time? Imagine two authors both trying to write Chapter 4 for the same book at the exact same moment. They might overwrite each other's work!

The system solves this by letting them create different "branches," or alternate timelines. Instead of both creating version `1.2.4`, one can create `1.2.3.branch-A.1` and the other can create `1.2.3.branch-B.1`. This lets them work at the same time without getting in each other's way. Later, their different chapters can be reviewed and combined.

> Sidenote:
> - For more on this, see :term[108: Concept/Visibility]{href="./108_concept_visibility.md"}.

## Connecting an ID to an Address

The information inside the `Meta` object gives every :term[Request]{canonical="Request"} a unique address, like a postal address for a specific letter. This lets anyone in the system find, send, or refer to an exact, versioned piece of work.

> Sidenote:
> - The exact rules for how these addresses are written are explained in :term[110: Concept/Addressing]{href="./110_concept_addressing.md"}.

This process connects a general question to a specific, permanent answer. Here's how it works:

- **Meta (The ID Card)**: The specific details of one saved answer.
  - _meta.domain:_ `my-project.com`
  - _meta.path:_ `bob`
  - _meta.version:_ `1.2.staging.1`
  - _meta.branches:_ `['staging']`
  - _meta.createdAt:_ `2025-10-26T10:00:00Z`

- **Reference (The Question)**: A general request for something.
  - `idea://my-project.com/bob?1.2` (I want the latest version of 'bob' that starts with '1.2')
  - _Search path:_ `['staging']` (Look in the 'staging' branch first)
  - _Cutoff date:_ `2025-10-26T10:00:00Z` (Don't look for anything created after this time)

- **Resolved (The Answer)**: The permanent, exact web address pointing to the result that was found.
  - `idea://my-project.com/~:staging/bob?1.2:1.2.staging.1`
  - _Branch:_ `~:staging`
    - _You asked for:_ any version in the 'staging' branch.
    - _You got_: the one in the `staging` branch.
  - _Version:_ `1.2:1.2.staging.1`
    - _You asked for:_ the latest thing that matches `1.2`.
    - _You got:_ version `1.2.staging.1`.

This system makes every piece of work easy to describe and find, just by looking at its ID card.
