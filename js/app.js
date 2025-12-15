// -------------------- LOGIN & REGISTER --------------------
document.addEventListener("DOMContentLoaded", function() {

    // Initialize default users if none
    if (!localStorage.getItem("users")) {
        const defaultUsers = { "catlover": "mew123" };
        localStorage.setItem("users", JSON.stringify(defaultUsers));
    }

    let users = JSON.parse(localStorage.getItem("users"));

    // ----- LOGIN PAGE -----
    if (document.getElementById("loginUser")) {

        // Login function
        window.login = function() {
            const username = document.getElementById("loginUser").value.trim();
            const password = document.getElementById("loginPass").value.trim();
            const loginError = document.getElementById("loginError");

            if (users[username] && users[username] === password) {
                localStorage.setItem("currentUser", username);
                window.location.href = "dashboard.html";
            } else {
                loginError.innerText = "Invalid username or password!";
            }
        };

        // Register function
        window.register = function() {
            const newUser = document.getElementById("regUser").value.trim();
            const newPass = document.getElementById("regPass").value.trim();
            const registerMsg = document.getElementById("registerMsg");

            if (!newUser || !newPass) {
                registerMsg.innerText = "Please enter valid username and password.";
                registerMsg.classList.remove("text-success");
                registerMsg.classList.add("text-danger");
                return;
            }

            if (users[newUser]) {
                registerMsg.innerText = "Username already exists!";
                registerMsg.classList.remove("text-success");
                registerMsg.classList.add("text-danger");
                return;
            }

            users[newUser] = newPass;
            localStorage.setItem("users", JSON.stringify(users));
            registerMsg.innerText = "Account created! You can now login.";
            registerMsg.classList.remove("text-danger");
            registerMsg.classList.add("text-success");
            document.getElementById("regUser").value = "";
            document.getElementById("regPass").value = "";
        };
    }

    // ---------- DASHBOARD JS ----------
    const username = localStorage.getItem("currentUser") || "Guest";
    document.getElementById("welcomeUser").innerText = `Welcome, ${username} 🐾`;

    // data for drinks 
    const totalCustomers = 805;

    // Update cards summary
    const salesData = JSON.parse(localStorage.getItem("drinkSales")) || {};
    const totalOrders = Object.values(salesData).reduce((a,b)=>a+b,0);
    const totalSales = totalOrders * 5; 

    document.getElementById("salesCount").innerText = `RM ${totalSales.toFixed(2)}`;
    document.getElementById("ordersCount").innerText = totalOrders;

// ---------- Most Popular Drinks Chart  ----------
let drinkChart;
function updateDrinkChart() {
    const salesData = JSON.parse(localStorage.getItem("drinkSales")) || {};
    const drinks = Object.keys(salesData);
    const orders = Object.values(salesData);

    // ---------- Update Cards ----------
    const totalOrders = orders.reduce((a, b) => a + b, 0);
    const totalSales = totalOrders * 5; 
    document.getElementById("ordersCount").innerText = totalOrders;
    document.getElementById("salesCount").innerText = `RM ${totalSales.toFixed(2)}`;

    // Count customers from feedback
    const userReviews = JSON.parse(localStorage.getItem("userReviews")) || [];
    const uniqueCustomers = [...new Set(userReviews.map(r => r.email))].length;

    // ---------- Update Chart ----------
    if(drinkChart) {
        drinkChart.data.labels = drinks;
        drinkChart.data.datasets[0].data = orders;
        drinkChart.update();
    } else {
        const drinkCtx = document.getElementById('drinkChart').getContext('2d');
        drinkChart = new Chart(drinkCtx, {
            type: 'bar',
            data: {
                labels: drinks,
                datasets: [{
                    label: 'Number of Orders',
                    data: orders,
                    backgroundColor: '#FF8C94'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    title: { display: true, text: 'Most Popular Drinks', font: { size:16 } }
                },
                scales: { y: { beginAtZero: true } }
            }
        });
    }
}
updateDrinkChart();


    // ---------- Customer Satisfaction Chart ----------
    let ratingChart;
    function updateRatingChart() {
        const userReviews = JSON.parse(localStorage.getItem("userReviews")) || [];
        const ratingsCount = [0,0,1,2,5];

        userReviews.forEach(r => {
            const rating = parseInt(r.rating);
            if(rating >=1 && rating <=5) ratingsCount[rating-1]++;
        });

        if(ratingChart) {
            ratingChart.data.datasets[0].data = ratingsCount;
            ratingChart.update();
        } else {
            const ratingCtx = document.getElementById('ratingChart').getContext('2d');
            ratingChart = new Chart(ratingCtx, {
                type: 'bar',
                data: {
                    labels: ['1 ★', '2 ★', '3 ★', '4 ★', '5 ★'],
                    datasets: [{
                        label: 'Number of Customers',
                        data: ratingsCount,
                        backgroundColor: ['#BF1A1A','#E8D1C5','#BF124D','#F875AA','#5A0E24'],
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        title: { display: true, text: 'Customer Satisfaction Rating', font: { size: 16 } }
                    },
                    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
                }
            });
        }
    }
    updateRatingChart();

});

// ---------- PRODUCTS & CART ----------
document.addEventListener("DOMContentLoaded", function() {

    // ---------- PRODUCTS ----------
    const products = [
        { id:1, name:"Espresso", category:"coffee", price:8, img:"images/espresso.jpg" },
        { id:2, name:"Cappuccino", category:"coffee", price:10, img:"images/coffee2.jpg" },
        { id:3, name:"Green Tea", category:"tea", price:7, img:"images/tea1.jpg" },
        { id:4, name:"Milk Tea", category:"tea", price:6, img:"images/tea2.jpg" },
        { id:5, name:"Hot Chocolate", category:"chocolate", price:9, img:"images/chocolate1.jpg" },
        { id:6, name:"Chocolate Frappe", category:"chocolate", price:12, img:"images/chocolate2.jpg" },
        { id:7, name:"Matcha Mango", category:"matcha", price:11, img:"images/matcha1.jpg" },
        { id:8, name:"Matcha Latte", category:"matcha", price:10, img:"images/matcha2.jpg" },
        { id:9, name:"Orange Juice", category:"juice", price:8, img:"images/juice1.jpg" },
        { id:10, name:"Apple Juice", category:"juice", price:8, img:"images/juice2.jpg" },
        { id:11, name:"Strawberry Smoothie", category:"smoothies", price:12, img:"images/smoothie1.jpg" },
        { id:12, name:"Mango Smoothie", category:"smoothies", price:12, img:"images/smoothie2.jpg" },
        { id:13, name:"Caramel Macchiato", category:"coffee", price:15, img:"images/coffee3.jpg"},
        { id:14, name:"Ice Lemon Tea", category:"tea", price:5, img:"images/tea3.jpg"},
        { id:15, name:"Chocolate Milk", category:"chocolate", price:15, img:"images/chocolate3.jpg"},
        { id:16, name:"Matcha Strawberry", category:"matcha", price:20, img:"images/matcha3.jpg"},
        { id:17, name:"Strawberry Juice", category:"juice", price:17, img:"images/juice3.jpg"},
        { id:18, name:"Rainbow Smoothie", category:"smoothies", price:16, img:"images/smoothie3.jpg"},
    ];

    // ---------- ELEMENTS ----------
    const productGrid = document.getElementById("productGrid");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const checkoutBtn = document.getElementById("checkoutBtn");
    const paymentModalEl = document.getElementById("paymentModal");
    const paymentModal = new bootstrap.Modal(paymentModalEl);
    const modalTotal = document.getElementById("modalTotal");
    const confirmPaymentBtn = document.getElementById("confirmPayment");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let currentCategory = "coffee";
    let qrCountdown;

    // ---------- RENDER PRODUCTS ----------
    function renderProducts(category){
        productGrid.innerHTML = "";
        const filtered = products.filter(p => p.category === category);
        filtered.forEach(p => {
            const card = document.createElement("div");
            card.className = "col-md-4";
            card.innerHTML = `
                <div class="product-card">
                    <img src="${p.img}" alt="${p.name}">
                    <h5>${p.name}</h5>
                    <p>RM ${p.price.toFixed(2)}</p>
                    <button class="btn btn-pink btn-sm" onclick="addToCart(${p.id})">Add to Cart</button>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }

    // ---------- RENDER CART ----------
    function renderCart(){
        cartItems.innerHTML = "";
        if(cart.length === 0){
            cartItems.innerHTML = `<p class="text-muted">No items in cart.</p>`;
            cartTotal.innerText = "Total: RM 0";
            return;
        }
        let total = 0;
        cart.forEach((item,index) => {
            total += item.price * item.qty;
            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <span>${item.name} (RM ${item.price})</span>
                <div>
                    <input type="number" min="1" value="${item.qty}" onchange="updateQty(${index},this.value)">
                    <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button>
                </div>
            `;
            cartItems.appendChild(div);
        });
        cartTotal.innerText = `Total: RM ${total}`;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // ---------- CART FUNCTIONS ----------
    window.addToCart = function(id){
        const product = products.find(p => p.id===id);
        let item = cart.find(i=>i.id===id);
        if(item) item.qty +=1;
        else cart.push({...product, qty:1});
        renderCart();
    }
    window.updateQty = function(index, qty){
        cart[index].qty = parseInt(qty);
        renderCart();
    }
    window.removeItem = function(index){
        cart.splice(index,1);
        renderCart();
    }

    // ---------- CATEGORY BUTTONS ----------
    categoryButtons.forEach(btn=>{
        btn.addEventListener("click",()=>{
            document.querySelector(".category-btn.active").classList.remove("active");
            btn.classList.add("active");
            currentCategory = btn.dataset.category;
            renderProducts(currentCategory);
        });
    });

    // ---------- CHECKOUT ----------
    checkoutBtn.addEventListener("click", ()=> {
        if(cart.length===0){ alert("Your cart is empty!"); return; }

        // Update sales data in localStorage
        let salesData = JSON.parse(localStorage.getItem("drinkSales")) || {};
        cart.forEach(item => {
            if(salesData[item.name]) salesData[item.name] += item.qty;
            else salesData[item.name] = item.qty;
        });
        localStorage.setItem("drinkSales", JSON.stringify(salesData));

        // Update chart
        if(typeof updateDrinkChart === "function") updateDrinkChart();

        // Show modal
        let total = cart.reduce((sum,item)=>sum+item.price*item.qty,0);
        modalTotal.innerText = `Total Amount: RM ${total}`;
        paymentModal.show();
    });

    confirmPaymentBtn.addEventListener("click", ()=>{
        alert("Payment successful! Thank you for your order.");
        cart=[];
        localStorage.setItem("cart",JSON.stringify(cart));
        renderCart();
        paymentModal.hide();
    });

    // ---------- INITIAL RENDER ----------
    renderProducts(currentCategory);
    renderCart();

    // ---------- PAYMENT OPTIONS ----------
    const payCashBtn = document.getElementById("payCash");
    const payQRBtn = document.getElementById("payQR");
    const cashInfo = document.getElementById("cashInfo");
    const qrInfo = document.getElementById("qrInfo");
    const qrTimer = document.getElementById("qrTimer");
    const waitingNumber = document.getElementById("waitingNumber");

    payCashBtn.addEventListener("click",()=>{
        qrInfo.classList.add("d-none");
        cashInfo.classList.remove("d-none");
        waitingNumber.innerText = Math.floor(Math.random()*100+1);
    });

    payQRBtn.addEventListener("click", () => {
        cashInfo.classList.add("d-none");
        qrInfo.classList.remove("d-none");

        let timeLeft = 50;
        qrTimer.innerText = `Closing in ${timeLeft}s`;
        clearInterval(qrCountdown);

        qrCountdown = setInterval(() => {
            timeLeft--;
            qrTimer.innerText = `Closing in ${timeLeft}s`;
            if(timeLeft <= 0){
                clearInterval(qrCountdown);
                paymentModal.hide();
            }
        }, 1000);

        document.getElementById("qrWaitingNumber").innerText = "";
    });

});

// ---------- FEEDBACK FORM ----------
const feedbackForm = document.getElementById("feedbackForm");
const reviewList = document.getElementById("reviewList");

// Load existing user reviews from localStorage
let userReviews = JSON.parse(localStorage.getItem("userReviews")) || [];

function loadUserReviews() {
    userReviews.forEach(r => {
        reviewList.innerHTML += `
            <div class="p-3 border rounded mb-2">
                <h5>${r.name} — ${r.rating} ★</h5>
                <p>${r.comment}</p>
                <small>${r.email}</small>
            </div>
        `;
    });
}

// Initial load
loadUserReviews();

// Add new review
feedbackForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("fbName").value;
    const email = document.getElementById("fbEmail").value;
    const rating = document.getElementById("fbRating").value;
    const comment = document.getElementById("fbComment").value;

    const newReview = { name, email, rating, comment };

    userReviews.push(newReview);
    localStorage.setItem("userReviews", JSON.stringify(userReviews));

    // Display new review
    reviewList.innerHTML += `
        <div class="p-3 border rounded mb-2">
            <h5>${name} — ${rating} ★</h5>
            <p>${comment}</p>
            <small>${email}</small>
        </div>
    `;

    feedbackForm.reset();

    // Update rating chart dynamically
    if(typeof updateRatingChart === "function") updateRatingChart();
});

// ------------------- RENDER REVIEWS -------------------
function renderReviews() {
    reviewList.innerHTML = "";

    feedbackData.forEach((fb) => {
        let card = document.createElement("div");
        card.className = "review-box"; 

        card.innerHTML = `
            <div class="review-name">${fb.name}</div>
            <div class="review-rating">${"★".repeat(fb.rating)}</div>
            <div class="review-comment">${fb.comment}</div>
        `;

        reviewList.appendChild(card);
    });
}


