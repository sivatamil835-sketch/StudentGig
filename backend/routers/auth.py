from fastapi import APIRouter

router = APIRouter()

# Placeholder routes to avoid 404s in main app inclusion
@router.post("/login")
def login():
    return {"message": "Login endpoint"}

@router.post("/register")
def register():
    return {"message": "Register endpoint"}
