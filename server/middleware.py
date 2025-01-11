from typing import Optional

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware


async def get_token_from_cookie(request: Request) -> Optional[str]:
    token = request.cookies.get("access_token")
    return token


class AuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)

    async def dispatch(self, request: Request, call_next):
        token = await get_token_from_cookie(request)
        if token:
            request.headers.__dict__["_list"].append(
                (b"authorization", f"Bearer {token}".encode())
            )

        response = await call_next(request)
        return response
