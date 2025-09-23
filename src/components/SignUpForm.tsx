import { auth, firebaseErrorMessages } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import AppLogo from "./AppLogo";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(" ");
  const [loading, setLoading] = useState(false);

  const submitSignUpForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("null");
    setLoading(true);

    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("signed up successfully");
      }
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        const errorMessage =
          firebaseErrorMessages[err.code] || "Something went wrong. Please try again.";
        setError(errorMessage);
      } else {
        setError("An unexpected error occured. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <AppLogo />
      {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
      <form
        onSubmit={submitSignUpForm}
        className="form-control w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col gap-4"
      >
        <div className="mt-4">
          <label className="block pb-2 text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            value={email}
            name="email"
            className="input input-bordered flex items-center gap-2 rounded-full w-full hover:bg-blue-100 focus:outline-none focus:ring-0 focus-within:border-blue-200 focus-within:shadow-none transition-colors duration-200 group"
            placeholder="Enter Email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className="mt-4">
          <label className="block pb-2 text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            className="input input-bordered flex items-center gap-2 rounded-full w-full hover:bg-blue-100 focus:outline-none focus:ring-0 focus-within:border-blue-200 focus-within:shadow-none transition-colors duration-200 group"
            type="password"
            value={password}
            name="password"
            placeholder="Enter Password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className="mt-4">
          <label className="block pb-2 text-sm font-medium" htmlFor="password">
            Confirm Password
          </label>
          <input
            className="input input-bordered flex items-center gap-2 rounded-full w-full hover:bg-blue-100 focus:outline-none focus:ring-0 focus-within:border-blue-200 focus-within:shadow-none transition-colors duration-200 group"
            type="password"
            value={confirmPassword}
            name="password"
            placeholder="Enter Password"
            id="password"
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
          <a href="#" className="text-blue-500 text-sm text-center mt-2 hover:underline">
            Forgot Password?{" "}
          </a>
        </div>
      </form>
    </div>
  );
}
