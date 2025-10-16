# 104: Concept/Latent

> Sidenote:
> - Requires:
>   - [101: Concept/Idea](./101_concept_idea.md)
> - Enables
>   - [001: Agent/Request](./001_agent_request.md)

> [!DEFINITION] [Latent](./000_glossary.md)
> Using an AI's internal brainpower and knowledge (its "latent space") to figure out answers without needing specific, step-by-step code.

## What Does "Latent" Mean?

Imagine an AI as a super-smart brain. The idea of **Latent** is all about using that brain's built-in knowledge to solve problems. It’s the system's go-to method for getting things done.

Think of the AI as a universal translator. It can look at a problem (the `context`) and figure out the answer (the `solution`) by navigating through the huge library of information inside its own mind. This lets the system build and run things even if no one has written a specific instruction manual for that exact task.

## The Latent Space: An Ocean of Knowledge

The **Latent Space** is like the AI's entire mind. It's not a list of facts like in an encyclopedia. Instead, it’s a giant, complex map of ideas, patterns, and connections that the AI learned during its training. On this map, similar ideas are located close to each other.

The real trick isn't just having all this knowledge, but knowing how to find your way around it. Our system is designed to do exactly that: it asks the AI the right questions and gives it the right clues (`context`) to help it find the correct spot on its internal knowledge map.

## Latent Execution: Putting the AI's Brain to Work

**Latent Execution** is the process of actually using the AI's brain (the latent space) to do something. This happens whenever the system gets a request and realizes there’s no pre-written, step-by-step instruction manual (`Activity`) for it.

Here’s how it works:

1.  Someone sends a request to a `Tool` or an `Idea`.
2.  The system checks and sees there's no specific code for this request.
3.  Instead, the system gives the AI all the background info (`context`) and a blueprint for what the final answer (`_output`) should look like.
4.  The AI's job is to explore its own knowledge map, using the background info as a guide, and create an answer that fits the blueprint perfectly.

This turns the AI from a simple text generator into a problem-solver that can handle new and unfamiliar tasks instantly.

## Managing Context: Giving the AI the Right Clues

The most important job of the system is to organize the information it gives to the AI in a single request. By giving it the right clues, it helps the AI focus its thinking.

- **Rich Context**: The system provides a clear history of what’s been happening—past messages, key facts, and what the user wants. This is like telling a friend the whole backstory before asking for advice.
- **Blueprint for the Answer**: The system uses something called a JSON Schema to show the AI the exact structure the answer needs to have. It's like giving someone a fill-in-the-blanks form, which guides their thinking toward the right kind of answer.
- **Specific Tools and Instructions**: These act like a magnifying glass, helping the AI focus on one part of its vast knowledge map that's most relevant to the task.

By giving the AI great context, we can make sure its creative problem-solving is reliable and useful.

## The Default Setting: Just Assume It Works

Using the AI's brain to figure things out isn't a backup plan; it's the main way the system works. The system is “optimistic”—it assumes that for any task, the AI can find an answer by exploring its own knowledge.

Writing specific, step-by-step code (`Activity`) is seen as an upgrade you add later, maybe for tasks that need to be super fast, extra reliable, or talk to other websites.

This changes everything for developers:

- **Build Things Super Fast**: You can connect many different `Tools` and `Ideas` to create a complex plan without writing any code for them. The AI will just figure out how to run the whole thing.
- **Mix and Match Easily**: It lets you combine tools and ideas from anyone, anywhere, because you don’t need to know how they work on the inside. The AI connects them for you.
- > Sidenote: This idea is explained more in [Act 303: Ideator/Reactor](../acts/303_ideator_reactor.md).

  **Start Simple, Add Detail Later**: You can start with a rough idea and let the AI handle everything. Later, you can identify the most important or slowest parts and replace them with specific code, like turning a pencil sketch into a detailed painting, one section at a time.

By making this the default, the system lets people build amazing things quickly and flexibly from the very beginning.

## The Engine of an AI-Native System

This way of working isn't just a cool feature; it’s the engine that powers the whole system. The ability to design, build, and run complex things without writing all the code first is what makes an AI-native system so powerful and flexible. It allows the AI to be the architect, the planner, and the builder of its own work.

This is how we move from systems that just *use* AI as a tool to systems that are truly *built from* AI.

> Sidenote:
> - [105: Concept/AI-Native](./105_concept_ai_native.md)
>

The next document, [105: Concept/AI-Native](./105_concept_ai_native.md), talks more about this big shift in how we build things.
