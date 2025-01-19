from time import time as epoch_time
from typing import Annotated, Optional

from pydantic import BaseModel, BeforeValidator, Field

PyObjectId = Annotated[str, BeforeValidator(str)]


class Model(BaseModel):
    class Config:
        arbitrary_types_allowed = True
        populate_by_name = True


class Time(Model):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    date: int = Field(default_factory=lambda: int(epoch_time()))
    time: int
    user_id: Optional[PyObjectId] = None
    event: str
    plus_two: bool
    dnf: bool


class User(Model):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    username: str
    full_name: str
    email: str
    disabled: bool = False


class UserInDB(User):
    hashed_password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class DefaultResponse(BaseModel):
    message: str
