import { useEffect, useState } from "react";
import { MapPin, CalendarBlank, ArrowClockwise } from "@phosphor-icons/react";
import { Hero } from "./Hero.jsx";
import { countdown, calendarEvent } from "./lib/invitation.mjs";
import { wedding, brunch } from "./content.js";

function Art({ name, className = "", alt = "" }) {
  return (
    <img
      src={`/assets/${name}.webp`}
      className={className}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
}
function Garland() {
  return <Art name="garland" className="garland" />;
}
function Countdown() {
  const [remaining, setRemaining] = useState(() => countdown(wedding.start));
  useEffect(() => {
    const timer = setInterval(
      () => setRemaining(countdown(wedding.start)),
      1000,
    );
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="countdown-section" aria-labelledby="countdown-title">
      <h2 id="countdown-title">Countdown</h2>
      <div
        className="countdown"
        aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes until our wedding`}
      >
        {Object.entries(remaining).map(([label, value]) => (
          <div className="countdown-unit" key={label}>
            <div className="number-seal">
              <Art name="seal" />
              <span>{String(value).padStart(2, "0")}</span>
            </div>
            <span className="small-caps">{label}</span>
          </div>
        ))}
      </div>
      <Garland />
    </section>
  );
}
function EventLinks({ event }) {
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([calendarEvent(event)], { type: "text/calendar;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `${event.id}.ics`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <div className="event-links">
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
        target="_blank"
        rel="noreferrer"
      >
        <MapPin size={15} weight="thin" />
        Open in maps
      </a>
      <button onClick={download}>
        <CalendarBlank size={15} weight="thin" />
        Add to calendar
      </button>
    </div>
  );
}
const schedule = [
  {
    time: "3:00 PM",
    label: "The ceremony",
    detail: "A promise, forever.",
    artCenter: 252,
  },
  {
    time: "4:00 PM",
    label: "Cocktail hour",
    detail: "A toast to love.",
    artCenter: 670,
  },
  {
    time: "6:00 PM",
    label: "Dinner in the garden",
    detail: "Good food, better company.",
    artCenter: 1000,
  },
  {
    time: "8:00 PM",
    label: "Something sweet",
    detail: "Let them eat cake.",
    artCenter: 1375,
  },
  {
    time: "9:00 PM",
    label: "Dancing under the stars",
    detail: "Until the very last song.",
    artCenter: 1765,
  },
];

export function App() {
  const [replay, setReplay] = useState(0);
  const replayOpening = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setReplay((value) => value + 1);
  };
  return (
    <main className="invitation">
      <Hero replay={replay} onReplay={replayOpening} />
      <section
        className="welcome framed"
        id="welcome"
        aria-labelledby="welcome-title"
      >
        <Art name="floral-frame" className="frame-art" />
        <div className="welcome-copy">
          <p className="eyebrow">Together with our families</p>
          <h2 id="welcome-title">
            Bienvenue
            <br />
            <em>à notre mariage</em>
          </h2>
          <p>
            Some days are made to be remembered.
            <br />
            This one is made to be shared with you.
          </p>
          <p className="italic">
            Join us for a celebration of love,
            <br />
            laughter, and a little French magic.
          </p>
        </div>
        <Art
          name="swans"
          className="swans"
          alt="Two swans forming a heart with their necks"
        />
      </section>
      <Countdown />
      <section className="formal-invitation" aria-label="Wedding announcement">
        <p className="eyebrow">The wedding of</p>
        <h2>
          Camille Lefèvre<span className="and">and</span>Antoine Marchand
        </h2>
        <p className="italic">invite you to celebrate their marriage</p>
        <p className="date-line">Saturday, 12 June 2027</p>
      </section>
      <section className="ceremony framed" aria-labelledby="ceremony-title">
        <Art name="floral-frame" className="frame-art" />
        <div className="frame-copy">
          <h2 id="ceremony-title">
            Ceremony
            <br />& Reception
          </h2>
          <p className="eyebrow">Where we celebrate</p>
          <h3>Château de Brochon</h3>
          <p className="small-caps address">
            Brochon
            <br />
            Bourgogne, France
          </p>
          <p className="italic">Saturday, 12 June 2027</p>
          <p>
            Ceremony · 3:00 PM
            <br />
            Reception · Dinner & dancing
          </p>
          <EventLinks event={wedding} />
        </div>
      </section>
      <section className="dress-code" aria-labelledby="dress-title">
        <Art name="garland" className="dress-garland" />
        <h2 id="dress-title">Dress Code</h2>
        <p className="italic">Black Tie</p>
        <p>
          Tuxedos, evening gowns
          <br />
          and your most wonderful dancing shoes.
        </p>
        <Art
          name="attire"
          className="attire"
          alt="Wedding guests in tuxedos and evening gowns"
        />
      </section>
      <section className="story" aria-labelledby="story-title">
        <Art name="story-arch" className="frame-art" />
        <div className="story-copy">
          <h2 id="story-title">Our Story</h2>
          <p>
            What began with a chance encounter
            <br />
            became our favorite adventure.
          </p>
          <p>
            From long walks and late-night talks
            <br />
            to finding a little bit of home
            <br />
            in one another.
          </p>
          <p>
            Now, surrounded by the people
            <br />
            we love most, we begin
            <br />
            our next chapter.
          </p>
          <p className="italic">And we cannot imagine it without you.</p>
        </div>
      </section>
      <section className="timeline" aria-labelledby="timeline-title">
        <h2 id="timeline-title">Timeline</h2>
        <ol>
          {schedule.map(({ time, label, detail, artCenter }) => (
            <li key={time}>
              <div className="timeline-icon" aria-hidden="true">
                <span
                  className="timeline-art"
                  style={{
                    backgroundPosition: `${22 - (artCenter * 190) / 1983}px -6px`,
                  }}
                />
              </div>
              <div className="timeline-copy">
                <time>{time}</time>
                <h3>{label}</h3>
                <p>{detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="brunch" aria-labelledby="brunch-title">
        <Garland />
        <h2 id="brunch-title">Recovery Brunch</h2>
        <p className="eyebrow">One more moment together</p>
        <h3>A Sunday in Beaune</h3>
        <p className="small-caps">Garden terrace</p>
        <p className="brunch-date">
          Sunday, 13 June 2027 <span>From 12 PM</span>
        </p>
        <p className="address">
          Beaune
          <br />
          Bourgogne, France
        </p>
        <p className="italic">
          We will be gathering in the garden
          <br />
          for a relaxed farewell brunch.
          <br />
          Join us for coffee, croissants, and stories
          <br />
          from a night we will never forget.
        </p>
        <EventLinks event={brunch} />
      </section>
      <section className="gifts framed" aria-labelledby="gifts-title">
        <Art name="floral-frame" className="frame-art" />
        <div className="gifts-copy">
          <h2 id="gifts-title">Gifts</h2>
          <p className="italic">Your presence is our greatest gift.</p>
          <p>
            Having you with us to celebrate
            <br />
            means more than we can say.
          </p>
          <p>
            Thank you for being part
            <br />
            of our happily ever after.
          </p>
          <span className="signature">C & A</span>
        </div>
      </section>
      <footer>
        <p className="italic">With all our love,</p>
        <p className="footer-names">Camille & Antoine</p>
        <p className="small-caps">12 · 06 · 2027</p>
        <button className="replay-button" onClick={replayOpening}>
          <ArrowClockwise size={15} weight="thin" />
          Replay invitation
        </button>
      </footer>
    </main>
  );
}
