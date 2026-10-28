// The site is one React app serving two pages: the homepage and /work.
export const isWorkPage = window.location.pathname.replace(/\/+$/, '') === '/work';

// Links to homepage sections (#services, #faq, ...) need a leading "/" when we're on /work.
export const homeLink = (href: string) => (isWorkPage && href.startsWith('#') ? `/${href}` : href);
