const menuLinks = document.querySelectorAll('.nav-link[data-target]');
const contentArea = document.querySelector('.content_admin');
let product_fruit = JSON.parse(localStorage.getItem("product_fruit") || "[]");
const contentData = {
    sanpham: `<h2><i class="fa-sharp fa-solid fa-tomato"></i> Quản lý sản phẩm</h2>
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
      <input type="text" class="form-control" id="giagoc" placeholder="Giá chưa giảm" required>
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
        
        <!-- Tìm kiếm và bộ lọc -->
        <div id="filter-section">
            <input type="text" id="search-input" class="form-control mb-3" placeholder="Tìm sản phẩm..." />
            <select id="filter-category" class="form-control mb-3">
                <option value="">Chọn danh mục</option>
                <option value="tcvietnam">Trái cây Việt Nam</option>
                <option value="tcnhapkhau">Trái cây Nhập khẩu</option>
                <option value="combo">Combo Trái cây</option>
                <option value="gioqua">Giỏ quà Trái cây</option>
            </select>
        </div>

        <div id="product-list" class="row mt-3"></div>
        
        <nav aria-label="Page navigation" class="mt-3">
            <ul class="pagination" id="pagination-products"></ul>
        </nav>`,
    tuvan: `<h2><i class="fa-regular fa-comment-medical"></i> Tư vấn khách hàng</h2>
            <p>Danh sách câu hỏi, phản hồi từ khách hàng.</p>
            <div id="contact-messages-list"></div>`,
    doanhthu: `
           <h2 class="mb-4"> <i class="fa-solid fa-money-bill-trend-up"></i> Báo cáo doanh thu</h2>

  <div class="row mb-4">
    <div class="col-md-4">
      <label for="filter-date" class="form-label">Lọc theo ngày:</label>
      <input type="date" id="filter-date" class="form-control">
    </div>
    <div class="col-md-4">
      <label for="filter-month" class="form-label">Lọc theo tháng:</label>
      <input type="month" id="filter-month" class="form-control">
    </div>
    <div class="col-md-4 d-flex align-items-end">
      <button class="btn btn-primary w-100" onclick="renderRevenueReport()">Lọc</button>
    </div>
  </div>

  <canvas id="revenueChart" height="100"></canvas>

  <table class="table table-bordered table-striped mt-4">
    <thead class="table-dark">
      <tr>
        <th>Ngày</th>
        <th>Số đơn hàng</th>
        <th>Tổng doanh thu</th>
      </tr>
    </thead>
    <tbody id="revenueTableBody"></tbody>
  </table>
          `,
    donhang: `<h2><i class="fa-solid fa-dollar-sign"></i> Danh sách đơn hàng</h2><p>Chi tiết các đơn hàng đã đặt.</p><div id="all-orders-list" class="container mt-4"></div>`,
    giamgia: `<h2>Quản lý mã giảm giá</h2>
<p>Danh sách mã khuyến mãi đang áp dụng.</p>

<h4>Thiết lập giảm giá</h4>
<!-- Tìm kiếm và bộ lọc -->
<div id="filter-section">
    <input type="text" id="search-input" class="form-control mb-3" placeholder="Tìm sản phẩm..." />
    <select id="filter-category" class="form-control mb-3">
        <option value="">Chọn danh mục</option>
        <option value="tcvietnam">Trái cây Việt Nam</option>
        <option value="tcnhapkhau">Trái cây Nhập khẩu</option>
        <option value="combo">Combo Trái cây</option>
        <option value="gioqua">Giỏ quà Trái cây</option>
    </select>
</div>

<div id="giamgia-section" class="mt-3"> 
    <nav aria-label="Page navigation" class="mt-3">
        <ul class="pagination" id="pagination"></ul>
    </nav>

    <div class="container mt-4">
        <div class="row">
            <div class="col-md-12">
                <div class="alert alert-info">
                    <strong>Gợi ý:</strong> Nhấn vào sản phẩm để áp dụng hoặc hủy giảm giá.
                </div>
                <div id="danhsach-sanpham" class="row row-cols-1 row-cols-md-3 g-4 mt-2 product_list"></div>
            </div>
        </div>
    </div>
</div>

  `,
    hoso: renderAdminLogs()
};

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-target');
        const htmlContent = contentData[target] || "<p>Không có dữ liệu.</p>";

        contentArea.innerHTML = htmlContent;


        setTimeout(() => {
            if (target === 'tuvan') {
                renderContactMessages();
            } else if (target === 'donhang') {
                loadAllOrders();
            } else if (target === 'doanhthu') {
                renderRevenueReport();
            }
        }, 100);

      
        menuLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        if (target === 'sanpham') {
            setTimeout(() => {
                initProductForm();
            }, 100);
        } else if (target === 'giamgia') {
            setTimeout(() => {
                renderSaleProductList();
            }, 500);
        }
    });
});
const hoSoLink = document.querySelector('.dropdown-item[data-target="hoso"]');
if (hoSoLink) {
    hoSoLink.addEventListener('click', function (e) {
        e.preventDefault();
        contentData["hoso"] = renderAdminLogs();
        const htmlContent = contentData["hoso"] || "<p>Không có dữ liệu.</p>";
        contentArea.innerHTML = htmlContent;

       
        menuLinks.forEach(l => l.classList.remove('active'));
    });
}



