export const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'How we work' },
  { href: '/team', label: 'Team' },
  { href: '#faq', label: 'FAQ' },
];

export const team = [
  {
    name: 'Muhammad Arslan',
    role: 'Lead',
    photo: '/muhammad-arslan.png',
    email: 'ai.deptpolytech@gmail.com',
    linkedin: 'https://www.linkedin.com/in/marslanalvi/',
  },
  {
    name: 'Mahad Mehmood',
    role: 'Automation engineer',
    email: 'alammahad21@gmail.com',
    linkedin: 'https://www.linkedin.com/in/mahad-mehmood-5bb5042b1/',
  },
  {
    name: 'Muhammad Musab',
    role: 'Developer',
    email: 'musab.ahmed2077@gmail.com',
    linkedin: 'https://www.linkedin.com/in/muhammad-musab-37a2312a5',
  },
  {
    name: 'Awais Ahmed',
    role: 'Automation Engineer',
    email: 'ahmad2720000@gmail.com',
    linkedin: 'https://www.linkedin.com/in/awais-ahmad-396328316/',
  },
];

export const services = [
  {
    title: 'CRM',
    text: 'If your leads live in WhatsApp chats, notebooks and three different spreadsheets, we move them into one CRM and set it up the way your team already sells.',
    example: 'Example: a sales pipeline that shows who called, who got a quote and who still needs a follow-up.',
  },
  {
    title: 'Automation',
    text: 'The small jobs that eat your day, like sending quotes, reminders and thank-you messages, can run on their own once we connect your tools.',
    example: 'Example: a new website form goes into the CRM, the customer gets an email, and your team gets a WhatsApp alert.',
  },
  {
    title: 'AI calling',
    text: 'A voice assistant that picks up when you can’t, answers the usual questions, and books the appointment. It can also call new leads back within minutes.',
    example: 'Example: a clinic’s after-hours calls get answered and booked instead of going to voicemail.',
  },
  {
    title: 'Chatbot',
    text: 'A chat assistant for your website or WhatsApp, trained on your prices, services and FAQs, that hands the conversation to a person when it should.',
    example: 'Example: visitors ask about prices at midnight and leave their number for a call the next morning.',
  },
  {
    title: 'Website builder',
    text: 'A clean, fast website that explains what you do and makes it easy to contact you. You can edit the text yourself later.',
    example: 'Example: a five-page site with a contact form that feeds straight into your CRM.',
  },
];

export const steps = [
  {
    title: 'You email us',
    text: 'A few lines about your business and what’s getting in the way is enough. We reply within a working day.',
  },
  {
    title: 'We plan and build',
    text: 'We suggest what’s worth doing (and what isn’t), agree a price, and build it on the tools you already pay for.',
  },
  {
    title: 'We hand it over',
    text: 'We walk your team through it, write down how it works, and stick around for questions and changes.',
  },
];

// Real customer quotes. Add one per customer, with their permission, and the section appears on the site.
export const testimonials: { quote: string; name: string; business: string }[] = [];

export const faqs = [
  {
    question: 'How do I get started?',
    answer: 'Send us an email or use the form at the bottom of this page. We usually reply the same day.',
  },
  {
    question: 'Do I need to be good with technology?',
    answer: 'No. We do the setup and show you how to use it in plain language. If something breaks, you email us.',
  },
  {
    question: 'Can I start with just one thing?',
    answer: 'Yes, and we often recommend it. Many clients start with a CRM or a chatbot and add more later.',
  },
  {
    question: 'How long does it take?',
    answer: 'A chatbot or a simple website is usually ready in about a week. Bigger CRM and automation projects take two to four weeks.',
  },
  {
    question: 'Will it work with what I already use?',
    answer: 'Almost always. Tell us your tools (Gmail, WhatsApp, Google Calendar, HubSpot and so on) and we’ll say upfront if anything won’t fit.',
  },
];
