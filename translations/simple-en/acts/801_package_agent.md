# 801: Package/Agent

> [!DEFINITION] [Agent](./000_glossary.md)
> An Agent is the official, working version of the ideas described in the **Acts of Emergence**. It's the engine that brings AI-powered workflows to life, from tiny, one-off tasks to complex, thinking programs.

> Sidenote:
> - Built with:
>   - :term[001: Agent/Request]{href="./001_agent_request.md"} (The smallest possible job)
>   - :term[010: Agent/Loop]{href="./010_agent_loop.md"} (The engine that keeps it running)

The `@augceo/agent` library is the main tool for building these agents. While some AI tools focus on helping you write clever prompts for an AI, this library focuses on following a strict set of rules. Think of it like a robot in a factory: every move is precise, predictable, and follows a clear blueprint.

## The Acts (The Rulebooks)

This library is built directly from a set of rulebooks called the **Acts**. Each feature is like a chapter in these books.

This design makes it like a box of building blocks. Instead of one giant, heavy tool, you get a collection of special-purpose blocks. You can pick and choose just the ones you need, whether you're building something small and simple or a huge, complicated system with many moving parts.

### Core Building Blocks

- **:term[001: Agent/Request]{href="./001_agent_request.md"}**: The smallest possible job you can give the AI.
  - It takes some information (the `Context`) and a goal (the `Schema`) and produces a structured answer (the `Solution`).
  - It can even come up with several different answers at once.
  - This is the foundation for everything else an agent can do.
- **:term[002: Agent/Tool]{href="./002_agent_tool.md"}**: A description of a power or skill the agent can use.
  - It's like a label on a button that says what it does, but not how it does it.
  - This lets the AI choose the right skill for the job based on a simple description.
- **:term[003: Agent/Activity]{href="./003_agent_activity.md"}**: The actual code that makes a Tool work.
  - If a Tool is the "Search the Web" button, the Activity is the code that performs the internet search.
  - This keeps the button separate from the engine, so you can swap out the engine without changing the button.
- **:term[004: Agent/Call]{href="./004_agent_call.md"}**: A record of the agent deciding to use a Tool.
  - It's the moment the agent says, "I am now pressing the 'Search the Web' button to look for 'fluffy kittens'."
  - This is the standard message that connects the AI's intention to a real action.

### Data & Memory

- **:term[005: Agent/Data]{href="./005_agent_data.md"}**: The standard way of packaging information.
  - Think of it like putting every piece of information into a standard-sized envelope, so the system always knows how to handle it.
  - This makes it easy to combine different pieces of information.
- **:term[006: Agent/Input]{href="./006_agent_input.md"}**: Turns a simple Request into a reusable function.
  - It defines exactly what information a Request needs to start.
  - This is like creating a form with specific fields to fill out, making the task easy to repeat correctly every time.
- **:term[009: Agent/State]{href="./009_agent_state.md"}**: The agent's memory that lasts between steps.
  - It's like a shared whiteboard or scratchpad that the agent uses to keep track of its work.
  - This lets the agent pause and resume its work without forgetting what it was doing.
- **:term[016: Agent/Meta]{href="./016_agent_meta.md"}**: Manages the agent's identity.
  - It's like an ID card that tracks the agent's version, who made it, and how it has changed.
  - This allows agents to update and improve themselves on their own.

### Connecting the Pieces

- **:term[007: Agent/Variables]{href="./007_agent_variables.md"}**: A way to refer to information without copying it.
  - It uses a special `†` symbol like a shortcut, saying, "get the information from over there."
  - This lets Tools read information from the agent's memory without making messy copies.
- **:term[008: Agent/Output]{href="./008_agent_output.md"}**: The system for saving the result of a Tool's work.
  - It uses a special `_outputPath` instruction to tell the agent where to put a tool's results.
  - This allows one tool's result to become the starting point for the next tool.
