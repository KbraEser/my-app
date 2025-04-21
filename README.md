RTK Customer & Product Management System

Overview
A modern, responsive web application for efficient customer and product management built with React, TypeScript, and Redux Toolkit. This system provides a comprehensive solution for businesses looking to streamline their inventory and customer relationship management processes.

✨ Features
Customer Management
Complete CRUD Operations — Create, read, update, and delete customer records
Advanced Data Handling — Server-side pagination, sorting, and filtering
Data Export — Export customer data in Excel or CSV formats
Bulk Import — Upload multiple customer records via file import
Validation — Robust form validation to ensure data integrity

Product Management
Product Catalog — Easily manage your product portfolio
Variant Support — Add multiple variants to a single product
Stock Control — Track inventory levels with critical stock alerts
Active/Inactive Status — Manage product visibility status
Category Integration — Organize products by categories

🚀 Technology Stack
Frontend Framework: React with TypeScript
State Management: Redux Toolkit
UI Components: Material-UI
Form Management: Formik with Yup validation
HTTP Client: Axios
Build Tool: Vite

📚 Usage Guidelines
Customer Module
Navigate to the Customers page to view the customer list
Use the search bar to filter customers by name, email, or other attributes
Click on action icons to edit or delete customer records
Use the export button to download customer data
Import customers via the upload button
Product Module
Add new products with detailed information including price, VAT rate, and description
Create multiple variants for each product
Set critical stock levels for inventory management
Toggle active status for each variant
Assign products to appropriate categories

🔧 Configuration
The application connects to a backend API configured in the service files. Modify the base URL in the API configuration file if needed.
