import { auth, firebaseErrorMessages } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import AppLogo from "./AppLogo";
import { CircleX } from "lucide-react";

type SignUpFormProps = {
  setMode: React.Dispatch<React.SetStateAction<"login" | "signup" | "reset">>;
  onClose?: () => void;
};
export default function SignUpForm({ setMode, onClose }: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(" ");
  const [showErrAlertMsg, setShowErrAlertMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(" ");
  const [showSuccAlertMsg, setShowSuccAlertMsg] = useState(false);

  const submitSignUpForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg("null");
    setLoading(true);

    try {
      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match");
        setShowErrAlertMsg(true);
        setLoading(false);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccessMsg("Sign Up successful! Redirecting...");
        setShowSuccAlertMsg(true);
        setEmail("");
        setPassword("");
        setTimeout(() => {
          setShowSuccAlertMsg(false);
          onClose?.();
        }, 2000);
      }
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
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <AppLogo />
      <h3>Create An Account</h3>
      {showErrAlertMsg && errorMsg && (
        <div className="alert alert-error rounded-full" role="alert">
          <CircleX className="w-6 h-6 text-white" />
          <span className="text-white text-center justify-center text-sm mt-2 font-medium">
            {errorMsg}
          </span>
        </div>
      )}
      {showSuccAlertMsg && successMsg && (
        <div className="alert alert-success rounded-full" role="alert">
          <CircleX className="w-6 h-6 text-white" />
          <span className="text-white text-center justify-center text-sm mt-2 font-medium">
            {successMsg}
          </span>
        </div>
      )}
      <form
        onSubmit={submitSignUpForm}
        className="form-control w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col gap-4"
      >
        <div className="mt-4">
          <label className="block pb-2 text-sm font-medium" htmlFor="signup-email">
            Email
          </label>
          <input
            type="email"
            value={email}
            name="signUpEmail"
            className="input input-bordered !rounded-full flex items-center gap-2 rounded-full w-full hover:bg-blue-100 focus:outline-none focus:ring-0 focus-within:border-blue-200 focus-within:shadow-none transition-colors duration-200 group"
            placeholder="Enter Email"
            id="signup-email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className="mt-4">
          <label className="block pb-2 text-sm font-medium" htmlFor="signup-password">
            Password
          </label>
          <input
            className="input input-bordered !rounded-full flex items-center gap-2 rounded-full w-full hover:bg-blue-100 focus:outline-none focus:ring-0 focus-within:border-blue-200 focus-within:shadow-none transition-colors duration-200 group"
            type="password"
            value={password}
            name="signUpPassword"
            placeholder="Enter Password"
            id="signup-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className="mt-4 rounded-full">
          <label className="block pb-2 text-sm font-medium" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            className="input input-bordered  flex items-center gap-2 !rounded-full w-full hover:bg-blue-100 focus:outline-none focus:ring-0 focus-within:border-blue-200 focus-within:shadow-none transition-colors duration-200 group"
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            placeholder="Enter Password"
            id="confirm-password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className="mt-4 flex flex-col gap-2 items-center">
          <button type="submit" className="btn btn-primary w-full rounded-full" disabled={loading}>
            {loading ? "Creating Account..." : "SIGN UP"}
          </button>
          <button type="button" onClick={() => setMode("reset")}>
            Reset Password
          </button>
          <button type="button" onClick={() => setMode("login")}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
