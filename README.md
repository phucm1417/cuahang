# Tiệm Nhỏ

Game quản lý nhà hàng chạy trực tiếp trên trình duyệt bằng HTML, CSS và JavaScript thuần. Không cần cài thư viện hoặc biên dịch.

## Chạy game trên máy

Mở terminal trong thư mục dự án và chạy:

```powershell
python -m http.server 8000
```

Sau đó mở <http://localhost:8000>.

## Cách chơi

- Nhấn **Mời khách** để mời khách đến. Khách sẽ đi tới bàn trống hoặc xếp hàng nếu bàn đã kín.
- Nhấn bong bóng món ăn trên bàn để nhân viên sảnh nhận order.
- Đầu bếp nhận order, nấu món và đặt lên quầy bếp. Món chuyển sang quầy sảnh để nhân viên giao đến đúng bàn.
- Có thể nhấn giữ món trên quầy sảnh và kéo tới bàn đang gọi món. Thả lên mặt bàn để giao ngay; nếu hủy thao tác, nhân viên sẽ tiếp tục giao.
- Khách để lại xu sau khi ăn. Nhấn bong bóng xu ở bàn để nhân viên nhặt.
- Thực đơn, nâng cấp và bản đồ bếp mở bằng các nút trong game. Tiến độ được lưu trong trình duyệt.
- Bật hoặc tắt âm thanh bằng nút loa.

## Tài nguyên

- `assets/sprites/`: sprite nhân vật và các hướng di chuyển.
- `assets/background-concepts/`: nền nhà hàng và bếp.
- `assets/sprite-library/food/`: các món SVG dùng trong thực đơn.
- `restaurant-sprites/large/`: sprite món ăn trong game.
- `assets/animal-restaurant-*.svg`: bàn, ghế và bếp nấu.
- `assets/*-food-counter.svg`: quầy món ở bếp và sảnh.

Game có thể được phục vụ như website tĩnh; `index.html` nằm ở thư mục gốc để tương thích với GitHub Pages.
