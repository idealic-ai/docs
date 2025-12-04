# 850: Package/Game Service

> [!DEFINITION] [Game Service](./000_glossary.md)
> A standalone, transport-agnostic backend service designed to manage the lifecycle of turn-based games. It acts as the authoritative server for game state, processing player actions, advancing logic via pluggable engines, and persisting results.

> Sidenote:
>
> - Powered by:
>   - :term[851: Package/Poker Engine]{href="./851_package_poker_engine.md"}
> - Compatible with:
>   - :term[852: Package/Poker UI]{href="./852_package_poker_ui.md"}

The **Game Service** (`@idealic/game-service`) is a modular Node.js backend designed to validate and host turn-based games. While its initial focus is poker, its architecture is generic, serving as a secure sandbox for developing and testing game logic in isolation from a client's proprietary platform.

## Core Architecture

The service is built on a **Stateless API** model. It interacts with the world through a single endpoint that receives a client's version of the game state. The server merges this with its authoritative state, validates and processes actions, and returns the update.

### Pluggable Game Engines

The service is strictly separated from game logic. It acts as a host container for **Pluggable Engines**.

- **Registry Pattern:** The service uses a registry to load different game engines.
- **Consistent Interface:** Engines must expose a standard interface (`State.advance()`, `State.join()`, etc.).
- **Separation of Concerns:**
  - **Game Engine (e.g., Poker):** Handles rules, validation, and state transitions.
  - **Game Service (This Package):** Handles "meta-game" logic like networking, persistence, session management, and timeouts.

### The "State" as Source of Truth

The service relies on the **State Object** concept from the underlying engine. This is not just a snapshot, but a complete, serializable notation of history (like chess notation).

- **Stateless Communication:** Clients and servers exchange the full State object.
- **Determinism:** The state includes a random seed, allowing perfect reconstruction of the game history for validation and dispute resolution.
- **Player Perspective:** The state supports "masking," where the server generates a personalized view for each player (hiding opponents' hole cards) before broadcasting.

## I/O Abstraction Layer

The service is transport-agnostic. All external interactions are abstracted into a dedicated I/O layer (`service.io.ts`), allowing the service to be integrated into any environment (Express, WebSockets, Serverless) by replacing stubs.

- **State Persistence:** `saveGame` and `loadGame` handle the storage of the authoritative state.
- **Session Management:** `fetchPlayerStacks` and `savePlayerStacks` integrate with external wallet systems.
- **Real-time Communication:** `broadcastToPlayers` handles pushing state updates to clients (e.g., via WebSockets).
- **Background Processes:** `fetchTimedOutGames` allows the service to be polled to enforce player time limits.

## Table Service Concept

The service implements a **Table Service** model where tables are not static database entities but are defined by **Active Game States**.

- **Dynamic Allocation:** Tables are created on-demand. If a player looks for a game (e.g., "Texas Hold'em, $1/$2") and no table has open seats, a new Game State is created.
- **Lifecycle:**
  1.  **Find:** Client requests a table with specific parameters. The system finds an existing game or creates a new one.
  2.  **Observe:** The player receives the Game State to observe the action.
  3.  **Join:** The player sends a `join` action to take a seat.
  4.  **Play:** The game cycle proceeds.
  5.  **Terminate:** Players are removed for timeouts or bankruptcy (insufficient funds for the next hand).

## How It Works

The operational loop of the service is:

1.  **Trigger:** An external event (player action) hits the service.
2.  **Load:** The authoritative state is loaded from persistence.
3.  **Merge:** The incoming client state is merged with the server state.
4.  **Advance:** The service calls `advance()`, which loops the game engine's logic until it requires player input.
5.  **Complete:** If a round ends, the service finalizes the hand, distributes pots, and starts the next round.
6.  **Persist & Broadcast:** The updated state is saved and sent to all players.
