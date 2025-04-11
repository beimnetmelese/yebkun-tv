# API Endpoints Documentation

This document outlines the API endpoints required for implementing the Orthotics Portal system.

## Base URL

All endpoints should be prefixed with: `/api/v1`

## Authentication

Most endpoints require authentication using JWT (JSON Web Tokens).

- Include token in Authorization header: `Authorization: Bearer {token}`
- Tokens expire after 24 hours
- Refresh tokens can be used to obtain new access tokens

## User Authentication Endpoints

### POST /auth/login
Authenticates a user and returns a JWT token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "clinician"
  }
}
```

### POST /auth/refresh
Refreshes an expired JWT token.

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /auth/logout
Invalidates the current token.

**Response:**
```json
{
  "message": "Successfully logged out"
}
```

## Patient Endpoints

### GET /patients
Returns a list of patients.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `search`: Search term for patient name or ID
- `sort`: Field to sort by (default: lastName)
- `order`: Sort order (asc/desc, default: asc)

**Response:**
```json
{
  "total": 100,
  "page": 1,
  "limit": 20,
  "patients": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "externalId": "PT12345",
      "firstName": "John",
      "lastName": "Smith",
      "dateOfBirth": "1980-01-15",
      "email": "john.smith@example.com"
    },
    // More patients...
  ]
}
```

### GET /patients/:id
Returns a specific patient by ID.

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "externalId": "PT12345",
  "firstName": "John",
  "lastName": "Smith",
  "dateOfBirth": "1980-01-15",
  "email": "john.smith@example.com",
  "phone": "+1-555-123-4567",
  "address": "123 Main St, Anytown, USA",
  "createdAt": "2025-01-15T12:00:00Z",
  "updatedAt": "2025-03-20T14:30:00Z"
}
```

### POST /patients
Creates a new patient.

**Request:**
```json
{
  "externalId": "PT12345",
  "firstName": "John",
  "lastName": "Smith",
  "dateOfBirth": "1980-01-15",
  "email": "john.smith@example.com",
  "phone": "+1-555-123-4567",
  "address": "123 Main St, Anytown, USA"
}
```

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "externalId": "PT12345",
  "firstName": "John",
  "lastName": "Smith",
  "dateOfBirth": "1980-01-15",
  "email": "john.smith@example.com",
  "phone": "+1-555-123-4567",
  "address": "123 Main St, Anytown, USA",
  "createdAt": "2025-04-10T09:00:00Z",
  "updatedAt": "2025-04-10T09:00:00Z"
}
```

### PUT /patients/:id
Updates an existing patient.

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.updated@example.com",
  "phone": "+1-555-987-6543"
}
```

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "externalId": "PT12345",
  "firstName": "John",
  "lastName": "Smith",
  "dateOfBirth": "1980-01-15",
  "email": "john.updated@example.com",
  "phone": "+1-555-987-6543",
  "address": "123 Main St, Anytown, USA",
  "createdAt": "2025-01-15T12:00:00Z",
  "updatedAt": "2025-04-10T09:15:00Z"
}
```

### DELETE /patients/:id
Deletes a patient.

**Response:**
```json
{
  "message": "Patient successfully deleted"
}
```

## Prescription Endpoints

### GET /prescriptions
Returns a list of prescriptions.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `patientId`: Filter by patient ID
- `status`: Filter by status (draft, submitted, processing)
- `sort`: Field to sort by (default: createdAt)
- `order`: Sort order (asc/desc, default: desc)

**Response:**
```json
{
  "total": 50,
  "page": 1,
  "limit": 20,
  "prescriptions": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "patientId": "223e4567-e89b-12d3-a456-426614174000",
      "patientName": "John Smith",
      "clinicianId": "323e4567-e89b-12d3-a456-426614174000",
      "clinicianName": "Dr. Jane Wilson",
      "status": "submitted",
      "createdAt": "2025-04-01T10:30:00Z",
      "submittedAt": "2025-04-01T14:45:00Z"
    },
    // More prescriptions...
  ]
}
```

### GET /prescriptions/:id
Returns a specific prescription by ID.

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "patientId": "223e4567-e89b-12d3-a456-426614174000",
  "patientName": "John Smith",
  "clinicianId": "323e4567-e89b-12d3-a456-426614174000",
  "clinicianName": "Dr. Jane Wilson",
  "status": "submitted",
  "clinicalNotes": "Patient requires custom orthotics for plantar fasciitis. Moderate arch support needed.",
  "leftFootNotes": "Left foot shows mild pronation. Additional medial support recommended.",
  "rightFootNotes": "Right foot has high arch. Needs additional cushioning in forefoot area.",
  "details": [
    {
      "footSide": "left",
      "parameterName": "arch_height",
      "parameterValue": "medium",
      "parameterUnit": "mm"
    },
    // More parameters...
  ],
  "attachments": [
    {
      "id": "423e4567-e89b-12d3-a456-426614174000",
      "fileName": "left_foot_scan.jpg",
      "fileType": "image/jpeg",
      "footSide": "left",
      "attachmentType": "scan",
      "createdAt": "2025-04-01T10:35:00Z"
    },
    // More attachments...
  ],
  "createdAt": "2025-04-01T10:30:00Z",
  "updatedAt": "2025-04-01T14:45:00Z",
  "submittedAt": "2025-04-01T14:45:00Z"
}
```

