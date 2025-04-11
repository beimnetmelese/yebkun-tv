// Enhanced scan viewer with actual file display
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scan viewer when files are uploaded
    const leftFootScan = document.getElementById('leftFootScan');
    const rightFootScan = document.getElementById('rightFootScan');
    
    if (leftFootScan) {
        leftFootScan.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                initActualScanViewer('leftScanViewer', e.target.files[0]);
            }
        });
    }
    
    if (rightFootScan) {
        rightFootScan.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                initActualScanViewer('rightScanViewer', e.target.files[0]);
            }
        });
    }
    
    // Make sure all parameter sliders are properly initialized
    initializeAllParameters();
});

// Initialize all parameters to ensure they're editable
function initializeAllParameters() {
    // Get all sliders and ensure they have event listeners
    const allSliders = document.querySelectorAll('.parameter-slider');
    allSliders.forEach(slider => {
        const valueDisplay = document.getElementById(`${slider.id}Value`);
        if (valueDisplay) {
            // Set initial value
            updateValueDisplay(slider, valueDisplay);
            
            // Add input event listener if not already present
            if (!slider.hasAttribute('data-initialized')) {
                slider.addEventListener('input', function() {
                    updateValueDisplay(this, valueDisplay);
                });
                slider.setAttribute('data-initialized', 'true');
            }
        }
    });
    
    // Ensure all select elements have change event listeners
    const allSelects = document.querySelectorAll('.parameter-visual select');
    allSelects.forEach(select => {
        if (!select.hasAttribute('data-initialized')) {
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
            select.setAttribute('data-initialized', 'true');
        }
    });
    
    // Ensure all checkboxes have change event listeners
    const allCheckboxes = document.querySelectorAll('.parameter-visual input[type="checkbox"]');
    allCheckboxes.forEach(checkbox => {
        if (!checkbox.hasAttribute('data-initialized')) {
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
            checkbox.setAttribute('data-initialized', 'true');
        }
    });
    
    // Ensure all radio buttons have change event listeners
    const allRadios = document.querySelectorAll('.parameter-visual input[type="radio"]');
    allRadios.forEach(radio => {
        if (!radio.hasAttribute('data-initialized')) {
            radio.addEventListener('change', function() {
                const parameterVisual = this.closest('.parameter-visual');
                if (parameterVisual) {
                    // Add highlight effect
                    parameterVisual.classList.add('parameter-preset-applied');
                    setTimeout(() => {
                        parameterVisual.classList.remove('parameter-preset-applied');
                    }, 2000);
                }
            });
            radio.setAttribute('data-initialized', 'true');
        }
    });
    
    console.log('All parameters initialized and made editable');
}

// Update value display for sliders with appropriate units
function updateValueDisplay(slider, valueDisplay) {
    let unit = '';
    
    // Determine appropriate unit based on slider ID
    if (slider.id.includes('Angle') || slider.id.includes('Varus') || slider.id.includes('Post')) {
        unit = '°';
    } else if (slider.id.includes('Height') || slider.id.includes('Expansion') || slider.id.includes('Depth') || slider.id.includes('Thickness')) {
        unit = 'mm';
    }
    
    valueDisplay.textContent = slider.value + unit;
    
    // Add visual feedback
    const parameterVisual = slider.closest('.parameter-visual');
    if (parameterVisual) {
        parameterVisual.classList.add('parameter-preset-applied');
        setTimeout(() => {
            parameterVisual.classList.remove('parameter-preset-applied');
        }, 1000);
    }
}

