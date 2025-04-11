// Enhanced mobile dropdown functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize enhanced mobile dropdowns
    initMobileDropdowns();
    
    // Initialize searchable selects
    initSearchableSelects();
    
    // Initialize mobile number inputs
    initMobileNumberInputs();
    
    // Initialize mobile radio buttons and checkboxes
    initMobileRadioCheckboxes();
    
    // Initialize mobile range sliders
    initMobileRangeSliders();
});

// Function to initialize enhanced mobile dropdowns
function initMobileDropdowns() {
    const selects = document.querySelectorAll('select:not(.searchable-select)');
    
    selects.forEach(select => {
        // Create wrapper if not already wrapped
        if (!select.parentElement.classList.contains('mobile-select-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'mobile-select-wrapper';
            select.parentNode.insertBefore(wrapper, select);
            wrapper.appendChild(select);
        }
        
        // Ensure proper sizing and styling for touch
        select.style.minHeight = '50px';
        select.style.fontSize = '16px';
        
        // Add better padding for touch targets
        select.style.paddingTop = '15px';
        select.style.paddingBottom = '15px';
        select.style.paddingLeft = '15px';
        select.style.paddingRight = '40px';
    });
}

// Function to initialize searchable selects
function initSearchableSelects() {
    const searchableSelects = document.querySelectorAll('.searchable-select');
    
    // Create overlay for mobile selects if it doesn't exist
    if (!document.querySelector('.mobile-select-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-select-overlay';
        document.body.appendChild(overlay);
        
        // Close dropdown when clicking overlay
        overlay.addEventListener('click', function() {
            document.querySelectorAll('.mobile-searchable-select.open').forEach(select => {
                select.classList.remove('open');
            });
            overlay.classList.remove('active');
        });
    }
    
    searchableSelects.forEach(select => {
        // Skip if already initialized
        if (select.classList.contains('mobile-initialized')) return;
        
        // Get select options
        const options = Array.from(select.options).map(option => {
            return {
                value: option.value,
                text: option.text,
                selected: option.selected
            };
        });
        
        // Create mobile searchable select
        const mobileSelect = document.createElement('div');
        mobileSelect.className = 'mobile-searchable-select';
        select.parentNode.insertBefore(mobileSelect, select);
        
        // Hide original select
        select.style.display = 'none';
        select.classList.add('mobile-initialized');
        
        // Create display element
        const displayElement = document.createElement('div');
        displayElement.className = 'select-display';
        
        const selectedValue = document.createElement('div');
        selectedValue.className = 'selected-value';
        selectedValue.textContent = options.find(opt => opt.selected)?.text || 'Select an option';
        
        const dropdownIcon = document.createElement('div');
        dropdownIcon.className = 'dropdown-icon';
        dropdownIcon.innerHTML = '▼';
        
        displayElement.appendChild(selectedValue);
        displayElement.appendChild(dropdownIcon);
        mobileSelect.appendChild(displayElement);
        
        // Create dropdown panel
        const dropdownPanel = document.createElement('div');
        dropdownPanel.className = 'dropdown-panel';
        
        // Create dropdown header
        const dropdownHeader = document.createElement('div');
        dropdownHeader.className = 'dropdown-header';
        
        const headerTitle = document.createElement('h3');
        headerTitle.textContent = select.getAttribute('data-title') || 'Select an option';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '✕';
        closeBtn.setAttribute('aria-label', 'Close dropdown');
        
        dropdownHeader.appendChild(headerTitle);
        dropdownHeader.appendChild(closeBtn);
        dropdownPanel.appendChild(dropdownHeader);
        
        // Create search box
        const searchBox = document.createElement('div');
        searchBox.className = 'search-box';
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search...';
        
        searchBox.appendChild(searchInput);
        dropdownPanel.appendChild(searchBox);
        
        // Create options list
        const optionsList = document.createElement('div');
        optionsList.className = 'options-list';
        
        // Add options to list
        options.forEach(option => {
            const optionItem = document.createElement('div');
            optionItem.className = 'option-item';
            if (option.selected) optionItem.classList.add('selected');
            optionItem.setAttribute('data-value', option.value);
            optionItem.textContent = option.text;
            
            optionsList.appendChild(optionItem);
        });
        
        dropdownPanel.appendChild(optionsList);
        document.body.appendChild(dropdownPanel);
        
        // Toggle dropdown on display element click
        displayElement.addEventListener('click', function() {
            const overlay = document.querySelector('.mobile-select-overlay');
            
            // Close any open dropdowns
            document.querySelectorAll('.mobile-searchable-select.open').forEach(openSelect => {
                if (openSelect !== mobileSelect) {
                    openSelect.classList.remove('open');
                }
            });
            
            // Toggle current dropdown
            mobileSelect.classList.toggle('open');
            
            // Toggle overlay
            if (mobileSelect.classList.contains('open')) {
                overlay.classList.add('active');
            } else {
                overlay.classList.remove('active');
            }
        });
        
        // Close dropdown on close button click
        closeBtn.addEventListener('click', function() {
            mobileSelect.classList.remove('open');
            document.querySelector('.mobile-select-overlay').classList.remove('active');
        });
        
        // Filter options on search input
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            optionsList.querySelectorAll('.option-item').forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
        
        // Select option on option item click
        optionsList.querySelectorAll('.option-item').forEach(item => {
            item.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                const text = this.textContent;
                
                // Update selected value
                selectedValue.textContent = text;
                
                // Update original select
                select.value = value;
                
                // Trigger change event on original select
                const event = new Event('change', { bubbles: true });
                select.dispatchEvent(event);
                
                // Update selected class
                optionsList.querySelectorAll('.option-item').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                
                // Close dropdown
                mobileSelect.classList.remove('open');
                document.querySelector('.mobile-select-overlay').classList.remove('active');
            });
        });
    });
}

