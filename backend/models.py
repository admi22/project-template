from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional


class City(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)

    # One-to-many relationship with heroes
    heroes: List["Hero"] = Relationship(back_populates="city")


class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    age: int | None = Field(default=None, index=True)
    secret_name: str

    # Many-to-one relationship with City
    city_id: int | None = Field(default=None, foreign_key="city.id")
    city: Optional[City] = Relationship(back_populates="heroes")
