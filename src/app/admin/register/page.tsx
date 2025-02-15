import React from "react";
import RegisterForm from "./Register-form";

function page() {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <h1 className="text-4xl font-bold">Registrasi</h1>
      <RegisterForm />
    </div>
  );
}

export default page;
