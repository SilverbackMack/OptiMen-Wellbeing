import React, { useState } from 'react';
import { PageType } from '../types';
import { Menu, X, ChevronRight, Activity } from 'lucide-react';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenAssessment: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenAssessment,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageType }[] = [
    { label: 'Home', page: 'home' },
    { label: "Men's Health", page: 'health' },
    { label: 'Fitness', page: 'fitness' },
    { label: 'Nutrition', page: 'nutrition' },
    { label: 'Sleep', page: 'sleep' },
    { label: 'Mindset', page: 'mindset' },
    { label: 'Reviews', page: 'reviews' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center text-white font-bold text-base transition-transform group-hover:scale-105">
              <span className="text-emerald-400 font-extrabold text-sm tracking-tighter">O</span>M
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0F172A] whitespace-nowrap shrink-0">
              OptiMen<span className="text-[#166534] font-semibold text-sm ml-1">Wellbeing</span>
            </span>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.slice(0, 7).map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-[#0F172A] font-semibold'
                      : 'hover:text-[#0F172A]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#166534] rounded-full" />
                  )}
                </button>
              );
            })}
            
            <button
              onClick={() => handleNavClick('about')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPage === 'about' ? 'text-[#0F172A] font-semibold' : 'hover:text-[#0F172A]'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPage === 'contact' ? 'text-[#0F172A] font-semibold' : 'hover:text-[#0F172A]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAssessment}
              className="px-4 py-2.5 text-xs font-semibold tracking-wide uppercase text-white bg-[#0F172A] hover:bg-[#166534] transition-colors rounded-lg flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Longevity Quiz</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0F172A] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`flex items-center justify-between py-2.5 px-3 text-sm font-medium rounded-lg text-left transition-colors ${
                  currentPage === item.page
                    ? 'bg-slate-100 text-[#0F172A] font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}

            <div className="pt-3 mt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAssessment();
                }}
                className="w-full py-3 px-4 text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#0F172A] hover:bg-[#166534] rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Take Longevity Quiz</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
