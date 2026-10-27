import type { JSX } from 'react';

// Hand-built SVG illustrations, animated in index.css (see "Illustrations").
// Elements that animate sit in their own <g> so the CSS transform doesn't replace a positioning transform.

export function PersonScene() {
  return (
    <svg
      className="art art--person"
      viewBox="0 0 400 300"
      role="img"
      aria-label="A person working at a laptop while notifications for a new lead, a booked call and a sent email pop up"
    >
      <defs>
        <radialGradient id="person-backdrop" cx="0.5" cy="0.45" r="0.55">
          <stop offset="0" style={{ stopColor: 'var(--art-glow)' }} />
          <stop offset="1" style={{ stopColor: 'var(--art-glow)', stopOpacity: 0 }} />
        </radialGradient>
      </defs>
      <circle fill="url(#person-backdrop)" cx="200" cy="150" r="150" />
      <circle className="s-line" cx="200" cy="150" r="132" />

      {/* Notifications start behind the person and float up and out */}
      {[
        { key: 'a', label: 'New lead', dot: 'f-green' },
        { key: 'b', label: 'Call booked', dot: 'f-navy' },
        { key: 'c', label: 'Email sent', dot: 'f-bright' },
      ].map((note) => (
        <g key={note.key} transform="translate(200 150)">
          <g className={`notif notif--${note.key}`}>
            <rect className="f-surface s-line" x="-46" y="-13" width="92" height="26" rx="13" />
            <circle className={note.dot} cx="-31" cy="0" r="7" />
            <path className="s-white" d="M-34 0l2.2 2.2 4-4.4" />
            <text className="art-text art-text--strong" x="-19" y="3.5">
              {note.label}
            </text>
          </g>
        </g>
      ))}

      {/* Chair */}
      <rect className="f-line" x="148" y="118" width="104" height="112" rx="22" />

      {/* Plant, swaying */}
      <g className="plant">
        <path className="f-green" d="M101 192C86 174 86 152 98 138c10 16 10 36 3 54Z" />
        <path className="f-bright" d="M101 192c11-20 27-28 41-26-8 16-23 26-41 26Z" />
        <path className="f-green" d="M101 192c-11-10-27-14-38-10 8 12 24 16 38 10Z" />
      </g>
      <rect className="f-surface s-line" x="88" y="188" width="26" height="28" rx="4" />

      {/* Person, breathing gently */}
      <g className="person">
        <path className="s-arm" d="M174 170 157 208M226 170l17 38" />
        <path className="f-green" d="M160 222v-44c0-18 16-28 40-28s40 10 40 28v44Z" />
        <rect className="f-skin" x="192" y="132" width="16" height="22" rx="5" />
        <circle className="f-skin" cx="172" cy="114" r="5" />
        <circle className="f-skin" cx="228" cy="114" r="5" />
        <circle className="f-skin" cx="200" cy="112" r="28" />
        <path className="f-hair" d="M172 114c0-22 13-31 28-31 17 0 29 11 28 29-8-10-22-14-36-12-8 2-15 6-20 14Z" />
        <g className="blink">
          <ellipse className="f-hair" cx="190" cy="116" rx="2.6" ry="3" />
          <ellipse className="f-hair" cx="210" cy="116" rx="2.6" ry="3" />
        </g>
        <path className="s-hair" d="M192 126q8 6 16 0" />
      </g>

      {/* Desk and laptop (lid faces us) */}
      <rect className="f-navy" x="50" y="216" width="300" height="10" rx="5" />
      <rect className="f-navy" x="70" y="226" width="8" height="56" rx="3" />
      <rect className="f-navy" x="322" y="226" width="8" height="56" rx="3" />
      <rect className="f-navy-soft" x="148" y="160" width="104" height="56" rx="6" />
      <circle className="f-bright laptop-glow" cx="200" cy="188" r="7" />
      <rect className="f-steel" x="136" y="212" width="128" height="6" rx="3" />
      <circle className="f-skin hand hand--l" cx="157" cy="209" r="8" />
      <circle className="f-skin hand hand--r" cx="243" cy="209" r="8" />

      {/* Coffee */}
      <path className="s-steel steam" d="M297 184c-4-6 4-10 0-16" />
      <path className="s-steel steam steam--2" d="M306 184c-4-6 4-10 0-16" />
      <rect className="f-surface s-line" x="290" y="190" width="24" height="26" rx="4" />
      <path className="s-line-thick" d="M314 196h3a6 6 0 0 1 0 12h-3" />
    </svg>
  );
}

