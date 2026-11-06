import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Departments', href: '#departments' },
  { label: 'Admissions', href: '#admissions' },
  { label: 'Feedback', href: '#feedback' },
]

const defaultContent = {
  highlights: [
    { label: 'Student support', value: '24/7 advising' },
    { label: 'Career placement', value: '92%' },
    { label: 'Campus programs', value: '27+' },
    { label: 'Application deadline', value: 'Rolling' },
  ],
  departments: [
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
  ],
  admissionsSteps: [
    'Review the program details and choose the pathway that matches your interests.',
    'Submit your application, transcripts, and supporting documents.',
    'Meet with an advisor for course planning and scholarship guidance.',
    'Accept your offer and complete enrollment orientation.',
  ],
}

const defaultForm = {
  name: '',
  email: '',
  message: '',
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [content, setContent] = useState(defaultContent)
  const [formData, setFormData] = useState(defaultForm)
  const [feedbackState, setFeedbackState] = useState({ type: 'idle', message: '' })

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch('/api/content')

        if (!response.ok) {
          throw new Error('Unable to fetch content.')
        }

        const data = await response.json()
        setContent(data)
      } catch (error) {
        console.warn('Falling back to default content.', error)
      }
    }

    loadContent()
  }, [])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Unable to send feedback.')
      }

      setFeedbackState({
        type: 'success',
        message: result.message || 'Feedback submitted successfully.',
      })
      setFormData(defaultForm)
    } catch (error) {
      setFeedbackState({
        type: 'error',
        message: error.message || 'Feedback could not be sent.',
      })
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#home" className="text-xl font-bold text-brand-900 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-brand-500">
            Northfield Academy
          </a>

          <button
            type="button"
            className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-900 md:hidden focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
            aria-label="Toggle navigation menu"
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            Menu
          </button>

          <nav
            id="primary-navigation"
            aria-label="Main navigation"
            className={`${menuOpen ? 'block' : 'hidden'} absolute left-4 right-4 top-full mt-2 rounded-lg border border-slate-200 bg-white p-4 shadow-soft md:static md:block md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
          >
            <ul className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
              {navItems.map((item) => (
                <li key={item.label} className="list-none">
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 transition hover:bg-brand-50 hover:text-brand-900 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section id="home" className="grid gap-8 rounded-3xl bg-brand-900 px-6 py-12 text-white shadow-soft md:grid-cols-2 md:px-10">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-brand-100">
              Student-centered learning
            </p>
            <h1 className="max-w-lg text-4xl font-bold leading-tight md:text-5xl">
              Build a future that is accessible, ambitious, and informed.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-200">
              Discover programs that combine practical skills, supportive advising, and a welcoming campus community.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#admissions"
                className="rounded-full bg-accent px-5 py-3 font-semibold text-slate-900 transition hover:bg-yellow-400 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Apply now
              </a>
              <a
                href="#about"
                className="rounded-full border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Learn more
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">Why students choose Northfield</h2>
            <ul className="mt-6 space-y-4">
              {content.highlights.map((item) => (
                <li key={item.label} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-b-0">
                  <span className="text-slate-200">{item.label}</span>
                  <span className="font-semibold text-white">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="about" className="mt-16 scroll-mt-24">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">About us</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">A welcoming place to learn and grow</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <h3 className="text-xl font-semibold text-brand-900">Active learning</h3>
              <p className="mt-3 text-slate-700">
                Classes blend theory with practical exploration so students can connect ideas to real-world impact.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <h3 className="text-xl font-semibold text-brand-900">Supportive staff</h3>
              <p className="mt-3 text-slate-700">
                Advising and mentoring teams help students navigate goals, schedules, and academic momentum.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <h3 className="text-xl font-semibold text-brand-900">Community impact</h3>
              <p className="mt-3 text-slate-700">
                Our graduates contribute to neighborhoods, industries, and public conversations with empathy and skill.
              </p>
            </article>
          </div>
        </section>

        <section id="departments" className="mt-16 scroll-mt-24">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Departments</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Programs designed for real opportunity</h2>
          </div>

          <ul className="grid gap-5 md:grid-cols-2">
            {content.departments.map((department) => (
              <li key={department.name} className="list-none rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                <h3 className="text-2xl font-semibold text-brand-900">{department.name}</h3>
                <p className="mt-3 text-slate-700">{department.description}</p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Focus</p>
                <p className="mt-2 text-base text-slate-800">{department.focus}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="admissions" className="mt-16 scroll-mt-24 rounded-3xl bg-slate-900 px-6 py-10 text-white md:px-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-100">Admissions</p>
              <h2 className="mt-2 text-3xl font-bold">A simple path to enrollment</h2>
              <ol className="mt-6 space-y-4 text-slate-200">
                {content.admissionsSteps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 font-semibold text-white">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold text-white">Need support?</h3>
              <p className="mt-4 text-slate-200">
                Talk with an admissions advisor about transfer credits, financial support, and pathway planning.
              </p>
              <a
                href="#feedback"
                className="mt-6 inline-flex rounded-full bg-white px-4 py-2 font-semibold text-slate-900 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Ask a question
              </a>
            </aside>
          </div>
        </section>

        <section id="feedback" className="mt-16 scroll-mt-24">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Feedback</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Tell us how we can improve</h2>
              <p className="mt-4 max-w-md text-slate-700">
                We value clear communication and thoughtful ideas from students, families, and community partners.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleFieldChange}
                    className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                    required
                  />
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFieldChange}
                    className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                    required
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFieldChange}
                  rows="5"
                  className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                  required
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="rounded-full bg-brand-700 px-5 py-3 font-semibold text-white transition hover:bg-brand-900 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
                >
                  Submit feedback
                </button>

                {feedbackState.message ? (
                  <p
                    className={feedbackState.type === 'success' ? 'text-sm font-medium text-emerald-700' : 'text-sm font-medium text-red-700'}
                    aria-live="polite"
                  >
                    {feedbackState.message}
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-lg font-semibold text-brand-900">Northfield Academy</p>
            <p className="mt-1 text-sm text-slate-600">Learning with purpose, support, and opportunity.</p>
          </div>

          <nav aria-label="Social links" className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-sm font-bold text-slate-700 hover:bg-brand-50 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-brand-500">f</a>
            <a href="#" aria-label="Twitter" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-sm font-bold text-slate-700 hover:bg-brand-50 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-brand-500">x</a>
            <a href="#" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-sm font-bold text-slate-700 hover:bg-brand-50 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-brand-500">◎</a>
            <a href="#" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-sm font-bold text-slate-700 hover:bg-brand-50 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-brand-500">in</a>
            <a href="#" aria-label="YouTube" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-sm font-bold text-slate-700 hover:bg-brand-50 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-brand-500">▶</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default App
