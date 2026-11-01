# Tiệm Nhỏ

Bản chơi thử nhà hàng pixel art chạy trực tiếp trên trình duyệt, không cần cài thư viện.

## Chạy game

Mở PowerShell tại thư mục dự án rồi chạy:

```powershell
python -m http.server 8000
```

Mở [http://localhost:8000](http://localhost:8000) trong trình duyệt. Có thể mở `index.html` trực tiếp, nhưng máy chủ cục bộ giúp lưu tiến độ ổn định hơn.

## Điều khiển

- Ban đầu tiệm có một bàn. Nâng **Danh tiếng tiệm** để mở dần sáu chỗ ngồi; khách lần lượt chọn bàn đang mở.
- Nhấn **Mời khách**; mỗi lần tăng 25% tiến độ. Đủ 100% thì một khách mới tới: ngồi vào bàn trống, hoặc đứng chờ ở góc trên bên phải nếu hết bàn.
- Khách chờ đứng thành hàng ngang ở góc trên bên phải. Hàng chờ bắt đầu có 2 chỗ; nâng cấp riêng lần đầu giá 500 xu, mỗi cấp thêm 1 chỗ và giá tăng gấp đôi. Khi bàn trống, khách chờ lâu nhất được xếp vào trước khách mới.
- Khi bong bóng gọi món xuất hiện, có thể nhấn liên tiếp; nhân viên mang món theo thứ tự đã nhấn.
- Nhân viên đi tuần ngẫu nhiên trong khu vực trống, rồi cầm sprite món ăn tới bàn khi được gọi phục vụ.
- Khách ăn khoảng 1,6 giây, để lại tiền rồi rời tiệm. Tiền cộng dồn trong một bong bóng xu; nhấn để nhân viên chạy nhanh tới nhặt.
- Dùng xu nâng cấp tốc độ mời khách, danh tiếng hoặc sức chứa hàng chờ. Trong bếp có nâng cấp riêng cho số bếp, tốc độ nấu và tốc độ đầu bếp. Tiến độ được lưu trên trình duyệt.

## Các khu vực

- Sảnh chính là lối vào duy nhất của khách. Bản đồ thu nhỏ đặt sảnh ở giữa, vườn bên trái, bếp bên phải và tầng gác phía dưới. Chọn biểu tượng trên bản đồ để tới bất kỳ khu vực nào; nút mũi tên cạnh bản đồ chuyển nhanh riêng giữa sảnh và bếp.
- Ở **Vườn**, chọn hạt giống ở thanh biểu tượng rồi chạm luống để trồng; chọn bình tưới rồi chạm cây để rút ngắn thời gian lớn. Chạm cây đã chín để thu hoạch. Khách ghé vườn sẽ gọi mua rau hoặc hoa; chạm bong bóng món hàng để bán. Nâng cấp vườn mở thêm luống.
- **Tầng gác** có đàn piano, máy trò chơi và bàn giải trí. Chạm một món nội thất để bắt đầu trò chơi phản xạ; chạm các mục tiêu đang sáng để nhận xu và danh vọng. Khách đến tầng gác tự tham gia và trả xu khi rời đi.
- Mỗi lần mời khách bắt đầu tại sảnh và tạo một nhân vật có danh tính, sprite cùng lịch trình ngẫu nhiên gồm 1–3 hoạt động khác nhau. Khách có thể ăn ở sảnh, mua hoặc dạo vườn, rồi giải trí ở tầng gác theo thứ tự ngẫu nhiên. Khách ăn không có bàn sẽ xếp hàng ở sảnh; khách mua hàng xếp hàng riêng tại quầy vườn; khách chỉ tham quan sẽ đi dạo ngẫu nhiên.
- Lõi xử lý được chia thành các module trong `systems/`: nhân vật và lịch trình (`characters.js`, `journeys.js`), di chuyển (`movement.js`), khu vực và định tuyến (`areas.js`, `map-navigation.js`), tiền và nâng cấp (`economy.js`, `upgrades.js`), mua bán (`trade.js`) và mini game (`games.js`). Mỗi bản đồ tiếp tục có controller riêng trong `maps/`.

Ảnh nền và sprite nhân vật nằm trong thư mục dự án. Bàn và ghế là hai asset pixel art riêng trong `assets/`; khách ngồi ở ghế chính giữa phía trên bàn. Sprite nhân vật đã được cắt phần trong suốt thừa để hiển thị cân đối.

Xem [HANDOFF.md](./HANDOFF.md) để biết trạng thái chi tiết và cách tiếp tục dự án khi chuyển tài khoản hoặc môi trường.

## Tương thích điện thoại và hướng đóng gói app

- Giao diện dùng responsive CSS, vùng an toàn `viewport-fit=cover`, nút mời khách cố định ở cạnh dưới trên điện thoại và tài nguyên SVG cục bộ để giảm tải mạng.
- Game là web tĩnh HTML/CSS/JavaScript, không phụ thuộc framework hoặc server riêng. Có thể giữ gameplay/assets và bọc bằng Capacitor khi chuyển sang Android/iOS; khi mở rộng nên tách logic gameplay khỏi DOM/lưu trữ để dễ thay adapter nền tảng.
- Mở `assets/sprite-library/index.html` để xem 40 sprite món ăn/thức uống và 20 sprite vật dụng/bối cảnh (có cả đồ bếp).
- Trên máy tính, bản đồ khóa theo khung ngang và chiếm gần trọn màn hình; trên điện thoại cầm dọc, game tự đổi sang bản đồ toàn màn hình dọc với nền riêng cho sảnh và bếp.
- Danh vọng và tiền nằm ở góc trên trái bản đồ. Nút thực đơn nằm dưới trái; nút mời khách và nâng cấp nằm dưới phải.
- Menu mở thành panel nổi bên trái, nâng cấp mở thành panel nổi bên phải; cả hai không làm tối bản đồ và vẫn cho thao tác game phía sau.
- Biểu tượng bản đồ ở cạnh phải mở bảng chọn khu vực dạng thu nhỏ; có thể chạm biểu tượng khu vực để chuyển trực tiếp. Bản đồ bếp có nền riêng; các bếp nấu nằm đúng vị trí sáu bàn ăn.
- Game có 55 món; ban đầu chỉ mở món đầu. Mua lần lượt món kế tiếp bằng xu; giá mở khóa tăng theo cấp số nhân. Khách chỉ gọi các món đã mở.
- Cửa tự động ở giữa tường sau mở sang hai bên khi khách vào và tự đóng sau khi khách qua cửa.
- Nền ngang máy tính: `assets/background-concepts/restaurant-wide-v2.svg` và `kitchen-wide-v1.svg`. Nền dọc điện thoại: `restaurant-portrait.svg` và `kitchen-portrait.svg`.
- Nội thất sảnh và bếp mở lần lượt bằng nâng cấp riêng; mỗi món tăng 5% giá bán, chi phí nâng cấp tăng gấp đôi. Asset ở `assets/scene-props/`, mở `assets/scene-props/index.html` để xem thư viện. Vùng tường và nền gạch được đánh dấu khi cửa sổ nâng cấp đang mở.
- Xem toàn bộ sprite và các nền trong `assets/sprite-library/index.html`.
