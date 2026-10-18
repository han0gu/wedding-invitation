# Reference mobile wedding invitation

Recreate the invitation inside the supplied 26.3-second phone video as a responsive mobile WEB page, served locally. User confirmed no source assets; generated illustrations will approximate the reference's detailed artwork. This is an implementation request with the default scope accepted in chat.

## Experience
- Portrait paper invitation, no simulated device or filming scene. On desktop center a narrow 440px page; on mobile occupy the viewport width.
- Opening: olive textured double gate, C&A seal attached to right leaf; gates slide aside over about 3 seconds. Pause then blush pleated curtains draw into tied-back curves, names fade in during opening around second 6.25, completion around second 8.
- Scroll: welcome + swans, countdown, names, ceremony/reception floral panel, dress code, story, timeline, recovery brunch, gifts. Maintain pale blush, olive, muted rose, antique engraved illustration style.
- Genuine text. Readable source text retained; unreadable wording uses sample copy documented in README. No invented real contact details or payment accounts.
- Maps links and calendar downloads work. Replay and skip opening available. Countdown uses future sample June 12 2027 wedding date (hero source reads June 14 but ceremony reads June 12; choose coherent Saturday June 12 and document conflict).
- No music, authentication, backend, RSVP or public comment system in this preview. The user's existing notes mention future guest comments, but the requested scope is visual recreation, so that system remains future work.

## Implementation
Vite React web template; generated raster imagery; canvas draws/warps real curtain image rows into tied-back shape; CSS gate transforms; local font assets. No external image dependencies. Main source split into data/utilities, curtain, invitation, styles. Reduced-motion and image-load failure must leave readable content. Mobile natural scrolling, touch targets, focus visibility.

## Validation
Tests for calendar/date/countdown behavior; production build; browser inspection at mobile and desktop widths, opening completion and replay/skip, scrolling, image loading, map targets and calendar download; compare normalized reference and screenshots. Leave localhost server running. Do not publish or push.
