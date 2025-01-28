from fastapi import APIRouter, HTTPException, Query
from typing import Annotated, List
from sqlmodel import select
from sqlalchemy.orm import selectinload

from backend.dependencies import SessionDep
from backend.models import City, CityRead

router = APIRouter(
    prefix="/cities",
    tags=["cities"],
    dependencies=[],
)

@router.post("/", response_model=CityRead)
def create_city(city: City, session: SessionDep):
    """
    Create a new city. The `id` field is optional and will be assigned by the database.
    """
    session.add(city)
    session.commit()
    session.refresh(city)

    # Return CityRead schema
    return CityRead.from_orm(city)


@router.get("/", response_model=List[CityRead])
def read_cities(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    """
    Fetch a list of cities with optional pagination (offset and limit).
    Each city includes a list of related hero IDs.
    """
    # Eagerly load related heroes
    cities = session.exec(
        select(City).options(selectinload(City.heroes)).offset(offset).limit(limit)
    ).all()

    # Convert to CityRead objects to include hero_ids
    return [CityRead.from_orm(city) for city in cities]


@router.get("/{city_id}", response_model=CityRead)
def read_city(city_id: int, session: SessionDep):
    """
    Fetch a single city by ID. The city includes a list of related hero IDs.
    """
    city = session.get(City, city_id)
    if not city:
        raise HTTPException(status_code=404, detail="City not found")

    # Use CityRead to include hero_ids
    return CityRead.from_orm(city)


@router.patch("/{city_id}", response_model=CityRead)
def update_city(city_id: int, city_update: City, session: SessionDep):
    """
    Update an existing city by ID. Only the provided fields will be updated.
    """
    city_db = session.get(City, city_id)
    if not city_db:
        raise HTTPException(status_code=404, detail="City not found")

    # Update fields dynamically using the provided City model
    city_data = city_update.dict(exclude_unset=True)
    for key, value in city_data.items():
        setattr(city_db, key, value)

    session.add(city_db)
    session.commit()
    session.refresh(city_db)

    # Return CityRead schema
    return CityRead.from_orm(city_db)


@router.delete("/{city_id}", response_model=CityRead)
def delete_city(city_id: int, session: SessionDep):
    """
    Delete a city by ID.
    """
    city = session.get(City, city_id)
    if not city:
        raise HTTPException(status_code=404, detail="City not found")

    session.delete(city)
    session.commit()

    # Return the deleted city's ID and name for confirmation
    return CityRead.from_orm(city)
