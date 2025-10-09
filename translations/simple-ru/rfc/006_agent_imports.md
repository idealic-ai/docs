### Packing a Backpack for our AI Helper

Imagine our computer program is like Mission Control, and it has a smart AI helper, like a little robot, that can do different jobs (we call these `Calls`).

Sometimes, Mission Control needs to send the robot on a mission. To do its job well, the robot needs the right information and tools. But we don't want to give it access to *everything* in Mission Control – that would be confusing and maybe even dangerous!

This is where an **`Import`** comes in. Think of it as a special list Mission Control makes when it packs a backpack for the robot. The list tells the robot exactly which pieces of information it's allowed to take from the main room for its specific mission. It's like saying, "For this job, you only need the blueprint for the satellite and the weather report. Ignore everything else."

#### Different Kinds of Missions

Our robot can do its job in a few different ways:

1.  **Job on the Spot:** The robot does a simple task right there in the main room. It's like asking it to hand you a screwdriver that's already on the table. It doesn't need a special backpack for that.

2.  **Mental Rehearsal:** The robot *imagines* doing a job and tells you the result. Here, the backpack is super useful! We can give it a backpack with just one or two items to help it focus. It's like saying, "Pretend you're fixing this radio. Here's the diagram for *just the radio*. Now, tell me the steps." This stops the robot from getting distracted by a TV in the corner.

3.  **Job in a Special Workshop:** We send the robot to a separate, clean room (a `Module`) to do a specific task with a special tool. Mission Control packs its backpack (`_imports`), and those are the only things the robot can bring into the workshop.

4.  **Creative Mission in a Workshop:** We send the robot to the workshop with a general goal, like "Figure out what this rock is made of." We pack its backpack with the rock sample and a microscope (`_imports`). The robot then uses its own smarts to complete the mission, but it can *only* use the tools we gave it and what's already in that workshop.


#### Who Packs the Backpack?

There are two ways the backpack can be packed:

*   **Pre-Packed (Static Imports):** Imagine the mission is "Bake a Cake." The instructions are very strict and say, "You get flour and eggs. That's it." The backpack is packed ahead of time, and the robot has no say in what it gets. The person who designed the "Bake a Cake" tool decided what was needed.

*   **Robot's Shopping List (Dynamic Imports):** Imagine the mission is "Explore a Cave." We give the robot a list of allowed items: a flashlight, a rope, a helmet. The robot then gets to say, "Okay, for this cave, I think I'll need the flashlight and the rope." It *requests* what it needs from the approved list. This is really cool because sometimes a person can check the robot's shopping list before handing over the tools, just to be safe.

#### Why is this Backpack Idea So Good?

1.  **It's Safer and Smarter:** By only giving the robot what it needs, we prevent it from accidentally stumbling into things it shouldn't, like the ship's self-destruct button! It also helps the robot concentrate, making it faster and more accurate.

2.  **We Can Reuse Our Tools:** We can design a "Fix-the-Engine" tool kit. This kit can be given to any robot and sent to any spaceship. As long as we pack the right engine blueprint in its backpack, it can do its job without needing to know anything else about the rest of the ship. This makes our tools super handy and reusable.