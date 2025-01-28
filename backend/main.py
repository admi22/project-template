"""
Main FastAPI application entry point.
Handles database initialization and API routing.
"""
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Session

from .dependencies import create_db_and_tables, engine
from .routers import heroes
from backend.sample_data.sample_data import load_sample_data


async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """
    Manages application lifecycle events.
    Creates database tables on startup and cleans up on shutdown.
    """
    try:
        create_db_and_tables()  # Create tables
        load_sample_data()  # Load sample data
        yield
    finally:
        SQLModel.metadata.drop_all(engine)  # Clean up the database on shutdown


app = FastAPI(
    title="Template API",
    description="API for demonstrating FastAPI with SQLModel",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS
origins = ["http://localhost", "http://localhost:8000", "http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(heroes.router)

