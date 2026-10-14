/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageType, Article, ProductReview, PillarId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { PillarView } from './views/PillarView';
import { ReviewsView } from './views/ReviewsView';
import { ContactView } from './views/ContactView';
import { ArticleModal } from './components/ArticleModal';
import { ReviewModal } from './components/ReviewModal';
import { AssessmentQuizModal } from './components/AssessmentQuizModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedReview, setSelectedReview] = useState<ProductReview | null>(null);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState<boolean>(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F172A] selection:bg-emerald-100 selection:text-[#166534]">
      
      {/* Strict 1-row, 3-zone Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAssessment={() => setIsAssessmentOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenAssessment={() => setIsAssessmentOpen(true)}
            onSelectArticle={(article) => setSelectedArticle(article)}
            onSelectReview={(review) => setSelectedReview(review)}
          />
        )}

        {currentPage === 'about' && (
          <AboutView
            onNavigate={handleNavigate}
            onOpenAssessment={() => setIsAssessmentOpen(true)}
          />
        )}

        {(currentPage === 'health' ||
          currentPage === 'fitness' ||
          currentPage === 'nutrition' ||
          currentPage === 'sleep' ||
          currentPage === 'mindset') && (
          <PillarView
            pillarId={currentPage as PillarId}
            onNavigate={handleNavigate}
            onSelectArticle={(article) => setSelectedArticle(article)}
            onSelectReview={(review) => setSelectedReview(review)}
            onOpenAssessment={() => setIsAssessmentOpen(true)}
          />
        )}

        {currentPage === 'reviews' && (
          <ReviewsView
            onSelectReview={(review) => setSelectedReview(review)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Quiet Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAssessment={() => setIsAssessmentOpen(true)}
      />

      {/* Modals & Dialogs */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <ReviewModal
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
      />

      <AssessmentQuizModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        onNavigateToPillar={(pillar) => {
          setIsAssessmentOpen(false);
          setCurrentPage(pillar as PageType);
        }}
      />

    </div>
  );
}
