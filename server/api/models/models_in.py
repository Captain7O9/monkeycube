from time import time as epoch_time
from typing import Annotated

from pydantic import BaseModel, Field, BeforeValidator

from server.api.utils import get_password_hash

Password = Annotated[str, BeforeValidator(get_password_hash)]


class TimeCreate(BaseModel):
    date: int = Field(default_factory=lambda: int(epoch_time()))
    time: int
    event: str


class TimeUpdate(BaseModel):
    time: int = None
    event: str = None


class UserCreate(BaseModel):
    username: str
    full_name: str
    email: str
    password: Password


class UserUpdate(BaseModel):
    username: str = None
    full_name: str = None
    email: str = None
    password: Password = None
