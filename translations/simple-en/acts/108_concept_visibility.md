# 108: Concept/Visibility

> [!DEFINITION] What is :term[Visibility]{canonical="Visibility"}?
> It’s the set of rules that decides which version of an :term[Idea]{canonical="Idea"} you see at any given time. Think of it like a movie director choosing which take of a scene to show you. The choice depends on the :term[Idea]{canonical="Idea"}'s history, where it’s being worked on, and how you’re asking to see it.

> Sidenote:
> - Needs to be read after:
>   - :term[107: Concept/Identity]{href="./107_concept_identity.md"}
> - Helps you understand:
>   - :term[109: Concept/Addressing]{href="./109_concept_addressing.md"}

When you have a system full of interconnected :term[Ideas]{canonical="Idea"} that are always changing, you need a clear way to know which version of an :term[Idea]{canonical="Idea"} you're looking at. This is called **visibility**. This document explains the two-part system that controls this: first, how different versions of an :term[Idea]{canonical="Idea"} are created, and second, how the system chooses which one to show you.

## Versioning: Creating the Different Takes

Before you can see a version, it has to exist. We use a system called **Hierarchical Versioning** to create and keep track of all the different states of an :term[Idea]{canonical="Idea"} as it changes over time. A version isn't just a simple number; it's like a family tree, using dots to tell the story of how an :term[Idea]{canonical="Idea"} has grown.

Versions are made of **integer revisions** for official, public releases (like version `1.2`) and **branched revisions** for separate creative projects (like `feature-x`). For example, a version like `1.2.feature-x.3` tells you, "This is the third change made on the `feature-x` project, which itself started from version `1.2`."

The rules for changing a version are:

- **Compatible Changes**: If you make a small change that doesn't break how older things work with it (like adding a new optional feature), you create a new minor version. For example, `1.2` becomes `1.2.1`.
- **Incompatible Changes**: If you make a big change that breaks things for older versions (like removing a feature or changing how it works), it's a bigger deal. The change has to "bubble up" to a more important part of the version number. So, a breaking change to version `1.2` would create a new version, `1.3`. The cool part is that the system automatically figures out when a change is breaking, so you don't have to guess.

## Selection: Choosing Which Take to Show

Now that we have all these different versions, we need a way to choose the right one. This is done by keeping two things separate: how an `Idea` is shared (published) and how it is looked for (retrieved). Looking for an `Idea` has two dimensions: **where** to look (which creative space) and **when** to look (at what point in time).

### Branches: Creative Spaces for Your Work

> [!DEFINITION] What is a :term[Branch]{canonical="Branch"}?
> A :term[Branch]{canonical="Branch"} is like a separate workbook or a parallel universe for your :term[Ideas]{canonical="Idea"}. It lets you experiment in an isolated space. When you put an :term[Idea]{canonical="Idea"} into a branch, you are "publishing" it to that space.

For example, every version of an :term[Idea]{canonical="Idea"} is tagged with one or more branches, like `["main", "feature/new-billing"]`. This makes the :term[Idea]{canonical="Idea"} available inside those specific spaces, which is a very safe way to work.

This gives us two big advantages:

- **Isolation**: You can work on a new feature in a `feature/new-billing` branch without messing up the stable, public `main` branch. This keeps your experiments from breaking the finished product.
- **Experimentation**: Branches are easy and free to make. This encourages you to try new things. If an experiment doesn't work out, you can just throw away the branch, and it won't affect anything else.

### The Search Path: Your Custom Map

> [!DEFINITION] What is a :term[Search Path]{canonical="Search Path"}?
> It’s an ordered list of branch names that tells the system where to look for an :term[Idea]{canonical="Idea"}, and in what order. It works like a treasure map with a series of clues, telling you, "Look here first, then here, then here."

This is the "where" part of looking for an :term[Idea]{canonical="Idea"}. For instance, a developer might set their search path to `['feature/my-new-idea', 'staging', 'main']`.

This creates a waterfall effect for finding :term[Ideas]{canonical="Idea"}:

1.  First, the system looks for the :term[Idea]{canonical="Idea"} in the developer's personal `feature/my-new-idea` space.
2.  If it’s not there, it looks in the `staging` space (a place for testing).
3.  Finally, if it's still not found, it looks in the official `main` space.

This lets a developer see their own changes mixed in perfectly with the stable, shared system.

### The Cutoff Time: The Time Machine

> [!DEFINITION] What is a :term[Cutoff Time]{canonical="Cutoff Time"}?
> It's a timestamp you can include when you ask for an :term[Idea]{canonical="Idea"}. It tells the system, "Show me the version of this :term[Idea]{canonical="Idea"} that was considered the latest at this exact moment in the past."

The second part of looking for an :term[Idea]{canonical="Idea"} is "when." Every search happens against the system's state at a particular moment. This is controlled by the **Cutoff Time**.

If you don't provide a time, it just uses the current time (`now()`), showing you the newest versions. But if you give it a timestamp from the past, you can do a "time-traveling search." The system will then find the version of an :term[Idea]{canonical="Idea"}—and all the other :term[Ideas]{canonical="Idea"} it's connected to—that were the latest at that specific point in time. This is the secret to being able to perfectly recreate anything from the past.

> Sidenote:
> - :term[107: Concept/Identity]{href="./107_concept_identity.md"}

## From Theory to Practice

This chapter explained the big ideas behind visibility—how we create different states of an :term[Idea]{canonical="Idea"} and how we choose which one to see. Now that we have the theory, the last piece is the actual language we use to work with it.

The next document, :term[109: Concept/Addressing]{href="./109_concept_addressing.md"}, will introduce the `idea:` address format, which is how you actually ask the system to show you a specific view of this rich, versioned, and branched world.