// Initialize the scan viewer with the actual uploaded file
function initActualScanViewer(containerId, file) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear previous content
    container.innerHTML = '';
    container.classList.add('scan-viewer-active');
    
    // Create scan preview
    const preview = document.createElement('div');
    preview.className = 'scan-preview';
    
    // Create image preview if it's an image file
    if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.className = 'actual-scan-image';
        img.alt = 'Foot scan';
        
        // Use FileReader to read and display the image
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
        
        preview.appendChild(img);
    } else {
        // For 3D files (STL, OBJ, PLY), show a placeholder with file info
        const fileInfo = document.createElement('div');
        fileInfo.className = 'scan-3d-placeholder';
        fileInfo.innerHTML = `
            <i class="fas fa-cube fa-3x"></i>
            <p>3D Scan File: ${file.name}</p>
            <p class="text-muted">Size: ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
            <p class="text-muted">Type: ${file.type || 'Unknown 3D format'}</p>
        `;
        preview.appendChild(fileInfo);
    }
    
    // Add filename display
    const filenameDisplay = document.createElement('div');
    filenameDisplay.className = 'scan-filename';
    filenameDisplay.textContent = file.name;
    preview.appendChild(filenameDisplay);
    
    // Create controls
    const controls = document.createElement('div');
    controls.className = 'scan-controls';
    controls.innerHTML = `
        <div class="control-group">
            <label>Rotation</label>
            <input type="range" min="-180" max="180" value="0" class="form-range" id="${containerId}-rotation">
        </div>
        <div class="control-group">
            <label>Zoom</label>
            <input type="range" min="50" max="150" value="100" class="form-range" id="${containerId}-zoom">
        </div>
        <div class="control-group">
            <label>View Mode</label>
            <select class="form-select" id="${containerId}-view-mode">
                <option value="normal">Normal</option>
                <option value="pressure">Pressure Map</option>
                <option value="contour">Contour Lines</option>
                <option value="wireframe">Wireframe</option>
            </select>
        </div>
        <div class="control-group">
            <button class="btn btn-sm btn-outline-primary me-2" id="${containerId}-measure">
                <i class="fas fa-ruler"></i> Measure
            </button>
            <button class="btn btn-sm btn-outline-primary" id="${containerId}-analyze">
                <i class="fas fa-chart-bar"></i> Analyze
            </button>
        </div>
    `;
    
    // Add elements to container
    container.appendChild(preview);
    container.appendChild(controls);
    
    // Add event listeners for interactive controls
    const rotationSlider = document.getElementById(`${containerId}-rotation`);
    const zoomSlider = document.getElementById(`${containerId}-zoom`);
    const viewModeSelect = document.getElementById(`${containerId}-view-mode`);
    const scanImage = container.querySelector('.actual-scan-image') || container.querySelector('.scan-3d-placeholder');
    
    if (rotationSlider && scanImage) {
        rotationSlider.addEventListener('input', function() {
            scanImage.style.transform = `rotate(${this.value}deg)`;
        });
    }
    
    if (zoomSlider && scanImage) {
        zoomSlider.addEventListener('input', function() {
            const currentRotation = scanImage.style.transform.match(/rotate\(([^)]+)\)/) || ['', '0deg'];
            scanImage.style.transform = `scale(${this.value / 100}) ${currentRotation[0]}`;
        });
    }
    
    if (viewModeSelect && scanImage) {
        viewModeSelect.addEventListener('change', function() {
            // Remove all mode classes
            scanImage.classList.remove('mode-normal', 'mode-pressure', 'mode-contour', 'mode-wireframe');
            // Add selected mode class
            scanImage.classList.add(`mode-${this.value}`);
        });
    }
    
    // Measure button
    const measureBtn = document.getElementById(`${containerId}-measure`);
    if (measureBtn) {
        measureBtn.addEventListener('click', function() {
            alert('Measurement tool activated. In a production environment, this would allow drawing measurement lines on the scan.');
        });
    }
    
    // Analyze button
    const analyzeBtn = document.getElementById(`${containerId}-analyze`);
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            alert('Scan analysis initiated. In a production environment, this would provide detailed analysis of pressure points, arch type, etc.');
        });
    }
    
    console.log(`Scan viewer initialized for ${file.name}`);
}
