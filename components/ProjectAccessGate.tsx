"use client";

import { FormEvent, useMemo, useState } from "react";

interface ProjectAccessGateProps {
  title: string;
  destinationUrl: string;
}

const ACCESS_CODE = "7777";

export function ProjectAccessGate({ title, destinationUrl }: ProjectAccessGateProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const isReady = useMemo(() => code.trim().length > 0, [code]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (code.trim() !== ACCESS_CODE) {
      setError("Incorrect code. Try again.");
      return;
    }

    window.location.href = destinationUrl;
  }

  return (
    <section className="min-h-screen bg-gray-950 px-6 py-20">
      <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-400">
          Protected Project
        </p>
        <h1 className="mb-4 text-3xl font-bold text-gray-100">{title}</h1>
        <p className="mb-6 text-gray-400">
          Enter the access code to open the private prep site.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-300">
              Access code
            </span>
            <input
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                setError("");
              }}
              inputMode="numeric"
              autoComplete="off"
              className="w-full rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-lg font-semibold tracking-widest text-gray-100 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-500/20"
              placeholder="Enter code"
            />
          </label>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!isReady}
            className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Open Prep Site
          </button>
        </form>
      </div>
    </section>
  );
}
