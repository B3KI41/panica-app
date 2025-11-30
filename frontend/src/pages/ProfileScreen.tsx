// src/pages/ProfileScreen.tsx
import React, { useEffect, useState } from "react";
import { useLoyalty } from "../context/LoyaltyContext";

const ProfileScreen: React.FC = () => {
  const { loyalty, loading, phone, setPhone } = useLoyalty();
  const [phoneInput, setPhoneInput] = useState(phone);

  // если телефон в контексте обновился (например, из API), подтягиваем в инпут
  useEffect(() => {
    setPhoneInput(phone);
  }, [phone]);

  if (loading || !loyalty) {
    return (
      <div className="px-4 pt-10 pb-24 text-sm text-neutral-400">
        Загружаем профиль…
      </div>
    );
  }

  const { client, balance } = loyalty;

  const handleSavePhone = () => {
    const trimmed = phoneInput.trim();
    if (!trimmed) return;
    setPhone(trimmed);
    // позже сюда можно добавить tg.alert / notification
  };

  const firstVisitText = balance.firstVisitCashbackAvailable
    ? "На первом посещении вернём 50% стоимости стрижки бонусами."
    : "Первое посещение уже было — дальше действует кэшбэк 5% от каждого чека.";

  const reviewText = balance.reviewDiscountAvailable
    ? "На следующем визите действует скидка 20% за отзыв в 2ГИС или Яндекс.Картах."
    : "Оставь отзыв в 2ГИС или Яндекс.Картах — и получишь скидку 20% на следующий визит.";

  return (
    <div className="pb-24">
      {/* Заголовок */}
      <section className="mt-6 px-4">
        <h1 className="text-2xl font-semibold">Профиль</h1>
        <p className="mt-2 text-sm text-neutral-400">
          Твой аккаунт в PANIKA barbershop.
        </p>
      </section>

      <section className="mt-4 px-4 space-y-4">
        {/* Карточка аккаунта */}
        <div className="bg-panika-card rounded-3xl px-4 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-panika-chip" />
          <div className="flex flex-col">
            <span className="text-xs text-panika-subtle">Аккаунт PANIKA</span>
            <span className="text-base font-semibold">
              {client.name || "Гость PANIKA"}
            </span>
            {client.telegramId && (
              <span className="text-[11px] text-panika-subtle">
                Telegram ID: {client.telegramId}
              </span>
            )}
          </div>
        </div>

        {/* Бонусный счёт */}
        <div className="bg-panika-card rounded-3xl px-4 py-4 space-y-2">
          <div className="flex justify-between items-baseline">
            <div>
              <p className="text-xs text-panika-subtle">Бонусный счёт</p>
              <p className="text-2xl font-semibold">
                {balance.bonuses.toLocaleString("ru-RU")} бонусов
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-panika-subtle">Уровень</p>
              <p className="text-sm font-medium uppercase">
                {balance.level}
              </p>
            </div>
          </div>

          <p className="text-[11px] text-panika-subtle leading-snug">
            {firstVisitText}
          </p>
          <p className="text-[11px] text-panika-subtle leading-snug">
            Баллы можно использовать до 20% от суммы чека, а на оставшуюся
            часть всё равно действует кэшбэк.
          </p>
          <p className="text-[11px] text-panika-subtle leading-snug">
            {reviewText}
          </p>
        </div>

        {/* Телефон для бонусной программы */}
        <div className="bg-panika-card rounded-3xl px-4 py-4 space-y-3">
          <p className="text-xs text-panika-subtle">
            Телефон для бонусной программы
          </p>

          <div className="flex gap-2">
            <input
              type="tel"
              placeholder="+7..."
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              className="flex-1 bg-panika-bg rounded-2xl px-3 py-2 text-sm outline-none border border-panika-border"
            />
            <button
              onClick={handleSavePhone}
              className="px-4 py-2 rounded-2xl bg-white text-black text-sm font-medium active:scale-[0.98]"
            >
              Сохранить
            </button>
          </div>

          <p className="text-[11px] text-panika-subtle leading-snug">
            Номер телефона помогает найти тебя в системе, даже если сменится
            аккаунт Telegram. В будущем по нему можно будет восстановить бонусы.
          </p>
        </div>

        {/* Заглушка под блок ближайшей записи (позже свяжем с YCLIENTS) */}
        <div className="bg-panika-card rounded-3xl px-4 py-4 space-y-1">
          <p className="text-xs text-panika-subtle">Ближайшая запись</p>
          <p className="text-sm text-panika-subtle">
            Пока записей нет. Запишись к мастеру на вкладке «Мастера».
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProfileScreen;
