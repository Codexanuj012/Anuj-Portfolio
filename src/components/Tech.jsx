import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";

const Tech = () => {
  return (
    <section className="w-full">
      <h2 className={`${styles.sectionHeadText} text-center`}>
        Tech Skills
      </h2>

      <div className="mt-8 grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: index * 0.02 }}
            whileHover={{ y: -3 }}
            className="flex min-h-[105px] items-center gap-3
              rounded-lg border border-white/10 bg-[#151030]
              px-4 py-4 hover:border-[#915EFF]
              transition-colors"
          >
            <img
              src={tech.icon}
              alt={tech.name}
              loading="lazy"
              className="h-10 w-10 shrink-0 object-contain"
            />

            <p className="text-sm font-medium text-white break-words">
              {tech.name}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Tech, "");
