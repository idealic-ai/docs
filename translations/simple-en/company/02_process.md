# 02: Company/Process

> [!DEFINITION] Standard Process
> This is our team's instruction manual. It explains how we turn big ideas into real, working things by sharing the work, constantly improving our plans, and talking to each other often.

> Sidenote:
> - Goes together with: :term[00: Company/Truth]{href="./00_truth.md"}

We’re at a point where we need to move from just exploring ideas to actually building things. To do that successfully, we need a clear, organized process to follow.

For a small team with a huge goal, we can't afford to just figure things out as we go. This set of rules isn't meant to hold us back; it’s the only way we can all stay on the same page, develop complex ideas, and make sure they get built correctly. We commit to this process because it's the only way we can make our vision a reality.

## 1. The Living Specification

> [!DEFINITION] Specification document
> This is our master plan. It's a single, always-updated document that explains our big idea, how it's built, and how it all works. It is the one place everyone goes to for the truth.

The most important thing we do is create and take care of this master plan. It’s more than just notes; it's the blueprint for our goals. This document gives everyone on the team—and the AI we work with—the big picture and keeps us all moving in the same direction. It's made to be updated all the time, becoming clearer and more detailed as we learn more about what we're building.

- **Following the Rules of Truth:** We have a strict set of rules, found in :term[00: Company/Truth]{href="./00_truth.md"}, that make sure every plan is clear, complete, and can't be misunderstood. This is essential for making our documents truly "living" and useful.
- **Getting It Right is More Important Than Being Fast:** Unlike a quick note, the master plan has to be 100% correct. It's better to leave a part of the plan blank than to write down the wrong information. Everything we build rests on this foundation.
- **Growing Through Teamwork:** The plan is never truly "finished," it's just "up-to-date." When we review it together, we often find gaps or things we missed. Filling in those gaps makes the document grow, not to make it complicated, but to make it crystal clear so we know exactly what to build.
- **The Map to Our Goal:** This document shows everyone where we're headed. It lets any team member understand the final goal without having to remember every single step. It's the map we all agree to use.

## 2. The Evolution Document

> [!DEFINITION] Evolution document
> This is a quick, temporary document we use to agree on a specific change. It helps us fix misunderstandings and decide on a plan before we update the master plan.

Because the master plan is so important, we can't just change it whenever we want. The Evolution Document is how we discuss and agree on any changes. Think of it like a quick meeting memo. We use it to make sure we all understand a problem the same way and agree on exactly how we'll fix it. It closes the gap between what we want to do and what the AI will actually build.

- **Following the Rules of Truth:** Just like the master plan, this document has to follow our rules for clarity (:term[00: Company/Truth]{href="./00_truth.md"}). We have to be very direct—stating clearly what's wrong and what we're going to do about it. If we're vague, the AI might get confused and do the wrong thing.
- **Move Fast:** These documents need to be written quickly, usually on the same day we realize we need one. They’re not meant to be perfect works of art; they're designed for quick decisions so we can keep moving.
- **Learning from Mistakes:** An Evolution Document is like a course correction. It clearly says: "We used to think X, but we learned Y, so now we're going to do Z." It turns our misunderstandings into a solid plan of action.
- **Instructions for the AI:** This document is basically the instruction manual we give to the AI. It explains the exact changes we want, why we want them, and any rules it needs to follow. This makes sure the AI is working on the right problem with the right information.
- **A Place for Brainstorming:** This is where we can suggest a few different ways to solve a problem. It lets the team pick the best path before anyone starts building, which saves a lot of time and effort.

## 3. The Cycle of Consensus

> [!DEFINITION] Pull Request
> A Pull Request (or "PR") is how we get a final "yes" on any piece of work. Whether it's a plan, a document, or code, a PR is our official way of checking our work, making sure we all agree on it, and getting final approval.

A Pull Request (PR) isn't just for code; it's how we make sure we're all on the same page. It applies to everything we produce, from big ideas to tiny details. We use PRs to get everyone to sign off on the *idea* before the work begins. It’s the tool that turns one person's suggestion into the entire team's official plan.

