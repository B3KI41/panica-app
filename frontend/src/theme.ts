// src/theme.ts

export const tabs = [
  { id: 'home', label: 'Главная', icon: 'home' },
  { id: 'barbers', label: 'Мастера', icon: 'razor' },
  { id: 'profile', label: 'Профиль', icon: 'user' },
] as const;

export type TabId = (typeof tabs)[number]['id'];
