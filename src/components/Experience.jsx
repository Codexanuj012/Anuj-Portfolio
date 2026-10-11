import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { certificates } from "../constants";
import { SectionWrapper } from "../hoc";

const CertificateCard = ({ certificate }) => (
  <VerticalTimelineElement
    contentStyle={{ background: "#1d1836", color: "#fff" }}
    contentArrowStyle={{ borderRight: "7px solid #232631" }}
    date={certificate.date}
    iconStyle={{ background: certificate.iconBg || "#383E56" }}
    icon={
      <div className="flex items-center justify-center w-full h-full">
        <img
          src={certificate.icon}
          alt={certificate.issuer}
          className="w-[60%] h-[60%] object-contain"
          loading="lazy"
        />
      </div>
    }
  >
    <h3 className="text-white text-xl font-bold">
      {certificate.title}
    </h3>

    <p className="text-secondary text-sm font-semibold mt-1">
      {certificate.issuer}
    </p>

    {certificate.points?.length > 0 && (
      <ul className="mt-4 list-disc ml-5 space-y-2">
        {certificate.points.map((point, index) => (
          <li key={index} className="text-white-100 text-sm">
            {point}
          </li>
        ))}
      </ul>
    )}

    {certificate.link && (
      <a
        href={certificate.link}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-4 text-[#915EFF] text-sm hover:underline"
      >
        View Certificate ↗
      </a>
    )}
  </VerticalTimelineElement>
);

const Certificates = () => (
  <>
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}
    >
      <p className={`${styles.sectionSubText} text-center`}>
        Certifications and achievements
      </p>

      <h2 className={`${styles.sectionHeadText} text-center`}>
        Certificates.
      </h2>
    </motion.div>

    <div className="mt-12 flex flex-col">
      <VerticalTimeline>
        {certificates.map((certificate, index) => (
          <CertificateCard
            key={certificate.title || index}
            certificate={certificate}
          />
        ))}
      </VerticalTimeline>
    </div>
  </>
);

export default SectionWrapper(Certificates, "certificates");
