// Theme toggle utility for Cursor UI Clone
export function initTheme() {
  const savedTheme = localStorage.getItem("cursor-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  const nextTheme = isDark ? "light" : "dark";
  document.documentElement.classList.toggle("dark");
  localStorage.setItem("cursor-theme", nextTheme);
  return nextTheme;
}
