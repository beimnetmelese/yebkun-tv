// Direct input parameters for clinical measurements and other parameters
document.addEventListener('DOMContentLoaded', function() {
    // Replace all sliders with direct input fields
    replaceSliderWithInputField('scanAngle', '°', 0, 10);
    replaceSliderWithInputField('foreFootVarus', '°', -10, 10);
    replaceSliderWithInputField('rearFootVarus', '°', -10, 10);
    replaceSliderWithInputField('archHeight', 'mm', 0, 20);
    replaceSliderWithInputField('archExpansion', 'mm', 0, 10);
    replaceSliderWithInputField('heelExpansion', 'mm', 0, 10);
    replaceSliderWithInputField('rearfootPost', '°', 0, 8);
    replaceSliderWithInputField('forefootPost', '°', 0, 8);
    replaceSliderWithInputField('shellThickness', 'mm', 1, 5);
    replaceSliderWithInputField('heelCupDepth', 'mm', 0, 20);
    
    // Initialize the scan preview with better functionality
    initializeImprovedScanPreview();
    
    // Add event listeners to preset buttons
    const presetButtons = document.querySelectorAll('.select-preset-btn');
    presetButtons.forEach(button => {
        button.addEventListener('click', function() {
            const condition = this.getAttribute('data-condition');
            applyPresetValues(condition);
        });
    });
    
    // Add to basket functionality
    const addToBasketBtn = document.getElementById('addToBasketBtn');
    if (addToBasketBtn) {
        addToBasketBtn.addEventListener('click', function() {
            // Collect all form values
            const formData = collectFormData();
            
            // Store in localStorage for basket
            const basketItems = JSON.parse(localStorage.getItem('basketItems') || '[]');
            basketItems.push(formData);
            localStorage.setItem('basketItems', JSON.stringify(basketItems));
            
            // Update basket count
            updateBasketCount();
            
            // Show confirmation modal
            const modal = new bootstrap.Modal(document.getElementById('addToBasketModal'));
            modal.show();
        });
    }
    
    // Initialize basket count
    updateBasketCount();
});

// Function to replace a slider with a direct input field
function replaceSliderWithInputField(sliderId, unit, min, max) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    
    const valueDisplay = document.getElementById(`${sliderId}Value`);
    const initialValue = slider.value;
    
    // Create container for the input field
    const inputContainer = document.createElement('div');
    inputContainer.className = 'd-flex align-items-center';
    
    // Create input field
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'form-control direct-input';
    input.id = `${sliderId}Input`;
    input.value = initialValue;
    input.min = min;
    input.max = max;
    input.step = unit === '°' ? 1 : 0.5; // Use appropriate step based on unit
    
    // Create unit label
    const unitLabel = document.createElement('span');
    unitLabel.className = 'input-group-text';
    unitLabel.textContent = unit;
    
    // Create input group
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';
    inputGroup.appendChild(input);
    inputGroup.appendChild(unitLabel);
    
    // Replace slider with input group
    slider.parentNode.replaceChild(inputGroup, slider);
    
    // Update value display if it exists
    if (valueDisplay) {
        valueDisplay.textContent = initialValue + unit;
        
        // Add event listener to update value display
        input.addEventListener('input', function() {
            valueDisplay.textContent = this.value + unit;
            
            // Add visual feedback
            const parameterVisual = this.closest('.parameter-visual');
            if (parameterVisual) {
                parameterVisual.classList.add('parameter-preset-applied');
                setTimeout(() => {
                    parameterVisual.classList.remove('parameter-preset-applied');
                }, 1000);
            }
        });
    }
}

// Function to initialize improved scan preview
function initializeImprovedScanPreview() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                const viewerId = this.id === 'leftFootScan' ? 'leftScanViewer' : 
                                 this.id === 'rightFootScan' ? 'rightScanViewer' : null;
                
                if (viewerId) {
                    displayScanPreview(file, viewerId);
                }
            }
        });
    });
}

