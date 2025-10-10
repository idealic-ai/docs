# 301: Ideator/Storage

## 1. Introduction

This document describes a core tool called the **Storage System**. Think of it as a super-smart library designed specifically for `Ideas`.

Its main job is to provide a permanent, safe place to keep `Ideas`. It's the foundation for memory in the whole system, allowing `Ideas` to be saved and kept in different versions. This way, other tools, like the [System: Resolver](./202_ideator_resolver.md), can find and use them later.

## 2. How It Works: Storage is an Idea Transformer

The Storage system is a special kind of tool called an `Idea Transformer`. These tools always take an `Idea` in and give an `Idea` back out.

- **What you give it (Input)**: A complete `Idea`, which is made of three parts (`schema`, `solution`, `context`).
- **What it does (Process)**: The system takes your `Idea`, gives it a unique address so it can be found later (this address also keeps track of the version), and then stores it in a super-reliable place, like a digital vault (for example, a PostgreSQL database).
- **What you get back (Output)**: It hands you back your original `Idea` as a way of saying, "Got it! It's saved." It might also add a little note to your `Idea`, like a library receipt, that includes the new address and version number to prove it's been stored safely.

## 3. Key Features

### 3.1. It's a "Black Box"

The Storage system is designed to be a "black box" that just works. You send it an `Idea` to save, and you don't have to worry about how or where it's stored. You don't get to pick the database or the filing system.

The system promises that once it accepts your `Idea`, it will be kept safe and will be available to be found later. The nerdy details inside the box are handled for you.

### 3.2. Versioning and Never Changing the Past

This system is built on a very important rule: nothing is ever erased or changed. When you want to "update" an `Idea`, the system doesn't just edit the old one. Instead, it creates a brand-new version and saves that, leaving the original one untouched.

Think of it like the "version history" in Google Docs. It keeps a perfect, unbroken timeline of every change an `Idea` has ever gone through. This means if you ask for a specific version of an `Idea`, you will always get that *exact* version, forever. You can ask for a specific version number or just ask for the `latest` one.

### 3.3. Every Idea Has a Unique Address

Every `Idea` that gets stored is given a unique address, almost like a fingerprint. You can use this special address (and its version number) to find and retrieve that exact `Idea` anytime. This makes the whole system very reliable and allows anyone to refer to a specific `Idea` with perfect clarity.

## 4. How to Talk to It

The way you interact with the Storage system is very simple because it only has one main job: to save things.

- **Your Main Action**: The only thing you do is give it an `Idea` to store.

- **It Doesn't Fetch Things For You**: To keep things neat and simple, the Storage system's job isn't to help you find and retrieve `Ideas`. That responsibility is given to another tool called the **Resolver**. 

This keeps each tool focused on what it does best. The Storage system is an expert at saving things. The Resolver is an expert at finding and putting things together.