import React from 'react';

type Barber = {
  id: string;
  name: string;
  level: string;
  experience: string;
  tags: string[];
  nextSlot: string;
};

const barbers: Barber[] = [
  {
    id: 'amir',
    name: 'Амир',
    level: 'Топ-барбер',
    experience: '5 лет опыта',
    tags: ['Фейд', 'Коррекция бороды', 'Бритьё опаской'],
    nextSlot: 'Сегодня · 18:30',
  },
  {
    id: 'ivan',
    name: 'Иван',
    level: 'Барбер',
    experience: '3 года опыта',
    tags: ['Классика', 'Укладка', 'Детские стрижки'],
    nextSlot: 'Сегодня · 20:00',
  },
  {
    id: 'rustam',
    name: 'Рустам',
    level: 'Барбер',
    experience: '4 года опыта',
    tags: ['Фейд', 'Топорики', 'Борода'],
    nextSlot: 'Завтра · 12:00',
  },
];

export const BarbersScreen: React.FC = () => {
  const handleBook = (barber: Barber) => {
    // тут позже будет логика записи (вызов API / открытие шага выбора времени)
    console.log('Запись к барберу:', barber.name);
  };

  return (
    <div className="space-y-5 pb-4">
      <div>
        <h2 className="text-lg font-semibold">Мастера PANICA</h2>
        <p className="mt-1 text-sm text-neutral-400">
          Выбери своего барбера и запишись онлайн.
        </p>
      </div>

      <div className="space-y-4">
        {barbers.map((barber) => (
          <article
            key={barber.id}
            className="flex gap-4 rounded-3xl bg-neutral-900 px-4 py-4"
          >
            <div className="mt-1 h-14 w-14 flex-shrink-0 rounded-full bg-neutral-800" />

            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold">{barber.name}</div>
                  <div className="text-xs text-neutral-400">
                    {barber.level} · {barber.experience}
                  </div>
                </div>
                <div className="text-right text-[11px] text-neutral-400">
                  ближайшая запись
                  <div className="text-xs font-semibold text-neutral-100">
                    {barber.nextSlot}
                  </div>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {barber.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-800 px-2 py-0.5 text-[11px] text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleBook(barber)}
                className="mt-3 w-full rounded-full bg-white py-2 text-sm font-semibold text-black"
              >
                Записаться
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
