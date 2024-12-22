from fastapi import APIRouter

from .routers import users, authentication

router = APIRouter(prefix="/api")
router.include_router(users.router)
router.include_router(authentication.router)
