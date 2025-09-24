"use client";

import { useAuth } from "@/context/AuthContext";
import { CircleCheck, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const { user, logout, resetPassword } = useAuth();
  const router = useRouter();
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  const handleResetPassword = async () => {
    if (!user?.email) {
      setAlertType("error");
      setAlertMsg("No email associated with this account. Cannot reset password.");
      return;
    }
    try {
      await resetPassword(user.email);
      setAlertType("success");
      setAlertMsg("Password reset email sent successfully.");
    } catch (err) {
      console.error(err);
      setAlertType("error");
      setAlertMsg("Failed to send reset email. Try again later.");
    }
  };

  if (!user) {
    router.push("/");
    return null;
  }

  useEffect(() => {
    if (alertType) {
      const timer = setTimeout(() => {
        setAlertType(null);
        setAlertMsg("");
      }, 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [alertType]);

  return (
    <main className="p-6">
      <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-5xl relative p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4">Welcome {user.displayName || "to your profile"}</h2>
        {alertType && (
          <div
            role="alert"
            className={`alert ${
              alertType === "success" ? "alert-success" : "alert-error"
            } flex items-center gap-2 mt-4 p-4 mb-4 rounded-full`}
          >
            {alertType === "success" ? (
              <CircleCheck className="w-5 h-5 text-white" />
            ) : (
              <AlertCircle className="w-5 h-5 text-white" />
            )}
            <span className="text-white">{alertMsg}</span>
          </div>
        )}
        <p>
          <strong>Name:</strong> {user.displayName || "Anonymous"}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Joined:</strong> {user.metadata.creationTime}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button className="btn btn-outline rounded-full" onClick={handleResetPassword}>
            Reset Password
          </button>
          <button className="btn btn-primary mt-4 rounded-full text-white" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}
