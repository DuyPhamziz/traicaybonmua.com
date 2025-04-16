document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userNavItem = document.getElementById("userNavItem");
    const userNavLinks = document.querySelectorAll(".userNavLink"); 
    const userMenuMobile = document.querySelector(".userMenuMobile");
    const userNameMobile = document.querySelector(".userNameMobile");

    
    if (currentUser) {
       
        if (userNavItem) {
            userNavItem.innerHTML = `
                <div class="nav-item dropdown w-100">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarUserDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Chào, ${currentUser.userFullName} <i class="fa-solid fa-user"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarUserDropdown">
                        <li><a class="dropdown-item" href="/user/lichsu.html">Lịch sử mua hàng</a></li>
                        <li><a class="dropdown-item logoutBtn" href="#">Đăng xuất</a></li>
                    </ul>
                </div>
            `;
        }

        
        userNavLinks.forEach(link => link.style.display = "none");

       
        if (userMenuMobile) {
            userMenuMobile.classList.remove("d-none");
        }

       
        if (userNameMobile) {
            userNameMobile.textContent = currentUser.userFullName;
        }
    }

    
    document.querySelectorAll(".logoutBtn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
                localStorage.removeItem("currentUser");
                window.location.href = "/index.html";
            }
        });
    });
});