- **:term[011: Agent/Expressions]{href="./011_agent_expressions.md"}**: Lets you add simple logic for how information flows.
  - You can create a fork in the road: "Try this first, **OR** (`||`) if that fails, try this other thing."
  - You can also split the path: "Send this info here **AND** (`&&`) send it there at the same time."

### Managing the Work

- **:term[010: Agent/Loop]{href="./010_agent_loop.md"}**: The engine that keeps the agent running.
  - It repeatedly asks the AI what to do next until the final goal is reached.
  - It manages the cycle of thinking, acting, and learning from the results.
- **:term[012: Agent/Plan]{href="./012_agent_plan.md"}**: A clear strategy for how to solve a problem.
  - It shows the entire workflow as a map of which tools to use and in what order.
  - This separates the act of **planning** from the act of **doing**.
- **:term[013: Agent/Instancing]{href="./013_agent_instancing.md"}**: A way to run the same plan on many things at once.
  - It's like an assembly line, where each item gets the same set of tasks performed on it in parallel.
  - This is great for processing large amounts of data very quickly.
- **:term[014: Agent/Delegate]{href="./014_agent_delegate.md"}**: A way for one agent to give a job to another agent.
  - It's like a project manager hiring a specialist to handle one specific, tricky part of a project.
  - This lets you build agents out of other agents, like nested dolls.
- **:term[015: Agent/Scopes]{href="./015_agent_scopes.md"}**: A way to control what information an agent can see.
  - It puts up walls around a task, giving an agent only the information it needs to do its job and nothing more.
  - This keeps things organized and secure, preventing mistakes.
- **:term[017: Agent/Advisor]{href="./017_agent_advisor.md"}**: An expert AI that gives advice.
  - It's like having a team of tiny consultants that think about the problem and give suggestions **before** the main agent acts.
  - This helps the agent make smarter, more strategic decisions.

## Big Ideas

While the Acts describe the *parts*, these ideas describe the *philosophy* behind how they work together:

- **:term[104: Concept/Latent]{href="./104_concept_latent.md"}**: The "No-Code" Power.
  - If you describe a Tool but don't give it any code, the Agent will **pretend to use it**. 
  - It uses its imagination (its "latent space") to predict what the tool's result would have been.
  - This lets you design and test very complex plans using only descriptions, without writing a single line of code.

- **Planning and Doing Are the Same Thing**:
  - The Agent doesn't make a big, fixed plan at the beginning.
  - At every single step, it looks at the current situation and decides on the very next move. It is constantly re-planning.
  - It’s like a video game character that decides where to go next based on what it sees right in front of it.

