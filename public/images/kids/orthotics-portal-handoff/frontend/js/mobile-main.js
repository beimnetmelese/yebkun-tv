// Mobile-friendly JavaScript for Orthotics Prescription Portal

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize mobile TOC toggle
    initMobileTOC();
    
    // Initialize mobile bottom navigation
    initMobileBottomNav();
    
    // Initialize floating action button
    initFloatingActionButton();
});

// Function to initialize mobile menu toggle
function initMobileMenu() {
    const header = document.querySelector('header');
    
    // Create mobile menu toggle button if it doesn't exist
    if (!document.querySelector('.mobile-menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        header.appendChild(menuToggle);
        
        // Add event listener to toggle menu
        menuToggle.addEventListener('click', function() {
            const navMenu = document.querySelector('nav ul');
            navMenu.classList.toggle('show');
            
            // Change icon based on menu state
            this.innerHTML = navMenu.classList.contains('show') ? '✕' : '☰';
        });
    }
}

// Function to initialize mobile TOC toggle
function initMobileTOC() {
    const tocContainer = document.querySelector('.toc-container');
    const toc = document.querySelector('.toc');
    
    // Create mobile TOC toggle button if it doesn't exist
    if (tocContainer && !document.querySelector('.mobile-toc-toggle')) {
        const tocToggle = document.createElement('button');
        tocToggle.className = 'mobile-toc-toggle';
        tocToggle.textContent = 'Contents';
        tocToggle.setAttribute('aria-label', 'Toggle table of contents');
        tocContainer.insertBefore(tocToggle, toc);
        
        // Add event listener to toggle TOC
        tocToggle.addEventListener('click', function() {
            toc.classList.toggle('show');
            
            // Update toggle text based on TOC state
            this.textContent = toc.classList.contains('show') ? 'Hide Contents' : 'Contents';
            
            // Update toggle icon
            this.style.setProperty('--after-content', toc.classList.contains('show') ? '"▲"' : '"▼"');
        });
    }
}

// Function to initialize mobile bottom navigation
function initMobileBottomNav() {
    // Create mobile bottom navigation if it doesn't exist
    if (!document.querySelector('.mobile-bottom-nav')) {
        const bottomNav = document.createElement('div');
        bottomNav.className = 'mobile-bottom-nav';
        
        // Add navigation items
        bottomNav.innerHTML = `
            <a href="index.html" class="${window.location.pathname.includes('index.html') ? 'active' : ''}">
                <span class="icon">🏠</span>
                <span>Home</span>
            </a>
            <a href="prescriptions.html" class="${window.location.pathname.includes('prescriptions.html') ? 'active' : ''}">
                <span class="icon">📋</span>
                <span>Prescriptions</span>
            </a>
            <a href="orders.html" class="${window.location.pathname.includes('orders.html') ? 'active' : ''}">
                <span class="icon">📦</span>
                <span>Orders</span>
            </a>
            <a href="invoices.html" class="${window.location.pathname.includes('invoices.html') ? 'active' : ''}">
                <span class="icon">📄</span>
                <span>Invoices</span>
            </a>
        `;
        
        document.body.appendChild(bottomNav);
    }
}

// Function to initialize floating action button
function initFloatingActionButton() {
    // Create floating action button if it doesn't exist
    if (!document.querySelector('.floating-action-button')) {
        const fab = document.createElement('button');
        fab.className = 'floating-action-button';
        fab.innerHTML = '+';
        fab.setAttribute('aria-label', 'Create new prescription');
        
        // Add event listener
        fab.addEventListener('click', function() {
            // Action for FAB - could be creating a new prescription or showing options
            alert('Create new prescription');
        });
        
        document.body.appendChild(fab);
    }
}

// Enhanced touch-friendly number input controls
function enhanceTouchInputs() {
    const numberInputs = document.querySelectorAll('.number-input-container');
    
    numberInputs.forEach(container => {
        // Increase button sizes for touch
        const buttons = container.querySelectorAll('button');
        buttons.forEach(button => {
            button.style.minHeight = '44px';
            button.style.minWidth = '44px';
            button.style.fontSize = '18px';
        });
        
        // Enhance input for touch
        const input = container.querySelector('input');
        if (input) {
            input.style.height = '44px';
            input.style.fontSize = '16px';
            input.style.textAlign = 'center';
        }
    });
}

// Function to make dropdowns more touch-friendly
function enhanceDropdowns() {
    const selects = document.querySelectorAll('select');
    
    selects.forEach(select => {
        // Ensure proper sizing for touch
        select.style.minHeight = '44px';
        select.style.fontSize = '16px';
        
        // Add better padding for touch targets
        select.style.paddingTop = '12px';
        select.style.paddingBottom = '12px';
        select.style.paddingLeft = '16px';
        select.style.paddingRight = '40px';
    });
}

// Function to optimize form layout for mobile
function optimizeFormLayout() {
    // Convert multi-column layouts to single column on mobile
    const formRows = document.querySelectorAll('.form-row');
    
    formRows.forEach(row => {
        if (window.innerWidth <= 768) {
            row.style.flexDirection = 'column';
            
            const label = row.querySelector('.form-label');
            const input = row.querySelector('.form-input');
            
            if (label) {
                label.style.width = '100%';
                label.style.paddingRight = '0';
                label.style.marginBottom = '8px';
            }
            
            if (input) {
                input.style.width = '100%';
                input.style.padding = '0';
            }
        }
    });
}

// Call these functions when window resizes
window.addEventListener('resize', function() {
    enhanceTouchInputs();
    enhanceDropdowns();
    optimizeFormLayout();
});

// Call them on initial load too
document.addEventListener('DOMContentLoaded', function() {
    enhanceTouchInputs();
    enhanceDropdowns();
    optimizeFormLayout();
});