### POST /prescriptions
Creates a new prescription.

**Request:**
```json
{
  "patientId": "223e4567-e89b-12d3-a456-426614174000",
  "templateId": "523e4567-e89b-12d3-a456-426614174000",
  "clinicalNotes": "Patient requires custom orthotics for plantar fasciitis. Moderate arch support needed.",
  "leftFootNotes": "Left foot shows mild pronation. Additional medial support recommended.",
  "rightFootNotes": "Right foot has high arch. Needs additional cushioning in forefoot area.",
  "details": [
    {
      "footSide": "left",
      "parameterName": "arch_height",
      "parameterValue": "medium",
      "parameterUnit": "mm"
    },
    // More parameters...
  ]
}
```

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "patientId": "223e4567-e89b-12d3-a456-426614174000",
  "status": "draft",
  "clinicalNotes": "Patient requires custom orthotics for plantar fasciitis. Moderate arch support needed.",
  "leftFootNotes": "Left foot shows mild pronation. Additional medial support recommended.",
  "rightFootNotes": "Right foot has high arch. Needs additional cushioning in forefoot area.",
  "details": [
    {
      "footSide": "left",
      "parameterName": "arch_height",
      "parameterValue": "medium",
      "parameterUnit": "mm"
    },
    // More parameters...
  ],
  "createdAt": "2025-04-10T09:30:00Z",
  "updatedAt": "2025-04-10T09:30:00Z"
}
```

### PUT /prescriptions/:id
Updates an existing prescription.

**Request:**
```json
{
  "clinicalNotes": "Updated notes: Patient requires custom orthotics for plantar fasciitis and heel spurs.",
  "details": [
    {
      "footSide": "left",
      "parameterName": "arch_height",
      "parameterValue": "high",
      "parameterUnit": "mm"
    },
    // More parameters...
  ]
}
```

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "patientId": "223e4567-e89b-12d3-a456-426614174000",
  "status": "draft",
  "clinicalNotes": "Updated notes: Patient requires custom orthotics for plantar fasciitis and heel spurs.",
  "leftFootNotes": "Left foot shows mild pronation. Additional medial support recommended.",
  "rightFootNotes": "Right foot has high arch. Needs additional cushioning in forefoot area.",
  "details": [
    {
      "footSide": "left",
      "parameterName": "arch_height",
      "parameterValue": "high",
      "parameterUnit": "mm"
    },
    // More parameters...
  ],
  "createdAt": "2025-04-01T10:30:00Z",
  "updatedAt": "2025-04-10T09:45:00Z"
}
```

