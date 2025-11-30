// src/api/yclients.ts

import type {
  LoyaltyInfo,
  LoyaltyClient,
  LoyaltyBalance,
} from "../loyalty/types";

// Базовый адрес API YCLIENTS
const API_BASE =
  import.meta.env.VITE_YCLIENTS_API_BASE ?? "https://api.yclients.com/api/v1";

const COMPANY_ID = import.meta.env.VITE_YCLIENTS_COMPANY_ID;

// В этот заголовок ты потом вставишь то, что требует YCLIENTS
// (обычно "Bearer <partner_token>, User <user_token>")
const AUTH_HEADER = import.meta.env.VITE_YCLIENTS_AUTH_HEADER;

// Helper для запросов к YCLIENTS — пока не используется, но пригодится позже
export async function yclientsRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  if (!AUTH_HEADER || !COMPANY_ID) {
    console.warn(
      "[YCLIENTS] Не настроены VITE_YCLIENTS_AUTH_HEADER / VITE_YCLIENTS_COMPANY_ID"
    );
    throw new Error("YCLIENTS_NOT_CONFIGURED");
  }

  const url = `${API_BASE}${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTH_HEADER,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `[YCLIENTS] ${res.status} ${res.statusText}: ${text.slice(0, 500)}`
    );
  }

  return res.json() as Promise<T>;
}

/**
 * В будущем:
 *  1) Ищем клиента по телефону в YCLIENTS.
 *  2) Если нет — создаём.
 *  3) Читаем баланс бонусов / флаги (первый визит, скидка за отзыв).
 *  4) Мапим в наш LoyaltyInfo.
 *
 * Сейчас возвращаем мок-данные, чтобы фронт не ломался.
 */
export async function fetchLoyaltyFromYclients(params: {
  telegramId?: string | null;
  phone?: string | null;
}): Promise<LoyaltyInfo> {
  const { telegramId, phone } = params;

  console.warn(
    "[YCLIENTS] Используется заглушка fetchLoyaltyFromYclients (мок-данные)."
  );

  const mockClient: LoyaltyClient = {
    clientId: telegramId || phone || "guest",
    name: "Гость PANIKA",
    phone: phone ?? undefined,
    telegramId: telegramId ?? undefined,
    yclientsId: undefined,
  };

  const isFirstVisit = true; // TODO: брать из истории YCLIENTS

  const mockBalance: LoyaltyBalance = {
    bonuses: 350,
    level: "basic",
    cashbackPercent: isFirstVisit ? 0.5 : 0.05, // 50% первый визит, 5% далее
    maxWriteOffPercent: 0.2, // можно списать до 20% чека бонусами
    reviewDiscountPercent: 0, // 0 или 0.2 за отзыв
    firstVisitCashbackAvailable: isFirstVisit,
    reviewDiscountAvailable: true, // TODO: подтянуть из YCLIENTS
  };

  const info: LoyaltyInfo = {
    client: mockClient,
    balance: mockBalance,
  };

  return info;
}
