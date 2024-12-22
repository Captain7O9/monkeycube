import os

from dotenv import load_dotenv
from fastapi import FastAPI

# Load the .env file
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_success = load_dotenv(dotenv_path)
print(f"Loading .env file from {dotenv_path}: {load_success}")

import server.api as api

app = FastAPI()
app.include_router(api.router)