### POST /prescriptions/:id/submit
Submits a prescription to the lab.

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "status": "submitted",
  "submittedAt": "2025-04-10T10:00:00Z",
  "orderId": "623e4567-e89b-12d3-a456-426614174000",
  "orderNumber": "ORD-1744275637983"
}
```

### POST /prescriptions/:id/attachments
Uploads an attachment to a prescription.

**Request:**
Multipart form data with:
- `file`: The file to upload
- `footSide`: "left", "right", or "both"
- `attachmentType`: "scan", "photo", or "document"

**Response:**
```json
{
  "id": "423e4567-e89b-12d3-a456-426614174000",
  "prescriptionId": "123e4567-e89b-12d3-a456-426614174000",
  "fileName": "left_foot_scan.jpg",
  "filePath": "/uploads/prescriptions/123e4567/left_foot_scan.jpg",
  "fileType": "image/jpeg",
  "fileSize": 1024000,
  "footSide": "left",
  "attachmentType": "scan",
  "createdAt": "2025-04-10T10:15:00Z"
}
```

### GET /prescriptions/:id/pdf
Generates a PDF summary of the prescription.

**Response:**
Binary PDF file with appropriate content-type headers.

## Order Endpoints

### GET /orders
Returns a list of orders.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `status`: Filter by status (processing, shipped, delivered, cancelled)
- `dateRange`: Filter by date range (today, this_week, this_month, this_year, all_time)
- `search`: Search term for order number or patient name
- `sort`: Field to sort by (default: createdAt)
- `order`: Sort order (asc/desc, default: desc)

**Response:**
```json
{
  "total": 30,
  "page": 1,
  "limit": 20,
  "orders": [
    {
      "id": "623e4567-e89b-12d3-a456-426614174000",
      "orderNumber": "ORD-1744275637983",
      "prescriptionId": "123e4567-e89b-12d3-a456-426614174000",
      "patientName": "John Smith",
      "clinicianName": "Dr. Jane Wilson",
      "status": "processing",
      "totalPrice": 185.30,
      "createdAt": "2025-04-01T14:45:00Z",
      "estimatedDelivery": "2025-04-08"
    },
    // More orders...
  ]
}
```

### GET /orders/:id
Returns a specific order by ID.

**Response:**
```json
{
  "id": "623e4567-e89b-12d3-a456-426614174000",
  "orderNumber": "ORD-1744275637983",
  "prescriptionId": "123e4567-e89b-12d3-a456-426614174000",
  "patientId": "223e4567-e89b-12d3-a456-426614174000",
  "patientName": "John Smith",
  "clinicianId": "323e4567-e89b-12d3-a456-426614174000",
  "clinicianName": "Dr. Jane Wilson",
  "status": "processing",
  "turnaroundType": "standard",
  "basePrice": 150.00,
  "shippingPrice": 20.00,
  "taxAmount": 15.30,
  "totalPrice": 185.30,
  "statusHistory": [
    {
      "status": "processing",
      "notes": "Order received and processing started",
      "changedBy": "System",
      "createdAt": "2025-04-01T14:45:00Z"
    }
  ],
  "createdAt": "2025-04-01T14:45:00Z",
  "updatedAt": "2025-04-01T14:45:00Z",
  "estimatedDelivery": "2025-04-08",
  "actualDelivery": null
}
```

### PUT /orders/:id/status
Updates the status of an order.

**Request:**
```json
{
  "status": "shipped",
  "notes": "Order shipped via FedEx, tracking #123456789"
}
```

**Response:**
```json
{
  "id": "623e4567-e89b-12d3-a456-426614174000",
  "orderNumber": "ORD-1744275637983",
  "status": "shipped",
  "statusHistory": [
    {
      "status": "processing",
      "notes": "Order received and processing started",
      "changedBy": "System",
      "createdAt": "2025-04-01T14:45:00Z"
    },
    {
      "status": "shipped",
      "notes": "Order shipped via FedEx, tracking #123456789",
      "changedBy": "Jane Doe",
      "createdAt": "2025-04-05T11:30:00Z"
    }
  ],
  "updatedAt": "2025-04-05T11:30:00Z"
}
```

## Invoice Endpoints

### GET /invoices
Returns a list of invoices.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `status`: Filter by status (pending, paid, overdue, cancelled)
- `sort`: Field to sort by (default: issuedDate)
- `order`: Sort order (asc/desc, default: desc)

**Response:**
```json
{
  "total": 25,
  "page": 1,
  "limit": 20,
  "invoices": [
    {
      "id": "723e4567-e89b-12d3-a456-426614174000",
      "invoiceNumber": "INV-1744275637983",
      "orderId": "623e4567-e89b-12d3-a456-426614174000",
      "orderNumber": "ORD-1744275637983",
      "clinicName": "Foot Health Clinic",
      "amount": 185.30,
      "status": "pending",
      "issuedDate": "2025-04-01",
      "dueDate": "2025-05-01"
    },
    // More invoices...
  ]
}
```

### GET /invoices/:id
Returns a specific invoice by ID.

**Response:**
```json
{
  "id": "723e4567-e89b-12d3-a456-426614174000",
  "invoiceNumber": "INV-1744275637983",
  "orderId": "623e4567-e89b-12d3-a456-426614174000",
  "orderNumber": "ORD-1744275637983",
  "clinicId": "823e4567-e89b-12d3-a456-426614174000",
  "clinicName": "Foot Health Clinic",
  "amount": 185.30,
  "status": "pending",
  "issuedDate": "2025-04-01",
  "dueDate": "2025-05-01",
  "paidDate": null,
  "paymentMethod": null,
  "createdAt": "2025-04-01T14:45:00Z",
  "updatedAt": "2025-04-01T14:45:00Z"
}
```

### PUT /invoices/:id/status
Updates the status of an invoice.

**Request:**
```json
{
  "status": "paid",
  "paidDate": "2025-04-15",
  "paymentMethod": "credit_card"
}
```

**Response:**
```json
{
  "id": "723e4567-e89b-12d3-a456-426614174000",
  "invoiceNumber": "INV-1744275637983",
  "status": "paid",
  "paidDate": "2025-04-15",
  "paymentMethod": "credit_card",
  "updatedAt": "2025-04-15T10:00:00Z"
}
```

### GET /invoices/:id/pdf
Generates a PDF of the invoice.

**Response:**
Binary PDF file with appropriate content-type headers.

## Template Endpoints

### GET /templates
Returns a list of prescription templates.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `isPublic`: Filter by public/private status
- `sort`: Field to sort by (default: name)
- `order`: Sort order (asc/desc, default: asc)

**Response:**
```json
{
  "total": 10,
  "page": 1,
  "limit": 20,
  "templates": [
    {
      "id": "523e4567-e89b-12d3-a456-426614174000",
      "name": "Standard Plantar Fasciitis",
      "description": "Template for standard plantar fasciitis cases",
      "createdBy": "Dr. Jane Wilson",
      "isPublic": true,
      "createdAt": "2025-01-10T09:00:00Z"
    },
    // More templates...
  ]
}
```

### GET /templates/:id
Returns a specific template by ID.

**Response:**
```json
{
  "id": "523e4567-e89b-12d3-a456-426614174000",
  "name": "Standard Plantar Fasciitis",
  "description": "Template for standard plantar fasciitis cases",
  "createdById": "323e4567-e89b-12d3-a456-426614174000",
  "createdBy": "Dr. Jane Wilson",
  "clinicId": "823e4567-e89b-12d3-a456-426614174000",
  "isPublic": true,
  "details": [
    {
      "footSide": "both",
      "parameterName": "arch_height",
      "parameterValue": "medium",
      "parameterUnit": "mm"
    },
    // More parameters...
  ],
  "createdAt": "2025-01-10T09:00:00Z",
  "updatedAt": "2025-03-15T14:30:00Z"
}
```

### POST /templates
Creates a new template.

**Request:**
```json
{
  "name": "High Arch Support",
  "description": "Template for patients with high arches",
  "isPublic": true,
  "details": [
    {
      "footSide": "both",
      "parameterName": "arch_height",
      "parameterValue": "high",
      "parameterUnit": "mm"
    },
    // More parameters...
  ]
}
```

**Response:**
```json
{
  "id": "923e4567-e89b-12d3-a456-426614174000",
  "name": "High Arch Support",
  "description": "Template for patients with high arches",
  "createdById": "323e4567-e89b-12d3-a456-426614174000",
  "createdBy": "Dr. Jane Wilson",
  "clinicId": "823e4567-e89b-12d3-a456-426614174000",
  "isPublic": true,
  "details": [
    {
      "footSide": "both",
      "parameterName": "arch_height",
      "parameterValue": "high",
      "parameterUnit": "mm"
    },
    // More parameters...
  ],
  "createdAt": "2025-04-10T11:00:00Z",
  "updatedAt": "2025-04-10T11:00:00Z"
}
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error responses follow this format:

```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Invalid input parameters",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address"
      }
    ]
  }
}
```
