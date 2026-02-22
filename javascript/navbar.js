// Navbar scroll effect
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll);
  // run once in case page is loaded scrolled
  onScroll();

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Handle PROJECT dropdown menu item clicks to activate correct tab
  const projectDropdownLinks = document.querySelectorAll('.dropdown-menu a');
  projectDropdownLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      // Get the tab to activate from the hash
      const hash = this.getAttribute('href').split('#')[1];
      
      // Check if we're already on the project page
      if (currentPage === 'project.html' || currentPage.includes('project')) {
        // We're on the project page, activate the tab directly
        if (hash) {
          const tabBtn = document.querySelector(`[data-tab="${hash.replace('-tab', '')}"]`);
          if (tabBtn) {
            tabBtn.click();
            // Scroll to the tab content
            const tabContent = document.getElementById(hash);
            if (tabContent) {
              tabContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }
      } else {
        // We're not on the project page, store the tab and navigate
        if (hash) {
          sessionStorage.setItem('activeProjectTab', hash);
        }
        window.location.href = 'project.html';
      }
    });
  });

  // If we're on the project page and there's a stored active tab, activate it
  if (currentPage === 'project.html' || currentPage.includes('project')) {
    const activeTab = sessionStorage.getItem('activeProjectTab');
    if (activeTab) {
      // Wait for portfolio.js to load and render
      setTimeout(() => {
        const tabBtn = document.querySelector(`[data-tab="${activeTab.replace('-tab', '')}"]`);
        if (tabBtn) {
          tabBtn.click();
        }
        // Clear the stored value
        sessionStorage.removeItem('activeProjectTab');
      }, 100);
    }
  }
});

