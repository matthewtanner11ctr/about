const toggleButton = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme") || "light";

document.body.dataset.theme = currentTheme;

toggleButton?.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  document.body.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
});
