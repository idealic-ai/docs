# 51: Prompt/Alignment

> [!DEFINITION] Alignment Document
> An auto-generated synthesis of the review process that captures shared consensus, resolved conflicts, and precise instructions for execution.
>
> Sidenote:
>
> - See: :term[22: Company/Alignment]{href="./22_document_alignment.md"} for the definition.
> - Formerly: Evolution Draft

## Invariance Rules

**STRICTLY MAINTAIN THESE RULES:**

1. **Transient Storage:** You MAY create `{OUTPUT_DIR}/{FILENAME}.ndjson` to store raw comments. Do NOT create other temporary files.
2. **One-Pass Fetching:** Fetch all necessary data (comments) in a single API call per resource. Do NOT paginate manually or loop.
3. **Validation Source:** Always validate against the **existing context** (JSON), never re-fetch for validation.
4. **Language:** The output document MUST be in **Russian** (except for code/technical terms).
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
    }
  }
}
```

**Step 0: Resolve Parameters**

1.  Analyze the user's prompt to extract these values.
2.  **Missing Required:** If `pr_number` is missing, **STOP** and ask for it.
3.  **Defaults:** Apply defaults for missing optional parameters.

**Step 1: Output Configuration (First Response)**
You **MUST** output the resolved configuration as your very first response block:

```text
> Alignment Config:
--------------------------------
[x] Repo:        {repo}
[x] PR Number:   {pr_number}
[x] Since Date:  {since_date}
[x] Output Dir:  {output_dir}
[x] Filename:    {filename}
--------------------------------
Starting analysis...
```

### 2. Data Retrieval

**RESTRICTION:** You are permitted to make ONLY the following external requests:

1.  **HTTP GET** via curl to `https://idealic.academy/raw/simple-ru/company/02_process.md`
2.  **HTTP GET** via curl to `https://idealic.academy/raw/simple-ru/company/50_prompt_truth.md`
3.  **GitHub Pull Request API** call (to identify author)
4.  **GitHub Comments API** call (via the one-liner below)

**Step 1: Fetch Prerequisite Docs (Mandatory)**
Fetch the specific URLs. Process each document separately.