- **Human in the Loop (You're in Control)**:
  - The Agent can be programmed to pause and ask for permission.
  - Before it uses a Tool, it can ask a human, "Is it okay for me to do this?" 
  - The person can then approve, deny, or even change the agent's plan before it continues.

- **Learning from Mistakes**:
  - If a tool breaks or causes an error, the agent doesn't just stop. The error becomes a message in its memory.
  - In the next step, the agent sees the error and uses its intelligence to try and fix it, maybe by using the tool differently or trying a completely different tool.

## Agent vs. Request

The library has two ways of working: a small, one-time **Request** and a bigger, continuous **Agent**.

### The Request (A Single Task)

A `Request` is a single, instant job for the AI. You give it information and a goal, and it gives you back an answer. That's it.

- **No Looping:** It runs exactly once.
- **Multiple Answers:** It can give you a few different possible answers to choose from.
- **Real-Time Responses:** It can start showing you parts of the answer (like which tools it wants to use) while it's still thinking about the rest. This makes it feel very fast.

### The Agent (A Full Project)

An `Agent` is a program that runs in a **loop**, using many Requests to finish a big goal.

- **Looping:** It keeps running, using tools and learning from the results, until the project is done.
- **Knowing When to Stop:** It keeps working until it successfully fills in the final `output` field.
- **Reaching the Goal:** You tell the agent what the final answer should look like. It considers its work finished only when it has produced that answer.

### A Single Answer Format

To keep things simple, both Agents and Requests give you their answers in the same standard way. The final result is always found inside the `output` property.

- **Request:** Gives you a list of possible solutions.
- **Agent:** Gives you the one final solution it decided on.

## The Vision for Perfect Code

This library uses a tool called **Schemistry** to make sure your code is safe and works as expected, without you having to do extra work. The goal is for the code editor to understand the agent so well that it can catch mistakes before you even run the program.

### The Challenge

When you give an agent a job, the final instructions sent to the AI are a mix of things:

1. Your Goal (what you want).
2. System Tools (what the agent can do).

Different parts of the agent, called **Message Handlers**, add these extra pieces. For example, if you add an `Advisor` to give advice, a handler automatically adds an `advisors` section to the final goal.

### The Solution: A Smart Type System

The code editor's brain is designed to work just like the agent's brain. When a handler adds a new part to the agent's instructions, it also updates the code editor's understanding of the final answer's shape.

Here's how it works:

1. **Understand:** Your goal is turned into a shape `T` that the editor understands.
2. **Transform:** Each active part of the agent adds its piece to `T`.
   - The *Advisor* part adds `{ advisors: ... }`.
   - The *Tool* part adds `{ calls: ... }`.
   - The *Meta* part adds `{ meta: ... }`.
3. **Final Shape:** The final shape is a perfect combination of what you wanted and what the system added.

### Making It Your Own

This system is designed to be open for you to build on.

- **Custom Handlers:** You can create your own parts that change how the agent works.
- **Tool Registry:** You can add new tools to a global library for any agent to use.
- **Activity Registry:** You can add the code that makes those new tools work.
- **Advisor Registry:** (Coming Soon) You'll be able to create and share new AI personas to help agents think.
- **Schema Registry:** You can save and share common data shapes so you don't have to define them over and over.
- **Presets:** You can bundle together settings, tools, and advisors into a reusable package. You can then activate a whole set of behaviors with a single command, like turning on a "Chess Master" mode or a "Creative Writing Assistant" mode.

By always using the schema (the blueprint) as the one source of truth, we make sure that if your code looks right in the editor, it will work right when you run it.

## The Vision for a Clear View

We want to make it easy to see what an agent is doing and how many resources it's using, no matter which AI model is powering it.

### Standard Token Counting

Different AI companies measure work differently. We plan to translate all of their reports into one simple, standard format that tracks:

- **Input Tokens**: How much text the AI had to read.
- **Output Tokens**: How much text the AI wrote.
- **Thinking Tokens**: How much work the AI did internally to reason about the problem.

### Seeing the Thought Process

Newer AI models can "show their work." We treat this internal thinking as a key feature.

- **Access**: Making the AI's step-by-step reasoning easy for you to see and use.
- **Budgeting**: Letting you tell the agent how much "thinking time" it's allowed to use, no matter which AI model it's running on.

## A Memory-Smart Design

We're adding a smart **memory cache** to make long-running agents much faster and cheaper.

### Memory Metrics

We will track exactly how the cache is being used to show you the savings:

- **Cache Read Tokens**: How much information was remembered from last time.
- **Cache Write Tokens**: How much new information was saved for next time.

### Add-Only for Speed

To use the cache most effectively, the library encourages adding new information instead of changing old information.

- **Append, Don't Replace**: It's like writing a new entry in a diary instead of erasing and rewriting old pages. This helps the cache work much faster.
- **Smart Merging**: The system knows how to additively update the agent's memory.
- **Linear History**: The agent's work is structured like an ongoing conversation, which is very easy for the cache to handle.

### Managing Memory

To make sure the agent's memory doesn't get too big, we'll provide smart **Memory Compaction** tools.

- **Smart Compaction**: An efficient process that cleans up and summarizes the agent's memory only when it's absolutely necessary, keeping the cache fast for as long as possible.
- **Configuration**: An "Optimize for Cache" setting that turns on all these behaviors to make your agent as fast and cheap as possible for its specific job.