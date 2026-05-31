import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ServicesList, ServiceDetail } from './pages/Services';
import { ServiceCategoryLanding } from './pages/ServiceCategory'; // Import new page
import { About } from './pages/About';
import { FAQ, Price, Blog, BlogPostPage, Contacts } from './pages/InnerPages';
import { Privacy, Terms } from './pages/Legal';
import { NotFound } from './pages/NotFound';
import { AnalyticsTracker } from './components/Analytics';
import { CookieConsent } from './components/CookieConsent';
import { useShadowProfile } from './hooks/useShadowProfile';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  // Инициализируем теневой профиль (он слушает location)
  useShadowProfile();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // Small delay to ensure render
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      {/* Analytics Tracker runs on every route change */}
      <AnalyticsTracker />
      <CookieConsent />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Service Routes */}
          <Route path="/services" element={<Price />} />
          <Route path="/services/category/:categorySlug/:city?" element={<ServiceCategoryLanding />} />
          <Route path="/services/:slug/:city?" element={<ServiceDetail />} />

          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/price" element={<Price />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Shortcuts */}
          <Route path="/team" element={<About />} />
          <Route path="/reviews" element={<Home />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;