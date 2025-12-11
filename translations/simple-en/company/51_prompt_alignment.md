# 51: Instructions for Creating a Conversation Summary

> [!DEFINITION] Alignment Document
> This is a summary created automatically by an AI. It reads through a discussion between programmers, figures out what they all agreed on, what problems they solved, and makes a clear to-do list for what to do next.

> Sidenote:
> - To understand this better, see the official definition: :term[22: Company/Alignment]{href="./22_document_alignment.md"}.

## The unbreakable Rules

**ALWAYS FOLLOW THESE RULES:**

1. **One Notepad Only:** You can create a temporary file called `{OUTPUT_DIR}/{FILENAME}.ndjson` to hold the raw comments from the conversation. Think of it as your single notepad. Do not create any other temporary files. This keeps the workspace clean.
2. **One Grocery Trip:** Get all the data you need (like all the comments) in one go. Don't go back and ask for little pieces one at a time. This is much more efficient.
3. **Use Your Memory:** When you need to check something, use the information you already gathered. Don't go back to the internet to double-check. This ensures your work is consistent.
4. **Speak the Right Language:** The final summary must be in the language the user asked for (like English or Russian). The only exceptions are technical terms or direct quotes from the conversation.
5. **Leave No Comment Behind:** Your final report must show that you looked at every single comment. No exceptions.
6. **Fix, Don't Restart:** If you notice a mistake in your work, just fix that one specific problem. Don't throw everything away and start from the beginning. 
7. **Think for Yourself:** Do all of your analysis and summary work inside your own AI brain. Don't run other computer programs or scripts to do the counting or thinking for you.

## What's the Point?

The Alignment Document acts as a bridge between a conversation (in a code review) and the actual work that needs to be done. It turns a messy discussion into a clear action plan that everyone has agreed on.

## The Recipe for the AI Agent

When a user asks you to create a summary, you **MUST** follow these steps in order.

### 1. Figure Out the Request

First, you need to understand the basic details of the task.

**The Information You Need:**

```json
{
  "type": "object",
  "required": ["since_date", "repo", "pr_number", "output_dir", "filename", "language"],
  "properties": {
    "since_date": {
      "type": "string",
      "description": "How far back should I look for comments? (Format: YYYY-MM-DD). If not given, I'll look at the last week.",
      "default": "{ONE_WEEK_AGO}"
    },
    "repo": {
      "type": "string",
      "description": "Which project repository is this for? If not given, I'll use the current one.",
      "default": "{CURRENT_REPO}",
      "example": "idealic-ai/platform"
    },
    "pr_number": {
      "type": "integer",
      "description": "What is the ID number of the Pull Request (the conversation)? I NEED this.",
      "required": true
    },
    "output_dir": {
      "type": "string",
      "description": "Which folder should I save the summary in? Default is 'alignments'.",
      "default": "alignments"
    },
    "filename": {
      "type": "string",
      "description": "What should I name the file? By default, I'll use the PR number and date. Don't add .md.",
      "default": "pr{PR_NUMBER}_{SINCE_DATE}"
    },
    "language": {
      "type": "string",
      "description": "What language should the summary be in? Default is Russian.",
      "default": "Russian"
    },
    "auto_post": {
      "type": "boolean",
      "description": "If this is true, I will automatically post the summary as a comment on GitHub.",
      "default": false
    },
    "merge_alignments": {
      "type": "boolean",
      "description": "If true, and there's an old summary, I'll update it. If false, I'll ignore the old one and start fresh.",
      "default": true
    },
    "include_instructions": {
      "type": "boolean",
      "description": "Should the summary include instructions for me, the AI? By default, this is on unless I'm auto-posting.",
      "default": null
    }
  }
}
```

**Step 0: Get the Details**

1. Read what the user wrote and pull out these pieces of information.
2. **Is anything missing?** If you don't know the `pr_number`, you **MUST STOP** and ask the user for it.
3. **Use Defaults:** If the user didn't provide some info, use the default values. For `include_instructions`, if it wasn't specified, set it to `true` unless `auto_post` is also true.

