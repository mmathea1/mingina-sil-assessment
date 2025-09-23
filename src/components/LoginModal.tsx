// import { signIn, signOut, useSession } from "next-auth/react";
import { signOut, useSession } from "next-auth/react";
import AppLogo from "./AppLogo";
import LoginForm from "./LoginForm";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { data: session } = useSession();

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
        {session ? (
          <>
            <AppLogo />
            <p className="text-center">You&aposre signed in as: {session.user?.name}</p>
            <button className="btn" onClick={() => signOut()}>
              Sign Out
            </button>
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
