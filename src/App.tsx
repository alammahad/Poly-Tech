import { useEffect } from 'react';
import { Contact, Footer } from './components/Contact';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About, Customers, Faq, Process, Services, Team } from './components/Sections';

export default function App() {
  const isTeamPage = window.location.pathname === '/team';

  useEffect(() => {
    if (isTeamPage) document.title = 'Our Team | Poly Tech';
  }, [isTeamPage]);

  // Fade sections in as they scroll into view.
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal, .draw');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('reveal--visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  // Parallax: each [data-parallax] element gets --p, its distance from the middle of the screen
  // (-1 above, 0 centred, 1 below), and CSS moves it by that amount while you scroll.
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = window.innerHeight;
      for (const item of items) {
        const box = item.getBoundingClientRect();
        const progress = (box.top + box.height / 2 - height / 2) / height;
        item.style.setProperty('--p', Math.max(-1.5, Math.min(1.5, progress)).toFixed(3));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        {isTeamPage ? (
          <Team />
        ) : (
          <>
            <Hero />
            <Services />
            <Process />
            <About />
            <Faq />
            <Customers />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