**Step 1: Confirm Your Plan**
Before you do anything else, you **MUST** tell the user the settings you're going to use. This is your first message back to them.

```text
> Alignment Config:
--------------------------------
- Repo:         {repo}
- PR Number:    {pr_number}
- Since Date:   {since_date}
- Output Dir:   {output_dir}
- Filename:     {filename}
- Language:     {language}
- Auto Post:    {auto_post}
- Merge:        {merge_alignments}
- Instructions: {include_instructions}
--------------------------------
Starting analysis...
```

### 2. Gather the Information

> [!WARNING] NO MESSY FILES
> **DO NOT** save things you download into random temporary files like `process.md` or `pr.json`. 
> **Why?** It creates clutter and breaks Unbreakable Rule #1.
> **The one exception:** You are allowed to save the raw comments into a file named `{OUTPUT_DIR}/{FILENAME}.ndjson`.
>
> Everything else you fetch should just be displayed directly in your work area.

**RESTRICTION:** You are only allowed to make these four requests to the outside world:

1.  **GET** a document about our company's process.
2.  **GET** a document about our company's philosophy.
3.  **GET** information about the Pull Request to find out who the author is.
4.  **GET** all the comments from the conversation using the special command below.

Don't try to get any other information, like the code changes or commit history. That's not your job.

**Step 1: Get the Rulebooks (You must do this)**
Download these documents one by one. **Use separate commands for each one.** Don't chain them together.

1.  **The Process document:**

    ```bash
    curl -s https://idealic.academy/raw/en/company/02_process.md
    ```

2.  **The Truth document:**

    ```bash
    curl -s https://idealic.academy/raw/en/company/50_prompt_truth.md
    ```

3.  **The Alignment document definition:**
    ```bash
    curl -s https://idealic.academy/raw/en/company/22_document_alignment.md
    ```

**Step 2: Find Out Who's Who**
Get the details of the Pull Request so you know who the author is.

```bash
gh api "repos/{OWNER}/{REPO}/pulls/{PR_NUMBER}" --jq '{author: .user.login, title: .title}'
```

**Step 3: Get the Conversation**

1.  **Download to your notepad:** Run this exact command. It will download all the comments and save them neatly in your one allowed temporary file: `{OUTPUT_DIR}/{FILENAME}.ndjson`.

    ```bash
    gh api graphql -F owner='{OWNER}' -F repo='{REPO}' -F pr={PR_NUMBER} -f query='
      query($owner:String!, $repo:String!, $pr:Int!) {
        repository(owner:$owner, name:$repo) {
          pullRequest(number:$pr) {
            reviewThreads(first: 100) {
              nodes {
                isResolved
                comments(first: 50) {
                  nodes {
                    databaseId
                    body
                    author { login }
                    createdAt
                    path
                    diffHunk
                    replyTo { databaseId }
                    url
                    reactions(first: 10) { nodes { content } }
                  }
                }
              }
            }
          }
        }
      }
    ' --jq '
      .data.repository.pullRequest.reviewThreads.nodes[]
      | .isResolved as $resolved
      | .comments.nodes[]
      | {
          id: .databaseId,
          body,
          user: (.author.login // "ghost"),
          created_at: .createdAt,
          path,
          diff_hunk: .diffHunk,
          in_reply_to_id: .replyTo.databaseId,
          html_url: .url,
          reactions: ((.reactions.nodes | map({(.content): 1}) | add) // {}),
          is_resolved: $resolved
        }
    ' | jq -s '
        group_by(.in_reply_to_id // .id)
        | map(sort_by(.created_at))
        | sort_by(.[0].created_at)
        | flatten
        | to_entries
        | map(.value + {index: ("§" + ((.key + 1) | tostring)), anchor: (.value.html_url | split("#") | last)} | del(.html_url))
        | group_by(.in_reply_to_id // .id)
        | sort_by(.[0].index | ltrimstr("§") | tonumber)
        | map(map({
        index,
        id,
        anchor: .anchor,
        path,
        body,
        user,
        created_at,
        diff_hunk: (.diff_hunk | if length > 350 then .[:350] + "..." else . end),
        in_reply_to_id,
        reactions: (.reactions | with_entries(select(.value > 0))),
        is_resolved
        }))
        | map(.[0] as $root | [$root] + (.[1:] | map(del(.diff_hunk, .is_resolved, .path))))
        | map(map(del(.in_reply_to_id)))
        | .[]
    ' -c > {OUTPUT_DIR}/{FILENAME}.ndjson
    ```

