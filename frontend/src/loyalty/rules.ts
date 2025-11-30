// src/loyalty/rules.ts

import type { LoyaltyBalance } from "./types";

export interface VisitContext {
  orderAmount: number;         // сумма чека до скидок
  isFirstVisit: boolean;       // это первый визит? (нужно больше для UI/логики)
  hasReviewDiscount: boolean;  // есть активная скидка 20% за отзыв?
  currentBonuses: number;      // текущий баланс бонусов
}

// Результаты, которые нам нужны для чека
export interface LoyaltyCalculationResult {
  priceBefore: number;         // исходная цена чека

  // Скидка за отзыв
  discountPercent: number;     // 0 или 0.2
  discountAmount: number;      // сколько рублей списали скидкой
  priceAfterDiscount: number;  // цена после скидки (но до списания бонусов)

  // Бонусы к списанию
  maxBonusesToUse: number;     // максимум бонусов по правилам (20% от суммы)
  bonusesToUse: number;        // сколько реально спишем (ограничено балансом)
  priceToPayMoney: number;     // сколько клиент заплатит деньгами

  // Кэшбэк
  cashbackPercent: number;     // 0.5 или 0.05
  cashbackAmount: number;      // сколько бонусов начислим за визит
}

/**
 * Рассчитываем всё по правилам PANIKA:
 * - скидка за отзыв 20% (если есть);
 * - можно списать до 20% чека бонусами;
 * - кэшбэк:
 *    - 50% на первом визите
 *    - 5% на следующих визитах
 * - кэшбэк считается от суммы после скидки, но НЕ зависит от того,
 *   оплатил ли клиент часть чека бонусами.
 */
export function calculateLoyaltyForVisit(
  ctx: VisitContext,
  loyalty: Pick<LoyaltyBalance, "cashbackPercent" | "maxWriteOffPercent">
): LoyaltyCalculationResult {
  const { orderAmount, hasReviewDiscount, currentBonuses } = ctx;

  const priceBefore = orderAmount;

  // 1. Скидка за отзыв (если есть)
  const discountPercent = hasReviewDiscount ? 0.2 : 0;
  const discountAmount = priceBefore * discountPercent;
  const priceAfterDiscount = priceBefore - discountAmount;

  // 2. Максимум, который можно списать бонусами (20% от суммы после скидки)
  const maxByRule = priceAfterDiscount * loyalty.maxWriteOffPercent;
  const maxBonusesToUse = Math.min(maxByRule, currentBonuses);

  // Пока считаем, что используем максимум допустимых бонусов —
  // позже можно сделать ввод "хочу потратить N"
  const bonusesToUse = maxBonusesToUse;

  // 3. Сколько клиент платит живыми деньгами
  const priceToPayMoney = priceAfterDiscount - bonusesToUse;

  // 4. Кэшбэк:
  //    - 50% (0.5) для первого визита
  //    - 5% (0.05) для следующих
  //    Считаем от суммы после скидки (priceAfterDiscount),
  //    вне зависимости от того, использовал ли клиент бонусы.
  const cashbackPercent = loyalty.cashbackPercent;
  const cashbackAmount = Math.round(priceAfterDiscount * cashbackPercent);

  return {
    priceBefore,
    discountPercent,
    discountAmount,
    priceAfterDiscount,
    maxBonusesToUse,
    bonusesToUse,
    priceToPayMoney,
    cashbackPercent,
    cashbackAmount,
  };
}
