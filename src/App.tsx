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
import { ARTICLES, PRODUCT_REVIEWS } from './data/content';
import { PAGE_PATHS, PAGE_META, SITE_URL, articlePath, reviewPath, parsePath } from './seo';

function routeState(pathname: string) {
  const route = parsePath(pathname);
  const article = route.articleId ? ARTICLES.find((a) => a.id === route.articleId) ?? null : null;
  const review = route.reviewId ? PRODUCT_REVIEWS.find((r) => r.id === route.reviewId) ?? null : null;
  const page: PageType = article ? (article.pillar as PageType) : route.page;
  return { page, article, review };
}

function setMeta(title: string, description: string, path: string) {
  document.title = title;
  const set = (selector: string, attr: string, value: string) => {
    const el = document.head.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  set('meta[name="description"]', 'content', description);
  set('meta[property="og:title"]', 'content', title);
  set('meta[property="og:description"]', 'content', description);
  set('link[rel="canonical"]', 'href', SITE_URL + path);
}

export default function App() {
  const initial = routeState(window.location.pathname);
  const [currentPage, setCurrentPage] = useState<PageType>(initial.page);
  const [selectedArticle, setSelectedArticleState] = useState<Article | null>(initial.article);
  const [selectedReview, setSelectedReviewState] = useState<ProductReview | null>(initial.review);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState<boolean>(false);

  // Keep the screen in step with the browser's back and forward buttons
  useEffect(() => {
    const onPop = () => {
      const s = routeState(window.location.pathname);
      setCurrentPage(s.page);
      setSelectedArticleState(s.article);
      setSelectedReviewState(s.review);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Page title and description for whatever is on screen
  useEffect(() => {
    if (selectedArticle) {
      setMeta(selectedArticle.metaTitle ?? `${selectedArticle.title} | OptiMen Wellbeing`,
        selectedArticle.metaDescription ?? selectedArticle.summary, articlePath(selectedArticle.id));
    } else if (selectedReview) {
      setMeta(`${selectedReview.name} Review | OptiMen Wellbeing`, selectedReview.verdict, reviewPath(selectedReview.id));
    } else {
      setMeta(PAGE_META[currentPage].title, PAGE_META[currentPage].description, PAGE_PATHS[currentPage]);
    }
  }, [currentPage, selectedArticle, selectedReview]);

  const go = (path: string) => {
    if (window.location.pathname !== path) window.history.pushState(null, '', path);
  };

  const handleNavigate = (page: PageType) => {
    setSelectedArticleState(null);
    setSelectedReviewState(null);
    setCurrentPage(page);
    go(PAGE_PATHS[page]);
  };

  const setSelectedArticle = (article: Article | null) => {
    setSelectedArticleState(article);
    go(article ? articlePath(article.id) : PAGE_PATHS[currentPage]);
  };

  const setSelectedReview = (review: ProductReview | null) => {
    setSelectedReviewState(review);
    go(review ? reviewPath(review.id) : PAGE_PATHS[currentPage]);
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
          handleNavigate(pillar as PageType);
        }}
      />

    </div>
  );
}
