// src/pages/BarbersScreen.tsx
import React from "react";
import { useTelegram } from "../context/TelegramContext";

type Barber = {
  id: string;
  name: string;
  role: string;
  nextSlotLabel: string;
  description: string;
  tags: string[];
  avatar: string;
  bookingUrl: string;
};

const barbers: Barber[] = [
  {
    id: "ashot",
    name: "Ашот",
    role: "Топ-барбер · 5 лет опыта",
    nextSlotLabel: "Сегодня · 18:30",
    description:
      "Специализируется на фейдах, аккуратной бороде и аккуратной классике.",
    tags: ["Фейд", "Коррекция бороды", "Бритьё опаской"],
    avatar: "/images/barbers/ashot.jpg",
    bookingUrl:
      "https://n1788210.yclients.com/company/1589523/personal/select-services?o=m4616199",
  },
  {
    id: "ali",
    name: "Али",
    role: "Барбер · 3 года опыта",
    nextSlotLabel: "Сегодня · 20:00",
    description:
      "Чёткие линии, укладки и современные мужские стрижки.",
    tags: ["Классика", "Укладка", "Борода"],
    avatar: "/images/barbers/ali.jpg",
    bookingUrl:
      "https://n1788210.yclients.com/company/1589523/personal/select-services?o=m4631127",
  },
];

const BarbersScreen: React.FC = () => {
  const { tg } = useTelegram(); // берем tg из контекста

  const handleBookClick = (barber: Barber) => {
    if (tg && typeof tg.openLink === "function") {
      // мини-аппа в Telegram
      tg.openLink(barber.bookingUrl);
    } else {
      // запасной вариант в браузере
      window.open(barber.bookingUrl, "_blank");
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок и описание */}
      <section className="mt-4">
        <h1 className="text-2xl font-semibold">Мастера PANIKA</h1>
        <p className="mt-2 text-sm text-neutral-400">
          Выбери своего барбера и запишись онлайн.
          Запись открывается в&nbsp;Яндекс.Картах.
        </p>
      </section>

      {/* Карточки барберов */}
      <section className="space-y-4">
        {barbers.map((barber) => (
          <article
            key={barber.id}
            className="rounded-3xl bg-neutral-900/80 border border-neutral-800 px-4 py-4"
          >
            {/* Верхняя линия: аватар + имя/роль + ближайшая запись */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-neutral-800 overflow-hidden">
                  <img
                    src={barber.avatar}
                    alt={barber.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-base font-semibold truncate">
                      {barber.name}
                    </p>
                    <p className="text-xs text-neutral-400 truncate">
                      {barber.role}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-neutral-500">
                      ближайшая запись
                    </p>
                    <p className="text-xs font-semibold">
                      {barber.nextSlotLabel}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Описание */}
            <p className="mt-3 text-sm text-neutral-200">
              {barber.description}
            </p>

            {/* Теги услуг */}
            <div className="mt-3 flex flex-wrap gap-2">
              {barber.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Кнопка записи */}
            <button
              onClick={() => handleBookClick(barber)}
              className="mt-4 w-full rounded-full bg-white py-3 text-sm font-semibold text-black active:scale-[0.98] transition-transform"
            >
              Записаться
            </button>
          </article>
        ))}
      </section>
    </div>
  );
};

// чтобы и default-импорт, и именованный работали
export default BarbersScreen;
export { BarbersScreen };
