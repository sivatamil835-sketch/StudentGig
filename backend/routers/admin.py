from fastapi import APIRouter, HTTPException
from supabase_client import supabase

router = APIRouter()

@router.get("/stats")
async def get_admin_stats():
    # Example stats: count of users, jobs, applications
    users_count = supabase.table("profiles").select("id", count="exact").execute()
    jobs_count = supabase.table("jobs").select("id", count="exact").execute()
    apps_count = supabase.table("applications").select("id", count="exact").execute()
    
    return {
        "total_users": users_count.count,
        "total_jobs": jobs_count.count,
        "total_applications": apps_count.count
    }
