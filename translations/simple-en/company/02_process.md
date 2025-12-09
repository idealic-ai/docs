# 02: How We Work Together

> [!DEFINITION] Our Team's Plan
> This is our official guide for turning big ideas into real things we can use. It's a system where everyone shares responsibility, we build things in small steps, and we talk to each other constantly to stay on the same page.

> Sidenote:
> - Related to: :term[00: Company/Truth]{href="./50_prompt_truth.md"}

We're at a point where just exploring ideas isn't enough. To actually build, discover, and make progress, we need a clear plan that everyone follows.

## 1. The Vision

Our main belief is simple: **If we have a perfect plan, building it is the easy part.**

Right now, we're still manually turning our documents into code and presentations, but we're also building the tools to make that happen automatically. The **Plan** (which we call a **Specification**) is the single source of truth for everyone. **When everyone has the same, correct plan, building becomes straightforward and nobody needs to be micromanaged.**

Once a new idea (a **Proposal**) is approved, the person building it enters a phase of **Creative Freedom**. The engineer is free to solve the problem in the best way they can think of, as long as they stay within the boundaries of the approved **Specification** and the to-do list created from it.

**This is really important: we never edit the main plan directly.** You must go through the **Proposal** process first. It's how we make sure every change is thought through properly.

> [!DANGER] NO WORK WITHOUT APPROVAL
> Do not start building things (like writing code or designing screens) until the **Proposal** for it has been approved.
>
> - **Fail Fast with Ideas:** It’s easy and cheap to rewrite a sentence in a plan. It’s hard and expensive to rewrite a thousand lines of code or redo an entire presentation.
> - **Start with the Big Picture:** First, we agree on *why* we're doing something. We solve the main goal before getting lost in the tiny details.

## 2. The Documents We Use

We use three different types of documents to keep our work organized, safe, and clear.

### :term[20: Specification]{href="./20_document_spec.md"} (The Master Blueprint)

This is the final, official document. It’s the detailed, always-updated blueprint of our entire system. It is the only source of truth.

- **It Must Be True:** It follows the strict rules we set in our guide for :term[00: Company/Truth]{href="./50_prompt_truth.md"}. Everything in it must be clear and complete.
- **Correctness Before Speed:** This isn't a rough draft. The Master Blueprint must be perfectly correct. It's better to leave something out than to write down the wrong information.
- **The Map:** It shows everyone *where we are going*. It helps every team member see the big picture without needing to memorize the entire plan.
- **Handles Big Ideas:** When a system gets really big and complicated, no one can hold it all in their head. The Blueprint lets us grow the system without losing track of how it all fits together.
- **Always Updated:** This is the absolute **Source of Truth for the System** (what we code, what we present, and how we build).

### :term[21: Proposal]{href="./21_document_proposal.md"} (The Idea Sketch)

This is a temporary document where we sketch out a new idea or a change we want to make. It lets us explore new things safely without messing up the Master Blueprint.

- **Creates the To-Do List:** This document is where our engineering tasks come from. It is the **Source of Truth for a New Idea** (and for our task manager, Jira).
- **Separates 'What' from 'How':** It separates the idea itself (“What we want to do”) from the details of building it (“How we will do it”). This lets us discuss whether an idea is good without getting stuck on technical details too early.
- **A Safe Place to Explore:** We can suggest huge, radical changes here without breaking anything. If a Proposal is rejected, all we lose is a text file.
- **Instructions for the Computer:** Our AI tools need clear instructions. This document gives the AI the context it needs to help us.

### :term[22: Alignment]{href="./22_document_alignment.md"} (The Agreement Summary)

This is an auto-generated summary of our team's discussion about an Idea Sketch. It makes sure every person's feedback is heard and all decisions are written down before we start building.

- **Organized Feedback:** It turns a long, messy conversation into a simple list of clear requirements. It cuts through the noise and saves the important stuff.
- **Shared Understanding:** It's not just a chat log. It's a document where the writer and the reviewers agree on the *new* plan that came out of their discussion.
- **Instructions for the AI:** This gives our AI helper the final, approved instructions for making the changes.
- **A Final Check:** The writer uses this document to double-check that the AI (and the team) completely understands the feedback before moving on.
- **Temporary:** We only use this document once to get everyone to agree. It's the **Source of Truth for the Review**, but we **never save it** permanently.

## 3. How We Agree on Things

We don't just 