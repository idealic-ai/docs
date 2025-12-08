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

1.  **HTTP GET** via curl to `https://idealic.academy/raw/en/company/02_process.md/` - read in full, avoid summarization
2.  **HTTP GET** via curl to `https://idealic.academy/raw/en/company/50_prompt_truth.md/` - read in full, avoid summarization
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

### 3. Execution Management

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
5.  **Phase 5: LLM Assessment** (pending)
    - Analyze Quality & Opinion
    - Write Assessment
6.  **Phase 6: Verification & Cleanup** (pending)
    - Run Self-Check
    - Fix Issues (if any)
    - Finalize Document

### 4. Methodology: Intelligent Synthesis

**Method: Intelligent Synthesis ("LLM Magic")**

- :term[02: Company/Process]{href="https://idealic.academy/en/company/02_process.md/"} (Understanding the role of Evolution Documents)
- :term[50: Prompt/Truth]{href="https://idealic.academy/en/company/00_truth.md/"} (Writing standards: assertiveness, precision, no fluff)

**Constraint:** The output document must be in **Russian**. (Exceptions: colloquialisms like "yeah", "ok" or technical terms).

This is **NOT** a programmatic JSON-to-Markdown conversion. You must apply intelligence to create a truthful summary, but **Completeness** is the priority:

- **Capture Detail:** Do not over-compress. If a comment contains specific technical instructions, logic changes, or multiple distinct points, preserve them.
- **Atomicity (Critical):** One Intent = One Distinct Technical Change. **NEVER** bundle unrelated changes (e.g., "Optimization flags" AND "Deployment steps") into one item, even if they were discussed in the same thread. Split them into separate intents (e.g., "CI/CD Parallel Flags" and "Deployment Step Refactoring").
- **Separation:** If a discussion branches into multiple topics, create separate Intents. Better to have more granular intents than to lose detail in a merged one.
- **Technical Fidelity:** If a comment mentions parameters, types, flags, arguments, or environment variables, you **MUST** include them. Do not abstract them away.
- **Filter Noise:** Omit comments that do not add value or context to the intent.
- **Curate Context:** Include only the specific lines of diff hunks that are relevant to the point being made.
- **Goal:** Create a document that is **complete** and **comprehensive**. Completeness and clarity take precedence over compactness.

### 5. Document Generation Workflow

You must generate the document by **systematically replacing placeholders** in a pre-created file.

