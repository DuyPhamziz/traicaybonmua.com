function loadAllOrders() {
    const allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
    const container = document.getElementById("all-orders-list");

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
    
        const statusOptions = ['Chờ duyệt', 'Đã duyệt', 'Đang giao', 'Đã giao', 'Hoàn tất'];
        const statusSelect = `
            <select class="form-select form-select-sm status-select" data-index="${index}">
                ${statusOptions.map(s => `<option value="${s}" ${s === order.status ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
        `;
    
       
        const isCompleted = order.status === "Hoàn tất";
    
        let cardClass = isCompleted ? "card mb-3 border-success" : "card mb-3";
        let statusHtml = isCompleted ? `<span class="badge bg-success">Hoàn tất</span>` : `<span>Trạng thái: ${statusSelect}</span>`;
    
        html += `
            <div class="${cardClass}">
                <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <span>Đơn hàng #${index + 1} - Ngày: ${order.date}</span>
                    ${statusHtml}
                </div>
                <div class="card-body ${isCompleted ? 'bg-light' : ''}">
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

 
    document.querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', function () {
            const index = this.getAttribute('data-index');
            const newStatus = this.value;

            
            allOrders[index].status = newStatus;
            localStorage.setItem('allOrders', JSON.stringify(allOrders));

           
            const userID = allOrders[index].userID;
            const userOrderKey = `orderHistory_${userID}`;
            const userOrders = JSON.parse(localStorage.getItem(userOrderKey)) || [];

            
            const matchedOrder = userOrders.find(o =>
                o.date === allOrders[index].date &&
                o.customer.phone === allOrders[index].customer.phone
            );

            if (matchedOrder) {
                matchedOrder.status = newStatus;
                localStorage.setItem(userOrderKey, JSON.stringify(userOrders));
            }

            alert(`Cập nhật trạng thái đơn hàng #${+index + 1} thành "${newStatus}"`);
            location.reload();
        });
    });

}
