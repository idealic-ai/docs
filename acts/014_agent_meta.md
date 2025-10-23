# 014: Agent/Meta

> [!DEFINITION] [Meta Properties](./000_glossary.md)
> A structured object within an :term[Idea]{canonical="Idea"} that holds its explicit identity, including its name, namespace, version, creation date, and branch associations. It provides a stable, machine-readable anchor for an :term[Idea]{canonical="Idea"}'s lineage and addressability.

> Sidenote:
>
> - Requires:
>   - :term[001: Agent/Request]{href="./001_agent_request.md"}
>   - :term[107: Concept/Identity]{href="./107_concept_identity.md"}
> - Enables:
>   - :term[108: Concept/Visibility]{href="./108_concept_visibility.md"}
>   - :term[110: Concept/Addressing]{href="./110_concept_addressing.md"}

While :term[Emergent Identity]{href="./107_concept_identity.md"} arises from the web of relationships between :term[Ideas]{canonical="Idea"}, a more direct and explicit form of identity is needed for programmatic interaction. The **`Meta`** object serves this purpose. It is the "business card" of an :term[Idea]{canonical="Idea"}, providing a stable, machine-readable handle for versioning, addressing, and self-awareness.

## The `Meta` Object in the Request Lifecycle

The `Meta` object is a first-class citizen in the :term[Request]{href="./001_agent_request.md"} lifecycle. It appears in the `context` to inform the LLM of the :term[Idea]{canonical="Idea"}'s current identity, and in the `schema` as a required part of the `solution`.

- **In the `context`**: A `meta` message provides the LLM with the identity of the :term[Idea]{canonical="Idea"} it is currently processing.
- **In the `schema`**: The `solution`'s schema requires a `meta` property, compelling the LLM to consider and update the :term[Idea]{canonical="Idea"}'s identity as part of its task.
- **In the `solution`**: The LLM generates a new `meta` object, often with an updated version, reflecting the evolution of the :term[Idea]{canonical="Idea"}.

This cycle transforms the LLM from a simple processor into an active participant in an :term[Idea]{canonical="Idea"}'s lifecycle.

::::columns
:::column{title="Example Request Structure"}

```json
// The LLM receives the current meta as context,
// and is tasked to produce a new one in the solution.
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
:::column{title="Example Solution"}

```json
// The LLM's solution includes the next game state
// and the bumped version in the new meta object.
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

## Autonomous Evolution and Versioning

A key role of the `Meta` object is to enable autonomous evolution. By including the current version and branches in the `context` and requiring a new version in the `solution`, the system tasks the LLM with version bumping. Each time an agent reacts to a stimulus, it can increment the minor version of the :term[Idea]{canonical="Idea"} it represents, creating a new, immutable snapshot of its state and logic while retaining its branch associations.

This raises a challenge in distributed systems: if two independent processes react to different events simultaneously, they might both try to bump the version from `1.2.3` to `1.2.4`, creating a race condition.

The architecture resolves this using the branching mechanism described in the :term[Visibility]{href="./108_concept_visibility.md"} concept. When creating a new line of development, a process adds a new branch to the `branches` array (e.g., `["main", "my-feature"]`) and creates a branched version. The versions become `1.2.3.branch-A.1` and `1.2.3.branch-B.1`, respectively. This allows for parallel, conflict-free evolution, with the different histories being merged or reconciled later.

## Connecting Identity to Address

The fields within the `Meta` object directly correspond to the components of the :term[idea:]{href="./110_concept_addressing.md"} URI scheme. This creates a seamless link between an :term[Idea]{canonical="Idea"}'s explicit identity and its address on the network.

These properties can be composed into a permanent, fully-resolved URI representing the :term[Idea]{canonical="Idea"}'s specific state: `idea://my-project.com/~staging/bob?1.2.3`

> Sidenote:
>
> - The :term[idea:]{href="./110_concept_addressing.md"} URI scheme provides the concrete syntax for referencing and interacting with these evolving :term[Ideas]{canonical="Idea"}.

This permanent URI might be the result of resolving a more dynamic referencing URI, such as:

- Meta: `idea://my-project.com/~staging/bob?1.2.3`
  - _meta.domain:_ `my-project.com`
  - _meta.path:_ `bob`
  - _meta.version:_ `1.2.staging.1`
  - _meta.branches:_ `['staging']`
  - _meta.createdAt:_ `2025-10-26T10:00:00Z`

- Reference: `idea://my-project.com/bob?1.2`
  - _Search path:_ `['staging']`
  - _Cutoff date:_ `2025-10-26T10:00:00Z`

- Resolved: `idea://my-project.com/~:staging/bob?1.2:1.2.staging.1`
  - _Branch:_ `~:staging`
    - _asked for:_ any branch
    - _got_: `staging`
  - _Version:_ `1.2:1.2.staging.1`
    - _asked for:_ `1.2`
    - _got:_ `1.2.staging.1`

This makes an :term[Idea]{canonical="Idea"} self-describing. Its `Meta` object contains all the information needed to construct a permanent, fully-resolved reference to itself.
