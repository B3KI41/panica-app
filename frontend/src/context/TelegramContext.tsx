// src/context/TelegramContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

declare global {
  interface Window {
    Telegram?: any;
  }
}

export type TelegramContextType = {
  tg: any; // Telegram WebApp объект
};

const TelegramContext = createContext<TelegramContextType>({
  tg: null,
});

type TelegramProviderProps = {
  children: ReactNode;
};

export const TelegramProvider: React.FC<TelegramProviderProps> = ({
  children,
}) => {
  const [tg, setTg] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const webApp = window.Telegram?.WebApp ?? null;
      setTg(webApp);
    }
  }, []);

  return (
    <TelegramContext.Provider value={{ tg }}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