// Function to initialize mobile number inputs
function initMobileNumberInputs() {
    const numberInputs = document.querySelectorAll('.number-input-container');
    
    numberInputs.forEach(container => {
        // Skip if already initialized
        if (container.classList.contains('mobile-initialized')) return;
        
        const input = container.querySelector('input[type="number"]');
        const decrementBtn = container.querySelector('button.decrement');
        const incrementBtn = container.querySelector('button.increment');
        
        if (input && decrementBtn && incrementBtn) {
            // Mark as initialized
            container.classList.add('mobile-initialized');
            
            // Enhance for mobile
            container.classList.add('mobile-number-input');
            
            // Increase button sizes for touch
            decrementBtn.style.minHeight = '50px';
            decrementBtn.style.minWidth = '50px';
            decrementBtn.style.fontSize = '20px';
            
            incrementBtn.style.minHeight = '50px';
            incrementBtn.style.minWidth = '50px';
            incrementBtn.style.fontSize = '20px';
            
            // Enhance input for touch
            input.style.height = '50px';
            input.style.fontSize = '16px';
            input.style.textAlign = 'center';
            
            // Prevent mousewheel from changing value
            input.addEventListener('wheel', function(e) {
                e.preventDefault();
            }, { passive: false });
        }
    });
}

// Function to initialize mobile radio buttons and checkboxes
function initMobileRadioCheckboxes() {
    // Initialize radio buttons
    const radioGroups = document.querySelectorAll('.radio-group');
    
    radioGroups.forEach(group => {
        // Skip if already initialized
        if (group.classList.contains('mobile-initialized')) return;
        
        // Mark as initialized
        group.classList.add('mobile-initialized');
        group.classList.add('mobile-radio-group');
        
        const radioInputs = group.querySelectorAll('input[type="radio"]');
        
        radioInputs.forEach(radio => {
            const label = document.querySelector(`label[for="${radio.id}"]`);
            
            if (label) {
                // Create mobile radio option
                const radioOption = document.createElement('div');
                radioOption.className = 'mobile-radio-option';
                
                // Move radio input into option
                radio.parentNode.insertBefore(radioOption, radio);
                radioOption.appendChild(radio);
                
                // Create custom radio element
                const customRadio = document.createElement('span');
                customRadio.className = 'radio-custom';
                
                // Update label
                label.prepend(customRadio);
                radioOption.appendChild(label);
            }
        });
    });
    
    // Initialize checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        // Skip if already initialized or inside a special container
        if (checkbox.parentElement.classList.contains('mobile-initialized')) return;
        
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        
        if (label) {
            // Create mobile checkbox
            const checkboxContainer = document.createElement('div');
            checkboxContainer.className = 'mobile-checkbox mobile-initialized';
            
            // Move checkbox into container
            checkbox.parentNode.insertBefore(checkboxContainer, checkbox);
            checkboxContainer.appendChild(checkbox);
            
            // Create custom checkbox element
            const customCheckbox = document.createElement('span');
            customCheckbox.className = 'checkbox-custom';
            
            // Update label
            label.prepend(customCheckbox);
            checkboxContainer.appendChild(label);
        }
    });
}

// Function to initialize mobile range sliders
function initMobileRangeSliders() {
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    
    rangeInputs.forEach(range => {
        // Skip if already initialized
        if (range.parentElement.classList.contains('mobile-initialized')) return;
        
        // Get min, max, and step values
        const min = range.getAttribute('min') || 0;
        const max = range.getAttribute('max') || 100;
        const step = range.getAttribute('step') || 1;
        const value = range.value || min;
        
        // Create mobile range slider
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'mobile-range-slider mobile-initialized';
        
        // Create label with min and max values
        const sliderLabel = document.createElement('div');
        sliderLabel.className = 'slider-label';
        
        const minLabel = document.createElement('span');
        minLabel.textContent = min;
        
        const maxLabel = document.createElement('span');
        maxLabel.textContent = max;
        
        sliderLabel.appendChild(minLabel);
        sliderLabel.appendChild(maxLabel);
        
        // Create slider track
        const sliderTrack = document.createElement('div');
        sliderTrack.className = 'slider-track';
        
        // Create value display
        const valueDisplay = document.createElement('div');
        valueDisplay.className = 'value-display';
        valueDisplay.textContent = value;
        
        // Replace range input with mobile slider
        range.parentNode.insertBefore(sliderContainer, range);
        sliderContainer.appendChild(sliderLabel);
        sliderContainer.appendChild(sliderTrack);
        sliderTrack.appendChild(range);
        sliderContainer.appendChild(valueDisplay);
        
        // Update value display on input
        range.addEventListener('input', function() {
            valueDisplay.textContent = this.value;
        });
    });
}
