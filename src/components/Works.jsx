
import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
}) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.12, 0.5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="w-full sm:w-[340px] rounded-xl border border-white/10 bg-[#111827] p-4"
    >
      {/* Project Image */}
      <div className="relative h-[190px] w-full overflow-hidden rounded-lg bg-black/20">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
        />

        {/* GitHub Icon */}
        {source_code_link && (
          <div className="absolute inset-0 flex justify-end m-3">
            <div
              onClick={() =>
                window.open(
                  source_code_link,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  window.open(
                    source_code_link,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }
              }}
              aria-label={`View ${name} source code`}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition-transform duration-200 hover:scale-110"
            >
              <img
                src={github}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* Project Details */}
      <div className="mt-4">
        <h3 className="text-lg font-bold text-white">
          {name}
        </h3>

        <p className="mt-2 min-h-[90px] text-justify text-sm leading-6 text-gray-400">
          {description}
        </p>
      </div>

      {/* Technologies */}
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={`${name}-${tag.name}`}
            className={`rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs ${tag.color}`}
          >
            {tag.name}
          </span>
        ))}
      </div>

      {/* Project Links */}
      {live_demo_link && (
        <div className="mt-5 border-t border-white/10 pt-4">
          <a
            href={live_demo_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-md bg-cyan-500/10 px-3 py-2.5 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
          >
            Live Demo
            <FaExternalLinkAlt className="text-xs" />
          </a>
        </div>
      )}
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="flex w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 0.7)}
          className="mt-3 max-w-3xl text-[15px] leading-7 text-secondary"
        >
          These projects showcase my skills in full-stack development,
          authentication, REST APIs, database integration, and responsive
          web application development.
        </motion.p>
      </div>

      {/* Projects Grid */}
      <div className="mt-10 grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            index={index}
            {...project}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
