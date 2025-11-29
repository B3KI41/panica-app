// src/context/TelegramContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";

declare global {
  interface Window {
    Telegram?: any;
  }
}

export type TelegramUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
};

export type TelegramContextType = {
  tg: any;                    // объект Telegram WebApp
  user: TelegramUser | null;  // данные пользователя из initDataUnsafe
};

const TelegramContext = createContext<TelegramContextType>({
  tg: null,
  user: null,
});

type TelegramProviderProps = {
  children: ReactNode;
};

export const TelegramProvider: React.FC<TelegramProviderProps> = ({
  children,
}) => {
  const [tg, setTg] = useState<any>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const webApp = window.Telegram?.WebApp ?? null;
    setTg(webApp);

    if (webApp?.initDataUnsafe?.user) {
      setUser(webApp.initDataUnsafe.user as TelegramUser);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <TelegramContext.Provider value={{ tg, user }}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
