"use client";
import { useEffect, useState } from "react";

export default function ClientOnly({ children }) {
  const [isClient, setIsClient] = useState(false);

  // Don't want this to load until the client starts loading don't want a hydration error for mismatch
  useEffect(() => setIsClient(true));
  return <>{isClient ? <div>{children}</div> : null}</>;
}
