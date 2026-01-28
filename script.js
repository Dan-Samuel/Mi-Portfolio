document.addEventListener('DOMContentLoaded', () => {
    // ===== HERO ROLE CAROUSEL =====
  const roleText = document.getElementById('roleText');
  const roles = ['Product Designer', 'Web Developer', 'Prompt Engineer'];
  let roleIndex = 0;
  if (roleText) {
    setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleText.textContent = roles[roleIndex];
    }, 4000);
  }
  // ===== HAMBURGER MENU FUNCTIONALITY =====
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-links');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ===== FLIP CARDS FUNCTIONALITY =====
  document.querySelectorAll('.skills-flashcards').forEach(card => {
    let flipTimeout;

    function flipCard() {
      if (card.classList.contains('flipped')) {
        card.classList.remove('flipped');
        clearTimeout(flipTimeout);
      } else {
        card.classList.add('flipped');
        flipTimeout = setTimeout(() => {
          card.classList.remove('flipped');
        }, 5000);
      }
    }

    card.addEventListener('click', flipCard);

    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flipCard();
      }
    });
  });

  // ===== SCROLL REVEAL ANIMATION =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.hidden-left, .hidden-right').forEach(el => {
    observer.observe(el);
  });

  // ===== ANIMATE STATS ON SCROLL =====
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateStats = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  };

  const statsObserver = new IntersectionObserver(animateStats, {
    threshold: 0.5
  });

  statNumbers.forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(20px)';
    stat.style.transition = 'all 0.6s ease';
    statsObserver.observe(stat);
  });
});