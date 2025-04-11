// Luxury Main JavaScript for Orthotics Prescription Portal

document.addEventListener('DOMContentLoaded', function() {
    // Initialize increment/decrement buttons
    initNumberInputs();
    
    // Initialize table of contents highlighting
    initTOC();
    
    // Initialize template selection
    initTemplateSelection();
});

// Function to initialize all number input controls
function initNumberInputs() {
    const containers = document.querySelectorAll('.number-input-container');
    
    containers.forEach(container => {
        const input = container.querySelector('input[type="number"]');
        const decrementBtn = container.querySelector('button.decrement');
        const incrementBtn = container.querySelector('button.increment');
        
        if (input && decrementBtn && incrementBtn) {
            // Decrement button click
            decrementBtn.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent any default behavior
                e.stopPropagation(); // Stop event propagation
                const min = parseFloat(input.getAttribute('min') || 0);
                const step = 1; // Force step to be exactly 1
                let value = parseFloat(input.value) || 0;
                
                value = Math.max(min, value - step);
                input.value = value;
                
                // Trigger change event manually without bubbling
                const event = new Event('change', { bubbles: false });
                input.dispatchEvent(event);
                
                // Prevent double triggering
                return false;
            });
            
            // Increment button click
            incrementBtn.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent any default behavior
                e.stopPropagation(); // Stop event propagation
                const max = parseFloat(input.getAttribute('max') || Infinity);
                const step = 1; // Force step to be exactly 1
                let value = parseFloat(input.value) || 0;
                
                value = Math.min(max, value + step);
                input.value = value;
                
                // Trigger change event manually without bubbling
                const event = new Event('change', { bubbles: false });
                input.dispatchEvent(event);
                
                // Prevent double triggering
                return false;
            });
            
            // Disable native browser increment/decrement
            input.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (e.key === 'ArrowUp') {
                        const max = parseFloat(input.getAttribute('max') || Infinity);
                        let value = parseFloat(input.value) || 0;
                        value = Math.min(max, value + 1);
                        input.value = value;
                    } else {
                        const min = parseFloat(input.getAttribute('min') || 0);
                        let value = parseFloat(input.value) || 0;
                        value = Math.max(min, value - 1);
                        input.value = value;
                    }
                }
            });
            
            // Prevent mousewheel from changing value
            input.addEventListener('wheel', function(e) {
                e.preventDefault();
            }, { passive: false });
            
            // Disable default browser behavior for number inputs
            input.addEventListener('input', function(e) {
                e.stopPropagation();
            });
        }
    });
}

// Function to initialize table of contents highlighting
function initTOC() {
    const sections = document.querySelectorAll('.form-section');
    const tocLinks = document.querySelectorAll('.toc a');
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll to section when clicking TOC links
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Function to initialize template selection
function initTemplateSelection() {
    const templateSelect = document.getElementById('templateSelect');
    const applyTemplateBtn = document.getElementById('applyTemplate');
    
    if (templateSelect && applyTemplateBtn) {
        applyTemplateBtn.addEventListener('click', function() {
            const selectedTemplate = templateSelect.value;
            
            if (selectedTemplate === 'custom') {
                // Reset form to default values
                resetForm();
            } else {
                // Apply template parameters
                applyTemplate(selectedTemplate);
            }
        });
    }
}

// Function to reset form to default values
function resetForm() {
    // Reset all inputs to their default values
    document.querySelectorAll('input, select').forEach(input => {
        if (input.type === 'radio' || input.type === 'checkbox') {
            input.checked = input.defaultChecked;
        } else {
            input.value = input.defaultValue;
        }
    });
}

// Function to apply template parameters
function applyTemplate(templateName) {
    // This function would be expanded to apply specific template parameters
    console.log(`Applying template: ${templateName}`);
    
    // Example template application logic would go here
    // For now, we'll just show an alert
    alert(`Template "${templateName}" applied successfully.`);
}
