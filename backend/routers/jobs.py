from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from supabase_client import supabase

router = APIRouter()

@router.get("/")
async def get_jobs(
    role: Optional[str] = None,
    experience_level: Optional[str] = None,
    location: Optional[str] = None
):
    query = supabase.table("jobs").select("*")
    
    if role:
        query = query.filter("title", "ilike", f"%{role}%")
    if experience_level:
        query = query.eq("experience_level", experience_level)
    if location:
        query = query.filter("location", "ilike", f"%{location}%")
        
    result = query.execute()
    return result.data

@router.get("/{job_id}")
async def get_job_detail(job_id: str):
    result = supabase.table("jobs").select("*").eq("id", job_id).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Job not found")
    return result.data

@router.post("/")
async def create_job(job_data: dict):
    # This should be protected for admin
    result = supabase.table("jobs").insert(job_data).execute()
    return result.data
