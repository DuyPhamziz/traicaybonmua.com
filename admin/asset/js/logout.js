
document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userNavItem = document.getElementById("userNavItem");

    if (currentUser && userNavItem) {
        userNavItem.innerHTML = `
                <div class="nav-item dropdown w-100">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarUserDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Chào, ${currentUser.userFullName} <i class="fa-solid fa-user"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarUserDropdown">
                    <li><a class="dropdown-item" href="/user/lichsu.html">Lịch sử mua hàng</a></li>
                        <li><a class="dropdown-item" href="#" id="logoutBtn">Đăng xuất</a></li>
                    </ul>
                </div>
            `;

       
        document.getElementById("logoutBtn").addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.removeItem("currentUser");
            window.location.href = "/index.html";
        });
    }
});
