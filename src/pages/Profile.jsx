// SettingsPage.jsx

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  LogOut,
  Upload,
  X,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

export default function Profile() {
  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [marketingUpdates, setMarketingUpdates] =
    useState(false);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [showUploadBox, setShowUploadBox] =
    useState(false);

  const [selectedImage, setSelectedImage] =
    useState("");

  const [avatarLoading, setAvatarLoading] =
    useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const fileInputRef = useRef(null);

  async function handleRemoveAvatar() {
    try {
      setAvatarLoading(true);

      await axios.post(
        "https://lastnight-ai.onrender.com/api/auth/removeAvatar",
        {},
        {
          withCredentials: true,
        }
      );

      setSelectedImage("");
    } catch (error) {
      console.log(error);
    } finally {
      setAvatarLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const response = await axios.get(
        "https://lastnight-ai.onrender.com/api/auth/me",
        {
          withCredentials: true,
        }
      );

      setSelectedImage(
        response.data.user.avatar
      );
    } catch (error) {
      console.log(error);
    }
  }

  function handleFile(file) {
    if (!file) return;

    setSelectedFile(file);

    const imageUrl =
      URL.createObjectURL(file);

    setSelectedImage(imageUrl);
  }

  function handleInputChange(e) {
    const file = e.target.files[0];
    handleFile(file);
  }

  function handleDrop(e) {
    e.preventDefault();

    const file =
      e.dataTransfer.files[0];

    handleFile(file);
  }

  async function uploadProfilePicture() {
    try {
      setAvatarLoading(true);

      if (!selectedFile) {
        return alert(
          "Please select an image"
        );
      }

      const formData = new FormData();

      formData.append(
        "image",
        selectedFile
      );

      await axios.post(
        "https://lastnight-ai.onrender.com/api/upload/image",
        formData,
        {
          withCredentials: true,

          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      await getUser();

      setShowUploadBox(false);
    } catch (error) {
      console.log(error);
    } finally {
      setAvatarLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* NAVBAR */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            LastNight AI
          </h1>

          <div className="flex items-center gap-3 sm:gap-4">
            <button className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-medium transition hover:bg-zinc-800 sm:px-5 sm:text-sm">
              Dashboard
            </button>

            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-zinc-700 bg-zinc-900">
              {avatarLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-white" />
              ) : (
                <img
                  src={
                    selectedImage ||
                    "https://ui-avatars.com/api/?name=User"
                  }
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* TITLE */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Profile & Settings
          </h2>

          <p className="mt-3 text-sm text-zinc-400 sm:text-base lg:text-lg">
            Manage your account settings and
            preferences.
          </p>
        </div>

        {/* PROFILE CARD */}
        <section className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:p-6">
          <div className="flex flex-col gap-6">
            {/* TOP */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-zinc-700 bg-zinc-900">
                {avatarLoading ? (
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                ) : (
                  <img
                    src={
                      selectedImage ||
                      "https://ui-avatars.com/api/?name=User"
                    }
                    alt="profile"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-semibold">
                  Profile Picture
                </h3>

                <p className="mt-1 text-sm text-zinc-400 sm:text-base">
                  JPG, GIF or PNG. Max size
                  of 5MB.
                </p>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() =>
                      setShowUploadBox(
                        !showUploadBox
                      )
                    }
                    className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-medium transition hover:bg-zinc-800"
                  >
                    <Upload size={16} />
                    Upload New
                  </button>

                  <button
                    onClick={
                      handleRemoveAvatar
                    }
                    disabled={
                      avatarLoading
                    }
                    className="rounded-xl border border-red-900 bg-red-950/30 px-5 py-3 text-sm font-medium text-red-400 transition hover:bg-red-950/50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {avatarLoading
                      ? "Removing..."
                      : "Remove"}
                  </button>
                </div>
              </div>
            </div>

            {/* UPLOAD BOX */}
            {showUploadBox && (
              <div className="space-y-4">
                <div
                  onDragOver={(e) =>
                    e.preventDefault()
                  }
                  onDrop={handleDrop}
                  onClick={() =>
                    fileInputRef.current.click()
                  }
                  className="group relative cursor-pointer rounded-2xl border-2 border-dashed border-zinc-700 bg-black/40 p-6 transition hover:border-white hover:bg-zinc-900/40 sm:p-10"
                >
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={
                      handleInputChange
                    }
                    className="hidden"
                  />

                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-4 rounded-2xl border border-zinc-700 bg-zinc-900 p-4">
                      <ImageIcon
                        size={32}
                        className="text-zinc-300"
                      />
                    </div>

                    <h4 className="text-base font-semibold sm:text-lg">
                      Click to upload
                    </h4>

                    <p className="mt-2 text-sm text-zinc-400">
                      or drag and drop your
                      image here
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      PNG, JPG, GIF up to
                      5MB
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      setShowUploadBox(
                        false
                      );
                    }}
                    className="absolute right-3 top-3 rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* UPLOAD BUTTON */}
                <button
                  onClick={
                    uploadProfilePicture
                  }
                  disabled={
                    avatarLoading
                  }
                  className="flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
                >
                  {avatarLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Uploading...
                    </span>
                  ) : (
                    "Upload Profile Picture"
                  )}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ACCOUNT DETAILS */}
        <section className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-4 sm:p-6">
          <h3 className="text-2xl font-semibold sm:text-3xl">
            Account Details
          </h3>

          <div className="my-6 border-t border-zinc-800" />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                First Name
              </label>

              <input
                type="text"
                defaultValue="Alex"
                className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-zinc-600 sm:text-base"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Last Name
              </label>

              <input
                type="text"
                defaultValue="Chen"
                className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-zinc-600 sm:text-base"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Email Address
            </label>

            <input
              type="email"
              defaultValue="alex.chen@example.com"
              className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-zinc-600 sm:text-base"
            />
          </div>

          <button className="mt-8 w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 sm:w-fit sm:text-base">
            Save Changes
          </button>
        </section>

        {/* PREFERENCES */}
        <section className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-4 sm:p-6">
          <h3 className="text-2xl font-semibold sm:text-3xl">
            Preferences
          </h3>

          <div className="my-6 border-t border-zinc-800" />

          <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="text-lg font-medium">
                  Email Notifications
                </h4>

                <p className="mt-1 text-sm text-zinc-400 sm:text-base">
                  Receive emails when your
                  notes are ready.
                </p>
              </div>

              <Toggle
                enabled={
                  emailNotifications
                }
                setEnabled={
                  setEmailNotifications
                }
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="text-lg font-medium">
                  Marketing Updates
                </h4>

                <p className="mt-1 text-sm text-zinc-400 sm:text-base">
                  Receive tips, new
                  features, and promos.
                </p>
              </div>

              <Toggle
                enabled={
                  marketingUpdates
                }
                setEnabled={
                  setMarketingUpdates
                }
              />
            </div>
          </div>
        </section>

        {/* DANGER ZONE */}
        <section className="rounded-3xl border border-red-950 bg-red-950/20 p-4 sm:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-red-500">
                Danger Zone
              </h3>

              <p className="mt-2 text-sm text-zinc-400 sm:text-base">
                Sign out of your account or
                delete it permanently.
              </p>
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-800 bg-black px-5 py-3 font-medium text-red-400 transition hover:bg-red-950/20 sm:w-fit">
              <LogOut size={18} />
              Log Out
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

/* TOGGLE */
function Toggle({
  enabled,
  setEnabled,
}) {
  return (
    <button
      onClick={() =>
        setEnabled(!enabled)
      }
      className={`relative h-7 w-14 rounded-full transition ${
        enabled
          ? "bg-white"
          : "bg-zinc-800"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-black transition ${
          enabled
            ? "left-8"
            : "left-1"
        }`}
      />
    </button>
  );
}