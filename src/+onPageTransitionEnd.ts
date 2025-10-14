import type { OnPageTransitionEndAsync } from 'vike/types';

export const onPageTransitionEnd: OnPageTransitionEndAsync = async () => {
  console.log('Page transition end');
  document.querySelector('body')?.classList.remove('page-is-transitioning');

  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      // Temporarily remove and re-apply the hash to trigger :target
      window.history.replaceState({}, '', window.location.pathname + window.location.search);
      requestAnimationFrame(() => (window.location.hash = hash));
    }
  }
};
