/**
 * Mobile Navigation Fix for Static Webflow Export
 * Handles hamburger menu toggle when Webflow JS doesn't work properly
 * 
 * Key insight: Webflow moves .nav_menu into .w-nav-overlay when opened.
 * We need to handle both the overlay and menu positioning.
 */
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Find the nav button, nav menu, and overlay
    const navButton = document.querySelector('.w-nav-button, .nav_button');
    const navMenu = document.querySelector('.w-nav-menu, .nav_menu');
    const nav = document.querySelector('.w-nav');
    const navOverlay = document.querySelector('.w-nav-overlay');
    const navContainer = document.querySelector('.nav_container');
    
    if (!navButton || !navMenu) {
      console.log('Mobile nav fix: Could not find nav elements');
      return;
    }
    
    // Check if we're on mobile viewport
    function isMobileViewport() {
      return window.innerWidth <= 991;
    }
    
    // Get the header height for positioning
    function getNavBottom() {
      const navRect = nav ? nav.getBoundingClientRect() : { bottom: 100 };
      return navRect.bottom;
    }
    
    // Toggle menu visibility
    function toggleMenu() {
      if (!isMobileViewport()) return;
      
      const isOpen = navMenu.hasAttribute('data-nav-menu-open');
      
      if (isOpen) {
        // Close menu
        closeMenu();
      } else {
        // Open menu
        openMenu();
      }
    }
    
    function openMenu() {
      // Set state attributes
      navMenu.setAttribute('data-nav-menu-open', '');
      navButton.classList.add('w--open');
      navButton.setAttribute('aria-expanded', 'true');
      
      // Handle the overlay if it exists
      if (navOverlay) {
        navOverlay.classList.add('w--open');
        navOverlay.style.height = 'auto';
        navOverlay.style.display = 'block';
      }
      
      // Position the menu correctly using fixed positioning
      // This ensures it appears below the nav regardless of DOM structure
      const navBottom = getNavBottom();
      
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'fixed';
      navMenu.style.top = navBottom + 'px';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.backgroundColor = '#f1f1f1';
      navMenu.style.border = '1px solid #dedede';
      navMenu.style.borderRadius = '8px';
      navMenu.style.padding = '1rem 1.75rem 1.5rem';
      navMenu.style.margin = '0 1.25rem';
      navMenu.style.zIndex = '1000';
      navMenu.style.maxHeight = 'calc(100vh - ' + (navBottom + 20) + 'px)';
      navMenu.style.overflowY = 'auto';
    }
    
    function closeMenu() {
      // Clear state attributes
      navMenu.removeAttribute('data-nav-menu-open');
      navButton.classList.remove('w--open');
      navButton.setAttribute('aria-expanded', 'false');
      
      // Handle the overlay if it exists
      if (navOverlay) {
        navOverlay.classList.remove('w--open');
        navOverlay.style.height = '';
        navOverlay.style.display = '';
      }
      
      // Reset menu styles
      resetMenuStyles();
    }
    
    function resetMenuStyles() {
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
      navMenu.style.maxHeight = '';
      navMenu.style.overflowY = '';
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
        closeMenu();
      }
    });
    
    // Close menu when clicking a nav link
    navMenu.querySelectorAll('.nav_link, .w-nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        if (isMobileViewport() && navMenu.hasAttribute('data-nav-menu-open')) {
          closeMenu();
        }
      });
    });
    
    // Handle dropdown toggles in mobile menu
    navMenu.querySelectorAll('.nav_toggle, .w-dropdown-toggle').forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        if (!isMobileViewport()) return;
        e.preventDefault();
        e.stopPropagation();
        
        const dropdown = toggle.closest('.nav_dropdown, .w-dropdown');
        if (!dropdown) return;
        
        const list = dropdown.querySelector('.nav_dropdown-list, .w-dropdown-list');
        if (!list) return;
        
        // Toggle dropdown
        const isDropdownOpen = list.classList.contains('w--open');
        if (isDropdownOpen) {
          list.classList.remove('w--open');
          list.style.display = '';
        } else {
          list.classList.add('w--open');
          list.style.display = 'flex';
          list.style.flexDirection = 'column';
        }
      });
    });
    
    // Reset menu state on resize
    window.addEventListener('resize', function() {
      if (!isMobileViewport()) {
        closeMenu();
        // Also close any open dropdowns
        navMenu.querySelectorAll('.nav_dropdown-list.w--open, .w-dropdown-list.w--open').forEach(function(list) {
          list.classList.remove('w--open');
          list.style.display = '';
        });
      }
    });
    
    // Update position on scroll (since we're using fixed positioning)
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking && navMenu.hasAttribute('data-nav-menu-open')) {
        window.requestAnimationFrame(function() {
          const navBottom = getNavBottom();
          navMenu.style.top = Math.max(navBottom, 0) + 'px';
          ticking = false;
        });
        ticking = true;
      }
    });
    
    console.log('Mobile nav fix: Initialized (v2 - fixed positioning)');
  });
})();
