# Camille & Antoine — mobile wedding invitation

A working, local mobile web recreation of the invitation **inside** the supplied phone video. The user's filming scene and device are excluded. At desktop sizes the page stays centered at 440px; at mobile sizes it fills the viewport.

## Run

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 4173 --strictPort
```

Open http://localhost:4173. The opening runs automatically once each load; use **Skip intro** to go directly to the invitation, or **Replay invitation** at the bottom (also a replay icon in the hero) to play it again.

## Implemented

- Textured olive sliding gates, C&A ornamental seal attached to the right gate.
- Real curtain artwork deformed on Canvas, blended to a refined open-curtain illustration; live name/date text fades in.
- Long scrolling invitation: welcome/swans, live countdown, formal invitation, ceremony and reception, black-tie dress code, story, timeline, brunch, gifts.
- Real map search links; downloadable `.ics` calendar files with explicit UTC times.
- Local fonts and optimized WebP imagery, reduced-motion support, keyboard focus, image-loading timeout and accessible skip control.
- No network service, sign-in, database or music required.

## Reference and deliberate approximations

Source: `/Users/soowa/Downloads/모바일청접장.mp4`.
The source is a filmed, moving screen. Original design assets and code were unavailable. Raster illustrations were newly generated with the built-in imagegen tool, using extracted frames as references; details are similar, not identical. Curtain motion is a web reconstruction, not extracted original animation.

Legible names retained: Camille Lefèvre and Antoine Marchand. The hero appears to say June 14, 2027, while the formal invitation says Saturday June 12, 2027. This preview consistently uses **Saturday June 12, 2027**. The actual couple/date/location must be replaced before use.

Welcome prose, story, schedule times/details, detailed venue wording, brunch and gifts wording are sample reconstructions where the filmed text could not be reliably read. Château de Brochon and the Beaune brunch map search are sample destinations, not verified bookings. Map links are working searches; they do not confirm an event or venue. The June dates use the explicit summer France offset +02:00 in calendar files.

No guest messages/RSVP backend is implemented: those appeared in project notes as future needs, but were outside this requested video recreation.

## Files

- `src/content.js`: event sample data / calendar locations and times.
- `src/App.jsx`: section content and interactions.
- `src/Hero.jsx`: loading, opening, skip/replay.
- `src/Curtain.jsx`: raster curtain deformation and final blend.
- `src/styles.css`: responsive layout and typography.
- `public/assets/*.webp`: app-ready artwork.
- `ASSETS.md`: image-generation prompts and provenance.
- `design-qa.md`: browser verification and fidelity limits.

## Verification

```sh
npm test
npm run build
```

Browser checks cover 320×640, 390×844, 667×375 and desktop; intro progression/replay/skip, scroll, calendar download, loaded images, overflow and console errors. Slow-asset regression is tested with a temporary local proxy; no test controls are shipped in the application.
