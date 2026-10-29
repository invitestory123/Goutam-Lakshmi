import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'motion/react';
import {
  CalendarBlank,
  MapPin,
  FlowerLotus,
  Sparkle,
  ArrowDown,
  ShareNetwork,
  Check,
  Heart,
  X,
  Compass,
  Clock,
  Sparkle as SparkleIcon,
  CaretRight
} from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';

// Wedding Muhurtham: 4th December 2026 at 4:54 AM IST
const WEDDING_DATE = new Date('2026-12-04T04:54:00+05:30');

type EventItem = {
  name: string;
  sideTag?: 'bride' | 'groom' | 'both';
  date: string;
  time: string;
  venue: string;
  address: string;
  note: string;
  mapQuery: string;
  icon: string;
  badge?: string;
};

// Events for Bride
const brideEvents: EventItem[] = [
  {
    name: 'Cocktail Evening',
    sideTag: 'both',
    date: '27 November 2026',
    time: 'From 7:30 PM onwards',
    venue: 'Swargha Lake Retreat',
    address: 'Near Osman Sagar / Gandipet, Hyderabad',
    note: 'An enchanting lakeside soiree filled with music, cocktails, and laughter under the stars.',
    mapQuery: 'Swargha Lake Retreat',
    icon: '🍸',
    badge: 'Celebration'
  },
  {
    name: 'Mehendi Ceremony',
    sideTag: 'bride',
    date: '01 December 2026',
    time: 'From 5:30 PM (Sundowner)',
    venue: 'Sri Adithya Athena',
    address: 'Manikonda, Hyderabad',
    note: 'Sundowner hues, intricate henna drawn with love, and soulful music as celebrations begin.',
    mapQuery: 'Sri Adithya Athena, Manikonda',
    icon: '❋',
    badge: 'Bride Ceremony'
  },
  {
    name: 'Pellikuthuru',
    sideTag: 'bride',
    date: '02 December 2026',
    time: 'At 11:00 AM (Followed by Lunch)',
    venue: 'Sri Adithya Athena',
    address: 'Manikonda, Hyderabad',
    note: 'The auspicious turmeric bridal ceremony of blessings, traditional mangala snanam, and maternal love.',
    mapQuery: 'Sri Adithya Athena, Manikonda',
    icon: '✿',
    badge: 'Auspicious Ritual'
  },
  {
    name: 'Pre-Wedding Reception',
    sideTag: 'both',
    date: '03 December 2026',
    time: 'At 7:00 PM onwards',
    venue: 'Sacred Green Lawn, Kyra Wellness Resort',
    address: 'Near Sanghi Temple, Hayathnagar, Telangana',
    note: 'A grand twilight evening with family and friends before our holy muhurtham.',
    mapQuery: 'Kyra Wellness resort, Sanghi Temple',
    icon: '✧',
    badge: 'Reception'
  },
  {
    name: 'Wedding Muhurtham',
    sideTag: 'both',
    date: '04 December 2026',
    time: 'At 4:54 AM (Brahma Muhurtham)',
    venue: 'Sanghi Temple',
    address: 'Sanghi Nagar, Hayathnagar Mandal, Telangana 501511',
    note: 'Jeelakarra Bellam & Mangalsutra dharana — where two souls unite in eternal companionship.',
    mapQuery: 'Sanghi Temple, Hayathnagar',
    icon: '❧',
    badge: 'Sacred Vows'
  }
];

