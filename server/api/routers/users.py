import re

from fastapi import APIRouter, HTTPException, status, Body

from ..database import db, get_user
from ..models import *

router = APIRouter(prefix="/users")


@router.post(
    "",
    response_model=User,
    response_description="User created successfully",
    status_code=status.HTTP_201_CREATED,
)
def create_user(
    user: UserIn = Body(
        example={
            "username": "johndoe",
            "full_name": "John Doe",
            "email": "johndoe@example.com",
            "password": "password",
        }
    ),
) -> User:
    """
    Create a new user.
    """

    # Check if the email is correct
    if not bool(re.fullmatch(r"[^@]+@[^@]+\.[^@]+", user.email)):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid email address"
        )

    new_user = db["users"].insert_one(
        {
            **user.model_dump(exclude={"password"}),
            "disabled": False,
            "hashed_password": user.password,
        }
    )
    created_user = db["users"].find_one({"_id": new_user.inserted_id})

    return created_user


@router.get("/{username}/times")
def list_times_from_user(
    username: str,
) -> list[Time]:
    """
    Returns all times from a user.
    """
    user = get_user({"username": username})

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    times = db["times"].find({"user_id": user.id})

    return [Time(**time) for time in times]
