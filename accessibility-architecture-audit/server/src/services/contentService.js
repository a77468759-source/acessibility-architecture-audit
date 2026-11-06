const departments = [
  {
    name: 'School of Design',
    description: 'Creative fields grounded in research, user empathy and accessible communication.',
    focus: 'UX design, media arts, and digital storytelling',
  },
  {
    name: 'School of Business',
    description: 'Career-ready learning for leadership, strategy, and sustainable growth.',
    focus: 'Marketing, operations, and entrepreneurship',
  },
  {
    name: 'School of Health Sciences',
    description: 'Practical pathways for community care, wellness and evidence-based practice.',
    focus: 'Public health, therapy, and patient support',
  },
  {
    name: 'School of Technology',
    description: 'Hands-on labs and learning opportunities for digital transformation.',
    focus: 'Software, data, and product systems',
  },
]

const admissionsSteps = [
  'Review the program details and choose the pathway that matches your interests.',
  'Submit your application, transcripts, and supporting documents.',
  'Meet with an advisor for course planning and scholarship guidance.',
  'Accept your offer and complete enrollment orientation.',
]

const highlights = [
  { label: 'Student support', value: '24/7 advising' },
  { label: 'Career placement', value: '92%' },
  { label: 'Campus programs', value: '27+' },
  { label: 'Application deadline', value: 'Rolling' },
]

export async function getContent() {
  return {
    departments,
    admissionsSteps,
    highlights,
  }
}
