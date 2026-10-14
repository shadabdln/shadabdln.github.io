/* =====================================================================
   PROJECTS LIST  ·  add, edit or remove project cards here
   ---------------------------------------------------------------------
   Naya project add karna hai? Neeche wala TEMPLATE copy karo, list me
   sabse upar paste karo, values badlo, save karo. Bas. HTML chhune ki
   zaroorat nahi.

   TEMPLATE (copy from { to },):

   {
     title: "Project name",
     description: "One or two lines on what it does and the result.",
     category: "ml",                 // "ml" = Machine Learning / Data, "web" = Web
     tags: ["Python", "Pandas"],     // tech used
     github: "https://github.com/shadabdln/repo-name",   // or "" if none
     live: "",                       // demo / app link, or ""
     image: "",                      // optional: "assets/img/projects/my-shot.jpg"
     badge: "New"                    // optional small label, or ""
   },

   Filter buttons (All / Machine Learning / Web) are created automatically
   from the categories you use. To add a new category, add it in
   CATEGORY_NAMES below.
   ===================================================================== */

window.CATEGORY_NAMES = {
  ml: "Machine Learning",
  web: "Web"
};

window.PROJECTS = [
  {
    title: "Google Drive Clone",
    description: "Replicated the Google Drive interface with file listing, folder navigation and a responsive layout. Built in the 7-day bootcamp by Dev Town with Microsoft Learn and GDSC KIIT.",
    category: "web",
    tags: ["HTML5", "CSS3"],
    github: "",
    live: "",
    image: "",
    badge: "Bootcamp"
  },
  {
    title: "Blog Management",
    description: "A blog management web app built in JavaScript during the CodeClause internship.",
    category: "web",
    tags: ["JavaScript"],
    github: "https://github.com/shadabdln/CodeClauseInternship_Blog_Management",
    live: "",
    image: "",
    badge: "Internship"
  },
  {
    title: "To-do App",
    description: "A to-do list app built with HTML and CSS during the CodeClause internship.",
    category: "web",
    tags: ["HTML", "CSS"],
    github: "https://github.com/shadabdln/CodeClauseInternship_Todo-app",
    live: "",
    image: "",
    badge: "Internship"
  },
  {
    title: "Online Resume",
    description: "A single-page online resume from the CodeClause internship, written in semantic HTML.",
    category: "web",
    tags: ["HTML"],
    github: "https://github.com/shadabdln/CodeClauseInternship_Basic__online_Resume",
    live: "",
    image: "",
    badge: "Internship"
  },
  {
    title: "OIBSIP Internship Tasks",
    description: "Web development tasks completed during the Oasis Infobyte internship programme.",
    category: "web",
    tags: ["HTML", "CSS"],
    github: "https://github.com/shadabdln/OIBSIP",
    live: "",
    image: "",
    badge: "Internship"
  }
];
