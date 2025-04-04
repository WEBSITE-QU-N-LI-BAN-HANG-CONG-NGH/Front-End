Link drive dự phòng: https://drive.google.com/file/d/18W9qMC4_BFsN4SQVI6I90Xe4f086DW0E/view?usp=drivesdk
(hình như k có cái nút cho chatbot)
# CUSTOMER
- Header+Footer: Header đã ổn định, nhưng chưa có chức năng 🥲(cái dropdown menu where?). Thay đổi Footer để thêm link 
- Homepage: Trang chủ (đã fix kha khá lại cho đều, nma chưa chắc đẹp 🥲)
- Catalog: Đã fix độ rối, phân chia lại List và Grid)
- Contact/Khiếu nại: Form điền, có cái thanh chat bên cạnh (chưa hoạt động be)
- FAQ: bình thường
- Đánh giá: nút gửi đánh giá sẽ chuyển sang giao diện hoàn tất 🥳
- Giỏ hàng + checkout: umm.. không biết nói sao, tự xem và đánh giá i.
- User: yé
  
- Giao diện t vẽ hơi khác xíu, và có mấy chỗ chưa đồng bộ màu lắm. Cần sửa chữa, Xin vui lòng góp ý thẳng mặt, không góp ý sau lưng, xin cảm ơn 👁️👄👁️. Thời gian có hạn 💅

# ADMIN
- Đã update dashboard + account management (lmao lắm. không giống trong hình 🥲, (khó vẽ vỗn lài)
- Cái account chắc ổn, còn cái dashboard thì mấy cái chart chưa có vẽ (khó vẽ vỗn lài x2) chỉ có mấy cái SVG placeholder thôi.
- Đã thêm cái Revenue Analysis (for those who IELTS 10.0: Phân tích doanh thu)
- Chưa làm: ~ 3-4 page j đó, đang bệnh, từ từ i

  (Vẽ hơi 6677)


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