### 3. Manage Your Work

**Step 0: Make a To-Do List**
You **MUST** create a to-do list for yourself so the user can follow your progress.

**Your plan must have these steps:**

1. **Phase 1: Setup & Data** (Not started)
2. **Phase 2: Load Information** (Not started)
3. **Phase 3: Write Overview** (Not started)
4. **Phase 4: Define Tasks (Intents)** (Not started)
5. **Phase 5: Update Previous Summary** (Not started)
6. **Phase 6: Create Coverage Report** (Not started)
7. **Phase 7: Give My AI Opinion** (Not started)
8. **Phase 8: Final Checks & Cleanup** (Not started)
9. **Phase 9: Post to GitHub** (Not started)

**IMPORTANT: How to Report Your Progress:**
After you finish **EACH** phase, you **MUST** do two things:

1.  **TELL THE USER WHAT YOU DID (THIS IS REQUIRED):**
    You must post a status update in the chat. Use this exact format:

    ```text
      **Phase {N} Complete**
      Summary: {A short sentence or two about what you just did.}
      Details: {Simple facts, like "Found 5 conversation threads" or "Created 3 new tasks."}
    ```

2.  **UPDATE YOUR TO-DO LIST:**
    Check off the phase you just finished and mark the next one as "in progress."

**Rule:** You are NOT allowed to skip these progress reports. They are essential for the user.
**Rule:** **One step at a time.** Don't start the next phase until you have reported that the current one is done.
**Rule:** **Be patient.** Wait for the computer to tell you a tool finished successfully before you start thinking about the next step.

### 4. How to Think: Smartly Summarize

**Your Method: Intelligent Synthesis**

Your thinking should be guided by these two documents:
- :term[02: Company/Process]{href="https://idealic.academy/en/company/02_process.md/"}
- :term[50: Prompt/Truth]{href="https://idealic.academy/en/company/50_prompt_truth.md/"}

**Rule:** The final document must be in the **Target Language** ({language}) that the user requested.

- **Translate:** All your writing—headings, descriptions, analysis, and task titles.
- **Do NOT Translate:** Technical words, computer code, file paths, and direct quotes from the conversation. Also, always keep the word **"Alignment"** in the title.
- **Simple word guide (for Russian):**
  - Proposal: Предложение
  - Intent: Намерение
  - Agreed: Согласовано
  - Done: Готово
  - Rejected: Отклонено
  - Discussion: Обсуждение
  - Clarification: Уточнение
  - Deferred: Отложено
  - Outdated: Устарело

**Your main goal is to be complete:**

- **Capture the Details:** Don't lose any important technical instructions.
- **One Task, One Idea:** Each "Intent" (or task) should be about one single, specific change.
- **Cover Everything:** Make sure every comment from the conversation is linked to a task or decision.

### 5. The Step-by-Step Workflow for Creating the Document

#### 5.1. Phase 1: Setup & Get Data

