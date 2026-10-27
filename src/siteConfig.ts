// Business details shown across the site. Replace the placeholders before publishing.
export const site = {
  name: 'Poly Tech',
  // The address shown on the site; Formspree's form settings control delivery.
  contactEmail: 'ai.deptpolytech@gmail.com',
  formEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim() ?? '',
  address: 'House 12, Street 4, Gulberg III, Lahore 54660, Pakistan',
  // Optional: a Calendly or Google Calendar booking link. Leave empty to use the contact form.
  bookingUrl: '',
};
