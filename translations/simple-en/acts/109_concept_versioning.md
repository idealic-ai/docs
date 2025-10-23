# 109: Concept/Versioning

> [!DEFINITION] [Hierarchical Versioning](../../acts/000_glossary.md)
> A way of labeling versions using numbers and words separated by dots (like `1.2.new-feature.3`). This single system combines official releases, experimental copies (branches), and early drafts into one organized structure.

> Sidenote:
> - Requires:
>   - :term[107: Concept/Identity]{href="./107_concept_identity.md"}
> - Leads to:
>   - :term[110: Concept/Addressing]{href="./110_concept_addressing.md"}

Any project that grows over time has two big challenges: how to keep track of changes (versioning) and how to let people work on different things at the same time without causing a mess (branching). This document explains a system where these two ideas are connected, creating a safe and easy way to build and experiment.

## The Anatomy of Identity: Hierarchical Versions

In this system, every :term[Idea]{canonical="Idea"} has a unique identity made of two parts: its **`path`** (a name like `articles/common/button`) and its **`version`**. The version isn't just a simple number; it's a series of steps separated by dots that tells the story of how the :term[Idea]{canonical="Idea"} has changed over time. The full identity also includes a **domain** (like `my-project.com`), which is like a home address for the :term[Idea]{canonical="Idea"}.

For example, a version like `1.2.feature-x.3` tells us a story: this is the third try (`.3`) of a special project named `feature-x`, which was based on the official version `1.2`. This structure neatly combines regular versioning with the ability to create experimental copies.

> A version is like a family tree for an :term[Idea]{canonical="Idea"}, such as `1.2.feature-x.3`, showing where it came from and what state it's in.

## The Anatomy of Visibility: Branches & Search Paths

While the version tells you what an :term[Idea]{canonical="Idea"} is, the branching system decides who gets to see it. This works using two related concepts: Branches and the Search Path.

### Branches: The "Where"

Every version of an :term[Idea]{canonical="Idea"} is assigned to one or more **Branches** (for example, `["main", "feature/new-billing"]`). Think of branches like different TV channels. An :term[Idea]{canonical="Idea"} is only visible if the person looking for it is tuned into one of the channels it's broadcast on.

### The Search Path: The "How"

The real power of this system is the **Search Path**. This is a list of branch names, in order of importance, that tells the system where to look for an :term[Idea]{canonical="Idea"}. For someone working on a new feature, their search path might look like this: `['feature/my-new-idea', 'staging', 'main']`

This creates a smart layering system, like stacking clear sheets of plastic on top of each other:

1.  First, the system looks for an :term[Idea]{canonical="Idea"} on the `feature/my-new-idea` channel (your personal changes).
2.  If it's not there, it looks on the `staging` channel (a shared test version).
3.  Finally, it falls back to looking on the `main` channel (the official, stable version).

This lets a developer see a complete and working project that includes their unique changes layered on top of the stable system, without having to copy everything.

> Visibility is controlled by branches, which decide where an :term[Idea]{canonical="Idea"} can be seen.
> The Search Path (like `['feature-x', 'main']`) is a priority list that tells
> the system where to look first. This creates a seamless overlay, showing your
> experimental work on top of the stable project.

## Version Evolution

Versions are made up of steps. These can be **number steps** for public, official versions (like `1.2`) or **named steps** for development work (like `feature-x`). Versions change in two main ways:

- **Compatible Changes**: A small, safe edit creates a new step at the end (for example, `1.2` becomes `1.2.1`).
- **Incompatible Changes**: A big, "breaking" change has to start a new, higher-level version. A change that breaks how `1.2` works would create a new version `1.3`. The system can automatically spot these breaking changes by looking at how the :term[Idea]{canonical="Idea"}'s structure has been altered, so version numbers always reflect how compatible things truly are without anyone having to guess.