// src/api/loyalty.ts

export type LoyaltyLevel = "basic" | "silver" | "gold" | "vip";

export interface NextRecordInfo {
  datetime: string; // ISO-строка, например "2025-12-01T18:30:00+03:00"
  masterName: string;
  serviceName: string;
}

export interface LoyaltyInfo {
  telegramId: string;
  phone: string | null;
  name: string;

  level: LoyaltyLevel;
  balance: number;

  // бонусы и флаги
  totalVisits: number;
  firstVisitCashbackAvailable: boolean;
  firstVisitCashbackUsed: boolean;
  reviewBonusAvailable: boolean;
  canUsePoints: boolean;

  nextRecord: NextRecordInfo | null;
}

/**
 * ВРЕМЕННЫЙ mock-API.
 * Потом здесь будет запрос на наш backend, который уже общается с YCLIENTS.
 */
export async function fetchLoyalty(
  telegramId: string | null,
  phone: string | null
): Promise<LoyaltyInfo> {
  const safeTelegramId = telegramId ?? "unknown";

  // Тут можешь подправить стартовые данные под реальные
  return {
    telegramId: safeTelegramId,
    phone,
    name: "Гость PANIKA",

    level: "basic",
    balance: 350,

    totalVisits: 1,
    firstVisitCashbackAvailable: true, // первый визит уже прошёл, кешбэк 50% доступен
    firstVisitCashbackUsed: false,
    reviewBonusAvailable: false,
    canUsePoints: true, // можно списывать до 20% баллами

    nextRecord: null, // позже будем подтягивать из YCLIENTS
  };
}

/**
 * ВРЕМЕННЫЙ mock: «привязка телефона».
 * Сейчас просто возвращает тот же профиль, но с телефоном.
 * Потом здесь будет настоящий POST на backend.
 */
export async function linkPhone(
  telegramId: string,
  phone: string
): Promise<LoyaltyInfo> {
  // В реальности мы бы сохранили привязку и вернули обновлённый профиль.
  // Здесь — просто вызываем fetchLoyalty с обновлённым телефоном.
  return fetchLoyalty(telegramId, phone);
}
