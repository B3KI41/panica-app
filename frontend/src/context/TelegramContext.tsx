import React, { createContext, useContext, useEffect, useState } from 'react';

type TelegramUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
};

type TelegramContextType = {
  user: TelegramUser | null;
  initData: string | null;
};

const TelegramContext = createContext<TelegramContextType>({
  user: null,
  initData: null,
});

export const useTelegram = () => useContext(TelegramContext);

export const TelegramProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [initData, setInitData] = useState<string | null>(null);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (!tg) return;

    tg.ready();
    setInitData(tg.initData || null);
    if (tg.initDataUnsafe?.user) {
      setUser(tg.initDataUnsafe.user as TelegramUser);
    }
  }, []);

  return (
    <TelegramContext.Provider value={{ user, initData }}>
      {children}
    </TelegramContext.Provider>
  );
};
