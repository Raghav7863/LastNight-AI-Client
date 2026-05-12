import {
  Eye,
  EyeOff,
  BookOpen
} from "lucide-react"

import { useNavigate } from "react-router-dom"

import axios from "axios"

import { useState } from "react"

export default function Login() {

  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(e) {

    e.preventDefault()

    setError("")
    setLoading(true)

    try {

      const response = await axios.post(
        "https://lastnight-ai.onrender.com/api/auth/login",
        {
          email,
          password
        },
        {
          withCredentials: true
        }
      )

      localStorage.setItem(
        "token",
        response.data.token
      )

      navigate("/dashboard")

    } catch (error) {

      console.log(error)

      setError(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      )

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Background Glow */}
      <div className="absolute bottom-[-250px] left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl sm:h-[500px] sm:w-[500px]" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center gap-2 px-4 py-5 sm:px-6">

        <BookOpen size={24} />

        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
          LastNight AI
        </h1>

      </nav>

      {/* Login Card */}
      <div className="relative z-10 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-10">

        <div className="w-full max-w-md rounded-2xl border border-zinc-900 bg-[#070707] p-5 shadow-2xl sm:p-8">

          {/* Heading */}
          <div className="text-center">

            <h1 className="text-2xl font-bold sm:text-3xl">
              Welcome back
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Enter your credentials to access your notes.
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8"
          >

            {/* Error */}
            {
              error && (
                <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  ⚠️ {error}
                </div>
              )
            }

            {/* Email */}
            <div>

              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm outline-none transition focus:border-zinc-600"
              />

            </div>

            {/* Password */}
            <div className="mt-6">

              <div className="mb-2 flex items-center justify-between">

                <label className="text-sm font-medium">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs text-zinc-400 transition hover:text-white"
                >
                  Forgot password?
                </button>

              </div>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 pr-12 text-sm outline-none transition focus:border-zinc-600"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-white"
                >
                  {
                    showPassword
                      ? <Eye size={18} />
                      : <EyeOff size={18} />
                  }
                </button>

              </div>

            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {
                loading
                  ? (
                    <div className="flex items-center justify-center gap-2">

                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />

                      Signing In...

                    </div>
                  )
                  : "Sign In"
              }
            </button>

            {/* Divider */}
            <div className="relative my-8">

              <div className="border-t border-zinc-900" />

              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-[#070707] px-3 text-[10px] text-zinc-500 sm:text-xs">
                OR CONTINUE WITH
              </span>

            </div>

            {/* Github Button */}
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-black py-3 text-sm font-medium transition hover:border-zinc-700 hover:bg-zinc-900"
            >
              GitHub
            </button>

            {/* Footer */}
            <p className="mt-8 text-center text-sm leading-relaxed text-zinc-500">

              Don't have an account?{" "}

              <button
                type="button"
                onClick={() =>
                  navigate("/register")
                }
                className="font-semibold text-white hover:underline"
              >
                Sign up
              </button>

            </p>

          </form>

        </div>

      </div>

    </div>
  )
}