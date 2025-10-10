# 104: Concept/Latent

> Sidenote:
>
> - This builds on:
>   - [101: Concept/Idea](./101_concept_idea.md)
> - This makes possible:
>   - [001: Agent/Request](./001_agent_request.md)

> **Latent:** Think of this as using an AI's imagination and general knowledge to figure things out, instead of giving it exact, step-by-step code. It's relying on the AI's own "brain" to connect the dots. — [Glossary](./000_glossary.md)

## 1. Introduction

**Latent** is a core superpower of this system. It's both the *source* of knowledge (the AI's brain, called the **Latent Space**) and the *process* of using that knowledge (**Latent Execution**).

This is the system's default way of thinking. It uses a big AI, called a Large Language Model (LLM), as a do-everything translator. Imagine you have a problem (`context`) and you know what the answer should look like (`solution`). The system uses the AI to build a bridge between the two, using the AI's huge internal library of knowledge to figure out the steps.

This is why the system is so flexible. It can figure out how to do new things and combine different tasks, even if no one has ever written a specific line of code for them.

## 2. The Latent Space: An Ocean of Knowledge

The **Latent Space** is the AI's brain. But it's not like a computer's hard drive or a library with books neatly organized on shelves. It's more like a giant ocean of ideas, feelings, and connections that the AI learned when it was trained.

In this ocean, things that are similar in meaning are close together. For example, the ideas for "king," "queen," and "crown" would all be floating around in the same region. The AI is powerful because this ocean is so incredibly vast and rich. But all that knowledge is useless if you can't find what you're looking for.

The biggest challenge isn't that the AI doesn't know something; it's helping the AI navigate its own mental ocean. Our system is designed to do exactly that, by asking the right questions and giving it the right maps to find its way.

## 3. Latent Execution: Activating the Latent Space

**Latent Execution** is the act of telling the AI to dive into its ocean of knowledge to complete a task. This happens whenever the system gets a request that it doesn't have a pre-written, step-by-step program for.

Here’s how it works, step-by-step:

1.  A request, called a `Call`, is sent to a `Tool` or an `Idea`.
2.  The system looks for a specific, pre-written program (`Activity`) to handle the request. It finds nothing.
3.  So, the system turns to the AI. It gives the AI all the background information (`context`) and a blueprint for what the final answer should look like (the `_output` `schema`).
4.  The AI's job is now to swim through its ocean of knowledge, using the background info as a map, and create an answer that perfectly fits the blueprint it was given.

This process turns the AI from something that just spits out text into a creative problem-solver that can figure out how to do brand new things on the spot.

## 4. Context Management: Arranging the Latent Space

The most important job of our system is to help the AI navigate its mental ocean effectively. It can't just yell, "Find the answer!" The AI would get lost. Instead, the system uses clever tricks to focus the AI's attention, almost like giving a deep-sea diver a map, a compass, and a spotlight.

Here are some of the tools it uses:

-   **Rich Context**: The system gives the AI the full story—past conversations, data, and user questions. This is like giving the diver a detailed logbook of the mission so far, so they know what they're looking for.
-   **Schema-Based Reasoning**: The system uses a blueprint (a `JSON Schema`) not just to check the final answer, but to *guide* the AI's thinking. It's like giving the diver an empty jar and saying, "Whatever you bring back, it must fit perfectly inside this jar." This forces the AI to think in a structured way.
-   **Instructions and Tools**: These are like special lenses or sonar equipment for the AI. They help it focus on a specific part of its knowledge ocean that's relevant to the job, ignoring all the distracting stuff nearby.

By managing the context well, the system makes sure the AI's journey through its own brain is successful. It turns a giant, confusing ocean of knowledge into a sharp and useful tool.

## 5. The Default for Optimistic Composition

Using the AI's brain (Latent Execution) isn't a backup plan; it's the normal, default way this system works. The system is "optimistic"—it assumes that for any task, the AI is smart enough to figure it out if you just give it the right map and tools.

Writing specific, step-by-step code (an `Activity`) is seen as an upgrade you add later, usually for tasks that need to be extra fast, super reliable, or need to talk to another program on the internet.

This way of thinking changes everything for people building with the system:

-   **Rapid Prototyping**: You can sketch out a big, complicated plan with many steps without writing any real code for the steps themselves. You just describe what each step does, and the AI figures out how to do it. It's like writing a movie script and letting the actors improvise all the scenes.
-   **Seamless Composition**: You can grab `Ideas` and `Tools` made by different people and mix them together. The system's AI will act as the glue, figuring out how to make them work with each other.
-   > Sidenote: We explore this idea more in [RFC 303: Ideator/Reactor](../rfc/303_ideator_reactor.md).

-   **Progressive Crystallization**: You can start with a whole system that runs on the AI's imagination. Then, as you use it, you might notice one part is slow or really important. You can then replace just that one improvised part with solid, predictable code—like turning an improvised movie scene into a carefully choreographed action sequence with stunts and special effects. The rest of the system can keep running on imagination.

By making the AI's brain the default engine, the system lets creators build amazing and complex things right away, worrying about the nitty-gritty details later.