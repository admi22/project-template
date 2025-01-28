import json
import os
from backend.models.hero import Hero
from backend.dependencies import get_session


def load_sample_data():
    """
    Loads dummy data from a JSON file and inserts it into the database.
    """
    current_dir = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(current_dir, "heroes.json")
    with open(json_path, "r") as f:
        data = json.load(f)

    # Manually handle the session from the get_session generator
    session_generator = get_session()
    db = next(session_generator)  # Get the session instance
    try:
        for item in data:
            hero = Hero(**item)
            db.add(hero)
        db.commit()
    finally:
        session_generator.close()  # Ensure the session is properly closed
