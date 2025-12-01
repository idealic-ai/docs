# 00: Company/Writing Standard

> [!DEFINITION] [Standard](../acts/000_glossary.md)
> The authoritative contract that defines how we communicate. It ensures that our documentation serves as a source of truth, rigorously tested for logical consistency and free from the artifacts of machine generation.

## 1. The Document as Truth

Our primary goal is to establish documents as the **absolute source of truth**. A document is not a suggestion, a rough sketch, or a marketing pitch. It is a **contract** between developers, designers, managers, and teams.

- **Do Not Lie:** Never simplify a concept to make it sound easier than it is. If a system is complex, the document must reflect that complexity accurately. Simplification is deception.
- **Do Not Sell:** We are not selling the idea to ourselves. We are specifying it. Avoid persuasive language in favor of descriptive precision.
- **Evergreen by Design:** Documents are living specifications. They must be maintained with the same rigor as code. If the code changes, the document must change first.

## 2. Linearity & Dependency Resolution

We write documents to expose flaws in our thinking. The process of writing is the process of debugging our ideas.

- **Write Linearly:** Attempt to explain the system from start to finish. If you find yourself jumping back and forth, or saying "we'll explain this later" too often, it indicates a **cyclic dependency** in your concepts.
- **Expose Cycles:** A cyclic dependency (Concept A needs Concept B, but Concept B needs Concept A) is a smell of poor architectural separation. Identify these cycles and refactor the _ideas_ until they can be explained linearly.
- **Stand-Alone Concepts:** Every concept should stand on the solid foundation of the concepts that came before it. If an idea cannot stand alone, it is likely not a distinct primitive.
- **Visuals as Dependencies:** If a concept is too complex for linear text, use a diagram. A diagram often resolves the cyclic dependency in the reader's mind by presenting the cycle as a single visual unit.

## 3. The Standards of Voice

We define our style by what we do (**The Standard**) and what we explicitly avoid (**The Anti-Pattern**).

### 1. Start In Media Res (Specific Context)

**Standard:** Instead of summarizing "the times" or "society," start immediately with the concrete situation, the specific problem, or the actor involved. Ground the reader in the _now_ of your specific topic, not the general "now" of the world.

**Anti-Pattern (The 101 Explainer):** Avoid defining basic concepts (e.g., "React is a library for building UIs"). Assume the reader is competent. Only define domain-specific terms.

### 2. Let Meaning Emerge

**Standard:** Trust your argument to stand on its own. Make your point directly through evidence and logic rather than announcing that you are about to say something profound. If a point is central, position it centrally; if it is the conclusion, simply end with it.

**Anti-Pattern (The Empty Appeal):** Avoid justifying decisions with buzzwords or "industry standards" without explaining the _mechanics_ of why it works. The source is irrelevant; the logic is everything.

### 3. Define by Affirmation

**Standard:** State clearly what a thing _is_, rather than defining it by what it exceeds. Use precise verbs and specific nouns to describe the scope and value of a subject. If there is a contrast, state the contrast (e.g., "It is Y, which replaces X") rather than using a rhetorical ladder ("Not only X, but Y").

### 4. Make Direct Assertions

**Standard:** Remove the scaffolding. Write sentences that commit to their subject and predicate. If a statement requires nuance, build the nuance into the description itself rather than front-loading the sentence with "softener" phrases.

**Anti-Pattern (The Hedge):** Avoid "It depends" or "There are many factors" without immediately following up with _what_ those factors are. Be opinionated and specific.

### 5. Lead by Content, Not Invitation

**Standard:** Instead of telling the reader what you are _about_ to do ("Let's look at..."), simply do it. Transition between topics by connecting the ideas themselves (e.g., "This problem leads to..."), rather than breaking the fourth wall to guide the reader.

**Anti-Pattern (The Filler):** Avoid empty transitions like "It is important to note," "In the realm of," or "Furthermore." If a sentence doesn't add new information, delete it. Avoid "delving" into topics or creating "tapestries" of solutions.

### 6. Structure for Flow

**Standard:** Organize your paragraphs so that the logic flows inevitably from one point to the next without needing explicit road signs. Let the first sentence of a paragraph bridge the gap from the last. End pieces with a synthesis or a forward-looking thought, rather than a labeled summary.

### 7. Address the Problem, Not the Demographics

**Standard:** Focus on the universal nature of the challenge or the solution. Describe the condition or the need directly. If the writing is relevant to a specific group, the content will identify them naturally without needing a "catch-all" address.

### 8. Build Specific Worlds

**Standard:** If you need to establish a setting, describe the specific conditions, constraints, or rules of that environment immediately. Show the stakes of the environment through the actions or problems occurring within it, rather than announcing the premise.

### 9. Vary Sentence Structure

**Standard:** Rely on the strength of your subject-verb connections. Use periods and commas to create rhythm. Allow the logic of the sentence to dictate the emphasis, rather than using adverbs ("crucially") or punctuation tricks (excessive em dashes) to force importance.

### 10. Use Fresh or Plain Imagery (Be Casual)

**Standard:** Describe relationships and complexities exactly as they are. If a metaphor is needed, build one that is specific to the subject matter at hand. Otherwise, rely on plain, high-resolution description to convey complexity or scope.

**Anti-Pattern (The Corporate Drone):** Avoid stiff, formal, or academic language. Do not use "utilize" when "use" works. Do not "leverage synergies." Speak like a human engineer talking to another human engineer.

### 11. No Moral Lectures

**Standard:** Assume the reader is a responsible adult. Discuss safety or ethics only when they are crucial and non-obvious aspects of the system's design.

**Anti-Pattern (The Safety Preacher):** Avoid unsolicited warnings or guardrails. Do not preach to the reader.

## 4. Organizational Utility

Documentation is work. We do this work upfront to save effort later.

- **Pre-Computation:** A good document is "pre-computed" thinking. It should organize the chaos of a problem into a structure that is easy to translate into:
  - **Code:** The document should map to namespaces, classes, or modules.
  - **Subsystems:** The boundaries in the text should become boundaries in the architecture.
  - **Presentations:** The narrative flow should serve as a script for explaining the idea to others.
- **Decomposition:** Big ideas must be broken down. A document that grows too large should be refactored into smaller, atomic documents, just as we refactor monolithic code.

## Summary

We write to think. We write to bind ourselves to truth. We write to build.
