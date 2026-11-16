import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { Menu, X, ChevronRight, Activity } from 'lucide-react';
import { PageType } from '../types';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenAssessment: () => void;
}

const NAV_LINKS: { label: string; page: PageType }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Health', page: 'health' },
  { label: 'Fitness', page: 'fitness' },
  { label: 'Nutrition', page: 'nutrition' },
  { label: 'Sleep', page: 'sleep' },
  { label: 'Mindset', page: 'mindset' },
  { label: 'Reviews', page: 'reviews' },
  { label: 'About', page: 'about' },
  { label: 'Contact', page: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenAssessment }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Thin green bar across the top that fills as you scroll down the page
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b transition-shadow duration-300 ${
        scrolled ? 'border-slate-200 shadow-lg shadow-slate-900/5' : 'border-transparent'
      }`}
    >
      <motion.div
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-[#166534] to-emerald-400 origin-left"
        style={{ scaleX: progress }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-6">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-[#0F172A] flex items-center justify-center text-white font-bold text-base transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
              <span className="text-emerald-400 font-extrabold text-sm tracking-tighter">O</span>M
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0F172A] whitespace-nowrap shrink-0">
              OptiMen<span className="text-[#166534] font-semibold text-sm ml-1">Wellbeing</span>
            </span>
          </button>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
            {NAV_LINKS.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`relative px-3 py-2 rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                    isActive ? 'text-[#0F172A] font-semibold' : 'hover:text-[#0F172A]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-emerald-50 border border-emerald-200/70 rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quiz button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAssessment}
              className="px-5 py-2.5 text-sm font-bold text-white bg-[#0F172A] hover:bg-[#166534] transition-colors rounded-full flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Take the quiz</span>
            </button>
          </div>

          {/* Phone menu button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0F172A] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Phone menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-slate-200 bg-white shadow-xl"
          >
            <div className="flex flex-col gap-1 px-4 pt-3 pb-6">
              {NAV_LINKS.map((item, i) => (
                <motion.button
                  key={item.page}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                  onClick={() => handleNavClick(item.page)}
                  className={`flex items-center justify-between py-3 px-4 text-base font-semibold rounded-xl text-left transition-colors ${
                    currentPage === item.page ? 'bg-emerald-50 text-[#166534]' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </motion.button>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAssessment();
                }}
                className="mt-3 w-full py-3.5 px-4 text-center text-sm font-bold text-white bg-[#0F172A] hover:bg-[#166534] rounded-full transition-colors flex items-center justify-center gap-2"
              >
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Take the 2-minute quiz</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
