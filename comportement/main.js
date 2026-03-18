/* ============================================================
   DARK MODE
   ============================================================ */
const toggle = document.getElementById('toggle');
const body   = document.body;

// Restaurer préférence
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
  if (toggle) toggle.checked = true;
}

if (toggle) {
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  });
}

/* ============================================================
   SCROLL TOP
   ============================================================ */
const scrollBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (scrollBtn) {
    if (window.scrollY > 300) {
      scrollBtn.style.display = 'flex';
    } else {
      scrollBtn.style.display = 'none';
    }
  }
}, { passive: true });

if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   NAV ACTIVE HIGHLIGHT
   ============================================================ */
const sections = document.querySelectorAll('section[id], .cta-section[id]');
const navLinks  = document.querySelectorAll('.sticky-nav a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' });

sections.forEach(s => observer.observe(s));

/* ============================================================
   TOGGLE DÉTAILS PROJET
   ============================================================ */
function toggleProjectDetails(btn) {
  const details = btn.nextElementSibling;
  const isOpen  = details.classList.contains('expanded');

  // Fermer tous les autres
  document.querySelectorAll('.project-details.expanded').forEach(d => {
    d.classList.remove('expanded');
    if (d.previousElementSibling && d.previousElementSibling.classList.contains('toggle-details')) {
      d.previousElementSibling.classList.remove('active');
      d.previousElementSibling.textContent = d.previousElementSibling.textContent.replace('Fermer', 'En savoir plus');
    }
  });

  document.querySelectorAll('.toggle-details.active').forEach(b => b.classList.remove('active'));

  if (!isOpen) {
    details.classList.add('expanded');
    btn.classList.add('active');
  }
}

/* ============================================================
   FORMULAIRE CONTACT — MAILTO
   ============================================================ */
function sendEmail() {
  const subject = document.getElementById('contact-subject');
  const message = document.getElementById('contact-message');
  const btn     = document.getElementById('submitMessage');

  if (!subject || !message) return;

  const subjectVal = subject.value.trim();
  const messageVal = message.value.trim();

  if (!subjectVal || !messageVal) {
    showFormFeedback(btn, '⚠ Veuillez remplir les deux champs', 'warn');
    return;
  }

  const mailto = `mailto:charles.gery@etudiant.univ-lr.fr`
    + `?subject=${encodeURIComponent(subjectVal)}`
    + `&body=${encodeURIComponent(messageVal)}`;

  window.location.href = mailto;

  showFormFeedback(btn, '✓ Ouverture de votre messagerie…', 'success');
  subject.value = '';
  message.value = '';
}

function showFormFeedback(btn, text, type) {
  const original = btn.textContent;
  btn.textContent = text;
  btn.style.background = type === 'success' ? '#2C8C99' : '#b45309';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
  }, 3000);
}

/* ============================================================
   REVEAL ANIMATIONS — IntersectionObserver natif (remplace AOS)
   ============================================================ */
(function () {
  // On ne lance pas si l'utilisateur préfère moins d'animations
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const revealEls = document.querySelectorAll('[data-reveal]');
  if (!revealEls.length) return;

  // Délai progressif pour les enfants d'une même grille
  const grids = document.querySelectorAll('.projects-grid, .skills-grid, .interests');
  grids.forEach(grid => {
    grid.querySelectorAll('[data-reveal]').forEach((el, i) => {
      el.style.transitionDelay = (i * 80) + 'ms';
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target); // déclenche une seule fois
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => io.observe(el));
})();