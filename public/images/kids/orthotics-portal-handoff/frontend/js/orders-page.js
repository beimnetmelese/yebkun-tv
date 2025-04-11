// Orders Page JavaScript for Orthotics Portal

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tabs
    initTabs();
    
    // Load orders from storage
    loadOrders();
    
    // Initialize modal functionality
    initModal();
    
    // Initialize search and filters
    initSearchAndFilters();
});

// Function to initialize tabs
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Function to load orders from storage
function loadOrders() {
    // Get orders from local storage
    const orders = JSON.parse(localStorage.getItem('orthotic_orders') || '[]');
    
    if (orders.length === 0) {
        // No orders to display
        return;
    }
    
    // Clear no orders rows
    document.querySelectorAll('.no-orders-row').forEach(row => {
        row.style.display = 'none';
    });
    
    // Sort orders by date (newest first)
    orders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Populate All Orders tab
    const allOrdersTableBody = document.getElementById('allOrdersTableBody');
    allOrdersTableBody.innerHTML = ''; // Clear existing content
    
    // Create filtered arrays for each status
    const processingOrders = orders.filter(order => order.status === 'Processing');
    const shippedOrders = orders.filter(order => order.status === 'Shipped');
    const deliveredOrders = orders.filter(order => order.status === 'Delivered');
    const cancelledOrders = orders.filter(order => order.status === 'Cancelled');
    
    // Populate each tab
    populateOrdersTable(allOrdersTableBody, orders);
    populateOrdersTable(document.getElementById('processingOrdersTableBody'), processingOrders);
    populateOrdersTable(document.getElementById('shippedOrdersTableBody'), shippedOrders);
    populateOrdersTable(document.getElementById('deliveredOrdersTableBody'), deliveredOrders);
    populateOrdersTable(document.getElementById('cancelledOrdersTableBody'), cancelledOrders);
    
    // Show no orders message if a specific tab is empty
    if (processingOrders.length === 0) {
        document.querySelector('#processingOrdersTableBody .no-orders-row').style.display = 'table-row';
    }
    if (shippedOrders.length === 0) {
        document.querySelector('#shippedOrdersTableBody .no-orders-row').style.display = 'table-row';
    }
    if (deliveredOrders.length === 0) {
        document.querySelector('#deliveredOrdersTableBody .no-orders-row').style.display = 'table-row';
    }
    if (cancelledOrders.length === 0) {
        document.querySelector('#cancelledOrdersTableBody .no-orders-row').style.display = 'table-row';
    }
}

// Function to populate orders table
function populateOrdersTable(tableBody, orders) {
    if (orders.length === 0) {
        return;
    }
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        
        // Format date
        const orderDate = new Date(order.date);
        const formattedDate = orderDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        // Create status badge class
        const statusClass = `status-${order.status.toLowerCase()}`;
        
        // Create row content
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${formattedDate}</td>
            <td>${order.patientName}</td>
            <td>${order.clinicianName}</td>
            <td><span class="status-badge ${statusClass}">${order.status}</span></td>
            <td>$${order.totalPrice.toFixed(2)}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-button view-button" data-order-id="${order.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button class="action-button download-button" data-order-id="${order.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to view and download buttons
    tableBody.querySelectorAll('.view-button').forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.getAttribute('data-order-id');
            openOrderDetails(orderId);
        });
    });
    
    tableBody.querySelectorAll('.download-button').forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.getAttribute('data-order-id');
            generatePrescriptionPDF(orderId);
        });
    });
}

// Function to initialize modal
function initModal() {
    const modal = document.getElementById('orderDetailsModal');
    const closeButtons = document.querySelectorAll('.close-button, .close-modal-button');
    
    // Close modal when clicking close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Download PDF button in modal
    const downloadPdfButton = document.getElementById('downloadPdfButton');
    downloadPdfButton.addEventListener('click', function() {
        const orderId = this.getAttribute('data-order-id');
        generatePrescriptionPDF(orderId);
    });
}

