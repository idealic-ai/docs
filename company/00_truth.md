# 00: Company/Writing Standard

> Standard
> The authoritative contract ensuring documentation serves as an absolute source of truth, free from machine artifacts and logical inconsistencies.

## 1. The Document as Truth

A document is a **decision**, not a discussion.

- **Intent is Non-Negotiable:** We must clearly define _what_ we want to achieve before exploring _how_. Intent is the only metric of success and must be distinct from implementation details.
- **Decision over Deliberation:** The goal is not to outline choices, but to make one. If we cannot choose, we must at least define the missing information required to decide.
- **Precision over Persuasion:** Never simplify complexity ("Do Not Lie") and never use persuasive language ("Do Not Sell"). Accuracy is our only metric.
- **Maximum Fidelity:** The source of truth must be internally self-sufficient and fully nuanced. It may use complex jargon to establish specific concepts. We simplify for the audience later; we never simplify the source.
- **Evergreen by Design:** Documents are living specifications. If the concept changes, the document changes first.

## 2. Linearity & Dependencies

We write documents to expose flaws in our thinking. The process of writing is the process of debugging our ideas.

- **Linear Flow:** Explain the system from start to finish. Jumping back and forth indicates **cyclic dependencies** in the architecture itself.
- **Resolve Cycles:** Refactor circular concepts until they stand alone. If a cycle is irreducible, use a **Diagram** to present it as a single visual primitive.

## 3. Organizational Utility

Documentation is work. We do this work upfront because **we cannot jump immediately to execution**. Whether writing code, designing a presentation, or drafting policy, the final medium is often too rigid for structural discovery. Writing forces us to resolve ambiguity before the expensive work begins.

- **Pre-Computation:** A good document is "pre-computed" thinking. It organizes chaos into a structure that maps cleanly to **downstream artifacts** (Classes, Slides, Procedures).
- **Decomposition:** Big ideas must be broken down. A document that grows too large should be refactored into smaller, atomic documents, just as we refactor monolithic code.

## 4. The Standards of Voice

We define our style by **direct assertion** and the rejection of "AI fluff."

1.  **Start In Media Res:** Start immediately with the concrete problem. **Avoid:** Broad summaries ("In today's world") or defining basics ("The 101 Explainer").
2.  **Assert, Don't Hedge:** State what a thing _is_. Commit to your predicate. **Avoid:** "It depends" without specifics, or defining by negation.
3.  **Lead by Content:** Transition via ideas ("This leads to..."), not announcements ("Let's look at..."). **Avoid:** Filler phrases like "It is important to note."
4.  **Evidence Over Authority:** Let logic carry the point. **Avoid:** Justifying via "industry standards" or announcing importance with adverbs ("Crucially").
5.  **Specific & Casual:** Use plain, high-resolution imagery. Speak like an engineer to an engineer. **Avoid:** Stiff corporate speak ("utilize," "leverage").
6.  **Flow Without Signs:** Let logic bridge paragraphs. **Avoid:** Explicit road signs or labeled summaries.
7.  **Universal Context:** Address the condition/need directly, not the demographics. Build the world and stakes immediately.
8.  **Respect the Reader:** Assume a responsible adult. **Avoid:** Unsolicited moral lectures or safety guardrails.

## 5. Content Integrity

To ensure the document is actionable and unambiguous:

- **Segregation of Uncertainty:** Do not mix known intent with uncertain implementation. Clearly demarcate firm decisions from areas of exploration or risk.
- **Temporal Precision:** Use the present tense for specifications ("The system _validates_ input"). Use the future tense _only_ for unimplemented roadmaps. Never mix them in the same paragraph.
- **Concrete Anchoring:** Every abstract concept must be immediately followed by a concrete example, scenario, or data structure. Abstractions without examples are hallucinations waiting to happen.
- **Falsifiability:** Avoid vague adjectives like "fast," "scalable," or "user-friendly." Use falsifiable constraints ("renders in <16ms," "stateless," "max 3 clicks").
- **Negative Space:** Define the boundaries of a system by explicitly stating what it _does not_ handle. Constraints are as important as capabilities.

## Summary

We write to think. We write to bind ourselves to truth. We write to build.
