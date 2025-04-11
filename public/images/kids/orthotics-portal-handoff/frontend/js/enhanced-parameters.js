// Enhanced template preset loading and parameter editing
document.addEventListener('DOMContentLoaded', function() {
    // Make all parameters editable and enhance preset loading
    setupAllParameters();
    
    // Setup preset selection buttons with enhanced functionality
    document.querySelectorAll('.select-preset-btn').forEach(button => {
        button.addEventListener('click', function() {
            const condition = this.dataset.condition;
            applyPresetEnhanced(condition);
            
            // Highlight selected card and remove highlight from others
            document.querySelectorAll('.foot-condition-card').forEach(card => {
                card.classList.remove('selected');
            });
            const selectedCard = document.querySelector(`.foot-condition-card[data-condition="${condition}"]`);
            if (selectedCard) {
                selectedCard.classList.add('selected');
            }
        });
    });
});

// Setup all parameters to ensure they're editable
function setupAllParameters() {
    // Setup all range sliders with visual feedback
    const allSliders = document.querySelectorAll('.parameter-slider');
    allSliders.forEach(slider => {
        const valueDisplay = document.getElementById(`${slider.id}Value`);
        if (valueDisplay) {
            // Ensure initial value is set
            updateValueDisplay(slider, valueDisplay);
            
            // Add input event listener
            slider.addEventListener('input', function() {
                updateValueDisplay(this, valueDisplay);
            });
        }
        
        // Add tooltip with explanation
        const parameterVisual = slider.closest('.parameter-visual');
        if (parameterVisual) {
            const tooltip = document.createElement('div');
            tooltip.className = 'parameter-tooltip';
            tooltip.textContent = getParameterDescription(slider.id);
            parameterVisual.appendChild(tooltip);
        }
    });
    
    // Setup all select elements with visual feedback
    const allSelects = document.querySelectorAll('.parameter-visual select');
    allSelects.forEach(select => {
        // Add change event listener for visual feedback
        select.addEventListener('change', function() {
            const parameterVisual = this.closest('.parameter-visual');
            if (parameterVisual) {
                // Add highlight effect
                parameterVisual.classList.add('parameter-preset-applied');
                setTimeout(() => {
                    parameterVisual.classList.remove('parameter-preset-applied');
                }, 2000);
            }
        });
        
        // Add tooltip with explanation
        const parameterVisual = select.closest('.parameter-visual');
        if (parameterVisual) {
            const tooltip = document.createElement('div');
            tooltip.className = 'parameter-tooltip';
            tooltip.textContent = getParameterDescription(select.id);
            parameterVisual.appendChild(tooltip);
        }
    });
    
    // Setup all checkboxes with visual feedback
    const allCheckboxes = document.querySelectorAll('.parameter-visual input[type="checkbox"]');
    allCheckboxes.forEach(checkbox => {
        // Add change event listener for visual feedback
        checkbox.addEventListener('change', function() {
            const parameterVisual = this.closest('.parameter-visual');
            if (parameterVisual) {
                // Add highlight effect
                parameterVisual.classList.add('parameter-preset-applied');
                setTimeout(() => {
                    parameterVisual.classList.remove('parameter-preset-applied');
                }, 2000);
            }
        });
    });
}

// Update value display for sliders
function updateValueDisplay(slider, valueDisplay) {
    let unit = '';
    
    // Determine appropriate unit based on slider ID
    if (slider.id.includes('Angle') || slider.id.includes('Varus') || slider.id.includes('Post')) {
        unit = '°';
    } else if (slider.id.includes('Height') || slider.id.includes('Expansion') || slider.id.includes('Depth') || slider.id.includes('Thickness')) {
        unit = 'mm';
    }
    
    valueDisplay.textContent = slider.value + unit;
}