// Function to display scan preview
function displayScanPreview(file, viewerId) {
    const viewer = document.getElementById(viewerId);
    if (!viewer) return;
    
    // Clear previous content
    viewer.innerHTML = '';
    viewer.classList.add('scan-viewer-active');
    
    // Create preview container
    const previewContainer = document.createElement('div');
    previewContainer.className = 'scan-preview';
    
    if (file.type.startsWith('image/')) {
        // For image files
        const img = document.createElement('img');
        img.className = 'actual-scan-image';
        img.alt = 'Foot scan';
        
        // Use FileReader to read and display the image
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
        
        previewContainer.appendChild(img);
    } else {
        // For 3D files or other formats
        const modelViewer = document.createElement('div');
        modelViewer.className = 'model-viewer';
        
        // Create a more visual 3D file representation
        modelViewer.innerHTML = `
            <div class="model-placeholder">
                <i class="fas fa-cube fa-3x"></i>
                <div class="model-info">
                    <p class="model-filename">${file.name}</p>
                    <p class="model-filesize">${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p class="model-filetype">${file.type || 'STL/OBJ/PLY file'}</p>
                </div>
            </div>
        `;
        
        previewContainer.appendChild(modelViewer);
    }
    
    // Create controls
    const controls = document.createElement('div');
    controls.className = 'scan-controls';
    
    // Add rotation control
    const rotationGroup = document.createElement('div');
    rotationGroup.className = 'control-group';
    rotationGroup.innerHTML = `
        <label>Rotation</label>
        <input type="range" min="-180" max="180" value="0" class="form-range" id="${viewerId}-rotation">
    `;
    
    // Add zoom control
    const zoomGroup = document.createElement('div');
    zoomGroup.className = 'control-group';
    zoomGroup.innerHTML = `
        <label>Zoom</label>
        <input type="range" min="50" max="150" value="100" class="form-range" id="${viewerId}-zoom">
    `;
    
    // Add view mode control
    const viewModeGroup = document.createElement('div');
    viewModeGroup.className = 'control-group';
    viewModeGroup.innerHTML = `
        <label>View Mode</label>
        <select class="form-select" id="${viewerId}-view-mode">
            <option value="normal">Normal</option>
            <option value="pressure">Pressure Map</option>
            <option value="contour">Contour Lines</option>
            <option value="wireframe">Wireframe</option>
        </select>
    `;
    
    // Add action buttons
    const actionGroup = document.createElement('div');
    actionGroup.className = 'control-group';
    actionGroup.innerHTML = `
        <button class="btn btn-sm btn-outline-primary me-2" id="${viewerId}-measure">
            <i class="fas fa-ruler"></i> Measure
        </button>
        <button class="btn btn-sm btn-outline-primary" id="${viewerId}-analyze">
            <i class="fas fa-chart-bar"></i> Analyze
        </button>
    `;
    
    // Add all controls
    controls.appendChild(rotationGroup);
    controls.appendChild(zoomGroup);
    controls.appendChild(viewModeGroup);
    controls.appendChild(actionGroup);
    
    // Add elements to viewer
    viewer.appendChild(previewContainer);
    viewer.appendChild(controls);
    
    // Add event listeners for controls
    setupControlEventListeners(viewerId);
}

