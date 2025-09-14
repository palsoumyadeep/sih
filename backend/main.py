from datetime import datetime, timedelta
from typing import List

from fastapi import Depends, FastAPI, File, HTTPException, UploadFile
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from . import models, schemas
from .db import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def _get_current_user(role: str, model, token: str, db: Session):
    credentials_exception = HTTPException(status_code=401, detail="Could not validate credentials")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("role") != role:
            raise credentials_exception
        user_id = int(payload.get("sub"))
    except Exception:
        raise credentials_exception
    user = db.query(model).get(user_id)
    if not user:
        raise credentials_exception
    return user


def get_current_student(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    return _get_current_user("student", models.Student, token, db)


def get_current_company(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    return _get_current_user("company", models.Company, token, db)


def get_current_admin(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(status_code=401, detail="Could not validate credentials")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("role") != "admin":
            raise credentials_exception
        return {"email": payload.get("sub")}
    except Exception:
        raise credentials_exception


# Authentication Endpoints
@app.post("/api/auth/student/register")
def register_student(user: schemas.StudentCreate, db: Session = Depends(get_db)):
    if db.query(models.Student).filter(models.Student.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    db_user = models.Student(
        name=user.name,
        phone=user.phone,
        email=user.email,
        hashed_password=get_password_hash(user.password),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    token = create_access_token({"sub": db_user.id, "role": "student"})
    return {"token": token, "student": db_user}


@app.post("/api/auth/student/login")
def login_student(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.Student).filter(models.Student.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token({"sub": db_user.id, "role": "student"})
    return {"token": token, "student": db_user}


@app.post("/api/student/profile", response_model=schemas.StudentRead)
def create_student_profile(
    profile: schemas.StudentProfile,
    student: models.Student = Depends(get_current_student),
    db: Session = Depends(get_db),
):
    for field, value in profile.dict().items():
        setattr(student, field, value)
    db.commit()
    db.refresh(student)
    return student


@app.get("/api/student/internship", response_model=schemas.InternshipRead | None)
def get_my_internship(student: models.Student = Depends(get_current_student)):
    return student.internship


@app.post("/api/student/resume")
async def upload_student_resume(
    file: UploadFile = File(...), student: models.Student = Depends(get_current_student)
):
    content = await file.read()
    student.resume_path = file.filename
    return {"status": "resume uploaded", "size": len(content)}


@app.post("/api/auth/company/register")
def register_company(user: schemas.CompanyCreate, db: Session = Depends(get_db)):
    if db.query(models.Company).filter(models.Company.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    db_company = models.Company(
        name=user.companyName,
        phone=user.phone,
        email=user.email,
        website=user.website,
        hashed_password=get_password_hash(user.password),
    )
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    token = create_access_token({"sub": db_company.id, "role": "company"})
    return {"token": token, "company": db_company}


@app.post("/api/auth/company/login")
def login_company(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_company = db.query(models.Company).filter(models.Company.email == user.email).first()
    if not db_company or not verify_password(user.password, db_company.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token({"sub": db_company.id, "role": "company"})
    return {"token": token, "company": db_company}


@app.post("/api/company/internships", response_model=schemas.InternshipRead)
def create_internship(
    internship: schemas.InternshipCreate,
    company: models.Company = Depends(get_current_company),
    db: Session = Depends(get_db),
):
    db_internship = models.Internship(
        title=internship.title,
        required_skills=internship.required_skills,
        location=internship.location,
        stipend=internship.stipend,
        duration=internship.duration,
        company_id=company.id,
    )
    db.add(db_internship)
    db.commit()
    db.refresh(db_internship)
    return db_internship


@app.get("/api/internships", response_model=List[schemas.InternshipRead])
def list_internships(db: Session = Depends(get_db)):
    return db.query(models.Internship).all()


ADMIN_EMAIL = "admin@example.com"
ADMIN_HASHED_PASSWORD = get_password_hash("admin")


@app.post("/api/auth/admin/login")
def admin_login(user: schemas.UserLogin):
    if user.email != ADMIN_EMAIL or not verify_password(user.password, ADMIN_HASHED_PASSWORD):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token({"sub": user.email, "role": "admin"})
    return {"token": token, "admin": {"email": user.email}}


@app.get("/api/admin/stats", response_model=schemas.AdminStats)
def admin_stats(db: Session = Depends(get_db), admin: dict = Depends(get_current_admin)):
    return schemas.AdminStats(
        students=db.query(models.Student).count(),
        companies=db.query(models.Company).count(),
        internships=db.query(models.Internship).count(),
        allocated=db.query(models.Student).filter(models.Student.internship_id.isnot(None)).count(),
    )


@app.post("/api/admin/smart-allocation")
def smart_allocation(db: Session = Depends(get_db), admin: dict = Depends(get_current_admin)):
    internships = db.query(models.Internship).filter(models.Internship.is_filled == False).all()
    students = db.query(models.Student).filter(models.Student.internship_id.is_(None)).all()
    for student in students:
        student_skills = set(
            s.strip().lower() for s in (student.skills or "").split(",") if s.strip()
        )
        best = None
        best_score = 0
        for internship in internships:
            if internship.is_filled:
                continue
            req_skills = set(
                s.strip().lower() for s in (internship.required_skills or "").split(",") if s.strip()
            )
            score = len(student_skills & req_skills)
            if score > best_score:
                best = internship
                best_score = score
        if best and best_score > 0:
            student.internship_id = best.id
            best.is_filled = True
    db.commit()
    return {"status": "Allocation complete"}


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
