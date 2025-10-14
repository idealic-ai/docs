# 104: Concept/Latent

> **Latent:** This is a fancy word for using an AI's own knowledge and thinking skills to get answers, instead of giving it strict, step-by-step computer code. It’s like the AI is using its “imagination” to figure things out. — [Glossary](./000_glossary.md)

## Introduction

The idea of **Latent** is super important for how our system works. It’s like the system's main way of thinking. It uses a big AI (a Large Language Model, or LLM) as a super-smart interpreter that can understand almost anything.

Imagine you have a question (the `context`) and you know what you want the answer to look like (the `solution`). The system uses the AI's huge brain to connect your question to the right answer, even if no one has ever written a specific program for that exact problem.

This makes the system really flexible. It can connect different tools and ideas together to get work done, kind of like building with LEGOs without needing an instruction booklet for every single creation.

## The Latent Space: An Ocean of Knowledge

The **Latent Space** is the name for all the knowledge, patterns, and connections that an AI learns while it's being trained. Think of it less like a dictionary with hard facts, and more like a giant, invisible ocean of ideas. In this ocean, ideas that are similar float close to each other.

Big AIs are powerful because this ocean of knowledge is so huge. But all that knowledge is only useful if you know how to find what you’re looking for.

The real challenge isn't that the knowledge is missing; it's about learning how to navigate this ocean. Our system is built to do just that, by asking the right questions and giving the AI the right clues (the `context`) to point it to the right part of its knowledge ocean.

## Latent Execution: Waking Up the Ocean

**Latent Execution** is the process of using the AI’s knowledge ocean to do a task. This happens whenever the system needs to do something but doesn't have a specific, pre-written program (`Activity`) for it.

Here’s how it works:

1.  You ask the system to do something using a `Tool` or `Idea`.
2.  The system checks if there's a specific program for that request. It finds there isn't one.
3.  So, the system gives the AI all the information it has (the `context`) and a blueprint for what the final answer should look like (the `schema`).
4.  The AI's job is now to dive into its ocean of knowledge, using your information as a map, and create an answer that perfectly fits the blueprint.

This turns the AI from something that just writes text into a creative problem-solver that can figure out new tasks on its own.

## Context Management: Giving the AI a Good Map

The most important thing the system does is **organize the clues for the AI** so it can think clearly. It uses a few tricks to help the AI focus on the right part of its knowledge ocean.

- **Giving Good Clues:** By providing a clear history of what's happened, the system gives the AI all the background it needs to understand the job.
- **Providing a Blueprint:** The blueprint (a JSON Schema) doesn't just check the final answer. It actually helps the AI think. It’s like giving someone a coloring book page—it tells them the shape of the final picture, so they know where to put the colors.
- **Providing Special Tools:** `Instructions` and `Tools` are like special magnifying glasses that help the AI focus on the right skills or ways of thinking needed for a specific task.

Giving the AI a good, well-organized map is what makes this whole process work. It's how the system turns a huge, messy ocean of knowledge into a sharp and useful tool.

## The Default Way of Doing Things

Using the AI's imagination (`Latent Execution`) isn't a backup plan; it's the main way the system works. The system is “optimistic”—it believes that any task can be done just by giving the AI the right clues and a good blueprint.

Writing a specific computer program for a task is seen as an upgrade you add later, maybe for things that need to be super fast or reliable.

This changes how people can build things:

- **Build Things Super Fast:** You can design a whole complicated project by connecting different AI `Tools` and `Ideas` without writing any real code. The AI just figures out how to make them all work together.
- **Mix and Match Easily:** You can combine ideas and tools made by different people, and they will work together because the AI acts as the universal translator between them.
- > Sidenote: This idea is explained more in [Act 303: Ideator/Reactor](../acts/303_ideator_reactor.md).

- **Start Messy, Then Clean Up:** A project can start out running completely on the AI’s imagination. Later, if some parts are slow or super important, you can replace them with fast, specific computer code without having to rebuild everything.

By making this the default, the system lets people create and experiment with amazing new ideas very quickly.

## The Engine of AI-Native Design

This way of working is more than just a cool feature; it’s the engine that powers a whole new way of building software, called **AI-Native**.

The ability to design and run complex systems without first writing every line of code is what makes AI-Native systems so flexible and smart. It’s what lets the AI be the architect, the planner, and the worker all at the same time.

This is how we move from just _using_ AI as a tool to building things _with_ AI as the main building block.

The next document, [105: Concept/AI-Native](./105_concept_ai_native.md), talks more about this big shift in how to build things.
