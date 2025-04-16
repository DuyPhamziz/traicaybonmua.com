document.getElementById("checkout-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Ngăn form gửi đi mặc định

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Giỏ hàng đang trống!");
        return;
    }

    const name = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!email.endsWith("@gmail.com")) {
        alert("Email phải có đuôi @gmail.com.");
        return;
    }

    if (!/^0\d{9}$/.test(phone)) {
        alert("Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0.");
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        alert("Vui lòng đăng nhập để thanh toán.");
        return;
    }

    const newOrder = {
        date: new Date().toLocaleString(),
        customer: { name, email, phone, address },
        items: cart,
        userID: currentUser.userID,
        status: "Chờ duyệt"
    };

    const allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
    allOrders.push(newOrder);
    localStorage.setItem("allOrders", JSON.stringify(allOrders));

    const orderKey = `orderHistory_${currentUser.userID}`;
    const orderHistory = JSON.parse(localStorage.getItem(orderKey)) || [];
    orderHistory.push(newOrder);
    localStorage.setItem(orderKey, JSON.stringify(orderHistory));

    localStorage.removeItem("cart");

    showThankYouOverlay();
    this.reset();

    setTimeout(() => {
        window.location.href = "/user/lichsu.html";
    }, 3000);
});

function loadCart() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartSummary = document.getElementById("cart-summary");
    const totalEl = document.getElementById("total-price");
    let total = 0;
    cartSummary.innerHTML = "";


    if (cart.length === 0) {
        cartSummary.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
        totalEl.innerText = "0 VNĐ";
        return;
    }


    cart.forEach(item => {

        const price = parseInt(item.giadagiam.replace(/\D/g, ""));
        const itemTotal = price * item.soluong;
        total += itemTotal;


        const row = `
            <div class="d-flex align-items-center mb-3 border-bottom pb-2">
                <img src="${item.hinh}" class="img-thumbnail me-3" style="width: 80px; height: 80px; object-fit: cover;">
                <div>
                    <p class="mb-1 fw-bold text-dark" style="font-size: 16px;">${item.tensp}</p>
                    <small><strong>Số lượng:</strong> ${item.soluong}</small><br>
                    <small><strong>Giá:</strong> ${item.giadagiam}</small>
                </div>
            </div>
        `;

        cartSummary.innerHTML += row;
    });


    totalEl.innerText = total.toLocaleString("vi-VN") + " VNĐ";
}

document.addEventListener("DOMContentLoaded", loadCart);

function showThankYouOverlay() {
    const overlay = document.getElementById("thankYouOverlay");
    overlay.style.display = "flex";


    setTimeout(function () {
        overlay.style.display = "none";
    }, 3000);
}