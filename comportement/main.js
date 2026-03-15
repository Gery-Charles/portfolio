/* MODE CLAIR/SOMBRE */
  const toggle = document.getElementById("toogle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  function applyTheme(theme) {
    document.body.classList.toggle("dark-theme", theme === "dark");
    toggle.textContent = theme === "dark";
  }

  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  toggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    toggle.textContent = isDark ;
  });

// Bouton scroll to top
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = 'flex';
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

// Fonction pour gérer l'accordéon des projets
function toggleProjectDetails(button) {
  const project = button.closest('.project');
  const details = project.querySelector('.project-details');
  details.classList.toggle('expanded');
  button.classList.toggle('active');
  if (details.classList.contains('expanded')) {
    button.childNodes[0].textContent = 'Voir moins';
  } else {
    button.childNodes[0].textContent = 'En savoir plus';
  }
}

// Fonction pour envoyer un email via mailto depuis le mail form vers mon adresse
function sendEmail() {
  const monMail = "charles.gery@etudiant.univ-lr.fr";
  const subject = encodeURIComponent(document.getElementById("contact-subject").value || "Contact depuis le portfolio");
  const body = encodeURIComponent(document.getElementById("contact-message").value || "");
  window.location.href = `mailto:${monMail}?subject=${subject}&body=${body}`;
}