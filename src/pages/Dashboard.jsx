import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudyGuideGenerator() {

  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const [pdfUrl, setPdfUrl] = useState(null);

  const [subject, setSubject] = useState(
    "Enter Your Subject"
  );

  const [topic, setTopic] = useState(
    "Enter Your Topic"
  );

  const [avatar, setAvatar] = useState("");

  const [includeDiagrams, setIncludeDiagrams] =
    useState(false);

  const [includeQuestions, setIncludeQuestions] =
    useState(false);

  const [isGenerating, setIsGenerating] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [loadingAvatar, setLoadingAvatar] =
    useState(true);

  const stages = [
    "Gathering context",
    "Structuring sections",
    "Drafting explanations",
    "Formatting PDF",
  ];

  // GET USER
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {

    try {

      setLoadingAvatar(true);

      const response = await axios.get(
        "https://lastnight-ai.onrender.com/api/auth/me",
        {
          withCredentials: true,
        }
      );

      setAvatar(
        response.data.user.avatar
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoadingAvatar(false);

    }
  }

  // GENERATE NOTES
  // GENERATE NOTES
  async function handleSubmit(e) {

    e.preventDefault();

    setIsGenerating(true);

    setProgress(10);

    setError(null);

    try {

      // STEP 1 → Generate PDF
      const response = await axios.post(
        "https://lastnight-ai.onrender.com/api/ai/generate-notes",
        {
          topic,
          course: subject,
          type: "one-night-prep",
          includeQuestions,
          includeDiagrams,
        },
        {
          withCredentials: true,
          responseType: "blob",
        }
      );

      setProgress(60);

      // STEP 2 → Convert response to PDF Blob
      const pdfBlob = new Blob(
        [response.data],
        {
          type: "application/pdf",
        }
      );

      // STEP 3 → Create File Object
      const pdfFile = new File(
        [pdfBlob],
        "study-notes.pdf",
        {
          type: "application/pdf",
        }
      );

      // STEP 4 → FormData
      const formData = new FormData();

      formData.append(
        "file",
        pdfFile
      );

      // STEP 5 → Upload PDF
      const uploadResponse = await axios.post(
        "https://lastnight-ai.onrender.com/api/upload/pdf",
        formData,
        {
          withCredentials: true,

          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setProgress(90);

      console.log(uploadResponse.data);

      /*
        EXPECTING:
        {
          pdfUrl: "https://..."
        }
      */

      // STEP 6 → Save Uploaded PDF URL
      setPdfUrl(
        uploadResponse.data.data.url
      );

      setProgress(100);

    } catch (err) {

      console.log(err);

      const message =
        err?.response?.data?.message ||
        "Failed to generate notes. Try again.";

      setError(message);

      setPdfUrl(null);

    } finally {

      setIsGenerating(false);

      setProgress(0);

    }
  }

  // PROGRESS BAR
  useEffect(() => {

    let interval;

    if (isGenerating) {

      interval = setInterval(() => {

        setProgress((prev) =>
          prev < 90
            ? prev + 5
            : prev
        );

      }, 300);
    }

    return () =>
      clearInterval(interval);

  }, [isGenerating]);

  const currentStage =
    progress < 25
      ? 0
      : progress < 50
        ? 1
        : progress < 75
          ? 2
          : 3;

  return (

    <div className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <header className="border-b border-white/10">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

          {/* LOGO */}
          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-zinc-900">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5 4.462 5 2 6.79 2 9v11c0-2.21 2.462-4 5.5-4 1.746 0 3.332.477 4.5 1.253m0-11C13.168 5.477 14.754 5 16.5 5 19.538 5 22 6.79 22 9v11c0-2.21-2.462-4-5.5-4-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>

            </div>

            <h1 className="text-lg font-bold sm:text-xl">
              LastNight AI
            </h1>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 sm:gap-3">

            <button className="rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-xs transition hover:bg-white/5 sm:px-4 sm:text-sm">
              History
            </button>

            {
              loadingAvatar ? (

                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-900">

                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                </div>

              ) : (

                <img
                  onClick={() =>
                    navigate("/profile")
                  }
                  src={
                    avatar ||
                    "https://ui-avatars.com/api/?name=User"
                  }
                  alt="profile"
                  className="h-10 w-10 cursor-pointer rounded-full border border-white/10 object-cover"
                />

              )
            }

          </div>

        </div>

      </header>

      {/* MAIN */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-4 sm:px-6 sm:py-6 lg:grid-cols-2">

        {/* LEFT PANEL */}
        <section className="rounded-3xl border border-white/10 bg-[#090909] p-5 sm:p-6">

          <div>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Generate Notes
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
              Enter your class and topic to generate a comprehensive study guide.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            {/* SUBJECT */}
            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Class / Subject
              </label>

              <input
                type="text"
                value={subject}
                onChange={(e) =>
                  setSubject(e.target.value)
                }
                className="h-14 w-full rounded-2xl border border-white/10 bg-black px-5 text-sm outline-none transition-all focus:border-white/20 sm:text-base"
              />

            </div>

            {/* TOPIC */}
            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Topic
              </label>

              <textarea
                rows={5}
                value={topic}
                onChange={(e) =>
                  setTopic(e.target.value)
                }
                className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-sm outline-none transition-all focus:border-white/20 sm:text-base"
              />

            </div>

            {/* TOGGLES */}
            <div className="space-y-5 rounded-2xl border border-white/10 bg-black p-5">

              {/* Diagrams */}
              <div className="flex items-center justify-between gap-4">

                <div>

                  <h3 className="font-medium text-white">
                    Include Diagrams
                  </h3>

                  <p className="text-sm text-zinc-400">
                    Add charts and visual explanations
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setIncludeDiagrams(
                      !includeDiagrams
                    )
                  }
                  className={`relative h-8 w-14 rounded-full transition-all duration-300 ${includeDiagrams
                      ? "bg-white"
                      : "bg-zinc-800"
                    }`}
                >

                  <span
                    className={`absolute top-1 h-6 w-6 rounded-full bg-black transition-all duration-300 ${includeDiagrams
                        ? "left-7"
                        : "left-1"
                      }`}
                  />

                </button>

              </div>

              {/* Questions */}
              <div className="flex items-center justify-between gap-4">

                <div>

                  <h3 className="font-medium text-white">
                    Include Questions
                  </h3>

                  <p className="text-sm text-zinc-400">
                    Add practice questions at the end
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setIncludeQuestions(
                      !includeQuestions
                    )
                  }
                  className={`relative h-8 w-14 rounded-full transition-all duration-300 ${includeQuestions
                      ? "bg-white"
                      : "bg-zinc-800"
                    }`}
                >

                  <span
                    className={`absolute top-1 h-6 w-6 rounded-full bg-black transition-all duration-300 ${includeQuestions
                        ? "left-7"
                        : "left-1"
                      }`}
                  />

                </button>

              </div>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isGenerating}
              className="flex h-14 w-full items-center justify-center rounded-2xl bg-white text-sm font-semibold text-black transition-all hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
            >

              {
                isGenerating ? (

                  <div className="flex items-center gap-2">

                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />

                    Generating...

                  </div>

                ) : (
                  "✦ Generate Notes"
                )
              }

            </button>

          </form>

        </section>

        {/* RIGHT PANEL */}
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#090909]">

          {/* ERROR */}
          {
            error && (
              <div className="m-4 rounded-xl border border-red-500/20 bg-red-950 px-4 py-3 text-sm text-red-300">
                ⚠️ {error}

                <button
                  onClick={() =>
                    setError(null)
                  }
                  className="ml-3 underline text-white"
                >
                  dismiss
                </button>

              </div>
            )
          }

          {/* TOP BAR */}
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-4 sm:px-6">

            <h3 className="text-sm font-semibold sm:text-lg">

              {
                isGenerating
                  ? "Generating Study Guide..."
                  : "Preview: Notes.pdf"
              }

            </h3>

            {
              !isGenerating && (
                <button
                  onClick={() => {

                    if (!pdfUrl) return;

                    const a =
                      document.createElement("a");

                    a.href = pdfUrl;

                    a.download =
                      "study-notes.pdf";

                    a.click();

                  }}
                  className="rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-xs transition hover:bg-white/5 sm:px-4 sm:text-sm"
                >
                  Download PDF
                </button>
              )
            }

          </div>

          {/* CONTENT */}
          <div className="h-[500px] p-4 sm:h-[calc(100vh-200px)] sm:p-6">

            {
              isGenerating ? (

                <div className="flex h-full flex-col items-center justify-center text-zinc-400">

                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent" />

                  <p className="mt-5 text-center text-sm sm:text-base">
                    {stages[currentStage]}...
                  </p>

                  {/* PROGRESS */}
                  <div className="mt-5 h-2 w-full max-w-md overflow-hidden rounded-full bg-zinc-800">

                    <div
                      style={{
                        width: `${progress}%`,
                      }}
                      className="h-full rounded-full bg-white transition-all duration-300"
                    />

                  </div>

                </div>

              ) : pdfUrl ? (

                <iframe
                  src={pdfUrl}
                  title="PDF Preview"
                  className="h-full w-full rounded-xl border border-white/10"
                />

              ) : (

                <div className="flex h-full items-center justify-center text-center text-sm text-zinc-500 sm:text-base">
                  No PDF generated yet
                </div>

              )
            }

          </div>

        </section>

      </main>

    </div>
  );
}