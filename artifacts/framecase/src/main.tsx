import { createRoot, hydrateRoot } from 'react-dom/client';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';

import './index.css';

const container = document.getElementById('root')!;

const appElement = (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

// For seamless SSG without hydration mismatches or duplicate nodes,
// mounting with createRoot takes over the prerendered DOM cleanly.
createRoot(container, {
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(appElement);
