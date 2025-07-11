console.log("js présent...")


/* MODE CLAIR/SOMBRE */
  const toggle = document.getElementById("theme-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  function applyTheme(theme) {
    document.body.classList.toggle("dark-theme", theme === "dark");
    toggle.textContent = theme === "dark" ? "☀️ Mode clair" : "🌙 Mode sombre";
  }

  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  toggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    toggle.textContent = isDark ? "☀️ Mode clair" : "🌙 Mode sombre";
  });