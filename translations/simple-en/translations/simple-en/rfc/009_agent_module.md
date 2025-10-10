# Modules: How Your AI Hires an Expert

Imagine an AI is like a movie director. The director has the big vision for the movie, but they can't also be the special effects artist, the costume designer, and the music composer all at once. They'd get totally confused! A smart director hires experts for each part.

That’s exactly what a **Module** is. It’s a way for an AI to call in a specialist to handle one specific task.

## The Problem: A Messy Studio and Confusing Scripts

When an AI gets more powerful, it can use lots of different tools. If you just throw all those tools into one big messy studio, you run into problems:

1.  **Too Much to Read:** An AI can only focus on so much at one time, like how you can only read one book at a time. If you give it a huge pile of instruction manuals for a hundred different tools, it can get overwhelmed and not know which one to pick.
2.  **Getting Distracted:** If you're trying to write a sad story, you don't want a comedy movie playing in the background. You might mix up the moods! When all the tools are in the same place, the AI can get distracted by the wrong instructions and make mistakes, like using the wrong tool for the job.
3.  **Hard to Share:** Imagine you have an amazing special effects artist working on your movie. If another director wants to hire them, it would be silly to make them bring over your entire messy studio just for that one person. It's much better if the artist can be hired on their own.

Modules fix these problems by letting the AI call a specialist who works in their own clean, separate studio.

## The `_module` Note: Making the Call

To hire a specialist, the AI uses a special note inside a tool's instruction manual called `_module`. This note basically tells the system, "Stop! Don't do this job here. Send it to an expert!"

There are two ways to write this note:

*   `_module: 'idea://<expert-name>'`: This is like saying, "Get me a specific expert, Sarah the Special Effects Artist." The AI is calling another AI project that it knows by name.
*   `_module: 'anonymous'`: This is like saying, "Just find me *any* special effects artist." The AI doesn't care who the expert is, it just needs the job done in a separate, clean space.

## Working in a "Clean Room"

A module gives the expert a "clean room" to work in. Instead of working in the middle of the main AI's crowded and messy studio, the job is sent to a brand new, empty room where they can focus.

But how does the expert know what to do? You can't just put them in an empty room and expect a masterpiece!

This is where **Imports** come in. Think of it like a work order or a memo. When the main AI calls the expert, it also hands them a very specific set of instructions that says, "Here is the *only* information you need for this job." This makes sure the expert doesn't get distracted by anything else and can focus perfectly on their task.

## Building Things Together: The Composer & The Sound Designer

This system allows different specialist AIs to work together to create something amazing.

Let's imagine two AIs:

*   The **`Composer`**: Its job is to write a whole song. It thinks about the big picture, like the melody and the feeling of the tune.
*   The **`Sound-Designer`**: This is a specialist who knows everything about creating awesome electronic sounds with a synthesizer. It's so good that any AI can hire it.

When the `Composer` AI needs a cool sound for its melody, it doesn't try to figure out the complicated synthesizer itself. Instead, it uses a tool called `createMelody`.

Here’s what happens:

1.  The `Composer` decides to use its `createMelody` tool. Inside that tool's instructions, it has a note: `_module: 'idea://sound-designer'` (which means "Hire the Sound Designer expert!").
2.  The system instantly creates a new, clean workshop just for the `Sound-Designer`.
3.  The `Composer` sends over a simple work order (an "import"), saying: "I need a sound that feels like a robot waking up."
4.  The `Sound-Designer` AI gets this request in its clean room. It looks at its own expert instructions about synthesizers and then reads the specific request from the `Composer`.
5.  It creates the perfect robot sound and sends it back to the `Composer`.

The `Composer` never had to know *how* the sound was made, and the `Sound-Designer` never had to know anything about the rest of the song. They are independent experts who teamed up to get a job done perfectly.

## Handling Giant Instruction Manuals

This is also super helpful when a tool is very, very complicated. Instead of giving the main AI a thousand-page instruction manual for one tool (which would clutter up its whole workspace), you can make that tool a module.

The main AI only needs to know the simple instructions for *calling* the specialist. It trusts that the specialist will follow their own giant manual in their own separate workshop. This lets the main AI act like a true director, planning out big projects without getting lost in the tiny details of every single step.