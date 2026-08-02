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

const experiences = [

  {
    title: "Full Stack Developer Trainee ",
    company_name: "Softpro India",   // yahan change karo
    icon: image,            // ⚠️ ye bhi change karna hoga
    iconBg: "#383E56",
    date: "June 2024 – August 2024 ",
    points: [

      "Project Experience: Bio Tech Park, Lucknow – Online Admission System",
  "Developed an Online Admission System using Django and MySQL.",
  "Built Student and Admin Dashboards with secure Login/Logout functionality.",
  "Integrated Email Services for admission notifications.",
  "Implemented CRUD operations for admission management.",
  "Key Skills Covered: React.js, Python, Django, SQL, REST APIs, Authentication, Payment Gateway Integration, Git, Database Management.",





    ],
  },
  {
    title: "Full Stack Developer Intern",
    company_name: "YoungMinds Technology Solution Pvt. Ltd.",
    icon: yung,
    iconBg: "#E6DEDD",
    date: "May 2025 – Jul 2025",
    points: [
      "Developed responsive web applications using React.js, Node.js, Express.js, and MongoDB.",
      "Built secure REST APIs with JWT Authentication and CRUD operations.",
      "Improved application performance, responsiveness, and code quality.",
     
    ],
  },
];

const testimonials = [
  {
     testimonial:
     "Anuj is a dedicated and quick learner with strong full-stack development skills. I encourage him to keep improving his DSA, build impactful projects, and continue learning consistently.",
    name: "Abhishek Kusahwaha",
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
  name: "Priya Singh",
  designation: "Data Analyst",
  company: "Infosys",
  image: "",

  },
  
  
];

const projects = [
  {
    name: "Eventora – Full Stack Event Booking Platform",
    description:
      "Web-based platform that allows users to search, book, and manage events from various providers, providing a convenient and efficient solution for event planning needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: event,
    source_code_link: "https://github.com/",
  },
  {
    name: "ComplyHub-Complaint Management System",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      // {
      //   name: "",
      //   color: "pink-text-gradient",
      // },
    ],
    image: complaint,
    source_code_link: "https://github.com/",
  },
  {
    name: "Bio Tech Park,– Online Admission System",
    description:
      "web-based admission platform developed for Bio Tech Park, Lucknow that streamlines the entire admission process ,enables students to register, submit applications, upload documents, and track admission.",
    tags: [
      {
        name: "django",
        color: "blue-text-gradient",
      },
      {
        name: "mysql",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: bio,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
