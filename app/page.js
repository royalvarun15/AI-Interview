import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 sm:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-50 h-10 rounded-lg from-violet-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
            <Image src={'/HireMind.png'} alt="logo" width={200} height={200}
                    className="w-[150px]" />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a className="hover:underline" href="#features">
            Features
          </a>
          <a className="hover:underline" href="#how">
            How It Works
          </a>
          <a className="hover:underline" href="#pricing">
            Pricing
          </a>

          <Link
            href="/dashboard"
            className="ml-4 bg-violet-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-95"
          >
            Dashboard
          </Link>
        </nav>
      </header>

 
      <section className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-20">
        <div className="lg:col-span-7">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            AI-Powered <span className="text-violet-600">Interview</span> Assistant
            for Modern <span className="text-violet-600">Candidates</span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-xl">
            Let our AI voice agent conduct practice interviews, give feedback, and
            help you build confidence. Save time, reduce nervousness, and improve
            your interview performance.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="/dashboard/create-interview"
              className="inline-flex items-center gap-2 bg-violet-600 text-white px-5 py-3 rounded-lg shadow hover:opacity-95"
            >
              Create Mock Interview
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <a
              href="#demo"
              className="inline-flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-lg hover:shadow"
            >
              Watch Demo
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="font-semibold">Save Time</h3>
              <p className="mt-2 text-sm text-slate-500">Automate practice rounds and focus on improvements.</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="font-semibold">Data-Driven Feedback</h3>
              <p className="mt-2 text-sm text-slate-500">Get analytics about answers, tone, and pacing.</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="font-semibold">Reduce Anxiety</h3>
              <p className="mt-2 text-sm text-slate-500">Practice repeatedly in a safe, bias-free environment.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
            {/* Parent must be relative for Image fill */}
            <div className="relative w-full h-56 rounded-lg overflow-hidden from-violet-50 to-white border border-slate-100">
              <Image src="/images/hero-dashboard.png" alt="dashboard" fill style={{ objectFit: "cover" }} />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Welcome back, Sara!</div>
                <div className="text-xs text-slate-400">AI-driven practice interviews</div>
              </div>

              <button className="bg-violet-600 text-white px-3 py-2 rounded-lg text-sm">Create</button>
            </div>
          </div>
        </div>
      </section>


      <section id="features" className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <h2 className="text-3xl font-extrabold text-center">Streamline Your Interview Prep</h2>
          <p className="mt-3 text-center text-slate-500">
            AIMock helps you practice, analyze, and improve faster with intelligent feedback.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card title="Save Time" desc="Automate initial screening interviews and focus on final practice." />
            <Card title="Data-Driven Insights" desc="Get detailed analytics and candidate comparisons based on responses." />
            <Card title="Reduce Bias" desc="Standardized practice sessions help eliminate performance anxiety." />
          </div>
        </div>
      </section>

      <section id="how" className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-3xl font-extrabold">How AI Mock Interview Works</h3>
          <p className="mt-3 text-slate-500">Three simple steps to transform your preparation process.</p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <HowStep num={1} title="Create Interview" text="Set up job requirements and customize questions." />
            <HowStep num={2} title="Practice" text="Record answers at your convenience — our AI listens and scores." />
            <HowStep num={3} title="Review" text="Get transcripts, feedback, and action points to improve." />
          </div>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-6 sm:px-8 py-12 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} AI Mock Interview — Built with ♥
      </footer>
    </main>
  );
}

function Card({ title, desc }) {
  return (
    <div className="bg-white rounded-xl p-8 shadow border border-slate-100 text-center">
      <div className="w-14 h-14 mx-auto rounded-full bg-violet-50 flex items-center justify-center text-violet-600 font-semibold">✓</div>
      <h4 className="mt-4 font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-slate-500">{desc}</p>
    </div>
  );
}

function HowStep({ num, title, text }) {
  return (
    <div className="p-6">
      <div className="w-12 h-12 rounded-full bg-violet-100 mx-auto flex items-center justify-center font-bold text-violet-600">{num}</div>
      <h5 className="mt-4 font-semibold text-center">{title}</h5>
      <p className="mt-2 text-sm text-slate-500 text-center">{text}</p>
    </div>
  );
}
