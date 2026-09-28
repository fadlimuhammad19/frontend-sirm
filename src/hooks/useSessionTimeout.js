import { useState, useEffect, useRef, useCallback } from "react";

const TIMEOUT_MS = 15 * 60 * 1000; // 15 menit
const WARNING_MS = 60 * 1000; // muncul warning 1 menit sebelum logout

export default function useSessionTimeout(onTimeout) {
  const [showWarning, setShowWarning] = useState(false);
  const timeoutRef = useRef(null);
  const warningRef = useRef(null);

  const resetTimer = useCallback(() => {
    setShowWarning(false);
    clearTimeout(timeoutRef.current);
    clearTimeout(warningRef.current);

    warningRef.current = setTimeout(() => setShowWarning(true), TIMEOUT_MS - WARNING_MS);
    timeoutRef.current = setTimeout(() => onTimeout(), TIMEOUT_MS);
  }, [onTimeout]);

  useEffect(() => {
    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      clearTimeout(timeoutRef.current);
      clearTimeout(warningRef.current);
    };
  }, [resetTimer]);

  return { showWarning, stayActive: resetTimer };
}