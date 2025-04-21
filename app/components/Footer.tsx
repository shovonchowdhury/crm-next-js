import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="border-t bg-[#6c63ff] py-6 text-white">
      <div className="w-[80%] mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; 2025 FreelanceCRM. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link
            href="/terms"
            className="text-sm text-muted-foreground underline underline-offset-4"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground underline underline-offset-4"
          >
            Privacy
          </Link>
        </div>
      </div>
    </div>
  );
}
