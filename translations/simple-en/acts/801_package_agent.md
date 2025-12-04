# 801: Package/Agent

> [!DEFINITION] [Agent](./000_glossary.md)
> An Agent is the official working model that follows the rules from the **Acts of Emergence**. It's the engine that runs special workflows designed for AI, handling everything from one-time commands to complex assistants that remember past conversations.

> Sidenote:
> - Based on these guides:
>   - :term[001: Agent/Request]{href="./001_agent_request.md"}
>   - :term[010: Agent/Loop]{href="./010_agent_loop.md"}

The `@augceo/agent` library is the main, official version of the agent system described in the Acts. Unlike other tools that focus on writing clever prompts, this library cares most about **following the rules perfectly**. It uses a very strict process where every step is clearly defined, labeled, and organized, like a perfectly sorted toolbox.

## The Acts (Official Guides)

This library is built directly from the detailed guides called the **Acts**. Every feature in the library matches a specific guide.

This design allows you to **mix and match pieces**. Instead of one giant, all-or-nothing program, each Act gives you a specific skill. You can choose to use only the parts you need, whether it's a simple tool or a whole team of agents working together.

### Core Building Blocks

- **:term[001: Agent/Request]{href="./001_agent_request.md"}**: The smallest possible piece of work you can give the AI.
  - It takes some information (Context) and a set of rules (Schema) and turns them into a structured answer (Solution).
  - It can create multiple possible answers at the same time.
  - This is the foundation for everything else an agent does.
- **:term[002: Agent/Tool]{href="./002_agent_tool.md"}**: A blueprint that describes a skill the agent can use.
  - It defines *what* a tool does, but not *how* it does it. Think of it like a light switch on the wall—you know it turns on the light, but you don't need to see the wiring inside.
  - This allows the AI to choose the right tool for a job based on its description.
- **:term[003: Agent/Activity]{href="./003_agent_activity.md"}**: The actual code that makes a Tool work.
  - This connects the Tool's blueprint to the real code that performs the action. It's the wiring behind the light switch.
  - It keeps the description of a tool separate from its code.
- **:term[004: Agent/Call]{href="./004_agent_call.md"}**: The moment an agent decides to use a specific tool.
  - It’s the official message saying, "I want to use this tool with these settings."
  - It acts as the messenger between the AI's intention and the system's action.

### Data & Memory

- **:term[005: Agent/Data]{href="./005_agent_data.md"}**: The standard format for all information the agent remembers.
  - It's like a standard-sized shipping box for every piece of data, keeping everything organized and consistent.
  - This makes it easy to combine different pieces of information.
- **:term[006: Agent/Input]{href="./006_agent_input.md"}**: Turns a one-time task into a reusable template.
  - It defines the exact inputs a task needs, like a recipe listing its ingredients.
  - This lets the system automatically create forms for users and ensures tasks are run correctly.
- **:term[009: Agent/State]{href="./009_agent_state.md"}**: The agent's long-term memory that lasts between steps.
  - It's like a shared notepad that the agent uses to keep track of its progress during a long task.
  - This lets tasks be paused and resumed later.
- **:term[016: Agent/Meta]{href="./016_agent_meta.md"}**: Keeps track of the agent's identity and history.
  - It records the agent's version, who made it, and its past changes.
  - This allows an agent to update itself and keep a version number, like a program getting a software update.

### Connecting the Pieces

- **:term[007: Agent/Variables]{href="./007_agent_variables.md"}**: Shortcuts that point to information.
  - Uses a special `†kind.path` code to link the result of one step to the input of another.
  - This lets tools read information from the agent's memory without having to make copies of it.
- **:term[008: Agent/Output]{href="./008_agent_output.md"}**: A way for tools to write down their results.
  - Uses `_outputPath` to tell the system exactly where in its memory to save a tool's result.
  - This allows you to connect tools in a chain, where one tool's output becomes the next tool's input.
- **:term[011: Agent/Expressions]{href="./011_agent_expressions.md"}**: Lets you add logic to the workflow.
  - Supports choosing between paths (`||`), like a fork in the road.
  - Supports splitting a path (`&&`) to send the same information to multiple places at once.

### Managing the Work

- **:term[010: Agent/Loop]{href="./010_agent_loop.md"}**: The main engine that keeps the agent running.
  - It keeps giving the AI tasks until the final goal is achieved.
  - It manages the cycle of thinking, acting, and learning from the results.
- **:term[012: Agent/Plan]{href="./012_agent_plan.md"}**: The agent's overall strategy.
  - It shows the entire workflow as a map of connected tool uses.
  - It separates the *thinking* part (the plan) from the *doing* part (the action).
- **:term[013: Agent/Instancing]{href="./013_agent_instancing.md"}**: Runs the same plan on many things at once.
  - It groups tasks with an `_instance` ID to run them side-by-side without getting them mixed up.
  - This is like having many assembly lines running at the same time to process a huge amount of data.
- **:term[014: Agent/Delegate]{href="./014_agent_delegate.md"}**: Lets agents give tasks to other agents.
  - It runs these smaller tasks in a safe, separate workspace.
  - This is like a manager delegating a job to a specialist, turning big agents into teams of smaller ones.
- **:term[015: Agent/Scopes]{href="./015_agent_scopes.md"}**: Controls what information each agent can see.
  - Uses `_scopes` to create a strict 