function CrmArt() {
  const columns = ['New', 'Quoted', 'Won'];
  return (
    <svg className="art" viewBox="0 0 240 150" role="img" aria-label="A lead card moving across a sales pipeline from New to Won">
      {columns.map((label, i) => (
        <g key={label}>
          <text className="art-text" x={14 + i * 76} y="15">
            {label}
          </text>
          <rect className="f-tint" x={10 + i * 76} y="22" width="68" height="120" rx="8" />
        </g>
      ))}
      <rect className="f-surface s-line" x="16" y="30" width="56" height="22" rx="5" />
      <rect className="f-line" x="22" y="39" width="30" height="4" rx="2" />
      <rect className="f-surface s-line" x="92" y="30" width="56" height="22" rx="5" />
      <rect className="f-line" x="98" y="39" width="36" height="4" rx="2" />
      <rect className="f-surface s-line" x="168" y="30" width="56" height="22" rx="5" />
      <rect className="f-line" x="174" y="39" width="26" height="4" rx="2" />

      <g className="crm-card">
        <rect className="f-surface s-green" x="16" y="88" width="56" height="26" rx="5" />
        <circle className="f-green" cx="27" cy="101" r="5.5" />
        <rect className="f-navy" x="37" y="96" width="28" height="4" rx="2" />
        <rect className="f-line" x="37" y="103" width="20" height="3.5" rx="1.75" />
      </g>
      <g transform="translate(220 64)">
        <g className="crm-check">
          <circle className="f-green" r="8" />
          <path className="s-white" d="M-3.5 0l2.4 2.4 4.6-4.8" />
        </g>
      </g>
    </svg>
  );
}

