from bson import ObjectId
from fastapi import APIRouter, HTTPException, status, Body, Depends

from .authentication import get_current_active_user
from ..database import db, get_user
from ..models import *
from ..utils import verify_email, verify_user_logged_in

router = APIRouter(prefix="/users")


@router.get(
    "",
    response_model=User,
)
def get_user_info(
    current_user: Annotated[User, Depends(get_current_active_user)]
) -> User:
    verify_user_logged_in(current_user)

    user = db["users"].find_one({"_id": ObjectId(current_user.id)})
    return user


@router.post(
    "",
    response_model=User,
    response_description="User created successfully",
    status_code=status.HTTP_201_CREATED,
)
def create_user(
    user: UserCreate = Body(
        ...,
        example={
            "username": "johndoe",
            "full_name": "John Doe",
            "email": "johndoe@example.com",
            "password": "password",
        },
    ),
) -> User:
    """
    Create a new user.
    """
    if db["users"].find_one({"username": user.username}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Username already taken"
        )

    verify_email(user.email)
    if db["users"].find_one({"email": user.email}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already taken"
        )

    result = db["users"].insert_one(
        {
            **user.model_dump(exclude={"password"}),
            "disabled": False,
            "hashed_password": user.password,
        }
    )

    created_user = db["users"].find_one({"_id": result.inserted_id})
    return created_user


@router.patch(
    "",
    response_model=User,
    response_description="User modified successfully",
)
def edit_user(
    current_user: Annotated[User, Depends(get_current_active_user)],
    user: UserUpdate = Body(
        ...,
        example={
            "username": "johndoe",
            "full_name": "John Doe",
            "email": "johndoe@example.com",
            "password": "password",
        },
    ),
) -> User:
    verify_user_logged_in(current_user)

    if user.email:
        verify_email(user.email)

    result = db["users"].update_one(
        {"_id": ObjectId(current_user.id)},
        {"$set": user.model_dump(exclude_defaults=True)},
    )

    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_204_NO_CONTENT, headers={"Content-Length": "0"}
        )

    updated_user = db["users"].find_one({"_id": ObjectId(current_user.id)})
    return updated_user


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
