import { useState, type CSSProperties } from 'react';
import { faqs, services, steps, team, testimonials } from '../content';
import { site } from '../siteConfig';
import { Icon } from './Icon';
import { PersonScene, ServiceArt } from './Illustrations';

// Delays each item's reveal a little more than the one before it.
const stagger = (index: number) => ({ '--i': index }) as CSSProperties;

// How far a [data-parallax] element drifts while it crosses the screen.
const depth = (px: number) => ({ '--depth': `${px}px` }) as CSSProperties;

export function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-heading reveal">
          <h2 data-parallax style={depth(28)}>What we do</h2>
          <p>Five things, done properly. Pick one or put a few together.</p>
        </div>
        <ol className="service-list">
          {services.map((service, index) => (
            <li key={service.title} className="service reveal reveal--left">
              <span className="service__number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{service.title}</h3>
              <div className="service__body">
                <p>{service.text}</p>
                <p className="service__example">{service.example}</p>
              </div>
              <div className="service__art" data-parallax style={depth(-46)}>
                <ServiceArt title={service.title} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section section--dark" id="process">
      <div className="container">
        <div className="section-heading reveal">
          <h2 data-parallax style={depth(28)}>How we work</h2>
        </div>
        <ol className="steps draw">
          {steps.map((step, index) => (
            <li key={step.title} className="step reveal" style={stagger(index)}>
              <span className="step__number">{index + 1}</span>
              <div data-parallax style={depth(-18 * (index + 1))}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="section section--tint" id="about">
      <div className="container about-wrap">
        <div className="about__art reveal reveal--scale">
          <div data-parallax style={depth(-70)}>
            <PersonScene />
          </div>
        </div>
        <div className="about reveal">
          <h2>A small team, not a call centre</h2>
          <p>
            Poly Tech is a small team based in Lahore. The person you email is the person who builds your system, so
            you never have to explain things twice.
          </p>
          <p>
            We&apos;d rather set up one thing that your staff actually use than ten features nobody opens. If we
            don&apos;t think something is worth your money, we&apos;ll tell you.
          </p>
          <a href={`mailto:${site.contactEmail}`} className="button button--primary">
            Write to us <Icon name="arrow" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Team() {
  const [lead, ...members] = team;
  return (
    <section className="section team-page" id="team">
      <div className="container">
        <div className="team-intro reveal">
          <span className="team-intro__eyebrow">Poly Tech <span>/</span> Our team</span>
          <h1>The people behind the work.</h1>
          <p>Small team. Hands-on work. Direct access to the people building your systems.</p>
        </div>
        {lead && (
          <article className="team-lead reveal">
            {lead.photo && (
              <div className="team-lead__portrait">
                <img className="team-lead__photo" src={lead.photo} alt={`Portrait of ${lead.name}`} />
                <span className="team-lead__portrait-caption">Poly Tech leadership</span>
              </div>
            )}
            <div className="team-lead__content">
              <span className="team-lead__label"><span>01</span> Team lead</span>
              <h3>{lead.name}</h3>
              <p className="team-lead__role">{lead.role}</p>
              <div className="team-lead__links">
                <a href={`mailto:${lead.email}`} className="team-card__link">
                  <Icon name="mail" size={18} />
                  {lead.email}
                </a>
                <a href={lead.linkedin} className="team-linkedin" target="_blank" rel="noreferrer">
                  LinkedIn <Icon name="arrow" size={18} />
                </a>
              </div>
            </div>
          </article>
        )}
        <div className="team-roster-heading reveal">
          <span>Meet the team</span>
          <p>Specialists who turn ideas into useful systems.</p>
        </div>
        <div className="team-grid">
          {members.map((member, index) => (
            <article key={member.name} className="team-card reveal" style={stagger(index)}>
              <div className="team-card__person">
                <span className="team-card__initial" aria-hidden="true">
                  {member.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                </span>
                <span className="team-card__role">{member.role ?? 'Poly Tech team'}</span>
              </div>
              <h3>{member.name}</h3>
              <div className="team-card__links">
                <a href={`mailto:${member.email}`} className="team-card__link" aria-label={`Email ${member.name}`}>
                  <Icon name="mail" size={18} />
                  Email
                </a>
                <a href={member.linkedin} className="team-linkedin" target="_blank" rel="noreferrer">
                  LinkedIn <Icon name="arrow" size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Hidden until real quotes are added to `testimonials` in content.ts.
export function Customers() {
  if (testimonials.length === 0) return null;
  return (
    <section className="section" id="customers">
      <div className="container">
        <div className="section-heading reveal">
          <h2 data-parallax style={depth(28)}>What our customers say</h2>
        </div>
        <div className="quotes">
          {testimonials.map((item, index) => (
            <figure key={item.name} className="quote reveal" style={stagger(index)}>
              <blockquote>“{item.quote}”</blockquote>
              <figcaption>
                <strong>{item.name}</strong>
                <span>{item.business}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="section" id="faq">
      <div className="container container--narrow">
        <div className="section-heading reveal">
          <h2 data-parallax style={depth(28)}>Questions</h2>
        </div>
        <div className="faq">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              // The reveal sits on a wrapper whose class never changes; React would otherwise
              // drop the reveal--visible class added by the observer each time the item toggles.
              <div key={faq.question} className="reveal" style={stagger(index)}>
                <div className={`faq__item${open ? ' faq__item--open' : ''}`}>
                  <button
                    type="button"
                    className="faq__question"
                    aria-expanded={open}
                    aria-controls={`faq-${index}`}
                    onClick={() => setOpenIndex(open ? null : index)}
                  >
                    {faq.question}
                    <Icon name="plus" size={20} />
                  </button>
                  <div id={`faq-${index}`} className="faq__answer" hidden={!open}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
