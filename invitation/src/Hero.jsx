import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowClockwise } from "@phosphor-icons/react";
import { Curtain } from "./Curtain.jsx";
const clamp = (value) => Math.max(0, Math.min(1, value));
const ease = (value) =>
  value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;

export function Hero({ replay, onReplay }) {
  const [time, setTime] = useState(0);
  const [ready, setReady] = useState(false);
  const skipRef = useRef(false);
  const reduced = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const done = time >= 8200;
  useEffect(() => {
    let active = true;
    const load = (src) =>
      new Promise((resolve) => {
        const image = new Image();
        image.onload = resolve;
        image.onerror = resolve;
        image.src = src;
      });
    // Failed/slow artwork never prevents access to the invitation.
    const timeout = setTimeout(() => {
      if (active) setReady(true);
    }, 4000);
    Promise.all(
      [
        "/assets/estate.webp",
        "/assets/curtain.webp",
        "/assets/open-curtain.webp",
        "/assets/gate-paper.webp",
        "/assets/seal.webp",
      ].map(load),
    ).then(() => {
      if (active) setReady(true);
    });
    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, []);
  useEffect(() => {
    skipRef.current = false;
    setTime(0);
  }, [replay]);
  useEffect(() => {
    if (!ready) return;
    if (reduced.current || skipRef.current) {
      setTime(8200);
      return;
    }
    setTime(0);
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const elapsed = skipRef.current ? 8200 : Math.min(8200, now - start);
      setTime(elapsed);
      if (elapsed < 8200) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [ready, replay]);
  useEffect(() => {
    if (done) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [done]);
  const gate = ease(clamp((time - 350) / 2850));
  const curtain = ease(clamp((time - 4300) / 2700));
  const names = clamp((time - 6100) / 950);
  const skip = () => {
    skipRef.current = true;
    setTime(8200);
  };
  return (
    <section
      className="hero"
      id="top"
      aria-label="Camille and Antoine wedding invitation"
      data-stage={done ? "open" : "opening"}
    >
      <img
        className="estate"
        src="/assets/estate.webp"
        alt="A rose-colored French château, a fountain and a garden of roses"
        fetchPriority="high"
      />
      <div className="hero-names" style={{ opacity: names }}>
        <h1>
          Camille<span className="ampersand">&</span>Antoine
        </h1>
        <p>June 12, 2027</p>
      </div>
      <Curtain progress={curtain} />
      {!done && (
        <div
          className="gate"
          aria-hidden="true"
          style={{ visibility: gate === 1 ? "hidden" : "visible" }}
        >
          <div
            className="gate-leaf gate-left"
            style={{ transform: `translateX(${-gate * 104}%)` }}
          />
          <div
            className="gate-leaf gate-right"
            style={{ transform: `translateX(${gate * 137}%)` }}
          >
            <div className="seal">
              <img src="/assets/seal.webp" alt="" />
              <span>
                C<span>&</span>A
              </span>
            </div>
          </div>
        </div>
      )}
      {!done ? (
        <button className="intro-control" onClick={skip}>
          Skip intro
        </button>
      ) : (
        <div className="hero-controls">
          <button
            className="icon-button replay-small"
            onClick={onReplay}
            aria-label="Replay opening"
          >
            <ArrowClockwise weight="thin" size={18} />
          </button>
          <a
            className="scroll-cue"
            href="#welcome"
            aria-label="Scroll to the invitation"
          >
            <ArrowDown weight="thin" size={20} />
          </a>
        </div>
      )}
    </section>
  );
}
