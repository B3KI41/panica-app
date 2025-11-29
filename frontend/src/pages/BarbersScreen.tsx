// src/pages/BarbersScreen.tsx
import React from "react";
import { useTelegram } from "../context/TelegramContext";

type Barber = {
  id: string;
  name: string;
  level: string;
  experience: string;
  tags: string[];
  bookingUrl: string;
};

const barbers: Barber[] = [
  {
    id: "ashot",
    name: "Ашот",
    level: "Топ-барбер",
    experience: "5 лет опыта",
    tags: ["Фейд", "Коррекция бороды", "Бритьё опаской"],
    bookingUrl:
      "https://yandex.ru/maps/org/panika/177310884730/?booking%5Bpage%5D=services&booking%5Bpermalink%5D=177310884730&booking%5BresourceId%5D=4616199&ll=38.439989%2C55.855452&z=16",
  },
  {
    id: "ali",
    name: "Али",
    level: "Барбер",
    experience: "3 года опыта",
    tags: ["Классика", "Укладка", "Борода"],
    bookingUrl:
      "https://yandex.ru/maps/org/panika/177310884730/?booking%5Bpage%5D=services&booking%5Bpermalink%5D=177310884730&booking%5BresourceId%5D=4631127&ll=38.439989%2C55.855452&z=16",
  },
];

const BarbersScreen: React.FC = () => {
  const { tg } = useTelegram();

  const handleBook = (url: string) => {
    if (!url) return;

    // Нормальный путь для Telegram WebApp
    if (tg && typeof tg.openLink === "function") {
      tg.openLink(url);
    } else {
      // Фоллбэк на обычный браузер
      window.open(url, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <div className="w-full max-w-md px-4 pt-24 pb-6">
        {/* Заголовок */}
        <section className="mb-4">
          <h1 className="text-xl font-semibold mb-1">Мастера PANIKA</h1>
          <p className="text-sm text-neutral-400">
            Выбери своего барбера и запишись онлайн через Яндекс.
          </p>
        </section>

        {/* Список мастеров */}
        <section className="space-y-4">
          {barbers.map((barber) => (
            <div
              key={barber.id}
              className="rounded-3xl bg-neutral-900/90 px-4 py-4 flex flex-col gap-3"
            >
              <div className="flex gap-3">
                {/* Аватар-заглушка */}
                <div className="w-12 h-12 rounded-full bg-neutral-800" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm font-semibold">
                        {barber.name}
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        {barber.level} · {barber.experience}
                      </div>
                    </div>
                    {/* Можно позже подставлять реальное ближайшее время */}
                    <div className="text-[11px] text-right text-neutral-400">
                      запись через
                      <div className="text-xs text-white font-semibold">
                        Яндекс
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {barber.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-neutral-800 text-[11px] text-neutral-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleBook(barber.bookingUrl)}
                className="w-full rounded-full bg-white text-black text-sm font-semibold py-2 mt-2"
              >
                Записаться
              </button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default BarbersScreen;
