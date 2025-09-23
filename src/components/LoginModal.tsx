import AppLogo from "./AppLogo";
import LoginForm from "./LoginForm";
import { useAuth } from "@/context/AuthContext";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { user, loading } = useAuth();

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
        {!loading && user ? (
          <>
            <AppLogo />
            <p className="text-center">You&aposre signed in as: {user.email}</p>
            <button className="btn">Sign Out</button>
          </>
        ) : (
          <>
            <LoginForm />
          </>
        )}
      </div>
    </div>
  );
}
