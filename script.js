/**
 * Abhiram - Lead Reel Creator & Video Producer Portfolio
 * Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. Dark / Light Theme Toggle
  // ==========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Initialize theme from storage or system preference
  const savedTheme = localStorage.getItem('abhiram-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else if (!systemPrefersDark) {
    htmlElement.setAttribute('data-theme', 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('abhiram-theme', targetTheme);
    });
  }

  // ==========================================================================
  // 2. Mobile Drawer Navigation
  // ==========================================================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    const toggleMenu = () => {
      const isOpen = navMenu.classList.toggle('is-open');
      menuToggle.classList.toggle('is-active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    };

    const closeMenu = () => {
      navMenu.classList.remove('is-open');
      menuToggle.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    menuToggle.addEventListener('click', toggleMenu);

    navLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('is-open') &&
        !navMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }

  // ==========================================================================
  // 3. Header Shadow on Scroll
  // ==========================================================================
  const siteHeader = document.getElementById('header');

  const handleHeaderScroll = () => {
    if (siteHeader) {
      if (window.scrollY > 25) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ==========================================================================
  // 4. Hero Typewriter Animation
  // ==========================================================================
  const typewriterElem = document.getElementById('typewriter');
  const roles = [
    'Viral Reel Creator',
    'Short-Form Video Specialist',
    'Instagram & Facebook Strategist',
    'High-Retention Video Editor',
    'Visual Storyteller'
  ];

  if (typewriterElem) {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    const typeStep = () => {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        charIndex--;
        typewriterElem.textContent = currentRole.substring(0, charIndex);
        typingSpeed = 45;
      } else {
        charIndex++;
        typewriterElem.textContent = currentRole.substring(0, charIndex);
        typingSpeed = 85;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at full word
        isDeleting = true;
        typingSpeed = 1600;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeStep, typingSpeed);
    };

    typeStep();
  }

  // ==========================================================================
  // 5. Featured Reels & Projects Filter
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.split(' ').includes(filterValue)) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // ==========================================================================
  // 6. Interactive Reel Preview Modal
  // ==========================================================================
  const reelModal = document.getElementById('reel-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalViewsBadge = document.getElementById('modal-views-badge');
  const modalPlatformBadge = document.getElementById('modal-platform-badge');

  const openModal = (data) => {
    if (!reelModal) return;
    if (modalTitle) modalTitle.textContent = data.title || 'Reel Showcase';
    if (modalDesc) modalDesc.textContent = data.desc || 'High-retention reel produced by Abhiram.';
    if (modalViewsBadge) modalViewsBadge.textContent = data.views ? `🔥 ${data.views} Views` : '🔥 Viral Content';
    if (modalPlatformBadge) modalPlatformBadge.textContent = data.platform || 'Instagram & Facebook';

    reelModal.classList.add('is-open');
    reelModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!reelModal) return;
    reelModal.classList.remove('is-open');
    reelModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Attach modal trigger to buttons
  const modalTriggers = document.querySelectorAll('.modal-btn, .reel-play-trigger');
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const dataset = trigger.dataset;
      openModal({
        title: dataset.title,
        platform: dataset.platform,
        views: dataset.views,
        desc: dataset.desc
      });
    });
  });

  // Hero Phone Mockup Preview Button
  const heroPreviewBtn = document.getElementById('hero-preview-btn');
  if (heroPreviewBtn) {
    heroPreviewBtn.addEventListener('click', () => {
      openModal({
        title: 'Abhiram Reel Showreel 2026',
        platform: 'Instagram & Facebook',
        views: '50M+ Total Views Driven',
        desc: 'A compilation of viral short-form hooks, dynamic video cuts, kinetic captions, and high-converting brand sponsorships created by Abhiram.'
      });
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (reelModal) {
    reelModal.addEventListener('click', (e) => {
      if (e.target === reelModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && reelModal && reelModal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // ==========================================================================
  // 7. Scrollspy (Active Navigation Link)
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');

  const handleScrollspy = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScrollspy, { passive: true });

  // ==========================================================================
  // 8. Contact Form Validation & Toast Notification
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formToast = document.getElementById('form-toast');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateField = (input, isValid) => {
      const group = input.closest('.form-group');
      if (!group) return;
      if (!isValid) {
        group.classList.add('has-error');
      } else {
        group.classList.remove('has-error');
      }
    };

    // Live validation
    if (nameInput) {
      nameInput.addEventListener('input', () => {
        validateField(nameInput, nameInput.value.trim().length > 0);
      });
    }

    if (emailInput) {
      emailInput.addEventListener('input', () => {
        validateField(emailInput, emailPattern.test(emailInput.value.trim()));
      });
    }

    if (messageInput) {
      messageInput.addEventListener('input', () => {
        validateField(messageInput, messageInput.value.trim().length >= 10);
      });
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = nameInput ? nameInput.value.trim().length > 0 : true;
      const isEmailValid = emailInput ? emailPattern.test(emailInput.value.trim()) : true;
      const isMessageValid = messageInput ? messageInput.value.trim().length >= 10 : true;

      if (nameInput) validateField(nameInput, isNameValid);
      if (emailInput) validateField(emailInput, isEmailValid);
      if (messageInput) validateField(messageInput, isMessageValid);

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        return;
      }

      // Simulate sending
      if (submitBtn) {
        submitBtn.disabled = true;
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = `
          <span>Sending Request...</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon">
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
          </svg>
        `;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalContent;
          contactForm.reset();

          if (formToast) {
            formToast.classList.add('active');
            setTimeout(() => {
              formToast.classList.remove('active');
            }, 6000);
          }
        }, 900);
      }
    });
  }

  // ==========================================================================
  // 9. Dynamic Year & Back To Top
  // ==========================================================================
  const yearElem = document.getElementById('year');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }

  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
