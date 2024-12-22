from typing import Annotated
from server.api.types import *

from fastapi import APIRouter, Depends

from server.api.routers.authentication import get_current_active_user

router = APIRouter(prefix="/users")


@router.get("/me")
async def read_user_me(current_user: Annotated[User, Depends(get_current_active_user)]):
    return current_user


@router.get("/me/items")
async def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    return [{"item_id": "Foo", "owner": current_user.username}]