// Function to set up control event listeners
function setupControlEventListeners(viewerId) {
    const rotationSlider = document.getElementById(`${viewerId}-rotation`);
    const zoomSlider = document.getElementById(`${viewerId}-zoom`);
    const viewModeSelect = document.getElementById(`${viewerId}-view-mode`);
    const measureBtn = document.getElementById(`${viewerId}-measure`);
    const analyzeBtn = document.getElementById(`${viewerId}-analyze`);
    
    const previewElement = document.querySelector(`#${viewerId} .scan-preview > *`);
    
    if (rotationSlider && previewElement) {
        rotationSlider.addEventListener('input', function() {
            previewElement.style.transform = `rotate(${this.value}deg) scale(${zoomSlider ? zoomSlider.value / 100 : 1})`;
        });
    }
    
    if (zoomSlider && previewElement) {
        zoomSlider.addEventListener('input', function() {
            const rotation = rotationSlider ? rotationSlider.value : 0;
            previewElement.style.transform = `rotate(${rotation}deg) scale(${this.value / 100})`;
        });
    }
    
    if (viewModeSelect && previewElement) {
        viewModeSelect.addEventListener('change', function() {
            // Remove all mode classes
            previewElement.classList.remove('mode-normal', 'mode-pressure', 'mode-contour', 'mode-wireframe');
            // Add selected mode class
            previewElement.classList.add(`mode-${this.value}`);
        });
    }
    
    if (measureBtn) {
        measureBtn.addEventListener('click', function() {
            showToast('Measurement Tool', 'Measurement tool activated. Click on the scan to measure distances.');
        });
    }
    
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            showToast('Analysis Tool', 'Scan analysis initiated. Results will be displayed when complete.');
            
            // Simulate analysis completion after 2 seconds
            setTimeout(() => {
                showAnalysisResults(viewerId);
            }, 2000);
        });
    }
}

// Function to show analysis results
function showAnalysisResults(viewerId) {
    const viewer = document.getElementById(viewerId);
    if (!viewer) return;
    
    // Create analysis results panel
    const resultsPanel = document.createElement('div');
    resultsPanel.className = 'analysis-results';
    resultsPanel.innerHTML = `
        <div class="card">
            <div class="card-header bg-primary text-white">
                <h5 class="mb-0">Scan Analysis Results</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-6">
                        <p><strong>Arch Type:</strong> Medium</p>
                        <p><strong>Pronation:</strong> Moderate</p>
                        <p><strong>Pressure Points:</strong> Metatarsal heads</p>
                    </div>
                    <div class="col-6">
                        <p><strong>Gait Pattern:</strong> Normal</p>
                        <p><strong>Weight Distribution:</strong> Balanced</p>
                        <p><strong>Recommended Support:</strong> Medium arch support</p>
                    </div>
                </div>
                <button class="btn btn-sm btn-outline-secondary mt-2 close-analysis">Close</button>
            </div>
        </div>
    `;
    
    // Add to viewer
    viewer.appendChild(resultsPanel);
    
    // Add close button event listener
    const closeBtn = resultsPanel.querySelector('.close-analysis');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            resultsPanel.remove();
        });
    }
}

// Function to show toast notification
function showToast(title, message) {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastId = 'toast-' + Date.now();
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.id = toastId;
    toast.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">${title}</strong>
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
        const toastElement = document.getElementById(toastId);
        if (toastElement) {
            toastElement.remove();
        }
    }, 5000);
    
    // Add close button functionality
    const closeBtn = toast.querySelector('.btn-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            toast.remove();
        });
    }
}

