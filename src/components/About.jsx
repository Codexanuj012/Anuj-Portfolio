import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";

const About = () => {
  return (
    <>
      <div>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </div>

      <p className="mt-4 max-w-3xl text-secondary text-[16px] leading-7">
        I'm a Computer Science student passionate about Web & Full Stack
        Development, Data Analysis, and building modern web applications.
        I enjoy solving real-world problems and continuously learning
        new technologies.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
            className="flex min-h-[130px] items-center gap-4
              rounded-xl border border-white/10 bg-tertiary
              p-5 hover:border-[#915EFF] transition-colors"
          >
            <img
              src={service.icon}
              alt={service.title}
              loading="lazy"
              className="h-12 w-12 shrink-0 object-contain"
            />

            <h3 className="text-white text-base font-semibold">
              {service.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