```bash
# 1. Process & Truth
curl https://idealic.academy/raw/simple-ru/company/02_process.md
curl https://idealic.academy/raw/simple-ru/company/50_prompt_truth.md

# 2. Alignment Definition
curl https://idealic.academy/raw/simple-ru/company/22_document_alignment.md
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
        | map(.value + {index: ("§" + ((.key + 1) | tostring))} | del(.html_url))
        | group_by(.in_reply_to_id // .id)
        | sort_by(.[0].index | ltrimstr("§") | tonumber)
        | map(.[0] as $root | [$root] + (.[1:] | map(del(.diff_hunk))))
        | map(map({
        id,
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
5.  **Phase 5: Coverage Report** (pending)
6.  **Phase 6: LLM Assessment** (pending)
7.  **Phase 7: Verification & Cleanup** (pending)

### 4. Methodology: Intelligent Synthesis

**Method: Intelligent Synthesis**

- :term[02: Company/Process]{href="https://idealic.academy/en/company/02_process.md/"}
- :term[50: Prompt/Truth]{href="https://idealic.academy/en/company/50_prompt_truth.md/"}

**Constraint:** The output document must be in **Russian**.

**Completeness is the priority:**

- **Capture Detail:** Preserve technical instructions.
- **Atomicity:** One Intent = One Distinct Technical Change.
- **Coverage:** Map every comment.

### 5. Document Generation Workflow

#### 5.1. Phase 1: Setup & Data

1.  **Fetch Data:** Docs, PR, Comments.
2.  **Initialize File:**
    - Create `{OUTPUT_DIR}/{FILENAME}.md` with the skeleton **EXACTLY**:

    ```markdown
    # Alignment: {DATE}

    - Status: Consensus Draft
    - Author: {PR_AUTHOR}
    - Source: {PR_LINK}
    - Range: {SINCE_DATE} - {NOW}

    > [!WARNING] АВТО-ГЕНЕРАЦИЯ: НЕ ПРАВИТЬ, НЕ КОММИТИТЬ
    > Этот документ — **инструмент синхронизации**. Он служит:
    >
    > 1. **Валидатором:** Проверяет, что 100% комментариев услышаны.
    > 2. **Синтезатором:** Превращает дискуссию в готовый план (Consensus).
    > 3. **Промптом:** Дает инструкции для обновления Proposal.
    >
    > Если документ неверен, **не правьте текст руками**. Добавьте комментарии в PR и **перегенерируйте**, чтобы замкнуть цикл обратной связи.
    >
    > **НЕ ДОБАВЛЯЙТЕ ЭТОТ ФАЙЛ В GIT.**
    >
    > - Подробнее: [22: Alignment](https://idealic.academy/raw/simple-ru/company/22_document_alignment.md)
    > - В Git попадают только: [Proposal](https://idealic.academy/raw/simple-ru/company/21_document_proposal.md) и [Specification](https://idealic.academy/raw/simple-ru/company/20_document_spec.md).

    ## Обзор

    {{OVERVIEW_PLACEHOLDER}}

    ## Список Намерений (Consensus)

    {{INTENTS_PLACEHOLDER}}

    {{QUESTIONS_PLACEHOLDER}}

    {{COVERAGE_PLACEHOLDER}}

    {{OPINION_PLACEHOLDER}}

    ## Инструкции для Агента (Next Step)

    > [!IMPORTANT] Context Loading
    > Before proceeding with updates to the Proposal or Specification, you **MUST** load the following context files to ensure full alignment with company standards:
    >
    > 1. `curl https://idealic.academy/raw/simple-ru/company/02_process.md` (Process)
    > 2. `curl https://idealic.academy/raw/simple-ru/company/50_prompt_truth.md` (Truth)
    > 3. `curl https://idealic.academy/raw/simple-ru/company/20_document_spec.md` (Spec)
    > 4. `curl https://idealic.academy/raw/simple-ru/company/21_document_proposal.md` (Proposal)
    > 5. `curl https://idealic.academy/raw/simple-ru/company/22_document_alignment.md` (Alignment)
    ```

#### 5.2. Phase 2: Load Context

1.  **Analyze Data:**
    - **Count Threads:** Run `wc -l {OUTPUT_DIR}/{FILENAME}.ndjson` (Each line is one thread).
    - **Count Comments:** Run `jq 'length' {OUTPUT_DIR}/{FILENAME}.ndjson | awk '{s+=$1} END {print s}'`.
    - **Report:** Output these numbers clearly (e.g., "Found 45 threads containing 150 comments").

2.  **Read into Context:** Use standard agent tools to read `{OUTPUT_DIR}/{FILENAME}.ndjson`.
    - **Read Loop (Mandatory):** Read in 25-line chunks until end.

#### 5.3. Phase 3: Overview

**Analysis:**
Answer these 8 questions explicitly in a bulleted list:

1.  **Чего хотел ревьюер:**
2.  **С чем согласился автор:**
3.  **С чем автор НЕ согласился:**
4.  **Общий контекст:**
5.  **Недопонимания:**
6.  **Открытые вопросы:**
7.  **Новые открытия:**
8.  **Связанные документы:**

**Generation:**

- Swap `{{OVERVIEW_PLACEHOLDER}}`.

#### 5.4. Phase 4: Intents

**Analysis:**
Goal: **Hyper-Granular Atomicity**.

- **Split Rule:** No "AND". Split complex threads.
- **Atomicity:** One Intent = One Distinct Technical Change.

**Generation:**

- Swap `{{INTENTS_PLACEHOLDER}}`.
- **Content Template:**

  ````markdown
  ### {N}. {Short Title in Russian}

  - **Категория:** {Логика / Архитектура / ...}
  - **Намерение:** {Single core desire}
  - **Подход автора:** {Initial approach}
  - **Предложение ревьюера:** {Suggestion}
  - **Решение автора:** {Final decision}
  - **Реакция ревьюера:** {Follow-up}
  - **Обоснование:** {Why}
  - **Статус:** {Согласовано / Недопонимание / ...}
  - **Результат:** {Briefly: Vision changed? Agreement?}

  > [{Reviewer Name}]({ID}): "{Short rephrase}"
  >
  > [{Author Name}]({ID}): "{Short rephrase}"

  ```{lang}
  {1-3 lines max of diff hunk code}
  ```
  ````

- Swap `{{QUESTIONS_PLACEHOLDER}}`.

#### 5.5. Phase 5: Coverage Report

**Analysis:**

- **Audit:** Read list. Compare vs JSON.
- **Map Every Comment:** Ensure every index (e.g., `§1`) is mapped.

**Generation:**

- Swap `{{COVERAGE_PLACEHOLDER}}`.
- **CRITICAL:** Do NOT generate the table in parts. You must generate the **entire** table in a single `search_replace` call after all context has been loaded.
- **Content Template:**

  Create a **SINGLE** table. Group comments by Date. Insert a "Header Row" for each new date. Precede the table with the section heading:

  ```markdown
  ---

  ## Отчет о покрытии

  | Index         | Date/Time      | User   | Title (Summary) | Intent    | Reaction |
  | ------------- | -------------- | ------ | --------------- | --------- | -------- |
  |               | **{Date}**     |        |                 |           |          |
  | [{Idx}]({ID}) | {dd.MM HH:mm}  | {User} | {4-6 words}     | #{N}      | {Emojis} |
  | [{Idx}]({ID}) | {dd.MM HH:mm}  | {User} | └ {4-6 words}   | #{M},#{N} | {Emojis} |
  |               | **{NextDate}** |        |                 |           |          |
  | [{Idx}]({ID}) | {dd.MM HH:mm}  | {User} | {4-6 words}     | -         | {Emojis} |
  | [{Idx}]({ID}) | {dd.MM HH:mm}  | {User} | ├ {4-6 words}   | #{N}      | {Emojis} |
  | [{Idx}]({ID}) | {dd.MM HH:mm}  | {User} | └ {4-6 words}   | #{N}      | {Emojis} |
  | [{Idx}]({ID}) | {dd.MM HH:mm}  | {User} | {4-6 words}     | -         | {Emojis} |
  ```

  **Rules:**
  1.  Use `index` (e.g. `§1`) from JSON.
  2.  **Exhaustive:** Every single comment must have its own row. Do not summarize into ranges (e.g. `§1-§5`).
  3.  **Visualization:** Use `├` and `└` to show replies.
  4.  **Status Indicators (Emojis):** ❓(Unanswered), ⚠️(Warning), 🚧(Pending), 🗑️(Deleted), 🗣️(Reply), 💡(Idea), 🤝(Agreed).
  5.  **Sorting:** **Strictly by Index (§1, §2...).** The input is already grouped by thread and sorted. You MUST preserve this order.
  6.  **Grouping:** Insert a Date Header `| | **{Date}** | | | | |` ONLY when the **Thread Start Date** changes. Do NOT split a thread across multiple date headers, even if replies span multiple days. Keep the entire thread under the date the thread started.

#### 5.6. Phase 6: LLM Assessment

**Generation:**

- Swap `{{OPINION_PLACEHOLDER}}`.
- **Content:** Quality, Opinion, What to learn, Questions.

#### 5.7. Phase 7: Verification & Cleanup

1.  **Deep Reconsideration:** Audit completeness.
2.  **Link Patching (Token Optimization Strategy):**
    - **Context:** During generation, we intentionally used short Comment IDs (e.g., `12345678`) in markdown links (e.g. `[Index](12345678)`) instead of full URLs to save context window tokens. Now we must "hydrate" them back into clickable links.
    - **Direction:** Replace `(ID)` with `(https://github.com/...#issuecomment-ID)`.
    - **Action:** Run the following `sed` command to batch-replace all standalone Comment IDs with full GitHub URLs.
    - **Command:**
      ```bash
      sed -i '' 's|](\([0-9]\{7,\}\))|](https://github.com/{OWNER}/{REPO}/pull/{PR_NUMBER}#issuecomment-\1)|g' {OUTPUT_DIR}/{FILENAME}.md
      ```
3.  **Read File:** Verify placeholders gone.
4.  **Cleanup:** Delete `{OUTPUT_DIR}/{FILENAME}.ndjson`.

### 6. Final Output

Output checklist:

- [ ] **Data Fetched**
- [ ] **Document Generated**
- [ ] **Comments Validated**
- [ ] **Ghost References Fixed**
- [ ] **Technical Details Preserved**
