<div align="center">

# 🎬 Cinematica

**پلتفرم مرور و کشف بهترین فیلم‌های تاریخ سینما**

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-orange?style=for-the-badge)

</div>

---

## ✨ ویژگی‌ها

- 🎞 **نمایش ۲۵۰ فیلم برتر** بر اساس امتیاز IMDb
- 🔍 **جستجو** بر اساس نام فیلم با مدیریت state از طریق URL
- 🎭 **فیلتر بر اساس ژانر** با دریافت داینامیک از API
- 📄 **صفحه جزئیات فیلم** با گالری تصاویر و اطلاعات کامل
- 📱 **صفحه‌بندی** با پشتیبانی از URL state
- 🌙 **تم تاریک / روشن** با ذخیره‌سازی در localStorage
- 🔐 **سیستم احراز هویت** (ثبت نام و ورود)
- 👤 **صفحه پروفایل کاربر**
- 🌐 **RTL و فارسی‌سازی کامل** با فونت Vazirmatn
- 🎨 **دیزاین سینمایی** با تم تاریک و رنگ طلایی

---

## 🛠 تکنولوژی‌ها

| دسته | تکنولوژی |
|------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Variables |
| State Management | Zustand (با persist) |
| Form Handling | React Hook Form |
| Font | Vazirmatn (RTL) + Bebas Neue |
| API | moviesapi.ir |
| Deployment | Vercel |

---

## 📁 ساختار پروژه

```
cinematica/
├── app/
│   ├── api/
│   │   ├── login/route.ts       # پروکسی لاگین (رفع CORS)
│   │   └── user/route.ts        # پروکسی پروفایل (رفع CORS)
│   ├── components/
│   │   ├── Header.tsx           # هدر استیکی با فیلتر ژانر و سرچ
│   │   ├── Footer.tsx           # فوتر
│   │   ├── MovieCard.tsx        # کارت فیلم با hover effect
│   │   ├── Pagination.tsx       # کامپوننت صفحه‌بندی
│   │   ├── Modal.tsx            # مدال پورتال شده
│   │   ├── RegisterForm.tsx     # فرم ثبت نام
│   │   ├── LoginForm.tsx        # فرم ورود
│   │   └── ThemeToggle.tsx      # دکمه تغییر تم
│   ├── movie/[id]/
│   │   └── page.tsx             # صفحه جزئیات فیلم
│   ├── profile/
│   │   └── page.tsx             # صفحه پروفایل کاربر
│   ├── store/
│   │   ├── authStore.ts         # ذخیره توکن‌های احراز هویت
│   │   └── themeStore.ts        # ذخیره تم انتخابی
│   ├── globals.css              # استایل‌های سراسری + CSS Variables
│   ├── layout.tsx               # layout اصلی
│   └── page.tsx                 # صفحه اصلی
```

---

## 🚀 راه‌اندازی محلی

```bash
# کلون کردن پروژه
git clone https://github.com/YOUR_USERNAME/cinematica.git

# ورود به پوشه
cd cinematica

# نصب dependencies
npm install

# اجرا در حالت development
npm run dev
```

بعد از اجرا، مرورگر رو باز کن و برو به:
```
http://localhost:3000
```

---

## 🔑 API Endpoints

پروژه از [moviesapi.ir](https://moviesapi.ir) استفاده می‌کنه:

| Endpoint | توضیح |
|----------|-------|
| `GET /api/v1/movies?page={page}` | لیست فیلم‌ها |
| `GET /api/v1/movies?q={query}` | جستجوی فیلم |
| `GET /api/v1/movies/{id}` | جزئیات فیلم |
| `GET /api/v1/genres` | لیست ژانرها |
| `GET /api/v1/genres/{id}/movies` | فیلم‌های یک ژانر |
| `POST /api/v1/register` | ثبت نام |
| `POST /oauth/token` | ورود و دریافت توکن |
| `GET /api/user` | اطلاعات کاربر |

---

## 📸 اسکرین‌شات

> به زودی اضافه می‌شود

---

## 📄 لایسنس

این پروژه تحت لایسنس MIT منتشر شده.

---

<div align="center">
ساخته شده با ❤️ توسط امیرحسین
</div>
