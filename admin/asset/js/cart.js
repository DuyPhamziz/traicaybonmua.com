function addToCart(index) {
    const product = product_fruit[index];
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Kiểm tra sản phẩm đã có trong giỏ chưa
    const existingProduct = cart.find(item => item.tensp === product.tensp);

    if (existingProduct) {
        existingProduct.soluong += 1;
    } else {
        cart.push({
            tensp: product.tensp,
            hinh: product.hinh,
            giagoc: product.giagoc,
            giadagiam: product.giadagiam,
            soluong: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); // Cập nhật số lượng trên icon giỏ hàng

    const overlay = document.getElementById("cart-overlay");
    if (overlay.style.display === "block") {
        showOverlay();
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((total, item) => total + item.soluong, 0);
    document.getElementById("cart-count").textContent = count;
}

// Gọi khi load trang
window.onload = updateCartCount;

function showOverlay() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-items");
    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p class='text-center text-muted'>Giỏ hàng trống.</p>";
    } else {
        cart.forEach((item, index) => {
            const gia = parsePrice(item.giadagiam);
            const thanhTien = gia * item.soluong;
            total += thanhTien;

            container.innerHTML += `
                <div class="d-flex mb-3 border-bottom pb-2">
                    <img src="${item.hinh}" class="me-3 rounded" style="width: 60px; height: 60px; object-fit: cover;" alt="${item.tensp}">
                    <div class="flex-grow-1">
                        <div class="fw-bold">${item.tensp}</div>
                        <div>Số lượng: ${item.soluong}</div>
                        <div>Giá: ${gia.toLocaleString()} VNĐ</div>
                        <div>Thành tiền: ${thanhTien.toLocaleString()} VNĐ</div>
                    </div>
                    <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeFromCart(${index})">&times;</button>
                </div>
            `;
        });
    }

    document.getElementById("cart-total").textContent = total.toLocaleString() + " VNĐ";
    document.getElementById("cart-overlay").style.display = "block";
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showOverlay();
}

function closeOverlay() {
    document.getElementById("cart-overlay").style.display = "none";
}