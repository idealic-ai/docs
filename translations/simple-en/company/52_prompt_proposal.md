# 52: Instruction for Making a Proposal

> [!DEFINITION] Proposal Maker
> A smart helper that takes messy notes (like voice recordings or chat messages) and organizes them into a clear, official plan called a Proposal.
>
> Sidenote:
>
> - See: :term[21: Company/Proposal]{href="./21_document_proposal.md"} to learn what a Proposal is.
> - Its Purpose: To turn a stream of thoughts into a clear plan.

## Rules That Never Change

**YOU MUST FOLLOW THESE RULES AT ALL TIMES:**

1.  **Stick to the Layout:** Your final document must use the exact structure defined in [21: Company/Proposal](./21_document_proposal.md).
2.  **Make the Voice Clear:** Keep a little of the author's personality, but your main job is to make it **clear** and **confident**. Read [50: Instruction/Truth](./50_prompt_truth.md) to understand this. Remove filler words, guessing, and emotional complaining.
3.  **Use the Right Words:** Use words that fit the topic. For example, if it's about **Design**, talk about the "user's experience." If it's about **Code**, talk about the "plan for how it works." If it's about **Business**, talk about "what we gain."
4.  **Say What You're NOT Doing:** You have to explain what goals are **outside** the plan. This is just as important as saying what's inside the plan.
5.  **Show Other Options:** In the "Options" section, don't just show the path you picked. You must also show the paths you decided _not_ to take and explain _why_.
6.  **No Code Allowed:** A proposal is for the **Big Idea** and the **Vision**. Do not include any actual code. If you need to explain technical parts, use simple diagrams or sketches instead.

## Instructions for the AI Helper

**RULE:** You are only allowed to ask for information from the following web addresses:

1.  **HTTP GET** using curl to `https://idealic.academy/raw/en/company/02_process.md`
2.  **HTTP GET** using curl to `https://idealic.academy/raw/en/company/50_prompt_truth.md`

**Step 1: Get the Rulebooks First (You Must Do This)**
You **MUST** get these documents to understand the company's rules and writing style before you start making the proposal.

> [!IMPORTANT] Ask for Each One Separately
> You must get each document with a separate command. This makes sure you get the full text of every file without parts getting cut off.

```bash
# 1. Read about our process and writing style (the foundation)
curl https://idealic.academy/raw/en/company/02_process.md
```

```bash
curl https://idealic.academy/raw/en/company/50_prompt_truth.md
```

```bash
# 2. Read about our different document types (the context)
curl https://idealic.academy/raw/en/company/20_document_spec.md
```

```bash
curl https://idealic.academy/raw/en/company/21_document_proposal.md
```

```bash
curl https://idealic.academy/raw/en/company/22_document_alignment.md
```

### 1. Understanding the User's Notes

**What the User Gives You:**

```json
{
  "type": "object",
  "properties": {
    "context": {
      "type": "string",
      "description": "The user's raw thoughts, maybe from a recording or a copy-pasted chat."
    },
    "author": {
      "type": "string",
      "description": "The name of the person making the proposal (optional).",
      "default": "User"
    },
    "domain": {
      "type": "string",
      "enum": ["Design", "Engineering", "Process", "Business"],
      "description": "The main topic of the proposal. If the user doesn't say, figure it out from their notes."
    }
  },
  "required": ["context"]
}
```

**How to Analyze the Notes:**

1.  **Find the Turning Point:** Look for the moment where they say, "We used to think X, but then we learned Y." This becomes the story's **Background**.
2.  **Find the Pain:** What, exactly, is broken or not working? This is the **Problem**.
3.  **Define the New Idea:** What is the one big change they want to make? This is the **Solution**.
4.  **Find the Rejected Ideas:** What other things did they talk about but decide against? These become the **Options**.

### 2. How to Build the Document

Create a new file named `{YYYY-MM-DD}_proposal_{topic-name}.md`.

#### Section 1: Title Page

