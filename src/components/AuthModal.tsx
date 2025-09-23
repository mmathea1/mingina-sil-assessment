"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import { X } from "lucide-react";
import SignUpForm from "./SignUpForm";
import ResetPasswordForm from "./ResetPasswordForm";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup" | "reset";
};

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="btn btn-circle absolute top-3 right-3 text-gray-500 hover:text-blue-700 focus:outline-none focus:ring-0 border-0 shadow-none tooltip tooltip-bottom"
          data-tip="Close"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        {mode === "login" && <LoginForm setMode={setMode} />}
        {mode === "signup" && <SignUpForm setMode={setMode} />}
        {mode === "reset" && <ResetPasswordForm setMode={setMode} />}
      </div>
    </div>
  );
}
