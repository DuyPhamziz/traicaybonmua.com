 
const ITEMS_PER_PAGE = 8;
let currentPage = 1;
let currentFilter = "all";
let searchKeyword = "";
let sortOrder = "default";
let priceRange = "all";

function parsePrice(giaString) {
    if (typeof giaString !== 'string') {
        console.error("Giá không phải là chuỗi hợp lệ:", giaString);
        return 0;
    }

   
    const cleaned = giaString.replace(/[^\d]/g, "");

    return parseInt(cleaned, 10);
}


let product_fruit = JSON.parse(localStorage.getItem("product_fruit")) || [];

function getFilteredProducts() {
    return product_fruit.filter(item => {
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



function renderProducts(page = 1) {
    currentPage = page;
    const products = getFilteredProducts();
    const start = (page - 1) * ITEMS_PER_PAGE;
    const paginated = products.slice(start, start + ITEMS_PER_PAGE);

    const container = document.getElementById("product-content");
    container.innerHTML = "";

    paginated.forEach((i, index) => {
        const col = document.createElement("div");
        col.className = "col-md-3 mb-4";
        let percentGiam = 0;
        const realIndex = product_fruit.findIndex(p => p.tensp === i.tensp);
        const giaGoc = parsePrice(i.giagoc);
        const giaGiam = parsePrice(i.giadagiam);
        if (giaGoc > giaGiam) {
            percentGiam = Math.round((1 - giaGiam / giaGoc) * 100);
        }
        col.className = "col-6 col-sm-6 col-md-4 col-lg-3 px-2 mb-4";
        const isUserPage = window.location.pathname.includes('/user/');
        col.innerHTML = `
            <div class="card h-100">
                <img src="${i.hinh}" class="card-img-top img-fluid" alt="${i.tensp}">
                <div class="card-body">
                    <div class="title-wrapper"><h5 class="card-title">${i.tensp}</h5></div>
                    ${percentGiam > 0 ? `<strong class="text-danger">Đã giảm: ${percentGiam}%</strong><br>` : '<strong class="text-danger">.</strong>'}
                    <p class="card-text text-muted text-decoration-line-through">${giaGoc.toLocaleString()} VNĐ</p>
                    <p class="card-text text-danger fw-bold">${giaGiam.toLocaleString()} VNĐ</p>
                    <button onclick="${isUserPage ? `addToCart(${realIndex})` : 'showOverlayRequest()'}" class="btn btn-success w-100">Thêm vào giỏ</button>
                </div>
            </div>
        `;
        container.appendChild(col);
    });

    renderPagination(products.length);
}


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


document.querySelectorAll('[data-filter]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

      
        document.querySelectorAll('[data-filter]').forEach(i => i.classList.remove("active"));

       
        this.classList.add("active");

    
        currentFilter = this.getAttribute("data-filter");
        renderProducts(1);
    });
});



document.getElementById("search-input").addEventListener("input", function () {
    searchKeyword = this.value.trim();
    renderProducts(1);
});

document.querySelectorAll('#price-filter, #price-filter-mobile').forEach(select => {
    select.addEventListener("change", function () {
        const value = this.value;

        if (value.startsWith("price_")) {
            priceRange = value.split("_")[1]; 
        } else if (value.startsWith("sort_")) {
            sortOrder = value.split("_")[1]; 
        }

        renderProducts(1);
    });
});

renderProducts();





