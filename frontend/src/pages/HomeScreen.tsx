// src/pages/HomeScreen.tsx
import React from "react";
import { useTelegram } from "../context/TelegramContext";

type ActionCard = {
  id: "book" | "promo" | "refer";
  title: string;
  subtitle: string;
  primary?: boolean;
};

type HomeScreenProps = {
  goToBarbers?: () => void;
};

const actions: ActionCard[] = [
  {
    id: "book",
    title: "Записаться сейчас",
    subtitle: "Ближайшее свободное время",
    primary: true,
  },
  {
    id: "promo",
    title: "Акции и скидки",
    subtitle: "Спецпредложения PANIKA",
  },
  {
    id: "refer",
    title: "Реферальный бонус",
    subtitle: "Приведи друга",
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ goToBarbers }) => {
  const { user } = useTelegram();

  const handleActionClick = (action: ActionCard) => {
    console.log("Action click:", action.id);

    if (action.id === "book" && goToBarbers) {
      goToBarbers();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      {/* pt-24 чтобы контент отъехал вниз от шапки Layout */}
      <div className="w-full max-w-md px-4 pt-24 pb-6">
        {/* Верхние action-карточки */}
        <section className="mb-8">
          <div className="grid grid-cols-3 gap-2 text-xs">
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleActionClick(action)}
                className={`flex flex-col justify-center rounded-2xl px-3 py-3 text-left transition
                  ${
                    action.primary
                      ? "bg-white text-black"
                      : "bg-neutral-900 text-white"
                  }`}
              >
                <span className="font-semibold leading-snug">
                  {action.title}
                </span>
                <span
                  className={`mt-1 text-[10px] leading-snug ${
                    action.primary ? "text-neutral-700" : "text-neutral-400"
                  }`}
                >
                  {action.subtitle}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Блок с режимом работы */}
        <section className="mb-8">
          <div className="rounded-3xl bg-neutral-900/90 px-5 py-5 shadow-lg shadow-black/60">
            <div className="text-[10px] tracking-[0.18em] text-neutral-400 mb-2">
              МЫ СТРИЖЁМ И БРЕЕМ
            </div>
            <div className="text-lg font-semibold mb-2">
              Ежедневно с 09:00 до 21:00
            </div>
            <p className="text-sm text-neutral-300 mb-5">
              Запишись онлайн за пару кликов, без звонков и ожидания.
            </p>

            <button
              disabled
              className="w-full rounded-full bg-neutral-800/80 py-2 text-sm font-semibold text-neutral-500 cursor-default"
            >
              Записаться
            </button>
          </div>
        </section>

        {/* Блок с QR-кодом PANIKA */}
        <section className="mb-4">
          <div className="rounded-3xl bg-black/10 px-1 py-2">
            <div className="flex justify-between items-start gap-4">
              <div className="text-xs">
                <div className="font-semibold mb-1">Твой QR PANIKA</div>
                <p className="text-[11px] text-neutral-400">
                  Покажи код на ресепшене, чтобы начислить бонусы.
                </p>
                <p className="mt-2 text-[11px] text-neutral-300">
                  Баланс: <b>350 бонусов</b> · уровень <b>basic</b>
                </p>
                {user && (
                  <p className="mt-1 text-[10px] text-neutral-500">
                    Аккаунт Telegram: @{user.username}
                  </p>
                )}
              </div>

              <button className="rounded-2xl border border-neutral-700 px-3 py-2 text-[11px] font-medium">
                Показать QR
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeScreen;
