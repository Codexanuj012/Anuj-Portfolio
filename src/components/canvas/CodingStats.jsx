import { motion } from "framer-motion";
import { SiLeetcode } from "react-icons/si";
import { FaGithub, FaCode, FaLaptopCode } from "react-icons/fa";

const stats = [
  {
    icon: <SiLeetcode size={40} />,
    value: "92+",
    title: "LeetCode Problems",
    link: "https://leetcode.com/u/Codex_Anuj/",
  },
  {
    icon: <FaGithub size={40} />,
    value: "35+",
    title: "GitHub Repositories",
    link: "https://github.com/Codexanuj012",
  },
  {
    icon: <FaLaptopCode size={40} />,
    value: "6+",
    title: "Projects",
    link: null,
  },
  {
    icon: <FaCode size={40} />,
    value: "12+",
    title: "Technologies",
    link: null,
  },
];

// Parent container: children ek-ek karke andar aayenge (stagger effect)
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Har card fade+slide karke upar aayega
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const CodingStats = () => {
  return (
    <section className="mt-24">
      <p className="text-secondary text-center">Coding Progress</p>

      <h2 className="text-white text-5xl font-bold text-center mb-10">
        Development Stats
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {stats.map((item, index) => {
          const CardWrapper = item.link ? motion.a : motion.div;
          const linkProps = item.link
            ? {
                href: item.link,
                target: "_blank",
                rel: "noopener noreferrer",
              }
            : {};

          return (
            <CardWrapper
              key={index}
              {...linkProps}
              variants={cardVariants}
              whileHover={{
                scale: 1.08,
                y: -8,
                boxShadow: "0 10px 30px rgba(145, 94, 255, 0.35)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="bg-tertiary rounded-2xl p-8 text-center cursor-pointer block"
            >
              <motion.div
                className="flex justify-center text-[#915EFF] mb-4"
                whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                transition={{ duration: 0.5 }}
              >
                {item.icon}
              </motion.div>

              <h1 className="text-4xl font-bold text-white">{item.value}</h1>

              <p className="text-secondary mt-2">{item.title}</p>
            </CardWrapper>
          );
        })}
      </motion.div>
    </section>
  );
};

export default CodingStats;