import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className="relative mx-auto h-screen w-full overflow-hidden">
      <div
        className={`absolute inset-0 top-[120px] mx-auto flex max-w-7xl flex-row items-start gap-5 ${styles.paddingX}`}
      >
        <div className="mt-5 flex flex-col items-center">
          <div className="h-4 w-4 rounded-full bg-[#915EFF]" />
          <div className="h-40 w-px bg-[#915EFF] sm:h-80" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm{" "}
            <span className="text-[#915EFF]">Anuj Kushawaha</span>
          </h1>

          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Computer Science Student | Full Stack Developer (MERN)
            <br className="hidden sm:block" />
            Data Analyst
          </p>
        </div>
      </div>

      <ComputersCanvas />

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-start rounded-3xl border-2 border-secondary p-2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-1 h-2.5 w-2.5 rounded-full bg-secondary"
        />
      </a>
    </section>
  );
};

export default Hero;