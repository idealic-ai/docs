# 51: Prompt/Evolution Draft

> [!DEFINITION] Evolution Draft
> A transient, rapid-response artifact used to align on changes, correct misconceptions, and provide context for execution before updating the Main Document.
>
> Sidenote:
>
> - See: :term[02: Company/Process]{href="./02_process.md"} for the process definition.

## Invariance Rules

> **STRICTLY MAINTAIN THESE RULES:**
>
> 1. **Transient Storage:** You MAY create `evolution_{DATE}.json` to store raw comments. Do NOT create other temporary files.
> 2. **One-Pass Fetching:** Fetch all necessary data (comments) in a single API call per resource. Do NOT paginate manually or loop.
> 3. **Validation Source:** Always validate against the **existing context** (JSON), never re-fetch for validation.
> 4. **Language:** The output document MUST be in **Russian** (except for code/technical terms).
> 5. **Completeness:** Every single comment must be accounted for in the Coverage Report.

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
    gh api "repos/{OWNER}/{REPO}/pulls/{PR_NUMBER}/comments?since={SINCE_DATE}&per_page=200" --paginate --jq 'map({id, body, user: .user.login, created_at, html_url, diff_hunk, in_reply_to_id}) | sort_by(.created_at) | to_entries | map({index: ("§" + (.key + 1 | tostring)), comment: .value}) | map(.comment + {index: .index}) | group_by(.in_reply_to_id // .id) | map(.[0] as $root | [$root] + (.[1:] | map(del(.diff_hunk))))' | jq '.' > evolution_{DATE}.json
    ```

2.  **Read into Context:** Use standard agent tools to read `evolution_{DATE}.json`.
    - Read in chunks of 100 lines (in parallel if possible).
    - **Do NOT** count comments or process data during reading.
    - **Do NOT** massage the data.
    - Simply read the raw content "out loud" into the context.

### 3. Analysis & Synthesis (Language: Russian)

**Step 0: Initialize Plan**

Before starting the analysis, you **MUST** create a Todo list using the `todo_write` tool to track your progress through the phases.

**Required Plan Structure:**

1.  **Phase 1: Intro** (pending)
    - Synthesize Overview
    - Create File
2.  **Phase 2: Intents** (pending)
    - Analyze Threads
    - Write Intents
3.  **Phase 3: Validation** (pending)
    - Count Comments
    - Map Comments to Intents
    - Write Validation Table
4.  **Phase 4: Finalize** (pending)
    - Run Self-Check
    - Fix Issues (if any)
    - Finalize Document

**Method: Intelligent Synthesis ("LLM Magic")**

- :term[02: Company/Process]{href="https://idealic.academy/en/company/02_process.md/"} (Understanding the role of Evolution Documents)
- :term[50: Prompt/Truth]{href="https://idealic.academy/en/company/00_truth.md/"} (Writing standards: assertiveness, precision, no fluff)

**Constraint:** The output document must be in **Russian**. (Exceptions: colloquialisms like "yeah", "ok" or technical terms).

**Method: Intelligent Synthesis ("LLM Magic")**
This is **NOT** a programmatic JSON-to-Markdown conversion. You must apply intelligence to create a compact, truthful summary:

- **Paraphrase & Shorten:** Compress comments to their essence while retaining the meaning. Avoid copy-pasting long blocks.
- **Technical Fidelity:** If a comment mentions parameters, types, flags, arguments, or environment variables, you **MUST** include them. Do not abstract them away.
- **Filter Noise:** Omit comments that do not add value or context to the intent.
- **Curate Context:** Include only the specific lines of diff hunks that are relevant to the point being made.
- **Goal:** Create a document that is compact, to the point, and truthful.

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

You must generate the document in **five separate phases**. In Phases 1-4, you will output the content to the chat. You will **only write to the file in Phase 5**, combining all parts.

**Phase 1: Roles & Data**

1.  Fetch PR details and Comments.
2.  Identify Author vs Reviewers.
3.  Stop and say: "**Phase 1 Complete: Roles identified. Reviewing {N} comments.**"

**Phase 2: The Intro**

1.  Generate the Header and Overview sections.
2.  **Output to Chat:** Display the generated content directly as normal text (do not wrap the entire section in a markdown code block).
3.  Stop and say: "**Phase 1 Complete: Overview generated.**"

**Phase 3: The Intents**

1.  Generate the "List of Intents" section.
2.  **Output to Chat:** Display the generated content directly as normal text (do not wrap the entire section in a markdown code block).
3.  Stop and say: "**Phase 3 Complete: Intents generated.**"

**Phase 4: Coverage Report**

1.  **Status Update:** Count the total comments in the JSON context and say: "**Checking coverage for {N} comments...**"
    > **NOTE:** Do NOT re-fetch comments. Audit **MUST** be performed against the JSON data already loaded in the context.
2.  Generate the "Coverage Report" table.
3.  **Output to Chat:** Display the generated content directly as normal text (do not wrap the entire section in a markdown code block).
4.  Stop and say: "**Phase 4 Complete: Coverage table generated.**"

**Phase 5: Finalize & Write**

1.  Combine all generated parts (Intro + Intents + Coverage + Checklist).
2.  **Write to File:** Create/Overwrite `evolution_{DATE}.md` with the **FULL** content.
3.  Review the file against the checklist criteria.
4.  **CRITICAL:** If you find any issues, **Go Back**, fix the content, and overwrite the file again.
5.  If everything is correct, stop and say: "**Phase 5 Complete: Document finalized.**"

**Required Structure for the Complete File:**

````markdown
# Evolution Draft: {DATE}

> Status: Draft
> Source: {PR_LINK}

## Обзор

{A high-level synthesis of the review cycle in Russian. Answer the following:}

1.  **Чего хотел ревьюер:** {Main themes of feedback/criticism}
2.  **С чем согласился автор:** {Key concessions or strategic shifts}
3.  **С чем автор НЕ согласился:** {Points where the author pushed back or disagreed, and why}
4.  **Общий контекст:** {Any misunderstandings cleared or vision changes confirmed}
5.  **Недопонимания (если есть):** {List specific points of confusion}
6.  **Открытые вопросы (если есть):** {Points discussed but not resolved}
7.  **Новые открытия:** {Insights gained during discussion}
8.  **Связанные документы:** {Links to related docs mentioned}

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

  ```{lang}
  {1-3 lines max of diff hunk code}
  {Use ellipses ... for long lines (>80 chars)}
  {Total block size < 240 chars}
  ```

---

## Открытые вопросы и Риски (если есть)

1. **{Question/Threat}**: {Description}
   - **Контекст**: {Link or explanation}

---

## Отчет о покрытии

| Index | User   | Comment ID    | Title (Summary) | Intent/Reason   |
| ----- | ------ | ------------- | --------------- | --------------- |
| {Idx} | {User} | [{ID}]({URL}) | {3-6 words}     | #{N}            |
| {Idx} | {User} | [{ID}]({URL}) | {3-6 words}     | Skipped (Noise) |
| {Idx} | {User} | [{ID}]({URL}) | {3-6 words}     | Duplicate       |

**IMPORTANT:**

1. Use the `index` field (e.g. `§1`) from the JSON for the **Index** column.
2. The table must contain **ALL** comments from the JSON data, ensuring that every index (from §1 to §Max) has a corresponding row.
3. The count of rows in this table must equal the maximum index number found in the JSON.
4. **Monotonic Order:** The rows must be sorted by Index (1, 2, 3...) with **NO GAPS**. Do not skip any numbers.

5. **Root Comments** (start of a thread)
6. **Replies** (responses within a thread)
7. **Standalone Comments**

Do not exclude any comment ID found in the JSON.
````

### 6. Final Checklist (Mandatory Output)

At the very end of your response (after generating the file), you **MUST** output this checklist:

- [ ] **Data Fetched**: All comments retrieved.
- [ ] **Document Generated**: Markdown file created.
- [ ] **Comments Validated**: All relevant comments mapped.
- [ ] **Ghost References Fixed**: Verified every Intent # in table has a corresponding section. Add more intents if necessary.
- [ ] **Technical Details Preserved**: Flags, args, types, proposed function names, and other technical details need to be preserved in text.
