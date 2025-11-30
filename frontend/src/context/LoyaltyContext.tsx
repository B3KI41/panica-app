// src/context/LoyaltyContext.tsx

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { fetchLoyalty, linkPhone, type LoyaltyInfo } from "../api/loyalty";
import { useTelegram } from "./TelegramContext";

interface LoyaltyContextValue {
  loyalty: LoyaltyInfo | null;
  loading: boolean;
  error: string | null;

  refresh: () => Promise<void>;
  updatePhone: (phone: string) => Promise<void>;
}

const LoyaltyContext = createContext<LoyaltyContextValue | undefined>(
  undefined
);

export const LoyaltyProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useTelegram();
  const [loyalty, setLoyalty] = useState<LoyaltyInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const telegramId = user?.id ? String(user.id) : null;

  const refresh = useCallback(async () => {
    if (!telegramId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchLoyalty(telegramId, null);
      setLoyalty(data);
      setError(null);
    } catch (e) {
      console.error("Failed to fetch loyalty", e);
      setError("Не удалось загрузить профиль.");
    } finally {
      setLoading(false);
    }
  }, [telegramId]);

  const updatePhone = useCallback(
    async (phone: string) => {
      if (!telegramId) return;

      try {
        setLoading(true);
        const updated = await linkPhone(telegramId, phone);
        setLoyalty(updated);
        setError(null);
      } catch (e) {
        console.error("Failed to update phone", e);
        setError("Не удалось сохранить номер телефона.");
      } finally {
        setLoading(false);
      }
    },
    [telegramId]
  );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <LoyaltyContext.Provider
      value={{
        loyalty,
        loading,
        error,
        refresh,
        updatePhone,
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
};

export const useLoyalty = (): LoyaltyContextValue => {
  const ctx = useContext(LoyaltyContext);
  if (!ctx) {
    throw new Error("useLoyalty must be used within LoyaltyProvider");
  }
  return ctx;
};
