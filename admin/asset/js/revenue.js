let revenueChart; // To store chart instance

function renderRevenueReport() {
    const allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];

    const filterDay = document.getElementById("filter-date").value;
    const filterMonth = document.getElementById("filter-month").value;

    const revenueByDate = {};

    allOrders.forEach(order => {
        const dateObj = new Date(order.date);
        const dayStr = dateObj.toISOString().split("T")[0];     // yyyy-mm-dd
        const monthStr = dayStr.slice(0, 7);                     // yyyy-mm

        // Áp dụng bộ lọc nếu có
        if (filterDay && dayStr !== filterDay) return;
        if (filterMonth && monthStr !== filterMonth) return;

        let total = 0;
        order.items.forEach(item => {
            const price = parseInt(item.giadagiam.replace(/\D/g, ""));
            total += price * item.soluong;
        });

        if (!revenueByDate[dayStr]) {
            revenueByDate[dayStr] = { count: 0, total: 0 };
        }

        revenueByDate[dayStr].count += 1;
        revenueByDate[dayStr].total += total;
    });

    // Cập nhật bảng
    const tbody = document.getElementById("revenueTableBody");
    tbody.innerHTML = "";

    const labels = [];
    const data = [];

    Object.keys(revenueByDate).sort().forEach(date => {
        const row = revenueByDate[date];
        labels.push(date);
        data.push(row.total);

        tbody.innerHTML += `
      <tr>
        <td>${date}</td>
        <td>${row.count}</td>
        <td>${row.total.toLocaleString("vi-VN")} VNĐ</td>
      </tr>
    `;
    });

    // Vẽ biểu đồ
    const ctx = document.getElementById("revenueChart").getContext("2d");
    if (revenueChart) revenueChart.destroy();

    revenueChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Doanh thu (VNĐ)",
                data: data,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return value.toLocaleString("vi-VN") + " VNĐ";
                        }
                    }
                }
            }
        }
    });
}
