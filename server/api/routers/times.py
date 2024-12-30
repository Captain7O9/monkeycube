from bson import ObjectId
from fastapi import APIRouter, Depends, status, HTTPException, Body

from .authentication import get_current_active_user, verify_user_logged_in
from ..database import db
from ..models import *

router = APIRouter(prefix="/times")


@router.post(
    "",
    response_model=Time,
    response_description="Time entry created successfully",
    status_code=status.HTTP_201_CREATED,
)
def create_time(
    current_user: Annotated[User, Depends(get_current_active_user)],
    time: TimeIn = Body(example={"time": 12345, "event": "3x3"}),
) -> Time:
    """
    Create a new time entry for the current user.
    """
    verify_user_logged_in(current_user)

    new_time = db["times"].insert_one(
        {
            **time.model_dump(by_alias=True, exclude={"id"}),
            "user_id": current_user.id,
        }
    )
    created_time = db["times"].find_one({"_id": new_time.inserted_id})
    return created_time


@router.delete(
    "/{time_id}",
    response_model=DefaultResponse,
    status_code=status.HTTP_200_OK,
)
def delete_time(
    current_user: Annotated[User, Depends(get_current_active_user)],
    time_id: str,
) -> DefaultResponse:
    """
    Delete a time entry. Only the user that created the time entry can delete it.
    """
    verify_user_logged_in(current_user)
    time = db["times"].find_one({"_id": ObjectId(time_id)})

    if not time:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Time entry not found"
        )
    if time["user_id"] != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to delete this time entry",
        )

    result = db["times"].delete_one({"_id": ObjectId(time_id)})

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Time entry not found"
        )

    return DefaultResponse(message="Time entry deleted successfully")