// Function to apply preset values based on foot condition
function applyPresetValues(condition) {
    // Define preset values for each condition
    const presets = {
        'flat-feet': {
            archHeight: 15,
            rearFootVarus: 4,
            foreFootVarus: 2,
            archExpansion: 7,
            heelExpansion: 5,
            shellWidth: 'standard',
            shellLength: 'standard',
            rearfootPost: 4,
            forefootPost: 2,
            rearfootPostType: 'varus',
            forefootPostType: 'varus',
            topCover: 'leather',
            cushioning: 'medium',
            shellMaterial: 'polypropylene',
            shellFlexibility: 'semi-rigid',
            shellThickness: 3
        },
        'plantar-fasciitis': {
            archHeight: 12,
            rearFootVarus: 3,
            foreFootVarus: 0,
            archExpansion: 5,
            heelExpansion: 7,
            shellWidth: 'standard',
            shellLength: 'standard',
            rearfootPost: 3,
            forefootPost: 0,
            rearfootPostType: 'varus',
            forefootPostType: 'varus',
            topCover: 'poron',
            cushioning: 'heavy',
            shellMaterial: 'polypropylene',
            shellFlexibility: 'semi-rigid',
            shellThickness: 4,
            heelCushion: 'gel'
        },
        'bunions': {
            archHeight: 10,
            rearFootVarus: 0,
            foreFootVarus: -2,
            archExpansion: 4,
            heelExpansion: 4,
            shellWidth: 'wide',
            shellLength: 'standard',
            rearfootPost: 0,
            forefootPost: 2,
            rearfootPostType: 'varus',
            forefootPostType: 'valgus',
            topCover: 'poron',
            cushioning: 'medium',
            shellMaterial: 'polypropylene',
            shellFlexibility: 'flexible',
            shellThickness: 2
        },
        'heel-spurs': {
            archHeight: 10,
            rearFootVarus: 2,
            foreFootVarus: 0,
            archExpansion: 5,
            heelExpansion: 6,
            shellWidth: 'standard',
            shellLength: 'standard',
            rearfootPost: 2,
            forefootPost: 0,
            rearfootPostType: 'varus',
            forefootPostType: 'varus',
            topCover: 'poron',
            cushioning: 'heavy',
            shellMaterial: 'polypropylene',
            shellFlexibility: 'semi-rigid',
            shellThickness: 3,
            heelCushion: 'gel'
        },
        'collapsed-arches': {
            archHeight: 18,
            rearFootVarus: 5,
            foreFootVarus: 3,
            archExpansion: 8,
            heelExpansion: 6,
            shellWidth: 'standard',
            shellLength: 'standard',
            rearfootPost: 5,
            forefootPost: 3,
            rearfootPostType: 'varus',
            forefootPostType: 'varus',
            topCover: 'leather',
            cushioning: 'medium',
            shellMaterial: 'carbon-fiber',
            shellFlexibility: 'rigid',
            shellThickness: 4
        },
        'custom': {
            // Default values for custom prescription
            archHeight: 10,
            rearFootVarus: 0,
            foreFootVarus: 0,
            archExpansion: 5,
            heelExpansion: 5,
            shellWidth: 'standard',
            shellLength: 'standard',
            rearfootPost: 0,
            forefootPost: 0,
            rearfootPostType: 'varus',
            forefootPostType: 'varus',
            topCover: 'leather',
            cushioning: 'light',
            shellMaterial: 'polypropylene',
            shellFlexibility: 'semi-rigid',
            shellThickness: 3
        }
    };
    
    // Get preset values for selected condition
    const preset = presets[condition] || presets.custom;
    
    // Apply values to form fields
    for (const [key, value] of Object.entries(preset)) {
        // Handle different input types
        const input = document.getElementById(`${key}Input`) || document.getElementById(key);
        if (input) {
            if (input.type === 'number' || input.type === 'range') {
                input.value = value;
                
                // Update value display if it exists
                const valueDisplay = document.getElementById(`${key}Value`);
                if (valueDisplay) {
                    const unit = key.includes('Angle') || key.includes('Varus') || key.includes('Post') ? '°' : 'mm';
                    valueDisplay.textContent = value + unit;
                }
            } else if (input.type === 'select-one') {
                input.value = value;
            }
        }
        
        // Handle radio buttons
        if (key === 'rearfootPostType' || key === 'forefootPostType') {
            const radioId = key === 'rearfootPostType' ? 
                (value === 'varus' ? 'rearfootPostVarus' : 'rearfootPostValgus') :
                (value === 'varus' ? 'forefootPostVarus' : 'forefootPostValgus');
            
            const radio = document.getElementById(radioId);
            if (radio) {
                radio.checked = true;
            }
        }
    }
    
    // Show toast notification
    showToast('Preset Applied', `Applied preset values for ${condition.replace('-', ' ')} condition.`);
}

