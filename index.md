# AI System Bible Documentation

This documentation provides a comprehensive overview of our self-evolving operating system architecture, serving as the authoritative reference for system design, principles, and components.

## Documentation Structure

The Bible is organized into chapters covering different aspects of the system:

- [Complete Bible](Bible.md) - The full document with all chapters
- **Chapter 1:** [Vibes & Their Manifestations](chapters/ch1-vibes.md) - Fundamental units and their implementations
- **Chapter 4:** [Determinism — Controlling Unpredictability](chapters/ch4-determinism.md) - Mechanisms for managing randomness

## LLM-Readable Sections

Throughout this documentation, you'll find sections marked with ```llm blocks that are specifically designed for Large Language Model comprehension. These sections follow the principles outlined in the LLM Translation Guidance section.

## LLM Translation Guidance

The sections marked with ```llm blocks throughout this documentation are specifically designed for Large Language Model comprehension. These sections follow these principles:

1. **Abstraction Over Implementation** - Focus on conceptual understanding rather than specific code details
2. **Relational Frameworks** - Explain how components relate to each other in the system
3. **Analogical Thinking** - Use metaphors and analogies that connect to concepts in LLM latent space
4. **Causality Emphasis** - Highlight cause-effect relationships and system behaviors
5. **Pattern Recognition** - Identify recurring patterns and principles across different components
6. **Capability Orientation** - Describe what the system can do rather than how it's constructed
7. **Principle Distillation** - Extract core principles that can generalize across implementations
8. **Intentional Under-specification** - Deliberately leave some technical details unspecified to allow LLMs to infer and improve based on their latent knowledge

These LLM-focused sections serve as conceptual seeds that can grow within the LLM's knowledge structure, enabling the model to reason about the system architecture, propose improvements, and implement extensions while maintaining consistency with the core design philosophy.

The translations are not intended to be one-to-one mappings of the human-readable content. Instead, they provide a framework that LLMs can actively expand upon, filling in details and making connections based on their existing knowledge. This approach encourages LLMs to become active participants in improving the system rather than passive receivers of complete specifications.

## Validation Schema

Each chapter includes validation questions in a standardized JSON schema format to verify LLM comprehension. The validation questions follow this structure:

```json
{
  "type": "object",
  "title": "Concept Understanding Validation",
  "properties": {
    "conceptQuestion": {
      "type": "object",
      "description": "Question: What is the nature of X in the system architecture? ",
      "properties": {
        "answer": {
          "type": "array",
          "$hint": [0, 3, 8],
          "items": {
            "type": "string",
            "enum": [
              "Statement 1 about X",
              "Statement 2 about X",
              "Statement 3 about X",
              "Statement 4 about X",
              "Statement 5 about X",
              "Statement 6 about X",
              "Statement 7 about X",
              "Statement 8 about X",
              "Statement 9 about X",
              "Statement 10 about X"
            ]
          }
        },
        "reasoning": {
          "type": "string",
          "description": "Explanation of why the selected statements are correct and why others are incorrect"
        }
      },
      "required": ["answer", "reasoning"]
    }
  }
}
```

For each validation question:

- The question is presented in the description field
- Multiple options are provided in an enum array (typically 8-10 options)
- Only 2-3 options are generally correct, indicated by the $hint array of indices
- The LLM must select all correct options and provide reasoning to justify its choices

These validation questions are designed to test conceptual understanding rather than implementation details, with multiple related questions forming chains that explore different aspects of the same concept.
