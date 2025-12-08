# 51: Prompt/Evolution Draft

> [!DEFINITION] Evolution Draft
> A transient, rapid-response artifact used to align on changes, correct misconceptions, and provide context for execution before updating the Main Document.
>
> Sidenote:
>
> - See: :term[02: Company/Process]{href="./02_process.md"} for the process definition.

## Invariance Rules

**STRICTLY MAINTAIN THESE RULES:**

1. **Transient Storage:** You MAY create `evolution_{DATE}.json` to store raw comments. Do NOT create other temporary files.
2. **One-Pass Fetching:** Fetch all necessary data (comments) in a single API call per resource. Do NOT paginate manually or loop.
3. **Validation Source:** Always validate against the **existing context** (JSON), never re-fetch for validation.
4. **Language:** The output document MUST be in **Russian** (except for code/technical terms).
5. **Completeness:** Every single comment must be accounted for in the Coverage Report.
6. **No Restarts:** If issues are detected (e.g., missing items, coverage gaps), do NOT restart the process. Fix the specific issue (add intent, correct wording) and continue. This is a rge task; restarts are forbidden.
7. **Latent Analysis (No Scripts):** Do NOT use scripts (Python/Shell) for analysis, counting, or synthesis. All processing MUST be done "in context" using the LLM's latent capabilities. Read the data, then think.

## Purpose

The Evolution Draft bridges the gap between discussion (Pull Requests) and permanent specification (Living Specification). It captures the "changed understanding" or "new intent" that emerges during review.

## Protocol for Agent

When the user requests an Evolution Draft, you **MUST** obtain a Pull Request link and a timeframe.

### 1. Prerequisite Check

1.  **PR Link:** If not provided, **STOP** and ask:

    > "Please provide the GitHub Pull Request link you wish to analyze."

2.  **Since Date:** If the user did not specify a date, **STOP** and ask:
    > "Please provide a 'since' date (YYYY-MM-DD) to filter comments. If you want to analyze the entire history, reply with 'All'."

### 2. Data Retrieval

**RESTRICTION:** You are permitted to make ONLY the following external requests:

1.  **HTTP GET** to `https://idealic.academy/en/company/02_process.md/`
2.  **HTTP GET** to `https://idealic.academy/en/company/00_truth.md/`
3.  **GitHub Pull Request API** call (to identify author)
4.  **GitHub Comments API** call (via the one-liner below)

Do **NOT** fetch other file contents, commits, or diffs separately.

**Step 1: Fetch Prerequisite Docs (Mandatory)**
You **MUST** use an HTTP tool to fetch the content directly from the URLs below. **Do NOT search on the web.** Fetch the specific URLs.

