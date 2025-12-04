# 851: Package/Poker Engine

> [!DEFINITION] [Poker Engine](./000_glossary.md)
> A complete software toolkit that can run any turn-based game from start to finish. It's built like a set of building blocks with clear rules (`State`, `Game`, `Command`) so that the game's logic isn't tied to how the game's story is stored.

> Sidenote:
> - Used by:
>   - :term[850: Package/Game Service]{href="./850_package_game_service.md"}
> - Shown by:
>   - :term[852: Package/Poker UI]{href="./852_package_poker_ui.md"}

The **Poker Engine** (`@idealic/poker-engine`) is a toolbox for building and running poker games. It’s like a car engine, but for poker—it has all the specialized parts needed to make a game start, run, and finish. Even though it's designed for poker, its clever design could be used to run any game where players take turns, like chess or checkers.

## Reliability

The engine is incredibly reliable because we wrote down every single rule very carefully before building it. It's checked by about **3,000 tests** that cover all kinds of situations, from normal plays to very tricky and rare ones. This makes sure the engine is super stable and always does the right thing.

Also:

- **Chaos Testing:** We have a special test that acts like a crazy player, trying to do random things to break the game. This helps us ensure the engine can handle anything that might happen in the real world.
- **Proven Design:** The engine's core logic is based on a system used by the famous site **PokerStars**. That system was tested with over **10 million real games**, so we know our foundation is rock-solid.

## Design Principles

The engine follows six main rules to make sure it works perfectly:

1.  **It Never Forgets:** Every time something changes, the engine saves a new copy of the game's story instead of erasing the old one. This means you can always go back and see exactly what happened.
2.  **It's Predictable:** If you start a game with the same secret code, the exact same cards will be dealt every time. This is great for replaying a game to study it.
3.  **It Checks Before It Acts:** Before a player’s move is accepted, the engine checks to make sure it's a legal move. This stops the game from ever getting into a broken state.
4.  **Everything Has Its Own Job:** The game's information (the `State`), the rules (the `Game`), and the decision-making parts are all kept separate. This makes the whole system cleaner and easier to work on.
5.  **Everything is a Command:** Every single thing that happens in the game is recorded as a simple, clear text command. This creates a perfect transcript of the entire game.
6.  **Everyone Speaks the Same Language:** All the different parts of the engine use a shared set of names and commands, so they always understand each other perfectly.

## The Building Block Pattern

The engine is designed with four main building blocks that work together. Think of them like a team making a movie.

### 1. The State (The Script)

**`Poker.State`** is like the movie script. It’s a complete record of everything that has happened in the game, written down as a series of actions.

- **A Universal Script:** It can describe the history of *any* turn-based game, not just poker.
- **The Official Record:** It's the one true source of what happened in the game.
- **Just the Facts:** It's a pure data file. It doesn't *do* anything; it just holds the story.
- **Personalized Views:** It can create a special version of the script for each player that hides other players' secret cards.

### 2. The Game (The Director)

**`Poker.Game`** is like the film director. It takes the script (`State`) and brings it to life.

- **Running the Show:** It turns the static script into a live, active game that you can interact with.
- **The Rule Enforcer:** It applies all the rules, checks if moves are legal, and keeps the game moving forward.
- **A Handy Helper:** It manages things like timers, keeps track of who's who, and can answer questions about the current game situation.
- **Making Things Happen:** The `applyAction` command is how the director moves the story forward. You give it a command, and it updates the game.

### 3. The Command (The Assistant Director)

**`Poker.Command`** is like the assistant director who communicates with the actors.

- **The Translator:** When you click a button on the screen (like "Bet"), it translates your simple wish into an official command string that the director (`Game`) can understand.
- **Smart Suggestions:** It looks at the current game situation to figure out what commands are possible. For example, it calculates the right amount for you to bet if you want to go "all in."
- **Keeps Things Tidy:** It separates what the user sees and clicks from the deep-down engine logic.

