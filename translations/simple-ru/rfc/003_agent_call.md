Imagine you have a magical cookbook.

An **Idea** is like a picture of a delicious cake in that cookbook. It shows the final, perfect result.

A **Tool** is the recipe for that cake. It lists all the ingredients you *could* use, like flour, sugar, and eggs. It tells you what's possible.

A **Call** is when you actually grab 1 cup of flour, 2 eggs, and a spoonful of vanilla and say, "Okay, let's make *this specific cake* right now!" A `Call` is the command to start doing something.

### The Journey: From Picture to Action

1.  **Idea (The Picture):** We start with a picture of what we want, like that finished cake.
2.  **Tool (The Recipe):** We turn that picture into a step-by-step recipe so our computer chef (the AI) knows the rules for making it.
3.  **Call (The Command):** The AI decides to bake, picks out the exact ingredients, and shouts, "Let's go!" That starting command is the `Call`.

Any picture of a food (`Idea`) can be turned into a recipe (`Tool`), which can then be used to cook (`Call`).

### Where and How to Cook?

When the AI gets a `Call` (a command to cook), it has to decide on two things:

1.  **Scope: Where does the work happen?**
    *   **Inline (In my kitchen):** The AI does the work right here, by itself.
    *   **Module (At a friend's house):** The AI sends the task to a specialist helper who has a better kitchen for that specific job.

2.  **Method: How is the work done?**
    *   **Explicit (Robot Chef):** The AI follows the recipe *exactly*. Every step is pre-programmed, like a robot that can only do what its code says.
    *   **Latent (Creative Chef):** The AI uses its own creativity. It looks at the ingredients and comes up with the best possible cake, like a master chef inventing something new.

### The Big Picture vs. The To-Do List

*   An **Idea** is focused on the **result**. It's the photo of the beautiful cake.
*   A **Tool** is focused on the **instructions**. It's the recipe with all the steps.
*   A **Call** is focused on the **action**. It's the command, "Start baking now!"

### The Mission Briefing

When we want our AI to make a decision, we give it a "Mission Briefing." We call this a **Vessel Idea**. Think of it like a folder that contains two things:

1.  **The Context:** All the important information. For example: "A friend is coming over who loves chocolate."
2.  **The Schema (Your list of tools):** A list of all the recipes the AI is allowed to use right now. For example: "You can make a chocolate cake, chocolate cookies, or a fruit salad."

The AI reads the mission briefing and makes a decision. Its answer is a list of commands, or `Calls`. For instance, it might decide: "I will make the chocolate cake!"

### Different Ways to Get Things Done

If the AI decides to do multiple things (like "bake cake" and "make frosting"), we can tell it how to handle its to-do list:

*   **One at a time:** Finish baking the cake completely, *then* start making the frosting.
*   **All at once (`.all`):** Start making the cake and the frosting at the same time. Wait for both to be finished.
*   **First one that works (`.any`):** Imagine you have two ways to make frosting. You tell the AI, "Try both recipes and stop as soon as one of them works!"
*   **The fastest one (`.race`):** Tell the AI, "Start making both the cake and frosting. Let me know which one finishes first, I don't care if it's a success or a failure."