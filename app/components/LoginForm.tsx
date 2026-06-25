"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/authStore";

interface LoginInputs {
  username: string;
  password: string;
}

interface LoginFormProps {
  onClose: () => void;
}

export default function LoginForm({ onClose }: LoginFormProps) {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const setTokens = useAuthStore((s) => s.setTokens);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>();

  const onSubmit = async (data: LoginInputs) => {
    setServerError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setServerError(json?.message || "اطلاعات وارد شده صحیح نیست.");
      } else {
        setTokens(json.access_token, json.refresh_token);

        console.log("access_token:", json.access_token);
        console.log("refresh_token:", json.refresh_token);
        setSuccess(true);
      }
    } catch {
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
          خوش برگشتی!
        </h3>
        <p
          style={{
            color: "var(--text-muted)",
            marginTop: "0.5rem",
            lineHeight: 1.8,
          }}
        >
          با موفقیت وارد شدی.
        </p>
        <button
          className="form-submit-btn"
          style={{ marginTop: "1.5rem" }}
          onClick={onClose}
        >
          ادامه
        </button>
      </div>
    );
  }

  return (
    <form className="form-body" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Username */}
      <div className="form-field">
        <label className="form-label">نام کاربری</label>
        <input
          type="text"
          className={`form-input ${errors.username ? "form-input-error" : ""}`}
          placeholder="نام کاربری خود را وارد کنید"
          suppressHydrationWarning
          {...register("username", {
            required: "نام کاربری الزامی است",
            minLength: {
              value: 3,
              message: "نام کاربری باید حداقل ۳ کاراکتر باشد",
            },
          })}
        />
        {errors.username && (
          <span className="field-error">{errors.username.message}</span>
        )}
      </div>

      {/* Password */}
      <div className="form-field">
        <label className="form-label">رمز عبور</label>
        <input
          type="password"
          className={`form-input ${errors.password ? "form-input-error" : ""}`}
          placeholder="رمز عبور خود را وارد کنید"
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

      {serverError && <div className="form-error">{serverError}</div>}

      <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
        {isSubmitting ? "در حال ورود..." : "ورود"}
      </button>
    </form>
  );
}
