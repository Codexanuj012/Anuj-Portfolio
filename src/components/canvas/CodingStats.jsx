
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  SiLeetcode,
  SiGithub,
  SiCodechef,
} from "react-icons/si";
import {
  FaCode,
  FaLaptopCode,
  FaFire,
  FaCalendarAlt,
  FaTrophy,
  FaExternalLinkAlt,
  FaSyncAlt,
  FaStar,
  FaExclamationCircle,
} from "react-icons/fa";

// ================= CONFIGURATION =================

const GITHUB_USERNAME = "Codexanuj012";
const LEETCODE_USERNAME = "Codex_Anuj";
const CODECHEF_USERNAME = "codex_anuj012";

const API = {
  githubProfile: `https://api.github.com/users/${GITHUB_USERNAME}`,
  githubRepos: `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
  githubEvents: `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`,
  leetcode: `https://leetcode-stats.tashif.codes/${LEETCODE_USERNAME}`,
};

// ================= API HELPERS =================

async function fetchJSON(url) {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(
      `${new URL(url).hostname}: HTTP ${response.status}`
    );
  }

  return response.json();
}

function formatNumber(value) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const number = Number(value);

  return Number.isFinite(number)
    ? number.toLocaleString("en-IN")
    : String(value);
}

function getNumber(...values) {
  for (const value of values) {
    if (value === null || value === undefined || value === "") {
      continue;
    }

    const number = Number(value);

    if (Number.isFinite(number)) return number;
  }

  return null;
}

function getObjects(payload) {
  const result = [];
  const queue = [payload];
  const visited = new Set();

  while (queue.length) {
    const item = queue.shift();

    if (!item || typeof item !== "object" || visited.has(item)) {
      continue;
    }

    visited.add(item);
    result.push(item);

    if (Array.isArray(item)) {
      queue.push(...item);
    } else {
      Object.values(item).forEach((value) => {
        if (value && typeof value === "object") {
          queue.push(value);
        }
      });
    }
  }

  return result;
}

function normalizeLeetCode(payload) {
  const objects = getObjects(payload);

  const readNumber = (...keys) => {
    for (const object of objects) {
      for (const key of keys) {
        const value = object?.[key];

        if (value === undefined || value === null || value === "") {
          continue;
        }

        const number = Number(value);

        if (Number.isFinite(number)) return number;
      }
    }

    return null;
  };

  let easy = readNumber("easySolved", "easy_solved");
  let medium = readNumber("mediumSolved", "medium_solved");
  let hard = readNumber("hardSolved", "hard_solved");

  let total = readNumber(
    "totalSolved",
    "total_solved",
    "problemsSolved",
    "problems_solved"
  );

  for (const object of objects) {
    const rows =
      object?.submitStats?.acSubmissionNum ??
      object?.acSubmissionNum;

    if (!Array.isArray(rows)) continue;

    rows.forEach((row) => {
      const difficulty = String(
        row?.difficulty ?? row?.name ?? ""
      ).toLowerCase();

      const count = getNumber(row?.count, row?.solved);

      if (count === null) return;

      if (difficulty === "easy") easy = count;
      if (difficulty === "medium") medium = count;
      if (difficulty === "hard") hard = count;
      if (difficulty === "all") total = count;
    });
  }

  if (
    total === null &&
    easy !== null &&
    medium !== null &&
    hard !== null
  ) {
    total = easy + medium + hard;
  }

  if (
    total === null &&
    easy === null &&
    medium === null &&
    hard === null
  ) {
    throw new Error(
      "LeetCode API response has no recognized statistics."
    );
  }

  return {
    total,
    easy,
    medium,
    hard,
    rating: readNumber("currentRating", "rating", "contestRating"),
    ranking: readNumber("ranking", "globalRanking", "global_ranking"),
    contests: readNumber(
      "totalContests",
      "attendedContestsCount",
      "contestsAttended"
    ),
  };
}

async function fetchLeetCodeStats() {
  const payload = await fetchJSON(API.leetcode);
  return normalizeLeetCode(payload);
}

// ================= REUSABLE COMPONENTS =================

function StatCard({ icon: Icon, label, value, color, subtitle }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="min-w-0 rounded-xl border border-white/10 bg-[#111827] p-4 sm:p-5"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-sm text-gray-400">{label}</p>
        <Icon className={`shrink-0 text-lg ${color}`} />
      </div>

      <p className="break-words text-2xl font-bold text-white sm:text-3xl">
        {value ?? "—"}
      </p>

      {subtitle && (
        <p className="mt-2 text-xs text-gray-500">{subtitle}</p>
      )}
    </motion.div>
  );
}

