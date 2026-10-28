import type { IconName } from './components/Icon';

export const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '/work', label: 'Our work' },
  { href: '#process', label: 'How we work' },
  { href: '#faq', label: 'FAQ' },
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
    text: 'Inbound, a voice assistant picks up when you can’t, answers the usual questions and books the appointment. Outbound, it calls new leads back within minutes and qualifies them.',
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

// Automations we've built and run for clients. Client names are left out on purpose.
export const projects = [
  {
    id: 'lead-discovery',
    icon: 'search',
    title: 'Lead discovery',
    category: 'Lead generation',
    text: 'Every morning the system searches the web area by area for businesses in a chosen industry, visits their websites to find a missing email or phone number, and checks that every email is real before saving it.',
    flow: ['Search', 'Find contacts', 'Remove duplicates', 'Verify email', 'Save lead'],
    report: ['New leads found per day', 'Emails found and verified', 'Risky and invalid emails', 'Duplicates skipped'],
    result: 'A fresh list of new leads every day, each with a checked email address.',
    services: ['Automation', 'CRM'],
  },
  {
    id: 'spam-detection',
    icon: 'shield',
    title: 'Spam lead detection',
    category: 'Data quality',
    text: 'Incoming form leads are checked before they reach the sales team. Test entries, internal emails, duplicates and obvious spam are filtered out, and only the first genuine enquiry from each person is kept.',
    flow: ['Form lead', 'Spam filters', 'Remove duplicates', 'Clean list'],
    report: ['Genuine leads per day', 'Spam and test entries removed', 'Duplicates merged', 'Leads by source'],
    result: 'Sales only call real people, and the lead numbers in every report can be trusted.',
    services: ['Automation', 'CRM'],
  },
  {
    id: 'outbound-calling',
    icon: 'phone',
    title: 'Outbound calling agent',
    category: 'AI calling \u00b7 Outbound',
    text: 'An AI voice agent that calls new leads within minutes of a form being filled in, and works through follow-up lists during calling hours. It introduces the business, asks the qualifying questions, books a meeting or a callback, and leaves a voicemail when nobody picks up.',
    flow: ['New lead', 'AI call', 'Qualify', 'Book meeting', 'Update CRM'],
    report: ['Calls made, answered and missed', 'Answer rate and booking rate', 'Outcome and summary of every call', 'Average call length and cost', 'Retries and callbacks due'],
    result: 'Every new lead gets a call while they\u2019re still interested, and only qualified ones reach the sales team.',
    services: ['AI calling', 'CRM'],
  },
  {
    id: 'inbound-calling',
    icon: 'headset',
    title: 'Inbound calling agent',
    category: 'AI calling \u00b7 Inbound',
    text: 'An AI receptionist that answers the business line when the team is busy or the office is closed. It answers questions about prices, hours and services, books appointments straight into the calendar, takes messages, and transfers urgent calls to a person.',
    flow: ['Incoming call', 'Answer questions', 'Book or take message', 'Transfer if urgent', 'Summary to team'],
    report: ['Calls answered, by hour of day', 'After-hours calls handled', 'Appointments booked', 'Calls transferred to staff', 'Top reasons people called'],
    result: 'No more calls going to voicemail, and every call ends with a written summary.',
    services: ['AI calling', 'Automation'],
  },
  {
    id: 'email-automation',
    icon: 'mail',
    title: 'Email automations',
    category: 'Email',
    text: 'The everyday emails someone used to send by hand: instant replies to new enquiries, quotes and proposals with the right attachment, appointment reminders, order updates and a follow-up when a customer goes quiet. Incoming emails are sorted and tagged so nothing sits unanswered.',
    flow: ['Trigger', 'Pick template', 'Personalise', 'Send', 'Follow up'],
    report: ['Emails sent, by type', 'Open and reply rates', 'Bounces and unsubscribes', 'Follow-ups due and sent'],
    result: 'Customers hear back straight away, and follow-ups no longer depend on someone remembering.',
    services: ['Automation', 'CRM'],
  },
  {
    id: 'outreach',
    icon: 'send',
    title: 'Automated outreach',
    category: 'Email campaigns',
    text: 'Verified leads are added to the CRM and sent a personal email campaign. The system then tracks opens, replies and bounces, schedules follow-ups and scores each lead so the hottest ones get attention first.',
    flow: ['Verified lead', 'Add to CRM', 'Send email', 'Track response', 'Follow up'],
    report: ['Sent, opened and replied', 'Bounced addresses removed', 'Lead score for each contact', 'Follow-up stage of each lead'],
    result: 'The team can see which emails worked, and bad addresses come off the list on their own.',
    services: ['Automation', 'CRM'],
  },
  {
    id: 'chatbot',
    icon: 'chat',
    title: 'Website chatbot',
    category: 'Chat',
    text: 'A chat assistant trained on the business\u2019s products and prices that answers questions at any hour, collects the visitor\u2019s details and passes them on as a lead, handing over to a person when it should.',
    flow: ['Visitor question', 'AI answer', 'Collect details', 'New lead'],
    report: ['Conversations per day', 'Leads captured', 'Chats handed to a person', 'Most asked questions'],
    result: 'Questions get answered at midnight and the lead is waiting in the morning.',
    services: ['Chatbot', 'Website', 'CRM'],
  },
] satisfies {
  id: string;
  icon: IconName;
  title: string;
  category: string;
  text: string;
  flow: string[];
  report: string[];
  result: string;
  services: string[];
}[];

// Reporting automations we offer, shown in their own section.
export const reports = [
  {
    icon: 'cart',
    title: 'Sales report',
    text: 'Orders, revenue and average order value for the day, pulled straight from your store. More than one store? Each gets its own row, plus a total.',
  },
  {
    icon: 'repeat',
    title: 'Refunds and disputes',
    text: 'Refunds processed, open chargebacks, the amount at risk and the reason behind each one, with a dispute rate so problems show up early.',
  },
  {
    icon: 'layers',
    title: 'Lead report',
    text: 'New leads by source, with test entries, spam and duplicates removed first, so the number you see is the number your team can actually call.',
  },
  {
    icon: 'phone',
    title: 'Calling report',
    text: 'Inbound and outbound AI calls side by side: answered and missed calls, call length, outcomes, appointments booked, transfers and what the calls cost.',
  },
  {
    icon: 'mail',
    title: 'Email report',
    text: 'Every automated email and campaign in one view: sent, opened, replied, bounced and unsubscribed, and which follow-ups are due.',
  },
  {
    icon: 'chat',
    title: 'Chatbot report',
    text: 'Conversations, leads captured, chats handed to a person and the questions people ask most, so you know what to add to your website.',
  },
  {
    icon: 'megaphone',
    title: 'Ad spend and return',
    text: 'What you spent on ads next to the orders and leads it brought in, so you can see what each sale or lead actually costs.',
  },
  {
    icon: 'users',
    title: 'Team performance',
    text: 'Calls made, follow-ups done and deals moved by each person on the team, so the weekly meeting starts with the numbers.',
  },
] satisfies { icon: IconName; title: string; text: string }[];

// Where finished reports are delivered.
export const reportDestinations: { icon: IconName; label: string }[] = [
  { icon: 'layers', label: 'A shared spreadsheet' },
  { icon: 'chart', label: 'A live dashboard' },
  { icon: 'mail', label: 'A morning email' },
  { icon: 'chat', label: 'A chat message' },
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
