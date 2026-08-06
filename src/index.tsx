import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';

if (import.meta.env.DEV) {
  const sendLog = (type: string, message: any, stack?: string) => {
    try {
      fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, message: String(message), stack })
      }).catch(() => {});
    } catch(e) {}
  };

  window.addEventListener('error', (e) => {
    sendLog('error', e.message, e.error?.stack);
  });
  window.addEventListener('unhandledrejection', (e) => {
    sendLog('promise', e.reason?.message || e.reason, e.reason?.stack);
  });
  const origError = console.error;
  console.error = (...args) => {
    sendLog('console.error', args.join(' '));
    origError.apply(console, args);
  };
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);