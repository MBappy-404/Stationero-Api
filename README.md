# Blog Platform API

## Overview

The **Blog Platform API** is a backend service that powers a blogging platform. It allows users to create, update, delete, and view blogs. The system uses **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, and **TypeScript** for its backend implementation. 

The platform distinguishes between **Admin** and **User** roles, where Admins have additional privileges such as managing users and blogs. Regular Users can manage their own blogs. The API ensures secure authentication, role-based access control, and supports public access to view blogs with advanced search, filtering, and sorting options.

---

## Key Features

- **User Roles**: 
  - **Admin**: Can manage users and blogs. Can block users and delete any blog.
  - **User**: Can manage their own blogs, but cannot delete others’ blogs or perform admin tasks.

- **Authentication & Authorization**: 
  - Secure authentication using JWT tokens.
  - Role-based access to API routes.
  
- **Blog Management**:
  - Users can create, update, and delete their own blogs.
  - Admins can manage all blogs and users.

- **Public Blog API**:
  - Publicly accessible API for reading blogs.
  - Advanced filtering, sorting, and search functionality for blog viewing.

---

## Models

- **User Model**: 
  - Contains user details, including role and blocked status.

- **Blog Model**: 
  - Represents a blog with a title, content, author, and publication status.

---

## API Endpoints

- **Authentication**: 
  - Register and login users to receive JWT tokens for authentication.

- **Blog Management**:
  - Endpoints to create, update, delete, and view blogs.

- **Admin Actions**:
  - Admin-specific actions to block users and delete any blog.

---

## Error Handling

The API uses standardized error responses for common issues, including validation errors, authorization errors, and server issues.

---

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **TypeScript**

---

## Installation

To run the Blog Platform API locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/blog-platform-api.git