- [02: Company/Process](https://idealic.academy/en/company/02_process.md/)
- [50: Prompt/Truth](https://idealic.academy/en/company/00_truth.md/)

**Step 2: Fetch PR Details (Identify Roles)**
Fetch the PR details to identify the Author. Any other user in the comments is considered a Reviewer.

```bash
gh api "repos/{OWNER}/{REPO}/pulls/{PR_NUMBER}" --jq '{author: .user.login, title: .title}'
```

**Step 3: Fetch & Read Comments**

1.  **Fetch to File:** Execute this exact command to save comments to `evolution_{DATE}.json`. Replace `{PR_NUMBER}`, `{SINCE_DATE}`, and `{DATE}`.

    ```bash
    gh api "repos/{OWNER}/{REPO}/pulls/{PR_NUMBER}/comments?since={SINCE_DATE}&per_page=200" --paginate --jq 'map({id, body, user: .user.login, created_at, html_url, diff_hunk: (.diff_hunk | if length > 200 then .[:200] + "..." else . end), in_reply_to_id}) | sort_by(.created_at) | to_entries | map({index: ("§" + (.key + 1 | tostring)), comment: .value}) | map(.comment + {index: .index}) | group_by(.in_reply_to_id // .id) | map(.[0] as $root | [$root] + (.[1:] | map(del(.diff_hunk))))' | jq '.' > evolution_{DATE}.json
    ```

2.  **Read into Context:** Use standard agent tools to read `evolution_{DATE}.json`.
    - **Read Loop (Mandatory):** You MUST read the file in strict 100-line chunks.
      - Start: `offset=0`, `limit=100`
      - Next: `offset=100`, `limit=100`
      - Next: `offset=200`, `limit=100`
      - ...continue until EOF.
      - **Prohibited:** Do NOT guess limits, do NOT read "all at once", do NOT let the tool decide. You must explicitly iterate.
      - **Termination:** Continue strictly until the tool returns "File is empty" or "out of range". Do NOT stop early.
      - **Expectation:** The file may be large (1000+ lines). You might need 20+ iterations. This is normal. Continue until the end.

### 3. Analysis & Synthesis (Language: Russian)

**Step 0: Initialize Plan**

Before starting the analysis, you **MUST** create a Todo list using the `todo_write` tool to track your progress through the phases. As you complete each phase, you **MUST** update the specific item to `completed` using `todo_write`. By the end of the execution, all items in the plan MUST be marked as `completed`.

**Required Plan Structure:**

1.  **Phase 1: Setup & Data** (pending)
    - Fetch Data
    - Create File
2.  **Phase 2: Overview** (pending)
    - Analyze Narrative & Write Overview
3.  **Phase 3: Intents** (pending)
    - Analyze Threads & Write Intents
    - **Rule:** Split complex threads into atomic intents.
4.  **Phase 4: Coverage Report** (pending)
    - Analyze Coverage & Write Table
5.  **Phase 5: Verification & Cleanup** (pending)
    - Run Self-Check
    - Fix Issues (if any)
    - Finalize Document

**Method: Intelligent Synthesis ("LLM Magic")**

- :term[02: Company/Process]{href="https://idealic.academy/en/company/02_process.md/"} (Understanding the role of Evolution Documents)
- :term[50: Prompt/Truth]{href="https://idealic.academy/en/company/00_truth.md/"} (Writing standards: assertiveness, precision, no fluff)

**Constraint:** The output document must be in **Russian**. (Exceptions: colloquialisms like "yeah", "ok" or technical terms).

**Method: Intelligent Synthesis ("LLM Magic")**
This is **NOT** a programmatic JSON-to-Markdown conversion. You must apply intelligence to create a truthful summary, but **Completeness** is the priority:

- **Capture Detail:** Do not over-compress. If a comment contains specific technical instructions, logic changes, or multiple distinct points, preserve them.
- **Atomicity (Critical):** One Intent = One Distinct Technical Change. **NEVER** bundle unrelated changes (e.g., "Optimization flags" AND "Deployment steps") into one item, even if they were discussed in the same thread. Split them into separate intents (e.g., "CI/CD Parallel Flags" and "Deployment Step Refactoring").
- **Separation:** If a discussion branches into multiple topics, create separate Intents. Better to have more granular intents than to lose detail in a merged one.
- **Technical Fidelity:** If a comment mentions parameters, types, flags, arguments, or environment variables, you **MUST** include them. Do not abstract them away.
- **Filter Noise:** Omit comments that do not add value or context to the intent.
- **Curate Context:** Include only the specific lines of diff hunks that are relevant to the point being made.
- **Goal:** Create a document that is **complete** and **comprehensive**. Completeness and clarity take precedence over compactness.

Important: Analyze the JSON output directly from the context.

DO NOT WRITE ANY SCRIPTS. This is strictly latent space analysis of retriever data.

Your goal is **Completeness**. Every distinct thread or discussion topic must be represented.

**For each item, determine:**

1.  **Intent:** What is the core desire?
2.  **Explanation:** _Why_ is this change happening? What is the underlying reasoning or meaning? Synthesize this from the discussion to provide context for the LLM.
3.  **Action:** What needs to change?
4.  **Vision Impact:** Did the long-term vision change?
5.  **Agreement Status:** Is it agreed? Is there a misunderstanding?
    - If the author **did not reply**, mark as: "Needs acknowledgement".
6.  **Context:** The proof (quotes) and/or specific code location (if applicable).

### 4. Audit & Coverage Check

**CRITICAL STEP:** Before finalizing the document, you must perform a self-audit to ensure complete coverage:

1.  Read the generated list of items.
2.  Compare against the JSON output.
3.  **Map Every Comment:** Ensure every comment (referencing its `index`, e.g. `§1`) is mapped to a specific Intent Number.
4.  **Consistency Check:** Verify that every Intent number referenced in the coverage table corresponds to an actual section in the text.
    - **Fix:** If you find a "ghost reference" (an Intent number in the table that doesn't exist in the text), you **MUST** go back and generate that missing Intent section. Do not just delete the reference; add the content.
5.  **Question:** "Did I miss _any_ thread?"
6.  **Technical Check:** Did I miss any important flags or parameters mentioned in the comments?
7.  If yes, add details to the relevant Intent.

### 5. Document Generation (Five Phases)

You must generate the document by **systematically replacing placeholders** in a pre-created file.

**Phase 1: Setup & Data**

1.  **Fetch Data:**
    - Fetch Prerequisite Docs (Truth, Process).
    - Fetch PR Details (Identify Author/Reviewers).
    - Fetch Comments (save to JSON and read into context).
    - **Initialize Plan:** Create Todo list.

2.  **Initialize File:**
    - Create `evolution_{DATE}.md` with the skeleton **EXACTLY**:

    ```markdown
    # Evolution Draft: {DATE}

    - Status: Draft
    - Author: {PR_AUTHOR}
    - Source: {PR_LINK}
    - Range: {SINCE_DATE} - {NOW}

    ## Обзор

    {{OVERVIEW_PLACEHOLDER}}

    ## Список Намерений

    {{INTENTS_PLACEHOLDER}}

    ---

    ## Открытые вопросы и Риски (если есть)

    {{QUESTIONS_PLACEHOLDER}}

    ---

    ## Отчет о покрытии

    {{COVERAGE_PLACEHOLDER}}
    ```

3.  Stop and say: "**Phase 1 Complete: Data fetched & File initialized.**"

**Phase 2: Overview**

1.  **Generate & Apply:**
    - Synthesize the Overview content (answers to the 8 questions).
    - **Content Requirements:** You **MUST** explicitly answer these 8 questions in the output using a bulleted list. Do not merge them into a paragraph or skip any.
      1.  **Чего хотел ревьюер:** {Main themes of feedback/criticism}
      2.  **С чем согласился автор:** {Key concessions or strategic shifts}
      3.  **С чем автор НЕ согласился:** {Points where the author pushed back or disagreed, and why}
      4.  **Общий контекст:** {Any misunderstandings cleared or vision changes confirmed}
      5.  **Недопонимания (если есть):** {List specific points of confusion}
      6.  **Открытые вопросы (если есть):** {Points discussed but not resolved}
      7.  **Новые открытия:** {Insights gained during discussion}
      8.  **Связанные документы:** {Links to related docs mentioned}
    - **Immediately** call `search_replace` to swap `{{OVERVIEW_PLACEHOLDER}}` with the generated text.
    - **Do NOT** output the text to chat first. The tool call is the generation.

2.  Stop and say: "**Phase 2 Complete: Overview inserted.**"

**Phase 3: Intents**

1.  **Generate & Apply:**
    - Analyze threads and formulate the list of intents.
    - **Split Rule:** If a single comment or thread proposes multiple distinct technical actions (e.g. "Add --parallel flag" AND "Split deploy into steps"), you **MUST** generate **two separate Intents**. Do not merge them.
    - **Immediately** call `search_replace` to swap `{{INTENTS_PLACEHOLDER}}` with the full markdown list.
    - **Do NOT** output the text to chat first.

    **Content Template (Repeat for each Intent):**

    ````markdown
    ### {N}. {Short Title in Russian}

    - **Категория:** {Логика / Архитектура / Стиль / Документация / Процесс / etc}
    - **Намерение:** {What do we want to achieve?}
    - **Подход автора:** {The initial approach or code taken by the author before feedback.}
    - **Предложение ревьюера:** {The suggestion or concern raised by the reviewer.}
    - **Решение автора:** {The final decision or solution adopted by the author.}
    - **Реакция ревьюера:** {The follow-up reaction to author's decision if applicable.}
    - **Отклоненные альтернативы:** {Options discussed but rejected (if any).}
    - **Обоснование:** {Explanation of _why_ this change is needed}
    - **Принцип:** {What core principle dictated this decision? (if applicable)}
    - **Статус:** {Согласовано / Недопонимание / Требует уточнения / ...}
    - **Прежнее понимание (если применимо):** {Brief description if changed}
    - **Результат:** {Briefly: Was vision changed? Agreement reached?}
    - **Контекст:**

      > [{Reviewer Name}]({Link}): "{Short rephrased concern}"
      >
      > [{Author Name}]({Link}): "{Short rephrased resolution}"

      ```{lang}
      {1-3 lines max of diff hunk code}
      ```
    ````

    ```

    ```

2.  **Generate & Apply (Questions):**
    - Formulate open questions (if any).
    - **Immediately** call `search_replace` to swap `{{QUESTIONS_PLACEHOLDER}}` (or remove it if empty).

3.  Stop and say: "**Phase 3 Complete: Intents and Questions inserted.**"

**Phase 4: Coverage Report**

1.  **Generate & Apply:**
    - Audit intents against JSON context.
    - **Immediately** call `search_replace` to swap `{{COVERAGE_PLACEHOLDER}}` with the generated table.
    - **Do NOT** output the text to chat first.

    **Content Template:**

    ```markdown
    | Index | User   | Comment ID    | Title (Summary) | Intent/Reason |
    | ----- | ------ | ------------- | --------------- | ------------- |
    | {Idx} | {User} | [{ID}]({URL}) | {3-6 words}     | #{N}          |
    | {Idx} | {User} | [{ID}]({URL}) | {3-6 words}     | #{M},#{N}     |
    | {Idx} | {User} | [{ID}]({URL}) | {3-6 words}     | Skipped       |
    | {Idx} | {User} | [{ID}]({URL}) | {3-6 words}     | Noise         |
    | {Idx} | {User} | [{ID}]({URL}) | {3-6 words}     | Ack           |
    | {Idx} | {User} | [{ID}]({URL}) | {3-6 words}     | Wontfix       |
    | {Idx} | {User} | [{ID}]({URL}) | {3-6 words}     | Discussion    |
    | {Idx} | {User} | [{ID}]({URL}) | {3-6 words}     | Question      |
    ```

    **Rules:**
    1.  Use `index` (e.g. `§1`) from JSON.
    2.  Include **ALL** comments.
    3.  **Monotonic Order:** Sorted by Index with NO GAPS.

2.  Stop and say: "**Phase 4 Complete: Coverage table inserted.**"

**Phase 5: Verification & Cleanup**

1.  **Deep Reconsideration:**
    - Stop and think. Re-read the JSON comments and your generated Intents.
    - Ask: "Did I over-simplify any point? Did I miss a subtle constraint? Is the Todo plan fully complete?"
    - If the discussion was complex, err on the side of adding more Intents rather than merging them.
    - If yes, use `search_replace` to add the missing details (create new Intents if needed).

2.  **Read File:** Read the final `evolution_{DATE}.md` to verify all placeholders are gone.
3.  **Cleanup:** Delete `evolution_{DATE}.json`.
4.  **Final Checklist:** Output this checklist:
    - [ ] **Data Fetched**: All comments retrieved.
    - [ ] **Placeholders Replaced**: No {{...}} tags remain.
    - [ ] **Comments Validated**: All relevant comments mapped.
    - [ ] **Ghost References Fixed**: Verified every Intent # in table has a corresponding section.
    - [ ] **Technical Details Preserved**: Flags, args, types, preserved in text.
    - [ ] **Cleanup**: `evolution_{DATE}.json` deleted.

5.  Stop and say: "**Phase 5 Complete: Document finalized and cleanup done.**"

### 6. Final Checklist (Mandatory Output)

At the very end of your response (after generating the file), you **MUST** output this checklist:

- [ ] **Data Fetched**: All comments retrieved.
- [ ] **Document Generated**: Markdown file created.
- [ ] **Comments Validated**: All relevant comments mapped.
- [ ] **Ghost References Fixed**: Verified every Intent # in table has a corresponding section. Add more intents if necessary.
- [ ] **Technical Details Preserved**: Flags, args, types, proposed function names, and other technical details need to be preserved in text.
