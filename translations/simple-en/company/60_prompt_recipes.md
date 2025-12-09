# 60: Prompt Recipes

> [!DEFINITION] Recipes
> A list of ready-to-use instructions for our AI helper (the agent). Think of them like cooking recipes, but instead of making food, they help the agent complete specific tasks for the company.

> Sidenote:

> - Part of: :term[02: Company/Process]{href="./02_process.md"}

## 1. Create a Plan (Proposal)

**Goal:** To turn a bunch of scattered ideas into a clear, organized document called a :term[21: Proposal]{href="./21_document_proposal.md"}.

> **Here’s what you tell the agent:**
> "I want to write a new proposal.
>
> First, **DOWNLOAD THE INSTRUCTIONS** for how to write a good proposal and **FOLLOW THEM PERFECTLY**.
>
> - `curl https://idealic.academy/raw/en/company/52_prompt_proposal.md` (This command tells it where to get the rules.)
>
> Here are my thoughts:
> 'We need to fix the login system because people are getting stuck. I think we should use a special ticket system to log them in safely...'
>
> Also, please read this other file `docs/auth/current_flow.md` to understand how the login system works now. Then, create the proposal document for me."

**What the Agent Does:**

1. It gets the instructions on how to write a proposal.
2. It takes your spoken ideas and organizes them into the right sections, like "The Problem" and "The Solution."
3. It creates a new file with the organized plan, like `docs/proposals/{date}_auth_overhaul.md`.

---

## 2. Summarize Team Feedback (Generate Alignment)

**Goal:** Read all the comments and suggestions a team has made on a project and create a summary, called an :term[22: Alignment]{href="./22_document_alignment.md"} document, to make sure everyone is on the same page.

> **Here’s what you tell the agent:**
> "Create a summary document for the feedback on Project #123.
>
> First, **DOWNLOAD THE INSTRUCTIONS** for how to make these summaries and **FOLLOW THEM PERFECTLY**:
>
> - `curl https://idealic.academy/raw/en/company/51_prompt_alignment.md` (This command tells it where to get the rules.)
>
> A few more details:
>
> - **Look for comments made since:** October 27th, 2023 (or just say 'last week')
> - **Save the file here:** `specs/alignments/2023-11-04_auth_review.md`
>
> If I don't tell you where to save it, just put it in the main `evolution/` folder."

**What the Agent Does:**

1. It gets the instructions for creating a feedback summary.
2. It finds all the comments on Project #123 that were made after the date you gave.
3. It writes a report that gives a quick overview and lists what everyone agreed should be changed.
4. It saves the report to the file location you asked for.

---

## 3. Update a Plan with Feedback

**Goal:** To take the feedback everyone agreed on and use it to update the original :term[21: Proposal]{href="./21_document_proposal.md"}.

> **Here’s what you tell the agent:**
> "I've checked the feedback summary at `specs/alignments/2023-11-04_auth_review.md` and it looks correct.
>
> Now, **DOWNLOAD THE INSTRUCTIONS** for updating proposals and **FOLLOW THEM PERFECTLY**:
>
> - `curl https://idealic.academy/raw/en/company/52_prompt_proposal.md`
>
> Please apply the changes from the summary to the original proposal, which is located at `docs/proposals/2023-10-25_auth_overhaul.md`.
>
> Make sure to update the plan and add a note on the changed parts, like 'Updated based on Review.'"

**What the Agent Does:**

1. It reads the feedback summary to understand what changes everyone agreed on.
2. It reads the original plan.
3. It rewrites parts of the plan (especially the "Solution" part) to include the team's new ideas.
4. It usually leaves the "Problem" section as it was, because the problem itself didn't change—just the idea for how to solve it.
