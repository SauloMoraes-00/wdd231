// Mobile Navigation Setup
export function setupMobileNav() {
    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const mobileNav = document.getElementById("mobileNav");
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    mobileMenuButton.addEventListener("click", function() {
        mobileNav.classList.toggle("open");
        this.classList.toggle("open");
        navOverlay.classList.toggle("open");
        
        // Toggle body scroll
        document.body.style.overflow = mobileNav.classList.contains("open") ? 'hidden' : '';
    });

    // Close menu when clicking overlay
    navOverlay.addEventListener('click', () => {
        mobileNav.classList.remove("open");
        mobileMenuButton.classList.remove("open");
        navOverlay.classList.remove("open");
        document.body.style.overflow = '';
    });

    // Close menu when clicking links
    const navLinks = mobileNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove("open");
            mobileMenuButton.classList.remove("open");
            navOverlay.classList.remove("open");
            document.body.style.overflow = '';
        });
    });
}
  
  // Toggle Loading Spinner
  export function toggleLoading(show) {
    let spinner = document.getElementById('loading-spinner');
    
    if (!spinner && show) {
      spinner = document.createElement('div');
      spinner.id = 'loading-spinner';
      spinner.innerHTML = `
        <div class="spinner"></div>
        <p>Loading...</p>
      `;
      document.body.appendChild(spinner);
    }
  
    if (spinner) {
      spinner.style.display = show ? 'flex' : 'none';
    }
  }
  
  // Display Toast Notifications
  export function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
  
    setTimeout(() => {
      toast.classList.add('fade-out');
      toast.addEventListener('animationend', () => toast.remove());
    }, duration);
  }
  
  // Initialize Tooltips
  export function setupTooltips() {
    const elements = document.querySelectorAll('[data-tooltip]');
    
    elements.forEach(el => {
      const tooltip = document.createElement('span');
      tooltip.className = 'tooltip';
      tooltip.textContent = el.dataset.tooltip;
      el.appendChild(tooltip);
  
      el.addEventListener('mouseenter', () => {
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
      });
  
      el.addEventListener('mouseleave', () => {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
      });
    });
  }
  
  // Responsive Layout Adjustments
  export function setupResponsiveLayout() {
    function handleResize() {
      const viewportWidth = window.innerWidth;
      const body = document.body;
  
      if (viewportWidth < 768) {
        body.classList.add('mobile-view');
        body.classList.remove('desktop-view');
      } else {
        body.classList.add('desktop-view');
        body.classList.remove('mobile-view');
      }
    }
  
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
  }
  
  // Current Page Highlight in Navigation
  export function highlightCurrentPage() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop();
  
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href').split('/').pop();
      if (linkPath === currentPath) {
        link.classList.add('active');
      }
    });
  }
  
  // Initialize all UI components
  export function initializeUI() {
    setupMobileNav();
    setupTooltips();
    setupResponsiveLayout();
    highlightCurrentPage();
  }