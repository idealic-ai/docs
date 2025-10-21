# How to Write the 'Acts' Papers

This guide explains the rules for writing the papers we call `Acts`. Following these rules helps make sure all the papers look the same and are easy for everyone to read and understand.

- **Don't Make Links Bold**: When you add a link to another page, just let it be a normal link. People can already tell it's clickable, so you don't need to make it bold.
- **Special Words**: We have a list of special words in our dictionary, called the [Glossary](./000_glossary.md). When you use one of these words, you have to mark it like this: `:term[The Special Word]{canonical="The Special Word"}`. The computer will automatically turn it into a cool link that shows the word's meaning.
- **Links to Other Chapters**: If you want to link to a whole other chapter, you use a similar code like `:term[Plan]{href="./010_agent_plan.md"}`. This tells the computer exactly which paper to open.
- Don’t use the special `:term` tag if the link's text is a full chapter title, like `010: Agent/Plan`. But if you're just linking a single word like `Plan`, then you should use it.
- **Definition Box**: Every `Act` paper must start with a special box that looks like this: `> [!DEFINITION]`. Inside this box, you put the main definition of the topic you're about to explain. It's like the key idea at the top of a textbook chapter.
- **Ending Section**: At the end of each `Act`, you need to write a short section that smoothly leads into the next `Act`. It's like saying, "Now that we've learned about this, let's see how it connects to the next big idea."
- **Side Notes**: If you want to mention another `Act` or idea that's related but not part of the main explanation, put it in a side note that starts with `> Sidenote:`. This keeps the main text from getting messy and gives extra info to those who are curious.
- When you mark a special word that is plural, like 'Activities', you can still link it to the singular word 'Activity' in the dictionary, like this: `:term[Activities]{canonical="Activity"}`. The system is smart enough to figure it out.
- Try to make the writing flow like a story. Instead of saying things like "this document explains..." or "the next document will show...", just continue the explanation naturally.