let currentPage = 1;
let productsPerPage = 6;

function renderProductList() {
    product_fruit = JSON.parse(localStorage.getItem("product_fruit") || "[]");

    const listContainer = document.getElementById("product-list");
    const searchInput = document.getElementById("search-input");
    const filterCategory = document.getElementById("filter-category");

    if (!listContainer) return;

    let products = product_fruit;

   
    let searchTerm = searchInput.value.toLowerCase();
    let filteredProducts = products.filter(p => p.tensp.toLowerCase().includes(searchTerm));

    
    let selectedCategory = filterCategory.value;
    if (selectedCategory) {
        filteredProducts = filteredProducts.filter(p =>
            p.danhmuc.includes(selectedCategory)
        );
    }

   
    filteredProducts = filteredProducts.map(p => {
        const realIndex = product_fruit.findIndex(prod =>
            prod.tensp === p.tensp &&
            prod.giagoc === p.giagoc &&
            prod.giadagiam === p.giadagiam &&
            JSON.stringify(prod.danhmuc) === JSON.stringify(p.danhmuc)
        );
        return { ...p, realIndex };
    });

   
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (currentPage > totalPages) currentPage = totalPages || 1;
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  
    listContainer.innerHTML = paginatedProducts.map((p) => `
         <div class="col-md-4 mb-3">
             <div class="card">
                 <img src="${p.hinh}" class="card-img-top" alt="${p.tensp}">
                 <div class="card-body">
                     <h5 class="card-title">${p.tensp}</h5>
                     <p class="card-text">
                         Giá gốc: ${p.giagoc}<br>
                         Giá đã giảm: ${p.giadagiam}<br>
                         Danh mục: ${p.danhmuc.join(', ')}
                     </p>
                     <button class="btn btn-warning btn-sm me-2" onclick="editProduct(${p.realIndex})">Sửa</button>
                     <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.realIndex})">Xóa</button>
                 </div>
             </div>
         </div>
     `).join('');

    
    renderPaginationProduct(totalPages);

}

function renderPaginationProduct(totalPages) {
    const paginationContainer = document.getElementById("pagination-products");
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            renderProductList();
        });


        paginationContainer.appendChild(pageItem);
    }
}


function initProductForm() {
    const form = document.getElementById("product-form");
    const listContainer = document.getElementById("product-list");

    if (!form || !listContainer) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const index = document.getElementById("product-index").value;
        const file = document.getElementById("hinh").files[0];


        const updateProduct = (hinhData) => {
            const product = {
                tensp: document.getElementById("tensp").value,
                hinh: hinhData,
                giagoc: document.getElementById("giagoc").value,
                giadagiam: document.getElementById("giadagiam").value,
                danhmuc: [
                    document.getElementById("danhmuc1").value,
                    document.getElementById("danhmuc2").value
                ].filter(Boolean)
            };

            if (index === "") {
              
                product_fruit.push(product);
                logAdminAction(`Đã thêm sản phẩm "${product.tensp}".`);
            } else {
             
                const old = product_fruit[parseInt(index)];
                product.giamgia = old.giamgia || null; 

                product_fruit[parseInt(index)] = product;
                logAdminAction(`Đã chỉnh sửa sản phẩm "${product.tensp}".`);
            }


            saveProductData();
            renderProductList();
            form.reset();
            document.getElementById("product-index").value = "";
        };

        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                updateProduct(reader.result); 
            };
            reader.readAsDataURL(file);
        } else {
            
            if (index === "") {
                alert("Vui lòng chọn hình ảnh!");
                return;
            } else {
                updateProduct(product_fruit[parseInt(index)].hinh);
            }
        }
    });

    
    document.getElementById("search-input").addEventListener('input', () => {
        currentPage = 1;
        renderProductList();
    });
    document.getElementById("filter-category").addEventListener('change', () => {
        currentPage = 1;
        renderProductList();
    });

    renderProductList();

}

function saveProductData() {
    localStorage.setItem("product_fruit", JSON.stringify(product_fruit));
}
function deleteProduct(index) {
    const deleted = product_fruit[index];
    product_fruit.splice(index, 1);
    saveProductData();

   
    const totalPages = Math.ceil(product_fruit.length / productsPerPage);
    if (currentPage > totalPages) currentPage = totalPages || 1;

    renderProductList();
    logAdminAction(`Đã xóa sản phẩm "${deleted.tensp}".`);
}

function editProduct(index) {
    const p = product_fruit[index];

    document.getElementById("tensp").value = p.tensp;
    document.getElementById("giagoc").value = p.giagoc;
    document.getElementById("giadagiam").value = p.giadagiam;
    document.getElementById("danhmuc1").value = p.danhmuc?.[0] || "";
    document.getElementById("danhmuc2").value = p.danhmuc?.[1] || "";
    document.getElementById("product-index").value = index;
}