// Function to collect all form data
function collectFormData() {
    const formData = {
        patientInfo: {
            name: document.getElementById('patientName')?.value || '',
            id: document.getElementById('patientId')?.value || '',
            dob: document.getElementById('patientDob')?.value || '',
            gender: document.getElementById('patientGender')?.value || '',
            phone: document.getElementById('patientPhone')?.value || ''
        },
        clinicalMeasures: {
            scanAngle: getInputValue('scanAngle'),
            foreFootVarus: getInputValue('foreFootVarus'),
            rearFootVarus: getInputValue('rearFootVarus'),
            archHeight: getInputValue('archHeight')
        },
        intrinsicAdjustments: {
            archExpansion: getInputValue('archExpansion'),
            heelExpansion: getInputValue('heelExpansion'),
            shellWidth: document.getElementById('shellWidth')?.value || 'standard',
            shellLength: document.getElementById('shellLength')?.value || 'standard'
        },
        offLoading: {
            cuboid: document.getElementById('cuboid')?.value || 'none',
            styloid: document.getElementById('styloid')?.value || 'none',
            navicular: document.getElementById('navicular')?.value || 'none',
            metatarsalPad: document.getElementById('metatarsalPad')?.value || 'none',
            apertures: {
                metatarsal1: document.getElementById('apertureMetatarsal1')?.checked || false,
                metatarsal5: document.getElementById('apertureMetatarsal5')?.checked || false,
                heel: document.getElementById('apertureHeel')?.checked || false
            }
        },
        posting: {
            rearfoot: {
                value: getInputValue('rearfootPost'),
                type: document.getElementById('rearfootPostVarus')?.checked ? 'varus' : 'valgus'
            },
            forefoot: {
                value: getInputValue('forefootPost'),
                type: document.getElementById('forefootPostVarus')?.checked ? 'varus' : 'valgus'
            }
        },
        plantarModifiers: {
            topCover: document.getElementById('topCover')?.value || 'leather',
            topCoverExtension: document.getElementById('topCoverExtension')?.value || 'sulcus',
            cushioning: document.getElementById('cushioning')?.value || 'light',
            heelCushion: document.getElementById('heelCushion')?.value || 'poron'
        },
        shoeFitting: {
            shoeType: document.getElementById('shoeType')?.value || 'athletic',
            shoeSize: document.getElementById('shoeSize')?.value || '9',
            sizeSystem: document.getElementById('sizeSystem')?.value || 'us-men',
            shoeWidth: document.getElementById('shoeWidth')?.value || 'medium',
            heelHeight: document.getElementById('heelHeight')?.value || 'flat'
        },
        materialSelection: {
            shellMaterial: document.getElementById('shellMaterial')?.value || 'polypropylene',
            shellFlexibility: document.getElementById('shellFlexibility')?.value || 'semi-rigid',
            shellThickness: getInputValue('shellThickness'),
            postingMaterial: document.getElementById('postingMaterial')?.value || 'eva'
        },
        deviceOptions: {
            heelCupDepth: getInputValue('heelCupDepth'),
            devicePair: document.getElementById('devicePair')?.value || 'pair',
            features: {
                deepHeelCup: document.getElementById('featureDeepHeelCup')?.checked || false,
                medialFlange: document.getElementById('featureMedialFlange')?.checked || false,
                lateralFlange: document.getElementById('featureLateralFlange')?.checked || false,
                firstRayExtension: document.getElementById('featureFirstRayExtension')?.checked || false
            }
        },
        notes: document.getElementById('clinicalNotes')?.value || '',
        price: 150,
        timestamp: new Date().toISOString()
    };
    
    return formData;
}

// Helper function to get input value from either direct input or slider
function getInputValue(id) {
    const input = document.getElementById(`${id}Input`);
    if (input) {
        return input.value;
    }
    
    const slider = document.getElementById(id);
    if (slider) {
        return slider.value;
    }
    
    return '0';
}

// Function to update basket count
function updateBasketCount() {
    const basketItems = JSON.parse(localStorage.getItem('basketItems') || '[]');
    const basketCount = document.getElementById('basket-count');
    if (basketCount) {
        basketCount.textContent = basketItems.length;
    }
}
