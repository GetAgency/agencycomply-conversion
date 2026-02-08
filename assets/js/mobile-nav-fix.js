/**
 * Mobile Navigation Fix for Static Webflow Export
 * Handles hamburger menu toggle when Webflow JS doesn't work properly
 */
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Find the nav button and nav menu
    const navButton = document.querySelector('.w-nav-button, .nav_button');
    const navMenu = document.querySelector('.w-nav-menu, .nav_menu');
    const nav = document.querySelector('.w-nav');
    
    if (!navButton || !navMenu) {
      console.log('Mobile nav fix: Could not find nav elements');
      return;
    }
    
    // Check if we're on mobile viewport
    function isMobileViewport() {
      return window.innerWidth <= 991;
    }
    
    // Toggle menu visibility
    function toggleMenu() {
      if (!isMobileViewport()) return;
      
      const isOpen = navMenu.hasAttribute('data-nav-menu-open');
      
      if (isOpen) {
        // Close menu
        navMenu.removeAttribute('data-nav-menu-open');
        navButton.classList.remove('w--open');
        navButton.setAttribute('aria-expanded', 'false');
        navMenu.style.display = '';
      } else {
        // Open menu
        navMenu.setAttribute('data-nav-menu-open', '');
        navButton.classList.add('w--open');
        navButton.setAttribute('aria-expanded', 'true');
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.backgroundColor = '#f1f1f1';
        navMenu.style.border = '1px solid #dedede';
        navMenu.style.borderRadius = '8px';
        navMenu.style.padding = '1rem 1.75rem 1.5rem';
        navMenu.style.margin = '1rem 2.5rem';
        navMenu.style.zIndex = '100';
      }
    }
    
    // Add click handler
    navButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!isMobileViewport()) return;
      
      const isOpen = navMenu.hasAttribute('data-nav-menu-open');
      if (isOpen && !navMenu.contains(e.target) && !navButton.contains(e.target)) {
        toggleMenu();
      }
    });
    
    // Close menu when clicking a nav link
    navMenu.querySelectorAll('.nav_link, .w-nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        if (isMobileViewport() && navMenu.hasAttribute('data-nav-menu-open')) {
          toggleMenu();
        }
      });
    });
    
    // Reset menu state on resize
    window.addEventListener('resize', function() {
      if (!isMobileViewport()) {
        navMenu.removeAttribute('data-nav-menu-open');
        navButton.classList.remove('w--open');
        navButton.setAttribute('aria-expanded', 'false');
        // Reset inline styles
        navMenu.style.display = '';
        navMenu.style.flexDirection = '';
        navMenu.style.position = '';
        navMenu.style.top = '';
        navMenu.style.left = '';
        navMenu.style.right = '';
        navMenu.style.backgroundColor = '';
        navMenu.style.border = '';
        navMenu.style.borderRadius = '';
        navMenu.style.padding = '';
        navMenu.style.margin = '';
        navMenu.style.zIndex = '';
      }
    });
    
    console.log('Mobile nav fix: Initialized');
  });
})();
