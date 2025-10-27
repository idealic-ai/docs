# 013: Agent/Delegate

> [!DEFINITION] [Delegate](./000_glossary.md)
> A way to give a job its own private workspace. When a :term[Call]{canonical="Call"} has a `_delegate` instruction, it runs a task in a separate, isolated area. It gets only the information it needs from the main workspace through a special property called `_scopes`.

> Sidenote:
> - Needs to be read with:
>   - :term[004: Agent/Call]{href="./004_agent_call.md"}
> - Works together with:
>   - :term[015: Agent/Scopes]{href="./015_agent_scopes.md"}

The **Delegation** pattern is how we solve a big problem: how to make AI agents more powerful without making them messy and confused. It's like a manager delegating a task to a specialist. This lets us run special :term[Tools]{canonical="Tool"} in their own 