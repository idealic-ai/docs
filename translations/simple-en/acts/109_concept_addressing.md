# 109: Concept/How to Address Ideas

> [!DEFINITION] :term[idea:]{canonical="idea:"}
> This is a special kind of web address used to find different versions of an :term[Idea]{canonical="Idea"}. It's like a coordinate system for our world of ideas, letting you ask for the latest version of something or get a permanent link to one specific version from the past.

> Sidenote:
> - You'll need to understand:
>   - :term[Visibility]{href="./108_concept_visibility.md"}

The :term[idea:]{canonical="idea:"} address is the language we use to navigate through all the different versions and work-in-progress copies (:term[branches]{canonical="Branch"}) of Ideas. It gives us a clear way to ask for an :term[Idea]{canonical="Idea" href="./101_concept_idea.md"} and to create permanent links that will always point to the exact same version, so our work can be perfectly repeated later.

> Sidenote:
> - The ideas of :term[Branches]{canonical="Branch" href="./108_concept_visibility.md#branches-publication-and-partitioning"} (different workspaces for a project) and the :term[Search Path]{canonical="Search Path" href="./108_concept_visibility.md#the-search-path-prioritized-retrieval"} (the order the system looks for things), which these addresses use, are explained in the :term[Visibility]{href="./108_concept_visibility.md"} chapter.

## Anatomy of an `idea:` Address

An :term[idea:]{canonical="idea:"} address is like a mailing address for an Idea, with different parts that tell the system exactly what you're looking for.

- **Scheme**: :term[idea:]{canonical="idea:"}

  This just says, "Hey, we're looking for an Idea."
- **Domain**: `//my-project.com`

  This is like the city and state. It tells you which big project or 'world' the Idea lives in. If you leave it out, it assumes you're looking within the project you're currently in.
- **Branch Specifier**: `~main/`

  Think of this as a specific desk in an office where work is being done. `main` is the main, official version, but you could have another one like `~draft/` for work-in-progress. A simple `/` at the start is a shortcut for the `~main/` desk.
- **Path**: `schemas/UserProfile`

  This is the actual name of the Idea, like a file name on a computer.
- **Version Prefix**: `?1.2`

  This is like asking for "the latest update in the 1.2 series." It’s a flexible request, not a demand for one exact version.
- **Resolved Version**: `:1.2.3`

  This is the system's reply. After you ask, it finds the *exact* version and locks it in. This part of the address means "I found version 1.2.3 exactly."
- **Fragment**: `#schema`

  This is like a bookmark that takes you to a specific section *inside* the Idea's file.

## Different Kinds of Addresses

An :term[idea:]{canonical="idea:"} address can be an 'Ask' or an 'Answer'.

1.  **Nearby Ask:** `idea:schemas/UserProfile?1.2`

    *   This asks for the best version of `UserProfile` that matches `1.2` inside the project you are currently in. The system will follow a :term[Search Path]{canonical="Search Path" href="./108_concept_visibility.md#the-search-path-prioritized-retrieval"} to find it, like checking your desk first, then the main office filing cabinet.

2.  **Specific Ask:** `idea://my-project.com/schemas/UserProfile?1.2`

    *   This is a more direct request. It asks for the Idea from a specific project (`my-project.com`), ignoring where you currently are.

3.  **Branch Ask:** `idea:~main/schemas/UserProfile` (or `idea:/schemas/UserProfile`)

    *   `~` tells the system to look in a specific :term[Branch]{canonical="Branch"} (a work-in-progress area) called `main`. It won't look anywhere else.

4.  **The Full Answer:** `idea://my-project.com/:staging/schemas/UserProfile?1.2:1.2.staging.4`

    *   This is a permanent, detailed record. It says: "I looked in the `my-project.com` world, on the `staging` branch, for something matching `?1.2`, and I found the exact version `1.2.staging.4`." You can share this link, and it will always point to that exact thing.

## How This Works for a Team

This system makes it safe for many people to work on the same project at once.

1.  **Start a New Draft**: A developer wants to work on a new feature. They create a new :term[branch]{canonical="Branch"} (a personal copy of the project) called `feature/user-onboarding-v2`. Their 'search path' is set to check their personal copy first, before checking the main project (`main`).

2.  **Build Something New**: The developer creates a new `Process` :term[Idea]{canonical="Idea" href="./101_concept_idea.md"} called `idea:processes/onboarding`. Because they are in their own personal copy, this new Idea is safely stored there and doesn't affect anyone else.

3.  **Use an Existing Part**: The new process needs to send an email. The developer just asks for `idea:activities/send-email`. The system first looks in their personal copy. It doesn't find it, so it looks in the `main` project and finds the official, stable version.

4.  **Change a Part**: The developer needs a special "Welcome Email" template. They make a new version of `idea:records/email-templates/welcome`. This new version is saved only in their personal `