// Sentry Client Configuration for Sochi Travel Web Application
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

// Initialize Sentry
Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  release: process.env.VITE_APP_VERSION || '1.0.0',
  
  // Performance Monitoring
  tracesSampleRate: 0.1,
  
  // Error Sampling
  sampleRate: 1.0,
  
  // Integrations
  integrations: [
    new BrowserTracing({
      // Set sampling rate for performance monitoring
      tracingOrigins: [
        'localhost',
        '127.0.0.1',
        /^https:\/\/api\.sochi-travel\.com/,
      ],
    }),
  ],
  
  // Before Send Hook
  beforeSend(event, hint) {
    // Filter out non-critical errors
    if (event.exception) {
      const error = hint.originalException;
      if (error && error.name === 'ChunkLoadError') {
        return null; // Ignore chunk load errors
      }
    }
    return event;
  },
  
  // User Context
  beforeBreadcrumb(breadcrumb, hint) {
    // Filter out sensitive data
    if (breadcrumb.category === 'xhr' && breadcrumb.data) {
      delete breadcrumb.data.request_body;
    }
    return breadcrumb;
  },
  
  // Tags
  initialScope: {
    tags: {
      component: 'web',
      service: 'sochi-travel-web',
    },
  },
  
  // Debug
  debug: process.env.NODE_ENV === 'development',
  
  // Attachments
  attachStacktrace: true,
  
  // Max Breadcrumbs
  maxBreadcrumbs: 50,
  
  // Send Default PII
  sendDefaultPii: false,
});

// Export Sentry for manual usage
export { Sentry };
