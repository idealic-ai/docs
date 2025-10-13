# A Dictionary of Big Words

This guide explains the main ideas and words you'll see when we talk about the Idea Protocol.

- **Idea**: Think of an Idea as a special LEGO brick. It's not just a plastic block; it's a smart block that holds a single piece of knowledge. It remembers its shape (`schema`), what it's for (`solution`), and how it fits with other bricks (`context`). It's a permanent building block, not just a temporary command you shout.



- **Ideator**: This is an Idea that can *do* something. It’s like a function machine from math class: you put something in, and it gives you something new back. We know it's an Ideator because it's waiting for an `input`.



- **Idea Transformer**: A special kind of Ideator whose job is to change other Ideas. Imagine a machine where you put in a red LEGO brick (an Idea), and it spits out a blue LEGO brick (a new Idea). That machine is an Idea Transformer.



- **Input Message**: This is the specific thing you give to an Ideator to make it work. If an Ideator is a gumball machine, the Input Message is the quarter you put in to get a gumball out.



- **Tool**: This is like a button on a video game controller. The button has a label, like "Jump," which tells you what it *can* do. The AI (the player) sees this button and knows it's an available action.



- **Activity**: This is the actual computer code that runs when a Tool is used. If the "Jump" button is the Tool, the Activity is the programming that makes the character on the screen actually jump. It’s for things the AI can't do by just thinking, like connecting to the internet or saving a file.



- **Call**: A Call is when the AI actually presses the button. It’s the specific command to use a Tool with all the details filled in, like "Jump 2 feet high."



- **Scope**: This is *where* the command (the `Call`) happens.
  - **Inline Scope**: The command is handled right here, in the current 'room' or process.
  - **Module Scope**: The command is sent to a different, separate 'room' to be handled, so it doesn't mess with what's happening here.


- **Method**: This is *how* the command (the `Call`) is carried out.
  - **Explicit Execution**: The result is predictable because it's done by regular computer code (an `Activity`). If you press the jump button, the character jumps exactly 2 feet every time.



  - **Latent Execution**: The result is figured out by the creative AI. It's like asking a friend for an idea—you know you'll get an answer, but you don't know exactly what it will be.



- **Module**: A 'clean room' for running a command. When you use a Module, the task is done in a totally separate space. This way, it can't accidentally interfere with the main project. You can pass in only the specific tools and information it needs to do its job.



- **Import**: This is like carefully passing a specific tool or note into the 'clean room' (the Module). It's a way to give a task only the exact information it needs from the outside world without letting it see everything.



- **Loop**: Imagine you're trying to solve a puzzle. You try a move (`Request`), see what happens (`Call`), and then use that result to plan your next move. You keep doing this over and over until the puzzle is solved. That whole process is a Loop.



- **State Message**: This is like a sticky note that helps the AI remember what's going on between steps in a Loop. It's like a 'save point' in a video game that keeps track of your progress and inventory.



- **Plan Idea**: This is a recipe or a blueprint for a multi-step task. It lists all the steps and tools you'll need, but it hasn't been used yet. It’s like a recipe for a cake before you've started baking.



- **Process Idea**: This is a `Plan Idea` that's currently in action. It's the cake recipe while you're actually baking, with checkboxes next to the steps you've already completed. It holds both the plan and your current progress.



- **Vessel Idea**: This is like a character in a fighting game. It knows every possible move it could make (`schema`), and it also remembers the specific move it just made (`solution`) in response to what its opponent did.



- **Instancing**: This is like a teacher grading tests for the whole class at once. The teacher is doing one job (grading), but is applying it to many different students (`Instances`) at the same time, keeping each student's score separate.



- **Instance**: In the test grading example, each individual student's test is an Instance. It has its own answers and its own final score, separate from everyone else's.



- **Reactor**: This is a special Ideator that acts like a game engine or a referee. You give it the current state of a game (like the positions of all the chess pieces), and it tells you what the game looks like after the next turn. It reacts to the input and produces the next state.