// Events for Groom
const groomEvents: EventItem[] = [
  {
    name: 'Cocktail Evening',
    sideTag: 'both',
    date: '27 November 2026',
    time: 'From 7:30 PM onwards',
    venue: 'Swargha Lake Retreat',
    address: 'Near Osman Sagar / Gandipet, Hyderabad',
    note: 'An enchanting lakeside soiree filled with music, cocktails, and laughter under the stars.',
    mapQuery: 'Swargha Lake Retreat',
    icon: '🍸',
    badge: 'Celebration'
  },
  {
    name: 'Pellikoduku',
    sideTag: 'groom',
    date: '02 December 2026',
    time: 'From 11:00 AM (Followed by Lunch)',
    venue: 'Hallmark Palm Breeze Villas',
    address: 'Manikonda, Hyderabad',
    note: 'The traditional groom preparation ceremony with sacred haldi, blessings, and joyful family festivities.',
    mapQuery: 'Hallmark Palm Breeze Villas, Manikonda',
    icon: '✦',
    badge: 'Auspicious Ritual'
  },
  {
    name: 'Pre-Wedding Reception',
    sideTag: 'both',
    date: '03 December 2026',
    time: 'At 7:00 PM onwards',
    venue: 'Sacred Green Lawn, Kyra Wellness Resort',
    address: 'Near Sanghi Temple, Hayathnagar, Telangana',
    note: 'A grand twilight evening with family and friends before our holy muhurtham.',
    mapQuery: 'Kyra Wellness resort, Sanghi Temple',
    icon: '✧',
    badge: 'Reception'
  },
  {
    name: 'Wedding Muhurtham',
    sideTag: 'both',
    date: '04 December 2026',
    time: 'At 4:54 AM (Brahma Muhurtham)',
    venue: 'Sanghi Temple',
    address: 'Sanghi Nagar, Hayathnagar Mandal, Telangana 501511',
    note: 'Jeelakarra Bellam & Mangalsutra dharana — where two souls unite in eternal companionship.',
    mapQuery: 'Sanghi Temple, Hayathnagar',
    icon: '❧',
    badge: 'Sacred Vows'
  }
];

// Combined events list (All festivities)
const allEvents: EventItem[] = [
  {
    name: 'Cocktail Evening',
    sideTag: 'both',
    date: '27 November 2026',
    time: 'From 7:30 PM onwards',
    venue: 'Swargha Lake Retreat',
    address: 'Near Osman Sagar / Gandipet, Hyderabad',
    note: 'An enchanting lakeside soiree filled with music, cocktails, and laughter under the stars.',
    mapQuery: 'Swargha Lake Retreat',
    icon: '🍸',
    badge: 'Celebration'
  },
  {
    name: 'Mehendi Ceremony',
    sideTag: 'bride',
    date: '01 December 2026',
    time: 'From 5:30 PM (Sundowner)',
    venue: 'Sri Adithya Athena',
    address: 'Manikonda, Hyderabad',
    note: 'Sundowner hues, intricate henna drawn with love, and soulful music as celebrations begin.',
    mapQuery: 'Sri Adithya Athena, Manikonda',
    icon: '❋',
    badge: "Bride's Side"
  },
  {
    name: 'Pellikoduku Ceremony',
    sideTag: 'groom',
    date: '02 December 2026',
    time: 'From 11:00 AM (Followed by Lunch)',
    venue: 'Hallmark Palm Breeze Villas',
    address: 'Manikonda, Hyderabad',
    note: 'Traditional Groom preparation ceremony with turmeric, sacred hymns, and feast.',
    mapQuery: 'Hallmark Palm Breeze Villas, Manikonda',
    icon: '✦',
    badge: "Groom's Side"
  },
  {
    name: 'Pellikuthuru Ceremony',
    sideTag: 'bride',
    date: '02 December 2026',
    time: 'At 11:00 AM (Followed by Lunch)',
    venue: 'Sri Adithya Athena',
    address: 'Manikonda, Hyderabad',
    note: 'Traditional Bride preparation ceremony with turmeric, mangala snanam, and blessings.',
    mapQuery: 'Sri Adithya Athena, Manikonda',
    icon: '✿',
    badge: "Bride's Side"
  },
  {
    name: 'Pre-Wedding Reception',
    sideTag: 'both',
    date: '03 December 2026',
    time: 'At 7:00 PM onwards',
    venue: 'Sacred Green Lawn, Kyra Wellness Resort',
    address: 'Near Sanghi Temple, Hayathnagar, Telangana',
    note: 'A grand twilight evening with family and friends before our holy muhurtham.',
    mapQuery: 'Kyra Wellness resort, Sanghi Temple',
    icon: '✧',
    badge: 'Reception'
  },
  {
    name: 'Wedding Muhurtham',
    sideTag: 'both',
    date: '04 December 2026',
    time: 'At 4:54 AM (Brahma Muhurtham)',
    venue: 'Sanghi Temple',
    address: 'Sanghi Nagar, Hayathnagar Mandal, Telangana 501511',
    note: 'Jeelakarra Bellam & Mangalsutra dharana — where two souls unite in eternal companionship.',
    mapQuery: 'Sanghi Temple, Hayathnagar',
    icon: '❧',
    badge: 'Sacred Muhurtham'
  }
];

