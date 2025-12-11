# 51: Prompt/Alignment

> [!DEFINITION] Alignment Document
> An auto-generated synthesis of the review process that captures shared consensus, resolved conflicts, and precise instructions for execution.

> Sidenote:
>
> - See: :term[22: Company/Alignment]{href="./22_document_alignment.md"} for the definition.
> - Formerly: Evolution Draft

## Invariance Rules

**STRICTLY MAINTAIN THESE RULES:**

1. **Transient Storage:** You MAY create `{OUTPUT_DIR}/{FILENAME}.ndjson` to store raw comments. Do NOT create other temporary files.
2. **One-Pass Fetching:** Fetch all necessary data (comments) in a single API call per resource. Do NOT paginate manually or loop.
3. **Validation Source:** Always validate against the **existing context** (JSON), never re-fetch for validation.
4. **Language:** The output document MUST be in the **Target Language** specified by the input parameter (except for code/technical terms and original comment quotes).
5. **Completeness:** Every single comment must be accounted for in the Coverage Report.
6. **No Restarts:** If issues are detected (e.g., missing items, coverage gaps), do NOT restart the process. Fix the specific issue (add intent, correct wording) and continue.
7. **Latent Analysis (No Scripts):** Do NOT use scripts (Python/Shell) for analysis, counting, or synthesis. All processing MUST be done "in context" using the LLM's latent capabilities.

## Purpose

The Alignment Document bridges the gap between discussion (Pull Requests) and execution. It captures the "Review Summary" and "Consensus" that emerges during review.

## Protocol for Agent

When the user requests an Alignment Document, you **MUST** first resolve the input parameters.

### 1. Parameter Extraction

**Input Schema:**

```json
{
  "type": "object",
  "required": ["since_date", "repo", "pr_number", "output_dir", "filename", "language"],
  "properties": {
    "since_date": {
      "type": "string",
      "description": "Date string (YYYY-MM-DD). Defaults to 1 week ago if not provided.",
      "default": "{ONE_WEEK_AGO}"
    },
    "repo": {
      "type": "string",
      "description": "Repository name/org combination. Defaults to current repo if not provided.",
      "default": "{CURRENT_REPO}",
      "example": "idealic-ai/platform"
    },
    "pr_number": {
      "type": "integer",
      "description": "Pull Request number. REQUIRED.",
      "required": true
    },
    "output_dir": {
      "type": "string",
      "description": "Directory to save output. Defaults to 'docs'.",
      "default": "alignments"
    },
    "filename": {
      "type": "string",
      "description": "Filename for the output file. Defaults to the since_date. Omit extension.",
      "default": "{SINCE_DATE}"
    },
    "language": {
      "type": "string",
      "description": "Target language for the output document (e.g., Russian, English). Defaults to Russian.",
      "default": "Russian"
    },
    "auto_post": {
      "type": "boolean",
      "description": "If true, posts/updates the report on GitHub.",
      "default": false
    },
    "merge_alignments": {
      "type": "boolean",
      "description": "If true, merges with previous alignment. If false, ignores previous.",
      "default": true
    },
    "include_instructions": {
      "type": "boolean",
      "description": "Include agent instructions/warnings in output. Defaults to !auto_post.",
      "default": null
    }
  }
}
```

**Step 0: Resolve Parameters**

1.  Analyze the user's prompt to extract these values.
2.  **Missing Required:** If `pr_number` is missing, **STOP** and ask for it.
3.  **Defaults:** Apply defaults.
    - If `include_instructions` is null: Set to `false` if `auto_post` is true; otherwise `true`.

**Step 1: Output Configuration (First Response)**
You **MUST** output the resolved configuration as your very first response block, use default value.

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

### 2. Data Retrieval

> [!WARNING] NO TEMP FILES
> **DO NOT** save downloaded content to temporary files (e.g., `process.md`, `pr.json`), unless explicitly authorized.
> **Reason:** Temporary files clutter the workspace and are forbidden by Invariance Rule #1.
> **Exception:** The ONLY allowed temporary file is `{OUTPUT_DIR}/{FILENAME}.ndjson` for raw comments.
>
> All other commands (curl, gh api) must output directly to the tool's standard output.