// Function to open order details modal
function openOrderDetails(orderId) {
    // Get orders from storage
    const orders = JSON.parse(localStorage.getItem('orthotic_orders') || '[]');
    
    // Find the specific order
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        console.error('Order not found');
        return;
    }
    
    // Format date
    const orderDate = new Date(order.date);
    const formattedDate = orderDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Populate modal content
    const modalContent = document.getElementById('orderDetailsContent');
    modalContent.innerHTML = `
        <div class="order-detail-section">
            <h3>Order Information</h3>
            <div class="detail-row">
                <div class="detail-label">Order ID:</div>
                <div class="detail-value">${order.id}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Date:</div>
                <div class="detail-value">${formattedDate}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Status:</div>
                <div class="detail-value">
                    <span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span>
                </div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Turnaround:</div>
                <div class="detail-value">${order.turnaroundTime}</div>
            </div>
        </div>
        
        <div class="order-detail-section">
            <h3>Patient Information</h3>
            <div class="detail-row">
                <div class="detail-label">Patient Name:</div>
                <div class="detail-value">${order.patientName}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Patient ID:</div>
                <div class="detail-value">${order.patientId}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Clinician:</div>
                <div class="detail-value">${order.clinicianName}</div>
            </div>
        </div>
        
        <div class="order-detail-section">
            <h3>Notes</h3>
            <div class="order-notes">
                ${order.notes.general ? `<p><strong>General Notes:</strong> ${order.notes.general}</p>` : '<p>No general notes provided.</p>'}
                ${order.notes.leftFoot ? `<p><strong>Left Foot Notes:</strong> ${order.notes.leftFoot}</p>` : ''}
                ${order.notes.rightFoot ? `<p><strong>Right Foot Notes:</strong> ${order.notes.rightFoot}</p>` : ''}
            </div>
        </div>
        
        <div class="order-detail-section">
            <h3>Pricing</h3>
            <div class="detail-row">
                <div class="detail-label">Base Price:</div>
                <div class="detail-value">$${order.price.toFixed(2)}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Shipping:</div>
                <div class="detail-value">$${order.shipping.toFixed(2)}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Subtotal:</div>
                <div class="detail-value">$${order.totalBeforeTax.toFixed(2)}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Tax (9%):</div>
                <div class="detail-value">$${order.taxAmount.toFixed(2)}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Total:</div>
                <div class="detail-value"><strong>$${order.totalPrice.toFixed(2)}</strong></div>
            </div>
        </div>
    `;
    
    // Set order ID for download button
    document.getElementById('downloadPdfButton').setAttribute('data-order-id', orderId);
    
    // Show modal
    document.getElementById('orderDetailsModal').style.display = 'block';
}

// Function to initialize search and filters
function initSearchAndFilters() {
    const searchInput = document.getElementById('orderSearch');
    const dateFilter = document.getElementById('dateFilter');
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        filterOrders();
    });
    
    // Date filter functionality
    dateFilter.addEventListener('change', function() {
        filterOrders();
    });
}

// Function to filter orders based on search and date filter
function filterOrders() {
    const searchTerm = document.getElementById('orderSearch').value.toLowerCase();
    const dateFilter = document.getElementById('dateFilter').value;
    
    // Get all orders
    const orders = JSON.parse(localStorage.getItem('orthotic_orders') || '[]');
    
    // Apply date filter
    let filteredOrders = orders;
    
    if (dateFilter !== 'all') {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        if (dateFilter === 'today') {
            filteredOrders = orders.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate >= today;
            });
        } else if (dateFilter === 'week') {
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            
            filteredOrders = orders.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate >= weekStart;
            });
        } else if (dateFilter === 'month') {
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            
            filteredOrders = orders.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate >= monthStart;
            });
        } else if (dateFilter === 'year') {
            const yearStart = new Date(today.getFullYear(), 0, 1);
            
            filteredOrders = orders.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate >= yearStart;
            });
        }
    }
    
    // Apply search filter
    if (searchTerm) {
        filteredOrders = filteredOrders.filter(order => {
            return (
                order.id.toLowerCase().includes(searchTerm) ||
                order.patientName.toLowerCase().includes(searchTerm) ||
                order.clinicianName.toLowerCase().includes(searchTerm) ||
                order.status.toLowerCase().includes(searchTerm)
            );
        });
    }
    
    // Update All Orders tab
    const allOrdersTableBody = document.getElementById('allOrdersTableBody');
    allOrdersTableBody.innerHTML = '';
    
    if (filteredOrders.length === 0) {
        allOrdersTableBody.innerHTML = `
            <tr class="no-orders-row">
                <td colspan="7">No orders found matching your criteria.</td>
            </tr>
        `;
    } else {
        populateOrdersTable(allOrdersTableBody, filteredOrders);
    }
    
    // Filter orders by status for other tabs
    const processingOrders = filteredOrders.filter(order => order.status === 'Processing');
    const shippedOrders = filteredOrders.filter(order => order.status === 'Shipped');
    const deliveredOrders = filteredOrders.filter(order => order.status === 'Delivered');
    const cancelledOrders = filteredOrders.filter(order => order.status === 'Cancelled');
    
    // Update other tabs
    updateTabContent('processingOrdersTableBody', processingOrders);
    updateTabContent('shippedOrdersTableBody', shippedOrders);
    updateTabContent('deliveredOrdersTableBody', deliveredOrders);
    updateTabContent('cancelledOrdersTableBody', cancelledOrders);
}

// Function to update tab content
function updateTabContent(tableBodyId, orders) {
    const tableBody = document.getElementById(tableBodyId);
    tableBody.innerHTML = '';
    
    if (orders.length === 0) {
        tableBody.innerHTML = `
            <tr class="no-orders-row">
                <td colspan="7">No orders found matching your criteria.</td>
            </tr>
        `;
    } else {
        populateOrdersTable(tableBody, orders);
    }
}

// Add a function to update order status (for admin functionality)
function updateOrderStatus(orderId, newStatus) {
    // Get orders from storage
    let orders = JSON.parse(localStorage.getItem('orthotic_orders') || '[]');
    
    // Find the order
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) {
        console.error('Order not found');
        return false;
    }
    
    // Update status
    orders[orderIndex].status = newStatus;
    
    // Save back to storage
    localStorage.setItem('orthotic_orders', JSON.stringify(orders));
    
    // Reload orders display
    loadOrders();
    
    return true;
}
