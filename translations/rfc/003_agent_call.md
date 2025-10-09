# Time to Take Action: The 'Call'

Imagine you have a big book of ideas. An **Idea** is like a finished drawing of a cool robot. It shows what the robot looks like and what it can do. It's the final result, the finished thing.

Now, to help our computer friend (let's call it an Agent), we can't just show it the drawing. We need to give it instructions. So, we flip the idea around and turn it into a **Tool**. A Tool is like a blueprint or a recipe for building that robot. It says, "To build this robot, you will need these parts: a head, two arms, two legs." It's a list of what's possible.

But a blueprint doesn't build itself. You have to decide to actually do it! That's where a **Call** comes in. A **Call** is when the Agent points at the robot blueprint and says, "Okay, let's build this *right now*! Use the shiny red metal for the head, the long silver pipes for the arms, and the chunky black wheels for the legs." 

So, it goes like this:
1.  **Idea**: The picture of the finished robot.
2.  **Tool**: The blueprint explaining what parts you need.
3.  **Call**: The specific order to build the robot with *these exact parts*.

### Where and How to Build the Robot?

A Call has two main controls, like settings on a video game:

1.  **Scope (The 'Where')**: This decides *where* the work gets done.
    *   **Inline (Do it here)**: The Agent builds the robot itself, right where it is. It's like cooking in your own kitchen.
    *   **Module (Ask for help)**: The Agent sends the order to a special workshop. It's like ordering a pizza instead of making it yourself. Someone else handles the task.

2.  **Method (The 'How')**: This decides *how* the robot gets made.
    *   **Explicit (Follow the exact steps)**: The blueprint has super-detailed, step-by-step instructions. If you follow them perfectly, you get the exact same robot every time.
    *   **Latent (Use some creativity!)**: The blueprint just says, "Make a cool-looking head." The Agent has to get creative and design a head itself. This is like asking an AI to come up with its own idea.

### The Big Decision Moment

So how does the Agent decide what to do? It uses something called a **Vessel Idea**. Think of it like a quest folder in a video game.

This folder contains two things:
1.  **The Context**: This is all the information about the current situation. "You are in a dark forest, you have a map, and you hear a dragon roaring."
2.  **The Tools**: This is the list of actions (or spells) you can use *right now*. For example: "Run," "Hide," or "Use Magic Shield."

The Agent (our hero!) looks at the situation and the list of available actions and makes a decision. Its decision is the answer—a list of one or more **Calls** to perform. For example: `[Call: 'Hide' behind the big rock, Call: 'Use Magic Shield'].`

### Doing Multiple Things at Once

When the Agent decides to make multiple Calls, it can do them in different ways:

*   **One by one**: Do the first action, see what happens, then do the second.
*   **All at once (`.all`)**: Do all the actions at the same time, but they *all* have to succeed for the plan to work. It’s like you and your friend both have to turn your keys at the same time to open a treasure chest.
*   **First one wins (`.any`)**: Try three different ways to open a door at once. As soon as one of them works, you stop and go through.
*   **The Race (`.race`)**: Start two actions at the same time. Whichever one finishes first (even if it fails!) decides what you do next.