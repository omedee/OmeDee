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
  Facebook,
} from "lucide-react";

// Updated: place your image in public/OmeDee-Moment-2.png
const HERO_IMAGE = "/OmeDee-Moment-2.png";

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
  const styles =
    "border border-white/20 bg-transparent text-white hover:border-white/40";
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
          <Button><ShoppingBag className="h-4 w-4" /> Buy License</Button>
          <GhostButton><Download className="h-4 w-4" /> Download MP3 Tag</GhostButton>
        </div>
      </div>
    </motion.div>
  );
}

export default function OmeDeeSite() {
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    console.log("Booking request:", Object.fromEntries(data.entries()));
    alert("Thanks — booking request sent. (Demo only.)");
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
            {[["Beats","#beats"],["Licenses","#licenses"],["Video","#video"],["Booking","#booking"],["Contact","#contact"]].map(([label, href])=>(
              <a key={href} href={href} className="text-sm text-white/70 hover:text-white">{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" className="text-white/80 hover:text-white"><Instagram className="h-5 w-5" /></a>
            <a href={SOCIALS.youtube} target="_blank" rel="noreferrer" className="text-white/80 hover:text-white"><Youtube className="h-5 w-5" /></a>
            <Button href="#beats" className="hidden md:inline-flex"><Music2 className="h-4 w-4" /> Browse Beats</Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
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
                {BEATS.map((b)=>(
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

      {/* Additional sections (About, Beat Store, Licenses, Video, Booking, Contact, Footer) */}
      {/* You can copy the same sections from your original code, they will now work */}
      {/* Make sure to update HERO_IMAGE paths wherever used */}
    </div>
  );
}

