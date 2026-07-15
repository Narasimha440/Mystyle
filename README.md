# MyStyle Writer

A premium, dark-mode AI SaaS frontend for comparing a **Base LLM** against a
**LoRA fine-tuned** version of the same model, side by side.

Frontend only — no backend included. Built to plug into a single, simple
FastAPI endpoint later with zero architectural changes.

## Stack

- React 18 + Vite
- Tailwind CSS
- Framer Motion
- Lucide React icons
- react-markdown

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

## How it works

1. Type a prompt in the box and click **Generate** (or `⌘ / Ctrl + Enter`).
2. The UI calls `generate(prompt)` from `src/api/mockApi.js`, which currently
   waits 2 seconds and returns mocked `{ base, lora }` text.
3. Two cards animate in (fade + scale + move up), then type out their
   Markdown content simultaneously with a blinking cursor.
4. Each card shows a character count, a response-time placeholder, and a
   copy-to-clipboard button.

## Connecting the real backend

Everything the app knows about the API lives in **one file**:
`src/api/mockApi.js`. The exported `generate(prompt)` function already
returns the exact shape the UI expects:

```json
{ "base": "...", "lora": "..." }
```

To go live:

1. Stand up a FastAPI service with a single route:

   ```
   POST /generate
   Body:     { "prompt": "..." }
   Response: { "base": "...", "lora": "..." }
   ```

2. In `src/api/mockApi.js`, delete the mock body of `generate()` and
   uncomment the `fetch()` implementation already included at the bottom of
   the file.

No other component needs to change — the UI was built around this single
request/response contract from the start. No polling, no streaming, no
WebSockets, no auth, no chat history.

## Project structure

```
src/
  api/
    mockApi.js          # single source of truth for the /generate contract
  components/
    Navbar.jsx
    Hero.jsx
    PromptBox.jsx
    GenerateButton.jsx
    ComparisonGrid.jsx
    ResponseCard.jsx
    TypingAnimation.jsx
    LoadingSkeleton.jsx
  pages/
    Home.jsx
  App.jsx
  main.jsx
  index.css
```
