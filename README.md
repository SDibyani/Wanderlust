# Wanderlust

**A Property Listing Website**

---

##  Overview

**Wanderlust** is a dynamic property listing web application built with the MERN stack (MongoDB, Express, Node.js). The app allows users to browse, search, and view property listings with a clean, engaging front-end interface.

---

##  Features

- **Property Listings** – Users can view a variety of properties with details like title, price, description, and images.
- **Dynamic Rendering** – Pages are rendered using EJS for server-side rendering and fast performance.
- **API Routes** – Built with Express.js and structured routes for modular development.
- **MongoDB Integration** – Schemas and models including property listings, users, and more, using Mongoose.
- **Cloud-Based Image Hosting** – Images likely stored using Cloudinary (based on `cloudConfig.js`).
- **User Authentication** – Middleware handles authentication (via `middlewire.js`) to secure private routes.
- **Responsive Frontend** – Uses CSS and JavaScript to render responsive views in `views/`, under EJS templates.
- **Structured Project Layout** – Organized MVC-like folder structure with `controllers`, `models`, `routes`, `utils`, and `views`.

---

##  Project Structure

Wanderlust/
├── app.js // Main server setup
├── cloudConfig.js // Config for cloud services (e.g., Cloudinary)
├── middlewire.js // Authentication middleware
├── routes/ // Route definitions
├── controllers/ // Request handlers
├── models/ // Database schemas
├── views/ // EJS templates
├── public/ // Static assets (styles, images, scripts)
├── utils/ // Helper utilities
├── schema.js // Request validation (possibly using Joi)
├── package.json
└── .gitignore


---

##  Tech Stack Summary

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (with Mongoose for schema definition)  
- **Templating**: EJS for dynamic server-side HTML  
- **Image Hosting**: Cloudinary configuration (via `cloudConfig.js`)  
- **Middleware**: Express middleware for auth and validation  
- **Frontend**: EJS templates, CSS, JS for interactivity

---

##  Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SDibyani/Wanderlust.git
cd Wanderlust

2.Install dependencies
npm install
3. Configure environment variables
Create a .env file and add necessary variables, such as:

MONGO_URI=<Your MongoDB connection URI>
CLOUDINARY_CLOUD_NAME=<cloud name>
CLOUDINARY_API_KEY=<api key>
CLOUDINARY_API_SECRET=<api secret>
SESSION_SECRET=<your secret>
4. Start the server
npm run dev  # or npm start
