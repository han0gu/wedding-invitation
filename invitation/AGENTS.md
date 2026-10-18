# Prototype Instructions

Production target: Vercel Hobby at https://invitation.soowa.site, with Gabia DNS retained. Git-tracked materials are approved for public disclosure by the owner.

Prioritize Android/iPhone KakaoTalk in-app browser compatibility. During agent verification, do not send KakaoTalk messages. Use Kakao Developers' URL metadata tool for OG checks; real-device Android/iPhone and message-send tests remain follow-up work until explicitly requested.

Keep sharing metadata in index.html and its replaceable image at public/og-image.jpg. Placeholder sharing text and imagery are intentional until the owner replaces them.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