1.  **Fetch Everything:** Get the documents, PR info, and all the comments.
2.  **Create the Document Shell:**
    - Create a new file called `{OUTPUT_DIR}/{FILENAME}.md` and put this structure inside. You **MUST** translate all the text to the user's language ({language}).

    ```markdown
    # Alignment: {DATE}

    - Status: Consensus Draft
    - Author: {PR_AUTHOR}
    - Source: {PR_LINK}
    - Range: {SINCE_DATE} - {NOW}

    {{WARNING_PLACEHOLDER}}

    ## Overview

    {{OVERVIEW_PLACEHOLDER}}

    ## List of Intents (Agreed To-Do List)

    {{INTENTS_PLACEHOLDER}}

    {{QUESTIONS_PLACEHOLDER}}

    {{COVERAGE_PLACEHOLDER}}

    {{OPINION_PLACEHOLDER}}

    {{INSTRUCTIONS_PLACEHOLDER}}
    ```

#### 5.2. Phase 2: Load the Information

1.  **Analyze the Data:**
    - **Count the conversations:** Count the number of lines in your notepad file (`{OUTPUT_DIR}/{FILENAME}.ndjson`). Each line is a separate conversation thread.
    - **Report:** Tell the user how many threads you found.

2.  **Read the details:**
    - Read your notepad file into your working memory so you can start analyzing it.

#### 5.3. Phase 3: Write the Overview

**Analysis:**
**IMPORTANT**: To create the overview, you must answer these 8 questions in a bulleted list.

1. **What was the reviewer trying to achieve?**
2. **What did the author agree with?**
3. **What did the author disagree with?**
4. **What was the big picture of this conversation?**
5. **Were there any misunderstandings?**
6. **Are there any questions that are still unanswered?**
7. **Did anyone discover anything new or unexpected?**
8. **Are there other documents related to this discussion?**

**Generate:**

- Replace the `{{OVERVIEW_PLACEHOLDER}}` in your document with these answers.

#### 5.4. Phase 4: Create the To-Do List (Intents)

**Analysis:**
Your goal is to be extremely specific. Each task should be as small as possible.

- **The "AND" rule:** If a task sounds like "Do X AND Y," you must split it into two separate tasks.
- **One Task = One Change:** An Intent should be about one single technical change.
- **Details are key:** **DO NOT SUMMARIZE** too much. Explain the "What" and the "Why" for each task. Give the full context.
- **Include Code:** **ALWAYS** include the relevant piece of code (`diff_hunk`) that the comment was about. If there are several, show them all if they're short, or combine them smartly if they're long.
- **Guess the context:** Figure out what each task is about:
  - **Specification:** A change to the project's rules or plans (usually in `.md` files).
  - **Code:** A change to the actual program (usually in `.ts` files).
  - **Tests:** A change to how the code is tested.
  - **Process:** A change to how the team works.
- **Figure out what the author decided:**
  - **Clear Answer:** If the author wrote a clear reply like "Done" or "Okay, I'll do that," use it.
  - **Emoji Answer:** If the author didn't write anything but put an emoji like 👍, 🚀, or 👀 on the reviewer's comment, treat that as agreement.
  - **Don't Make Things Up:** If there's no reply and no emoji, mark the task as "Pending/No Response." DO NOT guess what the author was thinking.
- **Status Meanings:**
  - **Done:** The author said it's finished.
  - **Agreed:** Everyone agrees, but the work hasn't been done yet.
  - **Rejected:** The author explained why they won't make the change.
  - **Discussion:** People are still debating and haven't reached a conclusion.
  - **Clarification:** Someone needs more information before a decision can be made.
  - **Deferred:** It's a good idea, but it will be done later, not now.
  - **Outdated:** A task from an old summary that is no longer relevant.
- **Understand the File Type:**
  - **Markdown files (`*.md`):** Comments on these files are usually about the **plan** or **rules**, not the code itself.
  - **Code files:** Comments are about changing the actual program.
  - **Be Clear:** In your summary, state if the change is for the plan or for the code, especially if it's unclear.

**Create a Draft (This is required):**

1.  **Generate a Draft:** Create a list of all the new tasks ("Fresh Intents") you've just identified from this conversation. Put this list directly into the chat for context.
2.  **Use the Template:** Format each task using the standard template.
3.  **Label It:** Start the list with the title `### Fresh Draft Intents`.
4.  **Important:** Do **NOT** write this draft to the final document file yet.

