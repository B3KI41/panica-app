from typing import Dict
from schemas import LoyaltyInfo


# Простое in-memory хранилище профилей:
_profiles: Dict[str, LoyaltyInfo] = {}


def _create_default_profile(telegram_id: str, phone: str | None) -> LoyaltyInfo:
    return LoyaltyInfo(
        telegramId=telegram_id,
        phone=phone,
        name="Гость PANIKA",
        level="basic",
        balance=350,
        totalVisits=1,
        firstVisitCashbackAvailable=True,
        firstVisitCashbackUsed=False,
        reviewBonusAvailable=False,
        canUsePoints=True,
        nextRecord=None,
    )


def get_or_create_profile(telegram_id: str, phone: str | None) -> LoyaltyInfo:
    if telegram_id in _profiles:
        prof = _profiles[telegram_id]
        # если передали телефон и его не было — дополняем
        if phone and not prof.phone:
            prof.phone = phone
        return prof

    prof = _create_default_profile(telegram_id, phone)
    _profiles[telegram_id] = prof
    return prof


def link_phone(telegram_id: str, phone: str) -> LoyaltyInfo:
    prof = get_or_create_profile(telegram_id, phone)
    prof.phone = phone
    _profiles[telegram_id] = prof
    return prof
