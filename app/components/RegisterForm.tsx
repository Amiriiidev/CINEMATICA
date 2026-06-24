"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface RegisterInputs {
  name: string;
  email: string;
  password: string;
}

interface RegisterFormProps {
  onClose: () => void;
}

export default function RegisterForm({ onClose }: RegisterFormProps) {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInputs>();

  const onSubmit = async (data: RegisterInputs) => {
    setServerError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setServerError(json?.message || "خطا در ثبت نام. دوباره امتحان کنید.");
      } else {
        setSuccess(true);
      }
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      setServerError("خطا در اتصال به سرور.");
    }
  };

  if (success) {
    return (
      <div className="form-success">
        <div className="form-success-icon">🎬</div>
        <h3
          className="font-display"
          style={{ fontSize: "1.8rem", color: "var(--gold)" }}
        >
          خوش اومدی!
        </h3>
        <p
          style={{
            color: "var(--text-muted)",
            marginTop: "0.5rem",
            lineHeight: 1.8,
          }}
        >
          ثبت نام با موفقیت انجام شد.
        </p>
        <button
          className="form-submit-btn"
          style={{ marginTop: "1.5rem" }}
          onClick={onClose}
        >
          شروع کن
        </button>
      </div>
    );
  }

  return (
    <form className="form-body" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Name */}
      <div className="form-field">
        <label className="form-label">نام</label>
        <input
          type="text"
          className={`form-input ${errors.name ? "form-input-error" : ""}`}
          placeholder="نام خود را وارد کنید"
          suppressHydrationWarning
          {...register("name", {
            required: "نام الزامی است",
            minLength: { value: 2, message: "نام باید حداقل ۲ کاراکتر باشد" },
          })}
        />
        {errors.name && (
          <span className="field-error">{errors.name.message}</span>
        )}
      </div>

      {/* Email */}
      <div className="form-field">
        <label className="form-label">ایمیل</label>
        <input
          type="email"
          className={`form-input ${errors.email ? "form-input-error" : ""}`}
          placeholder="example@email.com"
          style={{ direction: "ltr", textAlign: "right" }}
          suppressHydrationWarning
          {...register("email", {
            required: "ایمیل الزامی است",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "فرمت ایمیل صحیح نیست",
            },
          })}
        />
        {errors.email && (
          <span className="field-error">{errors.email.message}</span>
        )}
      </div>

      {/* Password */}
      <div className="form-field">
        <label className="form-label">رمز عبور</label>
        <input
          type="password"
          className={`form-input ${errors.password ? "form-input-error" : ""}`}
          placeholder="حداقل ۸ کاراکتر"
          suppressHydrationWarning
          {...register("password", {
            required: "رمز عبور الزامی است",
            minLength: {
              value: 8,
              message: "رمز عبور باید حداقل ۸ کاراکتر باشد",
            },
          })}
        />
        {errors.password && (
          <span className="field-error">{errors.password.message}</span>
        )}
      </div>

      {/* Server error */}
      {serverError && <div className="form-error">{serverError}</div>}

      <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
        {isSubmitting ? "در حال ثبت نام..." : "ثبت نام"}
      </button>
    </form>
  );
}
