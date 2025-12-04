# 851: Package/Poker Engine

> [!DEFINITION] [Poker Engine](./000_glossary.md)
> A rigorous, game-agnostic architecture implementing the specific rules of Poker (Texas Hold'em, etc.). It serves as the logic kernel for the ecosystem, utilizing a protocol-based design (`State`, `Game`, `Command`) to decouple complex poker mechanics from the runtime environment.

> Sidenote:
>
> - Integrated by:
>   - :term[850: Package/Game Service]{href="./850_package_game_service.md"}
> - Visualized by:
>   - :term[852: Package/Poker UI]{href="./852_package_poker_ui.md"}

The **Poker Engine** (`@idealic/poker-engine`) is a toolkit for poker game management. It creates an abstract entity composed of specialized utilities that enable the creation, progression, and completion of games. While focused on poker, its architectural patterns are applicable to any turn-based game.

## Reliability

The engine is developed using a rigorous **spec-driven approach**, ensuring that every rule and mechanic is formally defined. It is backed by approximately **3000 tests**, covering a vast array of scenarios—from standard play to complex edge cases like multi-way side pots and split pots—guaranteeing rock-solid stability and correctness.

Additionally:

- **Fuzzy Testing:** The full game lifecycle is continuously validated via fuzzy testing at the Game Service integration level, simulating chaotic real-world conditions.
- **Proven Heritage:** The engine's logic is derived from a system compatible with the **PokerStars hand format**, which has been stress-tested against a dataset of over **10 million historical games**.

## Design Principles

The engine is built on six core invariants:

1.  **Immutability:** All state changes create new objects (Deep Copy), ensuring history is preserved.
2.  **Determinism:** Seeded RNG ensures games can be replayed exactly.
3.  **Validation-First:** Actions are validated before application to prevent corrupt states.
4.  **Separation of Concerns:** Clear boundaries between Data (`State`), Runtime (`Game`), and Logic (`Processors`).
5.  **Action-Based:** An event-sourced system where all changes flow through standardized action strings.
6.  **Protocol-Based:** Universal namespaces create a consistent API layer.

## Namespace Abstraction Pattern

The engine implements a protocol-based design through four core namespaces that act as universal wrappers.

### 1. State Namespace (The Functional Core)

**`Poker.State`** (formerly `Hand`) is the generic game notation protocol.

- **Universal Notation:** Represents ANY turn-based game state (Poker, Chess, etc.) as a sequence of actions.
- **Source of Truth:** Contains the complete history required to reconstruct the game.
- **Functional Core:** Pure, immutable data structure modified only through pure reducer functions.
- **Perspectives:** Supports `personalize()` to generate masked views for specific players (hiding hole cards).

### 2. Game Namespace (The Runtime)

**`Poker.Game`** is the runtime state protocol (The Imperative Shell).

- **Live State:** Transforms the static `State` notation into a mutable, queryable runtime object.
- **Rule Enforcement:** Handles all game rules, validation (`canApplyAction`), and progression.
- **Swiss-Army Knife:** Provides utilities for time management, player indexing, and state analysis.
- **Progression:** The `applyAction(game, action)` method is the primary engine driver, mutating the game state based on the input.

### 3. Command Namespace (The Interface)

**`Poker.Command`** is the action generation protocol.

- **Translation Layer:** Converts high-level user intents (UI clicks) into standardized Action strings.
- **State-Aware:** Reads the current `Game` to generate valid actions (e.g., calculating the correct amount for an `allIn` command).
- **Separation:** Decouples UI interactions from core engine processing.

### 4. Format Namespace (The Serializer)

**`Poker.Format`** provides specialized utilities for data handling.

- **Serialization/Deserialization:** Efficiently encoding and decoding game states and actions for network transmission or storage.
- **Hand History Parsing:** Converting raw hand history text into structured `State` objects, compatible with major formats like PokerStars.

## Statistics & Analytics

The engine includes a dedicated **`Poker.Stats`** namespace for deep analytics.

- **Philosophy:** Distinguishes between **Stats** (raw counters tracked in real-time, e.g., `three_bet_attempts`) and **Metrics** (derived calculations, e.g., `three_bet_frequency`).
- **Positional Tracking:** Tracks maneuvers with explicit positional context (IP/OOP), such as `cbet_ip_attempts` vs `cbet_oop_attempts`.
- **Aggregation:** Supports aggregating data by player, street, or venue for reporting.

## System Architecture

### Client-Server Responsibilities

The Poker Engine runs on both the client and the server.

- **Client-Side:** Handles optimistic rendering and enables user actions based on the local state.
- **Server-Side:** Acts as the ultimate authority for action validation, game sanitization, and randomness.

### Integration

- **Backend:** **[@idealic/game-service](../game-service/README.md)** — Handles session management, persistence, and networking.
- **Frontend:** **[@idealic/poker-ui](../poker-ui/README.md)** — Renders the `Game` state.

## Game Lifecycle

The Poker Engine operates as a request-response pipeline.

1.  **Joining and Initialization:** Players request to join; system finds/creates table; waits for 2+ active players.
2.  **Game Creation:** Authoritative `State` created with secure seed; initial deal occurs; state persisted and broadcast.
3.  **Player Action Loop:** Client sends action -> Engine processes -> New state stored/sanitized/broadcast.
4.  **Completion and Succession:** Hand finishes; engine moves button, handles blinds, prepares next hand.
5.  **Player Lifecycle Management:** Quit/Pause/Resume requests are queued for the next game.
6.  **Waiting State:** Pauses if active players < 2.
7.  **Timeout Handling:** Periodical checks apply default actions to keep the game moving.

## Core Capabilities

- **State Management:** Deterministic dealing, complex betting state tracking, and side-pot management.
- **Rule Enforcement:** Strict validation of betting rules, street progression, and showdown logic.
- **Player Management:** Tracks positions (Button, SB, BB), stacks, and action history.
- **Game Flow:**
  - **Croupier:** Coordinates the flow between dealer and player actions.
  - **Dealer:** Autonomous agent that handles automatic progression (dealing cards, moving streets).
  - **Showdown:** Fast, lookup-table-based hand strength evaluation (`utils/hand-strength.ts`) for winner determination.

## Action Format

The engine uses a standardized string format for all events:

- **Player:** `'p1 f'` (Fold), `'p2 cc 20'` (Call 20), `'p3 cbr 100'` (Raise to 100).
- **Dealer:** `'d dh p1 AsKs'` (Deal Hole), `'d db AhKhQh'` (Deal Board).
- **Meta:** `'p4 m Hello!'` (Message).

This human-readable format serves as both the API transport and the audit log.
