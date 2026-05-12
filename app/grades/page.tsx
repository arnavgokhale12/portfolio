import { Metadata } from "next";
import { Award, BookOpen, GraduationCap } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "MS Economics Grades",
  description: `${siteConfig.name}'s finalized Texas A&M MS Economics grade snapshot.`,
};

const finalizedCourses = [
  {
    code: "ECMT 674",
    title: "Economic Forecasting",
    credits: 3,
    grade: "A",
  },
  {
    code: "ECON 611",
    title: "Foundations of Macroeconomic Theory",
    credits: 3,
    grade: "A",
  },
  {
    code: "ECON 663",
    title: "International Transfer Pricing",
    credits: 3,
    grade: "B",
  },
  {
    code: "ECON 680",
    title: "Financial Economics",
    credits: 3,
    grade: "A",
  },
];

const gradePoints: Record<string, number> = {
  A: 4,
  B: 3,
  C: 2,
  D: 1,
  F: 0,
};

const totalCredits = finalizedCourses.reduce((sum, course) => sum + course.credits, 0);
const qualityPoints = finalizedCourses.reduce(
  (sum, course) => sum + gradePoints[course.grade] * course.credits,
  0
);
const semesterGpa = qualityPoints / totalCredits;
const gradeCounts = finalizedCourses.reduce<Record<string, number>>((counts, course) => {
  counts[course.grade] = (counts[course.grade] ?? 0) + 1;
  return counts;
}, {});

export default function GradesPage() {
  return (
    <div className="bg-gray-950">
      <section className="border-b border-gray-800 bg-gray-950">
        <div className="container-wide py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-400">
              Texas A&amp;M MS Economics
            </p>
            <h1 className="mb-5 text-4xl font-bold text-gray-100 md:text-5xl">
              Finalized Grade Snapshot
            </h1>
            <p className="text-lg leading-relaxed text-gray-400">
              Unofficial personal record of finalized graduate coursework grades.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-wide">
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-900/40 text-brand-400">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="text-3xl font-bold text-gray-100">{semesterGpa.toFixed(2)}</div>
              <div className="mt-1 text-sm text-gray-500">Semester GPA</div>
            </div>
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-900/40 text-brand-400">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="text-3xl font-bold text-gray-100">{totalCredits}</div>
              <div className="mt-1 text-sm text-gray-500">Finalized Credits</div>
            </div>
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-900/40 text-brand-400">
                <Award className="h-5 w-5" />
              </div>
              <div className="text-3xl font-bold text-gray-100">
                {gradeCounts.A ?? 0} A / {gradeCounts.B ?? 0} B
              </div>
              <div className="mt-1 text-sm text-gray-500">Grade Distribution</div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
            <div className="hidden grid-cols-4 border-b border-gray-800 bg-gray-900/80 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 sm:grid">
              <div>Course</div>
              <div className="col-span-2">Title</div>
              <div className="grid grid-cols-2 text-right">
                <span>Grade</span>
                <span>Credits</span>
              </div>
            </div>
            <div className="divide-y divide-gray-800">
              {finalizedCourses.map((course) => (
                <div
                  key={course.code}
                  className="grid gap-3 px-5 py-4 text-sm sm:grid-cols-4 sm:items-center sm:gap-0"
                >
                  <div className="font-mono font-semibold text-gray-200">{course.code}</div>
                  <div className="font-medium text-gray-100 sm:col-span-2 sm:pr-4">{course.title}</div>
                  <div className="grid grid-cols-2 items-center gap-3 sm:gap-0 sm:text-right">
                    <span className="font-semibold text-brand-300">
                      <span className="mr-2 text-xs font-medium uppercase tracking-wider text-gray-500 sm:hidden">
                        Grade
                      </span>
                      {course.grade}
                    </span>
                    <span className="text-gray-400">
                      <span className="mr-2 text-xs font-medium uppercase tracking-wider text-gray-500 sm:hidden">
                        Credits
                      </span>
                      {course.credits}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-5 text-sm text-gray-500">
            GPA uses standard 4.0 grade points and excludes courses without finalized grades.
          </p>
        </div>
      </section>
    </div>
  );
}
