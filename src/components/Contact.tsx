import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { services } from '../content';
import { site } from '../siteConfig';
import { Icon } from './Icon';
import { LogoMark } from './LogoMark';

const serviceOptions = [...services.map((service) => service.title), 'Not sure yet'];

function ServiceSelect({ value, onChange }: { value: string[]; onChange: (value: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<HTMLDivElement[]>([]);
  const selectedLabel = value.length === 0
    ? 'Not sure yet'
    : value.length === 1
      ? value[0]
      : `${value.length} services selected`;

  useEffect(() => {
    if (!open) return;
    optionRefs.current[activeIndex]?.focus();
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!(event.target instanceof Node) || !wrapRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [activeIndex, open]);

  function toggleOption(option: string) {
    if (option === 'Not sure yet') {
      onChange([]);
      return;
    }
    onChange(value.includes(option) ? value.filter((service) => service !== option) : [...value, option]);
  }

  function handleTriggerKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex(value.length > 0 ? serviceOptions.indexOf(value[0]) : serviceOptions.length - 1);
      setOpen(true);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  function handleOptionKeyDown(event: ReactKeyboardEvent<HTMLDivElement>, index: number) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      setActiveIndex((index + direction + serviceOptions.length) % serviceOptions.length);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      setActiveIndex(event.key === 'Home' ? 0 : serviceOptions.length - 1);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleOption(serviceOptions[index]);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (event.key === 'Tab') {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapRef} className={`select-wrap${open ? ' select-wrap--open' : ''}`}>
      <input type="hidden" name="service" value={value.length > 0 ? value.join(', ') : 'Not sure yet'} />
      <button
        ref={triggerRef}
        type="button"
        className="select-trigger"
        aria-label="Choose one or more services"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="service-options"
        onClick={() => {
          setActiveIndex(value.length > 0 ? serviceOptions.indexOf(value[0]) : serviceOptions.length - 1);
          setOpen((current) => !current);
        }}
        onKeyDown={handleTriggerKeyDown}
      >
        {selectedLabel}
      </button>
      {open && (
        <div id="service-options" className="select-menu" role="listbox" aria-label="Services" aria-multiselectable="true">
          {serviceOptions.map((option, index) => (
            <div
              key={option}
              ref={(element) => {
                if (element) optionRefs.current[index] = element;
              }}
              className={`select-option${(option === 'Not sure yet' ? value.length === 0 : value.includes(option)) ? ' select-option--selected' : ''}`}
              tabIndex={activeIndex === index ? 0 : -1}
              role="option"
              aria-selected={option === 'Not sure yet' ? value.length === 0 : value.includes(option)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => toggleOption(option)}
              onKeyDown={(event) => handleOptionKeyDown(event, index)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'unconfigured'>('idle');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

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
      setSelectedServices([]);
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
            <ServiceSelect value={selectedServices} onChange={setSelectedServices} />
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
