import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ServicesList, ServiceDetail } from './pages/Services';
import { ServiceCategoryLanding } from './pages/ServiceCategory'; // Import new page
import { About, Contacts, FAQ, Price, Blog, BlogPostPage } from './pages/InnerPages';
import { Privacy, Terms } from './pages/Legal';
import { NotFound } from './pages/NotFound';
import { AnalyticsTracker } from './components/Analytics';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      {/* Analytics Tracker runs on every route change */}
      <AnalyticsTracker />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Service Routes */}
          <Route path="/services" element={<ServicesList />} />
          <Route path="/services/category/:categorySlug" element={<ServiceCategoryLanding />} /> {/* New Hub Route */}
          <Route path="/services/:slug" element={<ServiceDetail />} />
          
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