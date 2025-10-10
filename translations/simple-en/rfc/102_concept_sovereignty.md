# 102: Concept/Sovereignty

> Sidenote:
>
> - This builds on:
>   - [101: Concept/Idea](./101_concept_idea.md)
>   - [103: Concept/Ideator](./103_concept_ideator.md)

## 1. What This Is About

This document explains **Sovereignty**, which is just a fancy word for how much control you have over your creations in our system. Think of it like a video game where you can choose the difficulty level. You can use our easy-to-use tools that do most of the work for you, or you can choose to build and run everything yourself, giving you total control.

This is the guide that shows how we turn an idea on paper (an `Ideator`) into a real, working thing on the internet.

## 2. The Five Levels of Control

Our system is built in five levels, like floors in a building. Each level gives you more power and control. You can start on the first floor and use our help, or you can build your own penthouse suite where you are in charge of everything.

It’s all about choice. You can pick the level of control that feels right for you. You can start with our simple, helpful services and gradually take over more control until you're running the whole show yourself on your own website.

### Level 1: A Home for Your Idea

This level gives your idea's blueprint (the `Ideator` file) a place to live on the internet, instantly and with no fuss.

- **How It Works:** To make things easy, we offer to keep your `Ideator` file in our online storage (it's called an S3 bucket). We then create a little signpost on the internet (a `TXT` record) that points to it. If you ever want to move your file to your own storage space, like your own server or another service, you just change the signpost to point to the new location. It's that simple.
- **Why We Do It:** So you don’t have to worry about finding a place to store your file just to get started.

---

### Level 2: A Face for Your Idea

This level turns your `Ideator` into a real webpage that people can see and use, without needing any big, fancy servers.

- **How It Works:** We have a special, one-size-fits-all webpage. When someone visits your idea's web address, some code on that page instantly goes to work. It looks up that internet signpost (`TXT` record) to find your idea's blueprint, downloads it, and builds a user-friendly interface right there in the browser. It’s like a pop-up book that assembles itself the moment you open it.
- **Why We Do It:** To give every idea a free, working web app right away, making it super easy for anyone to create something useful.

---

### Level 3: A Smart Assistant for Other Computers

This level helps other computer programs understand and work with your idea really easily.

- **How It Works:** We put a smart delivery service (a CDN) in front of your idea's blueprint. When another computer program asks to see your idea, this service acts like a helpful librarian. Instead of handing over the whole blueprint, it can find and give out just the specific part the program needs. This makes it fast and easy for other developers to connect their apps to your idea. It can even provide a handy instruction manual (`.d.ts` file) so they know exactly how to work with it.
- **Why We Do It:** To let other programs use your idea in a smart, efficient, and professional way.

---

### Level 4: The Magic Update Button

This level gives you a simple and secure way to publish new versions of your idea.

- **How It Works:** This level lets you send an update to your idea's web address. You just need to prove it’s you (with a secret key). With one single command, you can upload the new blueprint file *and* update the internet signpost at the exact same time. This makes updating smooth and safe, so nothing breaks.
- **Why We Do It:** To give you a secure and simple way to manage and improve your ideas over time.

---

### Level 5: Bringing Your Idea to Life

This is the top level. It turns your `Ideator` from a blueprint into a real, working machine that can do tasks.

- **How It Works:** At this level, your idea can receive commands (`POST` requests) and actually perform the actions written in its blueprint. It’s like you've built a robot that can now follow instructions. You can let us provide the engine to make it run, or you can host your own engine and have complete control.
- **Why We Do It:** To give you the power to create a real web service that can do almost anything, starting from just a simple idea file.

## 3. The Commands

All the computer commands happen at your idea's main web address (like `your-idea.com/`).

- **`GET /`**
  - This command is for *getting* information.
  - If a person in a web browser asks (`Accept: text/html`), it shows them the friendly webpage (from Level 2).
  - If another computer asks (`Accept: application/json`), it gives them the raw blueprint file (from Level 3).
- **`PUT /`** (Level 4)
  - This command is for *updating* your idea. You need a secret key to prove it's you. It uploads your new blueprint and makes it live all in one go.
- **`POST /`** (Level 5)
  - This command is for *telling your idea to do something*. You send it a package of information (like `{"context": "Here is something to work on"}`), and your `Ideator` performs the task.