// src/loyalty/types.ts

// Уровни лояльности (на будущее — можно будет развить)
export type LoyaltyLevel = "basic" | "silver" | "gold" | "vip";

// Клиент в нашей системе лояльности
export interface LoyaltyClient {
  clientId: string;        // наш внутренний ID (может совпадать с yclientsId или telegramId)
  name: string;
  phone?: string;
  telegramId?: string;     // строкой, чтобы не путаться с number/string
  yclientsId?: number;     // ID клиента в YCLIENTS (если есть)
}

// Состояние бонусного счёта + правила
export interface LoyaltyBalance {
  bonuses: number;                 // текущие бонусы
  level: LoyaltyLevel;             // базовый/silver/...

  // Про кэшбэк:
  //  - на первом визите: 0.5 (50%)
  //  - на следующих визитах: 0.05 (5%)
  cashbackPercent: number;

  // Максимум, который можно оплатить бонусами от суммы чека (20% = 0.2)
  maxWriteOffPercent: number;

  // Скидка за отзыв (обычно 0 или 0.2 = 20%)
  reviewDiscountPercent: number;

  // Флаги для логики:
  firstVisitCashbackAvailable: boolean;  // можно ли ещё применить 50% кэшбек
  reviewDiscountAvailable: boolean;      // есть ли активная скидка за отзыв
}

// То, что будем хранить/получать как итоговую инфу о лояльности
export interface LoyaltyInfo {
  client: LoyaltyClient;
  balance: LoyaltyBalance;
}
