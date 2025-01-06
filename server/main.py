import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Load the .env file
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_success = load_dotenv(dotenv_path)
print(f"Loading .env file from {dotenv_path}: {load_success}")

import server.api as api

ALLOWED_ORIGINS = [origin for origin in os.getenv("ALLOWED_ORIGINS").split(" ")]
print(f"{ALLOWED_ORIGINS=}")

print("See docs at http://localhost:8000/docs")

app = FastAPI()
app.include_router(api.router)

# TODO: Make sure CORS is set up
# noinspection PyTypeChecker
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
