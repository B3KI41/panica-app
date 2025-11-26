import React from 'react';
import { useTelegram } from '../context/TelegramContext';

export const Header: React.FC = () => {
  const { user } = useTelegram();

  return (
    <header className="relative mb-6 pt-6">
      {/* центрированный логотип PANICA */}
      <div className="flex flex-col items-center">
        <div className="text-xs uppercase tracking-[0.35em] text-neutral-400">
          BARBERSHOP
        </div>
        <div className="mt-2 text-3xl font-semibold tracking-[0.35em]">
          PANIKA
        </div>
        {user && (
          <div className="mt-2 text-xs text-neutral-500">
            {user.first_name || user.username}, рады видеть тебя 👋
          </div>
        )}
      </div>

      {/* колокольчик справа сверху */}
      <button className="absolute right-4 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900/80 text-yellow-300">
        🔔
      </button>
    </header>
  );
};