// Enhanced preset application with visual feedback
function applyPresetEnhanced(condition) {
    if (!presetData[condition]) return;
    
    const preset = presetData[condition];
    
    // Apply preset values to all available parameters
    Object.keys(preset).forEach(key => {
        if (key === 'name') return; // Skip the name property
        
        const value = preset[key];
        
        // Handle different types of form elements
        if (typeof value === 'number') {
            // For numeric values (sliders)
            const slider = document.getElementById(key);
            if (slider) {
                slider.value = value;
                
                // Update the displayed value
                const valueDisplay = document.getElementById(`${key}Value`);
                if (valueDisplay) {
                    updateValueDisplay(slider, valueDisplay);
                }
                
                // Add visual feedback
                const parameterVisual = slider.closest('.parameter-visual');
                if (parameterVisual) {
                    parameterVisual.classList.add('parameter-preset-applied');
                    setTimeout(() => {
                        parameterVisual.classList.remove('parameter-preset-applied');
                    }, 2000);
                }
            }
        } else if (typeof value === 'boolean') {
            // For boolean values (checkboxes)
            const checkbox = document.getElementById(key);
            if (checkbox) {
                checkbox.checked = value;
                
                // Add visual feedback
                const parameterVisual = checkbox.closest('.parameter-visual');
                if (parameterVisual) {
                    parameterVisual.classList.add('parameter-preset-applied');
                    setTimeout(() => {
                        parameterVisual.classList.remove('parameter-preset-applied');
                    }, 2000);
                }
            }
        } else if (typeof value === 'string') {
            // For string values (select dropdowns)
            const select = document.getElementById(key);
            if (select) {
                select.value = value;
                
                // Add visual feedback
                const parameterVisual = select.closest('.parameter-visual');
                if (parameterVisual) {
                    parameterVisual.classList.add('parameter-preset-applied');
                    setTimeout(() => {
                        parameterVisual.classList.remove('parameter-preset-applied');
                    }, 2000);
                }
            }
            
            // Special case for radio buttons
            if (key.endsWith('Type')) {
                const radioId = `${key.replace('Type', '')}${value.charAt(0).toUpperCase() + value.slice(1)}`;
                const radio = document.getElementById(radioId);
                if (radio) {
                    radio.checked = true;
                }
            }
        }
    });
    
    // Scroll to clinical measures section with smooth animation
    document.getElementById('clinicalMeasuresCollapse').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    // Show success message
    showToast(`${preset.name} preset applied. All parameters can be adjusted as needed.`);
}

// Show toast notification
function showToast(message) {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastId = 'toast-' + Date.now();
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.id = toastId;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">Orthotics Prescription</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        toast.remove();
    }, 5000);
    
    // Add close button functionality
    const closeButton = toast.querySelector('.btn-close');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            toast.remove();
        });
    }
}

// Get parameter description for tooltips
function getParameterDescription(parameterId) {
    const descriptions = {
        // Clinical Measures
        'scanAngle': 'Adjusts the angle of the foot scan relative to the ground plane',
        'foreFootVarus': 'Corrects forefoot varus/valgus alignment',
        'rearFootVarus': 'Corrects rearfoot varus/valgus alignment',
        'archHeight': 'Sets the height of the medial longitudinal arch',
        
        // Intrinsic Adjustments
        'archExpansion': 'Adjusts the medial/lateral expansion of the arch',
        'heelExpansion': 'Adjusts the medial/lateral expansion of the heel cup',
        'shellWidth': 'Sets the overall width of the orthotic shell',
        'shellLength': 'Sets the overall length of the orthotic shell',
        
        // Off-Loading
        'cuboid': 'Modifies the cuboid area of the orthotic',
        'styloid': 'Modifies the styloid area of the orthotic',
        'navicular': 'Modifies the navicular area of the orthotic',
        'metatarsalPad': 'Adds metatarsal support pad of varying sizes',
        
        // Posting
        'rearfootPost': 'Sets the angle of the rearfoot post',
        'forefootPost': 'Sets the angle of the forefoot post',
        
        // Plantar Modifiers
        'topCover': 'Selects the material for the top cover',
        'topCoverExtension': 'Sets the extension of the top cover',
        'cushioning': 'Sets the level of overall cushioning',
        'heelCushion': 'Selects the type of heel cushioning',
        
        // Shoe Fitting
        'shoeType': 'Indicates the primary shoe type for these orthotics',
        'shoeSize': 'Sets the shoe size for proper fitting',
        'shoeWidth': 'Sets the width of the shoes',
        'heelHeight': 'Indicates the typical heel height of the shoes',
        
        // Material Selection
        'shellMaterial': 'Selects the material for the orthotic shell',
        'shellFlexibility': 'Sets the flexibility of the orthotic shell',
        'shellThickness': 'Adjusts the thickness of the orthotic shell',
        'postingMaterial': 'Selects the material for posting',
        
        // Device Options
        'heelCupDepth': 'Sets the depth of the heel cup',
        'devicePair': 'Selects whether to order a pair or single device'
    };
    
    return descriptions[parameterId] || 'Adjust this parameter as needed';
}

