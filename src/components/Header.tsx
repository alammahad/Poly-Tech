import { useEffect, useState } from 'react';
import { navLinks } from '../content';
import { homeLink, isWorkPage } from '../routes';
import { Icon } from './Icon';
import { LogoMark } from './LogoMark';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Also feeds the progress bar and the hero parallax through CSS variables, once per frame.
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const root = document.documentElement.style;
      root.setProperty('--scroll-y', String(Math.min(y, 1200)));
      root.setProperty('--scroll-progress', String(max > 0 ? y / max : 0));
      setScrolled(y > 8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a href={isWorkPage ? '/' : '#top'} className="header__brand" aria-label="Poly Tech home">
          <LogoMark compact className="header__mark" />
          <span className="brand-word">Poly Tech</span>
        </a>
        <nav className={`nav${open ? ' nav--open' : ''}`} aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={homeLink(link.href)}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="button button--primary nav__cta"
            onClick={() => setOpen(false)}
          >
            Email us
          </a>
        </nav>
        <button
          type="button"
          className="header__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
      <div className="scroll-progress" aria-hidden="true" />
    </header>
  );
}