**RESTRICTION:** You are permitted to make ONLY the following external requests:

1.  **HTTP GET** via curl to `https://idealic.academy/raw/en/company/02_process.md`
2.  **HTTP GET** via curl to `https://idealic.academy/raw/en/company/50_prompt_truth.md`
3.  **GitHub Pull Request API** call (to identify author)
4.  **GitHub Comments API** call (via the one-liner below)

DO NOT attempt to fetch PR diff or list of commits. this is beyond your scope.

**Step 1: Fetch Prerequisite Docs (Mandatory)**
Fetch the specific URLs. **Process each document separately.**
**Constraint:** IMPORTANT: You must use **separate tool calls** for each document. DO NOT chain commands with `&&` or `;`.

1.  **Process:**

    ```bash
    curl -s https://idealic.academy/raw/en/company/02_process.md
    ```

2.  **Truth:**

    ```bash
    curl -s https://idealic.academy/raw/en/company/50_prompt_truth.md
    ```

3.  **Alignment Definition:**
    ```bash
    curl -s https://idealic.academy/raw/en/company/22_document_alignment.md
    ```

**Step 2: Fetch PR Details (Identify Roles)**
Fetch the PR details to identify the Author.

```bash
gh api "repos/{OWNER}/{REPO}/pulls/{PR_NUMBER}" --jq '{author: .user.login, title: .title}'
```

**Step 3: Fetch Comments**

1.  **Fetch to File:** Execute this exact command to save comments to `{OUTPUT_DIR}/{FILENAME}.ndjson`.

    ```bash
    gh api "repos/{OWNER}/{REPO}/pulls/{PR_NUMBER}/comments?since={SINCE_DATE}&per_page=100" \
    --paginate \
    | jq -s '
        add
        | group_by(.in_reply_to_id // .id)
        | map(sort_by(.created_at))
        | sort_by(.[0].created_at)
        | flatten
        | to_entries
        | map(.value + {index: ("§" + ((.key + 1) | tostring)), anchor: (.value.html_url | split("#") | last)} | del(.html_url))
        | group_by(.in_reply_to_id // .id)
        | sort_by(.[0].index | ltrimstr("§") | tonumber)
        | map(.[0] as $root | [$root] + (.[1:] | map(del(.diff_hunk))))
        | map(map({
        id,
        anchor: .anchor,
        path,
        body,
        user: .user.login,
        created_at,
        diff_hunk: (.diff_hunk | if length > 200 then .[:200] + "..." else . end),
        in_reply_to_id,
        reactions: (.reactions | del(.total_count, .url) | with_entries(select(.value > 0))),
        index
        }))
        | map(map(del(.in_reply_to_id)))
        | .[]
    ' -c > {OUTPUT_DIR}/{FILENAME}.ndjson
    ```

### 3. Execution Management

**Step 0: Initialize Plan**

You **MUST** create a Todo list using the `todo_write` tool.

**Required Plan Structure:**

1.  **Phase 1: Setup & Data** (pending)
2.  **Phase 2: Load Context** (pending)
3.  **Phase 3: Overview** (pending)
4.  **Phase 4: Intents** (pending)
5.  **Phase 5: Evolution (Merge)** (pending)
6.  **Phase 6: Coverage Report** (pending)
7.  **Phase 7: LLM Assessment** (pending)
8.  **Phase 8: Verification & Cleanup** (pending)
9.  **Phase 9: Auto-Post** (pending)

**IMPORTANT: Phase Completion Protocol:**
After finishing **EACH** phase (and before starting the next), you **MUST**:

1.  **Report:** Output a 1-2 line summary of the work done (including specific counts, e.g., "Analyzed 5 threads, identified 3 intents").
2.  **Track:** Call `todo_write` to mark the current phase as `completed` and the next as `in_progress`.
3.  **Constraint:** NEVER skip this step. The plan must remain in sync with reality.

### 4. Methodology: Intelligent Synthesis

**Method: Intelligent Synthesis**

