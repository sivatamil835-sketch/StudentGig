import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    SUPABASE_URL = os.getenv("SUPABASE_URL", "https://your-project.supabase.co")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY", "your-anon-key")
    SECRET_KEY = os.getenv("SECRET_KEY", "super-secret-key-studentgig")

settings = Settings()
