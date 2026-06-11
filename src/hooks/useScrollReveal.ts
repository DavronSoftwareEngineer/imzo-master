import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Elements matching these selectors animate into view as the user scrolls.
const SELECTOR = '.section-header, .card, .feature-item, .stat-card, .office-card, .spec-table, [data-reveal]';

/**
 * Adds a fade-up reveal animation to key elements when they enter the viewport.
 * The hidden state is applied in a layout effect (before paint) so content
 * never flashes visible first. Re-scans on every route change. Skipped
 * entirely for users who prefer reduced motion, so nothing stays invisible.
 */
export function useScrollReveal() {
  const location = useLocation();

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    // Re-observe every matching element on each run (no "already tagged" guard):
    // under React StrictMode the effect mounts twice, and the first observer is
    // disconnected before it can fire — skipping tagged elements the second time
    // would leave them stuck at opacity:0 forever.
    els.forEach((el) => el.classList.add('reveal'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [location.pathname]);
}
