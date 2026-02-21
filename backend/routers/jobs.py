from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_jobs():
    return [{"id": 1, "title": "React Frontend Developer"}]

@router.post("/")
def create_job():
    return {"message": "Job created"}
