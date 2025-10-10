# 002: Agent/Tool

> **Tool**: Think of a tool as a recipe card for a skill an AI can learn. This card is shown to the big AI brain, giving it instructions for something it can do. The AI uses the tool by filling out an order ticket called a `Call` with all the details. This ticket is then handled either quietly by the AI itself or by a special helper called an `Activity`. — [Glossary](./000_glossary.md)



This document explains the Tool — a simple but super important recipe card that lets AIs understand and use different skills.

## What are Tools?

**Tools are the most important part** of an AI agent system. They give AIs a new superpower: **choosing the perfect action for any situation**. This lets an AI look at a problem and pick the best way to solve it from a list of options.

Tools are like:

- **Clear Instructions**: Recipe cards that are super easy for an AI to read and understand.
- **Guaranteed Rules**: Like a puzzle piece that only fits in one spot, tools have strict rules about what information they need and what they give back. This helps prevent mistakes.
- **Lego Bricks**: Simple building blocks you can snap together to build amazing and complex AI behaviors.
- **AI-Friendly Designs**: Blueprints that are made for an AI brain to think about, so it can make smart choices.

When an AI agent fills in the details for a Tool, it creates a **Call**. A `Call` is like a completed order ticket, ready to be sent to the kitchen to get the job done (you can learn more about `Calls` in [004: Agent/Call](./004_agent_call.md)).

> **Note**: For simple things, like asking an AI to write a story, you can just tell it what to do (we call this an Idea). But Tools are necessary for trickier situations where the AI has to choose between different actions, like deciding whether to search the web or write a file. We'll talk more about how simple Ideas can be turned into Tools later in [007: Agent/Input](./007_agent_input.md).

## When Should You Use a Tool System?

Use a Tool system when you need your AI agents to:

- **Decide what to do next** in the middle of a task.
- **Choose from a menu of different skills** to finish a job.
- **Use different versions** of the same skill (like using Google or DuckDuckGo for searching).
- **Combine the AI's brainpower with special computer code** to make smarter decisions.

## How the Tool System Works

### The Main Idea: The Blueprint is Just the Plan

The whole Tool system is based on one simple rule: **Tools are just blueprints**. They describe *what* an AI can do, but they don't include the steps on *how* to actually do it. The real