function AutomationArt() {
  const nodes = [
    { x: 40, label: 'Form', icon: 'M-6-7h12v14h-12ZM-3-3h6M-3 0h6M-3 3h4' },
    { x: 120, label: 'Email', icon: 'M-8-5h16v10h-16ZM-8-5l8 6 8-6' },
    { x: 200, label: 'Alert', icon: 'M-5 2v-3a5 5 0 0 1 10 0v3l2 2h-14ZM-2 6.5a2 2 0 0 0 4 0' },
  ];
  return (
    <svg className="art" viewBox="0 0 240 150" role="img" aria-label="A form, an email and an alert linked together, with signals flowing between them">
      <g transform="translate(120 30)">
        <g className="gear">
          <circle className="s-gear" r="11" />
          <circle className="f-surface s-line" r="5" />
        </g>
      </g>
      <path className="s-dash" d="M62 82h36M142 82h36" />
      <g className="flow-dot flow-dot--1">
        <circle className="f-green" cx="62" cy="82" r="4" />
      </g>
      <g className="flow-dot flow-dot--2">
        <circle className="f-green" cx="142" cy="82" r="4" />
      </g>
      {nodes.map((node, i) => (
        <g key={node.label} transform={`translate(${node.x} 82)`}>
          <g className={`pulse pulse--${i + 1}`}>
            <circle className="s-green" r="20" />
          </g>
          <circle className="f-surface s-line" r="20" />
          <path className="s-navy" d={node.icon} />
          <text className="art-text" x="0" y="38" textAnchor="middle">
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function CallingArt() {
  const bars = [10, 18, 28, 20, 34, 24, 14, 26, 12];
  return (
    <svg className="art" viewBox="0 0 240 150" role="img" aria-label="A ringing phone and a voice waveform, ending with an appointment booked">
      <g transform="translate(60 68)">
        <g className="ripple">
          <circle className="s-green" r="26" />
        </g>
        <g className="ripple ripple--2">
          <circle className="s-green" r="26" />
        </g>
        <circle className="f-green" r="26" />
        <g className="ring">
          <path
            className="s-white-thick"
            transform="translate(-12 -12)"
            d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"
          />
        </g>
      </g>
      {bars.map((height, i) => (
        <g key={i} transform={`translate(${116 + i * 11} 68)`}>
          <g className="wave" style={{ animationDelay: `${i * -0.13}s` }}>
            <rect className="f-navy" x="-2.5" y={-height / 2} width="5" height={height} rx="2.5" />
          </g>
        </g>
      ))}
      <g className="booked">
        <rect className="f-soft" x="104" y="108" width="114" height="24" rx="12" />
        <circle className="f-green" cx="118" cy="120" r="6" />
        <path className="s-white" d="M115.5 120l1.8 1.8 3.4-3.6" />
        <text className="art-text art-text--green" x="129" y="123.5">
          Appointment booked
        </text>
      </g>
    </svg>
  );
}

function ChatbotArt() {
  return (
    <svg className="art" viewBox="0 0 240 150" role="img" aria-label="A website chat window where a visitor asks a question and gets an instant answer">
      <rect className="f-surface s-line" x="30" y="8" width="180" height="134" rx="10" />
      <path className="f-green" d="M40 8h160a10 10 0 0 1 10 10v12H30V18A10 10 0 0 1 40 8Z" />
      <circle className="f-bright" cx="44" cy="19" r="3.5" />
      <text className="art-text art-text--white" x="54" y="22.5">
        Chat with us
      </text>

      <g className="chat chat--1">
        <rect className="f-tint" x="40" y="40" width="112" height="24" rx="12" />
        <text className="art-text art-text--strong" x="52" y="55.5">
          Are you open Sunday?
        </text>
      </g>
      <g className="chat chat--2">
        <rect className="f-green" x="96" y="72" width="104" height="24" rx="12" />
        <text className="art-text art-text--white" x="108" y="87.5">
          Yes, 10am to 4pm!
        </text>
      </g>
      <g className="chat chat--3">
        <rect className="f-tint" x="40" y="104" width="44" height="24" rx="12" />
        {[54, 62, 70].map((cx, i) => (
          <g key={cx} transform={`translate(${cx} 116)`}>
            <g className="typing" style={{ animationDelay: `${i * 0.15}s` }}>
              <circle className="f-steel" r="2.6" />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}

function WebsiteArt() {
  return (
    <svg className="art" viewBox="0 0 240 150" role="img" aria-label="A website being built block by block inside a browser window">
      <rect className="f-surface s-line" x="20" y="8" width="200" height="134" rx="8" />
      <path className="s-line" d="M20 24h200" />
      <circle className="f-line" cx="31" cy="16" r="3" />
      <circle className="f-line" cx="41" cy="16" r="3" />
      <circle className="f-line" cx="51" cy="16" r="3" />

      <g className="block block--1">
        <rect className="f-navy" x="30" y="32" width="28" height="6" rx="3" />
        <rect className="f-line" x="150" y="33" width="16" height="4" rx="2" />
        <rect className="f-line" x="172" y="33" width="16" height="4" rx="2" />
        <rect className="f-green" x="194" y="31" width="18" height="8" rx="4" />
      </g>
      <g className="block block--2">
        <rect className="f-soft" x="30" y="46" width="180" height="44" rx="6" />
        <rect className="f-navy" x="40" y="56" width="84" height="7" rx="3.5" />
        <rect className="f-steel" x="40" y="68" width="60" height="4" rx="2" />
        <rect className="f-green" x="40" y="77" width="32" height="8" rx="4" />
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i} className={`block block--${i + 3}`}>
          <rect className="f-tint" x={30 + i * 62} y="98" width="56" height="36" rx="6" />
          <rect className="f-line" x={38 + i * 62} y="108" width="30" height="4" rx="2" />
          <rect className="f-line" x={38 + i * 62} y="116" width="40" height="4" rx="2" />
        </g>
      ))}
      <g className="cursor">
        <path className="f-navy s-white" d="M0 0v16l4.5-4 3 7 3-1.4-3-6.6H14Z" />
      </g>
    </svg>
  );
}

const arts: Record<string, () => JSX.Element> = {
  CRM: CrmArt,
  Automation: AutomationArt,
  'AI calling': CallingArt,
  Chatbot: ChatbotArt,
  'Website builder': WebsiteArt,
};

export function ServiceArt({ title }: { title: string }) {
  const Art = arts[title];
  return Art ? <Art /> : null;
}
