# Tic-Tac-Toe Web Application

A clean, modern, and fully interactive Tic-Tac-Toe web application built using vanilla frontend web technologies. This project features both local two-player gameplay and an advanced single-player mode powered by an unbeatable AI opponent.

This application fulfills the design and technical criteria specified in **image_563de2.jpg**.

---

## 🚀 Features

*   **Dual Game Modes:**
    *   **2 Players (PvP):** Play locally with a friend on the same screen, passing turns cleanly.
    *   **Vs AI:** Challenge an intelligent system that thinks and responds to your moves.
*   **Unbeatable AI Engine:** Built using the **Minimax Algorithm**, creating a tactical opponent that analyzes all future paths to ensure it never loses.
*   **Persistent Scoreboard:** Tracks wins for Player X, Player O / AI, and total Draws across rounds. 
*   **Interactive Control Board:** 
    *   `New Game` button clears the grid for a new match while preserving the scoreboard.
    *   `Reset Score` button resets the competitive history back to zero.
*   **Responsive & Polished UI:** 
    *   Built with a sleek, centered container card and an elegant dark gradient backdrop.
    *   Features visual distinctiveness for pieces (`X` styled in blue, `O` styled in orange).
    *   Includes custom CSS keyframe animations (`pop`) to highlight winning tiles vividly when a match concludes.

---

## 🛠️ Tech Stack

*   **Structure:** HTML5
*   **Styling:** CSS3 (Flexbox, CSS Grid, Custom Keyframes)
*   **Logic Engine:** Vanilla JavaScript (ES6+)

---

## 📂 Project Structure

```text
├── index.html      # Application structure and markup
├── style.css       # Core layout styling and custom animations
├── script.js       # Game state management and Minimax AI engine
└── README.md       # Project documentation

---