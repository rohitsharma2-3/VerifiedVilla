# 🏡 Airbnb Clone (Node.js + Express + EJS + MongoDB)

Live Demo: 👉 (https://verifiedvilla2.onrender.com/VerifiedVilla)


An Airbnb-style web application
built using the **MVC architecture**, with features such as **user authentication**, **authorization**, **CRUD operations**, **image uploads**, and **custom error handling**. 
The app allows users to register, create listings, leave reviews, and manage their own properties.

---

## ✨ Features

- 🔑 User registration, login, logout (Passport.js)
- 📦 MVC architecture (Model-View-Controller)
- 🏠 Create, Read, Update, Delete Listings
- 🗣️ Add & delete reviews
- 🖼️ Upload images using Cloudinary + Multer
- 🔒 Authorization: Only owners can edit/delete their listings
- 🧠 Custom error handling
- 📢 Flash messages for feedback
- 📃 Form validation using Joi

---

## 🧱 Project Structure (MVC)

airbnb-clone/
├── controllers/ # Business logic (Listings, Reviews, Auth)
├── init/ # MongoDB connection setup
├── models/ # Mongoose models (User, Listing, Review)
├── routes/ # Express route files
├── views/ # EJS templates
│ ├── partials/ # Navbar, footer, etc.
│ ├── listings/ # Listing views
│ ├── reviews/ # Review forms
│ └── users/ # Auth views
├── public/ # Static assets (CSS, images, JS)
├── utils/ # Custom ExpressError, async wrapper
├── schema.js # Joi validation schemas
├── cloudConfig.js # Cloudinary config
├── app.js # Main Express app file
├── .env # Environment variables
├── .gitignore
├── package.json
└── README.md



---

## 🧰 Tech Stack

| Tech            | Use                              |
|-----------------|----------------------------------|
| Node.js         | JavaScript runtime               |
| Express.js      | Web framework                    |
| MongoDB         | NoSQL database                   |
| Mongoose        | MongoDB ODM                      |
| EJS             | Templating engine                |
| ejs-mate        | Layout support for EJS           |
| Passport.js     | Authentication                   |
| Joi             | Server-side validation           |
| Multer          | File upload middleware           |
| Cloudinary      | Cloud image storage              |
| express-session | User sessions                    |
| connect-flash   | Flash messaging                  |


