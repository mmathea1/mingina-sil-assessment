import { auth, firebaseErrorMessages } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import AppLogo from "./AppLogo";
import { CircleX } from "lucide-react";

type ResetPasswordFormProps = {
  setMode: (mode: "login" | "signup" | "reset") => void;
};

export default function ResetPasswordForm({ setMode }: ResetPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(" ");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const submitResetForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent");
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        const errorMessage =
          firebaseErrorMessages[err.code] || "Something went wrong. Please try again.";
        setError(errorMessage);
      } else {
        setError("An unexpected error occured. Please try again.");
      }
    }
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <AppLogo />
      <h3>Reset Password</h3>
      {showAlert && error && (
        <div className="alert alert-error text-center justify-center" role="alert">
          <CircleX className="w-6 h-6 text-white" />
          <span className="text-white text-sm mt-2 font-medium">{error}</span>
        </div>
      )}
      <form
        onSubmit={submitResetForm}
        className="form-control w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col gap-4"
      >
        <div className="mt-4">
          <label className="block pb-2 text-sm font-medium" htmlFor="reset-email">
            Email
          </label>
          <input
            type="email"
            value={email}
            name="resetEmail"
            className="input input-bordered flex items-center gap-2 rounded-full w-full hover:bg-blue-100 focus:outline-none focus:ring-0 focus-within:border-blue-200 focus-within:shadow-none transition-colors duration-200 group"
            placeholder="Enter Email"
            id="reset-email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>

        <div className="mt-4 flex flex-col gap-2 items-center">
          <button type="submit" className="btn btn-primary w-full rounded-full">
            SEND RESET LINK
          </button>
          <button type="button" onClick={() => setMode("login")}>
            Login
          </button>
          <button type="button" onClick={() => setMode("signup")}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
