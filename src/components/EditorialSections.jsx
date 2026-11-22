import React from 'react';
import { ArrowUpRight, BookOpen, CalendarDays, Headphones, MapPin, Music2, Sparkles } from 'lucide-react';

const sections = {
  magazine: {
    eyebrow: 'STAFF / EDITORIAL',
    title: 'Stories from the scene',
    intro: 'Ideas, people and independent projects shaping contemporary street culture.',
    icon: BookOpen,
    items: [
      { type: 'STYLE / 01', title: 'Independent style starts with a point of view', text: 'A guide to building a recognisable look through local labels, archive pieces and personal choices.' },
      { type: 'CREATORS / 02', title: 'Small teams, original ideas', text: 'Meet the makers turning focused creative projects into independent brands and communities.' },
      { type: 'CITY / 03', title: 'The city as a creative platform', text: 'Markets, studios, pop-ups and unexpected places where new scenes take shape.' }
    ]
  },
  music: {
    eyebrow: 'STAFF / SOUND',
    title: 'Music without borders',
    intro: 'A place for electronic sounds, independent artists, labels and local scenes.',
    icon: Headphones,
    items: [
      { type: 'ELECTRONIC / 01', title: 'New sounds, independent voices', text: 'Discover emerging producers, DJs and collectives building their own sound.' },
      { type: 'PLAYLISTS / 02', title: 'After-hours selection', text: 'A future home for STAFF community playlists and carefully selected mixes.' },
      { type: 'ARTISTS / 03', title: 'Make room for the next name', text: 'Artist profiles and releases from the independent music community.' }
    ]
  },
  events: {
    eyebrow: 'STAFF / CALENDAR',
    title: 'Meet in the real world',
    intro: 'Markets, creative meetups, exhibitions and music events worth putting on the calendar.',
    icon: CalendarDays,
    items: [
      { type: 'MARKETS / 01', title: 'Independent markets', text: 'Discover pop-ups, local designers and small labels presenting their work in person.' },
      { type: 'COMMUNITY / 02', title: 'Creative meetups', text: 'Connect with makers, shop teams, photographers and people building new projects.' },
      { type: 'MUSIC / 03', title: 'Club nights and showcases', text: 'A dedicated space for independent promoters, venues and artist showcases.' }
    ]
  },
  about: {
    eyebrow: 'STAFF / ABOUT',
    title: 'More than a marketplace',
    intro: 'STAFF brings independent trade, urban culture and community into one connected ecosystem.',
    icon: Sparkles,
    items: [
      { type: 'DISCOVER', title: 'Find independent projects', text: 'Explore original shops, products, creators and ideas beyond the usual mainstream feed.' },
      { type: 'CONNECT', title: 'Build real connections', text: 'Take part in conversations, share discoveries and meet people with common interests.' },
      { type: 'CREATE', title: 'Give good ideas a place to grow', text: 'A platform for independent sellers, artists, organisers and creative communities.' }
    ]
  }
};

export default function EditorialSections({ activeTab, onNavigate }) {
  const page = sections[activeTab];
  if (!page) return null;
  const PageIcon = page.icon;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#777747]/50 bg-[#202319] px-3 py-1.5 text-[10px] font-bold tracking-[.22em] text-[#d0c99a]">
          <PageIcon className="h-3.5 w-3.5" /> {page.eyebrow}
        </div>
        <h1 className="mt-6 text-4xl sm:text-6xl font-black uppercase leading-[.98] tracking-tight text-white">{page.title}</h1>
        <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-gray-400">{page.intro}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {page.items.map((item, index) => (
          <article key={item.type} className="group min-h-64 rounded-2xl border border-[#55583b]/50 bg-[#12150f] p-6 transition hover:-translate-y-1 hover:border-[#aaa16a]/80">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[.2em] text-[#aaa16a]">{item.type}</span>
              <span className="text-xs text-gray-600">0{index + 1}</span>
            </div>
            <h2 className="mt-10 text-2xl font-black uppercase leading-tight text-white group-hover:text-[#d0c99a]">{item.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-[#55583b]/40 bg-gradient-to-r from-[#1b2017] to-[#11140f] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#aaa16a]">Be part of STAFF</p>
          <p className="mt-2 text-lg font-bold text-white">Discover the community and independent stores.</p>
        </div>
        <button onClick={() => onNavigate('community')} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#777747] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#898a55]">
          Explore community <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
