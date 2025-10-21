# 109: Naming and Finding Ideas

> [!DEFINITION] :term[idea:]{canonical="idea:"}
> A special kind of web address used to find different versions and drafts of an :term[Idea]{canonical="Idea"}. It's a way to both ask for an Idea and to create a permanent link to a specific version you've found.

> Sidenote:
> - You'll need to understand:
>   - :term[Visibility]{href="./108_concept_visibility.md"}

The :term[idea:]{canonical="idea:"} address system is how you navigate all the different versions and works-in-progress we talked about before. It gives you a clear way to ask for :term[Ideas]{canonical="Idea" href="./101_concept_idea.md"} and to make permanent links to the exact versions you find, so they can always be found again.

> Sidenote:
> The ideas of :term[Branches]{canonical="Branch" href="./108_concept_visibility.md#branches-publication-and-partitioning"} and the :term[Search Path]{canonical="Search Path" href="./108_concept_visibility.md#the-search-path-prioritized-retrieval"}—the things these addresses help you navigate—are explained in the :term[Visibility]{href="./108_concept_visibility.md"} chapter.

## The Parts of an `idea:` Address

An :term[idea:]{canonical="idea:"} address is made of several pieces:

- **Scheme**: :term[idea:]{canonical="idea:"}
- **Domain**: This is like the main website address (e.g., `//my-project.com`). It tells you which big collection of Ideas to search in. If you leave it out, you're searching in the collection you're already in.
- **Branch Specifier**: This is like choosing a specific draft (e.g., `~main/`). The `main` branch is usually the finished, official version. A slash (`/`) at the beginning is a shortcut for the `main` branch.
- **Path**: This is the name of the :term[Idea]{canonical="Idea" href="./101_concept_idea.md"} you're looking for (e.g., `schemas/UserProfile`).
- **Version Prefix**: This lets you ask for a specific version, like asking for a book from the 1st edition (e.g., `?1.2`). It asks for any version *starting with* 1.2.
- **Resolved Version**: When the system finds the exact version, it adds it to the address so the link is permanent (e.g., `:1.2.3`).
- **Fragment**: This points to a specific part inside the :term[Idea]{canonical="Idea" href="./101_concept_idea.md"} (e.g., `#schema`), like a bookmark to a specific chapter.

## Different Kinds of Addresses

An :term[idea:]{canonical="idea:"} address can be an "ask" or an "answer."

1.  **A Local Ask:** `idea:schemas/UserProfile?1.2`
    - This says, "Find me the latest version of `UserProfile` that matches version `1.2`, looking in the project I'm currently in."

2.  **An Ask for a Specific Place:** `idea://my-project.com/schemas/UserProfile?1.2`
    - This is a more direct ask. It says, "Go to the `my-project.com` collection and find the `UserProfile` Idea that matches version `1.2`."

3.  **An Ask for a Specific Draft:** `idea:~main/schemas/UserProfile` (or `idea:/schemas/UserProfile`)
    - This tells the system to look *only* in the `main` :term[Branch]{canonical="Branch"} for the `UserProfile` Idea, ignoring other drafts.

4.  **The Answer:** `idea://my-project.com/:staging/schemas/UserProfile?1.2:1.2.staging.4`
    - This is a permanent link. It's like a receipt that says, "I looked for an Idea in the `my-project.com` collection, on the `staging` draft, and I found the exact version `1.2.staging.4`."

## How This Works Step-by-Step

This system makes it safe for many people to work on the same project at once.

1.  **Make a New Draft**: A programmer starts by making a new :term[branch]{canonical="Branch"} called `feature/user-onboarding-v2`. This is their private workspace. The system knows to first look for things in this new branch, and if it can't find them, to look in the official `main` branch.

2.  **Create a New Thing**: The programmer builds a new process called `idea:processes/onboarding`. Because they are working in their private branch, this new Idea and all its versions are saved there, not in the main project.

3.  **Use an Existing Tool**: Their new process needs to send an email. They use an existing tool with the address `idea:activities/send-email`. The system first checks their private branch. It's not there, so it looks in the `main` branch and finds the official version to use.

4.  **Change a Tool**: The programmer needs a special "Welcome Email" that's different from the official one. They create a new version of `idea:records/email-templates/welcome` and save it. It gets saved to their private `feature/user-onboarding-v2` branch. Now, their project will find and use *their* special version first, without changing the official one in the `main` branch.

5.  **Publishing the Changes**: When the new feature is finished, the programmer "promotes" their work. The Idea from their branch is copied, given a new, clean version number like `1.4`, and published to the `main` branch. It's now the new official version for everyone.

6.  **Automatic, Safe Updates**: Imagine another part of the project was asking for `idea:processes/onboarding?1` (any version starting with 1). The next time it runs, it will automatically find and use the new, improved version `1.4`. If you don't want it to update automatically, you can "pin" it by asking for a more specific version, like `?1.3`.