// Enhanced preset data with more parameters
const presetData = {
    'flat-feet': {
        name: 'Flat Feet (Pes Planus)',
        archHeight: 15,
        archExpansion: 7,
        rearFootVarus: 2,
        rearfootPost: 2,
        rearfootPostType: 'varus',
        shellMaterial: 'polypropylene',
        shellFlexibility: 'semi-rigid',
        shellThickness: 3,
        topCover: 'leather',
        cushioning: 'medium',
        heelCupDepth: 12,
        metatarsalPad: 'small',
        shellWidth: 'standard',
        shellLength: 'standard',
        topCoverExtension: 'sulcus',
        heelCushion: 'poron',
        postingMaterial: 'eva'
    },
    'plantar-fasciitis': {
        name: 'Plantar Fasciitis',
        archHeight: 12,
        archExpansion: 6,
        heelCupDepth: 15,
        heelCushion: 'gel',
        metatarsalPad: 'medium',
        shellMaterial: 'polypropylene',
        shellFlexibility: 'rigid',
        shellThickness: 4,
        topCover: 'poron',
        cushioning: 'heavy',
        rearfootPost: 3,
        rearfootPostType: 'varus',
        shellWidth: 'standard',
        shellLength: 'standard',
        topCoverExtension: 'sulcus',
        postingMaterial: 'eva',
        foreFootVarus: 0,
        rearFootVarus: 2
    },
    'bunions': {
        name: 'Bunions (Hallux Valgus)',
        shellWidth: 'wide',
        foreFootVarus: 5,
        topCover: 'poron',
        shellMaterial: 'tpe',
        shellFlexibility: 'flexible',
        shellThickness: 3,
        featureFirstRayExtension: true,
        cushioning: 'medium',
        archHeight: 10,
        archExpansion: 5,
        heelCupDepth: 10,
        heelCushion: 'poron',
        shellLength: 'standard',
        topCoverExtension: 'toes',
        rearfootPost: 0,
        forefootPost: 2,
        forefootPostType: 'valgus',
        postingMaterial: 'eva',
        rearFootVarus: 0
    },
    'heel-spurs': {
        name: 'Heel Spurs',
        heelCupDepth: 18,
        heelCushion: 'gel',
        apertureHeel: true,
        shellMaterial: 'polypropylene',
        shellFlexibility: 'semi-rigid',
        shellThickness: 4,
        topCover: 'poron',
        cushioning: 'heavy',
        archHeight: 12,
        archExpansion: 5,
        shellWidth: 'standard',
        shellLength: 'standard',
        topCoverExtension: 'sulcus',
        rearfootPost: 2,
        rearfootPostType: 'varus',
        postingMaterial: 'eva',
        foreFootVarus: 0,
        rearFootVarus: 0
    },
    'collapsed-arches': {
        name: 'Collapsed Arches',
        archHeight: 18,
        archExpansion: 8,
        rearfootPost: 3,
        rearfootPostType: 'varus',
        shellMaterial: 'carbon-fiber',
        shellFlexibility: 'rigid',
        shellThickness: 4,
        topCover: 'leather',
        cushioning: 'medium',
        heelCupDepth: 15,
        shellWidth: 'standard',
        shellLength: 'standard',
        topCoverExtension: 'sulcus',
        heelCushion: 'poron',
        postingMaterial: 'eva',
        foreFootVarus: 2,
        rearFootVarus: 3,
        metatarsalPad: 'small'
    },
    'custom': {
        name: 'Custom Prescription',
        // Default values for custom prescription
        archHeight: 10,
        archExpansion: 5,
        heelExpansion: 5,
        shellWidth: 'standard',
        shellLength: 'standard',
        shellMaterial: 'polypropylene',
        shellFlexibility: 'semi-rigid',
        shellThickness: 3,
        topCover: 'leather',
        cushioning: 'light',
        heelCupDepth: 10,
        heelCushion: 'poron',
        topCoverExtension: 'sulcus',
        rearfootPost: 0,
        forefootPost: 0,
        postingMaterial: 'eva',
        foreFootVarus: 0,
        rearFootVarus: 0,
        metatarsalPad: 'none'
    }
};
