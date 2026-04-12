"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GitHubCalendarProps {
  username: string;
}

export function GitHubCalendar({ username }: GitHubCalendarProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    async function fetchContributions() {
      try {
        // Using GitHub's GraphQL API via a proxy service
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );
        const data = await response.json();

        if (data.contributions) {
          const allDays: ContributionDay[] = [];
          data.contributions.forEach((week: { days: ContributionDay[] }) => {
            week.days.forEach((day: ContributionDay) => {
              allDays.push(day);
            });
          });
          setContributions(allDays.slice(-365)); // Last year
          setTotalContributions(data.total?.lastYear || allDays.reduce((sum, d) => sum + d.count, 0));
        }
      } catch (error) {
        console.error("Failed to fetch contributions:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchContributions();
  }, [username]);

  const getLevelColor = (level: number) => {
    const colors = [
      "bg-gray-800", // 0
      "bg-green-900", // 1
      "bg-green-700", // 2
      "bg-green-500", // 3
      "bg-green-400", // 4
    ];
    return colors[level] || colors[0];
  };

  // Group by weeks for display
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">GitHub Activity</h3>
        <span className="text-sm text-gray-400">
          {totalContributions.toLocaleString()} contributions in the last year
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-[3px] min-w-max">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`h-[10px] w-[10px] rounded-sm ${getLevelColor(day.level)} transition-colors hover:ring-1 hover:ring-white/30`}
                  title={`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 text-xs text-gray-500">
        <span>Less</span>
        <div className="flex gap-[3px]">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`h-[10px] w-[10px] rounded-sm ${getLevelColor(level)}`}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </motion.div>
  );
}