#### 5.1. Phase 1: Setup & Data

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

    ---

    ## Мнение и Рекомендации AI

    {{OPINION_PLACEHOLDER}}
    ```

3.  Stop and say: "**Phase 1 Complete: Data fetched & File initialized.**"

#### 5.2. Phase 2: Overview

**Analysis:**

Synthesize the Overview content by answering these 8 questions.
**Content Requirements:** You **MUST** explicitly answer these 8 questions in the output using a bulleted list. Do not merge them into a paragraph or skip any.

1.  **Чего хотел ревьюер:** {Main themes of feedback/criticism}
2.  **С чем согласился автор:** {Key concessions or strategic shifts}
3.  **С чем автор НЕ согласился:** {Points where the author pushed back or disagreed, and why}
4.  **Общий контекст:** {Any misunderstandings cleared or vision changes confirmed}
5.  **Недопонимания (если есть):** {List specific points of confusion}
6.  **Открытые вопросы (если есть):** {Points discussed but not resolved}
7.  **Новые открытия:** {Insights gained during discussion}
8.  **Связанные документы:** {Links to related docs mentioned}

**Generation:**

1.  **Generate & Apply:**
    - **Immediately** call `search_replace` to swap `{{OVERVIEW_PLACEHOLDER}}` with the generated text.
    - **Do NOT** output the text to chat first. The tool call is the generation.

2.  Stop and say: "**Phase 2 Complete: Overview inserted.**"

#### 5.3. Phase 3: Intents

**Analysis:**

Your goal is **Hyper-Granular Atomicity**.

**THE "AND" RULE (STRICT):**
If you are tempted to write a Title or Intent that contains "AND" or commas to list multiple features (e.g., "Network Architecture AND Edge Routing"), you are **WRONG**. Stop. Split it into two items immediately.

**Examples of splitting:**

- **Bad:** "Optimization and Testing of CI/CD"
- **Good:** "Adding Test Step to CI/CD"
- **Good:** "Enabling Parallel Build Flags"
- **Bad:** "Network Isolation and Routing"
- **Good:** "Network Isolation Strategy"
- **Good:** "Routing via Host Ports"

**For each item, determine:**

1.  **Intent:** What is the SINGLE core desire? (If there are two desires, create two items).
2.  **Explanation:** _Why_ is this change happening? What is the underlying reasoning or meaning? Synthesize this from the discussion to provide context for the LLM.
3.  **Action:** What needs to change?
4.  **Vision Impact:** Did the long-term vision change?
5.  **Agreement Status:** Is it agreed? Is there a misunderstanding?
    - If the author **did not reply**, mark as: "Needs acknowledgement".
6.  **Context:** The proof (quotes) and/or specific code location (if applicable).
7.  **Questions:** What specifically should the author clarify or answer about this intent?

**Generation:**

1.  **Generate & Apply:**
    - Analyze threads and formulate the list of intents.
    - **Split Rule:** Apply the "AND" Rule rigorously. Better to have 20 small intents than 5 large ones.
    - **Immediately** call `search_replace` to swap `{{INTENTS_PLACEHOLDER}}` with the full markdown list.
    - **Do NOT** output the text to chat first.

    **Content Template (Repeat for each Intent):**

    ````markdown
    ### {N}. {Short Title in Russian}

    - **Категория:** {Логика / Архитектура / Стиль / Документация / Процесс / etc}
    - **Намерение:** {What do we want to achieve? SINGLE thing.}
    - **Подход автора:** {The initial approach or code taken by the author before feedback.}
    - **Предложение ревьюера:** {The suggestion or concern raised by the reviewer.}
    - **Решение автора:** {The final decision or solution adopted by the author.}
    - **Реакция ревьюера:** {The follow-up reaction to author's decision if applicable.}
    - **Отклоненные альтернативы:** {Options discussed but rejected (if any).}
    - **Обоснование:** {Explanation of _why_ this change is needed}
    - **Ожидание**: {What is expected of author to do which was not acked?}
    - **Неучтенные детали**: {What has author missed when implementing in their decision?}
    - **Вопросы от ллм**: {Questions from LLM to author regarding this intent}
    - **Принцип:** {What core principle dictated this decision? (if applicable)}
    - **Статус:** {Согласовано / Недопонимание / Требует уточнения / ...}
    - **Прежнее понимание (если применимо):** {Brief description if changed}
    - **Результат:** {Briefly: Was vision changed? Agreement reached?}
    - **Дискуссия:**
      > [{Reviewer Name}]({Link}): "{Short rephrased concern}"
      >
      > [{Author Name}]({Link}): "{Short rephrased resolution}"
    - **Контекст**
      ```{lang}
      {1-3 lines max of diff hunk code}
      ```
    ````

2.  **Generate & Apply (Questions):**
    - Formulate open questions (if any).
    - **Immediately** call `search_replace` to swap `{{QUESTIONS_PLACEHOLDER}}` (or remove it if empty).

3.  Stop and say: "**Phase 3 Complete: Intents and Questions inserted.**"

#### 5.4. Phase 4: Coverage Report

**Analysis (Audit & Coverage Check):**

**CRITICAL STEP:** Before finalizing the document, you must perform a self-audit to ensure complete coverage:

1.  Read the generated list of items.
2.  Compare against the JSON output.
3.  **Map Every Comment:** Ensure every comment (referencing its `index`, e.g. `§1`) is mapped to a specific Intent Number.
4.  **Consistency Check:** Verify that every Intent number referenced in the coverage table corresponds to an actual section in the text.
    - **Fix:** If you find a "ghost reference" (an Intent number in the table that doesn't exist in the text), you **MUST** go back and generate that missing Intent section. Do not just delete the reference; add the content.
5.  **Question:** "Did I miss _any_ thread?"
6.  **Technical Check:** Did I miss any important flags or parameters mentioned in the comments?
7.  If yes, add details to the relevant Intent.

**Generation:**

1.  **Generate & Apply:**
    - Audit intents against JSON context.
    - **Immediately** call `search_replace` to swap `{{COVERAGE_PLACEHOLDER}}` with the generated table.
    - **Do NOT** output the text to chat first.
    - **Do NOT** write helper scripts because you need to do summary yourself.

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

#### 5.5. Phase 5: LLM Assessment

**Analysis:**

Reflect on the generated content and the original discussion.

**Generation:**

1.  **Generate & Apply:**
    - Synthesize your opinion and assessment.
    - **Immediately** call `search_replace` to swap `{{OPINION_PLACEHOLDER}}` with the generated text.

    **Content Requirements:**
    1.  **Качество документа:** Is the document generated correctly? Are all details and nuances acknowledged?
    2.  **Мнение о дискуссии:** What does the LLM think about the discussion and the ongoing practical advice?
        - **Conflict Analysis:** Was the conflict resolved constructively?
        - **Risk Assessment:** Are there hidden risks in the agreed solution?
        - **Process Adherence:** Did the participants follow the process (Truth/Process docs)?
        - **Completeness of solution:** Is the solution "half-baked"?
    3.  **Что изучить:** Is there anything we can read or learn to get more details about?
    4.  **Вопросы:** Are there any questions that need to be answered before we can move on?

2.  Stop and say: "**Phase 5 Complete: LLM Assessment inserted.**"

#### 5.6. Phase 6: Verification & Cleanup

1.  **Deep Reconsideration:**
    - Stop and think. Re-read the JSON comments and your generated Intents.
    - Ask: "Did I over-simplify any point? Did I miss a subtle constraint? Is the Todo plan fully complete?"
    - Ask: "Are any intents bunched up (containing 'AND')? If so, split them."
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

5.  Stop and say: "**Phase 6 Complete: Document finalized and cleanup done.**"

### 6. Final Output

At the very end of your response (after generating the file), you **MUST** output this checklist:

- [ ] **Data Fetched**: All comments retrieved.
- [ ] **Document Generated**: Markdown file created.
- [ ] **Comments Validated**: All relevant comments mapped.
- [ ] **Ghost References Fixed**: Verified every Intent # in table has a corresponding section. Add more intents if necessary.
- [ ] **Technical Details Preserved**: Flags, args, types, proposed function names, and other technical details need to be preserved in text.
