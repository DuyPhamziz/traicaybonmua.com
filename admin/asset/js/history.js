document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        document.getElementById("orderHistoryContainer").innerHTML = "<p class='text-danger'>Vui lòng đăng nhập để xem lịch sử mua hàng.</p>";
        return;
    }

    const orderKey = `orderHistory_${currentUser.userID}`;
    const orderHistory = JSON.parse(localStorage.getItem(orderKey)) || [];

    const container = document.getElementById("orderHistoryContainer");
    if (orderHistory.length === 0) {
        container.innerHTML = "<p class='text-muted p-3 fw-bold'>Bạn chưa có đơn hàng nào.</p>";
        return;
    }

    orderHistory.reverse().forEach((order, index) => {
        let itemsHTML = "";
        order.items.forEach(item => {
            const price = parseInt(item.giadagiam.replace(/\D/g, ""));
            const total = price * item.soluong;
            itemsHTML += `
                <div class="border p-2 my-1">
                    <img src="${item.hinh}" alt="${item.tensp}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                    <strong>${item.tensp}</strong> - Số lượng: ${item.soluong}<br>
                    Giá: ${item.giadagiam} | Thành tiền: ${total.toLocaleString()} VNĐ <br>
                </div>
            `;
        });

        const receivedButton = order.status === "Đã giao"
            ? `<button class="btn btn-success btn-sm mt-2 confirm-receive-btn" data-order-index="${orderHistory.length - index - 1}">Đã nhận được hàng</button>`
            : "";

        container.innerHTML += `
            <div class="card mb-4 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">Đơn hàng #${orderHistory.length - index}</h5>
                    <p><strong>Người nhận:</strong> ${order.customer.name}</p>
                    <p><strong>Điện thoại:</strong> ${order.customer.phone}</p>
                    <p><strong>Địa chỉ:</strong> ${order.customer.address}</p>
                    <p><strong>Thời gian:</strong> ${order.date}</p>
                    <p><strong>Trạng thái:</strong> <span class="badge bg-info">${order.status}</span></p>
                    <div>${itemsHTML}</div>
                    ${receivedButton}
                </div>
            </div>
        `;
    });


    document.querySelectorAll('.confirm-receive-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const index = this.getAttribute('data-order-index');
            const orderKey = `orderHistory_${currentUser.userID}`;
            const orderHistory = JSON.parse(localStorage.getItem(orderKey)) || [];


            if (orderHistory[index].status === "Đang giao" || orderHistory[index].status === "Đã giao") {
                orderHistory[index].status = "Hoàn tất";
                localStorage.setItem(orderKey, JSON.stringify(orderHistory));


                const allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
                const match = allOrders.find(o =>
                    o.userID === currentUser.userID && o.date === orderHistory[index].date
                );
                if (match) {
                    match.status = "Hoàn tất";
                    localStorage.setItem("allOrders", JSON.stringify(allOrders));
                }

                alert("Cảm ơn bạn đã xác nhận. Đơn hàng đã được đánh dấu là 'Hoàn tất'.");
                location.reload();
            }
        });
    });
});
