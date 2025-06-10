# 🚀 Getting Started

Chào mừng bạn đến với dự án! Tài liệu này sẽ hướng dẫn bạn cách thiết lập môi trường, cài đặt, và chạy ứng dụng ExpressJS + TypeScript một cách chuẩn chỉnh.

---

## 📦 Yêu cầu hệ thống

- **Node.js**: phiên bản `20.x`

  > 📌 Sử dụng [nvm](https://github.com/nvm-sh/nvm) để đảm bảo đồng bộ version trong team. Nếu đã cài `nvm`, chỉ cần chạy:
  >
  > ```bash
  > nvm install
  > nvm use
  > ```

- **npm**: đi kèm với Node.js

---

## 📁 Cấu trúc thư mục

```bash
.
├── src/                # Mã nguồn chính
│   └── index.ts        # Điểm vào chính của ứng dụng
├── dist/               # Thư mục build output
├── docs/               # Tài liệu nội bộ
├── .env.example        # Mẫu biến môi trường
├── tsconfig.json       # Cấu hình TypeScript
├── tsup.config.ts      # Cấu hình build với tsup
├── .eslintrc.cjs       # Cấu hình ESLint
├── .prettierrc         # Cấu hình Prettier
└── package.json
```
