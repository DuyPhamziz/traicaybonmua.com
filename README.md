# traicaybonmua.com

TỔNG QUAN
- Có sử dụng giao diện bootstrap 5. Đảm bảo thích ứng trên điện thoại, Ipad, Laptop.
- Thư viện sử dụng: fontawesome, Jquery, chart.js, cryptoJS, axiosjs. -> Nằm ở thư mục Vendor

- Tên miền: traicaybonmua.com

- Các trang được chuyển hướng theo đối tượng người dùng (user) và admin. Trang hiển thị mặc định là /index.html, ở trang này người dùng có thể chuyển qua các trang khác như một "Khách ghé thăm shop". Và để mua hàng buộc người dùng phải đăng ký 01 tài khoản và dùng nó để đăng nhập.

- Thư mục người dùng /user sẽ có thêm những trang mới như giohang.html, thanhtoan.html, lichsu.html

GIỚI THIỆU CÁC TRANG
- Trang chủ dùng để chào hàng.
- Trang giới thiệu đôi nét về Shop.
- Trang sản phẩm người dùng có thể xem nhưng chưa thể mua.
- Trang liên hệ khách hàng chưa đăng nhập vẫn có thể gửi tin nhắn cho shop.
- Trang đăng ký dùng form có ràng buộc, thông tin người dùng được đưa lên local với key là users. Riêng mật khẩu người dùng trước khi đưa lên local sẽ được "băm" bằng thuật toán SHA-256 để bảo mật thông tin khách hàng.
- Trang đăng nhập, người dùng đăng nhập bằng tài khoản và mật khẩu đã đăng ký.
MUA HÀNG CỦA USER
- Khi người dùng đăng nhập thành công, người dùng có thể thêm sản phẩm vào giỏ hàng trước khi thanh toán.
- Sau khi thanh toán, lịch sử mua hàng của người dùng sẽ được hiện ở trang lichsu.html. Ở mỗi đơn sẽ hiện kèm trạng thái và khi ở trạng thái "đang giao" người dùng có thể hoàn tất đơn bằng cách nhấn "đã nhận được hàng".