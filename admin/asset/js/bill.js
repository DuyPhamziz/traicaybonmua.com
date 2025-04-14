function loadAllOrders() {
    const allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
    const container = document.getElementById("all-orders-list");

    // Nếu không có đơn hàng nào
    if (allOrders.length === 0) {
        container.innerHTML = "<p>Chưa có đơn hàng nào.</p>";
        return;
    }

    let html = "";

    allOrders.forEach((order, index) => {
        let itemList = order.items.map(item => {
            return `
                <li>
                    ${item.tensp} - SL: ${item.soluong} - Giá: ${item.giadagiam}
                </li>
            `;
        }).join("");

        html += `
            <div class="card mb-3">
                <div class="card-header bg-primary text-white">
                    Đơn hàng #${index + 1} - Ngày: ${order.date}
                </div>
                <div class="card-body">
                    <p><strong>Khách hàng:</strong> ${order.customer.name}</p>
                    <p><strong>Email:</strong> ${order.customer.email}</p>
                    <p><strong>Điện thoại:</strong> ${order.customer.phone}</p>
                    <p><strong>Địa chỉ:</strong> ${order.customer.address}</p>
                    <ul>${itemList}</ul>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}
document.addEventListener("DOMContentLoaded", function () {
    // Xử lý click menu để hiển thị danh mục
    const menuLinks = document.querySelectorAll('.menu-link');
    const contentArea = document.getElementById('content-area'); // Khu vực hiển thị nội dung

    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = link.getAttribute('data-target');

          
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => section.style.display = 'none');

           
            const targetSection = document.getElementById(target);
            if (targetSection) {
                targetSection.style.display = 'block';
            }


            if (target === 'all-orders-list') {
                loadAllOrders();
            }

        });
    });
});
