function confirmCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Giỏ hàng đang trống!");
        return;
    }

    const name = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !email || !phone || !address) {
        alert("Vui lòng điền đầy đủ thông tin khách hàng.");
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        alert("Vui lòng đăng nhập để thanh toán.");
        return;
    }

    const newOrder = {
        date: new Date().toLocaleString(),
        customer: {
            name: name,
            email: email,
            phone: phone,
            address: address
        },
        items: cart,
        userID: currentUser.userID, // Lưu để lọc đơn của người dùng
        status: "Chờ duyệt" // ✅ thêm trạng thái mặc định
    };

    // Lưu đơn hàng vào key `allOrders` (chung cho tất cả người dùng, admin sẽ xử lý)
    const allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
    allOrders.push(newOrder);
    localStorage.setItem("allOrders", JSON.stringify(allOrders));

    // Lưu lịch sử đơn hàng riêng cho người dùng vào key `orderHistory_${currentUser.userID}`
    const orderKey = `orderHistory_${currentUser.userID}`;
    const orderHistory = JSON.parse(localStorage.getItem(orderKey)) || [];
    orderHistory.push(newOrder);
    localStorage.setItem(orderKey, JSON.stringify(orderHistory));


    // Dọn giỏ hàng
    localStorage.removeItem("cart");

    showThankYouOverlay();

    document.getElementById("checkout-form").reset();

    setTimeout(() => {
        window.location.href = "/user/lichsu.html";
    }, 3000);
}
function loadCart() {
    // Lấy giỏ hàng từ localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartSummary = document.getElementById("cart-summary");
    const totalEl = document.getElementById("total-price"); // Phần tử để hiển thị tổng giá trị giỏ hàng
    let total = 0; // Biến để tính tổng tiền giỏ hàng
    cartSummary.innerHTML = ""; // Đặt lại nội dung của phần tử giỏ hàng

    // Nếu giỏ hàng trống
    if (cart.length === 0) {
        cartSummary.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
        totalEl.innerText = "0 VNĐ"; // Hiển thị tổng giá trị là 0
        return;
    }

    // Duyệt qua các sản phẩm trong giỏ hàng và tạo HTML cho chúng
    cart.forEach(item => {
        // Lấy giá trị của sản phẩm (đảm bảo xóa ký tự không phải số nếu cần thiết)
        const price = parseInt(item.giadagiam.replace(/\D/g, ""));
        const itemTotal = price * item.soluong; // Tính thành tiền của sản phẩm
        total += itemTotal; // Cộng dồn vào tổng giỏ hàng

        // Tạo HTML cho từng sản phẩm trong giỏ hàng
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

        // Thêm HTML vào container giỏ hàng
        cartSummary.innerHTML += row;
    });

    // Hiển thị tổng giỏ hàng
    totalEl.innerText = total.toLocaleString("vi-VN") + " VNĐ";
}
// Hàm hiển thị lớp phủ
function showThankYouOverlay() {
    const overlay = document.getElementById("thankYouOverlay");
    overlay.style.display = "flex";  // Hiển thị lớp phủ

    // Sau 3 giây, ẩn lớp phủ
    setTimeout(function () {
        overlay.style.display = "none";
    }, 3000); // 3000ms = 3 giây
}

// Gọi hàm loadCart khi trang tải xong
document.addEventListener("DOMContentLoaded", loadCart);
