import { useState, useEffect } from "react";

export function useIsMobile() {
  const isClient = typeof window === "object";

  const [isMobile, setIsMobile] = useState(
    isClient ? window.innerWidth < 641 : false
  );

  const handleResize = () => {
    setIsMobile(window.innerWidth < 641);
  };

  useEffect(() => {
    if (!isClient) {
      return;
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]);

  return isMobile;
}