#### 5.5. Phase 5: Update the Old Summary (Merge)

**Goal:** Combine your newly created tasks (from Phase 4) with any summary that already exists for this conversation.

1.  **Check the Settings:**
    - If the user set `merge_alignments` to **false**, skip the next steps. Just use your new draft and move on.

2.  **Find the Old Summary:**
    - Run this command to find the last summary comment posted on the Pull Request:
      ```bash
      gh api "repos/{OWNER}/{REPO}/issues/{PR_NUMBER}/comments" \
      --jq 'map(select(.body | contains("# Alignment"))) | sort_by(.created_at) | last | {id: .id, body: .body}'
      ```
    - **Read the result.**
    - **Save it:** Store the text of the old summary (`body`) as your "Baseline."
    - **MEMORIZE THIS:** Make a note of the comment `id`. You will need it later in Phase 9 to update the comment. Announce it in your status report (e.g., "Found existing summary with ID: 12345").

3.  **How to Merge:**
    - **Compare:** Look at your "Fresh Draft Intents" and the "Baseline" summary.
    - **If a task matches:** Keep the original task number (`#{N}`). **UPDATE** everything else about it (the title, details, status, etc.) with the latest information from your new analysis. Don't keep old text if the new info is better.
    - **If a task is new:** If you have a new task that wasn't in the old summary, give it a new number (one higher than the highest number from the old summary).
    - **If a task is old but not discussed:** If the old summary has a task that wasn't mentioned in the latest comments, **keep it exactly as it was.** Don't change its status.

4.  **Create the Final To-Do List:**
    - **Decide what to use:**
      - If there was an old summary and you're supposed to merge, use your merged list.
      - Otherwise, just use your "Fresh Draft Intents."
    - **Action:** Replace `{{INTENTS_PLACEHOLDER}}` and `{{QUESTIONS_PLACEHOLDER}}` with your final, combined lists.
    - **The Template for Each Task:**

````markdown
### {N}. {Short and clear title}

- **Category:** {Logic / Architecture / etc.}
- **Context:** {What part of the project this affects: Specification / Code / Tests}
- **Intent:** {A detailed sentence describing the change requested.}
- **Author's First Idea:** {How the author originally did it.}
- **Reviewer's Suggestion:** {What the reviewer suggested instead.}
- **Author's Decision:** {What the author said, or the emoji they used. If nothing, write "Pending"}
- **Reviewer's Reaction:** {Any follow-up from the reviewer.}
- **Reasoning:** {Why this change is being made.}
- **Status:** {Agreed / Done / Rejected / etc.} {Add a ✅ if the conversation thread is resolved/closed}
- **Result:** {A brief note on the outcome: Was the plan changed? Did they agree?}

