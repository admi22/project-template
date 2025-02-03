# backend/db/session.py
from sqlmodel import SQLModel, create_engine, Session
from typing import Generator
from fastapi import Depends
from typing import Annotated

# Database setup
sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)

# Create tables in the database
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# Dependency to get the database session
def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session

# Annotated dependency
SessionDep = Annotated[Session, Depends(get_session)]