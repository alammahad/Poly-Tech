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

export type ProjectGroupId = 'leads' | 'calling' | 'messaging' | 'data';

// The /work page shows projects under these headings, in this order.
export const projectGroups: { id: ProjectGroupId; icon: IconName; title: string; text: string }[] = [
  {
    id: 'leads',
    icon: 'search',
    title: 'Leads and lead data',
    text: 'Finding new leads, keeping the list clean and getting every lead’s details to the right place the moment they arrive.',
  },
  {
    id: 'calling',
    icon: 'phone',
    title: 'AI calling',
    text: 'Voice agents that call new leads back in minutes and answer the phone when the team can’t, plus the prompts that make them sound right and the reports that show how every call went.',
  },
  {
    id: 'messaging',
    icon: 'chat',
    title: 'Client messaging and follow-ups',
    text: 'Confirmations, reminders, replies and follow-ups that go out on time, on every channel, without anyone pressing send.',
  },
  {
    id: 'data',
    icon: 'grid',
    title: 'Documents, data and dashboards',
    text: 'Turning PDFs and scattered tables into clean, structured data the team can search and act on.',
  },
];

export type Project = {
  id: string;
  group: ProjectGroupId;
  icon: IconName;
  title: string;
  category: string;
  text: string;
  // What the client was struggling with before we built it.
  problem?: string[];
  flow: string[];
  // What the project's own report tracks.
  report?: string[];
  result: string;
  services: string[];
  // The tools it's built on.
  tools?: string[];
  // A screenshot of the real workflow, from /public/work.
  screenshot?: { src: string; alt: string };
  // Who we built it for, without naming them ("a clinic"). Shown as "Built for a client" when left out.
  client?: string;
};

