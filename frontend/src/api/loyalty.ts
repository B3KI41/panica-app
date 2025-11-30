// src/api/loyalty.ts

import type { LoyaltyInfo as LoyaltyInfoType } from "../loyalty/types";
import { fetchLoyaltyFromYclients } from "./yclients";

// Чтобы не ломать существующие импорты:
export type LoyaltyInfo = LoyaltyInfoType;

const USE_YCLIENTS = import.meta.env.VITE_YCLIENTS_ENABLED === "true";

/**
 * Главная функция получения/создания клиента и его бонусного счёта.
 *
 * Сейчас:
 *  - если USE_YCLIENTS === true, пытаемся сходить в YCLIENTS (через заглушку);
 *  - если не настроено или упало — отдаём локальные мок-данные.
 */
export async function fetchLoyalty(
  telegramId: string | null,
  phone: string | null
): Promise<LoyaltyInfo> {
  // Попытка использовать YCLIENTS
  if (USE_YCLIENTS) {
    try {
      const info = await fetchLoyaltyFromYclients({ telegramId, phone });
      return info;
    } catch (e) {
      console.error("[LOYALTY] Ошибка при работе с YCLIENTS:", e);
    }
  }

  // Фолбэк: локальные мок-данные
  const clientId = telegramId || phone || "guest";

  const mock: LoyaltyInfo = {
    client: {
      clientId,
      name: "Гость PANIKA",
      phone: phone ?? undefined,
      telegramId: telegramId ?? undefined,
      yclientsId: undefined,
    },
    balance: {
      bonuses: 350,
      level: "basic",
      cashbackPercent: 0.05,      // базовый кэшбек 5% после первого визита
      maxWriteOffPercent: 0.2,    // можно списать до 20% чека
      reviewDiscountPercent: 0,   // пока нет купона за отзыв
      firstVisitCashbackAvailable: true,
      reviewDiscountAvailable: false,
    },
  };

  return mock;
}
