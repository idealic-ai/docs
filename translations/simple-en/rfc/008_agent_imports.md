# 008: Agent/Imports

> **Import:** Imagine you have a helper (an AI) and a huge room full of information. An 'Import' is like a sticky note you give the helper that says, "You are only allowed to look at this specific box of files for this next task." It helps the AI focus on what's important. This is controlled by a special instruction called `_imports`.

The previous guide, [004: Agent/Call](./004_agent_call.md), talked about the main ways to ask an AI to do something. We learned about its **Scope** (where it does the work) and its **Method** (how it does the work). This guide explains how to mix and match those settings and use **Imports** to control what information the AI sees for each job.

## Combining Where and How The AI Works

Let's imagine the AI is a chef. **Scope** is *where* the chef works: in the main kitchen (**Inline**) or in a separate, special baking room (**Module**). **Method** is *how* the chef works: by using a physical tool like a blender (**Explicit**) or by figuring out a recipe in their head (**Latent**).

Here are the four ways you can combine them:

1.  **Main Kitchen, Using a Tool (`Inline Explicit`):** This is like telling the chef, "Use the blender (`_activity`) with these strawberries." It's a simple, direct command. We don't usually need to use `_imports` here because the command is so specific.

2.  **Main Kitchen, In Their Head (`Inline Latent`):** This is when you ask the chef to come up with a recipe on the spot using only their brain. You can use `_imports` here to help them focus. It's like putting a spotlight on just the strawberries on the counter, so the chef ignores the onions and knows to create a strawberry dessert.

3.  **Side Kitchen, Using a Tool (`Modular Explicit`):** You tell the chef, "Go to the baking room (`_module`) and use the oven (`_activity`)." The `_imports` instruction is like a tray you give the chef with only the exact ingredients they're allowed to take into that room, like pre-measured flour and sugar.

4.  **Side Kitchen, In Their Head (`Modular Latent`):** You tell the chef, "Go to the baking room (`_module`) and figure out a recipe." The `_imports` list is the *only* information the chef can bring into that room. For example, a note that says "the user’s favorite flavor is chocolate." The chef then works in total isolation, using only the information you gave them.

## Focusing the Field of View

The `_imports` instruction is the main way we control what the AI is allowed to see. Think of it like putting blinders on a horse. It filters all the information available and gives the AI a very limited view for its task.

-   **In the Main Kitchen (Inline Scope)**: The `_imports` help the AI focus its attention on the right thing in a busy environment.
-   **In the Side Kitchen (Module Scope)**: The `_imports` define the *only* things the AI can see. The rest of the world is completely blocked off.

## Giving vs. Asking For Information: Static vs. Dynamic Imports

How does a tool know what information it's allowed to see? It's defined in its instruction manual (`Tool`'s schema). There are two ways this can work:

-   **Static Imports (Giving Information):** The instruction manual has a fixed list of things the tool can see. For example: `_imports: { "const": ["user_request"] }`. This means, "This tool is *always* given the user's request, and nothing else." The person who designed the tool has decided this in advance. It's like getting a pre-packaged meal kit with all the ingredients already measured out.

-   **Dynamic Imports (Asking For Information):** The instruction manual gives the AI a list of *approved* things it can ask for. For example: `_imports: { "type": "array", "items": { "enum": ["session_memory"] } }`. This means, "When you run this tool, you are allowed to *ask for* the 'session_memory' if you need it." The AI gets to decide at that moment if it needs that information to do its job.

This "asking" style is super useful when you have a person checking the AI's work. The AI might ask, "Can I see the conversation history to complete this task?" and a person can click "Approve" before it gets the information. This gives us a great deal of safety and control.

## The Power of a Limited Context

Why is it so good to limit what the AI sees?

-   **Better Security & Focus**: By limiting the AI's view, we prevent it from accidentally seeing or sharing private information. It also helps the AI do a better and faster job because it isn't distracted by useless data. This can also make it cheaper to run.
-   **Works Like LEGOs**: Imports allow us to build tools and AI assistants that are like LEGO bricks. Each piece is self-contained and doesn't need to know about the whole castle it's a part of. You can just give a tool the one or two pieces of information it needs, and it will work perfectly, making it easy to reuse in different projects.