- :term[02: Company/Process]{href="https://idealic.academy/en/company/02_process.md/"}
- :term[50: Prompt/Truth]{href="https://idealic.academy/en/company/50_prompt_truth.md/"}

**Constraint:** The output document must be in the **Target Language** ({language}).

- **Translate:** All headings, descriptions, analysis, intent titles, reasoning, and structural text.
- **Keep Original:** Technical terms, file paths, code snippets, direct quotes, and the word **"Alignment"** (in headers).
- **Glossary (if Russian):**
  - Proposal: Предложение
  - Intent: Намерение
  - Agreed: Согласовано
  - Done: Готово
  - Rejected: Отклонено
  - Discussion: Обсуждение
  - Clarification: Уточнение
  - Deferred: Отложено
  - Outdated: Устарело

**Completeness is the priority:**

- **Capture Detail:** Preserve technical instructions.
- **Atomicity:** One Intent = One Distinct Technical Change.
- **Coverage:** Map every comment.

### 5. Document Generation Workflow

#### 5.1. Phase 1: Setup & Data

1.  **Fetch Data:** Docs, PR, Comments.
2.  **Initialize File:**
    - Create `{OUTPUT_DIR}/{FILENAME}.md` with the skeleton **EXACTLY** (Translating all static text and headers to **{language}**):

    ```markdown
    # Alignment: {DATE}

    - Status: Consensus Draft
    - Author: {PR_AUTHOR}
    - Source: {PR_LINK}
    - Range: {SINCE_DATE} - {NOW}

    {{WARNING_PLACEHOLDER}}

    ## Overview

    {{OVERVIEW_PLACEHOLDER}}

    ## List of Intents (Consensus)

    {{INTENTS_PLACEHOLDER}}

    {{QUESTIONS_PLACEHOLDER}}

    {{COVERAGE_PLACEHOLDER}}

    {{OPINION_PLACEHOLDER}}

    {{INSTRUCTIONS_PLACEHOLDER}}
    ```

#### 5.2. Phase 2: Load Context

1.  **Analyze Data:**
    - **Count Threads:** Run `wc -l {OUTPUT_DIR}/{FILENAME}.ndjson` (Each line is one thread).
    - **Count Comments:** Run `jq 'length' {OUTPUT_DIR}/{FILENAME}.ndjson | awk '{s+=$1} END {print s}'`.
    - **Report:** Output these numbers clearly (e.g., "Found 45 threads containing 150 comments").

2.  **Read into Context:**
    - Read `{OUTPUT_DIR}/{FILENAME}.ndjson` (25-line chunks).

#### 5.3. Phase 3: Overview

**Analysis:**
Answer these 8 questions explicitly in a bulleted list:

1.  **Reviewer's Goal:**
2.  **Author's Agreement:**
3.  **Author's Disagreement:**
4.  **General Context:**
5.  **Misunderstandings:**
6.  **Open Questions:**
7.  **New Discoveries:**
8.  **Related Documents:**

**Generation:**

- Swap `{{OVERVIEW_PLACEHOLDER}}`.

#### 5.4. Phase 4: Intents

**Analysis:**
Goal: **Hyper-Granular Atomicity**.

- **Split Rule:** No "AND". Split complex threads.
- **Atomicity:** One Intent = One Distinct Technical Change.
- **Detail Priority:** **DO NOT COMPRESS.** Provide full context and content. Avoid terse summaries; explain the "What" and "Why" thoroughly.
- **Code Inclusion:** **ALWAYS** include the relevant `diff_hunk` if available in the source comment. Do not omit code context unless it's purely conversational.
- **Context Inference:** Determine the target domain for each intent:
  - **Specification:** Changes to logic/requirements (markdown files).
  - **Code:** Implementation details (ts/tsx files).
  - **Tests:** Test cases/suites.
  - **Process:** Workflow/docs changes.