// Automations we've built and run for clients. Client names are left out on purpose.
export const projects: Project[] = [
  {
    id: 'lead-discovery',
    group: 'leads',
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
    group: 'leads',
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
    id: 'survey-webhook-sync',
    group: 'leads',
    icon: 'link',
    title: 'Survey lead sync',
    category: 'Integrations',
    text: 'The moment someone submits a survey, they’re tagged in the CRM and their answers are sent by webhook straight to the client’s other app. No exports, no uploads, and the data is ready to use as soon as it arrives.',
    problem: [
      'Survey answers were exported and uploaded to another system by hand.',
      'The other tools only got the data hours or days later, holding up the next step.',
      'There was no reliable way to see in the CRM who had finished the survey.',
    ],
    flow: ['Survey submitted', 'Tag contact', 'Send by webhook', 'Ready in the other app'],
    report: ['Surveys submitted per day', 'Contacts tagged', 'Records sent to the other app'],
    result: 'Survey data lands in the other app instantly, every respondent is easy to target in the next campaign, and more steps can be added later without starting over.',
    services: ['Automation', 'CRM'],
    tools: ['GoHighLevel', 'Webhooks'],
    screenshot: {
      src: '/work/survey-sync-workflow.jpg',
      alt: 'GoHighLevel workflow: a Survey Submitted trigger, then Add Tag, then Webhook.',
    },
  },
  {
    id: 'outbound-calling',
    group: 'calling',
    icon: 'phone',
    title: 'Outbound calling agent',
    category: 'AI calling · Outbound',
    text: 'An AI voice agent that calls new leads within minutes of a form being filled in, and works through follow-up lists during calling hours. It introduces the business, asks the qualifying questions, books a meeting or a callback, and leaves a voicemail when nobody picks up.',
    flow: ['New lead', 'AI call', 'Qualify', 'Book meeting', 'Update CRM'],
    report: ['Calls made, answered and missed', 'Answer rate and booking rate', 'Outcome and summary of every call', 'Average call length and cost', 'Retries and callbacks due'],
    result: 'Every new lead gets a call while they’re still interested, and only qualified ones reach the sales team.',
    services: ['AI calling', 'CRM'],
  },
  {
    id: 'inbound-calling',
    group: 'calling',
    icon: 'headset',
    title: 'Inbound calling agent',
    category: 'AI calling · Inbound',
    text: 'An AI receptionist that answers the business line when the team is busy or the office is closed. It answers questions about prices, hours and services, books appointments straight into the calendar, takes messages, and transfers urgent calls to a person.',
    flow: ['Incoming call', 'Answer questions', 'Book or take message', 'Transfer if urgent', 'Summary to team'],
    report: ['Calls answered, by hour of day', 'After-hours calls handled', 'Appointments booked', 'Calls transferred to staff', 'Top reasons people called'],
    result: 'No more calls going to voicemail, and every call ends with a written summary.',
    services: ['AI calling', 'Automation'],
  },
  {
    id: 'call-prompts',
    group: 'calling',
    icon: 'sparkle',
    title: 'Voice agent prompts and call scripts',
    category: 'AI calling · Prompts',
    text: 'We write and tune the prompts behind every voice agent: how it introduces the business, the questions it asks, the answers it gives, how it handles objections and off-topic questions, when it books, and when it hands the call to a person. Each prompt is tested on real calls and adjusted until the agent sounds natural and stays on script.',
    flow: ['Learn the business', 'Write the prompt', 'Test calls', 'Review transcripts', 'Fine-tune'],
    result: 'An agent that sounds like part of the team, gives the right answers and knows when to pass the call on.',
    services: ['AI calling'],
  },
  {
    id: 'call-reporting',
    group: 'calling',
    icon: 'chart',
    title: 'Call reporting',
    category: 'AI calling · Reporting',
    text: 'Every call the AI makes or answers is logged with its transcript, summary, outcome, length and cost, then pulled into a daily report and a live dashboard. Inbound and outbound calls sit side by side, so the team can see what’s working and which leads still need a follow-up.',
    flow: ['Call ends', 'Log transcript and outcome', 'Sort by result', 'Daily report', 'Flag follow-ups'],
    report: ['Calls by day and by hour', 'Answered, missed and voicemail', 'Bookings and transfers', 'Call length and cost', 'Top reasons people called', 'Leads waiting for a callback'],
    result: 'The whole calling operation in one view every morning, without anyone listening back through recordings.',
    services: ['AI calling', 'CRM'],
  },
  {
    id: 'appointment-automation',
    group: 'messaging',
    icon: 'calendar',
    title: 'End-to-end appointment automation',
    category: 'Appointments',
    text: 'Every booking now looks after itself. The client gets an instant confirmation by email and SMS, a reminder 24 hours and again 1 hour before, and a review request once the appointment is over. The team is alerted to each new booking, and the opportunity moves to the right stage on its own.',
    problem: [
      'Clients forgot their appointments because nothing reminded them.',
      'Staff confirmed every booking by hand, which slowed down replies to new leads.',
      'Follow-ups and review requests after appointments only happened sometimes, so reviews stayed low.',
    ],
    flow: ['Booking made', 'Confirm by email and SMS', 'Remind 24h and 1h before', 'Alert the team', 'Ask for a review'],
    report: ['Bookings confirmed', 'Reminders sent', 'Review requests sent', 'Opportunity stage of each client'],
    result: 'Fewer no-shows, no more confirming by hand, and a steady flow of reviews after every visit.',
    services: ['Automation', 'CRM'],
    tools: ['GoHighLevel', 'Email', 'SMS'],
    client: 'a clinic',
    screenshot: {
      src: '/work/appointment-workflow.jpg',
      alt: 'GoHighLevel workflow: an appointment trigger, a confirmation email, reminders by email and SMS 24 hours and 1 hour before, then an internal notification.',
    },
  },
  {
    id: 'review-request',
    group: 'messaging',
    icon: 'star',
    title: 'Client review requests',
    category: 'Reviews',
    text: 'Once a job is done, the customer gets a text with a link to leave a Google review, followed by an email. If they click the link, their opportunity in the CRM is updated straight away. If they don’t, the workflow waits and follows up by email and SMS, with one last nudge 7 days later.',
    problem: [
      'Reviews were asked for by hand and only now and then, so very few came in.',
      'When a customer ignored the first request, nobody followed up.',
      'There was no record in the CRM of who had engaged with a review request.',
    ],
    flow: ['Job done', 'Text the review link', 'Clicked: update CRM', 'Not yet: email and SMS', 'Final nudge after 7 days'],
    report: ['Review requests sent', 'Review links clicked', 'Follow-ups sent', 'Customers still to respond'],
    result: 'A steady, predictable flow of Google reviews without anyone having to remember to ask, and every engaged customer marked in the pipeline.',
    services: ['Automation', 'CRM'],
    tools: ['GoHighLevel', 'SMS', 'Email', 'Google reviews'],
    screenshot: {
      src: '/work/review-request-workflow.jpg',
      alt: 'GoHighLevel workflow: an SMS and a wait, then a branch: if the review link is clicked the opportunity is updated, otherwise email and SMS follow-ups go out, with another wait of 7 days.',
    },
  },
  {
    id: 'multi-channel-replies',
    group: 'messaging',
    icon: 'messages',
    title: 'Multi-channel auto-replies',
    category: 'Messaging',
    text: 'Messages from Google, Facebook Messenger, Instagram and the website chat all land in one inbox. Common questions are recognised by keyword and answered instantly, day or night, with the same clear answer on every channel, and the team can pick up any conversation from there.',
    problem: [
      'Customers waited hours for answers to simple questions.',
      'Messages sent after hours got no reply, and those leads went elsewhere.',
      'Staff typed the same answers to the same questions all day instead of handling bookings.',
    ],
    flow: ['Message arrives', 'Spot the question', 'Send the answer', 'Log in one inbox', 'Team follows up'],
    report: ['Messages answered, by channel', 'After-hours replies sent', 'Most asked questions', 'Conversations waiting for a person'],
    result: 'Every customer gets an answer in seconds on whichever app they used, and the team only handles what needs a person.',
    services: ['Chatbot', 'Automation', 'CRM'],
    tools: ['GoHighLevel', 'Google Business Profile', 'Messenger', 'Instagram', 'Website chat'],
    screenshot: {
      src: '/work/faq-auto-reply-workflow.jpg',
      alt: 'GoHighLevel FAQ auto-reply workflow: triggers for Google, website chat, Instagram and Facebook messages, a keyword condition, then replies by SMS, Messenger, Instagram DM and Google message.',
    },
  },
  {
    id: 'email-automation',
    group: 'messaging',
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
    group: 'messaging',
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
    group: 'messaging',
    icon: 'chat',
    title: 'Website chatbot',
    category: 'Chat',
    text: 'A chat assistant trained on the business’s products and prices that answers questions at any hour, collects the visitor’s details and passes them on as a lead, handing over to a person when it should.',
    flow: ['Visitor question', 'AI answer', 'Collect details', 'New lead'],
    report: ['Conversations per day', 'Leads captured', 'Chats handed to a person', 'Most asked questions'],
    result: 'Questions get answered at midnight and the lead is waiting in the morning.',
    services: ['Chatbot', 'Website', 'CRM'],
  },
  {
    id: 'document-parser',
    group: 'data',
    icon: 'file',
    title: 'Patient document parser',
    category: 'Document AI',
    text: 'Medical PDFs are read automatically from start to finish. AWS Textract pulls out the text and tables, Claude Haiku turns them into clean, structured patient data, and the results are saved to a database and shown in a custom dashboard the team can search and review.',
    flow: ['Upload PDF', 'Read with Textract', 'Structure with AI', 'Save to database', 'Review in dashboard'],
    result: 'Patient details come out of PDFs ready to use without anyone retyping them, on a full stack deployed to AWS and protected behind CloudFront.',
    services: ['Automation', 'Website'],
    client: 'a healthcare client',
    tools: ['AWS Textract', 'Claude Haiku', 'Flask', 'HTML, CSS and JavaScript', 'AWS RDS', 'AWS EC2', 'CloudFront'],
  },
  {
    id: 'airtable-dashboard',
    group: 'data',
    icon: 'grid',
    title: 'Multi-base Airtable dashboard',
    category: 'Dashboards',
    text: 'The client’s data was spread across several Airtable bases and tables. We cleaned each table first, used Airtable automations to bring everything together into one unified table, and built a client-facing dashboard on top of it.',
    flow: ['Clean each table', 'Sync with automations', 'Merge into one table', 'One live dashboard'],
    result: 'One workspace that shows the whole operation, with no more cross-referencing between bases.',
    services: ['Automation'],
    tools: ['Airtable', 'Airtable Automations'],
  },
];

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

// Headline numbers in the homepage "Our work" section. Most are counted from the lists above, so they stay
// right as projects are added. Add real totals here (customers served, calls handled...) as you track them.
export const workStats: { value: number; suffix?: string; label: string }[] = [
  { value: projects.length, label: 'Automation projects built for our customers' },
  { value: new Set(projects.flatMap((project) => project.tools ?? [])).size, suffix: '+', label: 'Tools and platforms connected' },
  { value: reports.length, label: 'Reporting automations ready to run' },
  { value: 24, suffix: '/7', label: 'Working for our customers, even after hours' },
];

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
