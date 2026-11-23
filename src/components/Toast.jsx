import { createContext, useCallback, useContext, useRef, useState } from "react";

const ToastContext = createContext(() => {});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  const showToast = useCallback((message) => {
    clearTimeout(timer.current);
    setToast(message);
    timer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </ToastContext.Provider>
  );
}
