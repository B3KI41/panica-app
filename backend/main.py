from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

from schemas import LoyaltyInfo, LinkPhoneRequest
from service import get_or_create_profile, link_phone

app = FastAPI(title="PANIKA Loyalty API")

# Разрешаем фронту обращаться (при dev можно открыть на всё)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # потом сузим под домен фронтенда
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/loyalty/profile", response_model=LoyaltyInfo)
async def get_loyalty_profile(
    telegram_id: str = Query(..., alias="telegramId"),
    phone: Optional[str] = Query(None),
):
    """
    Профиль гостя по telegramId (+опционально phone).
    Фронт потом будет дергать:
    GET /loyalty/profile?telegramId=123456&phone=+7999...
    """
    profile = get_or_create_profile(telegram_id, phone)
    return profile


@app.post("/loyalty/link-phone", response_model=LoyaltyInfo)
async def api_link_phone(payload: LinkPhoneRequest):
    """
    Привязка телефона к telegramId.
    Фронт дергает POST /loyalty/link-phone с JSON:
    { "telegramId": "...", "phone": "+7..." }
    """
    profile = link_phone(payload.telegramId, payload.phone)
    return profile
