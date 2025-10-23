# 014: Agent/Meta

> [!DEFINITION] Meta Properties
> Think of these properties as an ID card for any task given to the AI. This card has all the important details: its name, where it belongs, what version it is, when it was made, and any special versions it's part of. It gives the task a permanent, computer-readable address so the system can always find it and know its history.

> Sidenote:
> - You'll want to understand this first:
>   - :term[001: Agent/Request]{href="./001_agent_request.md"}
> - These concepts build on what's here:
>   - :term[107: Concept/Identity]{href="./107_concept_identity.md"}
>   - :term[108: Concept/Visibility]{href="./108_concept_visibility.md"}
>   - :term[110: Concept/Addressing]{href="./110_concept_addressing.md"}
>

While many quick chats with an AI can just happen and be forgotten, building bigger, more complicated things requires a way to label and keep track of a :term[Request]{canonical="Request"} (a task) and its final :term[Solution]{canonical="Solution"} (the answer). The **`Meta`** object is that label. It’s like the “business card” for a :term[Request]{canonical="Request"}, giving it a stable name tag that computers can read. This name tag makes it possible to save the task, create different versions of it, send it to the right place, and look up its entire history.

What's really cool is that by making this ID card a required part of the answer, the AI itself can create brand new IDs or branch off into new versions. This turns a simple answer into an act of creation, making a new thing that can be tracked and built upon.

## How the `Meta` ID Card is Used

The `Meta` object is a key player throughout the life of a :term[Request]{href="./001_agent_request.md"}. It shows up in the information given *to* the AI, and it's a required part of the answer *from* the AI.

- **In the `context` (what the AI sees)**: A `meta` message tells the AI the ID of the task or project it's currently working on.
- **In the `schema` (the rules for the answer)**: The rules for the final answer require a `meta` property, forcing the AI to think about and update the project's identity as part of its job.
- **In the `solution` (what the AI creates)**: The AI generates a new `meta` object, often with an updated version number, showing how the project has changed or evolved.

This cycle turns the AI from a simple calculator into an active partner that helps manage the history of a growing, versioned project.

> [!HEADSUP] Heads up: From a Task to an Idea
> This whole process—the information the AI gets (including the `Meta` ID card), the rules for its answer, and the final answer it creates—forms a complete, repeatable package. When you save this package, our system calls it an :term[Idea]{href="./101_concept_idea.md"}. The `Meta` object is the special key that turns a temporary `Request` into a permanent, findable `Idea`.
>
> > Sidenote:
> > :term[101: Concept/Idea]{href="./101_concept_idea.md"}.

::::columns
:::column{title="Example Request Structure"}

```json
// The AI gets the current Meta info as context,
// and is told it must create a new one in its answer.
{
  "context": [
    {
      "type": "meta",
      // This is the ID card for the current game state
      "meta": {
        "domain": 