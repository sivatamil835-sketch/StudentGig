from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from supabase_client import supabase

router = APIRouter()

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: str # 'student' or 'experienced'

@router.post("/register")
async def register(user: UserRegister):
    try:
        # 1. Register user in Supabase Auth
        res = supabase.auth.sign_up({
            "email": user.email,
            "password": user.password,
            "options": {
                "data": {
                    "full_name": user.full_name,
                    "role": user.role
                }
            }
        })
        
        if not res.user:
            raise HTTPException(status_code=400, detail="Registration failed")

        # 2. Create profile entry in 'profiles' table
        profile_data = {
            "id": res.user.id,
            "full_name": user.full_name,
            "role": user.role,
        }
        supabase.table("profiles").insert(profile_data).execute()
        
        return {"message": "User registered successfully", "user_id": res.user.id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
async def login(credentials: dict):
    try:
        res = supabase.auth.sign_in_with_password({
            "email": credentials.get("email"),
            "password": credentials.get("password")
        })
        return res
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
