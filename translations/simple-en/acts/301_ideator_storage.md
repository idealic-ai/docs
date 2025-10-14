# 301: Ideator/Storage

## 1. Introduction

This document explains a very important part of the Idea system called **System: Storage**. Think of it as the system's long-term memory. Its main job is to be a super-safe place where `Ideas` can be saved forever.

It's like a magical library that stores every `Idea`. Once an `Idea` is stored, other parts of the system, like the [System: Resolver](./202_ideator_resolver.md) (the librarian), can find and use it later.

## 2. Core Concept: How Storage Works

The Storage system is a special kind of machine that works with `Ideas`. It follows a simple pattern:

- **Input**: You give it an `Idea`.
- **Process**: The machine takes the `Idea`, gives it a unique tracking number (including its version, like 'v1', 'v2', etc.), and files it away in a permanent, safe place (like a vault or a database).
- **Output**: To let you know it worked, the machine hands the `Idea` right back to you with a receipt attached. This receipt has the new tracking number on it, confirming that your `Idea` is safely stored.

## 3. Storage as a Checkpoint

One of the most important jobs of the Storage system is to act like a **save point in a video game**.

When you give an `Idea` to Storage and get your receipt back, that part of the mission is complete. Your progress is saved.

This is a big deal because it allows the whole system to work in small, safe steps. Once an `Idea` is saved, it can trigger another part of the system to start a brand new task. This is much better than trying to do one giant, complicated job all at once. If something goes wrong, you only lose a small step, not the whole thing. It makes the system strong and organized.

## 4. Key Features

### 4.1. It's a Magic Box

The Storage system is like a magic box. You put your `Idea` in, and you trust that it will be kept safe. You don't need to know *how* it's stored—whether it's in a big database or split into tiny pieces across many computers. The system promises that once it accepts your `Idea`, it will be there when you need it.

### 4.2. Saving History, Not Changing It

The system has one very important rule: **you can never change the past**. When you want to "update" an `Idea`, the system doesn't erase the old one. Instead, it creates a brand new version and saves it.

This creates a perfect, unbroken history of the `Idea` from its beginning to its latest version. It’s like a cartoonist's sketchbook, where you can see every a previous draft of a character, not just the final one.

### 4.3. Every Idea Has a Unique Address

Every single `Idea` that gets stored receives its own unique address, like a house address or a website link. This address includes its version number. This means you can ask for a very specific `Idea` from a specific moment in time, and the system can find the exact one you mean, no confusion.

## 5. How to Use It

The Storage system is designed to be very simple, with only one main job.

- **Its Only Job**: You can only give it an `Idea` to save.

- **It Doesn't Fetch Things**: To keep things neat, the Storage system doesn't handle finding or reading `Ideas`. That's a different job. If you want to get an `Idea` out of storage, you have to ask another system called the **Resolver**. 

Think of it like this: Storage is a **mailbox** (you can only put letters in it), and the Resolver is the **mail carrier** (they are the one who can go get the mail for you).