from time import time as epoch_time
from typing import Annotated

from pydantic import BaseModel, Field, BeforeValidator

from server.api.utils import get_password_hash

Password = Annotated[str, BeforeValidator(get_password_hash)]


class TimeIn(BaseModel):
    date: int = Field(default_factory=lambda: int(epoch_time()))
    time: int
    event: str


class UserIn(BaseModel):
    username: str
    full_name: str
    email: str
    password: Password
