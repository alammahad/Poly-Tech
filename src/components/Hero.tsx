import { site } from '../siteConfig';
import { Icon } from './Icon';
import { LogoMark } from './LogoMark';

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <LogoMark className="hero__logo" />
        <div className="hero__copy">
          <h1>Fewer missed calls. Fewer lost leads. Less copy-pasting.</h1>
          <p className="hero__lead">
            We&apos;re Poly Tech, a small team in Lahore. We set up CRMs, automations, AI phone assistants,
            chatbots and websites for businesses that are too busy to do it themselves.
          </p>
          <div className="hero__actions">
            <a href="#contact" className="button button--primary">
              Email us <Icon name="arrow" size={18} />
            </a>
            <a href="#services" className="button button--ghost">
              What we do
            </a>
          </div>
          <p className="hero__email">
            Or write to us directly: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
