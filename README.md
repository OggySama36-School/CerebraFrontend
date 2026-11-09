# Cerebra – Frontend

Giao diện web của **Cerebra**, đồ án môn Học máy: đánh giá nguy cơ đột quỵ từ thông tin sức khỏe của bệnh nhân. Người dùng nhập thông tin qua 3 bước, giao diện gửi tới backend và hiển thị tỉ lệ ước lượng cùng mức nguy cơ.

> Kết quả từ mô hình học máy chỉ mang tính tham khảo, không thay thế chẩn đoán y tế.

## Công nghệ

- React + Vite
- Axios (gọi API)
- lucide-react (icon)
- CSS thuần, hỗ trợ giao diện sáng/tối và responsive cho điện thoại

## Cấu trúc thư mục

```
DoAnFrontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.jsx        # Logo và thanh các bước
│   │   ├── PatientForm.jsx   # Form nhập 3 bước
│   │   └── ResultCard.jsx    # Màn kết quả (vòng cung, mức nguy cơ, yếu tố)
│   ├── services/
│   │   ├── api.js            # Cấu hình axios (địa chỉ backend)
│   │   └── useService.js     # Hàm predictStroke gọi POST /predict
│   ├── App.css               # Giao diện chính
│   ├── App.jsx               # Quản lý bước, kết quả, lỗi
│   ├── index.css             # Biến màu, nền, cỡ chữ
│   ├── main.jsx              # Điểm vào của ứng dụng
│   └── responsive.css        # Quy tắc cho tablet và điện thoại
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## Luồng sử dụng

1. **Bước 1 – Thông tin cơ bản:** giới tính, tuổi.
2. **Bước 2 – Chỉ số sức khỏe:** cao huyết áp, bệnh tim, đường huyết, BMI.
3. **Bước 3 – Lối sống và hoàn cảnh:** hút thuốc, công việc, hôn nhân, nơi sống.
4. **Kết quả:** vòng cung hiển thị tỉ lệ ước lượng, nhãn mức nguy cơ (thấp, trung bình, cao, rất cao), lời khuyên, các yếu tố ảnh hưởng và cảnh báo khi tuổi vượt dữ liệu huấn luyện (trên 82).

Từ màn kết quả có thể bấm **Chỉnh sửa** (giữ nguyên dữ liệu đã nhập) hoặc **Nhập bệnh nhân mới**.

## Yêu cầu

- Node.js 18 trở lên
- Backend (Go) và dịch vụ dự đoán (Python) đang chạy, xem các repo liên quan bên dưới

## Cài đặt và chạy

```bash
npm install
npm run dev
```

Mở địa chỉ Vite in ra (mặc định `http://localhost:5173`).

Build bản production:

```bash
npm run build
npm run preview
```

## Cấu hình địa chỉ backend

Địa chỉ backend đang đặt trong `src/services/api.js`:

```js
const API_BASE_URL = 'http://localhost:8080/api/v1';
```

Khi deploy, đổi địa chỉ này sang địa chỉ backend thật (nên dùng https). Backend cũng phải thêm địa chỉ của frontend vào `ALLOWED_ORIGINS`, nếu không trình duyệt sẽ chặn request (lỗi CORS).

## Các repo liên quan

| Phần | Repo | Cổng mặc định |
|---|---|---|
| Frontend (React) | `<link-repo-frontend>` | 5173 |
| Backend Go (Gin) | `<link-repo-backend>` | 8080 |
| Huấn luyện và API Python | `<link-repo-train>` | 8000 |

Thứ tự bật khi chạy trên máy: Python, rồi Go, rồi frontend.

## Tác giả

- `Nhóm 12 - Trưởng nhóm: Nguyễn Minh Tiến - 2001240494`
- Môn: `Học máy` – Giảng viên: `TS.Phùng Thế Bảo`
