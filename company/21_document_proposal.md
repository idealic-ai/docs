# 21: Company/Proposal

> [!DEFINITION] Proposal Document
> A transient proposal artifact used to outline a desire for change, improvement, or expansion before execution begins.
>
> Sidenote:
>
> - Part of: :term[02: Company/Process]{href="./02_process.md"}
> - Followed by: :term[22: Company/Alignment]{href="./22_document_alignment.md"}
> - Formerly known as: Intent Document, Evolution Document

## 1. The Core Philosophy

The Proposal Document is essentially an **RFC (Request for Comments)**. It is written **once** per initiative to signal a desire for change. It arises because we cannot write the Specification in one go; we must decompose the problem into steps. One Proposal roughly corresponds to **One Act** of work.

It is **Preserved**. It serves as the historical record of the vision change and becomes the **Source of Truth for Intent**.

## 2. The Need

Why do we write a Proposal Document instead of just coding?

- **Overcoming the "Blank Slate":** We cannot automate human intent. The Proposal forces us to extract thoughts from the subconscious. **Dictation** is the preferred method to break paralysis and generate the initial seed content.
- **Source of Tickets:** This document is the seed from which specific engineering tickets are derived. It ensures work is broken down into atomic, manageable chunks (e.g., 1-day tasks).
- **Separation of Concerns:** It separates "What we want" from "How we implement it." This allows us to debate the value of the idea without getting bogged down in syntax.
- **Safe Exploration:** It allows us to propose radical changes without breaking the source of truth. If a Proposal is rejected, nothing is lost but a text file.
- **Context for the Machine:** LLMs require precise context. This document provides the "instruction prompt" for the machine (and the team).

## 3. Structure

A Proposal Document typically contains:

1.  **The Context:** "We thought X, but we learned Y."
2.  **The Problem:** What is broken, missing, or inefficient?
3.  **The Scope (Negative Space):** Explicitly state **what we are NOT doing**. This prevents scope creep (e.g., "We are fixing the presentation layer, NOT re-architecting the backend").
4.  **The Proposed Solution:** A high-level view of the change.
5.  **Options:** Alternative approaches (if applicable).
6.  **Target:** Specific files or modules in the Specification that will be affected.

## 4. Lifecycle

1.  **Draft:** Created by an author. **Tip:** Dictate your thoughts to generate the first draft quickly.
2.  **PR:** Submitted as a Pull Request.
3.  **Discussion:** Debated by the team.
4.  **Refinement:** Updated based on context from :term[22: Company/Alignment]{href="./22_document_alignment.md"}.
5.  **Obsolescence:** Preserved as history, but superseded by the Specification.

## 5. Characteristics

- **Timeframe:** Created within ~1 day.
- **Updates:** Written once to capture the vision change.
- **Nature:** Preserved/Historical.
- **Source of Truth:** **For Intent**.
- **Analogy:** RFC / One Act.
