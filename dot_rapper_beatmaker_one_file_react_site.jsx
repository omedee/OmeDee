import React from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  ShoppingBag,
  Music2,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Youtube,
  Download,
  Calendar,
  Waves,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

/*
  OmeDee — Single-file React site (fixed)
  - Fixed unterminated string error in placeholder attributes
  - Integrated user-provided logo and socials
  - Footer shows © 2026 OmeDee Creation. All rights reserved.
  Notes: payment buttons are placeholders (add Stripe/PayPal integration separately).
*/

const HERO_IMAGE = "/mnt/data/OmeDee Moment  (2).png"; // user-provided logo image

const SOCIALS = {
  instagram: "https://www.instagram.com/qp.omedee",
  facebook: "https://www.facebook.com/qp.omedee",
  youtube: "https://www.youtube.com/@OmeDee",
  spotify: "https://open.spotify.com/artist/55JejTdEIJ7LSojItCn1em",
  email: "mailto:contact.omedee@gmail.com",
};

const BEATS = [
  {
    id: "omd-void",
    title: "VOID",
    mood: ["dark", "drill", "glitch"],
    bpm: 142,
    key: "Fm",
    price: 39,
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: HERO_IMAGE,
  },
  {
    id: "omd-aerial",
    title: "AERIAL",
    mood: ["cinematic", "trap", "wide"],
    bpm: 145,
    key: "Gm",
    price: 49,
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: HERO_IMAGE,
  },
  {
    id: "omd-mercury",
    title: "MERCURY",
    mood: ["bouncy", "trap", "club"],
    bpm: 150,
    key: "Em",
    price: 59,
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: HERO_IMAGE,
  },
];

function Tag({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2 py-1 text-xs tracking-wide uppercase">
      <Waves className="h-3 w-3" /> {children}
    </span>
  );
}

function Button({ children, className = "", href, ...rest }) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium shadow-sm transition hover:shadow-lg";
  const styles =
    "bg-white text-black hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/40";
  if (href) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  );
}

function GhostButton({ children, className = "", href, ...rest }) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition";
  const styles = "border border-white/20 bg-transparent text-white hover:border-white/40";
  if (href) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  );
}

function Section({ id, eyebrow, title, subtitle, children }) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl px-4 py-24">
      <div className="mb-8 flex items-center gap-3 text-white/70">
        <span className="h-[1px] w-10 bg-white/20" />
        <span className="text-xs tracking-widest uppercase">{eyebrow}</span>
      </div>
      <div className="mb-6 grid gap-3">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">{title}</h2>
        {subtitle && (
          <p className="max-w-2xl text-white/70 leading-relaxed">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function BeatCard({ beat }) {
  const audioRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const onEnded = () => setPlaying(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-sm backdrop-blur-sm"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${beat.cover})` }}
      />
      <div className="relative grid gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {beat.mood.map((m) => (
                <Tag key={m}>{m}</Tag>
              ))}
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">{beat.title}</h3>
            <p className="mt-1 text-sm text-white/60">{beat.key} • {beat.bpm} BPM</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/60">mp3/wav stems</p>
            <p className="text-2xl font-semibold">${beat.price}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-black/60 text-white transition hover:scale-105"
            aria-label={`Play preview of ${beat.title}`}
          >
            {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </button>
          <audio ref={audioRef} src={beat.src} onEnded={onEnded} className="hidden" />
          <div className="flex-1 overflow-hidden rounded-xl border border-white/10 bg-black/40 p-3 text-xs text-white/70">
            Preview — click play to listen.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Placeholder action: wire up to payment/checkout integration */}
          <Button className=""><ShoppingBag className="h-4 w-4" /> Buy License</Button>
          <GhostButton>
            <Download className="h-4 w-4" /> Download MP3 Tag
          </GhostButton>
        </div>
      </div>
    </motion.div>
  );
}