- **For More Than Just Code:** This approval process is for all our work. We use it to agree on definitions, plans, and big decisions. It’s how "my idea" officially becomes "our plan."
- **Discussions are Important:** We have all our discussions in the comments section on GitHub. The author of the PR must read and respond to every comment. This conversation is a valuable record of how and why we made our decisions.
- **Explain Your Thinking:** Saying "Okay" isn't enough. The author needs to explain their thought process, like, "Oh, now I understand what you meant," or "I thought we were talking about something else." This helps our AI understand *why* a change was made, not just *what* was changed.
- **Details Matter More Than Being Quick:** The goal of a reply is to be so clear that anyone (even an AI) can read the conversation later and understand exactly what we decided and why. If it's not written down, that knowledge is lost.
- **Turn Talk into a Plan:** Once the discussion is over and we all agree, we use the Evolution Document process to summarize all the comments into one clear plan. This makes sure all the smart ideas from the review are saved and used.
- **The First Draft Is Just the Beginning:** The AI might create a first draft of that plan. If it gets something wrong or misses a detail, we don't throw it away; we fix it. We improve the draft through more conversation or by editing it directly until it perfectly matches what we all agreed on.
- **No Surprises:** By agreeing on the plan (the Evolution Document) *before* we start working, there are no surprises later. Everyone knows what's being built because we all approved it.
- **We're All in This Together:** When a team member approves a PR, they accept shared responsibility for how it turns out. The author isn't on their own anymore; they're carrying out a plan the whole team agreed on.

Example of a prompt for an agent to draft an evolution doc from comments:

```
Instruction: https://idealic.academy/en/company/51_prompt_evolution_draft.md/
PR: https://github.com/idealic-ai/platform/pull/65

Analyze PR comments using instructions since 3 days ago
```

## 4. The Ritual of Synchronization

> [!DEFINITION] 1-on-1 Calls
> These are quick, regular meetings between two people to get unstuck, ask questions, and make sure we're all working well together.

We talk every day to make sure no one gets off track while working alone. These calls aren't for listing what you did (we can read that later). They are active sessions for solving problems and getting on the same page.

- **Quick Daily Check-ins:** A short, focused 10-minute meeting every day with a leader to make sure we're all still headed in the right direction.
- **Come Prepared:** You must have your topics ready before the meeting starts. This ensures we use the time to solve real problems and make decisions, not waste it.
- **A Process We Can Trust:** These regular check-ins remove the stress of not knowing what's going on. The leader can confirm the work is on track, and the team member can confirm they have what they need. It builds the trust that lets us work freely without being micromanaged.

## 5. The Role of the Machine

> [!DEFINITION] AI Augmentation
> This is how we use AI to help us. It takes our ideas, makes them more organized, and then helps build the final product based on our plan.

We use AI to help us stick to our plan, not to do our thinking for us. The AI is a powerful tool, and our Evolution Document is the instruction manual that tells it what to do.

- **Talk Out Your Ideas:** Often, the best way to start is to just speak your raw thoughts out loud. Then, we can use an AI to structure those ideas into a well-organized Evolution Document.
- **Give the AI Clear Instructions:** The Evolution Document is the main set of instructions we give to the AI. If the document is clear, the AI can generate code, create tests, and update our master plan with very high accuracy.
- **Check the AI's Work:** We always judge the AI's output by comparing it to our plan. If the AI gets it wrong, it usually means our instructions weren't clear enough. It's a failure of our plan, not the machine.

## 6. The Human Growth

> [!DEFINITION] Professional Evolution
> This is about how working this way helps us learn important new skills for the age of AI. By following this process of creating clear documents, we become better collaborators.

Working with detailed documents and a strict process isn't just boring paperwork; it's training for the future. This workflow teaches us to think like architects of AI, learning how to give clear directions to both people and intelligent machines.

- **Working With AI:** By learning to structure our thoughts so a machine can understand them, we're basically learning the language of the future. We're moving from being people who just "use" AI to people who can "direct" AI.
- **Skills You Can Use Anywhere:** The ability to turn a big, fuzzy idea into a clear, detailed plan is the most valuable skill in the AI world. This job provides exactly that kind of experience, which is great for our future careers.
- **Becoming Better Thinkers:** This process forces us to be precise, clear, and to think about our audience (whether human or machine). It helps us grow into sharper thinkers and better teammates.

## Summary

It might feel like these rules limit our freedom, but they actually give us real progress. By being disciplined about *how* we decide things, we free ourselves up to achieve amazing *whats*. We write to get on the same page, we get on the same page to build trust, and we build trust to get things done.
npm
