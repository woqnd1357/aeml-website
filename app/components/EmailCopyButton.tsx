"use client";

import { useState } from "react";

type EmailCopyButtonProps = {
  email: string;
};

export function EmailCopyButton({ email }: EmailCopyButtonProps) {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async () => {
    const trimmed = email.trim();
    if (!trimmed) return;
    try {
      await navigator.clipboard.writeText(trimmed);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  if (!email.trim()) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="text-[#666666] hover:text-[#0047BB] transition-colors flex items-center justify-center p-2 rounded-full hover:bg-[#0047BB]/5 relative"
      title="Email"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>

      <span
        className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0A0A0A] text-white text-xs px-3 py-1.5 rounded transition-opacity duration-300 whitespace-nowrap pointer-events-none ${showToast ? "opacity-100" : "opacity-0"}`}
      >
        Email copied!
      </span>
    </button>
  );
}
