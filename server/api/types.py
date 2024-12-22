from datetime import datetime

from pydantic import BaseModel


class Time(BaseModel):
    _id: str
    date: datetime
    time: int
    user_id: str


class User(BaseModel):
    _id: str
    username: str
    email: str | None = None
    disabled: bool | None = None


class UserInDB(User):
    hashed_password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
