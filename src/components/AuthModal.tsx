import { signIn } from "next-auth/react";
import AppLogo from "./AppLogo";

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <AppLogo />
        <h2>Sign In</h2>
        <button
          className="btn w-full bg-black text-white hover:bg-gray-800"
          onClick={() => signIn("github")}
        >
          Continue with Github
        </button>
      </div>
    </div>
  );
}
