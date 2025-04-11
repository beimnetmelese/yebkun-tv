// Order Management JavaScript for Orthotics Prescription Portal

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the Send to Lab functionality
    initSendToLab();
    
    // Initialize order storage if it doesn't exist
    if (!localStorage.getItem('orthotic_orders')) {
        localStorage.setItem('orthotic_orders', JSON.stringify([]));
    }
});

// Function to initialize Send to Lab button
function initSendToLab() {
    const sendToLabBtn = document.getElementById('sendToLab');
    
    if (sendToLabBtn) {
        sendToLabBtn.addEventListener('click', function() {
            // Collect all form data
            const prescriptionData = collectPrescriptionData();
            
            // Save to local storage
            saveOrderToStorage(prescriptionData);
            
            // Show success message
            showSuccessMessage('Prescription successfully sent to lab!');
            
            // Redirect to orders page after a delay
            setTimeout(() => {
                window.location.href = 'orders.html';
            }, 2000);
        });
    }
}

// Function to collect all prescription data from the form
function collectPrescriptionData() {
    const now = new Date();
    const orderId = 'ORD-' + now.getTime();
    
    // Basic prescription info
    const prescriptionData = {
        id: orderId,
        date: now.toISOString(),
        status: 'Processing',
        patientName: document.querySelector('#patientInfo input[placeholder="Enter patient name"]').value || 'Unknown Patient',
        patientId: document.querySelector('#patientInfo input[placeholder="Enter patient ID"]').value || 'Unknown ID',
        clinicianName: document.querySelector('#patientInfo input[placeholder="Enter clinician name"]').value || 'Unknown Clinician',
        turnaroundTime: document.getElementById('turnaroundTime').value,
        price: 150.00, // Base price from knowledge module
        shipping: 20.00, // From knowledge module
        tax: 0.09, // 9% from knowledge module
        notes: {
            general: document.getElementById('generalNotes').value,
            leftFoot: document.getElementById('leftFootNotes').value,
            rightFoot: document.getElementById('rightFootNotes').value
        },
        formData: {}
    };
    
    // Collect all select values
    document.querySelectorAll('select').forEach(select => {
        if (select.id) {
            prescriptionData.formData[select.id] = select.value;
        }
    });
    
    // Collect all number inputs
    document.querySelectorAll('input[type="number"]').forEach(input => {
        if (input.id) {
            prescriptionData.formData[input.id] = input.value;
        }
    });
    
    // Calculate total price
    prescriptionData.totalBeforeTax = prescriptionData.price + prescriptionData.shipping;
    prescriptionData.taxAmount = prescriptionData.totalBeforeTax * prescriptionData.tax;
    prescriptionData.totalPrice = prescriptionData.totalBeforeTax + prescriptionData.taxAmount;
    
    return prescriptionData;
}

// Function to save order to local storage
function saveOrderToStorage(orderData) {
    // Get existing orders
    let orders = JSON.parse(localStorage.getItem('orthotic_orders') || '[]');
    
    // Add new order
    orders.push(orderData);
    
    // Save back to storage
    localStorage.setItem('orthotic_orders', JSON.stringify(orders));
}

// Function to show success message
function showSuccessMessage(message) {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-content">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#34C759" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 4L12 14.01L9 11.01" stroke="#34C759" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(successMessage);
    
    // Remove after delay
    setTimeout(() => {
        successMessage.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 500);
    }, 1500);
}

// Function to generate PDF for a prescription
function generatePrescriptionPDF(orderId) {
    // Get orders from storage
    const orders = JSON.parse(localStorage.getItem('orthotic_orders') || '[]');
    
    // Find the specific order
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        console.error('Order not found');
        return;
    }
    
    // Create a new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add logo and header
    doc.setFontSize(22);
    doc.setTextColor(58, 107, 109); // Medairum teal
    doc.text('Orthotics Prescription', 105, 20, { align: 'center' });
    
    // Add order details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Order ID: ${order.id}`, 20, 40);
    doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 20, 50);
    doc.text(`Status: ${order.status}`, 20, 60);
    
    // Add patient and clinician info
    doc.setFontSize(14);
    doc.setTextColor(58, 107, 109);
    doc.text('Patient Information', 20, 80);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Patient Name: ${order.patientName}`, 20, 90);
    doc.text(`Patient ID: ${order.patientId}`, 20, 100);
    doc.text(`Clinician: ${order.clinicianName}`, 20, 110);
    
    // Add prescription details
    doc.setFontSize(14);
    doc.setTextColor(58, 107, 109);
    doc.text('Prescription Details', 20, 130);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    let yPos = 140;
    
    // Add turnaround time
    doc.text(`Turnaround Time: ${order.turnaroundTime}`, 20, yPos);
    yPos += 10;
    
    // Add notes if they exist
    if (order.notes.general) {
        doc.setFontSize(14);
        doc.setTextColor(58, 107, 109);
        doc.text('Notes', 20, yPos += 10);
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`General Notes: ${order.notes.general}`, 20, yPos += 10);
        
        if (order.notes.leftFoot) {
            doc.text(`Left Foot Notes: ${order.notes.leftFoot}`, 20, yPos += 10);
        }
        
        if (order.notes.rightFoot) {
            doc.text(`Right Foot Notes: ${order.notes.rightFoot}`, 20, yPos += 10);
        }
    }
    
    // Add pricing information
    doc.setFontSize(14);
    doc.setTextColor(58, 107, 109);
    doc.text('Pricing', 20, yPos += 20);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Base Price: $${order.price.toFixed(2)}`, 20, yPos += 10);
    doc.text(`Shipping: $${order.shipping.toFixed(2)}`, 20, yPos += 10);
    doc.text(`Subtotal: $${order.totalBeforeTax.toFixed(2)}`, 20, yPos += 10);
    doc.text(`Tax (9%): $${order.taxAmount.toFixed(2)}`, 20, yPos += 10);
    doc.text(`Total: $${order.totalPrice.toFixed(2)}`, 20, yPos += 10);
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text('Orthotics Portal - Prescription Summary', 105, 280, { align: 'center' });
    
    // Save the PDF
    doc.save(`prescription-${order.id}.pdf`);
}