- **Author's Decision Logic:**
  - **Explicit:** Use the author's verbal reply if it contains a clear decision.
  - **Implicit (Emoji):** If no verbal reply exists, check for emojis on the _reviewer's_ comment (e.g., 👍, 🚀, 👀). Assume these are from the author and interpret them as agreement/acknowledgment.
  - **No Hallucination:** If neither exists, mark as "Pending/No Response". DO NOT invent a decision.
- **Status Definitions:**
  - **Done:** Author explicitly states completion AND no contradictory follow-up exists.
  - **Agreed:** Consensus reached, action pending.
  - **Rejected:** Author declined with reasoning, no further pushback.
  - **Discussion:** Active debate, no clear consensus yet.
  - **Clarification:** Missing context or ambiguous requirements.
  - **Deferred:** Valid point, but moved to future work/ticket.
  - **Outdated:** Intent from previous alignment, not active in current scope.
- **Contextual Interpretation:**
  - **Markdown Files (`*.md`):** Comments often refer to **Specification** or **Proposal** logic. (e.g., "Remove flag" = "Update spec to remove flag", not necessarily "Delete code immediately").
  - **Code Files:** Comments refer to implementation details.
  - **Action:** Explicitly state the context (Spec vs Code) in the `Reasoning` or `Intent` fields if ambiguous.

**Draft Generation (Mandatory):**

1.  **Generate to Context:** Output the full list of "Fresh Intents" based _only_ on the current analysis into the chat context.
2.  **Format:** Use the standard Intent template.
3.  **Label:** Precede with `### Fresh Draft Intents`.
4.  **Do NOT** write to the file yet.

#### 5.5. Phase 5: Evolution (Merge)

**Goal:** Harmonize the "Freshly Generated Intents" (Phase 4) with the "Previous Alignment".

1.  **Check Config:**
    - If `merge_alignments` is **false**: Skip steps 2-3. Use "Fresh Draft Intents" directly. Proceed to rewrite.

2.  **Fetch Previous Alignment:**
    - Execute to get **ID** and **Body** (output to stdout):
      ```bash
      gh api "repos/{OWNER}/{REPO}/issues/{PR_NUMBER}/comments" \
      --jq 'map(select(.body | contains("# Alignment"))) | sort_by(.created_at) | last | {id: .id, body: .body}'
      ```
    - **Action:** Read the output.
    - **Store:** Save `.body` as "Baseline" for merging.
    - **CRITICAL MEMORY:** Output the found `id` in your Phase 5 Summary (e.g., "Found existing Alignment Comment ID: 12345"). You WILL need this for Phase 9.

3.  **Merge Logic:**
    - **Source:** Use "Fresh Draft Intents" (from Phase 4 output) and "Baseline" (from Step 2).
    - **Compare:** Match Fresh against Baseline (by Topic/Context).
    - **Match:** Retain the **Baseline Number** (`#{N}`). **UPDATE** the Title, Context, and Details with the Fresh analysis. Do NOT preserve old wording if new info is better.
    - **New:** If a Fresh Intent is _truly new_, assign a **New Number** (incrementing from the highest Baseline number).
    - **Retain:** If a Baseline Intent is _not_ in the Fresh list (not currently discussed), **keep it exactly as is** (Status/Title unchanged). Do NOT mark as `Outdated` solely due to absence.

4.  **Generation (Merge & Write):**
    - **Logic:**
      - **If Previous Alignment Exists AND Merge=True:** Merge "Fresh Draft Intents" with "Baseline".
      - **Else:** Use "Fresh Draft Intents" directly.
    - **Action:** Swap `{{INTENTS_PLACEHOLDER}}` with the **Final List**.
    - **Action:** Swap `{{QUESTIONS_PLACEHOLDER}}`.
    - **Content Template:**

````markdown
### {N}. {Short Title}

- **Category:** {Logic / Architecture / ...}
- **Context:** {Specification / Code / Tests / ...}
- **Intent:** {Single core desire - detailed}
- **Author's Approach:** {Initial approach}
- **Reviewer's Proposal:** {Suggestion}
- **Author's Decision:** {Verbal reply OR Emoji on reviewer's comment. If none: "Pending"}
- **Reviewer's Reaction:** {Follow-up}
- **Reasoning:** {Why}
- **Status:** {Agreed / Done / Rejected / Discussion / Clarification / Deferred / Outdated}
- **Result:** {Briefly: Vision changed? Agreement?}

