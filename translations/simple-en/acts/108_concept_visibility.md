# 108: Concept/Visibility

> [!DEFINITION] :term[Visibility]{canonical="Visibility"}
> This is the set of rules that decides which version of an :term[Idea]{canonical="Idea"} you get to see in any situation. It figures this out by looking at the :term[Idea]{canonical="Idea"}'s history, which work-in-progress version it belongs to, and the search order you’ve set up.

> Sidenote:
> - You should know about:
>   - :term[107: Concept/Identity]{href="./107_concept_identity.md"}
> - This helps you understand:
>   - :term[109: Concept/Addressing]{href="./109_concept_addressing.md"}

For a system full of connected and changing :term[Ideas]{canonical="Idea" href="./101_concept_idea.md"}, we need a clear and predictable way to know which version of an :term[Idea]{canonical="Idea" href="to ./101_concept_idea.md"} we're looking at. This document explains the two-part system that controls this **visibility**: first, the versioning system that creates all the possible versions of an :term[Idea]{canonical="Idea" href="./101_concept_idea.md"}, and second, the selection tool that picks which one you actually see.

## Versioning: Creating the Versions to Be Seen

Before you can see a version, it has to be created. :term[Hierarchical Versioning]{canonical="Hierarchical Versioning"} is how we create and keep track of all the different states of an :term[Idea]{canonical="Idea" href="./101_concept_idea.md"} over time. A version isn't just a number; it's a story of how the :term[Idea]{canonical="Idea" href="./101_concept_idea.md"} has grown, told with numbers separated by dots.

Versions can be **number-based** for public releases (like `1.2`) or **name-based** for experiments (like `feature-x`). For example, a version like `1.2.feature-x.3` tells us this is the third try of the `feature-x` experiment, which started from version `1.2`.

The rules for changing a version are:

- **Small Changes (Compatible)**: A safe update that can replace the old version without causing problems. Think of fixing a typo or adding a new note. This creates a new small version (e.g., `1.2` becomes `1.2.1`).
- **Big Changes (Breaking)**: A change that is not compatible with the old version. This usually happens when you remove or change a key part of the :term[Idea]{canonical="Idea"}'s structure. This requires a bigger version jump (e.g., a breaking change to `1.2` would create `1.3`). The system can automatically spot these kinds of big changes.

## Selection: Choosing Which Version to See

Now that we have a rich history of versions, we need a way to pick the right one. This is done by separating how an :term[Idea]{canonical="Idea" href="./101_concept_idea.md"} is saved from how it is looked up. The lookup process has two parts: **where** to look (which folder or partition) and **when** to look (at what point in time).

### Branches: Saving and Separating Ideas

> [!DEFINITION] :term[Branch]{canonical="Branch"}
> A name tag that creates a separate, parallel space for an :term[Idea]{canonical="Idea"}. It’s like having a different copy of a project where you can experiment safely. When you save an :term[Idea]{canonical="Idea"} to a :term[branch]{canonical="Branch"}, you are publishing it to that space.

For example, every version of an :term[Idea]{canonical="Idea" href="./101_concept_idea.md"} is tagged with one or more :term[branches]{canonical="Branch"}, like `["main", "feature/new-billing"]`. This makes the :term[Idea]{canonical="Idea" href="./101_concept_idea.md"} available in those specific spaces.

This gives us two huge advantages:

- **Safety**: Work on a new feature (in a :term[branch]{canonical="Branch"} called `feature/new-billing`) won't mess up the stable, main version in the `main` :term[branch]{canonical="Branch"}. This keeps messy or unfinished work away from the finished product.
- **Freedom to Experiment**: It's super easy and free to create :term[branches]{canonical="Branch"}. This encourages people to try new things. If an experiment doesn't work out, you can just delete the :term[branch]{canonical="Branch"}, and it's like it never happened.

### The Search Path: Your Custom View

> [!DEFINITION] :term[Search Path]{canonical="Search Path"}
> An ordered list of :term[branch]{canonical="Branch"} names. It tells the system where to look for an :term[Idea]{canonical="Idea"}, and in what order. It's like a custom filter that layers different versions on top of each other.

This lookup tool is the key to the whole workflow and answers the **where** question. For example, a developer might set their :term[search path]{canonical="Search Path"} to `['feature/my-new-idea', 'staging', 'main']`.

This setup creates a cascading search order:

1.  First, look for the :term[Idea]{canonical="Idea" href="./101_concept_idea.md"} in my personal `feature/my-new-idea` :term[branch]{canonical="Branch"}.
2.  If it's not there, check the `staging` :term[branch]{canonical="Branch"} (a shared test area).
3.  Finally, if it's not in either of those, get the official version from the `main` :term[branch]{canonical="Branch"}.

This lets a developer see their own changes layered perfectly on top of the stable system, creating a custom view of reality.

### The Cutoff Time: Looking into the Past

> [!DEFINITION] :term[Cutoff Time]{canonical="Cutoff Time"}
> A timestamp that you can add to a request. It tells the system to find the version of an :term[Idea]{canonical="Idea"} that was the latest at that exact moment in the past.

The second part of looking up an :term[Idea]{canonical="Idea"} is **when**. Every search happens as if it were at a specific moment in time. This is controlled by the :term[Cutoff Time]{canonical="Cutoff Time"}.

If you don't provide a :term[cutoff time]{canonical="Cutoff Time"}, the system just uses the current time, giving you the newest versions. But if you give it a timestamp from last Tuesday, you can do a "time-traveling search." The system will find the version of an :term[Idea]{canonical="Idea" href="./101_concept_idea.md"}—and everything it connects to—that was considered the latest according to your :term[search path]{canonical="Search Path"} at that exact moment. This ability to perfectly recreate the past is incredibly powerful.

> Sidenote:
> - :term[107: Concept/Identity]{href="./107_concept_identity.md"}

## From Rules to Reality

This chapter explained the rules for **visibility**—how different versions of an :term[Idea]{canonical="Idea"} are created and how the system picks which one to show you. With these rules in place, the last step is learning how to actually use them.

The next document, :term[109: Concept/Addressing]{href="./109_concept_addressing.md"}, introduces the `idea:` address format. It’s the language you use to ask for a specific :term[Idea]{canonical="Idea"} and navigate this rich world of versions and :term[branches]{canonical="Branch"}.
