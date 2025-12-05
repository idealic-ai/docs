# 02: Company/Process

> Standard
> The operational protocol for converting abstract vision into concrete execution through shared responsibility, iterative synthesis, and high-frequency synchronization.

## 1. The Evolution Document

We do not improvise execution. We execute plans. When a plan is absent or insufficient, we do not guess; we create an **Evolution Document**.

- **Speed is Critical:** Evolution documents are transient artifacts created rapidly—ideally the same day as the need arises. They are not labored over for perfection; they are optimized for clarity and speed.
- **Synthesis of Misconception:** An evolution document is not a roadmap; it is a correction vector. It explicitly states: "We thought X, but we learned Y, so we will do Z." It captures the misconceptions, the decisions made to address them, and the resulting changes.
- **Context for the Machine:** These documents serve as high-fidelity context for Large Language Models (LLMs). They bridge the gap between a user's intent and the LLM's execution context, ensuring the machine works on the _current_ reality, not an outdated one.
- **The Plan of Record:** Once an evolution document is signed off, it _becomes_ the plan. Deviation is not permitted without a new evolution document.

## 2. The Cycle of Consensus (Pull Requests)

A Pull Request (PR) is a request for agreement, not just a request for code review.

- **Comments are Input, Not Chat:** When a PR receives feedback, the author must not simply "reply" to comments in a thread. Discussions grow and context rots.
- **Synthesize, Don't Argue:** Instead of inline rebuttals, the author must synthesize all feedback into a new Evolution Document. This document validates that the feedback was understood and integrated into a coherent whole.
- **Pre-Approval of Unpredictability:** By agreeing on the Evolution Document _before_ implementation, we pre-approve the changes. This limits unpredictability and prevents the need for micromanagement.
- **Shared Responsibility:** Sign-off is not a rubber stamp; it is a transfer of burden. When you approve a plan, you share the responsibility for its outcome.

## 3. The Living Specification

While evolution documents are fast and transient, the **Main Document** (the project specification or "Vision") is permanent and slow.

- **Correctness over Speed:** The Main Document does not need to be written in a day. It must be correct. It is allowed to grow and become more certain over time.
- **Expansion through Review:** Reviewing the Main Document often reveals blind spots. Addressing these blind spots expands the scope. This is not scope creep; it is clarity. We only see "what's next" after we have fully defined "what is."
- **Refactoring Reality:** Evolution documents ultimately fold back into the Main Document. This allows new contributors to adjust the broader vision without losing the intent of specific components.

## 4. The Ritual of Synchronization

We synchronize high-frequency alignment to prevent low-frequency divergence.

- **Daily 10-Minute One-on-Ones:** Every team member has a daily touchpoint with leadership.
- **Preparation is Mandatory:** Come with topics prepared. This is not time for small talk; it is time for unblocking, decision-making, and rapid alignment.
- **The Safety of Process:** This ritual ensures that no one is working in the dark. It creates trust: the leader trusts the team is following the direction, and the team trusts it is safe to execute.

## 5. The Role of the Machine

We use AI to amplify intent, not to replace it.

- **Dictate to Define:** We often dictate documents to capture raw intent, then use LLMs to refine structure and tone.
- **Input for Execution:** The Evolution Document provides the necessary context for an LLM to generate code, tests, or further documentation.
- **Verify the Output:** We do not blindly accept LLM output. We verify it against the Evolution Document. If the LLM fails, the instructions (the document) were likely insufficient.

## Summary

We trade the illusion of freedom for the reality of progress. By constraining _how_ we decide, we liberate _what_ we can achieve. We write to align, we align to trust, and we trust to execute.
