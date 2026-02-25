from fastapi import APIRouter, HTTPException
from supabase_client import supabase

router = APIRouter()

@router.get("/profile/{user_id}")
async def get_profile(user_id: str):
    result = supabase.table("profiles").select("*").eq("id", user_id).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Profile not found")
    return result.data

@router.put("/profile/{user_id}")
async def update_profile(user_id: str, profile_update: dict):
    result = supabase.table("profiles").update(profile_update).eq("id", user_id).execute()
    return result.data
