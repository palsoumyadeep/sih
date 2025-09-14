from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List

from . import models, schemas
from .db import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Authentication Endpoints
@app.post("/api/auth/student/register", response_model=schemas.StudentRead)
def register_student(user: schemas.StudentCreate, db: Session = Depends(get_db)):
    if db.query(models.Student).filter(models.Student.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    db_user = models.Student(
        name=user.name,
        phone=user.phone,
        email=user.email,
        password=user.password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.post("/api/auth/student/login", response_model=schemas.StudentRead)
def login_student(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.Student).filter_by(email=user.email, password=user.password).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return db_user



@app.post("/api/student/profile")
def create_student_profile(profile: dict):
    return {"status": "profile saved"}


@app.post("/api/student/resume")
async def upload_student_resume(file: UploadFile = File(...)):
    return {"status": "resume uploaded"}
@app.post("/api/auth/company/register", response_model=schemas.CompanyRead)
def register_company(user: schemas.CompanyCreate, db: Session = Depends(get_db)):
    if db.query(models.Company).filter(models.Company.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    db_user = models.Company(
        name=user.companyName,
        phone=user.phone,
        email=user.email,
        website=user.website,
        password=user.password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.post("/api/auth/company/login", response_model=schemas.CompanyRead)
def login_company(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.Company).filter_by(email=user.email, password=user.password).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return db_user

# Internship Endpoints
@app.post("/api/company/internships", response_model=schemas.InternshipRead)
def create_internship(internship: schemas.InternshipCreate, db: Session = Depends(get_db), company_id: int = 1):
    db_internship = models.Internship(title=internship.title, description=internship.description, company_id=company_id)
    db.add(db_internship)
    db.commit()
    db.refresh(db_internship)
    return db_internship

@app.get("/api/internships", response_model=List[schemas.InternshipRead])
def list_internships(db: Session = Depends(get_db)):
    return db.query(models.Internship).all()

# Admin Endpoints
@app.post("/api/auth/admin/login")
def admin_login(user: schemas.UserLogin):
    if user.email == "admin@example.com" and user.password == "admin":
        return {"email": user.email}
    raise HTTPException(status_code=400, detail="Invalid credentials")

@app.post("/api/admin/smart-allocation")
def smart_allocation():
    return {"status": "Allocation started"}

# Chatbot Endpoints
@app.post("/api/chatbot/message")
def chatbot_message(message: schemas.Message):
    reply = f"You said: {message.message}"
    return {"reply": reply}

@app.post("/api/chatbot/analyze-resume", response_model=schemas.ResumeAnalysis)
async def analyze_resume(file: UploadFile = File(...)):
    content = await file.read()
    score = min(100, len(content) // 100) if content else 0
    suggestions = ["Add more details", "Improve formatting"] if score < 80 else []
    return schemas.ResumeAnalysis(score=score, suggestions=suggestions)
