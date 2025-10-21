# 110: Concept/Addressing

> [!DEFINITION] :term[idea:]{canonical="idea:"}
> A URI scheme for navigating the versioned, branched reality of the :term[Idea]{canonical="Idea"} ecosystem. It provides syntax for both simple, dynamic requests and fully resolved, permanent references.

> Sidenote:
>
> - Requires:
>   - :term[109: Concept/Versioning]{href="./109_concept_versioning.md"}

The `idea:` URI scheme is the language for navigating the versioned, branched reality described in the previous document. It provides a robust syntax for requesting :term[Ideas]{canonical="Idea"} and for creating permanent, reproducible links to specific, resolved versions.

## Anatomy of an `idea:` Reference

An `idea:` reference can include several components:

- **Scheme**: `idea:`
- **Domain**: An optional sovereign namespace, prefixed with `//` (e.g., `//my-project.com`). If omitted, the path is considered relative to the current namespace.
- **Branch Specifier**: An optional, explicit branch target (e.g., `~main/`). A leading `/` is shorthand for `~main/`.
- **Path**: The textual identifier of the :term[Idea]{canonical="Idea"} (e.g., `schemas/UserProfile`).
- **Version Prefix**: An optional version constraint (e.g., `?1.2`).
- **Resolved Version**: In a resolved reference, the exact version found (e.g., `:1.2.3`).
- **Fragment**: A pointer to a specific part of the :term[Idea]{canonical="Idea"} (e.g., `#schema`).

## Reference States

An `idea:` reference can exist in several states:

1.  **Relative Request (The "Ask"):** `idea:schemas/UserProfile?1.2`
    - This asks for the latest version of `UserProfile` compatible with the `1.2` prefix, resolved against the :term[Search Path]{canonical="Search Path"} within the **current sovereign namespace**.

2.  **Absolute Request:** `idea://my-project.com/schemas/UserProfile?1.2`
    - This is a fully-qualified request that targets a specific domain, ignoring the current namespace.

3.  **Explicit Branch Request:** `idea:~main/schemas/UserProfile` (or `idea:/schemas/UserProfile`)
    - The `~` prefix indicates an explicit **Branch** request. This ignores the :term[Search Path]{canonical="Search Path"} and targets the `main` branch directly, within the current (or specified) namespace.

4.  **Resolved Reference (The "Answer"):** `idea://my-project.com/:staging/schemas/UserProfile?1.2:1.2.staging.4`
    - This is a permanent, unambiguous record of a resolution. It shows the request was resolved within the `my-project.com` domain, on the `staging` branch, and found the exact version `1.2.staging.4`.

## A Complete Development Workflow

These concepts enable a safe and efficient workflow for parallel development.

1.  **Branching**: A developer branches `processes/onboarding` (version `1.3` on `main`) for a new feature.
    - The system creates a new version, `1.3.new-login.0`.
    - This new version is published to the `["feature/new-login"]` branch.
    - The developer's :term[Search Path]{canonical="Search Path"} is set to `['feature/new-login', 'main']`.

2.  **Developing**: While working, the developer references `idea:instructions/send-email`. The resolver, following the search path, first checks the `feature/new-login` branch, finds nothing, and falls back to the stable version on `main`.

3.  **Overriding**: The developer needs a custom email template. They fork `records/email-templates/welcome` and publish a new version to their `feature/new-login` branch. Now, their `processes/onboarding` :term[Idea]{canonical="Idea"} automatically picks up their custom template because their feature branch has top priority in their search path.

4.  **Promoting**: Once complete, the developer "promotes" their work. The :term[Idea]{canonical="Idea"} at version `1.3.new-login.2` is copied, its version is cleaned to `1.4`, and it is published to the `main` branch. It is now the new, stable version for everyone.

5.  **The Controlled Ripple Effect**: Another process was referencing `idea:processes/onboarding?1`. Because the new version `1.4` is compatible with the `?1` prefix, the next time that process is resolved, it will automatically and safely pick up the new `1.4` version. To prevent this and ensure stability, a process can "pin" its dependency by requesting a more specific version, like `?1.3`.
