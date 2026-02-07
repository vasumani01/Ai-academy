/* =======================
   HAMBURGER MENU
======================= */

// Global error handlers (show errors in console and a small on-page banner)
window.addEventListener('error', function(e) {
  try {
    console.error('Global error:', e.message, e.filename + ':' + e.lineno);
    var el = document.getElementById('globalErrors') || (function() {
      var d = document.createElement('div');
      d.id = 'globalErrors';
      d.style.position = 'fixed';
      d.style.bottom = '10px';
      d.style.left = '10px';
      d.style.zIndex = '99999';
      d.style.background = 'rgba(200,20,30,0.95)';
      d.style.color = 'white';
      d.style.padding = '8px 12px';
      d.style.borderRadius = '6px';
      d.style.fontSize = '13px';
      document.body.appendChild(d);
      return d;
    })();
    el.textContent = 'Error: ' + e.message + ' (' + (e.filename || '') + ':' + (e.lineno || '') + ')';
  } catch (err) {
    console.error('Error reporting failed', err);
  }
});

window.addEventListener('unhandledrejection', function(e) {
  try {
    console.error('UnhandledRejection:', e.reason);
    var el = document.getElementById('globalErrors') || (function() {
      var d = document.createElement('div');
      d.id = 'globalErrors';
      d.style.position = 'fixed';
      d.style.bottom = '10px';
      d.style.left = '10px';
      d.style.zIndex = '99999';
      d.style.background = 'rgba(200,20,30,0.95)';
      d.style.color = 'white';
      d.style.padding = '8px 12px';
      d.style.borderRadius = '6px';
      d.style.fontSize = '13px';
      document.body.appendChild(d);
      return d;
    })();
    el.textContent = 'UnhandledRejection: ' + (e.reason && e.reason.message ? e.reason.message : String(e.reason));
  } catch (err) {
    console.error('Rejection reporting failed', err);
  }
});

// Try multiple timing methods to ensure script runs
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMenu);
} else {
  initMenu();
}

window.addEventListener('load', initMenu);

function initMenu() {
  // Prevent double-initialization (multiple listeners causing double-toggle)
  if (window.__menuInitialized) {
    console.log('⚠️ initMenu called again — already initialized');
    return;
  }
  window.__menuInitialized = true;
  console.log('🚀 Menu initialization running');
  
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (!menuToggle) {
    console.error('❌ menuToggle not found');
    return;
  }
  if (!navLinks) {
    console.error('❌ navLinks not found');
    return;
  }

  console.log('✅ Both menu elements found');

  // Click handler for hamburger menu
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    
    console.log('🔤 Menu toggle clicked');
    console.log('Current class list:', navLinks.className);
    
    // Toggle show class
    navLinks.classList.toggle('show');
    
    // Log new state
    const isOpen = navLinks.classList.contains('show');
    console.log('After toggle - Menu is:', isOpen ? '✅ OPEN' : '❌ CLOSED');
    console.log('New class list:', navLinks.className);
  });

  // Handle link clicks
  const links = navLinks.querySelectorAll('a');
  console.log('Found ' + links.length + ' links in menu');
  
  links.forEach((link, index) => {
    link.addEventListener('click', function() {
      console.log('Link ' + index + ' clicked, closing menu');
      navLinks.classList.remove('show');
    });
  });

  // Close menu on outside clicks
  document.addEventListener('click', function(e) {
    const isNavClick = e.target.closest('.navbar');
    if (!isNavClick && navLinks.classList.contains('show')) {
      console.log('Clicked outside, closing menu');
      navLinks.classList.remove('show');
    }
  });

  console.log('✅✅✅ Menu script fully initialized!');
}

/* =======================
   SCROLL ANIMATIONS
======================= */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all course cards
document.querySelectorAll('.course-card').forEach((card, index) => {
  card.style.animationDelay = (index * 0.1) + 's';
  observer.observe(card);
});

// Observe all why cards
document.querySelectorAll('.why-card').forEach((card, index) => {
  card.style.animationDelay = (index * 0.1) + 's';
  observer.observe(card);
});

// Observe about container
const aboutContainer = document.querySelector('.about-container');
if (aboutContainer) {
  observer.observe(aboutContainer);
}

