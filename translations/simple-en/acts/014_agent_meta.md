# 014: Agent/Meta

> [!DEFINITION] [Meta Properties](./000_glossary.md)
> Think of this as an :term[Idea]{canonical="Idea"}'s official ID card. It’s a tidy package of information that holds its name, where it belongs, its version number, when it was made, and which 'drafts' it's part of. This gives computers a clear and reliable way to know an :term[Idea]{canonical="Idea"}'s history and how to find it.

> Sidenote:
> - Needs to be read after:
>   - :term[001: Agent/Request]{href="./001_agent_request.md"}
>   - :term[107: Concept/Identity]{href="./107_concept_identity.md"}
> - Helps you understand:
>   - :term[108: Concept/Visibility]{href="./108_concept_visibility.md"}
>   - :term[110: Concept/Addressing]{href="./110_concept_addressing.md"}

An :term[Idea]{canonical="Idea"} can have an identity that just sort of forms from how it's connected to other :term[Ideas]{canonical="Idea"}, like how you're known by your group of friends. But for a computer program to work with an :term[Idea]{canonical="Idea"}, it needs something more direct and official. That's what the **`Meta`** object is for. It's the "business card" of an :term[Idea]{canonical="Idea"}, giving a steady, computer-friendly name tag for keeping track of versions, finding it, and even for the :term[Idea]{canonical="Idea"} to know itself.

## The `Meta` ID Card in Action

The `Meta` object is a very important piece of the puzzle when you ask the system to do something (a :term[Request]{href="./001_agent_request.md"}). It shows up in the `context` to tell the AI what :term[Idea]{canonical="Idea"} it's working on, and it's a required part of the final `solution`.

- **In the `context` (the background info)**: A `meta` message gives the AI the current ID card of the :term[Idea]{canonical="Idea"} it's working with.
- **In the `schema` (the rules)**: The rules for the final `solution` say it *must* have a `meta` section. This forces the AI to think about and update the :term[Idea]{canonical="Idea"}'s identity as part of its job.
- **In the `solution` (the final answer)**: The AI creates a new `meta` object, usually with an updated version number, showing how the :term[Idea]{canonical="Idea"} has changed or grown.

This process turns the AI from a simple tool that just follows orders into an active helper in an :term[Idea]{canonical="Idea"}'s life story.

::::columns
:::column{title="Example Request"}

```json
// The AI gets the Idea's current ID card (meta),
// and is told it needs to create a new one in its answer.
{
  "context": [
    {
      "type": "meta",
      "meta": {
        "domain": "reactor.ideas.services",
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
    "type": 'object',
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
:::column{title="Example Answer"}

```json
// The AI's answer includes the next step for the game
// and a new ID card with an updated version number.
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

A really important job of the `Meta` object is to let an :term[Idea]{canonical="Idea"} grow by itself. Because the AI is given the current version and is required to provide a new one, the system basically tells the AI to handle version updates. Every time an :term[Idea]{canonical="Idea"} (acting as an agent) reacts to something, it can bump its own version number (like from 1.2 to 1.3), creating a new, saved copy of itself while remembering its history.

This can cause a problem when lots of things are happening at once. Imagine two people try to fix a bug in a game at the same time. They both start with version `1.2.3`, and they both might try to save their fix as `1.2.4`. Now you have a mess because you don't know which one is the real `1.2.4`.

The system solves this by using branches, which are like creating your own separate copy to work on. Instead of fighting over the same version number, one person's version might become `1.2.3.fix-bug-A.1` and the other's `1.2.3.fix-bug-B.1`. This lets them both work at the same time without messing each other up. Later, their changes can be brought together.

## Connecting the ID Card to an Address

The information on the `Meta` ID card directly matches the parts of an :term[idea:]{href="./110_concept_addressing.md"} web address. This connects the :term[Idea]{canonical="Idea"}'s official name to its location on the network.

Using these pieces, you can build a permanent, specific web address for one exact snapshot of an :term[Idea]{canonical="Idea"}: `idea://my-project.com/~staging/bob?1.2.3`

> Sidenote:
> - The :term[idea:]{href="./110_concept_addressing.md"} address format provides the actual way to write down links to find and work with these growing :term[Ideas]{canonical="Idea"}.

This permanent address is what you get when you ask for an :term[Idea]{canonical="Idea"} using a more general address. For example:

- The Official ID Card (`Meta`): `idea://my-project.com/~staging/bob?1.2.3`
  - _meta.domain:_ `my-project.com`
  - _meta.path:_ `bob`
  - _meta.version:_ `1.2.staging.1`
  - _meta.branches:_ `['staging']`
  - _meta.createdAt:_ `2025-10-26T10:00:00Z`

- You ask for: `idea://my-project.com/bob?1.2`
  - _Search in branch:_ `['staging']`
  - _Before this time:_ `2025-10-26T10:00:00Z`

- You get the exact address: `idea://my-project.com/~:staging/bob?1.2:1.2.staging.1`
  - _Branch:_ `~:staging`
    - _you asked for:_ any branch
    - _you got_: `staging`
  - _Version:_ `1.2:1.2.staging.1`
    - _you asked for:_ `1.2`
    - _you got:_ `1.2.staging.1`

This means an :term[Idea]{canonical="Idea"} contains its own address. Its `Meta` object has all the information needed to create a permanent, exact link to itself.