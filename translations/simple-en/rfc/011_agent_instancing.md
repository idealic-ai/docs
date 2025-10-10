# 011: Agent/Instancing

> **Instancing:** Imagine a chef cooking ten identical meals. Instead of making them one by one, they do each step for all ten meals at the same time—chopping all the vegetables, then cooking all the meat, and so on. That's instancing: handling many separate but similar jobs (called `Instances`) all at once. — [Glossary](./000_glossary.md)

> Sidenote:
> 
> - Requires: [010: Agent/State](./010_agent_state.md)
> - Compatible:
>   - [007: Agent/Input](./007_agent_input.md)
>   - [008: Agent/Imports](./008_agent_imports.md)
>   - [012: Agent/Plan](./012_agent_plan.md)

This guide explains how to handle many different jobs in a single request to our computer brain, using a special system that keeps track of everything.

## 1. The Foundation: The State System

The whole idea of instancing relies on one important thing: the **State System**. This system creates a clear separation between **planning** what to do and actually **doing** it.

Think of the **State Object** as a personal workbench for each job. It's a digital space that holds all the information for that specific job, and it does two very important things:

1.  **A Place for Results**: Tools (the little programs that do the work) use the workbench to store their results. Every instruction to a tool includes a special note called `_outputPath`, which tells it, "Put what you make right *here* on the workbench."
2.  **A Source for Ingredients**: A tool can also pick up an ingredient left by another tool from the workbench. This allows us to chain steps together, where the result of one step becomes the starting point for the next.

## 2. How Instancing Works

Where this system really shines is in handling many jobs at once. It's built for it!

### 2.1. Giving Each Job a Label

To manage multiple jobs in one go, we give each one a unique label. This is done with a special property called `_instance`. These labels are like little sticky notes (for example, `①` and `②`) that are easy for the AI to see. They don't mean anything special—they just help tell the jobs apart.

### 2.2. Telling Tools Which Job to Work On

This `_instance` label is attached to every instruction sent to a tool. It’s like saying, "Hey, do this step, but only for the job with the `①` sticky note."

- **Connecting Tools to Jobs**: Every command in the AI's plan has an `_instance` label, so we always know which job it's for.
- **Keeping Workspaces Separate**: This label also automatically tells a tool which workbench to use. When a tool needs to read an ingredient or write a result, it knows to look at the workbench for job `①`, not job `②`. It keeps everything from getting mixed up.

This is great because the tools themselves can stay simple. They don't need to know they're part of a big, multi-job request. They just do their assigned task on the workbench they're pointed to.

### 2.3. Let's See an Example

Imagine you want to know if two sentences are happy or sad. You can send both jobs in a single request. You can also give the AI a rulebook (a `schema`) for how the workbench should be organized.

```json
{
  "context": [
    {
      "_instance": "①",
      "type": "state",
      "state": { "text": "This is wonderful!" },
      "schema": {
        "type": "object",
        "properties": {
          "text": { "type": "string" },
          "sentiment": { "type": "string" }
        },
        "required": ["text"]
      }
    },
    { "_instance": "②", "type": "state", "state": { "text": "This is terrible." } }
  ]
}
```

The AI looks at both jobs at the same time and creates one combined plan:

```json
{
  "calls": [
    {
      "_tool": "analyzeSentiment",
      "_instance": "①",
      "text": "†state.text",
      "_outputPath": "sentiment"
    },
    {
      "_tool": "analyzeSentiment",
      "_instance": "②",
      "text": "†state.text",
      "_outputPath": "sentiment"
    }
  ]
}
```

The computer then runs this plan, calling the `analyzeSentiment` tool once for job `①` and once for job `②`. It writes the answer (like "positive" or "negative") back to the correct workbench for each.

## 3. A Super Helper: The Planning Graph

While not required, the **Planning System** works perfectly with instancing to create very reliable results.

A **Plan** is like a master recipe. It’s a perfect, pre-made list of steps that tools should follow. You can create this recipe once and perfect it.

Then, when you have many jobs to do, you can just give the AI this master recipe. The AI will follow the exact same steps for every single job (`instance`), making the results incredibly consistent. The **State Object** (our workbench) for each job keeps track of which step of the recipe it's currently on.

## 4. Why This Way Is So Good

This system for handling multiple jobs has some big advantages:

- **Efficiency**: You get much more done, way faster and cheaper. By packing many jobs into a single request to the AI, you save a lot of time and resources.
- **Consistency & Quality**: Because the AI sees all the jobs at once, it can notice patterns and create a smarter, more consistent plan for all of them. It’s like seeing the whole puzzle instead of just one piece.
- **Predictability**: When you use a pre-made **Plan**, you know exactly what result you'll get, every single time. Because the steps are fixed, the outcome is reliable and you can count on it for every job.