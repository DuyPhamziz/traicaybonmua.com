
// output  
const ITEMS_PER_PAGE = 8;
let currentPage = 1;
let currentFilter = "all";
let searchKeyword = "";
let sortOrder = "default";
let priceRange = "all";

// 👉 Chuyển giá thành số
function parsePrice(giaString) {
    return parseInt(giaString.replace(/[^\d]/g, ""));
}

// 👉 Lọc sản phẩm theo bộ lọc
function getFilteredProducts() {
    return product_fruit.data.filter(item => {
        const categories = Array.isArray(item.danhmuc) ? item.danhmuc : [item.danhmuc];
        const matchCategory = (currentFilter === "all") || categories.includes(currentFilter);
        const matchKeyword = item.tensp.toLowerCase().includes(searchKeyword.toLowerCase());
        const gia = parsePrice(item.giadagiam);

        let matchPrice = true;
        if (priceRange !== "all") {
            const [min, max] = priceRange.split("-").map(Number);
            matchPrice = gia >= min && gia <= max;
        }

        return matchCategory && matchKeyword && matchPrice;
    }).sort((a, b) => {
        if (sortOrder === "asc") return parsePrice(a.giadagiam) - parsePrice(b.giadagiam);
        if (sortOrder === "desc") return parsePrice(b.giadagiam) - parsePrice(a.giadagiam);
        return 0;
    });
}

// 👉 Vẽ sản phẩm theo trang
function renderProducts(page = 1) {
    currentPage = page;
    const products = getFilteredProducts();
    const start = (page - 1) * ITEMS_PER_PAGE;
    const paginated = products.slice(start, start + ITEMS_PER_PAGE);

    const container = document.getElementById("product-content");
    container.innerHTML = "";

    paginated.forEach(i => {
        const col = document.createElement("div");
        col.className = "col-md-3 mb-4";

        col.innerHTML = `
            <div class="card h-100">
                <img src="${i.hinh}" class="card-img-top" alt="${i.tensp}">
                <div class="card-body">
                    <h5 class="card-title">${i.tensp}</h5>
                    <p class="card-text text-muted text-decoration-line-through">${i.giachuagiam}</p>
                    <p class="card-text text-danger fw-bold">${i.giadagiam}</p>
                    <a href="#" class="btn btn-primary w-100">Mua ngay</a>
                </div>
            </div>
        `;
        container.appendChild(col);
    });

    renderPagination(products.length);
}

// 👉 Vẽ phân trang
function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    let html = `<nav><ul class="pagination justify-content-center">`;

    if (currentPage > 1) {
        html += `<li class="page-item"><a class="page-link" href="#" onclick="renderProducts(${currentPage - 1})">&laquo;</a></li>`;
    }

    for (let i = 1; i <= totalPages; i++) {
        html += `<li class="page-item ${i === currentPage ? 'active' : ''}">
            <a class="page-link" href="#" onclick="renderProducts(${i})">${i}</a>
        </li>`;
    }

    if (currentPage < totalPages) {
        html += `<li class="page-item"><a class="page-link" href="#" onclick="renderProducts(${currentPage + 1})">&raquo;</a></li>`;
    }

    html += `</ul></nav>`;
    pagination.innerHTML = html;
}

// 👉 Xử lý sự kiện chọn danh mục
document.querySelectorAll("#sidebar-filter .nav-link").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelectorAll("#sidebar-filter .nav-link").forEach(i => i.classList.remove("active"));
        this.classList.add("active");
        currentFilter = this.getAttribute("data-filter");
        renderProducts(1);
    });
});

// 👉 Tìm kiếm
document.getElementById("search-input").addEventListener("input", function () {
    searchKeyword = this.value.trim();
    renderProducts(1);
});

// 👉 Lọc giá + sắp xếp
document.getElementById("price-filter").addEventListener("change", function () {
    const value = this.value;

    if (value.startsWith("price_")) {
        priceRange = value.split("_")[1];
    } else if (value.startsWith("sort_")) {
        sortOrder = value.split("_")[1];
    }

    renderProducts(1);
});

// 👉 Khởi động ban đầu
renderProducts();
