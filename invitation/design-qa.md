# Mobile invitation visual QA

final result: passed

Scope: working local reconstruction from a filmed phone-screen reference, with newly generated artwork as authorized by the user. This is not a claim of pixel-identical source artwork or original animation technology.

## Visual truth and evidence

- Source frame: `/Users/soowa/house/outputs/invitation-analysis/frame-008.0.jpg`, 675×1200.
- Phone content rectified with FFmpeg perspective using measured corner coordinates, then resized to 390×844: `../outputs/invitation-analysis/qa/reference-hero.png`.
- Final actual browser hero capture: `../outputs/invitation-analysis/qa/hero-final.png`, 390×844 pixels, viewport 390×844 CSS px; screenshot density 1:1.
- Side-by-side full hero comparison: `../outputs/invitation-analysis/qa/hero-comparison.png`, 780×844. Left reference, right implementation.
- Full body capture: `../outputs/invitation-analysis/qa/full-mobile-final.png`.
- Timeline focus: `../outputs/invitation-analysis/qa/timeline-final.png`.
- Desktop screenshot: `../outputs/invitation-analysis/qa/desktop-final.png`, viewport 1280×720, page width 440 CSS px.
- Opening capture: `../outputs/invitation-analysis/qa/opening-gates.png`.
- Source phone crops for body comparisons: `../outputs/invitation-analysis/phone-details.jpg` and individual reference frames 12/16/18/20/22/26 seconds.

The phone recording has reflections, perspective, compression and partial finger occlusion; the manual rectification is an approximate alignment. Source color is affected by photography and should not be treated as exact original CSS color.

## Required fidelity surfaces

- Typography: local Cormorant Garamond regular/italic, matching the fine serif hierarchy. Hero has stacked names and smaller spaced date. The original font is not identifiable with certainty; approximate family is an expected constraint.
- Spacing: matched hero title to approximately 24.5% height, curtain to 56%, estate bottom artwork to 86% image height. Native long scroll follows the source's section order. Frames and prose remain readable at 320px.
- Color: blush paper, muted olive paper gates, dusty rose/champagne/sage ornaments. Generated art is slightly warmer and more detailed than the photographed source; expected reconstruction difference.
- Imagery: generated raster estate, curtains, seal, floral frames, swans, dress figures, garland and timeline vignettes. Real transparency preserved; no hand-drawn CSS/SVG substitutes for illustrated objects. The moving curtain uses raster deformation and a crossfade into a matching open asset.
- Copy: legible names preserved. Date inconsistency resolved to Saturday 12 June 2027. Unreadable prose and some venue/schedule details are sample content documented in README; not presented as verified real event information.

## Comparison and repair history

1. Hero v1 used a warped closed curtain as the final image. Its pleats looked excessively stretched. Added a matching illustrated open-curtain asset and blended the final movement. Inspected the revised 390px browser screenshot.
2. Hero v1 title sat too low (32%); perspective-normalized comparison showed source title around 24–25%. Moved title to 24.5%, shortened curtain and enlarged estate image vertically. Compared `hero-comparison.png` after correction.
3. Review found Skip could be undone when asynchronous preloading finished. Reset the skip flag only for an explicit replay. A temporary localhost proxy delayed assets 2.5 seconds: after Skip, estate initially unloaded with stage=open and scroll unlocked; after loading, stage remained open and scrolling remained unlocked.
4. Reproduced offscreen Skip in a 667×375 viewport: button top 582px/bottom622px. Changed it to viewport-fixed placement. Retest top317px/bottom357px, click worked, stage=open and scroll unlocked.
5. Replaced generic schedule icons with matching generated illustrated vignettes. Inspected timeline crop after integration.

## Functional checks

- Intro replay enters `opening`; natural sequence completes to `open`, name opacity 1, body scrolling restored.
- Skip completes immediately; subsequent image load does not replay.
- Scroll arrow moves to the welcome section; full page scroll reaches gifts and replay footer.
- 320×640: document scrollWidth=320, no horizontally overflowing elements in final open state.
- 390×844: document scrollWidth=390; all 13 visible/lazy image instances loaded after scrolling; no missing images.
- 667×375: Skip visible and operable.
- 1280×720: centered 440px page, no horizontal overflow.
- Reduced-motion JavaScript branch tested using an isolated temporary local HTML proxy with a matchMedia override; returned stage=open, name opacity1, scroll unlocked without waiting for animation. OS-level Safari/Android setting not exercised.
- Calendar button actually downloaded `/Users/soowa/Downloads/camille-antoine-wedding.ics`; inspected UTC start/end, escaping and line folding.
- Map anchors have valid Google Maps query URLs and open in a new tab. Physical venues/bookings not validated.
- Browser console error/warning query returned an empty list after final changes.
- `npm test`: 8 passed, 0 failed.
- `npm run build`: successful Vite build and packaging; no missing asset warning in final build.

## Remaining limits / follow-up polish

- Artwork details, precise curtain deformation and some prose differ from the source because originals were unavailable. These are expected constraints of this approved reconstruction.
- Tested in the Codex browser at responsive viewports, not on physical iPhone/Android devices. Real mobile Safari and KakaoTalk in-app browser testing remains useful before public use.
- No RSVP, guest comments, music, real couple information or public deployment in this preview.
- No actionable P0/P1/P2 issues remain in the local preview scope.
