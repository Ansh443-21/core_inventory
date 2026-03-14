# CoreInventory 📦

CoreInventory is a simple full-stack **Inventory Management System** built with **Node.js, Express, SQLite, and HTML/CSS/JavaScript**.
It helps manage product stock, receipts, deliveries, transfers, and adjustments through a clean dashboard interface.

---

## 🚀 Features

* 🔐 User Authentication (Login / Signup)
* 📊 Dashboard with inventory statistics
* 📦 Product Management
* 📥 Receipts (Increase stock)
* 📤 Deliveries (Reduce stock)
* 🔄 Transfers between locations
* ⚙️ Stock Adjustments
* 📜 Stock History tracking
* 💾 SQLite database storage
* 🌐 REST API backend with Express
* 🎨 Clean dashboard UI

---

## 🛠 Tech Stack

Frontend

* HTML
* CSS
* JavaScript

Backend

* Node.js
* Express.js

Database

* SQLite

Tools

* Git
* GitHub
* VS Code

---

## 📁 Project Structure

```
coreinventory/
│
├── dashboard.html
├── products.html
├── receipts.html
├── deliveries.html
├── transfers.html
├── adjustments.html
├── history.html
├── settings.html
├── login.html
├── signup.html
│
├── core-inventory-backend/
│   ├── server.js
│   ├── inventory.db
│   ├── package.json
│   └── node_modules/
│
└── README.md
```

---

## ⚙️ Installation

Clone the repository

```
git clone https://github.com/YOUR_USERNAME/coreinventory.git
```

Navigate to backend

```
cd core-inventory-backend
```

Install dependencies

```
npm install
```

Start the server

```
node server.js
```

---

## ▶️ Running the Project

After starting the backend server:

Open the browser and go to

```
http://localhost:3000/login.html
```

Login and access the dashboard.

---

## 📊 Dashboard

The dashboard shows:

* Total Products
* Low Stock Items
* Receipts Count
* Deliveries Count

These values update automatically based on inventory operations.

---

## 📡 API Endpoints

| Method | Endpoint     | Description          |
| ------ | ------------ | -------------------- |
| POST   | /signup      | Register user        |
| POST   | /login       | User login           |
| GET    | /products    | Fetch all products   |
| POST   | /products    | Add product          |
| POST   | /receipts    | Add stock            |
| POST   | /deliveries  | Reduce stock         |
| POST   | /transfers   | Transfer stock       |
| POST   | /adjustments | Adjust stock         |
| GET    | /history     | Get stock history    |
| GET    | /dashboard   | Dashboard statistics |

---

## 📌 Future Improvements

* Inventory charts and analytics
* Real-time updates
* Product image support
* Multi-warehouse support
* Role-based authentication
* Export reports

---

## 👨‍💻 Author

Developed as a **Full Stack Inventory Management Project** using Node.js and SQLite.

## Team Members/Contributers.
1) Front end - Ansh Vaghela & Rishika Giri
2) Back end - Nitya Patel & Fenil Parmar
3) UI/UX - Ansh Vaghela 
---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.
