// src/pages/ProfileScreen.tsx
import React from "react";
import { useTelegram } from "../context/TelegramContext";

const ProfileScreen: React.FC = () => {
  const { user } = useTelegram();

  const fullName =
    (user?.first_name || "") +
    (user?.last_name ? ` ${user.last_name}` : "");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <div className="w-full max-w-md px-4 pt-6 pb-6">
        {/* Заголовок */}
        <section className="mb-6">
          <h1 className="text-xl font-semibold mb-1">Профиль</h1>
          <p className="text-sm text-neutral-400">
            Твой аккаунт PANIKA и бонусы.
          </p>
        </section>

        {/* Карточка пользователя */}
        <section className="mb-6">
          <div className="rounded-3xl bg-neutral-900/90 px-5 py-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-neutral-800" />
            <div className="flex-1">
              <div className="text-sm font-semibold">
                {fullName || "Гость PANIKA"}
              </div>
              {user?.username && (
                <div className="text-xs text-neutral-400">
                  @{user.username}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Бонусы */}
        <section className="mb-6">
          <div className="rounded-3xl bg-neutral-900/90 px-5 py-4">
            <div className="text-xs text-neutral-400 mb-1">Бонусный счёт</div>
            <div className="text-lg font-semibold mb-1">
              350 бонусов
            </div>
            <div className="text-xs text-neutral-400 mb-3">
              Уровень: <span className="font-semibold text-white">basic</span>
            </div>
            <p className="text-xs text-neutral-500">
              Показывай свой QR-код на ресепшене, чтобы начислять бонусы
              за каждую стрижку.
            </p>
          </div>
        </section>

        {/* Ближайшая запись — пока заглушка */}
        <section>
          <div className="rounded-3xl bg-neutral-900/90 px-5 py-4">
            <div className="text-xs text-neutral-400 mb-1">
              Ближайшая запись
            </div>
            <div className="text-sm text-neutral-300">
              Пока записей нет. Запишись к мастеру на вкладке{" "}
              <span className="font-semibold text-white">«Мастера»</span>.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileScreen;
