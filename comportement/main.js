console.log("js présent...")


/* MODE CLAIR/SOMBRE */
  const toggle = document.getElementById("theme-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  function applyTheme(theme) {
    document.body.classList.toggle("dark-theme", theme === "dark");
    toggle.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  toggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    toggle.textContent = isDark ? "☀️" : "🌙";
  });

  // Bouton scroll to top
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'block';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth scroll pour la navigation
    document.querySelectorAll('.sticky-nav a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });