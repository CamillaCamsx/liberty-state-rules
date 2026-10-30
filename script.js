(() => {
  'use strict';

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scroll = document.querySelector('.scroll');
  const parchment = document.querySelector('.parchment');
  const returnTop = document.querySelector('.return-top');
  const progress = document.querySelector('.reading-progress > span');
  const canClip = CSS.supports('clip-path', 'inset(0 0 1px 0)');
  let furthestReveal = 0;
  let searching = false;
  let printing = false;
  let ticking = false;

  function updateReadingPosition() {
    // Keep the full layout height. Only the painted edge moves, preserving
    // natural scrolling, anchors, and keyboard page navigation.
    const paper = parchment.getBoundingClientRect();
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    const animate = canClip && !motionPreference.matches && !searching && !printing;

    if (animate) {
      // The lower roll follows just below the reading area. Paper already
      // opened stays open when returning to an earlier commandment.
      const readingEdge = window.innerHeight - Math.min(100, window.innerHeight * 0.1);
      furthestReveal = Math.min(paper.height, Math.max(furthestReveal, 64, readingEdge - paper.top));
      if (maxScroll <= 0 || maxScroll - window.scrollY <= 2) furthestReveal = paper.height;
      const rolledUp = Math.max(0, paper.height - furthestReveal);
      scroll.style.setProperty('--rolled-up', `${rolledUp.toFixed(2)}px`);
      // Shift the grain with the paper for a subtle turning effect.
      scroll.style.setProperty('--roll-grain', `${(furthestReveal * 0.3 % 24).toFixed(2)}px`);
    }

    scroll.classList.toggle('is-reading', animate);
    progress.style.transform = `scaleX(${fraction})`;
    returnTop.classList.toggle('is-visible', window.scrollY > 500);
    ticking = false;
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateReadingPosition);
    }
  }

  motionPreference.addEventListener('change', requestUpdate);
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  window.addEventListener('load', requestUpdate);
  window.addEventListener('hashchange', requestUpdate);
  window.addEventListener('pageshow', requestUpdate);
  window.addEventListener('beforeprint', () => {
    printing = true;
    updateReadingPosition();
  });
  window.addEventListener('afterprint', () => {
    printing = false;
    requestUpdate();
  });

  // Expose all text for native browser search. Without JavaScript, or with
  // reduced motion, the entire proclamation is open from the start.
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'f') {
      searching = true;
      updateReadingPosition();
    }
  });

  if ('ResizeObserver' in window) {
    new ResizeObserver(requestUpdate).observe(parchment);
  }
  document.fonts?.ready.then(requestUpdate);
  updateReadingPosition();
})();