> [{Reviewer's Name}]({anchor}): "{A short quote or summary of their point}"
>
> [{Author's Name}]({anchor}): "{A short quote or summary of their reply}"

_(If there's a code snippet (`diff_hunk`), put it here. If not, delete this entire code block.)_

```{lang}
{The relevant piece of code. Show all the important parts.}
```
````

    - **Mark New Tasks:** If you added brand new tasks, put a line `---` above them to show they are new.

    **Progress Report Rule:**
    In your progress report for this phase, you **MUST** state:
    - How many **new** tasks you created.
    - How many **existing** tasks you updated.
    - How many **old** tasks you kept without changes.

#### 5.6. Phase 6: Create the Coverage Report

**Analysis:**

- **Double-check your work:** Read your merged to-do list and compare it against the original comments. 
- **Map every single comment:** Make sure every comment (like `§1`, `§2`, etc.) is accounted for in your report table.

**Generation:**

- Replace `{{COVERAGE_PLACEHOLDER}}` with the table.
- **IMPORTANT:** Create the **entire table** at once. Don't try to build it piece by piece.
- **The Template for the Table:**

  Make a **SINGLE** table. Group the comments by the date they were made. Start each new day with a header row for that date.

  ```markdown
  ---

  ## Coverage Report

  | {Index}           | {Date/Time}    | {User} | {Title (Summary)} | {Intent}  | {Reaction} |
  | ----------------- | -------------- | ------ | ----------------- | --------- | ---------- |
  |                   | **{Date}**     |        |                   |           |            |
  | [{Idx}]({anchor}) | {dd.MM HH:mm}  | {User} | {A 4-6 word summary} | #{N}      | {Emojis}   |
  | [{Idx}]({anchor}) | {dd.MM HH:mm}  | {User} | └ {A 4-6 word summary} | #{M},#{N} | {Emojis}   |
  |                   | **{NextDate}** |        |                   |           |            |
  | [{Idx}]({anchor}) | {dd.MM HH:mm}  | {User} | {A 4-6 word summary} | -         | {Emojis}   |
  | [{Idx}]({anchor}) | {dd.MM HH:mm}  | {User} | ├ {A 4-6 word summary} | #{N}      | {Emojis}   |
  | [{Idx}]({anchor}) | {dd.MM HH:mm}  | {User} | └ {A 4-6 word summary} | #{N}      | {Emojis}   |
  | [{Idx}]({anchor}) | {dd.MM HH:mm}  | {User} | {A 4-6 word summary} | -         | {Emojis}   |
  ```

  **Table Rules:**
  1. Use the `index` (e.g., `§1`) from the comment data.
  2. **List every comment:** Every single comment gets its own row. Do not group them like `§1-§5`.
  3. **Show replies:** Use `├` and `└` to visually indent replies in a thread.
  4. **Show what's resolved:** If a conversation thread is marked as `is_resolved: true`, you **MUST** add `✅ ` at the beginning of its title.
  5. **Choose the right emoji:**
      - **First choice:** If users added reactions on GitHub (like `+1` or `heart`), use those.
      - **Second choice:** If there are no reactions, figure out the feeling from the text:
        - `❓` (Question)
        - `⚠️` (Warning or risk)
        - `🚧` (Work in progress)
        - `🗑️` (Rejected idea)
        - `💡` (New idea or suggestion)
        - `🤝` (Agreement)
        - `🗣️` (A standard reply)
        - `✅` (Saying something is done)
        - `👍` (Approval)
  6. **Order matters:** The table **MUST** be sorted by the comment index (`§1`, `§2`, `§3`...). Your input data is already sorted correctly, so just keep that order.
  7. **Group by Day:** Add a date header row only when a **new conversation thread starts** on a new day. Keep all replies to a thread under the date that the thread began, even if the replies were on later days.

#### 5.7. Phase 7: Give My AI Assessment

**Generation:**

- Replace `{{OPINION_PLACEHOLDER}}`.
- **What to write about:**
  1. **Teamwork Health:** How well did everyone communicate? Was the feedback helpful and positive?
  2. **Review Quality:** Was the feedback specific and easy to act on?
  3. **Risk Analysis:** Point out any discussions that seemed confusing, overly complex, or might cause problems later.
  4. **Main Blockers:** What are the 1 or 2 most important issues that need to be solved before moving forward?
  5. **A Teachable Moment:** What good (or bad) pattern of communication or coding came up that everyone could learn from?
  6. **Extra Thoughts (Optional):** If you noticed anything else interesting or important, you can add up to 10 more points. If not, just skip this.

#### 5.8. Phase 8: Verification & Cleanup

1.  **Deep Final Check:** Read through the whole document one last time to make sure it's complete and makes sense.
2.  **Fix the Links:**
    - **The Problem:** To save space while working, you used short IDs for links instead of full web addresses. Now you need to turn them into real, clickable links.
    - **The Fix:** Replace all the short IDs like `(12345678)` with the full URL like `(https://github.com/...#issuecomment-12345678)`.
    - **Action:** Run this command to fix all the links at once:
      ```bash
      sed -E 's~]\((discussion_r[0-9]+|issuecomment-[0-9]+|pullrequestreview-[0-9]+)\)~](https://github.com/{OWNER}/{REPO}/pull/{PR_NUMBER}#\1)~g' {OUTPUT_DIR}/{FILENAME}.md > {OUTPUT_DIR}/{FILENAME}.tmp && mv {OUTPUT_DIR}/{FILENAME}.tmp {OUTPUT_DIR}/{FILENAME}.md
      ```
3.  **Read the File:** Check to make sure all the `{{PLACEHOLDERS}}` are gone.
4.  **Tidy Up:** Delete your temporary notepad file (`{OUTPUT_DIR}/{FILENAME}.ndjson`).

#### 5.9. Phase 9: Auto-Post (If Requested)

1.  **Check the Settings:**
    - If `auto_post` is **false**, just mark this phase as complete and you are **DONE**.

2.  **Get the Final Text:**
    - Read the contents of your finished summary file.

3.  **Post or Update the Comment:**
    - **Check your memory:** Look at your report from Phase 5. Did you find an existing comment ID?
    - **If it exists (Update it):** Use this command to edit the existing comment. (Replace `{ID}` with the real number you saved).
      ```bash
      jq -n --rawfile content {OUTPUT_DIR}/{FILENAME}.md '{body: $content}' | \
      gh api -X PATCH "repos/{OWNER}/{REPO}/issues/comments/{ID}" --input -
      ```
    - **If it doesn't exist (Create it):** Use this command to post a brand new comment.
      ```bash
      jq -n --rawfile content {OUTPUT_DIR}/{FILENAME}.md '{body: $content}' | \
      gh api -X POST "repos/{OWNER}/{REPO}/issues/{PR_NUMBER}/comments" --input -
      ```

4.  **Final Touches (Maybe):**
    - If `include_instructions` is **true**:
      - Replace `{{WARNING_PLACEHOLDER}}` with this warning box:
        ```markdown
        > [!WARNING] CREATED BY AI: DO NOT EDIT THIS MANUALLY
        > This document is a tool to keep everyone on the same page. It helps us:
        >
        > 1. **Check our work:** To make sure every comment was heard.
        > 2. **Make a plan:** To turn the conversation into an action plan.
        > 3. **Give instructions:** To tell the author (or an AI) what to do next.
        >
        > If this summary is wrong, **do not edit it**. Instead, add a new comment to the conversation and ask me to **create the summary again**.
        >
        > **DO NOT SAVE THIS FILE TO THE PROJECT'S CODEBASE.**
        >
        > - Learn more: [22: Alignment](https://idealic.academy/raw/en/company/22_document_alignment.md)
        ```
      - Replace `{{INSTRUCTIONS_PLACEHOLDER}}` with this set of instructions for the AI's next task:

        ```markdown
        ## Instructions for the AI (Next Step)

        > [!IMPORTANT] Load These Documents Next
        > Before you start making changes to the project documents, you **MUST** read these files to make sure you understand all the rules and standards:
        >
        > 1. `curl https://idealic.academy/raw/en/company/02_process.md` (The Process)
        > 2. `curl https://idealic.academy/raw/en/company/50_prompt_truth.md` (The Philosophy)
        > 3. `curl https://idealic.academy/raw/en/company/20_document_spec.md` (The Specification)
        > 4. `curl https://idealic.academy/raw/en/company/21_document_proposal.md` (The Proposal)
        > 5. `curl https://idealic.academy/raw/en/company/22_document_alignment.md` (Alignment)
        ```

    - If `include_instructions` is **false**:
      - Just delete `{{WARNING_PLACEHOLDER}}` and `{{INSTRUCTIONS_PLACEHOLDER}}` completely.

5.  **Tidy Up:** No cleanup needed here, because you shouldn't have any temp files left.

### 6. Final Report

To finish, tell the user what you've done, what changes were made, and any final thoughts you have on the process.