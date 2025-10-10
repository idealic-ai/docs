# 003: Agent/Activity

> **Activity:** Think of this as the *real work* behind a `Tool`. A `Tool` is a description of something an AI can do, like "look up the weather." An `Activity` is the actual computer code that connects to a weather website and gets the temperature. It’s the *how* behind the *what*.

> Sidenote:
>
> - You should probably read this first: [002: Agent/Tool](./002_agent_tool.md)

This guide explains how `Tools` are connected to real, working code. While a `Tool` is like a button on a remote control, an `Activity` is the signal it sends to the TV to actually do something.

## The Two-List System

Imagine our AI system has two different address books to keep things organized:

- **Tool List**: This book just lists the names and descriptions of all the jobs the AI can do, like "check the weather" or "send an email."
- **Activity List**: This book contains the actual, step-by-step instructions (the computer code) for how to perform each job.

Keeping these two lists separate is super important. It means the AI can know *what* a tool does without needing to know *how* it works right away. It also lets us change *how* a tool works (like switching from one weather website to another) without having to change the tool's description that the AI sees.

## Signing Up an Activity

When you write the code for a tool, you need to sign it up in the "Activity List." You give it a name that connects it to the right `Tool`.

```typescript
// Here, we're giving the system the instructions for a real job.
// We name it 'weatherCheck' so it matches the 'weatherCheck' Tool.
Activity.register('weatherCheck', async call => {
  // This code contacts a real weather service...
  const data = await weatherAPI.get(call.location);
  // ...and then it reports back what it found.
  return { temperature: data.temp, conditions: data.desc };
});
```

## How It Works: Guessing vs. Doing

The system has two ways of getting a job done when a `Tool` is used:

- **Guessing (Latent Execution)**: Sometimes, the AI is so smart that it can just *guess* the answer. It uses everything it has learned to come up with a result without actually running any code. If you ask it something simple, it might just figure out the answer on the spot. This is the default if it can't find any real instructions for a tool.
  > Sidenote:
  >
  > - [104: Concept/Latent](./104_concept_latent.md)
- **Doing (Explicit Execution)**: This is when the system looks up the instructions in the "Activity List" and follows them exactly. This is necessary when you need to talk to the outside world (like a website or a database) or when a calculation has to be perfectly correct every time.

## The Automatic Decision Plan

The system has a simple, automatic plan to decide whether to guess or do.

When a `Tool` is used, the system looks for its instructions using these rules, in this order:

1.  **Look for a Special Note**: If the `Tool` has a special note attached that says, "Use these specific instructions," the system follows that note and runs that code.
2.  **Match the Name (The Easy Way)**: If there's no special note, the system looks in the "Activity List" for instructions with the **exact same name** as the `Tool`. If it finds a match, it uses it. This is the simplest and recommended way to connect a Tool to its code.
3.  **Fall Back to Guessing**: If it can't find instructions using the rules above, the system doesn't panic. It just lets the AI handle it by guessing the answer (Latent Execution).

This makes building things easy:

- **For most cases, just give your `Tool` and your `Activity` the same name**, and the system will connect them for you.
- `Tools` that don't have real code will just work by having the AI guess, which is safe.
- If you need one set of instructions to work for many different `Tools`, you can use the special note to point them all to the same code.

## Why This Separation Is a Big Deal

If we didn't separate the `Tool`'s description from the `Activity`'s code, they would be stuck together forever. Imagine if you wanted to change which weather service your AI uses. You'd have to go find and update every single AI that uses that weather tool.

By keeping them in two separate lists, we avoid this problem. The AI only cares about the `Tool`'s description, which stays the same. We can change the `Activity` code behind the scenes as much as we want.

This means:

- **You don't break the AI when you update the code**: You can switch from the AI guessing the weather to it using a real weather service, and the AI won't even notice the difference.
- **You can test different approaches**: You can easily compare the AI's guess with a real result from a website to see which one works better.
- **You can roll out changes slowly**: You can give the new and improved code to just a few AIs at first, while everyone else keeps using the old version.