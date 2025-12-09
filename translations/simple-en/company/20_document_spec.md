# 20: Company/Specification

> [!DEFINITION] Specification
> A Specification is like the master blueprint for a project. It’s a single, always-updated instruction manual that explains the project's goal, how it’s built, and every little detail about how it should work.
>
> Sidenote:
> - Part of: :term[02: Company/Process]{href="./02_process.md"}
> - Happens after: :term[22: Company/Alignment]{href="./22_document_alignment.md"}
>

## 1. The Core Philosophy

The Specification is the **destination** we're working toward. Think of it as a beautiful, detailed painting that an artist spends weeks or months creating and perfecting. It's not something written in an afternoon; it’s the result of deep thinking and many rounds of improvements.

It is **Evergreen**, meaning it's always fresh and up-to-date, like a tree that never loses its leaves. It is the one and only **Source of Truth for the System** (the code, the design, everything). When building something complicated, we can't rely on what people remember from meetings or quick chats. We need one official rulebook.

**The Vision:** Our goal is to make this document so clear and complete that one day, we can just give it to a computer, and the computer can build the project for us.

## 2. The Need

Why do we spend so much time on this document?

- **To Be Clear:** It follows our company's rules for being truthful, as explained in :term[00: Company/Truth]{href="./50_prompt_truth.md"}. It has to be perfectly clear, with no room for confusion.
- **To Be Right, Not Fast:** Getting this document right is more important than finishing it quickly. It's better to leave a part blank and say "we're still figuring this out" than to write down the wrong information.
- **To Be a Map:** The Specification shows everyone on the team _where we are going_. It's like a map for a big adventure, so nobody gets lost and everyone knows the final destination.
- **To Handle Big Ideas:** For huge, complex projects, it's impossible for one person to remember every single detail. This document acts as the project's permanent memory, so we can keep building on it without forgetting anything important.

## 3. The Rules of Maintenance

1.  **Never Get Old:** If the code changes, the Specification must change too. In a perfect world, we update the Specification _before_ we write the code.
2.  **Grow by Reviewing:** The Specification is never really "finished"; it’s just "up-to-date." Every time we read it, we find areas we missed or could explain better. Fixing these helps the plan grow stronger and clearer.
3.  **It's The Law:** If the code does something different from what the Specification says, the Specification is correct. That means the code has a bug and needs to be fixed to match the master plan.

## 4. Characteristics

- **Timeframe:** Takes weeks to create the first version, then it's updated forever.
- **Rounds:** It gets revised and improved many, many times.
- **Role:** It's the main, most important document that the whole project relies on.
- **Nature:** It's evergreen, always kept current.
- **Source of Truth:** It's the final word **for the entire system**.