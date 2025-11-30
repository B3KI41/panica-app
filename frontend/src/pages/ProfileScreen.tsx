// src/pages/ProfileScreen.tsx

import { useState } from "react";
import { useLoyalty } from "../context/LoyaltyContext";
import { useTelegram } from "../context/TelegramContext";

const ProfileScreen = () => {
  const { loyalty, loading, error, updatePhone } = useLoyalty();
  const { user } = useTelegram();

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneInput, setPhoneInput] = useState(loyalty?.phone ?? "");

  const displayName =
    loyalty?.name ||
    (user?.first_name ? `${user.first_name} ${user.last_name ?? ""}`.trim() : "Гость PANIKA");

  const handleEditPhone = () => {
    setPhoneInput(loyalty?.phone ?? "");
    setIsEditingPhone(true);
  };

  const handleSavePhone = async () => {
    const value = phoneInput.trim();
    if (!value) return;
    await updatePhone(value);
    setIsEditingPhone(false);
  };

  const handleCancelPhone = () => {
    setIsEditingPhone(false);
    setPhoneInput(loyalty?.phone ?? "");
  };

  if (loading && !loyalty) {
    return (
      <div className="px-4 pt-6 pb-24 text-white">
        <p className="text-sm text-zinc-300">Загружаем профиль…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 pt-6 pb-24 text-white">
        <p className="text-sm text-red-400 mb-2">{error}</p>
        <p className="text-xs text-zinc-400">
          Попробуй закрыть мини-приложение и открыть его снова.
        </p>
      </div>
    );
  }

  if (!loyalty) {
    return (
      <div className="px-4 pt-6 pb-24 text-white">
        <p className="text-sm text-zinc-300">Профиль недоступен.</p>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-24 text-white space-y-4">
      {/* Заголовок */}
      <div>
        <h1 className="text-2xl font-semibold mb-1">Профиль</h1>
        <p className="text-sm text-zinc-400">
          Твой аккаунт PANIKA и бонусная программа.
        </p>
      </div>

      {/* Карточка гостя */}
      <div className="bg-zinc-900 rounded-3xl px-4 py-3 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-zinc-800" />
        <div className="flex-1">
          <div className="text-sm font-medium">{displayName}</div>
          {loyalty.phone ? (
            <div className="text-xs text-zinc-400 mt-0.5">
              Телефон: {loyalty.phone}
            </div>
          ) : (
            <div className="text-xs text-zinc-500 mt-0.5">
              Телефон не привязан
            </div>
          )}
        </div>
        <button
          onClick={handleEditPhone}
          className="text-xs font-medium text-sky-400 hover:text-sky-300 active:text-sky-200"
        >
          {loyalty.phone ? "Изменить" : "Добавить"} телефон
        </button>
      </div>

      {/* Форма телефона (инлайн) */}
      {isEditingPhone && (
        <div className="bg-zinc-900 rounded-3xl px-4 py-3 space-y-2">
          <p className="text-xs text-zinc-300">
            Введи номер телефона, который используешь при записи в барбершоп.
          </p>
          <div className="flex gap-2">
            <input
              type="tel"
              placeholder="+7 999 123-45-67"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              className="flex-1 rounded-2xl bg-zinc-950 border border-zinc-700 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
            />
          </div>
          <div className="flex gap-2 justify-end pt-1">
            <button
              onClick={handleCancelPhone}
              className="px-3 py-1.5 rounded-2xl text-xs text-zinc-300 bg-zinc-800"
            >
              Отмена
            </button>
            <button
              onClick={handleSavePhone}
              className="px-3 py-1.5 rounded-2xl text-xs font-semibold bg-sky-500 text-black active:bg-sky-400"
            >
              Сохранить
            </button>
          </div>
        </div>
      )}

      {/* Бонусный счёт */}
      <div className="bg-zinc-900 rounded-3xl px-4 py-4 space-y-2">
        <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">
          Бонусный счёт
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-semibold">{loyalty.balance}</div>
          <div className="text-xs text-zinc-400">бонусов</div>
        </div>
        <div className="text-xs text-zinc-400">
          Уровень:{" "}
          <span className="font-semibold lowercase">{loyalty.level}</span>
        </div>
        <div className="text-xs text-zinc-500">
          С каждого визита начисляется 5% кешбэка. За первое посещение — 50%.
        </div>

        {/* бейджи статусов */}
        <div className="flex flex-wrap gap-2 mt-3">
          {loyalty.firstVisitCashbackAvailable && !loyalty.firstVisitCashbackUsed && (
            <span className="inline-flex items-center rounded-2xl bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-300">
              50% кешбэк за первое посещение активен
            </span>
          )}

          {loyalty.reviewBonusAvailable && (
            <span className="inline-flex items-center rounded-2xl bg-violet-500/10 px-3 py-1 text-[11px] text-violet-300">
              20% скидка за отзыв доступна
            </span>
          )}

          {loyalty.canUsePoints && (
            <span className="inline-flex items-center rounded-2xl bg-sky-500/10 px-3 py-1 text-[11px] text-sky-300">
              Можно оплатить до 20% чека баллами
            </span>
          )}
        </div>
      </div>

      {/* Ближайшая запись */}
      <div className="bg-zinc-900 rounded-3xl px-4 py-4 space-y-1">
        <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">
          Ближайшая запись
        </div>
        {loyalty.nextRecord ? (
          <>
            <div className="text-sm text-zinc-200 font-medium">
              {loyalty.nextRecord.masterName}
            </div>
            <div className="text-xs text-zinc-400">
              {loyalty.nextRecord.serviceName}
            </div>
            <div className="text-sm text-zinc-200 mt-1">
              {new Date(loyalty.nextRecord.datetime).toLocaleString("ru-RU", {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </>
        ) : (
          <p className="text-sm text-zinc-400">
            Пока записей нет. Запишись к мастеру на вкладке{" "}
            <span className="font-semibold">«Мастера»</span>.
          </p>
        )}
      </div>

      {/* Как работают бонусы (кратко) */}
      <div className="bg-zinc-900 rounded-3xl px-4 py-4 space-y-1">
        <div className="text-xs font-semibold text-zinc-200">
          Как работает бонусная система
        </div>
        <ul className="text-xs text-zinc-400 space-y-1.5">
          <li>• Первое посещение — 50% кешбэка от суммы чека.</li>
          <li>• Каждое следующее посещение — 5% кешбэка.</li>
          <li>• За отзыв в 2ГИС или Яндекс.Картах — скидка 20% на следующий визит.</li>
          <li>• Можно списывать до 20% чека бонусами, скидки и баллы можно совмещать.</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileScreen;
