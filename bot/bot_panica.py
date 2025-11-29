import logging
import os

from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

# 🔑 Токен бота
# Либо пропиши прямо строкой, либо используй переменную окружения PANICA_BOT_TOKEN
TOKEN = os.getenv("PANICA_BOT_TOKEN", "8392271992:AAEPAQJkXfhSqGYzUyxhAPpZQXoLsjPRg5U")

# 🌐 URL твоего фронта на Render
WEBAPP_URL = "https://panica-app.onrender.com/"  # замени на свой реальный URL

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Команда /start — показывает кнопку с WebApp."""
    keyboard = [
        [
            InlineKeyboardButton(
                text="Открыть приложение PANICA",
                web_app=WebAppInfo(url=WEBAPP_URL),
            )
        ]
    ]

    await update.message.reply_text(
        "Привет! Это бот барбершопа PANICA 💈\n"
        "Нажми кнопку ниже, чтобы открыть приложение.",
        reply_markup=InlineKeyboardMarkup(keyboard),
    )


def main() -> None:
    """Точка входа в бота."""
    token = TOKEN
    if not token or token == "ТОКЕН_ТУТ":
        raise RuntimeError("Не указан токен бота. Впиши его в TOKEN или PANICA_BOT_TOKEN")

    application = ApplicationBuilder().token(token).build()

    # Регистрируем команду /start
    application.add_handler(CommandHandler("start", start))

    # Запускаем long polling
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