/* =======================
   SMOOTH SCROLL
======================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    console.log('Scrolling to:', href);
    
    const target = document.querySelector(href);
    if (target) {
      // Add CSS scroll behavior
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Also use scrollIntoView as fallback
      setTimeout(() => {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } else {
      console.error('Target not found:', href);
    }
  });
});

/* =======================
   INTERACTIVE COURSE CARDS
======================= */
document.querySelectorAll('.course-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-15px)';
    // Add button-like interaction
    const title = this.querySelector('h3');
    if (title) {
      title.style.color = '#06b6d4';
    }
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    const title = this.querySelector('h3');
    if (title) {
      title.style.color = '#0369a1';
    }
  });
});

/* =======================
   INTERACTIVE WHY CARDS
======================= */
document.querySelectorAll('.why-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    const icon = this.querySelector('.why-icon');
    if (icon) {
      icon.style.transform = 'scale(1.2) rotate(10deg)';
    }
    const title = this.querySelector('h3');
    if (title) {
      title.style.color = '#0369a1';
    }
  });
  
  card.addEventListener('mouseleave', function() {
    const icon = this.querySelector('.why-icon');
    if (icon) {
      icon.style.transform = 'scale(1) rotate(0deg)';
    }
    const title = this.querySelector('h3');
    if (title) {
      title.style.color = '#0f172a';
    }
  });
});

/* =======================
   INTERACTIVE CONTACT CARD
======================= */
const contactCard = document.querySelector('.contact-card');
if (contactCard) {
  contactCard.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px)';
    this.querySelectorAll('p').forEach(p => {
      p.style.color = '#0369a1';
    });
  });
  
  contactCard.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.querySelectorAll('p').forEach(p => {
      p.style.color = '#334155';
    });
  });
}

/* =======================
   INTERACTIVE ABOUT SECTION
======================= */
if (aboutContainer) {
  aboutContainer.addEventListener('mouseenter', function() {
    this.style.boxShadow = '0 25px 50px rgba(3, 105, 161, 0.15)';
  });
  
  aboutContainer.addEventListener('mouseleave', function() {
    this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.08)';
  });
}

const aboutImage = document.querySelector('.about-right img');
if (aboutImage) {
  aboutImage.style.cursor = 'pointer';
  aboutImage.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
  });
  
  aboutImage.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
}

/* =======================
   SCROLL INDICATOR
======================= */
window.addEventListener('scroll', function() {
  // Add enhanced shadow to navbar on scroll
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 5) {
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
  } else {
    navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  }
});

/* =======================
   BUTTON RIPPLE EFFECT (Optional Enhancement)
======================= */
document.querySelectorAll('.course-card, .why-card, .contact-card, .about-container').forEach(element => {
  element.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
  });
});
/* =======================
   CONTACT FORM REAL-TIME VALIDATION
======================= */
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  // Function to validate individual fields
  function validateField(field, errorEl) {
    let valid = true;
    if (field.id === 'name') {
      if (field.value.trim().length < 3) {
        errorEl.textContent = 'Name must be at least 3 characters';
        valid = false;
      } else {
        errorEl.textContent = '';
      }
    }

    if (field.id === 'email') {
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!field.value.trim().match(emailPattern)) {
        errorEl.textContent = 'Enter a valid email';
        valid = false;
      } else {
        errorEl.textContent = '';
      }
    }

    if (field.id === 'message') {
      if (field.value.trim().length < 10) {
        errorEl.textContent = 'Message must be at least 10 characters';
        valid = false;
      } else {
        errorEl.textContent = '';
      }
    }

    return valid;
  }

  // Real-time validation
  [name, email, message].forEach(field => {
    const errorEl = document.getElementById(field.id + 'Error');
    field.addEventListener('input', () => validateField(field, errorEl));
  });

  // Form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    isValid &= validateField(name, nameError);
    isValid &= validateField(email, emailError);
    isValid &= validateField(message, messageError);

    if (isValid) {
      // Show success message
      formSuccess.style.display = 'block';
      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 4000);

      // Reset form
      contactForm.reset();
    }
  });
}


console.log('✅ Interactive elements loaded successfully!');
