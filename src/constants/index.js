
import {
  mobile,
  backend,
  creator,
  web,
  arun,
  abhishek,
  javascript,
  html,
  css,
  reactjs,
  MySQL,
  node,
  mongodb,
  git,
  figma,
  PowerBI,
  event,
  complaint,
  bio,
  yung,
  meta,
  image,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  jwt,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
  {
    id: "resume",
    title: "Resume",
  },
  // {
  //   id:"Coding Stats",
  //   title:"Coding Stats",
  // },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Full Stack Developer",
    icon: mobile,
  },
  {
    title: "DATA Analyst",
    icon: backend,
  },
  {
    title: "Vibe Coding",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "PowerBI",
    icon: PowerBI,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "MySQL",
    icon: MySQL,
  },
  {
    name: "Node JS",
    icon: node,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "JWT",
    icon: jwt,
  },
];

const certificates = [
  {
    title: "Full Stack Developer Trainee",
    issuer: "Softpro India",
    icon: image,
    iconBg: "#383E56",
    date: "June 2024 – August 2024",
    points: [
      "Project Experience: Bio Tech Park, Lucknow – Online Admission System",
      "Developed an Online Admission System using Django and MySQL.",
      "Built Student and Admin Dashboards with secure Login/Logout functionality.",
      "Integrated Email Services for admission notifications.",
      "Implemented CRUD operations for admission management.",
      "Key Skills Covered: React.js, Python, Django, SQL, REST APIs, Authentication, Payment Gateway Integration, Git, Database Management.",
    ],
    link: "",
  },
  {
    title: "Full Stack Developer Intern",
    issuer: "YoungMinds Technology Solution Pvt. Ltd.",
    icon: yung,
    iconBg: "#E6DEDD",
    date: "May 2025 – Jul 2025",
    points: [
      "Developed responsive web applications using React.js, Node.js, Express.js, and MongoDB.",
      "Built secure REST APIs with JWT Authentication and CRUD operations.",
      "Improved application performance, responsiveness, and code quality.",
    ],
    link: "",
  },
];

const testimonials = [
  {
    testimonial:
      "Anuj is a dedicated and quick learner with strong full-stack development skills. I encourage him to keep improving his DSA, build impactful projects, and continue learning consistently.",
    name: "Abhishek Kushawaha",
    designation: "Software Development Engineer",
    company: "Accenture",
    image: abhishek,
  },
  {
    testimonial:
      "Anuj is passionate about learning new technologies and approaches every project with dedication. His consistency and problem-solving mindset will help him grow into a skilled Software Engineer.",
    name: "Arun Chauhan",
    designation: "Senior Software Engineer",
    company: "Chetu India Pvt. Ltd.",
    image: arun,
  },
  {
    testimonial:
      "Anuj demonstrates strong analytical thinking and a keen eye for data-driven problem solving. With continued practice in SQL, Power BI, and data visualization, he has the potential to excel as a Data Analyst.",
    name: "Priya",
    designation: "Data Analyst",
    company: "Novopay",
    image: "",
  },
];

const projects = [
  {
    name: "AI Interview Agent",
    description:
      "An AI-powered interview platform that generates personalized technical and HR interview questions based on uploaded resumes. Includes responsive interfaces, authentication, interview history, and performance reports.",

    tags: [
      { name: "React.js", color: "blue-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "Express.js", color: "pink-text-gradient" },
      { name: "MongoDB", color: "green-text-gradient" },
      { name: "Firebase", color: "blue-text-gradient" },
      { name: "Razorpay", color: "pink-text-gradient" },
    ],

    image: jobit,

    source_code_link:
      "https://github.com/Codexanuj012/AgentIQ",

    live_demo_link:
      "https://agentiq-1.onrender.com/",
  },

  {
    name: "Eventora – Event Booking Platform",
    description:
      "A MERN-based event booking platform with responsive pages, separate Admin and User dashboards, REST APIs, JWT authentication, role-based access control, event booking, and seat availability validation.",

    tags: [
      { name: "React.js", color: "blue-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "MongoDB", color: "green-text-gradient" },
      { name: "JWT", color: "pink-text-gradient" },
      { name: "Bootstrap", color: "blue-text-gradient" },
      { name: "Nodemailer", color: "pink-text-gradient" },
    ],

    image: event,

    source_code_link: "https://github.com/",

    // Add your Eventora live demo URL here when available.
    live_demo_link: "",
  },

  {
    name: "Complaint Management System",
    description:
      "A responsive complaint management portal that allows students to submit and track complaints. Includes login and signup functionality, form validation, and mobile-friendly pages.",

    tags: [
      { name: "HTML5", color: "blue-text-gradient" },
      { name: "CSS3", color: "pink-text-gradient" },
      { name: "JavaScript", color: "yellow-text-gradient" },
      { name: "Bootstrap", color: "blue-text-gradient" },
    ],

    image: complaint,

    source_code_link: "https://github.com/",

    live_demo_link: "",
  },

  // {
  //   name: "Online Admission System",
  //   description:
  //     "A web-based admission platform developed for Bio Tech Park, Lucknow. Streamlines student registration, admission applications, document submission, admission tracking, and student/admin dashboard operations.",

  //   tags: [
  //     { name: "Django", color: "green-text-gradient" },
  //     { name: "Python", color: "blue-text-gradient" },
  //     { name: "MySQL", color: "pink-text-gradient" },
  //     { name: "REST APIs", color: "blue-text-gradient" },
  //   ],

  //   image: bio,

  //   source_code_link: "https://github.com/",

  //   live_demo_link: "",
  // },
];

export {
  services,
  technologies,
  certificates,
  testimonials,
  projects,
};
