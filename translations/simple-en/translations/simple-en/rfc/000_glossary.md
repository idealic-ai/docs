# A Dictionary for Our Cool New System

This guide explains the big ideas behind our project, using simple words and examples.

- **Idea**: Think of this as a super-detailed LEGO instruction booklet. It doesn't just show you the final model (`solution`), it also tells you exactly what pieces you need (`schema`) and gives you some fun facts about the designer (`context`). An `Idea` is a complete, self-contained package of knowledge about one thing.

- **Ideator**: This is like a Mad Libs story. A normal `Idea` is just a complete story, but an `Ideator` is a story with blank spaces waiting for you to fill in words. It's an `Idea` that is designed to take your input and create something new with it.

- **Idea Transformer**: Imagine a machine that can take one LEGO instruction booklet and cleverly redesign it into a new one. For example, you feed it the instructions for a car, and it gives you back instructions for a plane. That’s an `Idea Transformer`—it’s a special `Ideator` that takes a whole `Idea` as its input and changes it into another one.

- **Input Message**: In a Mad Libs story, this is the part that says "(Enter a Noun)" or "(Enter a Verb)". It's the specific instruction that tells you exactly what kind of information the `Ideator` is waiting for.

- **Tool**: Imagine you give an AI a remote control. One button on the remote is labeled "Look up the weather." The button itself doesn't *do* the action, it just describes a power the AI has. A `Tool` is like that button—it's a clear description of a special skill the AI can choose to use.

- **Activity**: If the "Look up the weather" button is the `Tool`, the `Activity` is the actual wiring inside that connects the button to the internet and a weather website. It’s the real code that does the work when the AI decides to use the `Tool`.

- **Call**: A `Call` is the moment the AI actually presses the button. If the `Tool` is the *option* to look up the weather, the `Call` is the specific command: "Look up the weather for London *right now*."

- **Scope**: This just means *where* the job gets done.
    - **Inline Scope**: You're cooking dinner and realize you need to chop onions. You stop what you're doing and chop them right there in your kitchen. The task is done by you, in your current workspace.
    - **Module Scope**: You're cooking dinner and decide you want pizza. You call a pizza place and have them make and deliver it. You outsourced the job to a professional who handled it separately.

- **Method**: This is about *how* a job gets done.
    - **Explicit Execution**: You ask a calculator "What is 2+2?" It follows a strict set of rules (an `Activity`) and gives you the one correct answer: 4. It's predictable and based on code.
    - **Latent Execution**: You ask a friend, "What’s a fun thing to do today?" Your friend thinks about it and gives you a creative suggestion. The answer comes from their own brain and experience, not a simple script. This is what happens when an AI uses its own intelligence to figure out the answer.

- **Module**: A `Module` is like a vending machine. It’s a self-contained specialist that does one job really well. You don’t need to know how it works inside; you just make a `Call` (put in money and press a button), and it reliably gives you a result (a snack).

- **Import**: Let's say you're asking a friend for help with your math homework. Instead of giving them your entire backpack filled with books for every subject, you just hand them your math textbook. That textbook is an `Import`. You're giving the helper just the specific information they need to do the job, which helps them focus.

- **Loop**: This is how the AI works to solve a big problem. It's like playing a video game: you (1) look at the screen to see what's happening, (2) decide what to do and press a button, then (3) see what happens. Then you do it all over again. The AI keeps going through this "look, act, see" cycle until the job is done.

- **State Message**: In a video game, your score, health bar, and inventory are your "state." They are the important pieces of information that are saved from one turn to the next. A `State Message` is the AI's memory of its progress that it carries through each step of the `Loop`.

- **Plan**: A `Plan` is like a recipe for getting something done. It’s a list of steps (`Tool Calls`) that have to be done in a certain order. For example, you have to mix the cake batter *before* you can put it in the oven. A `Plan` lays out all the actions and the order they need to happen in.

- **Instancing**: Imagine a teacher grading homework for 20 different students at the same time. She’s doing the same task (grading) over and over, but she's careful to keep each student's paper and grade separate. `Instancing` is the system's ability to do this—to handle many similar but separate tasks at once without getting them mixed up.

- **Instance**: In that pile of homework, one single student's paper is an `Instance`. It's one unique job, with its own student name and its own answers, that is part of a bigger batch of work.

- **Reactor**: Think of a referee in a game of chess. The referee (`Reactor`) looks at the current state of the board, waits for a player to make a move, and then updates the board to show the new state. The `Reactor` is like a universal referee designed to manage any turn-based game or process by taking the current situation and producing the next one.