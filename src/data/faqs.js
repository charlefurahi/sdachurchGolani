/**
 * FAQs — demo/seed data.
 *
 * Used as an API-fallback only: pages call the matching *Service.js first;
 * this file supplies content when the API has no records yet (e.g. during
 * early setup or local development without a backend). Once the API is
 * returning real records, this file is never read.
 *
 * Used by the Contact page.
 */

export const faqs = [
  {
    id: 1,
    question: 'What time are your Sabbath services?',
    answer: 'Our Sabbath School begins at 9:00 AM, followed by the Divine Service at 11:00 AM. We also have an afternoon programs at 2:30 PM. All services are held every Saturday.',
  },
  {
    id: 2,
    question: 'Where is Golani SDA Church located?',
    answer: 'We are located at Golani- Msewe, Near Mama Eliza Shopping Centre. You can find us on Google Maps by searching "Golani SDA Church." Ample parking is available on the church grounds.',
  },
  {
    id: 3,
    question: 'How do I become a member?',
    answer: 'We welcome anyone interested in joining our church family. You can speak with our pastor or church secretary after any service, or contact us via email. We offer baptismal classes for those who wish to be baptized.',
  },
  {
    id: 4,
    question: 'Do you have programs for children and youth?',
    answer: 'Yes! We have a vibrant Sabbath School for all age groups, a dedicated Youth Ministry, Pathfinders, and Adventurers clubs. Our youth programs meet weekly and also host special events throughout the year.',
  },
  {
    id: 5,
    question: 'How can I donate or support the church?',
    answer: 'You can give during our Sabbath services, via bank transfer to our church account, or through our online giving page. All funds are managed transparently by our elected treasurer.',
  },
  {
    id: 6,
    question: 'Do you offer pastoral counseling or prayer support?',
    answer: 'Yes. Our pastoral team is available for counseling, prayer, hospital visits, and home visits. Please contact the church office to schedule an appointment or to request prayer.',
  },
]