export default function OmeDeeSite() {
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // For now we just log — replace with server call or form handling service
    const form = e.currentTarget;
    const data = new FormData(form);
    console.log("Booking request:", Object.fromEntries(data.entries()));
    alert("Thanks — booking request sent. (This is a demo; wire up your backend to receive requests.)");
    form.reset();
  };

  return (
    <div className="min-h-screen scroll-smooth bg-gradient-to-b from-[#0b0b0c] via-[#0f1013] to-[#121318] text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#home" className="flex items-center gap-2">
            <img src={HERO_IMAGE} alt="OmeDee Logo" className="h-8 w-8 rounded-full object-cover" />
            <span className="text-lg font-semibold tracking-tight">OmeDee</span>
          </a>
          <nav className="hidden gap-6 md:flex">
            {[
              ["Beats", "#beats"],
              ["Licenses", "#licenses"],
              ["Video", "#video"],
              ["Booking", "#booking"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="text-sm text-white/70 hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" className="text-white/80 hover:text-white">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={SOCIALS.youtube} target="_blank" rel="noreferrer" className="text-white/80 hover:text-white">
              <Youtube className="h-5 w-5" />
            </a>
            <Button href="#beats" className="hidden md:inline-flex">
              <Music2 className="h-4 w-4" /> Browse Beats
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/70 to-[#0f1013]" />

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-24 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs tracking-widest uppercase">
              <Sparkles className="h-3 w-3" /> Rapper / Beatmaker / Producer
            </p>
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl md:text-7xl">OMEDEE</h1>
            <p className="mt-4 max-w-xl text-white/80">Cinematic trap, Moroccan roots, future sound. Beats, records, and collabs.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#beats"><Play className="h-4 w-4" /> Start Listening</Button>
              <GhostButton href="#booking"><Calendar className="h-4 w-4" /> Book a Session</GhostButton>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
              <div className="grid grid-cols-3 gap-3">
                {BEATS.map((b) => (
                  <div key={b.id} className="aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                    <div className="h-full w-full bg-cover bg-center opacity-70" style={{ backgroundImage: `url(${b.cover})` }} />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-white/60">Latest drops</div>
                <a href="#beats" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white">See all <ChevronRight className="h-4 w-4" /></a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" eyebrow="About" title="Dark beats. Wide space. Moroccan energy." subtitle="OmeDee, rapper and beatmaker blending filmic sound with trap aesthetics. Available for custom beats, mixing, and collaborations.">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["10M+", "streams across platforms"],
            ["150+", "placements & syncs"],
            ["24h", "turnaround on customs"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-3xl font-bold">{k}</div>
              <div className="text-white/70">{v}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* BEAT STORE */}
      <Section id="beats" eyebrow="Beat Store" title="Choose your vibe, own the rights." subtitle="Instant delivery. Multiple license options. Secure checkout.">
        <div className="grid gap-6 md:grid-cols-2">
          {BEATS.map((beat) => (
            <BeatCard key={beat.id} beat={beat} />
          ))}
        </div>
      </Section>

      {/* LICENSES */}
      <Section id="licenses" eyebrow="Licenses" title="Straightforward licenses" subtitle="Upgrade anytime. All include instant delivery and PDF terms.">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: "Basic Lease", price: 29, bullets: ["MP3 + WAV", "Up to 1M streams", "Non-exclusive"] },
            { name: "Premium Lease", price: 79, bullets: ["MP3 + WAV + Stems", "Unlimited streams", "Music video allowed"] },
            { name: "Exclusive", price: "Contact", bullets: ["Full rights transfer", "Stems included", "Custom terms"] },
          ].map((t) => (
            <div key={t.name} className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-xl font-semibold">{t.name}</div>
              <div className="mb-4 text-3xl font-bold">{typeof t.price === 'number' ? `$${t.price}` : t.price}</div>
              <ul className="mb-6 space-y-2 text-white/80">
                {t.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2"><span className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-white/10">•</span>{b}</li>
                ))}
              </ul>
              <Button className="mt-auto"><ShoppingBag className="h-4 w-4" /> Continue</Button>
            </div>
          ))}
        </div>
      </Section>

      {/* VIDEO */}
      <Section id="video" eyebrow="Video" title="Latest visual" subtitle="High-contrast, cinematic, Morocco to the world.">
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </Section>

      {/* BOOKING */}
      <Section id="booking" eyebrow="Booking" title="Book OmeDee" subtitle="Custom beats, hooks, or sessions. Let’s work.">
        <form onSubmit={handleBookingSubmit} className="grid gap-4 md:grid-cols-2">
          <input required name="name" placeholder="Your name" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder-white/40" />
          <input required name="email" type="email" placeholder="Email" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder-white/40" />
          <input name="handle" placeholder="Instagram / X handle" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder-white/40 md:col-span-2" />
          <textarea name="message" rows={5} placeholder="Tell me what you're looking for (beat style, BPM, deadline, budget)" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder-white/40 md:col-span-2" />
          <div className="md:col-span-2">
            <Button type="submit"><Mail className="h-4 w-4" /> Send request</Button>
          </div>
        </form>
      </Section>

      {/* CONTACT */}
      <Section id="contact" eyebrow="Contact" title="Let’s build your record" subtitle="For business, sync, or press reach out below.">
        <div className="flex flex-wrap items-center gap-3">
          <GhostButton href={SOCIALS.email}><Mail className="h-4 w-4" /> contact.omedee@gmail.com</GhostButton>
          <GhostButton href={SOCIALS.instagram} target="_blank"><Instagram className="h-4 w-4" /> Instagram</GhostButton>
          <GhostButton href={SOCIALS.facebook} target="_blank"><Twitter className="h-4 w-4" /> Facebook</GhostButton>
          <GhostButton href={SOCIALS.youtube} target="_blank"><Youtube className="h-4 w-4" /> YouTube</GhostButton>
          <GhostButton href={SOCIALS.spotify} target="_blank"><Music2 className="h-4 w-4" /> Spotify</GhostButton>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 md:flex-row">
          <div className="flex items-center gap-2 text-white/70">
            <img src={HERO_IMAGE} alt="OmeDee logo" className="h-7 w-7 rounded-lg object-cover" />
            <span>OmeDee</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/60">
            <a href="#licenses" className="hover:text-white">Licenses</a>
            <a href="#booking" className="hover:text-white">Booking</a>
            <a href="#contact" className="hover:text-white">Contact</a>
            <a href="#" className="inline-flex items-center gap-1 hover:text-white">EPK <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </div>
        <div className="text-center text-xs text-white/60 py-4">© 2026 OmeDee Creation. All rights reserved.</div>
      </footer>
    </div>
  );
}
