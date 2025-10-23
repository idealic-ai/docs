# 109: Concept/Versioning

> [!DEFINITION] :term[Hierarchical Versioning]{canonical="Hierarchical Versioning"}
> A versioning scheme where versions are dot-separated identifiers (e.g., `1.2.feature-x.3`) that unify the concepts of linear releases, branches, and drafts into a single, hierarchical structure.

> Sidenote:
>
> - Requires:
>   - :term[107: Concept/Identity]{href="./107_concept_identity.md"}
> - Enables:
>   - :term[110: Concept/Addressing]{href="./110_concept_addressing.md"}

Any evolving system faces two fundamental challenges: managing change (versioning) and enabling parallel work (branching). This document describes a unified model where these two concepts are deeply intertwined, creating a safe and flexible environment for development and experimentation.

## The Anatomy of Identity: Hierarchical Versions

An :term[Idea]{canonical="Idea"}'s identity in this advanced model consists of its **`path`** (a textual identifier, like `articles/common/button`) and its **`version`**. A version is not just a simple number; it's a rich, dot-separated hierarchy that tells the story of an :term[Idea]{canonical="Idea"}'s evolution. A fully-qualified identity also includes a **domain** (e.g., `my-project.com`), establishing a sovereign namespace in which the path resides.

For example, a version like `1.2.feature-x.3` tells us this is the third revision of a `feature-x` branch that was created from version `1.2`. This structure elegantly combines traditional versioning with branching capabilities.

> A version is a hierarchical identifier like `1.2.feature-x.3` that captures the :term[Idea]{canonical="Idea"}'s lineage and state.

## The Anatomy of Visibility: Branches & Search Paths

While the version represents the state and history of an :term[Idea]{canonical="Idea"}, the branching model determines where and how it can be seen. This operates through two complementary concepts: Branches and the Search Path.

### Branches: The "Where"

Every :term[Idea]{canonical="Idea"} version in the database is associated with one or more **Branches** (e.g., `["main", "feature/new-billing"]`). These branches act as channels that control visibility. An :term[Idea]{canonical="Idea"} is only visible to a user or process if it is published to at least one of the branches included in their request's search path.

### The Search Path: The "How"

The system's real power comes from the **Search Path**. This is an ordered list of branch names that tells the resolver where to look for an :term[Idea]{canonical="Idea"}, and in what order of priority. A typical search path during development might be: `['feature/my-new-idea', 'staging', 'main']`

This configuration creates a cascading overlay system:

1.  First, look for an :term[Idea]{canonical="Idea"} published to the `feature/my-new-idea` branch.
2.  If not found, look for one published to the `staging` branch.
3.  Finally, fall back to an :term[Idea]{canonical="Idea"} published to the `main` branch.

This allows a developer to see a complete, functional environment composed of their specific changes layered on top of the shared, stable system, without needing to duplicate every :term[Idea]{canonical="Idea"}.

> Visibility is controlled by branches, which define where an :term[Idea]{canonical="Idea"} is visible.
> The Search Path (`['feature-x', 'main']`) is a prioritized list that tells
> the resolver where to look and in what order. This creates a seamless overlay,
> showing branched work on top of the stable system.

## Version Evolution

Versions consist of revisions, which can be **integer revisions** for sequential, public versions (like `1.2`) or **branched revisions** for named development lines (like `feature-x`). They evolve in two main ways:

- **Compatible Changes**: A non-breaking edit creates a new minor revision (e.g., `1.2` becomes `1.2.1`).
- **Incompatible Changes**: A breaking change must "bubble up" to a higher level of the version hierarchy. A change that breaks compatibility with `1.2` would create a new version `1.3`. The system automatically detects these incompatibilities by analyzing schema changes, ensuring version numbers accurately reflect true compatibility boundaries without manual guesswork.
