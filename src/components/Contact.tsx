import { useState, type FormEvent } from 'react';
import { services } from '../content';
import { site } from '../siteConfig';
import { Icon } from './Icon';
import { LogoMark } from './LogoMark';

export function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'unconfigured'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!site.formEndpoint) {
      setFormStatus('unconfigured');
      return;
    }

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    formData.set('_replyto', String(formData.get('email') ?? ''));
    setFormStatus('sending');

    try {
      const response = await fetch(site.formEndpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`Formspree returned ${response.status}`);
      formElement.reset();
      setFormStatus('sent');
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setFormStatus('error');
    }
  }

  return (
    <section className="section section--dark" id="contact">
      <div className="container contact">
        <div className="contact__intro reveal reveal--left">
          <h2>Tell us what&apos;s slowing you down</h2>
          <p>
            A couple of lines is plenty. We read every email ourselves and usually reply the same day.
          </p>
          <a href={`mailto:${site.contactEmail}`} className="button button--light">
            <Icon name="mail" size={18} /> {site.contactEmail}
          </a>
          <ul className="contact__details">
            <li>
              <Icon name="pin" size={18} />
              <span>{site.address}</span>
            </li>
          </ul>
          {site.bookingUrl && (
            <a href={site.bookingUrl} className="button button--light" target="_blank" rel="noreferrer">
              Pick a time on the calendar <Icon name="arrow" size={18} />
            </a>
          )}
        </div>

        <form className="contact__form reveal reveal--right" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Your name
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              Your email
              <input name="email" type="email" autoComplete="email" required />
            </label>
          </div>
          <label>
            Business name
            <input name="business" autoComplete="organization" />
          </label>
          <label>
            What do you need?
            <span className="select-wrap">
              <select name="service" defaultValue="Not sure yet">
                {services.map((service) => (
                  <option key={service.title}>{service.title}</option>
                ))}
                <option>Not sure yet</option>
              </select>
            </span>
          </label>
          <label>
            Message
            <textarea name="message" rows={4} placeholder="Tell us a little about your business…" required />
          </label>
          <button type="submit" className="button button--primary button--full" disabled={formStatus === 'sending'}>
            {formStatus === 'sending' ? 'Sending…' : 'Send message'} <Icon name="arrow" size={18} />
          </button>
          {formStatus === 'sent' && (
            <p className="form-note form-note--success" role="status">Thanks, your message has been sent.</p>
          )}
          {formStatus === 'error' && (
            <p className="form-note form-note--error" role="alert">
              We couldn&apos;t send your message. Please try again or email{' '}
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
            </p>
          )}
          {(formStatus === 'unconfigured' || !site.formEndpoint) && (
            <p className="form-note" role={formStatus === 'unconfigured' ? 'alert' : 'status'}>
              Online email delivery isn&apos;t configured yet. You can email us directly at{' '}
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#top" className="footer__logo" aria-label="Poly Tech, back to top">
            <LogoMark compact className="header__mark" />
            <span className="brand-word">Poly Tech</span>
          </a>
          <p>CRMs, automation, AI calling, chatbots and websites, set up by a small team in Lahore.</p>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            {services.map((service) => (
              <li key={service.title}>
                <a href="#services">{service.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Get in touch</h4>
          <ul>
            <li>
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            </li>
            <li>{site.address}</li>
          </ul>
        </div>
        <p className="footer__small">
          © {currentYear} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
