"use client";

import { useEffect, useState } from "react";
import { getBanglaDate } from "@/lib/utils";

export default function BanglaDate({ className }: { className?: string }) {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(getBanglaDate());
  }, []);

  return <span className={className}>{date || "\u00A0"}</span>;
}