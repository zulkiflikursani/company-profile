import React from "react";
import RegisterForm from "./Register-form";

function page() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h1>Registrasi</h1>
      <RegisterForm />
    </div>
  );
}

export default page;
