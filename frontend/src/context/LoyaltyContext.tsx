// src/context/LoyaltyContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { LoyaltyInfo } from "../api/loyalty";
import { fetchLoyalty } from "../api/loyalty";
import { useTelegram } from "./TelegramContext";

interface LoyaltyContextValue {
  loyalty: LoyaltyInfo | null;
  loading: boolean;
  phone: string;
  setPhone: (phone: string) => void;
}

const LoyaltyContext = createContext<LoyaltyContextValue | undefined>(
  undefined
);

export const LoyaltyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useTelegram();
  const [loyalty, setLoyalty] = useState<LoyaltyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [phone, setPhoneState] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // передаём telegramId, телефон пока null (потом добавим реальный)
        const info = await fetchLoyalty(String(user.id), null);
        setLoyalty(info);

        if (info.client.phone) {
          setPhoneState(info.client.phone);
        }
      } catch (e) {
        console.error("[LoyaltyContext] Failed to fetch loyalty:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user?.id]);

  const setPhone = (newPhone: string) => {
    setPhoneState(newPhone);

    // пока просто обновляем локально;
    // позже добавим запрос в backend/YCLIENTS для сохранения
    setLoyalty((prev) =>
      prev
        ? {
            ...prev,
            client: { ...prev.client, phone: newPhone },
          }
        : prev
    );
  };

  return (
    <LoyaltyContext.Provider value={{ loyalty, loading, phone, setPhone }}>
      {children}
    </LoyaltyContext.Provider>
  );
};

export const useLoyalty = (): LoyaltyContextValue => {
  const ctx = useContext(LoyaltyContext);
  if (!ctx) {
    throw new Error("useLoyalty must be used inside LoyaltyProvider");
  }
  return ctx;
};
