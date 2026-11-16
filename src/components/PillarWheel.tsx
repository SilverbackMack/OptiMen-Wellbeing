import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PageType, PillarId } from '../types';
import { PILLARS } from '../data/content';
import { PILLAR_META, PILLAR_ORDER } from '../data/pillarMeta';
import { EASE } from './Motion';

// The five sections drawn as a wheel. Picking a point on the wheel shows
// that section's photo and a one-line summary. It turns by itself until
// the visitor touches it.

const RADIUS = 38; // % of the wheel's width
const point = (i: number) => {
  const angle = ((-90 + i * 72) * Math.PI) / 180;
  return { x: 50 + RADIUS * Math.cos(angle), y: 50 + RADIUS * Math.sin(angle) };
};

export const PillarWheel: React.FC<{ onNavigate: (page: PageType) => void }> = ({ onNavigate }) => {
  const [active, setActive] = useState<PillarId>('health');
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-20% 0px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!auto || !inView || reduce) return;
    const timer = setInterval(() => {
      setActive((cur) => PILLAR_ORDER[(PILLAR_ORDER.indexOf(cur) + 1) % PILLAR_ORDER.length]);
    }, 3200);
    return () => clearInterval(timer);
  }, [auto, inView, reduce]);

  const pick = (id: PillarId) => {
    setAuto(false);
    setActive(id);
  };

  const meta = PILLAR_META[active];
  const pillar = PILLARS[active];
  const activePoint = point(PILLAR_ORDER.indexOf(active));

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* The wheel */}
      <div className="relative w-full max-w-[340px] sm:max-w-[440px] mx-auto aspect-square">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <motion.circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke="#34D399"
            strokeOpacity="0.35"
            strokeWidth="0.4"
            strokeDasharray="1.5 2.5"
            style={{ transformOrigin: '50px 50px' }}
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          />
          <circle cx="50" cy="50" r="24" fill="none" stroke="#1E293B" strokeWidth="0.4" />
          {PILLAR_ORDER.map((id, i) => {
            const p = point(i);
            return <line key={id} x1="50" y1="50" x2={p.x} y2={p.y} stroke="#1E293B" strokeWidth="0.4" />;
          })}
          {/* Highlighted spoke */}
          <motion.line
            x1="50"
            y1="50"
            stroke="#34D399"
            strokeWidth="0.7"
            strokeLinecap="round"
            initial={false}
            animate={{ x2: activePoint.x, y2: activePoint.y }}
            transition={{ duration: 0.6, ease: EASE }}
          />
        </svg>

        {/* Centre */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] aspect-square rounded-full bg-slate-800 border border-slate-700 flex flex-col items-center justify-center text-center shadow-[0_0_60px_rgba(52,211,153,0.25)]">
          <span className="text-2xl sm:text-3xl font-extrabold text-white leading-none">5</span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-400 mt-1">Pillars</span>
        </div>

        {/* Points on the wheel */}
        {PILLAR_ORDER.map((id, i) => {
          const p = point(i);
          const m = PILLAR_META[id];
          const Icon = m.icon;
          const isActive = id === active;
          return (
            <button
              key={id}
              type="button"
              onClick={() => pick(id)}
              onMouseEnter={() => pick(id)}
              aria-pressed={isActive}
              aria-label={`Show ${PILLARS[id].name}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none group"
            >
              <motion.span
                animate={{ scale: isActive ? 1.15 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border transition-colors duration-300 group-focus-visible:ring-2 group-focus-visible:ring-emerald-300 ${
                  isActive
                    ? 'bg-emerald-400 border-emerald-300 text-[#0F172A] shadow-[0_0_30px_rgba(52,211,153,0.6)]'
                    : 'bg-slate-800 border-slate-700 text-emerald-400 hover:border-emerald-400/60'
                }`}
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </motion.span>
              <span
                className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  isActive ? 'text-white' : 'text-slate-400'
                }`}
              >
                {m.short}
              </span>
            </button>
          );
        })}
      </div>

      {/* The selected section */}
      <div className="relative min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={() => onNavigate(active as PageType)}
            className="group relative h-[420px] rounded-3xl overflow-hidden border border-slate-700 cursor-pointer"
          >
            <img
              src={meta.image}
              alt={pillar.name}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 space-y-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{pillar.name}</h3>
                <p className="text-base text-slate-200 mt-1">{meta.line}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {meta.track.slice(0, 3).map((t) => (
                  <span
                    key={t.label}
                    className="text-xs font-medium text-white bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1"
                  >
                    {t.label}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300">
                Explore {meta.short.toLowerCase()}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