### 4. The Format (The Post-Production Crew)

**`Poker.Format`** is like the crew that packages the movie for theaters or streaming.

- **Packaging and Unpacking:** It's really good at taking the game's data, packing it into a tiny file to send over the internet, and then unpacking it on the other side.
- **Reading History:** It can take a text file of an old poker game and turn it back into a structured `State` object, so you can study or replay it.

## Statistics & Analytics

The engine has a special part, **`Poker.Stats`**, just for tracking numbers and helping you get better.

- **The Idea:** It separates **Stats** (simple counts of what happened, like "you tried to bluff 3 times") from **Metrics** (smarter calculations, like "you bluff 15% of the time").
- **Knows Your Position:** It's smart enough to track your moves based on where you were sitting at the table, which is very important for poker strategy.
- **Big Picture Reports:** It can group all this data together to create reports about a single player, a single part of the game, or a whole tournament.

## How It's Built

### Your Screen vs. The Main Computer

The Poker Engine runs in two places at once.

- **On Your Device:** It runs on your computer or phone to make the game feel instant. It predicts what will happen next so you don't have to wait.
- **On the Server:** It also runs on a main computer that has the final say. This is the official referee that checks every move to make sure no one is cheating.

### How It Connects

- **Backend:** **[@idealic/game-service](../game-service/README.md)** — This is the main computer that manages game sessions, saves progress, and connects all the players.
- **Frontend:** **[@idealic/poker-ui](../poker-ui/README.md)** — This is what you see. It takes the information from the `Game` object and draws the table, cards, and buttons on your screen.

## A Game's Life Story

A game in the Poker Engine follows these steps:

1.  **Getting a Seat:** Players ask to join a game. The system finds a table for them and waits until at least two people are ready to play.
2.  **The Deal:** The main computer creates the official game story (`State`) with a secret random code, deals the first cards, saves the game, and tells everyone what happened.
3.  **Taking Turns:** A player sends a move -> The engine checks it -> The game story is updated, saved, and sent out to all players.
4.  **And The Winner Is...:** When the hand is over, the engine figures out who wins, moves the dealer button, and gets the next hand ready.
5.  **Taking a Break:** If a player wants to quit or pause, the engine waits until the current hand is over to let them go.
6.  **Waiting for Players:** If there's only one person left, the game pauses until someone else joins.
7.  **Handling Timeouts:** The engine has a timer. If a player takes too long, it will automatically make a move for them (like folding) to keep the game from getting stuck.

## What It Can Do

- **Manage the Game:** It can deal cards predictably, keep track of complicated betting situations, and correctly split the money when there are multiple winners.
- **Enforce the Rules:** It makes sure everyone follows the rules for betting, moving through the game rounds, and showing their cards at the end.
- **Manage Players:** It keeps track of everyone's position (like Dealer, Small Blind, Big Blind), how much money they have, and every move they've made.
- **Run the Show:**
  - A **Croupier** acts as the game coordinator.
  - A **Dealer** is like a robot that handles all the automatic stuff, like dealing cards.
  - The **Showdown** part is a super-fast system that instantly knows which poker hand is best to decide the winner.

## The Action Language

The engine uses a simple text format for every event:

- **Player Actions:** `'p1 f'` (Player 1 folds), `'p2 cc 20'` (Player 2 calls a 20-chip bet), `'p3 cbr 100'` (Player 3 raises the bet to 100).
- **Dealer Actions:** `'d dh p1 AsKs'` (Dealer deals hole cards Ace of Spades and King of Spades to Player 1), `'d db AhKhQh'` (Dealer deals the board cards: Ace, King, and Queen of Hearts).
- **Messages:** `'p4 m Hello!'` (Player 4 sends the message 'Hello!').

This simple, human-readable language is used for everything—it's how the different parts talk to each other and how the game's entire history is recorded.