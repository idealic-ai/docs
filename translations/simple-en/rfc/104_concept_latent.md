# 104: Concept/Latent

- Requires:
  - [101: Concept/Idea](./101_concept_idea.md)
- Enables
  - [001: Agent/Request](./001_agent_request.md)

> **Latent:** Using a Large Language Model's (LLM) built-in knowledge and thinking skills (its "latent space") to create answers without needing specific, step-by-step code. — [Glossary](./000_glossary.md)

## Introduction

The idea of **Latent** is a core part of how this system works. It describes both a process (**Latent Execution**) and the source of its knowledge (**Latent Space**). Think of it as the system's go-to method for figuring things out. It uses a Large Language Model (LLM)—the brain behind AI like ChatGPT—as a universal problem-solver.

This lets the system connect a question (`context`) with an answer (`solution`) by exploring the LLM's huge internal library of knowledge.

This is what makes the system so flexible. You can string together different tasks, and the system can figure out how to do them, even if you haven't written specific code for each individual step.

## The Latent Space: An Ocean of Knowledge

The **Latent Space** isn't a database full of facts. Imagine it as a giant, invisible map of all the ideas, patterns, and connections an LLM learned while it was being trained. On this map, similar concepts are located close to each other. It’s like an ocean of knowledge.

LLMs are powerful because this ocean is so deep and rich. But all that knowledge is useless unless you can find what you need.

The real challenge isn't the knowledge itself, but knowing how to navigate it. Our system is designed to solve this by asking the right questions and giving the LLM the right clues (the context) to guide it to the correct part of its knowledge ocean.

## Latent Execution: Activating the Knowledge Ocean

**Latent Execution** is the act of using the Latent Space to get a job done. It’s what happens when the system needs to perform a task but doesn't have specific, pre-written code for it. In those cases, it defaults to asking the LLM.

Here’s how it works:

1.  The system is asked to perform a task for a `Tool` or an `Idea`.
2.  The system checks and sees that there’s no specific code (`Activity`) written for that task.
3.  Instead, it gives the LLM all the information it has about the problem (`context`) and a blueprint for what the final answer (`_output`) should look like (`schema`).
4.  The LLM's job is to use the clues from the context to navigate its ocean of knowledge and create an answer that perfectly fits the required blueprint.

This turns the LLM from a simple chatbot into a powerful engine that can figure out how to solve new problems on the fly.

## Context Management: Giving the LLM a Map and Compass

To make this work reliably, the system’s most important job is to **organize the LLM’s knowledge** for each specific request. Think of it as giving the LLM a map and a compass before it dives into the ocean. The system uses a few smart tricks to do this:

- **Rich Context**: Giving the LLM a clear history of what’s happened so far—past messages, data, and user questions—is like giving it background reading. It helps the LLM understand the full picture.

- **Blueprint-Based Thinking**: The system gives the LLM a blueprint (a `JSON Schema`) of the final answer. This isn’t just for checking the answer at the end; it actually guides the LLM while it's thinking. It forces the LLM to structure its thoughts and stay on the right path.

- **Instructions and Tools**: Things like `Instructions` and `Tools` act like special lenses. They help the LLM focus on a specific part of its knowledge that’s relevant for the job.

Giving the LLM good context is what makes this whole process work. It's how the system turns a vast, messy ocean of information into a precise and helpful tool.

## The Default for Building Things Quickly

Latent Execution isn't a backup plan; it's the default way the system works. The system is built on a hopeful, or "optimistic," idea: it assumes the LLM can figure out how to do almost anything if you just arrange its knowledge in the right way. Writing specific code (`Activity`) is seen as an upgrade you add later, usually for tasks that need to be super fast, reliable, or talk to other websites.

This has a huge effect on how you build things:

- **Build Prototypes Instantly**: You can design and connect a series of `Tools` and `Ideas` to create a complex plan without writing any code for the steps. The LLM handles the entire process using its latent knowledge.

- **Mix and Match Easily**: You can combine `Ideas` and `Tools` made by different people, even if you don’t have access to their original code. The system just figures it out.
> Sidenote: This concept is further explored in [RFC 303: Ideator/Reactor](../rfc/303_ideator_reactor.md).

- **Improve Over Time**: A project can start out running completely on the LLM's latent abilities. Later, if you find a slow or important step, you can replace it with fast, specific code without having to rebuild everything.

By making latent execution the default, the system lets you build and test complex things incredibly fast, right from the start.