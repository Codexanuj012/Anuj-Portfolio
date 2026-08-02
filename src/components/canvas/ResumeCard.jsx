import { motion } from "framer-motion";
import { FaFileAlt, FaDownload, FaEye } from "react-icons/fa";

const ResumeCard = () => {
  return (
    <section className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{
          scale: 1.03,
          y: -6,
          boxShadow: "0 10px 30px rgba(145, 94, 255, 0.35)",
        }}
        className="bg-tertiary rounded-2xl p-10 text-center max-w-xl mx-auto"
      >
        <motion.div
          className="flex justify-center text-[#915EFF] mb-4"
          whileHover={{ rotate: [0, -8, 8, -4, 0] }}
          transition={{ duration: 0.5 }}
        >
          <FaFileAlt size={48} />
        </motion.div>

        <h3 className="text-white text-2xl font-bold mb-2">My Resume</h3>
        <p className="text-secondary mb-8">
          Take a look at my experience, skills and projects
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-[#915EFF] text-white font-medium px-6 py-3 rounded-xl shadow-md shadow-primary"
          >
            <FaEye />
            View Resume
          </motion.a>

          <motion.a
            href="/resume.pdf"
            download="Anuj_Kushawaha_Resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-transparent border border-[#915EFF] text-white font-medium px-6 py-3 rounded-xl"
          >
            <FaDownload />
            Download
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default ResumeCard;
