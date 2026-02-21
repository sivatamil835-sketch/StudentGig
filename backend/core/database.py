from core.config import settings

db = None

try:
    from supabase import create_client, Client
    db: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
except Exception as e:
    print(f"[WARNING] Supabase not connected: {e}. Set SUPABASE_URL and SUPABASE_KEY env vars.")

def get_supabase():
    return db

