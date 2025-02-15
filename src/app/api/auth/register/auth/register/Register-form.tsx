// app/register/register-form.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface RegistrationError {
  message?: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // You can add more validation (e.g., email format) here

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        setSuccess("Registration successful! You can now log in.");
        setTimeout(() => {
          router.push("admin"); // Redirect to login
        }, 2000);
      } else {
        const errorData: RegistrationError = await response.json();
        setError(errorData.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setError("An unexpected error occurred during registration.");
    }
  };

  return (
    <>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full h-full p-10"
      >
        <input
          type="text"
          className="mb-4 p-2 rounded border border-gray-300 active:border-primary-light"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="mb-4 p-2 rounded border border-gray-300 active:border-primary-light"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="mb-4 p-2 rounded border border-gray-300 active:border-primary-light"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          className="mb-4 p-2 rounded border border-gray-300 active:border-primary-light"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