> [{Reviewer Name}]({anchor}): "{Short rephrase}"
>
> [{Author Name}]({anchor}): "{Short rephrase}"

```{lang}
{Relevant diff_hunk code. Do not truncate useful context.}
```
````

    - **Separation:** Add a horizontal rule `---` before any _truly new_ intents if appropriate.

    **Phase Report Requirement:**
    In your Phase Completion Report, you **MUST** explicitly state:
    - Count of **New** Intents created.
    - Count of **Existing** Intents updated.
    - Count of **Outdated** Intents retained.

#### 5.6. Phase 6: Coverage Report

**Analysis:**

- **Audit:** Read the **Merged List** of intents. Compare vs JSON comments.
- **Map Every Comment:** Ensure every index (e.g., `§1`) is mapped.

**Generation:**

- Swap `{{COVERAGE_PLACEHOLDER}}`.
- **CRITICAL:** Do NOT generate the table in parts. You must generate the **entire** table in a single `search_replace` call after all context has been loaded.
- **Content Template:**

  Create a **SINGLE** table. Group comments by Date. Insert a "Header Row" for each new date. Precede the table with the section heading:

  ```markdown
  ---

  ## Coverage Report

  | {Index}           | {Date/Time}    | {User} | {Title (Summary)} | {Intent}  | {Reaction} |
  | ----------------- | -------------- | ------ | ----------------- | --------- | ---------- |
  |                   | **{Date}**     |        |                   |           |            |
  | [{Idx}]({anchor}) | {dd.MM HH:mm}  | {User} | {4-6 words}       | #{N}      | {Emojis}   |
  | [{Idx}]({anchor}) | {dd.MM HH:mm}  | {User} | └ {4-6 words}     | #{M},#{N} | {Emojis}   |
  |                   | **{NextDate}** |        |                   |           |            |
  | [{Idx}]({anchor}) | {dd.MM HH:mm}  | {User} | {4-6 words}       | -         | {Emojis}   |
  | [{Idx}]({anchor}) | {dd.MM HH:mm}  | {User} | ├ {4-6 words}     | #{N}      | {Emojis}   |
  | [{Idx}]({anchor}) | {dd.MM HH:mm}  | {User} | └ {4-6 words}     | #{N}      | {Emojis}   |
  | [{Idx}]({anchor}) | {dd.MM HH:mm}  | {User} | {4-6 words}       | -         | {Emojis}   |
  ```

  **Rules:**
  1.  Use `index` (e.g. `§1`) from JSON.
  2.  **Exhaustive:** Every single comment must have its own row. Do not summarize into ranges (e.g. `§1-§5`).
  3.  **Visualization:** Use `├` and `└` to show replies.
  4.  **Status Indicators (Emojis):** ❓(Unanswered), ⚠️(Warning), 🚧(Pending), 🗑️(Deleted), 🗣️(Reply), 💡(Idea), 🤝(Agreed).
  5.  **Sorting:** **Strictly by Index (§1, §2...).** The input is already grouped by thread and sorted. You MUST preserve this order.
  6.  **Grouping:** Insert a Date Header `| | **{Date}** | | | | |` ONLY when the **Thread Start Date** changes. Do NOT split a thread across multiple date headers, even if replies span multiple days. Keep the entire thread under the date the thread started.

#### 5.7. Phase 7: LLM Assessment

**Generation:**

- Swap `{{OPINION_PLACEHOLDER}}`.
- **Content:** Quality, Opinion, What to learn, Questions.

#### 5.8. Phase 8: Verification & Cleanup

