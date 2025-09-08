// contexts/ToastContext.tsx
import { createContext, useState } from "react";

type ToastType = "success" | "error" | null;

type ToastContextType = {
  showToast: (message: string, type: ToastType) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>(null);
  const [visible, setVisible] = useState(false);

  const showToast = (msg: string, t: ToastType) => {
    setMessage(msg);
    setType(t);
    setVisible(true);
    setTimeout(() => setVisible(false), 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <div
          className={`fixed bottom-0 m-3 w-[300px] text-snow text-center shadow-lg p-2 font-bold
          ${type === "success" ? "bg-green" : "bg-red-500"}`}
        >
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
};
