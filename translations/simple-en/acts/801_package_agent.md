# 801: Package/Agent

> [!DEFINITION] [Agent](./000_glossary.md)
> An official, working example of the rules in the **Acts of Emergence**. It's the engine that runs tasks for an AI, making sure it follows a strict plan (a 'schema'), from single, simple jobs to big projects that remember what they've done.

> Sidenote:
> - This shows you:
>   - :term[001: Agent/Request]{href="./001_agent_request.md"} (a single task)
>   - :term[010: Agent/Loop]{href="./010_agent_loop.md"} (a repeating process)

The `@augceo/agent` library is the official, main version of the AI architecture described in the Acts. Other systems might focus on writing clever instructions for the AI, but this one focuses on **following the rules perfectly**. It uses a very strict process where every step is carefully controlled, and every piece of information follows a blueprint.

## The Acts (Rules for Building)

This library is built by following the exact instructions in the **Acts**. Each feature comes from a specific rulebook.

This system is built like a box of building blocks, designed so you can **snap pieces together and create your own**. Instead of one giant, unchangeable program, each Act gives you a single, specific power. You only use the pieces you need—whether it's just a simple tool or a whole team of AIs that can remember things and work together.

### Core Building Blocks

- **:term[001: Agent/Request]{href="./001_agent_request.md"}**: The smallest possible job you can give the AI.
  - It takes some background info and a goal, and turns them into a neat, organized answer.
  - It supports asking for many different answers to the same question at once.
  - It's the foundation for everything a more advanced AI does.
- **:term[002: Agent/Tool]{href="./002_agent_tool.md"}**: A blueprint for a special ability the AI can use.
  - It describes *what* a tool does, but not *how* it does it. It's like having a button that says 'Start Car' without needing to know how the engine works.
  - This lets the AI choose the right ability for the job based on a simple description.
- **:term[003: Agent/Activity]{href="./003_agent_activity.md"}**: The actual computer code that makes a Tool work.
  - It connects the idea of a Tool to the code that gets the job done.
  - This keeps the 'what' (the Tool) separate from the 'how' (the Activity).
- **:term[004: Agent/Call]{href="./004_agent_call.md"}**: When the AI actually decides to use a Tool.
  - It's the AI's command to run a tool with specific instructions.
  - This is how the AI's intention gets turned into a real action.

### Data & Memory

- **:term[005: Agent/Data]{href="./005_agent_data.md"}**: The official way to package information so the AI understands it.
  - It's like putting every piece of memory into the same kind of standardized envelope.
  - This allows information to be combined in a predictable way.
- **:term[006: Agent/Input]{href="./006_agent_input.md"}**: Turns a simple one-off job into a reusable skill.
  - It defines the exact **inputs** a task needs to run.
  - This makes it possible to create user interfaces automatically and use the skill safely.
- **:term[009: Agent/State]{href="./009_agent_state.md"}**: The AI's short-term memory that lasts between steps.
  - It acts as a **shared notepad** while the AI works.
  - This lets the AI pause and resume complex jobs.
- **:term[016: Agent/Meta]{href="./016_agent_meta.md"}**: Keeps track of the AI's identity and history.
  - It records the AI's **version and origin**.
  - It allows AIs to update themselves to new versions on their own.

### Connecting the Pieces

- **:term[007: Agent/Variables]{href="./007_agent_variables.md"}**: A way to point to information without copying it.
  - It uses a special format (`†kind.path`) to create a shortcut to existing data.
  - This lets Tools **read** from memory without making messy copies.
- **:term[008: Agent/Output]{href="./008_agent_output.md"}**: The system for saving results.
  - It uses `_outputPath` to tell a Tool exactly where to store its result.
  - This allows one operation to **chain** into the next by saving its result where the next tool can find it.
- **:term[011: Agent/Expressions]{href="./011_agent_expressions.md"}**: Adds simple decision-making to the workflow.
  - Supports **“if this fails, try that”** logic (`||`).
  - Supports **“send this to multiple places”** logic (`&&`).

### Running the Show

- **:term[010: Agent/Loop]{href="./010_agent_loop.md"}**: The engine that keeps the AI working.
  - It gives the AI a task, waits for it to use a tool, sees the result, and then gives it the next task, over and over until the job is done.
  - It manages the whole cycle of thinking, acting, and learning from the result.
- **:term[012: Agent/Plan]{href="./012_agent_plan.md"}**: The AI's big-picture strategy.
  - It shows the workflow as a **map** of which tools to use and in what order.
  - This separates **thinking** about what to do from actually **doing** it.
- **:term[013: Agent/Instancing]{href="./013_agent_instancing.md"}**: A way to run the same plan on many different things at once.
  - It groups tasks together to run them at the same time in parallel.
  - It’s like having a hundred assembly lines all following the same blueprint.
- **:term[014: Agent/Delegate]{href="./014_agent_delegate.md"}**: Lets one AI give a smaller job to another AI.
  - The smaller job happens in a **secure box**, so it can't mess with the main AI's work.
  - This allows you to build AIs out of other AIs.
- **:term[015: Agent/Scopes]{href="./015_agent_scopes.md"}**: Controls what information an AI is allowed to see.
  - It uses `_scopes` to give a tool or a sub-agent only the data it needs for a specific task.
  - This keeps things secure and prevents mistakes.
- **:term[017: Agent/Advisor]{href="./017_agent_advisor.md"}**: A council of experts for the main AI.
  - Before taking action, the main AI can ask for advice from special 'Advisor' AIs.
  - These advisors can offer different points of view and vote on the best next step.

## Key Ideas

While the Acts above are the *mechanics*, these ideas are the *philosophy* behind the system:

