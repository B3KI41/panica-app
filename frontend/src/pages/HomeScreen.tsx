// src/pages/HomeScreen.tsx

import React, { useState } from "react";
import QRCode from "react-qr-code";
import { useTelegram } from "../context/TelegramContext";
import { useLoyalty } from "../context/LoyaltyContext";

type HomeScreenProps = {
  goToBarbers: () => void;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ goToBarbers }) => {
  const { user } = useTelegram();
  const { loyalty } = useLoyalty();
  const [isQrOpen, setIsQrOpen] = useState(false);

  const telegramId = user?.id ? String(user.id) : "unknown";

  // Что зашифровываем в QR.
  // Договоримся, что формат: PANIKA:<telegramId>
  const qrValue = `PANIKA:${telegramId}`;

  const balanceText =
    loyalty?.balance != null ? `${loyalty.balance} бонусов` : "—";
  const levelText = loyalty?.level ?? "basic";

  return (
    <>
      <div className="px-4 pt-6 pb-24 text-white space-y-6">
        {/* Заголовок */}
        <header className="flex flex-col items-center text-center gap-2 mt-2">
          <div className="text-[11px] tracking-[0.3em] text-zinc-500 uppercase">
            Barbershop
          </div>
          <div className="text-[32px] tracking-[0.38em] font-semibold">
            P A N I K A
          </div>
        </header>

        {/* Верхние карточки */}
        <section className="flex gap-3 overflow-x-auto pb-1">
          {/* Записаться сейчас */}
          <button
            className="shrink-0 w-[160px] bg-white text-black rounded-3xl px-4 py-3 text-left space-y-1 active:scale-[0.99] transition"
            onClick={goToBarbers}
          >
            <div className="text-sm font-semibold leading-tight">
              Записаться
              <br />
              сейчас
            </div>
            <div className="text-[11px] text-zinc-500">
              Ближайшее свободное время
            </div>
          </button>

          {/* Акции */}
          <div className="shrink-0 w-[160px] bg-zinc-900 rounded-3xl px-4 py-3 text-left space-y-1">
            <div className="text-sm font-semibold leading-tight">
              Акции и
              <br />
              скидки
            </div>
            <div className="text-[11px] text-zinc-500">
              Спецпредложения PANIKA
            </div>
          </div>

          {/* Реферальный бонус */}
          <div className="shrink-0 w-[160px] bg-zinc-900 rounded-3xl px-4 py-3 text-left space-y-1">
            <div className="text-sm font-semibold leading-tight">
              Реферальный
              <br />
              бонус
            </div>
            <div className="text-[11px] text-zinc-500">Приведи друга</div>
          </div>
        </section>

        {/* Карточка расписания */}
        <section className="bg-zinc-900 rounded-[32px] px-5 py-5 space-y-3">
          <div className="text-[11px] tracking-[0.25em] uppercase text-zinc-500">
            Мы стрижём и бреем
          </div>
          <div className="text-xl font-semibold">
            Ежедневно с 09:00 до 21:00
          </div>
          <p className="text-sm text-zinc-300">
            Запишись онлайн за пару кликов, без звонков и ожидания.
          </p>

          <button
            className="mt-2 w-full bg-zinc-800 text-zinc-200 rounded-2xl py-3 text-sm font-medium active:scale-[0.98]"
            onClick={goToBarbers}
          >
            Записаться к мастеру
          </button>
        </section>

        {/* Карточка QR и бонусов */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-sm font-semibold">Твой QR PANIKA</div>
              <p className="text-xs text-zinc-400 max-w-[260px]">
                Покажи код на ресепшене, чтобы начислить или списать бонусы.
              </p>
            </div>
            <button
              onClick={() => setIsQrOpen(true)}
              className="shrink-0 rounded-2xl border border-zinc-600 px-4 py-2 text-xs font-semibold active:scale-[0.97]"
            >
              Показать
              <br />
              QR
            </button>
          </div>

          <div className="bg-zinc-900 rounded-3xl px-4 py-4 space-y-1">
            <div className="text-xs text-zinc-400">
              Баланс:{" "}
              <span className="font-semibold text-white">{balanceText}</span>
            </div>
            <div className="text-xs text-zinc-400">
              Уровень:{" "}
              <span className="font-semibold lowercase">{levelText}</span>
            </div>
          </div>
        </section>
      </div>

      {/* Модалка с QR-кодом */}
      {isQrOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setIsQrOpen(false)}
        >
          <div
            className="bg-zinc-950 rounded-3xl px-6 py-5 w-[280px] text-center space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-sm font-semibold">Твой QR PANIKA</div>
            <p className="text-xs text-zinc-400">
              Покажи этот код на ресепшене, чтобы начислить или списать
              бонусы.
            </p>

            <div className="bg-white rounded-2xl p-3 mx-auto mt-1">
              <QRCode value={qrValue} size={180} />
            </div>

            <p className="text-[11px] text-zinc-500">
              Внутри зашифрован твой Telegram ID. Позже мы свяжем его с
              номером телефона и визитами из YCLIENTS.
            </p>

            <button
              onClick={() => setIsQrOpen(false)}
              className="mt-1 w-full rounded-2xl bg-zinc-800 py-2 text-xs font-medium text-zinc-200 active:bg-zinc-700"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeScreen;
