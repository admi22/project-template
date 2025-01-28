import json
import os
from .models import Hero, City
from .dependencies import get_session


def load_sample_data():
    # Manually handle the session from the get_session generator
    session_generator = get_session()
    db = next(session_generator)  # Get the session instance
    
    hero_1 = Hero(name="Batman", age=33, secret_name="Bruce Wayne")
    hero_2 = Hero(name="Superman", age=40, secret_name="Clark Kent")
    hero_3 = Hero(name="Wonderwoman", age=30, secret_name="Diana Prince")
    
    city_1 = City(name="Gotham")
    
    hero_1.city = city_1
    
    db.add(hero_1)
    db.add(hero_2)
    db.add(hero_3)
    
    db.commit()

