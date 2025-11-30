// src/api/loyalty.ts

// Типы должны совпадать с backend/schemas.py (LoyaltyInfo, NextRecordInfo)

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

  totalVisits: number;
  firstVisitCashbackAvailable: boolean;
  firstVisitCashbackUsed: boolean;
  reviewBonusAvailable: boolean;
  canUsePoints: boolean;

  nextRecord: NextRecordInfo | null;
}

// Базовый URL бэкенда.
// Для разработки: http://localhost:8000
// Для прода: задашь переменную окружения VITE_API_BASE
const API_BASE =
  import.meta.env.VITE_API_BASE ?? "http://localhost:8000";

// универсальный хелпер запросов
async function apiRequest<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE}${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `[LOYALTY_API] ${res.status} ${res.statusText}: ${text.slice(0, 300)}`
    );
  }

  return res.json() as Promise<T>;
}

// Фолбэк-мок, если бэкенд недоступен
function buildMockLoyalty(
  telegramId: string,
  phone: string | null
): LoyaltyInfo {
  return {
    telegramId,
    phone,
    name: "Гость PANIKA",

    level: "basic",
    balance: 350,

    totalVisits: 1,
    firstVisitCashbackAvailable: true,
    firstVisitCashbackUsed: false,
    reviewBonusAvailable: false,
    canUsePoints: true,

    nextRecord: null,
  };
}

/**
 * Получение профиля лояльности.
 * 1) Пробуем сходить в backend: GET /loyalty/profile?telegramId=...&phone=...
 * 2) Если бекенд недоступен / ошибка — возвращаем мок.
 */
export async function fetchLoyalty(
  telegramId: string | null,
  phone: string | null
): Promise<LoyaltyInfo> {
  const safeTelegramId = telegramId ?? "unknown";

  try {
    if (!telegramId) {
      // если по какой-то причине нет Telegram ID — сразу мок
      return buildMockLoyalty(safeTelegramId, phone);
    }

    const params = new URLSearchParams();
    params.set("telegramId", telegramId);
    if (phone) params.set("phone", phone);

    const data = await apiRequest<LoyaltyInfo>(
      `/loyalty/profile?${params.toString()}`
    );
    return data;
  } catch (e) {
    console.error("[LOYALTY] fetchLoyalty failed, using mock:", e);
    return buildMockLoyalty(safeTelegramId, phone);
  }
}

/**
 * Привязка телефона к профилю.
 * 1) POST /loyalty/link-phone { telegramId, phone }
 * 2) Если бекенд недоступен — возвращаем локальный мок-профиль.
 */
export async function linkPhone(
  telegramId: string,
  phone: string
): Promise<LoyaltyInfo> {
  try {
    const data = await apiRequest<LoyaltyInfo>("/loyalty/link-phone", {
      method: "POST",
      body: JSON.stringify({ telegramId, phone }),
    });
    return data;
  } catch (e) {
    console.error("[LOYALTY] linkPhone failed, using mock:", e);
    return buildMockLoyalty(telegramId, phone);
  }
}
