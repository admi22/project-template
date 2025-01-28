from fastapi import APIRouter, HTTPException, Query
from typing import Annotated
from sqlmodel import select

from backend.dependencies import SessionDep
from backend.models.hero import Hero

router = APIRouter(
    prefix="/heroes",
    tags=["heroes"],
    dependencies=[],
)

@router.post("/", response_model=Hero)
def create_hero(hero: Hero, session: SessionDep):
    """
    Create a new hero. The `id` field is optional and will be assigned by the database.
    """
    session.add(hero)
    session.commit()
    session.refresh(hero)
    return hero


@router.get("/", response_model=list[Hero])
def read_heroes(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    """
    Fetch a list of heroes with optional pagination (offset and limit).
    """
    heroes = session.exec(select(Hero).offset(offset).limit(limit)).all()
    return heroes


@router.get("/{hero_id}", response_model=Hero)
def read_hero(hero_id: int, session: SessionDep):
    """
    Fetch a single hero by ID.
    """
    hero = session.get(Hero, hero_id)
    if not hero:
        raise HTTPException(status_code=404, detail="Hero not found")
    return hero


@router.patch("/{hero_id}", response_model=Hero)
def update_hero(hero_id: int, hero_update: Hero, session: SessionDep):
    """
    Update an existing hero by ID. Only the provided fields will be updated.
    """
    hero_db = session.get(Hero, hero_id)
    if not hero_db:
        raise HTTPException(status_code=404, detail="Hero not found")

    # Update fields dynamically using the provided Hero model
    hero_data = hero_update.dict(exclude_unset=True)
    for key, value in hero_data.items():
        setattr(hero_db, key, value)

    session.add(hero_db)
    session.commit()
    session.refresh(hero_db)
    return hero_db


@router.delete("/{hero_id}")
def delete_hero(hero_id: int, session: SessionDep):
    """
    Delete a hero by ID.
    """
    hero = session.get(Hero, hero_id)
    if not hero:
        raise HTTPException(status_code=404, detail="Hero not found")
    session.delete(hero)
    session.commit()
    return {"ok": True}
