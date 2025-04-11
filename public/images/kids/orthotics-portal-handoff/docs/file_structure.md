# Orthotics Portal - File Structure Documentation

This document provides an overview of the file structure for the Orthotics Portal project, explaining the purpose and organization of each component.

## Project Overview

The Orthotics Portal is a web application for managing custom orthotics prescriptions, orders, and patient information. The application allows clinicians to:

1. Create detailed orthotics prescriptions
2. Submit prescriptions to the lab
3. Track orders through the manufacturing process
4. Generate PDF summaries of prescriptions
5. Manage patient information

## Directory Structure

```
orthotics-portal/
├── frontend/           # Frontend web application files
│   ├── css/            # Stylesheet files
│   ├── js/             # JavaScript files
│   ├── images/         # Image assets
│   └── html/           # HTML templates
├── backend/            # Backend implementation requirements
│   ├── api/            # API endpoint specifications
│   └── services/       # Service layer specifications
└── database/           # Database schema and models
    └── schema/         # Database schema definitions
```

## Frontend Components

### HTML Files

- `index.html` - Main landing page
- `prescriptions.html` - Prescription creation form
- `orders.html` - Order management interface
- `invoices.html` - Invoice management interface
- `mobile.html` - Mobile-optimized main interface
- `mobile-prescriptions.html` - Mobile-optimized prescription form

### CSS Files

- `luxury-styles.css` - Main stylesheet with premium design elements
- `select-fix.css` - Fixes for select elements styling
- `orders-styles.css` - Styles for the orders management page
- `mobile-styles.css` - Mobile-specific styles
- `mobile-controls.css` - Mobile-optimized form controls
- `mobile-navigation.css` - Mobile navigation components

### JavaScript Files

- `luxury-main.js` - Main application logic
- `order-management.js` - Order processing functionality
- `orders-page.js` - Orders page interaction logic
- `heel-post.js` - Heel post configuration logic
- `mobile-main.js` - Mobile-specific main logic
- `mobile-controls.js` - Mobile-optimized control behaviors
- `mobile-navigation.js` - Mobile navigation functionality

## Backend Requirements

The backend implementation will need to provide:

1. User authentication and authorization
2. Prescription data storage and retrieval
3. Order management
4. PDF generation
5. Data validation
6. Integration with lab systems

## Database Requirements

The database will need to store:

1. User accounts (clinicians, administrators)
2. Patient information
3. Prescription details
4. Order status and history
5. Invoicing information

## API Endpoints

The application will require API endpoints for:

1. User authentication
2. Prescription CRUD operations
3. Order management
4. PDF generation
5. Patient information management

Detailed API specifications will be provided in the API documentation.
