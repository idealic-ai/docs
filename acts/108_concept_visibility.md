# 108: Concept/Visibility

> [!DEFINITION] :term[Visibility]{canonical="Visibility"}
> The set of mechanisms that control which version of an :term[Idea]{canonical="Idea"} is resolved in a given context. Visibility is determined by a combination of an :term[Idea]{canonical="Idea"}'s version history, its branch associations, and the requester's search path.

> Sidenote:
>
> - Requires:
>   - :term[107: Concept/Identity]{href="./107_concept_identity.md"}
> - Enables:
>   - :term[109: Concept/Addressing]{href="./109_concept_addressing.md"}

For a system of evolving, interconnected :term[Ideas]{canonical="Idea"} to be useful, there must be a clear and predictable way to determine which version of an :term[Idea]{canonical="Idea"} is seen—or **visible**—in any given context. This document describes the two-part model that governs visibility: the versioning system that creates the possible states of an :term[Idea]{canonical="Idea"}, and the selection mechanism that chooses which state becomes visible.

## Versioning: Creating the States to Be Seen

Before a version can be selected, it must exist. **Hierarchical Versioning** is the mechanism for creating and tracking the different states of an :term[Idea]{canonical="Idea"} over time. A version is not just a simple number but a rich, dot-separated hierarchy that tells the story of an :term[Idea]{canonical="Idea"}'s evolution.

Versions consist of **integer revisions** for sequential, public releases (like `1.2`) and **branched revisions** for named development lines (like `feature-x`). For example, a version like `1.2.feature-x.3` tells us this is the third revision of a `feature-x` branch that was created from version `1.2`.

The rules for evolving a version are:

- **Compatible Changes**: A non-breaking edit, such as adding a new optional field to a schema, creates a new minor revision (e.g., `1.2` becomes `1.2.1`).
- **Incompatible Changes**: A breaking change, such as removing a field or changing the type of an existing field, is one where the new version can no longer be a drop-in replacement for the old. This must "bubble up" to a higher level of the version hierarchy. A change that breaks compatibility with `1.2` would create a new version `1.3`. The system automatically detects these incompatibilities by analyzing schema changes, ensuring version numbers accurately reflect true compatibility boundaries without manual guesswork.

## Selection: Choosing the Visible State

With a rich history of versions available, a selection mechanism is needed to choose the correct one. This is handled by a clear separation between how an `Idea` is published and how it is retrieved. The process has two retrieval dimensions: **spatial** (which partitions to search) and **temporal** (as of what point in time).

### Branches: Publication and Partitioning

> [!DEFINITION] :term[Branch]{canonical="Branch"}
> A named tag that partitions the visibility space, creating a parallel, isolated environment for development and experimentation. Associating an :term[Idea]{canonical="Idea"} with a branch is an act of publication.

For example, every :term[Idea]{canonical="Idea"} version in the database is associated with one or more branches like `["main", "feature/new-billing"]`. This act of publication makes the :term[Idea]{canonical="a Idea"} available within those specific partitions, enabling a safe workflow.

This provides two fundamental benefits:

- **Isolation**: Work on a new feature (e.g., on a `feature/new-billing` branch) doesn't interfere with the stable `main` branch. This prevents half-finished or buggy work from affecting production systems.
- **Experimentation**: Branches are cheap and easy to create. This encourages experimentation, allowing developers to discard a branch if an experiment doesn't work out, with no impact on the main system.

### The Search Path: Prioritized Retrieval

> [!DEFINITION] :term[Search Path]{canonical="Search Path"}
> An ordered list of branch names that defines the retrieval mechanism. It tells the resolver which partitions to look in, and in what order of priority, creating a cascading overlay system.

This retrieval mechanism is core to the development workflow and answers the **spatial** question. For example, a developer's typical search path might be set to `['feature/my-new-idea', 'staging', 'main']`.

This configuration creates a cascading overlay system for retrieval:

1.  First, search for a matching :term[Idea]{canonical="Idea"} in the `feature/my-new-idea` partition.
2.  If not found, search in the `staging` partition.
3.  Finally, fall back to searching in the `main` partition.

This allows a developer to see a specific, intended reality composed of their local changes seamlessly layered on top of the stable system.

### The Cutoff Time: Temporal Retrieval

> [!DEFINITION] :term[Cutoff Time]{canonical="Cutoff Time"}
> A timestamp that accompanies a resolution request, instructing the resolver to find the version of an :term[Idea]{canonical="Idea"} that was considered latest as of that specific moment in time.

The second dimension of retrieval is **temporal**. Every resolution query is performed against the state of the system as it existed at a specific moment. This is controlled by the **Cutoff Time**.

If a cutoff time is not provided, it defaults to the current time (`now()`), retrieving the most recent visible versions. However, by providing a timestamp from the past, you can perform a "time-traveling query." This instructs the resolver to find the version of an :term[Idea]{canonical="Idea"}—and all its dependencies—that was latest according to the search path at that exact moment. This capability is the technical foundation for perfect reproducibility.

> Sidenote:
>
> - :term[107: Concept/Identity]{href="./107_concept_identity.md"}

## From Model to Application

This chapter has defined the theoretical model for visibility—the mechanisms for creating different states and selecting between them. With this model in place, the final piece is the practical language for interacting with it.

The next document, :term[109: Concept/Addressing]{href="./109_concept_addressing.md"}, introduces the `idea:` URI scheme, the concrete syntax used to request a specific view and navigate this rich, versioned, and branched reality.
