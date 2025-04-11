# Database Schema for Orthotics Portal

This document outlines the database schema required for implementing the Orthotics Portal system.

## Entity Relationship Diagram

```
Users 1──* Prescriptions *──1 Patients
       │
       └──* Orders *──1 Prescriptions
              │
              └──* Invoices
```

## Tables Structure

### Users

Stores information about system users (clinicians, administrators, lab technicians).

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | VARCHAR(255) | User email (unique) |
| password_hash | VARCHAR(255) | Hashed password |
| first_name | VARCHAR(100) | User's first name |
| last_name | VARCHAR(100) | User's last name |
| role | ENUM | User role (clinician, admin, lab_tech) |
| clinic_id | UUID | Foreign key to Clinics table |
| created_at | TIMESTAMP | Account creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |
| last_login | TIMESTAMP | Last login timestamp |
| active | BOOLEAN | Account status |

### Clinics

Stores information about clinics.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(255) | Clinic name |
| address | TEXT | Physical address |
| phone | VARCHAR(20) | Contact phone number |
| email | VARCHAR(255) | Contact email |
| logo_url | VARCHAR(255) | URL to clinic logo |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Patients

Stores patient information.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| external_id | VARCHAR(100) | External patient ID |
| first_name | VARCHAR(100) | Patient's first name |
| last_name | VARCHAR(100) | Patient's last name |
| date_of_birth | DATE | Patient's date of birth |
| email | VARCHAR(255) | Patient's email |
| phone | VARCHAR(20) | Patient's phone number |
| address | TEXT | Patient's address |
| clinic_id | UUID | Foreign key to Clinics table |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Prescriptions

Stores orthotics prescription details.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| patient_id | UUID | Foreign key to Patients table |
| clinician_id | UUID | Foreign key to Users table |
| template_id | UUID | Foreign key to Templates table (optional) |
| status | ENUM | Status (draft, submitted, processing) |
| clinical_notes | TEXT | General clinical notes |
| left_foot_notes | TEXT | Notes specific to left foot |
| right_foot_notes | TEXT | Notes specific to right foot |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |
| submitted_at | TIMESTAMP | Submission timestamp |

### PrescriptionDetails

Stores detailed prescription parameters.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| prescription_id | UUID | Foreign key to Prescriptions table |
| foot_side | ENUM | Left or right foot |
| parameter_name | VARCHAR(100) | Name of parameter (e.g., "arch_height") |
| parameter_value | TEXT | Value of parameter |
| parameter_unit | VARCHAR(20) | Unit of measurement (e.g., "mm") |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### PrescriptionAttachments

Stores files attached to prescriptions.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| prescription_id | UUID | Foreign key to Prescriptions table |
| file_name | VARCHAR(255) | Original file name |
| file_path | VARCHAR(255) | Path to stored file |
| file_type | VARCHAR(50) | MIME type of file |
| file_size | INTEGER | Size in bytes |
| foot_side | ENUM | Left, right, or both |
| attachment_type | ENUM | Scan, photo, or document |
| created_at | TIMESTAMP | Record creation timestamp |

### Orders

Stores order information.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| order_number | VARCHAR(50) | Human-readable order number |
| prescription_id | UUID | Foreign key to Prescriptions table |
| clinician_id | UUID | Foreign key to Users table |
| patient_id | UUID | Foreign key to Patients table |
| status | ENUM | Processing, shipped, delivered, cancelled |
| turnaround_type | ENUM | Standard, express, rush |
| base_price | DECIMAL(10,2) | Base price of orthotics |
| shipping_price | DECIMAL(10,2) | Shipping cost |
| tax_amount | DECIMAL(10,2) | Tax amount |
| total_price | DECIMAL(10,2) | Total order price |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |
| estimated_delivery | DATE | Estimated delivery date |
| actual_delivery | DATE | Actual delivery date |

### OrderStatusHistory

Tracks order status changes.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| order_id | UUID | Foreign key to Orders table |
| status | ENUM | Order status |
| notes | TEXT | Status change notes |
| changed_by | UUID | Foreign key to Users table |
| created_at | TIMESTAMP | Status change timestamp |

### Invoices

Stores invoice information.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| invoice_number | VARCHAR(50) | Human-readable invoice number |
| order_id | UUID | Foreign key to Orders table |
| clinic_id | UUID | Foreign key to Clinics table |
| amount | DECIMAL(10,2) | Invoice amount |
| status | ENUM | Pending, paid, overdue, cancelled |
| due_date | DATE | Payment due date |
| issued_date | DATE | Invoice issue date |
| paid_date | DATE | Payment date |
| payment_method | VARCHAR(50) | Method of payment |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Templates

Stores prescription templates.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(255) | Template name |
| description | TEXT | Template description |
| created_by | UUID | Foreign key to Users table |
| clinic_id | UUID | Foreign key to Clinics table |
| is_public | BOOLEAN | Whether template is publicly available |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### TemplateDetails

Stores detailed template parameters.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| template_id | UUID | Foreign key to Templates table |
| foot_side | ENUM | Left, right, or both |
| parameter_name | VARCHAR(100) | Name of parameter |
| parameter_value | TEXT | Default value of parameter |
| parameter_unit | VARCHAR(20) | Unit of measurement |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## Indexes

- Users: email (unique)
- Patients: external_id, clinic_id
- Prescriptions: patient_id, clinician_id
- Orders: order_number (unique), prescription_id
- Invoices: invoice_number (unique), order_id

## Constraints

- Foreign key constraints on all relationships
- Cascade delete for certain relationships (e.g., deleting a prescription should delete all prescription details)
- Check constraints on enum values
- Not null constraints on required fields

## Data Migration Considerations

- Plan for migrating existing patient data
- Version control for schema changes
- Backup strategy before migrations