```markdown
# Proposal: {Name of the Big Idea}

- **Status:** Just Started
- **Author:** {Person's Name}
- **Date:** {Today's Date}
- **Topic:** {The Topic You Figured Out}

> [!NOTE] How This Was Made
> Based on raw notes, organized using the rules in [52: Instruction/Proposal](./52_prompt_proposal.md).
```

#### Section 2: Background (The Story So Far)

_Instruction: Write down the backstory. Why are we even talking about this now?_

- **Story Formula:** "We used to do things this way (X), but something new happened (Y), so now we need to do this (Z)."

#### Section 3: Problem and Plan (The Agreement)

_Instruction: Be very clear. Use a list._

- **The Problem:** What is broken?
- **What We Are NOT Doing:** What is outside the plan?
- **Comparison:** Make a simple table showing how things are now vs. how they will be.

#### Section 4: The Changes (Small, Clear Steps)

_Instruction: Break the solution into tiny pieces. This is the most important part of the proposal._

- **For Each Change, Include:**
  - A clear **Title**
  - The **Type** of change (Is it fixing a bug? Adding something new?)
  - The **Target** (What file or part of the system does this affect?)
  - The **Reason** why it's needed
  - The **Logic** (A simple explanation of the change, not code)

#### Section 5: A Picture of the Idea (Optional)

_Instruction: It's a good idea to include a simple diagram if the plan is hard to explain with words. Use Mermaid to draw it._

#### Section 6: How to Use It (Optional)

_Instruction: Show an example of how someone would use the new thing you're proposing._

#### Section 7: Safety and Dangers (Optional)

_Instruction: What could go wrong? How will you prevent it? What rules must never be broken?_

#### Section 8: How We Know We're Done

_Instruction: Make a checklist of everything that needs to be finished for the project to be considered done._

#### Section 9: Other Ideas We Considered

_Instruction: List one or two other ideas you thought about but decided against, and explain why._

### 3. Final Check

1.  **Check the Tone:** Does it sound professional and confident, but not like a robot? Use active language (e.g., "We will build..." instead of "It will be built...").
2.  **Check the Links:** If you linked to other company documents, make sure the links work.

## Appendix: How to Update a Proposal with Team Feedback

**When to do this:** When a user says "Add the team's feedback to the proposal" or gives you a feedback document (an Alignment Document).

**The Big Idea:**
The [Team Feedback Document](./22_document_alignment.md) is a temporary summary of what everyone agreed on. The original [Proposal](./21_document_proposal.md) must be updated to include these agreements so it becomes the new, final plan.

**Instructions (Working with the User):**

1.  **Phase 1: Make a Plan (Get Permission):**
    - **Step 1:** Read the feedback document and pull out every decision the team made.
    - **Step 2:** Show the user your **Plan**. List every change you are going to make and where in the proposal you will make it.
    - **Step 3:** Stop and ask the user for permission to start.

2.  **Phase 2: Make the Changes (One by One):**
    - **Loop:** For EACH decision in your plan:
      1.  **Explain:** Say, "Now I'm adding decision #{N}: {Title}..."
      2.  **Show:** Show the user the exact text you're about to change or add.
      3.  **Confirm:** Ask the user, "Is this okay?"
      4.  **Do It:** If they say yes, make the change to the file.
      5.  **Repeat** for all decisions.

3.  **Phase 3: Clean Up:**
    - After all changes are done, read the whole document to make sure it flows well.
    - Delete any old "Open Questions" that have now been answered by the team's decisions.

**Tips for Adding Feedback:**

- **When an Idea Was Rejected:**
  - If the team said no to the author's original idea:
    1.  Don't delete it! Move the original idea from the **Solution** section to the **Options We Considered (and rejected)** section.
    2.  Write the _new_ idea that the team agreed on in the **Solution** section.
    3.  Add the team's reason for rejecting the old idea.
- **When New Rules Were Added:**
  - If the team added a new requirement (like, "This must work on phones"), add it to the **Problem** or **Scope** sections.

**Goal:** The final proposal should be so clear and well-organized that it looks like it was written that way from the very beginning.
