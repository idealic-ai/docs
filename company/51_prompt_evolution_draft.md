# 51: Prompt/Evolution Draft

> [!DEFINITION] Evolution Draft
> A transient, rapid-response artifact used to align on changes, correct misconceptions, and provide context for execution before updating the Main Document.
>
> Sidenote:
>
> - See: :term[02: Company/Process]{href="./02_process.md"} for the process definition.

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
3.  **GitHub Comments API** call (via the one-liner below)

Do **NOT** fetch other file contents, commits, or diffs separately.

**Step 1: Fetch Prerequisite Docs (Mandatory)**
Use `web_search` or an HTTP tool to read the full content of these standards:

- [02: Company/Process](https://idealic.academy/en/company/02_process.md/)
- [50: Prompt/Truth](https://idealic.academy/en/company/00_truth.md/)

**Step 2: Fetch Comments (One-Liner)**
Execute this exact command. Replace `{PR_NUMBER}` (e.g., 123) and `{SINCE_DATE}` (e.g., 2025-01-01).

```bash
gh api "repos/{OWNER}/{REPO}/pulls/{PR_NUMBER}/comments?since={SINCE_DATE}&per_page=100" --paginate --jq 'map({id, body, user: .user.login, created_at, html_url, diff_hunk, in_reply_to_id}) | group_by(.in_reply_to_id // .id) | map(sort_by(.created_at) | .[0] as $root | [$root] + (.[1:] | map(del(.diff_hunk))))' | jq '.' > "comments_{SINCE_DATE}.json"
```

### 3. Analysis & Synthesis (Language: Russian)

**Constraint:** The output document must be in **Russian**. (Exceptions: colloquialisms like "yeah", "ok" or technical terms).

**Method: Intelligent Synthesis ("LLM Magic")**
This is **NOT** a programmatic JSON-to-Markdown conversion. You must apply intelligence to create a compact, truthful summary:

- **Paraphrase & Shorten:** Compress comments to their essence while retaining the meaning. Avoid copy-pasting long blocks.
- **Filter Noise:** Omit comments that do not add value or context to the intent.
- **Curate Context:** Include only the specific lines of diff hunks that are relevant to the point being made.
- **Goal:** Create a document that is compact, to the point, and truthful.

Analyze the JSON. Your goal is **Completeness**. Every distinct thread or discussion topic must be represented.

**For each item, determine:**

1.  **Intent:** What is the core desire?
2.  **Explanation:** _Why_ is this change happening? What is the underlying reasoning or meaning? Synthesize this from the discussion to provide context for the LLM.
3.  **Action:** What needs to change?
4.  **Vision Impact:** Did the long-term vision change?
5.  **Agreement Status:** Is it agreed? Is there a misunderstanding?
    - If the author **did not reply**, mark as: "Требует подтверждения (Needs acknowledgement)".
6.  **Context:** The proof (quotes).

### 4. Validation

**CRITICAL STEP:** Before finalizing the document, you must perform a self-validation:

1.  Read the generated list of items.
2.  Compare against the `comments_{DATE}.json`.
3.  **Map Every Comment:** Ensure every comment ID (especially root comments of threads) is mapped to a specific Intent Number.
4.  **Consistency Check:** Verify that every Intent number referenced in the validation table corresponds to an actual section in the text.
    - **Fix:** If you find a "ghost reference" (an Intent number in the table that doesn't exist in the text), you **MUST** go back and generate that missing Intent section. Do not just delete the reference; add the content.
5.  **Question:** "Did I miss _any_ thread?"
6.  If yes, add it immediately.

### 5. Document Generation

Create a new file (e.g., `evolution_{DATE}.md`).

**Required Structure:**

```markdown
# Evolution Draft: {DATE}

> Status: Draft
> Source: {PR_LINK}

## Обзор

{A high-level synthesis of the review cycle in Russian. Answer the following:}

1.  **Чего хотел ревьюер:** {Main themes of feedback/criticism}
2.  **С чем согласился автор:** {Key concessions or strategic shifts}
3.  **Общий контекст:** {Any misunderstandings cleared or vision changes confirmed}
4.  **Недопонимания (если есть):** {List specific points of confusion}
5.  **Открытые вопросы (если есть):** {Points discussed but not resolved}
6.  **Новые открытия:** {Insights gained during discussion}
7.  **Связанные документы:** {Links to related docs mentioned}

## Список Намерений

<!-- Repeat for EVERY distinct topic/thread found in JSON -->

### {N}. {Short Title in Russian}

- **Намерение:** {What do we want to achieve?}
- **Обоснование:** {Explanation of _why_ this change is needed, synthesizing the reasoning from the comments}
- **Действие:** {Concrete steps to take.}
- **Статус:** {Согласовано / Недопонимание / Требует уточнения / Изменение видения / Требует подтверждения}
- **Прежнее понимание (если применимо):** {Brief description of previous understanding/vision if changed}
- **Результат:** {Briefly: Was vision changed? Agreement reached? Misunderstanding cleared?}
- **Контекст:**
  > [{Reviewer Name}]({Link}): "{Short rephrased concern}"
  >
  > [{Author Name}]({Link}): "{Short rephrased resolution}" (or "No reply")
  >
  > _Diff Context:_ `{1-2 lines max, only if necessary}`

---

## Отчет о валидации

| Comment ID    | Title (Summary) | Intent # | Status          |
| ------------- | --------------- | -------- | --------------- |
| [{ID}]({URL}) | {3-6 words}     | {N}      | Included        |
| [{ID}]({URL}) | {3-6 words}     | -        | Skipped (Noise) |
```
