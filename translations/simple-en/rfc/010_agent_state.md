# 010: Agent/State

> **State Message:** Imagine an AI agent is playing a video game. A "State Message" is like its character sheet. It's a special message that holds the agent's memory. It contains two main things:
> 1.  A `state` part: This is the actual memory, like what level the character is, how much health it has, and what items are in its backpack.
> 2.  An optional `schema` part: This is the blueprint for the character sheet. It defines the rules, like "health must be a number" and "the backpack must hold a list of items."
>
> The agent works in quick steps, or "ticks." This memory stays with the agent from one tick to the next, so it doesn't forget everything it just learned.

> Sidenote:
>
> - You'll need to understand this first: [002: Agent/Tool](./002_agent_tool.md)

> [!WARNING]
> This explanation is just a starting point. We will add more details to it later.

This document explains the **State Protocol**. Think of it as the rulebook that teaches an AI agent how to have a memory that sticks around over time.