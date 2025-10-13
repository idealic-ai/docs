# 304: Ideator/Watcher

> **Watcher:** Imagine a lookout who keeps an eye on a storage warehouse (`Storage`). When something new arrives (like a new version of an `Idea`), the lookout doesn't just sit there. They kick off a new task, usually by handing a set of instructions (`Plan`) to a worker to deal with the new item.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
> - Needs to work with:
>   - [301: Ideator/Storage](./301_ideator_storage.md)
>   - [012: Agent/Plan](./012_agent_plan.md)

## 1. Introduction

This document explains the **Watcher Protocol**. Think of a `Watcher` as a dedicated guard for your data. It's a service that constantly watches a `Storage` location for any changes. When it spots a change, it triggers a new process.

This is how the system handles tasks that take a long time and don't happen instantly. It's the main way we connect parts of the system that remember things with parts that don't.

## 2. The Watcher as a Starting Point

If a `Storage` service is the *finish line* for a task (where the final result is saved), a `Watcher` is the *starting line* for a new one. Its job isn't to end a task, but to begin a completely new one.

Here’s how it usually works:

1.  A new `Idea` is saved to `Storage`. The first task is now complete.
2.  The `Storage` service sends out a notification, like a news alert, saying, "Something new has arrived!"
3.  A `Watcher`, which has subscribed to these alerts, gets the notification.
4.  The `Watcher` then starts a brand new, separate task. This usually means it tells an `Agent` to follow a specific recipe ([Plan](./012_agent_plan.md)), using the new `Idea` as the main ingredient.

## 3. Handling Slow and Long-Running Jobs

The `Watcher` is the secret to managing jobs that can take hours or even days to finish.

For example, imagine a job needs to wait for a person to approve something. A normal computer program can't just pause and wait for days.

Instead, the program can give the long-running task to another service and then finish its own job. Later, when that other service is done, it saves its result back into `Storage`. A `Watcher`, which was set up to look for that specific result, will see it appear. It then kicks off a *new* recipe (`Plan`) to continue the workflow from where it left off.

This method allows us to build very strong and flexible systems. A long process is broken down into a chain of smaller, separate tasks, each one triggered by the last one finishing. This means no single program has to run for days, and the whole system can handle huge workloads without getting stuck.


