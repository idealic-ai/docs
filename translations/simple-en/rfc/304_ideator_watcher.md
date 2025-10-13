# 304: Ideator/Watcher

> **Watcher:** Imagine a security guard for your data. A `Watcher` is a program that constantly keeps an eye on a storage space. When a new file or a change appears, it doesn't just take a note—it kicks off a whole new set of actions, like telling another program to start working on that new file.
> 
> — [Glossary](./000_glossary.md)

> Sidenote:
> - Requires:
>   - [301: Ideator/Storage](./301_ideator_storage.md)
>   - [012: Agent/Plan](./012_agent_plan.md)

## 1. Introduction

This document describes something called the **Watcher Protocol**. Think of a `Watcher` as a special kind of helper that is always on, looking for changes in a storage system. When it sees something new, it automatically starts a new job.

It's the main way we connect different parts of the system that don't talk to each other directly. It’s perfect for handling big, long-running jobs that can't be finished in one go.

## 2. The Watcher as a "Starting Point"

Imagine you have a process with a starting line and a finish line.

*   The **finish line** is the `Storage` service. When you save an idea, that task is complete. It's the end of one journey.
*   The **starting line** is the `Watcher`. Its job is to see that one journey has ended and to fire the starting pistol for a brand new one.

Here’s how it usually works:

1.  You save an `Idea` to `Storage`. Job #1 is done.
2.  The `Storage` service sends out a notification, like ringing a bell, to say, "Hey, something new just arrived!"
3.  A `Watcher` is listening for that bell.
4.  When it hears the bell, the `Watcher` starts a completely new job. It usually does this by giving the new `Idea` to a planner program (a [012: Agent/Plan](./012_agent_plan.md)) to kick off the next set of steps.

## 3. Handling Big, Slow Jobs

The `Watcher` is key for dealing with jobs that take a really long time, like hours or even days.

For example, imagine a task that needs a human to approve something. A computer can't just sit and wait. That would be like you holding your breath until you get an email reply — it just doesn't work!

Instead, the program can do this:

1.  It sends the task to an outside service (like sending an email to a person) and then stops running.
2.  When that person finally clicks "approve," the outside service saves the result back to `Storage`.
3.  A `Watcher`, which was set up to look for that specific result, sees it appear.
4.  The `Watcher` then starts a *new* program to continue the work from where it left off.

This method allows you to build really powerful systems that don't crash or get stuck waiting. It breaks down a giant, long process into a chain of smaller, faster tasks that are kicked off one after another by these automatic notifications.

