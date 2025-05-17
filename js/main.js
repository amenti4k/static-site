// Main JavaScript for Tetra Dark Mode Website

document.addEventListener('DOMContentLoaded', () => {
  console.log('Tetra website loaded successfully');
  
  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.querySelector('i').classList.toggle('fa-bars');
      mobileToggle.querySelector('i').classList.toggle('fa-times');
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      // Close mobile menu if open
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.querySelector('i').classList.add('fa-bars');
        mobileToggle.querySelector('i').classList.remove('fa-times');
      }
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: targetPosition - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Gallery hover effects
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    const caption = item.querySelector('.gallery-caption');
    
    if (caption) {
      item.addEventListener('mouseenter', () => {
        caption.style.opacity = '1';
      });
      
      item.addEventListener('mouseleave', () => {
        caption.style.opacity = '0';
      });
    }
  });
  
  // Reveal animations on scroll
  const revealElements = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    // All sections to animate
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      
      if (sectionTop < windowHeight - revealPoint) {
        section.classList.add('active');
      }
    });
    
    // Gallery items
    galleryItems.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;
      
      if (itemTop < windowHeight - revealPoint) {
        item.classList.add('active');
        setTimeout(() => {
          const caption = item.querySelector('.gallery-caption');
          if (caption) caption.classList.add('active');
        }, 300);
      }
    });
    
    // Journal items
    const journalItems = document.querySelectorAll('.journal-item');
    
    journalItems.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top;
      
      if (itemTop < windowHeight - revealPoint) {
        setTimeout(() => {
          item.classList.add('active');
        }, index * 200); // Staggered animation
      }
    });
  };
  
  // Run on load and scroll
  window.addEventListener('scroll', revealElements);
  revealElements(); // Initial check
  
  // Form submission handling
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form submission
      const submitButton = contactForm.querySelector('.btn');
      const originalText = submitButton.textContent;
      
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        submitButton.textContent = 'Message Sent!';
        
        // Reset button after a delay
        setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }, 3000);
      }, 1500);
    });
  }
  
  // Newsletter form
  const newsletterForm = document.querySelector('.footer-links-container form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const submitButton = newsletterForm.querySelector('.btn');
      const originalText = submitButton.textContent;
      
      submitButton.textContent = 'Subscribing...';
      submitButton.disabled = true;
      
      setTimeout(() => {
        // Reset form
        newsletterForm.reset();
        
        // Show success message
        submitButton.textContent = 'Subscribed!';
        
        // Reset button after a delay
        setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }, 3000);
      }, 1500);
    });
  }
});