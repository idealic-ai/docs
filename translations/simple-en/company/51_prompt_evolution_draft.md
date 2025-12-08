# 51: Prompt/Evolution Draft

> [!DEFINITION] What is an Evolution Draft?
> Think of it as a quick, temporary summary. When people are discussing changes to a project, this document is created to make sure everyone agrees on the new plan. It helps fix any misunderstandings and explains _why_ a change is being made before the official documents are updated.
>
> Sidenote:
>
> - To learn more about this process, see the :term[02: Company/Process]{href="./02_process.md"} document.

## What's its Purpose?

The Evolution Draft connects the conversation about changes (which happens in a place called a "Pull Request") with the final, official rulebook (the "Living Specification"). It's a snapshot of the new ideas and agreements that came up during the discussion.

## Rules for the Computer Helper

When you're asked to create an Evolution Draft, you **MUST** get two things first: a link to the Pull Request and a time period.

### 1. The First Check

1.  **Pull Request Link:** If you don't have the link to the discussion, **STOP** and ask:

    > "Could you please give me the link to the GitHub Pull Request you want me to look at?"

2.  **Date:** If you weren't given a start date for the comments, **STOP** and ask:
    > "What's the start date I should look at for comments (like YYYY-MM-DD)? If you want me to check all the comments ever, just say 'All'."

### 2. Getting the Information

**IMPORTANT RULE:** You are only allowed to get information from these three places:

1.  **GET** this web page: `https://idealic.academy/en/company/02_process.md/`
2.  **GET** this web page: `https://idealic.academy/en/company/50_prompt_truth.md/`
3.  **Use the special command below** to get the comments from GitHub.

Do **NOT** look at other files, code changes, or commit history on your own.

**Step 1: Get the Rulebooks (You Must Do This)**
You **MUST** use a tool to download the pages from the links below. **Do not search the web for them.** Use these exact addresses.

- [02: Company/Process](https://idealic.academy/en/company/02_process.md/)
- [50: Prompt/Truth](https://idealic.academy/en/company/00_truth.md/)

**Step 2: Get the Comments (Use This Exact Command)**
Run this command just as it is. You'll need to replace `{PR_NUMBER}` with the discussion number (like 123) and `{SINCE_DATE}` with the start date (like 2025-01-01). This command is super important because it grabs all the comments (up to 200 at once) and groups them into conversations correctly. Don't try to change it, or you'll get the wrong results.

```bash
gh api "repos/{OWNER}/{REPO}/pulls/{PR_NUMBER}/comments?since={SINCE_DATE}&per_page=200" --paginate --jq 'map({id, body, user: .user.login, created_at, html_url, diff_hunk, in_reply_to_id}) | group_by(.in_reply_to_id // .id) | map(sort_by(.created_at) | .[0] as $root | [$root] + (.[1:] | map(del(.diff_hunk))))' | jq '.' > "comments_{SINCE_DATE}.json"
```

### 3. Understanding and Summarizing (in Russian)

**Rule:** The final summary must be written in **Russian**. (You can keep common English words like "yeah" or technical terms).

**How to do it: Smart Summarizing**
This isn't about just copying and pasting. You need to use your brain to create a short and truthful summary:

- **Rewrite and Simplify:** Turn long comments into short, simple sentences that keep the original meaning.
- **Ignore the Noise:** Skip comments that aren't helpful, like "thanks!" or "good point."
- **Show the Right Context:** If you include parts of the code change, only show the specific lines that are important for understanding the comment.
- **The Goal:** Make a document that is short, clear, and totally accurate.

Look at the file with all the comments. Your goal is to cover **everything**. Every single conversation topic must be included.

**For each conversation, figure out:**

1.  **The Goal:** What does the person really want?
2.  **The Reason Why:** _Why_ is this change needed? What's the story behind it? Use the discussion to explain this so another computer helper can understand the context.
3.  **The Action:** What needs to be done?
4.  **Big Picture Impact:** Did this discussion change our main plan for the future?
5.  **Status:** Did everyone agree? Is someone confused?
    - If the author **never replied** to a comment, mark it: "Needs acknowledgement".
6.  **The Proof:** Show short quotes as evidence.

### 4. Double-Checking Your Work

**THIS IS A VERY IMPORTANT STEP:** Before you finish, you must check your own work:

1.  Read through the summary you just wrote.
2.  Compare it against the original comments file (`comments_{DATE}.json`).
3.  **Check Every Comment:** Make sure every conversation (especially the first comment in each one) is mentioned in your summary.
4.  **Check for 'Ghosts':** Make sure every goal number in your check-list table matches a real section in your summary.
    - **Fix it:** If you find a number in the table that doesn't have a matching section, you **MUST** go back and write that missing section. Don't just delete the number from the table; add the missing summary.
5.  **Ask yourself:** "Did I miss _any_ conversation?"
6.  If the answer is yes, go back and add it right away.

### 5. Creating the Final Document

Make a new file (for example, `evolution_{DATE}.md`).

**It Must Have This Structure:**

```markdown
# Evolution Draft: {DATE}

> Status: Draft
> Source: {PR_LINK}

## Overview

{A short summary of the whole discussion, in Russian. Answer these questions:}

1.  **What the reviewer wanted:** {What were the main suggestions or criticisms?}
2.  **What the author agreed to:** {What key things did the author decide to change?}
3.  **The big picture:** {Were any misunderstandings cleared up? Did the main vision change?}
4.  **Misunderstandings (if any):** {List anything that people were confused about.}
5.  **Open questions (if any):** {List things that were talked about but not decided.}
6.  **New discoveries:** {What new ideas came up during the chat?}
7.  **Related documents:** {Add links to any other documents that were mentioned.}

## List of Goals

<!-- Do this for EVERY conversation topic you found -->

### {N}. {Short Title in Russian}

- **The Goal:** {What are we trying to do?}
- **The Reason Why:** {Explain _why_ this change is needed, based on the discussion.}
- **What to Do:** {List the specific steps to take.}
- **Status:** {Agreed / Misunderstanding / Needs More Info / Vision Change / Needs Acknowledgement}
- **How we thought before (if it changed):** {Briefly describe the old plan if the new one is different.}
- **The Result:** {In short: Did we change the vision? Did we agree? Was a misunderstanding fixed?}
- **The Proof:**
  > [{Reviewer Name}]({Link}): "{A short, rephrased version of their point}"
  >
  > [{Author Name}]({Link}): "{A short, rephrased version of their answer}" (or "No reply")
  >
  > _Code Context:_ `{Show 1-2 important lines of code, only if needed}`

---

## Double-Check Report

| Comment ID    | Title (Summary) | Goal # | Status          |
| ------------- | --------------- | ------ | --------------- |
| [{ID}]({URL}) | {3-6 words}     | {N}    | Included        |
| [{ID}]({URL}) | {3-6 words}     | -      | Skipped (Noise) |
```
