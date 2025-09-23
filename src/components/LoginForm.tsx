// "use client";

import AppLogo from "./AppLogo";
import { FormEvent, useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(" ");

  const submitLoginForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      console.log(response);
    } catch (err) {
      console.error(err);
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <AppLogo />
      {error && <p>{error}</p>}
      <form
        onSubmit={submitLoginForm}
        className="form-control w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
      >
        <div className="mt-4">
          <label className="block pb-2">Login Email</label>
          <input
            type="email"
            value={email}
            name="email"
            className="input flex items-center gap-2 !rounded-full hover:bg-blue-100 focus:outline-none focus:ring-0 focus-within:border-blue-200 focus-within:shadow-none transition-colors duration-200 group"
            placeholder="Enter Email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mt-4">
          <label className="block pb-2 ">Login Password</label>
          <input
            className="input flex items-center gap-2 !rounded-full hover:bg-blue-100 focus:outline-none focus:ring-0 focus-within:border-blue-200 focus-within:shadow-none transition-colors duration-200 group"
            type="password"
            value={password}
            name="password"
            placeholder="Enter Password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="mt-4 flex flex-col gap-2 items-center">
          <button type="submit" className="btn btn-primary rounded-full">
            LOGIN
          </button>
          <small>RESET PASSWORD</small>
        </div>
      </form>
    </div>
  );
}