// Story 3 Photos Details
const storyPhotos = [
  {
    id: 'lake',
    src: '/assets/story-lake.jpg',
    title: 'Where Our Journey Sailed',
    subtitle: 'Chapter 01 · In Perfect Stillness',
    description: 'Surrounded by tranquil waters and towering peaks, two souls found an effortless harmony and a shared dream of a lifetime together.'
  },
  {
    id: 'haldi',
    src: '/assets/story-haldi-mandap.jpg',
    title: 'Painted in Sunshine & Joy',
    subtitle: 'Chapter 02 · Haldi & Pellikoduku / Pellikuthuru',
    description: 'Turmeric on our cheeks, golden marigold blossoms, and the warmest laughter surrounded by the people who matter the most.'
  },
  {
    id: 'reception',
    src: '/assets/story-reception.jpg',
    title: 'Two Paths, One Sacred Forever',
    subtitle: 'Chapter 03 · The Royal Promise',
    description: 'Under the glow of temple lanterns and sacred blessings, stepping forward hand-in-hand into our eternal new beginning.'
  }
];

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Countdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, WEDDING_DATE.getTime() - now);
  const values = [
    Math.floor(diff / 86400000),
    Math.floor(diff / 3600000) % 24,
    Math.floor(diff / 60000) % 60,
    Math.floor(diff / 1000) % 60
  ];

  return (
    <div className="countdown">
      {values.map((v, i) => (
        <div className="count-unit" key={i}>
          <div className="flip">
            <motion.span
              key={v}
              initial={{ rotateX: -75, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              {String(v).padStart(2, '0')}
            </motion.span>
          </div>
          <small>{['Days', 'Hours', 'Mins', 'Secs'][i]}</small>
        </div>
      ))}
    </div>
  );
}

function ScratchDate() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);
  const drawing = useRef(false);
  const strokes = useRef(0);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const rect = c.getBoundingClientRect();
    c.width = rect.width * ratio;
    c.height = rect.height * ratio;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.scale(ratio, ratio);

    // Gold luxury gradient foil
    const g = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    g.addColorStop(0, '#d4af37');
    g.addColorStop(0.3, '#f5e2bd');
    g.addColorStop(0.7, '#c99026');
    g.addColorStop(1, '#8f5c15');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Decorative inner border
    ctx.strokeStyle = '#fff1d4';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(10, 10, rect.width - 20, rect.height - 20);

    ctx.fillStyle = '#4a2c11';
    ctx.textAlign = 'center';
    ctx.font = '600 12px Marcellus, serif';
    ctx.fillText('SCRATCH TO REVEAL OUR DATE', rect.width / 2, rect.height / 2 - 12);
    ctx.font = '24px serif';
    ctx.fillText('𑁍 ✦ 𑁍', rect.width / 2, rect.height / 2 + 20);
    ctx.font = '10px Marcellus, serif';
    ctx.fillStyle = '#6e431a';
    ctx.fillText('Sanghi Temple · Hyderabad', rect.width / 2, rect.height / 2 + 42);
  }, []);

  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || done) return;
    const c = canvas.current;
    if (!c) return;
    const r = c.getBoundingClientRect();
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(e.clientX - r.left, e.clientY - r.top, 24, 0, Math.PI * 2);
    ctx.fill();
    strokes.current += 1;
    if (strokes.current > 38) {
      setDone(true);
      c.style.opacity = '0';
      if ('vibrate' in navigator) {
        navigator.vibrate?.(35);
      }
    }
  };

  return (
    <section className={'scratch-section ' + (done ? 'revealed' : '')}>
      <div className="float-field" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} style={{ '--i': i } as React.CSSProperties}>
            ❀
          </i>
        ))}
      </div>
      <Reveal>
        <p className="script">Save Our Date</p>
        <h2>A sacred day written in the stars</h2>
        <div className="scratch-card">
          <div className="date-reveal">
            <small>Friday Morning · 4:54 AM</small>
            <b>04</b>
            <span>December · 2026</span>
            <em>Sanghi Temple · Hayathnagar</em>
          </div>
          <canvas
            ref={canvas}
            onPointerDown={(e) => {
              drawing.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              scratch(e);
            }}
            onPointerMove={scratch}
            onPointerUp={() => (drawing.current = false)}
            onPointerCancel={() => (drawing.current = false)}
          />
        </div>
        <p className="scratch-hint">
          {done ? 'We eagerly await celebrating with you ♡' : 'Swipe your finger across the card to uncover the date'}
        </p>
      </Reveal>
    </section>
  );
}

