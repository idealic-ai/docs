# 304: Ideator/Watcher

> **Watcher:** Imagine a security camera for your data. It's a special helper that constantly “watches” a storage folder. When something new is saved or a file is changed, the Watcher sees it and kicks off a new job to handle that change.
>
> — [Glossary](./000_glossary.md)

> Sidenote:
> - Requires:
>   - [301: Ideator/Storage](./301_ideator_storage.md)
>   - [012: Agent/Plan](./012_agent_plan.md)

## 1. Introduction

This document explains the **Watcher Protocol**. Think of it as a system of automatic alerts for our digital world. A `Watcher` is like a permanent guard that keeps an eye on a storage area. When it spots a change, it triggers a new process to happen.

This is how we handle jobs that take a really long time or need to happen in the background, instead of making someone wait for them to finish right away.

## 2. The Watcher as a "Starting Line"

While a `Storage` area is like the "finish line" for a task (where the result is saved), a `Watcher` is the "starting line" for a new one. Its job isn't to finish a process, but to **start a new one**.

Here’s how it usually works:

1.  A piece of work (an `Idea`) is finished and saved in the `Storage` area.
2.  The `Storage` area sends out a notification, like a flare, saying, "Hey, something new just arrived!"
3.  A `Watcher`, which was waiting for that specific signal, sees the notification.
4.  The `Watcher` then starts a brand new task. It usually does this by giving a `Plan` (a set of instructions) the new `Idea` to work on, kicking off the next part of the process.

## 3. Handling Long and Complicated Jobs

The `Watcher` is perfect for managing jobs that could take hours or even days.

Imagine you have a `Plan` that needs to wait for a human to approve something. A computer can't just pause and wait for days. That would be like leaving your computer on, frozen, until someone gets back to you.

Instead, the `Plan` can give the long-running task to another service and then finish its own job. When that other service is finally done, it saves its result back to the `Storage` area. A `Watcher`, set up to look for that specific result, will see it and then automatically start a *new* `Plan` to continue the workflow from where it left off.

This method allows us to build powerful and reliable systems that can handle huge jobs. It breaks down a long process into a chain of smaller, separate tasks, where each one is triggered by the last one finishing.