- **:term[104: Concept/Latent]{href="./104_concept_latent.md"}**: The “No-Code” Power.
  - If you describe a tool but don't write any code for it, the agent will try to **imagine** what that tool would do.
  - It uses its own built-in knowledge to guess the tool's output.
  - This lets you design and test complex systems just by describing them, adding real code later.

- **Planning and Doing Are the Same Thing**:
  - In this system, **planning is the same as doing**.
  - The agent doesn't make one big plan at the start. Instead, at every single step, it makes a tiny new plan for what to do *right now* based on the latest information.

- **Human in the Loop (HITL)**:
  - The `Agent` can be set up to pause and ask for permission.
  - This allows a person to check every **Tool Call** before it runs.
  - You can approve it, reject it, or even change it, and the agent will use that feedback to adjust its plan.

- **Learning from Mistakes**:
  - Errors don't cause a crash. If a tool fails, the error is saved as a **message** in the AI's memory.
  - On its next turn, the agent “sees” the failure and can try to fix it, for example, by trying again with different settings or choosing another tool.

## Agent vs. Request

This library has two main ways of working: a simple **Request** and a powerful **Agent**.

### The Request (Simple, One-Shot Task)

A `Request` is a single, simple transaction with the AI. It does one thing and then stops.

- **Control:** It does not repeat or loop. It runs exactly once.
- **Multiple Answers:** It can be asked to generate several possible solutions to the same problem.
- **Real-Time Responses:** It can stream parts of its answer back as it thinks. This lets you see and use information (like tool calls) instantly, even before the AI has finished its full response.

### The Agent (Complex, Multi-Step Project)

An `Agent` is a **manager** that runs a series of simple Requests to complete a bigger goal.

- **Looping:** It repeatedly calls a Request, runs the tools it suggests, and feeds the results back into its memory to decide what to do next.
- **Knowing When to Stop:** It keeps working until it has produced the final `output` it was asked to create.
- **Goal-Oriented:** The agent's main job is to fill in the `output` field. As soon as that field has a value, its work is considered done.

### A Simple, Shared Answer Format

To make things easy, both simple Requests and complex Agents give their answer in the same predictable way. Your final goal is always placed inside a property called `output`.

- **Request:** Gives back an array of possible solutions, `Data<T>[]`.
- **Agent:** Gives back the single, final solution, `Data<T>`.

## Vision for Perfect Safety

This system uses a technology called **Schemistry** to make sure all the data fits together perfectly from start to finish, without needing extra tools to generate code. We want your code's understanding of the data to exactly match what the AI is actually doing.

### The Challenge

When an agent runs, the final plan it uses isn't just what you gave it. It's a **combination** of:

1.  Your Goal (the schema you provided).
2.  System Features (like Tools, Advisors, and other extra info).

These extra features are turned on by adding special messages to the agent's memory. For example, adding an `Advisor` message makes the system add an `advisors` section to the final plan.

### The Solution: A Type-Safe Assembly Line

We are building a system where our code's understanding of data types perfectly follows the agent's logic. As the agent adds features to its plan, our code automatically understands those changes.

The process works like this:

1.  **Understand:** Your goal (the Schema) is turned into a data type `T` that the code understands.
2.  **Combine:** Each active feature adds its own piece to that type.
    - _Advisor Feature:_ Adds `{ advisors: Advisor[] }`
    - _Tool Feature:_ Adds `{ calls: Call[] }`
    - _Meta Feature:_ Adds `{ meta: Meta }`
3.  **Final Result:** The final data type is a perfect combination of your original goal and all the active system features.

### Making It Your Own

This system is designed to be open for you to build on.

- **Custom Features:** You can create your own message-based features that change the agent's plan and data types.
- **Registering Tools:** You can tell the system about new Tools—the *what*.
- **Registering Activities:** You can provide the code that makes those Tools work—the *how*.
- **Registering Advisors:** (Coming soon) You'll be able to add new expert personas to advise any agent.
- **Shared Blueprints:** You can save and reuse data blueprints (Schemas) across your whole system.

By treating the schema as the single source of truth, we make sure that if your code works, it’s following the rules.

## Vision for Observing and Standardizing

We want to bring clear, consistent standards to watching agents work, no matter which AI model (from which company) is powering them.

### Standard Token Counting

Different AI companies count usage in different ways. We plan to combine these into one clear report that tracks:

- **Input Tokens**: How much text the AI reads.
- **Output Tokens**: How much text the AI writes.
- **Thinking Tokens**: How much 'thought' the AI uses to reason before answering.

### Seeing the Thought Process

AI models are starting to show their work (their 'chain of thought'). We treat this as a core part of the system.

- **Access**: We'll give you direct access to the AI’s raw stream of thought.
- **Budgeting**: We will create a standard way to set a 'thinking budget', so you can ask an AI to 'think harder' about a problem, no matter which model you're using.

## A Cache-Friendly System

We are adding built-in support for **caching** to make long-running agents much faster and cheaper.

### Measuring Savings

We will track how much the cache is helping:

- **Cache Read Tokens**: Tokens loaded from the cache (fast and cheap).
- **Cache Write Tokens**: New tokens saved to the cache.

### Smart Updates

To get the most out of caching, the system is designed to add new information without disturbing the old information.

- **Add, Don't Replace**: The system prefers to add new messages and data instead of rewriting everything.
- **Smart Merging**: Data and Advisor messages are designed to be added on top of existing information cleanly.
- **Linear History**: The agent works in a way that extends its conversation history in a straight line, which is ideal for caching.

### Managing Memory

To avoid running out of space while still using the cache, we will offer smart **memory cleanup**.

- **Smart Cleanup**: A process that tidies up the agent's memory only when it's about to get too full, keeping the cache useful for as long as possible.
- **Easy Control**: A simple switch will let you turn on 'Cache-Optimized' mode to get the best balance of speed and cost for your needs.
