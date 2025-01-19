from time import time as epoch_time
from typing import Annotated

from pydantic import BaseModel, Field, BeforeValidator

from server.api.utils import get_password_hash

Password = Annotated[str, BeforeValidator(get_password_hash)]


class TimeCreate(BaseModel):
    date: int = Field(default_factory=lambda: int(epoch_time() * 1000))
    time: int
    event: str
    plus_two: bool = False
    dnf: bool = False


class TimeUpdate(BaseModel):
    time: int = None
    event: str = None
    plus_two: bool = False
    dnf: bool = False


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
