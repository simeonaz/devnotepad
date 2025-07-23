export type Category = {
  id: string;
  label: string;
  color?: string;
  icon?: string;
};

export const categories: Category[] = [
  {
    id: "todo",
    label: "TODO",
    color: "#F44336",
    icon: "mdi-light:check-circle",
  },
  {
    id: "html",
    label: "HTML",
    color: "#E34C26",
    icon: "mdi-light:language-html5",
  },
  {
    id: "css",
    label: "CSS",
    color: "#264DE4",
    icon: "mdi-light:language-css3",
  },
  {
    id: "javascript",
    label: "JavaScript",
    color: "#F7DF1E",
    icon: "mdi-light:language-javascript",
  },
  {
    id: "php",
    label: "PHP",
    color: "#777BB3",
    icon: "mdi-light:language-php",
  },
  {
    id: "python",
    label: "Python",
    color: "#306998",
    icon: "mdi-light:language-python",
  },
  {
    id: "typescript",
    label: "TypeScript",
    color: "#3178C6",
    icon: "mdi-light:language-typescript",
  },
  {
    id: "java",
    label: "Java",
    color: "#007396",
    icon: "mdi-light:language-java",
  },
  {
    id: "c",
    label: "C",
    color: "#A8B9CC",
    icon: "mdi-light:language-c",
  },
  {
    id: "cpp",
    label: "C++",
    color: "#00599C",
    icon: "mdi-light:language-cpp",
  },
  {
    id: "csharp",
    label: "C#",
    color: "#239120",
    icon: "mdi-light:language-csharp",
  },
  {
    id: "ruby",
    label: "Ruby",
    color: "#CC342D",
    icon: "mdi-light:language-ruby",
  },
  {
    id: "go",
    label: "Go",
    color: "#00ADD8",
    icon: "mdi-light:language-go",
  },
  {
    id: "swift",
    label: "Swift",
    color: "#FA7343",
    icon: "mdi-light:language-swift",
  },
  {
    id: "kotlin",
    label: "Kotlin",
    color: "#7F52FF",
    icon: "mdi-light:language-kotlin",
  },
  {
    id: "rust",
    label: "Rust",
    color: "#000000",
    icon: "mdi-light:language-rust",
  },
  // Frameworks
  {
    id: "react",
    label: "React",
    color: "#61DAFB",
    icon: "mdi-light:react",
  },
  {
    id: "vue",
    label: "Vue.js",
    color: "#42B883",
    icon: "mdi-light:vuejs",
  },
  {
    id: "angular",
    label: "Angular",
    color: "#DD0031",
    icon: "mdi-light:angular",
  },
  {
    id: "svelte",
    label: "Svelte",
    color: "#FF3E00",
    icon: "mdi-light:alpha-s-circle",
  },
  {
    id: "laravel",
    label: "Laravel",
    color: "#FF2D20",
    icon: "mdi-light:laravel",
  },
  {
    id: "django",
    label: "Django",
    color: "#092E20",
    icon: "mdi-light:language-python",
  },
  {
    id: "flask",
    label: "Flask",
    color: "#000000",
    icon: "mdi-light:flask",
  },
  {
    id: "spring",
    label: "Spring",
    color: "#6DB33F",
    icon: "mdi-light:sprout",
  },
  {
    id: "express",
    label: "Express.js",
    color: "#000000",
    icon: "mdi-light:nodejs",
  },
  {
    id: "other",
    label: "Other",
    color: "#999999",
    icon: "mdi-light:help-circle",
  },
];