function Bloom({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className={'welcome-card ' + (open ? 'is-open' : '')}
      animate={open && !reduce ? { scale: 1.04, opacity: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="welcome-names">
        <small>Together with our families</small>
        <h1>
          Goutam <i>&</i> Lakshmi
        </h1>
        <p>invite you to celebrate their wedding</p>
        <span>04 · 12 · 2026</span>
      </div>
      <motion.button
        aria-label="Open wedding invitation"
        className="open-invite"
        onClick={() => {
          setOpen(true);
          onDone();
        }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="seal">
          <FlowerLotus size={25} weight="fill" />
        </span>
        <b>Open Our Invitation</b>
        <small>Tap to enter celebrations</small>
      </motion.button>
    </motion.div>
  );
}

function addCalendar() {
  const body = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    'DTSTART:20261203T232400Z',
    'DTEND:20261204T050000Z',
    'SUMMARY:Wedding of Goutam & Lakshmi',
    'LOCATION:Sanghi Temple, Hayathnagar, Telangana',
    'DESCRIPTION:Auspicious Wedding Muhurtham at 4:54 AM at Sanghi Temple followed by festivities.',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([body], { type: 'text/calendar' }));
  a.download = 'goutam-lakshmi-wedding.ics';
  a.click();
  URL.revokeObjectURL(a.href);
}

export function App() {
  const [entered, setEntered] = useState(false);
  const [introPlaying, setIntroPlaying] = useState(false);
  const introVideo = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const leafY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const templeY = useTransform(scrollYProgress, [0, 1], [0, 95]);
  const page = useRef<HTMLElement>(null);

  // Link side selection: 'bride' | 'groom' | 'all'
  const [selectedSide, setSelectedSide] = useState<'bride' | 'groom' | 'all'>('groom');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [activePhotoModal, setActivePhotoModal] = useState<(typeof storyPhotos)[0] | null>(null);

  // Detect URL parameter or root attribute on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sideParam = params.get('side') || params.get('for') || params.get('view');
    const rootSide = document.getElementById('root')?.getAttribute('data-side');
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (sideParam === 'bride' || rootSide === 'bride' || path.includes('bride') || hash.includes('bride')) {
      setSelectedSide('bride');
    } else if (sideParam === 'all' || hash.includes('all')) {
      setSelectedSide('all');
    } else if (sideParam === 'groom' || rootSide === 'groom' || path.includes('groom') || hash.includes('groom')) {
      setSelectedSide('groom');
    }
  }, []);

  // Update URL hash / query when user changes side switch
  const handleSideChange = (side: 'bride' | 'groom' | 'all') => {
    setSelectedSide(side);
    const url = new URL(window.location.href);
    if (side === 'all') {
      url.searchParams.set('side', 'all');
    } else {
      url.searchParams.set('side', side);
    }
    window.history.replaceState({}, '', url.toString());
  };

  const copyShareLink = (side: 'bride' | 'groom') => {
    const origin = window.location.origin;
    const basePath = window.location.pathname.replace(/\/bride\.html|\/groom\.html/i, '');
    const cleanBase = basePath.endsWith('/') ? basePath : basePath + '/';
    const targetUrl =
      side === 'bride'
        ? `${origin}${cleanBase}bride.html`
        : `${origin}${cleanBase}groom.html`;

    navigator.clipboard.writeText(targetUrl).then(() => {
      setCopiedLink(side);
      setTimeout(() => setCopiedLink(null), 3000);
    });
  };

  // GSAP animations
  useEffect(() => {
    if (reduce || !entered || !page.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-copy>*', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' });
      gsap.to('.hero-art', { scale: 1.09, yPercent: 7, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
      gsap.utils.toArray<HTMLElement>('.event').forEach((el, i) =>
        gsap.fromTo(el, { opacity: 0, x: i % 2 ? -35 : 35 }, { opacity: 1, x: 0, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 62%', scrub: 0.8 } })
      );
      gsap.fromTo('.story-photo-card', { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, stagger: 0.18, ease: 'power2.out', scrollTrigger: { trigger: '.story-photos-grid', start: 'top 82%' } });
      gsap.fromTo('.ceremony-image img', { scale: 1.15, yPercent: -4 }, { scale: 1, yPercent: 4, ease: 'none', scrollTrigger: { trigger: '.ceremony-image', start: 'top bottom', end: 'bottom top', scrub: 1 } });
      gsap.utils.toArray<HTMLElement>('.atmos-lantern').forEach((el, i) => {
        const depth = Number(el.dataset.depth || 0.4);
        gsap.to(el, {
          yPercent: -90 * depth,
          x: Math.sin(i) * 18 * depth,
          rotation: i % 2 ? 4 : -4,
          ease: 'none',
          scrollTrigger: { trigger: page.current, start: 'top top', end: 'bottom bottom', scrub: 1.2 + depth }
        });
      });
    }, page);
    return () => ctx.revert();
  }, [entered, reduce, selectedSide]);

  // Current active event list based on side
  const currentEvents = selectedSide === 'bride' ? brideEvents : selectedSide === 'groom' ? groomEvents : allEvents;

  return (
    <main ref={page}>
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

      {/* Floating lanterns */}
      <div className="lantern-atmosphere" aria-hidden="true">
        {[
          { x: 6, y: 10, d: 0.22, s: 0.62, b: 2.2 },
          { x: 89, y: 18, d: 0.35, s: 0.78, b: 1.4 },
          { x: 12, y: 38, d: 0.7, s: 1.05, b: 0.4 },
          { x: 92, y: 52, d: 0.28, s: 0.58, b: 2.6 },
          { x: 4, y: 70, d: 1, s: 1.35, b: 0.2 },
          { x: 87, y: 82, d: 0.62, s: 0.92, b: 0.8 },
          { x: 48, y: 64, d: 0.18, s: 0.42, b: 3.2 }
        ].map((l, i) => (
          <span
            key={i}
            className="atmos-lantern"
            data-depth={l.d}
            style={
              {
                left: `${l.x}%`,
                top: `${l.y}%`,
                '--scale': l.s,
                '--blur': `${l.b}px`,
                '--delay': `${-i * 0.6}s`
              } as React.CSSProperties
            }
          >
            <i className="lantern-chain" />
            <i className="lantern-cap" />
            <i className="lantern-body">
              <b className="lantern-flame" />
            </i>
            <i className="lantern-tail" />
          </span>
        ))}
      </div>

      {/* Welcome Card & Entrance Video */}
      {!entered && (
        <div className={'welcome ' + (introPlaying ? 'intro-playing' : '')}>
          <video
            ref={introVideo}
            className="welcome-video"
            muted
            playsInline
            preload="auto"
            poster="/assets/entrance-first-frame.png"
            onEnded={() => setEntered(true)}
            aria-label="Traditional wedding invitation opening"
          >
            <source src="/assets/aarav-ananya-opening.mp4" type="video/mp4" />
          </video>
          <div className="welcome-shade" />
          <div className="garland-edge" />
          {!introPlaying && (
            <Bloom
              onDone={() => {
                const v = introVideo.current;
                if (!v) return;
                v.currentTime = 0;
                setIntroPlaying(true);
                void v.play().catch(() => setEntered(true));
              }}
            />
          )}
          {introPlaying && (
            <button className="skip-intro" onClick={() => setEntered(true)}>
              Skip Intro
            </button>
          )}
        </div>
      )}

      {/* Floating Side Switcher Pill */}
      <header className="sticky-side-bar">
        <div className="side-bar-inner">
          <div className="side-indicator">
            <span className="side-indicator-dot" />
            <span className="side-indicator-text">
              {selectedSide === 'bride' && "Viewing Bride's Invitation (Pellikuthuru)"}
              {selectedSide === 'groom' && "Viewing Groom's Invitation (Pellikoduku)"}
              {selectedSide === 'all' && 'Viewing All Wedding Festivities'}
            </span>
          </div>
          <div className="side-toggle-group" role="tablist" aria-label="Celebration Side Selector">
            <button
              role="tab"
              aria-selected={selectedSide === 'groom'}
              className={'side-tab ' + (selectedSide === 'groom' ? 'active' : '')}
              onClick={() => handleSideChange('groom')}
            >
              <span>🤵 Groom</span>
              <small>Pellikoduku</small>
            </button>
            <button
              role="tab"
              aria-selected={selectedSide === 'bride'}
              className={'side-tab ' + (selectedSide === 'bride' ? 'active' : '')}
              onClick={() => handleSideChange('bride')}
            >
              <span>👰 Bride</span>
              <small>Pellikuthuru</small>
            </button>
            <button
              role="tab"
              aria-selected={selectedSide === 'all'}
              className={'side-tab ' + (selectedSide === 'all' ? 'active' : '')}
              onClick={() => handleSideChange('all')}
            >
              <span>✦ All</span>
              <small>Events</small>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <motion.img
          className="hero-art"
          src="/assets/story-reception.jpg"
          alt="Goutam and Lakshmi wedding portrait under temple flower garlands"
          style={{ y: reduce ? 0 : templeY }}
        />
        <div className="hero-scrim" />
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: entered ? 1 : 0, y: entered ? 0 : 24 }}
          transition={{ delay: 0.15, duration: 1 }}
        >
          <p className="blessing">With the divine blessings of our families</p>
          <h1>
            Goutam <span>&</span> Lakshmi
          </h1>
          <div className="side-celebration-pill">
            {selectedSide === 'groom' && '✦ Groom’s Celebrations · Pellikoduku ✦'}
            {selectedSide === 'bride' && '✦ Bride’s Celebrations · Pellikuthuru ✦'}
            {selectedSide === 'all' && '✦ Complete Wedding Festivities ✦'}
          </div>
          <div className="date-rule">
            <i />
            04 · 12 · 2026
            <i />
          </div>
          <p className="hero-venue-tag">Sanghi Temple · Hyderabad, Telangana</p>
        </motion.div>
        <motion.div className="leaf-float left" style={{ y: reduce ? 0 : leafY }} />
        <motion.div className="leaf-float right" style={{ y: reduce ? 0 : leafY }} />
        <div className="scroll-cue">
          <ArrowDown size={20} />
          <span>Celebrate With Us</span>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="count-section">
        <Reveal>
          <p className="kicker">Until the Auspicious Muhurtham</p>
          <h2>Counting Every Heartbeat</h2>
          <Countdown />
          <p className="muhurtham-time-note">
            Sacred Muhurtham: 04 December 2026 at 4:54 AM IST (Sanghi Temple)
          </p>
        </Reveal>
      </section>

      {/* Scratch To Reveal Section */}
      <ScratchDate />

      {/* =========================================================================
          OUR STORY SECTION WITH 3 PHOTOS BEHIND
          ========================================================================= */}
      <section className="story ornamental">
        {/* Ambient background photo silhouettes */}
        <div className="story-ambient-bg" aria-hidden="true">
          <div className="ambient-photo p1" style={{ backgroundImage: `url('/assets/story-lake.jpg')` }} />
          <div className="ambient-photo p2" style={{ backgroundImage: `url('/assets/story-haldi-mandap.jpg')` }} />
          <div className="ambient-photo p3" style={{ backgroundImage: `url('/assets/story-reception.jpg')` }} />
          <div className="ambient-scrim" />
        </div>

        <Reveal className="story-inner">
          <FlowerLotus size={38} weight="thin" />
          <p className="script">Our Sacred Journey</p>
          <h2>Two Paths, One Forever</h2>
          <p className="story-lead">
            From serene waters and quiet conversations to shared dreams and joyful laughter,
            every step has led us to this auspicious union. With happy hearts and the blessings
            of our beloved families, we invite you to be part of our forever story.
          </p>

          {/* 3 Photos Cards Showcase */}
          <div className="story-photos-container">
            <div className="story-photos-header">
              <span className="ornament-leaf">𑁍</span>
              <h3>Chapters of Our Love</h3>
              <span className="ornament-leaf">𑁍</span>
            </div>
            <p className="story-photos-sub">Tap any photo to view full memory</p>

            <div className="story-photos-grid">
              {storyPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  className="story-photo-card"
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActivePhotoModal(photo)}
                >
                  <div className="photo-frame">
                    <img src={photo.src} alt={photo.title} loading="lazy" />
                    <span className="photo-badge">0{index + 1}</span>
                    <div className="photo-glass-overlay">
                      <SparkleIcon size={20} weight="fill" />
                      <span>View</span>
                    </div>
                  </div>
                  <div className="photo-card-info">
                    <small>{photo.subtitle}</small>
                    <h4>{photo.title}</h4>
                    <p>{photo.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="signature">Goutam & Lakshmi</div>
        </Reveal>
      </section>

      {/* Ceremony Hero Moment */}
      <section className="ceremony-moment">
        <div className="floating-glass lotus-one">✿</div>
        <div className="floating-glass lotus-two">❀</div>
        <div className="floating-diya">◒</div>
        <div className="ceremony-image">
          <img
            src="/assets/story-haldi-mandap.jpg"
            loading="lazy"
            alt="Goutam and Lakshmi haldi celebration in marigold flower mandap"
          />
        </div>
        <Reveal className="ceremony-caption">
          <p className="script">Turmeric & Tenderness</p>
          <h2>Before Forever Begins</h2>
          <p>
            Yellow sunshine on our skin, fragrant marigolds in the air, and sacred blessings
            surrounded by the warmth of family and cherished friends.
          </p>
          <span>Explore our celebration schedule below</span>
        </Reveal>
      </section>

      {/* =========================================================================
          WEDDING FESTIVITIES SECTION (BRIDE & GROOM SPECIFIC WITH TOGGLE & LINKS)
          ========================================================================= */}
      <section className="events" id="festivities">
        <Reveal>
          <div className="festivities-header">
            <p className="script">Wedding Itinerary</p>
            <h2>
              {selectedSide === 'bride' && "Bride's Festivities"}
              {selectedSide === 'groom' && "Groom's Festivities"}
              {selectedSide === 'all' && 'All Wedding Festivities'}
            </h2>
            <p className="section-intro">
              {selectedSide === 'bride' &&
                'Join us for the celebrations leading up to the divine muhurtham, including Mehendi & Pellikuthuru.'}
              {selectedSide === 'groom' &&
                'Join us for the celebrations leading up to the divine muhurtham, including Cocktail & Pellikoduku.'}
              {selectedSide === 'all' &&
                'Five radiant moments uniting two families into one unforgettable celebration.'}
            </p>

            {/* Direct Link Share Actions */}
            <div className="share-links-box">
              <span className="share-links-label">
                <ShareNetwork size={16} /> Share Specific Invitation Link:
              </span>
              <div className="share-buttons">
                <button
                  className={'share-btn ' + (copiedLink === 'groom' ? 'copied' : '')}
                  onClick={() => copyShareLink('groom')}
                  title="Copy direct link for Groom's side (Pellikoduku)"
                >
                  {copiedLink === 'groom' ? <Check size={16} weight="bold" /> : <ShareNetwork size={16} />}
                  <span>{copiedLink === 'groom' ? 'Copied Groom Link!' : "Copy Groom's Link (Pellikoduku)"}</span>
                </button>
                <button
                  className={'share-btn ' + (copiedLink === 'bride' ? 'copied' : '')}
                  onClick={() => copyShareLink('bride')}
                  title="Copy direct link for Bride's side (Pellikuthuru)"
                >
                  {copiedLink === 'bride' ? <Check size={16} weight="bold" /> : <ShareNetwork size={16} />}
                  <span>{copiedLink === 'bride' ? 'Copied Bride Link!' : "Copy Bride's Link (Pellikuthuru)"}</span>
                </button>
              </div>
            </div>

            {/* In-page Filter Selector */}
            <div className="festivities-filter-tabs">
              <button
                className={'filter-tab ' + (selectedSide === 'groom' ? 'active' : '')}
                onClick={() => handleSideChange('groom')}
              >
                🤵 Groom's Side (Pellikoduku)
              </button>
              <button
                className={'filter-tab ' + (selectedSide === 'bride' ? 'active' : '')}
                onClick={() => handleSideChange('bride')}
              >
                👰 Bride's Side (Pellikuthuru)
              </button>
              <button
                className={'filter-tab ' + (selectedSide === 'all' ? 'active' : '')}
                onClick={() => handleSideChange('all')}
              >
                ✦ All Events
              </button>
            </div>
          </div>
        </Reveal>

        {/* Dynamic Event List */}
        <div className="event-list">
          {currentEvents.map((e, i) => {
            const isMuhurtham = e.name.toLowerCase().includes('wedding');
            return (
              <Reveal
                className={'event ' + (isMuhurtham ? 'featured-muhurtham' : '')}
                key={e.name + e.date + i}
              >
                <div className="event-number">0{i + 1}</div>
                <div className="event-content">
                  <div className="event-header-row">
                    <span className="event-icon">{e.icon}</span>
                    {e.badge && <span className="event-badge">{e.badge}</span>}
                  </div>
                  <h3>{e.name}</h3>
                  <p>{e.note}</p>
                  <dl>
                    <div>
                      <dt>
                        <Clock size={13} /> Date
                      </dt>
                      <dd>{e.date}</dd>
                    </div>
                    <div>
                      <dt>
                        <Clock size={13} /> Time
                      </dt>
                      <dd>{e.time}</dd>
                    </div>
                    <div>
                      <dt>
                        <MapPin size={13} /> Venue
                      </dt>
                      <dd>
                        <b>{e.venue}</b>
                        <small className="venue-address">{e.address}</small>
                      </dd>
                    </div>
                  </dl>
                  <div className="event-card-actions">
                    <a
                      className="event-map-link"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.mapQuery)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MapPin size={15} weight="fill" />
                      <span>Directions to {e.venue.split(',')[0]}</span>
                      <CaretRight size={13} />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Main Wedding Venue Section */}
      <section className="venue ornamental">
        <Reveal>
          <MapPin size={38} weight="thin" />
          <p className="script">Holy Muhurtham Venue</p>
          <h2>Sanghi Temple</h2>
          <p className="venue-full-address">
            Sanghi Nagar, Hayathnagar Mandal, Hyderabad, Telangana 501511
          </p>
          <div className="map google-map">
            <iframe
              title="Google Map of Sanghi Temple"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Sanghi%20Temple%2C%20Hayathnagar%2C%20Telangana&z=15&output=embed"
            />
            <div className="map-overlay">
              <span>
                <MapPin size={19} weight="fill" /> Wedding Muhurtham
              </span>
              <b>Sanghi Temple</b>
              <small>04 December 2026 · 4:54 AM</small>
            </div>
          </div>
          <div className="actions">
            <a
              className="button primary"
              href="https://www.google.com/maps/search/?api=1&query=Sanghi+Temple+Hayathnagar"
              target="_blank"
              rel="noreferrer"
            >
              <Compass size={19} /> Open in Google Maps
            </a>
            <button className="button secondary" onClick={addCalendar}>
              <CalendarBlank size={19} /> Add to Calendar
            </button>
          </div>
        </Reveal>
      </section>

      {/* Footer Section */}
      <footer>
        <img
          src="/assets/story-reception.jpg"
          loading="lazy"
          alt="Goutam and Lakshmi wedding portrait"
        />
        <div className="footer-overlay" />
        <Reveal className="footer-copy">
          <Sparkle size={28} weight="thin" />
          <p>We cannot wait to celebrate with you</p>
          <h2>
            Goutam <i>&</i> Lakshmi
          </h2>
          <span>04 December 2026 · Sanghi Temple, Telangana</span>
        </Reveal>
      </footer>

      {/* Lightbox Photo Modal */}
      <AnimatePresence>
        {activePhotoModal && (
          <motion.div
            className="photo-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhotoModal(null)}
          >
            <motion.div
              className="photo-modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close-btn"
                onClick={() => setActivePhotoModal(null)}
                aria-label="Close photo view"
              >
                <X size={20} />
              </button>
              <div className="modal-image-wrapper">
                <img src={activePhotoModal.src} alt={activePhotoModal.title} />
              </div>
              <div className="modal-caption">
                <small>{activePhotoModal.subtitle}</small>
                <h3>{activePhotoModal.title}</h3>
                <p>{activePhotoModal.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(<App />);
}