1.  **Deep Reconsideration:** Audit completeness.
2.  **Link Patching (Token Optimization Strategy):**
    - **Context:** During generation, we intentionally used short Comment IDs (e.g., `12345678`) in markdown links (e.g. `[Index](12345678)`) instead of full URLs to save context window tokens. Now we must "hydrate" them back into clickable links.
    - **Direction:** Replace `(ID)` with `(https://github.com/...#issuecomment-ID)`.
    - **Action:** Run the following `sed` command to batch-replace all standalone Comment IDs with full GitHub URLs.
    - **Command:**
      ```bash
      sed -i '' -E 's~]\((discussion_r[0-9]+|issuecomment-[0-9]+|pullrequestreview-[0-9]+)\)~](https://github.com/{OWNER}/{REPO}/pull/{PR_NUMBER}#\1)~g' {OUTPUT_DIR}/{FILENAME}.md
      ```
3.  **Read File:** Verify placeholders gone.
4.  **Cleanup:** Delete `{OUTPUT_DIR}/{FILENAME}.ndjson`.

#### 5.9. Phase 9: Auto-Post (Optional)

1.  **Check Config:**
    - If `auto_post` is **false**: Mark as completed and **EXIT**.

2.  **Prepare Content:**
    - Read the final `{OUTPUT_DIR}/{FILENAME}.md` content.

3.  **Post or Update:**
    - **Check:** Look at your Phase 5 Summary. Did you find an Alignment Comment ID?
    - **Update (PATCH):** If ID exists (replace `{ID}` with the actual number):
      ```bash
      jq -n --rawfile content {OUTPUT_DIR}/{FILENAME}.md '{body: $content}' | \
      gh api -X PATCH "repos/{OWNER}/{REPO}/issues/comments/{ID}" --input -
      ```
    - **Create (POST):** If ID was null/missing:
      ```bash
      jq -n --rawfile content {OUTPUT_DIR}/{FILENAME}.md '{body: $content}' | \
      gh api -X POST "repos/{OWNER}/{REPO}/issues/{PR_NUMBER}/comments" --input -
      ```

4.  **Final Cleanup (Conditional):**
    - If `include_instructions` is **true**:
      - Swap `{{WARNING_PLACEHOLDER}}` with:
        ```markdown
        > [!WARNING] AUTO-GENERATION: DO NOT EDIT, DO NOT COMMIT
        > This document is a **synchronization tool**. It serves as:
        >
        > 1. **Validator:** Checks that 100% of comments are heard.
        > 2. **Synthesizer:** Turns discussion into a plan (Consensus).
        > 3. **Prompt:** Provides instructions for updating the Proposal.
        >
        > If the document is incorrect, **do not edit manually**. Add comments to the PR and **regenerate** to close the feedback loop.
        >
        > **DO NOT ADD THIS FILE TO GIT.**
        >
        > - Details: [22: Alignment](https://idealic.academy/raw/en/company/22_document_alignment.md)
        > - Git only allows: [Proposal](https://idealic.academy/raw/en/company/21_document_proposal.md) and [Specification](https://idealic.academy/raw/en/company/20_document_spec.md).
        ```
      - Swap `{{INSTRUCTIONS_PLACEHOLDER}}` with:

        ```markdown
        ## Instructions for Agent (Next Step)

        > [!IMPORTANT] Context Loading
        > Before proceeding with updates to the Proposal or Specification, you **MUST** load the following context files to ensure full alignment with company standards:
        >
        > 1. `curl https://idealic.academy/raw/en/company/02_process.md` (Process)
        > 2. `curl https://idealic.academy/raw/en/company/50_prompt_truth.md` (Truth)
        > 3. `curl https://idealic.academy/raw/en/company/20_document_spec.md` (Spec)
        > 4. `curl https://idealic.academy/raw/en/company/21_document_proposal.md` (Proposal)
        > 5. `curl https://idealic.academy/raw/en/company/22_document_alignment.md` (Alignment)
        ```

    - If `include_instructions` is **false**:
      - Remove `{{WARNING_PLACEHOLDER}}` and `{{INSTRUCTIONS_PLACEHOLDER}}` (replace with empty string).

5.  **Cleanup:** None (No temp files used).

### 6. Final Output

Output checklist:

- [ ] **Data Fetched**
- [ ] **Document Generated**
- [ ] **Comments Validated**
- [ ] **Ghost References Fixed**
- [ ] **Technical Details Preserved**
