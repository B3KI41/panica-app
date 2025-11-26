import React from 'react';

type Props = {
  goToBarbers: () => void;
};

const actions = [
  {
    id: 'book',
    title: 'Записаться сейчас',
    subtitle: 'Ближайшее свободное время',
    primary: true,
  },
  {
    id: 'promo',
    title: 'Акции и скидки',
    subtitle: 'Спецпредложения PANICA',
  },
  {
    id: 'refer',
    title: 'Реферальный бонус',
    subtitle: 'Приведи друга',
  },
] as const;

export const HomeScreen: React.FC<Props> = ({ goToBarbers }) => {
  return (
    <div className="space-y-6">
      {/* блок кнопок как в DDX */}
      <div className="grid grid-cols-3 gap-3 text-xs">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.id === 'book' ? goToBarbers : undefined}
            className={
              'flex flex-col justify-between rounded-2xl px-3 py-3 text-left ' +
              (action.primary
                ? 'bg-white text-black font-semibold'
                : 'bg-neutral-900 text-neutral-100')
            }
          >
            <span className="text-[11px] leading-tight">{action.title}</span>
            <span className="mt-1 text-[10px] text-neutral-400">
              {action.subtitle}
            </span>
          </button>
        ))}
      </div>

      {/* большая карточка "мы стрижём и бреем" */}
      <section className="rounded-3xl bg-neutral-900/90 px-5 py-5">
        <div className="text-xs uppercase tracking-[0.2em] text-neutral-400">
          МЫ СТРИЖЁМ И БРЕЕМ
        </div>
        <div className="mt-2 text-lg font-semibold">
          Ежедневно с 09:00 до 21:00
        </div>
        <p className="mt-2 text-sm text-neutral-300">
          Запишись онлайн за пару кликов, без звонков и ожидания.
        </p>

        <button
          onClick={goToBarbers}
          className="mt-4 w-full rounded-full bg-white py-2 text-sm font-semibold text-black"
        >
          Записаться
        </button>
      </section>

      {/* блок с QR и бонусами */}
      <section className="space-y-2 text-sm">
        <div className="text-base font-semibold">Твой QR PANICA</div>
        <p className="text-neutral-300">
          Покажи код на ресепшене, чтобы начислить бонусы.
        </p>

        <div className="mt-1 flex items-center justify-between rounded-2xl bg-neutral-900 px-4 py-3 text-xs">
          <div>
            <div className="text-neutral-400">Баланс</div>
            <div className="text-sm font-semibold">
              350 бонусов · уровень basic
            </div>
          </div>
          <button className="rounded-full border border-neutral-700 px-4 py-1 text-xs">
            Показать QR
          </button>
        </div>
      </section>
    </div>
  );
};