function PlatformHeader({ icon: Icon, title, url, color }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <Icon className={`shrink-0 text-2xl ${color}`} />
        <h3 className="truncate text-lg font-bold text-white">
          {title}
        </h3>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${title} profile`}
        className="shrink-0 text-gray-400 transition hover:text-cyan-400"
      >
        <FaExternalLinkAlt />
      </a>
    </div>
  );
}

function StatusMessage({ message, error = false }) {
  return (
    <div
      className={`flex items-start gap-2 rounded-lg border p-3 text-sm ${
        error
          ? "border-red-500/20 bg-red-500/5 text-red-300"
          : "border-white/10 bg-white/5 text-gray-400"
      }`}
    >
      {error && (
        <FaExclamationCircle className="mt-0.5 shrink-0" />
      )}
      <span className="break-words">{message}</span>
    </div>
  );
}

// ================= MAIN DASHBOARD =================

export default function CodingStats() {
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [errors, setErrors] = useState({});

  const [github, setGithub] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [events, setEvents] = useState([]);
  const [leetcode, setLeetcode] = useState(null);

  const loadStats = useCallback(async () => {
    setLoading(true);

    const nextErrors = {};

    const results = await Promise.allSettled([
      fetchJSON(API.githubProfile),
      fetchJSON(API.githubRepos),
      fetchJSON(API.githubEvents),
      fetchLeetCodeStats(),
    ]);

    const [
      profileResult,
      reposResult,
      eventsResult,
      leetcodeResult,
    ] = results;

    if (profileResult.status === "fulfilled") {
      setGithub(profileResult.value);
    } else {
      setGithub(null);
      nextErrors.github =
        profileResult.reason?.message || "Request failed";
    }

    if (
      reposResult.status === "fulfilled" &&
      Array.isArray(reposResult.value)
    ) {
      setRepositories(reposResult.value);
    } else {
      setRepositories([]);
      nextErrors.repositories =
        reposResult.reason?.message ||
        "Repository data unavailable";
    }

    if (
      eventsResult.status === "fulfilled" &&
      Array.isArray(eventsResult.value)
    ) {
      setEvents(eventsResult.value);
    } else {
      setEvents([]);
      nextErrors.events =
        eventsResult.reason?.message ||
        "Public activity unavailable";
    }

    if (leetcodeResult.status === "fulfilled") {
      setLeetcode(leetcodeResult.value);
    } else {
      setLeetcode(null);
      nextErrors.leetcode =
        leetcodeResult.reason?.message ||
        "LeetCode request failed";
    }

    setErrors(nextErrors);
    setLastUpdated(new Date());
    setLoading(false);
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // ================= GITHUB STATISTICS =================

  const totalStars = repositories.reduce(
    (sum, repo) => sum + (repo.stargazers_count || 0),
    0
  );

  const languageCounts = {};

  repositories.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] =
        (languageCounts[repo.language] || 0) + 1;
    }
  });

  const languages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  // Recent public GitHub events, not the official contributions calendar.
  const activityByDate = {};

  events.forEach((event) => {
    if (!event.created_at) return;

    const date = event.created_at.slice(0, 10);
    activityByDate[date] = (activityByDate[date] || 0) + 1;
  });

  const activityDays = Array.from({ length: 84 }, (_, index) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() - (83 - index));

    const dateString = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    return {
      date: dateString,
      count: activityByDate[dateString] || 0,
    };
  });

  const maxActivity = Math.max(
    1,
    ...activityDays.map((day) => day.count)
  );

  const activityColor = (count) => {
    if (count === 0) return "bg-[#21262d]";
    if (count <= maxActivity * 0.25) return "bg-[#0e4429]";
    if (count <= maxActivity * 0.5) return "bg-[#006d32]";
    if (count <= maxActivity * 0.75) return "bg-[#26a641]";
    return "bg-[#39d353]";
  };

  const activityWeeks = Array.from({ length: 12 }, (_, index) =>
    activityDays.slice(index * 7, index * 7 + 7)
  );

  const recentRepositories = [...repositories]
    .sort(
      (a, b) =>
        new Date(b.updated_at || 0) -
        new Date(a.updated_at || 0)
    )
    .slice(0, 4);

  const difficultyTotal =
    (leetcode?.easy || 0) +
    (leetcode?.medium || 0) +
    (leetcode?.hard || 0);

  const difficultyBar = (count, color) => {
    const percent =
      difficultyTotal > 0
        ? (count / difficultyTotal) * 100
        : 0;

    return (
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    );
  };

  // ================= UI =================

  return (
    <section
      id="coding-stats"
      className="w-full overflow-hidden bg-[#030712] px-3 py-12 text-white sm:px-5 sm:py-14 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400 sm:text-sm">
              Problem Solving & Development
            </p>

            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Coding <span className="text-cyan-400">Dashboard</span>
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              LeetCode and GitHub statistics
            </p>

            {lastUpdated && (
              <p className="mt-1 text-xs text-gray-500">
                Last checked: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={loadStats}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-white/10 bg-[#111827] px-4 py-2.5 text-sm font-semibold transition hover:border-cyan-400/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
          >
            <FaSyncAlt className={loading ? "animate-spin" : ""} />
            {loading ? "Refreshing..." : "Refresh Stats"}
          </button>
        </div>

        {/* TOP SUMMARY GRID */}

        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={FaLaptopCode}
            label="GitHub Repositories"
            value={formatNumber(github?.public_repos)}
            color="text-cyan-400"
            subtitle="Public repositories"
          />

          <StatCard
            icon={FaStar}
            label="GitHub Stars"
            value={formatNumber(github ? totalStars : null)}
            color="text-yellow-400"
            subtitle="Fetched public repositories"
          />

          <StatCard
            icon={FaCode}
            label="LeetCode Solved"
            value={formatNumber(leetcode?.total)}
            color="text-orange-400"
            subtitle="Accepted problems"
          />

          <StatCard
            icon={FaFire}
            label="Public GitHub Events"
            value={formatNumber(events.length)}
            color="text-emerald-400"
            subtitle="Events returned by GitHub"
          />
        </div>

        {/* MAIN RESPONSIVE GRID */}

        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
          {/* LEETCODE CARD */}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-w-0 rounded-xl border border-white/10 bg-[#111827] p-4 sm:p-5"
          >
            <PlatformHeader
              icon={SiLeetcode}
              title="LeetCode"
              url={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
              color="text-orange-400"
            />

            <p className="mb-4 text-sm text-gray-400">
              @{LEETCODE_USERNAME}
            </p>

            {errors.leetcode && (
              <div className="mb-4">
                <StatusMessage
                  error
                  message={`Unable to load LeetCode stats: ${errors.leetcode}`}
                />
              </div>
            )}

            {/* LeetCode main statistics */}

            <div className="mb-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/5 bg-black/20 p-3 sm:p-4">
                <p className="text-xs text-gray-400 sm:text-sm">
                  Questions Solved
                </p>

                <p className="mt-2 text-3xl font-extrabold sm:text-4xl">
                  {formatNumber(leetcode?.total)}
                </p>
              </div>

              <div className="rounded-lg border border-white/5 bg-black/20 p-3 sm:p-4">
                <p className="text-xs text-gray-400 sm:text-sm">
                  Contest Rating
                </p>

                <p className="mt-2 text-3xl font-extrabold sm:text-4xl">
                  {formatNumber(leetcode?.rating)}
                </p>
              </div>
            </div>

            {/* Difficulty distribution */}

            <h4 className="mb-4 text-sm font-semibold text-gray-300">
              Problem Difficulty
            </h4>

            <div className="space-y-4">
              {[
                {
                  label: "Easy",
                  value: leetcode?.easy,
                  color: "text-emerald-400",
                  bar: "bg-emerald-400",
                },
                {
                  label: "Medium",
                  value: leetcode?.medium,
                  color: "text-yellow-400",
                  bar: "bg-yellow-400",
                },
                {
                  label: "Hard",
                  value: leetcode?.hard,
                  color: "text-red-400",
                  bar: "bg-red-400",
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className={item.color}>{item.label}</span>
                    <span className="font-semibold text-gray-300">
                      {formatNumber(item.value)}
                    </span>
                  </div>

                  {difficultyBar(item.value || 0, item.bar)}
                </div>
              ))}
            </div>

            {/* Additional LeetCode statistics */}

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/5 bg-black/20 p-3">
                <p className="text-xs text-gray-500">Global Ranking</p>
                <p className="mt-1 break-words font-bold">
                  {formatNumber(leetcode?.ranking)}
                </p>
              </div>

              <div className="rounded-lg border border-white/5 bg-black/20 p-3">
                <p className="text-xs text-gray-500">Contests Attended</p>
                <p className="mt-1 break-words font-bold">
                  {formatNumber(leetcode?.contests)}
                </p>
              </div>
            </div>

            <a
              href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-400 transition hover:text-orange-300"
            >
              View LeetCode Profile <FaExternalLinkAlt />
            </a>
          </motion.div>

          {/* GITHUB PROFILE CARD */}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="min-w-0 rounded-xl border border-white/10 bg-[#111827] p-4 sm:p-5"
          >
            <PlatformHeader
              icon={SiGithub}
              title="GitHub"
              url={`https://github.com/${GITHUB_USERNAME}`}
              color="text-white"
            />

            <div className="mb-5 flex min-w-0 items-center gap-3 sm:gap-4">
              {github?.avatar_url ? (
                <img
                  src={github.avatar_url}
                  alt={`${GITHUB_USERNAME} avatar`}
                  className="h-14 w-14 shrink-0 rounded-full border border-white/10 sm:h-16 sm:w-16"
                />
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/5 sm:h-16 sm:w-16">
                  <SiGithub className="text-3xl" />
                </div>
              )}

              <div className="min-w-0">
                <h4 className="truncate text-lg font-bold">
                  {github?.name || GITHUB_USERNAME}
                </h4>

                <p className="truncate text-sm text-gray-400">
                  @{GITHUB_USERNAME}
                </p>

                {github?.bio && (
                  <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                    {github.bio}
                  </p>
                )}
              </div>
            </div>

            {errors.github && (
              <div className="mb-3">
                <StatusMessage error message={errors.github} />
              </div>
            )}

            {errors.repositories && (
              <div className="mb-3">
                <StatusMessage error message={errors.repositories} />
              </div>
            )}

            {/* GitHub profile stats */}

            <div className="mb-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-black/20 p-3 sm:p-4">
                <p className="text-xs text-gray-400 sm:text-sm">
                  Followers
                </p>
                <p className="mt-2 text-2xl font-bold">
                  {formatNumber(github?.followers)}
                </p>
              </div>

              <div className="rounded-lg bg-black/20 p-3 sm:p-4">
                <p className="text-xs text-gray-400 sm:text-sm">
                  Following
                </p>
                <p className="mt-2 text-2xl font-bold">
                  {formatNumber(github?.following)}
                </p>
              </div>
            </div>

            {/* Languages */}

            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <FaCode className="text-cyan-400" />
              Top Languages
            </h4>

            {languages.length ? (
              <div className="mb-5 flex flex-wrap gap-2">
                {languages.map(([language, count]) => (
                  <span
                    key={language}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300"
                  >
                    {language} · {count} repos
                  </span>
                ))}
              </div>
            ) : (
              <p className="mb-5 text-sm text-gray-500">
                {loading
                  ? "Loading languages..."
                  : "No language data available."}
              </p>
            )}

            <a
              href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              Explore Repositories <FaExternalLinkAlt />
            </a>
          </motion.div>
        </div>

        {/* COMPACT GITHUB HEATMAP BELOW BOTH CARDS */}

       
        {/* RECENT REPOSITORIES */}

        <div className="mt-5 rounded-xl border border-white/10 bg-[#111827] p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-2">
            <FaLaptopCode className="text-cyan-400" />
            <h3 className="text-base font-bold sm:text-lg">
              Recently Updated Repositories
            </h3>
          </div>

          {recentRepositories.length ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {recentRepositories.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-w-0 flex-col rounded-lg border border-white/10 bg-black/10 p-3 transition hover:border-cyan-400/40 hover:bg-white/[0.03]"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h4 className="break-words text-sm font-semibold text-cyan-300">
                      {repo.name}
                    </h4>

                    <FaExternalLinkAlt className="mt-1 shrink-0 text-[10px] text-gray-500" />
                  </div>

                  <p className="mb-4 line-clamp-2 min-h-10 flex-1 text-xs leading-5 text-gray-400">
                    {repo.description || "No description provided."}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/5 pt-3 text-[11px] text-gray-500">
                    {repo.language && <span>{repo.language}</span>}

                    <span className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      {repo.stargazers_count || 0}
                    </span>

                    <span>Forks: {repo.forks_count || 0}</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              {loading
                ? "Loading repositories..."
                : "No public repositories returned."}
            </p>
          )}
        </div>

        {/* CODECHEF */}

        <div className="mt-5 rounded-xl border border-white/10 bg-[#111827] p-4 sm:p-5">
          <PlatformHeader
            icon={SiCodechef}
            title="CodeChef"
            url={
              CODECHEF_USERNAME
                ? `https://www.codechef.com/users/${CODECHEF_USERNAME}`
                : "https://www.codechef.com/"
            }
            color="text-yellow-400"
          />

          {CODECHEF_USERNAME ? (
            <StatusMessage
              message={`Configured username: ${CODECHEF_USERNAME}. Live statistics are not connected in this component yet.`}
            />
          ) : (
            <StatusMessage message="Add your CodeChef username to CODECHEF_USERNAME to configure your profile. No fake statistics are shown." />
          )}

          <a
            href={
              CODECHEF_USERNAME
                ? `https://www.codechef.com/users/${CODECHEF_USERNAME}`
                : "https://www.codechef.com/"
            }
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-yellow-400 hover:text-yellow-300"
          >
            {CODECHEF_USERNAME ? "View CodeChef Profile" : "Open CodeChef"}
            <FaExternalLinkAlt />
          </a>
        </div>

        {/* FOOTER */}

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-5 text-center text-xs text-gray-500 sm:flex-row sm:text-left">
          <p>
            Live data depends on external API availability and rate limits.
          </p>

          <p className="flex items-center gap-2">
            <FaTrophy className="text-yellow-400" />
            Keep learning. Keep building.
          </p>
        </div>
      </div>
    </section>
  );
}
