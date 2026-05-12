import { Link } from "react-router-dom"
import {
  BookOpen,
  Zap,
  FileText,
  Layers,
  ArrowRight,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* BACKGROUND GLOW */}
      <div className="absolute left-1/2 top-[-150px] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl md:h-[700px] md:w-[700px]" />

      {/* NAVBAR */}
      <nav className="relative z-10 border-b border-zinc-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
              <BookOpen size={20} />
            </div>

            <h1 className="text-lg font-bold tracking-tight sm:text-xl md:text-2xl">
              LastNight AI
            </h1>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-2 sm:gap-4">

            <Link to="/login">
              <button className="rounded-xl border border-zinc-800 bg-black px-4 py-2 text-sm font-medium transition hover:border-zinc-700 hover:bg-zinc-900 sm:px-5 sm:py-2.5">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 sm:px-5 sm:py-2.5">
                Sign Up
              </button>
            </Link>

          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative z-10">

        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-16 text-center sm:px-6 md:py-24 lg:px-8 lg:py-32">

          {/* BADGE */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-4 py-2 text-xs text-zinc-300 sm:text-sm">

            <div className="h-2 w-2 rounded-full bg-green-500" />

            <span>
              AI-powered exam preparation
            </span>

          </div>

          {/* HEADING */}
          <h1 className="max-w-5xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">

            Generate Exam Notes
            <span className="block text-zinc-400">
              in Seconds with AI
            </span>

          </h1>

          {/* DESCRIPTION */}
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base md:text-lg">

            Turn any topic into clean,
            well-structured PDF study notes instantly.
            Perfect for last-night preparation,
            revision, and quick learning.

          </p>

          {/* CTA BUTTONS */}
          <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">

            <Link
              to="/register"
              className="w-full sm:w-auto"
            >
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200 sm:w-auto sm:px-10">

                Start for Free

                <ArrowRight size={18} />

              </button>
            </Link>

            <button className="rounded-2xl border border-zinc-800 bg-black px-8 py-4 text-sm font-semibold transition hover:border-zinc-700 hover:bg-zinc-900 sm:px-10">
              View Demo
            </button>

          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 pb-20">

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">

          {/* CARD 1 */}
          <div className="rounded-3xl border border-zinc-900 bg-[#070707] p-6 transition hover:border-zinc-800 hover:bg-zinc-950">

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
              <Zap size={24} />
            </div>

            <h3 className="text-xl font-semibold">
              Lightning Fast
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Generate complete study notes
              within seconds instead of spending
              hours writing manually.
            </p>

          </div>

          {/* CARD 2 */}
          <div className="rounded-3xl border border-zinc-900 bg-[#070707] p-6 transition hover:border-zinc-800 hover:bg-zinc-950">

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
              <FileText size={24} />
            </div>

            <h3 className="text-xl font-semibold">
              Export as PDF
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Download beautifully formatted
              PDFs ready for revision,
              sharing, or printing.
            </p>

          </div>

          {/* CARD 3 */}
          <div className="rounded-3xl border border-zinc-900 bg-[#070707] p-6 transition hover:border-zinc-800 hover:bg-zinc-950 md:col-span-2 lg:col-span-1">

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
              <Layers size={24} />
            </div>

            <h3 className="text-xl font-semibold">
              Works for Any Subject
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              From Computer Science to Physics,
              Biology, Chemistry, and beyond.
            </p>

          </div>

        </div>
      </section>
    </div>
  )
}