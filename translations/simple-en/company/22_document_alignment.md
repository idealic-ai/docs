# 22: Company/Alignment

> [!DEFINITION] Alignment Document
> A summary that a computer creates automatically after a team review. It brings together everyone's shared agreements, solved problems, and the exact steps to take next.
>
> Sidenote:
> - Part of: :term[02: Company/Process]{href="./02_process.md"}
> - Made by: :term[51: Prompt/Alignment]{href="./51_prompt_alignment.md"}
> - Comes before: Updating the :term[20: Company/Specification]{href="./20_document_spec.md"}

## 1. The Core Idea

The Alignment Document is like a **contract** or a final handshake. It summarizes all the comments and decisions made when the team reviewed a new idea (a :term[21: Proposal Document]{href="./21_document_proposal.md"}).

It's also **disposable**. Think of it like scratch paper. Its job is to filter a messy conversation down to a clean to-do list of **Intents**. This list works like a quick **test** to check a couple of things:

- Did we correctly understand all the feedback?
- Is our plan for what to do next perfectly clear?

If the Alignment Document is accurate, the original author uses it to help them **automatically update** the Proposal Document with the team's changes.

> [!WARNING] DO NOT EDIT MANUALLY & DO NOT COMMIT
> A computer creates this document. If it's wrong or doesn't quite get what the team meant, **do not edit it**. Instead, add more comments to the team discussion to make things clearer, and then ask the computer to **create the document again**. This makes sure the computer fully understands what's going on.
>
> **DO NOT SAVE THIS FILE** to the project's main history. It's just a temporary tool for the author and the computer to check their understanding. Only the main Proposals and Specifications are saved permanently.

## 2. Why We Need It

Why do we have the computer create this document?

- **To Test Understanding:** It proves that the team and the AI are on the same page. If the AI can't summarize the agreement correctly, it means the humans weren't clear enough.
- **For a Quick Self-Check:** It lets the author quickly check that the computer (and by extension, the team) understood all the feedback before they start making changes.
- **To Find the Important Stuff:** It turns a long, threaded conversation into a simple list of instructions. It cuts out the noise and keeps the important signals.
- **To Instruct the Computer:** It gives the AI a verified, final set of instructions for making the changes.

## 3. How It Works

1.  **Discussion:** The team discusses a new idea (the :term[21: Company/Proposal]{href="./21_document_proposal.md"}) in a shared review space.
2.  **Creation:** An AI agent reads all the comments and creates the Alignment Document (This takes about 5 minutes).
3.  **Review (Self-Test):** The original author reads the AI's list of tasks.
    - _Did it capture all the feedback?_
    - _Is the plan for fixing it correct?_
4.  **Updating:** The author uses the checked Alignment Document to update the :term[21: Company/Proposal]{href="./21_document_proposal.md"}. This keeps the main Proposal document as the one true source of the plan.
5.  **Sign-Off:** When the author marks the review as ready, it means "We all agree." The Alignment Document can now be thrown away, and the final changes are saved to the main project files.

## 4. What's Inside

The Alignment Document (the review summary) includes:

- **Overview:** A quick summary of the discussion (what people agreed on, disagreed on, and any cool new ideas).
- **List of Intents:** A list of small, specific jobs that came from the comments.
- **Coverage Report:** A checklist proving that every single comment was read and turned into a task, so nothing gets lost.
- **AI's Opinion:** A fair analysis from the AI about the quality of the team's idea and how well they discussed it.

## 5. Key Qualities

- **Time:** It takes about 5 minutes for the AI to create it.
- **Job:** It's a quick test and a guide for updating the main Proposal.
- **Lifespan:** It's temporary / for one-time use (like a note you throw away).
- **It's the Truth...:** **...for the review only.** It represents what everyone agreed on at that moment.
