import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, BookOpen } from "lucide-react";
import axios from "axios";

export default function Register() {

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response = await axios.post(
        "https://lastnight-ai.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      setError(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Background Glow */}
      <div className="absolute bottom-[-180px] left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl sm:bottom-[-250px] sm:h-[500px] sm:w-[500px]" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center gap-2 px-4 py-4 sm:px-6 sm:py-5">

        <BookOpen size={24} />

        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
          LastNight AI
        </h1>

      </nav>

      {/* Register Card */}
      <div className="relative z-10 flex items-center justify-center px-4 py-6 sm:px-6 sm:pt-10">

        <div className="w-full max-w-md rounded-2xl border border-zinc-900 bg-[#070707] p-5 shadow-2xl sm:p-8">

          {/* Heading */}
          <div className="text-center">

            <h1 className="text-2xl font-bold sm:text-3xl">
              Create an account
            </h1>

            <p className="mt-3 text-xs text-zinc-500 sm:text-sm">
              Start generating AI study notes today.
            </p>

          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8">

            {/* Error */}
            {
              error && (
                <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  ⚠️ {error}
                </div>
              )
            }

            {/* Full Name */}
            <div>

              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm outline-none transition focus:border-zinc-600 sm:text-base"
              />

            </div>

            {/* Email */}
            <div className="mt-6">

              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm outline-none transition focus:border-zinc-600 sm:text-base"
              />

            </div>

            {/* Password */}
            <div className="mt-6">

              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Create a strong password"
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 pr-12 text-sm outline-none transition focus:border-zinc-600 sm:text-base"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  {
                    showPassword
                      ? <EyeOff size={18} />
                      : <Eye size={18} />
                  }
                </button>

              </div>

            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
            >
              {
                loading
                  ? "Creating Account..."
                  : "Create Account"
              }
            </button>

            {/* Divider */}
            <div className="relative my-8">

              <div className="border-t border-zinc-900" />

              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-[#070707] px-3 text-[10px] text-zinc-500 sm:text-xs">
                OR SIGN UP WITH
              </span>

            </div>

            {/* Github Button */}
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-black py-3 text-sm font-medium transition hover:border-zinc-700 hover:bg-zinc-900 sm:text-base"
            >
              GitHub
            </button>

            {/* Footer */}
            <p className="mt-8 text-center text-xs text-zinc-500 sm:text-sm">

              Already have an account?{" "}

              <Link
                to="/login"
                className="font-semibold text-white hover:underline"
              >
                Sign in
              </Link>

            </p>

          </form>
        </div>
      </div>
    </div>
  );
}