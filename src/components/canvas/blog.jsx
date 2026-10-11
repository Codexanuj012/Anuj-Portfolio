
const posts = [
  {
    title: "DSA and Problem Solving",
    category: "DSA",
    description:
      "Learn problem-solving patterns, algorithm approaches, dry runs, and time complexity.",
  },
  {
    title: "MERN Stack Development",
    category: "Web Development",
    description:
      "Notes and practical learnings about React, Node.js, Express, REST APIs, and databases.",
  },
  {
    title: "Interview Preparation",
    category: "Career",
    description:
      "Prepare for JavaScript, OOPS, backend fundamentals, and fresher technical interviews.",
  },
];

const Blog = () => {
  return (
    <main className="min-h-screen bg-primary px-4 pb-20 pt-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-secondary">
          Articles and Learnings
        </p>

        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          My Blog
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-secondary">
          Sharing my journey in DSA, full-stack development,
          projects, and interview preparation.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="rounded-2xl border border-white/10 bg-tertiary p-6 transition hover:border-[#915EFF]"
            >
              <span className="rounded-full bg-[#915EFF]/20 px-3 py-1 text-xs text-[#b9a2ff]">
                {post.category}
              </span>

              <h2 className="mt-5 text-xl font-bold text-white">
                {post.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-secondary">
                {post.description}
              </p>

              <p className="mt-5 text-xs text-gray-500">
                Articles coming soon
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Blog;
