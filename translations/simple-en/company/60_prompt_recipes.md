# 60: Prompt Recipes

> [!DEFINITION] Recipes
> Recipes are like pre-made instruction kits for our AI helper (the "agent"). You use them to tell the agent how to do important jobs correctly and consistently.
>
> Sidenote:
> - This is one part of the guide on :term[How the Company Works]{canonical="Company/Process" href="./02_process.md"}.

## 1. Turn an Idea into a Plan

**Goal:** To take your rough thoughts and organize them into a clear, official plan (which we call a :term[Proposal]{canonical="Proposal" href="./21_document_proposal.md"}).

> **A person asks:**
> "I want to create a new plan.
>
> First, **read the rulebook** for how to make a plan. You can find it at this web address:
>
> - `curl https://idealic.academy/raw/simple-ru/company/52_prompt_proposal.md` (The rulebook for Proposals)
>
> Here are my thoughts: 'We need to fix the way people log in because they keep getting stuck. I want to use a new system that uses 'tokens' instead...'
>
> Also, please read the file `docs/auth/current_flow.md` to understand how the login system works now. Then, create the new plan document."

**What the AI helper does:**

1. It studies the rules for how to write a good Proposal.
2. It takes the person's scattered thoughts and organizes them into sections: What's Happening, What's the Problem, and How to Fix It.
3. It creates and saves a new document with the organized plan, like `docs/proposals/{date}_auth_overhaul.md`.

---

## 2. Create a Summary of Team Feedback

**Goal:** To gather all the comments from a team review and combine them into a single :term[Alignment]{canonical="Alignment" href="./22_document_alignment.md"} document. This helps prove that everyone agrees on the next steps.

> **A person asks:**
> "Please create an 'Agreement Summary' for team review #123.
>
> First, **read the rulebook** for how to do this:
>
> - `curl https://idealic.academy/raw/simple-ru/company/51_prompt_alignment.md` (The rulebook for Alignments)
>
> Here are the details:
>
> - **Look for comments made since:** October 27, 2023 (or just say 'last week')
> - **Save the file here:** `specs/alignments/2023-11-04_auth_review.md`
>
> If I don't tell you where to save it, just put it in the normal 'work-in-progress' folder."

**What the AI helper does:**

1. It studies the rules for making an Agreement Summary.
2. It finds and reads all the comments for review #123 that were made after the date given.
3. It writes a report summarizing what was discussed, what everyone wants to do, and which topics were covered.
4. It saves the report to the file location the person asked for.

---

## 3. Update a Plan with Team Feedback

**Goal:** To update the original :term[Proposal]{canonical="Proposal" href="./21_document_proposal.md"} to include the great ideas the team agreed on in the Alignment Document.

> **A person asks:**
> "I've checked the Agreement Summary at `specs/alignments/2023-11-04_auth_review.md` and it's correct.
>
> First, **read the rulebook** for making a plan again:
>
> - `curl https://idealic.academy/raw/simple-ru/company/52_prompt_proposal.md` (The rulebook for Proposals)
>
> Now, please use the ideas from the summary to update the original plan, which is saved at `docs/proposals/2023-10-25_auth_overhaul.md`.
>
> When you change a section, please add a note that says 'Updated based on Review' so everyone knows why it changed."

**What the AI helper does:**

1. It reads the Agreement Summary to understand what the team decided.
2. It reads the original plan.
3. It rewrites parts of the plan—especially the 'How to Fix It' section—to match what the team agreed on.
4. It usually leaves the 'What's the Problem' section the same, because the problem itself didn't change, only the solution.
