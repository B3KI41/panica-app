// src/api/loyalty.ts

// тип, который ждёт LoyaltyContext
export type LoyaltyInfo = {
  points: number;
  tier: 'basic' | 'silver' | 'gold';
};

// пока без реального бэка — просто мок
export async function fetchLoyalty(): Promise<LoyaltyInfo> {
  // здесь потом будет запрос на бекенд, типа:
  // const res = await apiGet<LoyaltyInfo>('/loyalty/me');
  // return res;

  // временные тестовые данные
  return {
    points: 350,
    tier: 'basic',
  };
}
