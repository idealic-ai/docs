# How to Write "Acts"

This is a guide on how to write our special documents, called 'Acts'. Following these rules helps make sure all the Acts look and feel the same, so they're easy for everyone to read and understand.

- **Don't Make Links Bold**: When you link to another page, just make it a regular link. You don't need to make it bold. People can already tell it's a link they can click on.

- **Special Words**: We have a list of special words in our [Glossary](./000_glossary.md) (it's like a dictionary). When you use one of these words, you need to write it with a special code: `:term[The Word]`. This code automatically turns the word into a special link that shows its definition, so everyone knows exactly what you mean.

- **Linking to Other Acts**: If you want to link to a whole other 'Act', like the one about the 'Plan', you use a similar code: `:term[Plan]{href="./010_agent_plan.md"}`. This creates a direct link to that document.

- **When to Use the Special Code**: If you're linking to an entire document and you use its full name like `010: Agent/Plan`, you can just make it a normal link. But if you're just mentioning a key idea like `Plan`, you should use the special `:term` code.

- **Start with a Definition**: Every 'Act' must start with a special box that explains the main idea of that Act. It looks like this: `> [!DEFINITION]`.

- **End with a Bridge**: At the end of every 'Act', you need to write a short paragraph that smoothly introduces the next 'Act', connecting the ideas together like a story.

- **Use Sidenotes for Extra Info**: If you want to mention another 'Act' or an interesting idea that's related but not essential, put it in a `> Sidenote:`. This keeps the main story clean and lets curious readers explore more without getting sidetracked.

- **Plural Words are Okay**: When you mark a special word that is plural, like 'Activities', you can just write `:term[Activities]{canonical="Activity"}`. The system is smart enough to know you're talking about the singular word 'Activity'.

- **Write Like a Storyteller**: Instead of saying things like "This document explains..." or "In the next chapter...", try to make the writing flow smoothly from one idea to the next without pointing out the document structure.

- **Defining a Word in the Glossary**: To add a new word and its meaning to our special dictionary, you use this code: `:dfn[The Word]{canonical="..." href="..."}`.