"use client";

import AppLogo from "./AppLogo";
import { FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firebaseErrorMessages } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { CircleX } from "lucide-react";

type LoginFormProps = {
  setMode: React.Dispatch<React.SetStateAction<"login" | "signup" | "reset">>;
  onClose?: () => void;
};

export default function LoginForm({ setMode, onClose }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(" ");
  const [showErrAlertMsg, setShowErrAlertMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(" ");
  const [showSuccAlertMsg, setShowSuccAlertMsg] = useState(false);

  const submitLoginForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowErrAlertMsg(false);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMsg("Login successful! Redirecting...");
      setShowSuccAlertMsg(true);
      setEmail("");
      setPassword("");
      setTimeout(() => {
        setShowSuccAlertMsg(false);
        onClose?.();
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        const errorMessage =
          firebaseErrorMessages(err.code) || "Something went wrong. Please try again.";
        setErrorMsg(errorMessage);
        setShowErrAlertMsg(true);
      } else {
        setErrorMsg("An unexpected error occured. Please try again.");
        setShowErrAlertMsg(true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <AppLogo />
      <h3>Login</h3>
      {showErrAlertMsg && errorMsg && (
        <div className="alert alert-error" role="alert">
          <CircleX className="w-6 h-6 text-white" />
          <span className="text-white text-center justify-center text-sm mt-2 font-medium">
            {errorMsg}
          </span>
        </div>
      )}
      {showSuccAlertMsg && successMsg && (
        <div className="alert alert-success" role="alert">
          <CircleX className="w-6 h-6 text-white" />
          <span className="text-white text-center justify-center text-sm mt-2 font-medium">
            {successMsg}
          </span>
        </div>
      )}
      <form
        onSubmit={submitLoginForm}
        className="form-control w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col gap-4"
      >
        <div className="mt-4">
          <label className="block pb-2 text-sm font-medium" htmlFor="login-email">
            Email
          </label>
          <input
            type="email"
            value={email}
            name="loginEmail"
            className="input input-bordered flex items-center gap-2 rounded-full w-full hover:bg-blue-100 focus:outline-none focus:ring-0 focus-within:border-blue-200 focus-within:shadow-none transition-colors duration-200 group"
            placeholder="Enter Email"
            id="login-email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className="mt-4">
          <label className="block pb-2 text-sm font-medium" htmlFor="login-password">
            Password
          </label>
          <input
            className="input input-bordered flex items-center gap-2 rounded-full w-full hover:bg-blue-100 focus:outline-none focus:ring-0 focus-within:border-blue-200 focus-within:shadow-none transition-colors duration-200 group"
            type="password"
            value={password}
            name="loginPassword"
            placeholder="Enter Password"
            id="login-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className="mt-4 flex flex-col gap-2 items-center">
          <button type="submit" className="btn btn-primary w-full rounded-full">
            LOGIN
          </button>
          <button type="button" onClick={() => setMode("reset")}>
            Reset Password
          </button>
          <button type="button" onClick={() => setMode("signup")}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
