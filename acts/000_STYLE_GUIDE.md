# Style Guide for Acts

This document outlines the stylistic conventions to be used when writing or editing `Acts` to ensure consistency and readability across the documentation.

- **No Bold Links**: Links should not be bolded. The standard link styling is sufficient to indicate interactivity.
- **Glossary Terms**: All terms defined in the [Glossary](./000_glossary.md) must be referenced using the `:term[Term Name]{canonical="Term Name"}` syntax. This ensures they are automatically linked and styled consistently.
- **Inline links to chapters**: Use `:term[Plan]{href="./011_agent_plan.md"}` syntax (note relative link)
- DO NOT replace links to :term, if the text of the link is complete title like `010: Agent/Plan`, but do change if it's `Plan`
- **Definition Block**: Every `Act` must begin with a `> [!DEFINITION]` block that provides the term's definition from the glossary.
- **Outro Block**: Every `Act` must conclude with a dedicated section that provides a clear, narrative transition to the next `Act` in the sequence.
- **Sidenote References**: When linking to other relevant `Acts` or concepts, use a `> Sidenote:` block. This keeps the main text clean and provides contextual, non-interruptive links.
- When marking terms, dont singularize the terms. Use plural e.g. `:term[Activities]{canonical="Activity"}`, the system will match it against `Activity` automatically.
- Avoid meta references like "This document", or "Next document". Make it a smoother narrative.
- Use `:dfn[Term]{canonical="..." href="..."}` to define terms within glossary
