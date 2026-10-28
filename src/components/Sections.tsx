import { useState, type CSSProperties } from 'react';
import { faqs, projects, reportDestinations, reports, services, steps, testimonials } from '../content';
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

// Homepage pointer to the /work page.
export function WorkTeaser() {
  return (
    <section className="section section--tint" id="work">
      <div className="container work-teaser">
        <div className="work-teaser__copy reveal">
          <h2 data-parallax style={depth(28)}>Our work</h2>
          <p>
            Lead discovery, outbound and inbound AI calling agents, email automations, chatbots, spam filtering and
            the daily reports behind all of them. See how each one works, step by step, on our work page.
          </p>
          <a href="/work" className="button button--primary">
            See our work <Icon name="arrow" size={18} />
          </a>
        </div>
        <ul className="work-teaser__list reveal reveal--scale">
          {projects.map((project) => (
            <li key={project.id}>
              <a href={`/work#${project.id}`}>
                <span className="work-teaser__icon">
                  <Icon name={project.icon} size={18} />
                </span>
                <span className="work-teaser__category">{project.category}</span>
                {project.title}
                <Icon name="arrow" size={16} />
              </a>
            </li>
          ))}
          <li>
            <a href="/work#reporting">
              <span className="work-teaser__icon">
                <Icon name="chart" size={18} />
              </span>
              <span className="work-teaser__category">Reporting</span>
              Reporting automations
              <Icon name="arrow" size={16} />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

// Heading at the top of the /work page.
export function WorkIntro() {
  return (
    <section className="work-intro" id="top">
      <div className="work-intro__glow" aria-hidden="true" />
      <div className="container">
        <a href="/" className="work-intro__back">
          &larr; Back to home
        </a>
        <span className="work-intro__eyebrow">Our work</span>
        <h1>
          Automations that run the busywork, <em>and report back every morning.</em>
        </h1>
        <p>
          Lead discovery, AI calling, email, chat and reporting, built and running for real businesses. Here&apos;s how
          each one works and what it tracks.
        </p>
        <nav className="work-intro__jump" aria-label="On this page">
          {projects.map((project) => (
            <a key={project.id} href={`#${project.id}`}>
              <Icon name={project.icon} size={15} />
              {project.title}
            </a>
          ))}
          <a href="#reporting">
            <Icon name="chart" size={15} />
            Reporting
          </a>
        </nav>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-heading reveal">
          <h2 data-parallax style={depth(28)}>Automation projects</h2>
          <p>Each one runs on its own and comes with its own report, so you always know what it did.</p>
        </div>
        <div className="projects projects--two">
          {projects.map((project, index) => (
            <article key={project.id} id={project.id} className="project reveal" style={stagger(index % 2)}>
              <div className="project__head">
                <span className="project__icon">
                  <Icon name={project.icon} size={24} />
                </span>
                <span className="project__category">{project.category}</span>
                <span className="project__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
              <ol className="project__flow" aria-label="How it works">
                {project.flow.map((stage, step) => (
                  <li key={stage}>
                    <b>{step + 1}</b>
                    {stage}
                  </li>
                ))}
              </ol>
              <div className="project__report">
                <span>In the report</span>
                <ul>
                  {project.report.map((line) => (
                    <li key={line}>
                      <Icon name="check" size={15} />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="project__result">
                <Icon name="sparkle" size={18} />
                {project.result}
              </p>
              <ul className="project__services" aria-label="Services involved">
                {project.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Bar heights for the little decorative chart on each report card.
const reportBars = [38, 54, 46, 70, 58, 82, 66, 90, 74];

export function Reporting() {
  return (
    <section className="section section--tint" id="reporting">
      <div className="container">
        <div className="section-heading reveal">
          <h2 data-parallax style={depth(28)}>Reporting automations</h2>
          <p>
            Reports that put themselves together. Your numbers are collected automatically and waiting for you every
            morning, so nobody has to copy figures between tabs again.
          </p>
        </div>
        <div className="projects projects--four">
          {reports.map((report, index) => (
            <article key={report.title} className="project report-card reveal" style={stagger(index % 4)}>
              <span className="project__icon">
                <Icon name={report.icon} size={22} />
              </span>
              <h3>{report.title}</h3>
              <p>{report.text}</p>
              <div className="report-card__bars" aria-hidden="true">
                {reportBars.map((_, bar) => (
                  <span key={bar} style={{ height: `${reportBars[(bar + index * 2) % reportBars.length]}%` }} />
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="report-delivery reveal">
          <span>Delivered to</span>
          <ul>
            {reportDestinations.map((destination) => (
              <li key={destination.label}>
                <Icon name={destination.icon} size={16} />
                {destination.label}
              </li>
            ))}
          </ul>
        </div>
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
