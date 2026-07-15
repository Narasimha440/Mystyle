/**
 * MOCK API LAYER
 * ---------------------------------------------------------------
 * This is the ONLY place that knows about the backend contract.
 *
 * Real backend (FastAPI) contract:
 *
 *   POST /generate
 *   Request  body: { prompt: string }
 *   Response body: { base: string, lora: string }
 *
 * To connect the real backend later, delete the mock body below
 * and uncomment the fetch() implementation. Nothing else in the
 * app needs to change — every component only calls generate(prompt).
 * ---------------------------------------------------------------
 */

const MOCK_DELAY_MS = 2000
const API_ENDPOINT = 'https://hurricane-perform-katrina-counted.trycloudflare.com/generate'

function buildMockBaseResponse(prompt) {
  return `## Overview

Here is a direct, neutral explanation of **"${prompt}"**.

The base model produces a straightforward, encyclopedic answer. It prioritizes factual coverage over a distinct voice.

1. It defines the core concept clearly.
2. It lists the main components or ideas.
3. It closes with a short, generic summary.

- Neutral tone
- Balanced structure
- No strong stylistic identity

\`\`\`text
base_model.generate(prompt)
# deterministic, low-temperature style
\`\`\`

This is the response before any style adaptation is applied.`
}

function buildMockLoraResponse(prompt) {
  return `## Here's the thing about "${prompt}"

Okay, let's actually get into it — because the base answer technically works, but it reads like a manual. This version keeps every fact, just said the way **you'd** say it.

1. **Start with the "why"** — context makes the definition stick.
2. **Use concrete language** instead of textbook phrasing.
3. **End with a takeaway**, not a summary sentence.

- Distinct voice, same meaning
- Shorter, punchier sentences
- Rhetorical framing ("here's the thing," "let's get into it")

\`\`\`text
base_model.generate(prompt) → lora_adapter.restyle(output)
# same facts, adapted voice
\`\`\`

That's the LoRA adapter doing its job: **same substance, new style.**`
}

/**
 * generate(prompt) -> Promise<{ base: string, lora: string }>
 *
 * Mirrors the exact shape the real POST /generate endpoint will return.
 */
export async function generate(prompt) {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const data = await response.json()
  return { base: data.base, lora: data.lora }
}
