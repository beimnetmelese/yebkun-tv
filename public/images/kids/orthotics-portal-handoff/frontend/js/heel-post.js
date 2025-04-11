// Add JavaScript to handle the heel post type selection
document.addEventListener('DOMContentLoaded', function() {
    // Get all heel post type selectors
    const heelPostSelectors = document.querySelectorAll('.heel-post-type');
    
    // Add event listeners to each selector
    heelPostSelectors.forEach(selector => {
        selector.addEventListener('change', function() {
            const parentInput = this.closest('.form-input');
            const halfWidthOptions = parentInput.querySelector('.half-width-options');
            
            // Show/hide half width options based on selection
            if (this.value === 'half-width') {
                halfWidthOptions.style.display = 'block';
            } else {
                halfWidthOptions.style.display = 'none';
            }
        });
    });
    
    // Initialize all number input buttons
    const decrementButtons = document.querySelectorAll('.decrement');
    const incrementButtons = document.querySelectorAll('.increment');
    
    decrementButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.nextElementSibling;
            if (input && input.value > input.min) {
                input.value = Number(input.value) - (input.step || 1);
            }
        });
    });
    
    incrementButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input && input.value < input.max) {
                input.value = Number(input.value) + (input.step || 1);
            }
        });
    });
});
