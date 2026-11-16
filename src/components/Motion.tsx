import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, animate } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

// Shared motion building blocks for the page designs.
// Everything here respects the visitor's "reduce motion" setting.

export const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** Fades and slides its children in the first time they scroll into view. */
export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, y = 24, className }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '0px 0px -60px 0px' }}
    transition={{ duration: 0.6, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

/** Counts up to a number when it scrolls into view. */
export const CountUp: React.FC<{ to: number; className?: string }> = ({ to, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
};

/** Small uppercase label that sits above a heading. */
export const Eyebrow: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark }) => (
  <p
    className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold ${
      dark ? 'text-emerald-400' : 'text-[#166534]'
    }`}
  >
    <span className={`w-6 h-px ${dark ? 'bg-emerald-400' : 'bg-[#166534]'}`} />
    {children}
  </p>
);

export interface FlowStep {
  icon: LucideIcon;
  title: string;
  text?: string;
}

/**
 * A simple process diagram: numbered steps joined by a line that draws
 * itself as the diagram scrolls into view.
 */
export const FlowDiagram: React.FC<{ steps: FlowStep[]; dark?: boolean }> = ({ steps, dark }) => {
  const cols =
    steps.length === 4 ? 'md:grid-cols-4' : steps.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';
  return (
    <div className="relative">
      {/* Connecting line (desktop: across, phone: down) */}
      <motion.div
        aria-hidden="true"
        className={`hidden md:block absolute top-8 left-[8%] right-[8%] h-px origin-left ${
          dark ? 'bg-emerald-400/40' : 'bg-emerald-600/30'
        }`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        transition={{ duration: 1.2, ease: EASE }}
      />
      <motion.div
        aria-hidden="true"
        className={`md:hidden absolute left-8 top-8 bottom-8 w-px origin-top ${
          dark ? 'bg-emerald-400/40' : 'bg-emerald-600/30'
        }`}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
      />

      <ol className={`relative grid grid-cols-1 ${cols} gap-8 md:gap-6`}>
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.li
              key={step.title}
              className="flex md:flex-col items-center md:text-center gap-5 md:gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.5, delay: 0.15 + idx * 0.18, ease: EASE }}
            >
              <div
                className={`relative w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center shadow-lg ${
                  dark
                    ? 'bg-slate-800 border border-slate-700 text-emerald-400'
                    : 'bg-[#0F172A] text-emerald-400'
                }`}
              >
                <Icon className="w-7 h-7" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-400 text-[#0F172A] text-[11px] font-extrabold flex items-center justify-center">
                  {idx + 1}
                </span>
              </div>
              <div>
                <h3 className={`text-base font-bold ${dark ? 'text-white' : 'text-[#0F172A]'}`}>{step.title}</h3>
                {step.text && (
                  <p className={`text-sm mt-1 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{step.text}</p>
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
};

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  line: string;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

/** Dark banner used at the top of every page except the home page. */
export const PageHero: React.FC<PageHeroProps> = ({ eyebrow, title, line, image, imageAlt = '', children }) => (
  <section className="relative bg-[#0F172A] text-white overflow-hidden">
    {image && (
      <motion.img
        src={image}
        alt={imageAlt}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: 'easeOut' }}
      />
    )}
    <div
      className={`absolute inset-0 ${
        image
          ? 'bg-gradient-to-r from-[#0F172A] via-[#0F172A]/85 to-[#0F172A]/30'
          : 'bg-[radial-gradient(60%_80%_at_85%_0%,rgba(22,101,52,0.45),transparent)]'
      }`}
    />
    <div className="glow-grid absolute inset-0 opacity-40" aria-hidden="true" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
      <motion.div
        className="max-w-2xl space-y-5"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <Eyebrow dark>{eyebrow}</Eyebrow>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-balance">
          {title}
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-xl">{line}</p>
        {children}
      </motion.div>
    </div>
  </section>
);
