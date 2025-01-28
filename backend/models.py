from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional

#################### CITY MODEL ####################

class CityBase(SQLModel):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)


class City(CityBase, table=True): # used for database schema
    # One-to-many relationship with heroes
    heroes: List["Hero"] = Relationship(back_populates="city")


class CityRead(CityBase): # used for API response
    hero_ids: List[int] = []

    @classmethod
    def from_orm(cls, city: City):
        return cls(
            id=city.id,
            name=city.name,
            hero_ids=[hero.id for hero in city.heroes]
        )

#################### HERO MODEL ####################

class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    age: int | None = Field(default=None, index=True)
    secret_name: str

    # Many-to-one relationship with City
    city_id: int | None = Field(default=None, foreign_key="city.id")
    city: Optional[City] = Relationship(back_populates="heroes")
