import Link from "next/link";

const trackerPath = "/course-tracker/index.html";

export default function GradesPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-gray-950 px-6 py-16">
      <meta httpEquiv="refresh" content={`0; url=${trackerPath}`} />
      <div className="max-w-md text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-400">
          Grades
        </p>
        <h1 className="mb-4 text-3xl font-bold text-gray-100">
          Opening Course Tracker
        </h1>
        <p className="mb-6 text-gray-400">
          The full semester plan, finalized grades, and future courses are in the course tracker.
        </p>
        <Link
          href={trackerPath}
          className="inline-flex rounded-lg bg-brand-600 px-5 py-3 font-medium text-white hover:bg-brand-700"
        >
          Open Course Tracker
        </Link>
      </div>
    </main>
  );
}
