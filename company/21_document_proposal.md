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

The Proposal Document is the **proposal**. It is written **once** per initiative to signal a desire for change (e.g., adding a feature, restructuring architecture). It is often created through dictation, synthesis of thoughts, or rapid drafting.

It is **Preserved**. It serves as the historical record of the vision change and becomes the **Source of Truth for Jira** (Tickets/Tasks).

## 2. The Need

Why do we write a Proposal Document instead of just coding?

- **Source of Tickets:** This document is the seed from which specific engineering tickets are derived.
- **Separation of Concerns:** It separates "What we want" from "How we implement it." This allows us to debate the value of the idea without getting bogged down in syntax.
- **Safe Exploration:** It allows us to propose radical changes without breaking the source of truth. If a Proposal is rejected, nothing is lost but a text file.
- **Context for the Machine:** LLMs require precise context. This document provides the "instruction prompt" for the machine (and the team).

## 3. Structure

A Proposal Document typically contains:

1.  **The Context:** "We thought X, but we learned Y."
2.  **The Problem:** What is broken, missing, or inefficient?
3.  **The Proposed Solution:** A high-level view of the change.
4.  **Options:** Alternative approaches (if applicable).
5.  **Target:** Specific files or modules in the Specification that will be affected.

## 4. Lifecycle

1.  **Draft:** Created by an author (often dictated/synthesized).
2.  **PR:** Submitted as a Pull Request.
3.  **Discussion:** Debated by the team.
4.  **Refinement:** Updated based on context from :term[22: Company/Alignment]{href="./22_document_alignment.md"}.
5.  **Obsolescence:** Preserved as history, but superseded by the Specification.

## 5. Characteristics

- **Timeframe:** Created within ~1 day.
- **Updates:** Written once to capture the vision change.
- **Nature:** Preserved/Historical.
- **Source of Truth:** **For Jira** (Tickets).
