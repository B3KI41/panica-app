// src/types/loyalty.ts
export type LoyaltyLevel = "basic" | "silver" | "gold" | "vip";

export interface LoyaltyProfile {
  id: string;              // внутренний ID в нашей системе
  telegramId: number;      // ID пользователя в Telegram
  phone?: string;          // номер телефона, если уже указан
  displayName: string;     // имя в приложении ("Гость PANIKA" и т.п.)
  bonuses: number;         // текущий баланс бонусов
  level: LoyaltyLevel;     // уровень (basic/silver/...)
  nextLevelAt: number | null; // сколько бонусов нужно до след. уровня (потом используем)
  totalVisits: number;     // количество визитов
  lastVisitAt?: string;    // последняя запись/визит
}
