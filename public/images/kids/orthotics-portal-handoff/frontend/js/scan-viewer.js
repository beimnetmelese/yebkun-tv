// Foot Scan Viewer and Interaction Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scan viewer when files are uploaded
    const leftFootScan = document.getElementById('leftFootScan');
    const rightFootScan = document.getElementById('rightFootScan');
    
    if (leftFootScan) {
        leftFootScan.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                initScanViewer('leftScanViewer', e.target.files[0]);
            }
        });
    }
    
    if (rightFootScan) {
        rightFootScan.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                initScanViewer('rightScanViewer', e.target.files[0]);
            }
        });
    }
});

// Initialize the scan viewer with the uploaded file
function initScanViewer(containerId, file) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear previous content
    container.innerHTML = '';
    container.classList.add('scan-viewer-active');
    
    // For demo purposes, we'll display a placeholder with interactive controls
    // In a production environment, this would use a 3D viewer library like Three.js
    
    // Create scan preview
    const preview = document.createElement('div');
    preview.className = 'scan-preview';
    
    // Create scan image (placeholder)
    const scanImage = document.createElement('div');
    scanImage.className = 'scan-image';
    scanImage.innerHTML = `
        <svg viewBox="0 0 200 100" class="foot-scan-svg">
            <path d="M40,20 C60,25 90,25 120,20 C130,35 130,65 120,80 C90,85 60,85 40,80 C30,65 30,35 40,20 Z" class="foot-outline" />
            <path d="M60,30 C75,33 90,33 105,30 C110,45 110,55 105,70 C90,73 75,73 60,70 C55,55 55,45 60,30 Z" class="arch-area" />
            <circle cx="80" cy="75" r="5" class="pressure-point" />
            <circle cx="60" cy="60" r="4" class="pressure-point" />
            <circle cx="100" cy="35" r="4" class="pressure-point" />
        </svg>
        <div class="scan-filename">${file.name}</div>
    `;
    
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
    preview.appendChild(scanImage);
    container.appendChild(preview);
    container.appendChild(controls);
    
    // Add event listeners for interactive controls
    const rotationSlider = document.getElementById(`${containerId}-rotation`);
    const zoomSlider = document.getElementById(`${containerId}-zoom`);
    const viewModeSelect = document.getElementById(`${containerId}-view-mode`);
    const footSvg = container.querySelector('.foot-scan-svg');
    
    if (rotationSlider) {
        rotationSlider.addEventListener('input', function() {
            footSvg.style.transform = `rotate(${this.value}deg)`;
        });
    }
    
    if (zoomSlider) {
        zoomSlider.addEventListener('input', function() {
            footSvg.style.transform = `scale(${this.value / 100})`;
        });
    }
    
    if (viewModeSelect) {
        viewModeSelect.addEventListener('change', function() {
            // Remove all mode classes
            footSvg.classList.remove('mode-normal', 'mode-pressure', 'mode-contour', 'mode-wireframe');
            // Add selected mode class
            footSvg.classList.add(`mode-${this.value}`);
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
}
