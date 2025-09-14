from typing import Optional, List
from pydantic import BaseModel, EmailStr


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class StudentCreate(BaseModel):
    name: str
    phone: str
    email: EmailStr
    password: str


class StudentProfile(BaseModel):
    college: str
    course: str
    year: str
    cgpa: str
    skills: str
    interests: Optional[str] = None
    experience: Optional[str] = None


class StudentRead(BaseModel):
    id: int
    name: str
    phone: str
    email: EmailStr
    college: Optional[str] = None
    course: Optional[str] = None
    year: Optional[str] = None
    cgpa: Optional[str] = None
    skills: Optional[str] = None
    interests: Optional[str] = None
    experience: Optional[str] = None
    internship_id: Optional[int] = None

    class Config:
        orm_mode = True


class CompanyCreate(BaseModel):
    companyName: str
    phone: str
    email: EmailStr
    website: Optional[str] = None
    password: str


class CompanyRead(BaseModel):
    id: int
    name: str
    phone: str
    email: EmailStr
    website: Optional[str] = None

    class Config:
        orm_mode = True


class InternshipCreate(BaseModel):
    title: str
    required_skills: Optional[str] = None
    location: Optional[str] = None
    stipend: Optional[str] = None
    duration: Optional[str] = None


class InternshipRead(BaseModel):
    id: int
    title: str
    required_skills: Optional[str] = None
    location: Optional[str] = None
    stipend: Optional[str] = None
    duration: Optional[str] = None
    company_id: int

    class Config:
        orm_mode = True


class AdminStats(BaseModel):
    students: int
    companies: int
    internships: int
    allocated: int


class Message(BaseModel):
    message: str


class ResumeAnalysis(BaseModel):
    score: int
    suggestions: List[str]
