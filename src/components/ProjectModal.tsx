import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { projects, type Project } from '../content';
import { Icon } from './Icon';

// Order of an item, so the popup's details can arrive one after another.
const order = (index: number) => ({ '--s': index }) as CSSProperties;

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// How long the popup takes to animate out before the dialog actually closes (matches the CSS).
const CLOSE_MS = 260;

// How long each step of the flow stays lit, and how long the finished run rests before starting again.
const STEP_MS = 1100;
const REST_MS = 2200;

// "Built for a client" (or "Built for a clinic") under a project's title.
export function ClientBadge({ project }: { project: Project }) {
  return (
    <span className="client-badge">
      <Icon name="users" size={14} />
      Built for {project.client ?? 'a client'}
    </span>
  );
}

// A project's flow, played step by step like the automation running. Loops while the popup is open.
function FlowRun({ project }: { project: Project }) {
  const steps = project.flow;
  // -1 while the popup is still animating in; steps.length once every step is done.
  const [active, setActive] = useState(() => (reducedMotion() ? steps.length : -1));

  useEffect(() => {
    if (reducedMotion()) return;
    const delay = active === -1 ? 1200 : active >= steps.length ? REST_MS : STEP_MS;
    const timer = window.setTimeout(() => setActive(active >= steps.length ? 0 : active + 1), delay);
    return () => window.clearTimeout(timer);
  }, [active, steps.length]);

  const finished = active >= steps.length;

  return (
    <div className={`flow-run${finished ? ' flow-run--done' : ''}`}>
      <div className="flow-run__status" aria-hidden="true">
        <span className="flow-run__light" />
        {finished ? 'Done. Running again shortly' : active < 0 ? 'Starting' : `Step ${active + 1} of ${steps.length}`}
      </div>
      <ol className="flow-run__steps" aria-label="How it works">
        {steps.map((stage, step) => {
          const state = step < active ? 'done' : step === active ? 'active' : 'waiting';
          return (
            <li key={stage} className={`flow-run__step flow-run__step--${state}`} style={order(step)}>
              <span className="flow-run__node">
                {state === 'done' ? <Icon name="check" size={14} /> : step + 1}
              </span>
              <span className="flow-run__label">{stage}</span>
              {step < steps.length - 1 && <span className="flow-run__wire" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
      <p className="flow-run__result">
        <Icon name="sparkle" size={18} />
        {project.result}
      </p>
    </div>
  );
}

// Full-size view of a workflow screenshot, opened on top of the project popup.
// Back, Esc or a click outside the picture returns to the project.
function Lightbox({ shot, title, onBack }: { shot: { src: string; alt: string }; title: string; onBack: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  const back = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(
      () => {
        dialog.current?.close();
        onBack();
      },
      reducedMotion() ? 0 : CLOSE_MS,
    );
  };

  return (
    <dialog
      ref={dialog}
      className={`lightbox${leaving ? ' lightbox--closing' : ''}`}
      aria-label={`${title}: workflow screenshot`}
      onClick={(event) => {
        if (event.target === event.currentTarget) back();
      }}
      onCancel={(event) => {
        event.preventDefault();
        back();
      }}
    >
      <div className="lightbox__bar">
        <button type="button" className="modal__nav lightbox__back" onClick={back}>
          <span className="modal__nav-arrow modal__nav-arrow--back">
            <Icon name="arrow" size={16} />
          </span>
          Back to project
        </button>
        <span className="lightbox__title">{title}</span>
        <button type="button" className="modal__close" onClick={back} aria-label="Back to project">
          <Icon name="close" size={20} />
        </button>
      </div>
      <img className="lightbox__img" src={shot.src} alt={shot.alt} />
    </dialog>
  );
}

export function ProjectModal({
  project,
  onClose,
  onNavigate,
}: {
  project: Project | undefined;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const element = dialog.current;
    if (!element || !project || element.open) return;
    element.showModal();
    document.documentElement.classList.add('modal-open');
  }, [project]);

  // Animates the popup out, closes it, then runs `after` (used to jump to the contact form).
  const close = (after?: () => void) => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(
      () => {
        dialog.current?.close();
        document.documentElement.classList.remove('modal-open');
        setClosing(false);
        onClose();
        after?.();
      },
      reducedMotion() ? 0 : CLOSE_MS,
    );
  };

  const index = project ? projects.indexOf(project) : -1;
  const go = (step: number) => onNavigate(projects[(index + step + projects.length) % projects.length].id);

  useEffect(() => {
    if (!project) return;
    const onKey = (event: KeyboardEvent) => {
      if (zoomed) return;
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // A click on the dialog itself (not the panel inside it) is a click on the blurred backdrop.
  const onBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <>
      <dialog
        ref={dialog}
        className={`modal${closing ? ' modal--closing' : ''}`}
        aria-labelledby="modal-title"
        onClick={onBackdrop}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
      >
        {project && (
          // Keyed by project, so moving to the next one replays every animation.
          <div key={project.id} className="modal__panel">
            <header className="modal__head">
              <span className="project__icon modal__icon">
                <Icon name={project.icon} size={26} />
              </span>
              <div className="modal__meta">
                <span className="project__category">{project.category}</span>
                <span className="modal__count">
                  {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
              </div>
              <button type="button" className="modal__close" onClick={() => close()} aria-label="Close">
                <Icon name="close" size={20} />
              </button>
            </header>

            <h2 id="modal-title" className="modal__title">
              {project.title.split(' ').map((word, position) => (
                <span key={position} style={order(position)}>
                  {word}{' '}
                </span>
              ))}
            </h2>
            <ClientBadge project={project} />
            <p className="modal__text">{project.text}</p>

            <div className="modal__body">
              <div className="modal__col">
                {project.problem && (
                  <section className="modal__block modal__problem">
                    <h3>The problem</h3>
                    <ul>
                      {project.problem.map((line, item) => (
                        <li key={line} style={order(item)}>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
                <section className="modal__block">
                  <h3>How it works</h3>
                  <FlowRun project={project} />
                </section>
              </div>

              <div className="modal__col">
                {project.screenshot && (
                  <button type="button" className="modal__shot" onClick={() => setZoomed(true)}>
                    <span className="project__shot-bar" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      The workflow we built for the client
                    </span>
                    <img src={project.screenshot.src} alt={project.screenshot.alt} />
                    <span className="project__shot-open">
                      <Icon name="search" size={14} /> View full size
                    </span>
                  </button>
                )}
                {project.report && (
                  <section className="modal__block modal__report">
                    <h3>In the report</h3>
                    <ul>
                      {project.report.map((line, item) => (
                        <li key={line} style={order(item)}>
                          <Icon name="check" size={15} />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
                <ul className="project__services modal__tags" aria-label="Services and tools involved">
                  {[...project.services, ...(project.tools ?? [])].map((tag, item) => (
                    <li
                      key={tag}
                      className={item >= project.services.length ? 'project__tool' : undefined}
                      style={order(item)}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <footer className="modal__foot">
              <button type="button" className="modal__nav" onClick={() => go(-1)}>
                <span className="modal__nav-arrow modal__nav-arrow--back">
                  <Icon name="arrow" size={16} />
                </span>
                Previous
              </button>
              <a
                href="#contact"
                className="button button--primary modal__cta"
                onClick={(event) => {
                  event.preventDefault();
                  close(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }));
                }}
              >
                Build one for my business <Icon name="arrow" size={18} />
              </a>
              <button type="button" className="modal__nav" onClick={() => go(1)}>
                Next
                <span className="modal__nav-arrow">
                  <Icon name="arrow" size={16} />
                </span>
              </button>
            </footer>
          </div>
        )}
      </dialog>
      {zoomed && project?.screenshot && (
        <Lightbox shot={project.screenshot} title={project.title} onBack={() => setZoomed(false)} />
      )}
    </>
  );
}
