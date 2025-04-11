
const menuLinks = document.querySelectorAll('.nav-link[data-target]');
const contentArea = document.querySelector('.content_admin');

const contentData = {
    sanpham: `<h2>Quản lý sản phẩm</h2>
    <p>Thông tin về sản phẩm sẽ được hiển thị tại đây.</p>
    <form id="product-form" class="row g-3">
    <input type="hidden" id="product-index">
    <div class="col-md-4">
      <input type="text" class="form-control" id="tensp" placeholder="Tên sản phẩm" required>
    </div>
    <div class="col-md-4">
      <input type="file" class="form-control" id="hinh" placeholder="Link hình ảnh" required>
    </div>
    <div class="col-md-4">
      <input type="text" class="form-control" id="giachuagiam" placeholder="Giá chưa giảm" required>
    </div>
    <div class="col-md-4">
      <input type="text" class="form-control" id="giadagiam" placeholder="Giá đã giảm" required>
    </div>
    <div class="col-md-4">
     <select name="danhmuc1" id="danhmuc1" required>
                            <option disabled selected>Danh mục 1</option>
                            <option value="tcvietnam">Trái cây Việt Nam</option>
                            <option value="tcnhapkhau">Trái cây Nhập khẩu</option>

                            <option value="combo">Combo Trái cây</option>
                            <option value="gioqua">Giỏ quà Trái cây</option>
                        </select>
                        <select name="danhmuc2" id="danhmuc2">
                         <option disabled selected>Danh mục 2</option>
                            <option value="hot">Trái cây Hot</option>
                            <option value="muaxuan">Trái cây Mùa xuân</option>
                            <option value="muaha">Trái cây Mùa hạ</option>
                            <option value="muathu">Trái cây Mùa thu</option>
                            <option value="muadong">Trái cây Mùa đông</option>
                        </select>
    </div>
    <div class="col-md-4">
      <button type="submit" class="btn btn-primary w-100">Lưu sản phẩm</button>
    </div>
  </form>

  <hr>
  <div id="product-list" class="row mt-3"></div>`,
    tuvan: `<h2>Tư vấn khách hàng</h2><p>Danh sách câu hỏi, phản hồi từ khách hàng.</p>`,
    doanhthu: `<h2>Báo cáo doanh thu</h2><p>Biểu đồ và bảng thống kê doanh số.</p>`,
    donhang: `<h2>Danh sách đơn hàng</h2><p>Chi tiết các đơn hàng đã đặt.</p>`,
    giamgia: `<h2>Quản lý mã giảm giá</h2><p>Danh sách mã khuyến mãi đang áp dụng.</p>`,
    hoso: `<h2>Thông tin Admin</h2><p>Thông tin Hoạt động của Admin</p>`
};

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-target');
        const htmlContent = contentData[target] || "<p>Không có dữ liệu.</p>";

        contentArea.innerHTML = htmlContent;

        // Xử lý class active để làm nổi bật mục đang chọn
        menuLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        if (target === 'sanpham') {

            setTimeout(() => {
                initProductForm(); // Gọi sau 1 chu kỳ render
            }, 0);
        }
    });
});
const hoSoLink = document.querySelector('.dropdown-item[data-target="hoso"]');
if (hoSoLink) {
    hoSoLink.addEventListener('click', function (e) {
        e.preventDefault();
        const htmlContent = contentData["hoso"] || "<p>Không có dữ liệu.</p>";
        contentArea.innerHTML = htmlContent;

        // Bỏ class active bên sidebar (nếu có)
        menuLinks.forEach(l => l.classList.remove('active'));
    });
}

// them sua xoa
function renderProductList() {
    const listContainer = document.getElementById("product-list");
    if (!listContainer) return;

    const products = JSON.parse(localStorage.getItem("products") || "[]");

    listContainer.innerHTML = products.map((p, index) => `
        <div class="col-md-4 mb-3">
            <div class="card">
                <img src="${p.hinh}" class="card-img-top" alt="${p.tensp}">
                <div class="card-body">
                    <h5 class="card-title">${p.tensp}</h5>
                    <p class="card-text">
                        Giá chưa giảm: ${p.giachuagiam}<br>
                        Giá đã giảm: ${p.giadagiam}<br>
                        Danh mục:  ${Array.isArray(p.danhmuc)
            ? p.danhmuc.join(', ')
            : (p.danhmuc || '')
        }
                    </p>
                    <button class="btn btn-warning btn-sm me-2" onclick="editProduct(${index})">Sửa</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Xóa</button>
                </div>
            </div>
        </div>
    `).join('');
}function initProductForm() {
    const form = document.getElementById("product-form");
    const listContainer = document.getElementById("product-list");

    if (!form || !listContainer) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const index = document.getElementById("product-index").value;
        const file = document.getElementById("hinh").files[0];
        let products = JSON.parse(localStorage.getItem("products") || "[]");

        const updateProduct = (hinhData) => {
            const product = {
                tensp: document.getElementById("tensp").value,
                hinh: hinhData,
                giachuagiam: document.getElementById("giachuagiam").value,
                giadagiam: document.getElementById("giadagiam").value,
                danhmuc: [
                    document.getElementById("danhmuc1").value,
                    document.getElementById("danhmuc2").value
                ].filter(Boolean)
            };

            if (index === "") {
                // Thêm mới
                products.push(product);
            } else {
                // Sửa
                products[parseInt(index)] = product;
            }

            localStorage.setItem("products", JSON.stringify(products));
            renderProductList();
            form.reset();
            document.getElementById("product-index").value = "";
        };

        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                updateProduct(reader.result); // ảnh mới (base64)
            };
            reader.readAsDataURL(file);
        } else {
            // Nếu không chọn ảnh mới
            if (index === "") {
                alert("Vui lòng chọn hình ảnh!");
                return;
            } else {
                updateProduct(products[parseInt(index)].hinh); // giữ ảnh cũ
            }
        }
    });

    renderProductList();
}


function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem("products") || "[]");
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProductList();
}

function editProduct(index) {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const p = products[index];

    document.getElementById("tensp").value = p.tensp;
    document.getElementById("giachuagiam").value = p.giachuagiam;
    document.getElementById("giadagiam").value = p.giadagiam;
    document.getElementById("danhmuc1").value = p.danhmuc?.[0] || "";
    document.getElementById("danhmuc2").value = p.danhmuc?.[1] || "";
    document.getElementById("product-index").value = index;
}

