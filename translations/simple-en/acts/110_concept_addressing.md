# 110: Concept/Addressing

> [!DEFINITION] :term[idea:]{canonical="idea:"}
> Think of `idea:` as a special kind of address, like a web address, but for finding things inside the world of :term[Ideas]{canonical="Idea"}. Since an :term[Idea]{canonical="Idea"} can have many different versions and even separate drafts, this address system lets you ask for exactly what you need, whether it's the latest version or a specific, permanent one.

> Sidenote:
> - You'll need to understand:
>   - :term[Visibility]{href="./108_concept_visibility.md"}

The `idea:` address system is the language we use to find our way through the world of :term[Ideas]{canonical="Idea" href="./101_concept_idea.md"}, which can have many different versions and drafts. It gives us a clear way to ask for an :term[Idea]{canonical="Idea" href="./101_concept_idea.md"} and to create permanent links that always point to the exact same version, so our work can be repeated perfectly.

> Sidenote:
> - The ideas of :term[Branches]{canonical="Branch" href="./108_concept_visibility.md#branches-publication-and-partitioning"} (different drafts) and the :term[Search Path]{canonical="Search Path" href="./108_concept_visibility.md#the-search-path-prioritized-retrieval"} (the order the system looks for things) are explained in the :term[Visibility]{href="./108_concept_visibility.md"} chapter.

## Anatomy of an `idea:` Address

An `idea:` address is built from several parts, like a mailing address:

- **Scheme**: Always starts with `idea:` to tell the computer what kind of address it is.
- **Domain**: This is like the city and state (e.g., `//my-project.com`). It tells you which big project the :term[Idea]{canonical="Idea" href="./101_concept_idea.md"} lives in. If you leave it out, the computer assumes you mean the project you're currently in.
- **Branch Specifier**: This is like pointing to a specific draft of a book (e.g., `~main/`). If you're working on a new feature, you might be in the `~feature/` draft. The main, official version is usually in `~main/`. A single `/` at the beginning is a shortcut for `~main/`.
- **Path**: This is the name of the :term[Idea]{canonical="Idea" href="./101_concept_idea.md"}, like the street address (e.g., `schemas/UserProfile`).
- **Version Prefix**: This is like asking for a book from a certain series (e.g., `?1.2`), meaning "any version that starts with 1.2."
- **Resolved Version**: Once the system finds the exact :term[Idea]{canonical="Idea" href="./101_concept_idea.md"}, it gives you back the full version number, like the book's exact edition number (e.g., `:1.2.3`).
- **Fragment**: This points to a specific chapter or paragraph inside the :term[Idea]{canonical="Idea" href="./101_concept_idea.md"} (e.g., `#schema`).

## Different Kinds of Addresses

An `idea:` address can be used in a few different ways:

1.  **A Simple Request ("The Ask"):** `idea:schemas/UserProfile?1.2`
    - This is like asking a librarian, "In our current library, please find me the latest book on 'UserProfile' from the 1.2 series." The librarian will check the different sections (your personal drafts first, then the main collection) to find the best match.

2.  **A Specific Request:** `idea://my-project.com/schemas/UserProfile?1.2`
    - This is more specific. It's like saying, "Go to the 'my-project.com' library specifically and find the 'UserProfile' book from the 1.2 series." It doesn't matter what library you're currently in; you're telling it exactly where to go.

3.  **A Draft-Specific Request:** `idea:~main/schemas/UserProfile` (or `idea:/schemas/UserProfile`)
    - This tells the librarian to look *only* in the 'main' draft and ignore any other drafts or personal copies. It's a way to make sure you get the official version.

4.  **A Permanent Link ("The Answer"):** `idea://my-project.com/:staging/schemas/UserProfile?1.2:1.2.staging.4`
    - This is what the librarian gives you back. It's a permanent record saying: "For your request, I went to the `my-project.com` library, looked in the `staging` draft, and found the exact version `1.2.staging.4`." You can use this link forever, and it will always point to that exact thing.

## How This Works Day-to-Day

This system makes it safe and easy for many people to work on the same project at once.

1.  **Start a New Draft**: A programmer wants to add a new feature. They create a new draft (a :term[branch]{canonical="Branch"}) called `feature/user-onboarding-v2`. The system knows to look for things in this draft first, and then in the main `main` draft if it can't find them.

2.  **Build Something New**: The programmer creates a new :term[Idea]{canonical="Idea" href="./101_concept_idea.md"} called `idea:processes/onboarding`. Because they are working in their special draft, this new :term[Idea]{canonical="Idea" href="./101_concept_idea.md"} is saved there. They can change it as much as they want without affecting the main project.

3.  **Use Existing Parts**: Their new process needs to send an email. They ask for `idea:activities/send-email`. The system first looks in their `feature/user-onboarding-v2` draft. It's not there, so it automatically checks the `main` draft and finds the standard, working version.

4.  **Change an Existing Part**: The programmer needs a special "Welcome Email" template. They make a copy of the existing one (`idea:records/email-templates/welcome`) and change it. This new, custom version is saved only in their `feature/user-onboarding-v2` draft. Now, when their new process asks for the welcome template, the system finds their custom version first and uses it. The original one in the `main` draft is safe and unchanged.

5.  **Merge into the Main Project**: When the feature is finished, the programmer merges their work. The system copies their finished :term[Idea]{canonical="Idea" href="./101_concept_idea.md"}, cleans up the version number (e.g., from `1.3.new-login.2` to a clean `1.4`), and publishes it to the `main` draft for everyone else to use.

6.  **Automatic, Safe Updates**: Imagine another part of the project was asking for `idea:processes/onboarding?1` (any version starting with 1). Now that the new version `1.4` is available, this other part will automatically start using it next time it runs. This is great for staying up-to-date. If a programmer wants to prevent this and stick to an older version for stability, they can be more specific, like `?1.3`, to "pin" it to that version.
