# Mew & Brew Café System

## Project Description
Mew & Brew is a web-based café system that includes user login, a dashboard with analytics, a product ordering interface with cart and payment options, and a feedback submission page. The system is built using HTML, CSS, JavaScript, and Bootstrap.

---

## Features Included
- **Login & Registration Page (index.html)**  
  - Username and password login  
  - Registration form  
  - Error message display  
  - Redirects to dashboard upon successful login  

- **Dashboard Page (dashboard.html)**  
  - Welcome message  
  - Total Sales, Total Orders, and Customer Count cards  
  - “Most Popular Drinks” chart (Chart.js)  
  - “Customer Satisfaction” chart (Chart.js)  
  - Navigation bar linking to Dashboard, Product, Feedback, and Logout  

- **Products Page (products.html)**  
  - Category filter buttons (Coffee, Tea, Chocolate, Matcha, Juice, Smoothies)  
  - Dynamic product grid  
  - Cart system (add items, view total)  
  - Checkout modal  
  - Cash payment section with waiting number  
  - QR payment option with countdown timer  

- **Feedback Page (feedback.html)**  
  - Feedback form (Name, Email, Rating, Comment)  
  - Customer reviews displayed in a list  
  - Navigation bar for page switching  

- **Footer**  
  - Appears on all pages  
  - © 2025 Mew&Brew | All Rights Reserved

---

## Instructions to Test Login
1. Open **index.html** in a browser.  
2. Go to the **Register** tab.  
3. Enter a username and password.  
4. Click **Register** (the data is stored in localStorage).  
5. Switch to the **Login** tab.  
6. Enter the same username and password.  
7. Click **Login** → You will be redirected to **dashboard.html** if the credentials match.

---

## Frameworks / Libraries Used
- **Bootstrap 5.3** – Layout, components, responsiveness  
- **Bootstrap Icons** – Icons used in the dashboard  
- **Chart.js** – Used for chart visualizations in the dashboard  
- **Custom CSS** – `css/style.css`  
- **Custom JavaScript** – `js/app.js`

