// Mobile navigation functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile drawer menu
    initMobileDrawer();
    
    // Initialize mobile bottom navigation
    initMobileBottomNav();
    
    // Initialize mobile section navigation
    initMobileSectionNav();
    
    // Initialize mobile breadcrumbs
    initMobileBreadcrumbs();
    
    // Initialize mobile floating action button
    initMobileFab();
    
    // Initialize mobile tabs
    initMobileTabs();
});

// Function to initialize mobile drawer menu
function initMobileDrawer() {
    const header = document.querySelector('header');
    
    // Create mobile menu button if it doesn't exist
    if (!document.querySelector('.mobile-menu-btn')) {
        const menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.innerHTML = '☰';
        menuBtn.setAttribute('aria-label', 'Open menu');
        header.appendChild(menuBtn);
        
        // Create mobile drawer if it doesn't exist
        if (!document.querySelector('.mobile-drawer')) {
            const drawer = document.createElement('div');
            drawer.className = 'mobile-drawer';
            
            // Create drawer header
            const drawerHeader = document.createElement('div');
            drawerHeader.className = 'drawer-header';
            
            const drawerTitle = document.createElement('h2');
            drawerTitle.textContent = 'Orthotics Portal';
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'drawer-close';
            closeBtn.innerHTML = '✕';
            closeBtn.setAttribute('aria-label', 'Close menu');
            
            drawerHeader.appendChild(drawerTitle);
            drawerHeader.appendChild(closeBtn);
            drawer.appendChild(drawerHeader);
            
            // Create drawer navigation
            const drawerNav = document.createElement('nav');
            drawerNav.className = 'drawer-nav';
            
            const navList = document.createElement('ul');
            
            // Get main navigation items
            const mainNavItems = document.querySelectorAll('header nav ul li a');
            
            mainNavItems.forEach(item => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = item.href;
                a.textContent = item.textContent;
                if (item.classList.contains('active')) {
                    a.classList.add('active');
                }
                li.appendChild(a);
                navList.appendChild(li);
            });
            
            drawerNav.appendChild(navList);
            drawer.appendChild(drawerNav);
            
            // Create drawer overlay
            const overlay = document.createElement('div');
            overlay.className = 'drawer-overlay';
            
            // Add drawer and overlay to body
            document.body.appendChild(drawer);
            document.body.appendChild(overlay);
            
            // Toggle drawer on menu button click
            menuBtn.addEventListener('click', function() {
                drawer.classList.add('open');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            // Close drawer on close button click
            closeBtn.addEventListener('click', function() {
                drawer.classList.remove('open');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Close drawer on overlay click
            overlay.addEventListener('click', function() {
                drawer.classList.remove('open');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }
}

// Function to initialize mobile bottom navigation
function initMobileBottomNav() {
    // Create mobile bottom navigation if it doesn't exist
    if (!document.querySelector('.mobile-bottom-nav')) {
        const bottomNav = document.createElement('div');
        bottomNav.className = 'mobile-bottom-nav';
        
        // Get main navigation items
        const mainNavItems = document.querySelectorAll('header nav ul li a');
        
        // Create bottom nav items (limit to 5 items)
        const maxItems = Math.min(mainNavItems.length, 5);
        
        for (let i = 0; i < maxItems; i++) {
            const item = mainNavItems[i];
            const a = document.createElement('a');
            a.href = item.href;
            
            // Create icon based on text
            let icon = '📄';
            if (item.textContent.includes('Home')) icon = '🏠';
            if (item.textContent.includes('Prescription')) icon = '📋';
            if (item.textContent.includes('Order')) icon = '📦';
            if (item.textContent.includes('Invoice')) icon = '💰';
            
            const iconSpan = document.createElement('span');
            iconSpan.className = 'nav-icon';
            iconSpan.textContent = icon;
            
            const textSpan = document.createElement('span');
            textSpan.textContent = item.textContent;
            
            a.appendChild(iconSpan);
            a.appendChild(textSpan);
            
            if (item.classList.contains('active')) {
                a.classList.add('active');
            }
            
            bottomNav.appendChild(a);
        }
        
        document.body.appendChild(bottomNav);
    }
}

// Function to initialize mobile section navigation
function initMobileSectionNav() {
    const tocContainer = document.querySelector('.toc-container');
    
    if (tocContainer && !document.querySelector('.mobile-section-nav')) {
        // Create mobile section navigation
        const sectionNav = document.createElement('div');
        sectionNav.className = 'mobile-section-nav';
        
        // Create section toggle
        const sectionToggle = document.createElement('div');
        sectionToggle.className = 'section-toggle';
        
        const toggleTitle = document.createElement('h3');
        toggleTitle.textContent = 'Sections';
        
        const toggleIcon = document.createElement('span');
        toggleIcon.className = 'toggle-icon';
        toggleIcon.textContent = '▼';
        
        sectionToggle.appendChild(toggleTitle);
        sectionToggle.appendChild(toggleIcon);
        sectionNav.appendChild(sectionToggle);
        
        // Create section content
        const sectionContent = document.createElement('div');
        sectionContent.className = 'section-content';
        
        // Get TOC items
        const tocItems = tocContainer.querySelectorAll('.toc a');
        
        const navList = document.createElement('ul');
        
        tocItems.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.textContent;
            if (item.classList.contains('active')) {
                a.classList.add('active');
            }
            li.appendChild(a);
            navList.appendChild(li);
        });
        
        sectionContent.appendChild(navList);
        sectionNav.appendChild(sectionContent);
        
        // Insert before prescription form
        const prescriptionForm = document.querySelector('.prescription-form');
        if (prescriptionForm) {
            prescriptionForm.parentNode.insertBefore(sectionNav, prescriptionForm);
        }
        
        // Toggle section content on toggle click
        sectionToggle.addEventListener('click', function() {
            sectionNav.classList.toggle('open');
        });
    }
}

// Function to initialize mobile breadcrumbs
function initMobileBreadcrumbs() {
    // Create mobile breadcrumbs if they don't exist
    if (!document.querySelector('.mobile-breadcrumbs')) {
        const breadcrumbs = document.createElement('div');
        breadcrumbs.className = 'mobile-breadcrumbs';
        
        // Add home link
        const homeLink = document.createElement('a');
        homeLink.href = 'index.html';
        homeLink.textContent = 'Home';
        breadcrumbs.appendChild(homeLink);
        
        // Add current page link
        const currentLink = document.createElement('a');
        currentLink.href = '#';
        currentLink.textContent = document.title.replace(' - ', ' ');
        breadcrumbs.appendChild(currentLink);
        
        // Insert at the beginning of main content
        const main = document.querySelector('main');
        if (main) {
            main.insertBefore(breadcrumbs, main.firstChild);
        }
    }
}

// Function to initialize mobile floating action button
function initMobileFab() {
    // Create mobile FAB if it doesn't exist
    if (!document.querySelector('.mobile-fab')) {
        const fab = document.createElement('div');
        fab.className = 'mobile-fab';
        fab.innerHTML = '+';
        fab.setAttribute('aria-label', 'Add new prescription');
        
        // Add click event
        fab.addEventListener('click', function() {
            alert('Create new prescription');
        });
        
        document.body.appendChild(fab);
    }
}

// Function to initialize mobile tabs
function initMobileTabs() {
    // Look for tab-like structures
    const tabSections = document.querySelectorAll('.two-column-layout');
    
    tabSections.forEach(section => {
        // Skip if already initialized
        if (section.classList.contains('mobile-initialized')) return;
        
        // Mark as initialized
        section.classList.add('mobile-initialized');
        
        // Get column headers
        const headers = section.querySelectorAll('.column-header');
        
        if (headers.length >= 2) {
            // Create mobile tabs
            const tabs = document.createElement('div');
            tabs.className = 'mobile-tabs';
            
            headers.forEach((header, index) => {
                const tab = document.createElement('div');
                tab.className = 'tab';
                if (index === 0) tab.classList.add('active');
                tab.textContent = header.textContent;
                tab.setAttribute('data-index', index);
                tabs.appendChild(tab);
            });
            
            // Insert tabs before section
            section.parentNode.insertBefore(tabs, section);
            
            // Add click event to tabs
            tabs.querySelectorAll('.tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    // Update active tab
                    tabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Show corresponding content
                    const index = parseInt(this.getAttribute('data-index'));
                    
                    // Find all form rows in this section
                    const formRows = section.parentNode.querySelectorAll('.form-row');
                    
                    formRows.forEach(row => {
                        const inputs = row.querySelectorAll('.form-input');
                        
                        inputs.forEach((input, i) => {
                            if (i === index) {
                                input.style.display = 'block';
                            } else {
                                input.style.display = 'none';
                            }
                        });
                    });
                });
            });
            
            // Initially hide right column on mobile
            if (window.innerWidth <= 768) {
                const formRows = section.parentNode.querySelectorAll('.form-row');
                
                formRows.forEach(row => {
                    const inputs = row.querySelectorAll('.form-input');
                    
                    inputs.forEach((input, i) => {
                        if (i !== 0) {
                            input.style.display = 'none';
                        }
                    });
                });
            }
        }
    });
}

// Update mobile view on resize
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        // Initialize mobile tabs if not already
        initMobileTabs();
        
        // Show only active tab content
        document.querySelectorAll('.mobile-tabs').forEach(tabs => {
            const activeTab = tabs.querySelector('.tab.active');
            if (activeTab) {
                const index = parseInt(activeTab.getAttribute('data-index'));
                const section = tabs.nextElementSibling;
                
                // Find all form rows in this section
                const formRows = section.parentNode.querySelectorAll('.form-row');
                
                formRows.forEach(row => {
                    const inputs = row.querySelectorAll('.form-input');
                    
                    inputs.forEach((input, i) => {
                        if (i === index) {
                            input.style.display = 'block';
                        } else {
                            input.style.display = 'none';
                        }
                    });
                });
            }
        });
    } else {
        // Show all columns on desktop
        document.querySelectorAll('.form-row').forEach(row => {
            const inputs = row.querySelectorAll('.form-input');
            
            inputs.forEach(input => {
                input.style.display = 'block';
            });
        });
    }
});
