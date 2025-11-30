# backend/schemas.py
from pydantic import BaseModel
from typing import Optional, Literal


LoyaltyLevel = Literal["basic", "silver", "gold", "vip"]


class NextRecordInfo(BaseModel):
    datetime: str
    masterName: str
    serviceName: str


class LoyaltyInfo(BaseModel):
    telegramId: str
    phone: Optional[str] = None
    name: str

    level: LoyaltyLevel
    balance: int

    totalVisits: int
    firstVisitCashbackAvailable: bool
    firstVisitCashbackUsed: bool
    reviewBonusAvailable: bool
    canUsePoints: bool

    nextRecord: Optional[NextRecordInfo] = None


class LinkPhoneRequest(BaseModel):
    telegramId: str
    phone: str
